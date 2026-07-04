import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          
          {/* Column 1: Brand & Socials */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold tracking-wider text-stone-900">
              {SITE_NAME}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-stone-500 mx-auto lg:mx-0 max-w-xs">
              Authentic flavors, warm hospitality. A culinary sanctuary crafting timeless Italian cuisine since 2015.
            </p>
            
            {/* Social Icons */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
              {/* Instagram Icon */}
              <a
                href="#"
                aria-label="Follow us on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-500 transition-all duration-300 hover:scale-110 hover:border-amber-600 hover:bg-amber-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* Facebook Icon */}
              <a
                href="#"
                aria-label="Follow us on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-500 transition-all duration-300 hover:scale-110 hover:border-amber-600 hover:bg-amber-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="text-center lg:text-left">
            <h4 className="text-xs font-medium uppercase tracking-widest text-stone-800">
              Navigation
            </h4>
            <ul className="mt-6 space-y-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Menu', href: '/menu' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Reservation', href: '/reservation' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative inline-block text-sm font-medium text-stone-500 transition-all duration-300 hover:-translate-x-0.5 hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-sm after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-amber-600 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information */}
          <div className="text-center lg:text-left sm:col-span-2 lg:col-span-1">
            <h4 className="text-xs font-medium uppercase tracking-widest text-stone-800">
              Information
            </h4>
            <ul className="mt-6 space-y-4 text-sm text-stone-500">
              <li className="flex items-start justify-center lg:justify-start gap-3">
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-stone-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                <span>123 Culinary Lane,<br />Kathmandu 44600</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start gap-3">
                <svg className="h-4 w-4 flex-shrink-0 text-stone-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                <a href="tel:+97712345678" className="transition-colors hover:text-amber-600">+977-1-2345678</a>
              </li>
              <li className="flex items-center justify-center lg:justify-start gap-3">
                <svg className="h-4 w-4 flex-shrink-0 text-stone-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                <a href="mailto:hello@labellacucina.com" className="transition-colors hover:text-amber-600">hello@labellacucina.com</a>
              </li>
              <li className="flex items-start justify-center lg:justify-start gap-3">
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-stone-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                <span>Mon - Sun: 11:00 AM – 11:00 PM</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-200">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-stone-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors duration-300 hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors duration-300 hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-sm">
              Terms
            </Link>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Designed with <span className="text-red-500">❤️</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}