import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
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
  const [oauthLoading, setOauthLoading] = useState(false);

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
      toast.success('Welcome to GoMilap!');
      navigate('/onboarding', { replace: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Sign up failed';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const onGoogle = async () => {
    setOauthLoading(true);
    const result = await lovable.auth.signInWithOAuth('google', { redirect_uri: window.location.origin });
    if (result.error) {
      toast.error('Google sign-in failed');
      setOauthLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate('/dashboard', { replace: true });
  };

  return (
    <AuthLayout
      footer={<>Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link></>}
    >
      <PageMeta title="Sign up — GoMilap" description="Create your GoMilap account and start connecting." />
      <h1 className="text-2xl font-display font-bold">Create your account</h1>
      <p className="text-sm text-muted-foreground mt-1">Join GoMilap and meet people who get you.</p>

      <Button onClick={onGoogle} disabled={oauthLoading} variant="secondary" className="w-full mt-6 h-11 gap-2">
        {oauthLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
        Continue with Google
      </Button>

      <div className="flex items-center gap-3 my-5">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4-5.5 4-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.3 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z"/></svg>
  );
}
