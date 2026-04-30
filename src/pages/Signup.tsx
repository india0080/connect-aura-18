import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/integrations/supabase/client';
import { signupSchema, passwordStrength } from '@/lib/validation';
import { AuthLayout } from '@/components/common/AuthLayout';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type Form = z.infer<typeof signupSchema>;

export default function Signup() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: '', email: '', password: '', confirm: '' },
  });

  const pw = watch('password') || '';
  const strength = passwordStrength(pw);

  const onSubmit = async (data: Form) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: { full_name: data.fullName },
        },
      });
      if (error) throw error;
      // Do not auto-login. Force sign-out in case a session was created,
      // then send the user to login with a success message.
      await supabase.auth.signOut();
      toast.success('Verification link sent to your email. Please verify, then log in.');
      navigate('/login', { replace: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Sign up failed';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      footer={<>Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link></>}
    >
      <PageMeta title="Sign up — GoMilap" description="Create your GoMilap account and start connecting." />
      <h1 className="text-2xl font-display font-bold">Create your account</h1>
      <p className="text-sm text-muted-foreground mt-1">Join GoMilap and meet people who get you.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <Field label="Full name" error={errors.fullName?.message}>
          <Input {...register('fullName')} placeholder="Jane Doe" autoComplete="name" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input {...register('email')} type="email" placeholder="you@example.com" autoComplete="email" />
        </Field>
        <Field label="Password" error={errors.password?.message}>
          <div className="relative">
            <Input {...register('password')} type={show ? 'text' : 'password'} autoComplete="new-password" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {pw && (
            <div className="mt-1.5">
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-brand transition-all"
                  style={{ width: `${(strength.score / 4) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{strength.label}</p>
            </div>
          )}
        </Field>
        <Field label="Confirm password" error={errors.confirm?.message}>
          <Input {...register('confirm')} type={show ? 'text' : 'password'} autoComplete="new-password" />
        </Field>

        <Button type="submit" disabled={submitting} className="w-full h-11 bg-gradient-brand text-primary-foreground hover:opacity-95 shadow-glow">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create account'}
        </Button>

        <p className="text-[11px] leading-relaxed text-muted-foreground text-center pt-2">
          By continuing, you accept our{' '}
          <Link to="/terms" className="underline hover:text-foreground">T&amp;C</Link>{' '}
          and the{' '}
          <Link to="/safety" className="underline hover:text-foreground">Safety Policy and Community Guidelines</Link>.
          Please also review our{' '}
          <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
          You agree to the processing of your location so that we can show you interesting people in your area.
          You may revoke this consent at any time with effect for the future via the privacy settings of the app.
          After your registration, you may receive offers from us via our newsletter, which you can unsubscribe from at any time.
        </p>
      </form>
    </AuthLayout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-wide text-muted-foreground">{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
