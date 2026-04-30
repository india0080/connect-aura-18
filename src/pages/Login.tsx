import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/integrations/supabase/client';
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
      <h1 className="text-xl sm:text-2xl font-display font-bold">Welcome back</h1>
      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Sign in to continue your conversations.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
        <div>
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Email</Label>
          <Input className="mt-1 h-10" {...register('email')} type="email" autoComplete="email" />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
          </div>
          <div className="relative mt-1">
            <Input className="h-10" {...register('password')} type={show ? 'text' : 'password'} autoComplete="current-password" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Checkbox {...register('remember')} defaultChecked />
            Remember me
          </label>
          <button
            type="button"
            onClick={onMagic}
            disabled={magicLoading}
            className="text-xs text-primary hover:underline disabled:opacity-50 inline-flex items-center gap-1"
          >
            {magicLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
            Magic link
          </button>
        </div>

        <Button type="submit" disabled={submitting} className="w-full h-10 bg-gradient-brand text-primary-foreground hover:opacity-95 shadow-glow">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign in'}
        </Button>

        <p className="text-[10px] leading-snug text-muted-foreground text-center">
          By continuing, you accept our{' '}
          <Link to="/terms" className="underline hover:text-foreground">T&amp;C</Link>,{' '}
          <Link to="/safety" className="underline hover:text-foreground">Community Guidelines</Link> and{' '}
          <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
        </p>
      </form>
    </AuthLayout>
  );
}
