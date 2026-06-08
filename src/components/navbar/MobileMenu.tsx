import { motion, AnimatePresence } from 'framer-motion';
import { navItems, languages } from './navData';
import { ChevronDown, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Language } from '@/i18n/translations';
import { Check } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [expandedSubCat, setExpandedSubCat] = useState<string | null>(null);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleLangSelect = (code: string) => { setLanguage(code as Language); };

  const getNavLabel = (label: string) => {
    const map: Record<string, string> = {
      'Market': t.nav.market,
      'Products': t.nav.products,
      'Case Study': t.nav.caseStudy,
      'Service & Support': t.nav.serviceSupport,
      'About Us': t.nav.aboutUs,
      'Downloads': t.nav.downloads,
      'Blog': t.nav.blog,
    };
    return map[label] || label;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }} className="fixed right-0 top-0 bottom-0 z-[56] w-full max-w-sm bg-surface-dark lg:hidden">
            <button onClick={onClose} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted/20" aria-label={t.nav.closeMenu}>
              <X className="h-5 w-5 text-foreground" strokeWidth={1.5} />
            </button>

            <div className="h-full overflow-y-auto px-6 pb-24 pt-16">
              <nav className="space-y-0.5">
                {navItems.map((item) => {
                  const hasSubCats = !!item.subCategories?.length;
                  const hasSections = !!item.sections?.length;
                  const isExpanded = expandedItem === item.label;

                  return (
                    <div key={item.label} className="border-b border-border/20">
                      <button
                        onClick={() => setExpandedItem(isExpanded ? null : item.label)}
                        className="flex w-full items-center justify-between py-3.5 text-sm font-medium uppercase tracking-[0.1em] text-foreground"
                      >
                        <span>{getNavLabel(item.label)}</span>
                        {(hasSubCats || hasSections) && (
                          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">

                            {/* Products: subCategories two-level accordion, no image preview on mobile */}
                            {hasSubCats && (
                              <div className="pb-3">
                                {item.subCategories!.map((subCat) => (
                                  <div key={subCat.label} className="border-b border-white/[0.04] last:border-0">
                                    <button
                                      onClick={() => subCat.comingSoon ? undefined : setExpandedSubCat(expandedSubCat === subCat.label ? null : subCat.label)}
                                      className="flex w-full items-center justify-between pl-4 pr-2 py-3"
                                    >
                                      <span className={`text-sm font-semibold tracking-widest ${subCat.comingSoon ? 'text-white/30' : 'text-white/75'}`}>
                                        {subCat.label}
                                      </span>
                                      {subCat.comingSoon ? (
                                        <span className="text-[9px] border border-white/10 rounded px-1.5 py-0.5 text-white/25">Soon</span>
                                      ) : (
                                        <ChevronDown className={`h-3.5 w-3.5 text-white/30 transition-transform duration-200 ${expandedSubCat === subCat.label ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                                      )}
                                    </button>
                                    <AnimatePresence>
                                      {expandedSubCat === subCat.label && !subCat.comingSoon && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }} className="overflow-hidden">
                                          <div className="pb-3 pl-7 pr-2 space-y-0.5">
                                            {subCat.products.map((product) => (
                                              <Link
                                                key={product.href}
                                                to={product.href}
                                                onClick={onClose}
                                                className="flex items-start rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.04] group"
                                              >
                                                <div>
                                                  <div className="text-[13px] font-medium text-white/70 group-hover:text-[#CCFF00] transition-colors">{product.title}</div>
                                                  <div className="text-[11px] text-white/30 mt-0.5">{product.description}</div>
                                                </div>
                                              </Link>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* All other nav items: flat section list */}
                            {hasSections && (
                              <div className="space-y-0.5 pb-3 pl-4">
                                {item.sections!.map((section) =>
                                  section.items.map((subItem) => (
                                    <Link key={subItem.title} to={subItem.href} onClick={onClose} className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                                      {subItem.title}
                                    </Link>
                                  ))
                                )}
                              </div>
                            )}

                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              <div className="mt-6 border-t border-border/30 pt-6">
                <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{t.nav.language}</h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangSelect(lang.code)}
                      className={`flex items-center gap-1.5 rounded border px-2.5 py-1.5 text-xs transition-colors ${
                        language === lang.code
                          ? 'border-primary/50 text-primary bg-primary/10'
                          : 'border-border/50 text-foreground hover:border-primary/50 hover:text-primary'
                      }`}
                    >
                      {lang.label}
                      {language === lang.code && <Check className="h-3 w-3" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Button variant="hero" className="w-full text-sm" onClick={onClose}>{t.startConfiguration}</Button>
                <Button variant="heroOutline" className="w-full text-sm" onClick={onClose}>{t.contactSales}</Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
