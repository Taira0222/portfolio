import type { Variants } from 'framer-motion';
import { HERO_EASING } from './constants';

export const sectionVariants: Variants = {
  initial: { opacity: 0, y: 48, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.1, ease: HERO_EASING },
  },
};

export const headingVariants: Variants = {
  initial: { opacity: 0, y: 32 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.2, ease: HERO_EASING },
  },
};

export const keywordContainerVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.6, ease: HERO_EASING },
  },
};
