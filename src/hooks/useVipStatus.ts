import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface VipStatus {
  isVip: boolean;
  tier: string | null;
  expiresAt: string | null;
}

export function useVipStatus() {
  const { user } = useAuth();
  const [status, setStatus] = useState<VipStatus>({ isVip: false, tier: null, expiresAt: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    let mounted = true;
    (async () => {
      const { data } = await supabase
        .from("vip_subscriptions")
        .select("tier, expires_at")
        .eq("user_id", user.id)
        .eq("status", "active")
        .gt("expires_at", new Date().toISOString())
        .order("expires_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!mounted) return;
      if (data) setStatus({ isVip: true, tier: data.tier as string, expiresAt: data.expires_at as string });
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [user]);

  return { ...status, loading };
}
