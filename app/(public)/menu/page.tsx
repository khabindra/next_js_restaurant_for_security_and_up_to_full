// // app/(public)/menu/page.tsx
// import prisma from '@/lib/prisma';
// import ModernMenuDisplay from '@/components/public/ModernMenuDisplay';
// import { MenuItem } from '@/types/menu';

// export const revalidate = 3600; // Cache for 1 hour

// export default async function MenuPage() {
//   const allItems = await prisma.menuItem.findMany({
//     orderBy: { createdAt: 'asc' },
//   });

//   return (
//     <main className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-200/60 antialiased">
//       {/* Editorial Hero Header */}
//       <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-20">
//         <div className="max-w-2xl">
//           <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-neutral-400 mb-6">
//             La Bella Cucina
//           </p>
//           <h1 className="text-4xl sm:text-5xl font-light font-serif tracking-tight text-neutral-900 leading-[1.1]">
//             The Menu
//           </h1>
//           <p className="mt-6 text-sm text-neutral-500 font-light leading-relaxed max-w-md">
//             A curated progression of seasonal dishes prepared with exactness. 
//             Please inform your server of any dietary requirements.
//           </p>
//         </div>
//       </section>

//       {/* Interactive Layout Component Layer */}
//       <ModernMenuDisplay items={allItems as MenuItem[]} />
//     </main>
//   );
// }


// app/(public)/menu/page.tsx
import prisma from '@/lib/prisma';
import ModernMenuDisplay from '@/components/public/ModernMenuDisplay';
import { MenuItem } from '@/types/menu';

export const revalidate = 3600;

export default async function MenuPage() {
  const allItems = await prisma.menuItem.findMany({
    orderBy: { createdAt: 'asc' },
  });

  return (
    /* Exact same wrapper as Gallery Page */
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold">Menu</h1>
      <p className="mt-2 text-neutral-600">
        A curated progression of seasonal dishes prepared with exactness.
      </p>
      
      {/* Exact same mt-8 wrapper as Gallery Page */}
      <div className="mt-8">
        <ModernMenuDisplay items={allItems as MenuItem[]} />
      </div>
    </section>
  );
}