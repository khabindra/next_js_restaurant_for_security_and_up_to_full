import Image from 'next/image';

export default function Atmosphere() {
  return (
    <section className="bg-white border-y border-black/5 py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-center">
        
        <div className="md:col-span-5 md:order-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-8 block">
            The Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-extralight tracking-tight text-stone-900 mb-10 leading-tight">
            An intimate <span className="italic">setting.</span>
          </h2>
          <p className="text-stone-500 font-light leading-[1.8] mb-10 text-base md:text-lg max-w-md">
            Step into a space designed for conversation and connection. From the warmth 
            of our lighting to the texture of our stone tables, every element is curated 
            to ensure your evening is as memorable as the cuisine itself.
          </p>
          <div className="w-12 h-px bg-stone-300"></div>
        </div>

        <div className="md:col-span-7 md:order-1 relative aspect-[4/5] md:aspect-[5/6] w-full overflow-hidden bg-stone-100">
          <Image 
            // Using a high-quality restaurant interior image from Unsplash
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" 
            alt="Restaurant interior ambiance"
            fill
            className="object-cover transition-transform duration-[1.5s] ease-in-out hover:scale-105 grayscale-[10%] hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>
      </div>
    </section>
  );
}