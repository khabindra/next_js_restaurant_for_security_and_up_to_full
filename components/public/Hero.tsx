
// components/public/Hero.tsx
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center bg-white overflow-hidden">
      {/* Changed lg: to md: for padding */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-0">
        {/* Changed lg: to md: for grid and gap */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          
          {/* Left Column: Content */}
          {/* Changed lg: to md: for order and text alignment */}
          <div className="order-2 md:order-1 text-center md:text-left">
            {/* Changed lg: to md: for accent bar alignment */}
            <div className="mb-6 h-1 w-12 rounded-full bg-amber-600 mx-auto md:mx-0" aria-hidden="true" />
            
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
              A taste of Italy, right here in Kathmandu
            </h1>
            
            {/* Changed lg: to md: for paragraph margin */}
            <p className="mt-6 max-w-xl mx-auto md:mx-0 text-lg leading-relaxed text-neutral-600 sm:text-xl">
              Fresh ingredients, time‑honored recipes, and warm hospitality. 
              Reserve your table today for an unforgettable dining experience.
            </p>
            
            {/* Changed lg: to md: for button alignment */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
              <Link href="/reservation">
                <Button size="lg">
                  Reserve a table
                </Button>
              </Link>
              <Link href="/menu">
                <Button variant="outline" size="lg">
                  View menu
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          {/* Changed lg: to md: for order */}
          <div className="order-1 md:order-2">
            {/* Changed lg: to md: for max width */}
            <div className="relative mx-auto w-full max-w-md md:max-w-none">
              <img
                // src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2670&auto=format&fit=crop"
                src="./hero-image.png"
                alt="A beautifully plated gourmet Italian dish with fresh ingredients at La Bella Cucina"
                className="h-auto w-full rounded-2xl object-cover shadow-2xl aspect-[4/5] sm:aspect-square md:aspect-square"
              />
              
              {/* Changed lg: to md: for decorative shape position */}
              <div 
                className="absolute -z-10 h-full w-full rounded-2xl bg-amber-100/50 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6" 
                aria-hidden="true" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}