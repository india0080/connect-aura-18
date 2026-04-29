import { Phone, Video, Sparkles, History } from 'lucide-react';
import { toast } from 'sonner';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DEMO_PROFILES } from '@/lib/demoProfiles';

export default function Calls() {
  const sampleContacts = DEMO_PROFILES;
  const recent = DEMO_PROFILES.slice(0, 3);

  const handleSample = () =>
    toast.info('This is a sample profile — connect with real members in Discover to call them.');

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
      <PageMeta title="Calls — GoMilap" />
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">Calls</h1>
          <p className="text-muted-foreground text-sm mt-1">Voice & video calls are coming to GoMilap.</p>
        </div>
        <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-brand text-primary-foreground font-semibold">
          Coming soon
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        {[
          { icon: Phone, title: 'Start a Voice Call', desc: 'Crystal-clear audio with anyone in your network.' },
          { icon: Video, title: 'Start a Video Call', desc: 'Face to face — premium quality, end-to-end encrypted.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="glass rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute -inset-px rounded-2xl bg-gradient-brand opacity-0 group-hover:opacity-20 transition-opacity blur-2xl" />
            <div className="relative">
              <div className="h-12 w-12 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-lg mt-4">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{desc}</p>
              <Button disabled className="mt-5 bg-gradient-brand text-primary-foreground opacity-60">Available soon</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent calls — sample */}
      <div className="glass rounded-2xl p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Recent calls</h3>
          </div>
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border/60">Sample</span>
        </div>
        <ul className="divide-y divide-border/60">
          {recent.map((d, i) => (
            <li key={d.id} className="flex items-center gap-3 py-3">
              <Avatar className="h-11 w-11">
                <AvatarImage src={d.avatar_url} alt={d.full_name} />
                <AvatarFallback className="bg-gradient-brand text-primary-foreground">{d.full_name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{d.full_name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  {i % 2 === 0 ? <Video className="h-3 w-3" /> : <Phone className="h-3 w-3" />}
                  {i === 0 ? 'Today, 10:24' : i === 1 ? 'Yesterday' : '2 days ago'} · {d.location}
                </p>
              </div>
              <Button onClick={handleSample} variant="ghost" size="icon" aria-label={`Call ${d.full_name}`}>
                <Phone className="h-4 w-4 text-primary" />
              </Button>
              <Button onClick={handleSample} variant="ghost" size="icon" aria-label={`Video call ${d.full_name}`}>
                <Video className="h-4 w-4 text-primary" />
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Contacts grid — sample */}
      <div className="glass rounded-2xl p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Suggested contacts</h3>
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border/60">Sample</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {sampleContacts.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={handleSample}
              className="flex items-center gap-3 p-3 rounded-xl border border-border/60 hover:border-primary/40 hover:bg-secondary/60 transition-all text-left"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={d.avatar_url} alt={d.full_name} />
                <AvatarFallback className="bg-gradient-brand text-primary-foreground">{d.full_name[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{d.full_name}</p>
                <p className="text-[11px] text-muted-foreground truncate">{d.location}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Button onClick={() => toast.success("Thanks! We'll let you know when calls are live.")}
        variant="outline" className="w-full mt-6 gap-2">
        <Sparkles className="h-4 w-4 text-primary" /> Notify me when calls launch
      </Button>
    </div>
  );
}
