import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Ban,
  Flag,
  EyeOff,
  Lock,
  AlertTriangle,
  Phone,
  Mail,
  Siren,
  CheckCircle2,
  XCircle,
  MessageSquareWarning,
  Heart,
  LifeBuoy,
  BookOpen,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const QUICK_TOOLS = [
  {
    icon: Ban,
    title: 'Block a User',
    desc: 'Instantly stop someone from contacting or seeing your profile.',
    steps: ['Open the chat or profile', 'Tap the menu (⋮)', 'Select "Block user"'],
  },
  {
    icon: Flag,
    title: 'Report a Profile',
    desc: 'Flag fake, abusive, or suspicious profiles for moderator review.',
    steps: ['Open the user\'s profile', 'Tap "Report"', 'Choose a reason and submit'],
  },
  {
    icon: MessageSquareWarning,
    title: 'Report a Message',
    desc: 'Report harassment, scams, or inappropriate content in chat.',
    steps: ['Long-press the message', 'Tap "Report"', 'Add details (optional)'],
  },
  {
    icon: EyeOff,
    title: 'Hide Your Profile',
    desc: 'Take a break — your profile won\'t appear in Discover.',
    steps: ['Go to Profile → Settings', 'Toggle "Hide my profile"', 'Reactivate any time'],
  },
  {
    icon: Lock,
    title: 'Privacy Controls',
    desc: 'Manage who can message you, see your photos, and find you.',
    steps: ['Go to Profile → Privacy', 'Adjust visibility settings', 'Save changes'],
  },
  {
    icon: Heart,
    title: 'Unmatch',
    desc: 'Remove a connection and delete the chat history on both sides.',
    steps: ['Open the chat', 'Tap menu (⋮)', 'Select "Unmatch"'],
  },
];

const SCAM_RED_FLAGS = [
  'Asks for money, gift cards, or crypto — for any reason',
  'Pushes you to move chat off GoMilap quickly (WhatsApp, Telegram)',
  'Profile photos look like a model or celebrity',
  'Claims to be overseas, military, or "stuck" abroad',
  'Professes love within days of matching',
  'Refuses to video call or always has an excuse',
  'Sends suspicious links or asks for OTP / passwords',
  'Pressures you into sharing intimate photos',
];

const SAFE_HABITS = [
  'Keep all conversations on GoMilap until you trust the person',
  'Always do a video call before meeting in person',
  'Meet in a public place for the first few dates',
  'Tell a friend where you\'re going and share your live location',
  'Never share OTPs, bank details, or passwords',
  'Reverse-image-search profile photos if something feels off',
  'Trust your instincts — if it feels wrong, it probably is',
];

export default function SafetyCenter() {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Safety Center — GoMilap"
        description="Quick access to block & report tools, scam prevention tips, and emergency guidance for staying safe on GoMilap."
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <Button asChild variant="ghost" size="sm">
            <Link to="/"><ArrowLeft className="h-4 w-4 mr-2" />Back to home</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 md:py-24 border-b border-border/60 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-brand items-center justify-center shadow-glow mb-6">
            <LifeBuoy className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight">
            <span className="text-gradient-brand">Safety Center</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Tools, tips, and emergency guidance to help you stay safe while connecting on GoMilap.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-brand text-primary-foreground rounded-full shadow-glow">
              <a href="#report">Report someone</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href="#emergency">Emergency help</a>
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        {/* Quick Safety Tools */}
        <section id="report">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Quick Tools</p>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">Block, report & control</h2>
          <p className="text-muted-foreground max-w-2xl mb-8">
            You're always in control. Use these built-in tools any time you feel unsafe or uncomfortable.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {QUICK_TOOLS.map(({ icon: Icon, title, desc, steps }) => (
              <Card key={title} className="hover:border-primary/40 transition-colors">
                <CardContent className="p-6">
                  <div className="h-11 w-11 rounded-xl bg-gradient-brand-soft flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-1.5">{title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{desc}</p>
                  <ol className="space-y-1.5 text-sm">
                    {steps.map((s, i) => (
                      <li key={i} className="flex gap-2.5 text-foreground/80">
                        <span className="h-5 w-5 shrink-0 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 border-primary/30 bg-card/50">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Need to report something urgent?</p>
                  <p className="text-sm text-muted-foreground">Email our trust & safety team directly. We respond within 24 hours.</p>
                </div>
              </div>
              <Button asChild className="bg-gradient-brand text-primary-foreground rounded-full">
                <a href="mailto:support@gomilap.com">support@gomilap.com</a>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Scam Prevention */}
        <section id="scams">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="h-6 w-6 text-primary" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Scam Prevention</p>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">Spot the red flags</h2>
          <p className="text-muted-foreground max-w-2xl mb-8">
            Romance scammers are skilled manipulators. Knowing the patterns is your best defense.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="h-5 w-5 text-destructive" />
                  <h3 className="font-display font-semibold text-lg">Red flags to watch for</h3>
                </div>
                <ul className="space-y-2.5">
                  {SCAM_RED_FLAGS.map((tip) => (
                    <li key={tip} className="flex gap-2.5 text-sm text-foreground/85">
                      <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-gradient-brand-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="font-display font-semibold text-lg">Safe dating habits</h3>
                </div>
                <ul className="space-y-2.5">
                  {SAFE_HABITS.map((tip) => (
                    <li key={tip} className="flex gap-2.5 text-sm text-foreground/85">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Emergency Guidance */}
        <section id="emergency">
          <div className="flex items-center gap-3 mb-3">
            <Siren className="h-6 w-6 text-destructive" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Emergency Guidance</p>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">If you're in danger</h2>
          <p className="text-muted-foreground max-w-2xl mb-8">
            GoMilap is not an emergency service. If you or someone else is at risk, contact local authorities first.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            <Card className="border-destructive/40 bg-destructive/5">
              <CardContent className="p-6 text-center">
                <Phone className="h-7 w-7 text-destructive mx-auto mb-3" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">India Emergency</p>
                <p className="font-display font-bold text-3xl text-foreground">112</p>
                <p className="text-xs text-muted-foreground mt-1">All-in-one (Police / Fire / Medical)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-7 w-7 text-primary mx-auto mb-3" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Women Helpline</p>
                <p className="font-display font-bold text-3xl text-foreground">1091</p>
                <p className="text-xs text-muted-foreground mt-1">24×7 across India</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-7 w-7 text-primary mx-auto mb-3" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Cyber Crime</p>
                <p className="font-display font-bold text-3xl text-foreground">1930</p>
                <p className="text-xs text-muted-foreground mt-1">Report online fraud & scams</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                What to do right now
              </h3>
              <ol className="space-y-2.5 text-sm text-foreground/85">
                {[
                  'Get to a safe place — leave the location if needed.',
                  'Call your local emergency number (112 in India).',
                  'Save evidence: screenshots, messages, photos, and usernames.',
                  'Block the user inside the GoMilap app.',
                  'Report the user to GoMilap at support@gomilap.com.',
                  'Reach out to a trusted friend or family member.',
                ].map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="h-6 w-6 shrink-0 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Learn more */}
        <section className="grid md:grid-cols-2 gap-5">
          <Link to="/safety-code" className="group">
            <Card className="h-full hover:border-primary/40 transition-colors">
              <CardContent className="p-6">
                <BookOpen className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-display font-semibold text-lg mb-1">Online Safety Code</h3>
                <p className="text-sm text-muted-foreground">Read our full safety code & compliance statement.</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/safety" className="group">
            <Card className="h-full hover:border-primary/40 transition-colors">
              <CardContent className="p-6">
                <ShieldCheck className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-display font-semibold text-lg mb-1">Community Guidelines</h3>
                <p className="text-sm text-muted-foreground">Learn what's expected from every member of GoMilap.</p>
              </CardContent>
            </Card>
          </Link>
        </section>
      </div>
    </div>
  );
}
