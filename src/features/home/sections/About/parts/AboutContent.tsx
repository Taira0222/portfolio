import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const aboutParagraphs = [
  'アメリカ在住のソフトウェアエンジニア志望、Tairaです。',
  '大学では土木工学を専攻し、東京都の技術職として数年勤務した後、個別指導塾を起業しました。',
  '教育現場で経営と指導の両面に携わる中で、「テクノロジーで想いを形にできる」と強く感じ、プログラミングの学習を始めました。',
  '現在はWeb開発を中心にスキルを磨きながら、3年間の塾経営で感じた“属人的な指導”という課題を解決するため、教育管理アプリ「Juku Cloud」を開発しています',
];

type AboutContentProps = {
  variants: Variants;
};

export const AboutContent = ({ variants }: AboutContentProps) => {
  return (
    <motion.div variants={variants} className="flex flex-col gap-6 text-left">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          私について
        </p>
        <h2
          id="about-heading"
          className="mt-4 text-balance break-words text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          起業を通じてプロダクトづくりの面白さを実感したエンジニア
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
