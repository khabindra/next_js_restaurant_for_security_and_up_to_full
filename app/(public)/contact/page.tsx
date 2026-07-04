// app/(public)/contact/page.tsx
import ContactForm from "@/components/public/ContactForm";

const contactDetails = [
  { title: 'Find Us', text: '123 Culinary Lane, Baluwatar', subtext: 'Kathmandu 44600, Nepal', href: null },
  { title: 'Reservations', text: '+977-1-2345678', subtext: 'Available daily for bookings and inquiries', href: 'tel:+97712345678' },
  { title: 'Email', text: 'hello@labellacucina.com', subtext: 'For private events, press, or general feedback', href: 'mailto:hello@labellacucina.com' },
];

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 selection:bg-neutral-100">
      <div className="max-w-3xl border-b border-neutral-200/60 pb-12 md:pb-16">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-600">Get in Touch</p>
        <h1 className="mt-4 font-serif text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl md:text-6xl md:leading-[1.1]">
          Every great evening<br className="hidden sm:block" /> begins with a <span className="italic font-normal">conversation</span>.
        </h1>
      </div>

      <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-24">
        {/* Contact Directory Sidebar */}
        <div className="space-y-10 lg:col-span-5 lg:space-y-14">
          {contactDetails.map((detail) => (
            <div key={detail.title} className="group border-l border-neutral-200 pl-6 hover:border-amber-600 transition-colors duration-300">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 group-hover:text-amber-700 transition-colors duration-300">{detail.title}</h3>
              {detail.href ? (
                <a href={detail.href} className="mt-3 block text-base font-medium text-neutral-800 group-hover:text-amber-700 transition-colors duration-300">{detail.text}</a>
              ) : (
                <p className="mt-3 text-base font-medium text-neutral-800">{detail.text}</p>
              )}
              {detail.subtext && <p className="mt-1.5 text-sm text-neutral-400 font-light">{detail.subtext}</p>}
            </div>
          ))}

          {/* Operating Hours Card */}
          <div className="rounded-2xl bg-stone-50 p-6 md:p-8 border border-stone-100">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-4">Opening Hours</h4>
            <div className="space-y-0 text-sm text-neutral-500 font-light">
              <div className="flex justify-between border-b border-neutral-200/40 py-2">
                <span>Tuesday — Sunday (Dinner)</span>
                <span className="font-medium text-neutral-800 tabular-nums">18:00 – 23:00</span>
              </div>
              <div className="flex justify-between border-b border-neutral-200/40 py-2">
                <span>Friday — Sunday (Lunch)</span>
                <span className="font-medium text-neutral-800 tabular-nums">12:00 – 15:00</span>
              </div>
              <div className="flex justify-between py-2 text-neutral-400 italic">
                <span>Mondays</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container Panel */}
        <div className="lg:col-span-7">
          <div className="mb-8">
            <h2 className="text-xl font-medium tracking-tight text-neutral-900">Write to us</h2>
            <p className="mt-1 text-sm text-neutral-400 font-light">We read every message and respond personally within 24 hours.</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}