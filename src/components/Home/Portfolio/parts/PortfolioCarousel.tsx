import { motion, type Variants } from 'framer-motion';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import type { PortfolioItem } from '../constants/data';
import { PortfolioCard } from './Cards/PortfolioCard';

type PortfolioCarouselProps = {
  items: PortfolioItem[];
  variants: Variants;
};

export const PortfolioCarousel = ({ items, variants }: PortfolioCarouselProps) => {
  const fadeEdgeClassName =
    'pointer-events-none absolute inset-y-0 z-10 w-12 sm:w-16 md:w-24 bg-background';
  return (
    <motion.div className="mt-14" variants={variants}>
      <Carousel
        opts={{ align: 'center', loop: true }}
        className="group relative mx-auto max-w-5xl px-2 sm:px-4"
      >
        <CarouselContent className="pb-4">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-[clamp(280px,70vw,640px)]"
            >
              <PortfolioCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className={`${fadeEdgeClassName} left-0`} />
        <div className={`${fadeEdgeClassName} right-0`} />
        <CarouselPrevious className="left-16 sm:left-20 md:left-28 z-20 opacity-0 transition-opacity group-hover:opacity-100" />
        <CarouselNext className="right-16 sm:right-20 md:right-28 z-20 opacity-0 transition-opacity group-hover:opacity-100" />
      </Carousel>
    </motion.div>
  );
};
