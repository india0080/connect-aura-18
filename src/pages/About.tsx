import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  Mail,
  MessageCircle,
  Phone,
  Video,
  Radio,
  Mic,
  ShieldCheck,
  Sparkles,
  Users,
  Globe2,
  Lightbulb,
  Lock,
  Handshake,
  Eye,
  Target,
  Compass,
  CheckCircle2,
  ChevronRight,
  Flag,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">{eyebrow}</p>
      <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">{title}</h2>
      {description && <p className="mt-4 text-muted-foreground text-lg">{description}</p>}
    </div>
  );
}

const FEATURES = [
  { icon: MessageCircle, title: 'Chat instantly', desc: 'Start conversations with new people in seconds.' },
  { icon: Phone, title: 'Voice calls', desc: 'Talk without ever sharing your number.' },
  { icon: Video, title: 'Secure video calls', desc: 'Connect face-to-face with confidence.' },
  { icon: Radio, title: 'Go live', desc: 'Share your talent with a real audience.' },
  { icon: Mic, title: 'Host rooms', desc: 'Build your own community and lead the conversation.' },
  { icon: Sparkles, title: 'Smart Discover', desc: 'Find people who actually match your vibe.' },
];

const DIFFERENTIATORS = [
  { icon: Sparkles, title: 'All-in-one platform', desc: 'Chat, calls, live and rooms in a single experience.' },
  { icon: Globe2, title: 'Built for India', desc: 'Designed around local needs, languages and culture.' },
  { icon: ShieldCheck, title: 'Safety-first', desc: 'Strong moderation, user controls and 18+ verification.' },
  { icon: Heart, title: 'Simple & friendly', desc: 'Clean, modern UI that anyone can use.' },
];

const VALUES = [
  { icon: Lock, label: 'Safety First', color: 'from-rose-500/20 to-pink-500/10' },
  { icon: Handshake, label: 'Authentic Connections', color: 'from-violet-500/20 to-fuchsia-500/10' },
  { icon: Globe2, label: 'Inclusivity', color: 'from-sky-500/20 to-cyan-500/10' },
  { icon: Lightbulb, label: 'Innovation', color: 'from-amber-500/20 to-orange-500/10' },
  { icon: Flag, label: 'India First', color: 'from-emerald-500/20 to-teal-500/10' },
];

const PROMISES = [
  'Protecting your privacy',
  'Providing a safe environment',
  'Taking action against misuse',
  'Continuously improving our platform',
];

const SAFETY_PILLARS = [
  { icon: ShieldCheck, title: 'Account verification', desc: 'Every user is verified before they can connect.' },
  { icon: Eye, title: 'AI + human moderation', desc: 'Around-the-clock review of activity and reports.' },
  { icon: Flag, title: 'Easy report & block', desc: 'One tap to remove anyone from your experience.' },
  { icon: Lock, title: 'Strict 18+ policy', desc: 'Adults only — verified and enforced.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="About GoMilap — India's Modern Social Network"
        description="GoMilap helps people create real, safe and meaningful connections through chat, voice, video and live streaming."
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-brand-soft opacity-50" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[120%] bg-gradient-brand opacity-10 blur-3xl rounded-full" />
        <div className="absolute top-20 right-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-brand items-center justify-center shadow-glow mb-6">
            <Heart className="h-8 w-8 text-primary-foreground" />
          </div>
          <p className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            About GoMilap
          </p>
          <h1 className="font-display font-bold text-4xl md:text-7xl leading-tight">
            India's Modern <br className="hidden md:block" />
            <span className="text-gradient-brand">Social Network</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect • Chat • Call • Stream — all in one safe, friendly platform built for real people and
            real conversations.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-brand text-primary-foreground rounded-full shadow-glow">
              <Link to="/signup">
                Join GoMilap
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href="#mission">Our story</a>
            </Button>
          </div>

          {/* Stats / chips */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '5+', label: 'Ways to connect' },
              { value: '24/7', label: 'Moderation' },
              { value: '18+', label: 'Verified users' },
              { value: '🇮🇳', label: 'Built in India' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl glass border border-border/60 p-4">
                <p className="font-display font-bold text-2xl md:text-3xl text-gradient-brand">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="px-6 py-20 md:py-28 border-b border-border/60">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Who we are</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-5">
              A platform built for <span className="text-gradient-brand">real connections</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              GoMilap is a next-generation social networking platform built to help people create real, safe
              and meaningful connections in today's digital world.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mt-4">
              We combine chat, voice calls, video calls and live streaming into one powerful platform — so
              you can connect the way you want.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-brand opacity-20 blur-3xl rounded-full" />
            <div className="relative grid grid-cols-2 gap-3">
              {[MessageCircle, Phone, Video, Radio].map((Icon, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-3xl glass border border-border/60 flex items-center justify-center shadow-elegant ${
                    i % 2 === 1 ? 'translate-y-6' : ''
                  }`}
                >
                  <div className="h-14 w-14 rounded-2xl bg-gradient-brand-soft flex items-center justify-center">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="px-6 py-20 md:py-28 border-b border-border/60">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <Card className="p-8 md:p-10 hover:shadow-elegant transition-shadow group">
            <CardContent className="p-0">
              <div className="h-14 w-14 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-7 w-7 text-primary-foreground" />
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Our Mission</p>
              <h3 className="font-display font-bold text-2xl md:text-3xl mb-4">
                Connect people through trust
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To connect people through authentic, safe and meaningful interactions — powered by technology
                and trust.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8 md:p-10 hover:shadow-elegant transition-shadow group">
            <CardContent className="p-0">
              <div className="h-14 w-14 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow mb-6 group-hover:scale-110 transition-transform">
                <Compass className="h-7 w-7 text-primary-foreground" />
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Our Vision</p>
              <h3 className="font-display font-bold text-2xl md:text-3xl mb-4">
                India's most trusted platform
              </h3>
              <ul className="space-y-2.5 text-muted-foreground text-lg">
                {['Every connection feels real', 'Every user feels safe', 'Every voice is heard'].map((v) => (
                  <li key={v} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What you can do */}
      <section className="px-6 py-20 md:py-28 border-b border-border/60">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            eyebrow="What you can do"
            title={<>One app, <span className="text-gradient-brand">every way to connect</span></>}
            description="From a quick hello to going live in front of thousands — GoMilap fits every kind of conversation."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="p-6 hover:shadow-elegant hover:-translate-y-1 transition-all group">
                <CardContent className="p-0">
                  <div className="h-12 w-12 rounded-xl bg-gradient-brand-soft flex items-center justify-center mb-4 group-hover:bg-gradient-brand group-hover:shadow-glow transition-all">
                    <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why different */}
      <section className="px-6 py-20 md:py-28 border-b border-border/60 bg-gradient-brand-soft/40">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            eyebrow="Why GoMilap"
            title={<>Different by <span className="text-gradient-brand">design</span></>}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DIFFERENTIATORS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl glass border border-border/60 p-6 text-center hover:shadow-glow transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-brand mx-auto flex items-center justify-center shadow-glow mb-4">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="px-6 py-20 md:py-28 border-b border-border/60">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            eyebrow="Safety commitment"
            title={<>Your safety is our <span className="text-gradient-brand">top priority</span></>}
            description="We follow a safety-first, privacy-by-design approach to protect every user, every day."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {SAFETY_PILLARS.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="p-6">
                <CardContent className="p-0">
                  <div className="h-11 w-11 rounded-xl bg-gradient-brand-soft flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-base mb-1.5">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/safety-code">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Online Safety Code
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/safety-center">
                <Flag className="h-4 w-4 mr-2" />
                Safety Center
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/privacy">
                <Lock className="h-4 w-4 mr-2" />
                Privacy Policy
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-20 md:py-28 border-b border-border/60">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            eyebrow="Our values"
            title={<>What we <span className="text-gradient-brand">stand for</span></>}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {VALUES.map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className={`rounded-2xl border border-border/60 p-6 text-center bg-gradient-to-br ${color} hover:scale-105 transition-transform`}
              >
                <div className="h-12 w-12 rounded-xl bg-background/60 backdrop-blur mx-auto flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <p className="font-display font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="px-6 py-20 md:py-28 border-b border-border/60">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            eyebrow="Our promise"
            title={<>Committed to <span className="text-gradient-brand">you</span></>}
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {PROMISES.map((p) => (
              <div
                key={p}
                className="flex items-center gap-3 p-5 rounded-2xl glass border border-border/60"
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0 shadow-glow">
                  <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <p className="font-medium">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="px-6 py-20 md:py-28 border-b border-border/60">
        <div className="max-w-5xl mx-auto">
          <Card className="relative overflow-hidden p-10 md:p-16 text-center bg-gradient-brand-soft border-primary/20">
            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
            <CardContent className="relative p-0 space-y-5">
              <div className="inline-flex h-14 w-14 rounded-2xl bg-gradient-brand items-center justify-center shadow-glow">
                <Users className="h-7 w-7 text-primary-foreground" />
              </div>
              <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">
                Join <span className="text-gradient-brand">GoMilap</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                For people who want more than just an app — real connections, real conversations and a safe
                space online.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <Button asChild size="lg" className="bg-gradient-brand text-primary-foreground rounded-full shadow-glow">
                  <Link to="/signup">Create your account</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link to="/login">I already have one</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            eyebrow="Contact us"
            title={<>We're <span className="text-gradient-brand">here to help</span></>}
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-6 hover:shadow-elegant transition-shadow">
              <CardContent className="p-0 flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-brand-soft flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold mb-1">Support</p>
                  <a href="mailto:support@gomilap.com" className="text-primary font-medium hover:underline">
                    support@gomilap.com
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">For all general inquiries</p>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-elegant transition-shadow">
              <CardContent className="p-0 flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-brand-soft flex items-center justify-center shrink-0">
                  <Flag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold mb-1">Grievance Redressal</p>
                  <a href="mailto:grievance@gomilap.com" className="text-primary font-medium hover:underline">
                    grievance@gomilap.com
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">Grievance Officer (India)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tagline */}
          <div className="mt-16 text-center">
            <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
            <p className="font-display font-bold text-2xl md:text-3xl">
              <span className="text-gradient-brand">GoMilap</span>
            </p>
            <p className="text-muted-foreground mt-2">
              Safe Platform · Real People · Trusted Connections
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
