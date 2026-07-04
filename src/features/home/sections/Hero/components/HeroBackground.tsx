import { motion } from 'framer-motion';

export const HeroBackground = () => (
  <>
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/60" />
    {/* バーのペンダントライトを模した上部中央の琥珀グロー */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-10%,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_65%)]" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_30%,color-mix(in_oklab,var(--brass)_12%,transparent),transparent_60%)]" />
    <motion.div
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0.2 }}
      animate={{ opacity: [0.2, 0.45, 0.3], rotate: [0, 1, -1, 0] }}
      transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute left-1/4 bottom-1/4 h-40 w-40 rounded-full bg-secondary/25 blur-3xl" />
      <div className="absolute right-1/5 top-1/4 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
    </motion.div>
  </>
);
