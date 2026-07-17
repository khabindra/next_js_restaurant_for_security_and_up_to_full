'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import Image from 'next/image';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full h-20 bg-[#f9f8f6]/95 backdrop-blur-xl border-b border-black/5">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-12">
        
        <Link href="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/20 rounded-sm group">
          {/* 
            FIX: Added style={{ width: 'auto', height: 'auto' }} to explicitly tell Next.js 
            that CSS will handle the aspect ratio. 
            Tailwind classes h-10 w-auto enforce the actual visual size.
          */}
          <Image 
            src="/restaurant_logo_website.jpeg" 
            alt={`${SITE_NAME} Logo`} 
            width={40} 
            height={40} 
            priority 
            style={{ width: 'auto', height: 'auto' }} 
            className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
          />
          <span className="text-lg font-serif tracking-[0.2em] uppercase text-stone-900 transition-colors duration-300 group-hover:text-stone-600">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-12 md:flex">
          {NAV_LINKS.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link 
                key={l.href} 
                href={l.href} 
                className={`relative text-[11px] font-medium uppercase tracking-[0.25em] transition-colors duration-300 ${
                  isActive ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'
                } after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-stone-900 after:transition-all after:duration-300 after:ease-in-out ${
                  isActive ? 'after:w-full' : 'hover:after:w-full'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link 
          href="/reservation" 
          className="hidden md:inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] py-3 px-8 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white active:scale-[0.98] transition-all duration-300 ease-in-out"
        >
          Reserve
        </Link>

        <button 
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/20" 
          onClick={() => setOpen(!open)} 
          aria-label="Toggle menu" 
          aria-expanded={open}
        >
          <span className={`block h-px w-6 bg-stone-900 transition-all duration-300 ease-in-out ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-px w-6 bg-stone-900 transition-all duration-300 ease-in-out ${open ? 'opacity-0 scale-0' : ''}`} />
          <span className={`block h-px w-6 bg-stone-900 transition-all duration-300 ease-in-out ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      <div className={`grid transition-all duration-500 ease-in-out md:hidden ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden bg-[#f9f8f6]">
          <nav className="flex flex-col items-center gap-8 px-6 py-16">
            {NAV_LINKS.map((l) => (
              <Link 
                key={l.href} 
                href={l.href} 
                onClick={() => setOpen(false)} 
                className="text-2xl font-serif tracking-wide text-stone-800 transition-colors duration-300 hover:text-stone-500"
              >
                {l.label}
              </Link>
            ))}
            <Link 
              href="/reservation" 
              onClick={() => setOpen(false)} 
              className="mt-4 text-[11px] font-medium uppercase tracking-[0.25em] py-4 px-10 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300"
            >
              Reserve a Table
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}