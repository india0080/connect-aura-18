import logoImg from '@/assets/gomilap-logo.png';

export function Logo({ className = '', showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={logoImg}
        alt="GoMilap logo"
        width={36}
        height={36}
        className="h-9 w-9 rounded-xl object-cover shadow-glow"
        loading="eager"
      />
      {showText && (
        <span className="text-xl font-display font-bold tracking-tight">
          Go<span className="text-gradient-brand">Milap</span>
        </span>
      )}
    </div>
  );
}
