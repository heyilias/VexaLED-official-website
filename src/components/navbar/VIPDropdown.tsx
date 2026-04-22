import { motion } from 'framer-motion';
import { LogIn, UserPlus } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface VIPDropdownProps {
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function VIPDropdown({ onClose, onMouseEnter, onMouseLeave }: VIPDropdownProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      className="absolute right-0 top-full z-[60] mt-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="min-w-[160px] overflow-hidden rounded-lg border border-border/50 bg-surface-dark/98 shadow-xl shadow-black/30 backdrop-blur-xl">
        <button
          onClick={onClose}
          className="flex w-full items-center gap-2.5 px-3 py-2.5 text-[13px] text-foreground transition-colors hover:bg-muted/40"
        >
          <LogIn className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
          <span>{t.vip.login}</span>
        </button>
        <div className="mx-3 h-px bg-border/30" />
        <button
          onClick={onClose}
          className="flex w-full items-center gap-2.5 px-3 py-2.5 text-[13px] text-foreground transition-colors hover:bg-muted/40"
        >
          <UserPlus className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
          <span>{t.vip.register}</span>
        </button>
      </div>
    </motion.div>
  );
}
