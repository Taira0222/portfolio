import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
      className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden py-20 sm:min-h-[78vh]"
      variants={sectionVariants}
      initial="initial"
      animate="animate"
    >
      <HeroBackground />
      <div className="container relative z-10 mx-auto px-4 text-center">
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
        <div className="mt-10">
          <HeroKeywords onScrollToAbout={handleScrollToAbout} />
        </div>
      </div>
    </motion.section>
  );
};
