import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlogCard } from '../../parts/BlogCard';
import type { QiitaArticle } from '../../types';

// i18nのモック
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'blog.readMore': '記事を読む',
      };
      return translations[key] || key;
    },
  }),
}));

describe('BlogCard', () => {
  const mockArticle: QiitaArticle = {
    id: '1',
    title: 'テスト記事のタイトル',
    url: 'https://qiita.com/test/items/1',
    created_at: '2025-01-01T00:00:00+09:00',
    updated_at: '2025-01-01T00:00:00+09:00',
    likes_count: 10,
    body: 'これはテスト記事の本文です。Markdown形式で書かれています。',
    tags: [
      { name: 'React', versions: [] },
      { name: 'TypeScript', versions: [] },
    ],
    user: {
      id: 'testuser',
      name: 'Test User',
      profile_image_url: 'https://example.com/avatar.png',
    },
  };

  it('記事タイトルが表示される', () => {
    render(<BlogCard article={mockArticle} />);
    expect(screen.getByText('テスト記事のタイトル')).toBeInTheDocument();
  });

  it('要約テキストが表示される', () => {
    render(<BlogCard article={mockArticle} />);
    expect(screen.getByText(/これはテスト記事の本文です/)).toBeInTheDocument();
  });

  it('「記事を読む」リンクが表示される', () => {
    render(<BlogCard article={mockArticle} />);
    expect(screen.getByText('記事を読む')).toBeInTheDocument();
  });

  it('外部リンクが正しい属性を持つ', () => {
    render(<BlogCard article={mockArticle} />);
    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', 'https://qiita.com/test/items/1');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('長い本文が要約される', () => {
    const longBodyArticle: QiitaArticle = {
      ...mockArticle,
      body: 'あ'.repeat(200), // 200文字の文字列
    };

    render(<BlogCard article={longBodyArticle} />);
    const summaryElement = screen.getByText(/あ+/);

    // 要約は150文字 + "..." = 153文字以下になっているはず
    expect(summaryElement.textContent?.length).toBeLessThanOrEqual(153);
  });

  it('Markdown記法が除去される', () => {
    const markdownArticle: QiitaArticle = {
      ...mockArticle,
      title: 'Markdownテスト記事',
      body: '# Markdown見出し\n\n**太字**と*イタリック*のテスト',
    };

    render(<BlogCard article={markdownArticle} />);

    // Markdown記号が表示されていないことを確認
    const summaryText = screen.getByText(/Markdown見出し 太字とイタリックのテスト/);
    expect(summaryText.textContent).not.toContain('#');
    expect(summaryText.textContent).not.toContain('**');
    expect(summaryText.textContent).not.toContain('*');
  });
});
