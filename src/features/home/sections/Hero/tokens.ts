import { HERO_KEYWORDS } from './constants';

export type KeywordToken =
  | { type: 'word'; label: string }
  | { type: 'separator'; label: string }
  | { type: 'equals'; label: string }
  | { type: 'result'; ariaLabel: string };

export const createKeywordTokens = (): KeywordToken[] => {
  const tokens: KeywordToken[] = [];

  HERO_KEYWORDS.forEach((keyword, index) => {
    tokens.push({ type: 'word', label: keyword });
    if (index < HERO_KEYWORDS.length - 1) {
      tokens.push({ type: 'separator', label: '×' });
    }
  });

  tokens.push({ type: 'equals', label: '=' });
  tokens.push({ type: 'result', ariaLabel: 'Scroll to About section' });

  return tokens;
};

export const KEYWORD_TOKENS = createKeywordTokens();
