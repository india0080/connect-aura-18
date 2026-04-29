import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';

const TOC = [
  { id: 'introduction', label: '1. Introduction' },
  { id: 'nature', label: '2. Nature of Services' },
  { id: 'no-refund', label: '3. No Refund Policy' },
  { id: 'exceptions', label: '4. Exceptions' },
  { id: 'process', label: '5. Refund Request Process' },
  { id: 'timeline', label: '6. Refund Timeline' },
  { id: 'subscription', label: '7. Subscription Policy' },
  { id: 'chargebacks', label: '8. Chargebacks' },
  { id: 'platform-limit', label: '9. Platform Limitation' },
  { id: 'changes', label: '10. Changes to Policy' },
  { id: 'fraud', label: '11. Fraud Prevention & Chargeback Policy' },
  { id: 'contact', label: '12. Contact' },
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

export default function RefundPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Refund Policy — GoMilap"
        description="GoMilap Refund Policy: how refunds, subscriptions, chargebacks, and fraud prevention are handled."
      />

      <header className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto w-full">
        <Logo />
        <Button asChild variant="ghost" size="sm" className="gap-2">
          <Link to="/"><ArrowLeft className="h-4 w-4" /> Back to home</Link>
        </Button>
      </header>

      <section className="px-6 pt-8 pb-12 max-w-4xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-brand-soft border border-border/60 text-xs">
          <CreditCard className="h-3.5 w-3.5 text-primary" /> Refund Policy
        </div>
        <h1 className="font-display font-bold text-4xl md:text-6xl mt-5 leading-[1.05]">
          GoMilap <span className="text-gradient-brand">Refund Policy</span>
        </h1>
        <p className="text-muted-foreground mt-5 max-w-2xl mx-auto">
          A fair and transparent payment experience while protecting against misuse and fraud.
        </p>
        <p className="text-xs text-muted-foreground mt-4">Last Updated: June 2026 · Version 1.0 · © 2026 GoMilap. All rights reserved.</p>
      </section>

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
          <H2 id="introduction">1. Introduction</H2>
          <P>This Refund Policy explains how refunds are handled for payments made on GoMilap.</P>
          <P>By purchasing any paid service, subscription, or feature on GoMilap, you agree to this Refund Policy.</P>

          <H2 id="nature">2. Nature of Services</H2>
          <P>GoMilap is a digital platform offering:</P>
          <UL>
            <li>Premium features</li>
            <li>Subscriptions</li>
            <li>In-app purchases (if applicable)</li>
          </UL>
          <P>👉 All services are <strong>digital and instantly accessible</strong>, hence refunds are limited.</P>

          <H2 id="no-refund">3. No Refund Policy (General Rule)</H2>
          <P>All payments made on GoMilap are <strong>non-refundable</strong>.</P>
          <P>👉 Once a payment is completed:</P>
          <UL>
            <li>It cannot be canceled</li>
            <li>It cannot be reversed</li>
            <li>It cannot be transferred</li>
          </UL>

          <H2 id="exceptions">4. Exceptions (Eligible for Refund)</H2>
          <P>Refunds may be considered only in the following cases:</P>
          <H3>✅ A. Duplicate Payment</H3>
          <UL><li>If the same transaction is charged multiple times</li></UL>
          <H3>✅ B. Technical Error</H3>
          <UL><li>Payment deducted but service not activated</li></UL>
          <H3>✅ C. Unauthorized Transaction</H3>
          <UL><li>Reported immediately with valid proof</li></UL>
          <P>👉 All refund requests are subject to verification.</P>

          <H2 id="process">5. Refund Request Process</H2>
          <P>To request a refund, contact:</P>
          <P>📧 <a href="mailto:support@gomilap.com" className="text-primary hover:underline">support@gomilap.com</a></P>
          <P>Include:</P>
          <UL>
            <li>Registered email / phone</li>
            <li>Transaction ID</li>
            <li>Payment screenshot</li>
            <li>Reason for refund</li>
          </UL>

          <H2 id="timeline">6. Refund Timeline</H2>
          <UL>
            <li>Request review: within 3–5 business days</li>
            <li>Approved refunds: processed within 7–10 business days</li>
            <li>Refund will be credited to the original payment method</li>
          </UL>

          <H2 id="subscription">7. Subscription Policy</H2>
          <UL>
            <li>Subscriptions are billed in advance</li>
            <li>No partial or unused period refunds</li>
            <li>You can cancel future renewals anytime</li>
          </UL>

          <H2 id="chargebacks">8. Chargebacks</H2>
          <P>If a user raises a chargeback without contacting support:</P>
          <UL>
            <li>Account may be suspended</li>
            <li>Access to services may be restricted</li>
          </UL>

          <H2 id="platform-limit">9. Platform Limitation</H2>
          <P>GoMilap is not responsible for:</P>
          <UL>
            <li>User interactions or outcomes</li>
            <li>Matches, conversations, or connections</li>
            <li>Any dissatisfaction from platform usage</li>
          </UL>
          <P>👉 Payments are for platform access, not guaranteed results.</P>

          <H2 id="changes">10. Changes to Policy</H2>
          <P>We may update this Refund Policy at any time. Users will be notified via app or website.</P>

          <H2 id="fraud">11. Fraud Prevention &amp; Chargeback Policy</H2>
          <P>GoMilap strictly monitors all transactions to prevent misuse, fraud, and false claims.</P>
          <P>By making a payment on GoMilap, you confirm that:</P>
          <UL>
            <li>You are the authorized user of the payment method</li>
            <li>You understand the nature of the services provided</li>
            <li>You agree not to misuse refund or chargeback processes</li>
          </UL>

          <H3>🚫 Misuse &amp; False Claims</H3>
          <P>If a user is found to:</P>
          <UL>
            <li>File false complaints after using the platform</li>
            <li>Raise chargebacks without valid reason</li>
            <li>Report legitimate transactions as fraudulent</li>
            <li>Attempt to misuse cybercrime or banking systems</li>
          </UL>
          <P>👉 GoMilap reserves the right to:</P>
          <UL>
            <li>Suspend or permanently block the account</li>
            <li>Restrict access to all services</li>
            <li>Share necessary transaction details with payment gateways or legal authorities, if required</li>
          </UL>

          <H3>⚠️ Chargeback Handling</H3>
          <P>If a chargeback is raised without first contacting GoMilap support:</P>
          <UL>
            <li>The account may be immediately restricted</li>
            <li>Future access may be denied</li>
            <li>The case may be treated as a misuse of services</li>
          </UL>

          <H3>🔐 Transaction Records</H3>
          <P>GoMilap maintains secure records of:</P>
          <UL>
            <li>Login activity</li>
            <li>Usage activity</li>
            <li>Transaction details</li>
          </UL>
          <P>These may be used as evidence in case of disputes.</P>
          <P>GoMilap aims to protect genuine users while taking strict action against fraudulent activities.</P>

          <H2 id="contact">12. Contact</H2>
          <P>📧 Support: <a href="mailto:support@gomilap.com" className="text-primary hover:underline">support@gomilap.com</a></P>
          <P>📧 Grievance: <a href="mailto:grievance@gomilap.com" className="text-primary hover:underline">grievance@gomilap.com</a></P>

          <div className="mt-12 p-6 rounded-2xl bg-gradient-brand-soft border border-border/60">
            <p className="font-display font-semibold text-lg mb-2">💜 GoMilap Policy Note</p>
            <p className="text-muted-foreground">We aim to provide a fair and transparent payment experience while protecting against misuse and fraud.</p>
            <p className="text-muted-foreground mt-3"><strong>GoMilap — Safe Platform. Real Connections. Trusted Experience.</strong></p>
          </div>
        </article>
      </section>
    </div>
  );
}
