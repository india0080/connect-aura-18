import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Compass, MessageCircle, Phone, User, LogOut, Bell, Crown, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUnreadCount } from '@/hooks/useUnreadCount';
import { Logo } from '@/components/common/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const navItems = [
  { to: '/dashboard/discover', label: 'Discover', icon: Compass },
  { to: '/dashboard/chat', label: 'Chat', icon: MessageCircle, showBadge: true },
  { to: '/dashboard/friends', label: 'Friends', icon: Users },
  { to: '/dashboard/calls', label: 'Calls', icon: Phone },
  { to: '/dashboard/profile', label: 'Profile', icon: User },
];

export function DashboardLayout() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const unread = useUnreadCount();

  const handleSignOut = async () => { await signOut(); navigate('/login', { replace: true }); };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 shrink-0 flex-col border-r border-border/60 bg-sidebar/60 backdrop-blur-xl">
        <div className="p-5">
          <Logo />
        </div>
        <nav className="px-3 flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-brand-soft text-foreground border border-border/60'
                    : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60'
                }`
              }>
              <item.icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {item.showBadge && unread > 0 && (
                <Badge className="bg-gradient-brand text-primary-foreground border-0">{unread}</Badge>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border/60">
          <Link to="/premium" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-brand-soft text-sm font-medium hover:opacity-90">
            <Crown className="h-5 w-5 text-primary" />
            <span>GoMilap Premium</span>
          </Link>
          <Link to="/dashboard/profile" className="flex items-center gap-3 px-3 py-2 mt-2 rounded-xl hover:bg-sidebar-accent/60">
            <Avatar className="h-9 w-9">
              <AvatarImage src={profile?.avatar_url ?? undefined} />
              <AvatarFallback className="bg-gradient-brand text-primary-foreground text-sm">
                {profile?.full_name?.[0]?.toUpperCase() ?? 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{profile?.full_name}</p>
              <p className="text-xs text-muted-foreground truncate">{profile?.email}</p>
            </div>
          </Link>
          <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start gap-2 mt-1 text-muted-foreground">
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Top bar (mobile + desktop) */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border/60 bg-background/80 backdrop-blur-xl sticky top-0 z-30">
          <Logo />
          <Link to="/notifications" className="p-2 rounded-full hover:bg-secondary">
            <Bell className="h-5 w-5" />
          </Link>
        </header>
        <header className="hidden md:flex items-center justify-end gap-2 px-6 py-3 border-b border-border/60 bg-background/40 backdrop-blur-xl">
          <Link to="/notifications" className="p-2 rounded-full hover:bg-secondary relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent" />
          </Link>
        </header>

        <main className="flex-1 min-h-0 pb-20 md:pb-0 overflow-y-auto scrollbar-thin">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-xl">
          <div className="grid grid-cols-5">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-2.5 gap-0.5 text-xs ${isActive ? 'text-primary' : 'text-muted-foreground'}`
                }>
                <div className="relative">
                  <item.icon className="h-5 w-5" />
                  {item.showBadge && unread > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 text-[10px] rounded-full bg-gradient-brand text-primary-foreground flex items-center justify-center">{unread}</span>
                  )}
                </div>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
