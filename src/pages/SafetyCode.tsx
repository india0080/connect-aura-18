import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, BadgeCheck, Mail, Phone } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';

const TOC = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'commitment', label: 'Our Commitment' },
  { id: 'scope', label: 'Scope and Application' },
  { id: 'pillars', label: 'Part 1 · Safety Pillars' },
  { id: 'reporting', label: 'Part 2 · User Reporting Process' },
  { id: 'enforcement', label: 'Part 3 · Enforcement & Accountability' },
  { id: 'resources', label: 'Part 4 · Resources & Support' },
  { id: 'references', label: 'Part 5 · Policy References' },
  { id: 'administration', label: 'Part 6 · Code Administration' },
  { id: 'declaration', label: 'Declaration' },
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-display font-bold text-3xl md:text-4xl mt-16 mb-5 scroll-mt-24">
      {children}
    </h2>
  );
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display font-semibold text-xl md:text-2xl mt-8 mb-3">{children}</h3>;
}
function H4({ children }: { children: React.ReactNode }) {
  return <h4 className="font-display font-semibold text-base md:text-lg mt-5 mb-2 text-foreground/90">{children}</h4>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>;
}
function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground mb-4 marker:text-primary">{children}</ul>;
}
function OL({ children }: { children: React.ReactNode }) {
  return <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground mb-4 marker:text-primary">{children}</ol>;
}

export default function SafetyCode() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Online Safety Code for Dating Services — GoMilap"
        description="GoMilap's Online Safety Code for Dating Services: safety pillars, reporting, enforcement and accountability."
      />

      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto w-full">
        <Logo />
        <Button asChild variant="ghost" size="sm" className="gap-2">
          <Link to="/"><ArrowLeft className="h-4 w-4" /> Back to home</Link>
        </Button>
      </header>

      {/* Hero */}
      <section className="px-6 pt-8 pb-12 max-w-4xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-brand-soft border border-border/60 text-xs">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Online Safety Code · Dating Services
        </div>
        <h1 className="font-display font-bold text-4xl md:text-6xl mt-5 leading-[1.05]">
          GoMilap Online Safety Code for <span className="text-gradient-brand">Dating Services</span>
        </h1>
        <p className="text-muted-foreground mt-5 max-w-2xl mx-auto">
          A voluntary, collaborative industry code of practice designed to reduce online-enabled harm to dating service
          users in India.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-brand text-primary-foreground shadow-glow text-sm font-medium">
          <BadgeCheck className="h-4 w-4" /> Tier 2 Code Rating
        </div>
        <p className="text-xs text-muted-foreground mt-4">Version 1.0 · June 2025</p>
      </section>

      {/* Body */}
      <section className="px-6 pb-24 max-w-6xl mx-auto w-full grid lg:grid-cols-[260px_1fr] gap-10">
        <aside className="lg:sticky lg:top-6 self-start">
          <div className="glass rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Contents</p>
            <nav className="flex flex-col gap-1.5 text-sm">
              {TOC.map((t) => (
                <a key={t.id} href={`#${t.id}`} className="hover:text-primary transition-colors">{t.label}</a>
              ))}
            </nav>
          </div>
        </aside>

        <article className="min-w-0">
          <H2 id="introduction">Introduction</H2>
          <P>
            GoMilap is proud to participate in the Online Safety Code for Dating Services, a voluntary and collaborative
            industry code of practice designed to reduce the risk of online-enabled harm to dating service users in
            India. This Code reflects our commitment to creating a safe, inclusive, and respectful environment for all
            members of our community.
          </P>
          <P>
            As one of India's leading dating platforms, GoMilap serves millions of users seeking meaningful connections,
            friendships, and relationships. We understand the trust our users place in us, and we are fully committed
            to adhering to the principles outlined in this Code, ensuring transparency, accountability, and ease of
            reporting.
          </P>
          <P>
            We have achieved a <strong>Tier 2 Code Rating</strong>, demonstrating our comprehensive approach to user
            safety and dedication to continuous improvement.
          </P>

          <H2 id="commitment">Our Commitment</H2>
          <UL>
            <li><strong>Transparency:</strong> Clear communication of our safety policies, reporting mechanisms, and enforcement actions</li>
            <li><strong>Accessibility:</strong> Easy-to-use tools for reporting concerns and accessing help</li>
            <li><strong>Accountability:</strong> Regular review and improvement of our safety measures</li>
            <li><strong>Collaboration:</strong> Working with industry partners, regulators, and safety organizations</li>
            <li><strong>User Empowerment:</strong> Equipping our community with knowledge and resources to stay safe</li>
          </UL>

          <H2 id="scope">Scope and Application</H2>
          <P>This Online Safety Code applies to all users of the GoMilap platform (mobile app and website), all features and services offered by GoMilap, and all interactions between users on our platform.</P>
          <P>This Code should be read in conjunction with our Terms of Service, <Link to="/safety" className="text-primary hover:underline">Community Guidelines</Link>, Privacy Policy, and Safety Center.</P>

          {/* Part 1 */}
          <H2 id="pillars">Part 1 · Safety Pillars</H2>

          <H3>1.1 Accountability and Transparency</H3>
          <H4>1.1.1 Dedicated Safety Team</H4>
          <P>GoMilap maintains a dedicated Safety and Trust Team responsible for:</P>
          <UL>
            <li>Reviewing user reports and content</li>
            <li>Enforcing community guidelines</li>
            <li>Identifying and addressing emerging safety concerns</li>
            <li>Collaborating with law enforcement when necessary</li>
          </UL>
          <P>Our moderation team operates 24/7 to ensure timely response to reports.</P>

          <H4>1.1.2 Reporting Mechanisms</H4>
          <P>We provide multiple channels for users to report safety concerns:</P>
          <UL>
            <li>In-app: Report button on user profiles, in chat messages, during video calls and live streams</li>
            <li>Email: <a href="mailto:safety@gomilap.com" className="text-primary hover:underline">safety@gomilap.com</a></li>
            <li>Contact form on our website</li>
            <li>Dedicated helpline for urgent concerns</li>
          </UL>

          <H4>1.1.3 Transparency Reports</H4>
          <P>We publish quarterly transparency reports detailing the number of reports received, categories of violations, actions taken, response times, and emerging trends.</P>

          <H4>1.1.4 User Notification</H4>
          <P>We strive to notify users of the actions taken in response to their reports. We will inform users:</P>
          <UL>
            <li>When a report has been received and reviewed</li>
            <li>When action has been taken against a reported account</li>
            <li>When we are unable to take action and the reasons why</li>
            <li>Available appeal options</li>
          </UL>

          <H3>1.2 Content Moderation</H3>
          <H4>1.2.1 Moderation Approach</H4>
          <UL>
            <li><strong>Automated Systems:</strong> AI-powered tools for initial content screening</li>
            <li><strong>Human Review:</strong> Trained moderators for complex cases and appeals</li>
            <li><strong>Community Reporting:</strong> Users can flag inappropriate content</li>
          </UL>

          <H4>1.2.2 Content Review Process</H4>
          <P>Reports are categorized and reviewed by trained moderators within the following timeframes:</P>
          <div className="overflow-x-auto rounded-2xl border border-border/60 my-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3 font-display">Priority</th>
                  <th className="text-left p-3 font-display">Examples</th>
                  <th className="text-left p-3 font-display">Response time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                <tr><td className="p-3 text-foreground">Critical</td><td className="p-3">Child exploitation, threats of violence</td><td className="p-3">Within 1 hour</td></tr>
                <tr><td className="p-3 text-foreground">High</td><td className="p-3">Harassment, hate speech, explicit content</td><td className="p-3">Within 4 hours</td></tr>
                <tr><td className="p-3 text-foreground">Medium</td><td className="p-3">Spam, minor violations</td><td className="p-3">Within 24 hours</td></tr>
                <tr><td className="p-3 text-foreground">Low</td><td className="p-3">Policy clarifications, minor issues</td><td className="p-3">Within 72 hours</td></tr>
              </tbody>
            </table>
          </div>

          <H4>1.2.3 Prohibited Content Categories</H4>
          <UL>
            <li><strong>Adult Content:</strong> Nudity, sexually explicit material, sexual harassment, content involving minors</li>
            <li><strong>Harmful Content:</strong> Graphic violence, self-harm, suicide, eating disorders, dangerous challenges</li>
            <li><strong>Hate Speech:</strong> Attacks based on protected characteristics, hateful symbols, degrading content</li>
            <li><strong>Illegal Content:</strong> Drugs, weapons, human trafficking, fraud, copyright infringement</li>
            <li><strong>Safety Threats:</strong> Threats of violence, stalking, doxing, malicious impersonation</li>
          </UL>

          <H4>1.2.4 Content Removal</H4>
          <P>When prohibited content is identified it is hidden immediately from public view, the user is notified, appropriate action is taken, and content is preserved for evidence if needed.</P>

          <H3>1.3 User Safety Tools</H3>
          <H4>1.3.1 Profile and Privacy Controls</H4>
          <UL>
            <li>Make profile private; control who can see your profile</li>
            <li>Hide from search results temporarily</li>
            <li>Choose what information appears on your profile</li>
            <li>Control who sees your last active status and who can message you</li>
            <li>Download your data, delete your account, manage notifications</li>
          </UL>

          <H4>1.3.2 Communication Controls</H4>
          <UL>
            <li>Block specific words or phrases</li>
            <li>Filter requests from users without photos</li>
            <li>Require users to answer questions before messaging</li>
            <li>Block users instantly, unmatch and remove conversation history</li>
          </UL>

          <H4>1.3.3 Safety Features During Interaction</H4>
          <UL>
            <li><strong>Chat:</strong> Quick report and block, screenshot detection (where feasible)</li>
            <li><strong>Video calls:</strong> In-call reporting, easy block, virtual backgrounds</li>
            <li><strong>Live streams:</strong> Report streamer or commenter, moderator-assisted moderation</li>
          </UL>

          <H4>1.3.4 Location and Identity Protection</H4>
          <UL>
            <li>Disable location sharing or set city-level only</li>
            <li>Use a nickname instead of full name</li>
            <li>Blur profile photos until you choose to reveal</li>
            <li>Face verification without showing on profile</li>
          </UL>

          <H4>1.3.5 Safety Resources</H4>
          <UL>
            <li>Safety tips during onboarding and an interactive safety guide</li>
            <li>Quick access to emergency contacts and support organizations</li>
            <li>Comprehensive Safety Center with dating tips and scam awareness</li>
          </UL>

          <H3>1.4 Age Assurance and Minor Protection</H3>
          <H4>1.4.1 Age Verification</H4>
          <P>GoMilap is strictly for adults (18+). We implement multi-layered age assurance using date-of-birth validation, behavioral analysis, photo and biometric age estimation (with consent), and ID verification (Passport, driver's license, Aadhaar) where legally available.</P>

          <H4>1.4.2 Minor Protection Measures</H4>
          <UL>
            <li>Users under 18 are not permitted on GoMilap</li>
            <li>Any sexual content involving minors is strictly prohibited</li>
            <li>Automated detection of content suggesting underage users</li>
            <li>Immediate removal of any detected CSAM and reporting to authorities</li>
          </UL>
          <P><strong>Zero tolerance:</strong> Any confirmed case of CSAM results in immediate permanent ban and full cooperation with law enforcement.</P>

          <H4>1.4.3 Parental Resources</H4>
          <UL>
            <li>Guide to talking to teens about online dating</li>
            <li>Information about parental control tools</li>
            <li>How to report concerns about underage users</li>
            <li>Contact information for child safety organizations</li>
          </UL>

          <H3>1.5 Collaboration and Industry Engagement</H3>
          <H4>1.5.1 Law Enforcement Cooperation</H4>
          <UL>
            <li>Dedicated portal and email: <a href="mailto:lawenforcement@gomilap.com" className="text-primary hover:underline">lawenforcement@gomilap.com</a></li>
            <li>Emergency response protocol for imminent danger</li>
            <li>Evidence preservation and production under valid legal requests</li>
            <li>Emergency requests answered within 2 hours</li>
          </UL>

          <H4>1.5.2 Industry Collaboration</H4>
          <UL>
            <li>Information sharing with partner platforms about known bad actors</li>
            <li>Partnership with anti-cybercrime organizations</li>
            <li>Active participation in Online Safety Code working groups</li>
          </UL>

          <H4>1.5.3 User Education Partnerships</H4>
          <UL>
            <li>Collaboration with women's safety and domestic violence organizations</li>
            <li>Mental health awareness initiatives</li>
            <li>Joint scam and fraud prevention campaigns</li>
          </UL>

          {/* Part 2 */}
          <H2 id="reporting">Part 2 · User Reporting Process</H2>

          <H3>2.2 Report a User Profile</H3>
          <OL>
            <li>Open the user's profile you wish to report</li>
            <li>Tap the "Report" button (three-dot menu or dedicated icon)</li>
            <li>Select a category: Harassment, Inappropriate Content, Fake Profile, Threats, Scam, Underage, Other</li>
            <li>Pick a sub-category and add supporting details</li>
            <li>Optionally attach screenshots</li>
            <li>Submit the report</li>
          </OL>

          <H3>2.3 Report a Chat Message</H3>
          <OL>
            <li>Open the conversation</li>
            <li>Long-press the message</li>
            <li>Select "Report Message"</li>
            <li>Choose a category and add details</li>
            <li>Submit the report</li>
          </OL>

          <H3>2.4 Report a Live Stream</H3>
          <P><strong>Streamer:</strong> Tap the "!" or "Report" button while watching → choose category → add details → submit.</P>
          <P><strong>Commenter:</strong> Tap the commenter's name → "Report" on their mini-profile → choose category → submit.</P>

          <H3>2.5 Report a Video Call</H3>
          <OL>
            <li>During the call, tap the menu/settings icon</li>
            <li>Select "Report Call" or "Report User"</li>
            <li>Choose a category and describe what happened</li>
            <li>Submit the report</li>
          </OL>

          <H3>2.6 Emergency Situations</H3>
          <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-5 my-4 text-sm">
            <p className="font-display font-semibold mb-2 flex items-center gap-2">
              <Phone className="h-4 w-4 text-destructive" /> If you are in immediate danger
            </p>
            <UL>
              <li>Exit the app immediately</li>
              <li>Call local emergency services (<strong>112</strong> in India)</li>
              <li>Contact a trusted person</li>
            </UL>
            <P>After the emergency is addressed, email <a href="mailto:safety@gomilap.com" className="text-primary hover:underline">safety@gomilap.com</a> with "URGENT" in the subject, or use the in-app report function.</P>
          </div>

          <H3>2.7 What We Do With Reports</H3>
          <div className="overflow-x-auto rounded-2xl border border-border/60 my-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3 font-display">Severity</th>
                  <th className="text-left p-3 font-display">Response time</th>
                  <th className="text-left p-3 font-display">Possible actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                <tr><td className="p-3 text-foreground">Critical</td><td className="p-3">Within 1 hour</td><td className="p-3">Immediate suspension, law enforcement report</td></tr>
                <tr><td className="p-3 text-foreground">High</td><td className="p-3">Within 4 hours</td><td className="p-3">Suspension, content removal, warning</td></tr>
                <tr><td className="p-3 text-foreground">Medium</td><td className="p-3">Within 24 hours</td><td className="p-3">Warning, content removal, restricted features</td></tr>
                <tr><td className="p-3 text-foreground">Low</td><td className="p-3">Within 72 hours</td><td className="p-3">Content removal, educational resources</td></tr>
              </tbody>
            </table>
          </div>

          {/* Part 3 */}
          <H2 id="enforcement">Part 3 · Enforcement and Accountability</H2>
          <H3>3.1 Enforcement Actions</H3>
          <UL>
            <li><strong>Level 1 — Content Removal:</strong> Removal with explanation and resources</li>
            <li><strong>Level 2 — Warning:</strong> Written warning, mandatory safety education</li>
            <li><strong>Level 3 — Feature Restrictions:</strong> Temporary limits on messaging, streaming or contact</li>
            <li><strong>Level 4 — Account Suspension:</strong> 7 days to 6 months, remediation required</li>
            <li><strong>Level 5 — Permanent Termination:</strong> Removal and prohibition on new accounts</li>
            <li><strong>Level 6 — Law Enforcement Referral:</strong> Reporting and evidence preservation</li>
          </UL>

          <H3>3.2 Appeal Process</H3>
          <P>Users may appeal an enforcement action via the notification received. A different team reviews the appeal, typically within 7 business days. Possible outcomes:</P>
          <UL>
            <li>Decision upheld</li>
            <li>Action modified (reduced)</li>
            <li>Action reversed</li>
            <li>Further investigation required</li>
          </UL>
          <P>For applicable regions, external resolution options include out-of-court dispute resolution bodies, regulatory complaints, and legal remedies.</P>

          <H3>3.3 Transparency in Enforcement</H3>
          <UL>
            <li>Number of reports received by category</li>
            <li>Average response times</li>
            <li>Action rates (warnings, suspensions, terminations)</li>
            <li>Appeals outcomes</li>
          </UL>

          {/* Part 4 */}
          <H2 id="resources">Part 4 · User Resources and Support</H2>

          <H3>4.1 Safety Center</H3>
          <P>Visit our Safety Center for step-by-step safety guides, video tutorials, FAQs, and downloadable resources.</P>

          <H3>4.2 Emergency Resources</H3>
          <H4>India Emergency Numbers</H4>
          <UL>
            <li>Police: <strong>100</strong></li>
            <li>Women Helpline: <strong>181</strong></li>
            <li>Child Helpline: <strong>1098</strong></li>
            <li>National Emergency: <strong>112</strong></li>
          </UL>
          <P>GoMilap Emergency Support: <a href="mailto:emergency@gomilap.com" className="text-primary hover:underline">emergency@gomilap.com</a></P>

          <H3>4.3 Support Organizations</H3>
          <P>We maintain referral lists for sexual assault, domestic violence, mental health, and scam-victim support organizations, accessible from the in-app Safety Center.</P>

          <H3>4.4 Safety Education</H3>
          <UL>
            <li>Mandatory safety tips and interactive quiz during onboarding</li>
            <li>Periodic safety reminders and feature-specific guidance</li>
            <li>Dating safety tips: safe offline meetings, red flags, identity verification</li>
          </UL>

          {/* Part 5 */}
          <H2 id="references">Part 5 · Policy References</H2>
          <UL>
            <li>Terms of Service — user agreement and platform rules</li>
            <li><Link to="/safety" className="text-primary hover:underline">Community Guidelines</Link> — content and conduct rules</li>
            <li>Privacy Policy — data collection and use</li>
            <li>Safety Policy — comprehensive safety approach</li>
            <li>Cookie Policy — cookie usage and choices</li>
            <li>Help Center — FAQs and support</li>
            <li>Trust and Safety Blog — updates and announcements</li>
          </UL>

          {/* Part 6 */}
          <H2 id="administration">Part 6 · Code Administration</H2>
          <H3>6.1 Code Compliance</H3>
          <UL>
            <li>Annual self-assessment against Code requirements</li>
            <li>Cooperation with Code monitoring bodies</li>
            <li>Transparent reporting of compliance status</li>
            <li>Continuous improvement based on feedback</li>
          </UL>
          <H3>6.2 Code Review</H3>
          <UL>
            <li>Annually, as a minimum</li>
            <li>Following significant platform changes</li>
            <li>In response to regulatory updates</li>
            <li>Based on user feedback and incident trends</li>
          </UL>

          <H3>6.3 Contact Us</H3>
          <div className="grid sm:grid-cols-2 gap-4 my-4">
            {[
              { label: 'General Safety', email: 'safety@gomilap.com' },
              { label: 'Code Compliance', email: 'compliance@gomilap.com' },
              { label: 'Law Enforcement', email: 'lawenforcement@gomilap.com' },
              { label: 'Media Inquiries', email: 'press@gomilap.com' },
            ].map((c) => (
              <div key={c.email} className="glass rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                <a href={`mailto:${c.email}`} className="font-display font-semibold text-primary hover:underline flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4" /> {c.email}
                </a>
              </div>
            ))}
          </div>

          {/* Declaration */}
          <H2 id="declaration">Declaration</H2>
          <P>GoMilap declares its commitment to comply with the Online Safety Code for Dating Services. We pledge to:</P>
          <UL>
            <li>Maintain transparent and accessible safety measures</li>
            <li>Provide easy-to-use reporting mechanisms</li>
            <li>Take prompt action on reported concerns</li>
            <li>Support user safety through education and resources</li>
            <li>Collaborate with industry partners and authorities</li>
            <li>Continuously improve our safety practices</li>
          </UL>

          <div className="overflow-x-auto rounded-2xl border border-border/60 my-6">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3 font-display">Version</th>
                  <th className="text-left p-3 font-display">Date</th>
                  <th className="text-left p-3 font-display">Changes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                <tr><td className="p-3 text-foreground">1.0</td><td className="p-3">June 2025</td><td className="p-3">Initial publication</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground mt-12 text-center">
            This Online Safety Code is subject to change. Users are encouraged to review the current version regularly. ·
            © {new Date().getFullYear()} GoMilap.
          </p>
        </article>
      </section>
    </div>
  );
}
