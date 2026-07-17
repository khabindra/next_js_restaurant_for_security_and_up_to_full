import ReservationForm from '@/components/public/ReservationForm';

const housePolicies = [
  { title: 'Arrival Time', text: 'We hold your table for 15 minutes past your reserved time. If you are running late, please notify us so we can ensure your table is ready upon arrival.' },
  { title: 'Dietary Accommodations', text: 'Our culinary team gracefully accommodates allergies and dietary preferences. Please specify any requirements in the booking form.' },
  { title: 'Attire', text: 'We observe a smart elegant dress code. We kindly ask guests to refrain from athletic wear, flip-flops, or casual shorts during evening service.' },
];

export default function ReservationPage() {
  return (
    <main className="bg-[#f9f8f6]">
      
      {/* HERO - Unified Light Background */}
      <section className="pt-40 md:pt-56 pb-24 md:pb-32 border-b border-black/5">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-10">
            Reservations
          </p>
          <h1 className="text-4xl md:text-7xl font-serif font-extralight tracking-tight text-stone-900 leading-[1.2] mb-12">
            Reserve <br className="hidden md:block"/>
            <span className="italic">your evening.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-stone-500 font-light leading-[1.8]">
            We invite you to secure your preferred date and time. Should your plans change, our team is readily available to assist.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 md:px-12 py-32 md:py-48">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
          
          <div className="lg:col-span-5 space-y-16">
            <div className="border-t border-black/10 pt-12">
              <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-8">House Guidelines</h3>
              <div className="space-y-10">
                {housePolicies.map((policy) => (
                  <div key={policy.title}>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500 mb-3">{policy.title}</p>
                    <p className="text-sm text-stone-500 font-light leading-[1.8] max-w-sm">{policy.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-black/10 pt-12">
              <h4 className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-8">Private Dining</h4>
              <p className="text-sm text-stone-500 font-light leading-[1.8]">
                For parties of eight or more, or to inquire about full venue buyouts, please contact our events team directly at{' '}
                <a href="tel:+971506089304" className="font-medium text-stone-900 border-b border-stone-300 hover:border-stone-900 hover:text-amber-600 transition-colors pb-0.5">
                  +971 506089304
                </a>
                .
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-16 lg:border-l lg:border-black/10">
            <div className="mb-12">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-6">Your Details</p>
              <h2 className="text-2xl md:text-3xl font-serif font-extralight tracking-tight text-stone-900 leading-tight">
                Complete the form below to receive an instant email confirmation.
              </h2>
            </div>
            <ReservationForm />
          </div>

        </div>
      </section>
      
    </main>
  );
}