import { Link } from 'react-router-dom';
import {
  ArrowLeft, HeartPulse, Mail, ShieldCheck, Database, EyeOff, Share2, Lock,
  UserCheck, Clock, UserCog, AlertTriangle, BadgeCheck, Scale, RefreshCw, LifeBuoy, Sparkles, CheckCircle2, XCircle,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const TOC = [
  { id: 'introduction', label: '1. Introduction' },
  { id: 'what-is', label: '2. What is Consumer Health Data' },
  { id: 'collect', label: '3. What We Collect' },
  { id: 'not-collect', label: '4. What We DO NOT Collect' },
  { id: 'use', label: '5. How We Use It' },
  { id: 'sharing', label: '6. Data Sharing' },
  { id: 'security', label: '7. Data Security' },
  { id: 'rights', label: '8. Your Rights' },
  { id: 'retention', label: '9. Data Retention' },
  { id: 'responsibility', label: '10. User Responsibility' },
  { id: 'liability', label: '11. Limited Liability' },
  { id: 'age', label: '12. Age Restriction' },
  { id: 'compliance', label: '13. Compliance' },
  { id: 'changes', label: '14. Changes to Policy' },
  { id: 'contact', label: '15. Contact & Grievance' },
];

function H2({ id, icon: Icon, children }: { id: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-display font-bold text-3xl md:text-4xl mt-16 mb-5 scroll-mt-24 flex items-center gap-3">
      <span className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
        <Icon className="h-5 w-5 text-primary-foreground" />
      </span>
      {children}
    </h2>
  );
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display font-semibold text-xl md:text-2xl mt-8 mb-3">{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>;
}
function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground mb-4 marker:text-primary">{children}</ul>;
}

export default function HealthDataPrivacy() {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Consumer Health Data Privacy — GoMilap"
        description="How GoMilap handles consumer health data: minimum collection, no selling, full user control, and strong security."
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
      <section className="px-6 py-16 md:py-20 border-b border-border/60 bg-card/30">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-brand items-center justify-center shadow-glow mb-6">
            <HeartPulse className="h-8 w-8 text-primary-foreground" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Version 3.0 · Last Updated June 2026</p>
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight">
            💜 Consumer <span className="text-gradient-brand">Health Data Privacy</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            GoMilap is a social networking and dating platform — not a healthcare service. Here's exactly how we handle any health-related information you choose to share.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-brand text-primary-foreground rounded-full shadow-glow">
              <a href="mailto:support@gomilap.com">Contact support</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/privacy">View Privacy Policy</Link>
            </Button>
          </div>

          {/* Trust pills */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { icon: Database, label: 'Minimum data only' },
              { icon: XCircle, label: 'Never sold' },
              { icon: Lock, label: 'Encrypted (SSL/TLS)' },
              { icon: UserCog, label: 'Full user control' },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card/60 px-4 py-3">
                <p.icon className="h-4 w-4 text-primary shrink-0" />
                <span className="text-xs md:text-sm text-foreground/90 text-left">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-[260px_1fr] gap-12">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">Contents</p>
            <nav className="space-y-1.5 text-sm">
              {TOC.map((t) => (
                <a key={t.id} href={`#${t.id}`} className="block px-3 py-2 rounded-lg hover:bg-card hover:text-primary transition-colors text-muted-foreground">
                  {t.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <article className="max-w-3xl">
          <H2 id="introduction" icon={Sparkles}>1. Introduction</H2>
          <P>GoMilap (“we”, “our”, “us”) respects your privacy and is committed to protecting any health-related information you may choose to share while using our platform.</P>
          <P>This Policy explains how we handle <strong className="text-foreground">consumer health data</strong> on GoMilap.</P>
          <Card className="border-primary/30 bg-gradient-brand-soft my-4">
            <CardContent className="p-5 flex gap-3">
              <HeartPulse className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90">👉 GoMilap is a <strong>social networking and dating platform</strong>, not a healthcare service.</p>
            </CardContent>
          </Card>

          <H2 id="what-is" icon={HeartPulse}>2. What is Consumer Health Data</H2>
          <P>Consumer Health Data includes any information related to your physical, mental, or personal identity that you voluntarily share, such as:</P>
          <UL>
            <li>Gender identity</li>
            <li>Sexual orientation</li>
            <li>Relationship preferences</li>
            <li>Any health-related information shared in bio or chat</li>
          </UL>

          <H2 id="collect" icon={Database}>3. What Health Data We Collect</H2>

          <H3>✅ 3.1 Minimal Data Only</H3>
          <P>We collect only what is necessary:</P>
          <UL>
            <li>Gender identity (profile setup)</li>
            <li>Matching preferences (for better suggestions)</li>
          </UL>

          <H3>⚠️ 3.2 Optional & Voluntary Data</H3>
          <P>You may choose to share:</P>
          <UL>
            <li>Personal information in bio</li>
            <li>Conversations in chat</li>
          </UL>
          <P>👉 This is completely <strong className="text-foreground">your choice</strong>.</P>

          <H3>🔐 3.3 Verification Data (With Consent)</H3>
          <UL>
            <li>Face verification (for age check)</li>
            <li>ID verification (optional)</li>
          </UL>
          <P>👉 Used only for verification and <strong className="text-foreground">not stored permanently</strong>.</P>

          <H2 id="not-collect" icon={EyeOff}>4. What We DO NOT Collect</H2>
          <P>GoMilap does NOT collect:</P>
          <div className="grid sm:grid-cols-2 gap-3 my-4">
            {[
              'Medical records or prescriptions',
              'Hospital or treatment history',
              'Test reports (HIV, STD, etc.)',
              'Mental health records',
              'Genetic or biometric health data',
            ].map((item) => (
              <Card key={item} className="border-destructive/20">
                <CardContent className="p-4 flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90">{item}</span>
                </CardContent>
              </Card>
            ))}
          </div>
          <P>👉 You are not required to share any medical information to use GoMilap.</P>

          <H2 id="use" icon={ShieldCheck}>5. How We Use Health Data</H2>
          <P>We use limited health-related data to:</P>
          <UL>
            <li>Improve matching experience</li>
            <li>Show relevant profiles</li>
            <li>Ensure platform safety</li>
            <li>Prevent misuse and fake accounts</li>
          </UL>
          <P>👉 We do <strong className="text-foreground">NOT</strong> use health data for advertising or selling.</P>

          <H2 id="sharing" icon={Share2}>6. Data Sharing</H2>
          <P>We may share limited data only in these cases:</P>
          <div className="grid md:grid-cols-3 gap-4 my-6">
            {[
              { title: 'With Other Users', desc: 'Your profile information (based on your settings).' },
              { title: 'With Service Providers', desc: 'For hosting, security, and app functionality.' },
              { title: 'With Legal Authorities', desc: 'Only when required by law.' },
            ].map((c) => (
              <Card key={c.title}>
                <CardContent className="p-5">
                  <CheckCircle2 className="h-5 w-5 text-primary mb-2" />
                  <h4 className="font-display font-semibold mb-1">{c.title}</h4>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <P>👉 We <strong className="text-foreground">NEVER sell</strong> or misuse your health data.</P>

          <H2 id="security" icon={Lock}>7. Data Security</H2>
          <P>We protect your data using:</P>
          <UL>
            <li>Encryption (SSL/TLS)</li>
            <li>Secure servers</li>
            <li>Limited access controls</li>
          </UL>
          <P>👉 Verification data is temporary and not stored permanently.</P>

          <H2 id="rights" icon={UserCog}>8. Your Rights</H2>
          <P>You have full control over your data:</P>
          <div className="grid sm:grid-cols-2 gap-3 my-4">
            {['Access your data', 'Update your profile', 'Delete your account', 'Withdraw consent'].map((r) => (
              <div key={r} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 px-4 py-3">
                <BadgeCheck className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-foreground/90">{r}</span>
              </div>
            ))}
          </div>
          <P>📧 Request via: <a href="mailto:support@gomilap.com" className="text-primary hover:underline">support@gomilap.com</a></P>

          <H2 id="retention" icon={Clock}>9. Data Retention</H2>
          <div className="grid sm:grid-cols-2 gap-4 my-4">
            <Card><CardContent className="p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Active account</p>
              <p className="font-display font-semibold">Data stored securely</p>
            </CardContent></Card>
            <Card><CardContent className="p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Account deleted</p>
              <p className="font-display font-semibold">Removed within 30 days</p>
            </CardContent></Card>
          </div>

          <H2 id="responsibility" icon={UserCheck}>10. User Responsibility</H2>
          <P>You control what you share.</P>
          <P>👉 GoMilap is not responsible for:</P>
          <UL>
            <li>Information you share in chats</li>
            <li>Data shared voluntarily with other users</li>
          </UL>
          <P>Please share personal or health-related information carefully.</P>

          <H2 id="liability" icon={AlertTriangle}>11. Limited Liability</H2>
          <P>GoMilap provides a platform and safety tools, but:</P>
          <UL>
            <li>We do not control user behavior</li>
            <li>We are not responsible for misuse of shared information</li>
            <li>We do not provide medical advice</li>
          </UL>
          <Card className="border-destructive/40 bg-destructive/5 my-4">
            <CardContent className="p-5 flex gap-3">
              <LifeBuoy className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90">👉 Always consult professionals for health-related matters.</p>
            </CardContent>
          </Card>

          <H2 id="age" icon={ShieldCheck}>12. Age Restriction</H2>
          <P>GoMilap is strictly <strong className="text-foreground">18+ only</strong>. Accounts violating this will be removed.</P>

          <H2 id="compliance" icon={Scale}>13. Compliance</H2>
          <P>GoMilap follows:</P>
          <UL>
            <li>Indian IT Act & applicable privacy rules</li>
            <li>Basic global privacy standards</li>
          </UL>

          <H2 id="changes" icon={RefreshCw}>14. Changes to Policy</H2>
          <P>We may update this policy. Users will be notified via app or email.</P>

          <H2 id="contact" icon={Mail}>15. Contact & Grievance</H2>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground mb-1">Support</p>
                <a href="mailto:support@gomilap.com" className="text-primary font-medium hover:underline">support@gomilap.com</a>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground mb-1">Grievance (India)</p>
                <a href="mailto:grievance@gomilap.com" className="text-primary font-medium hover:underline">grievance@gomilap.com</a>
              </CardContent>
            </Card>
          </div>
          <UL>
            <li>Response within 24 hours</li>
            <li>Resolution within 15 days</li>
          </UL>

          {/* Promise */}
          <Card className="mt-12 border-primary/40 bg-gradient-brand-soft overflow-hidden">
            <CardContent className="p-8 text-center">
              <HeartPulse className="h-8 w-8 mx-auto text-primary mb-3" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">💜 GoMilap Promise</p>
              <p className="font-display font-bold text-2xl md:text-3xl text-gradient-brand">
                Safe Connections. Real People. Trusted Platform.
              </p>
              <div className="mt-5 grid sm:grid-cols-2 gap-2 text-left text-sm">
                {[
                  'We collect minimum data only',
                  'We respect your privacy and choices',
                  'We NEVER sell your data',
                  'Your safety is our priority',
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-foreground/90">{t}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  );
}
