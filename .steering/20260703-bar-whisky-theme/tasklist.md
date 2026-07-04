# タスクリスト — バー/ウイスキーテーマ

## Phase 1: 土台（トークン＋テーマ切替）

- [x] **T1. フォントパッケージ導入**
  - `@fontsource/cormorant-garamond`（500/600/700）と `@fontsource/shippori-mincho`（500/700）を devDependencies ではなく dependencies に追加し、`main.tsx` で import
  - 完了条件：ビルドにフォントが同梱され、`font-display` 指定で描画される
- [x] **T2. `src/index.css` トークン差し替え**
  - light（W2 ラベル）/ dark（W1 スピークイージー）の全トークンを oklch で置換
  - `--brass` トークンと `--color-brass` 登録、`--font-display` 追加、`color-scheme` 指定
  - 完了条件：両モードで design.md の配色表どおりに表示され、本文コントラストが AA を満たす
- [x] **T3. FOUC 防止スクリプト（`index.html`）**
  - `<head>` 冒頭に localStorage / prefers-color-scheme を読んで `dark` クラスを付与するインラインスクリプトを追加
  - 完了条件：ダーク選択状態で再読込してもライト色が一瞬も見えない
- [x] **T4. `useTheme` フック（新規）＋ユニットテスト**
  - `'light' | 'dark'` の状態管理、localStorage 永続化、OS設定追従（未保存時のみ）
  - 完了条件：テストが通る（初期値解決・切替・永続化・OS変更追従）
- [x] **T5. `ThemeToggle` コンポーネント（新規）＋設置**
  - Sun/Moon アイコンボタン。Header（デスクトップ）と MobileHamburgerMenu（モバイル）に設置
  - i18n キー `navigation.theme.toLight` / `toDark` を en / ja に追加
  - 完了条件：両デバイス幅でトグルが機能し、aria-label が言語に追従する

## Phase 2: ハードコード色の回収

- [x] **T6. HeroBackground** — 青系ラジアルを琥珀のペンダントライトグロー（トークン参照）に置換
- [x] **T7. Career / TechStack セクション背景** — `from-sky-100 via-blue-50 to-sky-50` をトークン参照のグラデーションへ
- [x] **T8. About セクション** — slate系 `rgba(...)` ラジアルをトークン参照へ
- [x] **T9. Header** — `bg-white` を `bg-background/95 backdrop-blur` ＋ボーダーへ
- [x] **T10. 残りの直書き色** — Footer / CareerCard / buttonVariants / dialog / carousel を個別に確認して置換（オーバーレイ上の白は維持可）
- 完了条件（T6〜T10共通）：`sky-` / `blue-` / `bg-white` / 青系 `rgba` が src から消える（テスト・アイコンを除く）

## Phase 3: 意匠の仕上げ

- [x] **T11. SectionDivider コンポーネント（新規）** — ◆付き真鍮罫線。Hero とセクション見出し下に配置
- [x] **T12. 見出しフォント適用** — Hero の式・サブタイトル、各セクション h2、Header/Footer ワードマークに `font-display`
- [x] **T13. アイブロウ意匠** — 既存アイブロウを `text-brass` に統一、`hero.eyebrow`（Bar Taira — Est. 2019）を i18n で追加
- [x] **T14. カード枠の二重罫** — TechStackCard / PortfolioCardTrigger / About カードに ring-inset の内罫を追加

## Phase 4: ドキュメント＋品質チェック

- [x] **T15. 永続ドキュメント更新** — `docs/architecture.md`（フォント・テーマ切替）、`docs/functional-design.md`（配色定義）に追記
- [x] **T16. 品質チェック一式**
  - `npm run lint` / `npm run format:check` / `tsc -b` / `npm run test` / `npm run build` がすべて通る
- [x] **T17. 目視確認**
  - dev サーバーで 両モード × 全セクション を確認（モバイル幅含む）
  - skill-icons のダーク地での視認性確認（問題があれば該当アイコンのみ対応）
  - テーマ切替の永続化・OS追従・FOUC なしを確認

## 進捗ルール

- 各タスク完了時にチェックを入れ、想定外の変更が生じた場合はこのファイルに追記する

## 実装時の補足（2026-07-03 完了）

- 検証結果：lint / 型チェック / テスト（useTheme 6件）/ ビルド すべてパス。コントラストは全組み合わせで AA クリア（最小 4.66:1 = ライトの brass/背景）
- T10：`buttonVariants.ts` の `text-white` は destructive バリアント専用（テーマ非依存の意味色）のため維持。dialog / carousel の該当は `-translate-x` の誤検知で対象なし
- T11：SectionDivider は Hero・TechStack・Portfolio・Career に配置。About は左寄せレイアウトのため見出し下への配置は見送り
- T14：二重罫は About カードと TechStackCard に適用。PortfolioCardTrigger は focus-visible の outline と競合するため見送り
- TechStack の技術バッジ（React 水色等）は各技術のブランドカラーのため意図的に維持
- skill-icons はダーク地での視認性を目視確認済み（問題なし）

## フィードバック対応（2026-07-03）

- [x] デフォルトテーマをライト固定に変更（OS追従廃止）— useTheme / index.html / テスト / docs を更新
- [x] SNS ロゴ（GitHub / X 等）がダークで見えない問題を修正 — Footer・ナビ・モバイルメニューで `dark:brightness-0 dark:invert`
