import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import vexaledLogo from '@/assets/vexaled-logo.png';
import { useLanguage } from '@/i18n/LanguageContext';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }} className="fixed left-0 right-0 top-0 z-[101] bg-surface-dark/95 backdrop-blur-xl border-b border-border/20">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 md:px-6 lg:px-10">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <img src={vexaledLogo} alt="VEXALED" className="h-9 w-auto" />
            <span className="hidden text-base font-medium tracking-[0.08em] text-foreground sm:block">VEXALED</span>
          </a>
          <div className="flex-1 flex items-center justify-center px-8">
            <div className="flex items-center gap-3 w-full max-w-xl">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
              <input ref={inputRef} type="text" placeholder={t.searchPlaceholder} className="w-full bg-transparent text-sm tracking-wide text-foreground placeholder:text-muted-foreground focus:outline-none border-b border-border/50 pb-1" />
            </div>
          </div>
          <button onClick={onClose} className="group flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-muted/20 hover:ring-1 hover:ring-border/30" aria-label="Close search">
            <X className="h-4 w-4 text-foreground" strokeWidth={1.5} />
          </button>
        </div>
      </motion.div>
    </>
  );
}
