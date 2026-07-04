import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Theme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
  className?: string;
};

export const ThemeToggle = ({ theme, onToggle, className }: ThemeToggleProps) => {
  const { t } = useTranslation();
  const isDark = theme === 'dark';
  const label = isDark
    ? t('navigation.theme.toLight', { defaultValue: 'Switch to light mode' })
    : t('navigation.theme.toDark', { defaultValue: 'Switch to dark mode' });

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className={cn(
        'rounded-md p-1.5 text-foreground/80 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        className,
      )}
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
};
