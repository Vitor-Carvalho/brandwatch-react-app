import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import common from '../locales/en/common';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    react: {
      wait: true,
    },
    ns: ['common'],
    defaultNS: 'common',
    debug: process.env.NODE_ENV !== 'production',
    cache: {
      enabled: true,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      addPath: 'locales/add/{{lng}}/{{ns}}',
    },
    load: 'languageOnly',
  });

i18n.addResourceBundle('en', 'common', common);

export default i18n;
