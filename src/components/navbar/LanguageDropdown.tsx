import { motion } from 'framer-motion';
import { languages } from './navData';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Language } from '@/i18n/translations';
import { Check } from 'lucide-react';

interface LanguageDropdownProps {
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function LanguageDropdown({ onClose, onMouseEnter, onMouseLeave }: LanguageDropdownProps) {
  const { language, setLanguage } = useLanguage();

  const handleSelect = (code: string) => {
    setLanguage(code as Language);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="absolute right-0 top-full z-[60] mt-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="min-w-[160px] overflow-hidden rounded-lg border border-border/50 bg-surface-dark/98 p-2 shadow-xl shadow-black/30 backdrop-blur-xl">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm transition-colors ${
              language === lang.code
                ? 'text-primary bg-primary/10'
                : 'text-foreground hover:bg-muted/40'
            }`}
          >
            <span>{lang.label}</span>
            {language === lang.code && (
              <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
