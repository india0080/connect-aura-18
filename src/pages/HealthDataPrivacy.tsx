import { Link } from 'react-router-dom';
import {
  ArrowLeft, HeartPulse, Mail, ShieldCheck, Database, EyeOff, Share2, Lock,
  UserCheck, Clock, UserCog, AlertTriangle, BadgeCheck, Scale, RefreshCw, LifeBuoy,
  Sparkles, CheckCircle2, XCircle, Phone, Building2, Baby, FileWarning, FileQuestion, Globe,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TOC = [
  { id: 'what', label: '1. What Is Health Data?' },
  { id: 'collect', label: '2. What We Collect — & Don\'t' },
  { id: 'why', label: '3. Why We Collect It' },
  { id: 'use', label: '4. How We Use Your Data' },
  { id: 'who', label: '5. Who Can See Your Data' },
  { id: 'protect', label: '6. How We Protect It' },
  { id: 'rights', label: '7. Your Rights' },
  { id: 'retention', label: '8. How Long We Keep It' },
  { id: 'children', label: '9. Children\'s Data' },
  { id: 'responsibility', label: '10. Your Responsibility' },
  { id: 'compliance', label: '11. Compliance' },
  { id: 'breach', label: '12. Data Breach Response' },
  { id: 'changes', label: '13. Changes to This Policy' },
  { id: 'contact', label: '14. Contact Us' },
  { id: 'quick', label: 'Quick Reference' },
  { id: 'declaration', label: 'Declaration' },
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
function Callout({ icon: Icon, title, children, tone = 'brand' }: { icon: React.ElementType; title: string; children: React.ReactNode; tone?: 'brand' | 'warn' | 'danger' }) {
  const styles =
    tone === 'danger' ? 'border-destructive/40 bg-destructive/5'
    : tone === 'warn' ? 'border-amber-500/30 bg-amber-500/5'
    : 'border-primary/30 bg-gradient-brand-soft';
  const iconColor = tone === 'danger' ? 'text-destructive' : tone === 'warn' ? 'text-amber-500' : 'text-primary';
  return (
    <Card className={`${styles} my-5`}>
      <CardContent className="p-5 flex gap-3">
        <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${iconColor}`} />
        <div>
          <p className="font-display font-semibold mb-1">{title}</p>
          <div className="text-sm text-foreground/90 leading-relaxed">{children}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HealthDataPrivacy() {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Consumer Health Data Privacy Policy v1.0 — GoMilap"
        description="GoMilap collects only the minimum health-related data needed for matching and safety. No medical records. Encrypted. India-based servers. Full user rights."
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
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Version 1.0 · Last Updated April 28, 2026</p>
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight">
            Consumer Health Data <span className="text-gradient-brand">Privacy Policy</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-foreground/80 italic">Your Match. Your Privacy. Your Choice. ♥</p>
          <p className="mt-5 text-base text-muted-foreground max-w-2xl mx-auto">
            What health-related information GoMilap collects when you use our dating and social networking app, how we protect it, and what choices you have. We keep this simple and honest.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-brand text-primary-foreground rounded-full shadow-glow">
              <a href="mailto:support@gomilap.com">Contact support</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/privacy">View Privacy Policy</Link>
            </Button>
          </div>

          {/* Doc meta */}
          <Card className="mt-10 max-w-3xl mx-auto text-left">
            <CardContent className="p-0">
              <Table>
                <TableBody>
                  <TableRow><TableCell className="font-medium w-44">Version</TableCell><TableCell>1.0</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Last Updated</TableCell><TableCell>April 28, 2026</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Applicable Region</TableCell><TableCell>India (Primary) | International Users</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">General Support</TableCell><TableCell><a href="mailto:support@gomilap.com" className="text-primary hover:underline">support@gomilap.com</a></TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Grievance Officer</TableCell><TableCell>Deepak — <a href="mailto:grievance@gomilap.com" className="text-primary hover:underline">grievance@gomilap.com</a></TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Registered Office</TableCell><TableCell>GoMilap, Bajaj Dwar, Rudrapur – 263153, Uttarakhand, India</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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
          {/* 1 */}
          <H2 id="what" icon={Sparkles}>1. What Is Health Data?</H2>
          <P>Health data is any personal information that relates to your physical or mental health — past, present, or future.</P>
          <P>On a dating app, the most common health-related information is your <strong className="text-foreground">sexual orientation</strong> and <strong className="text-foreground">gender identity</strong>. This is the primary health data GoMilap handles.</P>
          <Callout icon={HeartPulse} title="GoMilap's Core Principle">
            We collect only what is necessary to show you compatible matches and keep our platform safe. We do not collect medical records, test results, prescriptions, or any clinical health information.
          </Callout>

          {/* 2 */}
          <H2 id="collect" icon={Database}>2. What We Collect — And What We Don't</H2>
          <H3>What We DO Collect</H3>
          <Card className="my-4 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow><TableHead>Information</TableHead><TableHead>Why</TableHead><TableHead>Required?</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell className="font-medium">Sexual orientation preference</TableCell><TableCell>To show you relevant matches</TableCell><TableCell>Yes</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Gender identity</TableCell><TableCell>For your profile and matching</TableCell><TableCell>Yes</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Pronouns</TableCell><TableCell>Optional — your choice</TableCell><TableCell>No</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Relationship goal</TableCell><TableCell>Friendship / dating / marriage matching</TableCell><TableCell>Yes</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Bio text (written by you)</TableCell><TableCell>You control what you write here</TableCell><TableCell>No</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Chat messages</TableCell><TableCell>Between you & match only; retained while account active, deleted after account deletion</TableCell><TableCell>No</TableCell></TableRow>
              </TableBody>
            </Table>
          </Card>

          <H3>Age Verification</H3>
          <P>To comply with Indian law, GoMilap confirms all users are 18 or above. You can verify via:</P>
          <UL>
            <li>A short facial scan — used only to check age, then immediately discarded</li>
            <li>A government-issued ID — checked once, then immediately discarded</li>
          </UL>
          <Callout icon={Lock} title="Biometric & ID Data — NEVER Stored" tone="brand">
            Any facial scan or ID document used for age verification is processed in real time and deleted immediately after the age check is complete. It is NEVER stored, saved to a database, or shared with any third party.
          </Callout>

          <Callout icon={AlertTriangle} title="If You Share Sensitive Information in Chat or Bio" tone="warn">
            Some users choose to mention health conditions in their profile bio or chat messages. GoMilap does not store this as structured data. However, anything you write is visible to other users you interact with. Please use your own judgment.
          </Callout>

          <H3>What We Do NOT Collect</H3>
          <P>GoMilap does not collect any of the following, and has no access to:</P>
          <div className="grid sm:grid-cols-2 gap-3 my-4">
            {[
              'Medical records or hospital documents',
              'Prescriptions or medication details',
              'Mental health therapy or psychiatric notes',
              'STD, infectious disease, or HIV status',
              'Pregnancy or reproductive history',
              'Genetic data of any kind',
              'Biometric health data (heart rate, BP, etc.)',
              'Health insurance information',
            ].map((item) => (
              <Card key={item} className="border-destructive/20">
                <CardContent className="p-4 flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90">{item}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 3 */}
          <H2 id="why" icon={ShieldCheck}>3. Why We Collect It</H2>
          <Card className="my-4 overflow-hidden">
            <Table>
              <TableHeader><TableRow><TableHead>Purpose</TableHead><TableHead>Explanation</TableHead><TableHead>Legal Basis</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow><TableCell className="font-medium">Showing compatible matches</TableCell><TableCell>We use your preferences to suggest relevant profiles</TableCell><TableCell>Legitimate interest</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Age verification</TableCell><TableCell>Indian law requires all users to be 18+</TableCell><TableCell>Legal obligation</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Platform safety</TableCell><TableCell>Detecting harmful or abusive content</TableCell><TableCell>Legal obligation</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Customer support</TableCell><TableCell>Responding to your queries and complaints</TableCell><TableCell>Contract performance</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Service improvement</TableCell><TableCell>Anonymised, aggregated data only — never individual</TableCell><TableCell>Legitimate interest</TableCell></TableRow>
              </TableBody>
            </Table>
          </Card>

          {/* 4 */}
          <H2 id="use" icon={Sparkles}>4. How We Use Your Data</H2>
          <Card className="my-4 overflow-hidden">
            <Table>
              <TableHeader><TableRow><TableHead>Use</TableHead><TableHead>Data Used</TableHead><TableHead>Shared Externally?</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow><TableCell className="font-medium">Profile display</TableCell><TableCell>Sexual orientation, gender, pronouns</TableCell><TableCell>Visible to other users only</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Match suggestions</TableCell><TableCell>Sexual orientation, gender, relationship goal</TableCell><TableCell>No — internal only</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Age verification</TableCell><TableCell>Facial scan or ID — one-time use</TableCell><TableCell>No — deleted immediately</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Safety moderation</TableCell><TableCell>Reported content only</TableCell><TableCell>No — moderation team only</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Support tickets</TableCell><TableCell>What you write in your support message</TableCell><TableCell>No — support team only</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">App analytics</TableCell><TableCell>Anonymised usage stats only</TableCell><TableCell>Yes — non-identifiable only</TableCell></TableRow>
              </TableBody>
            </Table>
          </Card>
          <P>Our matching algorithm uses only your stated preferences. We do not profile your behaviour or infer anything about your health beyond what you explicitly tell us.</P>

          {/* 5 */}
          <H2 id="who" icon={Share2}>5. Who Can See Your Data</H2>
          <H3>Other Users</H3>
          <P>The following parts of your profile are visible to other GoMilap users:</P>
          <UL>
            <li>Your gender (Male / Female / Non-binary)</li>
            <li>Your orientation preference (e.g. Looking for: Women / Men / Everyone)</li>
            <li>Your pronouns, if you add them</li>
            <li>Your bio — you control every word</li>
          </UL>
          <P>Chat messages are only visible between you and the person you are chatting with.</P>

          <H3>Our Service Providers</H3>
          <Card className="my-4 overflow-hidden">
            <Table>
              <TableHeader><TableRow><TableHead>Provider</TableHead><TableHead>What They Access</TableHead><TableHead>Purpose</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow><TableCell className="font-medium">Cloud hosting (India servers)</TableCell><TableCell>Your encrypted profile data</TableCell><TableCell>Storing app data securely</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Age verification partner</TableCell><TableCell>Facial scan / ID — temporary</TableCell><TableCell>One-time age check only</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Moderation team</TableCell><TableCell>Reported messages only</TableCell><TableCell>Keeping the platform safe</TableCell></TableRow>
              </TableBody>
            </Table>
          </Card>
          <Callout icon={ShieldCheck} title="Service Providers Cannot Use Your Data">
            Every service provider is under contract. They can only use your data for the specific service they provide to GoMilap. They cannot use it for their own marketing, analytics, or any other purpose.
          </Callout>

          <H3>Law Enforcement</H3>
          <P>GoMilap will share data with law enforcement only when:</P>
          <UL>
            <li>A valid court order or warrant is received</li>
            <li>There is an imminent risk to someone's physical safety</li>
            <li>Required by law to protect minors</li>
          </UL>
          <P>We will always share only the minimum data required by law.</P>

          <H3>What We Will NEVER Do</H3>
          <div className="grid sm:grid-cols-2 gap-3 my-4">
            {[
              'Sell your health data to anyone',
              'Share your data with advertisers',
              'Share your data with data brokers',
              'Transfer your health data outside India without adequate safeguards',
            ].map((item) => (
              <Card key={item} className="border-destructive/20">
                <CardContent className="p-4 flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90">{item}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 6 */}
          <H2 id="protect" icon={Lock}>6. How We Protect Your Data</H2>
          <Card className="my-4 overflow-hidden">
            <Table>
              <TableHeader><TableRow><TableHead>What We Do</TableHead><TableHead>How</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow><TableCell className="font-medium">Encrypt data in transit</TableCell><TableCell>All data transmitted uses TLS 1.3 encryption</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Encrypt data at rest</TableCell><TableCell>All stored data uses AES-256 encryption</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Limit who can access it</TableCell><TableCell>Only specific team members with a genuine need</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Log all access</TableCell><TableCell>Every access to health data is recorded and reviewed</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Store data in India</TableCell><TableCell>Data is primarily stored on India-based servers</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Train our team</TableCell><TableCell>All staff complete privacy training and sign confidentiality agreements</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Conduct regular reviews</TableCell><TableCell>We review our privacy practices on a regular basis</TableCell></TableRow>
              </TableBody>
            </Table>
          </Card>
          <H3>Data Location</H3>
          <P>Your data is primarily stored on India-based servers. Where international service providers are involved in processing (such as analytics tools), only anonymised, non-identifiable data is used.</P>

          {/* 7 */}
          <H2 id="rights" icon={UserCog}>7. Your Rights</H2>
          <P>You have the following rights over your health data. To exercise any of these, email <a href="mailto:support@gomilap.com" className="text-primary hover:underline">support@gomilap.com</a>.</P>
          <Card className="my-4 overflow-hidden">
            <Table>
              <TableHeader><TableRow><TableHead>Your Right</TableHead><TableHead>How to Use It</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow><TableCell className="font-medium">Know what data we hold</TableCell><TableCell>Email us — we will tell you exactly what we have</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Correct your data</TableCell><TableCell>Update your profile directly in the app at any time</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Delete your data</TableCell><TableCell>Delete your account — all data is removed within 30 days</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Withdraw consent</TableCell><TableCell>Update your preferences in app settings at any time</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Raise a grievance</TableCell><TableCell>Email grievance@gomilap.com — we respond within 30 days</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Request data portability</TableCell><TableCell>Email us — available soon</TableCell></TableRow>
              </TableBody>
            </Table>
          </Card>
          <H3>Account Deletion</H3>
          <P>When you delete your GoMilap account, all your health data — profile preferences, bio, and any associated data — is permanently deleted within 30 days. This cannot be undone.</P>
          <Callout icon={BadgeCheck} title="GoMilap is Inclusive">
            We welcome all gender identities and sexual orientations. Your identity is respected on this platform, and we will never use it for any purpose beyond showing you the right matches.
          </Callout>

          {/* 8 */}
          <H2 id="retention" icon={Clock}>8. How Long We Keep Data</H2>
          <Card className="my-4 overflow-hidden">
            <Table>
              <TableHeader><TableRow><TableHead>Data</TableHead><TableHead>Retention Period</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow><TableCell className="font-medium">Profile data (orientation, gender, bio)</TableCell><TableCell>While account is active</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Chat messages</TableCell><TableCell>While account is active; deleted after account deletion</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Facial scan / ID for age verification</TableCell><TableCell>Deleted immediately after the check</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Support tickets</TableCell><TableCell>Up to 12 months for quality and audit purposes</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Anonymised analytics</TableCell><TableCell>Indefinite — no longer linked to you</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">After account deletion</TableCell><TableCell>All personal data removed within 30 days</TableCell></TableRow>
              </TableBody>
            </Table>
          </Card>

          {/* 9 */}
          <H2 id="children" icon={Baby}>9. Children's Data</H2>
          <P>GoMilap is strictly for users aged <strong className="text-foreground">18 and above</strong>. We do not knowingly collect any data from anyone under 18.</P>
          <P>If we discover a user under 18, we will immediately delete their account and all associated data. If you believe a minor is using GoMilap, please report it to <a href="mailto:support@gomilap.com" className="text-primary hover:underline">support@gomilap.com</a>.</P>

          {/* 10 */}
          <H2 id="responsibility" icon={UserCheck}>10. Your Responsibility</H2>
          <H3>You Control What You Share</H3>
          <P>GoMilap only collects what is listed in Section 2. Anything else you share — in your bio or in chat — is your own choice. This includes any health conditions, medications, or personal medical history you choose to mention.</P>
          <P>Exercise caution when sharing personal health information with other users. GoMilap provides reporting and blocking tools — use them if you feel uncomfortable.</P>
          <P>GoMilap cannot control how other users may use or share information once it is voluntarily shared.</P>

          <H3>GoMilap is Not a Medical Platform</H3>
          <P>GoMilap is a social and dating app. We are not a healthcare provider and cannot offer medical advice, diagnosis, or emergency health support.</P>
          <Card className="my-4 overflow-hidden">
            <Table>
              <TableHeader><TableRow><TableHead>We Do Not Provide</TableHead><TableHead>Please Contact Instead</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow><TableCell className="font-medium">Medical advice</TableCell><TableCell>Your doctor or healthcare provider</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Mental health diagnosis</TableCell><TableCell>A licensed psychologist or psychiatrist</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Emergency medical support</TableCell><TableCell>Call <strong className="text-foreground">112</strong> (India) immediately</TableCell></TableRow>
              </TableBody>
            </Table>
          </Card>
          <Callout icon={LifeBuoy} title="You are not alone" tone="danger">
            If you are experiencing difficult emotions or thoughts of self-harm:
            <div className="mt-2 space-y-1">
              <div>• iCall (TISS): <strong>9152987821</strong></div>
              <div>• Vandrevala Foundation (24/7): <strong>1860-2662-345</strong></div>
              <div>• Emergency: <strong>112</strong></div>
            </div>
          </Callout>

          {/* 11 */}
          <H2 id="compliance" icon={Scale}>11. Compliance — India & International</H2>
          <H3>India (IT Act 2000 & DPDP Act 2023)</H3>
          <P>GoMilap's primary legal framework is Indian law. We treat sexual orientation and gender identity as <strong className="text-foreground">Sensitive Personal Data</strong> under the IT Act and the Digital Personal Data Protection Act 2023.</P>
          <UL>
            <li>Explicit consent obtained before collecting sensitive data</li>
            <li>Grievance Officer appointed with name and contact details</li>
            <li>Data primarily stored on India-based servers</li>
            <li>Users can correct, delete, or access their data at any time</li>
            <li>Grievance response within 30 days</li>
          </UL>
          <H3>International Users</H3>
          <P>If you access GoMilap from outside India, we apply the same data protection standards to your health data. We do not apply lower standards for users in any country.</P>
          <P>For specific questions about rights in your jurisdiction, contact <a href="mailto:support@gomilap.com" className="text-primary hover:underline">support@gomilap.com</a>.</P>

          {/* 12 */}
          <H2 id="breach" icon={FileWarning}>12. Data Breach Response</H2>
          <P>If a data breach occurs that involves your health data, GoMilap will:</P>
          <UL>
            <li>Notify affected users promptly — within <strong className="text-foreground">72 hours</strong> of discovery</li>
            <li>Report to relevant Indian authorities as required by law</li>
            <li>Tell you what happened, what data was involved, and what steps we are taking</li>
            <li>Provide guidance on what you can do to protect yourself</li>
          </UL>
          <P>To report a security concern: <a href="mailto:support@gomilap.com?subject=Security%20Concern" className="text-primary hover:underline">support@gomilap.com</a> with subject "Security Concern".</P>

          {/* 13 */}
          <H2 id="changes" icon={RefreshCw}>13. Changes to This Policy</H2>
          <Card className="my-4 overflow-hidden">
            <Table>
              <TableHeader><TableRow><TableHead>Type of Change</TableHead><TableHead>How We Tell You</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow><TableCell className="font-medium">Minor updates (wording, formatting)</TableCell><TableCell>In-app notice with updated date</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Significant changes (new data uses)</TableCell><TableCell>Email + in-app notice + 30 days before change takes effect</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Changes that affect your rights</TableCell><TableCell>Email + in-app notice + option to review before agreeing</TableCell></TableRow>
              </TableBody>
            </Table>
          </Card>
          <P>If you continue using GoMilap after changes take effect, you agree to the updated policy. You can always delete your account if you disagree.</P>

          {/* 14 */}
          <H2 id="contact" icon={Mail}>14. Contact Us</H2>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground mb-1">General questions about your data</p>
                <a href="mailto:support@gomilap.com" className="text-primary font-medium hover:underline">support@gomilap.com</a>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground mb-1">Grievance Officer (India — DPDP)</p>
                <a href="mailto:grievance@gomilap.com" className="text-primary font-medium hover:underline">grievance@gomilap.com</a>
                <p className="text-xs text-muted-foreground mt-1">Deepak</p>
              </CardContent>
            </Card>
          </div>

          <H3>Response Timelines</H3>
          <UL>
            <li>General queries: within 7 business days</li>
            <li>Data access / correction / deletion requests: within 30 days</li>
            <li>Grievances: within 30 days</li>
            <li>Data breach notification: within 72 hours</li>
          </UL>

          <H3>Registered Office</H3>
          <Card className="my-4">
            <CardContent className="p-5 flex gap-3">
              <Building2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm text-foreground/90">
                <p className="font-medium">GoMilap</p>
                <p className="text-muted-foreground">Bajaj Dwar, Rudrapur – 263153, Uttarakhand, India</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Reference */}
          <H2 id="quick" icon={FileQuestion}>Quick Reference</H2>
          <Card className="my-4 overflow-hidden">
            <Table>
              <TableHeader><TableRow><TableHead>Question</TableHead><TableHead>Answer</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow><TableCell className="font-medium">What health data does GoMilap collect?</TableCell><TableCell>Sexual orientation, gender identity, relationship goal — minimum only</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">What does GoMilap NOT collect?</TableCell><TableCell>Medical records, test results, prescriptions, clinical data</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Is my facial scan stored?</TableCell><TableCell>No — deleted immediately after age verification</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Can I share health info in chat?</TableCell><TableCell>Yes, but it is your choice and your responsibility</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Is GoMilap a healthcare provider?</TableCell><TableCell>No</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">How do I delete my health data?</TableCell><TableCell>Delete your account — all data removed within 30 days</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Where is my data stored?</TableCell><TableCell>Primarily on India-based servers</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">How do I raise a concern?</TableCell><TableCell>support@gomilap.com or grievance@gomilap.com</TableCell></TableRow>
              </TableBody>
            </Table>
          </Card>

          {/* Declaration */}
          <H2 id="declaration" icon={BadgeCheck}>Declaration</H2>
          <P>GoMilap confirms:</P>
          <div className="grid sm:grid-cols-2 gap-3 my-4">
            {[
              'We collect only the minimum health data needed to run our service',
              'We never sell health data to anyone',
              'We never share health data for advertising or marketing',
              'Facial scans and ID documents are deleted immediately after verification',
              'Health data is encrypted and protected at all times',
              'Data is primarily stored on India-based servers',
              'You can correct, delete, or access your data at any time',
              'A named Grievance Officer is available for all concerns',
              'GoMilap is not a healthcare provider',
              'Data breaches will be reported to users within 72 hours',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/60 px-4 py-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/90">{item}</span>
              </div>
            ))}
          </div>

          {/* Promise */}
          <Card className="mt-12 border-primary/40 bg-gradient-brand-soft overflow-hidden">
            <CardContent className="p-8 text-center">
              <HeartPulse className="h-8 w-8 mx-auto text-primary mb-3" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">♥ ♥ ♥</p>
              <p className="font-display font-bold text-2xl md:text-3xl text-gradient-brand">
                GoMilap — Your Health Data, Your Privacy, Your Choice
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Version 1.0 · Last Updated April 28, 2026
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
                <a href="mailto:support@gomilap.com" className="text-primary hover:underline">support@gomilap.com</a>
                <span className="text-muted-foreground">·</span>
                <a href="mailto:grievance@gomilap.com" className="text-primary hover:underline">grievance@gomilap.com</a>
                <span className="text-muted-foreground">·</span>
                <span className="inline-flex items-center gap-1 text-foreground/90"><Phone className="h-3.5 w-3.5" /> Emergency: 112</span>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  );
}
