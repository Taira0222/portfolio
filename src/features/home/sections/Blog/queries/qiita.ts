import { useQuery } from '@tanstack/react-query';
import { QIITA_API_URL, QIITA_USERNAME, ARTICLES_PER_PAGE } from '../constants';
import type { QiitaArticle } from '../types';

/**
 * Qiita API から指定ユーザーの記事一覧を取得する
 *
 * @returns 記事データの配列
 * @throws HTTPエラーが発生した場合
 *
 * @example
 * ```ts
 * const articles = await fetchQiitaArticles();
 * console.log(articles); // [{ id: '...', title: '...', ... }]
 * ```
 */
export const fetchQiitaArticles = async (): Promise<QiitaArticle[]> => {
  const url = `${QIITA_API_URL}/users/${QIITA_USERNAME}/items?per_page=${ARTICLES_PER_PAGE}&page=1`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
  }

  const data: QiitaArticle[] = await response.json();
  return data;
};

/**
 * Qiita 記事一覧を取得する React Query フック
 *
 * @returns useQuery の戻り値（data, isLoading, error など）
 *
 * @example
 * ```tsx
 * const { data: articles, isLoading, error } = useQiitaArticlesQuery();
 * ```
 */
export const useQiitaArticlesQuery = () => {
  return useQuery({
    queryKey: ['qiitaArticles'],
    queryFn: fetchQiitaArticles,
  });
};
