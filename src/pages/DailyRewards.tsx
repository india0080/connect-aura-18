import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Gift, Flame, Sparkles, Coins, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageMeta } from "@/components/common/PageMeta";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { CoinChip } from "@/components/wallet/CoinChip";
import { useWallet } from "@/hooks/useWallet";

const REWARDS = [100, 150, 250, 350, 500, 700, 1500];

export default function DailyRewards() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { refresh } = useWallet();
  const [streak, setStreak] = useState(0);
  const [lastDate, setLastDate] = useState<string | null>(null);
  const [spunToday, setSpunToday] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<{ label: string; coins: number } | null>(null);

  const today = new Date().toISOString().slice(0, 10);
  const claimedToday = lastDate === today;
  const nextDay = claimedToday ? streak : (streak % 7) + 1;

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: ci }, { data: spin }] = await Promise.all([
        supabase.from("daily_checkins").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("spin_history").select("id").eq("user_id", user.id).eq("spun_date", today).maybeSingle(),
      ]);
      if (ci) {
        setStreak(ci.current_streak as number);
        setLastDate(ci.last_claimed_date as string | null);
      }
      setSpunToday(!!spin);
    })();
  }, [user, today]);

  const claim = async () => {
    setClaiming(true);
    const { data, error } = await supabase.functions.invoke("claim-daily-reward", { body: {} });
    setClaiming(false);
    if (error || data?.error) {
      toast.error(data?.error || "Could not claim today's reward");
      return;
    }
    toast.success(`+${data.coins.toLocaleString()} coins! Day ${data.dayIndex} 🎉`);
    setStreak(data.streak);
    setLastDate(today);
    refresh();
  };

  const spin = async () => {
    setSpinning(true);
    setSpinResult(null);
    // visual delay
    await new Promise((r) => setTimeout(r, 1600));
    const { data, error } = await supabase.functions.invoke("spin-wheel", { body: {} });
    setSpinning(false);
    if (error || data?.error) {
      toast.error(data?.error || "Spin failed");
      return;
    }
    setSpinResult({ label: data.prize.label, coins: data.prize.coins });
    setSpunToday(true);
    toast.success(`You won ${data.prize.label}!`);
    refresh();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta title="Daily Rewards — GoMilap" description="Claim daily coins, spin & win." />
      <header className="px-4 md:px-8 py-4 flex items-center justify-between border-b border-border/60">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
          <Link to="/dashboard"><Logo /></Link>
        </div>
        <CoinChip />
      </header>

      <main className="flex-1 px-4 md:px-8 py-6 max-w-4xl mx-auto w-full">
        {/* Streak hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6 border border-border/60 relative overflow-hidden"
          style={{
            background: "radial-gradient(60% 60% at 0% 0%, hsl(326 90% 62% / 0.35), transparent 60%), linear-gradient(135deg, hsl(252 28% 9%), hsl(250 30% 7%))",
          }}
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
            <Flame className="h-4 w-4 text-accent" /> Streak
          </div>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-5xl font-display font-bold">{streak}</span>
            <span className="text-muted-foreground mb-1">days</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Keep checking in daily — Day 7 is a 1500-coin jackpot!</p>
        </motion.div>

        {/* 7-day grid */}
        <div className="grid grid-cols-7 gap-2 mt-5">
          {REWARDS.map((amt, i) => {
            const day = i + 1;
            const isCurrent = day === nextDay && !claimedToday;
            const isClaimed = day <= streak && (day < nextDay || claimedToday);
            const isJackpot = day === 7;
            return (
              <motion.div
                key={day}
                whileHover={{ y: isCurrent ? -4 : 0 }}
                className={`rounded-xl p-2 text-center border transition ${
                  isCurrent ? "border-primary shadow-glow bg-gradient-brand-soft" :
                  isClaimed ? "border-success/40 bg-success/10 opacity-70" :
                  "border-border/60 bg-card/40"
                } ${isJackpot ? "col-span-1" : ""}`}
              >
                <div className="text-[10px] uppercase text-muted-foreground">Day {day}</div>
                <Coins className={`h-5 w-5 mx-auto my-1 ${isJackpot ? "text-amber-400" : "text-amber-300"}`} />
                <div className="text-xs font-bold">{amt}</div>
                {isJackpot && <div className="text-[9px] text-amber-300 mt-0.5">JACKPOT</div>}
              </motion.div>
            );
          })}
        </div>

        <Button
          size="lg"
          disabled={claimedToday || claiming}
          onClick={claim}
          className="w-full mt-5 bg-gradient-brand text-primary-foreground shadow-glow"
        >
          {claiming ? <Loader2 className="h-5 w-5 animate-spin" /> :
            claimedToday ? "Already claimed today — come back tomorrow" :
            <><Gift className="h-5 w-5" /> Claim Day {nextDay} reward</>}
        </Button>

        {/* Spin wheel */}
        <div className="mt-8 glass rounded-2xl p-6 text-center">
          <Badge className="bg-gradient-brand text-primary-foreground border-0">Bonus</Badge>
          <h2 className="mt-2 font-display text-2xl font-bold">Lucky Spin Wheel</h2>
          <p className="text-sm text-muted-foreground">One free spin per day — win up to 2500 coins!</p>

          <div className="relative mx-auto mt-6 h-56 w-56">
            <motion.div
              animate={{ rotate: spinning ? 360 * 6 : 0 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="h-full w-full rounded-full border-4 border-primary/40 shadow-glow"
              style={{
                background:
                  "conic-gradient(from 0deg, hsl(262 83% 60%), hsl(326 90% 62%), hsl(45 90% 55%), hsl(190 80% 55%), hsl(280 80% 60%), hsl(340 80% 60%), hsl(60 90% 55%))",
              }}
            />
            <div className="absolute inset-6 rounded-full bg-card flex items-center justify-center flex-col">
              {spinResult ? (
                <>
                  <Sparkles className="h-6 w-6 text-amber-400" />
                  <div className="text-2xl font-bold mt-1">+{spinResult.coins}</div>
                  <div className="text-[10px] text-muted-foreground">{spinResult.label}</div>
                </>
              ) : (
                <Gift className="h-10 w-10 text-primary" />
              )}
            </div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent border-t-accent" />
          </div>

          <Button
            disabled={spunToday || spinning}
            onClick={spin}
            className="mt-6 bg-gradient-brand text-primary-foreground"
          >
            {spinning ? <Loader2 className="h-4 w-4 animate-spin" /> :
              spunToday ? "Come back tomorrow" : "Spin now"}
          </Button>
        </div>

        {/* Invite & VIP CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
          <div className="glass rounded-2xl p-5">
            <h3 className="font-display font-semibold">Invite friends</h3>
            <p className="text-sm text-muted-foreground mt-1">Earn 500 coins per friend who joins.</p>
            <Button variant="secondary" className="mt-3" onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/signup?ref=${user?.id ?? ""}`);
              toast.success("Referral link copied!");
            }}>Copy invite link</Button>
          </div>
          <div className="glass rounded-2xl p-5 bg-gradient-brand-soft">
            <h3 className="font-display font-semibold">VIP gets 2× rewards</h3>
            <p className="text-sm text-muted-foreground mt-1">Double every daily reward & exclusive perks.</p>
            <Button className="mt-3 bg-gradient-brand text-primary-foreground" onClick={() => navigate("/vip")}>Unlock VIP</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
