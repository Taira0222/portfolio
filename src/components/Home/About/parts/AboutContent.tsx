import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const aboutParagraphs = [
  'アメリカ在住のソフトウェアエンジニア志望、Tairaです。',
  '3年間の個別指導塾経営を通じて感じた“属人的な指導”の課題を解決するため、教育管理アプリ「Juku Cloud」を開発しました。',
  '教育×テクノロジーの力で、誰でも質の高い指導を実現できる仕組みを目指しています。',
];

type AboutContentProps = {
  variants: Variants;
};

export const AboutContent = ({ variants }: AboutContentProps) => {
  return (
    <motion.div variants={variants} className="flex flex-col gap-6 text-left">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          About Me
        </p>
        <h2
          id="about-heading"
          className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          起業を経験しているプロダクト志向のエンジニア
        </h2>
      </div>
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base md:leading-loose">
        {aboutParagraphs.map((paragraph, index) => (
          <p key={`paragraph-${index}`}>{paragraph}</p>
        ))}
      </div>
    </motion.div>
  );
};

