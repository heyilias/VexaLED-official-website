import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, Search, Globe, User, X, SlidersHorizontal } from 'lucide-react';
import { navItems } from './navbar/navData';
import { useLanguage } from '@/i18n/LanguageContext';
import MegaMenu from './navbar/MegaMenu';
import LanguageDropdown from './navbar/LanguageDropdown';
import VIPDropdown from './navbar/VIPDropdown';
import MobileMenu from './navbar/MobileMenu';
import vexaledLogo from '@/assets/vexaled-logo-full.png';
import { useNavigate } from 'react-router-dom';

type ActiveOverlay = 'none' | 'lang' | 'vip' | 'mobileMenu';

// All items that should open a dropdown on hover
const DROPDOWN_ITEMS = ['Market', 'Products', 'Service & Support', 'About Us', 'Downloads', 'Blog'];

// Items that are also direct links (navigate on click even if they have a dropdown)
const DIRECT_LINK_ITEMS: Record<string, string> = {
  'Blog': '/blog',
  'Downloads': '/about',
  'About Us': '/about',
};

interface NavbarProps {
  onSearchClick: () => void;
  isSearchOpen: boolean;
  onCloseSearch: () => void;
}

export default function Navbar({ onSearchClick, isSearchOpen, onCloseSearch }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlay>('none');
  const { t } = useLanguage();
  const navigate = useNavigate();

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

  const lastScrollY = useRef(0);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearDropdownTimeout = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  }, []);

  const handleDropdownEnter = useCallback((label: string) => {
    clearDropdownTimeout();
    setActiveDropdown(label);
  }, [clearDropdownTimeout]);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  const { scrollY } = useScroll();

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const openOverlay = useCallback((overlay: ActiveOverlay) => {
    clearHoverTimeout();
    if (isSearchOpen && overlay !== 'none') onCloseSearch();
    setActiveOverlay(overlay);
    if (overlay !== 'none') setActiveDropdown(null);
  }, [clearHoverTimeout, isSearchOpen, onCloseSearch]);

  const closeAllOverlays = useCallback(() => {
    clearHoverTimeout();
    setActiveOverlay('none');
    setActiveDropdown(null);
  }, [clearHoverTimeout]);

  const toggleOverlay = useCallback((overlay: ActiveOverlay) => {
    if (activeOverlay === overlay) setActiveOverlay('none');
    else openOverlay(overlay);
  }, [activeOverlay, openOverlay]);

  const handleSearchClick = useCallback(() => {
    closeAllOverlays();
    onSearchClick();
  }, [closeAllOverlays, onSearchClick]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const direction = latest > lastScrollY.current ? 'down' : 'up';
    if (direction === 'down' && latest > 100) {
      setIsVisible(false);
      setActiveDropdown(null);
    } else {
      setIsVisible(true);
    }
    setIsScrolled(latest > 50);
    lastScrollY.current = latest;
  });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-navbar]') && !target.closest('[data-dropdown]')) {
        setActiveDropdown(null);
        if (activeOverlay === 'lang' || activeOverlay === 'vip') setActiveOverlay('none');
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [activeOverlay]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAllOverlays();
        if (isSearchOpen) onCloseSearch();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeAllOverlays, isSearchOpen, onCloseSearch]);

  useEffect(() => {
    return () => { clearHoverTimeout(); clearDropdownTimeout(); };
  }, [clearHoverTimeout, clearDropdownTimeout]);

  const handleLanguageEnter = useCallback(() => { clearHoverTimeout(); openOverlay('lang'); }, [clearHoverTimeout, openOverlay]);
  const handleLanguageLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => setActiveOverlay(prev => prev === 'lang' ? 'none' : prev), 150);
  }, []);

  const handleVIPEnter = useCallback(() => { clearHoverTimeout(); openOverlay('vip'); }, [clearHoverTimeout, openOverlay]);
  const handleVIPLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => setActiveOverlay(prev => prev === 'vip' ? 'none' : prev), 150);
  }, []);

  const toggleMobileMenu = useCallback(() => toggleOverlay('mobileMenu'), [toggleOverlay]);

  return (
    <>
      <motion.nav
        data-navbar
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled ? 'backdrop-blur-xl' : 'bg-transparent'
        }`}
        style={isScrolled ? { background: 'hsla(0, 0%, 10%, 0.55)' } : undefined}
      >
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 md:px-6 lg:px-10">

          {/* Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}
            className="flex items-center gap-2.5 shrink-0"
          >
            <img src={vexaledLogo} alt="VEXALED" className="h-6 w-auto max-w-[160px]" />
          </a>

          {/* Center nav links */}
          {!isSearchOpen && (
            <div className="hidden lg:flex items-center justify-center flex-1 px-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-5 xl:gap-7"
              >
                {navItems.map((item) => {
                  const hasDropdown = DROPDOWN_ITEMS.includes(item.label);
                  const directLink = DIRECT_LINK_ITEMS[item.label];
                  const isActive = activeDropdown === item.label;

                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => hasDropdown && handleDropdownEnter(item.label)}
                      onMouseLeave={() => hasDropdown && handleDropdownLeave()}
                    >
                      <button
                        onClick={() => directLink ? navigate(directLink) : undefined}
                        className={`whitespace-nowrap py-1 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 ${
                          isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {getNavLabel(item.label)}
                      </button>
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </div>
          )}

          {isSearchOpen && <div className="hidden lg:block flex-1" />}

          {/* Right icons */}
          <div className="hidden items-center justify-end gap-0.5 lg:flex">
            <button
              onClick={isSearchOpen ? onCloseSearch : handleSearchClick}
              className="group flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-muted/20 hover:ring-1 hover:ring-border/30"
              aria-label={isSearchOpen ? 'Close search' : 'Search'}
            >
              {isSearchOpen
                ? <X className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                : <Search className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" strokeWidth={1.5} />}
            </button>

            <div className="relative" data-dropdown onMouseEnter={handleLanguageEnter} onMouseLeave={handleLanguageLeave}>
              <button
                onClick={() => toggleOverlay('lang')}
                className={`group flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-muted/20 hover:ring-1 hover:ring-border/30 ${activeOverlay === 'lang' ? 'bg-muted/20 ring-1 ring-border/30' : ''}`}
                aria-label="Language"
                aria-expanded={activeOverlay === 'lang'}
              >
                <Globe className={`h-4 w-4 transition-colors ${activeOverlay === 'lang' ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`} strokeWidth={1.5} />
              </button>
              <AnimatePresence>
                {activeOverlay === 'lang' && (
                  <LanguageDropdown onClose={() => setActiveOverlay('none')} onMouseEnter={handleLanguageEnter} onMouseLeave={handleLanguageLeave} />
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => navigate('/configurator')}
              className="group flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-muted/20 hover:ring-1 hover:ring-primary/30"
              aria-label="Configure"
            >
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" strokeWidth={1.5} />
            </button>

            <div className="relative" data-dropdown onMouseEnter={handleVIPEnter} onMouseLeave={handleVIPLeave}>
              <button
                onClick={() => toggleOverlay('vip')}
                className={`group flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-muted/20 hover:ring-1 hover:ring-border/30 ${activeOverlay === 'vip' ? 'bg-muted/20 ring-1 ring-border/30' : ''}`}
                aria-label="VIP Login"
                aria-expanded={activeOverlay === 'vip'}
              >
                <User className={`h-4 w-4 transition-colors ${activeOverlay === 'vip' ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`} strokeWidth={1.5} />
              </button>
              <AnimatePresence>
                {activeOverlay === 'vip' && (
                  <VIPDropdown onClose={() => setActiveOverlay('none')} onMouseEnter={handleVIPEnter} onMouseLeave={handleVIPLeave} />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted/20 lg:hidden"
            aria-label={activeOverlay === 'mobileMenu' ? 'Close menu' : 'Open menu'}
            aria-expanded={activeOverlay === 'mobileMenu'}
          >
            {activeOverlay === 'mobileMenu'
              ? <X className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              : <Menu className="h-5 w-5 text-foreground" strokeWidth={1.5} />}
          </button>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${isScrolled ? 'bg-border/20 opacity-100' : 'opacity-0'}`} />
      </motion.nav>

      {/* Dropdown backdrop */}
      <AnimatePresence>
        {activeDropdown && !isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40"
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>

      {/* Mega Menu dropdown */}
      <AnimatePresence>
        {activeDropdown && !isSearchOpen && (
          (() => {
            const activeItem = navItems.find(item => item.label === activeDropdown);
            if (!activeItem?.sections && !activeItem?.subCategories) return null;
            return (
              <MegaMenu
                item={activeItem}
                onClose={() => setActiveDropdown(null)}
                onMouseEnter={() => handleDropdownEnter(activeDropdown)}
                onMouseLeave={handleDropdownLeave}
              />
            );
          })()
        )}
      </AnimatePresence>

      {/* Language backdrop */}
      <AnimatePresence>
        {activeOverlay === 'lang' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            onClick={() => setActiveOverlay('none')}
          />
        )}
      </AnimatePresence>

      {/* VIP backdrop */}
      <AnimatePresence>
        {activeOverlay === 'vip' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            onClick={() => setActiveOverlay('none')}
          />
        )}
      </AnimatePresence>

      <MobileMenu isOpen={activeOverlay === 'mobileMenu'} onClose={() => setActiveOverlay('none')} />
    </>
  );
}
