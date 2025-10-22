import { motion } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';
import { HERO_EASING, KEYWORD_DELAY_BASE } from '../constants';
import { KEYWORD_TOKENS, type KeywordToken } from '../tokens';
import { keywordContainerVariants, keywordSharedAnimation } from '../variants';

type HeroKeywordsProps = {
  onScrollToAbout: () => void;
};

export const HeroKeywords = ({ onScrollToAbout }: HeroKeywordsProps) => (
  <motion.div
    className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold uppercase tracking-[0.38em] text-primary/80 md:text-base"
    variants={keywordContainerVariants}
    initial="initial"
    animate="animate"
  >
    {KEYWORD_TOKENS.map((token, index) => renderToken(token, index, onScrollToAbout))}
  </motion.div>
);

const renderToken = (
  token: KeywordToken,
  index: number,
  onScrollToAbout: () => void
) => {
  if (token.type === 'word') {
    return (
      <motion.span
        key={`${token.label}-${index}`}
        {...keywordSharedAnimation(index)}
        className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-5 py-2 tracking-[0.28em] leading-none backdrop-blur"
      >
        {token.label}
      </motion.span>
    );
  }

  if (token.type === 'separator' || token.type === 'equals') {
    const textClass = token.type === 'separator' ? 'text-primary/70' : 'text-primary/80';
    return (
      <motion.span
        key={`${token.type}-${index}`}
        {...keywordSharedAnimation(index)}
        className={`inline-flex items-center justify-center px-1 md:text-lg ${textClass}`}
      >
        {token.label}
      </motion.span>
    );
  }

  const delay = KEYWORD_DELAY_BASE + index * 0.1;
  return (
    <motion.button
      key={`result-${index}`}
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: [0, 8, 0] }}
      transition={{
        opacity: { duration: 0.45, delay, ease: HERO_EASING },
        y: {
          duration: 1.6,
          delay: delay + 0.2,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        },
      }}
      onClick={onScrollToAbout}
      className="inline-flex items-center justify-center text-primary/80 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
      aria-label={token.ariaLabel}
    >
      <ChevronsDown className="h-7 w-7 md:h-9 md:w-9" aria-hidden="true" />
    </motion.button>
  );
};
