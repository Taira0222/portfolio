import { motion, type Variants } from 'framer-motion';

import { Card, CardContent } from '@/components/ui/card';
import type { CareerMilestone } from '../types';
import { useRevealAnimation } from '@/hooks/useRevealAnimation';

type CareerCardProps = {
  milestone: CareerMilestone;
  variants: Variants;
};

export const CareerCard = ({ milestone, variants }: CareerCardProps) => {
  const { ref, controls, initial } = useRevealAnimation({ amount: 0.4 });

  return (
    <motion.article
      ref={ref}
      variants={variants}
      initial={initial}
      animate={controls}
      className="relative grid gap-6 pl-8 md:grid-cols-[130px,1fr] md:gap-12 md:pl-16"
    >
      <span className="absolute left-0 top-2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border border-primary/50 bg-background shadow-sm dark:bg-secondary/30">
        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
      </span>

      <div className="flex flex-col justify-start text-sm text-muted-foreground md:text-base">
        <time className="text-base font-semibold text-primary md:text-lg">{milestone.date}</time>
      </div>

      <Card className="rounded-xl border border-border/40 bg-background/80 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/70 dark:bg-background/60">
        <CardContent className="flex flex-col gap-4 p-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {milestone.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {milestone.description}
            </p>
          </div>
          {milestone.image && (
            <figure className="relative overflow-hidden rounded-lg border border-border/40">
              <div className="aspect-[21/9] w-full">
                <img
                  src={milestone.image.src}
                  alt={milestone.image.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </figure>
          )}
        </CardContent>
      </Card>
    </motion.article>
  );
};
