import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#f2f0ec] text-stone-600 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 md:py-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          
          {/* Brand Section */}
          <div className="text-center sm:col-span-2 md:col-span-1 md:text-left">
            <h3 className="text-2xl md:text-3xl font-serif tracking-[0.1em] uppercase text-stone-900 mb-6">
              {SITE_NAME}
            </h3>
            <p className="text-sm leading-[1.8] text-stone-500 max-w-xs font-light mx-auto md:mx-0">
              Authentic Asian flavors and warm Nepali hospitality. Bringing our comforting culinary home to Abu Dhabi since 2015.
            </p>
          </div>

          {/* Navigate Section */}
          <div className="text-center md:text-left">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500 mb-8">
              Navigate
            </h4>
            <ul className="space-y-4">
              {[ 
                { label: 'Home', href: '/' }, 
                { label: 'About', href: '/about' }, 
                { label: 'Menu', href: '/menu' }, 
                { label: 'Gallery', href: '/gallery' }, 
                { label: 'Reservation', href: '/reservation' } 
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="inline-block text-sm font-light text-stone-700 transition-colors duration-300 hover:text-stone-900 relative after:absolute after:-bottom-1 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:h-px after:w-0 after:bg-stone-900 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500 mb-8">
              Visit Us
            </h4>
            {/* Using inline-block text-left to keep icons aligned nicely even when parent is centered on mobile */}
            <ul className="space-y-5 text-sm font-light text-stone-700 inline-block text-left">
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-4 w-4 flex-shrink-0 text-stone-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                <a href="https://maps.app.goo.gl/KUHpG4L6RgqYaLJPA" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 transition-colors leading-relaxed">
                  8 Likhnaysir St - Al Danah<br />Zone 1 - Abu Dhabi, UAE
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 flex-shrink-0 text-stone-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                <a href="tel:+971506089304" className="hover:text-stone-900 transition-colors break-words">
                  +971 506089304
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4 flex-shrink-0 text-stone-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                <a href="mailto:kingsnoodlesr@gmail.com" className="hover:text-stone-900 transition-colors break-all">
                  kingsnoodlesr@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:px-12 py-8 text-[11px] uppercase tracking-[0.2em] text-stone-400 sm:flex-row">
          <p className="text-center sm:text-left">
            <Link 
              href="/login" 
              aria-label="Staff Access" 
              className="text-stone-400 cursor-default focus:outline-none focus:text-stone-700"
            >
              ©
            </Link>
             {new Date().getFullYear()} {SITE_NAME}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 md:gap-8 flex-wrap justify-center">
            <Link href="/privacy" className="transition-colors duration-300 hover:text-stone-700">Privacy</Link>
            <Link href="/terms" className="transition-colors duration-300 hover:text-stone-700">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}