// components/admin/ReservationTable.tsx
'use client';

import { useTransition } from 'react';
import { updateReservationStatus, deleteReservation } from '@/app/(admin)/actions/reservation/actions';

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
};

type DbReservation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string | null;
  status: string;
  createdAt: string;
};

export default function ReservationTable({ initialItems }: { initialItems: DbReservation[] }) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (id: string, nextStatus: 'confirmed' | 'cancelled' | 'completed') => {
    startTransition(async () => {
      await updateReservationStatus(id, nextStatus);
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`Permanently delete the reservation for "${name}"? This cannot be undone.`)) {
      return;
    }
    startTransition(async () => {
      await deleteReservation(id);
    });
  };

  return (
    <div className={`rounded-2xl border border-stone-200/60 bg-white shadow-sm overflow-hidden ${isPending ? 'opacity-60' : ''}`}>
      {!initialItems.length ? (
        <div className="p-10 text-center text-sm text-stone-400 italic">No reservations found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50/80 backdrop-blur-sm border-b border-stone-200/60">
              <tr>
                {['Guest', 'Contact', 'Date / Time', 'Party', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-stone-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {initialItems.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-stone-50/50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-stone-800">{r.name}</div>
                    {r.notes && <div className="text-xs text-amber-600 mt-0.5">"{r.notes}"</div>}
                  </td>
                  <td className="px-6 py-4 text-xs text-stone-500">
                    <div>{r.email}</div>
                    <div>{r.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-stone-500 tabular-nums text-xs">
                    {r.date} @ <span className="font-medium text-stone-700">{r.time}</span>
                  </td>
                  <td className="px-6 py-4 text-stone-500 font-medium">{r.guests} pax</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusStyles[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                    {r.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(r.id, 'confirmed')}
                          className="text-xs font-semibold px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleStatusChange(r.id, 'cancelled')}
                          className="text-xs font-semibold px-2 py-1 bg-stone-100 text-stone-600 rounded hover:bg-stone-200 transition"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {r.status === 'confirmed' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(r.id, 'completed')}
                          className="text-xs font-semibold px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleStatusChange(r.id, 'cancelled')}
                          className="text-xs font-semibold px-2 py-1 bg-stone-100 text-stone-600 rounded hover:bg-stone-200 transition"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {(r.status === 'completed' || r.status === 'cancelled') && (
                      <button
                        onClick={() => handleDelete(r.id, r.name)}
                        className="text-xs font-semibold px-2 py-1 bg-red-50 text-red-600 border border-red-100 rounded hover:bg-red-100 transition"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}