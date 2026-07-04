import { glyphPaths } from '../glyphs';
import type { GlyphSlug } from '../types';

type BrandGlyphProps = {
  slug: GlyphSlug;
  className?: string;
};

// 単色のブランドロゴ。fill=currentColor なので親の text 色（真鍮）を継承する。
export const BrandGlyph = ({ slug, className }: BrandGlyphProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d={glyphPaths[slug]} />
  </svg>
);
