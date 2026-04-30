import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { PageMeta } from '@/components/common/PageMeta';
import { Button } from '@/components/ui/button';
import { BLOG_POSTS, getPostBySlug } from '@/lib/blogPosts';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'GoMilap' },
    publisher: {
      '@type': 'Organization',
      name: 'GoMilap',
      logo: { '@type': 'ImageObject', url: 'https://gomilap.com/gomilap-icon.png' },
    },
    mainEntityOfPage: `https://gomilap.com/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={`${post.title} | GoMilap Blog`}
        description={post.description}
        keywords={post.keywords}
        canonical={`https://gomilap.com/blog/${post.slug}`}
        jsonLd={jsonLd}
      />

      <header className="px-6 py-5 flex items-center justify-between max-w-4xl mx-auto w-full">
        <Logo />
        <Button asChild variant="ghost" size="sm">
          <Link to="/blog"><ArrowLeft className="h-4 w-4" /> All posts</Link>
        </Button>
      </header>

      <article className="px-6 pt-6 pb-16 max-w-3xl mx-auto">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">{post.category}</span>
        <h1 className="mt-3 font-display font-bold text-4xl md:text-5xl leading-tight">{post.title}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readMinutes} min read</span>
        </div>

        <div
          className="prose-blog mt-10 text-foreground/90 leading-relaxed [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:space-y-1.5 [&_a]:text-primary [&_a]:underline [&_a:hover]:opacity-80 [&_strong]:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 rounded-2xl border border-border/60 bg-gradient-brand-soft p-8 text-center">
          <h2 className="font-display font-bold text-2xl">Ready to start earning?</h2>
          <p className="mt-2 text-muted-foreground">Sign up free on GoMilap and earn from your very first chat.</p>
          <Button asChild size="lg" className="mt-6 bg-gradient-brand text-primary-foreground rounded-full">
            <Link to="/signup">Sign up free</Link>
          </Button>
        </div>
      </article>

      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <h2 className="font-display font-bold text-2xl mb-6">Keep reading</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {related.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="rounded-xl border border-border/60 bg-card p-5 hover:border-primary/50 hover:shadow-glow transition-all"
            >
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">{p.category}</span>
              <h3 className="mt-2 font-display font-semibold leading-snug">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <footer className="px-6 py-10 border-t border-border/60 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} GoMilap · <Link to="/privacy" className="hover:text-primary">Privacy</Link> · <Link to="/terms" className="hover:text-primary">Terms</Link>
      </footer>
    </div>
  );
}
