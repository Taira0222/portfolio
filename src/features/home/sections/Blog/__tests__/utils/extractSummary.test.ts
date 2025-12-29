import { describe, test, expect } from 'vitest';
import { extractSummary } from '../../utils/extractSummary';

describe('extractSummary', () => {
  describe('Markdown記法の除去', () => {
    test('見出し記号を除去する', () => {
      const input = '# タイトル\n## サブタイトル\nテキスト';
      const result = extractSummary(input, 100);
      expect(result).toBe('タイトル サブタイトル テキスト');
    });

    test('太字記号を除去する', () => {
      const input = '**太字**と__太字2__のテスト';
      const result = extractSummary(input, 100);
      expect(result).toBe('太字と太字2のテスト');
    });

    test('イタリック記号を除去する', () => {
      const input = '*イタリック*と_イタリック2_のテスト';
      const result = extractSummary(input, 100);
      expect(result).toBe('イタリックとイタリック2のテスト');
    });

    test('リンク記号を除去する', () => {
      const input = '[リンク](https://example.com)のテスト';
      const result = extractSummary(input, 100);
      expect(result).toBe('リンクのテスト');
    });

    test('インラインコードを除去する', () => {
      const input = 'これは`code`のテストです';
      const result = extractSummary(input, 100);
      expect(result).toBe('これはcodeのテストです');
    });

    test('コードブロックを除去する', () => {
      const input = '```javascript\nconst x = 1;\n```\nテキスト';
      const result = extractSummary(input, 100);
      expect(result).toBe('テキスト');
    });

    test('画像記号を除去する', () => {
      const input = '![画像](https://example.com/image.png)のテスト';
      const result = extractSummary(input, 100);
      expect(result).toBe('のテスト');
    });

    test('引用記号を除去する', () => {
      const input = '> 引用文\n通常のテキスト';
      const result = extractSummary(input, 100);
      expect(result).toBe('引用文 通常のテキスト');
    });

    test('リスト記号を除去する', () => {
      const input = '- リスト1\n* リスト2\n+ リスト3\n1. 番号付き';
      const result = extractSummary(input, 100);
      expect(result).toBe('リスト1 リスト2 リスト3 番号付き');
    });
  });

  describe('文字数制限', () => {
    test('指定文字数以下の場合、そのまま返す', () => {
      const input = 'これは短いテキストです。';
      const result = extractSummary(input, 100);
      expect(result).toBe('これは短いテキストです。');
    });

    test('指定文字数を超える場合、切り詰めて...を追加する', () => {
      const input = 'これは非常に長いテキストで、指定された文字数を大幅に超えています。';
      const result = extractSummary(input, 20);
      expect(result).toBe('これは非常に長いテキストで、指定された文...');
      expect(result.length).toBe(23); // 20文字 + "..."
    });

    test('ちょうど指定文字数の場合、...を追加しない', () => {
      const input = 'ちょうど10文字です';
      const result = extractSummary(input, 10);
      expect(result).toBe('ちょうど10文字です');
      expect(result).not.toContain('...');
    });
  });

  describe('エッジケース', () => {
    test('空文字列を処理する', () => {
      const result = extractSummary('', 100);
      expect(result).toBe('');
    });

    test('改行のみの文字列を処理する', () => {
      const input = '\n\n\n';
      const result = extractSummary(input, 100);
      expect(result).toBe('');
    });

    test('空白のみの文字列を処理する', () => {
      const input = '   ';
      const result = extractSummary(input, 100);
      expect(result).toBe('');
    });

    test('複数の連続した空白を単一の空白に置換する', () => {
      const input = 'これは    テスト   です';
      const result = extractSummary(input, 100);
      expect(result).toBe('これは テスト です');
    });

    test('複合的なMarkdown記法を処理する', () => {
      const input = '# タイトル\n\n**重要**: [リンク](https://example.com)を参照してください。\n\n```js\ncode\n```\n\n- リスト1\n- リスト2';
      const result = extractSummary(input, 100);
      expect(result).toBe('タイトル 重要: リンクを参照してください。 リスト1 リスト2');
    });
  });

  describe('実際のQiita記事の例', () => {
    test('典型的なQiita記事の冒頭を処理する', () => {
      const input = `# はじめに

この記事では、**React**と**TypeScript**を使った開発について解説します。

## 環境構築

まず、以下のコマンドを実行してください：

\`\`\`bash
npm install
\`\`\`

詳細は[公式ドキュメント](https://reactjs.org)を参照してください。`;

      const result = extractSummary(input, 50);
      expect(result.length).toBeLessThanOrEqual(53); // 50 + "..."
      expect(result).toContain('はじめに');
      expect(result).not.toContain('#');
      expect(result).not.toContain('**');
      expect(result).not.toContain('```');
    });
  });
});
