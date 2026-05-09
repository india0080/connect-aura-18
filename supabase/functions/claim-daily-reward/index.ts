import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "@supabase/supabase-js/cors";

const REWARDS = [100, 150, 250, 350, 500, 700, 1500];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );
  const token = authHeader.replace("Bearer ", "");
  const { data: claims } = await supabase.auth.getClaims(token);
  if (!claims?.claims) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const userId = claims.claims.sub as string;

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const today = new Date().toISOString().slice(0, 10);
  const { data: existingClaim } = await admin
    .from("daily_reward_claims")
    .select("id")
    .eq("user_id", userId)
    .eq("claimed_date", today)
    .maybeSingle();
  if (existingClaim) {
    return new Response(JSON.stringify({ error: "Already claimed today" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  // Compute streak
  const { data: checkin } = await admin
    .from("daily_checkins")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  let newStreak = 1;
  if (checkin?.last_claimed_date) {
    const last = new Date(checkin.last_claimed_date as string);
    const diffDays = Math.round((new Date(today).getTime() - last.getTime()) / (24 * 60 * 60 * 1000));
    if (diffDays === 1) {
      newStreak = ((checkin.current_streak as number) % 7) + 1;
    } else {
      newStreak = 1;
    }
  }
  const dayIndex = newStreak; // 1..7
  let coins = REWARDS[dayIndex - 1];

  // VIP 2x check
  const { data: vip } = await admin
    .from("vip_subscriptions")
    .select("id")
    .eq("user_id", userId)
    .eq("status", "active")
    .gt("expires_at", new Date().toISOString())
    .limit(1)
    .maybeSingle();
  const vipMultiplier = vip ? 2 : 1;
  coins = coins * vipMultiplier;

  // Insert claim (unique constraint guards duplicates)
  const { error: claimErr } = await admin.from("daily_reward_claims").insert({
    user_id: userId,
    day_index: dayIndex,
    coins_awarded: coins,
    claimed_date: today,
  });
  if (claimErr) {
    return new Response(JSON.stringify({ error: claimErr.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  await admin.from("daily_checkins").upsert({
    user_id: userId,
    current_streak: newStreak,
    longest_streak: Math.max(newStreak, (checkin?.longest_streak as number) ?? 0),
    last_claimed_date: today,
  }, { onConflict: "user_id" });

  await admin.rpc("adjust_wallet", {
    _user_id: userId,
    _coins: 0,
    _bonus_coins: coins,
    _type: "reward",
    _description: `Daily reward — Day ${dayIndex}${vip ? " (VIP 2x)" : ""}`,
    _reference: `daily-${today}`,
    _metadata: { day_index: dayIndex, vip: !!vip },
  });

  return new Response(JSON.stringify({ success: true, dayIndex, coins, streak: newStreak }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
