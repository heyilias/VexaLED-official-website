import { useLanguage } from './LanguageContext';
import { pageTranslations, type PageTranslations } from './pageTranslations';

export function usePageTranslations(): PageTranslations {
  const { language } = useLanguage();
  return pageTranslations[language] || pageTranslations.en;
}
