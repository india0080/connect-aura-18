import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "@supabase/supabase-js/cors";
import { type StripeEnv, createStripeClient, resolveOrCreateCustomer } from "../_shared/stripe.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { kind, packageId, vipPlanId, returnUrl, environment } = body as {
      kind: "recharge" | "vip";
      packageId?: string;
      vipPlanId?: string;
      returnUrl: string;
      environment: StripeEnv;
    };

    if (!returnUrl || (environment !== "sandbox" && environment !== "live")) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: claims, error: claimsErr } = await supabase.auth.getClaims(token);
    if (claimsErr || !claims?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = claims.claims.sub as string;
    const email = claims.claims.email as string | undefined;

    // Service-role client for trusted reads/writes
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    let priceLookup = "";
    let amountInr = 0;
    let metadata: Record<string, string> = { userId, kind };

    if (kind === "recharge" && packageId) {
      const { data: pkg } = await admin.from("recharge_packages").select("*").eq("id", packageId).maybeSingle();
      if (!pkg || !pkg.stripe_price_id) {
        return new Response(JSON.stringify({ error: "Package not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      priceLookup = pkg.stripe_price_id;
      amountInr = pkg.price_inr;
      metadata.package_id = String(pkg.id);
      metadata.coins = String(pkg.coins);
      metadata.bonus_percent = String(pkg.bonus_percent);
    } else if (kind === "vip" && vipPlanId) {
      const { data: plan } = await admin.from("vip_plans").select("*").eq("id", vipPlanId).maybeSingle();
      if (!plan || !plan.stripe_price_id) {
        return new Response(JSON.stringify({ error: "Plan not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      priceLookup = plan.stripe_price_id;
      amountInr = plan.price_inr;
      metadata.vip_plan_id = String(plan.id);
      metadata.vip_tier = plan.tier;
      metadata.duration_days = String(plan.duration_days);
      metadata.bonus_coins = String(plan.bonus_coins);
    } else {
      return new Response(JSON.stringify({ error: "Invalid kind/id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = createStripeClient(environment);
    const prices = await stripe.prices.list({ lookup_keys: [priceLookup] });
    if (!prices.data.length) {
      return new Response(JSON.stringify({ error: "Price not found in Stripe" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const stripePrice = prices.data[0];

    const customerId = await resolveOrCreateCustomer(stripe, { email, userId });

    // Record pending order
    const { data: order } = await admin
      .from("payment_orders")
      .insert({
        user_id: userId,
        kind,
        package_id: kind === "recharge" ? packageId : null,
        vip_plan_id: kind === "vip" ? vipPlanId : null,
        amount_inr: amountInr,
        currency: "INR",
        provider: "stripe",
        status: "pending",
        metadata,
      })
      .select()
      .single();

    if (order) metadata.order_id = String(order.id);

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: stripePrice.id, quantity: 1 }],
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: returnUrl,
      customer: customerId,
      metadata,
    });

    if (order && session.id) {
      await admin
        .from("payment_orders")
        .update({ provider_session_id: session.id })
        .eq("id", order.id);
    }

    return new Response(
      JSON.stringify({ clientSecret: session.client_secret }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("create-checkout error:", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
