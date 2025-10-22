import jukuCloudSvg from '@/assets/portfolio/juku-cloud.svg';
import todoAppSvg from '@/assets/portfolio/todo-app.svg';
import qiitaLogoSvg from '@/assets/portfolio/Qiita.svg';
import gitHubLogoSvg from '@/assets/portfolio/GitHub.svg';
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
};

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
      { label: 'Live', href: 'https://www.juku-cloud.com', type: 'live' },
      {
        label: 'Repo (Frontend)',
        href: 'https://github.com/taira0222/juku-cloud-frontend',
        type: 'repo',
      },
      {
        label: 'Repo (Backend)',
        href: 'https://github.com/taira0222/juku-cloud-backend',
        type: 'repo',
      },
    ],
    image: {
      src: jukuCloudSvg,
      alt: 'Juku Cloud｜生徒一人一人の特性をクラウドで管理できる個別指導塾向けアプリ',
    },
  },
  {
    id: 'portfolio-site',
    title: 'Portfolioサイト',
    category: 'Web App',
    summary: 'AI駆動開発ワークフローで構築した個人ポートフォリオサイト。',
    meta: {
      timeline: '2025',
      role: 'Frontend・Design',
    },
    technologies: ['React', 'TypeScript', 'Vite', 'shadcn/ui', 'Tailwind', 'Framer Motion'],
    highlights: [
      'codex を使用したAI駆動開発ワークフロー',
      'OGP・PWA含むメタ/表示最適化',
      '画像最適化とLCP改善',
    ],
    ctas: [
      { label: 'Live', href: 'https://taira0222.github.io/portfolio/', type: 'live' },
      { label: 'Repo', href: 'https://github.com/Taira0222/taira0222.github.io', type: 'repo' },
    ],
    image: {
      src: 'https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1600&q=80&ar=16:9',
      alt: 'Tairaのポートフォリオサイト',
    },
  },
  {
    id: 'todo-rails',
    title: 'Todo アプリ（Rails）',
    category: 'Web App',
    summary: '認証・CRUD・Minitestを最小構成でまとめたRails学習用ベースライン。',
    meta: {
      timeline: '2024',
      role: 'Backend・Full-stack',
    },
    technologies: ['Rails', 'PostgreSQL', 'RSpec', 'Docker'],
    highlights: [
      'Devise認証とCRUDの基本実装',
      'Minitestによる網羅的なテストカバレッジ',
      'Google OAuthによる外部認証',
    ],
    ctas: [
      { label: 'Live', href: 'https://todo-rails-application.onrender.com/', type: 'live' },
      { label: 'Repo', href: 'https://github.com/Taira0222/todo-rails-application', type: 'repo' },
    ],
    image: {
      src: todoAppSvg,
      alt: 'Rails で実装された Todo アプリ',
    },
  },
  {
    id: 'qiita-blog',
    title: 'Qiita ブログ',
    category: 'Article',
    summary: 'Ruby・Rails・React・AWS・DevOpsの学習ノートやノウハウを初心者の視点から発信。',
    meta: {
      timeline: '2024–2025',
      role: 'Author',
    },
    technologies: ['Qiita'],
    highlights: [
      '2024年10/6から記事投稿開始。',
      '毎日投稿1年間達成。累計Contributions 約700',
      '初心者ならではの視点で基礎的な内容を解説',
    ],
    ctas: [
      { label: 'Article (Profile)', href: 'https://qiita.com/taira0222', type: 'article' },
      {
        label: '1年間毎日投稿達成',
        href: 'https://qiita.com/Taira0222/items/c8ce0989bb048941e0ef',
        type: 'article',
      },
    ],
    image: {
      src: qiitaLogoSvg,
      alt: 'Qiita 技術ブログ',
    },
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
    technologies: ['GitHub Actions', 'ruby'],
    highlights: [
      'スケジュール/手動トリガー両対応',
      'サーバーのメンテナンス中でも、UIを介さず自動投稿可能',
      'Qiita APIとX APIの連携実装',
    ],
    ctas: [
      { label: 'Repo', href: 'https://github.com/Taira0222/qiita-content', type: 'repo' },
      {
        label: 'Article',
        href: 'https://qiita.com/Taira0222/items/857177b14f469040d874',
        type: 'article',
      },
    ],
    image: {
      src: gitHubLogoSvg,
      alt: 'GitHub ActionsでQiita & X自動投稿',
    },
  },
];

export const sortedPortfolioItems = [...portfolioItems];
