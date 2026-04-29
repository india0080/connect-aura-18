import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/integrations/supabase/client';
import { emailOnlySchema } from '@/lib/validation';
import { AuthLayout } from '@/components/common/AuthLayout';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Form = z.infer<typeof emailOnlySchema>;

export default function ForgotPassword() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(emailOnlySchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: Form) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
      toast.success('Reset link sent. Check your inbox.');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to send link');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout footer={<><Link to="/login" className="text-primary hover:underline">Back to sign in</Link></>}>
      <PageMeta title="Reset password — GoMilap" />
      <h1 className="text-2xl font-display font-bold">Reset your password</h1>
      <p className="text-sm text-muted-foreground mt-1">We'll email you a link to set a new password.</p>

      {sent ? (
        <div className="mt-6 rounded-xl bg-gradient-brand-soft border border-border/60 p-5 text-center">
          <Mail className="h-8 w-8 mx-auto text-primary" />
          <p className="mt-3 text-sm">Check your inbox for the reset link.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div>
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Email</Label>
            <Input className="mt-1.5" {...register('email')} type="email" autoComplete="email" />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </div>
          <Button type="submit" disabled={submitting} className="w-full h-11 bg-gradient-brand text-primary-foreground shadow-glow">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send reset link'}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
