import { Link } from 'react-router-dom';
import { ArrowLeft, ScrollText, Mail, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';

const TOC = [
  { id: 'overview', label: '1. Overview' },
  { id: 'whistleblower', label: '2. Whistleblower System' },
  { id: 'supply-chain', label: '3. Supply Chain Due Diligence' },
  { id: 'dsa', label: '4. Digital Services Act' },
  { id: 'gdpr', label: '5. GDPR' },
  { id: 'it-act', label: '6. IT Act (India)' },
  { id: 'platform', label: '7. Platform-Specific Compliance' },
  { id: 'tos', label: '8. Terms of Service Acceptance' },
  { id: 'reporting', label: '9. Compliance Reporting' },
  { id: 'contact', label: '10. Contact Information' },
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

export default function Compliance() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Compliance — GoMilap"
        description="GoMilap Compliance Statement: whistleblower system, supply chain, DSA, GDPR, IT Act, and platform compliance."
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
          <ScrollText className="h-3.5 w-3.5 text-primary" /> Compliance Statement
        </div>
        <h1 className="font-display font-bold text-4xl md:text-6xl mt-5 leading-[1.05]">
          GoMilap <span className="text-gradient-brand">Compliance</span>
        </h1>
        <p className="text-muted-foreground mt-5 max-w-2xl mx-auto">
          Our commitment to legal compliance, ethical business practices, user protection, and transparency.
        </p>
        <p className="text-xs text-muted-foreground mt-4">Last Updated: June 2025 · Version 1.0 · © 2026 GoMilap. All rights reserved.</p>
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
          {/* 1 */}
          <H2 id="overview">1. Overview</H2>
          <P>
            GoMilap is committed to maintaining the highest standards of compliance across all aspects of our
            operations. As a responsible dating platform serving millions of users across India and internationally,
            we recognize our obligations under various legal frameworks and industry standards.
          </P>
          <P>This Compliance Statement outlines our commitment to:</P>
          <UL>
            <li><strong>Legal Compliance:</strong> Adherence to all applicable laws and regulations</li>
            <li><strong>Ethical Business Practices:</strong> Maintaining integrity in all operations</li>
            <li><strong>User Protection:</strong> Safeguarding user data and ensuring platform safety</li>
            <li><strong>Transparency:</strong> Providing clear information about our compliance measures</li>
            <li><strong>Continuous Improvement:</strong> Regular review and enhancement of compliance processes</li>
          </UL>
          <P>
            GoMilap operates within the legal framework of India and complies with international standards where
            applicable, including the EU's General Data Protection Regulation (GDPR) and the Digital Services Act (DSA)
            for users in the European Economic Area (EEA).
          </P>

          {/* 2 */}
          <H2 id="whistleblower">2. Whistleblower System</H2>
          <H3>2.1 Purpose and Scope</H3>
          <P>
            GoMilap maintains a comprehensive Whistleblower System to enable employees, contractors, partners, and
            stakeholders to report concerns about potential compliance violations, unethical behavior, or illegal
            activities without fear of retaliation. It also serves as our mechanism for compliance with the German Act
            on Corporate Due Diligence in Supply Chains (LkSG).
          </P>

          <H3>2.2 Reportable Matters</H3>
          <H4>Internal Matters</H4>
          <UL>
            <li>Violations of company policies or procedures</li>
            <li>Fraud, embezzlement, or financial irregularities</li>
            <li>Discrimination, harassment, or workplace misconduct</li>
            <li>Data privacy breaches</li>
            <li>Conflicts of interest</li>
            <li>Corruption or bribery</li>
            <li>Insider trading or market manipulation</li>
            <li>Endangerment of health and safety</li>
          </UL>
          <H4>External Matters</H4>
          <UL>
            <li>Supply chain human rights violations</li>
            <li>Environmental violations by suppliers or partners</li>
            <li>Modern slavery or forced labor</li>
            <li>Child labor</li>
            <li>Discrimination in employment practices</li>
            <li>Unfair labor practices</li>
          </UL>
          <H4>Platform-Specific Matters</H4>
          <UL>
            <li>Content that violates community guidelines</li>
            <li>Safety concerns affecting users</li>
            <li>Data breaches or security incidents</li>
            <li>Unauthorized access to user data</li>
            <li>Misuse of platform for illegal activities</li>
          </UL>

          <H3>2.3 Whistleblower Rights</H3>
          <UL>
            <li><strong>Confidentiality:</strong> Your identity will be protected to the fullest extent possible</li>
            <li><strong>Anonymity:</strong> You may submit reports anonymously</li>
            <li><strong>Non-Retaliation:</strong> You will not face dismissal, demotion, suspension, threats, or discrimination for reporting in good faith</li>
            <li><strong>Documentation:</strong> All reports will be documented and tracked</li>
          </UL>

          <H3>2.4 How to Submit a Report</H3>
          <UL>
            <li><strong>Online portal:</strong> Available 24/7, secure and encrypted, multiple language support</li>
            <li><strong>Email:</strong> <a href="mailto:grievance@gomilap.com" className="text-primary hover:underline">grievance@gomilap.com</a> (mark as confidential)</li>
            <li><strong>Postal address:</strong> GoMilap Compliance Team, marked "Confidential — Compliance Department Only"</li>
            <li><strong>In-person:</strong> Scheduled meeting with the Compliance Officer</li>
          </UL>

          <H3>2.5 Report Processing</H3>
          <UL>
            <li>Acknowledgment within 5 business days</li>
            <li>Initial assessment within 10 business days</li>
            <li>Investigation conducted by qualified personnel</li>
            <li>Outcome notification when appropriate</li>
            <li>Remediation and corrective actions implemented as necessary</li>
          </UL>

          <H3>2.6 Investigation Process</H3>
          <UL>
            <li>Reviewed by the Compliance Department</li>
            <li>Independence maintained throughout</li>
            <li>Conflicts of interest identified and managed</li>
            <li>Investigations conducted fairly and impartially</li>
            <li>Documentation preserved per legal requirements</li>
          </UL>

          {/* 3 */}
          <H2 id="supply-chain">3. Supply Chain Due Diligence</H2>
          <H3>3.1 Commitment</H3>
          <P>GoMilap is committed to ensuring that our supply chain and business relationships adhere to ethical principles, respecting human rights and environmental standards.</P>

          <H3>3.2 Scope</H3>
          <H4>Direct Suppliers and Service Providers</H4>
          <UL>
            <li>Cloud infrastructure providers</li>
            <li>Payment processing partners</li>
            <li>Marketing and advertising partners</li>
            <li>Data analytics and processing services</li>
            <li>Customer support providers</li>
          </UL>
          <H4>Business Partners</H4>
          <UL>
            <li>Joint venture partners</li>
            <li>Technology partners</li>
            <li>Integration partners</li>
            <li>Affiliate partners</li>
          </UL>

          <H3>3.3 Human Rights Commitments</H3>
          <P>We respect internationally recognized human rights, including the UDHR, UN Guiding Principles, ILO conventions, and Children's Rights and Business Principles.</P>
          <H4>Prohibited Practices</H4>
          <UL>
            <li>Forced or compulsory labor</li>
            <li>Child labor</li>
            <li>Human trafficking</li>
            <li>Slavery or servitude</li>
            <li>Discrimination in employment</li>
            <li>Violation of freedom of association</li>
            <li>Excessive working hours without compensation</li>
            <li>Inadequate workplace safety</li>
          </UL>

          <H3>3.4 Environmental Responsibilities</H3>
          <UL>
            <li>Comply with applicable environmental laws and regulations</li>
            <li>Minimize environmental impact of operations</li>
            <li>Implement sustainable practices where feasible</li>
            <li>Properly manage waste and emissions</li>
            <li>Conserve natural resources</li>
          </UL>

          <H3>3.5 Risk Assessment</H3>
          <UL>
            <li>Geographic areas with elevated human rights risks</li>
            <li>Industries with known labor concerns</li>
            <li>Specific suppliers with potential compliance gaps</li>
            <li>Emerging risks due to changing circumstances</li>
          </UL>

          <H3>3.6 Corrective Measures</H3>
          <UL>
            <li><strong>Immediate notification</strong> of supplier concerns</li>
            <li><strong>Corrective action plan</strong> developed and implemented</li>
            <li><strong>Verification</strong> that measures are in place</li>
            <li><strong>Consequences:</strong> failure to remediate may result in termination</li>
          </UL>

          <H3>3.7 Documentation and Reporting</H3>
          <UL>
            <li>Annual due diligence report published</li>
            <li>Records maintained for at least 7 years</li>
            <li>Compliance audits conducted regularly</li>
            <li>Transparent reporting on supply chain practices</li>
          </UL>

          {/* 4 */}
          <H2 id="dsa">4. Digital Services Act Compliance</H2>
          <H3>4.1 DSA Overview</H3>
          <P>The Digital Services Act (Regulation (EU) 2022/2065) creates a comprehensive framework for digital service providers. As a platform serving EEA users, GoMilap is committed to full compliance with applicable DSA requirements.</P>

          <H3>4.2 Platform Classification</H3>
          <P>Based on user activity data between August 2025 and February 2026, the average number of users that logged into GoMilap and actively used their profile within the EU was considerably lower than 45 million.</P>
          <P>Therefore, GoMilap is classified as a <strong>Standard Online Platform</strong> under the DSA, rather than a Very Large Online Platform (VLOP).</P>

          <H3>4.3 General DSA Obligations</H3>
          <UL>
            <li>Terms of Service in clear and accessible language</li>
            <li>Privacy Policy explaining data processing</li>
            <li>Community Guidelines outlining acceptable conduct</li>
            <li>Accessibility compliance for users with disabilities</li>
            <li>Accessible reporting mechanisms for illegal content</li>
            <li>Transparent decision-making on content removal</li>
            <li>Internal complaint handling and dispute resolution</li>
            <li>Annual compliance reports (voluntary)</li>
          </UL>

          <H3>4.4 VLOP Preparedness</H3>
          <UL>
            <li>Risk assessment systems with annual publication capability</li>
            <li>Scalable content moderation infrastructure</li>
            <li>Comprehensive user safety tools meeting VLOP standards</li>
            <li>Board-level governance accountability for safety</li>
            <li>Framework for independent third-party audits</li>
            <li>Crisis response protocols for systemic risks</li>
          </UL>

          <H3>4.5 Trusted Flaggers</H3>
          <P>GoMilap cooperates with trusted flaggers recognized under the DSA, including law enforcement agencies, consumer protection organizations, recognized civil society organizations, and industry safety partners. They receive priority processing, enhanced communication channels, and regular feedback on outcomes.</P>

          <H3>4.6 Data Access for Researchers</H3>
          <P>GoMilap may provide data access to vetted researchers studying algorithms and systemic risks, online safety, democratic processes, and public health — subject to data protection compliance, security requirements, research ethics approval, and appropriate use restrictions.</P>

          {/* 5 */}
          <H2 id="gdpr">5. General Data Protection Regulation (GDPR)</H2>
          <H3>5.1 GDPR Commitment</H3>
          <P>GoMilap is fully committed to compliance with Regulation (EU) 2016/679 for all EEA users.</P>

          <H3>5.2 Data Protection Principles</H3>
          <div className="overflow-x-auto rounded-2xl border border-border/60 my-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3 font-display">Principle</th>
                  <th className="text-left p-3 font-display">Implementation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                <tr><td className="p-3 text-foreground">Lawfulness, Fairness, Transparency</td><td className="p-3">Clear legal bases, transparent policies</td></tr>
                <tr><td className="p-3 text-foreground">Purpose Limitation</td><td className="p-3">Specified, explicit, legitimate purposes</td></tr>
                <tr><td className="p-3 text-foreground">Data Minimization</td><td className="p-3">Only necessary data is collected</td></tr>
                <tr><td className="p-3 text-foreground">Accuracy</td><td className="p-3">Systems for accuracy and updates</td></tr>
                <tr><td className="p-3 text-foreground">Storage Limitation</td><td className="p-3">Defined retention, unnecessary data deleted</td></tr>
                <tr><td className="p-3 text-foreground">Integrity &amp; Confidentiality</td><td className="p-3">Encryption, access controls, security</td></tr>
                <tr><td className="p-3 text-foreground">Accountability</td><td className="p-3">Documentation, processing records, DPO oversight</td></tr>
              </tbody>
            </table>
          </div>

          <H3>5.3 Legal Bases for Processing</H3>
          <UL>
            <li><strong>Contract Performance (Art. 6(1)(b)):</strong> registration, matching, payments</li>
            <li><strong>Legitimate Interests (Art. 6(1)(f)):</strong> fraud prevention, service improvement, direct marketing (with opt-out)</li>
            <li><strong>Consent (Art. 6(1)(a)):</strong> marketing, non-essential cookies, location, special-category data</li>
            <li><strong>Legal Obligation (Art. 6(1)(c)):</strong> tax, law enforcement, regulatory</li>
            <li><strong>Vital Interests (Art. 6(1)(d)):</strong> emergencies and immediate safety concerns</li>
          </UL>

          <H3>5.4 Data Subject Rights</H3>
          <UL>
            <li><strong>Access (Art. 15):</strong> know what data we hold, receive a copy</li>
            <li><strong>Rectification (Art. 16):</strong> correct inaccurate or incomplete data</li>
            <li><strong>Erasure (Art. 17):</strong> right to be forgotten, with legal exceptions</li>
            <li><strong>Restriction (Art. 18):</strong> limit processing in certain circumstances</li>
            <li><strong>Portability (Art. 20):</strong> receive data in a machine-readable format</li>
            <li><strong>Objection (Art. 21):</strong> object to legitimate-interest processing, marketing, automated decisions</li>
          </UL>

          <H3>5.5 Special Category Data</H3>
          <UL>
            <li>Explicit consent obtained</li>
            <li>Explicitly stated purposes</li>
            <li>Enhanced security and limited access controls</li>
            <li>Regular compliance audits</li>
          </UL>

          <H3>5.6 Data Protection Officer (DPO)</H3>
          <P>Contact us at <a href="mailto:grievance@gomilap.com" className="text-primary hover:underline">grievance@gomilap.com</a> for GDPR matters. Our team monitors GDPR compliance, advises on obligations, cooperates with supervisory authorities, and serves as the point of contact for data subjects.</P>

          <H3>5.7 Data Protection Impact Assessment (DPIA)</H3>
          <UL>
            <li>Large-scale processing of personal data</li>
            <li>Systematic profiling with significant effects</li>
            <li>Processing of special category data</li>
            <li>Systematic monitoring of public areas</li>
          </UL>

          <H3>5.8 Breach Notification</H3>
          <UL>
            <li>72-hour notification to the supervisory authority without undue delay</li>
            <li>User notification where there is high risk to rights and freedoms</li>
            <li>All breaches documented with remedial actions</li>
          </UL>

          <H3>5.9 International Data Transfers</H3>
          <UL>
            <li>Standard Contractual Clauses (SCCs)</li>
            <li>Adequacy decisions by the European Commission</li>
            <li>Binding Corporate Rules where applicable</li>
            <li>Explicit consent where appropriate</li>
          </UL>

          {/* 6 */}
          <H2 id="it-act">6. Information Technology Act Compliance (India)</H2>
          <H3>6.1 Indian Legal Framework</H3>
          <P>GoMilap operates in compliance with the Information Technology Act, 2000, the Information Technology (Amendment) Act, 2008, and relevant rules and regulations.</P>

          <H3>6.2 Intermediary Compliance</H3>
          <P>As a platform providing services to users in India, GoMilap functions as an Intermediary under Section 2(1)(w) of the IT Act, 2000.</P>
          <UL>
            <li><strong>Due diligence</strong> per Section 79</li>
            <li><strong>Content guidelines</strong> published with privacy policy and terms</li>
            <li><strong>Reporting mechanism</strong> with a designated, accessible Grievance Officer</li>
            <li><strong>Information preservation</strong> per legal requirements</li>
          </UL>

          <H3>6.3 Grievance Redressal</H3>
          <UL>
            <li><strong>Grievance Officer email:</strong> <a href="mailto:grievance@gomilap.com" className="text-primary hover:underline">grievance@gomilap.com</a></li>
            <li><strong>Acknowledgment:</strong> within 24 hours of receipt</li>
            <li><strong>Resolution:</strong> within 15 days of receipt</li>
          </UL>
          <H4>Grievance Categories</H4>
          <UL>
            <li>Content disrespecting the Indian Constitution</li>
            <li>Content threatening unity, integrity, or sovereignty</li>
            <li>Content affecting friendly relations with other countries</li>
            <li>Content causing hate or enmity</li>
            <li>Defamatory or obscene content</li>
            <li>Material that infringes copyright or trademark</li>
          </UL>

          <H3>6.4 Cyber Law Compliance</H3>
          <UL>
            <li>Section 43A — sensitive personal data protection</li>
            <li>Section 72A — penalty for disclosure of personal information</li>
            <li>Section 69 — directors to extend assistance to government</li>
            <li>Section 79 — safe harbor provisions</li>
          </UL>

          <H3>6.5 Data Localization</H3>
          <UL>
            <li>Primary storage of user data within India</li>
            <li>Compliance with payment-data localization mandates</li>
            <li>Secure backup systems maintained in India</li>
            <li>Cross-border data transfer restrictions observed</li>
          </UL>

          <H3>6.6 CERT-In Compliance</H3>
          <UL>
            <li>Time-synchronization per CERT-In direction</li>
            <li>Logs retained for specified periods</li>
            <li>Incident reporting capabilities established</li>
            <li>Documented and followed security practices</li>
          </UL>

          {/* 7 */}
          <H2 id="platform">7. Platform-Specific Compliance</H2>
          <H3>7.1 Terms of Service Acceptance</H3>
          <P>By using GoMilap, you agree to be bound by our Terms of Service, <Link to="/safety" className="text-primary hover:underline">Community Guidelines</Link>, Privacy Policy, Cookie Policy, and Safety Policy.</P>
          <UL>
            <li>Registration requires acknowledgment of all policies</li>
            <li>Continued use constitutes ongoing acceptance</li>
            <li>Policy changes communicated via email and in-app</li>
            <li>Significant changes may require re-acceptance</li>
          </UL>

          <H3>7.2 Platform Rules and Regulations</H3>
          <P>All content posted on GoMilap must comply with applicable laws, our Community Guidelines, intellectual property rights, individual privacy rights, and platform-specific rules.</P>
          <H4>Prohibited Content Categories</H4>
          <UL>
            <li>Illegal content under applicable laws</li>
            <li>Content promoting harm or violence</li>
            <li>Defamatory or privacy-invasive content</li>
            <li>Content infringing intellectual property</li>
            <li>Spam or fraudulent content</li>
            <li>Deceptive or misleading content</li>
          </UL>

          <H3>7.3 Platform-Specific Restrictions</H3>
          <UL>
            <li>No multiple accounts for the same purpose</li>
            <li>No automated access to the platform</li>
            <li>No scraping or unauthorized data extraction</li>
            <li>No interference with platform operations or security</li>
            <li>No circumvention of safety or verification measures</li>
          </UL>

          <H3>7.4 Compliance Monitoring</H3>
          <UL>
            <li><strong>Automated systems:</strong> AI-powered detection</li>
            <li><strong>Human review:</strong> trained moderation team</li>
            <li><strong>User reports:</strong> community-driven reporting</li>
            <li><strong>Regular audits:</strong> periodic compliance review</li>
          </UL>

          <H3>7.5 Enforcement Actions</H3>
          <div className="overflow-x-auto rounded-2xl border border-border/60 my-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3 font-display">Violation Type</th>
                  <th className="text-left p-3 font-display">Consequence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                <tr><td className="p-3 text-foreground">Minor</td><td className="p-3">Content removal, warning</td></tr>
                <tr><td className="p-3 text-foreground">Moderate</td><td className="p-3">Temporary restrictions</td></tr>
                <tr><td className="p-3 text-foreground">Serious</td><td className="p-3">Account suspension</td></tr>
                <tr><td className="p-3 text-foreground">Severe</td><td className="p-3">Permanent termination</td></tr>
                <tr><td className="p-3 text-foreground">Illegal activity</td><td className="p-3">Law enforcement referral</td></tr>
              </tbody>
            </table>
          </div>

          {/* 8 */}
          <H2 id="tos">8. Terms of Service Acceptance</H2>
          <H3>8.1 User Obligations</H3>
          <H4>Age and Eligibility</H4>
          <UL>
            <li>Be at least 18 years old</li>
            <li>Not be prohibited from using the service under applicable laws</li>
            <li>Provide accurate registration information</li>
            <li>Maintain accuracy of profile information</li>
          </UL>
          <H4>Account Security</H4>
          <UL>
            <li>Maintain confidentiality of login credentials</li>
            <li>Notify us immediately of unauthorized access</li>
            <li>Accept responsibility for account activity</li>
            <li>Do not share your account with others</li>
          </UL>
          <H4>Legal Compliance</H4>
          <UL>
            <li>Use the service only for lawful purposes</li>
            <li>Comply with all applicable laws</li>
            <li>Do not use the service for illegal activities</li>
            <li>Respect intellectual property rights</li>
          </UL>
          <H4>Behavioral Standards</H4>
          <UL>
            <li>Treat other users with respect</li>
            <li>No harassment, threats, or abuse</li>
            <li>Do not post prohibited content</li>
            <li>Follow community guidelines</li>
          </UL>

          <H3>8.2 Platform Obligations</H3>
          <UL>
            <li>Provide service with reasonable skill and care</li>
            <li>Maintain platform security and stability</li>
            <li>Respond to reports in a timely manner</li>
            <li>Protect user data per the Privacy Policy</li>
            <li>Provide access to user rights as described in applicable laws</li>
          </UL>

          <H3>8.3 Limitation of Liability</H3>
          <P>GoMilap's liability is governed by our Terms of Service. Users are encouraged to review the Terms of Service for complete information.</P>

          <H3>8.4 Dispute Resolution</H3>
          <UL>
            <li><strong>Informal resolution:</strong> <a href="mailto:support@gomilap.com" className="text-primary hover:underline">support@gomilap.com</a></li>
            <li><strong>Internal escalation:</strong> Grievance Officer review</li>
            <li><strong>Alternative dispute resolution:</strong> mediation and arbitration</li>
            <li><strong>Legal remedies:</strong> courts of competent jurisdiction</li>
          </UL>

          {/* 9 */}
          <H2 id="reporting">9. Compliance Reporting</H2>
          <H3>9.1 Internal Reporting Structure</H3>
          <H4>Board Level</H4>
          <UL>
            <li>Compliance Committee oversight</li>
            <li>Quarterly compliance reviews</li>
            <li>Risk assessment and mitigation</li>
          </UL>
          <H4>Executive Level</H4>
          <UL>
            <li>Chief Compliance Officer (CCO)</li>
            <li>Chief Technology Officer (CTO)</li>
            <li>Chief Operating Officer (COO)</li>
            <li>Chief Privacy Officer (CPO)</li>
          </UL>
          <H4>Operational Level</H4>
          <UL>
            <li>Compliance Team</li>
            <li>Privacy Team</li>
            <li>Legal Team</li>
            <li>Trust and Safety Team</li>
          </UL>

          <H3>9.2 Annual Compliance Review</H3>
          <UL>
            <li>All compliance programs and policies</li>
            <li>Regulatory requirements and changes</li>
            <li>Risk assessment and mitigation measures</li>
            <li>Training and awareness programs</li>
            <li>Audit findings and remediation</li>
            <li>Performance metrics and KPIs</li>
          </UL>

          <H3>9.3 External Audit</H3>
          <UL>
            <li>SOC 2 Type II compliance</li>
            <li>ISO 27001 certification</li>
            <li>Data protection audits</li>
            <li>Security assessments</li>
            <li>Regulatory compliance reviews</li>
          </UL>

          <H3>9.4 Transparency Reporting</H3>
          <H4>Safety Report (Quarterly)</H4>
          <UL>
            <li>Number of reports received by category</li>
            <li>Response times and outcomes</li>
            <li>Enforcement actions taken</li>
            <li>Emerging trends and patterns</li>
          </UL>
          <H4>Privacy Report (Annual)</H4>
          <UL>
            <li>Data subject requests received and processed</li>
            <li>Data breaches and notifications</li>
            <li>Privacy impact assessments conducted</li>
            <li>Compliance measures implemented</li>
          </UL>

          {/* 10 */}
          <H2 id="contact">10. Contact Information</H2>
          <div className="grid sm:grid-cols-2 gap-4 my-4">
            {[
              { label: 'Support', email: 'support@gomilap.com' },
              { label: 'Grievance Redressal', email: 'grievance@gomilap.com' },
            ].map((c) => (
              <div key={c.email} className="glass rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                <a href={`mailto:${c.email}`} className="font-display font-semibold text-primary hover:underline flex items-center gap-2 mt-1 break-all">
                  <Mail className="h-4 w-4 shrink-0" /> {c.email}
                </a>
              </div>
            ))}
          </div>

          {/* Declaration */}
          <div className="glass rounded-2xl p-6 mt-10">
            <h3 className="font-display font-bold text-2xl mb-2 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Declaration
            </h3>
            <P>GoMilap declares its commitment to compliance with all applicable laws, regulations, and industry standards relevant to our operations as a dating and social networking platform. We affirm that:</P>
            <UL>
              <li>This Compliance Statement accurately reflects our current measures and commitments</li>
              <li>We maintain adequate systems and processes to ensure ongoing compliance</li>
              <li>We will update this statement to reflect changes in legal requirements or operations</li>
              <li>We cooperate with relevant authorities and regulatory bodies in all compliance matters</li>
            </UL>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border/60 my-6">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3 font-display">Item</th>
                  <th className="text-left p-3 font-display">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                <tr><td className="p-3 text-foreground">Document Title</td><td className="p-3">GoMilap Compliance Statement</td></tr>
                <tr><td className="p-3 text-foreground">Version</td><td className="p-3">1.0</td></tr>
                <tr><td className="p-3 text-foreground">Effective Date</td><td className="p-3">June 2025</td></tr>
                <tr><td className="p-3 text-foreground">Review Date</td><td className="p-3">June 2026 (or earlier if required)</td></tr>
                <tr><td className="p-3 text-foreground">Document Owner</td><td className="p-3">Compliance Department</td></tr>
                <tr><td className="p-3 text-foreground">Classification</td><td className="p-3">Public</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground mt-12 text-center">
            This Compliance Statement should be read in conjunction with our Terms of Service, Community Guidelines, and Privacy Policy.
          </p>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Last Updated: June 2025 · Version 1.0 · © 2026 GoMilap. All rights reserved.
          </p>
        </article>
      </section>
    </div>
  );
}
