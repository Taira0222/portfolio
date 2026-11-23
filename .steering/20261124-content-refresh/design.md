# 設計 — 中身の入れ替えと言語ごとの URL

作成日: 2026-11-24

## 言語ごとの URL

| 部品 | 作り |
|---|---|
| 言語の決め方 | `src/lib/language.ts` の `languageFromPath`。basename を除いたパスが `/ja` か `/ja/...` なら日本語、ほかは英語。i18next の初期値もこれで決める（`i18next-browser-languagedetector` は外す） |
| ルート | `Router.tsx` が英語の道（`/`・`/about-me` など）と日本語の道（`/ja`・`/ja/about-me` など）の両方を作る。`LanguageSync` がパスの変化に合わせて i18next の言語を切り替える |
| ナビゲーション | `useSectionLinks` が今の言語の頭（`/ja`）を付けた道を返す |
| 切り替えのボタン | `LanguageToggle` が、今のパスをもう一方の言語のパスに変えて移動する |
| GitHub Pages | ビルドの後に `scripts/postbuild.mjs` が `dist/ja/index.html`（日本語の og・`lang="ja"`）と `dist/404.html`（深い道を直接開いたときの受け皿）を作る |
| 日本語のフォント | Shippori Mincho は日本語のときだけ読む（英語のページを軽くする） |

## 作品の構成図

- `PortfolioItem` に `flow`（箱の名前と一言の並び）と、任意の `flowNote` を足す
- 詳しい画面（`PortfolioCardDialog`）の「仕組み」の欄に、真鍮の細い線の箱を矢印でつないで縦に並べる
- 箱の名前は技術の名前なので訳さない。`flowNote` は訳す

## 画像

| 画像 | 変え方 |
|---|---|
| About_me.png（5.8MB） | 800px の JPEG |
| juku-cloud.svg（2.3MB、中は PNG と JPEG） | Chrome の headless で撮って 1280×720 の JPEG |
| portfolio.png（1.8MB） | 1280px の JPEG |
| 単語帳のカード | 「通り → la calle」の見本を HTML で作り、Chrome の headless で撮って JPEG |
| career/・todo-app.svg・Qiita.svg | 使わなくなるので消す |
