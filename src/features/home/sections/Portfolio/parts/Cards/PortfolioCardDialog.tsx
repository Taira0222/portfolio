import { Globe, Github, Newspaper } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { PortfolioCtaType, PortfolioItem } from '../../constants/data';
import { useLocalizedPortfolioItem } from '../../hooks/useLocalizedPortfolioItem';

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
  const { t } = useTranslation();
  const { title, summary, highlights, ctaLabels } = useLocalizedPortfolioItem(item);
  const technologiesLabel = t('portfolio.labels.technologies', { defaultValue: '使用技術' });
  const highlightsLabel = t('portfolio.labels.highlights', { defaultValue: 'ハイライト' });

  return (
    <DialogContent className="max-w-2xl space-y-6">
      <DialogHeader className="space-y-2 text-left">
        <DialogTitle className="text-3xl font-bold tracking-tight">{title}</DialogTitle>
        <DialogDescription asChild className="space-y-2">
          <div>
            <span className="inline-flex items-center rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-secondary-foreground/80">
              {item.category}
            </span>
            <p className="text-sm text-foreground">{summary}</p>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {item.meta.timeline} / {item.meta.role}
            </p>
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <section className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            {technologiesLabel}
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
            {highlightsLabel}
          </h3>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            {highlights.map((highlight) => (
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
              {item.ctas.slice(0, MAX_DISPLAYED_CTAS).map((cta, index) => {
                const Icon = CTA_ICON[cta.type];
                const label = ctaLabels[index] ?? cta.label;
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
                      {label}
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
