import { motion } from 'framer-motion';
import { NavItem } from './navData';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import type { MegaMenuSection } from '@/i18n/translations';

interface MegaMenuProps {
  item: NavItem;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// Map nav labels to megaMenu translation keys
const labelToKey: Record<string, keyof typeof import('@/i18n/translations').translations.en.megaMenu> = {
  'Market': 'market',
  'Products': 'products',
  'Case Study': 'caseStudy',
  'Service & Support': 'serviceSupport',
  'About Us': 'aboutUs',
  'Downloads': 'downloads',
  'Blog': 'blog',
};

export default function MegaMenu({ item, onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const { t } = useLanguage();
  if (!item.sections) return null;

  const megaKey = labelToKey[item.label];
  const translatedSection: MegaMenuSection | undefined = megaKey ? t.megaMenu[megaKey] : undefined;

  const hasImages = item.sections.some(section =>
    section.items.some(subItem => subItem.image)
  );

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
        <div className="absolute left-0 right-0 -top-4 h-6" />
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-2 w-full max-w-[1000px]"
        >
          <div
            className="relative overflow-hidden rounded-[20px]"
            style={{
              background: 'rgba(18, 18, 18, 0.72)',
              backdropFilter: 'blur(18px) saturate(140%)',
              WebkitBackdropFilter: 'blur(18px) saturate(140%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
            }}
          >
            <div
              className="absolute left-0 right-0 top-0 h-[2px]"
              style={{ background: 'rgba(215, 255, 0, 0.65)' }}
            />
            <div className="p-8">
              {hasImages ? (
                <div>
                  {item.sections.map((section, sIdx) => (
                    <div key={sIdx}>
                      <h3 className="mb-6 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                        {translatedSection?.sectionTitle || section.title}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {section.items.map((subItem, iIdx) => {
                          const tItem = translatedSection?.items[iIdx];
                          return (
                            <Link
                              key={iIdx}
                              to={subItem.href}
                              onClick={onClose}
                              className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:ring-1 hover:ring-white/10"
                              style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                            >
                              {subItem.image && (
                                <div className="aspect-[4/3] overflow-hidden">
                                  <img src={subItem.image} alt={tItem?.title || subItem.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18, 18, 18, 0.95) 0%, rgba(18, 18, 18, 0.4) 50%, transparent 100%)' }} />
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm font-medium text-white/90 transition-colors group-hover:text-primary">
                                    {tItem?.title || subItem.title}
                                  </span>
                                  <ChevronRight className="h-3.5 w-3.5 text-white/40 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
                                </div>
                                {(tItem?.description || subItem.description) && (
                                  <p className="mt-1 text-[11px] text-white/40 line-clamp-1">
                                    {tItem?.description || subItem.description}
                                  </p>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {item.sections.map((section, sIdx) => (
                    <div key={sIdx}>
                      <h3 className="mb-5 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                        {translatedSection?.sectionTitle || section.title}
                      </h3>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:grid-cols-4">
                        {section.items.map((subItem, iIdx) => {
                          const tItem = translatedSection?.items[iIdx];
                          return (
                            <Link
                              key={iIdx}
                              to={subItem.href}
                              onClick={onClose}
                              className="group flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-center transition-all duration-200 hover:bg-white/[0.04]"
                            >
                              <span className="text-[13px] font-medium text-white/80 transition-colors group-hover:text-primary">
                                {tItem?.title || subItem.title}
                              </span>
                              <ChevronRight className="h-3 w-3 text-white/30 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
