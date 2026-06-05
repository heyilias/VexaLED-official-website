import { Linkedin, Youtube, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import vexaledLogo from '@/assets/vexaled-logo.png';
import { useLanguage } from '@/i18n/LanguageContext';

const XIcon = ({ className, strokeWidth }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733-16z" />
    <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
  </svg>
);

const TikTokIcon = ({ className, strokeWidth }: { className?: string; strokeWidth?: number }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// Product links use keywords — not translated
const productLinks = [
  { label: 'VX-LED Poster', href: '/products/led-screen/vx-led-poster' },
];

const solutionLinks = [
  { label: 'Sports & Arenas', href: '/market/sports' },
  { label: 'Advertising & DOOH', href: '/market/advertising' },
  { label: 'Events & Staging', href: '/market/events' },
  { label: 'Virtual Production', href: '/market/virtual-production' },
  { label: 'Corporate & Control Rooms', href: '/market/corporate' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: TikTokIcon, href: '#', label: 'TikTok' },
  { icon: XIcon, href: '#', label: 'X' },
];

export default function Footer() {
  const { t } = useLanguage();

  const emphasisLinks = [
    { label: t.nav.caseStudy, href: '/case-studies' },
    { label: t.nav.serviceSupport, href: '/support' },
  ];

  return (
    <footer className="relative bg-surface-dark">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, hsl(0 0% 13%) 0%, hsl(0 0% 10%) 100%)' }} />
      
      <div className="relative z-10">
        <div className="container-wide mx-auto px-6 py-16 md:py-20 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr] xl:grid-cols-[1fr_2.5fr]">
            <div className="max-w-sm">
              <a href="/" className="inline-flex items-center gap-3 mb-6">
                <img src={vexaledLogo} alt="VEXALED" className="h-10 w-auto" />
                <span className="font-display text-xl font-semibold tracking-[0.08em] text-foreground">VEXALED</span>
              </a>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.footer.description}</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-foreground">{t.footer.products}</h4>
                <ul className="space-y-2.5">
                  {productLinks.map((link) => (
                    <li key={link.label}><Link to={link.href} className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary">{link.label}</Link></li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-foreground">{t.footer.solutions}</h4>
                <ul className="space-y-2.5">
                  {solutionLinks.map((link) => (
                    <li key={link.label}><Link to={link.href} className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary">{link.label}</Link></li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-foreground">{t.footer.about}</h4>
                <ul className="space-y-2.5">
                  {t.footer.aboutLinks.map((link) => (
                    <li key={link.href}><a href={link.href} className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary">{link.label}</a></li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:items-start lg:items-end">
                {emphasisLinks.map((link) => (
                  <a key={link.label} href={link.href} className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary">
                    <span>{link.label}</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container-wide mx-auto px-6 lg:px-12"><div className="h-px bg-border/30" /></div>

        <div className="container-wide mx-auto px-6 py-6 lg:px-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span>{t.footer.copyright}</span>
              <a href="/terms" className="transition-colors hover:text-primary">{t.footer.terms}</a>
              <a href="/privacy" className="transition-colors hover:text-primary">{t.footer.privacy}</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">{t.footer.followUs}</span>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} className="group flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-surface-medium/50 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary hover:shadow-[0_0_12px_hsl(66_95%_52%/0.2)]" aria-label={social.label}>
                    <social.icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
