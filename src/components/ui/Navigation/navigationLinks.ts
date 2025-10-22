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

const sectionDefinitions: Array<Omit<SectionLink, 'to' | 'fullPath'> & { slug: string }> = [
  { label: 'ホーム', slug: '/', sectionId: 'top' },
  { label: 'わたしについて', slug: '/about-me', sectionId: 'about' },
  { label: '技術スタック', slug: '/tech-stack', sectionId: 'tech-stack' },
  { label: 'ポートフォリオ一覧', slug: '/projects', sectionId: 'portfolio' },
  { label: '今までのキャリア', slug: '/career', sectionId: 'career' },
];

export const sectionLinks: SectionLink[] = sectionDefinitions.map(({ slug, ...rest }) => ({
  ...rest,
  to: slug,
  fullPath: buildFullPath(slug),
}));

export const snsLinks: SnsLink[] = [
  { label: 'GitHub', href: 'https://github.com/Taira0222', icon: GitHubLogoPng },
  { label: 'X', href: 'https://x.com/Taira_En0222', icon: XLogoPng },
  { label: 'Qiita', href: 'https://qiita.com/taira0222', icon: QiitaLogoPng },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/taira-aikawa-engineer/',
    icon: LinkedinLogoPng,
  },
];
