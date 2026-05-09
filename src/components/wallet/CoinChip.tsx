import { Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { useWallet } from "@/hooks/useWallet";
import { cn } from "@/lib/utils";

interface Props { className?: string; to?: string }

export function CoinChip({ className, to = "/dashboard/wallet" }: Props) {
  const { totalCoins, loading } = useWallet();
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
        "bg-gradient-to-r from-amber-400/15 via-yellow-300/10 to-amber-500/15",
        "border border-amber-300/30 text-sm font-semibold",
        "hover:from-amber-400/25 hover:to-amber-500/25 transition",
        className,
      )}
    >
      <Coins className="h-4 w-4 text-amber-400" />
      <span className="text-amber-100">{loading ? "—" : totalCoins.toLocaleString()}</span>
    </Link>
  );
}
