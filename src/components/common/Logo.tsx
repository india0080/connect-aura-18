import { Sparkles } from 'lucide-react';

export function Logo({ className = '', showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
        <Sparkles className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
      </div>
      {showText && (
        <span className="text-xl font-display font-bold tracking-tight">
          Go<span className="text-gradient-brand">Milap</span>
        </span>
      )}
    </div>
  );
}
