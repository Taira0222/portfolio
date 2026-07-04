import { easeOut, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { SectionDivider } from '@/components/Common/SectionDivider';
import { BrandGlyph } from './parts/BrandGlyph';
import { techStack } from './data';
import type { TechStackCategory } from './types';

const defaultContent = {
  eyebrow: 'Tech Stack',
  title: '私の技術スタック',
  description: 'フロントエンド、バックエンド、インフラまでフルスタックで対応可能です。',
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const MenuCategory = ({ category }: { category: TechStackCategory }) => {
  const { t } = useTranslation();
  const title = t(category.titleKey, { defaultValue: category.defaultTitle });

  return (
    <motion.div
      className="mb-9 break-inside-avoid"
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.div variants={rowVariants} className="mb-2 flex items-baseline gap-3">
        <h3 className="font-display text-xl font-semibold tracking-wide text-primary">{title}</h3>
        <span
          className="flex-1 translate-y-[-4px] border-b border-dotted border-border/70"
          aria-hidden="true"
        />
        <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground">
          {category.items.length}
        </span>
      </motion.div>
      <ul>
        {category.items.map((item) => (
          <motion.li
            key={item.name}
            variants={rowVariants}
            className="flex items-baseline gap-3 py-1.5"
          >
            <span className="flex-none text-brass">
              {item.glyph ? (
                <BrandGlyph slug={item.glyph} className="h-[18px] w-[18px]" />
              ) : item.customIcon ? (
                <item.customIcon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              ) : null}
            </span>
            <span className="whitespace-nowrap text-[15px] text-foreground">{item.name}</span>
            <span
              className="min-w-[16px] flex-1 translate-y-[-4px] border-b border-dotted border-border/60"
              aria-hidden="true"
            />
            <span className="whitespace-nowrap text-xs italic text-muted-foreground">
              {item.role}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export const TechStack = () => {
  const { t } = useTranslation();
  const eyebrow = t('techStack.eyebrow', { defaultValue: defaultContent.eyebrow });
  const title = t('techStack.title', { defaultValue: defaultContent.title });
  const description = t('techStack.description', { defaultValue: defaultContent.description });

  return (
    <section
      id="tech-stack"
      className="relative bg-gradient-to-b from-secondary via-background to-secondary/60 py-24"
      aria-labelledby="tech-stack-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background via-background/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-12 bottom-12 h-32 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />

      <div className="container mx-auto max-w-5xl px-6 md:px-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brass">{eyebrow}</p>
          <h2
            id="tech-stack-heading"
            className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            {title}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
          <SectionDivider className="w-28" />
        </div>

        {/* バーのドリンクメニュー風レイアウト。項目はスクロールで順に浮かび上がる */}
        <div className="relative mx-auto mt-14 max-w-4xl rounded-2xl border border-brass/40 bg-card/60 p-8 shadow-lg shadow-black/5 outline outline-1 -outline-offset-8 outline-brass/20 backdrop-blur md:p-12 dark:bg-background/50">
          <div className="md:columns-2 md:gap-x-14">
            {techStack.map((category) => (
              <MenuCategory key={category.titleKey} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
