import { useEffect, useState } from 'react';
import { MobileHamburgerMenu } from '../ui/Navigation/MobileHamburgerMenu';
import { NavigationMenuHeader } from '../ui/Navigation/NavigationMenuHeader';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export const Header = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [showMobileBg, setShowMobileBg] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const SCROLL_THRESHOLD = 100; // スクロールの閾値

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // デスクトップ用の動作（md以上）と モバイル用の背景色変更（md未満）
      // 2スクロール相当（SCROLL_THRESHOLD px）下げたら表示
      if (currentScrollY > SCROLL_THRESHOLD) {
        setShowHeader(true);
        setShowMobileBg(true);
      } else {
        setShowHeader(false);
        setShowMobileBg(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* デスクトップナビゲーション（md以上） */}
      <div
        className={cn(
          'hidden md:flex items-center justify-end gap-2 py-4 px-8 fixed top-0 left-0 right-0 z-50 transition-transform duration-500 bg-background/95 backdrop-blur border-b border-border/60',
          showHeader ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <NavigationMenuHeader />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      {/* モバイルナビゲーション（md未満） */}
      <div
        className={cn(
          'md:hidden flex items-center justify-end gap-1 p-4 fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
          showMobileBg ? 'bg-background/95 backdrop-blur shadow-md' : 'bg-transparent',
        )}
      >
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <MobileHamburgerMenu />
      </div>
    </>
  );
};
