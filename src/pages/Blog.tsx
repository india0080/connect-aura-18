import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { BLOG_POSTS } from '@/lib/blogPosts';

export default function Blog() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'GoMilap Blog',
    url: 'https://gomilap.com/blog',
    blogPost: BLOG_POSTS.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `https://gomilap.com/blog/${p.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="GoMilap Blog — Earn Online in India, Live Chat & Host Tips"
        description="Guides on how to earn money online in India, become a live host, build a host agency and grow with GoMilap. Updated weekly."
        keywords="earn online India blog, earn money from chatting, live chat earning app, host tips India, GoMilap blog"
        jsonLd={jsonLd}
      />

      <header className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto w-full">
        <Logo />
        <Button asChild variant="ghost" size="sm">
          <Link to="/"><ArrowLeft className="h-4 w-4" /> Home</Link>
        </Button>
      </header>

      <section className="px-6 pt-8 pb-12 max-w-4xl mx-auto text-center">
        <p className="text-primary text-sm font-semibold uppercase tracking-widest">Blog</p>
        <h1 className="mt-2 font-display font-bold text-4xl md:text-6xl leading-tight">
          Learn to <span className="text-gradient-brand">earn online in India</span>
        </h1>
        <p className="mt-5 text-muted-foreground text-lg max-w-2xl mx-auto">
          Real strategies from top GoMilap hosts and agencies. Earn money from chatting, live streaming and more.
        </p>
      </section>

      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BLOG_POSTS.map((p) => (
            <article
              key={p.slug}
              className="group rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/50 hover:shadow-glow transition-all flex flex-col"
            >
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">{p.category}</span>
              <h2 className="mt-3 font-display font-bold text-xl leading-snug group-hover:text-gradient-brand">
                <Link to={`/blog/${p.slug}`} className="stretched-link">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
              <div className="mt-5 pt-4 border-t border-border/60 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {p.readMinutes} min read</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="px-6 py-10 border-t border-border/60 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} GoMilap · <Link to="/privacy" className="hover:text-primary">Privacy</Link> · <Link to="/terms" className="hover:text-primary">Terms</Link>
      </footer>
    </div>
  );
}
