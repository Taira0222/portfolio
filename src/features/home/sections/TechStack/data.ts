import {
  CloudCog,
  Database,
  MonitorSmartphone,
  PieChart,
  TestTube,
  Waves,
  Workflow,
  Box,
  FlaskRound,
  FlaskConical,
  ServerCog,
} from 'lucide-react';

import awsIcon from '@/assets/skill-icons/aws-dark.svg';
import dockerIcon from '@/assets/skill-icons/docker.svg';
import githubActionsIcon from '@/assets/skill-icons/github-actions-dark.svg';
import postgresqlIcon from '@/assets/skill-icons/postgresql-dark.svg';
import railsIcon from '@/assets/skill-icons/rails.svg';
import reactIcon from '@/assets/skill-icons/react-dark.svg';
import rubyIcon from '@/assets/skill-icons/ruby.svg';
import typescriptIcon from '@/assets/skill-icons/typescript.svg';
import viteIcon from '@/assets/skill-icons/vite-dark.svg';
import vitestIcon from '@/assets/skill-icons/vitest-dark.svg';

import type { SkillIconSlug, TechStackCategory } from './types';

export const skillIcons: Record<SkillIconSlug, { src: string; alt: string }> = {
  react: { src: reactIcon, alt: 'React logo' },
  vite: { src: viteIcon, alt: 'Vite logo' },
  typescript: { src: typescriptIcon, alt: 'TypeScript logo' },
  ruby: { src: rubyIcon, alt: 'Ruby logo' },
  rails: { src: railsIcon, alt: 'Rails logo' },
  postgresql: { src: postgresqlIcon, alt: 'PostgreSQL logo' },
  docker: { src: dockerIcon, alt: 'Docker logo' },
  githubActions: { src: githubActionsIcon, alt: 'GitHub Actions logo' },
  aws: { src: awsIcon, alt: 'AWS logo' },
  vitest: { src: vitestIcon, alt: 'Vitest logo' },
};

const awsBadge = 'border-[#ff9900]/40 bg-[#ff9900]/10 text-[#b36600] dark:text-[#ffbb66]';

export const techStack: TechStackCategory[] = [
  {
    title: 'フロントエンド',
    icon: MonitorSmartphone,
    items: [
      {
        name: 'React',
        icon: 'react',
        badgeClassName: 'border-[#61dafb]/40 bg-[#61dafb]/10 text-[#0b6fa4] dark:text-[#61dafb]'
      },
      {
        name: 'Vite',
        icon: 'vite',
        badgeClassName: 'border-[#646cff]/40 bg-[#646cff]/10 text-[#3733ff] dark:text-[#b4b7ff]'
      },
      {
        name: 'TypeScript',
        icon: 'typescript',
        badgeClassName: 'border-[#3178c6]/40 bg-[#3178c6]/10 text-[#1f5fa8] dark:text-[#7bb4f3]'
      },
    ],
  },
  {
    title: 'バックエンド',
    icon: ServerCog,
    items: [
      {
        name: 'Ruby',
        icon: 'ruby',
        badgeClassName: 'border-[#cc342d]/40 bg-[#cc342d]/12 text-[#8f201b] dark:text-[#f36f68]'
      },
      {
        name: 'Ruby on Rails (API)',
        icon: 'rails',
        badgeClassName: 'border-[#b22222]/40 bg-[#b22222]/12 text-[#7f1515] dark:text-[#ff8c8c]'
      },
    ],
  },
  {
    title: 'データベース',
    icon: Database,
    items: [
      {
        name: 'PostgreSQL',
        icon: 'postgresql',
        badgeClassName: 'border-[#336791]/40 bg-[#336791]/10 text-[#1f485f] dark:text-[#6fa8d8]'
      },
    ],
  },
  {
    title: 'CI/CD',
    icon: Workflow,
    items: [
      {
        name: 'GitHub Actions',
        icon: 'githubActions',
        badgeClassName: 'border-[#2088ff]/40 bg-[#2088ff]/12 text-[#1558a6] dark:text-[#7ab4ff]'
      },
    ],
  },
  {
    title: 'インフラ',
    icon: CloudCog,
    items: [
      { name: 'AWS', icon: 'aws', badgeClassName: awsBadge },
      {
        name: 'Docker',
        icon: 'docker',
        badgeClassName: 'border-[#0db7ed]/40 bg-[#0db7ed]/10 text-[#0a6c8a] dark:text-[#6ad9ff]'
      },
      {
        name: 'Devcontainer',
        customIcon: Box,
        iconClassName: 'text-[#1f9cf0]',
        badgeClassName: 'border-[#1f9cf0]/40 bg-[#1f9cf0]/12 text-[#1464a9] dark:text-[#7ac4ff]'
      },
    ],
  },
  {
    title: 'テスト',
    icon: TestTube,
    items: [
      {
        name: 'Vitest',
        icon: 'vitest',
        badgeClassName: 'border-[#4ade80]/40 bg-[#4ade80]/12 text-[#15803d] dark:text-[#86efac]'
      },
      {
        name: 'Testing Library',
        customIcon: FlaskRound,
        iconClassName: 'text-[#ea580c]',
        badgeClassName: 'border-[#f97316]/40 bg-[#f97316]/12 text-[#c2410c] dark:text-[#ffb26a]'
      },
      {
        name: 'MSW',
        customIcon: Waves,
        iconClassName: 'text-[#fb923c]',
        badgeClassName: 'border-[#fb923c]/40 bg-[#fb923c]/12 text-[#c25a10] dark:text-[#fdba74]'
      },
      {
        name: 'RSpec',
        customIcon: FlaskConical,
        iconClassName: 'text-[#c91d3f]',
        badgeClassName: 'border-[#c91d3f]/40 bg-[#c91d3f]/12 text-[#89122a] dark:text-[#f57490]'
      },
      {
        name: 'SimpleCov',
        customIcon: PieChart,
        iconClassName: 'text-[#14b8a6]',
        badgeClassName: 'border-[#2dd4bf]/40 bg-[#2dd4bf]/12 text-[#0f766e] dark:text-[#5eead4]'
      },
    ],
  },
];
