import { motion } from 'framer-motion';
import { NavItem } from './navData';
import { ArrowUpRight, Zap, Shield, Clock, Palette, Globe, Wrench, FileText, Building2, ShoppingBag, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import type { MegaMenuSection } from '@/i18n/translations';

interface MegaMenuProps {
  item: NavItem;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const labelToKey: Record<string, keyof typeof import('@/i18n/translations').translations.en.megaMenu> = {
  'Market': 'market',
  'Products': 'products',
  'Case Study': 'caseStudy',
  'Service & Support': 'serviceSupport',
  'About Us': 'aboutUs',
  'Downloads': 'downloads',
  'Blog': 'blog',
};

// Category-specific accent colors (subtle)
const categoryAccents: Record<string, string> = {
  'Market': 'from-emerald-500/10 to-transparent',
  'Products': 'from-blue-500/10 to-transparent',
  'Case Study': 'from-amber-500/10 to-transparent',
  'Service & Support': 'from-violet-500/10 to-transparent',
};

// Icons for text-only dropdowns
const sectionIcons: Record<string, React.ReactNode> = {
  'Services': <Wrench className="h-4 w-4" />,
  'Company': <Building2 className="h-4 w-4" />,
  'Resources': <FileText className="h-4 w-4" />,
  'Content': <Newspaper className="h-4 w-4" />,
};

export default function MegaMenu({ item, onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const { t } = useLanguage();
  if (!item.sections) return null;

  const megaKey = labelToKey[item.label];
  const translatedSection: MegaMenuSection | undefined = megaKey ? t.megaMenu[megaKey] : undefined;

  const hasImages = item.sections.some(section =>
    section.items.some(subItem => subItem.image)
  );

  const isProducts = item.label === 'Products';
  const isMarket = item.label === 'Market';
  const accent = categoryAccents[item.label] || 'from-primary/10 to-transparent';

  return (
    <div
      className="fixed left-0 right-0 top-14 z-50 overflow-hidden"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="mx-auto flex justify-center px-6"
        style={{ pointerEvents: 'auto' }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Bridge */}
        <div className="absolute left-0 right-0 -top-4 h-6" />

        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 w-full"
          style={{ maxWidth: isProducts ? 920 : hasImages ? 1000 : 720 }}
        >
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              background: 'rgba(14, 14, 18, 0.92)',
              backdropFilter: 'blur(32px) saturate(160%)',
              WebkitBackdropFilter: 'blur(32px) saturate(160%)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              boxShadow: '0 48px 96px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.02)',
            }}
          >
            {/* Top Accent Line */}
            <div className="absolute left-0 right-0 top-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(212, 255, 0, 0.7) 40%, rgba(212, 255, 0, 0.7) 60%, transparent 95%)' }}
            />

            {/* Subtle ambient glow */}
            <div className={`absolute -top-20 left-1/4 h-40 w-40 rounded-full bg-gradient-to-br ${accent} blur-[80px] opacity-60`} />

            <div className="relative p-7">
              {item.sections.map((section, sIdx) => (
                <div key={sIdx}>
                  {/* Section Header */}
                  <div className="mb-5 flex items-center gap-3">
                    {sectionIcons[section.title] && (
                      <span className="text-white/30">{sectionIcons[section.title]}</span>
                    )}
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
                      {translatedSection?.sectionTitle || section.title}
                    </span>
                  </div>

                  {hasImages ? (
                    isProducts ? (
                      /* Products Layout - 1x4 horizontal row, larger cards */
                      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {section.items.map((subItem, iIdx) => {
                          const tItem = translatedSection?.items[iIdx];
                          return (
                            <Link
                              key={iIdx}
                              to={subItem.href}
                              onClick={onClose}
                              className="group relative overflow-hidden rounded-xl"
                              style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                            >
                              {/* Image */}
                              {subItem.image && (
                                <div className="aspect-[16/10] overflow-hidden">
                                  <img
                                    src={subItem.image}
                                    alt={tItem?.title || subItem.title}
                                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                                  />
                                  <div
                                    className="absolute inset-0 transition-opacity duration-300"
                                    style={{
                                      background: 'linear-gradient(to top, rgba(14, 14, 18, 0.98) 0%, rgba(14, 14, 18, 0.5) 50%, rgba(14, 14, 18, 0.2) 100%)',
                                    }}
                                  />
                                </div>
                              )}

                              {/* Content */}
                              <div className="absolute inset-x-0 bottom-0 p-4">
                                <div className="flex items-end justify-between gap-2">
                                  <div className="min-w-0">
                                    <h4 className="truncate text-sm font-semibold text-white transition-colors duration-300 group-hover:text-primary">
                                      {tItem?.title || subItem.title}
                                    </h4>
                                    {(tItem?.description || subItem.description) && (
                                      <p className="mt-1 text-[11px] text-white/40 line-clamp-1">
                                        {tItem?.description || subItem.description}
                                      </p>
                                    )}
                                  </div>
                                  <ArrowUpRight className="h-4 w-4 shrink-0 text-white/20 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                              </div>

                              {/* Hover Border */}
                              <div className="absolute inset-0 rounded-xl border border-white/0 transition-all duration-300 group-hover:border-primary/30" />

                              {/* Index Number */}
                              <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-bold text-white/30 transition-all duration-300 group-hover:bg-primary/20 group-hover:text-primary">
                                {String(iIdx + 1).padStart(2, '0')}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      /* Market Layout - 5-column compact cards */
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {section.items.map((subItem, iIdx) => {
                          const tItem = translatedSection?.items[iIdx];
                          return (
                            <Link
                              key={iIdx}
                              to={subItem.href}
                              onClick={onClose}
                              className="group relative overflow-hidden rounded-xl"
                              style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                            >
                              {/* Image */}
                              {subItem.image && (
                                <div className="aspect-[4/3] overflow-hidden">
                                  <img
                                    src={subItem.image}
                                    alt={tItem?.title || subItem.title}
                                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                                  />
                                  <div
                                    className="absolute inset-0 transition-opacity duration-300"
                                    style={{
                                      background: 'linear-gradient(to top, rgba(14, 14, 18, 0.98) 0%, rgba(14, 14, 18, 0.6) 45%, rgba(14, 14, 18, 0.15) 100%)',
                                    }}
                                  />
                                </div>
                              )}

                              {/* Content */}
                              <div className="absolute inset-x-0 bottom-0 p-3.5">
                                <div className="flex items-end justify-between gap-2">
                                  <div className="min-w-0">
                                    <h4 className="truncate text-[13px] font-semibold text-white/90 transition-colors duration-300 group-hover:text-primary">
                                      {tItem?.title || subItem.title}
                                    </h4>
                                    {(tItem?.description || subItem.description) && (
                                      <p className="mt-0.5 text-[11px] text-white/35 line-clamp-1">
                                        {tItem?.description || subItem.description}
                                      </p>
                                    )}
                                  </div>
                                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/20 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                              </div>

                              {/* Hover Border */}
                              <div className="absolute inset-0 rounded-xl border border-white/0 transition-all duration-300 group-hover:border-primary/30" />
                            </Link>
                          );
                        })}
                      </div>
                    )
                  ) : (
                    /* Text-Only Layout - Two column with descriptions */
                    <div className="grid gap-1 sm:grid-cols-2">
                      {section.items.map((subItem, iIdx) => {
                        const tItem = translatedSection?.items[iIdx];
                        return (
                          <Link
                            key={iIdx}
                            to={subItem.href}
                            onClick={onClose}
                            className="group flex items-start gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-white/[0.03]"
                          >
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/30 transition-all duration-200 group-hover:bg-primary/10 group-hover:text-primary">
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </div>
                            <div className="min-w-0">
                              <span className="block text-[13px] font-medium text-white/80 transition-colors group-hover:text-primary">
                                {tItem?.title || subItem.title}
                              </span>
                              {(tItem?.description || subItem.description) && (
                                <p className="mt-0.5 text-[11px] text-white/35 line-clamp-1">
                                  {tItem?.description || subItem.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom subtle line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
