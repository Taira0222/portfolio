import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import type { PortfolioItem } from '../../constants/data';

type PortfolioCardTriggerProps = {
  item: PortfolioItem;
};

export const PortfolioCardTrigger = ({ item }: PortfolioCardTriggerProps) => {
  return (
    <Card className="group mx-auto h-full max-h-[80vh] cursor-pointer overflow-hidden border-border/60 bg-card/90 shadow-lg shadow-black/5 backdrop-blur transition hover:border-primary/50 hover:shadow-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {item.featured ? (
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Featured
            </span>
          ) : null}
          <span className="inline-flex items-center rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground/80 dark:text-secondary-foreground">
            {item.category}
          </span>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {item.title}
          </CardTitle>
          <CardDescription>{item.summary}</CardDescription>
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {item.meta.timeline} / {item.meta.role}
        </p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <figure className="overflow-hidden rounded-2xl border border-border/40 bg-muted/20">
          <div className="aspect-[16/9] w-full bg-secondary/10">
            <img
              src={item.image.src}
              alt={item.image.alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <figcaption className="px-4 py-3 text-xs text-muted-foreground">
            {item.image.alt}
          </figcaption>
        </figure>
      </CardContent>
    </Card>
  );
};
