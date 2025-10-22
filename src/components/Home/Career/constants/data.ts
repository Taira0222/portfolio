import type { CareerMilestone } from './types';
import waterPng from '@/assets/career/water.png';
import jukuPng from '@/assets/career/juku.png';
import secondJukuPng from '@/assets/career/second-juku.png';
import pitchPng from '@/assets/career/pitch.png';
import onlinePlatformPng from '@/assets/career/online-platform.png';
import quitJobPng from '@/assets/career/quit-job.png';
import moveToUsPng from '@/assets/career/move-to-us.png';
import programmingPng from '@/assets/career/programming.png';
import jukuCloudPng from '@/assets/career/juku-cloud.png';

export const careerTimeline: CareerMilestone[] = [
  {
    id: 'civil-engineer',
    date: '2019年4月',
    title: '東京都水道局に入社',
    description:
      '首都大学東京（現・東京都立大学）を卒業後、都市防災事業に携わるため東京都の技術職として入庁。主に直径50cmほどの大口径水道管の耐震工事などに従事しました。',
    image: {
      src: waterPng,
      alt: '耐震の水道管のイメージ',
    },
  },
  {
    id: 'change-career-to-education',
    date: '2020年12月',
    title: '個別指導塾を立ち上げる',
    description:
      '公務員として安定した環境に身を置く中で、現状維持的な働き方に疑問を感じ退職。自身の特性から教育分野での起業が最も適していると考え、神奈川県横浜市で2名体制の個別指導塾を立ち上げました。',
    image: {
      src: jukuPng,
      alt: '小さな学習塾の教室イメージ',
    },
  },
  {
    id: 'expand-business',
    date: '2022年5月',
    title: '生徒増加により2校舎目を開設',
    description: '開設から1年半で生徒数が50名を超え、事業拡大のため2校舎目を開設しました。',
    image: {
      src: secondJukuPng,
      alt: '新規校舎のイメージ写真',
    },
  },
  {
    id: 'selected-as-entrepreneur-program',
    date: '2023年10月',
    title: '起業家支援プログラムに選出',
    description:
      '経済産業省主催の「始動 Next Innovator 2023」に選出。起業家としての基礎を学び、シリコンバレーの圧倒的なスピード感と、他の起業家たちの高い志に強い刺激を受けました。',
    image: {
      src: pitchPng,
      alt: '始動 Next Innovator 2023 のピッチイベントの様子',
    },
  },
  {
    id: 'launch-video-platform',
    date: '2023年12月',
    title: '過去問解説動画プラットフォームをリリース',
    description:
      'ノーコードツールを活用し、過去問の解説動画を視聴できる学習プラットフォームを開発・リリース。この経験を通じて、「技術があれば想いを形にできる」と実感しました。',
    image: {
      src: onlinePlatformPng,
      alt: 'オンライン学習プラットフォームのスクリーンショット',
    },
  },
  {
    id: 'quit-juku',
    date: '2024年4月',
    title: '個別指導塾を退職',
    description:
      '妻の仕事の都合でアメリカへ移住することとなり、私の校舎を閉校しました。学習指導だけでなく、経営面でも多くの学びがあり、貴重な経験となりました。',
    image: {
      src: quitJobPng,
      alt: '事業を終えるイメージ',
    },
  },
  {
    id: 'move-to-us',
    date: '2024年7月',
    title: 'アメリカへ移住',
    description:
      '海外旅行すらほとんど経験がなく、初めての海外生活に不安もありましたが、新しい環境での生活を楽しんでいます。',
    image: {
      src: moveToUsPng,
      alt: '飛行機の窓から見下ろすロサンゼルスの街並み',
    },
  },
  {
    id: 'start-learning-programming',
    date: '2024年8月',
    title: 'プログラミング学習を開始',
    description:
      '生活が落ち着いたので、プログラミングの学習を開始。最初は独学で学んで挫折したらスクールに通うつもりでしたが、独学での学習を継続できました。',
    image: {
      src: programmingPng,
      alt: 'コーディングを連想する画像',
    },
  },
  {
    id: 'launch-juku-cloud',
    date: '2025年10月',
    title: 'Juku Cloud(MVP)をリリース',
    description:
      '教育現場で感じた「属人的な指導」という課題を解決するため、生徒の特性をクラウド上で管理・共有できる教育管理アプリ「Juku Cloud（MVP）」を開発・リリースしました。',
    image: {
      src: jukuCloudPng,
      alt: 'Juku Cloud の宣材写真',
    },
  },
];
