import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '@/features/home';
import { sectionLinks } from '@/components/ui/Navigation/navigationLinks';

export const Router = () => {
  const homeLink = sectionLinks[0];
  const additionalLinks = sectionLinks.slice(1);
  const homePath = homeLink.to || '/';
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
