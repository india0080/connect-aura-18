import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, createStripeClient, verifyWebhook } from "../_shared/stripe.ts";

let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
  }
  return _supabase;
}

async function fulfillFromMetadata(metadata: Record<string, string>, sessionId: string, env: StripeEnv) {
  const userId = metadata.userId;
  const kind = metadata.kind;
  if (!userId || !kind) {
    console.error("Missing userId/kind in metadata", metadata);
    return;
  }
  const supabase = getSupabase();

  // Idempotency: skip if already fulfilled
  const { data: existing } = await supabase
    .from("payment_orders")
    .select("id,status")
    .eq("provider_session_id", sessionId)
    .maybeSingle();
  if (existing?.status === "completed") {
    console.log("Order already completed:", sessionId);
    return;
  }

  if (kind === "recharge") {
    const coins = Number(metadata.coins || 0);
    const bonusPct = Number(metadata.bonus_percent || 0);
    const bonusCoins = Math.round((coins * bonusPct) / 100);
    await supabase.rpc("adjust_wallet", {
      _user_id: userId,
      _coins: coins,
      _bonus_coins: bonusCoins,
      _type: "recharge",
      _description: `Recharge — ${coins} coins +${bonusCoins} bonus`,
      _reference: sessionId,
      _metadata: { package_id: metadata.package_id, env },
    });
  } else if (kind === "vip") {
    const durationDays = Number(metadata.duration_days || 30);
    const bonusCoins = Number(metadata.bonus_coins || 0);
    const tier = metadata.vip_tier || "monthly";
    const planId = metadata.vip_plan_id;

    // Determine new expiry: extend if already active
    const { data: activeSub } = await supabase
      .from("vip_subscriptions")
      .select("expires_at")
      .eq("user_id", userId)
      .eq("status", "active")
      .gt("expires_at", new Date().toISOString())
      .order("expires_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    const baseDate = activeSub?.expires_at ? new Date(activeSub.expires_at as string) : new Date();
    const expiresAt = new Date(baseDate.getTime() + durationDays * 24 * 60 * 60 * 1000);

    await supabase.from("vip_subscriptions").insert({
      user_id: userId,
      plan_id: planId,
      tier,
      expires_at: expiresAt.toISOString(),
      status: "active",
      payment_ref: sessionId,
    });

    if (bonusCoins > 0) {
      await supabase.rpc("adjust_wallet", {
        _user_id: userId,
        _coins: 0,
        _bonus_coins: bonusCoins,
        _type: "vip_bonus",
        _description: `VIP ${tier} — ${bonusCoins} bonus coins`,
        _reference: sessionId,
        _metadata: { vip_plan_id: planId, env },
      });
    }
  }

  await supabase
    .from("payment_orders")
    .update({ status: "completed" })
    .eq("provider_session_id", sessionId);
}

async function handle(req: Request, env: StripeEnv) {
  const event = await verifyWebhook(req, env);
  console.log("Webhook event:", event.type);

  if (event.type === "checkout.session.completed" || event.type === "transaction.completed") {
    const obj: any = event.data.object;
    let sessionId: string | undefined = obj.id;
    let metadata: Record<string, string> | undefined = obj.metadata;

    // Some event shapes nest checkout session under different fields
    if (!metadata && obj.checkout_session) {
      sessionId = obj.checkout_session;
      const stripe = createStripeClient(env);
      const session = await stripe.checkout.sessions.retrieve(sessionId!);
      metadata = session.metadata as Record<string, string>;
    }
    if (!metadata && sessionId) {
      const stripe = createStripeClient(env);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      metadata = session.metadata as Record<string, string>;
    }

    if (sessionId && metadata) {
      await fulfillFromMetadata(metadata, sessionId, env);
    }
  } else if (event.type === "transaction.payment_failed") {
    const obj: any = event.data.object;
    const sessionId = obj.checkout_session || obj.id;
    if (sessionId) {
      await getSupabase()
        .from("payment_orders")
        .update({ status: "failed" })
        .eq("provider_session_id", sessionId);
    }
  } else {
    console.log("Unhandled event:", event.type);
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const rawEnv = new URL(req.url).searchParams.get("env");
  if (rawEnv !== "sandbox" && rawEnv !== "live") {
    return new Response(JSON.stringify({ received: true, ignored: "invalid env" }), { status: 200 });
  }
  try {
    await handle(req, rawEnv);
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("Webhook error", { status: 400 });
  }
});
