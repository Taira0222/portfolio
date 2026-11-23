import spanishVocabJpg from '@/assets/portfolio/spanish-vocab.jpg';
import jukuCloudJpg from '@/assets/portfolio/juku-cloud.jpg';
import gitHubLogoSvg from '@/assets/portfolio/GitHub.svg';
import portfolioJpg from '@/assets/portfolio/portfolio.jpg';
import { externalLinks } from '@/constants/externalLinks';
export type PortfolioCategory = 'Web App' | 'Automation' | 'Article';

export type PortfolioCtaType = 'live' | 'repo' | 'article';

export type PortfolioCta = {
  label: string;
  href: string;
  type: PortfolioCtaType;
};

export type PortfolioImage = {
  src: string;
  alt: string;
};

/** 詳しい画面の「仕組み」に並べる箱（技術の名前と一言）。名前は訳さない */
export type PortfolioFlowStep = {
  name: string;
  note: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  featured?: boolean;
  summary: string;
  meta: {
    timeline: string;
    role: string;
  };
  technologies: string[];
  highlights: [string, string, string];
  ctas: PortfolioCta[];
  image: PortfolioImage;
  flow: PortfolioFlowStep[];
  /** 構成図の下に添える一言（訳す。キーは portfolio.items.<id>.flowNote） */
  flowNote?: string;
};

// 文言の本体は locales/*/translation.json（portfolio.items.<id>）。ここの日本語はキーが無いときの予備
export const portfolioItems: PortfolioItem[] = [
  {
    id: 'juku-cloud',
    title: 'Juku Cloud',
    category: 'Web App',
    featured: true,
    summary: '個別指導塾の「特性共有・授業引継ぎ」を標準化するSaaS。',
    meta: {
      timeline: '2025',
      role: 'Founder・Full-stack・DevOps',
    },
    technologies: ['Rails', 'React', 'TypeScript', 'PostgreSQL', 'AWS', 'GitHub Actions'],
    highlights: [
      '生徒特性管理と授業引継ぎをクラウドで管理',
      'ECS Fargate + RDS + CloudFrontの本番構成',
      'CI/CDでテスト〜デプロイ自動化',
    ],
    ctas: [
      {
        label: 'Repo',
        href: externalLinks.projects.jukuCloud.repo,
        type: 'repo',
      },
      {
        label: 'Repo (Frontend)',
        href: externalLinks.projects.jukuCloud.repoFrontend,
        type: 'repo',
      },
      {
        label: 'Repo (Backend)',
        href: externalLinks.projects.jukuCloud.repoBackend,
        type: 'repo',
      },
    ],
    image: {
      src: jukuCloudJpg,
      alt: 'Juku Cloud｜生徒一人一人の特性をクラウドで管理できる個別指導塾向けアプリ',
    },
    flow: [
      { name: 'CloudFront', note: 'edge' },
      { name: 'ECS Fargate', note: 'Rails API' },
      { name: 'RDS', note: 'PostgreSQL' },
    ],
    flowNote: 'テストとデプロイは GitHub Actions',
  },
  {
    id: 'spanish-vocab',
    title: 'スペイン語の単語帳',
    category: 'Web App',
    summary: 'Duolingo では足りない「自分から言う」練習のために作った、1 日 5 分の単語帳。',
    meta: {
      timeline: '2026',
      role: 'Solo · Full-stack',
    },
    technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker'],
    highlights: [
      '復習の間隔は FSRS（Anki と同じ方式）',
      '間違えたときの説明は LLM を使わず、単語帳と活用の表から作る（すぐ出て、間違わない）',
      'ローカル LLM は新しい単語の下書きだけ。足す前に自分で見る',
    ],
    ctas: [],
    image: {
      src: spanishVocabJpg,
      alt: '「通り」を見て、la calle を自分で打つ',
    },
    flow: [
      { name: 'React', note: 'web app' },
      { name: 'FastAPI', note: 'API' },
      { name: 'PostgreSQL', note: 'cards · reviews' },
    ],
    flowNote: 'ローカル LLM は下書きだけ（足す前に自分で見る）',
  },
  {
    id: 'qiita-x-automation',
    title: 'GitHub ActionsでQiita & X自動投稿',
    category: 'Automation',
    summary:
      'GitHub Actionsのcronを用いて、Qiita記事とX（旧Twitter）へ定期自動投稿するワークフロー。',
    meta: {
      timeline: '2025',
      role: 'DevOps・Automation',
    },
    technologies: ['GitHub Actions', 'Ruby'],
    highlights: [
      'スケジュール/手動トリガー両対応',
      'Qiita の毎日投稿を 1 年続けた（Contributions 約 700）',
      'Qiita APIとX APIの連携実装',
    ],
    ctas: [{ label: 'Repo', href: externalLinks.projects.contentPipeline.repo, type: 'repo' }],
    image: {
      src: gitHubLogoSvg,
      alt: 'GitHub ActionsでQiita & X自動投稿',
    },
    flow: [
      { name: 'Cron', note: 'schedule' },
      { name: 'GitHub Actions', note: 'workflow' },
      { name: 'Qiita API · X API', note: 'post' },
    ],
  },
  {
    id: 'portfolio-site',
    title: 'Portfolioサイト',
    category: 'Web App',
    summary: 'このサイト。静的なページで軽く、英語と日本語を別の URL で出す。',
    meta: {
      timeline: '2025–2026',
      role: 'Frontend・Design',
    },
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion', 'i18next'],
    highlights: [
      '英語は /、日本語は /ja/。リンクのプレビューもそれぞれの言語で',
      '画像を 36MB から 1MB 未満に',
      'GitHub Actions で公開。外部の部品は commit の ID で固定',
    ],
    ctas: [
      { label: 'Live', href: externalLinks.projects.portfolioSite.live, type: 'live' },
      { label: 'Repo', href: externalLinks.projects.portfolioSite.repo, type: 'repo' },
    ],
    image: {
      src: portfolioJpg,
      alt: 'Tairaのポートフォリオサイト',
    },
    flow: [
      { name: 'React + Vite', note: 'static build' },
      { name: 'GitHub Actions', note: 'pinned actions' },
      { name: 'GitHub Pages', note: 'hosting' },
    ],
  },
];

export const sortedPortfolioItems = [...portfolioItems];
