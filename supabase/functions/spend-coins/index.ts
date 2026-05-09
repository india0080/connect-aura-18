import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "@supabase/supabase-js/cors";

const PRICES: Record<string, number> = {
  message: 5,
  audio_call_min: 50,
  video_call_min: 100,
  random_match: 30,
  profile_boost: 200,
  ai_chat_unlock: 150,
  premium_filters: 100,
};

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

  const { action, quantity = 1, reference, description } = await req.json();
  const unit = PRICES[action];
  if (!unit) {
    return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const cost = unit * Math.max(1, Math.min(120, Number(quantity) || 1));

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data, error } = await admin.rpc("adjust_wallet", {
    _user_id: userId,
    _coins: -cost,
    _bonus_coins: 0,
    _type: "spend",
    _description: description || `${action} x${quantity}`,
    _reference: reference || null,
    _metadata: { action, quantity },
  });
  if (error) {
    const msg = error.message?.includes("INSUFFICIENT_COINS") ? "INSUFFICIENT_COINS" : error.message;
    return new Response(JSON.stringify({ error: msg }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  return new Response(JSON.stringify({ success: true, wallet: data, cost }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
});
