import { ArrowDown, ArrowRight, Globe, Github, Newspaper } from 'lucide-react';
import { Fragment } from 'react';
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
  const { title, summary, highlights, ctaLabels, flowNote } = useLocalizedPortfolioItem(item);
  const technologiesLabel = t('portfolio.labels.technologies', { defaultValue: '使用技術' });
  const highlightsLabel = t('portfolio.labels.highlights', { defaultValue: 'ハイライト' });
  const howItWorksLabel = t('portfolio.labels.howItWorks', { defaultValue: '仕組み' });

  return (
    <DialogContent className="max-w-2xl space-y-6 outline outline-1 -outline-offset-8 outline-brass/25">
      <DialogHeader className="space-y-2 text-left">
        <DialogTitle className="font-display text-3xl font-bold tracking-tight">
          {title}
        </DialogTitle>
        <DialogDescription asChild className="space-y-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">
              {item.category}
            </span>
            <p className="text-sm text-foreground">{summary}</p>
            <p className="flex items-baseline gap-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <span className="whitespace-nowrap">{item.meta.timeline}</span>
              <span
                className="min-w-[16px] flex-1 translate-y-[-3px] border-b border-dotted border-border/60"
                aria-hidden="true"
              />
              <span className="whitespace-nowrap">{item.meta.role}</span>
            </p>
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <section className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-brass">
            {technologiesLabel}
          </h3>
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border border-brass/40 bg-background/60 px-3 py-1 text-xs font-medium text-foreground/80 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
        {/* 仕組み：技術の箱を真鍮の矢印でつなぐ（スマホは縦、広い画面は横） */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-brass">
            {howItWorksLabel}
          </h3>
          <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-2">
            {item.flow.map((step, index) => (
              <Fragment key={step.name}>
                {index > 0 ? (
                  <span className="pl-5 text-brass sm:pl-0" aria-hidden="true">
                    <ArrowDown className="size-4 sm:hidden" />
                    <ArrowRight className="hidden size-4 sm:block" />
                  </span>
                ) : null}
                <div className="flex min-w-[9rem] flex-col rounded-md border border-brass/50 bg-background/60 px-3 py-2 shadow-sm">
                  <span className="text-sm font-medium text-foreground">{step.name}</span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {step.note}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
          {flowNote ? <p className="text-xs text-muted-foreground">+ {flowNote}</p> : null}
        </section>
        <section className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-brass">
            {highlightsLabel}
          </h3>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2.5">
                <span className="mt-1 text-[8px] leading-none text-brass" aria-hidden="true">
                  ◆
                </span>
                <span className="flex-1">{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
        {item.ctas.length > 0 ? (
          <section className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-brass">Links</h3>
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
