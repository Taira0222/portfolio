/**
 * 表示する言語は URL だけで決める（英語は `/`、日本語は `/ja`）。
 * 採用側には英語の URL を送るので、ブラウザの言語では切り替えない。
 */
export type Language = 'en' | 'ja';

export const LANGUAGES: Language[] = ['en', 'ja'];

const JA_PREFIX = '/ja';

/** BrowserRouter の basename（例: `/portfolio/`）を除いたパスにする */
const stripBase = (pathname: string, base: string | undefined): string => {
  const normalizedBase = (base ?? '/').replace(/\/+$/, '');
  if (normalizedBase && pathname.startsWith(normalizedBase)) {
    return pathname.slice(normalizedBase.length) || '/';
  }
  return pathname || '/';
};

/** ルーターの中のパス（basename を除いたもの）から言語を決める */
export const languageFromPath = (path: string): Language =>
  path === JA_PREFIX || path.startsWith(`${JA_PREFIX}/`) ? 'ja' : 'en';

/** 開いたときの URL（basename 込み）から言語を決める。i18next の初期値に使う */
export const languageFromLocation = (): Language => {
  if (typeof window === 'undefined') return 'en';
  return languageFromPath(stripBase(window.location.pathname, import.meta.env.BASE_URL));
};

/** 言語の頭（`/ja`）を外したパス */
export const stripLanguage = (path: string): string =>
  languageFromPath(path) === 'ja' ? path.slice(JA_PREFIX.length) || '/' : path || '/';

/** 言語の頭を付けたパス。英語は頭なし */
export const withLanguage = (path: string, language: Language): string => {
  const bare = stripLanguage(path);
  if (language === 'en') return bare;
  return bare === '/' ? JA_PREFIX : `${JA_PREFIX}${bare}`;
};
