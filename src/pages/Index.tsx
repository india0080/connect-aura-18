import { Link } from 'react-router-dom';
import {
  MessageCircleHeart,
  Users,
  Sparkles,
  Facebook,
  Instagram,
  Video,
  Gift,
  Mic,
  Bot,
  Wallet,
  ShieldCheck,
  TrendingUp,
  IndianRupee,
  Heart,
  Star,
  ChevronDown,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useAuth } from '@/hooks/useAuth';
import { BLOG_POSTS } from '@/lib/blogPosts';
import heroImg from '@/assets/hero-friends.jpg';
import showcaseImg from '@/assets/app-showcase.jpg';

const FAQS = [
  {
    q: 'How can I earn money on GoMilap?',
    a: 'Become a Host on GoMilap and earn through live chats, video calls, voice rooms and virtual gifts from your fans. You can also start an Agency, onboard hosts, and earn a share of their lifetime earnings.',
  },
  {
    q: 'Is GoMilap free to download in India?',
    a: 'Yes. GoMilap is 100% free to download and sign up across India. Premium features and gifting are optional.',
  },
  {
    q: 'How much can a host earn on GoMilap?',
    a: 'Top hosts on live chat earning apps in India earn ₹30,000–₹2,00,000+ per month depending on hours, fan base and gifts received. Earnings are paid out weekly.',
  },
  {
    q: 'How does the Agency program work?',
    a: 'Agencies recruit and manage hosts on GoMilap. You get a dedicated dashboard, performance analytics and a recurring commission on every host you onboard.',
  },
  {
    q: 'Is GoMilap safe and verified?',
    a: 'Yes. We use KYC verification, AI moderation, 24×7 trust & safety team and strict community guidelines to keep the platform safe for everyone.',
  },
  {
    q: 'When and how do I get paid?',
    a: 'Earnings convert to coins → wallet balance, with weekly payouts to your Indian bank account or UPI. Minimum payout is ₹500.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Riya S.',
    role: 'Top Host · Mumbai',
    quote: '“Started part-time on GoMilap. Within 3 months I was earning more than my day job — just by chatting and going live.”',
    earnings: '₹84,000 / month',
  },
  {
    name: 'Arjun K.',
    role: 'Agency Owner · Delhi',
    quote: '“Best host agency earning app I’ve used. Clean dashboard, transparent payouts, real support. My agency now has 40+ hosts.”',
    earnings: '₹3.2L / month',
  },
  {
    name: 'Sneha P.',
    role: 'Live Host · Bengaluru',
    quote: '“The community is so warm. I made real friends and built an audience that genuinely supports me with gifts every night.”',
    earnings: '₹52,000 / month',
  },
];

export default function Index() {
  const { user } = useAuth();

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'GoMilap',
      url: 'https://gomilap.com',
      logo: 'https://gomilap.com/gomilap-icon.png',
      sameAs: ['https://www.instagram.com/gomilap', 'https://www.facebook.com/gomilap'],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@gomilap.com',
        contactType: 'customer support',
        areaServed: 'IN',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'GoMilap',
      url: 'https://gomilap.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://gomilap.com/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: 'GoMilap — Earn While You Connect',
      operatingSystem: 'ANDROID, IOS',
      applicationCategory: 'SocialNetworkingApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', ratingCount: '12480' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="GoMilap — Earn While You Connect | Live Chat Earning App in India"
        description="GoMilap is India's trusted live chat earning app. Chat, go live, send gifts and earn money as a Host or grow an Agency. Free to download. Weekly payouts."
        keywords="earn online India, live chat earning app, earn money from chatting, host agency earning app, GoMilap, video call earning app, live streaming earning India, work from home for women"
        ogImage="/gomilap-icon.png"
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="relative w-full">
        <div className="relative h-[92vh] min-h-[600px] w-full overflow-hidden">
          <img
            src={heroImg}
            alt="Indian creators chatting and going live to earn money on GoMilap"
            width={1920}
            height={1080}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70" />

          {/* Top nav */}
          <header className="relative z-10 px-6 py-5 flex items-center justify-between max-w-7xl mx-auto w-full">
            <Logo />
            <nav className="hidden md:flex items-center gap-6 text-sm text-foreground/80">
              <a href="#earn" className="hover:text-primary transition-colors">Earn</a>
              <a href="#features" className="hover:text-primary transition-colors">Features</a>
              <a href="#testimonials" className="hover:text-primary transition-colors">Stories</a>
              <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
            </nav>
            <div className="flex gap-2">
              {user ? (
                <Button asChild className="bg-gradient-brand text-primary-foreground rounded-full">
                  <Link to="/dashboard">Open app</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="secondary" className="rounded-full hidden sm:inline-flex">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild className="bg-gradient-brand text-primary-foreground rounded-full">
                    <Link to="/signup">Sign up free</Link>
                  </Button>
                </>
              )}
            </div>
          </header>

          {/* Hero content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 h-[calc(92vh-88px)] min-h-[510px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-6">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-foreground/80">India's #1 live chat earning app</span>
            </div>
            <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl max-w-4xl leading-[1.05] drop-shadow-lg">
              GoMilap — <span className="text-gradient-brand">Earn While You Connect</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-foreground/90 max-w-2xl">
              Chat, go live, and earn real money as a <strong>Host</strong> or build your own <strong>Agency</strong>.
              Join 1M+ Indians turning conversations into income.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="h-14 px-10 text-base bg-gradient-brand text-primary-foreground shadow-glow rounded-full hover:scale-105 transition-transform"
              >
                <Link to={user ? '/dashboard' : '/signup'}>Start earning free</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="h-14 px-10 text-base rounded-full">
                <a href="#earn">How it works</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-foreground/70">
              <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> 4.7 · 12K+ ratings</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" /> KYC verified</span>
              <span className="flex items-center gap-1.5"><IndianRupee className="h-4 w-4 text-primary" /> Weekly payouts</span>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="px-6 py-20 md:py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 md:gap-8">
          {[
            { icon: MessageCircleHeart, title: 'Real connections', text: 'Chat one-on-one or in voice rooms with people who match your vibe.' },
            { icon: Wallet, title: 'Real earnings', text: 'Earn coins from gifts on live streams. Weekly UPI & bank payouts.' },
            { icon: Users, title: 'Real community', text: 'Join 1M+ Indians on the most loved live chat earning app.' },
          ].map(({ icon: Icon, title, text }, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow mb-5">
                <Icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground max-w-xs">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW TO EARN */}
      <section id="earn" className="px-6 py-20 md:py-28 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">How to earn</p>
            <h2 className="mt-2 font-display font-bold text-4xl md:text-5xl leading-tight">
              Two ways to <span className="text-gradient-brand">earn money</span> from chatting
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Whether you love going live or running a team, GoMilap is built to reward you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Host */}
            <article className="relative rounded-3xl border border-border/60 bg-card p-8 hover:border-primary/50 transition-all hover:shadow-glow">
              <div className="h-14 w-14 rounded-2xl bg-gradient-brand flex items-center justify-center mb-5">
                <Mic className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">Become a Host</h3>
              <p className="text-muted-foreground mb-5">
                Go live, host voice rooms, take video calls and receive virtual gifts from your fans.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3"><TrendingUp className="h-5 w-5 text-primary shrink-0" /> Earn up to ₹2,00,000+ / month</li>
                <li className="flex gap-3"><Gift className="h-5 w-5 text-primary shrink-0" /> Convert gifts to coins → cash</li>
                <li className="flex gap-3"><IndianRupee className="h-5 w-5 text-primary shrink-0" /> Weekly UPI / bank payouts</li>
                <li className="flex gap-3"><ShieldCheck className="h-5 w-5 text-primary shrink-0" /> Free training & dedicated support</li>
              </ul>
              <Button asChild className="mt-7 w-full bg-gradient-brand text-primary-foreground rounded-full">
                <Link to="/signup">Apply as host</Link>
              </Button>
            </article>

            {/* Agency */}
            <article className="relative rounded-3xl border border-border/60 bg-card p-8 hover:border-primary/50 transition-all hover:shadow-glow">
              <div className="h-14 w-14 rounded-2xl bg-gradient-brand flex items-center justify-center mb-5">
                <Users className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">Start an Agency</h3>
              <p className="text-muted-foreground mb-5">
                Recruit hosts, manage their growth and earn a recurring share of their lifetime earnings.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3"><TrendingUp className="h-5 w-5 text-primary shrink-0" /> Recurring commission on every host</li>
                <li className="flex gap-3"><Sparkles className="h-5 w-5 text-primary shrink-0" /> Real-time analytics dashboard</li>
                <li className="flex gap-3"><ShieldCheck className="h-5 w-5 text-primary shrink-0" /> Dedicated agency manager</li>
                <li className="flex gap-3"><Wallet className="h-5 w-5 text-primary shrink-0" /> Bonus rewards & monthly events</li>
              </ul>
              <Button asChild variant="secondary" className="mt-7 w-full rounded-full">
                <a href="mailto:agency@gomilap.com">Apply as agency</a>
              </Button>
            </article>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">Features</p>
            <h2 className="mt-2 font-display font-bold text-4xl md:text-5xl leading-tight">
              Everything you need to <span className="text-gradient-brand">connect & earn</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: MessageCircleHeart, title: 'Live Chat', text: 'Real-time 1:1 & group chat with rich emojis and voice notes.' },
              { icon: Video, title: 'Video Calls', text: 'HD video calls with low data usage, optimized for India.' },
              { icon: Gift, title: 'Virtual Gifts', text: 'Send and receive gifts that convert directly into earnings.' },
              { icon: Bot, title: 'AI Tools', text: 'Smart match, auto-translate and AI moderation for safer chats.' },
              { icon: Heart, title: 'Anonymous Confessions', text: 'Share what’s on your mind. Find an emotional community that gets you.' },
              { icon: ShieldCheck, title: 'Verified & Safe', text: 'KYC, 24×7 trust & safety, strict community guidelines.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="group rounded-2xl border border-border/60 bg-card/50 p-6 hover:bg-card hover:border-primary/40 transition-all">
                <Icon className="h-7 w-7 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display font-semibold text-lg mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP SHOWCASE */}
      <section className="px-6 py-20 md:py-28 bg-card/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">App preview</p>
            <h2 className="mt-2 font-display font-bold text-4xl md:text-5xl leading-tight">
              Built mobile-first for <span className="text-gradient-brand">Bharat</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Lightweight, fast and works smoothly even on 4G. Designed in India, for India — with regional language support and UPI-first payouts.
            </p>
            <ul className="mt-6 space-y-2 text-muted-foreground">
              <li>✓ Works on entry-level Android devices</li>
              <li>✓ Hindi, English, Tamil, Telugu, Bengali & more</li>
              <li>✓ Less than 30MB install size</li>
            </ul>
            <Button asChild size="lg" className="mt-8 h-12 px-8 bg-gradient-brand text-primary-foreground shadow-glow rounded-full">
              <Link to={user ? '/dashboard' : '/signup'}>Try GoMilap free</Link>
            </Button>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-brand-soft blur-3xl rounded-full" />
            <img
              src={showcaseImg}
              alt="GoMilap app screenshots showing live chat, video calls and virtual gifts"
              width={1280}
              height={960}
              loading="lazy"
              className="relative rounded-3xl glass-strong w-full"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">Stories</p>
            <h2 className="mt-2 font-display font-bold text-4xl md:text-5xl leading-tight">
              Loved by <span className="text-gradient-brand">creators across India</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border/60 bg-card p-6 flex flex-col gap-4">
                <div className="flex gap-0.5 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-foreground/90">{t.quote}</blockquote>
                <figcaption className="mt-auto">
                  <div className="font-display font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-sm text-primary font-semibold">
                    <IndianRupee className="h-3.5 w-3.5" /> {t.earnings.replace('₹', '')}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-20 md:py-28 bg-card/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">FAQ</p>
            <h2 className="mt-2 font-display font-bold text-4xl md:text-5xl leading-tight">
              Frequently asked <span className="text-gradient-brand">questions</span>
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border/60 bg-card rounded-xl px-5">
                <AccordionTrigger className="text-left font-display font-semibold text-base hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FROM THE BLOG */}
      <section id="blog" className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-widest">From the blog</p>
              <h2 className="mt-2 font-display font-bold text-3xl md:text-4xl leading-tight">
                Guides to <span className="text-gradient-brand">earn online in India</span>
              </h2>
            </div>
            <Button asChild variant="secondary" className="rounded-full">
              <Link to="/blog">View all posts</Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_POSTS.slice(0, 3).map((p) => (
              <article
                key={p.slug}
                className="group rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/50 hover:shadow-glow transition-all"
              >
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{p.category}</span>
                <h3 className="mt-3 font-display font-bold text-lg leading-snug">
                  <Link to={`/blog/${p.slug}`} className="hover:text-gradient-brand">{p.title}</Link>
                </h3>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                <Link to={`/blog/${p.slug}`} className="mt-4 inline-block text-sm text-primary font-semibold hover:underline">
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD / CTA */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(270_60%_12%)] via-[hsl(280_50%_8%)] to-black" />
        <div className="absolute inset-0 bg-gradient-brand-soft opacity-30" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[820px] bg-gradient-brand opacity-30 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-white/80">Now available</span>
          </div>
          <h2 className="mt-5 font-display font-bold text-4xl md:text-6xl text-white leading-tight">
            Download <span className="text-gradient-brand">GoMilap</span> & start earning
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
            Free on App Store and Google Play. Sign up in 30 seconds. Earn from day one.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              aria-label="Download GoMilap on the App Store"
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

            <a
              href="#"
              aria-label="Get GoMilap on Google Play"
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

          <div className="mt-6">
            <Button asChild size="lg" className="h-12 px-8 bg-gradient-brand text-primary-foreground shadow-glow rounded-full">
              <Link to={user ? '/dashboard' : '/signup'}>Or sign up on web →</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/60">
            <span className="flex items-center gap-2"><span className="text-yellow-400">★★★★★</span> 4.7 rated</span>
            <span className="hidden sm:inline">·</span>
            <span>Free to download</span>
            <span className="hidden sm:inline">·</span>
            <span>India · Global</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-16 border-t border-border/60">
        <div className="max-w-6xl mx-auto grid gap-10 text-sm md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <Logo />
            <p className="text-muted-foreground max-w-xs">
              India's trusted live chat earning app. Safe Platform · Real People · Trusted Connections.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="#" aria-label="GoMilap on Facebook" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" aria-label="GoMilap on Instagram" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="GoMilap on X (formerly Twitter)" className="hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-display font-semibold text-foreground mb-1">Company</h3>
            <Link to="/about" className="block text-muted-foreground hover:text-primary">About Us</Link>
            <a href="mailto:support@gomilap.com" className="block text-muted-foreground hover:text-primary">Contact</a>
            <a href="#earn" className="block text-muted-foreground hover:text-primary">Become a Host</a>
            <Link to="/blog" className="block text-muted-foreground hover:text-primary">Blog</Link>
            <a href="mailto:agency@gomilap.com" className="block text-muted-foreground hover:text-primary">Agency Program</a>
          </div>

          <div className="space-y-3">
            <h3 className="font-display font-semibold text-foreground mb-1">Safety</h3>
            <Link to="/safety" className="block text-muted-foreground hover:text-primary">Community Guidelines</Link>
            <Link to="/safety-code" className="block text-muted-foreground hover:text-primary">Online Safety Code</Link>
            <Link to="/safety-center" className="block text-muted-foreground hover:text-primary">Safety Center</Link>
            <Link to="/compliance" className="block text-muted-foreground hover:text-primary">Compliance</Link>
          </div>

          <div className="space-y-3">
            <h3 className="font-display font-semibold text-foreground mb-1">Legal</h3>
            <Link to="/privacy" className="block text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="block text-muted-foreground hover:text-primary">Terms &amp; Conditions</Link>
            <Link to="/refund-policy" className="block text-muted-foreground hover:text-primary">Refund Policy</Link>
            <Link to="/health-data-privacy" className="block text-muted-foreground hover:text-primary">Health Data Privacy</Link>
            <Link to="/open-source-licenses" className="block text-muted-foreground hover:text-primary">Open Source</Link>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-border/40 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} GoMilap. All rights reserved. Made with <Heart className="inline h-3 w-3 text-primary" /> in India.
        </div>
      </footer>
    </div>
  );
}
