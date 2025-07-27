import { Hero } from './Hero';

export const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header を入れる */}
        <main className="flex-1">
          <Hero />
        </main>
        {/* Footer を入れる */}
      </div>
    </>
  );
};
