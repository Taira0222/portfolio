import type { Variants } from 'framer-motion';
import { HERO_EASING, KEYWORD_DELAY_BASE } from './constants';

export const sectionVariants: Variants = {
  initial: { opacity: 0, y: 48, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.1, ease: HERO_EASING },
  },
};

export const headingCharacterVariants: Variants = {
  initial: { opacity: 0, y: 32 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.2 + index * 0.03, ease: HERO_EASING },
  }),
};

export const keywordContainerVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.6, ease: HERO_EASING },
  },
};

export const keywordSharedAnimation = (index: number) =>
  ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.45,
      delay: KEYWORD_DELAY_BASE + index * 0.1,
      ease: HERO_EASING,
    },
  } as const);
