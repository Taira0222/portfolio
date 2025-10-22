import type { LucideIcon } from 'lucide-react';

export type SkillIconSlug =
  | 'react'
  | 'vite'
  | 'typescript'
  | 'ruby'
  | 'rails'
  | 'postgresql'
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
  title: string;
  icon: LucideIcon;
  items: TechStackItem[];
};
