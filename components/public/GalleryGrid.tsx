// import { GalleryImage } from '@/types/gallery';

// export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
//   return (
//     <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//       {images.map((img) => (
//         // Again, plain img for now. Use next/image later.
//         <img
//           key={img.id}
//           src={img.src}
//           alt={img.alt}
//           className="h-56 w-full rounded-lg object-cover"
//         />
//       ))}
//     </div>
//   );
// }

// components/public/GalleryGrid.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { GalleryImage } from '@/types/gallery';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'event', label: 'Events' },
];

const ITEMS_PER_PAGE = 12;

export default function GalleryGrid({ initialImages }: { initialImages: GalleryImage[] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset pagination back to page 1 upon changing filtering context
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Client-side Category Filter Logic
  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return initialImages;
    return initialImages.filter((img) => img.category === activeCategory);
  }, [initialImages, activeCategory]);

  // Client-side Pagination Logic (Max 12 items per window view)
  const paginatedImages = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredImages.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredImages, currentPage]);

  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);

  return (
    <div className="pb-24">
      {/* Minimalist Filter Navigation - Matches ModernMenuDisplay */}
      <div className="border-b border-neutral-200/60 pb-4 mb-12 flex flex-wrap gap-x-6 gap-y-3 items-center text-[11px] uppercase tracking-[0.2em] text-neutral-400">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`py-1 transition-colors duration-300 focus:outline-none ${
              activeCategory === cat.id 
                ? 'text-neutral-900 font-medium' 
                : 'hover:text-neutral-600 font-light'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Interactive Grid Layout */}
      {paginatedImages.length === 0 ? (
        <div className="py-24 text-center text-sm font-light text-neutral-300 italic tracking-wide">
          No captures preserved inside this frame selection currently.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paginatedImages.map((img) => (
            <div key={img.id} className="group cursor-pointer overflow-hidden rounded-md bg-neutral-50 border border-neutral-100">
              <img
                src={img.src}
                alt={img.alt || 'Restaurant capture image'}
                className="h-56 w-full object-cover grayscale-[20%] contrast-[105%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {/* Refined Navigation Elements - Minimalist pagination */}
      {totalPages > 1 && (
        <div className="mt-16 pt-6 border-t border-neutral-100 flex items-center justify-between text-[11px] uppercase tracking-[0.15em] font-light text-neutral-400">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="py-2 pr-4 transition-colors hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-neutral-400"
          >
            ← Prev
          </button>

          <span className="text-xs font-mono tracking-normal text-neutral-400">
            {currentPage.toString().padStart(2, '0')}{' '}
            <span className="mx-1.5 text-neutral-200">/</span>{' '}
            {totalPages.toString().padStart(2, '0')}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="py-2 pl-4 transition-colors hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-neutral-400"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}