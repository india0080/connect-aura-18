import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Coins, Sparkles, Zap, Star, Crown, Flame } from "lucide-react";
import { PageMeta } from "@/components/common/PageMeta";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { useAuth } from "@/hooks/useAuth";
import { CoinChip } from "@/components/wallet/CoinChip";

interface Pkg {
  id: string;
  name: string;
  coins: number;
  bonus_percent: number;
  price_inr: number;
  badge: string | null;
  highlight: boolean;
  sort_order: number;
}

const PACK_ICONS = [Sparkles, Zap, Star, Crown, Flame, Crown];
const PACK_GRADIENTS = [
  "from-blue-500 to-cyan-400",
  "from-pink-500 to-rose-400",
  "from-slate-300 to-slate-500",
  "from-amber-400 to-yellow-500",
  "from-cyan-400 to-violet-500",
  "from-fuchsia-500 to-purple-600",
];

export default function Recharge() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [selected, setSelected] = useState<Pkg | null>(null);

  useEffect(() => {
    supabase.from("recharge_packages")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => setPackages((data as Pkg[]) ?? []));
  }, []);

  const returnUrl = `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`;

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta title="Recharge Coins — GoMilap" description="Top up coins with bonus rewards." />
      <PaymentTestModeBanner />
      <header className="px-4 md:px-8 py-4 flex items-center justify-between border-b border-border/60">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
          <Link to="/dashboard"><Logo /></Link>
        </div>
        <CoinChip />
      </header>

      <main className="flex-1 px-4 md:px-8 py-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-brand-soft border border-border/60 text-xs uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Limited offers
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mt-4">
            Recharge <span className="text-gradient-brand">Coins</span>
          </h1>
          <p className="text-muted-foreground mt-2">Bigger packs = bigger bonuses. Cashback on every purchase.</p>
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
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
                    onClick={() => {
                      if (!user) { navigate("/login"); return; }
                      setSelected(p);
                    }}
                    className={`${p.highlight ? "bg-gradient-brand text-primary-foreground" : ""}`}
                  >
                    Buy now
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Methods strip */}
        <div className="mt-10 glass rounded-2xl p-5 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Secure payments</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {["UPI","Cards","Apple Pay","Google Pay","Wallets"].map((m) => (
              <Badge key={m} variant="secondary" className="px-3 py-1 text-xs">{m}</Badge>
            ))}
          </div>
        </div>
      </main>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Recharge — {selected?.name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <StripeEmbeddedCheckout kind="recharge" packageId={selected.id} returnUrl={returnUrl} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
