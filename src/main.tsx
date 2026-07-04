import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/shippori-mincho/500.css';
import '@fontsource/shippori-mincho/700.css';
import './index.css';
import App from './App.tsx';
import '@/i18n.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
