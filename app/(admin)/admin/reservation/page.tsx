// app/(admin)/admin/reservation/page.tsx
import prisma from "@/lib/prisma";
import ReservationTable from "@/components/admin/ReservationTable";

export const revalidate = 0; // Force-dynamic updates for dashboard

export default async function ReservationsAdminPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6 w-full mx-auto max-w-7xl">
      <div className="px-1 sm:px-0">
        <p className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-stone-500 mb-1">
          Bookings
        </p>
        <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-stone-900 font-serif">
          Reservations
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-500">
          Manage and confirm upcoming table requests.
        </p>
      </div>
      
      <ReservationTable initialItems={JSON.parse(JSON.stringify(reservations))} />
    </div>
  );
}