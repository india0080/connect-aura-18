import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Crown, Check, Sparkles, Heart, Phone, Video, Filter, Eye, MessageSquare, Star, Shield } from "lucide-react";
import { PageMeta } from "@/components/common/PageMeta";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { useAuth } from "@/hooks/useAuth";
import { useVipStatus } from "@/hooks/useVipStatus";
import { CoinChip } from "@/components/wallet/CoinChip";

interface Plan {
  id: string;
  name: string;
  tier: string;
  duration_days: number;
  price_inr: number;
  bonus_coins: number;
  perks: string[];
  badge: string | null;
  highlight: boolean;
}

const BENEFITS = [
  { icon: MessageSquare, label: "Free daily messages" },
  { icon: Phone, label: "Audio call discounts" },
  { icon: Video, label: "Video call discounts" },
  { icon: Heart, label: "Unlimited likes" },
  { icon: Star, label: "Top profile boost" },
  { icon: Filter, label: "Advanced filters" },
  { icon: Eye, label: "See profile visitors" },
  { icon: Shield, label: "Premium badge" },
];

export default function Vip() {
  const { user } = useAuth();
  const vip = useVipStatus();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selected, setSelected] = useState<Plan | null>(null);

  useEffect(() => {
    supabase.from("vip_plans").select("*").eq("active", true).order("sort_order")
      .then(({ data }) => {
        const parsed = (data ?? []).map((p: any) => ({
          ...p,
          perks: Array.isArray(p.perks) ? p.perks : (typeof p.perks === "string" ? JSON.parse(p.perks) : []),
        }));
        setPlans(parsed as Plan[]);
      });
  }, []);

  const returnUrl = `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`;

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta title="VIP Membership — GoMilap" description="Unlock premium dating features." />
      <PaymentTestModeBanner />
      <header className="px-4 md:px-8 py-4 flex items-center justify-between border-b border-border/60">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
          <Link to="/dashboard"><Logo /></Link>
        </div>
        <CoinChip />
      </header>

      <main className="flex-1 px-4 md:px-8 py-8 max-w-6xl mx-auto w-full">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-center"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, hsl(45 90% 60% / 0.35), transparent 60%), radial-gradient(70% 70% at 50% 100%, hsl(326 90% 62% / 0.35), transparent 60%), linear-gradient(135deg, hsl(252 28% 9%), hsl(250 30% 7%))",
          }}
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-600 shadow-glow">
            <Crown className="h-8 w-8 text-black" />
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-display font-bold">
            GoMilap <span className="text-gradient-brand">VIP</span>
          </h1>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            Unlimited connections, premium discounts, exclusive perks — built for serious daters.
          </p>
          {vip.isVip && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/15 text-success text-sm">
              <Crown className="h-4 w-4" /> Active: {vip.tier?.toUpperCase()} • renews {new Date(vip.expiresAt!).toLocaleDateString()}
            </div>
          )}
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
              className="glass rounded-2xl p-4 text-center"
            >
              <div className="mx-auto h-10 w-10 rounded-xl bg-gradient-brand-soft flex items-center justify-center">
                <b.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-2 text-xs font-medium">{b.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Plans */}
        <h2 className="mt-12 text-center font-display text-2xl font-bold">Choose your plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {plans.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`relative glass rounded-2xl p-5 ${p.highlight ? "border-primary shadow-glow ring-2 ring-primary/40" : "border-border/60"}`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-brand text-primary-foreground text-[10px] font-bold uppercase whitespace-nowrap">
                  {p.badge}
                </div>
              )}
              <Crown className={`h-6 w-6 ${p.highlight ? "text-amber-400" : "text-primary"}`} />
              <h3 className="mt-2 font-display font-bold">{p.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold">₹{p.price_inr}</span>
              </div>
              <div className="text-xs text-muted-foreground">{durationLabel(p.duration_days)}</div>
              <div className="mt-2 inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 font-medium">
                <Sparkles className="h-3 w-3" /> +{p.bonus_coins.toLocaleString()} coins
              </div>
              <ul className="mt-4 space-y-1.5">
                {p.perks.slice(0, 5).map((perk) => (
                  <li key={perk} className="flex items-start gap-1.5 text-xs">
                    <Check className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => { if (!user) navigate("/login"); else setSelected(p); }}
                className={`w-full mt-5 ${p.highlight ? "bg-gradient-brand text-primary-foreground" : ""}`}
                variant={p.highlight ? "default" : "secondary"}
              >
                Activate
              </Button>
            </motion.div>
          ))}
        </div>
      </main>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Activate — {selected?.name}</DialogTitle></DialogHeader>
          {selected && (
            <StripeEmbeddedCheckout kind="vip" vipPlanId={selected.id} returnUrl={returnUrl} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function durationLabel(days: number) {
  if (days % 365 === 0) return `${days / 365} year${days / 365 > 1 ? "s" : ""}`;
  if (days % 30 === 0) return `${days / 30} month${days / 30 > 1 ? "s" : ""}`;
  if (days % 7 === 0) return `${days / 7} week${days / 7 > 1 ? "s" : ""}`;
  return `${days} days`;
}
