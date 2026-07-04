// app/(admin)/dashboard/menu/page.tsx
import prisma from '@/lib/prisma';
import AdminMenuClient from '@/components/admin/AdminMenuClient';

export const revalidate = 0; // Force immediate revalidation on management layer

export default async function MenuAdminPage() {
  const menuItems = await prisma.menuItem.findMany({
    orderBy: { category: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 mb-2">Kitchen</p>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">Menu Management</h2>
        <p className="mt-1 text-sm text-neutral-500">Add, edit, or clean up your current menu configuration.</p>
      </div>

      <AdminMenuClient initialItems={JSON.parse(JSON.stringify(menuItems))} />
    </div>
  );
}