import i18next, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ns } from '~/index';
import * as components from '../components';
import * as sharedLocale from './shared';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

const development = process.env.NODE_ENV !== 'production';

const locales: Resource = {};
const resources: Resource = { ...locales } as const;

i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: {
    en: ['en'],
    default: ['en'],
  },
  debug: development,
  interpolation: {
    escapeValue: false,
  },
  ns,
});

// shared
Object.keys(sharedLocale).map((language, value) => {
  locales[language] = { ...(locales[language] || {}) };
  locales[language][ns] = {
    ...((locales[language][ns] || {}) as object),
    ...sharedLocale[language],
  };
});

// components
const localeModules = Object.keys(components).filter((key) => key.startsWith('locale') && !!components[key]['en']);
localeModules.forEach((module) => {
  const locale = components[module];
  Object.keys(locale).forEach((language) => {
    locales[language] = { ...(locales[language] || {}) };
    locales[language][ns] = {
      ...((locales[language][ns] || {}) as object),
      ...components[module][language],
    };
  });
});

// init locales
Object.keys(locales).forEach((key) => {
  if (!i18next.hasResourceBundle(key, ns)) {
    i18next.addResourceBundle(key, ns, locales[key][ns]);
  }
});

export default i18next;
