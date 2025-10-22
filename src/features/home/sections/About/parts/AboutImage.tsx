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
        <div
          className={cn(
            'relative flex items-center justify-center rounded-full border border-border/70 bg-background/70 shadow-lg shadow-primary/10',
            isMobile ? 'h-56 w-56' : 'h-80 w-80',
          )}
        >
          <img
            src={AboutMe}
            alt="Taira"
            className={cn('rounded-full object-cover', isMobile ? 'h-56 w-56' : 'h-full w-full')}
          />
        </div>
      </div>
    </div>
  );
};
