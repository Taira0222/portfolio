import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import GitHubLogoPng from '@/assets/footer/githubLogo.png';
import XLogoPng from '@/assets/footer/xLogo.png';
import QiitaLogoPng from '@/assets/footer/qiitaLogo.png';
import LinkedinLogoPng from '@/assets/footer/linkedInLogo.png';
import { externalLinks } from '@/constants/externalLinks';

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
  /** 黒いロゴ画像はダークモードで白反転して視認性を確保する */
  invertsInDark?: boolean;
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
  const { t } = useTranslation();
  return useMemo(() => buildSectionLinks(t), [t]);
};

export const snsLinks: SnsLink[] = [
  { label: 'GitHub', href: externalLinks.social.github, icon: GitHubLogoPng, invertsInDark: true },
  { label: 'X', href: externalLinks.social.x, icon: XLogoPng, invertsInDark: true },
  { label: 'Qiita', href: externalLinks.social.qiita, icon: QiitaLogoPng },
  {
    label: 'LinkedIn',
    href: externalLinks.social.linkedin,
    icon: LinkedinLogoPng,
  },
];
