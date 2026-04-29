import { ReactNode } from 'react';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export function AuthLayout({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="h-[100dvh] w-full flex flex-col overflow-hidden">
      <header className="px-6 py-3 sm:py-4 shrink-0">
        <Link to="/"><Logo /></Link>
      </header>
      <main className="flex-1 min-h-0 flex items-center justify-center px-4 pb-3 sm:pb-4">
        <div className="w-full max-w-md animate-slide-up">
          <div className="glass rounded-2xl p-5 sm:p-7">
            {children}
          </div>
          {footer && (
            <div className="mt-3 text-center text-xs sm:text-sm text-muted-foreground">{footer}</div>
          )}
        </div>
      </main>
    </div>
  );
}
