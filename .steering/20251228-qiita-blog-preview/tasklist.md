# 実装タスクリスト: Qiita最新記事プレビュー機能

## タスク概要
このドキュメントでは、requirements.md と design.md に基づき、Qiita最新記事プレビュー機能の実装を段階的に進めるためのタスクリストを定義します。

---

## Phase 1: 環境セットアップ ✅

### Task 1-1: Tanstack Query のインストール ✅
- [x] `@tanstack/react-query` をインストール
  - [x] `npm install @tanstack/react-query`
- [x] `@tanstack/react-query-devtools` をインストール（開発用）
  - [x] `npm install -D @tanstack/react-query-devtools`

**成果物**: package.json に依存関係が追加される

**参考**: [design.md#1-必要なライブラリ依存関係](./design.md#1-必要なライブラリ依存関係)

---

### Task 1-2: テスト環境のセットアップ（オプション） ✅
- [x] テスト関連パッケージをインストール
  - [x] `npm install -D vitest happy-dom @vitest/coverage-v8 @testing-library/react @testing-library/user-event @testing-library/jest-dom msw`
- [x] `vitest.config.ts` の作成または更新
  - [x] `environment: 'happy-dom'` を設定
  - [x] `globals: true` を設定
  - [x] `setupFiles: ['./vitest.setup.ts']` を設定
  - [x] カバレッジ設定を追加
- [x] `vitest.setup.ts` の作成
  - [x] `@testing-library/jest-dom` をインポート
  - [x] `IntersectionObserver` モックを追加
  - [x] `ResizeObserver` モックを追加

**成果物**: vitest.config.ts, vitest.setup.ts

**参考**: [design.md#121-テスト環境のセットアップ](./design.md#121-テスト環境のセットアップ)

---

### Task 1-3: QueryClient のセットアップ ✅
- [x] `src/lib/queryClient.ts` を作成
  - [x] `QueryClient` インスタンスを作成
  - [x] `staleTime: 5 * 60 * 1000` を設定
  - [x] `gcTime: 10 * 60 * 1000` を設定
  - [x] `retry: 2` を設定
  - [x] `refetchOnWindowFocus: false` を設定
- [x] `src/main.tsx` を更新
  - [x] `QueryClientProvider` でアプリをラップ
  - [x] 開発環境で `ReactQueryDevtools` を追加

**成果物**: [src/lib/queryClient.ts](../../src/lib/queryClient.ts), [src/main.tsx](../../src/main.tsx)

**参考**: [design.md#51-queryclient-のセットアップ](./design.md#51-queryclient-のセットアップ)

---

## Phase 2: ディレクトリ構造とファイルの作成 ✅

### Task 2-1: ディレクトリ・ファイル構造の作成 ✅
- [x] `src/features/home/sections/Blog/` ディレクトリを作成
- [x] 以下の空ファイルを作成:
  - [x] `Blog.tsx`
  - [x] `index.ts`
  - [x] `types.ts`
  - [x] `constants.ts`
  - [x] `parts/BlogSectionHeader.tsx`
  - [x] `parts/BlogCard.tsx`
  - [x] `parts/BlogCardList.tsx`
  - [x] `queries/qiita.ts`
  - [x] `hooks/useQiitaArticles.ts`
  - [x] `utils/extractSummary.ts`

**成果物**: 完全なディレクトリ構造

**参考**: [design.md#31-blog機能のディレクトリ構成](./design.md#31-blog機能のディレクトリ構成)

---

### Task 2-2: 型定義の実装 (types.ts) ✅
- [x] `QiitaArticle` 型を定義
  - [x] id, title, url, created_at, updated_at フィールド
  - [x] likes_count, body フィールド
  - [x] tags, user フィールド
- [x] `BlogCardProps` 型を定義
- [x] `BlogCardListProps` 型を定義
- [x] JSDocコメントを追加

**成果物**: [types.ts](../../src/features/home/sections/Blog/types.ts)

**参考**: [design.md#7-型定義](./design.md#7-型定義)

---

### Task 2-3: 定数の定義 (constants.ts) ✅
- [x] `QIITA_API_URL` を定義（`'https://qiita.com/api/v2'`）
- [x] `QIITA_USERNAME` を定義（環境変数対応済み）
- [x] `ARTICLES_PER_PAGE` を定義（`3`）
- [x] `SUMMARY_MAX_LENGTH` を定義（`150`）

**成果物**: [constants.ts](../../src/features/home/sections/Blog/constants.ts)

**参考**: [design.md#8-定数管理](./design.md#8-定数管理)

---

## Phase 3: ユーティリティとデータ取得層の実装 ✅

### Task 3-1: 要約抽出関数の実装 (utils/extractSummary.ts) ✅
- [x] `extractSummary` 関数を実装
  - [x] markdown記法を正規表現で除去
    - [x] 見出し（`#`）の除去
    - [x] 太字（`**`, `__`）の除去
    - [x] イタリック（`*`, `_`）の除去
    - [x] リンク（`[text](url)`）の除去
    - [x] コードブロック・インラインコード（`` ` ``）の除去
    - [x] 画像（`![alt](url)`）の除去
    - [x] 引用（`>`）の除去
    - [x] リスト（`-`, `*`, `+`, `1.`）の除去
  - [x] 改行を空白に変換
  - [x] 指定文字数で切り取り（`maxLength`）
  - [x] 末尾に「...」を追加（文字数超過時）
- [x] JSDocコメントを追加

**成果物**: [utils/extractSummary.ts](../../src/features/home/sections/Blog/utils/extractSummary.ts)

**参考**: [design.md#61-extractsummaryts](./design.md#61-extractsummaryts)

---

### Task 3-2: API関数の実装 (queries/qiita.ts) ✅
- [x] `fetchQiitaArticles` 関数を実装
  - [x] `fetch` でQiita APIにリクエスト
  - [x] エンドポイント: `/users/{QIITA_USERNAME}/items`
  - [x] クエリパラメータ: `per_page=3`, `page=1`
  - [x] レスポンスのステータスコードチェック
  - [x] HTTPエラー時は `Error` をthrow
  - [x] JSONをパースして返す
- [x] `useQiitaArticlesQuery` フックを実装
  - [x] `queryKey: ['qiitaArticles']` を設定
  - [x] `queryFn: fetchQiitaArticles` を設定
- [x] JSDocコメントを追加

**成果物**: [queries/qiita.ts](../../src/features/home/sections/Blog/queries/qiita.ts)

**参考**: [design.md#52-queriesqiitats](./design.md#52-queriesqiitats)

---

### Task 3-3: useQiitaArticles カスタムフックの実装 ✅
- [x] `useQiitaArticlesQuery` をインポート
- [x] ビジネスロジック層としてラップ
  - [x] `articles: data ?? []` を返す
  - [x] `isLoading` を返す
  - [x] `error` を返す
- [x] JSDocコメントを追加

**成果物**: [hooks/useQiitaArticles.ts](../../src/features/home/sections/Blog/hooks/useQiitaArticles.ts)

**参考**: [design.md#53-hooksuseqiitaarticlests](./design.md#53-hooksuseqiitaarticlests)

---

## Phase 4: UIコンポーネントの実装 ✅

### Task 4-1: BlogCard の実装 (parts/BlogCard.tsx) ✅
- [x] カードコンポーネントのマークアップ
  - [x] `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` を使用
  - [x] 外部リンク（`<a>` タグ）で記事URLへ遷移
  - [x] `target="_blank"` と `rel="noopener noreferrer"` を設定
- [x] タイトルの表示
  - [x] 2行で省略: `line-clamp-2`
- [x] 要約の表示
  - [x] `extractSummary` 関数を使用
  - [x] 3行で省略: `line-clamp-3`
- [x] フッターに「記事を読む」ラベル + ExternalLinkアイコン
- [x] ホバーエフェクト（影の変化）を追加
- [x] i18n対応（`t('blog.readMore')`）

**成果物**: [parts/BlogCard.tsx](../../src/features/home/sections/Blog/parts/BlogCard.tsx)

**参考**: [design.md#43-blogcardtsx](./design.md#43-blogcardtsx)

---

### Task 4-2: BlogCardList の実装 (parts/BlogCardList.tsx) ✅
- [x] ローディング状態の表示
  - [x] `t('blog.loading')` を使用
- [x] エラー状態の表示
  - [x] `t('blog.error')` を使用
- [x] 空データ状態の表示
  - [x] `t('blog.noArticles')` を使用
- [x] グリッドレイアウトの実装
  - [x] デスクトップ: `lg:grid-cols-3`
  - [x] タブレット: `md:grid-cols-2`
  - [x] モバイル: `grid-cols-1`
- [x] framer-motion の `motion.div` でアニメーション
  - [x] `cubicBezier` を使用してeasing設定
- [x] `BlogCard` を map で展開

**成果物**: [parts/BlogCardList.tsx](../../src/features/home/sections/Blog/parts/BlogCardList.tsx)

**参考**: [design.md#44-blogcardlisttsx](./design.md#44-blogcardlisttsx)

---

### Task 4-3: BlogSectionHeader の実装 (parts/BlogSectionHeader.tsx) ✅
- [x] セクションのタイトル（`h2`）を表示
  - [x] `id="blog-heading"` を設定（アクセシビリティ）
- [x] Eyebrow（小見出し）を表示
  - [x] `t('blog.eyebrow')` を使用
- [x] 説明文を表示
  - [x] `t('blog.description')` を使用
- [x] framer-motion の `motion.div` でアニメーション
- [x] 既存セクション（Portfolio/Career）と同じスタイリング

**成果物**: [parts/BlogSectionHeader.tsx](../../src/features/home/sections/Blog/parts/BlogSectionHeader.tsx)

**参考**: [design.md#42-blogsectionheadertsx](./design.md#42-blogsectionheadertsx)

---

### Task 4-4: Blog メインコンポーネントの実装 (Blog.tsx) ✅
- [x] セクション全体のマークアップ
  - [x] `<motion.section id="blog">` を設定
  - [x] `aria-labelledby="blog-heading"` を設定
- [x] 背景装飾（グラデーション・ぼかし）
  - [x] 既存のPortfolio/Careerセクションと同様のスタイル
- [x] `useQiitaArticles` フックを呼び出し
- [x] `BlogSectionHeader` と `BlogCardList` を配置
- [x] framer-motion のアニメーション設定
  - [x] `initial="hidden"`
  - [x] `whileInView="visible"`
  - [x] `viewport={{ once: true, amount: 0.2 }}`
- [x] fadeUp バリアント（既存セクションと同様）

**成果物**: [Blog.tsx](../../src/features/home/sections/Blog/Blog.tsx)

**参考**: [design.md#41-blogtsx-メインコンポーネント](./design.md#41-blogtsx-メインコンポーネント)

---

### Task 4-5: エクスポートファイルの作成 (index.ts) ✅
- [x] `Blog` コンポーネントをエクスポート

**成果物**: [index.ts](../../src/features/home/sections/Blog/index.ts)

```tsx
export { Blog } from './Blog';
```

---

## Phase 5: 多言語対応（i18n） ✅

### Task 5-1: 翻訳ファイルの更新（日本語） ✅
- [x] `public/locales/ja/translation.json` を開く
- [x] `navigation.sections.blog` を追加（`"技術ブログ"`）
- [x] `blog` セクションを追加
  - [x] `eyebrow`: `"Tech Blog"`
  - [x] `title`: `"最新の技術記事"`
  - [x] `description`: `"Qiitaで公開している技術記事の最新3件です。"`
  - [x] `readMore`: `"記事を読む"`
  - [x] `viewAllArticles`: `"すべての記事を見る"`
  - [x] `loading`: `"記事を読み込み中..."`
  - [x] `error`: `"記事の読み込みに失敗しました"`
  - [x] `noArticles`: `"記事が見つかりませんでした"`

**成果物**: [public/locales/ja/translation.json](../../public/locales/ja/translation.json)

**参考**: [design.md#91-translationjson-への追加](./design.md#91-translationjson-への追加)

---

### Task 5-2: 翻訳ファイルの更新（英語） ✅
- [x] `public/locales/en/translation.json` を開く
- [x] `navigation.sections.blog` を追加（`"Blog"`）
- [x] `blog` セクションを追加（英語訳）
  - [x] `eyebrow`: `"Tech Blog"`
  - [x] `title`: `"Latest Articles"`
  - [x] `description`: `"The latest 3 articles published on Qiita."`
  - [x] `readMore`: `"Read Article"`
  - [x] `viewAllArticles`: `"View All Articles"`
  - [x] `loading`: `"Loading articles..."`
  - [x] `error`: `"Failed to load articles"`
  - [x] `noArticles`: `"No articles found"`

**成果物**: [public/locales/en/translation.json](../../public/locales/en/translation.json)

**参考**: [design.md#91-translationjson-への追加](./design.md#91-translationjson-への追加)

---

### Task 5-3: ナビゲーションリンクの追加 ✅
- [x] `src/components/ui/Navigation/navigationLinks.ts` を開く
- [x] `blog` リンクを追加
  - [x] `slug: '/blog'`
  - [x] `sectionId: 'blog'`
  - [x] `labelKey: 'navigation.sections.blog'`
  - [x] `defaultLabel: '技術ブログ'`
- [x] Portfolio と Career の間に配置

**成果物**: [src/components/ui/Navigation/navigationLinks.ts](../../src/components/ui/Navigation/navigationLinks.ts)

**参考**: [design.md#92-navigationlinksts-への追加](./design.md#92-navigationlinksts-への追加)

---

## Phase 6: Home.tsx への統合 ✅

### Task 6-1: Blog セクションを Home.tsx に追加 ✅
- [x] `src/features/home/Home.tsx` を開く
- [x] `Blog` コンポーネントをインポート
  - [x] `import { Blog } from './sections/Blog';`
- [x] `<main>` 内の `<Portfolio />` と `<Career />` の間に `<Blog />` を配置

**成果物**: [src/features/home/Home.tsx](../../src/features/home/Home.tsx)

**参考**: [design.md#10-hometsx-への統合](./design.md#10-hometsx-への統合)

---

## Phase 7: 動作確認・調整 ✅

### Task 7-1: 開発環境での動作確認 ✅
- [x] `npm run dev` で開発サーバーを起動
- [x] Qiita APIへの接続確認
  - [x] APIから正常にデータを取得できることを確認
  - [x] curl でユーザー「Taira0222」の記事取得に成功

**確認項目**:
- API取得の成功 ✅
- 開発サーバーの起動確認 ✅ (localhost:5173/portfolio/)
- Qiita API v2エンドポイントの動作確認 ✅

**注記**: レスポンシブ対応、アニメーション、多言語切り替え、アクセシビリティについては、実装が完了しているため、実際のブラウザでの動作確認はユーザーが行うことができます。

---

## Phase 8: 最適化・クリーンアップ ✅

### Task 8-1: 定数の環境変数化 ✅
- [x] `.env` ファイルを作成（または既存ファイルに追加）
- [x] `VITE_QIITA_USERNAME` を定義
- [x] `constants.ts` で `import.meta.env.VITE_QIITA_USERNAME` を使用（Phase 2で実装済み）
- [x] `.env.example` を作成（テンプレート）

**成果物**:
- `.env`
- `.env.example`
- 更新された `constants.ts`

**注意**: `.env` が `.gitignore` に追加されていることを確認 ✅

**参考**: [requirements.md#52-運用上の制約](./requirements.md#52-運用上の制約)

---

### Task 8-2: コードレビュー・リファクタリング ✅
- [x] TypeScript の型エラーがないか確認
  - [x] `npx tsc --noEmit` 実行済み（エラーなし）
- [x] `BlogCardListProps` の型定義修正（`variants` プロパティ削除）
- [x] `cubicBezier` を使用してeasing関数を修正

---

### Task 8-3: ビルド確認 ✅
- [x] プロダクションビルドの実行
  - [x] `npm run build`
- [x] ビルドエラーがないか確認（✅ 成功）
- [x] ビルド成果物のサイズ確認
  - index.js: 632.93 kB (gzip: 206.96 kB)
  - index.css: 76.91 kB (gzip: 11.85 kB)

**参考**: [requirements.md#41-パフォーマンス](./requirements.md#41-パフォーマンス)

---

## Phase 9: テスト実装（オプション） ✅

### Task 9-1: ユーティリティ関数のテスト ✅
- [x] `__tests__/utils/extractSummary.test.ts` を作成
- [x] markdown除去のテストケース
  - [x] 見出し、太字、イタリック、リンク、コードブロック、画像、引用、リスト記号の除去
- [x] 文字数制限のテストケース
  - [x] 指定文字数以下、超過、ちょうどの場合のテスト
- [x] エッジケース（空文字列、短い文字列等）のテスト
  - [x] 空文字列、改行のみ、空白のみ、複数の連続空白の処理
- [x] 実際のQiita記事の例でのテスト

**成果物**: [__tests__/utils/extractSummary.test.ts](../../src/features/home/sections/Blog/__tests__/utils/extractSummary.test.ts)

**結果**: 18テスト全てパス ✅

---

### Task 9-2: コンポーネントのテスト ✅
- [x] `__tests__/parts/BlogCard.test.tsx` を作成
  - [x] 記事カードのレンダリング確認
  - [x] リンク属性の検証 (href, target, rel)
  - [x] 要約表示の確認
  - [x] Markdown記法除去の確認
  - [x] 長い本文の要約処理
- [x] `__tests__/parts/BlogCardList.test.tsx` を作成
  - [x] ローディング状態の表示確認
  - [x] エラー状態の表示確認
  - [x] 空データ状態の表示確認
  - [x] 正常な記事表示の確認
  - [x] グリッドレイアウトのクラス確認
  - [x] 状態の優先順位テスト

**成果物**:
- [__tests__/parts/BlogCard.test.tsx](../../src/features/home/sections/Blog/__tests__/parts/BlogCard.test.tsx)
- [__tests__/parts/BlogCardList.test.tsx](../../src/features/home/sections/Blog/__tests__/parts/BlogCardList.test.tsx)

**結果**: BlogCard 6テスト、BlogCardList 10テスト、全てパス ✅

---



---

## タスク完了チェックリスト（サマリー）

### 必須タスク
- [x] Phase 1: 環境セットアップ（3タスク）※テストはオプション ✅
- [x] Phase 2: ディレクトリ構造とファイルの作成（3タスク） ✅
- [x] Phase 3: ユーティリティとデータ取得層の実装（3タスク） ✅
- [x] Phase 4: UIコンポーネントの実装（5タスク） ✅
- [x] Phase 5: 多言語対応（3タスク） ✅
- [x] Phase 6: Home.tsx への統合（1タスク） ✅
- [x] Phase 7: 動作確認・調整（1タスク） ✅
- [x] Phase 8: 最適化・クリーンアップ（3タスク） ✅

### オプションタスク
- [x] Phase 9: テスト実装（2タスク完了） ✅
- [ ] Phase 10: ドキュメント更新（2タスク）
- [ ] Phase 11: デプロイ・公開（2タスク）

---

## 参考ドキュメント
- [requirements.md](./requirements.md): 要件定義
- [design.md](./design.md): 技術設計
- [Qiita API v2 ドキュメント](https://qiita.com/api/v2/docs)
- [Tanstack Query 公式ドキュメント](https://tanstack.com/query/latest/docs/framework/react/overview)

---

## 実装の優先順位

### 最小限の実装（MVP）
Phase 1-6 を実装することで、基本的なBlogセクションの表示が可能になります。

### 推奨実装
Phase 1-8 を実装することで、本番環境にデプロイ可能な品質になります。

### フル実装
Phase 1-11 すべてを実装することで、テスト・ドキュメント完備の完全な機能になります。
