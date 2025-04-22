import i18n from '@/config/i18n';
import StorageService from '@/services/storageService';

// Add the same browser language detection logic as in i18n.js
const getBrowserLanguage = () => {
  const browserLang = navigator.language.split('-')[0];
  return ['en', 'uk'].includes(browserLang) ? browserLang : 'en';
};

const getStoredLanguage = () => {
  const storedLang = StorageService.get('language');
  return storedLang || getBrowserLanguage();
};

export default {
  namespaced: true,
  
  state: () => ({
    locale: getStoredLanguage(), // Use consistent initialization
    availableLocales: ['uk', 'en']
  }),
  
  getters: {
    currentLocale: state => state.locale,
    availableLocales: state => state.availableLocales
  },
  
  mutations: {
    setLocale(state, locale) {
      if (state.availableLocales.includes(locale)) {
        state.locale = locale;
        StorageService.set('language', locale);
        
        i18n.global.locale.value = locale;
      }
    }
  },
  
  actions: {
    changeLocale({ commit }, locale) {
      commit('setLocale', locale);
    },
    
    // New action to synchronize i18n and store on app initialization
    initLocale({ commit, state }) {
      // Make sure i18n's locale is in sync with the store's locale
      if (i18n.global.locale.value !== state.locale) {
        i18n.global.locale.value = state.locale;
      }
    }
  }
}