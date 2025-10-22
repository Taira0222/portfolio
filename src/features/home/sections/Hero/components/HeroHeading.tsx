import { motion } from 'framer-motion';
import { HEADING_TEXT } from '../constants';
import { headingCharacterVariants } from '../variants';

export const HeroHeading = () => (
  <motion.h1
    className="text-balance break-words mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
    initial={false}
  >
    {Array.from(HEADING_TEXT).map((character, index) => (
      <motion.span
        key={`${character}-${index}`}
        variants={headingCharacterVariants}
        custom={index}
        initial="initial"
        animate="animate"
        className="inline-block"
      >
        {character === ' ' ? '\u00A0' : character}
      </motion.span>
    ))}
  </motion.h1>
);
