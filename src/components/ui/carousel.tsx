import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { EmblaOptionsType, EmblaPluginType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button/buttonVariants';

type CarouselOrientation = 'horizontal' | 'vertical';

type CarouselContextValue = {
  orientation: CarouselOrientation;
  viewportRef: UseEmblaCarouselType[0];
  api: EmblaCarouselType | undefined;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

const useCarousel = () => {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a Carousel');
  }
  return context;
};

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  opts?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  orientation?: CarouselOrientation;
};

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, children, opts, plugins, orientation = 'horizontal', ...props }, ref) => {
    const options = React.useMemo<EmblaOptionsType>(() => {
      return {
        axis: orientation === 'horizontal' ? 'x' : 'y',
        ...opts,
      };
    }, [opts, orientation]);

    const [viewportRef, emblaApi] = useEmblaCarousel(options, plugins);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    React.useEffect(() => {
      if (!emblaApi) {
        return;
      }

      const updateScrollState = () => {
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
      };

      updateScrollState();
      emblaApi.on('select', updateScrollState);
      emblaApi.on('reInit', updateScrollState);

      return () => {
        emblaApi.off('select', updateScrollState);
        emblaApi.off('reInit', updateScrollState);
      };
    }, [emblaApi]);

    const value = React.useMemo<CarouselContextValue>(
      () => ({
        orientation,
        viewportRef,
        api: emblaApi,
        canScrollPrev,
        canScrollNext,
      }),
      [orientation, viewportRef, emblaApi, canScrollPrev, canScrollNext]
    );

    return (
      <CarouselContext.Provider value={value}>
        <div ref={ref} className={cn('relative', className)} {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { viewportRef, orientation } = useCarousel();

  return (
    <div ref={viewportRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return (
      <div
        ref={ref}
        className={cn(
          'min-w-0 shrink-0',
          orientation === 'horizontal' ? 'pl-4 basis-full' : 'pt-4',
          className
        )}
        {...props}
      />
    );
  }
);
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, ...props }, ref) => {
  const { api, canScrollPrev, orientation } = useCarousel();

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        buttonVariants({ variant: 'outline', size: 'icon' }),
        'absolute rounded-full shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/80',
        orientation === 'horizontal'
          ? 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2'
          : 'left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rotate-90',
        className
      )}
      onClick={() => api?.scrollPrev()}
      disabled={!canScrollPrev}
      aria-label="Scroll previous"
      {...props}
    >
      <ChevronLeft className="size-4" aria-hidden="true" />
    </button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
  ({ className, ...props }, ref) => {
    const { api, canScrollNext, orientation } = useCarousel();

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          'absolute rounded-full shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/80',
          orientation === 'horizontal'
            ? 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2'
            : 'left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 rotate-90',
          className
        )}
        onClick={() => api?.scrollNext()}
        disabled={!canScrollNext}
        aria-label="Scroll next"
        {...props}
      >
        <ChevronRight className="size-4" aria-hidden="true" />
    </button>
  );
});
CarouselNext.displayName = 'CarouselNext';

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious };
