import { QueryClient } from '@tanstack/react-query';

/**
 * Tanstack Query のグローバル設定
 *
 * @see https://tanstack.com/query/latest/docs/framework/react/reference/QueryClient
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // キャッシュの新鮮さ: 5分
      staleTime: 5 * 60 * 1000,
      // キャッシュ保持時間: 10分
      gcTime: 10 * 60 * 1000,
      // リトライ回数: 2回
      retry: 2,
      // ウィンドウフォーカス時の自動再取得を無効化
      refetchOnWindowFocus: false,
    },
  },
});
