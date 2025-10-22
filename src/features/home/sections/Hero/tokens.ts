import { HERO_KEYWORDS } from './constants';

type KeywordEntry = {
  label: string;
  mobileLabel?: string;
};

type KeywordToken =
  | { type: 'word'; label: KeywordEntry }
  | { type: 'separator'; label: string }
  | { type: 'equals'; label: string }
  | { type: 'result'; ariaLabel: string };

const KEYWORD_ENTRIES: KeywordEntry[] = HERO_KEYWORDS.map((keyword) => {
  switch (keyword) {
    case 'Civil Eng':
      return { label: 'Civil Eng', mobileLabel: 'Civil' };
    case 'Edu':
      return { label: 'Edu' };
    case 'Software Eng':
      return { label: 'Software Eng', mobileLabel: 'Software' };
    default:
      return { label: keyword };
  }
});

const createKeywordTokens = (): KeywordToken[] => {
  const tokens: KeywordToken[] = [];

  KEYWORD_ENTRIES.forEach((entry, index) => {
    tokens.push({ type: 'word', label: entry });
    if (index < KEYWORD_ENTRIES.length - 1) {
      tokens.push({ type: 'separator', label: '×' });
    }
  });

  tokens.push({ type: 'equals', label: '=' });
  tokens.push({ type: 'result', ariaLabel: 'Scroll to About section' });

  return tokens;
};

export const KEYWORD_TOKENS = createKeywordTokens();
export type { KeywordToken, KeywordEntry };
