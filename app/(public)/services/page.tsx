// import Link from 'next/link';

// const servicesList = [
//   {
//     title: 'Dine-In Experience',
//     description:
//       'Full-service dining in a warm, welcoming setting. Enjoy our complete menu of fresh noodles, momos, and curries served hot directly to your table.',
//   },
//   {
//     title: 'Quick Takeaway',
//     description:
//       'Perfect for guests on the go. Get fast, freshly prepared orders packaged securely and made ready to pick up exactly when you need them.',
//   },
//   {
//     title: 'Home Delivery',
//     description:
//       'Bring your favorite flavors home. We deliver your favorite noodles, momos, and aromatic curries piping hot and fresh right to your doorstep.',
//   },
//   {
//     title: 'Private Events & Catering',
//     description:
//       'Custom menus and complete full-service catering crafted flawlessly for milestone birthdays, corporate events, and intimate family gatherings.',
//   },
//   {
//     title: 'Family & Group Feasts',
//     description:
//       'Designed for large tables and celebrations. Enjoy generous sharing platters and curated set menus perfect for sharing with loved ones.',
//   },
//   {
//     title: 'Beverages & Fresh Juice Bar',
//     description:
//       'Quench your thirst with our selection of fresh juices, iced teas, and refreshing signature drinks crafted perfectly to complement every dish.',
//   },
// ];

// export default function ServicesPage() {
//   return (
//     <main className="mx-auto max-w-6xl px-4 py-16 bg-white min-h-screen">
      
//       {/* HEADER SECTION */}
//       <section className="mb-20 md:mb-24 mt-4 md:mt-8">
//         <p className="text-[11px] uppercase tracking-[0.2em] text-amber-600 mb-4">
//           Experiences
//         </p>
//         <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 max-w-3xl leading-[1.2]">
//           More than a restaurant.
//         </h1>
//         <p className="mt-6 text-neutral-600 font-light leading-relaxed max-w-2xl text-base md:text-lg">
//           We offer a variety of bespoke experiences tailored to your exact needs, extending our hospitality beyond the dining room.
//         </p>
//       </section>

//       {/* SERVICES GRID */}
//       <section className="py-16 md:py-20 border-t border-neutral-100">
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
//           {servicesList.map((service, index) => (
//             <div 
//               key={service.title} 
//               className="group flex flex-col p-8 rounded-md bg-neutral-50 border border-neutral-100 transition-colors hover:border-neutral-200"
//             >
//               {/* Number Indicator */}
//               <span className="block text-[11px] font-mono tracking-widest text-neutral-400 mb-4">
//                 0{index + 1}
//               </span>
              
//               {/* Content with Amber Hover on Title */}
//               <h3 className="text-lg font-medium text-neutral-900 mb-3 transition-colors duration-300 group-hover:text-amber-600">
//                 {service.title}
//               </h3>
//               <p className="flex-1 text-neutral-600 font-light leading-relaxed text-sm">
//                 {service.description}
//               </p>

//               {/* Minimalist CTA with Amber Hover */}
//               <div className="mt-8 pt-6 border-t border-neutral-100/60">
//                 {/* Changed group to group/link so the arrow only animates when hovering the link itself, not the whole card */}
//                 <Link 
//                   href="/contact" 
//                   className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-medium text-neutral-900 transition-colors hover:text-amber-600 group/link"
//                 >
//                   Inquire
//                   <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//     </main>
//   );
// }



import Link from 'next/link';

const servicesList = [
  { title: 'Dine-In Experience', description: 'Full-service dining in a warm, welcoming setting. Enjoy our complete menu of fresh noodles, momos, and curries served hot directly to your table.' },
  { title: 'Quick Takeaway', description: 'Perfect for guests on the go. Get fast, freshly prepared orders packaged securely and made ready to pick up exactly when you need them.' },
  { title: 'Home Delivery', description: 'Bring your favorite flavors home. We deliver your favorite noodles, momos, and aromatic curries piping hot and fresh right to your doorstep.' },
  { title: 'Private Events & Catering', description: 'Custom menus and complete full-service catering crafted flawlessly for milestone birthdays, corporate events, and intimate family gatherings.' },
  { title: 'Family & Group Feasts', description: 'Designed for large tables and celebrations. Enjoy generous sharing platters and curated set menus perfect for sharing with loved ones.' },
  { title: 'Beverages & Fresh Juice Bar', description: 'Quench your thirst with our selection of fresh juices, iced teas, and refreshing signature drinks crafted perfectly to complement every dish.' },
];

export default function ServicesPage() {
  return (
    <main className="bg-[#f9f8f6]">
      
      {/* HERO - Unified Light Background */}
      <section className="pt-40 md:pt-56 pb-24 md:pb-32 border-b border-black/5">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-10">
            Experiences
          </p>
          <h1 className="text-4xl md:text-7xl font-serif font-extralight tracking-tight text-stone-900 leading-[1.2] mb-12">
            More than a <span className="italic">restaurant.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-stone-500 font-light leading-[1.8]">
            We offer a variety of bespoke experiences tailored to your exact needs, extending our hospitality beyond the dining room.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid gap-x-16 gap-y-20 md:grid-cols-2 lg:grid-cols-3 border-t border-black/10 pt-16">
            {servicesList.map((service, index) => (
              <div key={service.title} className="flex flex-col">
                <span className="block text-sm font-serif text-stone-300 mb-6">0{index + 1}</span>
                <h3 className="text-xl md:text-2xl font-serif font-normal text-stone-900 mb-4 tracking-tight">{service.title}</h3>
                <p className="flex-1 text-sm text-stone-500 font-light leading-[1.8] mb-8">{service.description}</p>
                <Link href="/contact" className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-stone-900 mt-auto self-start">
                  <span className="border-b border-stone-300 group-hover:text-amber-600 pb-1 transition-colors duration-300">Inquire</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}