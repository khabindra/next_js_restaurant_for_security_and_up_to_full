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

  if (!initialItems.length) {
    return (
      <div className="rounded-2xl border border-stone-200/60 bg-white shadow-sm p-12 text-center text-sm text-stone-400 italic">
        No reservations found.
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-200 w-full max-w-full overflow-hidden ${isPending ? 'opacity-60 pointer-events-none' : ''}`}>
      
      {/* 📱 Mobile & Small Tablet Card Layout List View (< md viewport) */}
      <div className="block md:hidden space-y-4 w-full">
        {initialItems.map((r) => (
          <div key={r.id} className="rounded-xl border border-stone-200/70 bg-white p-4 shadow-xs space-y-3 w-full overflow-hidden">
            
            {/* Header: Responsive flex grid to prevent overlapping */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-1">
              <div className="min-w-0 flex-1 space-y-0.5">
                <h4 className="font-semibold text-stone-900 text-base break-words">
                  {r.name}
                </h4>
                <div className="text-xs text-stone-500 flex flex-col sm:flex-row sm:flex-wrap gap-x-2 gap-y-0.5 min-w-0">
                  <a href={`mailto:${r.email}`} className="underline underline-offset-2 hover:text-amber-700 break-all">
                    {r.email}
                  </a>
                  <span className="hidden sm:inline text-stone-300">•</span>
                  <span className="break-words font-medium">{r.phone}</span>
                </div>
              </div>
              
              {/* Status Badge layout container */}
              <div className="pt-1 sm:pt-0 self-start shrink-0">
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[r.status]}`}>
                  {r.status}
                </span>
              </div>
            </div>

            {/* Structured Info Sub-Grid */}
            <div className="grid grid-cols-2 gap-3 bg-stone-50 rounded-lg p-3 text-xs text-stone-600">
              <div className="min-w-0">
                <span className="text-stone-400 block text-[10px] uppercase font-semibold tracking-wider mb-0.5">Schedule</span>
                <p className="font-medium text-stone-800 truncate">
                  {r.date}
                </p> 
                <p className="text-stone-600 mt-0.5">@ {r.time}</p>
              </div>
              <div className="min-w-0">
                <span className="text-stone-400 block text-[10px] uppercase font-semibold tracking-wider mb-0.5">Party Size</span>
                <span className="font-bold text-stone-900 text-sm block mt-0.5">{r.guests} pax</span>
              </div>
            </div>

            {/* Guest Notes Row Block */}
            {r.notes && (
              <div className="text-xs bg-amber-50/60 border border-amber-100/70 text-amber-800 rounded-lg p-3 italic break-words">
                "{r.notes}"
              </div>
            )}

            {/* Contextual Mobile Button Area */}
            <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row gap-2">
              {r.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleStatusChange(r.id, 'confirmed')}
                    className="w-full sm:flex-1 text-center text-xs font-semibold py-2.5 bg-blue-600 text-white rounded-lg active:bg-blue-700 transition"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleStatusChange(r.id, 'cancelled')}
                    className="w-full sm:flex-1 text-center text-xs font-semibold py-2.5 bg-stone-100 text-stone-600 rounded-lg active:bg-stone-200 transition"
                  >
                    Cancel
                  </button>
                </>
              )}
              {r.status === 'confirmed' && (
                <>
                  <button
                    onClick={() => handleStatusChange(r.id, 'completed')}
                    className="w-full sm:flex-1 text-center text-xs font-semibold py-2.5 bg-green-600 text-white rounded-lg active:bg-green-700 transition"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleStatusChange(r.id, 'cancelled')}
                    className="w-full sm:flex-1 text-center text-xs font-semibold py-2.5 bg-stone-100 text-stone-600 rounded-lg active:bg-stone-200 transition"
                  >
                    Cancel
                  </button>
                </>
              )}
              {(r.status === 'completed' || r.status === 'cancelled') && (
                <button
                  onClick={() => handleDelete(r.id, r.name)}
                  className="w-full text-center text-xs font-semibold py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-lg active:bg-red-100 transition"
                >
                  Delete Record
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🖥️ Wide Screen Viewports (>= md: Tablets landscape, Laptops, Big Screens) */}
      <div className="hidden md:block rounded-2xl border border-stone-200/60 bg-white shadow-sm overflow-hidden w-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm table-auto">
            <thead className="bg-stone-50/80 backdrop-blur-xs border-b border-stone-200/60">
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
                  <td className="px-6 py-4 max-w-xs">
                    <div className="font-medium text-stone-800 break-words">{r.name}</div>
                    {r.notes && <div className="text-xs text-amber-600 mt-0.5 break-words">"{r.notes}"</div>}
                  </td>
                  <td className="px-6 py-4 text-xs text-stone-500 max-w-xs">
                    <div className="break-all font-medium text-stone-700">{r.email}</div>
                    <div className="mt-0.5">{r.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-stone-500 tabular-nums text-xs whitespace-nowrap">
                    {r.date} @ <span className="font-medium text-stone-700">{r.time}</span>
                  </td>
                  <td className="px-6 py-4 text-stone-500 font-medium whitespace-nowrap">{r.guests} pax</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusStyles[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                    {r.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(r.id, 'confirmed')}
                          className="text-xs font-semibold px-2.5 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleStatusChange(r.id, 'cancelled')}
                          className="text-xs font-semibold px-2.5 py-1 bg-stone-100 text-stone-600 rounded-md hover:bg-stone-200 transition"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {r.status === 'confirmed' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(r.id, 'completed')}
                          className="text-xs font-semibold px-2.5 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleStatusChange(r.id, 'cancelled')}
                          className="text-xs font-semibold px-2.5 py-1 bg-stone-100 text-stone-600 rounded-md hover:bg-stone-200 transition"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {(r.status === 'completed' || r.status === 'cancelled') && (
                      <button
                        onClick={() => handleDelete(r.id, r.name)}
                        className="text-xs font-semibold px-2.5 py-1 bg-red-50 text-red-600 border border-red-100 rounded-md hover:bg-red-100 transition"
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
      </div>

    </div>
  );
}