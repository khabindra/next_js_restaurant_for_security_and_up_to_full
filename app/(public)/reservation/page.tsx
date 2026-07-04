import ReservationForm from '@/components/public/ReservationForm';

const housePolicies = [
  {
    title: 'Arrival Time',
    text: 'We hold your table for 15 minutes past your reserved time. If you are running late, please notify us so we can ensure your table is ready upon arrival.',
  },
  {
    title: 'Dietary Accommodations',
    text: 'Our culinary team gracefully accommodates allergies and dietary preferences. Please specify any requirements in the booking form.',
  },
  {
    title: 'Attire',
    text: 'We observe a smart elegant dress code. We kindly ask guests to refrain from athletic wear, flip-flops, or casual shorts during evening service.',
  },
];

export default function ReservationPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 selection:bg-neutral-100">
      
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-24 lg:items-start">
        
        {/* Left Column: Editorial Copy & House Guidelines */}
        <div className="lg:col-span-5 flex flex-col">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-600 mb-6">
            Reservations
          </p>
          
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl leading-[1.1]">
            Reserve<br />
            <span className="italic font-normal text-neutral-500">your evening.</span>
          </h1>
          
          <p className="mt-6 max-w-sm text-lg text-neutral-500 leading-relaxed font-light">
            We invite you to secure your preferred date and time. Should your plans change, our team is readily available to assist.
          </p>

          {/* Guidelines Section */}
          <div className="mt-14 space-y-8 border-t border-neutral-200/60 pt-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
              House Guidelines
            </h2>
            <div className="space-y-6">
              {housePolicies.map((policy) => (
                <div key={policy.title} className="group">
                  <h3 className="text-sm font-medium text-neutral-800 transition-colors duration-300 group-hover:text-amber-600 active:text-amber-600">
                    {policy.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-500 font-light leading-relaxed">
                    {policy.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Large Parties Callout */}
            <div className="rounded-2xl bg-stone-50 p-6 border border-stone-100 mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-2">
                Private Dining
              </h4>
              <p className="text-sm text-neutral-500 font-light leading-relaxed">
                For parties of eight or more, or to inquire about full venue buyouts, please contact our events team directly at{' '}
                <a 
                  href="tel:+97712345678" 
                  className="font-medium text-neutral-800 underline underline-offset-2 decoration-neutral-300 transition-colors duration-300 hover:text-amber-600 hover:decoration-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-sm"
                >
                  +977-1-2345678
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: The Reservation Module */}
        <div className="lg:col-span-7 flex flex-col lg:pt-10">
          <div className="mb-8 border-b border-neutral-100 pb-6">
            <h2 className="text-xl font-medium tracking-tight text-neutral-900">
              Your Details
            </h2>
            <p className="mt-1 text-sm text-neutral-400 font-light">
              Complete the form below to receive an instant email confirmation.
            </p>
          </div>
          
          <ReservationForm />
        </div>

      </div>
      
    </main>
  );
}