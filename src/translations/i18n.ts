import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import es from "./es.json";
import pt from "./pt.json";

i18n.use(initReactI18next).init({
  lng: "pt",
  compatibilityJSON: "v3",
  resources: {
    en,
    es,
    pt,
  },
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  // react: {
  //   useSuspense: false,
  // },
});

export default i18n;
