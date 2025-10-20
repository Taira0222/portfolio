import { motion, easeOut } from 'framer-motion';
import { AboutImage } from './AboutImage';
import { AboutContent } from './AboutContent';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const About = () => {
  return (
    <motion.section
      id="about"
      className="py-24 bg-gradient-to-b from-background via-background to-secondary/30"
      aria-labelledby="about-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="container mx-auto max-w-6xl px-6 md:px-10">
        <div className="rounded-3xl border border-border/50 bg-card/60 p-8 shadow-xl backdrop-blur-xl md:p-12">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <AboutImage variants={fadeUp} />
            <AboutContent variants={fadeUp} />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
