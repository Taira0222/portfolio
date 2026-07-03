import jukuCloudSvg from '@/assets/portfolio/juku-cloud.svg';
import todoAppSvg from '@/assets/portfolio/todo-app.svg';
import qiitaLogoSvg from '@/assets/portfolio/Qiita.svg';
import gitHubLogoSvg from '@/assets/portfolio/GitHub.svg';
import portfolioPng from '@/assets/portfolio/portfolio.png';
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
      'GitHub Pages でホスティング',
      'codex を使用したAI駆動開発ワークフロー',
      'shadcn/ui・Framer MotionでモダンなUI/UX実現',
    ],
    ctas: [
      { label: 'Live', href: externalLinks.projects.portfolioSite.live, type: 'live' },
      { label: 'Repo', href: externalLinks.projects.portfolioSite.repo, type: 'repo' },
    ],
    image: {
      src: portfolioPng,
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
      { label: 'Live', href: externalLinks.projects.todoRails.live, type: 'live' },
      { label: 'Repo', href: externalLinks.projects.todoRails.repo, type: 'repo' },
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
      role: 'blog',
    },
    technologies: ['Qiita'],
    highlights: [
      '2024年10/6から記事投稿開始。',
      '毎日投稿1年間達成。累計Contributions 約700',
      '初心者ならではの視点で基礎的な内容を解説',
    ],
    ctas: [
      {
        label: 'Article (Profile)',
        href: externalLinks.projects.qiitaBlog.profile,
        type: 'article',
      },
      {
        label: '1年間毎日投稿達成',
        href: externalLinks.projects.qiitaBlog.dailyPostAchievement,
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
    ctas: [{ label: 'Repo', href: externalLinks.projects.contentPipeline.repo, type: 'repo' }],
    image: {
      src: gitHubLogoSvg,
      alt: 'GitHub ActionsでQiita & X自動投稿',
    },
  },
];

export const sortedPortfolioItems = [...portfolioItems];
