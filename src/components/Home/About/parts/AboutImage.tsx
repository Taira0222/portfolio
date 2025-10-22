import { motion, easeOut } from 'framer-motion';
import type { Variants } from 'framer-motion';

import AboutMe from '@/assets/About_me.png';
import { useIsMobile } from '@/hooks/useMobile';

type AboutImageProps = {
  variants: Variants;
};

export const AboutImage = ({ variants }: AboutImageProps) => {
  const isMobile = useIsMobile();
  return (
    <motion.div
      variants={variants}
      transition={{ duration: 0.7, ease: easeOut }}
      className={isMobile ? 'mx-auto w-full max-w-[14rem]' : 'mx-auto w-full max-w-xs md:max-w-sm'}
    >
      <div className="relative mx-auto flex aspect-square w-full items-center justify-center">
        <div
          aria-hidden
          className="absolute inset-0 scale-105 rounded-full bg-gradient-to-br from-primary/10 via-secondary/40 to-primary/20 blur-3xl"
        />
        <div
          className={
            isMobile
              ? 'relative flex h-56 w-56 items-center justify-center rounded-full border border-border/70 bg-background/70 shadow-lg shadow-primary/10'
              : 'relative flex h-80 w-80 items-center justify-center rounded-full border border-border/70 bg-background/70 shadow-lg shadow-primary/10'
          }
        >
          <img
            src={AboutMe}
            alt="Taira"
            className={isMobile ? 'h-56 w-56 rounded-full object-cover' : 'h-full w-full rounded-full object-cover'}
          />
        </div>
      </div>
    </motion.div>
  );
};
