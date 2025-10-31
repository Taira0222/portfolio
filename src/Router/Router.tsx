import { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '@/features/home';
import { getSectionLinks } from '@/components/ui/Navigation/navigationLinks';
import { useTranslation } from 'react-i18next';

export const Router = () => {
  const { t, i18n } = useTranslation();
  const sectionLinks = useMemo(() => getSectionLinks(t), [t, i18n.language]);
  const homeLink =
    sectionLinks.find((link) => link.sectionId === 'top') ?? sectionLinks[0];
  const homePath = homeLink?.to || '/';
  const additionalLinks = sectionLinks.filter((link) => link !== homeLink);
  const shouldRedirectRoot = homePath !== '/';
  return (
    <Routes>
      {shouldRedirectRoot && <Route path="/" element={<Navigate to={homePath} replace />} />}
      <Route path={homePath} element={<Home initialSection="top" />} />
      {shouldRedirectRoot && (
        <Route path={`${homePath}/`} element={<Navigate to={homePath} replace />} />
      )}
      {additionalLinks.map(({ to, sectionId }) => (
        <Route key={to} path={to} element={<Home initialSection={sectionId} />} />
      ))}
      <Route path="*" element={<Navigate to={homePath} replace />} />
    </Routes>
  );
};
