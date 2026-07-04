// app/(admin)/admin/layout.tsx
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import SignOutButton from "../../../components/admin/SignOutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.id !== process.env.ADMIN_UUID) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-zinc-50/50">
      <aside className="w-64 border-r bg-white p-6 flex flex-col justify-between shadow-sm">
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-xl font-semibold text-neutral-900">La Bella Cucina</h2>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-medium">Management Hub</p>
          </div>
          <nav className="space-y-1">
            <a href="/admin" className="block px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors">Overview</a>
            <a href="/admin/contacts" className="block px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors">Guest Messages</a>
            <a href="/admin/reservation" className="block px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors">Reservations</a>
            <a href="/admin/menu" className="block px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors">Menu</a>
            <a href="/admin/gallery" className="block px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors">Gallery</a>

          </nav>
        </div>
        <div className="border-t border-neutral-100 pt-4">
          <p className="text-xs text-neutral-400 mb-3 truncate px-3">{user.email}</p>
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">{children}</main>
    </div>
  );
}