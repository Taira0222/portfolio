/**
 * Markdown記法を除去してプレーンテキストに変換し、指定文字数で要約を生成する
 *
 * @param body - Markdown形式の記事本文
 * @param maxLength - 要約の最大文字数（デフォルト: 150）
 * @returns プレーンテキストの要約文
 *
 * @example
 * ```ts
 * const summary = extractSummary('# タイトル\n\nこんにちは、**世界**！', 20);
 * // => 'タイトル こんにちは、世界！'
 * ```
 */
export const extractSummary = (body: string, maxLength: number = 150): string => {
  let plainText = body;

  // 見出し記法を除去 (# ## ### など)
  plainText = plainText.replace(/^#{1,6}\s+/gm, '');

  // コードブロックを除去 (```...```)
  plainText = plainText.replace(/```[\s\S]*?```/g, '');

  // インラインコードを除去 (`...`)
  plainText = plainText.replace(/`([^`]+)`/g, '$1');

  // 画像を除去 (![alt](url))
  plainText = plainText.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');

  // リンクをテキストのみに変換 ([text](url) => text)
  plainText = plainText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // 太字・イタリックを除去 (** __ * _)
  plainText = plainText.replace(/(\*\*|__)(.*?)\1/g, '$2');
  plainText = plainText.replace(/(\*|_)(.*?)\1/g, '$2');

  // 引用記法を除去 (>)
  plainText = plainText.replace(/^>\s+/gm, '');

  // リスト記法を除去 (-, *, +, 1.)
  plainText = plainText.replace(/^[\s-]*[-*+]\s+/gm, '');
  plainText = plainText.replace(/^\s*\d+\.\s+/gm, '');

  // 水平線を除去 (---, ***, ___)
  plainText = plainText.replace(/^[-*_]{3,}$/gm, '');

  // 改行を空白に変換
  plainText = plainText.replace(/\n+/g, ' ');

  // 連続する空白を1つに
  plainText = plainText.replace(/\s+/g, ' ');

  // 前後の空白を削除
  plainText = plainText.trim();

  // 指定文字数で切り取り
  if (plainText.length > maxLength) {
    return plainText.substring(0, maxLength) + '...';
  }

  return plainText;
};
