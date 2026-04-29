import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone, Sparkles, Users } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta title="GoMilap — Connect, Chat, Belong" description="Discover people who share your interests. Real-time chat. Built for genuine connections." />
      <header className="px-6 py-5 flex items-center justify-between">
        <Logo />
        <div className="flex gap-2">
          {user ? (
            <Button asChild className="bg-gradient-brand text-primary-foreground"><Link to="/dashboard">Open app</Link></Button>
          ) : (
            <>
              <Button asChild variant="ghost"><Link to="/login">Sign in</Link></Button>
              <Button asChild className="bg-gradient-brand text-primary-foreground shadow-glow"><Link to="/signup">Join free</Link></Button>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-brand-soft border border-border/60 text-xs">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Premium social, reimagined
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold mt-5 max-w-3xl leading-[1.05]">
          Connect with people<br /> who <span className="text-gradient-brand">truly get you.</span>
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl">
          Discover, chat, and build genuine connections in a clean, safe, modern space designed for real conversations.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button asChild size="lg" className="bg-gradient-brand text-primary-foreground shadow-glow gap-2 h-12 px-6">
            <Link to={user ? '/dashboard' : '/signup'}>Get started <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="h-12 px-6">
            <Link to="/premium">See Premium</Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-16 max-w-4xl w-full">
          {[
            { icon: Users, title: 'Smart Discover', desc: 'People ranked by shared interests, not random scrolling.' },
            { icon: MessageCircle, title: 'Real-time Chat', desc: 'Instant messaging with read receipts and a clean UI.' },
            { icon: Phone, title: 'Voice & Video', desc: 'Crystal clear calls — coming soon to GoMilap.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass rounded-2xl p-5 text-left">
              <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold mt-3">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} GoMilap. Built with care.
      </footer>
    </div>
  );
}
