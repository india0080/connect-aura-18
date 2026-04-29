import { ReactNode } from 'react';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export function AuthLayout({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-5">
        <Link to="/"><Logo /></Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md animate-slide-up">
          <div className="glass rounded-2xl p-7 sm:p-8">
            {children}
          </div>
          {footer && <div className="mt-5 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </main>
    </div>
  );
}
