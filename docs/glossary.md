# ユビキタス言語定義（Glossary）

## ドメイン用語の定義

| 用語 | 定義 | 関連型 |
|------|------|--------|
| **Portfolio** | プロジェクト実績、スキル、経験を視覚的に紹介する成果物集 | `PortfolioItem`, `PortfolioCategory` |
| **Career Milestone** | キャリアにおける重要な節目や出来事を時系列で記録したもの | `CareerMilestone` |
| **Tech Stack** | 使用する技術・ツール・フレームワークの集合（Frontend, Backend, Database, CI/CD, Infrastructure, Testing） | `TechStackItem`, `TechStackCategory` |
| **CTA (Call To Action)** | ユーザーに行動を促すボタン・リンク（`live`, `repo`, `article`） | `PortfolioCta` |

---

## ビジネス用語の定義

| 用語 | 定義 |
|------|------|
| **Target User** | 採用担当者、技術責任者、協業パートナー、同業エンジニア |
| **KPI** | 初回ロード2秒以内、Lighthouse全項目90点以上、クリック率30%以上、言語切替率20%以上 |
| **Lighthouse Score** | Google提供のWebサイト品質評価（Performance, Accessibility, Best Practices, SEO） |

---

## UI/UX用語の定義

| 用語 | 定義 |
|------|------|
| **Section** | ページ内の論理的に分割された領域（Hero, About, Tech Stack, Portfolio, Career） |
| **Carousel** | 複数のコンテンツを横スクロールで切り替えるUIパターン（Embla Carousel使用） |
| **Dialog** | オーバーレイ表示される一時的なウィンドウ（shadcn/ui使用） |
| **Hamburger Menu** | モバイル用の折りたたみ式ナビゲーション（768px未満で表示） |
| **Smooth Scroll** | セクション間を滑らかにスクロールするアニメーション |
| **Responsive Design** | 画面サイズに応じたレイアウト最適化（Mobile < 768px, Tablet 768-1024px, Desktop ≥ 1024px） |
| **Framer Motion** | React向けアニメーションライブラリ（スクロール連動、フェードイン等） |

---

## 英語・日本語対応表

| 英語 | 日本語 |
|------|--------|
| Portfolio | ポートフォリオ |
| Career | キャリア |
| Tech Stack | 技術スタック |
| Milestone | マイルストーン |
| CTA (Call To Action) | 行動喚起 |
| Hero Section | ヒーローセクション |
| About Section | 自己紹介セクション |
| Frontend / Backend | フロントエンド / バックエンド |
| Infrastructure / Database | インフラストラクチャ / データベース |
| Responsive | レスポンシブ |
| Carousel / Dialog | カルーセル / ダイアログ |
| Navigation / Hamburger Menu | ナビゲーション / ハンバーガーメニュー |
| Timeline / Animation | タイムライン / アニメーション |
| i18n (Internationalization) | 国際化 |
| SEO / Accessibility | 検索エンジン最適化 / アクセシビリティ |
| Performance / Lighthouse | パフォーマンス / ライトハウス |
| Component / Hook | コンポーネント / フック |

---

## コード上の命名規則

### ファイル名規則

| 対象 | 形式 | 例 |
|------|------|-----|
| **コンポーネント** | `PascalCase` | `Header.tsx`, `PortfolioCard.tsx` |
| **ユーティリティ・定数** | `camelCase` | `utils.ts`, `data.ts`, `animations.ts` |
| **型定義** | `camelCase` | `types.ts`, `i18next.d.ts` |

### 変数・関数名規則

| 対象 | 形式 | 例 |
|------|------|-----|
| **変数** | `camelCase` | `portfolioItems`, `isOpen` |
| **定数（グローバル）** | `UPPER_SNAKE_CASE` | `DEFAULT_LANGUAGE`, `MAX_ITEMS` |
| **定数（ローカル）** | `camelCase` | `breakpointMd`, `animationDuration` |
| **関数** | `camelCase`（動詞始まり） | `scrollToSection`, `handleClick` |
| **コンポーネント** | `PascalCase` | `PortfolioCard`, `NavigationMenu` |
| **カスタムフック** | `camelCase`（`use`始まり） | `useRevealAnimation`, `useMobile` |

### 型定義の命名規則

| 対象 | 形式 | 例 |
|------|------|-----|
| **Type Alias** | `PascalCase` | `PortfolioCategory`, `SkillIconSlug` |
| **Interface** | `PascalCase` | `PortfolioItem`, `TechStackCategory` |
| **Props型** | `PascalCase` + `Props` | `PortfolioCardProps` |

### その他の命名規則

| 対象 | 形式 | 備考 |
|------|------|------|
| **CSSクラス** | `kebab-case` | Tailwind・カスタムクラス共通 |
| **ディレクトリ（features）** | `lowercase` | `features/home/sections/` |
| **ディレクトリ（components）** | `PascalCase` | `components/Common/Header/` |
| **i18nキー** | `camelCase` / `dot.notation` | `hero.greeting`, `portfolio.title` |

### ディレクトリ構造例

```
features/home/sections/Portfolio/
├── index.tsx                        # メインコンポーネント
├── components/PortfolioCard.tsx     # サブコンポーネント
├── constants/data.ts                # 定数・データ
├── hooks/useLocalizedPortfolioItem.ts  # カスタムフック
└── types.ts                         # 型定義
```
