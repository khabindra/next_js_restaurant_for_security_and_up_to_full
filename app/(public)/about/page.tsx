// import Link from 'next/link';
// import Image from 'next/image';

// export default function AboutPage() {
//   return (
//     // Changed max-w-4xl to max-w-6xl, and unified padding with the rest of the site
//     <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      
//       {/* 1. THE INTRODUCTION (The Vision) */}
//       <section className="mb-20 md:mb-28 text-center md:text-left">
//         <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-600 mb-6">The Vision</p>
//         <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl leading-tight">
//           A quiet rebellion<br className="hidden sm:block" /> against fast dining.
//         </h1>
//         <p className="mt-8 max-w-2xl mx-auto md:mx-0 text-lg md:text-xl leading-relaxed text-neutral-500 font-light">
//           In the heart of Kathmandu, La Bella Cucina exists as a sanctuary of old-world Italian grace—a place where the rhythm of the kitchen dictates the pace of your evening, and honest simplicity is the highest form of luxury.
//         </p>
//       </section>

//       {/* 2. OUR STORY (The Spark) */}
//       <section className="mb-20 md:mb-28 border-t border-neutral-100 pt-16">
//         <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 mb-6">Our Story</p>
//         <div className="grid gap-8 md:grid-cols-2 md:gap-16">
//           <div>
//             <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-6">
//               Born in a family kitchen.
//             </h2>
//             <p className="text-base leading-relaxed text-neutral-600">
//               La Bella Cucina began not as a business plan, but as a deep nostalgia for the Sunday dinners of our childhood in Italy. We wanted to recreate that specific kind of warmth—the clinking of glasses, the smell of garlic hitting olive oil, the hours spent lingering around a table until the candles burned low.
//             </p>
//           </div>
//           <div className="md:pt-12">
//             <p className="text-base leading-relaxed text-neutral-600">
//               We brought that vision to Kathmandu to create more than just a restaurant; we wanted to build a gathering place for our community. A room where friends become family, where celebrations are anchored by exceptional food, and where the art of hospitality is treated with the same reverence as the cooking itself.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* 3. CULINARY PHILOSOPHY (Sourcing & Technique) */}
//       <section className="mb-20 md:mb-28 border-t border-neutral-100 pt-16">
//         <div className="text-center mb-12">
//           <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 mb-6">Philosophy</p>
//           <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
//             Rooted in technique, driven by the season.
//           </h2>
//         </div>
        
//         <div className="grid gap-0 border-t border-l border-r border-neutral-100 md:grid-cols-3">
//           {[
//             {
//               title: "The Daily Roll",
//               description: "We do not buy dried pasta. Every strand of spaghetti and every sheet of lasagna is rolled by hand each morning, offering a texture that simply cannot be replicated by a machine."
//             },
//             {
//               title: "Local & Seasonal",
//               description: "Italian cuisine is inherently regional. We adapt this by sourcing 90% of our produce from organic farms in the Kathmandu valley, letting the seasons write our menu."
//             },
//             {
//               title: "Live Wood Fire",
//               description: "Our kitchen is anchored by a custom-built wood-burning hearth. It imparts a subtle, smoky char to our pizzas and meats that gas or electric ovens simply cannot achieve."
//             }
//           ].map((item, index) => (
//             <div key={index} className={`p-8 md:p-10 border-b border-neutral-100 ${index < 2 ? 'md:border-r' : ''}`}>
//               <h3 className="text-sm font-semibold text-neutral-900 mb-3">{item.title}</h3>
//               <p className="text-sm leading-relaxed text-neutral-500">{item.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 4. THE AMBIENCE (The Vibe) */}
//       {/* Adjusted to stay perfectly inside the max-w-6xl container bounds */}
//       <section className="mb-20 md:mb-28 bg-stone-50 rounded-3xl p-8 md:p-16">
//         <div className="max-w-2xl mx-auto text-center">
//           <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 mb-6">The Ambience</p>
//           <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-6">
//             Low light. Quiet conversation.
//           </h2>
//           <p className="text-base leading-relaxed text-neutral-600 italic">
//             &ldquo;Walking into La Bella Cucina feels like stepping into a private villa. The lighting is deliberately low, washed in warm amber. There is no rush here—only the quiet hum of conversation, the soft clink of porcelain, and the distant, rhythmic sound of the open kitchen. It is intimate without being cramped, elegant without being stiff.&rdquo;
//           </p>
//         </div>
//       </section>

//       {/* 5. THE PEOPLE (Humanizing the brand) */}
//       <section className="mb-20 md:mb-28 border-t border-neutral-100 pt-16">
//         <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 mb-6">The People</p>
//         <div className="grid gap-12 md:grid-cols-5 items-center">
//           {/* Chef Image Placeholder */}
//           <div className="md:col-span-2 relative aspect-[4/5] w-full max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden bg-stone-100">
//             <Image
//               src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=987&auto=format&fit=crop" // Maps directly to your local file in public/ folder. Switch to .webp once compressed!
//               alt="Executive Chef Marco Rossi precisely plating a seasonal dish under copper heat lamps in the kitchen"
//               fill
//               loading="lazy" // Since this section is far below the fold, lazy loading saves initial page load bandwidth
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 350px"
//               className="object-cover object-center"
//             />
//           </div>
          
//           {/* Chef Bio */}
//           <div className="md:col-span-3">
//             <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-6">
//               The hands behind the food.
//             </h2>
//             <p className="text-base leading-relaxed text-neutral-600">
//               Led by Executive Chef Marco Rossi, our kitchen is a tight-knit brigade of artisans who share an obsession for detail. Chef Marco brings over two decades of experience from kitchens across Rome and Florence, but his cooking remains deeply tied to his roots.
//             </p>
//             <p className="mt-4 text-base leading-relaxed text-neutral-600">
//               &ldquo;I don&apos;t want to surprise people with complicated tricks,&rdquo; he says. &ldquo;I want to comfort them with perfect execution. A great plate of pasta doesn&apos;t need to be modernized; it just needs to be made with absolute respect for the ingredients.&rdquo;
//             </p>
//             <p className="mt-6 text-sm font-semibold text-neutral-900">
//               Marco Rossi, <span className="font-normal text-neutral-500">Executive Chef & Co-Founder</span>
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* 6. SUBTLE NEXT STEP (Instead of a hard CTA) */}
//       <section className="border-t border-neutral-100 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
//         <p className="text-sm text-neutral-400">
//           You&apos;ve read the story. Now taste it.
//         </p>
//         <Link 
//           href="/menu" 
//           className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-900 transition-colors hover:text-amber-600"
//         >
//           Explore the menu
//           <svg 
//             className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
//             fill="none" 
//             stroke="currentColor" 
//             strokeWidth="2" 
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
//           </svg>
//         </Link>
//       </section>

//     </main>
//   );
// }




//  latest good one ------------------------------


// import Link from 'next/link';
// import Image from 'next/image';

// export default function AboutPage() {
//   return (
//     <main className="mx-auto max-w-6xl px-4 py-16 bg-white min-h-screen">
      
//       {/* 1. HERO / THE VISION */}
//       {/* Aligned left, matching the top of the Gallery page structure */}
//       <section className="mb-20 md:mb-24 mt-4 md:mt-8">
//         <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-600 mb-6">About Us</p>
//         <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-4">
//           Our Vision
//         </p>
//         <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 max-w-3xl leading-[1.2]">
//           Bringing people together, one plate at a time.
//         </h1>
//         <p className="mt-6 text-neutral-600 font-light leading-relaxed max-w-2xl text-base md:text-lg">
//           Our vision is to build more than a restaurant — a gathering place where the flavors of Asia and the warmth of Nepali hospitality create moments worth savoring. We aim to become Abu Dhabi&apos;s home for honest, comforting food served with genuine care.
//         </p>
//       </section>

//       {/* 2. OUR STORY */}
//       <section className="py-16 md:py-20 border-t border-neutral-100">
//         <div className="grid gap-12 md:grid-cols-2 md:items-center">
//           {/* Image Left */}
//           <div className="group relative h-[300px] sm:h-[400px] w-full overflow-hidden rounded-md bg-neutral-50 border border-neutral-100">
//             <Image
//               src="https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1000&auto=format&fit=crop"
//               alt="Chefs cooking authentic Asian food in a wok"
//               fill
//               sizes="(max-width: 768px) 100vw, 50vw"
//               className="object-cover grayscale-[20%] contrast-[105%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
//             />
//           </div>
          
//           {/* Text Right */}
//           <div>
//             <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Our Story</p>
//             <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-6">
//               Born from a simple idea.
//             </h2>
//             <div className="space-y-6 text-neutral-600 font-light leading-relaxed">
//               <p>
//                 Kings Noodles Restaurant was born from a simple idea: to bring the bold, comforting flavors of Asian cuisine to the heart of Abu Dhabi, prepared the way we grew up eating it — fresh, generous, and full of heart. Founded and run by a team of proud Nepali restaurateurs, our journey began with a shared love of food and a desire to share it with our new home city.
//               </p>
//               <p>
//                 From our kitchen in Al Danah, we blend Chinese, Thai, Indian, and Nepali-inspired cooking into a menu built on real ingredients and time-honored techniques — from hand-folded momo and wok-tossed noodles to slow-simmered curries and tandoori classics. Every dish carries a piece of home, made for everyone who walks through our doors.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 3. CULINARY PHILOSOPHY */}
//       <section className="py-16 md:py-20 border-t border-neutral-100">
//         <div className="mb-10">
//           <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Philosophy</p>
//           <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
//             Fresh ingredients, genuine care.
//           </h2>
//         </div>
        
//         {/* Grid matching the Gallery image grid style, but for text cards */}
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
//           {[
//             {
//               title: "Freshness First",
//               description: "Every dish is prepared to order using fresh, quality ingredients — never rushed, never compromised."
//             },
//             {
//               title: "Authentic Flavor",
//               description: "We stay true to traditional recipes and techniques, letting real honest cooking and flavor speak for itself."
//             },
//             {
//               title: "Hospitality from the Heart",
//               description: "Nepali hospitality means every guest is treated like family, from the exact moment they walk into our restaurant."
//             }
//           ].map((item, index) => (
//             <div 
//               key={index} 
//               className="p-8 rounded-md bg-neutral-50 border border-neutral-100 transition-colors hover:border-neutral-200"
//             >
//               <span className="block text-[11px] font-mono tracking-widest text-neutral-400 mb-4">
//                 0{index + 1}
//               </span>
//               <h3 className="text-lg font-medium text-neutral-900 mb-3">{item.title}</h3>
//               <p className="text-neutral-600 font-light leading-relaxed text-sm">
//                 {item.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 4. THE AMBIENCE */}
//       <section className="py-16 md:py-20 border-t border-neutral-100">
//         <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-4">The Ambience</p>
//         <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-10">
//           Vibrant and welcoming.
//         </h2>
        
//         <div className="group relative h-[300px] md:h-[450px] w-full overflow-hidden rounded-md bg-neutral-50 border border-neutral-100 mb-10">
//           <Image
//             src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
//             alt="Warm and inviting restaurant interior"
//             fill
//             className="object-cover grayscale-[20%] contrast-[105%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
//           />
//         </div>
        
//         <div className="max-w-3xl">
//           <p className="text-lg text-neutral-600 font-light leading-relaxed italic border-l-2 border-neutral-200 pl-6">
//             &ldquo;Step into a space that feels both vibrant and welcoming — warm lighting, comfortable seating, and inviting aromas drifting from an open kitchen. Whether you&apos;re stopping by for a quick bite or settling in for a long meal with family, Kings Noodles Restaurant offers a relaxed, unpretentious atmosphere designed for good food and good company.&rdquo;
//           </p>
//         </div>
//       </section>

//       {/* 5. THE PEOPLE */}
//       <section className="py-16 md:py-20 border-t border-neutral-100">
//         <div className="grid gap-12 md:grid-cols-2 md:items-center">
          
//           {/* Text Left (Mobile order changed to keep consistent) */}
//           <div className="order-2 md:order-1">
//             <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-4">The People</p>
//             <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-6">
//               The hands behind the food.
//             </h2>
//             <div className="space-y-6 text-neutral-600 font-light leading-relaxed">
//               <p>
//                 Behind every dish is a team of dedicated Nepali chefs and staff who bring years of culinary passion and genuine warmth to their work. We treat every order as an opportunity to deliver an exceptional dining experience rooted in authenticity.
//               </p>
//               <p>
//                 &ldquo;From the hands that fold each momo to the cooks who tend the wok and tandoor, our team treats every order as a chance to share a piece of home with you — because for us, cooking isn&apos;t just a job, it&apos;s hospitality.&rdquo;
//               </p>
//               <div className="pt-4 mt-8">
//                 <p className="text-sm font-medium text-neutral-900">
//                   The Team
//                 </p>
//                 <p className="text-xs text-neutral-400 mt-1">
//                   Kings Noodles Restaurant
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Image Right */}
//           <div className="order-1 md:order-2 group relative h-[300px] sm:h-[400px] w-full overflow-hidden rounded-md bg-neutral-50 border border-neutral-100">
//             <Image
//               src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=987&auto=format&fit=crop"
//               alt="Dedicated chef preparing authentic Asian dishes"
//               fill
//               sizes="(max-width: 768px) 100vw, 50vw"
//               className="object-cover grayscale-[20%] contrast-[105%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
//             />
//           </div>

//         </div>
//       </section>

//       {/* 6. SUBTLE CTA - MATCHING GALLERY PAGINATION BAR STYLE */}
//       <section className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 pb-16">
//         <p className="text-[11px] uppercase tracking-[0.15em] font-light text-neutral-400">
//           You&apos;ve read the story. Now taste it.
//         </p>
        
//         <Link 
//           href="/menu" 
//           className="text-[11px] uppercase tracking-[0.15em] font-medium text-neutral-900 transition-colors hover:text-neutral-500 flex items-center gap-2 group"
//         >
//           Explore the menu
//           <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
//         </Link>
//       </section>

//     </main>
//   );
// }


import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="bg-[#f9f8f6] pt-32 md:pt-40">
      
      {/* 1. HERO */}
      <section className="mx-auto max-w-4xl px-6 md:px-12 text-center mb-32 md:mb-48">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-10">
          Est. 2015 • Abu Dhabi
        </p>
        <h1 className="text-4xl md:text-7xl font-serif font-extralight tracking-tight text-stone-900 leading-[1.2] mb-12">
          Bringing people together, <br className="hidden md:block"/>
          <span className="italic">one plate</span> at a time.
        </h1>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-stone-500 font-light leading-[1.8]">
          Our vision is to build more than a restaurant — a gathering place where the flavors of Asia and the warmth of Nepali hospitality create moments worth savoring. We aim to become Abu Dhabi&apos;s home for honest, comforting food served with genuine care.
        </p>
      </section>

      {/* 2. OUR STORY */}
      <section className="bg-white border-y border-black/5 py-32 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-12 grid gap-16 md:gap-24 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
            <Image
              src="https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1000&auto=format&fit=crop"
              alt="Chefs cooking authentic Asian food in a wok"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1.5s] ease-in-out hover:scale-105 grayscale-[10%] hover:grayscale-0"
            />
          </div>
          
          <div className="max-w-lg">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-8">Our Story</p>
            <h2 className="text-3xl md:text-5xl font-serif font-extralight tracking-tight text-stone-900 mb-10 leading-tight">
              Born from a <span className="italic">simple idea.</span>
            </h2>
            <div className="space-y-6 text-stone-500 font-light leading-[1.8] text-base">
              <p>
                Kings Noodles Restaurant was born from a simple idea: to bring the bold, comforting flavors of Asian cuisine to the heart of Abu Dhabi, prepared the way we grew up eating it — fresh, generous, and full of heart. Founded and run by a team of proud Nepali restaurateurs, our journey began with a shared love of food and a desire to share it with our new home city.
              </p>
              <p>
                From our kitchen in Al Danah, we blend Chinese, Thai, Indian, and Nepali-inspired cooking into a menu built on real ingredients and time-honored techniques — from hand-folded momo and wok-tossed noodles to slow-simmered curries and tandoori classics. Every dish carries a piece of home, made for everyone who walks through our doors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY */}
      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="max-w-2xl mb-20">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-8">Philosophy</p>
            <h2 className="text-3xl md:text-5xl font-serif font-extralight tracking-tight text-stone-900 leading-tight">
              Fresh ingredients, <span className="italic">genuine care.</span>
            </h2>
          </div>
          
          <div className="grid gap-12 md:grid-cols-3 md:gap-16 border-t border-black/10 pt-16">
            {[
              { title: "Freshness First", description: "Every dish is prepared to order using fresh, quality ingredients — never rushed, never compromised." },
              { title: "Authentic Flavor", description: "We stay true to traditional recipes and techniques, letting real honest cooking and flavor speak for itself." },
              { title: "Heartfelt Hospitality", description: "Nepali hospitality means every guest is treated like family, from the exact moment they walk into our restaurant." }
            ].map((item, index) => (
              <div key={index} className="flex flex-col">
                <span className="block text-sm font-serif text-stone-300 mb-6">0{index + 1}</span>
                <h3 className="text-xl font-serif font-normal text-stone-900 mb-4 tracking-tight">{item.title}</h3>
                <p className="text-sm text-stone-500 font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AMBIENCE (Light Editorial layout) */}
      <section className="bg-white border-y border-black/5 py-32 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-12 grid gap-16 md:gap-24 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7 relative aspect-[5/6] w-full overflow-hidden bg-stone-100">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
              alt="Warm and inviting restaurant interior"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-[1.5s] ease-in-out hover:scale-105 grayscale-[10%] hover:grayscale-0"
            />
          </div>
          <div className="md:col-span-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-8">The Ambience</p>
            <h2 className="text-3xl md:text-5xl font-serif font-extralight tracking-tight text-stone-900 mb-10 leading-tight">
              Vibrant and <span className="italic">welcoming.</span>
            </h2>
            <blockquote className="text-lg text-stone-500 font-light leading-[1.8] italic border-l border-stone-300 pl-6">
              Step into a space that feels both vibrant and welcoming — warm lighting, comfortable seating, and inviting aromas drifting from an open kitchen. A relaxed, unpretentious atmosphere designed for good food and good company.
            </blockquote>
          </div>
        </div>
      </section>

      {/* 5. THE PEOPLE */}
      <section className="py-32 md:py-48">
        <div className="mx-auto max-w-7xl px-6 md:px-12 grid gap-16 md:gap-24 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5 order-2 md:order-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-8">The People</p>
            <h2 className="text-3xl md:text-5xl font-serif font-extralight tracking-tight text-stone-900 mb-10 leading-tight">
              The hands behind <span className="italic">the food.</span>
            </h2>
            <div className="space-y-6 text-stone-500 font-light leading-[1.8] text-base">
              <p>
                Behind every dish is a team of dedicated Nepali chefs and staff who bring years of culinary passion and genuine warmth to their work. We treat every order as an opportunity to deliver an exceptional dining experience rooted in authenticity.
              </p>
              <div className="pt-8 mt-8 border-t border-black/10">
                <p className="text-sm font-medium text-stone-900 tracking-wide">The Team</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400 mt-2">Kings Noodles Restaurant</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 order-1 md:order-2 relative aspect-[5/6] w-full overflow-hidden bg-stone-100">
            <Image
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop"
              alt="Dedicated chef preparing authentic Asian dishes"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-[1.5s] ease-in-out hover:scale-105 grayscale-[10%] hover:grayscale-0"
            />
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="pb-32 md:pb-48 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-8">You&apos;ve read the story</p>
          <h2 className="text-3xl md:text-5xl font-serif font-extralight tracking-tight text-stone-900 mb-12 leading-tight">
            Now taste <span className="italic">it.</span>
          </h2>
          <Link href="/menu" className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white bg-stone-900 px-10 py-5 hover:bg-stone-800 hover:text-amber-600 transition-all duration-300">
            Explore the Menu
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

    </main>
  );
}