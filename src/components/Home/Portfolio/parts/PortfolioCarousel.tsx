import { motion, type Variants } from 'framer-motion';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import type { PortfolioItem } from '../constants/data';
import { PortfolioCard } from './PortfolioCard';

type PortfolioCarouselProps = {
  items: PortfolioItem[];
  variants: Variants;
};

export const PortfolioCarousel = ({ items, variants }: PortfolioCarouselProps) => {
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
              className="basis-full sm:basis-[80%] lg:basis-[65%] xl:basis-[55%]"
            >
              <PortfolioCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-16 md:w-24 bg-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-16 md:w-24 bg-background" />
        <CarouselPrevious
          className="left-16 sm:left-20 md:left-28 z-20 opacity-0 transition-opacity group-hover:opacity-100"
        />
        <CarouselNext
          className="right-16 sm:right-20 md:right-28 z-20 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </Carousel>
    </motion.div>
  );
};
