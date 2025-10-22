import { Globe, Github, Newspaper } from 'lucide-react';

import { Button } from '@/components/ui/Button/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { PortfolioCtaType, PortfolioItem } from '../../constants/data';

type PortfolioCardDialogProps = {
  item: PortfolioItem;
};

const MAX_DISPLAYED_CTAS = 3;

const CTA_ICON: Record<PortfolioCtaType, typeof Globe> = {
  live: Globe,
  repo: Github,
  article: Newspaper,
};

const CTA_VARIANT: Record<PortfolioCtaType, 'default' | 'outline' | 'secondary'> = {
  live: 'default',
  repo: 'outline',
  article: 'secondary',
};

export const PortfolioCardDialog = ({ item }: PortfolioCardDialogProps) => {
  return (
    <DialogContent className="max-w-2xl space-y-6">
      <DialogHeader className="space-y-2 text-left">
        <DialogTitle className="text-3xl font-bold tracking-tight">{item.title}</DialogTitle>
        <DialogDescription className="space-y-2">
          <span className="inline-flex items-center rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-secondary-foreground/80">
            {item.category}
          </span>
          <p className="text-sm text-foreground">{item.summary}</p>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {item.meta.timeline} / {item.meta.role}
          </p>
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <section className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            使用技術
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
        <section className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            ハイライト
          </h3>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            {item.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span
                  className="mt-1 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <span className="flex-1">{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
        {item.ctas.length > 0 ? (
          <section className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Links
            </h3>
            <div className="flex flex-wrap gap-3">
              {item.ctas.slice(0, MAX_DISPLAYED_CTAS).map((cta) => {
                const Icon = CTA_ICON[cta.type];
                return (
                  <Button
                    key={`${cta.type}-${cta.href}`}
                    variant={CTA_VARIANT[cta.type]}
                    size="sm"
                    className="rounded-full px-4"
                    asChild
                  >
                    <a href={cta.href} target="_blank" rel="noreferrer noopener">
                      <Icon className="size-4" aria-hidden="true" />
                      {cta.label}
                    </a>
                  </Button>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </DialogContent>
  );
};
