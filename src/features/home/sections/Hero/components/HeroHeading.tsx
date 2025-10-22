import { motion } from 'framer-motion';
import { HEADING_TEXT } from '../constants';
import { headingVariants } from '../variants';

export const HeroHeading = () => (
  <motion.h1
    className="text-balance break-words mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
    variants={headingVariants}
    initial="initial"
    animate="animate"
  >
    {HEADING_TEXT}
  </motion.h1>
);
