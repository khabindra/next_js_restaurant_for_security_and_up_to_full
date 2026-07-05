// src/components/public/MenuCard.tsx

import Image from 'next/image';
import { MenuItem } from '@/types/menu';

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    /* 
      The 'group' class allows child elements (like the image) to react 
      when the parent container is hovered. 
    */
    <div className="group bg-white rounded-lg overflow-hidden border border-neutral-100 shadow-sm transition-all duration-500 ease-out group-hover:shadow-xl group-hover:-translate-y-1.5">
      
      {/* Image Container - added overflow-hidden to contain the zoom */}
      {item.image && (
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
          />
        </div>
      )}

      {/* Text Content - refined typography to match the rest of the site */}
      <div className="p-5 flex flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-base font-serif font-medium tracking-tight text-neutral-900 truncate">
            {item.name}
          </h3>
          <span className="text-sm font-light text-neutral-500 whitespace-nowrap tabular-nums">
            Rs. {item.price}
          </span>
        </div>
        <p className="mt-2 text-sm font-light leading-relaxed text-neutral-400 line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  );
}