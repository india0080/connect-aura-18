import { Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { PageMeta } from '@/components/common/PageMeta';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <PageMeta title="Page not found — GoMilap" />
      <Logo className="mb-8" />
      <h1 className="text-7xl font-display font-bold text-gradient-brand">404</h1>
      <p className="text-muted-foreground mt-3 max-w-sm">We couldn't find the page you're looking for.</p>
      <Button asChild className="mt-6 bg-gradient-brand text-primary-foreground"><Link to="/">Back home</Link></Button>
    </div>
  );
}
