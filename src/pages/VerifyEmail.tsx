import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { AuthLayout } from '@/components/common/AuthLayout';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';

export default function VerifyEmail() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [resending, setResending] = useState(false);

  const onResend = async () => {
    if (!user?.email) return;
    setResending(true);
    try {
      const { error } = await supabase.auth.resend({ type: 'signup', email: user.email });
      if (error) throw error;
      toast.success('Verification email sent.');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to resend');
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout>
      <PageMeta title="Verify your email — GoMilap" />
      <div className="text-center">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-brand-soft flex items-center justify-center">
          <Mail className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-2xl font-display font-bold mt-4">Check your email</h1>
        <p className="text-sm text-muted-foreground mt-1">
          We sent a verification link to <span className="text-foreground font-medium">{user?.email ?? 'your address'}</span>.
        </p>

        <div className="mt-6 rounded-xl border border-border/60 p-4 text-left flex gap-3">
          <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Almost there</p>
            <p className="text-xs text-muted-foreground">Click the link in your email to activate your account, then come back to sign in.</p>
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <Button onClick={onResend} disabled={resending} variant="secondary" className="w-full">
            {resending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Resend verification email'}
          </Button>
          <Button onClick={() => { signOut(); navigate('/login'); }} variant="ghost" className="w-full">Back to sign in</Button>
        </div>
      </div>
    </AuthLayout>
  );
}
