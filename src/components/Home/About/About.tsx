import { motion, easeOut } from 'framer-motion';
import { AboutImage } from './parts/AboutImage';
import { AboutContent } from './parts/AboutContent';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const About = () => {
  return (
    <motion.section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background pt-24"
      aria-labelledby="about-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(15,_23,_42,_0.08),_transparent_70%)] dark:bg-[radial-gradient(circle_at_top,_rgba(148,_163,_184,_0.16),_transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-8 bottom-0 h-20 translate-y-1/2 bg-gradient-to-b from-transparent via-secondary/20 to-secondary/30 dark:via-secondary/15 dark:to-secondary/20" />

      <div className="container mx-auto max-w-6xl px-6 md:px-10">
        <div className="relative rounded-3xl border border-border/50 bg-card/80 p-8 shadow-xl shadow-black/5 backdrop-blur md:p-12 dark:bg-background/70 dark:shadow-black/20">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/10 to-transparent dark:from-primary/10 dark:via-secondary/20" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <AboutImage variants={fadeUp} />
            <AboutContent variants={fadeUp} />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
