import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { lovable } from '@/integrations/lovable/index';
import { Button } from '@/components/ui/button';

export function GoogleButton({ label = 'Continue with Google' }: { label?: string }) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth('google', {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(result.error.message || 'Google sign-in failed');
        setLoading(false);
        return;
      }
      if (result.redirected) return;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Google sign-in failed');
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={loading}
      className="w-full h-10 gap-2 border-border bg-background/40 hover:bg-background/60 backdrop-blur"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
          <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.65 4.1-5.5 4.1-3.31 0-6.01-2.74-6.01-6.1S8.69 5.9 12 5.9c1.88 0 3.14.8 3.86 1.49l2.63-2.54C16.86 3.36 14.66 2.4 12 2.4 6.74 2.4 2.5 6.64 2.5 12s4.24 9.6 9.5 9.6c5.49 0 9.12-3.86 9.12-9.3 0-.62-.07-1.1-.16-1.6H12z"/>
          <path fill="#34A853" d="M3.88 7.36 6.9 9.58c.82-1.62 2.36-2.78 4.1-3.06l.01-3.21C8.4 3.55 5.5 5.06 3.88 7.36z" opacity=".0"/>
        </svg>
      )}
      {label}
    </Button>
  );
}
