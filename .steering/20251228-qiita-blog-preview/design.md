# 技術設計: Qiita最新記事プレビュー機能

## TL;DR (要約)
このドキュメントは、Qiitaブログプレビュー機能を実装するための技術設計書です。

- **技術スタック**: React + TypeScript + Tanstack Query + framer-motion
- **ディレクトリ**: `src/features/home/sections/Blog/`
- **主要ファイル**: Blog.tsx, queries/qiita.ts, hooks/useQiitaArticles.ts
- **データ取得**: Tanstack QueryでQiita API v2から取得
- **責務分離**: queries（データ取得）/ hooks（ビジネスロジック）/ parts（UI）

---

## 1. 必要なライブラリ（依存関係）

### 1.1 本番環境（dependencies）

```bash
npm install @tanstack/react-query
```

| パッケージ | バージョン | 用途 |
|-----------|----------|------|
| `@tanstack/react-query` | ^5.0.0 | データフェッチング、キャッシュ管理、状態管理 |

**備考**:
- `react`, `react-dom`, `framer-motion`, `react-i18next` は既存プロジェクトで導入済み
- `lucide-react` (アイコン) も既存プロジェクトで導入済み

### 1.2 開発環境（devDependencies）

```bash
npm install -D @tanstack/react-query-devtools vitest happy-dom @vitest/coverage-v8 @testing-library/react @testing-library/user-event @testing-library/jest-dom msw
```

| パッケージ | バージョン | 用途 |
|-----------|----------|------|
| `@tanstack/react-query-devtools` | ^5.0.0 | React Query開発者ツール（デバッグ用） |
| `vitest` | ^1.0.0 | テストランナー |
| `happy-dom` | ^12.0.0 | 軽量DOM環境（jsdомより高速） |
| `@vitest/coverage-v8` | ^1.0.0 | カバレッジレポート生成 |
| `@testing-library/react` | ^14.0.0 | Reactコンポーネントテスト |
| `@testing-library/user-event` | ^14.0.0 | ユーザー操作のシミュレーション |
| `@testing-library/jest-dom` | ^6.0.0 | DOM要素のカスタムマッチャー |
| `msw` | ^2.0.0 | APIモック（Mock Service Worker） |

### 1.3 インストールコマンドまとめ

```bash
# 本番環境の依存関係
npm install @tanstack/react-query

# 開発環境の依存関係（テスト含む）
npm install -D @tanstack/react-query-devtools vitest happy-dom @vitest/coverage-v8 @testing-library/react @testing-library/user-event @testing-library/jest-dom msw
```

### 1.4 補足: MCP (Model Context Protocol) について

**MCPは不要です。**

このプロジェクトでは、Qiita APIへのアクセスは標準的なHTTP fetchで十分です。MCPは以下のような場合に有用ですが、今回の要件には該当しません:

- **MCPが有用なケース**:
  - 複数の異なるAPIを統一的に扱いたい場合
  - AIエージェントがリアルタイムで外部リソースにアクセスする必要がある場合
  - 開発ツール間での統一的なプロトコルが必要な場合

- **今回のケース**:
  - Qiita API v2への単純なHTTPリクエスト
  - fetch APIで十分に対応可能
  - 過剰な抽象化は不要

---

## 2. アーキテクチャ概要

### 2.1 システム構成図
```
┌─────────────────────────────────────────┐
│          Portfolio Site (React)          │
│  ┌────────────────────────────────────┐  │
│  │      Home.tsx (Container)          │  │
│  │  ┌──────────────────────────────┐  │  │
│  │  │   Blog Section Component     │  │  │
│  │  │  ┌────────────────────────┐  │  │  │
│  │  │  │ useQiitaArticles Hook  │  │  │  │
│  │  │  └──────────┬─────────────┘  │  │  │
│  │  │             │                │  │  │
│  │  │             v                │  │  │
│  │  │  ┌────────────────────────┐  │  │  │
│  │  │  │   BlogCardList         │  │  │  │
│  │  │  │    ├─ BlogCard (x3)    │  │  │  │
│  │  │  │    ├─ Loading State    │  │  │  │
│  │  │  │    └─ Error State      │  │  │  │
│  │  │  └────────────────────────┘  │  │  │
│  │  └──────────────────────────────┘  │  │
│  └────────────────────────────────────┘  │
└──────────────────┬──────────────────────┘
                   │ HTTP Request
                   v
         ┌─────────────────┐
         │   Qiita API v2  │
         │  /users/{user}  │
         │      /items     │
         └─────────────────┘
```

### 2.2 データフロー
1. ユーザーがページを開く
2. `Blog.tsx` コンポーネントがマウント
3. `useQiitaArticles` フックがQiita APIにリクエスト
4. APIレスポンスを受信し、記事データをstate に保存
5. `BlogCardList` が記事データを受け取り、`BlogCard` を3枚レンダリング
6. ユーザーがカードをクリック → Qiita記事ページへ遷移

## 3. ディレクトリ構成

### 3.1 Blog機能のディレクトリ構成

```
src/features/home/sections/Blog/
├── Blog.tsx                    # メインコンポーネント（セクション全体）
├── index.ts                    # エクスポート
├── parts/
│   ├── BlogSectionHeader.tsx  # セクションヘッダー（タイトル・説明文）
│   ├── BlogCard.tsx           # 単一記事カードコンポーネント
│   └── BlogCardList.tsx       # カードリスト（ローディング/エラー含む）
├── queries/
│   └── qiita.ts               # useQuery + API取得関数
├── hooks/
│   └── useQiitaArticles.ts    # カスタムフック（ビジネスロジック）
├── utils/
│   └── extractSummary.ts      # 要約抽出ユーティリティ
├── __tests__/
│   ├── Blog.test.tsx          # Blog統合テスト
│   ├── parts/
│   │   ├── BlogCard.test.tsx  # BlogCard単体テスト
│   │   └── BlogCardList.test.tsx # BlogCardList単体テスト
│   ├── queries/
│   │   └── qiita.test.ts      # API関数・useQueryテスト
│   ├── hooks/
│   │   └── useQiitaArticles.test.ts # カスタムフックテスト
│   ├── utils/
│   │   └── extractSummary.test.ts # ユーティリティ関数テスト
│   └── mocks/
│       ├── handlers.ts        # MSW APIモックハンドラー
│       └── data.ts            # テスト用モックデータ
├── types.ts                    # TypeScript型定義
└── constants.ts                # 定数（API URL、ユーザー名等）
```

### 3.2 Tanstack Query セットアップ用ディレクトリ

プロジェクトルートレベルでの追加ファイル:

```
src/
├── lib/
│   └── queryClient.ts          # QueryClient設定（推奨）
├── main.tsx                     # QueryClientProviderを追加
└── features/
    └── home/
        └── sections/
            └── Blog/            # Blog機能（上記参照）
```

### 3.3 責務の分離

| ディレクトリ/ファイル | 責務 |
|-------------------|------|
| `queries/qiita.ts` | Qiita APIへのfetch関数 + useQuery定義 |
| `hooks/useQiitaArticles.ts` | queriesを利用したビジネスロジック（データ変換・フィルタリング等） |
| `parts/` | UIコンポーネント |
| `utils/` | 汎用的なユーティリティ関数 |
| `__tests__/` | 単体テスト・統合テスト（vitest + React Testing Library） |
| `__tests__/mocks/` | MSWを使ったAPIモック |
| `lib/queryClient.ts` | Tanstack Queryのグローバル設定 |

## 4. コンポーネント設計

### 4.1 Blog.tsx（メインコンポーネント）

**責務:**
- セクション全体のレイアウト
- framer-motionアニメーション制御（fadeUpバリアント使用）
- 子コンポーネントの統合

**主要な実装ポイント:**
- 既存セクション（Hero, About等）と同様のアニメーション設定
- 背景装飾（グラデーション、blur効果）を既存デザインに合わせる
- `useQiitaArticles`フックから記事データを取得

### 4.2 BlogSectionHeader.tsx

**責務:**
- セクションのタイトル・説明文を表示
- i18nでの多言語対応

**Props:**
```tsx
type BlogSectionHeaderProps = {
  variants: any; // framer-motion variants
};
```

### 4.3 BlogCard.tsx

**責務:**
- 単一記事の情報を表示（タイトル、要約、リンク）
- カードのホバーエフェクト
- 外部リンク（Qiita記事）への遷移（`target="_blank"`, `rel="noopener noreferrer"`）

**Props:**
```tsx
type BlogCardProps = {
  article: QiitaArticle;
};
```

**主要な実装ポイント:**
- `extractSummary(article.body)`で要約を生成
- `lucide-react`の`ExternalLink`アイコン使用
- `line-clamp-2`（タイトル）、`line-clamp-3`（要約）で行数制限
- 既存の`Card`コンポーネント（shadcn/ui）を使用

### 4.4 BlogCardList.tsx

**責務:**
- 記事カードのグリッドレイアウト（レスポンシブ対応）
- ローディング/エラー/空状態の表示

**Props:**
```tsx
type BlogCardListProps = {
  articles: QiitaArticle[];
  isLoading: boolean;
  error: Error | null;
  variants: any;
};
```

**レイアウト:**
- モバイル: 1カラム
- タブレット: 2カラム（`md:grid-cols-2`）
- デスクトップ: 3カラム（`lg:grid-cols-3`）

## 5. データ取得設計（Tanstack Query）

### 5.1 QueryClient のセットアップ

**ファイル:** `src/lib/queryClient.ts`

**設定内容:**
- `staleTime`: 5分（キャッシュの新鮮さ）
- `gcTime`: 10分（キャッシュ保持時間、旧cacheTime）
- `retry`: 2回
- `refetchOnWindowFocus`: false

**main.tsx への統合:**
- `QueryClientProvider`でAppをラップ
- 開発環境では`ReactQueryDevtools`を追加

### 5.2 queries/qiita.ts

**責務:**
- Qiita APIからデータを取得する`fetchQiitaArticles`関数
- `useQiitaArticlesQuery`フックの定義

**API仕様:**
- エンドポイント: `GET /users/{QIITA_USERNAME}/items`
- クエリパラメータ: `per_page=3`, `page=1`
- queryKey: `['qiitaArticles']`

**エラーハンドリング:**
- レスポンスが`!response.ok`の場合、HTTPステータスコード付きエラーをthrow

### 5.3 hooks/useQiitaArticles.ts

**責務:**
- `useQiitaArticlesQuery`をラップしたビジネスロジック層
- 将来的なデータ変換やフィルタリングの追加ポイント

**戻り値:**
```tsx
{
  articles: QiitaArticle[];  // data ?? []
  isLoading: boolean;
  error: Error | null;
}
```

## 6. ユーティリティ関数設計

### 6.1 extractSummary.ts

**責務:**
- markdown記法を除去してプレーンテキストに変換
- 指定文字数（デフォルト150文字）で要約を生成

**シグネチャ:**
```tsx
export const extractSummary = (body: string, maxLength: number = 150): string
```

**処理内容:**
1. 正規表現でmarkdown記法を除去（見出し、太字、リンク、コードブロック等）
2. 改行を空白に変換
3. `maxLength`を超える場合は`...`を付けて切り取り

## 7. 型定義

### 7.1 types.ts

```tsx
/**
 * Qiita API v2 レスポンス型
 * 参考: https://qiita.com/api/v2/docs#get-apiv2usersuser_iditems
 */
export type QiitaArticle = {
  id: string;
  title: string;
  url: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  body: string;
  tags: Array<{
    name: string;
    versions: string[];
  }>;
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
  article: QiitaArticle;
};

/**
 * BlogCardList コンポーネントのProps
 */
export type BlogCardListProps = {
  articles: QiitaArticle[];
  isLoading: boolean;
  error: Error | null;
  variants: any;
};
```

## 8. 定数管理

### 8.1 constants.ts

**定数一覧:**
- `QIITA_API_URL`: `'https://qiita.com/api/v2'`
- `QIITA_USERNAME`: Qiitaユーザー名（TODO: 環境変数化 `VITE_QIITA_USERNAME`）
- `ARTICLES_PER_PAGE`: `3`
- `SUMMARY_MAX_LENGTH`: `150`

## 9. 多言語対応（i18n）

### 9.1 translation.json への追加

#### public/locales/ja/translation.json
```json
{
  "navigation": {
    "sections": {
      "home": "ホーム",
      "about": "わたしについて",
      "techStack": "技術スタック",
      "portfolio": "ポートフォリオ一覧",
      "blog": "技術ブログ",
      "career": "今までのキャリア"
    }
  },
  "blog": {
    "eyebrow": "Tech Blog",
    "title": "最新の技術記事",
    "description": "Qiitaで公開している技術記事の最新3件です。",
    "readMore": "記事を読む",
    "viewAllArticles": "すべての記事を見る",
    "loading": "記事を読み込み中...",
    "error": "記事の読み込みに失敗しました",
    "noArticles": "記事が見つかりませんでした"
  }
}
```

#### public/locales/en/translation.json
```json
{
  "navigation": {
    "sections": {
      "home": "Home",
      "about": "About",
      "techStack": "Tech Stack",
      "portfolio": "Portfolio",
      "blog": "Blog",
      "career": "Career"
    }
  },
  "blog": {
    "eyebrow": "Tech Blog",
    "title": "Latest Articles",
    "description": "The latest 3 articles published on Qiita.",
    "readMore": "Read Article",
    "viewAllArticles": "View All Articles",
    "loading": "Loading articles...",
    "error": "Failed to load articles",
    "noArticles": "No articles found"
  }
}
```

### 9.2 navigationLinks.ts への追加

**ファイル:** `src/components/ui/Navigation/navigationLinks.ts`

**追加項目:**
```tsx
{ href: '#blog', labelKey: 'navigation.sections.blog' }
```

**配置:** `#portfolio`と`#career`の間

## 10. Home.tsx への統合

**変更内容:**
- `Blog`コンポーネントをインポート
- `<main>`内、`<Portfolio />`と`<Career />`の間に`<Blog />`を配置

## 11. エラーハンドリング設計

### 11.1 エラーの種類
- ネットワークエラー（接続不可）
- HTTPエラー（404, 500等）
- タイムアウト
- JSONパースエラー

### 11.2 エラー表示UI
- エラーメッセージ: `t('blog.error')`

## 12. テスト設計（vitest + React Testing Library + MSW）

### 12.1 テスト環境のセットアップ

**主要技術:**
- **テストランナー**: vitest
- **DOM環境**: happy-dom
- **カバレッジ**: @vitest/coverage-v8
- **APIモック**: MSW (Mock Service Worker)

#### 12.1.1 vitest.config.ts

**必須設定項目:**
- `environment: 'happy-dom'` - 軽量DOM環境
- `globals: true` - describe/test/expectをimport不要に
- `setupFiles: ['./vitest.setup.ts']` - セットアップファイル指定
- `coverage.provider: 'v8'` - カバレッジプロバイダー
- `coverage.exclude` - カバレッジ除外ファイル（types.ts, constants.ts, __tests__, mocks等）
- `resolve.alias` - `@`パスエイリアス（既存vite.config.tsと同じ設定）

**参考:** [Vitest Configuration](https://vitest.dev/config/)

#### 12.1.2 vitest.setup.ts

**必須設定項目:**
- `import '@testing-library/jest-dom'` - カスタムマッチャー追加
- `afterEach(() => cleanup())` - 各テスト後のクリーンアップ
- `global.IntersectionObserver` モック - framer-motionの`whileInView`等で必要
- `global.ResizeObserver` モック - UIライブラリで必要な場合あり

**MSWセットアップ:**
- 各テストファイルで個別に設定を推奨（テストごとに異なるモックハンドラーを使い分けるため）
- グローバル設定も可能だが、柔軟性が低下

**参考:** [MSW Node Integration](https://mswjs.io/docs/integrations/node)

#### 12.1.3 既存プロジェクトへの統合

**vitest.config.ts が既にある場合:**
- 既存の `setupFiles` 配列に `'./vitest.setup.ts'` を追加
- `environment` が `jsdom` なら `happy-dom` への変更を検討（高速化）

**vitest.setup.ts が既にある場合:**
- `IntersectionObserver` / `ResizeObserver` のモックを追加
- 既存設定は維持

#### 12.1.4 テストの記述スタイル

**test vs it:**
- このプロジェクトでは **`test`** を使用（`it` は使わない）

**グローバル設定を使う場合:**
```ts
import { describe, test, expect } from 'vitest';
```
は不要（`globals: true` のため）

#### 12.1.5 参考資料
- [Vitest 公式ドキュメント](https://vitest.dev/)
- [happy-dom GitHub](https://github.com/capricorn86/happy-dom)
- [MSW Documentation](https://mswjs.io/docs/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### 12.2 テスト対象一覧

#### 単体テスト
| ファイル | テスト内容 |
|---------|----------|
| `utils/extractSummary.test.ts` | markdown除去、文字数制限のロジック検証 |
| `parts/BlogCard.test.tsx` | 記事カードのレンダリング、リンク属性検証 |
| `parts/BlogCardList.test.tsx` | ローディング/エラー/空状態の表示検証 |

#### API・Query層テスト
| ファイル | テスト内容 |
|---------|----------|
| `queries/qiita.test.ts` | `fetchQiitaArticles`の成功/エラー処理 |
| `hooks/useQiitaArticles.test.ts` | カスタムフックの状態管理検証 |

#### 統合テスト
| ファイル | テスト内容 |
|---------|----------|
| `Blog.test.tsx` | Blog全体のエンドツーエンド動作検証 |

### 12.3 モックデータ

**ファイル:** `__tests__/mocks/data.ts`, `__tests__/mocks/handlers.ts`

**内容:**
- 3件のQiita記事モックデータ
- MSWハンドラー（成功パターン、エラーパターン）

### 12.4 テスト実行コマンド

**package.json に追加:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### 12.5 手動テスト項目

**レスポンシブ:**
- モバイル（~768px）: 1カラム
- タブレット（768px~1024px）: 2カラム
- デスクトップ（1024px~）: 3カラム

**アニメーション:**
- セクション表示時のfade-up
- カードホバーエフェクト

**外部リンク:**
- Qiita記事ページへ遷移
- 新しいタブで開く

**ブラウザ互換性:**
- Chrome, Firefox, Safari, Edge 最新版

## 13. 参考資料
- [Qiita API v2 公式ドキュメント](https://qiita.com/api/v2/docs)
- [Tanstack Query 公式ドキュメント](https://tanstack.com/query/latest/docs/framework/react/overview)
- [framer-motion ドキュメント](https://www.framer.com/motion/)
- [Tailwind CSS グリッドレイアウト](https://tailwindcss.com/docs/grid-template-columns)
