// src/components/ui/Card.tsx
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-neutral-200 bg-white p-4 shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
}