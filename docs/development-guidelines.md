# 開発ガイドライン

## コーディング規約

### TypeScript

- 型安全性を重視し、`any`を避ける
- 明示的な型定義を行う
- オブジェクトの型定義には`type`を優先

```typescript
// ✅ Good
type UserData = {
  id: string;
  name: string;
};
const data: UserData = fetchData();

// ❌ Bad
const data: any = fetchData();
```

### React

- 関数コンポーネントを使用
- 1ファイル1コンポーネント（小さなヘルパーを除く）
- カスタムフックは`use`プレフィックス

```typescript
type ButtonProps = {
  label: string;
  onClick: () => void;
};

export const Button = ({ label, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};
```

### インポート順序

```typescript
// 1. 外部ライブラリ
import { motion } from 'framer-motion';

// 2. 内部コンポーネント
import { Card } from '@/components/ui/card';

// 3. 型定義
import type { CareerMilestone } from '../types';

// 4. フック・ユーティリティ
import { useRevealAnimation } from '@/hooks/useRevealAnimation';
```

---

## 命名規則

| 対象 | 形式 | 例 |
|------|------|-----|
| コンポーネントファイル | PascalCase | `Button.tsx`, `CareerCard.tsx` |
| ユーティリティ・フック | camelCase | `utils.ts`, `useMobile.ts` |
| 変数・関数 | camelCase | `userName`, `fetchData()` |
| グローバル定数 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| コンポーネント | PascalCase | `UserProfile`, `NavigationMenu` |
| 型・Props | PascalCase | `UserData`, `ButtonProps` |
| 真偽値 | is/has/should/can | `isLoading`, `hasError` |
| イベントハンドラー | handle/on | `handleClick`, `onToggle` |

---

## スタイリング規約

### Tailwind CSS クラス順序

1. レイアウト（flex, grid, position）
2. サイズ（width, height, padding, margin）
3. タイポグラフィ（font, text）
4. 視覚効果（color, background, border）

```tsx
<div className="flex items-center gap-4 px-6 py-4 text-lg font-semibold text-foreground bg-background rounded-lg border shadow-sm">
```

### ユーティリティ

```typescript
import { cn } from '@/lib/utils';

<button className={cn(
  'px-4 py-2 rounded-lg',
  variant === 'primary' && 'bg-primary',
  disabled && 'opacity-50'
)} />
```

### レスポンシブ

モバイルファーストで記述

```tsx
<div className="text-sm md:text-base lg:text-lg">
```

---

## テスト規約

### ファイル配置と命名

- `ComponentName.test.tsx`
- コンポーネントと同じディレクトリに配置

### テスト構造（AAA パターン）

```typescript
describe('Button', () => {
  it('should call onClick when clicked', () => {
    // Arrange
    const handleClick = vi.fn();

    // Act
    render(<Button onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### カバレッジ目標

- 新規コード: 80%以上
- クリティカルパス: 100%

---

## Git規約

### ブランチ命名

- `feature/機能名` - 新機能
- `fix/バグ内容` - バグ修正
- `refactor/対象` - リファクタリング
- `docs/内容` - ドキュメント
- `style/対象` - スタイル変更

### コミットメッセージ

```
<type>: <subject>

<body>
```

**Type:**
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: コードフォーマット
- `refactor`: リファクタリング
- `test`: テスト

**例:**
```
feat: Portfolioセクションにカルーセル機能を追加

embla-carousel-reactを使用してポートフォリオアイテムを
スワイプ可能にした
```

### コミット前チェック

```bash
npm run lint         # ESLintチェック
npm run format:check # Prettierチェック
npm run build        # ビルド確認
```

### プルリクエスト

- 小さなPR（300行以内が理想）
- すべての変更はレビューを受ける
- 共有ブランチでforce pushしない
