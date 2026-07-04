import AboutMe from '@/assets/About_me.png';
import { useIsMobile } from '@/hooks/useMobile';
import { cn } from '@/lib/utils';

export const AboutImage = () => {
  const isMobile = useIsMobile();
  return (
    <div className={cn('mx-auto w-full', isMobile ? 'max-w-56' : 'max-w-xs md:max-w-sm')}>
      <div className="relative mx-auto flex aspect-square w-full items-center justify-center">
        <div
          aria-hidden
          className="absolute inset-0 scale-105 rounded-full bg-gradient-to-br from-primary/10 via-secondary/40 to-primary/20 blur-3xl"
        />
        {/* コースター風: 真鍮の二重リングで写真を囲う */}
        <div
          className={cn(
            'relative flex items-center justify-center rounded-full border border-brass/50 bg-background/70 p-2 shadow-lg shadow-primary/10 outline outline-1 outline-offset-4 outline-brass/25',
            isMobile ? 'h-56 w-56' : 'h-80 w-80',
          )}
        >
          <img src={AboutMe} alt="Taira" className="h-full w-full rounded-full object-cover" />
        </div>
      </div>
      {/* 銘板風キャプション */}
      <p className="mt-6 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-brass">
        Taira — Owner · Engineer
      </p>
    </div>
  );
};
