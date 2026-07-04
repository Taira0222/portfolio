import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme';

const getStoredTheme = (): Theme | null => {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
};

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

/**
 * テーマ状態管理フック
 * - 初期値: localStorage の保存値。なければライト（OS設定には追従しない）
 * - 手動切替時は localStorage に保存する
 * - index.html の FOUC 防止スクリプトと同じ解決順序を持つ
 */
export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme() ?? 'light');

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // 保存できない場合もテーマの切替自体は行う
    }
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  return { theme, setTheme, toggleTheme };
};
