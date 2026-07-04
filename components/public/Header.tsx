// 'use client';

// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import { NAV_LINKS, SITE_NAME } from '@/lib/constants'
// import Button from '@/components/ui/Button';
// import Image from 'next/image';


// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const pathname = usePathname();

//   // Handle scroll behavior for background and shadow
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <header
//       className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
//         scrolled
//           ? 'h-20 border-b border-stone-200/50 bg-white/95 shadow-sm backdrop-blur-md'
//           : 'h-20 border-b border-transparent bg-transparent shadow-none'
//       }`}
//     >
//       <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6">
        
//         {/* Logo and Site Name Grouped */}
//         <Link 
//           href="/" 
//           className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-sm"
//         >
//         <Image
//           src="/restaurant_logo_website.jpeg"
//           alt="Restaurant Logo"
//           width={160} // Set an estimated base width
//           height={40} // 40px matches your h-10 class
//           priority    // Tells Next.js to load the logo instantly
//           className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
//         />


//           <span className="text-xl font-bold tracking-wider text-stone-900 transition-colors duration-300 group-hover:text-amber-600">
//             {SITE_NAME}
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden items-center gap-8 md:flex">
//           {NAV_LINKS.map((l) => {
//             const isActive = pathname === l.href;
//             return (
//               <Link
//                 key={l.href}
//                 href={l.href}
//                 className={`relative text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 ${
//                   isActive ? 'text-amber-600' : 'text-stone-600 hover:text-amber-600'
//                 } after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-amber-600 after:transition-all after:duration-300 after:ease-in-out ${
//                   isActive ? 'after:w-full' : 'hover:after:w-full'
//                 }`}
//               >
//                 {l.label}
//               </Link>
//             );
//           })}
          
//           {/* Reserve Button */}
//           <Link href="/reservation" className="ml-4">
//             <Button 
//               size="sm" 
//               className="rounded-full shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg"
//             >
//               Reserve a Table
//             </Button>
//           </Link>
//         </nav>

//         {/* Mobile Toggle Button (Animated Hamburger) */}
//         <button
//           className="relative flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
//           onClick={() => setOpen(!open)}
//           aria-label="Toggle menu"
//           aria-expanded={open}
//         >
//           <span
//             className={`block h-[2px] w-6 bg-stone-900 transition-all duration-300 ease-in-out ${
//               open ? 'translate-y-[8px] rotate-45' : ''
//             }`}
//           />
//           <span
//             className={`block h-[2px] w-6 bg-stone-900 transition-all duration-300 ease-in-out ${
//               open ? 'opacity-0 scale-0' : ''
//             }`}
//           />
//           <span
//             className={`block h-[2px] w-6 bg-stone-900 transition-all duration-300 ease-in-out ${
//               open ? '-translate-y-[8px] -rotate-45' : ''
//             }`}
//           />
//         </button>
//       </div>

//       {/* Mobile Menu (Smooth Slide Down using grid-rows) */}
//       <div
//         className={`grid transition-all duration-300 ease-in-out md:hidden ${
//           open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
//         }`}
//       >
//         <div className="overflow-hidden">
//           <nav className="flex flex-col gap-1 border-t border-stone-200/50 bg-white/95 px-6 py-4 backdrop-blur-md">
//             {NAV_LINKS.map((l) => {
//               const isActive = pathname === l.href;
//               return (
//                 <Link
//                   key={l.href}
//                   href={l.href}
//                   onClick={() => setOpen(false)}
//                   className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
//                     isActive
//                       ? 'bg-amber-50 text-amber-700'
//                       : 'text-stone-600 hover:bg-stone-50 hover:text-amber-600'
//                   }`}
//                 >
//                   {l.label}
//                 </Link>
//               );
//             })}
//             <div className="mt-3 border-t border-stone-100 pt-4">
//               <Link href="/reservation" onClick={() => setOpen(false)}>
//                 <Button className="w-full rounded-full shadow-md transition-all duration-300 hover:shadow-lg">
//                   Reserve a Table
//                 </Button>
//               </Link>
//             </div> 
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }


// components/public/Header.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll behavior for background and shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        scrolled
          ? 'h-20 border-b border-stone-200/50 bg-white/95 shadow-sm backdrop-blur-md'
          : 'h-20 border-b border-transparent bg-transparent shadow-none'
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6">
        
        {/* Logo and Site Name Grouped */}
        <Link 
          href="/" 
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-sm"
        >
          <Image
            src="/restaurant_logo_website.jpeg"
            alt="Restaurant Logo"
            width={55} // Set an estimated base width
            height={20} // 40px matches your h-10 class
            priority    // Tells Next.js to load the logo instantly
            style={{ height: 'auto' }} // 🌟 Added to eliminate the console aspect-ratio warning
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <span className="text-xl font-bold tracking-wider text-stone-900 transition-colors duration-300 group-hover:text-amber-600">
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 ${
                  isActive ? 'text-amber-600' : 'text-stone-600 hover:text-amber-600'
                } after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-amber-600 after:transition-all after:duration-300 after:ease-in-out ${
                  isActive ? 'after:w-full' : 'hover:after:w-full'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          
          {/* Reserve Button */}
          <Link href="/reservation" className="ml-4">
            <Button 
              size="sm" 
              className="rounded-full shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg"
            >
              Reserve a Table
            </Button>
          </Link>
        </nav>

        {/* Mobile Toggle Button (Animated Hamburger) */}
        <button
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`block h-[2px] w-6 bg-stone-900 transition-all duration-300 ease-in-out ${
              open ? 'translate-y-[8px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-stone-900 transition-all duration-300 ease-in-out ${
              open ? 'opacity-0 scale-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-stone-900 transition-all duration-300 ease-in-out ${
              open ? '-translate-y-[8px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`grid transition-all duration-300 ease-in-out md:hidden ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 border-t border-stone-200/50 bg-white/95 px-6 py-4 backdrop-blur-md">
            {NAV_LINKS.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                    isActive
                      ? 'bg-amber-50 text-amber-700'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-amber-600'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <div className="mt-3 border-t border-stone-100 pt-4">
              <Link href="/reservation" onClick={() => setOpen(false)}>
                <Button className="w-full rounded-full shadow-md transition-all duration-300 hover:shadow-lg">
                  Reserve a Table
                </Button>
              </Link>
            </div> 
          </nav>
        </div>
      </div>
    </header>
  );
}