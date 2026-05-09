import { createClient } from "npm:@supabase/supabase-js@2";
const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, GET, OPTIONS" };

const PRIZES = [
  { coins: 50, label: "50 Coins", weight: 30 },
  { coins: 100, label: "100 Coins", weight: 25 },
  { coins: 200, label: "200 Coins", weight: 18 },
  { coins: 500, label: "500 Coins", weight: 12 },
  { coins: 1000, label: "1000 Coins", weight: 8 },
  { coins: 2500, label: "2500 Coins JACKPOT", weight: 4 },
  { coins: 25, label: "25 Coins", weight: 3 },
];

function pickPrize() {
  const total = PRIZES.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * total;
  for (const p of PRIZES) {
    if (r < p.weight) return p;
    r -= p.weight;
  }
  return PRIZES[0];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

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
  if (!claims?.claims) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  const userId = claims.claims.sub as string;

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const today = new Date().toISOString().slice(0, 10);

  const prize = pickPrize();
  const { error: spinErr } = await admin.from("spin_history").insert({
    user_id: userId,
    prize_coins: prize.coins,
    prize_label: prize.label,
    spun_date: today,
  });
  if (spinErr) {
    return new Response(JSON.stringify({ error: "Already spun today" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  await admin.rpc("adjust_wallet", {
    _user_id: userId,
    _coins: 0,
    _bonus_coins: prize.coins,
    _type: "reward",
    _description: `Spin wheel — ${prize.label}`,
    _reference: `spin-${today}`,
    _metadata: { source: "spin" },
  });

  const prizeIndex = PRIZES.findIndex(p => p.coins === prize.coins && p.label === prize.label);
  return new Response(JSON.stringify({ success: true, prize, prizeIndex }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
