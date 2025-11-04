import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import GitHubLogoPng from '@/assets/footer/githubLogo.png';
import XLogoPng from '@/assets/footer/xLogo.png';
import QiitaLogoPng from '@/assets/footer/qiitaLogo.png';
import LinkedinLogoPng from '@/assets/footer/linkedInLogo.png';

export type SectionLink = {
  label: string;
  to: string;
  fullPath: string;
  sectionId: string;
};

export type SnsLink = {
  label: string;
  href: string;
  icon: string;
};

const buildFullPath = (slug: string) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  if (!slug || slug === '/') {
    return baseUrl;
  }
  const normalizedBase = (baseUrl || '').replace(/\/+$/, '');
  const basePath = normalizedBase === '' || normalizedBase === '/' ? '' : normalizedBase;
  return `${basePath}${slug}`;
};

type SectionDefinition = {
  labelKey: string;
  defaultLabel: string;
  slug: string;
  sectionId: string;
};

const sectionDefinitions: SectionDefinition[] = [
  { labelKey: 'navigation.sections.home', defaultLabel: 'ホーム', slug: '/', sectionId: 'top' },
  {
    labelKey: 'navigation.sections.about',
    defaultLabel: 'わたしについて',
    slug: '/about-me',
    sectionId: 'about',
  },
  {
    labelKey: 'navigation.sections.techStack',
    defaultLabel: '技術スタック',
    slug: '/tech-stack',
    sectionId: 'tech-stack',
  },
  {
    labelKey: 'navigation.sections.portfolio',
    defaultLabel: 'ポートフォリオ一覧',
    slug: '/projects',
    sectionId: 'portfolio',
  },
  {
    labelKey: 'navigation.sections.career',
    defaultLabel: '今までのキャリア',
    slug: '/career',
    sectionId: 'career',
  },
];

const buildSectionLinks = (t: TFunction): SectionLink[] =>
  sectionDefinitions.map(({ labelKey, defaultLabel, slug, sectionId }) => ({
    label: t(labelKey, { defaultValue: defaultLabel }),
    to: slug,
    fullPath: buildFullPath(slug),
    sectionId,
  }));

export const getSectionLinks = (t: TFunction): SectionLink[] => buildSectionLinks(t);

export const useSectionLinks = (): SectionLink[] => {
  const { t, i18n } = useTranslation();
  return useMemo(() => buildSectionLinks(t), [t, i18n.language]);
};

export const snsLinks: SnsLink[] = [
  { label: 'GitHub', href: 'https://github.com/Taira0222/juku-cloud', icon: GitHubLogoPng },
  { label: 'X', href: 'https://x.com/Taira_En0222', icon: XLogoPng },
  { label: 'Qiita', href: 'https://qiita.com/taira0222', icon: QiitaLogoPng },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/taira-aikawa-engineer/',
    icon: LinkedinLogoPng,
  },
];
