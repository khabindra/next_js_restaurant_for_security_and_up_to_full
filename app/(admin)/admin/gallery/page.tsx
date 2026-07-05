// app/(admin)/admin/gallery/page.tsx
import prisma from '@/lib/prisma';
import AdminGalleryClient from '@/components/admin/AdminGalleryClient';

export const revalidate = 0; // Force immediate revalidation on management layer

export default async function GalleryAdminPage() {
  const galleryItems = await prisma.galleryImage.findMany({
    orderBy: { category: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">Media Studio</p>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Gallery Management</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Upload new display assets, update description strings, or clear imagery records from the customer showcase grid.
        </p>
      </div>

      <AdminGalleryClient initialItems={JSON.parse(JSON.stringify(galleryItems))} />
    </div>
  );
}