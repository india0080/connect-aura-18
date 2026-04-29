import { Bell, Heart, MessageCircle, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';

const placeholders = [
  { icon: UserPlus, title: 'New friend request', desc: 'Soon you\'ll see requests here as they arrive.' },
  { icon: MessageCircle, title: 'Unread messages', desc: 'A summary of what you\'ve missed.' },
  { icon: Heart, title: 'Someone liked you', desc: 'Premium feature — coming soon.' },
];

export default function Notifications() {
  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto w-full">
      <PageMeta title="Notifications — GoMilap" />
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
          <Bell className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold">Notifications</h1>
          <p className="text-sm text-muted-foreground">Stay on top of what matters.</p>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        {placeholders.map((p) => (
          <div key={p.title} className="glass rounded-2xl p-4 flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-brand-soft flex items-center justify-center shrink-0">
              <p.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button asChild variant="ghost"><Link to="/dashboard">Back to dashboard</Link></Button>
      </div>
    </div>
  );
}
