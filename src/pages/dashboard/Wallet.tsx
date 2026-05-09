import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Coins, Gift, Crown, Sparkles, ArrowRight, History, TrendingUp, Wallet as WalletIcon, Zap } from "lucide-react";
import { PageMeta } from "@/components/common/PageMeta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWallet } from "@/hooks/useWallet";
import { useVipStatus } from "@/hooks/useVipStatus";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Tx {
  id: string;
  type: string;
  coins: number;
  bonus_coins: number;
  description: string | null;
  created_at: string;
}

export default function Wallet() {
  const { user } = useAuth();
  const { wallet, totalCoins, loading } = useWallet();
  const vip = useVipStatus();
  const navigate = useNavigate();
  const [tx, setTx] = useState<Tx[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("coin_transactions")
      .select("id,type,coins,bonus_coins,description,created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => setTx((data as Tx[]) ?? []));
  }, [user, wallet?.coins, wallet?.bonus_coins]);

  return (
    <div className="px-4 md:px-8 py-6 max-w-5xl mx-auto w-full">
      <PageMeta title="Wallet — GoMilap" description="Coin balance, recharge, and rewards." />

      {/* Hero balance card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl p-6 md:p-8 border border-border/60"
        style={{
          background:
            "radial-gradient(120% 120% at 0% 0%, hsl(262 83% 60% / 0.45), transparent 55%), radial-gradient(120% 120% at 100% 100%, hsl(326 90% 62% / 0.45), transparent 55%), linear-gradient(135deg, hsl(252 28% 9%), hsl(250 30% 7%))",
        }}
      >
        <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary-foreground/80">
            <WalletIcon className="h-4 w-4" /> Coin Wallet
          </div>
          <div className="mt-4 flex items-end gap-2">
            <Coins className="h-9 w-9 text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
            <span className="text-5xl md:text-6xl font-display font-bold text-white">
              {loading ? "—" : totalCoins.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-3 text-sm text-white/80">
            <span>Coins: <b className="text-white">{wallet?.coins?.toLocaleString() ?? 0}</b></span>
            <span>•</span>
            <span>Bonus: <b className="text-amber-200">{wallet?.bonus_coins?.toLocaleString() ?? 0}</b></span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => navigate("/recharge")} className="bg-gradient-brand text-primary-foreground shadow-glow">
              <Zap className="h-4 w-4" /> Recharge Coins
            </Button>
            <Button variant="secondary" onClick={() => navigate("/rewards")}>
              <Gift className="h-4 w-4" /> Daily Rewards
            </Button>
            <Button variant="outline" onClick={() => navigate("/vip")}>
              <Crown className="h-4 w-4" /> Go VIP
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
        <StatCard icon={<TrendingUp className="h-4 w-4 text-success" />} label="Total recharged" value={(wallet?.total_recharged ?? 0).toLocaleString()} />
        <StatCard icon={<History className="h-4 w-4 text-accent" />} label="Total spent" value={(wallet?.total_spent ?? 0).toLocaleString()} />
        <StatCard icon={<Sparkles className="h-4 w-4 text-amber-300" />} label="Bonus coins" value={(wallet?.bonus_coins ?? 0).toLocaleString()} />
        <StatCard
          icon={<Crown className="h-4 w-4 text-primary" />}
          label="VIP status"
          value={vip.isVip ? `${vip.tier?.toUpperCase()}` : "Not active"}
        />
      </div>

      {/* Recent transactions */}
      <div className="mt-6 glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold">Recent activity</h2>
          <Link to="/transactions" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {tx.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">No transactions yet. Recharge to get started!</p>
        ) : (
          <ul className="divide-y divide-border/40">
            {tx.map((t) => <TxRow key={t.id} t={t} />)}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">{icon}{label}</div>
      <div className="mt-1.5 text-xl font-display font-semibold">{value}</div>
    </div>
  );
}

function TxRow({ t }: { t: Tx }) {
  const positive = t.coins + t.bonus_coins >= 0;
  const sign = positive ? "+" : "";
  const amount = (t.coins + t.bonus_coins).toLocaleString();
  return (
    <li className="py-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm truncate">{t.description || t.type}</p>
        <p className="text-xs text-muted-foreground">{new Date(t.created_at).toLocaleString()}</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-[10px] uppercase">{t.type}</Badge>
        <span className={`font-semibold ${positive ? "text-success" : "text-destructive"}`}>
          {sign}{amount}
        </span>
      </div>
    </li>
  );
}
