import { useEffect, useMemo, useState } from 'react';
import { Search, Loader2, Check, Clock, UserPlus, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { INTERESTS } from '@/lib/constants';
import { PageMeta } from '@/components/common/PageMeta';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import type { FriendRequest, Profile } from '@/types';

type ConnectStatus = 'none' | 'pending-out' | 'pending-in' | 'friends';

export default function Discover() {
  const { user, profile } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [interestFilter, setInterestFilter] = useState<string | null>(null);
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [{ data: profs }, { data: reqs }] = await Promise.all([
        supabase.from('profiles').select('*').eq('onboarding_complete', true).neq('id', user.id).limit(200),
        supabase.from('friend_requests').select('*'),
      ]);
      if (cancelled) return;
      setProfiles((profs as Profile[]) ?? []);
      setRequests((reqs as FriendRequest[]) ?? []);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [user]);

  const statusFor = (otherId: string): ConnectStatus => {
    const req = requests.find(
      (r) => (r.sender_id === user!.id && r.receiver_id === otherId) || (r.receiver_id === user!.id && r.sender_id === otherId)
    );
    if (!req) return 'none';
    if (req.status === 'accepted') return 'friends';
    if (req.status === 'pending') return req.sender_id === user!.id ? 'pending-out' : 'pending-in';
    return 'none';
  };

  const filtered = useMemo(() => {
    if (!profile) return [];
    const myInterests = new Set(profile.interests ?? []);
    const pref = profile.preference;
    return profiles
      .filter((p) => {
        if (pref === 'men' && p.gender !== 'male') return false;
        if (pref === 'women' && p.gender !== 'female') return false;
        if (search && !p.full_name.toLowerCase().includes(search.toLowerCase())) return false;
        if (interestFilter && !p.interests?.includes(interestFilter)) return false;
        return true;
      })
      .map((p) => ({ p, shared: (p.interests ?? []).filter((i) => myInterests.has(i)).length }))
      .sort((a, b) => b.shared - a.shared || +new Date(b.p.created_at) - +new Date(a.p.created_at));
  }, [profiles, profile, search, interestFilter]);

  const sendRequest = async (otherId: string) => {
    if (!user) return;
    setBusyIds((s) => new Set(s).add(otherId));
    const { data, error } = await supabase
      .from('friend_requests')
      .insert({ sender_id: user.id, receiver_id: otherId })
      .select()
      .single();
    setBusyIds((s) => { const n = new Set(s); n.delete(otherId); return n; });
    if (error) { toast.error(error.message); return; }
    setRequests((r) => [...r, data as FriendRequest]);
    toast.success('Request sent');
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      <PageMeta title="Discover — GoMilap" description="Find people who share your interests." />

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">Discover</h1>
          <p className="text-muted-foreground text-sm mt-1">People who share your interests, ranked just for you.</p>
        </div>
        <div className="relative md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name" className="pl-9" />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin -mx-1 px-1">
        <button onClick={() => setInterestFilter(null)}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium border ${!interestFilter ? 'bg-gradient-brand text-primary-foreground border-transparent' : 'border-border'}`}>
          All
        </button>
        {INTERESTS.map((i) => (
          <button key={i} onClick={() => setInterestFilter(i)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium border transition ${interestFilter === i ? 'bg-gradient-brand text-primary-foreground border-transparent' : 'border-border hover:border-primary/50'}`}>
            {i}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {filtered.map(({ p, shared }) => {
            const status = statusFor(p.id);
            const busy = busyIds.has(p.id);
            return (
              <article key={p.id} className="glass rounded-2xl p-4 flex flex-col animate-fade-in hover:-translate-y-0.5 transition-transform">
                <div className="flex items-center gap-3">
                  <Avatar className="h-14 w-14 ring-2 ring-border">
                    <AvatarImage src={p.avatar_url ?? undefined} />
                    <AvatarFallback className="bg-gradient-brand text-primary-foreground">{p.full_name?.[0]?.toUpperCase() ?? '?'}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{p.full_name}</p>
                    {shared > 0 && (
                      <p className="text-xs text-primary">{shared} shared interest{shared > 1 ? 's' : ''}</p>
                    )}
                  </div>
                </div>
                {p.bio && <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{p.bio}</p>}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {(p.interests ?? []).slice(0, 3).map((i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{i}</span>
                  ))}
                </div>
                <div className="mt-auto pt-4">
                  {status === 'none' && (
                    <Button onClick={() => sendRequest(p.id)} disabled={busy} className="w-full bg-gradient-brand text-primary-foreground gap-1.5">
                      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <><UserPlus className="h-4 w-4" /> Connect</>}
                    </Button>
                  )}
                  {status === 'pending-out' && (
                    <Button disabled variant="secondary" className="w-full gap-1.5"><Clock className="h-4 w-4" /> Pending</Button>
                  )}
                  {status === 'pending-in' && (
                    <Button asChild variant="secondary" className="w-full gap-1.5">
                      <Link to="/dashboard/friends"><Users className="h-4 w-4" /> Respond</Link>
                    </Button>
                  )}
                  {status === 'friends' && (
                    <Button asChild variant="secondary" className="w-full gap-1.5">
                      <Link to={`/dashboard/chat/${p.id}`}><Check className="h-4 w-4" /> Message</Link>
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-16 text-center">
      <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-brand-soft flex items-center justify-center">
        <Users className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mt-4">No one matches yet</h3>
      <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or check back soon.</p>
    </div>
  );
}
