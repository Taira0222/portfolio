import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ja from '@/locales/ja/translation.json';
import en from '@/locales/en/translation.json';

i18n
  .use(LanguageDetector) // ブラウザの言語を検出する
  .use(initReactI18next) // React 用の i18next
  .init({
    // 翻訳はバンドルに同梱（実行時の HTTP 取得は行わない）
    resources: {
      ja: { translation: ja },
      en: { translation: en },
    },
    fallbackLng: 'ja',
    ns: ['translation'],
    defaultNS: 'translation',
    debug: import.meta.env.VITE_DEV === 'true', // 開発環境でのみデバッグモードを有効化
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'], // 言語判定の優先度
      caches: ['localStorage'], // 選択言語をローカルに保持
    },
  });

// <html lang> を実際に表示中の言語に同期させる。
// 宣言(lang)と中身の言語がズレると、ブラウザの翻訳機能が誤判定するため。
const applyDocumentLanguage = (language: string | undefined) => {
  if (typeof document === 'undefined') return;
  const normalized = (language ?? '').split('-')[0].toLowerCase();
  document.documentElement.lang = normalized === 'en' ? 'en' : 'ja';
};

applyDocumentLanguage(i18n.resolvedLanguage ?? i18n.language);
i18n.on('languageChanged', applyDocumentLanguage);

export default i18n;
