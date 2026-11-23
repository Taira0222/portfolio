import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ja from '@/locales/ja/translation.json';
import en from '@/locales/en/translation.json';
import { languageFromLocation, type Language } from '@/lib/language';

// 言語は URL だけで決める（英語は /、日本語は /ja）。ブラウザの言語では切り替えない
i18n.use(initReactI18next).init({
  // 翻訳はバンドルに同梱（実行時の HTTP 取得は行わない）
  resources: {
    ja: { translation: ja },
    en: { translation: en },
  },
  lng: languageFromLocation(),
  fallbackLng: 'en',
  supportedLngs: ['en', 'ja'],
  ns: ['translation'],
  defaultNS: 'translation',
  debug: import.meta.env.VITE_DEV === 'true', // 開発環境でのみデバッグモードを有効化
  interpolation: {
    escapeValue: false,
  },
});

// 日本語の明朝体は日本語のときだけ読む（英語のページを軽くするため）
let japaneseFontsLoaded = false;
const loadJapaneseFonts = () => {
  if (japaneseFontsLoaded) return;
  japaneseFontsLoaded = true;
  void import('@fontsource/shippori-mincho/500.css');
  void import('@fontsource/shippori-mincho/700.css');
};

// <html lang> を実際に表示中の言語に同期させる。
// 宣言(lang)と中身の言語がズレると、ブラウザの翻訳機能が誤判定するため。
const applyLanguage = (language: string | undefined) => {
  const normalized: Language = (language ?? '').split('-')[0].toLowerCase() === 'ja' ? 'ja' : 'en';
  if (normalized === 'ja') loadJapaneseFonts();
  if (typeof document === 'undefined') return;
  document.documentElement.lang = normalized;
};

applyLanguage(i18n.resolvedLanguage ?? i18n.language);
i18n.on('languageChanged', applyLanguage);

export default i18n;
