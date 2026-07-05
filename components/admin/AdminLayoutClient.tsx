// components/admin/AdminLayoutClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SignOutButton from './SignOutButton';

interface AdminLayoutClientProps {
  children: React.ReactNode;
  userEmail: string | undefined;
}

export default function AdminLayoutClient({ children, userEmail }: AdminLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/contacts', label: 'Guest Messages' },
    { href: '/admin/reservation', label: 'Reservations' },
    { href: '/admin/menu', label: 'Menu' },
    { href: '/admin/gallery', label: 'Gallery' },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50/50 flex-col lg:flex-row">
      
      {/* 📱 Mobile/Tablet Top Navbar header */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm lg:hidden shrink-0">
        <div>
          <h2 className="font-serif text-lg font-semibold text-neutral-900">La Bella Cucina</h2>
          <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-medium">Hub</p>
        </div>
        
        {/* Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 focus:outline-none"
          aria-label="Open Sidebar Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </header>

      {/* 🪟 Backdrop Overlay shadow for Mobile drawer */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 🧭 Sidebar Component (Transforms smoothly from mobile slide-out drawer to flat desktop pane) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-white p-6 flex flex-col justify-between shadow-sm transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto lg:flex shrink-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-semibold text-neutral-900">La Bella Cucina</h2>
              <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-medium">Management Hub</p>
            </div>
            {/* Mobile Sidebar Close Button */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900 lg:hidden focus:outline-none"
              aria-label="Close Sidebar Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)} // Auto-close drawer on link navigation hit
                  className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors default-focus-layer ${
                    isActive
                      ? 'bg-neutral-900 text-white font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-neutral-100 pt-4">
          <p className="text-xs text-neutral-400 mb-3 truncate px-3" title={userEmail}>
            {userEmail}
          </p>
          <SignOutButton />
        </div>
      </aside>

      {/* 🖥️ Safe Main Workspace Scrolling Container */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto w-full max-w-full">
        {children}
      </main>
    </div>
  );
}