import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { FullScreenLoader } from './FullScreenLoader';

export function ProtectedRoute({ children, requireOnboarding = true }: { children: ReactNode; requireOnboarding?: boolean }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullScreenLoader />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (requireOnboarding && profile && !profile.onboarding_complete) {
    return <Navigate to="/onboarding" replace />;
  }
  return <>{children}</>;
}

export function GuestRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <FullScreenLoader />;
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
