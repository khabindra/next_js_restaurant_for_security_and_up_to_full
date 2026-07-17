export default function TermsPage() {
  return (
    <main className="bg-[#f9f8f6] pt-32 md:pt-40">
      
      {/* HERO */}
      <section className="mx-auto max-w-4xl px-6 md:px-12 text-center mb-24 md:mb-32">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-10">
          Legal
        </p>
        <h1 className="text-4xl md:text-7xl font-serif font-extralight tracking-tight text-stone-900 leading-[1.2] mb-8">
          Terms of <span className="italic">Service</span>
        </h1>
        <p className="text-sm text-stone-400 font-light tracking-wide">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </section>

      {/* CONTENT */}
      <section className="bg-white border-y border-black/5 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 md:px-12 space-y-16">
          
          <div>
            <h2 className="text-2xl font-serif font-light tracking-tight text-stone-900 mb-6">
              Acceptance of Terms
            </h2>
            <p className="text-stone-500 font-light leading-[1.8] text-base">
              Welcome to Kings Noodles Restaurant. By accessing and using our website, making a reservation, or utilizing our services, you agree to abide by these Terms of Service. If you do not agree with any part of these terms, please refrain from using our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-light tracking-tight text-stone-900 mb-6">
              Reservations & Cancellations
            </h2>
            <p className="text-stone-500 font-light leading-[1.8] text-base">
              We strive to accommodate all guests. Reservations are confirmed based on availability. We kindly request at least 24 hours' notice for cancellations or modifications. For large parties or private events, specific deposit and cancellation terms will be communicated at the time of booking.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-light tracking-tight text-stone-900 mb-6">
              House Policies
            </h2>
            <ul className="space-y-4 text-stone-500 font-light leading-[1.8] text-base list-disc pl-6">
              <li><strong className="font-medium text-stone-700">Arrival:</strong> We hold tables for 15 minutes past the reservation time. Late arrivals may result in a shortened dining window.</li>
              <li><strong className="font-medium text-stone-700">Attire:</strong> We observe a smart elegant dress code. Athletic wear and casual beachwear are discouraged during evening service.</li>
              <li><strong className="font-medium text-stone-700">Dietary Needs:</strong> While we accommodate allergies where possible, our kitchen handles all major allergens. Please inform us of any severe allergies in advance.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-light tracking-tight text-stone-900 mb-6">
              Intellectual Property
            </h2>
            <p className="text-stone-500 font-light leading-[1.8] text-base">
              All content on this website, including text, graphics, logos, and images, is the property of Kings Noodles Restaurant or its licensors and is protected by copyright laws. You may not reproduce, distribute, or use any content without prior written consent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-light tracking-tight text-stone-900 mb-6">
              Modifications
            </h2>
            <p className="text-stone-500 font-light leading-[1.8] text-base">
              Kings Noodles Restaurant reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Continued use of the website following any changes signifies your acceptance of the updated terms.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}