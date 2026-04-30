import { Link } from 'react-router-dom';
import { ArrowLeft, ScrollText, Mail, Heart, CheckCircle2, Code2, FileCode, Scale } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LICENSES = [
  { name: 'MIT', desc: 'Permissive, simple, widely used across the JavaScript ecosystem.' },
  { name: 'Apache 2.0', desc: 'Permissive license with an explicit grant of patent rights.' },
  { name: 'BSD', desc: 'Permissive family of licenses with minimal restrictions on reuse.' },
  { name: 'Other OSI', desc: 'Additional OSI-approved licenses where applicable.' },
];

export default function OpenSourceLicenses() {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Open Source Licenses — GoMilap"
        description="GoMilap acknowledges the open-source libraries and frameworks that power our platform."
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
      <section className="px-6 py-16 md:py-24 border-b border-border/60 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-brand items-center justify-center shadow-glow mb-6">
            <ScrollText className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight">
            📜 Open Source <span className="text-gradient-brand">Licenses</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            GoMilap is built on the shoulders of an incredible open-source community. Here's our acknowledgement and how to request the full list.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-gradient-brand text-primary-foreground rounded-full shadow-glow">
              <a href="mailto:support@gomilap.com?subject=Open%20Source%20Components%20Request">
                <Mail className="h-4 w-4 mr-2" />Request component list
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Intro */}
        <Card className="overflow-hidden">
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </span>
              <h2 className="font-display font-semibold text-2xl">Acknowledgement</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              GoMilap may use certain open-source libraries, frameworks, and third-party components to build and operate the platform.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              These components are used in compliance with their respective licenses, which may include <strong className="text-foreground">MIT</strong>, <strong className="text-foreground">Apache 2.0</strong>, <strong className="text-foreground">BSD</strong>, or similar open-source licenses.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We respect and acknowledge the contributions of the open-source community. 💜
            </p>
          </CardContent>
        </Card>

        {/* License families */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
              <Scale className="h-5 w-5 text-primary-foreground" />
            </span>
            <h2 className="font-display font-semibold text-2xl">License Families We Use</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {LICENSES.map((l) => (
              <Card key={l.name} className="hover:border-primary/40 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCode className="h-4 w-4 text-primary" />
                    <p className="font-display font-semibold">{l.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{l.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Request */}
        <Card className="border-primary/30 bg-gradient-brand-soft">
          <CardContent className="p-8 text-center space-y-4">
            <Mail className="h-8 w-8 mx-auto text-primary" />
            <h2 className="font-display font-semibold text-2xl">Request the Full Component List</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              If you would like to receive a list of open-source components used in GoMilap, you may request it by contacting us:
            </p>
            <a
              href="mailto:support@gomilap.com"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              <Mail className="h-4 w-4" /> support@gomilap.com
            </a>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card>
          <CardContent className="p-6 flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/90 leading-relaxed">
              GoMilap does not claim ownership over third-party open-source components and uses them strictly as per their license terms.
            </p>
          </CardContent>
        </Card>

        {/* Promise */}
        <Card className="border-primary/40 bg-gradient-brand-soft overflow-hidden">
          <CardContent className="p-8 text-center">
            <Heart className="h-8 w-8 mx-auto text-primary mb-3" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">💜 With gratitude to</p>
            <p className="font-display font-bold text-2xl md:text-3xl text-gradient-brand">
              The Open-Source Community
            </p>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground mt-10 text-center">
          Last Updated: April 2025 · Version 1.0 · © 2026 GoMilap. All rights reserved.
        </p>
      </div>
    </div>
  );
}
