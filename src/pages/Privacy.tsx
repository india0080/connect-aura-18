import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
  Database,
  CreditCard,
  Cookie,
  Settings,
  Trash2,
  Clock,
  Baby,
  Scale,
  Sparkles,
  Gavel,
  RefreshCw,
  AlertTriangle,
  FileText,
  ChevronRight,
  Heart,
  Download,
  Globe2,
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
  { id: 'introduction', label: '1. Introduction & Scope', icon: FileText },
  { id: 'collect', label: '2. Information We Collect', icon: Database },
  { id: 'use', label: '3. How We Use Your Information', icon: Settings },
  { id: 'share', label: '4. How We Share Your Information', icon: Eye },
  { id: 'payments', label: '5. Payments & Financial', icon: CreditCard },
  { id: 'biometric', label: '6. Biometric & Age Verification', icon: ShieldCheck },
  { id: 'cookies', label: '7. Cookies & Tracking', icon: Cookie },
  { id: 'choices', label: '8. Your Privacy Choices', icon: Settings },
  { id: 'security', label: '9. Data Security', icon: Lock },
  { id: 'retention', label: '10. Data Retention', icon: Clock },
  { id: 'children', label: "11. Children's Privacy", icon: Baby },
  { id: 'liability', label: '12. User Responsibility & Liability', icon: Scale },
  { id: 'design', label: '13. Privacy by Design', icon: Sparkles },
  { id: 'grievance', label: '14. Grievance Redressal (India)', icon: Gavel },
  { id: 'changes', label: '15. Changes to This Policy', icon: RefreshCw },
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
function Locked() {
  return (
    <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
      <Lock className="h-3.5 w-3.5" /> Private
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
                <TableCell key={j} className={j === 0 ? 'font-medium text-foreground' : ''}>
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

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Privacy Policy — GoMilap"
        description="Simple, transparent privacy: what GoMilap collects, how we protect it, and the controls you have over your data."
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
            <ShieldCheck className="h-8 w-8 text-primary-foreground" />
          </div>
          <p className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            Your Privacy · Our Priority
          </p>
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight">
            Privacy <span className="text-gradient-brand">Policy</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Plain English. No legal jargon. Here's exactly what we collect, how we use it, and the controls
            you have.
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
              <strong className="text-foreground">India & Global</strong>
            </span>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-brand text-primary-foreground rounded-full shadow-glow">
              <a href="#summary">Quick summary</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href="mailto:support@gomilap.com">
                <Mail className="h-4 w-4 mr-2" />
                Contact us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Promise band */}
      <section className="px-6 py-10 border-b border-border/60">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: FileText, label: 'Simple', desc: 'No complex legal jargon' },
            { icon: Eye, label: 'Transparent', desc: 'We tell you what we collect' },
            { icon: Lock, label: 'Secure', desc: 'Your data is protected' },
            { icon: Scale, label: 'Fair', desc: "You're in control of what you share" },
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
          {/* 1 */}
          <H2 id="introduction" icon={FileText}>
            1. Introduction & Scope
          </H2>
          <P>
            Welcome to GoMilap! This Privacy Policy explains how we collect, use, and protect your
            personal information.
          </P>
          <P>
            GoMilap is a social networking platform for adults aged{' '}
            <strong className="text-foreground">18 years and above</strong>. By using GoMilap, you agree to the terms of this Privacy Policy.
          </P>
          <DataTable
            headers={['Key Principle', 'Our Commitment']}
            rows={[
              ['Simple', 'No complex legal jargon'],
              ['Transparent', 'We tell you exactly what we collect'],
              ['Secure', 'Your data is protected'],
              ['Fair', 'You are responsible for what you share'],
            ]}
          />

          {/* 2 */}
          <H2 id="collect" icon={Database}>
            2. Information We Collect
          </H2>

          <H3>2.1 Information You Provide Directly</H3>
          <DataTable
            headers={['Category', 'Specific Information']}
            rows={[
              ['Account Info', 'Full name, email, phone number, date of birth, gender, password'],
              ['Profile Info', 'Profile photo, bio, interests, preferences (men/women/everyone)'],
              ['Communications', 'Chat messages, friend requests, reports, support inquiries'],
              ['Verification Data', 'Government ID (if you choose to verify), selfie photo'],
            ]}
          />

          <H3>2.2 Information Collected Automatically</H3>
          <DataTable
            headers={['Category', 'Specific Information']}
            rows={[
              ['Device Info', 'Device model, operating system, IP address'],
              ['Usage Info', 'Features used, time spent, pages viewed'],
              ['Location', 'Approximate location (city level based on IP)'],
            ]}
          />

          <H3>2.3 What We DO NOT Collect</H3>
          <Card className="border-destructive/30 bg-destructive/5 my-4">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <X className="h-5 w-5 text-destructive" />
                <p className="font-display font-semibold">Never collected</p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-y-1.5 text-sm text-foreground/85">
                {['Medical records', 'Health information', 'Caste information', 'Political opinions', 'Religious beliefs (unless you share in bio)'].map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <X className="h-4 w-4 text-destructive shrink-0" />
                    {x}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* 3 */}
          <H2 id="use" icon={Settings}>
            3. How We Use Your Information
          </H2>
          <DataTable
            headers={['Purpose', 'Description']}
            rows={[
              ['Provide Services', 'Create your account, show your profile, enable matching'],
              ['Real-time Chat', 'Deliver messages between users'],
              ['Discover Feed', 'Show relevant profiles based on your preferences'],
              ['Safety & Security', 'Detect fake accounts, prevent fraud, enforce policies'],
              ['Customer Support', 'Respond to your inquiries and reports'],
              ['Improvement', 'Analyze usage to make the app better'],
              ['Legal Compliance', 'Respond to lawful requests from authorities'],
            ]}
          />
          <Card className="bg-gradient-brand-soft border-primary/30 my-4">
            <CardContent className="p-5 flex items-center gap-3">
              <Check className="h-6 w-6 text-primary shrink-0" />
              <p className="font-medium text-foreground">
                We <strong>DO NOT</strong> sell your personal information to anyone.
              </p>
            </CardContent>
          </Card>

          {/* 4 */}
          <H2 id="share" icon={Eye}>
            4. How We Share Your Information
          </H2>

          <H3>4.1 Information Visible to Other Users</H3>
          <DataTable
            headers={['Your Info', 'Visible?']}
            rows={[
              ['Profile photo', <Yes />],
              ['Name', <Yes />],
              ['Age', <Yes />],
              ['Bio', <Yes />],
              ['Interests', <Yes />],
              ['Approximate location (city)', <Yes />],
              ['Email address', <No />],
              ['Phone number', <No />],
              ['Exact location', <No />],
              ['Chat messages', <Locked />],
            ]}
          />

          <H3>4.2 Information Shared with Service Providers</H3>
          <DataTable
            headers={['Provider Type', 'Purpose']}
            rows={[
              ['Cloud hosting', 'Store your data securely'],
              ['Payment gateway', 'Process payments (Razorpay / Stripe)'],
              ['Push notifications', 'Send app notifications'],
              ['Analytics', 'Help us improve the app'],
            ]}
          />
          <Card className="border-amber-500/30 bg-amber-500/5 my-4">
            <CardContent className="p-5 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90">
                These service providers <strong>cannot</strong> use your data for their own purposes.
              </p>
            </CardContent>
          </Card>

          <H3>4.3 Legal & Safety Disclosures</H3>
          <P>We may share your information when:</P>
          <UL>
            <li>Required by law (court order, police request)</li>
            <li>Necessary to protect safety (imminent danger)</li>
            <li>Needed to enforce our Terms of Service</li>
          </UL>

          {/* 5 */}
          <H2 id="payments" icon={CreditCard}>
            5. Payments & Financial Information
          </H2>
          <P>For GoMilap Premium and paid features:</P>
          <DataTable
            headers={['Payment Method', 'How It Works']}
            rows={[
              ['Payment Gateway', 'Razorpay (India) / Stripe (International)'],
              ['Card Details', 'We DO NOT store your card information'],
              ['Transaction', 'Handled entirely by the payment gateway'],
              ['Receipt', 'Sent to your registered email'],
            ]}
          />
          <Card className="border-primary/30 bg-card/60 my-4">
            <CardContent className="p-5 flex items-start gap-3">
              <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90">
                Your payment details go directly to the payment gateway.{' '}
                <strong className="text-foreground">GoMilap never sees or stores your full card number.</strong>
              </p>
            </CardContent>
          </Card>

          {/* 6 */}
          <H2 id="biometric" icon={ShieldCheck}>
            6. Biometric & Age Verification
          </H2>
          <P>
            <strong className="text-foreground">Why we verify age:</strong> GoMilap is for adults 18+.
            We must ensure no minors use our platform.
          </P>

          <H3>6.1 Verification Methods (with your consent)</H3>
          <DataTable
            headers={['Method', 'How It Works', 'Data Collected']}
            rows={[
              ['Face Scan', 'You take a selfie; AI estimates age', 'Facial image (temporary)'],
              ['ID Upload', "Upload Aadhaar / Passport / Driver's License", 'ID document (verified, not stored)'],
            ]}
          />

          <H3>6.2 Your Consent & Data Deletion</H3>
          <DataTable
            headers={['What We Promise', 'Status']}
            rows={[
              ['We ask for your consent before any scan', <Yes />],
              ['You can say NO and use ID instead', <Yes />],
              ['Facial data is NOT stored permanently', <Yes />],
              ['ID documents are NOT stored permanently', <Yes />],
              ['Only verification result (age confirmed) is stored', <Yes />],
            ]}
          />
          <Card className="border-primary/30 bg-gradient-brand-soft my-4">
            <CardContent className="p-5 flex items-start gap-3">
              <EyeOff className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90">
                We do <strong>NOT</strong> store your biometric data. It is used only for instant verification
                and then deleted.
              </p>
            </CardContent>
          </Card>

          {/* 7 */}
          <H2 id="cookies" icon={Cookie}>
            7. Cookies & Tracking
          </H2>
          <DataTable
            headers={['Cookie Type', 'Purpose', 'Can You Disable?']}
            rows={[
              ['Essential', 'Login, app functionality', <No />],
              ['Analytics', 'Improve app performance', <Yes />],
              ['Advertising', 'Show relevant ads', <Yes />],
            ]}
          />
          <P>How to manage cookies:</P>
          <UL>
            <li>Web browser: Settings → Privacy → Cookies</li>
            <li>Mobile app: Settings → Privacy → Tracking</li>
          </UL>

          {/* 8 */}
          <H2 id="choices" icon={Settings}>
            8. Your Privacy Choices
          </H2>

          <H3>8.1 What You Can Control</H3>
          <DataTable
            headers={['Action', 'How To']}
            rows={[
              ['Edit profile info', 'Profile → Edit'],
              ['Change privacy settings', 'Settings → Privacy'],
              ['Hide your profile', 'Settings → Privacy → Hide Profile'],
              ['Block a user', 'User profile → Block'],
              ['Delete your account', 'Profile → Delete Account'],
              ['Download your data', 'Settings → Privacy → Download Data'],
            ]}
          />

          <H3>8.2 Marketing Communications</H3>
          <DataTable
            headers={['Type', 'Can Opt-Out?']}
            rows={[
              ['Promotional emails', <Yes />],
              ['Push notifications', <Yes />],
              ['Important account updates', <No />],
            ]}
          />

          {/* 9 */}
          <H2 id="security" icon={Lock}>
            9. Data Security
          </H2>

          <H3>9.1 Security Measures We Take</H3>
          <DataTable
            headers={['Measure', 'Implementation']}
            rows={[
              ['Encryption', 'TLS 1.3 for transfer, AES-256 for storage'],
              ['Access Control', 'Only authorized employees can access data'],
              ['Regular Audits', 'Security checks every quarter'],
              ['Data Minimization', 'We only collect what we need'],
            ]}
          />

          <H3>9.2 What YOU Must Do</H3>
          <DataTable
            headers={['Responsibility', 'Why']}
            rows={[
              ['Use a strong password', 'Prevents unauthorized access'],
              ['Never share your password', 'We will never ask for it'],
              ['Log out of shared devices', 'Protects your account'],
              ['Report suspicious activity', 'support@gomilap.com'],
            ]}
          />

          {/* 10 */}
          <H2 id="retention" icon={Clock}>
            10. Data Retention
          </H2>
          <DataTable
            headers={['Data Type', 'How Long We Keep It']}
            rows={[
              ['Active account data', 'As long as your account is active'],
              ['Deleted account data', 'Permanently deleted within 90 days'],
              ['Chat messages', 'Deleted when both users delete account'],
              ['Support tickets', '1 year after resolution'],
              ['Transaction records', '7 years (tax / legal requirement)'],
            ]}
          />

          {/* 11 */}
          <H2 id="children" icon={Baby}>
            11. Children's Privacy (Under 18)
          </H2>
          <Card className="border-destructive/40 bg-destructive/5 my-4">
            <CardContent className="p-5 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90">
                <strong className="text-foreground">GoMilap is STRICTLY for users aged 18 and above.</strong>
              </p>
            </CardContent>
          </Card>
          <DataTable
            headers={['If this happens…', 'We will…']}
            rows={[
              ['We discover a user under 18', 'Immediately delete their account'],
              ['A parent reports an underage user', 'Verify and delete immediately'],
              ['Anyone posts content with a minor', 'Remove content and report to authorities'],
            ]}
          />
          <P>
            If you are a parent and believe your child is using GoMilap, email{' '}
            <a href="mailto:support@gomilap.com" className="text-primary hover:underline">
              support@gomilap.com
            </a>{' '}
            with subject <strong className="text-foreground">"UNDERAGE USER"</strong>.
          </P>

          {/* 12 */}
          <H2 id="liability" icon={Scale}>
            12. User Responsibility & Liability
          </H2>

          <H3>12.1 You Are Responsible For What You Share</H3>
          <P>
            GoMilap is a platform where users connect with each other. You decide what information to share
            with other users.
          </P>
          <DataTable
            headers={['Scenario', 'Responsibility']}
            rows={[
              ['You share your phone number with a match', 'Your responsibility'],
              ['You share your address', 'Your responsibility'],
              ['You share personal photos', 'Your responsibility'],
              ['You agree to meet someone offline', 'Your responsibility'],
            ]}
          />

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <X className="h-5 w-5 text-destructive" />
                  <h4 className="font-display font-semibold">GoMilap is NOT liable for</h4>
                </div>
                <ul className="space-y-2 text-sm text-foreground/85">
                  {[
                    'Information you voluntarily share with users',
                    'Actions of other users outside the platform',
                    'Offline meetings arranged through the platform',
                    'Misuse of information you chose to disclose',
                  ].map((x) => (
                    <li key={x} className="flex gap-2">
                      <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      {x}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-primary/30 bg-gradient-brand-soft">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="h-5 w-5 text-primary" />
                  <h4 className="font-display font-semibold">GoMilap IS responsible for</h4>
                </div>
                <ul className="space-y-2 text-sm text-foreground/85">
                  {[
                    'Protecting your data from breaches',
                    'Following this Privacy Policy',
                    'Responding to your grievances promptly',
                    'Removing reported inappropriate content',
                  ].map((x) => (
                    <li key={x} className="flex gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {x}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-card/60 border-primary/20">
            <CardContent className="p-5 text-center">
              <p className="font-display font-semibold text-lg">
                We build <span className="text-gradient-brand">SAFE</span> tools. You make{' '}
                <span className="text-gradient-brand">SMART</span> choices.
              </p>
            </CardContent>
          </Card>

          {/* 13 */}
          <H2 id="design" icon={Sparkles}>
            13. Privacy by Design
          </H2>
          <P>
            Privacy by Design means we build privacy into our app from the ground up — not as an
            afterthought.
          </P>
          <DataTable
            headers={['Principle', 'How GoMilap Implements It']}
            rows={[
              ['Proactive, not reactive', 'We prevent privacy issues before they happen'],
              ['Privacy as default', 'Your profile is NOT public on the internet'],
              ['Embedded into design', 'Privacy settings are easy to find'],
              ['Full functionality', 'Use the app without sharing unnecessary data'],
              ['End-to-end security', 'Your data is protected at every step'],
              ['Transparency', 'This policy tells you everything'],
              ['User control', 'You can delete your data anytime'],
            ]}
          />
          <P className="text-sm">
            <strong className="text-foreground">Example:</strong> We don't ask for your exact location.
            City-level only. Your exact location stays on your phone.
          </P>

          {/* 14 */}
          <H2 id="grievance" icon={Gavel}>
            14. Grievance Redressal (India)
          </H2>
          <P>
            As required under the Information Technology (Intermediary Guidelines) Rules, 2021:
          </P>

          <H3>14.1 Grievance Officer</H3>
          <Card className="border-primary/30 my-4">
            <CardContent className="p-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Designation</p>
                <p className="font-medium mt-1">Grievance Officer</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                <a href="mailto:grievance@gomilap.com" className="text-primary font-medium hover:underline mt-1 block">
                  grievance@gomilap.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Response Time</p>
                <p className="font-medium mt-1">Within 24 hours</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Resolution Time</p>
                <p className="font-medium mt-1">Within 15 days</p>
              </div>
            </CardContent>
          </Card>

          <H3>14.2 How to File a Grievance</H3>
          <ol className="space-y-2.5 mb-4">
            {[
              'Email to grievance@gomilap.com',
              'Subject: "Grievance — [Your Username]"',
              'Include your registered email and phone number',
              'Describe the issue clearly',
              'Attach screenshots (if applicable)',
            ].map((step, i) => (
              <li key={i} className="flex gap-3 text-foreground/90">
                <span className="h-6 w-6 shrink-0 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <H3>14.3 Escalation</H3>
          <P>If you are not satisfied with the Grievance Officer's resolution:</P>
          <DataTable
            headers={['Option', 'Details']}
            rows={[
              ['MeitY', 'Ministry of Electronics & Information Technology'],
              ['Cyber Appellate Tribunal', 'Legal recourse under IT Act, 2000'],
              ['Courts', 'Civil or criminal proceedings as applicable'],
            ]}
          />

          {/* 15 */}
          <H2 id="changes" icon={RefreshCw}>
            15. Changes to This Policy
          </H2>
          <DataTable
            headers={['Change Type', 'Notification Method']}
            rows={[
              ['Minor updates', 'In-app notice + updated "Last Updated" date'],
              ['Major changes', 'Email to registered email + in-app popup'],
            ]}
          />
          <P className="text-sm">
            By continuing to use GoMilap after changes, you agree to the updated policy.
          </P>

          {/* 16 */}
          <H2 id="contact" icon={Mail}>
            16. Contact Us
          </H2>

          <H3>16.1 Only 2 Email IDs</H3>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <Card className="hover:border-primary/40 transition-colors">
              <CardContent className="p-5">
                <div className="h-10 w-10 rounded-lg bg-gradient-brand-soft flex items-center justify-center mb-3">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">All inquiries</p>
                <p className="text-sm text-muted-foreground mb-2">Support · Safety · Reports · Appeals · Data requests</p>
                <a href="mailto:support@gomilap.com" className="text-primary font-medium hover:underline">
                  support@gomilap.com
                </a>
              </CardContent>
            </Card>
            <Card className="hover:border-primary/40 transition-colors">
              <CardContent className="p-5">
                <div className="h-10 w-10 rounded-lg bg-gradient-brand-soft flex items-center justify-center mb-3">
                  <Gavel className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Grievance Officer (India)</p>
                <p className="text-sm text-muted-foreground mb-2">For formal IT-Act grievances</p>
                <a href="mailto:grievance@gomilap.com" className="text-primary font-medium hover:underline">
                  grievance@gomilap.com
                </a>
              </CardContent>
            </Card>
          </div>
          <P className="text-sm">📧 We respond to every email within 24 hours.</P>

          <H3>16.2 India Address (Registered Office)</H3>
          <Card className="my-4">
            <CardContent className="p-5 flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <address className="not-italic text-sm leading-relaxed">
                <strong className="text-foreground">GoMilap</strong>
                <br />
                Bajaj Dwar,
                <br />
                Rudrapur — 263153
                <br />
                Uttarakhand, India
              </address>
            </CardContent>
          </Card>

          <H3>16.3 Emergency Numbers (India)</H3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 my-4">
            {[
              { label: 'National Emergency', n: '112' },
              { label: 'Police', n: '100' },
              { label: 'Women Helpline', n: '181' },
              { label: 'Child Helpline', n: '1098' },
              { label: 'Cyber Crime', n: '1930' },
            ].map(({ label, n }) => (
              <Card key={n} className="text-center">
                <CardContent className="p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="font-display font-bold text-2xl text-gradient-brand mt-1">{n}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-destructive/40 bg-destructive/5 my-4">
            <CardContent className="p-5 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/90">
                <strong className="text-foreground">GoMilap is NOT an emergency service.</strong> If you are
                in immediate danger, call <strong>112</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Quick Summary */}
          <section id="summary" className="scroll-mt-24 mt-20">
            <div className="rounded-3xl bg-gradient-brand p-[1px] shadow-glow">
              <div className="rounded-3xl bg-card p-8">
                <div className="flex items-center gap-3 mb-5">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h3 className="font-display font-bold text-2xl">Quick Summary</h3>
                </div>
                <Table>
                  <TableBody>
                    {[
                      ['What data do you collect?', 'Name, email, phone, age, photo, bio, interests'],
                      ['Do you sell my data?', <No />],
                      ['Can I delete my data?', <Yes />],
                      ['Who can see my profile?', 'Other GoMilap users (18+)'],
                      ['Is my chat private?', <Yes />],
                      ['How do I report a problem?', 'support@gomilap.com'],
                      ['How to file a grievance?', 'grievance@gomilap.com'],
                      ['Where is your office?', 'Rudrapur, India'],
                    ].map(([q, a], i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-foreground w-1/2">{q}</TableCell>
                        <TableCell>{a}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </section>

          {/* Declaration */}
          <section className="mt-12">
            <h3 className="font-display font-bold text-2xl mb-5 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              Declaration
            </h3>
            <P>GoMilap hereby confirms that:</P>
            <ul className="space-y-2.5 mb-6">
              {[
                'This Privacy Policy is complete and accurate',
                'We comply with Indian IT Act, 2000 and IT Rules, 2021',
                'We do NOT sell user data',
                'We do NOT store biometric data permanently',
                'We do NOT store payment card details',
                'Users are responsible for information they share',
                'Privacy by Design is followed',
                'Grievance Officer is available at grievance@gomilap.com',
              ].map((x) => (
                <li key={x} className="flex gap-3 text-foreground/90">
                  <Check className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  {x}
                </li>
              ))}
            </ul>
          </section>

          {/* Promise footer */}
          <Card className="mt-10 border-primary/40 bg-gradient-brand-soft overflow-hidden">
            <CardContent className="p-8 text-center">
              <Heart className="h-8 w-8 mx-auto text-primary mb-3" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Your Privacy, Our Priority 🇮🇳💜
              </p>
              <p className="font-display font-bold text-2xl md:text-3xl text-gradient-brand">
                Building Trust in India, for India — and the World
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm">
                <a href="mailto:support@gomilap.com" className="text-primary hover:underline inline-flex items-center gap-1.5">
                  <Mail className="h-4 w-4" /> support@gomilap.com
                </a>
                <span className="text-muted-foreground">·</span>
                <a href="mailto:grievance@gomilap.com" className="text-primary hover:underline inline-flex items-center gap-1.5">
                  <Gavel className="h-4 w-4" /> grievance@gomilap.com
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Cross-links */}
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            <Link to="/safety-code" className="group">
              <Card className="h-full hover:border-primary/40 transition-colors">
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="font-medium">Online Safety Code</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </Link>
            <Link to="/compliance" className="group">
              <Card className="h-full hover:border-primary/40 transition-colors">
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">Compliance Statement</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
