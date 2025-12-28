import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const defaultContent = {
  eyebrow: '私について',
  title: '簡単な自己紹介',
  paragraphs: [
    'アメリカ在住のソフトウェアエンジニア、Tairaです。',
    '大学では土木工学を専攻し、東京都の技術職として数年勤務した後、個別指導塾を起業しました。経営と指導の両面に携わる中で、テクノロジーで課題を解決できる可能性を強く感じ、プログラミングの学習を始めました。塾経営時代に感じた"属人的な指導"という課題を解決するため、個人プロジェクトとして教育管理アプリ「Juku Cloud」を開発しています。',
    '現在はカイテク株式会社で業務委託のエンジニアとして、主に介護業界向けのアプリ開発に従事しています。',
  ],
};

type AboutContentProps = {
  variants: Variants;
};

export const AboutContent = ({ variants }: AboutContentProps) => {
  const { t } = useTranslation();
  const eyebrow = t('about.eyebrow', { defaultValue: defaultContent.eyebrow });
  const title = t('about.title', { defaultValue: defaultContent.title });
  const paragraphs = t('about.paragraphs', {
    defaultValue: defaultContent.paragraphs,
    returnObjects: true,
  }) as string[];

  return (
    <motion.div variants={variants} className="flex flex-col gap-6 text-left">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          {eyebrow}
        </p>
        <h2
          id="about-heading"
          className="mt-4 text-balance break-words text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base md:leading-loose">
        {paragraphs.map((paragraph, index) => (
          <p key={`paragraph-${index}`}>{paragraph}</p>
        ))}
      </div>
    </motion.div>
  );
};
