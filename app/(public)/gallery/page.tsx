// // app/(public)/gallery/page.tsx
// import prisma from '@/lib/prisma';
// import GalleryGrid from '@/components/public/GalleryGrid';
// import { GalleryImage } from '@/types/gallery';

// export const revalidate = 900; // Cache data rendering frames for 15 minutes max

// export default async function GalleryPage() {
//   // Query all production gallery entries directly from Postgres
//   const productionImages = await prisma.galleryImage.findMany({
//     orderBy: { createdAt: 'desc' },
//   });

//   return (
//     <main className="mx-auto max-w-6xl px-4 py-16 bg-white min-h-screen">
      
//       {/* HEADER SECTION - Aligned vertically with all other pages */}
//       <section className="mb-16 md:mb-20 mt-4 md:mt-8">
//         <p className="text-[11px] uppercase tracking-[0.2em] text-amber-600 mb-4">
//           Gallery
//         </p>
//         <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 max-w-3xl leading-[1.2]">
//           A peek inside our restaurant.
//         </h1>
//         <p className="mt-6 text-neutral-600 font-light leading-relaxed max-w-2xl text-base md:text-lg">
//           Explore the dishes we love, the vibrant atmosphere of our dining room, and the moments we share with our guests.
//         </p>
//       </section>
      
//       {/* Handing off items array directly to our enhanced client workspace */}
//       <section>
//         <GalleryGrid initialImages={productionImages as GalleryImage[]} />
//       </section>

//     </main>
//   );
// }



import prisma from '@/lib/prisma';
import GalleryGrid from '@/components/public/GalleryGrid';
import { GalleryImage } from '@/types/gallery';

export const revalidate = 900;

export default async function GalleryPage() {
  const productionImages = await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="bg-[#f9f8f6]">
      
      {/* HERO - Unified Light Background */}
      <section className="pt-40 md:pt-56 pb-24 md:pb-32 border-b border-black/5">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-10">
            Gallery
          </p>
          <h1 className="text-4xl md:text-7xl font-serif font-extralight tracking-tight text-stone-900 leading-[1.2] mb-12">
            A peek inside <br className="hidden md:block"/>
            our <span className="italic">restaurant.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-stone-500 font-light leading-[1.8]">
            Explore the dishes we love, the vibrant atmosphere of our dining room, and the moments we share with our guests.
          </p>
        </div>
      </section>
      
      {/* Gallery Grid */}
      <section className="mx-auto max-w-7xl px-6 md:px-12 py-32 md:py-48">
        <GalleryGrid initialImages={productionImages as GalleryImage[]} />
      </section>

    </main>
  );
}