# リポジトリ構造定義書

## フォルダ構成

```
portfolio/
├── .github/              # GitHub Actions、Issue/PRテンプレート
├── docs/                 # プロジェクトドキュメント
├── public/               # 静的ファイル（ビルド時コピー）
│   └── locales/         # i18n翻訳ファイル（ja/en）
├── src/
│   ├── assets/          # 画像・アイコン（セクション別: career, portfolio, etc.）
│   ├── components/      # 共通コンポーネント
│   │   ├── ui/         # UIコンポーネント（Button, Navigation等）
│   │   └── Common/     # 汎用コンポーネント
│   ├── features/        # 機能別コンポーネント
│   │   └── home/sections/  # Hero, About, Career, TechStack, Portfolio
│   ├── hooks/           # カスタムReactフック
│   ├── lib/             # ユーティリティ関数
│   ├── Router/          # ルーティング設定
│   ├── types/           # TypeScript型定義
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## ディレクトリの役割

| ディレクトリ | 役割 |
|------------|------|
| `src/assets/` | 画像・アイコン（セクション別に分類、ハイフン区切り命名） |
| `src/components/ui/` | 再利用可能なUIコンポーネント（ビジネスロジックなし） |
| `src/components/Common/` | 複数機能で共有されるコンポーネント |
| `src/features/` | 機能別コンポーネント（Feature-Sliced Design） |
| `src/hooks/` | グローバルなカスタムフック（`useXxx.ts`形式） |
| `src/lib/` | Reactに依存しない純粋関数 |
| `src/types/` | グローバルな型定義（`*.types.ts`） |
| `public/` | ビルド時にコピーされる静的ファイル |

### features/ の構造

```
features/home/sections/
├── Hero/
│   ├── index.tsx
│   └── components/      # セクション固有のサブコンポーネント
├── Career/
│   ├── index.tsx
│   ├── constants/       # セクション固有の定数
│   └── parts/          # セクション内の部品コンポーネント
└── Portfolio/
    ├── index.tsx
    ├── hooks/          # セクション固有のフック
    └── parts/
```

## ファイル配置ルール

### コンポーネント
- **全体で再利用** → `src/components/ui/`（Button, Card等）
- **特定機能のみ** → `src/features/[feature]/`（HeroSection等）

### カスタムフック
- **全体で再利用** → `src/hooks/`（useMediaQuery等）
- **特定機能のみ** → `src/features/[feature]/hooks/`

### 型定義
- **全体で共有** → `src/types/`（User, Theme等）
- **特定機能のみ** → `src/features/[feature]/types/`

### 静的アセット
- **importして使用** → `src/assets/`（最適化される）
- **パス固定** → `public/`（favicon, locales等）

## 命名規則

| 対象 | 規則 | 例 |
|------|------|-----|
| コンポーネント | PascalCase | `Button.tsx`, `HeroSection.tsx` |
| フック・関数 | camelCase | `useLocalStorage.ts`, `formatDate.ts` |
| 型定義 | PascalCase | `*.types.ts`, `UserType` |
| ディレクトリ | camelCase（複数形） | `components`, `hooks`, `assets` |
| 定数 | UPPER_SNAKE_CASE | `API_BASE_URL` |

## 設計原則

1. **単一責任**: 1コンポーネント1責務
2. **DRY**: 重複コードは共通化（過度な抽象化は避ける）
3. **関心の分離**: UI/ロジック分離、データ取得はフックへ
4. **コロケーション**: 関連ファイルは同じディレクトリに配置
