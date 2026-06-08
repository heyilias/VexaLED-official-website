import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem, NavSubCategory, NavProduct } from './navData';
import { ArrowUpRight } from 'lucide-react';
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

const glassPanelStyle = {
  background: 'rgba(10, 10, 14, 0.72)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.07)',
  boxShadow: '0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)',
};

// ─── Products 3-column mega menu ─────────────────────────────────────────────
function ProductsMegaMenu({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const subCategories = item.subCategories ?? [];
  const firstActive = subCategories.find(s => !s.comingSoon) ?? subCategories[0];
  const [activeCat, setActiveCat] = useState<NavSubCategory>(firstActive);
  const [hoveredProduct, setHoveredProduct] = useState<NavProduct | null>(
    firstActive?.products[0] ?? null
  );

  const previewImage = hoveredProduct?.image ?? activeCat?.products[0]?.image;

  return (
    <div className="flex" style={{ minHeight: 260 }}>

      {/* Col 1 — Sub-categories */}
      <div className="flex flex-col w-[140px] shrink-0 py-2 pr-4 border-r border-white/[0.06]">
        <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/25 px-3 mb-3">
          Products
        </p>
        {subCategories.map((cat) => (
          <button
            key={cat.label}
            onMouseEnter={() => {
              setActiveCat(cat);
              setHoveredProduct(cat.products[0] ?? null);
            }}
            className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-left transition-all duration-150 ${
              activeCat.label === cat.label ? 'bg-white/[0.05]' : 'hover:bg-white/[0.03]'
            }`}
          >
            <span className={`text-[12px] font-medium transition-colors duration-150 ${
              cat.comingSoon
                ? 'text-white/25'
                : activeCat.label === cat.label
                ? 'text-[#CCFF00] font-semibold'
                : 'text-white/55 group-hover:text-white/90'
            }`}>
              {cat.label}
            </span>
            {cat.comingSoon ? (
              <span className="text-[8px] text-white/20 border border-white/10 rounded px-1.5 py-0.5 ml-1 shrink-0">
                Soon
              </span>
            ) : activeCat.label === cat.label ? (
              <div className="h-1 w-1 rounded-full bg-[#CCFF00] shrink-0" />
            ) : null}
          </button>
        ))}
      </div>

      {/* Col 2 — Product list */}
      <div className="flex flex-col flex-1 py-2 px-4 min-w-[200px]">
        <AnimatePresence mode="wait">
          {activeCat.comingSoon ? (
            <motion.div
              key="coming-soon"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col items-start justify-center flex-1 gap-1.5 py-4 px-3"
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/25 mb-2">
                {activeCat.label}
              </p>
              <p className="text-[13px] text-white/30">Coming soon</p>
              <p className="text-[11px] text-white/20">New products are on their way</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCat.label}
              initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col"
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/25 px-3 mb-3">
                {activeCat.label}
              </p>
              {activeCat.products.map((product) => (
                <Link
                  key={product.href}
                  to={product.href}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredProduct(product)}
                  className="group flex items-center justify-between rounded-lg px-3 py-2.5 transition-all duration-150 hover:bg-white/[0.04]"
                >
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-white/75 transition-colors duration-150 group-hover:text-white">
                      {product.title}
                    </div>
                    <div className="text-[10px] text-white/30 mt-0.5 truncate">{product.description}</div>
                  </div>
                  <ArrowUpRight className="h-3 w-3 text-white/15 shrink-0 ml-3 transition-all duration-150 group-hover:text-[#CCFF00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Col 3 — Image preview (hidden on small screens) */}
      <div className="hidden lg:flex w-[180px] shrink-0 pl-4 border-l border-white/[0.06] items-center py-2">
        <AnimatePresence mode="wait">
          {previewImage && !activeCat.comingSoon ? (
            <motion.div
              key={previewImage}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              className="relative w-full aspect-[3/4] rounded-xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {/* TODO: Replace with product image */}
              <img
                src={previewImage}
                alt={hoveredProduct?.title ?? ''}
                className="h-full w-full object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }}
              />
              {hoveredProduct && (
                <div className="absolute bottom-0 left-0 right-0 p-3.5">
                  <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#CCFF00] mb-1">
                    {activeCat.label}
                  </p>
                  <p className="text-[11px] font-semibold text-white leading-tight">{hoveredProduct.title}</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="w-full aspect-[3/4] rounded-xl border border-white/[0.05] flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.01)' }}
            >
              {/* TODO: Replace with product image */}
              <span className="text-white/10 text-2xl select-none">✦</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

// ─── Main MegaMenu ────────────────────────────────────────────────────────────
export default function MegaMenu({ item, onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const { t } = useLanguage();
  const isProducts = item.label === 'Products';
  const isMarket = item.label === 'Market';

  const megaKey = labelToKey[item.label];
  const translatedSection: MegaMenuSection | undefined = megaKey ? t.megaMenu[megaKey] : undefined;
  const hasImages = item.sections?.some(s => s.items.some(i => i.image));

  const maxWidth = isProducts ? 620 : isMarket ? 900 : hasImages ? 820 : 600;

  return (
    <div className="fixed left-0 right-0 top-14 z-50" style={{ pointerEvents: 'none' }}>
      <div
        className="mx-auto flex justify-center px-6"
        style={{ pointerEvents: 'auto' }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Invisible bridge — keeps menu open when moving mouse from navbar to panel */}
        <div className="absolute left-0 right-0 -top-2 h-3" />

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 w-full"
          style={{ maxWidth }}
        >
          <div className="relative overflow-hidden rounded-2xl" style={glassPanelStyle}>
            {/* Top accent line */}
            <div
              className="absolute left-0 right-0 top-0 h-[1.5px]"
              style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(204,255,0,0.45) 30%, rgba(204,255,0,0.45) 70%, transparent 95%)' }}
            />

            <div className="p-5">
              {isProducts && <ProductsMegaMenu item={item} onClose={onClose} />}

              {!isProducts && item.sections?.map((section, sIdx) => (
                <div key={sIdx}>
                  <div className="mb-4">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/25">
                      {translatedSection?.sectionTitle || section.title}
                    </span>
                  </div>

                  {hasImages ? (
                    isMarket ? (
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                        {section.items.map((subItem, iIdx) => {
                          const tItem = translatedSection?.items[iIdx];
                          return (
                            <Link
                              key={iIdx}
                              to={subItem.href}
                              onClick={onClose}
                              className="group relative overflow-hidden rounded-xl"
                              style={{ background: 'rgba(255,255,255,0.02)' }}
                            >
                              {subItem.image && (
                                <div className="aspect-[4/3] overflow-hidden">
                                  <img
                                    src={subItem.image}
                                    alt={tItem?.title || subItem.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  />
                                  <div
                                    className="absolute inset-0"
                                    style={{ background: 'linear-gradient(to top, rgba(6,6,10,0.95) 0%, rgba(6,6,10,0.35) 55%, transparent 100%)' }}
                                  />
                                </div>
                              )}
                              <div className="absolute inset-x-0 bottom-0 p-3">
                                <div className="flex items-end justify-between gap-1">
                                  <h4 className="text-[11px] font-semibold text-white/90 transition-colors group-hover:text-[#CCFF00] leading-tight">
                                    {tItem?.title || subItem.title}
                                  </h4>
                                  <ArrowUpRight className="h-2.5 w-2.5 shrink-0 text-white/20 group-hover:text-[#CCFF00] transition-colors" />
                                </div>
                                {(tItem?.description || subItem.description) && (
                                  <p className="mt-0.5 text-[9px] text-white/30 line-clamp-1">
                                    {tItem?.description || subItem.description}
                                  </p>
                                )}
                              </div>
                              <div className="absolute inset-0 rounded-xl border border-white/0 transition-colors duration-300 group-hover:border-white/10" />
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                        {section.items.map((subItem, iIdx) => {
                          const tItem = translatedSection?.items[iIdx];
                          return (
                            <Link
                              key={iIdx}
                              to={subItem.href}
                              onClick={onClose}
                              className="group relative overflow-hidden rounded-xl"
                              style={{ background: 'rgba(255,255,255,0.02)' }}
                            >
                              {subItem.image && (
                                <div className="aspect-[16/10] overflow-hidden">
                                  <img
                                    src={subItem.image}
                                    alt={tItem?.title || subItem.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  />
                                  <div
                                    className="absolute inset-0"
                                    style={{ background: 'linear-gradient(to top, rgba(6,6,10,0.98) 0%, transparent 70%)' }}
                                  />
                                </div>
                              )}
                              <div className="absolute inset-x-0 bottom-0 p-3">
                                <h4 className="text-[12px] font-semibold text-white transition-colors group-hover:text-[#CCFF00]">
                                  {tItem?.title || subItem.title}
                                </h4>
                                {(tItem?.description || subItem.description) && (
                                  <p className="mt-0.5 text-[10px] text-white/35 line-clamp-1">
                                    {tItem?.description || subItem.description}
                                  </p>
                                )}
                              </div>
                              <div className="absolute inset-0 rounded-xl border border-white/0 transition-colors duration-300 group-hover:border-white/10" />
                            </Link>
                          );
                        })}
                      </div>
                    )
                  ) : (
                    <div className="grid gap-0.5 sm:grid-cols-2">
                      {section.items.map((subItem, iIdx) => {
                        const tItem = translatedSection?.items[iIdx];
                        return (
                          <Link
                            key={iIdx}
                            to={subItem.href}
                            onClick={onClose}
                            className="group flex items-start gap-2.5 rounded-lg p-2.5 transition-all duration-150 hover:bg-white/[0.03]"
                          >
                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.04] text-white/25 transition-all group-hover:bg-[#CCFF00]/10 group-hover:text-[#CCFF00]">
                              <ArrowUpRight className="h-3 w-3" />
                            </div>
                            <div className="min-w-0">
                              <span className="block text-[12px] font-medium text-white/65 transition-colors group-hover:text-white">
                                {tItem?.title || subItem.title}
                              </span>
                              {(tItem?.description || subItem.description) && (
                                <p className="mt-0.5 text-[10px] text-white/28 line-clamp-1">
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

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
