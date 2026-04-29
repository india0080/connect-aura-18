import { ShieldCheck, Mail, Phone, UserCheck, Image as ImageIcon, Lock, BadgeCheck, Clock, CircleCheck, CircleAlert, ChevronRight } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import type { Profile } from '@/types';

type Status = 'verified' | 'pending' | 'action_required';

interface CheckItem {
  id: string;
  title: string;
  description: string;
  icon: typeof ShieldCheck;
  status: Status;
  verifiedAt: string | null;
  actionLabel?: string;
  onAction?: () => void;
  actionTo?: string;
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function statusMeta(status: Status) {
  switch (status) {
    case 'verified':
      return {
        label: 'Verified',
        Icon: CircleCheck,
        ring: 'ring-emerald-500/30',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
      };
    case 'pending':
      return {
        label: 'Pending',
        Icon: Clock,
        ring: 'ring-amber-500/30',
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
      };
    case 'action_required':
      return {
        label: 'Action needed',
        Icon: CircleAlert,
        ring: 'ring-destructive/40',
        text: 'text-destructive',
        bg: 'bg-destructive/10',
      };
  }
}

export function VerificationStatus({ user, profile }: { user: User; profile: Profile | null }) {
  const emailVerified = Boolean(user.email_confirmed_at);
  const phoneVerified = Boolean(user.phone_confirmed_at);
  const profileComplete = Boolean(profile?.onboarding_complete);
  const photoUploaded = Boolean(profile?.avatar_url);
  const accountCreated = user.created_at ?? null;

  const checks: CheckItem[] = [
    {
      id: 'email',
      title: 'Email verification',
      description: emailVerified
        ? `Confirmed via ${user.email}`
        : 'Confirm your email to unlock all features',
      icon: Mail,
      status: emailVerified ? 'verified' : 'action_required',
      verifiedAt: user.email_confirmed_at ?? null,
      actionLabel: emailVerified ? undefined : 'Resend email',
      actionTo: emailVerified ? undefined : '/verify-email',
    },
    {
      id: 'phone',
      title: 'Phone (OTP) verification',
      description: phoneVerified
        ? `Confirmed via ${user.phone || 'OTP'}`
        : 'Verify your phone number with OTP for added trust',
      icon: Phone,
      status: phoneVerified ? 'verified' : 'pending',
      verifiedAt: user.phone_confirmed_at ?? null,
      actionLabel: phoneVerified ? undefined : 'Verify phone',
    },
    {
      id: 'age',
      title: 'Age & identity attestation',
      description: 'You confirmed you are 18+ when you joined GoMilap',
      icon: BadgeCheck,
      status: 'verified',
      verifiedAt: accountCreated,
    },
    {
      id: 'photo',
      title: 'Profile photo',
      description: photoUploaded ? 'Photo uploaded to your profile' : 'Add a real photo to build trust',
      icon: ImageIcon,
      status: photoUploaded ? 'verified' : 'pending',
      verifiedAt: photoUploaded ? profile?.updated_at ?? null : null,
    },
    {
      id: 'profile',
      title: 'Profile completion',
      description: profileComplete
        ? 'Bio, interests and preferences are set'
        : 'Finish onboarding to be discoverable',
      icon: UserCheck,
      status: profileComplete ? 'verified' : 'action_required',
      verifiedAt: profileComplete ? profile?.updated_at ?? null : null,
      actionLabel: profileComplete ? undefined : 'Complete profile',
      actionTo: profileComplete ? undefined : '/onboarding',
    },
    {
      id: 'password',
      title: 'Account security',
      description: 'Password protected sign-in is active',
      icon: Lock,
      status: 'verified',
      verifiedAt: accountCreated,
    },
  ];

  const verifiedCount = checks.filter((c) => c.status === 'verified').length;
  const total = checks.length;
  const percent = Math.round((verifiedCount / total) * 100);

  return (
    <section className="glass rounded-2xl p-6 mt-6 space-y-5">
      {/* Header */}
      <div className="flex items-start gap-4 flex-wrap">
        <div className="h-12 w-12 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow shrink-0">
          <ShieldCheck className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display font-semibold text-lg flex items-center gap-2">
            Verification status
          </h2>
          <p className="text-sm text-muted-foreground">
            Verified accounts get more matches and a trust badge on their profile.
          </p>
        </div>
        <div className="text-right">
          <p className="font-display font-bold text-2xl text-gradient-brand leading-none">{percent}%</p>
          <p className="text-xs text-muted-foreground mt-1">{verifiedCount} of {total} complete</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-card overflow-hidden">
        <div
          className="h-full bg-gradient-brand transition-all duration-500"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Checks list */}
      <ul className="divide-y divide-border/60 -mx-2">
        {checks.map((c) => {
          const meta = statusMeta(c.status);
          const Icon = c.icon;
          return (
            <li key={c.id} className="flex items-start gap-3 px-2 py-3.5">
              <div className={`h-9 w-9 rounded-lg ${meta.bg} ring-1 ${meta.ring} flex items-center justify-center shrink-0`}>
                <Icon className={`h-4 w-4 ${meta.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-sm">{c.title}</p>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${meta.bg} ${meta.text}`}>
                    <meta.Icon className="h-3 w-3" />
                    {meta.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{c.description}</p>
                {c.verifiedAt && c.status === 'verified' && (
                  <p className="text-[11px] text-muted-foreground/80 mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Verified on {formatDate(c.verifiedAt)}
                  </p>
                )}
              </div>
              {c.actionLabel && c.actionTo && (
                <Link
                  to={c.actionTo}
                  className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5 shrink-0 mt-1.5"
                >
                  {c.actionLabel}
                  <ChevronRight className="h-3 w-3" />
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <div className="text-[11px] text-muted-foreground border-t border-border/60 pt-3">
        Read more in our{' '}
        <Link to="/safety-code" className="text-primary hover:underline">Online Safety Code</Link>
        {' · '}
        <Link to="/safety-center" className="text-primary hover:underline">Safety Center</Link>
      </div>
    </section>
  );
}
