import type { LucideIcon } from 'lucide-react';

export type SkillIconSlug =
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
  | 'docker'
  | 'githubActions'
  | 'aws'
  | 'vitest';

export type TechStackItem = {
  name: string;
  icon?: SkillIconSlug;
  customIcon?: LucideIcon;
  iconClassName?: string;
  badgeClassName: string;
};

export type TechStackCategory = {
  titleKey: string;
  defaultTitle: string;
  icon: LucideIcon;
  items: TechStackItem[];
};
