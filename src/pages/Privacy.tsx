import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, MapPin, Phone, Lock, Cookie, Users, Globe2, Baby, FileText } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const sections = [
  { id: 'introduction', title: '1. Introduction & Scope' },
  { id: 'information-we-collect', title: '2. Information We Collect' },
  { id: 'how-we-use', title: '3. How We Use Your Information' },
  { id: 'how-we-share', title: '4. How We Share Your Information' },
  { id: 'cookies', title: '5. Cookies & Tracking Technologies' },
  { id: 'your-rights', title: '6. Your Privacy Choices & Rights' },
  { id: 'security', title: '7. Data Security' },
  { id: 'retention', title: '8. Data Retention' },
  { id: 'children', title: "9. Children's Privacy (Under 18)" },
  { id: 'third-party', title: '10. Third-Party Links & Features' },
  { id: 'transfers', title: '11. International Data Transfers' },
  { id: 'changes', title: '12. Changes to This Policy' },
  { id: 'grievance', title: '13. Grievance Redressal (India)' },
  { id: 'contact', title: '14. Contact Us' },
  { id: 'jurisdictions', title: '15. Specific Jurisdictions' },
  { id: 'google-play', title: '16. Google Play Store Compliance' },
];

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 font-display font-bold text-2xl md:text-3xl mt-12 mb-4 text-gradient-brand">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display font-semibold text-xl mt-6 mb-3">{children}</h3>;
}

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Privacy Policy — GoMilap"
        description="How GoMilap collects, uses, shares, and protects your personal information across India, EU, UK, US, and globally."
      />

      {/* Header */}
      <header className="px-6 py-5 border-b border-border/60 sticky top-0 z-30 backdrop-blur-xl bg-background/70">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/"><Logo /></Link>
          <Button asChild variant="secondary" className="rounded-full">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand-soft blur-3xl opacity-40 -z-10" />
        <Badge className="mb-5 bg-gradient-brand text-primary-foreground border-0">
          <ShieldCheck className="h-3.5 w-3.5 mr-1.5" /> Last Updated: April 28, 2026
        </Badge>
        <h1 className="font-display font-bold text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">
          GoMilap <span className="text-gradient-brand">Privacy Policy</span>
        </h1>
        <p className="mt-5 text-muted-foreground text-lg max-w-2xl mx-auto">
          We take your privacy seriously. This policy explains what we collect, how we use it, and the rights you have.
        </p>
      </section>

      <div className="px-6 pb-24 max-w-6xl mx-auto grid lg:grid-cols-[260px_1fr] gap-10">
        {/* TOC */}
        <aside className="lg:sticky lg:top-28 self-start">
          <Card className="glass">
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Table of Contents
              </p>
              <nav className="space-y-1.5 text-sm">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* Content */}
        <article className="prose prose-invert max-w-none">
          {/* 1 */}
          <SectionHeading id="introduction">1. Introduction &amp; Scope</SectionHeading>
          <p className="text-muted-foreground leading-relaxed">
            Welcome to GoMilap! This Privacy Policy explains how GoMilap ("we," "our," or "us") collects, uses, discloses,
            and protects your personal information when you use our website, mobile application, and related services
            (collectively, the "Services").
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            GoMilap is a social networking platform for adults aged 18 and above. We are committed to protecting your privacy
            and complying with applicable privacy laws, including:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1 text-muted-foreground">
            <li><strong>India:</strong> Information Technology Act, 2000 &amp; IT (Reasonable Security Practices) Rules, 2011</li>
            <li><strong>European Union:</strong> General Data Protection Regulation (GDPR)</li>
            <li><strong>United Kingdom:</strong> UK GDPR</li>
            <li><strong>United States:</strong> California Consumer Privacy Act (CCPA)</li>
            <li><strong>Global Best Practices:</strong> Google Play Store privacy requirements</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            By using GoMilap, you consent to the collection and use of your information as described in this Privacy Policy.
          </p>

          {/* 2 */}
          <SectionHeading id="information-we-collect">2. Information We Collect</SectionHeading>

          <SubHeading>2.1 Information You Provide Directly</SubHeading>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Category</TableHead><TableHead>Specific Information Collected</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>Account Information</TableCell><TableCell>Name, email, phone, date of birth, gender, password</TableCell></TableRow>
              <TableRow><TableCell>Profile Information</TableCell><TableCell>Profile photo, bio, interests, preferences</TableCell></TableRow>
              <TableRow><TableCell>Payment Information</TableCell><TableCell>Payment method details, transaction history</TableCell></TableRow>
              <TableRow><TableCell>Communications</TableCell><TableCell>Chat messages, friend requests, reports, feedback</TableCell></TableRow>
              <TableRow><TableCell>Verification Data</TableCell><TableCell>Government ID (optional), facial scan (with consent)</TableCell></TableRow>
            </TableBody>
          </Table>

          <SubHeading>2.2 Information Collected Automatically</SubHeading>
          <Table>
            <TableHeader><TableRow><TableHead>Category</TableHead><TableHead>Specific Information</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow><TableCell>Device Information</TableCell><TableCell>Device model, OS, identifiers, IP address</TableCell></TableRow>
              <TableRow><TableCell>Usage Information</TableCell><TableCell>Features used, time spent, pages, clicks, scroll</TableCell></TableRow>
              <TableRow><TableCell>Location Information</TableCell><TableCell>Approximate (IP), precise (with consent)</TableCell></TableRow>
              <TableRow><TableCell>Cookies &amp; Tracking</TableCell><TableCell>Session, analytics, advertising identifiers</TableCell></TableRow>
            </TableBody>
          </Table>

          <SubHeading>2.3 Information from Third Parties</SubHeading>
          <Table>
            <TableHeader><TableRow><TableHead>Source</TableHead><TableHead>Information Collected</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow><TableCell>Google Login</TableCell><TableCell>Name, email, profile picture</TableCell></TableRow>
              <TableRow><TableCell>Facebook Login</TableCell><TableCell>Name, email, profile picture, gender</TableCell></TableRow>
              <TableRow><TableCell>Apple Sign-In</TableCell><TableCell>Name, email (private relay)</TableCell></TableRow>
              <TableRow><TableCell>Payment Processors</TableCell><TableCell>Payment confirmation, billing details</TableCell></TableRow>
            </TableBody>
          </Table>

          <SubHeading>2.4 Sensitive Personal Information (India Specific)</SubHeading>
          <Table>
            <TableHeader><TableRow><TableHead>SPDI Category</TableHead><TableHead>Collected?</TableHead><TableHead>Purpose</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow><TableCell>Passwords</TableCell><TableCell>✅ Yes</TableCell><TableCell>Account security</TableCell></TableRow>
              <TableRow><TableCell>Financial information</TableCell><TableCell>✅ Yes</TableCell><TableCell>Premium payments</TableCell></TableRow>
              <TableRow><TableCell>Sexual orientation</TableCell><TableCell>✅ Yes</TableCell><TableCell>User preferences (consent)</TableCell></TableRow>
              <TableRow><TableCell>Biometric information</TableCell><TableCell>✅ Yes</TableCell><TableCell>Age verification (consent)</TableCell></TableRow>
              <TableRow><TableCell>Health / Medical records</TableCell><TableCell>❌ No</TableCell><TableCell>Not collected</TableCell></TableRow>
            </TableBody>
          </Table>

          {/* 3 */}
          <SectionHeading id="how-we-use">3. How We Use Your Information</SectionHeading>
          <Table>
            <TableHeader><TableRow><TableHead>Purpose</TableHead><TableHead>India Basis</TableHead><TableHead>GDPR Basis</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow><TableCell>Provide Services</TableCell><TableCell>Contract</TableCell><TableCell>Art. 6(1)(b)</TableCell></TableRow>
              <TableRow><TableCell>Matching &amp; Discovery</TableCell><TableCell>Legitimate interest</TableCell><TableCell>Art. 6(1)(f)</TableCell></TableRow>
              <TableRow><TableCell>Real-time Chat</TableCell><TableCell>Contract</TableCell><TableCell>Art. 6(1)(b)</TableCell></TableRow>
              <TableRow><TableCell>Push Notifications</TableCell><TableCell>Consent</TableCell><TableCell>Art. 6(1)(a)</TableCell></TableRow>
              <TableRow><TableCell>Email Marketing</TableCell><TableCell>Consent</TableCell><TableCell>Art. 6(1)(a)</TableCell></TableRow>
              <TableRow><TableCell>Fraud Prevention</TableCell><TableCell>Legal obligation</TableCell><TableCell>Art. 6(1)(c)</TableCell></TableRow>
              <TableRow><TableCell>Age Verification</TableCell><TableCell>Legal obligation</TableCell><TableCell>Art. 6(1)(c) + 9(2)</TableCell></TableRow>
              <TableRow><TableCell>Analytics &amp; Improvement</TableCell><TableCell>Legitimate interest</TableCell><TableCell>Art. 6(1)(f)</TableCell></TableRow>
              <TableRow><TableCell>Legal Compliance</TableCell><TableCell>Legal obligation</TableCell><TableCell>Art. 6(1)(c)</TableCell></TableRow>
            </TableBody>
          </Table>

          {/* 4 */}
          <SectionHeading id="how-we-share">4. How We Share Your Information</SectionHeading>
          <SubHeading>4.1 Categories of Recipients</SubHeading>
          <Table>
            <TableHeader><TableRow><TableHead>Recipient</TableHead><TableHead>Information</TableHead><TableHead>Purpose</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow><TableCell>Other GoMilap Users</TableCell><TableCell>Profile, photos, bio, interests</TableCell><TableCell>Discovery &amp; matching</TableCell></TableRow>
              <TableRow><TableCell>Service Providers</TableCell><TableCell>Account &amp; usage data</TableCell><TableCell>Hosting, analytics, payments</TableCell></TableRow>
              <TableRow><TableCell>Advertising Partners</TableCell><TableCell>Device info, advertising ID</TableCell><TableCell>Targeted advertising</TableCell></TableRow>
              <TableRow><TableCell>Law Enforcement</TableCell><TableCell>Account &amp; usage data</TableCell><TableCell>Legal compliance, court orders</TableCell></TableRow>
              <TableRow><TableCell>Business Transfers</TableCell><TableCell>All relevant data</TableCell><TableCell>Merger, acquisition, sale</TableCell></TableRow>
            </TableBody>
          </Table>

          <SubHeading>4.2 Information Visible to Other Users</SubHeading>
          <Table>
            <TableHeader><TableRow><TableHead>Information</TableHead><TableHead>Visibility</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow><TableCell>Profile photo, name, age, bio, interests</TableCell><TableCell>✅ Public to all users</TableCell></TableRow>
              <TableRow><TableCell>Approximate location (city)</TableCell><TableCell>✅ Public</TableCell></TableRow>
              <TableRow><TableCell>Exact location, email, phone</TableCell><TableCell>❌ Hidden</TableCell></TableRow>
              <TableRow><TableCell>Chat messages</TableCell><TableCell>🔒 Only between participants</TableCell></TableRow>
            </TableBody>
          </Table>

          <Card className="glass mt-6 border-primary/30">
            <CardContent className="p-5 flex gap-3 items-start">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm"><strong>We do not sell your personal information.</strong> We only share as described in this policy.</p>
            </CardContent>
          </Card>

          {/* 5 */}
          <SectionHeading id="cookies">5. Cookies &amp; Tracking Technologies</SectionHeading>
          <Table>
            <TableHeader><TableRow><TableHead>Cookie Type</TableHead><TableHead>Purpose</TableHead><TableHead>Consent</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow><TableCell>Essential</TableCell><TableCell>Authentication, security, app functionality</TableCell><TableCell>❌ No</TableCell></TableRow>
              <TableRow><TableCell>Preference</TableCell><TableCell>Language, theme, saved settings</TableCell><TableCell>✅ Yes</TableCell></TableRow>
              <TableRow><TableCell>Analytics</TableCell><TableCell>Usage tracking, crash reporting</TableCell><TableCell>✅ Yes</TableCell></TableRow>
              <TableRow><TableCell>Advertising</TableCell><TableCell>Targeted ads, campaign measurement</TableCell><TableCell>✅ Yes</TableCell></TableRow>
            </TableBody>
          </Table>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Manage cookies via your browser, our in-app Cookie Consent Manager, or globally at{' '}
            <a className="text-primary hover:underline" href="https://www.youronlinechoices.com" target="_blank" rel="noreferrer">
              youronlinechoices.com
            </a>.
          </p>

          {/* 6 */}
          <SectionHeading id="your-rights">6. Your Privacy Choices &amp; Rights</SectionHeading>
          <SubHeading>Rights Available to All Users</SubHeading>
          <Table>
            <TableHeader><TableRow><TableHead>Right</TableHead><TableHead>How to Exercise</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow><TableCell>Access your data</TableCell><TableCell>Email privacy@gomilap.com</TableCell></TableRow>
              <TableRow><TableCell>Correct information</TableCell><TableCell>In-app profile edit</TableCell></TableRow>
              <TableRow><TableCell>Delete account &amp; data</TableCell><TableCell>Profile → Delete Account</TableCell></TableRow>
              <TableRow><TableCell>Opt-out of marketing</TableCell><TableCell>Click "unsubscribe" in email</TableCell></TableRow>
              <TableRow><TableCell>Withdraw consent</TableCell><TableCell>App Settings → Privacy</TableCell></TableRow>
            </TableBody>
          </Table>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Additional rights apply for users in India (IT Act), EU/UK (GDPR — erasure, restriction, objection, portability,
            complaint), and California (CCPA — know, delete, opt-out, non-discrimination).
          </p>

          {/* 7 */}
          <SectionHeading id="security">7. Data Security</SectionHeading>
          <ul className="list-disc pl-6 mt-3 space-y-1 text-muted-foreground">
            <li><strong>Encryption:</strong> TLS 1.3 in transit, AES-256 at rest</li>
            <li><strong>Access Controls:</strong> Role-based, MFA for employees</li>
            <li><strong>Regular Audits:</strong> Quarterly assessments &amp; penetration testing</li>
            <li><strong>Data Minimization:</strong> Collect only what is necessary</li>
            <li><strong>Employee Training:</strong> Mandatory privacy &amp; security training</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-3">
            In a data breach, we notify affected users and authorities within 72 hours as required under IT Rules and GDPR.
          </p>

          {/* 8 */}
          <SectionHeading id="retention">8. Data Retention</SectionHeading>
          <Table>
            <TableHeader><TableRow><TableHead>Data Type</TableHead><TableHead>Retention Period</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow><TableCell>Active account data</TableCell><TableCell>Duration of account + 30 days</TableCell></TableRow>
              <TableRow><TableCell>Deleted account data</TableCell><TableCell>Permanently deleted within 90 days</TableCell></TableRow>
              <TableRow><TableCell>Chat messages</TableCell><TableCell>Deleted with account</TableCell></TableRow>
              <TableRow><TableCell>Transaction records</TableCell><TableCell>7 years (tax/legal)</TableCell></TableRow>
              <TableRow><TableCell>Verification data</TableCell><TableCell>1 year or as required by law</TableCell></TableRow>
              <TableRow><TableCell>Support tickets</TableCell><TableCell>2 years after resolution</TableCell></TableRow>
              <TableRow><TableCell>Analytics data</TableCell><TableCell>26 months</TableCell></TableRow>
            </TableBody>
          </Table>

          {/* 9 */}
          <SectionHeading id="children">9. Children's Privacy (Under 18)</SectionHeading>
          <Card className="glass border-destructive/40">
            <CardContent className="p-5 flex gap-3 items-start">
              <Baby className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
              <div className="text-sm">
                <p><strong>GoMilap is strictly for users aged 18 and above.</strong></p>
                <p className="text-muted-foreground mt-2">
                  We do not knowingly collect data from anyone under 18. If we discover an underage user, we immediately
                  delete the account and all associated data, and report to authorities where required.
                </p>
                <p className="text-muted-foreground mt-2">
                  Parents/guardians: contact <a className="text-primary hover:underline" href="mailto:privacy@gomilap.com">privacy@gomilap.com</a>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 10 */}
          <SectionHeading id="third-party">10. Third-Party Links &amp; Features</SectionHeading>
          <Table>
            <TableHeader><TableRow><TableHead>Third Party</TableHead><TableHead>Feature</TableHead><TableHead>Privacy Policy</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow><TableCell>Google</TableCell><TableCell>Login, Analytics, Ads</TableCell><TableCell>policies.google.com/privacy</TableCell></TableRow>
              <TableRow><TableCell>Facebook</TableCell><TableCell>Login</TableCell><TableCell>facebook.com/policy.php</TableCell></TableRow>
              <TableRow><TableCell>Apple</TableCell><TableCell>Sign-in with Apple</TableCell><TableCell>apple.com/legal/privacy</TableCell></TableRow>
              <TableRow><TableCell>Razorpay</TableCell><TableCell>Payments (India)</TableCell><TableCell>razorpay.com/privacy</TableCell></TableRow>
              <TableRow><TableCell>Stripe</TableCell><TableCell>Payments (Global)</TableCell><TableCell>stripe.com/privacy</TableCell></TableRow>
            </TableBody>
          </Table>

          {/* 11 */}
          <SectionHeading id="transfers">11. International Data Transfers</SectionHeading>
          <p className="text-muted-foreground leading-relaxed">
            Your information may be stored and processed on servers in India (primary), the United States (backup, analytics),
            and the European Union (EU user data). Cross-border transfers from EU/UK to India use Standard Contractual Clauses
            (SCCs) and the UK Addendum where applicable. Indian user data is hosted on local servers as required.
          </p>

          {/* 12 */}
          <SectionHeading id="changes">12. Changes to This Policy</SectionHeading>
          <p className="text-muted-foreground leading-relaxed">
            Minor changes are reflected by an updated "Last Updated" date and in-app notice. Material changes are announced
            via email and an in-app popup with 30 days advance notice. Continued use after the effective date constitutes
            acceptance of the updated policy.
          </p>

          {/* 13 */}
          <SectionHeading id="grievance">13. Grievance Redressal (India Specific)</SectionHeading>
          <Table>
            <TableHeader><TableRow><TableHead>Detail</TableHead><TableHead>Information</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow><TableCell>Designation</TableCell><TableCell>Privacy &amp; Compliance Officer</TableCell></TableRow>
              <TableRow><TableCell>Email</TableCell><TableCell>grievance@gomilap.com</TableCell></TableRow>
              <TableRow><TableCell>Acknowledgment</TableCell><TableCell>Within 24 hours</TableCell></TableRow>
              <TableRow><TableCell>Resolution</TableCell><TableCell>Within 15 days</TableCell></TableRow>
            </TableBody>
          </Table>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Email grievance@gomilap.com with subject "Privacy Grievance — [Your Username]". If unsatisfied, you may escalate
            to the Ministry of Electronics &amp; Information Technology (MeitY) or seek legal remedies under the IT Act, 2000.
          </p>

          {/* 14 */}
          <SectionHeading id="contact">14. Contact Us</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <Card className="glass"><CardContent className="p-5 flex gap-3 items-start">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div><p className="font-semibold">General Privacy</p><p className="text-sm text-muted-foreground">privacy@gomilap.com</p></div>
            </CardContent></Card>
            <Card className="glass"><CardContent className="p-5 flex gap-3 items-start">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
              <div><p className="font-semibold">Data Protection Officer</p><p className="text-sm text-muted-foreground">dpo@gomilap.com</p></div>
            </CardContent></Card>
            <Card className="glass"><CardContent className="p-5 flex gap-3 items-start">
              <Globe2 className="h-5 w-5 text-primary mt-0.5" />
              <div><p className="font-semibold">EU Representative</p><p className="text-sm text-muted-foreground">eu-representative@gomilap.com</p></div>
            </CardContent></Card>
            <Card className="glass"><CardContent className="p-5 flex gap-3 items-start">
              <Globe2 className="h-5 w-5 text-primary mt-0.5" />
              <div><p className="font-semibold">UK Representative</p><p className="text-sm text-muted-foreground">uk-representative@gomilap.com</p></div>
            </CardContent></Card>
          </div>

          {/* 15 */}
          <SectionHeading id="jurisdictions">15. Additional Information for Specific Jurisdictions</SectionHeading>
          <SubHeading>California (CCPA)</SubHeading>
          <p className="text-muted-foreground leading-relaxed">
            Right to know, delete, opt-out of "sales/sharing" (we do not sell), and non-discrimination. To exercise: call
            1-800-GOMILAP or email privacy@gomilap.com.
          </p>
          <SubHeading>EU/EEA (GDPR) &amp; UK (UK GDPR)</SubHeading>
          <p className="text-muted-foreground leading-relaxed">
            You have the right to lodge a complaint with your local supervisory authority. UK users may contact the ICO
            at casework@ico.org.uk or +44 (0)303 123 1113.
          </p>
          <SubHeading>Brazil (LGPD)</SubHeading>
          <p className="text-muted-foreground leading-relaxed">
            We comply with Lei Geral de Proteção de Dados. Inquiries: lgpd@gomilap.com.
          </p>

          {/* 16 */}
          <SectionHeading id="google-play">16. Google Play Store Compliance Statement</SectionHeading>
          <Table>
            <TableHeader><TableRow><TableHead>Google Requirement</TableHead><TableHead>GoMilap Compliance</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow><TableCell>Privacy Policy required</TableCell><TableCell>✅ This document</TableCell></TableRow>
              <TableRow><TableCell>Disclose data collection</TableCell><TableCell>✅ Section 2</TableCell></TableRow>
              <TableRow><TableCell>Secure data transmission</TableCell><TableCell>✅ TLS 1.3</TableCell></TableRow>
              <TableRow><TableCell>No deceptive practices</TableCell><TableCell>✅ Transparent policies</TableCell></TableRow>
              <TableRow><TableCell>User data deletion</TableCell><TableCell>✅ Profile → Delete Account</TableCell></TableRow>
              <TableRow><TableCell>Age verification</TableCell><TableCell>✅ Face scan / ID verification</TableCell></TableRow>
              <TableRow><TableCell>No minor exposure</TableCell><TableCell>✅ 18+ only, enforced</TableCell></TableRow>
            </TableBody>
          </Table>

          {/* Quick Summary */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-brand-soft border border-primary/20">
            <h3 className="font-display font-semibold text-xl mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" /> Quick Summary
            </h3>
            <Table>
              <TableHeader><TableRow><TableHead>Question</TableHead><TableHead>Answer</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow><TableCell>What data do you collect?</TableCell><TableCell>Name, email, age, gender, photos, bio, interests, chats</TableCell></TableRow>
                <TableRow><TableCell>Who can see my data?</TableCell><TableCell>Other users see profile info. Email/phone hidden.</TableCell></TableRow>
                <TableRow><TableCell>Can I delete my data?</TableCell><TableCell>Yes → Profile → Delete Account</TableCell></TableRow>
                <TableRow><TableCell>Do you sell my data?</TableCell><TableCell>No, never.</TableCell></TableRow>
                <TableRow><TableCell>Is my chat private?</TableCell><TableCell>Yes, only between you and recipient.</TableCell></TableRow>
                <TableRow><TableCell>How do I contact support?</TableCell><TableCell>privacy@gomilap.com or grievance@gomilap.com</TableCell></TableRow>
              </TableBody>
            </Table>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-12">
            GoMilap — Building Trust, One Connection at a Time 💜💗 <br />
            This Privacy Policy was last updated on April 28, 2026.
          </p>
        </article>
      </div>
    </div>
  );
}
