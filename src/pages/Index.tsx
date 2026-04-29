import { Link } from 'react-router-dom';
import { MessageCircleHeart, Users, Sparkles, Facebook, Instagram } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import heroImg from '@/assets/hero-friends.jpg';
import showcaseImg from '@/assets/app-showcase.jpg';

export default function Index() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="GoMilap — Nice to meet you"
        description="Start chatting and streaming with people nearby who are just like you. Join GoMilap today."
      />

      {/* HERO */}
      <section className="relative w-full">
        <div className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
          <img
            src={heroImg}
            alt="Diverse group of friends laughing together"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Dark gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

          {/* Top nav */}
          <header className="relative z-10 px-6 py-5 flex items-center justify-between max-w-7xl mx-auto w-full">
            <Logo />
            <nav className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
              <Link to="/premium" className="px-4 py-1.5 text-sm rounded-full hover:bg-white/5 transition-colors">Premium</Link>
              <Link to="/premium" className="px-4 py-1.5 text-sm rounded-full hover:bg-white/5 transition-colors">Business</Link>
              <Link to="/login" className="px-4 py-1.5 text-sm rounded-full hover:bg-white/5 transition-colors">Support</Link>
            </nav>
            <div className="flex gap-2">
              {user ? (
                <Button asChild className="bg-gradient-brand text-primary-foreground">
                  <Link to="/dashboard">Open app</Link>
                </Button>
              ) : (
                <Button asChild variant="secondary" className="rounded-full">
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>
          </header>

          {/* Hero content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 h-[calc(88vh-88px)] min-h-[470px]">
            <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl max-w-4xl leading-[1.05] drop-shadow-lg">
              Nice to meet you on <span className="text-gradient-brand">GoMilap</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-foreground/90 max-w-xl">
              Start chatting and connecting with people nearby who are just like you.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-14 px-10 text-base bg-gradient-brand text-primary-foreground shadow-glow rounded-full hover:scale-105 transition-transform"
            >
              <Link to={user ? '/dashboard' : '/signup'}>Get started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* THREE VALUE PROPS */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 md:gap-8">
          {[
            { icon: MessageCircleHeart, text: 'Make new friends, find love, or chat your way to belonging.' },
            { icon: Users, text: 'A community of millions is waiting to meet you on GoMilap.' },
            { icon: Sparkles, text: 'GoMilap brings real people together with real conversations.' },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex flex-col items-center text-center animate-slide-up">
              <div className="h-16 w-16 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow mb-5">
                <Icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <p className="text-lg font-display font-semibold text-gradient-brand max-w-xs">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MEET PEOPLE LIKE YOURSELF */}
      <section className="px-6 py-20 md:py-28 bg-card/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight">
              Meet people <span className="text-gradient-brand">like yourself</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Whether you're looking for friendship or a serious relationship, GoMilap lets you meet
              like-minded people, chat for free, and discover great singles in your area. Find your
              perfect match even faster with Premium features.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 px-8 bg-gradient-brand text-primary-foreground shadow-glow rounded-full"
            >
              <Link to={user ? '/dashboard' : '/signup'}>Get started</Link>
            </Button>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-brand-soft blur-3xl rounded-full" />
            <img
              src={showcaseImg}
              alt="GoMilap app preview on mobile devices"
              width={1280}
              height={960}
              loading="lazy"
              className="relative rounded-3xl glass-strong w-full"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-16 border-t border-border/60">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-sm">
          <div className="space-y-5">
            <Logo />
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          <div className="space-y-3">
            <a href="#" className="block text-primary hover:opacity-80">Press</a>
            <a href="#" className="block text-primary hover:opacity-80">Careers</a>
            <a href="#" className="block text-primary hover:opacity-80">Support</a>
          </div>

          <div className="space-y-3">
            <Link to="/safety" className="block text-primary hover:opacity-80">Safety Policy &amp; Community Guidelines</Link>
            <Link to="/compliance" className="block text-primary hover:opacity-80">Compliance</Link>
            <a href="#" className="block text-primary hover:opacity-80">Consumer Health Data Privacy</a>
            <a href="#" className="block text-primary hover:opacity-80">About Us</a>
          </div>

          <div className="space-y-3">
            <Link to="/safety-code" className="block text-primary hover:opacity-80">Online Safety Code</Link>
            <Link to="/safety-center" className="block text-primary hover:opacity-80">Safety Center</Link>
            <a href="#" className="block text-primary hover:opacity-80">Open Source Licenses</a>
            <Link to="/privacy" className="block text-primary hover:opacity-80">Privacy Policy</Link>
            <a href="#" className="block text-primary hover:opacity-80">Terms and Conditions</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-border/40 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} GoMilap. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
