import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { navigationMenuTriggerStyle } from './navigationMenuTriggerStyle';

type LanguageToggleProps = {
  className?: string;
  variant?: 'navigation' | 'default';
};

const normalizeLanguageCode = (language: string | undefined) => {
  if (!language) return '';
  return language.split('-')[0]?.toLowerCase() ?? '';
};

export const LanguageToggle = ({ className, variant = 'default' }: LanguageToggleProps) => {
  const { t, i18n } = useTranslation();

  const { currentLanguage, nextLanguage, buttonLabel, ariaLabel } = useMemo(() => {
    const resolved = normalizeLanguageCode(i18n.resolvedLanguage ?? i18n.language);
    const isJapanese = resolved === 'ja';
    const next = isJapanese ? 'en' : 'ja';

    return {
      currentLanguage: resolved,
      nextLanguage: next,
      buttonLabel: isJapanese
        ? t('navigation.toggle.toEnglish', { defaultValue: 'English' })
        : t('navigation.toggle.toJapanese', { defaultValue: '日本語' }),
      ariaLabel: isJapanese
        ? t('navigation.toggle.switchToEnglish', { defaultValue: 'Switch to English' })
        : t('navigation.toggle.switchToJapanese', { defaultValue: '日本語に切り替える' }),
    };
  }, [i18n.language, i18n.resolvedLanguage, t]);

  const handleToggle = useCallback(() => {
    if (!nextLanguage || currentLanguage === nextLanguage) {
      return;
    }

    void i18n.changeLanguage(nextLanguage);
  }, [currentLanguage, i18n, nextLanguage]);

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
