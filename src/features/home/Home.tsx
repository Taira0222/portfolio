import { Footer } from '@/components/Common/Footer';
import { Header } from '@/components/Common/Header';
import { About } from './sections/About';
import { Career } from './sections/Career';
import { Hero } from './sections/Hero';
import { Portfolio } from './sections/Portfolio';
import { TechStack } from './sections/TechStack';

export const Home = () => {
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
