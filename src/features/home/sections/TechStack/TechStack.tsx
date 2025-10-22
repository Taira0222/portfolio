import { motion } from 'framer-motion';

import { TechStackCard } from './parts/TechStackCard';
import { techStack } from './data';

export const TechStack = () => {
  return (
    <motion.section
      id="tech-stack"
      className="relative bg-gradient-to-b from-secondary/10 via-background to-background py-24"
      aria-labelledby="tech-stack-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            Tech Stack
          </p>
          <h2
            id="tech-stack-heading"
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            技術スタック
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            フロントエンド、バックエンド、インフラまでフルスタックで対応可能です。
          </p>
        </div>
        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {techStack.map((category, index) => (
            <TechStackCard key={category.title} category={category} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
