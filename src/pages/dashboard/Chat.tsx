import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Send, Smile } from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { chatRoomId } from '@/lib/chat';
import { PageMeta } from '@/components/common/PageMeta';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DEMO_PROFILES } from '@/lib/demoProfiles';
import type { FriendRequest, Message, Profile } from '@/types';

const EMOJIS = ['😀','😂','😍','🥰','😎','🤔','😢','😡','👍','🙏','🔥','✨','❤️','🎉','💯','😅'];

interface Conversation {
  other: Profile;
  lastMessage?: Message;
  unread: number;
}

export default function Chat() {
  const { user } = useAuth();
  const { userId: activeUserId } = useParams();
  const navigate = useNavigate();
  const [convs, setConvs] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load friends + last message previews
  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const { data: reqs } = await supabase.from('friend_requests').select('*').eq('status', 'accepted');
      const friendIds = (reqs ?? []).map((r) => r.sender_id === user.id ? r.receiver_id : r.sender_id);
      if (friendIds.length === 0) { setConvs([]); setLoading(false); return; }
      const [{ data: profs }, { data: msgs }] = await Promise.all([
        supabase.from('profiles').select('*').in('id', friendIds),
        supabase.from('messages').select('*').or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`).order('created_at', { ascending: false }).limit(500),
      ]);
      const profMap = new Map((profs ?? []).map((p) => [p.id, p as Profile]));
      const conversations: Conversation[] = friendIds.map((fid) => {
        const last = (msgs ?? []).find((m) => m.sender_id === fid || m.receiver_id === fid) as Message | undefined;
        const unread = (msgs ?? []).filter((m) => m.sender_id === fid && m.receiver_id === user.id && !m.read).length;
        return { other: profMap.get(fid)!, lastMessage: last, unread };
      }).filter((c) => c.other);
      conversations.sort((a, b) => +new Date(b.lastMessage?.created_at ?? 0) - +new Date(a.lastMessage?.created_at ?? 0));
      setConvs(conversations);
      setLoading(false);
    })();
  }, [user, activeUserId]);

  const activeConv = useMemo(() => convs.find((c) => c.other.id === activeUserId), [convs, activeUserId]);

  // Load messages + subscribe realtime when active conversation changes
  useEffect(() => {
    if (!user || !activeUserId) { setMessages([]); return; }
    const room = chatRoomId(user.id, activeUserId);
    let cancelled = false;

    (async () => {
      const { data } = await supabase.from('messages').select('*').eq('chat_room_id', room).order('created_at', { ascending: true });
      if (cancelled) return;
      setMessages((data as Message[]) ?? []);
      // Mark received messages as read
      await supabase.from('messages').update({ read: true }).eq('chat_room_id', room).eq('receiver_id', user.id).eq('read', false);
    })();

    const channel = supabase.channel(`room-${room}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_room_id=eq.${room}` },
        async (payload) => {
          const m = payload.new as Message;
          setMessages((prev) => prev.some((p) => p.id === m.id) ? prev : [...prev, m]);
          if (m.receiver_id === user.id) {
            await supabase.from('messages').update({ read: true }).eq('id', m.id);
          }
        })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages', filter: `chat_room_id=eq.${room}` },
        (payload) => {
          const m = payload.new as Message;
          setMessages((prev) => prev.map((p) => p.id === m.id ? m : p));
        })
      .subscribe();

    return () => { cancelled = true; supabase.removeChannel(channel); };
  }, [user, activeUserId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length, activeUserId]);

  const send = async () => {
    if (!user || !activeUserId || !draft.trim()) return;
    setSending(true);
    const text = draft.trim();
    setDraft('');
    const room = chatRoomId(user.id, activeUserId);
    const { error } = await supabase.from('messages').insert({
      chat_room_id: room, sender_id: user.id, receiver_id: activeUserId, message: text,
    });
    setSending(false);
    if (error) { toast.error(error.message); setDraft(text); }
  };

  return (
    <div className="h-[calc(100vh-7rem)] md:h-[calc(100vh-3.5rem)] flex">
      <PageMeta title="Chat — GoMilap" />

      {/* Contacts */}
      <aside className={`w-full md:w-80 lg:w-96 shrink-0 border-r border-border/60 ${activeUserId ? 'hidden md:flex' : 'flex'} flex-col`}>
        <div className="p-4 border-b border-border/60">
          <h2 className="text-xl font-display font-bold">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {loading ? (
            <div className="p-3 space-y-2">
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
            </div>
          ) : (
            <>
              {convs.length === 0 ? (
                <div className="px-6 pt-6 pb-2 text-center">
                  <MessageCircle className="h-9 w-9 mx-auto text-muted-foreground" />
                  <p className="text-xs text-muted-foreground mt-2">No conversations yet. Connect with people in Discover.</p>
                </div>
              ) : (
                <ul>
                  {convs.map((c) => {
                    const active = c.other.id === activeUserId;
                    return (
                      <li key={c.other.id}>
                        <Link to={`/dashboard/chat/${c.other.id}`}
                          className={`flex items-center gap-3 px-4 py-3 hover:bg-secondary/60 transition-colors ${active ? 'bg-gradient-brand-soft' : ''}`}>
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={c.other.avatar_url ?? undefined} />
                            <AvatarFallback className="bg-gradient-brand text-primary-foreground">{c.other.full_name[0]?.toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <p className="font-medium truncate">{c.other.full_name}</p>
                              {c.lastMessage && <span className="text-[10px] text-muted-foreground shrink-0">{relTime(c.lastMessage.created_at)}</span>}
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-xs text-muted-foreground truncate">{c.lastMessage?.message ?? 'Say hi 👋'}</p>
                              {c.unread > 0 && <span className="text-[10px] bg-gradient-brand text-primary-foreground rounded-full min-w-[18px] h-4.5 px-1 flex items-center justify-center">{c.unread}</span>}
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Sample chats — preview of GoMilap experience */}
              <div className="mt-2 px-4 pt-3 pb-1 text-[11px] uppercase tracking-wider text-muted-foreground border-t border-border/60">
                Sample chats
              </div>
              <ul>
                {DEMO_PROFILES.map((d, i) => (
                  <li key={d.id}>
                    <button
                      type="button"
                      onClick={() => toast.info('This is a sample profile — connect with real members in Discover.')}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/60 transition-colors text-left"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={d.avatar_url} alt={d.full_name} />
                        <AvatarFallback className="bg-gradient-brand text-primary-foreground">{d.full_name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="font-medium truncate">{d.full_name}</p>
                          <span className="text-[10px] text-muted-foreground shrink-0">{i === 0 ? '2m' : i === 1 ? '15m' : `${i}h`}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs text-muted-foreground truncate">{d.bio}</p>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border/60 shrink-0">Sample</span>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </aside>

      {/* Conversation */}
      <section className={`flex-1 min-w-0 flex flex-col ${!activeUserId ? 'hidden md:flex' : 'flex'}`}>
        {!activeConv ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="h-16 w-16 rounded-2xl bg-gradient-brand-soft flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg mt-4">Select a conversation</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">Pick a friend from the list to start chatting in real time.</p>
          </div>
        ) : (
          <>
            <header className="flex items-center gap-3 p-4 border-b border-border/60 bg-background/40 backdrop-blur-xl">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => navigate('/dashboard/chat')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarImage src={activeConv.other.avatar_url ?? undefined} />
                <AvatarFallback className="bg-gradient-brand text-primary-foreground">{activeConv.other.full_name[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="font-semibold truncate">{activeConv.other.full_name}</p>
                <p className="text-xs text-success">Online</p>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6 space-y-2">
              {messages.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-12">This is the beginning of your conversation. Say hi! 👋</p>
              )}
              {messages.map((m, i) => {
                const mine = m.sender_id === user?.id;
                const prev = messages[i - 1];
                const showAvatar = !mine && (!prev || prev.sender_id !== m.sender_id);
                return (
                  <div key={m.id} className={`flex gap-2 ${mine ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    {!mine && (
                      <div className="w-8">
                        {showAvatar && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={activeConv.other.avatar_url ?? undefined} />
                            <AvatarFallback className="bg-gradient-brand text-primary-foreground text-xs">{activeConv.other.full_name[0]?.toUpperCase()}</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    )}
                    <div className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${mine ? 'bg-gradient-brand text-primary-foreground rounded-br-md' : 'bg-secondary text-secondary-foreground rounded-bl-md'}`}>
                      <p className="whitespace-pre-wrap break-words">{m.message}</p>
                      <p className={`text-[10px] mt-0.5 ${mine ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {mine && m.read && ' · seen'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-3 border-t border-border/60 bg-background/40 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="ghost" size="icon"><Smile className="h-5 w-5" /></Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-2 grid grid-cols-8 gap-1">
                    {EMOJIS.map((e) => (
                      <button type="button" key={e} onClick={() => setDraft((d) => d + e)} className="text-xl hover:bg-secondary rounded p-1">{e}</button>
                    ))}
                  </PopoverContent>
                </Popover>
                <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message..." maxLength={4000} className="flex-1" />
                <Button type="submit" disabled={sending || !draft.trim()} className="bg-gradient-brand text-primary-foreground" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function relTime(iso: string) {
  const d = new Date(iso); const now = Date.now();
  const diff = (now - d.getTime()) / 1000;
  if (diff < 60) return 'now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d`;
  return d.toLocaleDateString();
}
