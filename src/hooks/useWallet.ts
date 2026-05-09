import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface Wallet {
  user_id: string;
  coins: number;
  bonus_coins: number;
  total_recharged: number;
  total_spent: number;
}

export function useWallet() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setWallet(null);
      setLoading(false);
      return;
    }
    const { data } = await supabase.from("wallets").select("*").eq("user_id", user.id).maybeSingle();
    if (data) {
      setWallet(data as Wallet);
    } else {
      // Create empty wallet row
      await supabase.from("wallets").insert({ user_id: user.id });
      setWallet({ user_id: user.id, coins: 0, bonus_coins: 0, total_recharged: 0, total_spent: 0 });
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Realtime sync
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel(`wallet-${user.id}-${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "wallets",
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        if (payload.new) setWallet(payload.new as Wallet);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const totalCoins = (wallet?.coins ?? 0) + (wallet?.bonus_coins ?? 0);
  return { wallet, loading, totalCoins, refresh };
}
