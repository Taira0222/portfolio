import { Bot, Cloud, Cpu, Plug, Smartphone, Zap } from 'lucide-react';

import type { TechStackCategory } from './types';

// バーメニュー風の技術スタック。今の仕事で使う技術（Python・Vue・AWS など）を各欄の先頭に置く。
// アイコンはモノクロ（真鍮色）で統一。ブランドロゴがある技術は glyph、
// 無い技術（FastAPI / Cordova / AWS / AI）は lucide の customIcon を使う。
export const techStack: TechStackCategory[] = [
  {
    titleKey: 'techStack.categories.backend',
    defaultTitle: 'バックエンド',
    items: [
      { name: 'Python', role: 'Language', glyph: 'python' },
      { name: 'Django', role: 'Framework', glyph: 'django' },
      { name: 'FastAPI', role: 'Framework', customIcon: Zap },
      { name: 'Ruby', role: 'Language', glyph: 'ruby' },
      { name: 'Ruby on Rails (API)', role: 'Framework', glyph: 'rails' },
    ],
  },
  {
    titleKey: 'techStack.categories.frontend',
    defaultTitle: 'フロントエンド',
    items: [
      { name: 'TypeScript', role: 'Language', glyph: 'typescript' },
      { name: 'Vue.js', role: 'UI Framework', glyph: 'vue' },
      { name: 'React', role: 'UI Library', glyph: 'react' },
      { name: 'Cordova', role: 'Mobile', customIcon: Smartphone },
      { name: 'Vite', role: 'Build Tool', glyph: 'vite' },
    ],
  },
  {
    titleKey: 'techStack.categories.infrastructure',
    defaultTitle: 'クラウド・インフラ',
    items: [
      { name: 'AWS', role: 'Cloud', customIcon: Cloud },
      { name: 'Terraform', role: 'IaC', glyph: 'terraform' },
      { name: 'Docker', role: 'Container', glyph: 'docker' },
    ],
  },
  {
    titleKey: 'techStack.categories.database',
    defaultTitle: 'データベース',
    items: [
      { name: 'MySQL', role: 'RDBMS', glyph: 'mysql' },
      { name: 'PostgreSQL', role: 'RDBMS', glyph: 'postgresql' },
    ],
  },
  {
    titleKey: 'techStack.categories.cicd',
    defaultTitle: 'CI/CD',
    items: [
      { name: 'GitLab CI', role: 'Pipeline', glyph: 'gitlab' },
      { name: 'GitHub Actions', role: 'Pipeline', glyph: 'githubActions' },
    ],
  },
  {
    titleKey: 'techStack.categories.ai',
    defaultTitle: 'AI',
    items: [
      { name: 'Claude Code', role: 'Coding Agent', customIcon: Bot },
      { name: 'MCP', role: 'Tool Protocol', customIcon: Plug },
      { name: 'Ollama', role: 'Local LLM', customIcon: Cpu },
    ],
  },
];
