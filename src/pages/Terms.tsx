import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ScrollText,
  Mail,
  MapPin,
  Check,
  X,
  UserCheck,
  UserCog,
  Ban,
  MessageCircle,
  FileText,
  ShieldAlert,
  Shield,
  CreditCard,
  LogOut,
  Flag,
  AlertTriangle,
  Scale,
  Gavel,
  RefreshCw,
  Phone,
  Heart,
  ChevronRight,
  Sparkles,
  Globe2,
  Building2,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const TOC = [
  { id: 'introduction', label: '1. Introduction & Acceptance', icon: FileText },
  { id: 'eligibility', label: '2. Eligibility (18+ Only)', icon: UserCheck },
  { id: 'accounts', label: '3. User Accounts', icon: UserCog },
  { id: 'conduct', label: '4. Conduct & Prohibited', icon: Ban },
  { id: 'communication', label: '5. Chat, Voice & Video Rules', icon: MessageCircle },
  { id: 'content', label: '6. Content Ownership & License', icon: FileText },
  { id: 'responsibility', label: '7. Your Responsibility', icon: Scale },
  { id: 'liability', label: "8. GoMilap's Limited Liability", icon: ShieldAlert },
  { id: 'payments', label: '9. Payments & Refunds', icon: CreditCard },
  { id: 'termination', label: '10. Termination & Suspension', icon: LogOut },
  { id: 'grievance', label: '11. Reporting & Grievance', icon: Flag },
  { id: 'warranty', label: '12. Disclaimer of Warranties', icon: AlertTriangle },
  { id: 'indemnify', label: '13. Indemnification', icon: Shield },
  { id: 'law', label: '14. Governing Law', icon: Gavel },
  { id: 'changes', label: '15. Changes to Terms', icon: RefreshCw },
  { id: 'contact', label: '16. Contact Us', icon: Mail },
];

function H2({ id, icon: Icon, children }: { id: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-display font-bold text-3xl md:text-4xl mt-16 mb-5 scroll-mt-24 flex items-center gap-3"
    >
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

function P({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-muted-foreground leading-relaxed mb-4 ${className}`}>{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground mb-4 marker:text-primary">
      {children}
    </ul>
  );
}

function Yes() {
  return (
    <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
      <Check className="h-4 w-4" /> Yes
    </span>
  );
}
function No() {
  return (
    <span className="inline-flex items-center gap-1 text-destructive font-medium">
      <X className="h-4 w-4" /> No
    </span>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <Card className="my-4 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((h) => (
              <TableHead key={h}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell key={j} className={j === 0 ? 'font-medium text-foreground align-top' : 'align-top'}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function Callout({
  tone = 'info',
  icon: Icon,
  title,
  children,
}: {
  tone?: 'info' | 'warn' | 'danger' | 'success';
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  const tones: Record<string, string> = {
    info: 'border-primary/30 bg-primary/5',
    warn: 'border-amber-500/30 bg-amber-500/5',
    danger: 'border-destructive/40 bg-destructive/5',
    success: 'border-emerald-500/30 bg-emerald-500/5',
  };
  const iconTones: Record<string, string> = {
    info: 'text-primary',
    warn: 'text-amber-400',
    danger: 'text-destructive',
    success: 'text-emerald-400',
  };
  return (
    <div className={`my-5 rounded-2xl border p-5 ${tones[tone]}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${iconTones[tone]}`} />
        <div className="flex-1">
          <p className="font-display font-semibold mb-1">{title}</p>
          <div className="text-sm text-muted-foreground leading-relaxed [&_p:last-child]:mb-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Terms & Conditions — GoMilap"
        description="The rules of using GoMilap: eligibility, conduct, calls, payments, liability, grievance, and governing law."
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
      <section className="relative px-6 py-16 md:py-24 border-b border-border/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand-soft opacity-40" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[120%] bg-gradient-brand opacity-10 blur-3xl rounded-full" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-brand items-center justify-center shadow-glow mb-6">
            <ScrollText className="h-8 w-8 text-primary-foreground" />
          </div>
          <p className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            The Rules of GoMilap
          </p>
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight">
            Terms &amp; <span className="text-gradient-brand">Conditions</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            A clear, fair agreement between you and GoMilap. Read it once — it sets the boundaries that keep
            our community safe.
          </p>

          {/* Meta chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-sm">
            <span className="px-3 py-1.5 rounded-full glass border border-border/60">
              <span className="text-muted-foreground">Last Updated</span>{' '}
              <strong className="text-foreground">June 2025</strong>
            </span>
            <span className="px-3 py-1.5 rounded-full glass border border-border/60">
              <span className="text-muted-foreground">Version</span>{' '}
              <strong className="text-foreground">1.0</strong>
            </span>
            <span className="px-3 py-1.5 rounded-full glass border border-border/60 inline-flex items-center gap-1.5">
              <Globe2 className="h-3.5 w-3.5 text-primary" />
              <strong className="text-foreground">India &amp; Global</strong>
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-brand text-primary-foreground rounded-full shadow-glow">
              <a href="#summary">Quick summary</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href="mailto:support@gomilap.com">
                <Mail className="h-4 w-4 mr-2" />
                Contact support
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Promise band */}
      <section className="px-6 py-10 border-b border-border/60">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: UserCheck, label: '18+ Only', desc: 'Strictly verified adults' },
            { icon: Shield, label: 'Zero Tolerance', desc: 'For abuse, hate or harm' },
            { icon: Scale, label: 'Fair Liability', desc: 'You own your actions' },
            { icon: Gavel, label: 'Indian Law', desc: 'IT Act 2000 & IT Rules 2021' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-3 p-4 rounded-xl glass">
              <div className="h-10 w-10 rounded-lg bg-gradient-brand-soft flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-display font-semibold">{label}</p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-[280px_1fr] gap-12">
        {/* Sticky TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">
              Contents
            </p>
            <nav className="space-y-1 text-sm max-h-[calc(100vh-160px)] overflow-y-auto pr-2">
              {TOC.map(({ id, label, icon: Icon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-card hover:text-primary transition-colors text-muted-foreground"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{label}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <article className="max-w-3xl">
          {/* Intro */}
          <H2 id="introduction" icon={FileText}>Introduction &amp; Acceptance</H2>
          <P>
            Welcome to <strong className="text-foreground">GoMilap</strong>! These Terms &amp; Conditions
            ("Terms") govern your use of the GoMilap mobile application, website, and all features —
            including Chat, Voice Calls, Video Calls, Discover, Profile and related services.
          </P>
          <P>
            By creating an account or using GoMilap, you agree to these Terms. They form a legally binding
            agreement between <strong className="text-foreground">you</strong> (the user) and{' '}
            <strong className="text-foreground">GoMilap</strong>.
          </P>
          <Callout tone="warn" icon={AlertTriangle} title="If you do not agree…">
            <p>Then please do not use GoMilap.</p>
          </Callout>

          {/* Eligibility */}
          <H2 id="eligibility" icon={UserCheck}>Eligibility (18+ Only)</H2>
          <H3>2.1 Age Requirement</H3>
          <P>🔞 GoMilap is <strong className="text-foreground">strictly for individuals aged 18 years or older</strong>.</P>
          <DataTable
            headers={['Requirement', 'Status']}
            rows={[
              ['Minimum age', '18 years'],
              ['Maximum age', 'No limit'],
              ['Age verification', 'Required (face scan or ID upload)'],
            ]}
          />

          <H3>2.2 Who CANNOT Use GoMilap</H3>
          <DataTable
            headers={['Category', 'Reason']}
            rows={[
              ['Anyone under 18', 'Legal requirement'],
              ['Convicted sex offenders', 'Safety risk'],
              ['Users banned from other dating apps', 'Safety risk'],
              ['Automated bots or scripts', 'Violation of terms'],
              ['Anyone using fake identity', 'Fraud prevention'],
            ]}
          />

          <H3>2.3 Verification Rights</H3>
          <P>GoMilap reserves the right to:</P>
          <UL>
            <li>Verify your age at any time</li>
            <li>Request government ID for verification</li>
            <li>Suspend your account until verification is complete</li>
            <li>Permanently ban you if age verification fails</li>
          </UL>

          {/* Accounts */}
          <H2 id="accounts" icon={UserCog}>User Accounts</H2>
          <H3>3.1 Account Creation</H3>
          <DataTable
            headers={['Step', 'Action']}
            rows={[
              ['1', 'Download GoMilap app or visit website'],
              ['2', 'Provide accurate information (name, email, phone, DOB, gender)'],
              ['3', 'Create a strong password'],
              ['4', 'Verify email address'],
              ['5', 'Verify phone number (OTP)'],
              ['6', 'Complete age verification (face scan or ID)'],
              ['7', 'Complete onboarding (photo, bio, interests)'],
            ]}
          />

          <H3>3.2 Account Security</H3>
          <DataTable
            headers={['Your Responsibility', 'Why']}
            rows={[
              ['Keep password confidential', 'Prevents unauthorized access'],
              ['Do not share login credentials', 'Protects your account'],
              ['Logout from shared devices', 'Prevents others from using your account'],
              ['Report unauthorized access immediately', 'support@gomilap.com'],
            ]}
          />
          <Callout tone="warn" icon={AlertTriangle} title="You are responsible for all activity under your account.">
            <p>Treat your password like a house key.</p>
          </Callout>

          <H3>3.3 One Account Per User</H3>
          <DataTable
            headers={['Rule', 'Consequence']}
            rows={[
              ['One account per person', 'Multiple accounts will be deleted'],
              ['No fake or duplicate accounts', 'Permanent ban'],
              ['No catfishing (pretending to be someone else)', 'Permanent ban'],
            ]}
          />

          {/* Conduct */}
          <H2 id="conduct" icon={Ban}>User Conduct &amp; Prohibited Activities</H2>
          <H3>4.1 Prohibited Content</H3>
          <DataTable
            headers={['Category', 'Examples', 'Consequence']}
            rows={[
              ['Nudity / Explicit', 'Naked photos, sexual acts, genitals', 'Removal + warning/ban'],
              ['Violence / Gore', 'Blood, injuries, weapons, fighting', 'Removal + ban'],
              ['Hate Speech', 'Attacks on race, religion, gender, caste', 'Permanent ban'],
              ['Harassment', 'Threats, bullying, abusive messages', 'Suspension → Permanent ban'],
              ['Illegal Content', 'Drugs, weapons, trafficking', 'Permanent ban + Police'],
              ['Child Exploitation', 'Any content involving minors', 'Permanent ban + Police + NCMEC'],
              ['Spam', 'Promotional links, scam messages', 'Account suspension'],
              ['Impersonation', 'Fake or celebrity profiles', 'Permanent ban'],
            ]}
          />

          <H3>4.2 Prohibited Conduct</H3>
          <DataTable
            headers={['Activity', 'Examples', 'Consequence']}
            rows={[
              ['Harassment', 'Repeated unwanted messages, stalking', 'Suspension → Permanent ban'],
              ['Threats', '"I will hurt you", "I know where you live"', 'Permanent ban + Police'],
              ['Scams', 'Asking for money, phishing', 'Permanent ban + Police'],
              ['Catfishing', 'Fake photos or identity', 'Permanent ban'],
              ['Underage use', 'Anyone under 18', 'Permanent ban'],
              ['Automated access', 'Bots, scripts, scraping', 'Permanent ban'],
            ]}
          />

          <H3>4.3 Zero Tolerance Policy</H3>
          <Callout tone="danger" icon={ShieldAlert} title="🔴 GoMilap has ZERO TOLERANCE for:">
            <UL>
              <li>Child exploitation or grooming</li>
              <li>Sexual violence or rape threats</li>
              <li>Death threats or threats of serious harm</li>
              <li>Hate speech against any community</li>
              <li>Real-world stalking or harassment</li>
            </UL>
            <p className="mt-2">
              <strong className="text-foreground">Consequence:</strong> Immediate permanent ban (no warning),
              data preserved for law enforcement, reported to police / cyber crime cell, legal action may follow.
            </p>
          </Callout>

          {/* Communication */}
          <H2 id="communication" icon={MessageCircle}>Chat, Voice Call &amp; Video Call Rules</H2>
          <H3>5.1 Chat Rules</H3>
          <DataTable
            headers={['✅ You CAN', '❌ You CANNOT']}
            rows={[
              ['Send respectful messages', 'Send abusive or threatening messages'],
              ['Express interest politely', 'Send unwanted sexual content'],
              ['Share appropriate information', 'Share phone/address before trust is built'],
              ['Block users who make you uncomfortable', 'Harass or spam other users'],
              ['Report inappropriate behavior', 'Use automated messages or bots'],
            ]}
          />

          <H3>5.2 Voice Call Rules</H3>
          <DataTable
            headers={['Rule', 'Explanation']}
            rows={[
              ['Consent required', 'You must have consent before calling'],
              ['No recording', 'Recording calls without consent is illegal'],
              ['No harassment', 'Repeated calls after being told to stop is harassment'],
              ['No abuse', 'No shouting, threats, or abusive language'],
              ['Report feature', 'Use in-app report to flag abusive calls'],
            ]}
          />
          <Callout tone="info" icon={Phone} title="GoMilap does not record voice calls.">
            <p>Calls are peer-to-peer.</p>
          </Callout>

          <H3>5.3 Video Call Rules</H3>
          <DataTable
            headers={['Rule', 'Explanation']}
            rows={[
              ['Consent required', 'Both parties must agree to video call'],
              ['No nudity', 'No nudity, sexual acts, or explicit content'],
              ['No recording', 'Recording video calls without consent is illegal'],
              ['No violence', 'No violent or threatening behavior'],
              ['Report feature', 'Use in-app report during or after call'],
              ['Screenshot detection', "You'll be alerted if someone screenshots"],
            ]}
          />

          <H3>5.4 Call Connection Limitation</H3>
          <Callout tone="warn" icon={ShieldAlert} title="🔒 Calls are only possible within the GoMilap app.">
            <UL>
              <li>We do NOT facilitate calls outside the platform</li>
              <li>We are NOT responsible for calls on WhatsApp, Telegram, or other apps</li>
              <li>If you share your personal number, you assume all risks</li>
            </UL>
          </Callout>

          <H3>5.5 User Responsibility for Calls</H3>
          <Callout tone="danger" icon={Scale} title="⚖️ You are fully responsible for:">
            <UL>
              <li>What you say during calls</li>
              <li>What you show during video calls</li>
              <li>Sharing your personal contact information</li>
              <li>Meeting someone offline after calls</li>
            </UL>
            <p>GoMilap is NOT liable for any harm, loss, or damage arising from your use of chat, voice, or video calls.</p>
          </Callout>

          {/* Content */}
          <H2 id="content" icon={FileText}>Content Ownership &amp; License</H2>
          <H3>6.1 Your Content (You Own It)</H3>
          <DataTable
            headers={['What You Own', 'Examples']}
            rows={[
              ['Your profile photo', 'You retain full ownership'],
              ['Your bio', 'You retain full ownership'],
              ['Your messages', 'You retain full ownership'],
              ['Your photos and videos', 'You retain full ownership'],
            ]}
          />

          <H3>6.2 License to GoMilap</H3>
          <P>
            By posting content on GoMilap, you grant us a limited, non-exclusive, royalty-free license to:
          </P>
          <DataTable
            headers={['Purpose', 'Duration']}
            rows={[
              ['Display your content to other users', 'While your account is active'],
              ['Store your content on our servers', 'While your account is active'],
              ['Moderate your content for policy violations', 'As needed'],
              ['Use aggregated data for analytics', 'Permanently (anonymized)'],
            ]}
          />
          <Callout tone="success" icon={Check} title="Two important promises">
            <UL>
              <li>We do <strong className="text-foreground">NOT</strong> sell your content to anyone.</li>
              <li>We do <strong className="text-foreground">NOT</strong> use your content for advertising without permission.</li>
            </UL>
          </Callout>

          <H3>6.3 Content Deletion</H3>
          <DataTable
            headers={['Action', 'What Happens']}
            rows={[
              ['You delete your account', 'Your content is deleted within 90 days'],
              ['GoMilap bans your account', 'Your content is removed from public view'],
              ['You edit your profile', 'Old content is replaced'],
            ]}
          />

          {/* Responsibility */}
          <H2 id="responsibility" icon={Scale}>User Responsibility &amp; Liability</H2>
          <Callout tone="warn" icon={AlertTriangle} title="⚖️ This section is important — please read carefully.">
            <p>You are an adult on an adult platform. Your choices are your own.</p>
          </Callout>

          <H3>7.1 You Are Responsible For Your Actions</H3>
          <DataTable
            headers={['Responsibility', 'Explanation']}
            rows={[
              ['What you say', 'You are responsible for chat messages and call content'],
              ['What you show', 'You are responsible for what you show on video calls'],
              ['What you share', 'Sharing phone, address, or social media is YOUR choice'],
              ['Who you meet', 'Meeting offline is YOUR decision'],
              ['Your safety', 'You are responsible for your safety online and offline'],
            ]}
          />

          <H3>7.2 GoMilap's Limited Liability</H3>
          <P>GoMilap is <strong className="text-foreground">NOT</strong> liable for:</P>
          <DataTable
            headers={['Situation', 'Why']}
            rows={[
              ['User shares personal contact info', "It was the user's voluntary choice"],
              ['User meets someone offline', 'GoMilap is a platform, not a chaperone'],
              ['User experiences harassment', 'We provide block/report tools — users must use them'],
              ['User sends money to another user', 'We explicitly prohibit financial transactions'],
              ['User lies about their identity', 'We verify but cannot guarantee 100%'],
              ['Video call screenshot', 'We detect and alert but cannot prevent'],
              ['Emotional distress from rejection', 'Dating involves rejection'],
            ]}
          />

          <H3>7.3 What GoMilap IS Liable For</H3>
          <DataTable
            headers={['Situation', 'Liability']}
            rows={[
              ['Data breach caused by our negligence', 'Limited to actual damages'],
              ['Failure to remove reported illegal content', 'After reasonable time'],
              ['Violation of this agreement by GoMilap', 'As per applicable law'],
            ]}
          />
          <Callout tone="info" icon={Scale} title="Maximum liability">
            <p>The amount you paid to GoMilap in the last 12 months (if anything).</p>
          </Callout>

          {/* Liability */}
          <H2 id="liability" icon={ShieldAlert}>GoMilap's Limited Liability (Detailed)</H2>
          <H3>8.1 No Warranty</H3>
          <DataTable
            headers={['Disclaimer', 'Explanation']}
            rows={[
              ['"AS IS" and "AS AVAILABLE"', 'We do not guarantee uninterrupted service'],
              ['No guarantee of matches', 'We help you connect, not guarantee relationships'],
              ['No guarantee of user identity', 'We verify but cannot guarantee 100% accuracy'],
              ['No guarantee of user intent', 'We cannot read minds or predict behavior'],
            ]}
          />

          <H3>8.2 No Liability For</H3>
          <DataTable
            headers={['Exclusion', 'Details']}
            rows={[
              ['Special damages', 'Emotional distress, loss of relationships'],
              ['Indirect damages', 'Loss of opportunities, reputation damage'],
              ['Consequential damages', 'Losses resulting from offline meetings'],
              ['Third-party actions', 'What other users do or say'],
            ]}
          />

          <H3>8.3 Force Majeure</H3>
          <P>GoMilap is not liable for delays or failures caused by:</P>
          <UL>
            <li>Natural disasters</li>
            <li>Government actions</li>
            <li>Internet outages</li>
            <li>Cyber attacks</li>
            <li>Legal restrictions</li>
          </UL>

          {/* Payments */}
          <H2 id="payments" icon={CreditCard}>Payments &amp; Refunds</H2>
          <H3>9.1 Paid Features</H3>
          <DataTable
            headers={['Feature', 'Description']}
            rows={[
              ['GoMilap Premium', 'Unlimited likes, see who liked you, incognito mode'],
              ['Boost', 'Make your profile visible to more users'],
              ['Super Like', 'Stand out to someone you really like'],
              ['Virtual Gifts', 'Send gifts to other users'],
            ]}
          />

          <H3>9.2 Payment Processing</H3>
          <DataTable
            headers={['Item', 'Details']}
            rows={[
              ['Payment gateway', 'Razorpay (India) / Stripe (International)'],
              ['Card storage', 'We do NOT store card details'],
              ['Recurring payments', 'Subscriptions auto-renew unless cancelled'],
              ['Cancellation', 'You can cancel anytime from app settings'],
            ]}
          />

          <H3>9.3 Refund Policy</H3>
          <DataTable
            headers={['Situation', 'Refund']}
            rows={[
              ['User changes mind', <No key="r1" />],
              ['User deletes account', <No key="r2" />],
              ['Technical error (billed twice)', <Yes key="r3" />],
              ['GoMilap bans user for violation', <No key="r4" />],
              ['Feature not working as described', <span key="r5" className="text-emerald-400 font-medium">Pro-rated refund</span>],
              ['User under 18 (fraudulent registration)', <No key="r6" />],
            ]}
          />
          <Callout tone="warn" icon={AlertTriangle} title="All purchases are final.">
            <p>No refunds for change of mind.</p>
          </Callout>

          {/* Termination */}
          <H2 id="termination" icon={LogOut}>Termination &amp; Suspension</H2>
          <H3>10.1 Termination by You</H3>
          <DataTable
            headers={['Action', 'How To', 'Data']}
            rows={[
              ['Delete account', 'Profile → Delete Account', 'Deleted within 90 days'],
              ['Temporary deactivation', 'Settings → Deactivate', 'Preserved, profile hidden'],
            ]}
          />

          <H3>10.2 Suspension or Termination by GoMilap</H3>
          <DataTable
            headers={['Violation', 'Action']}
            rows={[
              ['Minor violation (first time)', 'Warning + content removal'],
              ['Repeated minor violations', 'Temporary suspension (7-30 days)'],
              ['Serious violation', 'Account termination (permanent ban)'],
              ['Zero tolerance violation', 'Immediate permanent ban + police'],
            ]}
          />

          <H3>10.3 Effect of Termination</H3>
          <DataTable
            headers={['What Happens', 'After Termination']}
            rows={[
              ['Access to app', 'Revoked'],
              ['Profile visibility', 'Hidden / deleted'],
              ['Chat messages', 'Deleted'],
              ['Premium subscription', 'Cancelled (no refund)'],
              ['Data retention', '90 days (legal / evidence purposes)'],
            ]}
          />

          {/* Grievance */}
          <H2 id="grievance" icon={Flag}>Reporting &amp; Grievance Redressal</H2>
          <H3>11.1 How to Report Violations</H3>
          <DataTable
            headers={['Method', 'Details']}
            rows={[
              ['In-app report', 'User profile → Report → Select reason'],
              ['Report message', 'Long-press message → Report'],
              ['Email', 'support@gomilap.com'],
            ]}
          />

          <H3>11.2 Grievance Officer (India)</H3>
          <P>As required under IT Rules, 2021:</P>
          <DataTable
            headers={['Field', 'Details']}
            rows={[
              ['Email', <a key="g1" href="mailto:grievance@gomilap.com" className="text-primary hover:underline">grievance@gomilap.com</a>],
              ['Response Time', 'Within 24 hours'],
              ['Resolution Time', 'Within 15 days'],
              ['Physical Address', 'Bajaj Dwar, Rudrapur – 263153, Uttarakhand, India'],
            ]}
          />

          <H3>11.3 Emergency Reporting</H3>
          <Callout tone="danger" icon={Phone} title="If you are in immediate danger — call 112 (India).">
            <p>
              GoMilap is <strong className="text-foreground">NOT</strong> an emergency service. Do not email
              us for emergencies.
            </p>
          </Callout>

          {/* Warranty */}
          <H2 id="warranty" icon={AlertTriangle}>Disclaimer of Warranties</H2>
          <P>To the maximum extent permitted by law:</P>
          <DataTable
            headers={['Disclaimer', 'Meaning']}
            rows={[
              ['No warranty of accuracy', 'Profile information is provided by users'],
              ['No warranty of safety', 'We provide tools; you must use them'],
              ['No warranty of matches', 'We cannot guarantee you will find a relationship'],
              ['No warranty of uptime', 'Service may have interruptions'],
            ]}
          />
          <P>
            GoMilap is provided <strong className="text-foreground">"AS IS"</strong> and{' '}
            <strong className="text-foreground">"AS AVAILABLE"</strong> without any warranties.
          </P>

          {/* Indemnify */}
          <H2 id="indemnify" icon={Shield}>Indemnification</H2>
          <P>You agree to indemnify and hold GoMilap harmless from:</P>
          <DataTable
            headers={['Claim', 'Due To']}
            rows={[
              ['Your violation of these Terms', 'Your actions'],
              ['Your violation of any law', 'Your actions'],
              ['Your interactions with other users', 'What you say or do'],
              ['Your content posted on GoMilap', 'Your photos, messages, etc.'],
            ]}
          />
          <Callout tone="warn" icon={Scale} title="Plain English">
            <p>If someone sues GoMilap because of something <strong className="text-foreground">YOU</strong> did, <strong className="text-foreground">YOU</strong> pay for it.</p>
          </Callout>

          {/* Law */}
          <H2 id="law" icon={Gavel}>Governing Law &amp; Dispute Resolution</H2>
          <H3>14.1 Governing Law</H3>
          <DataTable
            headers={['Jurisdiction', 'Governing Law']}
            rows={[
              ['India', 'Information Technology Act, 2000 & Indian laws'],
              ['International', 'Indian law (for disputes with GoMilap)'],
            ]}
          />

          <H3>14.2 Dispute Resolution Process</H3>
          <DataTable
            headers={['Step', 'Process']}
            rows={[
              ['Step 1', 'Email support@gomilap.com with your concern'],
              ['Step 2', 'If unresolved, escalate to grievance@gomilap.com'],
              ['Step 3', 'If still unresolved, mediation in Rudrapur, India'],
              ['Step 4', 'Legal disputes in courts of Rudrapur, Uttarakhand, India'],
            ]}
          />

          <H3>14.3 No Class Actions</H3>
          <Callout tone="info" icon={Scale} title="⚖️ Individual disputes only">
            <p>You agree to resolve disputes individually. No class actions or class arbitrations.</p>
          </Callout>

          {/* Changes */}
          <H2 id="changes" icon={RefreshCw}>Changes to These Terms</H2>
          <DataTable
            headers={['Change Type', 'Notice Method']}
            rows={[
              ['Minor changes', 'In-app notice + updated date'],
              ['Major changes', 'Email + in-app popup + 30 days notice'],
            ]}
          />
          <P>By continuing to use GoMilap after changes, you agree to the updated Terms.</P>

          {/* Contact */}
          <H2 id="contact" icon={Mail}>Contact Us</H2>
          <H3>16.1 Only 2 Email IDs</H3>
          <div className="grid sm:grid-cols-2 gap-4 my-5">
            <Card className="p-5">
              <CardContent className="p-0 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg bg-gradient-brand-soft flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <p className="font-display font-semibold">Support</p>
                </div>
                <a href="mailto:support@gomilap.com" className="block text-primary font-medium hover:underline">
                  support@gomilap.com
                </a>
                <p className="text-xs text-muted-foreground">All inquiries, reports, appeals, questions</p>
              </CardContent>
            </Card>
            <Card className="p-5">
              <CardContent className="p-0 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg bg-gradient-brand-soft flex items-center justify-center">
                    <Gavel className="h-4 w-4 text-primary" />
                  </div>
                  <p className="font-display font-semibold">Grievance Redressal</p>
                </div>
                <a href="mailto:grievance@gomilap.com" className="block text-primary font-medium hover:underline">
                  grievance@gomilap.com
                </a>
                <p className="text-xs text-muted-foreground">Grievance Officer (India) — IT Rules 2021</p>
              </CardContent>
            </Card>
          </div>

          <H3>16.2 Registered Office</H3>
          <Card className="my-4 p-5">
            <CardContent className="p-0 flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-brand-soft flex items-center justify-center shrink-0">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div className="text-sm leading-relaxed">
                <p className="font-display font-semibold text-base">GoMilap</p>
                <p className="text-muted-foreground">
                  Bajaj Dwar,<br />
                  Rudrapur – 263153<br />
                  Uttarakhand, India
                </p>
              </div>
            </CardContent>
          </Card>

          <H3>16.3 Emergency Numbers (India)</H3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 my-5">
            {[
              { service: 'Emergency', num: '112' },
              { service: 'Police', num: '100' },
              { service: 'Women Helpline', num: '181' },
              { service: 'Child Helpline', num: '1098' },
              { service: 'Cyber Crime', num: '1930' },
            ].map((e) => (
              <Card key={e.num} className="p-4 text-center">
                <CardContent className="p-0">
                  <p className="font-display font-bold text-2xl text-gradient-brand">{e.num}</p>
                  <p className="text-xs text-muted-foreground mt-1">{e.service}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick summary */}
          <div id="summary" className="scroll-mt-24 mt-20">
            <H2 id="summary-h" icon={Sparkles}>Quick Summary</H2>
            <DataTable
              headers={['Your Question', 'Answer']}
              rows={[
                ['Minimum age?', '18+ (verified)'],
                ['Can I share my phone number?', 'Yes, but at your own risk'],
                ['Can I record calls?', 'No — illegal without consent'],
                ['Is GoMilap liable for offline meetings?', <No key="s1" />],
                ['What happens if I break rules?', 'Warning, suspension, or permanent ban'],
                ['Can I get a refund?', 'Only for technical errors'],
                ['How do I report someone?', 'In-app report or support@gomilap.com'],
                ['How to file a grievance?', 'grievance@gomilap.com'],
              ]}
            />
          </div>

          {/* Declaration */}
          <Callout tone="success" icon={Check} title="By using GoMilap, you acknowledge that:">
            <UL>
              <li>You are 18+ years old</li>
              <li>You have read and understood these Terms</li>
              <li>You agree to be bound by these Terms</li>
              <li>You are responsible for your actions on the platform</li>
              <li>You understand GoMilap's liability is limited</li>
              <li>You will not use GoMilap for illegal purposes</li>
            </UL>
          </Callout>

          {/* Footer card */}
          <Card className="mt-12 p-8 text-center bg-gradient-brand-soft border-primary/20">
            <CardContent className="p-0 space-y-3">
              <Heart className="h-8 w-8 text-primary mx-auto" />
              <p className="font-display font-bold text-2xl">
                Safe Connections. Meaningful Relationships.
              </p>
              <p className="text-sm text-muted-foreground">
                Terms &amp; Conditions v1.0 — Last updated April 28, 2026
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link to="/privacy">
                    Privacy Policy <ChevronRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link to="/safety-code">
                    Online Safety Code <ChevronRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link to="/compliance">
                    Compliance <ChevronRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground mt-10 text-center">
            Last Updated: June 2025 · Version 1.0 · © 2026 GoMilap. All rights reserved.
          </p>
        </article>
      </div>
    </div>
  );
}
