import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const basePath = (import.meta.env.BASE_URL ?? '/').replace(/\/*$/, '/');

i18n
  .use(Backend) // HTTP 経由で翻訳ファイルを読み込む
  .use(LanguageDetector) // ブラウザの言語を検出する
  .use(initReactI18next) // React 用の i18next
  .init({
    fallbackLng: 'ja',
    debug: import.meta.env.VITE_DEV || false, // 開発環境でのみデバッグ情報を表示
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${basePath}locales/{{lng}}/{{ns}}.json`, // 翻訳ファイルの場所を指定
    },
    detection: {
      order: ['localStorage', 'navigator'], // 言語判定の優先度
      caches: ['localStorage'], // 選択言語をローカルに保持
    },
  });

export default i18n;
