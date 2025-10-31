import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { CareerCard } from './parts/CareerCard';

import { sectionFadeUp, timelineItem, timelineReveal } from './animations';
import { useRevealAnimation } from '@/hooks/useRevealAnimation';
import { careerTimeline } from './constants/data';

export const Career = () => {
  const { ref: sectionRef, controls, initial } = useRevealAnimation({ amount: 0.1 });
  const { t } = useTranslation();
  const title = t('career.title', { defaultValue: '今までのキャリア' });
  const description = t('career.description', {
    defaultValue: '土木の公務員、学習塾起業、自社でのプロダクト開発など多岐にわたって経験してきました。',
  });

  return (
    <motion.section
      id="career"
      className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-blue-50 to-sky-50 py-24"
      aria-labelledby="career-heading"
      ref={sectionRef}
      initial={initial}
      animate={controls}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background via-background/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-12 bottom-12 h-32 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />

      <div className="container relative mx-auto max-w-5xl px-6 md:px-10">
        <motion.div
          variants={sectionFadeUp}
          className="flex flex-col items-center gap-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Career
          </p>
          <h2
            id="career-heading"
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            {title}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
        </motion.div>

        <motion.div
          className="relative mt-16 flex flex-col gap-12 pl-10 before:absolute before:left-10 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-primary/40 before:to-transparent before:content-[''] md:gap-16 md:pl-16 md:before:left-16"
          variants={timelineReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          {careerTimeline.map((milestone) => (
            <CareerCard key={milestone.id} milestone={milestone} variants={timelineItem} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
