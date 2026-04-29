import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { loginSchema } from '@/lib/validation';
import { AuthLayout } from '@/components/common/AuthLayout';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

type Form = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [magicLoading, setMagicLoading] = useState(false);

  const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: true },
  });

  const onSubmit = async (data: Form) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password });
      if (error) throw error;
      toast.success('Welcome back!');
      navigate('/dashboard', { replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const onGoogle = async () => {
    setOauthLoading(true);
    const result = await lovable.auth.signInWithOAuth('google', { redirect_uri: window.location.origin });
    if (result.error) { toast.error('Google sign-in failed'); setOauthLoading(false); return; }
    if (result.redirected) return;
    navigate('/dashboard', { replace: true });
  };

  const onMagic = async () => {
    const email = getValues('email');
    if (!email) { toast.error('Enter your email first'); return; }
    setMagicLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/` },
      });
      if (error) throw error;
      toast.success('Magic link sent! Check your inbox.');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not send link');
    } finally {
      setMagicLoading(false);
    }
  };

  return (
    <AuthLayout
      footer={<>New here? <Link to="/signup" className="text-primary hover:underline">Create an account</Link></>}
    >
      <PageMeta title="Sign in — GoMilap" description="Welcome back to GoMilap." />
      <h1 className="text-2xl font-display font-bold">Welcome back</h1>
      <p className="text-sm text-muted-foreground mt-1">Sign in to continue your conversations.</p>

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
        <div>
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Email</Label>
          <Input className="mt-1.5" {...register('email')} type="email" autoComplete="email" />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
          </div>
          <div className="relative mt-1.5">
            <Input {...register('password')} type={show ? 'text' : 'password'} autoComplete="current-password" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox {...register('remember')} defaultChecked />
          Remember me
        </label>

        <Button type="submit" disabled={submitting} className="w-full h-11 bg-gradient-brand text-primary-foreground hover:opacity-95 shadow-glow">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign in'}
        </Button>

        <Button type="button" variant="ghost" onClick={onMagic} disabled={magicLoading} className="w-full">
          {magicLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send me a magic link instead'}
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
          After signing in, you may receive offers from us via our newsletter, which you can unsubscribe from at any time.
        </p>
      </form>
    </AuthLayout>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4-5.5 4-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.3 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z"/></svg>
  );
}
