import en from '@/i18n/locales/en';
import uk from '@/i18n/locales/uk';
import StorageService from '@/services/storageService';
import { createI18n } from 'vue-i18n';

const getBrowserLanguage = () => {
  const browserLang = navigator.language.split('-')[0];
  return ['en', 'uk'].includes(browserLang) ? browserLang : 'en';
};

const getStoredLanguage = () => {
  const storedLang = StorageService.get('language');
  return storedLang || getBrowserLanguage();
};

const i18n = createI18n({
  legacy: false,
  locale: getStoredLanguage(),
  fallbackLocale: 'en',
  messages: {
    en,
    uk
  }
});

export default i18n;