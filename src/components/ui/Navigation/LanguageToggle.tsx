import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { languageFromPath, withLanguage } from '@/lib/language';
import { navigationMenuTriggerStyle } from './navigationMenuTriggerStyle';

type LanguageToggleProps = {
  className?: string;
  variant?: 'navigation' | 'default';
};

// 言語は URL で分けている（英語は /、日本語は /ja）。押すと、今の欄のままもう一方の URL へ移る
export const LanguageToggle = ({ className, variant = 'default' }: LanguageToggleProps) => {
  const { t } = useTranslation();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  const { nextPath, buttonLabel, ariaLabel } = useMemo(() => {
    const isJapanese = languageFromPath(pathname) === 'ja';
    return {
      nextPath: withLanguage(pathname, isJapanese ? 'en' : 'ja'),
      buttonLabel: isJapanese
        ? t('navigation.toggle.toEnglish', { defaultValue: 'English' })
        : t('navigation.toggle.toJapanese', { defaultValue: '日本語' }),
      ariaLabel: isJapanese
        ? t('navigation.toggle.switchToEnglish', { defaultValue: 'Switch to English' })
        : t('navigation.toggle.switchToJapanese', { defaultValue: '日本語に切り替える' }),
    };
  }, [pathname, t]);

  const handleToggle = useCallback(() => {
    navigate(`${nextPath}${hash}`);
  }, [navigate, nextPath, hash]);

  const baseClassName =
    variant === 'navigation'
      ? navigationMenuTriggerStyle()
      : 'rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(baseClassName, 'min-w-[88px]', className)}
    >
      {buttonLabel}
    </button>
  );
};
