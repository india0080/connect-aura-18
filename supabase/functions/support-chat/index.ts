import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are GoMilap's friendly AI Support Assistant. GoMilap is a safe, premium social platform (18+) for genuine connections — profiles, chat, voice & video calls.

Your job: answer concisely (under 120 words), warmly, and only about GoMilap. Use light emojis sparingly.

Knowledge base:
- Account: Sign up via Phone OTP, Email, or Google. Reset password from Login → "Forgot password". Account is 18+ only.
- Login issues: Verify OTP/email; check spam; use "Forgot password"; ensure latest app version.
- Privacy: We follow GDPR principles + India IT Rules 2021. Full Privacy Policy at /privacy.
- Terms: /terms — covers acceptable use and account rules.
- Safety: Community Guidelines /safety, Online Safety Code /safety-code, Safety Center /safety-center. Block & Report available on every profile/chat.
- Payments & Premium: Premium subscriptions via Play Store/App Store. Manage/cancel from store account. Refunds per store policy. Page: /premium.
- Reporting: Use in-app Report or email support@gomilap.com with screenshots. Critical issues → permanent ban.
- Emergency: GoMilap is NOT an emergency service. India: dial 112.
- Address: GoMilap, Bajaj Dwar, Rudrapur – 263153, Uttarakhand, India.

If a question is outside this scope OR you cannot resolve it, ALWAYS end with:
"👉 Contact Support: support@gomilap.com\\n👉 Grievance (India): grievance@gomilap.com"

Never invent features, prices, or policies. Never collect passwords or OTPs.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please contact support@gomilap.com." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("support-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
