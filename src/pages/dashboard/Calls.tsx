import { Phone, Video, Sparkles, History } from 'lucide-react';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function Calls() {
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

      <div className="glass rounded-2xl p-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Recent calls</h3>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={() => toast.success('Thanks! We\'ll let you know when calls are live.')}
        variant="outline" className="w-full mt-6 gap-2">
        <Sparkles className="h-4 w-4 text-primary" /> Notify me when calls launch
      </Button>
    </div>
  );
}
