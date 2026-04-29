import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/integrations/supabase/client';
import { passwordSchema } from '@/lib/validation';
import { AuthLayout } from '@/components/common/AuthLayout';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = passwordSchema.safeParse(pw);
    if (!parsed.success) { toast.error(parsed.error.errors[0].message); return; }
    if (pw !== confirm) { toast.error('Passwords do not match'); return; }
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: pw });
      if (error) throw error;
      toast.success('Password updated');
      navigate('/dashboard', { replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to update password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <PageMeta title="New password — GoMilap" />
      <h1 className="text-2xl font-display font-bold">Set a new password</h1>
      <p className="text-sm text-muted-foreground mt-1">Choose a strong password you haven't used before.</p>
      <form onSubmit={onSubmit} className="space-y-4 mt-6">
        <div>
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">New password</Label>
          <Input className="mt-1.5" type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Confirm</Label>
          <Input className="mt-1.5" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" />
        </div>
        <Button type="submit" disabled={submitting} className="w-full h-11 bg-gradient-brand text-primary-foreground shadow-glow">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update password'}
        </Button>
      </form>
    </AuthLayout>
  );
}
