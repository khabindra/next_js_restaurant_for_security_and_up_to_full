// app/(admin)/admin/contacts/page.tsx
import prisma from '@/lib/prisma';
import { deleteContact } from '@/app/(admin)/actions/contacts/actions';

export const dynamic = 'force-dynamic';

export default async function ContactsAdminPage() {
  const messages = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6 max-w-5xl w-full mx-auto">
      {/* Header section with responsive alignment */}
      <div className="px-1 sm:px-0">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-amber-600 mb-1">
          Inbox Workspace
        </p>
        <h2 className="text-xl sm:text-2xl font-serif text-neutral-900">
          Guest Messages
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-neutral-500">
          Review and moderate incoming diner communications directly.
        </p>
      </div>

      {/* Main Message Board Container */}
      <div className="border border-neutral-200/70 rounded-xl bg-white shadow-sm overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 sm:p-16 text-center text-sm text-neutral-400 italic">
            No messages received yet.
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className="p-4 sm:p-6 hover:bg-neutral-50/40 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6"
              >
                {/* Message Body Content wrapper */}
                <div className="space-y-3 w-full max-w-3xl">
                  {/* Responsive metadata block: stacks vertically on phone screens, turns into a clean line on tablets/desktops */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm">
                    <span className="font-medium text-neutral-900 truncate">
                      {msg.name}
                    </span>
                    <span className="hidden sm:inline text-neutral-300">&bull;</span>
                    <a 
                      href={`mailto:${msg.email}`} 
                      className="text-neutral-500 hover:text-amber-700 underline underline-offset-2 truncate"
                    >
                      {msg.email}
                    </a>
                    <span className="hidden sm:inline text-neutral-300">&bull;</span>
                    <span className="text-xs text-neutral-400 mt-0.5 sm:mt-0">
                      {new Date(msg.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>

                  {msg.subject && (
                    <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider bg-neutral-50 px-2 py-0.5 rounded inline-block">
                      Regarding: {msg.subject}
                    </p>
                  )}
                  
                  <p className="text-sm leading-relaxed text-neutral-600 font-light whitespace-pre-wrap break-words">
                    {msg.message}
                  </p>
                </div>

                {/* Form Action Wrapper: goes full width on mobile viewports for easy touch interactions */}
                <form action={deleteContact.bind(null, msg.id)} className="w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t border-neutral-50 md:border-none">
                  <button 
                    type="submit" 
                    className="w-full md:w-auto text-center text-xs font-medium px-4 py-2.5 md:py-2 rounded-lg border border-neutral-200 text-neutral-500 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all active:scale-[0.98] md:active:scale-95"
                  >
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