# 実装戦略: Qiita最新記事プレビュー機能

## 戦略概要
このドキュメントでは、Qiita最新記事プレビュー機能を効率的に実装するための戦略を定義します。

**採用戦略**: 戦略A - フェーズごとにサブエージェント起動（推奨）

---

## 戦略A: フェーズごとにサブエージェント起動（推奨）

### 実装フロー

```
Phase 1 → メインエージェント: 環境セットアップ
  ├─ Tanstack Query インストール
  ├─ QueryClient セットアップ
  └─ main.tsx 更新

Phase 2-3 → Agent 1: 基盤ファイル作成
  ├─ ディレクトリ・ファイル構造作成
  ├─ 型定義（types.ts）
  ├─ 定数定義（constants.ts）
  ├─ 要約抽出関数（utils/extractSummary.ts）
  ├─ API関数（queries/qiita.ts）
  └─ カスタムフック（hooks/useQiitaArticles.ts）

Phase 4 → Agent 2: UIコンポーネント実装
  ├─ BlogCard.tsx
  ├─ BlogCardList.tsx
  ├─ BlogSectionHeader.tsx
  ├─ Blog.tsx（メインコンポーネント）
  └─ index.ts（エクスポート）

Phase 5 → Agent 3: i18n対応
  ├─ 日本語翻訳ファイル更新
  ├─ 英語翻訳ファイル更新
  └─ ナビゲーションリンク追加

Phase 6 → メインエージェント: Home.tsx への統合
  └─ Blog コンポーネントを Home.tsx に追加

Phase 7-8 → メインエージェント: 動作確認・最適化
  ├─ 開発環境での動作確認
  ├─ レスポンシブ対応確認
  ├─ アニメーション確認
  ├─ 多言語切り替え確認
  ├─ アクセシビリティ確認
  ├─ 環境変数化
  ├─ コードレビュー・リファクタリング
  └─ ビルド確認
```

---

## 各フェーズの詳細

### Phase 1: 環境セットアップ（メインエージェント）

**担当**: メインエージェント

**理由**: 環境セットアップは全体に影響するため、メインエージェントが直接実行

**タスク**:
1. `npm install @tanstack/react-query`
2. `npm install -D @tanstack/react-query-devtools`
3. `src/lib/queryClient.ts` 作成
4. `src/main.tsx` 更新（QueryClientProvider追加）

**成果物**:
- package.json（依存関係追加）
- src/lib/queryClient.ts
- src/main.tsx（更新）

**所要時間**: 約10-15分

---

### Phase 2-3: 基盤ファイル作成（Agent 1）

**担当**: サブエージェント 1（general-purpose）

**理由**:
- データ層とユーティリティ層は独立して実装可能
- UI層の依存関係となるため、先に完成させる必要がある

**タスク**:
1. ディレクトリ構造作成
2. types.ts - 型定義
3. constants.ts - 定数定義
4. utils/extractSummary.ts - 要約抽出関数
5. queries/qiita.ts - API関数 + useQuery
6. hooks/useQiitaArticles.ts - カスタムフック

**成果物**:
- 完全なディレクトリ構造
- types.ts
- constants.ts
- utils/extractSummary.ts
- queries/qiita.ts
- hooks/useQiitaArticles.ts

**所要時間**: 約30-45分

**エージェント起動コマンド**:
```
Task tool with subagent_type='general-purpose'
prompt: "Phase 2-3の実装: 基盤ファイルを作成してください。
- requirements.md と design.md を参照
- tasklist.md の Phase 2-3 を実装
- ディレクトリ構造、型定義、定数、ユーティリティ、API層、フックを実装"
```

---

### Phase 4: UIコンポーネント実装（Agent 2）

**担当**: サブエージェント 2（general-purpose）

**理由**:
- UI層は基盤ファイル（types, hooks等）に依存
- 既存のPortfolio/Careerセクションのパターンを参考にする必要がある

**前提条件**: Phase 2-3が完了していること

**タスク**:
1. parts/BlogCard.tsx - 単一記事カード
2. parts/BlogCardList.tsx - カードリスト + ローディング/エラー表示
3. parts/BlogSectionHeader.tsx - セクションヘッダー
4. Blog.tsx - メインコンポーネント
5. index.ts - エクスポート

**成果物**:
- parts/BlogCard.tsx
- parts/BlogCardList.tsx
- parts/BlogSectionHeader.tsx
- Blog.tsx
- index.ts

**所要時間**: 約45-60分

**エージェント起動コマンド**:
```
Task tool with subagent_type='general-purpose'
prompt: "Phase 4の実装: UIコンポーネントを作成してください。
- requirements.md と design.md を参照
- tasklist.md の Phase 4 を実装
- 既存の Portfolio/Career セクションのスタイルを参考にする
- framer-motion、shadcn/ui コンポーネント、i18n を活用"
```

---

### Phase 5: i18n対応（Agent 3）

**担当**: サブエージェント 3（general-purpose）

**理由**:
- 翻訳ファイルとナビゲーションの更新は独立したタスク
- UIコンポーネントが完成していれば並行して実装可能

**前提条件**: Phase 4が完了していること（翻訳キーの確認のため）

**タスク**:
1. public/locales/ja/translation.json - 日本語翻訳追加
2. public/locales/en/translation.json - 英語翻訳追加
3. src/components/ui/Navigation/navigationLinks.ts - ナビゲーションリンク追加

**成果物**:
- public/locales/ja/translation.json（更新）
- public/locales/en/translation.json（更新）
- src/components/ui/Navigation/navigationLinks.ts（更新）

**所要時間**: 約15-20分

**エージェント起動コマンド**:
```
Task tool with subagent_type='general-purpose'
prompt: "Phase 5の実装: i18n対応を完了してください。
- requirements.md と design.md を参照
- tasklist.md の Phase 5 を実装
- 日本語/英語の翻訳ファイル更新
- ナビゲーションリンク追加（Portfolio と Career の間）"
```

---

### Phase 6: Home.tsx への統合（メインエージェント）

**担当**: メインエージェント

**理由**: シンプルなタスクなので、メインエージェントが直接実行

**前提条件**: Phase 4-5が完了していること

**タスク**:
1. src/features/home/Home.tsx を開く
2. Blog コンポーネントをインポート
3. Portfolio と Career の間に配置

**成果物**:
- src/features/home/Home.tsx（更新）

**所要時間**: 約5分

---

### Phase 7-8: 動作確認・最適化（メインエージェント）

**担当**: メインエージェント

**理由**:
- 動作確認はインタラクティブな作業
- ユーザーのフィードバックを受けながら調整

**前提条件**: Phase 6が完了していること

**タスク**:
1. 開発サーバー起動（`npm run dev`）
2. ブラウザでの動作確認
   - API取得確認
   - レスポンシブ確認
   - アニメーション確認
   - 多言語切り替え確認
   - アクセシビリティ確認
3. 環境変数化（.env, .env.example）
4. コードレビュー（ESLint, Prettier）
5. ビルド確認（`npm run build`, `npm run preview`）

**成果物**:
- 動作確認済みのBlogセクション
- .env, .env.example
- クリーンなコード

**所要時間**: 約30-45分

---

## 並列実装の可能性

### Phase 4 と Phase 5 の並列実行（オプション）

Phase 4（UIコンポーネント）と Phase 5（i18n）は、**Phase 2-3が完了していれば並列実行可能**です。

**並列実行する場合**:
```
Phase 2-3完了後:
  ├─ Agent 2: Phase 4（UIコンポーネント）
  └─ Agent 3: Phase 5（i18n）← 並列実行
```

**メリット**:
- 実装時間の短縮（約15-20分削減）

**デメリット**:
- UIコンポーネントで使用する翻訳キーが確定していない場合、後で調整が必要

**推奨**: Phase 4完了後に Phase 5 を実行（安全性優先）

---

## エラー発生時のリカバリー戦略

### Agent実行中にエラーが発生した場合

1. **エラーの種類を特定**
   - 依存関係の問題（Phase 1の不備）
   - 型定義の問題（Phase 2-3の不備）
   - 既存コードとの統合問題

2. **リカバリー方法**
   - メインエージェントが該当ファイルを直接修正
   - または、Agentを再起動（resume機能を使用）

3. **予防策**
   - 各Phaseの成果物を確認してから次のPhaseへ進む
   - requirements.md と design.md を常に参照

---

## タスク進捗管理

### TodoWrite の活用

各Phaseの開始時・完了時に TodoWrite を使用して進捗を管理します。

**例**:
```
Phase 1開始時:
- [ ] Phase 1: 環境セットアップ
  - [in_progress] Tanstack Query インストール

Phase 1完了時:
- [completed] Phase 1: 環境セットアップ
- [pending] Phase 2-3: 基盤ファイル作成
```

---

## 最終チェックリスト

Phase 1-8完了後、以下を確認:

- [ ] Blogセクションが正しく表示される
- [ ] 最新3件の記事が取得できる
- [ ] レスポンシブ対応（モバイル/タブレット/デスクトップ）
- [ ] アニメーションが動作する
- [ ] 多言語切り替えが機能する
- [ ] アクセシビリティ要件を満たす
- [ ] ビルドエラーがない
- [ ] 環境変数が設定されている

---

## オプション: Phase 9-11（テスト・デプロイ）

Phase 9-11はオプションです。必要に応じて以下の順序で実装:

1. **Phase 9**: テスト実装（Agent 4）
2. **Phase 10**: ドキュメント更新（メインエージェント）
3. **Phase 11**: デプロイ・公開（メインエージェント）

---

## 参考ドキュメント

- [requirements.md](./requirements.md): 要件定義
- [design.md](./design.md): 技術設計
- [tasklist.md](./tasklist.md): 詳細タスクリスト

---

## 変更履歴

- 2025-12-28: 初版作成（戦略A採用）
