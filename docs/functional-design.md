# Functional Design Document

## 目次

1. [機能ごとのアーキテクチャ](#機能ごとのアーキテクチャ)
2. [システム構成図](#システム構成図)
3. [データモデル定義](#データモデル定義)
4. [コンポーネント設計](#コンポーネント設計)
5. [ユースケース図、画面遷移図、ワイヤフレーム](#ユースケース図画面遷移図ワイヤフレーム)

---

## 機能ごとのアーキテクチャ

### アーキテクチャ概要

本アプリケーションは、ReactベースのSPA（Single Page Application）であり、Feature-based構造で各セクションを独立管理しています。

```
┌─────────────────────────────────────────┐
│     Presentation Layer                   │
│  - React Components + Framer Motion      │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│     Business Logic Layer                 │
│  - Custom Hooks + Utilities              │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│     Data Layer                           │
│  - Static Data + i18n JSON               │
└─────────────────────────────────────────┘
```

### 技術スタック

| 技術 | バージョン | 用途 |
|-----|-----------|------|
| **React** | 19.1.0 | UIライブラリ |
| **TypeScript** | 5.8.3 | 型安全性 |
| **Vite** | 7.0.4 | ビルドツール |
| **Tailwind CSS** | 4.1.11 | スタイリング |
| **Framer Motion** | 12.23.24 | アニメーション |
| **i18next** | 25.3.2 | 国際化 |
| **React Router** | 7.7.1 | ルーティング |
| **shadcn/ui** | - | UIコンポーネント |

### ディレクトリ構成

```
src/
├── features/home/sections/    # セクション別コンポーネント
│   ├── Hero/                  # ヒーロー
│   ├── About/                 # 自己紹介
│   ├── TechStack/             # 技術スタック
│   ├── Portfolio/             # ポートフォリオ
│   └── Career/                # キャリア
├── components/
│   ├── Common/                # Header、Footer
│   └── ui/                    # 再利用可能なUI
├── hooks/                     # カスタムフック
├── lib/                       # ユーティリティ
└── types/                     # 型定義
```

### 主要機能

1. **ナビゲーション**: スクロール連動ヘッダー、スムーズスクロール
2. **国際化**: 日本語/英語切り替え、localStorage保存
3. **ポートフォリオ**: カルーセル表示、モーダル詳細
4. **アニメーション**: スクロール連動、Intersection Observer
5. **レスポンシブ**: モバイルファースト、768px/1024pxブレークポイント

---

## システム構成図

### 全体構成

```
┌──────────────────────────────────────────┐
│            Browser                        │
│  ┌────────────────────────────────────┐  │
│  │   React SPA                        │  │
│  │   ├─ Router (React Router)         │  │
│  │   ├─ i18next (国際化)              │  │
│  │   └─ Framer Motion (アニメ)        │  │
│  └────────────────────────────────────┘  │
│  localStorage │ Browser Language          │
└──────────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────────┐
│   Static File Server (GitHub Pages)      │
│   - index.html                            │
│   - /assets/ (JS, CSS)                    │
│   - /locales/ (翻訳JSON)                  │
└──────────────────────────────────────────┘
```

### データフロー

```
User Interaction
  ↓
React Router → Home Component
  ↓
├─ Header → Navigation → scrollToSection()
├─ Hero → Framer Motion → Animation
├─ About → i18next → Translation
├─ TechStack → Static Data → Render
├─ Portfolio → useLocalizedPortfolioItem → Dialog
└─ Career → Static Data → Timeline

localStorage ← i18next → LanguageToggle
```
---

## コンポーネント設計

### コンポーネント階層

```
App → Router → Home
                ├─ Header
                │   ├─ NavigationMenuHeader (Desktop)
                │   └─ MobileHamburgerMenu (Mobile)
                ├─ Hero
                ├─ About
                ├─ TechStack
                ├─ Portfolio
                │   └─ PortfolioCarousel
                │       └─ PortfolioCard
                │           └─ PortfolioCardDialog
                ├─ Career
                │   └─ CareerCard
                └─ Footer
```

### 主要コンポーネント

| コンポーネント | 責務 | State | 副作用 |
|---------------|------|-------|--------|
| **Header** | ナビゲーション | `showHeader` | スクロール監視 |
| **PortfolioCard** | カード表示 | `isOpen` | ダイアログ制御 |
| **LanguageToggle** | 言語切替 | - | i18n変更 |

### 状態管理

| 状態 | 管理方法 | スコープ | 永続化 |
|------|---------|---------|-------|
| 言語設定 | i18next Context | グローバル | localStorage |
| ヘッダー表示 | useState | ローカル | なし |
| ダイアログ | useState | ローカル | なし |

### 通信パターン

1. **Props**: `Home → Portfolio → PortfolioCard`
2. **Context**: `i18next → 全コンポーネント`
3. **Custom Hooks**: `useRevealAnimation → 各セクション`

---

## ユースケース図、画面遷移図、ワイヤフレーム

### ユースケース

```
訪問者
├─ UC1: サイトを閲覧
│   - ページ読み込み、セクション間移動
├─ UC2: 言語切り替え
│   - 日本語 ⇔ 英語、localStorage保存
├─ UC3: ポートフォリオ閲覧
│   - カルーセル操作、詳細モーダル表示
├─ UC4: 技術スタック確認
│   - カテゴリ別表示
├─ UC5: キャリア確認
│   - タイムライン表示
└─ UC6: SNSリンクアクセス
    - 外部サイトへ遷移
```

### 画面遷移

```
/ → /portfolio/ (Home)
         ├─ /about-me
         ├─ /tech-stack
         ├─ /projects
         ├─ /career
         └─ /top

各ルート → 同じHomeコンポーネント
         → スムーズスクロールで対象セクションへ

Portfolio Card Click → Dialog Open
                    → CTA Click → 外部リンク
                    → Close → Portfolio Section
```

### ワイヤフレーム

#### デスクトップビュー

##### Hero Section
```
┌─────────────────────────────────────────┐
│ [Header: Logo | Menu | Language]        │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│        [Animated Background]            │
│                                         │
│  こんにちは、フルスタックエンジニアの  │
│              〇〇です                   │
│                                         │
│  [Keyword] [Keyword] [Keyword]          │
│                                         │
│         [Scroll Down ↓]                 │
└─────────────────────────────────────────┘
```

##### Portfolio Section
```
┌─────────────────────────────────────────┐
│       ポートフォリオ一覧                │
│  ← [Card1] [Card2] [Card3] →           │
│          • • ○ • •                     │
└─────────────────────────────────────────┘

【ダイアログ】
┌─────────────────────────────────────────┐
│ [×]                                     │
│ [Image] Project Title [Category]        │
│                                         │
│ Timeline: 2025 | Role: Full-stack       │
│ Technologies: [React] [Rails] [AWS]     │
│                                         │
│ Highlights:                             │
│ • Highlight 1                           │
│ • Highlight 2                           │
│ • Highlight 3                           │
│                                         │
│ [Live Demo →] [View Repo →]            │
└─────────────────────────────────────────┘
```

#### モバイルビュー

```
┌────────────────────┐
│ [☰]        [EN/日] │
└────────────────────┘
┌────────────────────┐
│  Animated BG       │
│  こんにちは、      │
│  フルスタック      │
│  エンジニアの      │
│  〇〇です          │
│  [Keyword]         │
│  [Keyword]         │
│  [Scroll Down ↓]   │
└────────────────────┘
```

#### レスポンシブ対応

| ブレークポイント | 幅 | 主な変更点 |
|-----------------|-------|-----------|
| **Mobile** | < 768px | ハンバーガーメニュー、1カラム、カルーセル1枚 |
| **Tablet** | 768px - 1024px | デスクトップメニュー、2カラム、カルーセル2枚 |
| **Desktop** | ≥ 1024px | フルナビ、マルチカラム、カルーセル3枚 |
