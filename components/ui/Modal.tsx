// src/components/ui/Modal.tsx
'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    // FIX 1: Added p-4 to the background so the modal doesn't touch screen edges
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    {/* FIX 2: Added max-h-[90vh] and overflow-y-auto so it doesn't overflow on small phones */}
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        {title && <h3 className="mb-4 text-lg font-semibold">{title}</h3>}
        <div>{children}</div>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-500 hover:text-neutral-800"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}