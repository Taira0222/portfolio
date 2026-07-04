import type { LucideIcon } from 'lucide-react';

// モノクロ・ブランドロゴを持つ技術のスラッグ（glyphs.ts と対応）
export type GlyphSlug =
  | 'react'
  | 'vue'
  | 'vite'
  | 'typescript'
  | 'ruby'
  | 'rails'
  | 'python'
  | 'django'
  | 'postgresql'
  | 'mysql'
  | 'githubActions'
  | 'gitlab'
  | 'docker'
  | 'terraform'
  | 'vitest'
  | 'testingLibrary';

export type TechStackItem = {
  name: string;
  // メニューの「価格」位置に置く役割ラベル（例: UI Library / Framework）
  role: string;
  // ブランドロゴ（モノクロ）。無い技術は customIcon（lucide）でフォールバック
  glyph?: GlyphSlug;
  customIcon?: LucideIcon;
};

export type TechStackCategory = {
  titleKey: string;
  defaultTitle: string;
  items: TechStackItem[];
};
