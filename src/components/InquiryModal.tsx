import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import FocusTrap from 'focus-trap-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { useContactForm } from '@/hooks/useContactForm';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let code = '';
  for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const { t } = useLanguage();
  const contactForm = useContactForm();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', country: '',
    jobTitle: '', productSolution: '', verificationCode: '', message: '',
    // Hidden honeypot — must stay empty. Bots fill it; we drop those submissions.
    hp_company_website: '',
  });

  const refreshCaptcha = useCallback(() => setCaptcha(generateCaptcha()), []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.verificationCode.toLowerCase() !== captcha.toLowerCase()) {
      const { toast } = await import('sonner');
      toast.error('Verification code does not match. Please try again.');
      refreshCaptcha();
      return;
    }
    const result = await contactForm.mutateAsync({
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      country: form.country,
      jobTitle: form.jobTitle,
      productInterest: form.productSolution,
      message: form.message,
      source: 'inquiry-modal',
      hp_company_website: form.hp_company_website,
    });
    if (result?.success) {
      setForm({ firstName: '', lastName: '', email: '', country: '', jobTitle: '', productSolution: '', verificationCode: '', message: '', hp_company_website: '' });
      refreshCaptcha();
      onClose();
    }
  };

  const inputClass = "w-full bg-transparent border-b border-border/40 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors";

  const products = ['Indoor LED', 'Outdoor LED', 'COB Display', 'Rental & Stage', 'DOOH', 'Custom Solution'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <FocusTrap active={isOpen} focusTrapOptions={{ allowOutsideClick: true }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-2xl border border-border/20 p-6 md:p-8 shadow-2xl"
              style={{ backgroundColor: '#0a0a0f' }}
            >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted/30"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>

            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6 text-center uppercase tracking-wider">
              {t.inquiry?.title || 'Leave an Inquiry'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot — visually & semantically hidden, but visible to bots.
                  Must stay empty for the submission to be accepted. */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
                <label>Company website (leave empty)</label>
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.hp_company_website}
                  onChange={handleChange('hp_company_website')}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5 block">{t.inquiry?.firstName || 'First Name'}</label>
                  <input type="text" required value={form.firstName} onChange={handleChange('firstName')} className={inputClass} />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5 block">{t.inquiry?.lastName || 'Last Name'}</label>
                  <input type="text" required value={form.lastName} onChange={handleChange('lastName')} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5 block">{t.inquiry?.email || 'Work Email'}</label>
                  <input type="email" required value={form.email} onChange={handleChange('email')} className={inputClass} />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5 block">{t.inquiry?.country || 'Country'}</label>
                  <input type="text" required value={form.country} onChange={handleChange('country')} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5 block">{t.inquiry?.jobTitle || 'Job Title'}</label>
                  <input type="text" value={form.jobTitle} onChange={handleChange('jobTitle')} className={inputClass} />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5 block">{t.inquiry?.product || 'Product / Solution'}</label>
                  <select value={form.productSolution} onChange={handleChange('productSolution')} className={`${inputClass} cursor-pointer`}>
                    <option value="" className="bg-background">{t.inquiry?.selectProduct || 'Select...'}</option>
                    {products.map(p => <option key={p} value={p} className="bg-background">{p}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5 block">{t.inquiry?.verificationCode || 'Verification Code'}</label>
                <div className="flex items-center gap-3">
                  <input type="text" required value={form.verificationCode} onChange={handleChange('verificationCode')} className={`${inputClass} max-w-[160px]`} placeholder="Enter code" />
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="px-3 py-1.5 rounded-lg bg-muted/30 font-mono text-base tracking-[0.2em] text-foreground select-none cursor-pointer hover:bg-muted/50 transition-colors"
                    style={{ fontStyle: 'italic' }}
                    title="Click to refresh"
                  >
                    {captcha}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5 block">{t.inquiry?.message || 'Message'}</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={handleChange('message')}
                  className={`${inputClass} resize-none`}
                  placeholder={t.inquiry?.messagePlaceholder || 'Tell us about your project requirements...'}
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full group mt-2">
                <span>{t.inquiry?.submit || 'Submit'}</span>
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
            </motion.div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
