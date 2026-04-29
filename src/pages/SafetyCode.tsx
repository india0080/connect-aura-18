import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Mail, AlertTriangle, Heart, CheckCircle2, Bot, Users, Megaphone, Siren, Ban, Scale, Globe, FileText, Sparkles } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TOC = [
  { id: 'introduction', label: '1. Introduction' },
  { id: 'scope', label: '2. Scope' },
  { id: 'principles', label: '3. Core Safety Principles' },
  { id: 'prohibited', label: '4. Prohibited Activities' },
  { id: 'compliance', label: '5. Compliance Statement' },
  { id: 'grievance', label: '6. Grievance Redressal' },
  { id: 'responsibility', label: '7. User Responsibility' },
  { id: 'contact', label: '8. Contact & Support' },
  { id: 'operational', label: '9. Operational Note' },
  { id: 'declaration', label: '10. Final Declaration' },
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

export default function SafetyCode() {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Online Safety Code & Compliance — GoMilap"
        description="GoMilap's Online Safety Code & Compliance Statement: a safety-first approach combining AI, user controls and legal compliance."
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
            <ShieldCheck className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight">
            🛡️ Online Safety Code <span className="text-gradient-brand">& Compliance</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            A safety-first approach combining AI technology, user controls, and legal compliance to protect our community.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-brand text-primary-foreground rounded-full shadow-glow">
              <Link to="/safety-center">Visit Safety Center</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href="mailto:support@gomilap.com">Contact support</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-[260px_1fr] gap-12">
        {/* TOC */}
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

        {/* Content */}
        <article className="max-w-3xl">
          <H2 id="introduction" icon={Heart}>1. Introduction</H2>
          <P>GoMilap is committed to providing a <strong className="text-foreground">safe, secure, and respectful platform</strong> for users to connect and interact.</P>
          <P>We follow a <strong className="text-foreground">safety-first approach</strong>, combining AI technology, user controls, and legal compliance to protect our community.</P>

          <H2 id="scope" icon={Globe}>2. Scope</H2>
          <P>This Safety Code applies to:</P>
          <UL>
            <li>All GoMilap users (India & Global)</li>
            <li>All features (Profiles, Chat, Voice, Video Calls)</li>
            <li>All interactions (messages, media, calls)</li>
            <li>All devices (mobile app & website)</li>
          </UL>

          <H2 id="principles" icon={ShieldCheck}>3. Core Safety Principles</H2>

          <H3>✅ 3.1 Age & Identity Safety</H3>
          <UL>
            <li>Platform strictly <strong className="text-foreground">18+ only</strong></li>
            <li>Phone OTP verification mandatory</li>
            <li>Suspicious accounts are reviewed and removed</li>
          </UL>

          <H3>🤖 3.2 Content Moderation</H3>
          <UL>
            <li>AI-based monitoring for spam, abuse, and harmful content</li>
            <li>Human moderation for sensitive cases</li>
            <li>Fast action system:</li>
          </UL>
          <Card className="my-4 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Severity</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell className="font-medium">Critical (violence, threats)</TableCell><TableCell>Immediate ban</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">High (harassment, abuse)</TableCell><TableCell>Warning / suspension</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Medium (spam, fake profiles)</TableCell><TableCell>Restriction</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Low</TableCell><TableCell>Monitoring</TableCell></TableRow>
              </TableBody>
            </Table>
          </Card>

          <H3>🛡️ 3.3 User Safety Tools</H3>
          <P>Users have full control:</P>
          <UL>
            <li>Block & Report users</li>
            <li>Unmatch & hide profile</li>
            <li>Privacy settings control</li>
            <li>Chat-level reporting</li>
          </UL>

          <H3>📢 3.4 Reporting System</H3>
          <P>Users can report anytime:</P>
          <P>👉 Email: <a href="mailto:support@gomilap.com" className="text-primary hover:underline">support@gomilap.com</a></P>
          <P>Process:</P>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground mb-4 marker:text-primary">
            <li>Report received</li>
            <li>Review by system/team</li>
            <li>Action taken</li>
            <li>User notified (if required)</li>
          </ol>

          <H3>🚨 3.5 Emergency Disclaimer</H3>
          <Card className="border-destructive/40 bg-destructive/5 my-4">
            <CardContent className="p-5 flex gap-3">
              <Siren className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90">
                GoMilap is <strong>not an emergency service</strong>. In case of immediate danger, contact local authorities (India: <strong>112</strong>).
              </p>
            </CardContent>
          </Card>

          <H2 id="prohibited" icon={Ban}>4. Prohibited Activities (Zero Tolerance)</H2>
          <P>The following are strictly prohibited:</P>
          <UL>
            <li>Fake profiles / impersonation</li>
            <li>Harassment or abuse</li>
            <li>Hate speech or threats</li>
            <li>Sexual or explicit content</li>
            <li>Fraud or scams</li>
            <li>Any activity involving minors</li>
          </UL>
          <P>👉 Violations may result in <strong className="text-foreground">permanent account ban + legal action</strong>.</P>

          <H2 id="compliance" icon={Scale}>5. Compliance Statement</H2>
          <P>GoMilap complies with applicable laws and platform policies:</P>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card>
              <CardContent className="p-5">
                <h4 className="font-display font-semibold mb-3">🇮🇳 India Compliance</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground marker:text-primary">
                  <li>IT Act, 2000</li>
                  <li>IT Rules, 2021</li>
                  <li>Grievance redressal system active</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h4 className="font-display font-semibold mb-3">🌍 Global Standards</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground marker:text-primary">
                  <li>GDPR principles (data protection)</li>
                  <li>App Store & Play Store policies</li>
                  <li>Online platform safety guidelines</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <H2 id="grievance" icon={FileText}>6. Grievance Redressal (India)</H2>
          <P>As per IT Rules, 2021:</P>
          <Card className="my-4">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><a href="mailto:grievance@gomilap.com" className="text-primary hover:underline">grievance@gomilap.com</a></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-primary" /> Response: within 24 hours</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-primary" /> Resolution: within 15 days</div>
            </CardContent>
          </Card>

          <H2 id="responsibility" icon={Users}>7. User Responsibility</H2>
          <P>Users are responsible for the information they share.</P>
          <P>GoMilap is not responsible for misuse of data shared voluntarily between users.</P>

          <H2 id="contact" icon={Mail}>8. Contact & Support</H2>
          <H3>📧 Single Support System</H3>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground mb-1">All queries (support, safety, privacy, reports)</p>
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
          <P>📌 Response Time:</P>
          <UL>
            <li>Within 24 hours</li>
            <li>Resolution within 7 days (general cases)</li>
          </UL>

          <H2 id="operational" icon={Bot}>9. Operational Note</H2>
          <P>GoMilap operates as a <strong className="text-foreground">digital-first platform</strong>. All communication and support are handled via email.</P>

          <H2 id="declaration" icon={Sparkles}>10. Final Declaration</H2>
          <P>GoMilap confirms that:</P>
          <UL>
            <li>User safety is our top priority</li>
            <li>All reports are handled confidentially</li>
            <li>We take strict action against violations</li>
            <li>We continuously improve safety systems</li>
          </UL>

          {/* Promise */}
          <Card className="mt-12 border-primary/40 bg-gradient-brand-soft overflow-hidden">
            <CardContent className="p-8 text-center">
              <Heart className="h-8 w-8 mx-auto text-primary mb-3" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">💜 GoMilap Promise</p>
              <p className="font-display font-bold text-2xl md:text-3xl text-gradient-brand">
                Safe Connections. Real People. Trusted Platform.
              </p>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  );
}
