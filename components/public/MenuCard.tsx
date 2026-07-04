// // src/components/public/MenuCard.tsx
// import { MenuItem } from '@/types/menu';
// import Card from '@/components/ui/Card';

// export default function MenuCard({ item }: { item: MenuItem }) {
//   return (
//     <Card className="flex flex-col">
//       {item.image && (
//         // Using a plain <img> is fine for learning. Later, switch to next/image for optimization.
//         <img
//           src={item.image}
//           alt={item.name}
//           className="h-48 w-full rounded-t-lg object-cover"
//         />
//       )}
//       <div className="mt-3 flex flex-1 flex-col">
//         <div className="flex items-baseline justify-between">
//           <h3 className="text-base font-semibold">{item.name}</h3>
//           <span className="text-sm font-semibold text-amber-700">
//             Rs. {item.price}
//           </span>
//         </div>
//         <p className="mt-1 flex-1 text-sm text-neutral-600">
//           {item.description}
//         </p>
//       </div>
//     </Card>
//   );
// }


// src/components/public/MenuCard.tsx
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
        <div className="overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="h-56 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
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