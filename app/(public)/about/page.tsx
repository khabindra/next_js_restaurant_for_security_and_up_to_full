import Link from 'next/link';

export default function AboutPage() {
  return (
    // Changed max-w-4xl to max-w-6xl, and unified padding with the rest of the site
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      
      {/* 1. THE INTRODUCTION (The Vision) */}
      <section className="mb-20 md:mb-28 text-center md:text-left">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-600 mb-6">The Vision</p>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl leading-tight">
          A quiet rebellion<br className="hidden sm:block" /> against fast dining.
        </h1>
        <p className="mt-8 max-w-2xl mx-auto md:mx-0 text-lg md:text-xl leading-relaxed text-neutral-500 font-light">
          In the heart of Kathmandu, La Bella Cucina exists as a sanctuary of old-world Italian grace—a place where the rhythm of the kitchen dictates the pace of your evening, and honest simplicity is the highest form of luxury.
        </p>
      </section>

      {/* 2. OUR STORY (The Spark) */}
      <section className="mb-20 md:mb-28 border-t border-neutral-100 pt-16">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 mb-6">Our Story</p>
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-6">
              Born in a family kitchen.
            </h2>
            <p className="text-base leading-relaxed text-neutral-600">
              La Bella Cucina began not as a business plan, but as a deep nostalgia for the Sunday dinners of our childhood in Italy. We wanted to recreate that specific kind of warmth—the clinking of glasses, the smell of garlic hitting olive oil, the hours spent lingering around a table until the candles burned low.
            </p>
          </div>
          <div className="md:pt-12">
            <p className="text-base leading-relaxed text-neutral-600">
              We brought that vision to Kathmandu to create more than just a restaurant; we wanted to build a gathering place for our community. A room where friends become family, where celebrations are anchored by exceptional food, and where the art of hospitality is treated with the same reverence as the cooking itself.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CULINARY PHILOSOPHY (Sourcing & Technique) */}
      <section className="mb-20 md:mb-28 border-t border-neutral-100 pt-16">
        <div className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 mb-6">Philosophy</p>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Rooted in technique, driven by the season.
          </h2>
        </div>
        
        <div className="grid gap-0 border-t border-l border-r border-neutral-100 md:grid-cols-3">
          {[
            {
              title: "The Daily Roll",
              description: "We do not buy dried pasta. Every strand of spaghetti and every sheet of lasagna is rolled by hand each morning, offering a texture that simply cannot be replicated by a machine."
            },
            {
              title: "Local & Seasonal",
              description: "Italian cuisine is inherently regional. We adapt this by sourcing 90% of our produce from organic farms in the Kathmandu valley, letting the seasons write our menu."
            },
            {
              title: "Live Wood Fire",
              description: "Our kitchen is anchored by a custom-built wood-burning hearth. It imparts a subtle, smoky char to our pizzas and meats that gas or electric ovens simply cannot achieve."
            }
          ].map((item, index) => (
            <div key={index} className={`p-8 md:p-10 border-b border-neutral-100 ${index < 2 ? 'md:border-r' : ''}`}>
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed text-neutral-500">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE AMBIENCE (The Vibe) */}
      {/* Adjusted to stay perfectly inside the max-w-6xl container bounds */}
      <section className="mb-20 md:mb-28 bg-stone-50 rounded-3xl p-8 md:p-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 mb-6">The Ambience</p>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-6">
            Low light. Quiet conversation.
          </h2>
          <p className="text-base leading-relaxed text-neutral-600 italic">
            &ldquo;Walking into La Bella Cucina feels like stepping into a private villa. The lighting is deliberately low, washed in warm amber. There is no rush here—only the quiet hum of conversation, the soft clink of porcelain, and the distant, rhythmic sound of the open kitchen. It is intimate without being cramped, elegant without being stiff.&rdquo;
          </p>
        </div>
      </section>

      {/* 5. THE PEOPLE (Humanizing the brand) */}
      <section className="mb-20 md:mb-28 border-t border-neutral-100 pt-16">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 mb-6">The People</p>
        <div className="grid gap-12 md:grid-cols-5 items-center">
          {/* Chef Image Placeholder */}
          <div className="md:col-span-2 relative aspect-[4/5] w-full max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden bg-stone-100">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=987&auto=format&fit=crop"
              alt="Head Chef Marco Rossi preparing fresh pasta in the kitchen"
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Chef Bio */}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-6">
              The hands behind the food.
            </h2>
            <p className="text-base leading-relaxed text-neutral-600">
              Led by Executive Chef Marco Rossi, our kitchen is a tight-knit brigade of artisans who share an obsession for detail. Chef Marco brings over two decades of experience from kitchens across Rome and Florence, but his cooking remains deeply tied to his roots.
            </p>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              &ldquo;I don&apos;t want to surprise people with complicated tricks,&rdquo; he says. &ldquo;I want to comfort them with perfect execution. A great plate of pasta doesn&apos;t need to be modernized; it just needs to be made with absolute respect for the ingredients.&rdquo;
            </p>
            <p className="mt-6 text-sm font-semibold text-neutral-900">
              Marco Rossi, <span className="font-normal text-neutral-500">Executive Chef & Co-Founder</span>
            </p>
          </div>
        </div>
      </section>

      {/* 6. SUBTLE NEXT STEP (Instead of a hard CTA) */}
      <section className="border-t border-neutral-100 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-400">
          You&apos;ve read the story. Now taste it.
        </p>
        <Link 
          href="/menu" 
          className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-900 transition-colors hover:text-amber-600"
        >
          Explore the menu
          <svg 
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </section>

    </main>
  );
}