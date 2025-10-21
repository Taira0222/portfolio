import { Header } from '../Common/Header';
import { Hero } from './Hero';
import { About } from './About';

import { TechStack } from './TechStack';
import { Portfolio } from './Portfolio';

export const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Hero />
          <About />
          <TechStack />
          <Portfolio />
        </main>
        <div className="h-96" /> {/* フッターのスペース確保 */}
      </div>
    </>
  );
};
