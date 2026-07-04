
// // components/public/ModernMenuDisplay.tsx
// 'use client';

// import { useState, useMemo, useEffect } from 'react';
// import { MenuItem } from '@/types/menu';

// const CATEGORIES = [
//   { id: 'all', label: 'All' },
//   { id: 'starter', label: 'Starters' },
//   { id: 'main', label: 'Mains' },
//   { id: 'dessert', label: 'Desserts' },
//   { id: 'drink', label: 'Drinks' },
// ];

// const ITEMS_PER_PAGE = 12;

// export default function ModernMenuDisplay({ items }: { items: MenuItem[] }) {
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);

//   // Reset to page 1 when category changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [activeCategory]);

//   // Filter logic
//   const filteredItems = useMemo(() => {
//     if (activeCategory === 'all') return items;
//     return items.filter((item) => item.category === activeCategory);
//   }, [items, activeCategory]);

//   // Pagination logic
//   const paginatedItems = useMemo(() => {
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
//   }, [filteredItems, currentPage]);

//   const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

//   return (
//     <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
      
//       {/* Minimalist Filter Navigation */}
//       <div className="border-b border-neutral-200/60 pb-4 mb-12 flex flex-wrap gap-x-6 gap-y-3 items-center text-[11px] uppercase tracking-[0.2em] text-neutral-400">
//         {CATEGORIES.map((cat) => (
//           <button
//             key={cat.id}
//             onClick={() => setActiveCategory(cat.id)}
//             className={`py-1 transition-colors duration-300 focus:outline-none ${
//               activeCategory === cat.id 
//                 ? 'text-neutral-900 font-medium' 
//                 : 'hover:text-neutral-600 font-light'
//             }`}
//           >
//             {cat.label}
//           </button>
//         ))}
//       </div>

//       {/* Main Grid Viewport - Exact Gallery Sizing (4 columns, h-56) */}
//       {paginatedItems.length === 0 ? (
//         <div className="py-24 text-center text-sm font-light text-neutral-300 italic tracking-wide">
//           No selections available at this time.
//         </div>
//       ) : (
//         <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {paginatedItems.map((item) => {
//             const hasImage = item.image && item.image.trim() !== '';
//             return (
//               /* Intentionally NOT using <Card> to maintain the borderless, editorial gallery look */
//               <div key={item.id} className="group cursor-pointer">
                
//                 {/* Image Container - Matches gallery h-56 w-full */}
//                 <div className="relative h-56 w-full overflow-hidden rounded-sm bg-neutral-100">
//                   {hasImage ? (
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="h-full w-full object-cover grayscale-[20%] contrast-[105%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
//                       loading="lazy"
//                     />
//                   ) : (
//                     <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-neutral-300 font-light">
//                       Image pending
//                     </div>
//                   )}
//                 </div>

//                 {/* Context Meta Text Section */}
//                 <div className="mt-3 space-y-1">
//                   <div className="flex justify-between items-baseline gap-2">
//                     <h3 className="text-sm font-medium font-serif tracking-tight text-neutral-800 truncate">
//                       {item.name}
//                     </h3>
//                     <span className="text-[11px] font-light tracking-wide text-neutral-500 whitespace-nowrap tabular-nums">
//                       Rs: {item.price.toLocaleString()}
//                     </span>
//                   </div>
//                   <p className="text-[11px] font-light leading-relaxed text-neutral-400 line-clamp-2">
//                     {item.description}
//                   </p>
//                 </div>

//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Refined Navigation Elements - Minimalist pagination */}
//       {totalPages > 1 && (
//         <div className="mt-16 pt-6 border-t border-neutral-100 flex items-center justify-between text-[11px] uppercase tracking-[0.15em] font-light text-neutral-400">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="py-2 pr-4 transition-colors hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-neutral-400"
//           >
//             ← Prev
//           </button>

//           <span className="text-xs font-mono tracking-normal text-neutral-300">
//             {currentPage.toString().padStart(2, '0')} <span className="mx-1.5">/</span> {totalPages.toString().padStart(2, '0')}
//           </span>

//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="py-2 pl-4 transition-colors hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-neutral-400"
//           >
//             Next →
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// components/public/ModernMenuDisplay.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { MenuItem } from '@/types/menu';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'starter', label: 'Starters' },
  { id: 'main', label: 'Mains' },
  { id: 'dessert', label: 'Desserts' },
  { id: 'drink', label: 'Drinks' },
];

const ITEMS_PER_PAGE = 12;

export default function ModernMenuDisplay({ items }: { items: MenuItem[] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  return (
    /* Removed mx-auto and px-4 here so it doesn't double-up with the parent container */
    <div className="pb-24">
      
      {/* Minimalist Filter Navigation */}
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

      {/* Main Grid Viewport */}
      {paginatedItems.length === 0 ? (
        <div className="py-24 text-center text-sm font-light text-neutral-300 italic tracking-wide">
          No selections available at this time.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paginatedItems.map((item) => {
            const hasImage = item.image && item.image.trim() !== '';
            return (
              <div key={item.id} className="group cursor-pointer">
                
                <div className="relative h-56 w-full overflow-hidden rounded-sm bg-neutral-100">
                  {hasImage ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover grayscale-[20%] contrast-[105%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-neutral-300 font-light">
                      Image pending
                    </div>
                  )}
                </div>

                <div className="mt-3 space-y-1">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="text-sm font-medium font-serif tracking-tight text-neutral-800 truncate">
                      {item.name}
                    </h3>
                    <span className="text-[11px] font-light tracking-wide text-neutral-500 whitespace-nowrap tabular-nums">
                      Rs: {item.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] font-light leading-relaxed text-neutral-400 line-clamp-2">
                    {item.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Refined Navigation Elements */}
      {totalPages > 1 && (
        <div className="mt-16 pt-6 border-t border-neutral-100 flex items-center justify-between text-[11px] uppercase tracking-[0.15em] font-light text-neutral-400">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="py-2 pr-4 transition-colors hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-neutral-400"
          >
            ← Prev
          </button>

          <span className="text-xs font-mono tracking-normal text-neutral-300">
            {currentPage.toString().padStart(2, '0')} <span className="mx-1.5">/</span> {totalPages.toString().padStart(2, '0')}
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