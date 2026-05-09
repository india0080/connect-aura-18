import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Crown, Coins, Sparkles, Zap, Star, Flame, Check,
  Heart, Phone, Video, Filter, Eye, MessageSquare, Shield, Gift,
  Wallet as WalletIcon, History,
} from "lucide-react";
import { PageMeta } from "@/components/common/PageMeta";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { useAuth } from "@/hooks/useAuth";
import { useWallet } from "@/hooks/useWallet";
import { useVipStatus } from "@/hooks/useVipStatus";

interface Pkg {
  id: string; name: string; coins: number; bonus_percent: number;
  price_inr: number; badge: string | null; highlight: boolean; sort_order: number;
}
interface Plan {
  id: string; name: string; tier: string; duration_days: number;
  price_inr: number; bonus_coins: number; perks: string[];
  badge: string | null; highlight: boolean;
}

const PACK_ICONS = [Sparkles, Zap, Star, Crown, Flame, Crown];
const PACK_GRADIENTS = [
  "from-blue-500 to-cyan-400", "from-pink-500 to-rose-400",
  "from-slate-300 to-slate-500", "from-amber-400 to-yellow-500",
  "from-cyan-400 to-violet-500", "from-fuchsia-500 to-purple-600",
];
const BENEFITS = [
  { icon: MessageSquare, label: "Unlimited messaging" },
  { icon: Heart, label: "Unlimited likes" },
  { icon: Phone, label: "Audio call discounts" },
  { icon: Video, label: "Video call discounts" },
  { icon: Star, label: "Profile boost" },
  { icon: Filter, label: "Advanced filters" },
  { icon: Eye, label: "See visitors" },
  { icon: Shield, label: "Premium badge" },
];
const PAYMENT_METHODS = ["UPI", "Cards", "Google Pay", "Apple Pay", "Wallets", "Net Banking"];

export default function VipWallet() {
  const { user } = useAuth();
  const { wallet, totalCoins } = useWallet();
  const vip = useVipStatus();
  const navigate = useNavigate();

  const [packages, setPackages] = useState<Pkg[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [coinSelected, setCoinSelected] = useState<Pkg | null>(null);
  const [vipSelected, setVipSelected] = useState<Plan | null>(null);

  useEffect(() => {
    supabase.from("recharge_packages").select("*").eq("active", true).order("sort_order")
      .then(({ data }) => setPackages((data as Pkg[]) ?? []));
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
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta title="VIP & Wallet Center — GoMilap" description="Recharge coins, unlock VIP, claim daily rewards." />
      <PaymentTestModeBanner />

      <header className="px-4 md:px-8 py-4 flex items-center justify-between border-b border-border/60 sticky top-0 z-30 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
          <Link to="/dashboard"><Logo /></Link>
        </div>
        <Link to="/transactions" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
          <History className="h-4 w-4" /> History
        </Link>
      </header>

      <main className="flex-1 px-4 md:px-8 py-8 max-w-6xl mx-auto w-full space-y-12">
        {/* WALLET HERO */}
        <motion.section
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-6 md:p-10"
          style={{
            background:
              "radial-gradient(70% 70% at 0% 0%, hsl(280 90% 55% / 0.45), transparent 60%), radial-gradient(70% 70% at 100% 100%, hsl(326 90% 62% / 0.40), transparent 60%), linear-gradient(135deg, hsl(252 28% 9%), hsl(250 30% 7%))",
          }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_30%_30%,white_1px,transparent_1px)] [background-size:36px_36px]" />
          <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-6 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/70">Your wallet</p>
              <div className="mt-2 flex items-end gap-3">
                <Coins className="h-10 w-10 text-amber-300 drop-shadow-[0_0_12px_hsl(45_90%_60%/0.6)]" />
                <div>
                  <div className="font-display text-5xl md:text-6xl font-bold text-white leading-none">
                    {totalCoins.toLocaleString()}
                  </div>
                  <div className="text-xs text-white/70 mt-1">
                    {wallet?.coins.toLocaleString() ?? 0} coins · {wallet?.bonus_coins.toLocaleString() ?? 0} bonus
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href="#coins"><Button size="sm" className="bg-gradient-brand text-primary-foreground shadow-glow gap-1.5"><WalletIcon className="h-4 w-4" /> Recharge</Button></a>
                <a href="#vip"><Button size="sm" variant="outline" className="gap-1.5 border-amber-400/50 text-amber-200 hover:text-amber-100"><Crown className="h-4 w-4" /> Upgrade VIP</Button></a>
                <Link to="/rewards"><Button size="sm" variant="ghost" className="gap-1.5 text-white/90"><Gift className="h-4 w-4" /> Claim reward</Button></Link>
              </div>
            </div>
            <div className="glass rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-300" />
                <p className="font-semibold text-white">VIP status</p>
              </div>
              {vip.isVip ? (
                <div className="mt-2">
                  <Badge className="bg-amber-400/20 text-amber-200 border-amber-400/40">{vip.tier?.toUpperCase()}</Badge>
                  <p className="text-xs text-white/70 mt-2">Renews {new Date(vip.expiresAt!).toLocaleDateString()}</p>
                </div>
              ) : (
                <p className="text-xs text-white/70 mt-2">Not active — unlock unlimited features below.</p>
              )}
            </div>
          </div>
        </motion.section>

        {/* COIN PACKAGES */}
        <section id="coins" className="scroll-mt-20">
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary">Coin Packs</p>
              <h2 className="font-display text-3xl font-bold mt-1">Recharge <span className="text-gradient-brand">Coins</span></h2>
            </div>
            <Link to="/transactions" className="text-xs text-muted-foreground hover:underline">View history →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {packages.map((p, i) => {
              const Icon = PACK_ICONS[i % PACK_ICONS.length];
              const gradient = PACK_GRADIENTS[i % PACK_GRADIENTS.length];
              const bonusCoins = Math.round((p.coins * p.bonus_percent) / 100);
              const total = p.coins + bonusCoins;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }} whileHover={{ y: -4 }}
                  className={`relative glass rounded-2xl p-5 border ${p.highlight ? "border-primary shadow-glow" : "border-border/60"}`}
                >
                  {p.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-brand text-primary-foreground text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                      {p.badge}
                    </div>
                  )}
                  <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 font-display font-bold text-lg">{p.name}</h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <Coins className="h-5 w-5 text-amber-400" />
                    <span className="text-3xl font-bold">{p.coins.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">coins</span>
                  </div>
                  <div className="mt-1.5 inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-success/15 text-success font-medium">
                    +{p.bonus_percent}% bonus = +{bonusCoins.toLocaleString()}
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">You get {total.toLocaleString()} coins total</div>
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">₹{p.price_inr}</div>
                      <div className="text-[11px] text-muted-foreground">≈ ₹{(p.price_inr / total).toFixed(3)}/coin</div>
                    </div>
                    <Button
                      onClick={() => { if (!user) navigate("/login"); else setCoinSelected(p); }}
                      className={p.highlight ? "bg-gradient-brand text-primary-foreground" : ""}
                    >
                      Buy now
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* VIP PLANS */}
        <section id="vip" className="scroll-mt-20">
          <div className="text-center mb-6">
            <p className="text-xs uppercase tracking-widest text-amber-300">VIP Membership</p>
            <h2 className="font-display text-3xl font-bold mt-1">
              Unlock <span className="text-gradient-brand">Premium</span> Dating
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
                className="glass rounded-2xl p-3 text-center"
              >
                <div className="mx-auto h-9 w-9 rounded-xl bg-gradient-brand-soft flex items-center justify-center">
                  <b.icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <div className="mt-1.5 text-[11px] font-medium leading-tight">{b.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                <div className="mt-3 text-3xl font-bold">₹{p.price_inr}</div>
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
                  onClick={() => { if (!user) navigate("/login"); else setVipSelected(p); }}
                  className={`w-full mt-5 ${p.highlight ? "bg-gradient-brand text-primary-foreground" : ""}`}
                  variant={p.highlight ? "default" : "secondary"}
                >
                  Activate
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* DAILY REWARDS TEASER */}
        <section className="glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center shadow-glow shrink-0">
            <Gift className="h-10 w-10 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-display text-2xl font-bold">Daily Rewards & Spin</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Check in daily for streak bonuses up to <span className="text-amber-400 font-semibold">1,500 coins jackpot</span> on Day 7. Spin the wheel every day for surprise prizes.
            </p>
          </div>
          <Link to="/rewards">
            <Button size="lg" className="bg-gradient-brand text-primary-foreground shadow-glow gap-2">
              <Sparkles className="h-4 w-4" /> Claim now
            </Button>
          </Link>
        </section>

        {/* PAYMENT METHODS */}
        <section className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Secure payments</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {PAYMENT_METHODS.map((m) => (
              <Badge key={m} variant="secondary" className="px-3 py-1 text-xs">{m}</Badge>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-3">256-bit SSL · PCI-DSS compliant · Powered by Stripe</p>
        </section>
      </main>

      <Dialog open={!!coinSelected} onOpenChange={(open) => !open && setCoinSelected(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Recharge — {coinSelected?.name}</DialogTitle></DialogHeader>
          {coinSelected && (
            <StripeEmbeddedCheckout kind="recharge" packageId={coinSelected.id} returnUrl={returnUrl} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!vipSelected} onOpenChange={(open) => !open && setVipSelected(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Activate — {vipSelected?.name}</DialogTitle></DialogHeader>
          {vipSelected && (
            <StripeEmbeddedCheckout kind="vip" vipPlanId={vipSelected.id} returnUrl={returnUrl} />
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
