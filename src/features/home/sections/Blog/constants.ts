/**
 * Qiita API のベースURL
 */
export const QIITA_API_URL = 'https://qiita.com/api/v2';

/**
 * Qiita ユーザー名
 * TODO: 環境変数化 (VITE_QIITA_USERNAME)
 */
export const QIITA_USERNAME = import.meta.env.VITE_QIITA_USERNAME || 'your-username';

/**
 * 1ページあたりの記事取得件数
 */
export const ARTICLES_PER_PAGE = 3;

/**
 * 要約文の最大文字数
 */
export const SUMMARY_MAX_LENGTH = 150;
