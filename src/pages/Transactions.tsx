import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageMeta } from "@/components/common/PageMeta";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Tx {
  id: string;
  type: string;
  coins: number;
  bonus_coins: number;
  description: string | null;
  created_at: string;
  balance_after: number;
}

export default function Transactions() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tx, setTx] = useState<Tx[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("coin_transactions")
      .select("id,type,coins,bonus_coins,description,created_at,balance_after")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => setTx((data as Tx[]) ?? []));
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta title="Transactions — GoMilap" description="Coin transaction history." />
      <header className="px-4 md:px-8 py-4 flex items-center gap-3 border-b border-border/60">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <Link to="/dashboard"><Logo /></Link>
      </header>
      <main className="flex-1 px-4 md:px-8 py-6 max-w-3xl mx-auto w-full">
        <h1 className="text-2xl md:text-3xl font-display font-bold">Transaction history</h1>
        <div className="mt-4 glass rounded-2xl divide-y divide-border/40">
          {tx.length === 0 && <p className="p-6 text-center text-sm text-muted-foreground">No transactions yet.</p>}
          {tx.map((t) => {
            const total = t.coins + t.bonus_coins;
            const positive = total >= 0;
            return (
              <div key={t.id} className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm truncate">{t.description || t.type}</p>
                  <p className="text-xs text-muted-foreground">{new Date(t.created_at).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-[10px] uppercase mb-1">{t.type}</Badge>
                  <div className={`font-semibold ${positive ? "text-success" : "text-destructive"}`}>
                    {positive ? "+" : ""}{total.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-muted-foreground">Balance: {t.balance_after.toLocaleString()}</div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
