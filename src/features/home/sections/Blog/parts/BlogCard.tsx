import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { BlogCardProps } from '../types';
import { extractSummary } from '../utils/extractSummary';
import { SUMMARY_MAX_LENGTH } from '../constants';

export const BlogCard = ({ article }: BlogCardProps) => {
  const { t } = useTranslation();
  const summary = extractSummary(article.body, SUMMARY_MAX_LENGTH);

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full transition-transform duration-300 hover:scale-[1.02]"
    >
      <Card className="flex h-full flex-col border-border/40 bg-background/80 shadow-sm backdrop-blur transition-shadow duration-300 supports-[backdrop-filter]:bg-background/70 hover:shadow-md dark:bg-background/60">
        <CardHeader className="pb-3">
          <CardTitle className="line-clamp-2 min-h-[3.5rem] text-lg font-semibold tracking-tight text-foreground md:text-xl">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pb-3">
          <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-relaxed text-muted-foreground md:text-base">
            {summary}
          </p>
        </CardContent>
        <CardFooter className="pt-3">
          <span className="flex items-center gap-2 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
            {t('blog.readMore')}
            <ExternalLink className="h-4 w-4" />
          </span>
        </CardFooter>
      </Card>
    </a>
  );
};
