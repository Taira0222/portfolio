// ビルドの後に、GitHub Pages 用のページを足す（npm run build の最後に動く）
//   dist/ja/index.html … 日本語のページ（/portfolio/ja/）。<html lang>・題名・説明・og を日本語にする
//   dist/404.html      … /portfolio/about-me のような深い道を直接開いたときの受け皿（中身は英語のページと同じ）
// 書き換える文字列が index.html から見つからなければ止める（index.html だけ直して、ここを直し忘れたときに気づくため）
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const SITE = 'https://taira0222.github.io/portfolio/';
const html = readFileSync('dist/index.html', 'utf8');

const EN = {
  title: 'Taira Aikawa | Full-stack software engineer',
  description:
    'Taira Aikawa is a full-stack software engineer based in the U.S. Selected work and tech stack.',
};
const JA = {
  title: 'Taira Aikawa | フルスタックエンジニア',
  description:
    '米国在住のフルスタックエンジニア Taira Aikawa のポートフォリオ。作ったものと技術スタック。',
};

const replaceAll = (source, from, to) => {
  if (!source.includes(from)) throw new Error(`index.html に見つからない: ${from}`);
  return source.split(from).join(to);
};

let ja = html;
ja = replaceAll(ja, '<html lang="en">', '<html lang="ja">');
ja = replaceAll(ja, EN.title, JA.title);
ja = replaceAll(ja, EN.description, JA.description);
ja = replaceAll(
  ja,
  `<meta property="og:url" content="${SITE}" />`,
  `<meta property="og:url" content="${SITE}ja/" />`,
);
ja = replaceAll(ja, 'content="en_US"', 'content="ja_JP"');

mkdirSync('dist/ja', { recursive: true });
writeFileSync('dist/ja/index.html', ja);
writeFileSync('dist/404.html', html);
console.log('postbuild: dist/ja/index.html と dist/404.html を書いた');
