import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./lang/en.json";
import ru from "./lang/ru.json";
import uz from "./lang/uz.json";
import { themeConfig } from "configs/theme.config";

const resources = {
  ru: {
    translation: ru,
  },
  en: {
    translation: en,
  },
  uz: {
    translation: uz,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: themeConfig.locale,
  lng: themeConfig.locale,
  interpolation: {
    escapeValue: false,
  },
});

export const dateLocales = {
  en: () => import("dayjs/locale/en"),
  ru: () => import("dayjs/locale/ru"),
  uz: () => import("dayjs/locale/uz"),
};

export default i18n;
