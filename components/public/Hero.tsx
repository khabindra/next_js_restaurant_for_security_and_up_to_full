
// // components/public/Hero.tsx
// import Button from '@/components/ui/Button';
// import Link from 'next/link';
// import Image from 'next/image';

// export default function Hero() {
//   return (
//     <section className="relative flex min-h-screen items-center bg-white overflow-hidden">
//       {/* Changed lg: to md: for padding */}
//       <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-0">
//         {/* Changed lg: to md: for grid and gap */}
//         <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          
//           {/* Left Column: Content */}
//           {/* Changed lg: to md: for order and text alignment */}
//           <div className="order-2 md:order-1 text-center md:text-left">
//             {/* Changed lg: to md: for accent bar alignment */}
//             <div className="mb-6 h-1 w-12 rounded-full bg-amber-600 mx-auto md:mx-0" aria-hidden="true" />
            
//             <h1 className="text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
//               {/* A taste of Italy, right here in Kathmandu */}
//               A taste of Asia, made with Nepali heart
//             </h1>
            
//             {/* Changed lg: to md: for paragraph margin */}
//             <p className="mt-6 max-w-xl mx-auto md:mx-0 text-lg leading-relaxed text-neutral-600 sm:text-xl">
//               {/* Fresh ingredients, time‑honored recipes, and warm hospitality. 
//               Reserve your table today for an unforgettable dining experience. */}
//               From sizzling woks to steaming momos and fragrant curries, every plate is crafted fresh with tradition. 
//               Join us in Al Danah for an unforgettable dining experience.
//             </p>
            
//             {/* Changed lg: to md: for button alignment */}
//             <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
//               <Link href="/reservation">
//                 <Button size="lg">
//                   Reserve a table
//                 </Button>
//               </Link>
//               <Link href="/menu">
//                 <Button variant="outline" size="lg">
//                   View menu
//                 </Button>
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: Image */}
//           <div className="order-1 md:order-2">
//             <div className="relative mx-auto w-full max-w-md md:max-w-none aspect-[4/5] sm:aspect-square md:aspect-square">
//               <Image
//                 src="/image-hero.png"
//                 alt="A beautifully plated gourmet Italian dish with fresh ingredients at La Bella Cucina"
//                 fill
//                 priority
//                 sizes="(max-width: 768px) 100vw, 50vw"
//                 className="rounded-2xl object-cover shadow-2xl"
//               />
              
//               {/* Decorative shape remains unchanged */}
//               <div 
//                 className="absolute -z-10 h-full w-full rounded-2xl bg-amber-100/50 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6" 
//                 aria-hidden="true" 
//               />
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }


import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-900 pt-20">
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/image-hero.png" 
          alt="Culinary artistry on a plate" 
          fill 
          priority 
          className="object-cover object-center opacity-70 animate-[slowZoom_20s_ease-in-out_infinite_alternate]" 
          sizes="100vw" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-stone-950/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-20">
        <span className="block text-[10px] font-medium uppercase tracking-[0.4em] text-white/60 mb-8">
          Est. 2015 • Abu Dhabi
        </span>
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-light text-white leading-[1.1] tracking-tight mb-10">
          Authentic soul,<br/>
          <span className="italic font-extralight">Nepali heart.</span>
        </h1>
        <p className="mx-auto max-w-xl text-base md:text-lg leading-relaxed text-white/70 font-light mb-12">
          From sizzling woks to steaming momos. An exploration of traditional Asian flavors, refined for the modern palate in the heart of Al Danah.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Primary Solid Button - Smooth Inversion on Hover */}
          <Link 
            href="/reservation" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 text-[11px] font-medium uppercase tracking-[0.25em] text-stone-900 bg-white hover:bg-stone-900 hover:text-white active:scale-[0.98] transition-all duration-500 ease-in-out shadow-lg shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
          >
            Reserve a Table
          </Link>

          {/* Secondary Ghost Button - Symmetrical to Primary */}
          <Link 
            href="/menu" 
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 text-[11px] font-medium uppercase tracking-[0.25em] text-white border border-white/40 hover:bg-white/10 hover:border-white active:scale-[0.98] transition-all duration-500 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
          >
            <span>Discover the Menu</span>
            <span className="transition-transform duration-500 ease-in-out group-hover:translate-x-1.5">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}