// // src/components/public/FeaturedMenu.tsx
// import {menuItems} from "@/data/menu"
// import Link from 'next/link';
// import Button from '@/components/ui/Button';
// import MenuCard from './MenuCard';

// export default function FeaturedMenu() {
//   const featured = menuItems.slice(0, 3);
//   return (
//     //  Added sm:px-6 lg:px-8 to perfectly match Hero padding
//      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
//       {/* FIX: Added flex-col for mobile, sm:flex-row for desktop */}
//       <div className="mb-8 flex flex-col gap-4 sm:items-end sm:flex-row sm:justify-between">
//         <div>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Guest favorites</h2>
//           <p className="mt-1 text-neutral-600">
//             A small taste of what we serve.
//           </p>
//         </div>
//         <Link href="/menu">
//           <Button variant="outline">Full menu</Button>
//         </Link>
//       </div>
      
//       {/* This grid is already perfect */}
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {featured.map((item) => (
//           <MenuCard key={item.id} item={item} />
//         ))}
//       </div>
//     </section>
//   );
// }


// src/components/public/FeaturedMenu.tsx
import { menuItems } from "@/data/menu"
import Link from 'next/link';
import Button from '@/components/ui/Button';
import MenuCard from './MenuCard';

export default function FeaturedMenu() {
  const featured = menuItems.slice(0, 3);
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-12 flex flex-col gap-4 sm:items-end sm:flex-row sm:justify-between">
        <div>
          {/* Changed to font-light font-serif to match the premium menu page aesthetic */}
          <h2 className="text-3xl md:text-4xl font-light font-serif tracking-tight text-neutral-900">
            Guest Favorites
          </h2>
          <p className="mt-2 text-sm font-light text-neutral-500">
            A small taste of what we serve.
          </p>
        </div>
        <Link href="/menu">
          <Button variant="outline">Full menu</Button>
        </Link>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}