import { Box, Cloud, FlaskConical, PieChart, Waves } from 'lucide-react';

import type { TechStackCategory } from './types';

// バーメニュー風の技術スタック。
// アイコンはモノクロ（真鍮色）で統一。ブランドロゴがある技術は glyph、
// 無い技術（AWS / Devcontainer / MSW / RSpec / SimpleCov）は lucide の customIcon を使う。
export const techStack: TechStackCategory[] = [
  {
    titleKey: 'techStack.categories.frontend',
    defaultTitle: 'フロントエンド',
    items: [
      { name: 'React', role: 'UI Library', glyph: 'react' },
      { name: 'Vue.js', role: 'UI Framework', glyph: 'vue' },
      { name: 'Vite', role: 'Build Tool', glyph: 'vite' },
      { name: 'TypeScript', role: 'Language', glyph: 'typescript' },
    ],
  },
  {
    titleKey: 'techStack.categories.backend',
    defaultTitle: 'バックエンド',
    items: [
      { name: 'Ruby', role: 'Language', glyph: 'ruby' },
      { name: 'Ruby on Rails (API)', role: 'Framework', glyph: 'rails' },
      { name: 'Python', role: 'Language', glyph: 'python' },
      { name: 'Django', role: 'Framework', glyph: 'django' },
    ],
  },
  {
    titleKey: 'techStack.categories.database',
    defaultTitle: 'データベース',
    items: [
      { name: 'PostgreSQL', role: 'RDBMS', glyph: 'postgresql' },
      { name: 'MySQL', role: 'RDBMS', glyph: 'mysql' },
    ],
  },
  {
    titleKey: 'techStack.categories.cicd',
    defaultTitle: 'CI/CD',
    items: [
      { name: 'GitHub Actions', role: 'Pipeline', glyph: 'githubActions' },
      { name: 'GitLab CI', role: 'Pipeline', glyph: 'gitlab' },
    ],
  },
  {
    titleKey: 'techStack.categories.infrastructure',
    defaultTitle: 'インフラ',
    items: [
      { name: 'AWS', role: 'Cloud', customIcon: Cloud },
      { name: 'Docker', role: 'Container', glyph: 'docker' },
      { name: 'Terraform', role: 'IaC', glyph: 'terraform' },
      { name: 'Devcontainer', role: 'Dev Env', customIcon: Box },
    ],
  },
  {
    titleKey: 'techStack.categories.testing',
    defaultTitle: 'テスト',
    items: [
      { name: 'Vitest', role: 'Unit', glyph: 'vitest' },
      { name: 'Testing Library', role: 'Component', glyph: 'testingLibrary' },
      { name: 'MSW', role: 'API Mock', customIcon: Waves },
      { name: 'RSpec', role: 'Unit · Ruby', customIcon: FlaskConical },
      { name: 'SimpleCov', role: 'Coverage', customIcon: PieChart },
    ],
  },
];
