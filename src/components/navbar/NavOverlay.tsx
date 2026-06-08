import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FocusTrap from 'focus-trap-react';
import { navItems } from './navData';
import type { NavSubCategory, NavProduct } from './navData';

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mobile accordion item
const MobileAccordion = ({
  subCat,
  onClose,
}: {
  subCat: NavSubCategory;
  onClose: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-white/[0.06]">
      <button
        className="flex w-full items-center justify-between px-6 py-4 text-left"
        onClick={() => subCat.comingSoon ? undefined : setExpanded(v => !v)}
      >
        <span className={`text-base font-semibold uppercase tracking-widest ${subCat.comingSoon ? 'text-white/30' : 'text-white'}`}>
          {subCat.label}
        </span>
        {subCat.comingSoon ? (
          <span className="text-[10px] font-medium uppercase tracking-widest text-white/30 border border-white/10 rounded px-2 py-0.5">
            Soon
          </span>
        ) : (
          <motion.span
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-white/40"
          >
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        )}
      </button>
      <AnimatePresence>
        {expanded && !subCat.comingSoon && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-8 pr-6 space-y-1">
              {subCat.products.map((product, i) => (
                <Link
                  key={i}
                  to={product.href}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-white/[0.04] group"
                >
                  <div>
                    <div className="text-sm font-medium text-white/80 group-hover:text-[#CCFF00] transition-colors">
                      {product.title}
                    </div>
                    <div className="text-xs text-white/40 mt-0.5">{product.description}</div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-white/20 group-hover:text-[#CCFF00] shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function NavOverlay({ isOpen, onClose }: NavOverlayProps) {
  const productsItem = navItems.find(i => i.label === 'Products');
  const subCategories = productsItem?.subCategories ?? [];

  const [activeSubCat, setActiveSubCat] = useState<NavSubCategory>(
    subCategories.find(s => !s.comingSoon) ?? subCategories[0]
  );
  const [hoveredProduct, setHoveredProduct] = useState<NavProduct | null>(null);

  // Reset active subcategory when overlay opens
  useEffect(() => {
    if (isOpen) {
      const first = subCategories.find(s => !s.comingSoon) ?? subCategories[0];
      setActiveSubCat(first);
      setHoveredProduct(first?.products[0] ?? null);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubCatEnter = useCallback((sub: NavSubCategory) => {
    setActiveSubCat(sub);
    setHoveredProduct(sub.products[0] ?? null);
  }, []);

  const previewImage = hoveredProduct?.image ?? activeSubCat?.products[0]?.image;

  return (
    <AnimatePresence>
      {isOpen && (
        <FocusTrap
          focusTrapOptions={{
            escapeDeactivates: true,
            onDeactivate: onClose,
            allowOutsideClick: true,
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[60] flex flex-col"
            style={{ background: 'rgba(6, 6, 8, 0.97)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top accent line */}
            <div
              className="absolute left-0 right-0 top-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(204,255,0,0.7) 40%, rgba(204,255,0,0.7) 60%, transparent 95%)' }}
            />

            {/* Close button */}
            <div className="flex items-center justify-end px-6 pt-5 pb-2 lg:px-12">
              <button
                onClick={onClose}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all hover:border-white/30 hover:bg-white/[0.06]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-white/60 transition-colors group-hover:text-white" strokeWidth={1.5} />
              </button>
            </div>

            {/* ─── DESKTOP LAYOUT ─── */}
            <div className="hidden lg:flex flex-1 overflow-hidden">
              <div className="mx-auto flex w-full max-w-[1400px] px-12 py-8 gap-0">

                {/* Column 1 — Sub-categories */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="flex flex-col gap-1 w-[220px] shrink-0 pr-8 border-r border-white/[0.06]"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30 mb-4 px-3">
                    Categories
                  </p>
                  {subCategories.map((sub, i) => (
                    <button
                      key={i}
                      onMouseEnter={() => handleSubCatEnter(sub)}
                      onClick={() => !sub.comingSoon && handleSubCatEnter(sub)}
                      className={`group flex items-center justify-between rounded-lg px-3 py-3 text-left transition-all duration-200 ${
                        activeSubCat?.label === sub.label
                          ? 'bg-[#CCFF00]/[0.06]'
                          : 'hover:bg-white/[0.04]'
                      }`}
                    >
                      <span
                        className={`text-sm font-semibold uppercase tracking-widest transition-colors ${
                          sub.comingSoon
                            ? 'text-white/25'
                            : activeSubCat?.label === sub.label
                            ? 'text-[#CCFF00]'
                            : 'text-white/70 group-hover:text-white'
                        }`}
                      >
                        {sub.label}
                      </span>
                      {sub.comingSoon ? (
                        <span className="text-[9px] font-medium uppercase tracking-widest text-white/25 border border-white/10 rounded px-1.5 py-0.5">
                          Soon
                        </span>
                      ) : (
                        activeSubCat?.label === sub.label && (
                          <div className="h-1.5 w-1.5 rounded-full bg-[#CCFF00]" />
                        )
                      )}
                    </button>
                  ))}
                </motion.div>

                {/* Column 2 — Product list */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="flex flex-col flex-1 px-10 overflow-y-auto"
                >
                  <AnimatePresence mode="wait">
                    {activeSubCat?.comingSoon ? (
                      <motion.div
                        key="coming-soon"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-center justify-center flex-1 gap-4 text-center"
                      >
                        <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center">
                          <span className="text-lg">✦</span>
                        </div>
                        <p className="text-sm font-medium text-white/30 uppercase tracking-widest">
                          Coming Soon
                        </p>
                        <p className="text-xs text-white/20 max-w-[200px]">
                          New products are on their way
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={activeSubCat?.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-1"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30 mb-4">
                          {activeSubCat?.label}
                        </p>
                        {activeSubCat?.products.map((product, i) => (
                          <Link
                            key={i}
                            to={product.href}
                            onClick={onClose}
                            onMouseEnter={() => setHoveredProduct(product)}
                            className="group flex items-center justify-between rounded-xl px-5 py-4 transition-all duration-200 hover:bg-white/[0.04]"
                          >
                            <div>
                              <div className="text-lg font-semibold text-white/80 transition-colors group-hover:text-white">
                                {product.title}
                              </div>
                              <div className="text-sm text-white/35 mt-0.5">{product.description}</div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-white/20 group-hover:text-[#CCFF00] shrink-0 transition-all duration-200 group-hover:translate-x-1" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Column 3 — Image preview */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  className="w-[340px] shrink-0 pl-8 border-l border-white/[0.06] flex flex-col justify-center"
                >
                  <AnimatePresence mode="wait">
                    {previewImage && !activeSubCat?.comingSoon ? (
                      <motion.div
                        key={previewImage}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.25 }}
                        className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900"
                      >
                        <img
                          src={previewImage}
                          alt={hoveredProduct?.title ?? ''}
                          className="h-full w-full object-cover object-center"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: 'linear-gradient(to top, rgba(6,6,8,0.8) 0%, transparent 50%)' }}
                        />
                        {hoveredProduct && (
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <p className="text-xs font-medium uppercase tracking-widest text-[#CCFF00] mb-1">
                              {activeSubCat?.label}
                            </p>
                            <p className="text-base font-semibold text-white">{hoveredProduct.title}</p>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="aspect-[3/4] rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center"
                      >
                        <span className="text-white/10 text-4xl">✦</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

              </div>
            </div>

            {/* ─── MOBILE LAYOUT ─── */}
            <div className="flex flex-col lg:hidden flex-1 overflow-y-auto pb-8">
              <div className="px-6 pt-4 pb-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30 mb-4">
                  Products
                </p>
                {subCategories.map((sub, i) => (
                  <MobileAccordion key={i} subCat={sub} onClose={onClose} />
                ))}
              </div>

              {/* Other nav links on mobile */}
              <div className="px-6 pt-4 border-t border-white/[0.06]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30 mb-4">
                  Navigation
                </p>
                <div className="space-y-1">
                  {[
                    { label: 'Market', href: '/market/events' },
                    { label: 'About Us', href: '/about' },
                    { label: 'Blog', href: '/blog' },
                    { label: 'Downloads', href: '/about' },
                  ].map((link, i) => (
                    <Link
                      key={i}
                      to={link.href}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-white/[0.04] group"
                    >
                      <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                        {link.label}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-white/20 group-hover:text-white/60 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
}
