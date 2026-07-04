# 設計 — バー/ウイスキーテーマ

## 実装アプローチ

**トークンファースト**で進める。shadcn/ui のセマンティックトークン構造（`--primary` / `--secondary` / `--brand` 等）は一切変えず、**値だけ**をテーマカラーに差し替える。コンポーネント側の変更は「トークン外にハードコードされた色の回収」と「見出しフォント・意匠の追加」に限定する。

テーマの対応関係：

| モード | 世界観                                                | 実現方法         |
| ------ | ----------------------------------------------------- | ---------------- |
| ライト | W2 ボトルラベル（生成り紙×オックスブラッド×ゴールド） | `:root` トークン |
| ダーク | W1 スピークイージー（漆黒×琥珀×真鍮）                 | `.dark` トークン |

## 1. カラートークン（`src/index.css`）

### ライト（W2 ラベル）

| トークン                               | 目標色                         | 役割                                   |
| -------------------------------------- | ------------------------------ | -------------------------------------- |
| `--background`                         | `#F3EBDB` 生成り紙             | ページ地                               |
| `--card` / `--popover`                 | `#FAF5E9`                      | カード面                               |
| `--foreground`                         | `#2E2214` エスプレッソ         | 本文                                   |
| `--primary`                            | `#7C2D1E` オックスブラッド     | 主ボタン・強調                         |
| `--brand`                              | `#A67C2E` アンティークゴールド | アクセント・ホバー                     |
| `--secondary` / `--muted` / `--accent` | `#EAE0C9` 濃いめの紙           | 面の階調                               |
| `--muted-foreground`                   | `#6E5F49`                      | 補助文字（AA確保のためモックより暗め） |
| `--border` / `--input`                 | エスプレッソの25%透過          | 罫線                                   |

### ダーク（W1 スピークイージー）

| トークン                               | 目標色                          | 役割                   |
| -------------------------------------- | ------------------------------- | ---------------------- |
| `--background`                         | `#17120E` 漆黒（暖色寄り）      | ページ地               |
| `--card` / `--popover`                 | `#221A13`                       | カード面               |
| `--foreground`                         | `#EFE6D8` クリーム              | 本文                   |
| `--primary`                            | `#D98E32` 琥珀                  | 主ボタン・強調・グロー |
| `--brand`                              | `#D98E32` 琥珀（primaryと同系） | アクセント・ホバー     |
| `--secondary` / `--muted` / `--accent` | `#2C2216` 暖ブラウン            | 面の階調               |
| `--muted-foreground`                   | `#A08F79`                       | 補助文字               |
| `--border` / `--input`                 | 真鍮 `#B8863B` の25〜35%透過    | 罫線                   |

補足：

- 実装時は現行と同じ **oklch 表記**に変換して定義する（上表は目標のsRGB近似値）
- 追加トークン：`--brass`（真鍮。罫線・ディバイダー用。light=`#A67C2E` / dark=`#B8863B`）を `@theme inline` に `--color-brass` として登録
- `:root` に `color-scheme: light`、`.dark` に `color-scheme: dark` を指定（ネイティブUI・スクロールバー対応）
- コントラストは実装時に WCAG AA（本文4.5:1）を検証し、必要なら明度を微調整する

## 2. テーマ切替機能

### 構成

```
index.html            … <head> 内に FOUC 防止のインラインスクリプト
src/hooks/useTheme.ts … テーマ状態管理フック（新規）
src/components/Common/ThemeToggle.tsx … トグルボタン（新規）
src/components/Common/Header.tsx      … トグル設置（デスクトップ）
src/components/ui/Navigation/MobileHamburgerMenu.tsx … トグル設置（モバイル）
```

### 動作仕様

- 初期値：`localStorage.theme`（`'light' | 'dark'`）があればそれ、なければ `prefers-color-scheme` に追従
- 手動切替で `localStorage.theme` に保存。保存後はOS設定より優先
- 保存がない間は `matchMedia('(prefers-color-scheme: dark)')` の `change` を監視して追従
- 適用は `document.documentElement.classList.toggle('dark')`（既存の `@custom-variant dark` と一致）
- FOUC 防止：`index.html` の `<head>` で CSS 読込前に同ロジックのインラインスクリプトを実行

### ThemeToggle UI

- lucide-react の `Sun` / `Moon` アイコンボタン
- `aria-label` は i18n キー（`navigation.theme.toLight` / `toDark`）で提供

## 3. ハードコード色の回収（対象ファイル一覧）

| ファイル                             | 現状                                                    | 変更                                                                                                                     |
| ------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `Hero/components/HeroBackground.tsx` | 青系 `rgba(59,130,246)` / `rgba(14,165,233)` のラジアル | ペンダントライト風の琥珀グロー（上部中央のラジアル）＋ `bg-primary/*` のブロブ。トークン参照（`--primary` の透過）で表現 |
| `Career/Career.tsx:21`               | `from-sky-100 via-blue-50 to-sky-50`                    | `from-secondary via-background to-secondary/50` 等のトークン参照へ                                                       |
| `TechStack/TechStack.tsx:22`         | 同上                                                    | 同上                                                                                                                     |
| `About/About.tsx:20-21`              | slate系 `rgba(15,23,42,...)` ラジアル                   | トークン参照の暖色グローへ                                                                                               |
| `Common/Header.tsx:35,46`            | `bg-white`                                              | `bg-background/95 backdrop-blur` ＋ `border-b border-border/60`                                                          |
| `Common/Footer.tsx:32,99`            | 白系・青系の残り                                        | トークン参照へ                                                                                                           |
| `Career/parts/CareerCard.tsx:32`     | 色クラス残り                                            | トークン参照へ                                                                                                           |
| `ui/Button/buttonVariants.ts:10`     | `text-white` 等                                         | `text-primary-foreground` 等セマンティックへ                                                                             |
| `ui/dialog.tsx` / `ui/carousel.tsx`  | オーバーレイ上の `text-white` 等                        | 個別に判断（黒オーバーレイ上の白は維持で可）                                                                             |

## 4. フォント

- **英字見出し**：Cormorant Garamond（`@fontsource/cormorant-garamond`、weight 500/600/700）
- **和文見出し**：しっぽり明朝（`@fontsource/shippori-mincho`、weight 500/700。unicode-range によるサブセット分割で配信されるため日本語でも実用サイズ）
- 本文は現行のシステムサンセリフを維持（可読性・パフォーマンス優先）
- `index.css` の `@theme` に `--font-display: 'Cormorant Garamond', 'Shippori Mincho', serif;` を追加 → `font-display` ユーティリティとして使用
- 適用箇所：Hero の式・サブタイトル、各セクションの `h2` 見出し、Header/Footer のワードマーク

## 5. テーマ固有のディテール

- **SectionDivider コンポーネント（新規）**：`◆` を中央に置いた真鍮色の罫線。Hero サブタイトル下と各セクション見出し下に配置
- **アイブロウの意匠**：既存のアイブロウ（`tracking-[0.35em]` の大文字）を `text-brass` に。Hero に `hero.eyebrow`（例：`Bar Taira — Est. 2019`）を i18n キーとして追加
- **カード枠**：`border` ＋ 内側 `ring-1 ring-border/40 ring-inset` で「ラベルの二重罫」を示唆（ライト）／真鍮の枠（ダーク）を同一実装で表現
- グローは静的表現を基本とし、既存の framer-motion アニメーションの強度は変えない

## データ構造の変更

- なし（UIのみ）。`localStorage` キー `theme` を新規使用
- i18n：`navigation.theme.*`・`hero.eyebrow` を en / ja 両方に追加

## 影響範囲の分析

- **見た目**：全セクション。ロジック変更は Header（トグル追加）と新規 useTheme のみ
- **skill-icons**：`*-dark.svg` はライト地用のブランドカラー版。ダークモード（漆黒地）での視認性を実装後に目視確認し、問題があれば該当アイコンのみ差し替え
- **テスト**：`useTheme` のユニットテストを新規追加。既存テストはスタイル非依存のため影響は軽微の見込み
- **OGP画像**（`ogp.png`）：旧配色のまま。差し替えは本作業のスコープ外（別途）
- **永続ドキュメント**：`docs/architecture.md`（フォント・テーマ切替の技術要素）と `docs/functional-design.md`（デザインシステムの配色）に追記が必要

## 変更履歴

### 2026-07-03 フィードバック対応

- **デフォルトテーマをライト固定に変更**：当初は `prefers-color-scheme` 追従としていたが、レビューで「デフォルトは明るい方にしてほしい」との指摘を受け、保存値がない場合は常にライトで表示する仕様に変更（`useTheme` から OS 追従を削除、`index.html` の FOUC スクリプトも同期）
- **SNS ロゴのダークモード対応**：GitHub / X の黒いロゴ画像がダーク地で視認不能だったため、Footer・SNS ドロップダウン・モバイルメニューの `<img>` に `dark:brightness-0 dark:invert` を追加し、ダークでは白単色アイコンとして表示

### 2026-07-04 技術スタックの「バーメニュー」化

- **レイアウト刷新**：カード一覧 → バーのドリンクメニュー風（統一メニューカード＋2カラム、モバイル1カラム）。カテゴリ名＝メニュー見出し（点線罫＋件数）、各行＝`アイコン｜技術名 ……… 役割ラベル`（メニューの価格位置に役割）。
- **アイコン方針＝モノクロ真鍮（案D）**：フルカラーのネイビー角丸ロゴは暖色メニューで浮くため廃止。単色（`fill=currentColor`→`text-brass`）のブランドロゴに統一。`glyphs.ts`（simple-icons / CC0 由来のパス）＋`BrandGlyph`。AWS は simple-icons 非配布のため lucide `Cloud` で代替。Devcontainer/MSW/RSpec/SimpleCov は従来どおり lucide。
- **インタラクション**：スクロールで各カテゴリの項目が順にフェードイン（framer-motion `whileInView` + stagger、`once`）。「スクロールすると開く」を実現。
- **撤去**：`TechStackCard.tsx`、`skillIcons` マップと `badgeClassName`/カテゴリ別 lucide アイコン。旧フルカラー SVG（`assets/skill-icons/*`）は未使用（import されないためバンドル対象外）。

### 2026-07-04 About セクションの「オーナー紹介」化

- **写真**：真鍮の二重リング（border＋outline offset）でコースター/ラベル風に。下に銘板風キャプション「TAIRA — Owner · Engineer」。
- **プロフィール欄**：段落の下にテイスティングノート風のデータ行（点線リーダー、メニューと共通の意匠）を追加 — 拠点／ブレンド／熟成（Since 2019）／シグネチャー（Juku Cloud）。i18n 対応（`about.profile`）。
- **アイブロウ**：`about.eyebrow` を日英とも「About the Owner」に統一（他セクションの英字アイブロウと整合、Hero の「Bar Taira — Est. 2019」と呼応）。

### 2026-07-04 微調整

- Hero のアイブロウ「Bar Taira — Est. 2019」を削除（ヒーローは名前と肩書きに集中させる）。`hero.eyebrow` キーも日英から削除。
- About プロフィール欄のラベルを平易な言葉に変更（ブレンド→経歴、シグネチャー→代表作、熟成 Since 2019 は情報重複のため行ごと削除）。

### 2026-07-04 Portfolio セクションのラベル化

- **カード**：ボトルラベル風に（内側二重罫 outline、`font-display` セリフ見出し、カテゴリを真鍮スモールキャップスのテキストに、メタ行「年 ……… 役割」を点線リーダーに、スクリーンショットを真鍮枠＋イタリック注記で額装）。
- **ダイアログ**：同意匠（二重罫・セリフ見出し・真鍮セクション見出し・◆ブレット・真鍮アウトラインの技術チップ）。
- **カルーセル矢印**：真鍮ボーダー/アイコン色に統一。
- 文言・情報は一切変更なし（比喩語を使わず意匠のみでバーらしさを表現する方針）。
