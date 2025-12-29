import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

/**
 * Vitest setup file
 * - Mock browser APIs that are not available in happy-dom
 * - Setup MSW (Mock Service Worker) for API mocking
 */

// ========================================
// Browser API Mocks
// ========================================

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// ========================================
// MSW (Mock Service Worker) Setup
// ========================================

/**
 * Default MSW handlers for common API endpoints
 * Tests can override these handlers as needed
 */
export const handlers = [
  // Example: Mock Qiita API
  // http.get('https://qiita.com/api/v2/users/:username/items', () => {
  //   return HttpResponse.json([
  //     {
  //       id: '1',
  //       title: 'Test Article',
  //       url: 'https://qiita.com/test/items/1',
  //       created_at: '2024-01-01T00:00:00Z',
  //       updated_at: '2024-01-01T00:00:00Z',
  //       likes_count: 10,
  //       body: 'Test content',
  //       tags: [],
  //       user: { id: 'testuser', profile_image_url: '' },
  //     },
  //   ]);
  // }),
];

/**
 * Setup MSW server for testing
 * @see https://mswjs.io/docs/getting-started
 */
export const server = setupServer(...handlers);

// Start MSW server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
});

// Reset handlers after each test to ensure test isolation
afterEach(() => {
  server.resetHandlers();
});

// Clean up after all tests are done
afterAll(() => {
  server.close();
});
