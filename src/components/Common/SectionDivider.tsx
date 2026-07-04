import { cn } from '@/lib/utils';

type SectionDividerProps = {
  className?: string;
};

/** バーメニュー風の飾り罫線（真鍮色のライン＋中央の◆） */
export const SectionDivider = ({ className }: SectionDividerProps) => (
  <div aria-hidden="true" className={cn('flex items-center gap-3 text-brass', className)}>
    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-brass/60" />
    <span className="text-[9px] leading-none">◆</span>
    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-brass/60" />
  </div>
);
