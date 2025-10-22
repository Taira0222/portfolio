import { ArrowUp } from 'lucide-react';

import GitHubLogoPng from '@/assets/footer/githubLogo.png';
import QiitaLogoPng from '@/assets/footer/qiitaLogo.png';
import LinkedinLogoPng from '@/assets/footer/linkedInLogo.png';
import XLogoPng from '@/assets/footer/xLogo.png';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';

type SocialLink = {
  href: string;
  label: string;
  icon: string;
};

const socialLinks: SocialLink[] = [
  { href: 'https://github.com/Taira0222', label: 'GitHub', icon: GitHubLogoPng },
  { href: 'https://x.com/Taira_En0222', label: 'X', icon: XLogoPng },
  { href: 'https://qiita.com/taira0222', label: 'Qiita', icon: QiitaLogoPng },
  {
    href: 'https://www.linkedin.com/in/taira-aikawa-engineer/',
    label: 'LinkedIn',
    icon: LinkedinLogoPng,
  },
];

export const Footer = () => {
  return (
    <>
      <footer className="border-t border-border/40 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="container mx-auto flex flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
              Stay Connected
            </p>
            <p className="text-sm text-muted-foreground md:text-base">
              © 2025 Taira. All rights reserved.
            </p>
          </div>

          <nav
            aria-label="Social media"
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {socialLinks.map(({ href, label, icon }, index) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-background/70 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-primary/30"
              >
                <img
                  src={icon}
                  alt={`${label} logo`}
                  className="h-5 w-5 opacity-80 transition group-hover:opacity-100"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </nav>
        </div>
      </footer>
      <BackToTopFloatingButton />
    </>
  );
};

const BackToTopFloatingButton = () => {
  const isVisible = useScrollTrigger({ threshold: 240 });
  const handleBackToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleBackToTop}
      aria-label="Back to top"
      className={`fixed bottom-24 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/40 bg-primary text-background shadow-lg transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:right-10 md:bottom-28 lg:bottom-35 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
};
