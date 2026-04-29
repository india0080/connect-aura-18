import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, AlertTriangle, Mail } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';

const TOC = [
  { id: 'introduction', label: '1. Introduction' },
  { id: 'content-guidelines', label: '2. Content Guidelines' },
  { id: 'conduct-rules', label: '3. Conduct Rules' },
  { id: 'safety-features', label: '4. Safety Features' },
  { id: 'age-verification', label: '5. Age Verification' },
  { id: 'reporting', label: '6. Reporting and Enforcement' },
  { id: 'appeals', label: '7. Appeals Process' },
  { id: 'privacy', label: '8. Privacy and Data Protection' },
  { id: 'eea', label: '9. Special Provisions for EEA Users' },
  { id: 'amendments', label: '10. Amendments' },
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

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground mb-4 marker:text-primary">{children}</ul>;
}

function Callout({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'warning' | 'danger';
  title: string;
  children: React.ReactNode;
}) {
  const toneMap = {
    info: 'border-primary/40 bg-primary/5',
    warning: 'border-warning/40 bg-warning/5',
    danger: 'border-destructive/40 bg-destructive/5',
  };
  return (
    <div className={`rounded-2xl border p-5 my-5 ${toneMap[tone]}`}>
      <p className="font-display font-semibold mb-1 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-primary" /> {title}
      </p>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

export default function SafetyGuidelines() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Safety Policy & Community Guidelines — GoMilap"
        description="GoMilap's Safety Policy and Community Guidelines: rules, conduct, safety tools, reporting, and your rights."
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
          <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Safety &amp; Community
        </div>
        <h1 className="font-display font-bold text-4xl md:text-6xl mt-5 leading-[1.05]">
          Safety Policy &amp; <span className="text-gradient-brand">Community Guidelines</span>
        </h1>
        <p className="text-muted-foreground mt-5 max-w-2xl mx-auto">
          Rules and standards that keep GoMilap safe, inclusive, and respectful for everyone.
        </p>
        <p className="text-xs text-muted-foreground mt-4">Last Updated: June 2025 · Version 1.0</p>
      </section>

      {/* Body grid */}
      <section className="px-6 pb-24 max-w-6xl mx-auto w-full grid lg:grid-cols-[260px_1fr] gap-10">
        {/* TOC */}
        <aside className="lg:sticky lg:top-6 self-start">
          <div className="glass rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Contents</p>
            <nav className="flex flex-col gap-1.5 text-sm">
              {TOC.map((t) => (
                <a key={t.id} href={`#${t.id}`} className="hover:text-primary transition-colors">
                  {t.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <article className="min-w-0">
          {/* 1 */}
          <H2 id="introduction">1. Introduction</H2>
          <H3>1.1 Purpose</H3>
          <P>
            GoMilap is a dating platform designed to help people find meaningful connections, friendships, and
            relationships. We are committed to creating a safe, inclusive, and respectful environment for all our
            users. These Community Guidelines ("Guidelines") outline the rules and standards that govern user behavior
            and content on our platform.
          </P>
          <H3>1.2 Our Commitment</H3>
          <UL>
            <li><strong>Free Expression:</strong> We believe everyone deserves a voice. Diversity of perspectives and experiences enriches our community.</li>
            <li><strong>Safety First:</strong> We are committed to protecting our users from abuse, harassment, and harmful content.</li>
            <li><strong>Zero Tolerance for Discrimination:</strong> We prohibit conduct that targets individuals based on race, religion, ethnicity, national origin, sexual orientation, gender, gender identity, disability, or other protected characteristics.</li>
            <li><strong>Minor Protection:</strong> We have zero tolerance for any content that sexualizes or exploits minors.</li>
          </UL>
          <H3>1.3 Scope</H3>
          <P>These Guidelines apply to:</P>
          <UL>
            <li>All users of GoMilap</li>
            <li>All content posted on the platform (profiles, photos, messages, live streams)</li>
            <li>All features and areas of our platform</li>
          </UL>
          <P>
            These Guidelines are incorporated into our Terms of Service and Privacy Policy. By using GoMilap, you agree
            to comply with these Guidelines.
          </P>

          {/* 2 */}
          <H2 id="content-guidelines">2. Content Guidelines</H2>

          <H3>2.1 Adult Content</H3>
          <Callout tone="warning" title="Prohibited">You may not post or stream content that is pornographic or intended to cause sexual arousal.</Callout>
          <P>Examples include:</P>
          <UL>
            <li>Full or partial nudity (genitals, buttocks, breasts) that is prominent in photos</li>
            <li>Close-up shots of intimate body parts</li>
            <li>"Testing the line" content: excessive cleavage, low-rise shorts, see-through or tight clothing</li>
            <li>Obscene or dirty gestures (including the middle finger)</li>
            <li>Simulating sexual acts</li>
            <li>Sexual intercourse or other sexual acts (humans, animals with human features, cartoons, anime/hentai)</li>
            <li>Sexually explicit messages or content sent without consent</li>
          </UL>

          <H3>2.2 Graphic Violence</H3>
          <Callout tone="warning" title="Prohibited">You may not post or stream graphically violent or gory content.</Callout>
          <UL>
            <li>Gruesome crime or accident scenes</li>
            <li>Physical altercations and violence</li>
            <li>Bodily fluids (blood, feces, semen, etc.)</li>
            <li>Exposed internal organs or bones</li>
            <li>Serious bodily harm (visible wounds, broken bones)</li>
            <li>Animal torture or killing</li>
            <li>Severely injured or mutilated animals</li>
          </UL>

          <H3>2.3 Dangerous Activities and Products</H3>
          <Callout tone="warning" title="Prohibited">You may not post content depicting dangerous activities or products.</Callout>
          <UL>
            <li>Promotion of self-harm, suicide, or eating disorders</li>
            <li>Dangerous dares, games, challenges, or contests</li>
            <li>Illegal or dangerous controlled substances</li>
            <li>Instructions for creating weapons or explosives</li>
            <li>Streaming while driving any vehicle</li>
          </UL>

          <H3>2.4 Illegal or Regulated Goods and Services</H3>
          <UL>
            <li>Counterfeit goods</li>
            <li>Human trafficking</li>
            <li>Drugs and drug paraphernalia</li>
            <li>Financial fraud schemes</li>
            <li>Gambling services</li>
            <li>Products from endangered species</li>
            <li>Prostitution or sexual services</li>
            <li>Stolen goods</li>
            <li>Weapons, firearms, ammunition, explosives</li>
            <li>Instructions for making weapons</li>
          </UL>

          <H3>2.5 Intellectual Property</H3>
          <P>You may not post content that infringes on others' intellectual property rights, including copyrighted images, videos, music, trademarks, patents, and trade secrets.</P>

          <H3>2.6 Unauthorized Use</H3>
          <P>You may not post another person's voice or image without their permission. This includes recording or distributing content of others without consent, using photos or videos without authorization, and sharing screenshots of private conversations without consent.</P>

          <H3>2.7 Private Information</H3>
          <P>You may not post another person's private information without their permission, including:</P>
          <UL>
            <li>Personal photos or videos</li>
            <li>Phone numbers or addresses</li>
            <li>Social Security numbers or national ID numbers</li>
            <li>Financial information</li>
            <li>Any personally identifiable information</li>
          </UL>
          <P>You may not threaten to expose private information or encourage others to do so.</P>

          <H3>2.8 Spam and Security</H3>
          <UL>
            <li>Spamming other users</li>
            <li>Automated account creation or content posting</li>
            <li>Systematic or programmatic registration</li>
            <li>Uploading viruses, malware, or harmful code</li>
            <li>Data mining or scraping</li>
            <li>Disrupting platform operations</li>
            <li>Attempting to breach security measures</li>
          </UL>

          <H3>2.9 Advertising and Solicitation</H3>
          <UL>
            <li>Unsolicited advertising</li>
            <li>Promotional materials</li>
            <li>Spam messages</li>
            <li>Chain letters</li>
            <li>Pyramid schemes</li>
            <li>Unauthorized contests, giveaways, or sweepstakes</li>
          </UL>

          <H3>2.10 Impersonation</H3>
          <P>
            You may not impersonate individuals, groups, or organizations in a manner intended to or likely to mislead,
            confuse, or deceive others. This includes creating fake profiles that mimic celebrities, public figures, or
            other users.
          </P>

          {/* 3 */}
          <H2 id="conduct-rules">3. Conduct Rules</H2>

          <H3>3.1 Safety Threats and Abusive Conduct</H3>
          <P>You may not engage in, promote, threaten, or attempt conduct that creates a credible risk of harm to another person's physical or emotional safety. This includes threats of force or violence, stalking, harassment, coercion, exploitation, and any conduct that could reasonably lead to personal harm.</P>
          <Callout tone="danger" title="Consequences">Content or conduct of this nature may result in warnings, account suspension, or permanent termination. Illegal conduct will be reported to law enforcement when appropriate.</Callout>

          <H3>3.2 Violence and Physical Harm</H3>
          <UL>
            <li>Making specific threats of violence</li>
            <li>Wishing for serious physical harm, death, or disease of individuals or groups</li>
            <li>Promoting terrorism</li>
            <li>Encouraging suicide or self-harm</li>
          </UL>
          <Callout tone="danger" title="Zero Tolerance">Users deemed to be making violent threats will face immediate and permanent suspension.</Callout>

          <H3>3.3 Hateful Conduct and Bullying</H3>
          <P>You may not promote violence against, threaten, or harass others based on race, religion, ethnicity, national origin, sexual orientation, gender, gender identity, age, disability, serious disease, veteran status, or any other characteristic associated with systemic discrimination.</P>
          <P>Also prohibited:</P>
          <UL>
            <li>Using hateful images or symbols in profile images</li>
            <li>Using usernames, display names, or bios to engage in harassment or express hate</li>
            <li>Violent threats against identifiable targets</li>
            <li>Wishing for harm or calling for harm against groups</li>
            <li>Promoting mass murder or violent events</li>
            <li>Repeated slurs or epithets targeting protected categories</li>
            <li>Misgendering or deadnaming transgender individuals</li>
            <li>Hateful imagery (symbols of hate groups, dehumanizing images)</li>
          </UL>
          <P><em>Note:</em> Context matters. Members of protected groups may use terms consensually to reclaim historically demeaning language. You do not need to be a member of a target group for us to take action.</P>

          <H3>3.4 Harassment and Sexual Misconduct</H3>
          <UL>
            <li>Harassing another person or inciting others to harass</li>
            <li>Sending unwanted sexual content</li>
            <li>Objectifying others in sexually explicit ways</li>
            <li>Engaging in sexual misconduct</li>
            <li>Extortion or blackmail</li>
            <li>Publicly humiliating or harassing someone</li>
            <li>Harassing victims of tragic events or their families</li>
          </UL>
          <Callout tone="warning" title="Consent is essential">Engaging in sexual conduct with another person without their consent violates GoMilap policy, may be against the law, and may result in criminal or civil liability.</Callout>

          <H3>3.5 Minors</H3>
          <Callout tone="danger" title="Strict prohibition">GoMilap is for adults only (18+). You may not post content containing minors, nor allow minors to appear in your profile or streams — even your own children.</Callout>

          <H3>3.6 Child Sexual Exploitation</H3>
          <Callout tone="danger" title="Zero Tolerance">We have zero tolerance for any content that sexualizes minors or promotes child sexual exploitation.</Callout>
          <UL>
            <li>Visual depictions of minors in sexually explicit acts</li>
            <li>Computer-generated or illustrated sexual content involving minors</li>
            <li>Links to third-party sites hosting child exploitation material</li>
            <li>Fantasizing about or promoting child sexual exploitation</li>
            <li>Expressing desire to obtain child exploitation materials</li>
            <li>Recruiting minors for sexual purposes</li>
            <li>Engaging minors in sexually explicit conversations</li>
            <li>Identifying victims of childhood sexual exploitation</li>
          </UL>
          <P><strong>Action:</strong> Such content will be removed immediately and reported to NCMEC and local law enforcement.</P>

          <H3>3.7 Cyberbullying</H3>
          <UL>
            <li>Targeting individuals with repeated abuse</li>
            <li>Posting content intended to embarrass or humiliate</li>
            <li>Creating accounts to harass specific individuals</li>
            <li>Coordinated attacks on individuals or groups</li>
          </UL>

          {/* 4 */}
          <H2 id="safety-features">4. Safety Features</H2>
          <H3>4.1 In-App Safety Tools</H3>
          <UL>
            <li><strong>Block Users:</strong> Block specific users from contacting you or viewing your profile</li>
            <li><strong>Report:</strong> Report inappropriate content or behavior</li>
            <li><strong>Hide Profile:</strong> Temporarily hide your profile from search results</li>
            <li><strong>Safe Messaging:</strong> Report messages that make you uncomfortable</li>
            <li><strong>Video Verification:</strong> Verify your identity through video selfies</li>
            <li><strong>Location Protection:</strong> Control who can see your location</li>
          </UL>
          <H3>4.2 Matchmaking Safety</H3>
          <UL>
            <li>We encourage users to video chat before meeting in person</li>
            <li>We provide safety tips for offline meetings</li>
            <li>We do not conduct comprehensive criminal background checks on all users</li>
          </UL>
          <H3>4.3 Emergency Resources</H3>
          <P>If you experience sexual assault, domestic violence, stalking, or other serious harm, contact local law enforcement immediately.</P>

          {/* 5 */}
          <H2 id="age-verification">5. Age Verification</H2>
          <H3>5.1 Age Requirement</H3>
          <P>GoMilap is for adults only (18 years or older). We use age verification measures to confirm that members are at least 18 years old.</P>
          <H3>5.2 Verification Methods</H3>
          <UL>
            <li><strong>Biometric-based verification:</strong> Face scan age estimation (with user consent)</li>
            <li><strong>Government-issued ID verification:</strong> When biometric verification is unavailable or not chosen</li>
          </UL>
          <H3>5.3 Purpose</H3>
          <UL>
            <li>Eligibility confirmation</li>
            <li>Safety</li>
            <li>Fraud prevention</li>
          </UL>
          <Callout tone="info" title="Important">Verification processes are not guaranteed to be error-free and should not be relied upon as a substitute for personal judgment when interacting with others.</Callout>
          <H3>5.4 Biometric Data</H3>
          <P>Additional information about how GoMilap processes biometric data is provided in our Privacy Policy and Biometric Data Notice.</P>

          {/* 6 */}
          <H2 id="reporting">6. Reporting and Enforcement</H2>
          <H3>6.1 How to Report</H3>
          <UL>
            <li><strong>In-App Reporting:</strong> Use the Report button on the content or profile</li>
            <li><strong>Email:</strong> safety@gomilap.com</li>
            <li><strong>Contact Form:</strong> Submit through our contact page</li>
          </UL>
          <H3>6.2 What Happens When You Report</H3>
          <UL>
            <li>We acknowledge receipt of your report</li>
            <li>Our moderation team reviews the content</li>
            <li>We may contact you for additional information</li>
            <li>We make a decision promptly and carefully</li>
            <li>We notify you of our decision</li>
          </UL>
          <H3>6.3 Enforcement Actions</H3>
          <div className="overflow-x-auto rounded-2xl border border-border/60 my-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3 font-display">Violation Severity</th>
                  <th className="text-left p-3 font-display">Possible Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr><td className="p-3">Minor</td><td className="p-3 text-muted-foreground">Warning, content removal</td></tr>
                <tr><td className="p-3">Moderate</td><td className="p-3 text-muted-foreground">Temporary suspension (1–30 days)</td></tr>
                <tr><td className="p-3">Serious</td><td className="p-3 text-muted-foreground">Extended suspension (30+ days)</td></tr>
                <tr><td className="p-3">Severe</td><td className="p-3 text-muted-foreground">Permanent account termination</td></tr>
                <tr><td className="p-3">Criminal</td><td className="p-3 text-muted-foreground">Report to law enforcement</td></tr>
              </tbody>
            </table>
          </div>
          <H3>6.4 Factors We Consider</H3>
          <UL>
            <li>Severity and nature of the violation</li>
            <li>User's previous record</li>
            <li>Context of the content</li>
            <li>User's demonstrated remorse</li>
            <li>Impact on affected parties</li>
          </UL>
          <P><strong>Immediate Termination:</strong> Accounts engaging primarily in abusive behavior, extremely offensive conduct, or violent threats may be permanently suspended upon initial review.</P>
          <H3>6.5 Law Enforcement Cooperation</H3>
          <P>When we become aware of information suggesting a criminal offense that threatens the life or safety of any person, we will promptly notify law enforcement and provide relevant information.</P>
          <H3>6.6 Misuse of Reporting</H3>
          <UL>
            <li>Submitting obviously unfounded reports may result in sanctions</li>
            <li>We investigate each report carefully before determining misuse</li>
            <li>Repeated obviously unfounded reports constitute abuse and may result in temporary or permanent exclusion</li>
          </UL>

          {/* 7 */}
          <H2 id="appeals">7. Appeals Process</H2>
          <H3>7.1 Right to Appeal</H3>
          <P>If your account is suspended or terminated, you may request a review of the decision.</P>
          <H3>7.2 How to Appeal</H3>
          <UL>
            <li>Look for the appeal option in the notification you received</li>
            <li>Submit your appeal through the provided form</li>
            <li>Provide relevant information supporting your appeal</li>
            <li>Wait for our response (typically within 7 business days)</li>
          </UL>
          <H3>7.3 Appeal Review</H3>
          <UL>
            <li>Reviewed by a different team than the original decision-makers</li>
            <li>Each appeal is evaluated on a case-by-case basis</li>
            <li>Outcomes are at GoMilap's discretion</li>
            <li>We consider all submitted information carefully</li>
          </UL>
          <H3>7.4 External Resolution (EEA Users)</H3>
          <P>Users in the European Economic Area may also choose to use certified out-of-court dispute resolution bodies after exhausting internal remedies.</P>

          {/* 8 */}
          <H2 id="privacy">8. Privacy and Data Protection</H2>
          <H3>8.1 Data We Collect</H3>
          <UL>
            <li>Profile information</li>
            <li>Photos and videos</li>
            <li>Messages and chat content</li>
            <li>Usage data</li>
            <li>Device information</li>
            <li>Location data (with consent)</li>
          </UL>
          <H3>8.2 How We Use Data</H3>
          <UL>
            <li>Provide and improve our services</li>
            <li>Verify age and identity</li>
            <li>Detect and prevent fraud and abuse</li>
            <li>Respond to reports and enforce guidelines</li>
            <li>Comply with legal obligations</li>
          </UL>
          <H3>8.3 Your Rights</H3>
          <UL>
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to certain processing</li>
            <li>Export your data</li>
            <li>Withdraw consent</li>
          </UL>
          <H3>8.4 Data Retention</H3>
          <UL>
            <li>We retain data only as long as necessary</li>
            <li>Inactive accounts are deleted after a specified period</li>
            <li>Data related to violations may be retained for longer for legal compliance</li>
          </UL>

          {/* 9 */}
          <H2 id="eea">9. Special Provisions for EEA Users</H2>
          <H3>9.1 GDPR Compliance</H3>
          <P>For users in the European Economic Area, these Guidelines supplement the rights and obligations under GDPR.</P>
          <H3>9.2 Additional Rights</H3>
          <UL>
            <li>Right to lodge complaints with supervisory authorities</li>
            <li>Right to effective judicial remedy</li>
            <li>Right to compensation for damages</li>
          </UL>
          <H3>9.3 Decision Transparency</H3>
          <UL>
            <li>We will explain the reasons for our decision</li>
            <li>We will inform you of available remedies</li>
            <li>We will not include illegal content in explanations (we describe it instead)</li>
          </UL>
          <H3>9.4 Dispute Resolution</H3>
          <UL>
            <li>Use our internal complaint system</li>
            <li>Contact certified out-of-court dispute resolution bodies</li>
            <li>Pursue judicial remedies</li>
          </UL>
          <H3>9.5 Out-of-Court Dispute Resolution</H3>
          <P>If internal complaint resolution is unsatisfactory, EEA users may contact the EU Online Dispute Resolution Platform or any certified dispute resolution body.</P>

          {/* 10 */}
          <H2 id="amendments">10. Amendments</H2>
          <H3>10.1 Updates</H3>
          <P>We may update these Guidelines periodically to reflect changes in our services, address emerging issues, and comply with legal requirements.</P>
          <H3>10.2 Notification</H3>
          <UL>
            <li>We will update the "Last Updated" date</li>
            <li>We will notify users via email or in-app notification</li>
            <li>Significant changes will be highlighted</li>
          </UL>
          <H3>10.3 Continued Use</H3>
          <P>Your continued use of GoMilap after changes to these Guidelines constitutes acceptance of the updated Guidelines.</P>

          {/* Contact */}
          <div className="mt-16 glass rounded-2xl p-6">
            <h3 className="font-display font-bold text-2xl mb-2 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" /> Contact the GoMilap Safety Team
            </h3>
            <p className="text-muted-foreground text-sm mb-3">
              For safety reports: <a href="mailto:safety@gomilap.com" className="text-primary hover:underline">safety@gomilap.com</a>
              <br />
              For general inquiries: <a href="mailto:support@gomilap.com" className="text-primary hover:underline">support@gomilap.com</a>
              <br />
              In-app: Use the Report button on any content or profile.
            </p>
          </div>

          {/* Appendix A */}
          <H2 id="appendix-a">Appendix A · Quick Reference: Prohibited Content</H2>
          <div className="overflow-x-auto rounded-2xl border border-border/60 my-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3 font-display">Category</th>
                  <th className="text-left p-3 font-display">Examples</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                <tr><td className="p-3 text-foreground">Adult Content</td><td className="p-3">Nudity, sexual acts, explicit messages</td></tr>
                <tr><td className="p-3 text-foreground">Violence</td><td className="p-3">Gore, injury, fighting, animal cruelty</td></tr>
                <tr><td className="p-3 text-foreground">Dangerous Content</td><td className="p-3">Self-harm promotion, substance abuse</td></tr>
                <tr><td className="p-3 text-foreground">Illegal Goods</td><td className="p-3">Drugs, weapons, stolen items</td></tr>
                <tr><td className="p-3 text-foreground">Hate Speech</td><td className="p-3">Attacks on protected groups</td></tr>
                <tr><td className="p-3 text-foreground">Child Exploitation</td><td className="p-3">Any sexual content involving minors</td></tr>
                <tr><td className="p-3 text-foreground">Spam</td><td className="p-3">Unsolicited ads, automated messages</td></tr>
                <tr><td className="p-3 text-foreground">Impersonation</td><td className="p-3">Fake profiles mimicking others</td></tr>
              </tbody>
            </table>
          </div>

          {/* Appendix B */}
          <H2 id="appendix-b">Appendix B · Enforcement Quick Reference</H2>
          <div className="overflow-x-auto rounded-2xl border border-border/60 my-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3 font-display">Violation Type</th>
                  <th className="text-left p-3 font-display">Consequence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                <tr><td className="p-3 text-foreground">Spam / Advertising</td><td className="p-3">Content removal, warning</td></tr>
                <tr><td className="p-3 text-foreground">Mild harassment</td><td className="p-3">Warning, temporary suspension</td></tr>
                <tr><td className="p-3 text-foreground">Severe harassment</td><td className="p-3">Suspension, termination</td></tr>
                <tr><td className="p-3 text-foreground">Violent threats</td><td className="p-3">Immediate permanent suspension</td></tr>
                <tr><td className="p-3 text-foreground">Child exploitation</td><td className="p-3">Immediate removal, law enforcement report</td></tr>
                <tr><td className="p-3 text-foreground">Illegal content</td><td className="p-3">Removal, possible legal action</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground mt-12 text-center">
            Last Updated: June 2025 · Version 1.0 · © {new Date().getFullYear()} GoMilap. All rights reserved.
          </p>
        </article>
      </section>
    </div>
  );
}
