// app/(admin)/admin/reservation/page.tsx
import prisma from "@/lib/prisma";
import ReservationTable from "@/components/admin/ReservationTable";

export const revalidate = 0; // Force-dynamic updates for dashboard

export default async function ReservationsAdminPage() {
  // Fetch from Prisma 7 native client straight into the server component
  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-stone-500 mb-2">Bookings</p>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">Reservations</h1>
        <p className="mt-1 text-stone-500">Manage and confirm upcoming table requests.</p>
      </div>
      
      {/* Pass structural data down to the table view layer */}
      <ReservationTable initialItems={JSON.parse(JSON.stringify(reservations))} />
    </div>
  );
}