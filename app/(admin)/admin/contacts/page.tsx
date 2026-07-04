// app/(admin)/admin/contacts/page.tsx
import prisma from '@/lib/prisma';
import { deleteContact } from '@/app/(admin)/actions/contacts/route';

export const dynamic = 'force-dynamic';

export default async function ContactsAdminPage() {
  const messages = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-1">Inbox Workspace</p>
        <h2 className="text-2xl font-serif text-neutral-900">Guest Messages</h2>
        <p className="mt-1 text-sm text-neutral-500">Review and moderate incoming diner communications directly.</p>
      </div>

      <div className="border border-neutral-200/70 rounded-xl bg-white shadow-sm overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-16 text-center text-sm text-neutral-400 italic">No messages received yet.</div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {messages.map((msg) => (
              <div key={msg.id} className="p-6 hover:bg-neutral-50/40 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-2.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-medium text-neutral-900">{msg.name}</span>
                    <span className="text-neutral-300">&bull;</span>
                    <a href={`mailto:${msg.email}`} className="text-neutral-500 hover:text-amber-700 underline underline-offset-2">{msg.email}</a>
                    <span className="text-neutral-300">&bull;</span>
                    <span className="text-xs text-neutral-400">
                      {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {msg.subject && <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Regarding: {msg.subject}</p>}
                  <p className="text-sm leading-relaxed text-neutral-600 font-light whitespace-pre-wrap">{msg.message}</p>
                </div>

                <form action={deleteContact.bind(null, msg.id)} className="flex-shrink-0">
                  <button type="submit" className="text-xs font-medium px-3 py-2 rounded-lg border border-neutral-200 text-neutral-500 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all active:scale-95">
                    Archive Entry
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}