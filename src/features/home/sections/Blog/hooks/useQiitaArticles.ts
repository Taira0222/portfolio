import { useQiitaArticlesQuery } from '../queries/qiita';
import type { QiitaArticle } from '../types';

/**
 * Qiita 記事一覧を取得するカスタムフック
 *
 * useQiitaArticlesQuery をラップしたビジネスロジック層。
 * 将来的なデータ変換やフィルタリングの追加ポイント。
 *
 * @returns 記事データ、ローディング状態、エラー情報
 *
 * @example
 * ```tsx
 * const { articles, isLoading, error } = useQiitaArticles();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     {articles.map(article => (
 *       <div key={article.id}>{article.title}</div>
 *     ))}
 *   </div>
 * );
 * ```
 */
/**
 * unknown 型のエラーを Error 型に変換する
 */
const toError = (error: unknown): Error | null => {
  if (error === null || error === undefined) return null;
  if (error instanceof Error) return error;
  return new Error(String(error));
};

export const useQiitaArticles = () => {
  const { data, isLoading, error } = useQiitaArticlesQuery();

  return {
    /** 記事データの配列（取得前は空配列） */
    articles: (data ?? []) as QiitaArticle[],
    /** ローディング状態 */
    isLoading,
    /** エラー情報 */
    error: toError(error),
  };
};
