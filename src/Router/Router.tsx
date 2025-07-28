import { Home } from '@/components/Home/Home';
import { Routes, Route } from 'react-router-dom';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
