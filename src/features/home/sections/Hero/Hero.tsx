import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionDivider } from '@/components/Common/SectionDivider';
import { HeroBackground } from './components/HeroBackground';
import { HeroHeading } from './components/HeroHeading';
import { HeroKeywords } from './components/HeroKeywords';
import { sectionVariants, subtitleVariants } from './variants';
import { scrollToSection } from '@/lib/scroll';

export const Hero = () => {
  const { t } = useTranslation();

  const handleScrollToAbout = () => {
    scrollToSection('about', { behavior: 'smooth' });
  };

  return (
    <motion.section
      className="relative flex min-h-svh w-full items-center justify-center overflow-hidden py-20"
      variants={sectionVariants}
      initial="initial"
      animate="animate"
    >
      <HeroBackground />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.p
          className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-brass sm:text-sm"
          variants={subtitleVariants}
          initial="initial"
          animate="animate"
        >
          {t('hero.eyebrow', { defaultValue: 'Bar Taira — Est. 2019' })}
        </motion.p>
        <HeroHeading />
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl"
          variants={subtitleVariants}
          initial="initial"
          animate="animate"
        >
          {t('hero.subtitle', {
            defaultValue: 'Full-Stack Software Engineer',
          })}
        </motion.p>
        <SectionDivider className="mx-auto mt-8 w-44" />
        <div className="mt-8">
          <HeroKeywords onScrollToAbout={handleScrollToAbout} />
        </div>
      </div>
    </motion.section>
  );
};
