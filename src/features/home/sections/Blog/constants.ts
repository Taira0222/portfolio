import { externalLinks } from '@/constants/externalLinks';

/**
 * Qiita API のベースURL
 */
export const QIITA_API_URL = externalLinks.qiitaApi.base;

/**
 * Qiita ユーザー名
 * 環境変数 VITE_QIITA_USERNAME から取得
 */
const qiitaUsername = import.meta.env.VITE_QIITA_USERNAME;
if (!qiitaUsername && import.meta.env.DEV) {
  console.warn('[Blog] VITE_QIITA_USERNAME is not set. Please check your .env file.');
}
export const QIITA_USERNAME = qiitaUsername || '';

/**
 * 1ページあたりの記事取得件数
 */
export const ARTICLES_PER_PAGE = 3;

/**
 * 要約文の最大文字数
 */
export const SUMMARY_MAX_LENGTH = 150;
