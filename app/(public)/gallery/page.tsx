

// // src/app/(public)/gallery/page.tsx
// import prisma from '@/lib/prisma';
// import GalleryGrid from '@/components/public/GalleryGrid';
// import { GalleryImage } from '@/types/gallery';

// export const revalidate = 900; // Cache data rendering frames dynamically for 15 minutes max

// export default async function GalleryPage() {
//   // Query all production references asynchronously directly from Postgres
//   const productionImages = await prisma.galleryImage.findMany({
//     orderBy: { createdAt: 'desc' },
//   });

//   return (
//     <section className="mx-auto max-w-6xl px-4 py-16 bg-white min-h-screen">
//       <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Gallery</h1>
//       <p className="mt-2 text-neutral-600 font-light">
//         A peek inside our restaurant and the dishes we love.
//       </p>
//       <div className="mt-8">
//         <GalleryGrid images={productionImages as GalleryImage[]} />
//       </div>
//     </section>
//   );
// }



// app/(public)/gallery/page.tsx
import prisma from '@/lib/prisma';
import GalleryGrid from '@/components/public/GalleryGrid';
import { GalleryImage } from '@/types/gallery';

export const revalidate = 900; // Cache data rendering frames for 15 minutes max

export default async function GalleryPage() {
  // Query all production gallery entries directly from Postgres
  const productionImages = await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 bg-white min-h-screen">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Gallery</h1>
      <p className="mt-2 text-neutral-600 font-light">
        A peek inside our restaurant and the dishes we love.
      </p>
      
      {/* Handing off items array directly to our enhanced client workspace */}
      <div className="mt-8">
        <GalleryGrid initialImages={productionImages as GalleryImage[]} />
      </div>
    </section>
  );
}