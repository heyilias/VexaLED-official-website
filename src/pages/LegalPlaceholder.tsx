import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, FileText, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SEOHead from '@/components/SEOHead';

// Placeholder for legal/policy pages while the real text is being drafted.
// Phase B1 replaces this with the actual Privacy / Terms / Cookies / Impressum content.
//
// Why this exists: a real route here is strictly better than href="#" or a 404 —
// it (a) prevents broken-link reports, (b) gives the footer something legitimate
// to point to, and (c) gives EU buyers a place to land that says we know it's coming.

const TITLES: Record<string, { title: string; description: string }> = {
  privacy: {
    title: 'Privacy Policy',
    description: 'How VEXALED collects, uses, and protects personal data.',
  },
  terms: {
    title: 'Terms of Service',
    description: 'The terms governing the use of vexaled.com and VEXALED services.',
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'How VEXALED uses cookies and similar technologies on this site.',
  },
  impressum: {
    title: 'Impressum',
    description: 'Legal disclosure required under German Telemedia Act.',
  },
};

export default function LegalPlaceholder() {
  const { slug } = useParams<{ slug: string }>();
  const meta = slug ? TITLES[slug] : undefined;

  if (!meta) return <Navigate to="/legal/privacy" replace />;

  return (
    <main className="min-h-screen bg-background">
      <SEOHead title={meta.title} description={meta.description} />
      <Navbar />

      <section className="px-6 md:px-12 pt-40 pb-32 max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>

        <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/5">
          <FileText className="h-5 w-5 text-primary" />
        </div>

        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">{meta.title}</h1>
        <p className="text-lg text-muted-foreground mb-12">{meta.description}</p>

        <div className="rounded-2xl border border-border/40 bg-card/40 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">In Preparation</p>
          <p className="text-base text-foreground/80 leading-relaxed mb-6">
            This document is being drafted by our legal team in compliance with applicable Chinese,
            EU, and international data-protection standards. It will be published here ahead of our
            full public launch.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-8">
            In the meantime, if you have a specific question about our handling of your data,
            our terms of business, or any compliance matter, please reach out directly:
          </p>

          <a
            href="mailto:sales@vexaled.com"
            className="inline-flex items-center gap-3 rounded-lg border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            <Mail className="h-4 w-4" />
            sales@vexaled.com
          </a>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Last updated: this page is a placeholder. Final policy text will replace this notice on launch.
        </p>
      </section>
    </main>
  );
}
