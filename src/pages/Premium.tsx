import { Check, Crown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/common/PageMeta';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';

const tiers = [
  {
    name: 'Free', price: '$0', period: 'forever',
    features: ['Discover & connect', 'Real-time chat', 'Basic profile'],
    cta: 'Your current plan', highlight: false,
  },
  {
    name: 'Premium', price: '$9.99', period: '/month',
    features: ['Unlimited connections', 'Voice & video calls', 'See who liked you', 'Priority discovery', 'Premium badge'],
    cta: 'Get notified', highlight: true,
  },
  {
    name: 'Annual', price: '$49.99', period: '/year',
    features: ['Everything in Premium', 'Save 58%', 'Early access to new features'],
    cta: 'Get notified', highlight: false,
  },
];

export default function Premium() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta title="GoMilap Premium" description="Unlock the full GoMilap experience." />
      <header className="px-6 py-5 flex items-center justify-between">
        <Link to="/dashboard"><Logo /></Link>
        <Button variant="ghost" asChild><Link to="/dashboard">Back</Link></Button>
      </header>
      <main className="flex-1 px-4 py-10 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-brand-soft border border-border/60">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Coming soon
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mt-5">
            Unlock <span className="text-gradient-brand">GoMilap Premium</span>
          </h1>
          <p className="text-muted-foreground mt-3">Stand out, connect deeper, and get every feature first.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {tiers.map((t) => (
            <div key={t.name}
              className={`glass rounded-2xl p-6 relative ${t.highlight ? 'ring-2 ring-primary shadow-glow' : ''}`}>
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-brand text-primary-foreground text-xs font-semibold flex items-center gap-1">
                  <Crown className="h-3.5 w-3.5" /> Most popular
                </div>
              )}
              <h3 className="font-display font-bold text-xl">{t.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.period}</span>
              </div>
              <ul className="space-y-2.5 mt-5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button disabled className={`w-full mt-6 ${t.highlight ? 'bg-gradient-brand text-primary-foreground' : ''}`} variant={t.highlight ? 'default' : 'secondary'}>
                {t.cta}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
