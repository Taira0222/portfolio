import { motion, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type BlogSectionHeaderProps = {
  variants: Variants;
};

export const BlogSectionHeader = ({ variants }: BlogSectionHeaderProps) => {
  const { t } = useTranslation();

  return (
    <motion.div className="flex flex-col items-center gap-4 text-center" variants={variants}>
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
        {t('blog.eyebrow')}
      </p>
      <h2
        id="blog-heading"
        className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
      >
        {t('blog.title')}
      </h2>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
        {t('blog.description')}
      </p>
    </motion.div>
  );
};
