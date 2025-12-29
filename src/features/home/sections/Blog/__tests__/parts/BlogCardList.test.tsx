import { describe, expect, test,  vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlogCardList } from '../../parts/BlogCardList';
import type { QiitaArticle } from '../../types';

// i18nのモック
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'blog.loading': '記事を読み込み中...',
        'blog.error': '記事の読み込みに失敗しました',
        'blog.noArticles': '記事が見つかりませんでした',
        'blog.readMore': '記事を読む',
      };
      return translations[key] || key;
    },
  }),
}));

describe('BlogCardList', () => {
  const mockArticles: QiitaArticle[] = [
    {
      id: '1',
      title: '記事1',
      url: 'https://qiita.com/test/items/1',
      created_at: '2025-01-01T00:00:00+09:00',
      updated_at: '2025-01-01T00:00:00+09:00',
      likes_count: 10,
      body: '記事1の本文です',
      tags: [],
      user: {
        id: 'testuser',
        name: 'Test User',
        profile_image_url: 'https://example.com/avatar.png',
      },
    },
    {
      id: '2',
      title: '記事2',
      url: 'https://qiita.com/test/items/2',
      created_at: '2025-01-02T00:00:00+09:00',
      updated_at: '2025-01-02T00:00:00+09:00',
      likes_count: 20,
      body: '記事2の本文です',
      tags: [],
      user: {
        id: 'testuser',
        name: 'Test User',
        profile_image_url: 'https://example.com/avatar.png',
      },
    },
    {
      id: '3',
      title: '記事3',
      url: 'https://qiita.com/test/items/3',
      created_at: '2025-01-03T00:00:00+09:00',
      updated_at: '2025-01-03T00:00:00+09:00',
      likes_count: 30,
      body: '記事3の本文です',
      tags: [],
      user: {
        id: 'testuser',
        name: 'Test User',
        profile_image_url: 'https://example.com/avatar.png',
      },
    },
  ];

  describe('ローディング状態', () => {
    test('ローディング中のメッセージが表示される', () => {
      render(<BlogCardList articles={[]} isLoading={true} error={null} />);
      expect(screen.getByText('記事を読み込み中...')).toBeInTheDocument();
    });

    test('ローディング中は記事が表示されない', () => {
      render(<BlogCardList articles={mockArticles} isLoading={true} error={null} />);
      expect(screen.queryByText('記事1')).not.toBeInTheDocument();
    });
  });

  describe('エラー状態', () => {
    test('エラーメッセージが表示される', () => {
      const error = new Error('Network error');
      render(<BlogCardList articles={[]} isLoading={false} error={error} />);
      expect(screen.getByText('記事の読み込みに失敗しました')).toBeInTheDocument();
    });

    test('エラー時は記事が表示されない', () => {
      const error = new Error('Network error');
      render(<BlogCardList articles={mockArticles} isLoading={false} error={error} />);
      expect(screen.queryByText('記事1')).not.toBeInTheDocument();
    });
  });

  describe('空データ状態', () => {
    test('記事がない場合のメッセージが表示される', () => {
      render(<BlogCardList articles={[]} isLoading={false} error={null} />);
      expect(screen.getByText('記事が見つかりませんでした')).toBeInTheDocument();
    });
  });

  describe('正常な記事表示', () => {
    test('すべての記事が表示される', () => {
      render(<BlogCardList articles={mockArticles} isLoading={false} error={null} />);

      expect(screen.getByText('記事1')).toBeInTheDocument();
      expect(screen.getByText('記事2')).toBeInTheDocument();
      expect(screen.getByText('記事3')).toBeInTheDocument();
    });

    test('記事が正しい数だけ表示される', () => {
      render(<BlogCardList articles={mockArticles} isLoading={false} error={null} />);

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3);
    });

    test('グリッドレイアウトのクラスが適用される', () => {
      const { container } = render(
        <BlogCardList articles={mockArticles} isLoading={false} error={null} />
      );

      const gridElement = container.querySelector('.grid');
      expect(gridElement).toBeInTheDocument();
      expect(gridElement).toHaveClass('grid-cols-1');
      expect(gridElement).toHaveClass('md:grid-cols-2');
      expect(gridElement).toHaveClass('lg:grid-cols-3');
    });
  });

  describe('優先順位のテスト', () => {
    test('ローディングがエラーより優先される', () => {
      const error = new Error('Network error');
      render(<BlogCardList articles={[]} isLoading={true} error={error} />);

      expect(screen.getByText('記事を読み込み中...')).toBeInTheDocument();
      expect(screen.queryByText('記事の読み込みに失敗しました')).not.toBeInTheDocument();
    });

    test('エラーが空データより優先される', () => {
      const error = new Error('Network error');
      render(<BlogCardList articles={[]} isLoading={false} error={error} />);

      expect(screen.getByText('記事の読み込みに失敗しました')).toBeInTheDocument();
      expect(screen.queryByText('記事が見つかりませんでした')).not.toBeInTheDocument();
    });
  });
});
