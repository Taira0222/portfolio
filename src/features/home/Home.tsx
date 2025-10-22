import { useEffect } from 'react';
import { Footer } from '@/components/Common/Footer';
import { Header } from '@/components/Common/Header';
import { About } from './sections/About';
import { Career } from './sections/Career';
import { Hero } from './sections/Hero';
import { Portfolio } from './sections/Portfolio';
import { TechStack } from './sections/TechStack';

type HomeProps = {
  initialSection?: string;
};

export const Home = ({ initialSection = 'top' }: HomeProps) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scrollToSection = () => {
      const targetElement = document.getElementById(initialSection);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: initialSection === 'top' ? 'auto' : 'smooth',
          block: 'start',
        });
      } else if (initialSection === 'top') {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };

    const timeoutId = window.setTimeout(scrollToSection, 0);
    return () => window.clearTimeout(timeoutId);
  }, [initialSection]);

  return (
    <div id="top" className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <TechStack />
        <Portfolio />
        <Career />
      </main>
      <Footer />
    </div>
  );
};
