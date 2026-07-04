// src/app/(admin)/dashboard/gallery/page.tsx
import prisma from '@/lib/prisma';
import AdminGalleryClient from '@/components/admin/AdminGalleryClient';
import { GalleryImage } from '@/types/gallery';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  const allImages = await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Gallery Administration</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Perform live create, read, and delete operations on your restaurant's global public web asset arrays.
        </p>
      </div>

      <AdminGalleryClient initialImages={allImages as GalleryImage[]} />
    </div>
  );
}