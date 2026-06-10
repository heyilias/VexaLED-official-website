import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Youtube, Linkedin, Mail, MapPin, ExternalLink, ArrowRight, MessageCircle, Facebook } from 'lucide-react';
import { footerConfig } from '../config';
import { useLanguage } from '@/i18n/LanguageContext';
import contactBg from '@/assets/contact-bg.jpg';
import { Button } from '@/components/ui/button';
import InquiryModal from './InquiryModal';

// Map the Quick Links array (in config order — same across languages) to real routes.
// Order in config.ts: 'Products', 'Markets', 'Gallery', 'About Us', 'Contact'.
const QUICK_LINK_ROUTES = [
  '/products/led-screens',
  '/market/sports',
  '/case-studies',
  '/about',
  '#contact',
];

// Bottom legal links (Privacy, Terms, Cookies) → placeholder route. Full content lands in Phase B.
const LEGAL_SLUGS = ['privacy', 'terms', 'cookies'];

gsap.registerPlugin(ScrollTrigger);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733-16z" />
    <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SOCIAL_LINKS = [
  { icon: TikTokIcon, href: 'https://tiktok.com/@vexaled', label: 'TikTok' },
  { icon: Instagram, href: 'https://instagram.com/vexaled', label: 'Instagram' },
  { icon: XIcon, href: 'https://x.com/vexaled', label: 'X' },
  { icon: Linkedin, href: 'https://linkedin.com/company/vexaled', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@vexaled', label: 'YouTube' },
  { icon: Facebook, href: 'https://facebook.com/vexaled', label: 'Facebook' },
];

const ContactFooter = () => {
  const { t } = useLanguage();
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const isEmpty = !footerConfig.brandName && !footerConfig.heroTitle;

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || isEmpty) return;
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            if (titleRef.current) gsap.set(titleRef.current, { y: -self.progress * 100 });
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [isEmpty]);

  const scrollToContent = () => {
    const element = document.getElementById('footer-content');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  if (isEmpty) return null;

  return (
    <>
      <section id="contact" ref={sectionRef} className="relative w-full overflow-hidden" style={{ backgroundColor: '#0a0a0f' }}>
        {/* Hero area */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="relative w-full h-full">
              <img src={contactBg} alt={footerConfig.portraitAlt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-transparent opacity-70" />
            </div>
          </div>

          <div ref={titleRef} className="relative z-10 text-center will-change-transform">
            <h2 className="font-display text-[12vw] md:text-[10vw] text-foreground leading-none tracking-tighter">
              {t.contactFooter.heroTitle}
            </h2>
            <p className="font-tech text-lg text-primary uppercase tracking-[0.5em] mt-4">
              {t.contactFooter.heroSubtitle}
            </p>

            {/* Two buttons instead of one */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="hero"
                size="xl"
                onClick={() => window.location.href = '/configurator'}
                className="group"
              >
                <span>{t.contactFooter.startConfig}</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                onClick={() => setIsInquiryOpen(true)}
                className="group"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                <span>{t.contactFooter.talkEngineer}</span>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-20 left-12 z-20">
            <p className="font-tech text-xs text-foreground/40 uppercase tracking-wider mb-2">{t.contactFooter.companyLabel}</p>
            <h3 className="font-display text-4xl text-foreground">{t.contactFooter.companyName}</h3>
            <p className="font-tech text-sm text-primary/60">{t.contactFooter.companySubtitle}</p>
          </div>
        </div>

        {/* Footer content */}
        <div id="footer-content" className="relative py-20 px-6 md:px-12" style={{ backgroundColor: '#0a0a0f' }}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <img src={footerConfig.logoImage} alt="VEXALED" className="h-8 w-auto max-w-[180px]" />
                </div>
                <p className="text-sm text-foreground/50 leading-relaxed mb-6">{t.contactFooter.brandDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {SOCIAL_LINKS.map((social) => (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-colors" aria-label={social.label}>
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">@vexaled</p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-display text-sm uppercase tracking-wider text-foreground mb-6">{t.contactFooter.quickLinksTitle}</h4>
                <ul className="space-y-3">
                  {t.contactFooter.quickLinks.map((link, i) => {
                    const target = QUICK_LINK_ROUTES[i] ?? '/';
                    const className = 'text-sm text-foreground/50 hover:text-primary transition-colors flex items-center gap-2 group';
                    return (
                      <li key={link}>
                        {target.startsWith('#') ? (
                          <a href={target} className={className}>
                            <span>{link}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          <Link to={target} className={className}>
                            <span>{link}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-display text-sm uppercase tracking-wider text-foreground mb-6">{t.contactFooter.contactTitle}</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-primary/60 mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground/50">{t.contactFooter.emailLabel}</p>
                      <a href="mailto:alice@vexaled.com" className="text-sm text-foreground hover:text-primary transition-colors">alice@vexaled.com</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary/60 mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground/50">{t.contactFooter.addressLabel}</p>
                      <span className="text-sm text-foreground">Foshan, Guangzhou, China</span>
                    </div>
                  </li>
                </ul>

                {/* QR Codes */}
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Contact Us</p>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-lg bg-white p-1.5 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <rect width="100" height="100" fill="white"/>
                          <rect x="10" y="10" width="25" height="25" fill="black" rx="2"/>
                          <rect x="65" y="10" width="25" height="25" fill="black" rx="2"/>
                          <rect x="10" y="65" width="25" height="25" fill="black" rx="2"/>
                          <rect x="15" y="15" width="15" height="15" fill="white" rx="1"/>
                          <rect x="70" y="15" width="15" height="15" fill="white" rx="1"/>
                          <rect x="15" y="70" width="15" height="15" fill="white" rx="1"/>
                          <rect x="19" y="19" width="7" height="7" fill="black"/>
                          <rect x="74" y="19" width="7" height="7" fill="black"/>
                          <rect x="19" y="74" width="7" height="7" fill="black"/>
                          <rect x="40" y="10" width="5" height="5" fill="black"/>
                          <rect x="50" y="15" width="5" height="5" fill="black"/>
                          <rect x="40" y="25" width="5" height="5" fill="black"/>
                          <rect x="45" y="40" width="5" height="5" fill="black"/>
                          <rect x="55" y="45" width="5" height="5" fill="black"/>
                          <rect x="40" y="55" width="5" height="5" fill="black"/>
                          <rect x="65" y="65" width="5" height="5" fill="black"/>
                          <rect x="75" y="75" width="5" height="5" fill="black"/>
                          <rect x="85" y="65" width="5" height="5" fill="black"/>
                          <rect x="70" y="50" width="5" height="5" fill="black"/>
                          <rect x="80" y="45" width="5" height="5" fill="black"/>
                          <text x="50" y="55" textAnchor="middle" fontSize="6" fill="#07C160" fontWeight="bold">WeChat</text>
                        </svg>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1.5">WeChat</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-lg bg-white p-1.5 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <rect width="100" height="100" fill="white"/>
                          <rect x="10" y="10" width="25" height="25" fill="black" rx="2"/>
                          <rect x="65" y="10" width="25" height="25" fill="black" rx="2"/>
                          <rect x="10" y="65" width="25" height="25" fill="black" rx="2"/>
                          <rect x="15" y="15" width="15" height="15" fill="white" rx="1"/>
                          <rect x="70" y="15" width="15" height="15" fill="white" rx="1"/>
                          <rect x="15" y="70" width="15" height="15" fill="white" rx="1"/>
                          <rect x="19" y="19" width="7" height="7" fill="black"/>
                          <rect x="74" y="19" width="7" height="7" fill="black"/>
                          <rect x="19" y="74" width="7" height="7" fill="black"/>
                          <rect x="42" y="12" width="5" height="5" fill="black"/>
                          <rect x="48" y="20" width="5" height="5" fill="black"/>
                          <rect x="42" y="30" width="5" height="5" fill="black"/>
                          <rect x="50" y="42" width="5" height="5" fill="black"/>
                          <rect x="60" y="48" width="5" height="5" fill="black"/>
                          <rect x="42" y="58" width="5" height="5" fill="black"/>
                          <rect x="68" y="68" width="5" height="5" fill="black"/>
                          <rect x="78" y="78" width="5" height="5" fill="black"/>
                          <rect x="88" y="68" width="5" height="5" fill="black"/>
                          <rect x="72" y="55" width="5" height="5" fill="black"/>
                          <rect x="82" y="48" width="5" height="5" fill="black"/>
                          <text x="50" y="55" textAnchor="middle" fontSize="5" fill="#25D366" fontWeight="bold">WhatsApp</text>
                        </svg>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1.5">WhatsApp</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div>
                <h4 className="font-display text-sm uppercase tracking-wider text-foreground mb-6">{t.contactFooter.ctaTitle}</h4>
                <p className="text-sm text-foreground/50 mb-4">{t.contactFooter.ctaDescription}</p>
                <button onClick={() => setIsInquiryOpen(true)} className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/80 transition-colors flex items-center justify-center gap-2">
                  <span>Talk to an Engineer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-8 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-foreground/30 font-tech">{t.contactFooter.copyrightText}</p>
              <div className="flex gap-6">
                {t.contactFooter.bottomLinks.map((link, i) => (
                  <Link
                    key={link}
                    to={`/legal/${LEGAL_SLUGS[i] ?? 'privacy'}`}
                    className="text-xs text-foreground/30 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </>
  );
};

export default ContactFooter;
