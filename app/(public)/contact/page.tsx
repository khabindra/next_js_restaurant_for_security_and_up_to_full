// // app/(public)/contact/page.tsx
// import ContactForm from "@/components/public/ContactForm";

// const contactDetails = [
//   { title: 'Find Us', text: 'Kings Noodles Restaurant', subtext: '8 Likhnaysir St - Al Danah - Zone 1 - Abu Dhabi, UAE', href: 'https://www.google.com/maps?q=kings+Noodles+Restaurant+-+8+Likhnaysir+St+-+Al+Danah+-+Zone+1+-+Abu+Dhabi+-+United+Arab+Emirates&ftid=0x3e5e45005403e239:0xdc4ba10cf44dfecd&entry=gps' },
//   { title: 'Reservations', text: '+971 506089304', subtext: 'Available daily for bookings and inquiries', href: 'tel:+971506089304' },
//   { title: 'Email', text: 'kingsnoodlesr@gmail.com', subtext: 'For private events, press, or general feedback', href: 'mailto:kingsnoodlesr@gmail.com' },
// ];

// export default function ContactPage() {
//   return (
//     <main className="mx-auto max-w-6xl px-4 py-16 bg-white min-h-screen">
      
//       {/* HEADER SECTION - Aligned vertically with Services/About/Gallery */}
//       <section className="mb-16 md:mb-20 mt-4 md:mt-8 border-b border-neutral-200/60 pb-12 md:pb-16 max-w-3xl">
//         <p className="text-[11px] uppercase tracking-[0.2em] text-amber-600 mb-4">
//           Get in Touch
//         </p>
//         <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 max-w-3xl leading-[1.2]">
//           Every great evening<br className="hidden sm:block" /> begins with a <span className="italic font-normal">conversation</span>.
//         </h1>
//       </section>

//       <section className="grid gap-16 lg:grid-cols-12 lg:gap-24">
//         {/* Contact Directory Sidebar */}
//         <div className="space-y-10 lg:col-span-5 lg:space-y-14">
//           {contactDetails.map((detail) => (
//             <div key={detail.title} className="group border-l border-neutral-200 pl-6 hover:border-amber-600 transition-colors duration-300">
//               <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 group-hover:text-amber-600 transition-colors duration-300">
//                 {detail.title}
//               </h3>
//               {detail.href ? (
//                 <a href={detail.href} className="mt-3 block text-base font-medium text-neutral-800 group-hover:text-amber-600 transition-colors duration-300">
//                   {detail.text}
//                 </a>
//               ) : (
//                 <p className="mt-3 text-base font-medium text-neutral-800">{detail.text}</p>
//               )}
//               {detail.subtext && <p className="mt-1.5 text-sm text-neutral-400 font-light">{detail.subtext}</p>}
//             </div>
//           ))}

//           {/* Operating Hours Card - Style unified with Services cards */}
//           <div className="rounded-md bg-neutral-50 p-6 md:p-8 border border-neutral-100">
//             <h4 className="text-[11px] font-semibold uppercase tracking-wider text-neutral-800 mb-4">
//               Opening Hours
//             </h4>
//             <div className="space-y-0 text-sm text-neutral-500 font-light">
//               <div className="flex justify-between border-b border-neutral-200/40 py-2">
//                 <span>Tuesday — Sunday (Dinner)</span>
//                 <span className="font-medium text-neutral-800 tabular-nums">18:00 – 23:00</span>
//               </div>
//               <div className="flex justify-between border-b border-neutral-200/40 py-2">
//                 <span>Friday — Sunday (Lunch)</span>
//                 <span className="font-medium text-neutral-800 tabular-nums">12:00 – 15:00</span>
//               </div>
//               <div className="flex justify-between py-2 text-neutral-400 italic">
//                 <span>Mondays</span>
//                 <span>Closed</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Form Container Panel */}
//         <div className="lg:col-span-7">
//           <div className="mb-8">
//             <h2 className="text-xl font-medium tracking-tight text-neutral-900">Write to us</h2>
//             <p className="mt-1 text-sm text-neutral-400 font-light">We read every message and respond personally within 24 hours.</p>
//           </div>
//           <ContactForm />
//         </div>
//       </section>
      
//     </main>
//   );
// }




import ContactForm from "@/components/public/ContactForm";

const contactDetails = [
  { title: 'Find Us', text: 'Kings Noodles Restaurant', subtext: '8 Likhnaysir St - Al Danah - Zone 1 - Abu Dhabi, UAE', href: 'https://www.google.com/maps?q=kings+Noodles+Restaurant+-+8+Likhnaysir+St+-+Al+Danah+-+Zone+1+-+Abu+Dhabi+-+United+Arab+Emirates&ftid=0x3e5e45005403e239:0xdc4ba10cf44dfecd&entry=gps' },
  { title: 'Reservations', text: '+971 506089304', subtext: 'Available daily for bookings and inquiries', href: 'tel:+971506089304' },
  { title: 'Email', text: 'kingsnoodlesr@gmail.com', subtext: 'For private events, press, or general feedback', href: 'mailto:kingsnoodlesr@gmail.com' },
];

export default function ContactPage() {
  return (
    <main className="bg-[#f9f8f6]">
      
      {/* HERO - Unified Light Background */}
      <section className="pt-40 md:pt-56 pb-24 md:pb-32 border-b border-black/5">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-10">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-7xl font-serif font-extralight tracking-tight text-stone-900 leading-[1.2] mb-12">
            Every great evening <br className="hidden md:block"/>
            begins with a <span className="italic">conversation.</span>
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 md:px-12 py-32 md:py-48">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
          
          <div className="lg:col-span-5 space-y-16">
            <div className="border-t border-black/10 pt-12">
              <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-8">Directory</h3>
              <div className="space-y-10">
                {contactDetails.map((detail) => (
                  <div key={detail.title}>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500 mb-3 ">{detail.title}</p>
                    {detail.href ? (
                      <a href={detail.href} className="block text-lg md:text-xl font-serif font-normal text-stone-900 hover:text-amber-600 transition-colors duration-300 tracking-tight">{detail.text}</a>
                    ) : (
                      <p className="text-lg md:text-xl font-serif font-normal text-stone-900 tracking-tight">{detail.text}</p>
                    )}
                    {detail.subtext && <p className="mt-2 text-sm text-stone-400 font-light leading-relaxed">{detail.subtext}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-black/10 pt-12">
              <h4 className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-8">Opening Hours</h4>
              <div className="space-y-4 text-sm text-stone-600 font-light">
                <div className="flex justify-between items-baseline border-b border-black/5 pb-4">
                  <span>Tuesday — Sunday (Dinner)</span>
                  <span className="font-medium text-stone-900 tabular-nums tracking-wide">18:00 – 23:00</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-black/5 pb-4">
                  <span>Friday — Sunday (Lunch)</span>
                  <span className="font-medium text-stone-900 tabular-nums tracking-wide">12:00 – 15:00</span>
                </div>
                <div className="flex justify-between items-baseline text-stone-400 italic pt-2">
                  <span>Mondays</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-16 lg:border-l lg:border-black/10">
            <div className="mb-12">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-6">Write to us</p>
              <h2 className="text-2xl md:text-3xl font-serif font-extralight tracking-tight text-stone-900 leading-tight">
                We read every message and respond personally within 24 hours.
              </h2>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      
    </main>
  );
}