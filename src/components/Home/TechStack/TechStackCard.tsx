import { motion, easeOut } from 'framer-motion';
import type { Variants } from 'framer-motion';

import { skillIcons } from './data';
import type { TechStackCategory } from './types';
import { cn } from '@/lib/utils';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: index * 0.05, ease: easeOut },
  }),
};

type TechStackCardProps = {
  category: TechStackCategory;
  index: number;
};

export const TechStackCard = ({ category, index }: TechStackCardProps) => {
  const CategoryIcon = category.icon;

  return (
    <motion.article
      className="relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 shadow-lg shadow-black/5 backdrop-blur-sm dark:bg-background/70 dark:shadow-black/30"
      variants={fadeIn}
      custom={index}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <div className="relative flex h-full flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/60 text-primary">
            <CategoryIcon className="h-5 w-5" strokeWidth={1.6} />
          </span>
          <h3 className="text-lg font-semibold text-foreground md:text-xl">{category.title}</h3>
        </div>
        <ul className="flex flex-wrap gap-3">
          {category.items.map((item) => (
            <li
              key={item.name}
              className={cn(
                'inline-flex items-center gap-2 rounded-2xl border px-3 py-1.5 text-xs font-medium transition md:text-sm',
                'hover:border-primary/40 hover:bg-muted/50',
                item.badgeClassName,
              )}
            >
              {item.icon ? (
                <img
                  src={skillIcons[item.icon].src}
                  alt={skillIcons[item.icon].alt}
                  className="h-5 w-5"
                  loading="lazy"
                />
              ) : item.customIcon ? (
                <item.customIcon className={cn('h-5 w-5', item.iconClassName ?? 'text-primary')} />
              ) : null}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
};
