import Card from '@/components/ui/Card';
import Link from 'next/link';

const servicesList = [
  {
    title: 'Private Dining',
    description:
      'An intimate, secluded room perfect for milestone celebrations or confidential business dinners, complete with a customized tasting menu.',
  },
  {
    title: 'Bespoke Catering',
    description:
      'We bring the La Bella Cucina experience directly to your venue. Custom menus crafted flawlessly for weddings, galas, and private estate events.',
  },
  {
    title: "Chef's Table Experience",
    description:
      'Take a seat at the heart of the kitchen. Watch our chefs orchestrate a multi-course dinner right before your eyes, paired with live commentary.',
  },
  {
    title: 'Culinary Masterclasses',
    description:
      'Roll up your sleeves and learn the art of handmade pasta, seasonal sauces, or classic Italian desserts in a hands-on weekend workshop.',
  },
  {
    title: 'Wine Cellar Tastings',
    description:
      'Join our head sommelier in our underground cellar for an evening of rare Italian vintages, artisanal cheeses, and curated pairings.',
  },
  {
    title: 'Corporate Packages',
    description:
      'Impress your most valued clients with a flawlessly executed corporate lunch or dinner, featuring dedicated staff and seamless, discreet service.',
  },
];

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      
      {/* Minimal Elegant Header */}
      <div className="mb-16 md:mb-24">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-600 mb-6">Experiences</p>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
          More than a restaurant.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-500 leading-relaxed font-light">
          We offer a variety of bespoke experiences tailored to your exact needs, extending our hospitality beyond the dining room.
        </p>
      </div>

      {/* Premium Grid Layout */}
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
        {servicesList.map((service) => (
          <Card 
            key={service.title} 
            /* Added active:scale-[0.98] for premium tactile feedback on mobile tap */
            className="group flex h-full flex-col rounded-none border-0 bg-transparent p-0 shadow-none transition-all duration-300 active:scale-[0.98]"
          >
            {/* Service Title */}
            <div className="pb-5 mb-5 border-b border-neutral-100">
              <h3 className="text-lg font-medium tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-amber-600 active:text-amber-600">
                {service.title}
              </h3>
            </div>

            {/* Description Text */}
            <p className="flex-1 text-sm leading-relaxed text-neutral-500">
              {service.description}
            </p>

            {/* Premium Text Arrow CTA */}
            <div className="mt-8">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2.5 text-sm font-medium text-neutral-900 transition-all duration-300 group-hover:text-amber-600 active:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-sm"
              >
                Inquire
                <svg 
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 active:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </Card>
        ))}
      </div>

    </main>
  );
}