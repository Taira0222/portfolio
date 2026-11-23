import { useEffect, useMemo } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home } from '@/features/home';
import { getSectionLinks } from '@/components/ui/Navigation/navigationLinks';
import { LANGUAGES, languageFromPath, withLanguage } from '@/lib/language';

/** パス（/ja かどうか）に合わせて表示の言語を切り替える */
const LanguageSync = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  useEffect(() => {
    const language = languageFromPath(pathname);
    if (i18n.resolvedLanguage !== language) void i18n.changeLanguage(language);
  }, [pathname, i18n]);
  return null;
};

export const Router = () => {
  const { t } = useTranslation();
  // 欄ごとの道（/about-me など）を、英語（頭なし）と日本語（/ja）の両方に作る
  const routes = useMemo(
    () =>
      LANGUAGES.flatMap((language) =>
        getSectionLinks(t, language).map(({ to, sectionId }) => ({ to, sectionId, language })),
      ),
    [t],
  );
  return (
    <>
      <LanguageSync />
      <Routes>
        {routes.map(({ to, sectionId }) => (
          <Route key={to} path={to} element={<Home initialSection={sectionId} />} />
        ))}
        <Route path="/ja/*" element={<Navigate to={withLanguage('/', 'ja')} replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};
