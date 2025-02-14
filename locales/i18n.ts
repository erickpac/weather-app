import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import es from "./es.json";

const deviceLanguage = getLocales()[0].languageCode || "en";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: deviceLanguage,
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
