import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2, MessageCircle, Users, X } from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { PageMeta } from '@/components/common/PageMeta';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { FriendRequest, Profile } from '@/types';

interface Enriched { req: FriendRequest; other: Profile; }

export default function Friends() {
  const { user } = useAuth();
  const [data, setData] = useState<Enriched[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<Set<string>>(new Set());

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const { data: reqs } = await supabase.from('friend_requests').select('*');
    const others = Array.from(new Set((reqs ?? []).map((r) => r.sender_id === user.id ? r.receiver_id : r.sender_id)));
    if (others.length === 0) { setData([]); setLoading(false); return; }
    const { data: profs } = await supabase.from('profiles').select('*').in('id', others);
    const profMap = new Map((profs ?? []).map((p) => [p.id, p as Profile]));
    setData((reqs ?? [])
      .map((r) => ({ req: r as FriendRequest, other: profMap.get(r.sender_id === user.id ? r.receiver_id : r.sender_id)! }))
      .filter((x) => x.other));
    setLoading(false);
  };

  useEffect(() => { load(); }, [user]);

  const respond = async (id: string, status: 'accepted' | 'rejected') => {
    setBusy((s) => new Set(s).add(id));
    const { error } = await supabase.from('friend_requests').update({ status }).eq('id', id);
    setBusy((s) => { const n = new Set(s); n.delete(id); return n; });
    if (error) { toast.error(error.message); return; }
    toast.success(status === 'accepted' ? 'Connection accepted!' : 'Request declined');
    load();
  };

  const incoming = data.filter((x) => x.req.status === 'pending' && x.req.receiver_id === user?.id);
  const outgoing = data.filter((x) => x.req.status === 'pending' && x.req.sender_id === user?.id);
  const friends = data.filter((x) => x.req.status === 'accepted');

  const Card = ({ x, actions }: { x: Enriched; actions: React.ReactNode }) => (
    <div className="glass rounded-2xl p-4 flex items-center gap-3 animate-fade-in">
      <Avatar className="h-12 w-12">
        <AvatarImage src={x.other.avatar_url ?? undefined} />
        <AvatarFallback className="bg-gradient-brand text-primary-foreground">{x.other.full_name?.[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{x.other.full_name}</p>
        <p className="text-xs text-muted-foreground line-clamp-1">{x.other.bio || '—'}</p>
      </div>
      <div className="flex gap-1.5">{actions}</div>
    </div>
  );

  const Section = ({ items, empty, render }: { items: Enriched[]; empty: string; render: (x: Enriched) => React.ReactNode }) => {
    if (loading) return <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}</div>;
    if (items.length === 0) return <p className="text-sm text-muted-foreground text-center py-12">{empty}</p>;
    return <div className="space-y-3">{items.map((x) => <div key={x.req.id}>{render(x)}</div>)}</div>;
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto w-full">
      <PageMeta title="Friends — GoMilap" />
      <h1 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-2"><Users className="h-7 w-7 text-primary" /> Connections</h1>
      <p className="text-muted-foreground text-sm mt-1">Manage your requests and friends.</p>

      <Tabs defaultValue="incoming" className="mt-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="incoming">Incoming {incoming.length > 0 && <span className="ml-1.5 text-xs bg-gradient-brand text-primary-foreground rounded-full px-1.5">{incoming.length}</span>}</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="outgoing">Sent</TabsTrigger>
        </TabsList>
        <TabsContent value="incoming" className="mt-4">
          <Section items={incoming} empty="No new requests." render={(x) => (
            <Card x={x} actions={
              <>
                <Button size="sm" disabled={busy.has(x.req.id)} onClick={() => respond(x.req.id, 'accepted')} className="bg-gradient-brand text-primary-foreground">
                  {busy.has(x.req.id) ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="secondary" disabled={busy.has(x.req.id)} onClick={() => respond(x.req.id, 'rejected')}>
                  <X className="h-4 w-4" />
                </Button>
              </>
            } />
          )} />
        </TabsContent>
        <TabsContent value="friends" className="mt-4">
          <Section items={friends} empty="You don't have any friends yet. Visit Discover to send your first request." render={(x) => (
            <Card x={x} actions={
              <Button size="sm" asChild className="bg-gradient-brand text-primary-foreground gap-1.5">
                <Link to={`/dashboard/chat/${x.other.id}`}><MessageCircle className="h-4 w-4" /> Chat</Link>
              </Button>
            } />
          )} />
        </TabsContent>
        <TabsContent value="outgoing" className="mt-4">
          <Section items={outgoing} empty="No pending requests sent." render={(x) => (
            <Card x={x} actions={<span className="text-xs text-muted-foreground px-2">Pending</span>} />
          )} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
