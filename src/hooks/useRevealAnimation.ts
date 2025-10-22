import { useEffect, useRef } from 'react';
import { useAnimationControls, useInView, useReducedMotion } from 'framer-motion';

type UseRevealAnimationOptions = Parameters<typeof useInView>[1];

export const useRevealAnimation = (options?: UseRevealAnimationOptions) => {
  const ref = useRef<HTMLElement | null>(null);
  const controls = useAnimationControls();
  const prefersReducedMotion = useReducedMotion();
  const supportsIntersectionObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window;
  const inView = useInView(ref, { once: true, ...options });

  useEffect(() => {
    if (!supportsIntersectionObserver || prefersReducedMotion) {
      controls.set('visible');
      return;
    }

    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView, prefersReducedMotion, supportsIntersectionObserver]);

  return {
    ref,
    controls,
    initial: supportsIntersectionObserver && !prefersReducedMotion ? 'hidden' : 'visible',
  };
};
