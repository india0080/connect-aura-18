import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { PageMeta } from "@/components/common/PageMeta";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";

export default function CheckoutReturn() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const { totalCoins, refresh } = useWallet();

  useEffect(() => {
    refresh();
    try {
      confetti({ particleCount: 120, spread: 75, origin: { y: 0.4 } });
    } catch {}
  }, [refresh]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <PageMeta title="Payment successful — GoMilap" description="Your purchase is complete." />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="glass rounded-3xl p-8 max-w-md w-full text-center shadow-glow"
      >
        <div className="mx-auto h-16 w-16 rounded-full bg-success/20 flex items-center justify-center">
          <CheckCircle2 className="h-9 w-9 text-success" />
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold">Payment successful!</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your coins and benefits have been credited.</p>
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-brand-soft border border-border/60">
          <Sparkles className="h-4 w-4 text-amber-300" />
          <span className="text-sm">Wallet: <b>{totalCoins.toLocaleString()}</b> coins</span>
        </div>
        {sessionId && <p className="mt-4 text-[10px] text-muted-foreground break-all">Session: {sessionId}</p>}
        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          <Button asChild className="flex-1 bg-gradient-brand text-primary-foreground">
            <Link to="/dashboard/wallet">View wallet</Link>
          </Button>
          <Button asChild variant="secondary" className="flex-1">
            <Link to="/dashboard">Continue</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
