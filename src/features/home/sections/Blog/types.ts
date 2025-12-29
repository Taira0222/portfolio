/**
 * Qiita API v2 のレスポンス型定義
 * @see https://qiita.com/api/v2/docs#get-apiv2usersuser_iditems
 */
export type QiitaArticle = {
  /** 記事ID */
  id: string;
  /** 記事タイトル */
  title: string;
  /** 記事URL */
  url: string;
  /** 記事作成日時 */
  created_at: string;
  /** 記事更新日時 */
  updated_at: string;
  /** いいね数 */
  likes_count: number;
  /** 記事本文（Markdown形式） */
  body: string;
  /** タグ一覧 */
  tags: Array<{
    name: string;
    versions: string[];
  }>;
  /** ユーザー情報 */
  user: {
    id: string;
    name: string;
    profile_image_url: string;
  };
};

/**
 * BlogCard コンポーネントのProps
 */
export type BlogCardProps = {
  /** 表示する記事データ */
  article: QiitaArticle;
};

/**
 * BlogCardList コンポーネントのProps
 */
export type BlogCardListProps = {
  /** 表示する記事の配列 */
  articles: QiitaArticle[];
  /** ローディング状態 */
  isLoading: boolean;
  /** エラー情報 */
  error: Error | null;
};
