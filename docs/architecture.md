# アーキテクチャドキュメント

## テクノロジースタック

### フロントエンド
- **ビルドツール**: Vite 7.x
- **フレームワーク**: React 19.1
- **言語**: TypeScript 5.8
- **ルーティング**: React Router DOM 7.x
- **スタイリング**: Tailwind CSS 4.x
- **UIコンポーネント**: shadcn/ui
- **アニメーション**: Framer Motion 12.x
- **カルーセル**: Embla Carousel React 8.x
- **状態管理**: React Hooks
- **国際化**: i18next + react-i18next
  - i18next-browser-languagedetector
  - i18next-http-backend
- **アイコン**: Lucide React
- **ユーティリティ**:
  - clsx (条件付きクラス名)
  - tailwind-merge (Tailwindクラス結合)
  - class-variance-authority (バリアントスタイル管理)

### インフラストラクチャ
- **ホスティング**: GitHub Pages
- **ベースパス**: /portfolio/
- **バージョン管理**: Git / GitHub
- **CI/CD**: GitHub Actions
  - 自動デプロイ (mainブランチへのpush時)
  - peaceiris/actions-gh-pages@v3使用

### 開発ツール
- **パッケージマネージャー**: npm
- **リンター**: ESLint 9.x
  - eslint-plugin-react-hooks
  - eslint-plugin-react-refresh
  - typescript-eslint
- **フォーマッター**: Prettier 3.x
- **型チェック**: TypeScript Compiler
- **React最適化**: SWC Plugin (@vitejs/plugin-react-swc)

## 開発ツールと手法

### 開発環境
- **Node.js**: v18.x以上推奨（GitHub Actions: v20）
- **パッケージマネージャー**: npm

### 開発コマンド
```bash
# 開発サーバー起動（ホスト公開）
npm run dev

# ビルド（型チェック + Viteビルド）
npm run build

# プレビュー（ビルド結果の確認）
npm run preview

# リント実行
npm run lint

# リント自動修正
npm run lint:fix

# フォーマット実行
npm run format

# フォーマットチェック
npm run format:check

# CI（リント + フォーマットチェック）
npm run ci
```

### コード品質
- **静的解析**: ESLint 9.x + TypeScript ESLint
- **コードフォーマット**: Prettier
- **型安全性**: TypeScript strict mode
- **React**: ESLint React Hooks Plugin

### 開発ワークフロー
1. 機能ブランチでの開発
2. npm run ci でリント・フォーマットチェック
3. mainブランチへpush
4. GitHub Actionsによる自動ビルド・デプロイ
5. GitHub Pagesでの公開確認 (https://[username].github.io/portfolio/)

## 技術的制約と要件

### ブラウザサポート
- **モダンブラウザ**: Chrome, Firefox, Safari, Edge (最新2バージョン)
- **モバイルブラウザ**: iOS Safari, Chrome Mobile
- **非サポート**: IE11以下

### セキュリティ要件
- **HTTPS**: GitHub Pagesによる自動HTTPS化
- **XSS対策**: React標準のエスケープ処理
- **環境変数**: Vite環境変数（VITE_BASE_URL: /portfolio/）

### アクセシビリティ
- **WCAG 2.1**: レベルAA準拠を目標
- **セマンティックHTML**: 適切なHTML要素の使用
- **キーボード操作**: 全機能のキーボードアクセス
- **スクリーンリーダー**: Radix UIのアクセシビリティ機能を活用
- **ARIAラベル**: 必要に応じて適切に設定

### SEO要件
- **メタタグ**: index.htmlに適切なtitle, description設定
- **言語設定**: i18nextによる多言語対応（日本語・英語）

### レスポンシブ対応
- **ブレークポイント**: Tailwind CSS デフォルト
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px
- **設計原則**: モバイルファースト

## パフォーマンス要件

### Core Web Vitals目標値
- **LCP (Largest Contentful Paint)**: < 2.5秒
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 追加パフォーマンス指標
- **FCP (First Contentful Paint)**: < 1.8秒
- **TTI (Time to Interactive)**: < 3.8秒
- **Speed Index**: < 3.4秒

### 最適化戦略

#### 画像最適化
- 最適なフォーマット（WebP、AVIF）の使用
- 適切なサイズとリサイズ
- 遅延読み込み（loading="lazy"）
- 画像圧縮ツールの活用

#### コード分割
- React.lazyとSuspenseの活用
- React Router DOM のルートベースコード分割
- 動的インポート（dynamic import）の活用
- コンポーネントレベルの遅延読み込み

#### Vite最適化
- **SWC**: 高速なTypeScript/JSXコンパイル
- **Tree Shaking**: 未使用コードの自動削除
- **Code Splitting**: チャンク分割による最適化
- **Asset Inlining**: 小さいアセットのインライン化

#### キャッシュ戦略
- 静的アセットの長期キャッシュ
- GitHub Pagesのキャッシュ活用
- ハッシュ付きファイル名による効率的な更新

#### バンドルサイズ
- **初回JSバンドル**: < 200KB (gzip圧縮後) 目標
- **CSSバンドル**: < 50KB (gzip圧縮後) 目標
- Vite Build Analyzerでサイズ監視
- 不要な依存関係の削除

### モニタリング
- **Lighthouse**: 定期的なパフォーマンステスト
- **Browser DevTools**: パフォーマンスプロファイリング

### パフォーマンステスト
- 開発中のLighthouse定期実行
- npm run buildでビルドサイズ確認
- npm run previewで本番環境相当の動作確認
- モバイル環境（実機またはDevTools）でのテスト必須
- Network throttlingでの低速回線テスト
