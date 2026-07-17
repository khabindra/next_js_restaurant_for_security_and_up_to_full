export default function PrivacyPage() {
  return (
    <main className="bg-[#f9f8f6] pt-32 md:pt-40">
      
      {/* HERO */}
      <section className="mx-auto max-w-4xl px-6 md:px-12 text-center mb-24 md:mb-32">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-10">
          Legal
        </p>
        <h1 className="text-4xl md:text-7xl font-serif font-extralight tracking-tight text-stone-900 leading-[1.2] mb-8">
          Privacy <span className="italic">Policy</span>
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
              Introduction
            </h2>
            <p className="text-stone-500 font-light leading-[1.8] text-base">
              At Kings Noodles Restaurant, we are committed to protecting your privacy. This policy outlines the types of personal information we collect, how it is used, and the choices you have regarding your information. By using our website and services, you agree to the practices described in this policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-light tracking-tight text-stone-900 mb-6">
              Information We Collect
            </h2>
            <p className="text-stone-500 font-light leading-[1.8] text-base mb-4">
              We collect information to provide and improve our services. The types of information we may collect include:
            </p>
            <ul className="space-y-4 text-stone-500 font-light leading-[1.8] text-base list-disc pl-6">
              <li><strong className="font-medium text-stone-700">Reservation Details:</strong> Name, contact number, email, and party size.</li>
              <li><strong className="font-medium text-stone-700">Contact Inquiries:</strong> Information you provide when reaching out via our contact forms.</li>
              <li><strong className="font-medium text-stone-700">Usage Data:</strong> IP address, browser type, and pages visited to enhance user experience.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-light tracking-tight text-stone-900 mb-6">
              How We Use Your Information
            </h2>
            <p className="text-stone-500 font-light leading-[1.8] text-base">
              Your information is used solely to process reservations, respond to inquiries, personalize your dining experience, and occasionally inform you about special events or menu updates. We do not sell or rent your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-light tracking-tight text-stone-900 mb-6">
              Data Security
            </h2>
            <p className="text-stone-500 font-light leading-[1.8] text-base">
              We implement rigorous administrative, technical, and physical safeguards to protect your personal information against unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-light tracking-tight text-stone-900 mb-6">
              Contact Us
            </h2>
            <p className="text-stone-500 font-light leading-[1.8] text-base">
              If you have any questions regarding this Privacy Policy, please reach out to us at{' '}
              <a href="mailto:kingsnoodlesr@gmail.com" className="text-stone-900 border-b border-stone-300 hover:border-stone-900 transition-colors pb-0.5">
                kingsnoodlesr@gmail.com
              </a>.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}