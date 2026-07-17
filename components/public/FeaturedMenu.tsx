// // src/components/public/FeaturedMenu.tsx

// import { menuItems } from "@/data/menu"
// import Link from 'next/link';
// import Button from '@/components/ui/Button';
// import MenuCard from './MenuCard';

// export default function FeaturedMenu() {
//   const featured = menuItems.slice(0, 3);
//   return (
//     <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
//       <div className="mb-12 flex flex-col gap-4 sm:items-end sm:flex-row sm:justify-between">
//         <div>
//           {/* Changed to font-light font-serif to match the premium menu page aesthetic */}
//           <h2 className="text-3xl md:text-4xl font-light font-serif tracking-tight text-neutral-900">
//             Guest Favorites
//           </h2>
//           <p className="mt-2 text-sm font-light text-neutral-500">
//             A small taste of what we serve.
//           </p>
//         </div>
//         <Link href="/menu">
//           <Button variant="outline">Full menu</Button>
//         </Link>
//       </div>
      
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {featured.map((item) => (
//           <MenuCard key={item.id} item={item} />
//         ))}
//       </div>
//     </section>
//   );
// }

import { menuItems } from "@/data/menu";
import Link from 'next/link';
import MenuCard from './MenuCard';

export default function FeaturedMenu() {
  const featured = menuItems.slice(0, 3);
  
  return (
    <section className="py-32 md:py-40 bg-white border-t border-black/5">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Header Section */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 block mb-6">
              Curated Selection
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-extralight tracking-tight text-stone-900">
              Guest Favorites
            </h2>
          </div>
          <Link 
            href="/menu" 
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-stone-900"
          >
            <span className="border-b border-stone-300 pb-1 group-hover:text-amber-600 transition-colors">
              Explore Full Menu
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
        
        {/* Editorial Grid */}
        <div className="grid gap-x-16 gap-y-20 md:grid-cols-3">
          {featured.map((item) => (
            <Link href="/menu" key={item.id} className="block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 rounded-sm">
              <MenuCard item={item} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}