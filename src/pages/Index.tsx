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
            <nav className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5" />

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

      {/* DOWNLOAD */}
      <section className="relative px-6 py-24 overflow-hidden">
        {/* Backdrop: dark gradient with brand wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(270_60%_12%)] via-[hsl(280_50%_8%)] to-black" />
        <div className="absolute inset-0 bg-gradient-brand-soft opacity-30" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[820px] bg-gradient-brand opacity-30 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-white/80">Now available</span>
          </div>
          <h2 className="mt-5 font-display font-bold text-4xl md:text-6xl text-white leading-tight">
            Download <span className="text-gradient-brand">GoMilap</span> Now
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
            Available on App Store and Google Play. Real connections, anywhere you go.
          </p>

          {/* Store badges */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* App Store */}
            <a
              href="#"
              aria-label="Download on the App Store"
              className="group relative inline-flex items-center gap-3 rounded-2xl bg-black border border-white/15 px-6 py-3.5 min-w-[210px] shadow-2xl transition-all duration-300 hover:scale-[1.04] hover:border-primary/60 hover:shadow-glow"
            >
              <span className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md" />
              <svg viewBox="0 0 24 24" className="relative h-8 w-8 fill-white" aria-hidden="true">
                <path d="M17.05 12.04c-.02-2.18 1.78-3.23 1.86-3.28-1.01-1.48-2.59-1.69-3.15-1.71-1.34-.14-2.62.79-3.31.79-.69 0-1.74-.77-2.86-.75-1.47.02-2.83.85-3.59 2.17-1.53 2.65-.39 6.57 1.1 8.72.73 1.05 1.6 2.23 2.74 2.19 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.83-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.32-3.51zM14.94 5.49c.6-.74 1.01-1.75.9-2.76-.87.04-1.95.59-2.57 1.31-.55.64-1.04 1.69-.91 2.68.97.07 1.97-.49 2.58-1.23z"/>
              </svg>
              <div className="relative text-left leading-tight">
                <p className="text-[10px] uppercase tracking-wider text-white/70">Download on the</p>
                <p className="text-lg font-semibold text-white -mt-0.5">App Store</p>
              </div>
            </a>

            {/* Google Play */}
            <a
              href="#"
              aria-label="Get it on Google Play"
              className="group relative inline-flex items-center gap-3 rounded-2xl bg-black border border-white/15 px-6 py-3.5 min-w-[210px] shadow-2xl transition-all duration-300 hover:scale-[1.04] hover:border-primary/60 hover:shadow-glow"
            >
              <span className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md" />
              <svg viewBox="0 0 24 24" className="relative h-8 w-8" aria-hidden="true">
                <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l.1.1L13 12.1v-.2L3.7 2.3h-.1z" fill="#00C4FF"/>
                <path d="M16.3 15.2 13 12.1v-.2L16.3 8.8l.1.1 3.9 2.2c1.1.6 1.1 1.7 0 2.3l-3.9 2.2-.1-.4z" fill="#FFD400"/>
                <path d="M16.4 15.1 13 12 3.6 21.7c.4.4 1 .4 1.7.1l11.1-6.7" fill="#FF3A44"/>
                <path d="M16.4 8.9 5.3 2.2c-.7-.4-1.3-.3-1.7.1L13 12l3.4-3.1z" fill="#00E676"/>
              </svg>
              <div className="relative text-left leading-tight">
                <p className="text-[10px] uppercase tracking-wider text-white/70">Get it on</p>
                <p className="text-lg font-semibold text-white -mt-0.5">Google Play</p>
              </div>
            </a>
          </div>

          {/* Mini trust row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/60">
            <span className="flex items-center gap-2"><span className="text-yellow-400">★★★★★</span> Loved by users</span>
            <span className="hidden sm:inline">·</span>
            <span>Free to download</span>
            <span className="hidden sm:inline">·</span>
            <span>India · Global</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-16 border-t border-border/60">
        <div className="max-w-6xl mx-auto grid gap-10 text-sm md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-5">
            <Logo />
            <p className="text-muted-foreground max-w-xs">
              Safe Platform · Real People · Trusted Connections
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="X (formerly Twitter)" className="hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
          </div>

          <div className="space-y-3">
            <Link to="/safety" className="block text-primary hover:opacity-80">Safety Policy &amp; Community Guidelines</Link>
            <Link to="/compliance" className="block text-primary hover:opacity-80">Compliance</Link>
            <Link to="/health-data-privacy" className="block text-primary hover:opacity-80">Consumer Health Data Privacy</Link>
            <Link to="/about" className="block text-primary hover:opacity-80">About Us</Link>
          </div>

          <div className="space-y-3">
            <Link to="/safety-code" className="block text-primary hover:opacity-80">Online Safety Code</Link>
            <Link to="/safety-center" className="block text-primary hover:opacity-80">Safety Center</Link>
            <Link to="/open-source-licenses" className="block text-primary hover:opacity-80">Open Source Licenses</Link>
            <Link to="/privacy" className="block text-primary hover:opacity-80">Privacy Policy</Link>
            <Link to="/terms" className="block text-primary hover:opacity-80">Terms and Conditions</Link>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-border/40 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} GoMilap. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
