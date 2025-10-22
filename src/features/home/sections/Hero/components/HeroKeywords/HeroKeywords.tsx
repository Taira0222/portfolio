import { motion } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';
import { HERO_EASING, KEYWORD_DELAY_BASE } from '../../constants';
import { KEYWORD_TOKENS, type KeywordToken } from '../../tokens';
import { keywordContainerVariants } from '../../variants';
import { KeywordLabel } from './KeywordLabel';

type HeroKeywordsProps = {
  onScrollToAbout: () => void;
};

export const HeroKeywords = ({ onScrollToAbout }: HeroKeywordsProps) => (
  <motion.div
    className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-y-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-primary/80 sm:gap-x-5 sm:text-xs md:text-base md:tracking-[0.38em]"
    variants={keywordContainerVariants}
    initial="initial"
    animate="animate"
  >
    {KEYWORD_TOKENS.map((token, index) => renderToken(token, index, onScrollToAbout))}
  </motion.div>
);

const renderToken = (token: KeywordToken, index: number, onScrollToAbout: () => void) => {
  if (token.type === 'word') {
    return (
      <span
        key={`${token.label.label}-${index}`}
        className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-2 py-1.5 text-[0.70rem] tracking-[0.28em] leading-none backdrop-blur sm:px-5 sm:py-2 sm:text-xs md:text-sm"
      >
        <KeywordLabel entry={token.label} />
      </span>
    );
  }

  if (token.type === 'separator' || token.type === 'equals') {
    const textClass = token.type === 'separator' ? 'text-primary/70' : 'text-primary/80';
    return (
      <span
        key={`${token.type}-${index}`}
        className={`inline-flex items-center justify-center px-1 text-[0.7rem] sm:text-sm md:text-lg ${textClass}`}
      >
        {token.label}
      </span>
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
      <ChevronsDown className="h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9" aria-hidden="true" />
    </motion.button>
  );
};
