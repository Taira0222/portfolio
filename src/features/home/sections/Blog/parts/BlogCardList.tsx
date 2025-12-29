import { cubicBezier, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import type { BlogCardListProps } from '../types';
import { BlogCard } from './BlogCard';

const cardListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  },
};

export const BlogCardList = ({ articles, isLoading, error }: BlogCardListProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground md:text-base">{t('blog.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-destructive md:text-base">{t('blog.error')}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground md:text-base">{t('blog.noArticles')}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={cardListVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {articles.map((article) => (
        <motion.div key={article.id} variants={cardVariants} className="h-full">
          <BlogCard article={article} />
        </motion.div>
      ))}
    </motion.div>
  );
};
