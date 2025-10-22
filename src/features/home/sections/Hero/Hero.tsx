import { motion } from 'framer-motion';
import { HeroBackground } from './components/HeroBackground';
import { HeroHeading } from './components/HeroHeading';
import { HeroKeywords } from './components/HeroKeywords';
import { sectionVariants } from './variants';
import { scrollToSection } from '@/lib/scroll';

export const Hero = () => {
  const handleScrollToAbout = () => {
    scrollToSection('about', { behavior: 'smooth' });
  };

  return (
    <motion.section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
      variants={sectionVariants}
      initial="initial"
      animate="animate"
    >
      <HeroBackground />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <HeroHeading />
        <HeroKeywords onScrollToAbout={handleScrollToAbout} />
      </div>
    </motion.section>
  );
};
