import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { PortfolioItem } from '../constants/data';

type LocalizedPortfolioItem = {
  title: string;
  summary: string;
  imageAlt: string;
  highlights: string[];
  ctaLabels: string[];
};

export const useLocalizedPortfolioItem = (item: PortfolioItem): LocalizedPortfolioItem => {
  const { t } = useTranslation();

  return useMemo(() => {
    const baseKey = `portfolio.items.${item.id}`;
    const title = t(`${baseKey}.title`, { defaultValue: item.title });
    const summary = t(`${baseKey}.summary`, { defaultValue: item.summary });
    const imageAlt = t(`${baseKey}.imageAlt`, {
      defaultValue: item.image?.alt ?? '',
    });
    const highlights = t(`${baseKey}.highlights`, {
      defaultValue: item.highlights,
      returnObjects: true,
    }) as string[];

    const ctaLabels = item.ctas.map((cta, index) =>
      t(`${baseKey}.ctas.${index}.label`, {
        defaultValue: cta.label,
      }),
    );

    return {
      title,
      summary,
      imageAlt,
      highlights,
      ctaLabels,
    };
  }, [item, t]);
};
