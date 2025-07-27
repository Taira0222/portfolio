import 'i18next';
import translation from 'locales/en/translation.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'; // デフォルトのnamespace名
    resources: typeof translation; // 1ファイル分の型をそのまま使用
  }
}
