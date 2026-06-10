import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, FileText, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SEOHead from '@/components/SEOHead';
import { legalContent, LEGAL_SLUG_ALIASES, type LegalSection } from '@/data/legalContent';

/**
 * Renders Privacy / Terms / Cookies / Impressum from src/data/legalContent.ts.
 * Filename kept as LegalPlaceholder for backwards compatibility with the
 * existing route registration in App.tsx.
 *
 * [TODO: …] strings embedded in the data file are highlighted in the UI so
 * they stand out during review and aren't accidentally shipped unaddressed.
 */

function renderInlineWithTodos(text: string) {
  // Split on [TODO: ...] but keep the matches in the output.
  const parts = text.split(/(\[TODO:[^\]]*\])/g);
  return parts.map((part, i) =>
    part.startsWith('[TODO:') ? (
      <span
        key={i}
        className="inline-block rounded bg-primary/15 px-1.5 py-0.5 text-[0.85em] text-primary font-medium border border-primary/30 mx-0.5"
        title="Placeholder — confirm before public launch"
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function Section({ section }: { section: LegalSection }) {
  return (
    <section className="mb-12">
      <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">{section.title}</h2>
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="text-base text-foreground/70 leading-relaxed mb-4">
          {renderInlineWithTodos(p)}
        </p>
      ))}
      {section.bullets && (
        <ul className="space-y-2 mt-4">
          {section.bullets.map((b, i) => (
            <li
              key={i}
              className="text-base text-foreground/70 leading-relaxed pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-primary"
            >
              {renderInlineWithTodos(b)}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function LegalPlaceholder() {
  const { slug } = useParams<{ slug: string }>();
  const resolvedSlug = slug ? (LEGAL_SLUG_ALIASES[slug] ?? slug) : 'privacy';
  const doc = legalContent[resolvedSlug];

  if (!doc) return <Navigate to="/legal/privacy" replace />;

  const formattedDate = new Date(doc.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-background">
      <SEOHead title={doc.title} description={doc.description} />
      <Navbar />

      <section className="px-6 md:px-12 pt-32 pb-16 max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>

        <header className="mb-12">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/5">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">{doc.title}</h1>
          <p className="text-lg text-muted-foreground mb-3">{doc.description}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Effective date: {formattedDate}
          </p>
        </header>

        <article className="prose-vexaled">
          {doc.sections.map((section, i) => (
            <Section key={i} section={section} />
          ))}
        </article>

        {doc.footnote && (
          <div className="mt-12 rounded-2xl border border-border/40 bg-card/40 p-6">
            <p className="text-sm text-foreground/60 leading-relaxed">{doc.footnote}</p>
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-border/40 bg-card/40 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">Questions?</p>
          <a
            href="mailto:sales@vexaled.com"
            className="inline-flex items-center gap-3 rounded-lg border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            <Mail className="h-4 w-4" />
            sales@vexaled.com
          </a>
        </div>

        {/* Cross-links between legal pages — discoverability */}
        <nav className="mt-16 pt-8 border-t border-border/20">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">More legal information</p>
          <div className="flex flex-wrap gap-3">
            {Object.entries(legalContent).map(([s, d]) => (
              <Link
                key={s}
                to={`/legal/${s}`}
                className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                  s === resolvedSlug
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border/40 text-muted-foreground hover:border-primary/30 hover:text-primary'
                }`}
              >
                {d.title}
              </Link>
            ))}
          </div>
        </nav>
      </section>
    </main>
  );
}
