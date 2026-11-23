import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import type { TFunction } from 'i18next';
import GitHubLogoPng from '@/assets/footer/githubLogo.png';
import XLogoPng from '@/assets/footer/xLogo.png';
import QiitaLogoPng from '@/assets/footer/qiitaLogo.png';
import LinkedinLogoPng from '@/assets/footer/linkedInLogo.png';
import { externalLinks } from '@/constants/externalLinks';
import { type Language, languageFromPath, withLanguage } from '@/lib/language';

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
  const baseUrl = import.meta.env.BASE_URL;
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
];

// 道は言語の頭付き（日本語は /ja/about-me など。英語は頭なし）
const buildSectionLinks = (t: TFunction, language: Language): SectionLink[] =>
  sectionDefinitions.map(({ labelKey, defaultLabel, slug, sectionId }) => {
    const to = withLanguage(slug, language);
    return {
      label: t(labelKey, { defaultValue: defaultLabel }),
      to,
      fullPath: buildFullPath(to),
      sectionId,
    };
  });

export const getSectionLinks = (t: TFunction, language: Language): SectionLink[] =>
  buildSectionLinks(t, language);

export const useSectionLinks = (): SectionLink[] => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const language = languageFromPath(pathname);
  return useMemo(() => buildSectionLinks(t, language), [t, language]);
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
