import { Header } from '../Common/Header';
import { Hero } from './Hero';
import { About } from './About/About';

export const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Hero />
          <About />
        </main>
        <div className="h-96" /> {/* フッターのスペース確保 */}
      </div>
    </>
  );
};
