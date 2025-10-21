import { motion, type Variants } from 'framer-motion';

type PortfolioSectionHeaderProps = {
  variants: Variants;
};

export const PortfolioSectionHeader = ({ variants }: PortfolioSectionHeaderProps) => {
  return (
    <motion.div className="flex flex-col items-center gap-4 text-center" variants={variants}>
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
        Portfolio
      </p>
      <h2
        id="portfolio-heading"
        className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
      >
        Recent Work & Writing
      </h2>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
        メインのプロダクトから記事・自動化まで、成果物をカテゴリ別にまとめました。
      </p>
    </motion.div>
  );
};
