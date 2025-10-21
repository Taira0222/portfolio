import { cubicBezier, motion } from 'framer-motion';

import { PortfolioCarousel } from './parts/PortfolioCarousel';
import { PortfolioSectionHeader } from './parts/PortfolioSectionHeader';
import { sortedPortfolioItems } from './constants/data';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) } },
};

export const Portfolio = () => {
  return (
    <motion.section
      id="portfolio"
      className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/5 to-background py-20"
      aria-labelledby="portfolio-heading"
      initial="hidden"
      animate="visible"
    >
      <div className="pointer-events-none absolute inset-x-4 top-8 h-24 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
      <div className="container relative mx-auto max-w-6xl px-6 md:px-10">
        <PortfolioSectionHeader variants={fadeUp} />
        <PortfolioCarousel items={sortedPortfolioItems} variants={fadeUp} />
      </div>
    </motion.section>
  );
};
