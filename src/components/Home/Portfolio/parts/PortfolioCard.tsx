import { Globe, Github, Newspaper } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/Button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import type { PortfolioCtaType, PortfolioItem } from '../constants/data';

type PortfolioCardProps = {
  item: PortfolioItem;
};

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

export const PortfolioCard = ({ item }: PortfolioCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
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
          <CardFooter className="flex items-center justify-between gap-3 border-t border-border/60 pt-4">
            <span className="text-xs text-muted-foreground">クリックで詳細を見る</span>
            <div className="flex items-center gap-2 text-xs font-medium text-primary opacity-0 transition group-hover:opacity-100">
              <span>詳細を見る</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl space-y-6">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            {item.title}
          </DialogTitle>
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
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
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
                {item.ctas.slice(0, 3).map((cta) => {
                  const Icon = CTA_ICON[cta.type];
                  return (
                    <Button
                      key={cta.label}
                      variant={CTA_VARIANT[cta.type]}
                      size="sm"
                      className="rounded-full px-4"
                      asChild
                    >
                      <a href={cta.href} target="_blank" rel="noreferrer">
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
    </Dialog>
  );
};
