import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// 文言の本体は locales/*/translation.json。ここはキーが無いときの予備
const defaultProfile = [
  { label: '今', value: 'フルスタックエンジニア（業務委託）' },
  { label: '拠点', value: 'アメリカ（フルリモート）' },
  { label: '得意', value: '性能・セキュリティ・信頼性' },
];

const defaultContent = {
  eyebrow: 'About the Owner',
  title: '自己紹介',
  paragraphs: [
    'アメリカ在住のフルスタックエンジニア、Taira です。',
    '日本の会社でフルリモートで働き、全国の介護施設で使われている医療・介護のサービスを、Web・アプリ・AWS まで通して作っています。速く、安全で、止まらないものにすることを大事にしています。',
    '仕事の外では、AI エージェントと小さな家のサーバーで自分の道具を作っています。毎日使っているスペイン語の単語帳もその一つです。',
    'エンジニアになる前は、個別指導塾を共同で立ち上げ、生徒 56 人まで育てました。使う人と事業の両方を考えて作るのは、そのときの経験からです。',
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
  const profile = t('about.profile', {
    defaultValue: defaultProfile,
    returnObjects: true,
  }) as typeof defaultProfile;

  return (
    <motion.div variants={variants} className="flex flex-col gap-6 text-left">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brass">{eyebrow}</p>
        <h2
          id="about-heading"
          className="mt-4 text-balance break-words font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base md:leading-loose">
        {paragraphs.map((paragraph, index) => (
          <p key={`paragraph-${index}`}>{paragraph}</p>
        ))}
      </div>
      {/* テイスティングノート風のプロフィール（点線リーダーはメニューと共通の意匠） */}
      <ul className="mt-2 flex flex-col gap-2.5 border-t border-brass/30 pt-6">
        {profile.map(({ label, value }) => (
          <li key={label} className="flex items-baseline gap-3">
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] text-brass">
              {label}
            </span>
            <span
              className="min-w-[16px] flex-1 translate-y-[-3px] border-b border-dotted border-border/60"
              aria-hidden="true"
            />
            <span className="whitespace-nowrap text-sm text-foreground">{value}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
