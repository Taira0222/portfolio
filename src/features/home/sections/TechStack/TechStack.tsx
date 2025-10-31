import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { TechStackCard } from './parts/TechStackCard';
import { techStack } from './data';

const defaultContent = {
  eyebrow: 'Tech Stack',
  title: '私の技術スタック',
  description: 'フロントエンド、バックエンド、インフラまでフルスタックで対応可能です。',
};

export const TechStack = () => {
  const { t } = useTranslation();
  const eyebrow = t('techStack.eyebrow', { defaultValue: defaultContent.eyebrow });
  const title = t('techStack.title', { defaultValue: defaultContent.title });
  const description = t('techStack.description', { defaultValue: defaultContent.description });

  return (
    <motion.section
      id="tech-stack"
      className="relative bg-gradient-to-b from-sky-100 via-blue-50 to-sky-50 py-24"
      aria-labelledby="tech-stack-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background via-background/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-12 bottom-12 h-32 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />

      <div className="container mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            {eyebrow}
          </p>
          <h2
            id="tech-stack-heading"
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            {title}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
        </div>
        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {techStack.map((category, index) => (
            <TechStackCard key={category.titleKey} category={category} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
