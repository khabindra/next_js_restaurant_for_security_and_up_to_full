'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import testimonials from '@/data/testimonial';

const StarIcon = () => (
  <svg className="h-3.5 w-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function Testimonial() {
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  const originalLength = testimonials.length;

  const [currentIndex, setCurrentIndex] = useState(originalLength);
  const [isTransitioning, setIsTransitioning] = useState(false); // Start false so clicks are allowed initially
  const [isReady, setIsReady] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const getTransform = () => {
    if (!isReady || !containerRef.current || !trackRef.current) return 'translateX(0)';
    const containerWidth = containerRef.current.offsetWidth;
    const activeCard = trackRef.current.children[currentIndex] as HTMLElement;
    if (!activeCard) return 'translateX(0)';

    const cardCenter = activeCard.offsetLeft + (activeCard.offsetWidth / 2);
    const screenCenter = containerWidth / 2;

    return `translateX(${screenCenter - cardCenter}px)`;
  };

  const handleInfiniteLoopReset = (targetIndex: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false); // Turn off transition for instant snap back
      setCurrentIndex(targetIndex);
    }, 500); // Matches transition duration
  };

  const nextSlide = () => {
    if (isTransitioning) return; // Prevent spam-clicking during transition animations
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex === originalLength * 2) {
        handleInfiniteLoopReset(originalLength);
      } else {
        // Normal slide animation cooldown
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsTransitioning(false), 500);
      }
      return nextIndex;
    });
  };

  const prevSlide = () => {
    if (isTransitioning) return; // Prevent spam-clicking during transition animations
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const nextIndex = prev - 1;
      if (nextIndex === originalLength - 1) {
        handleInfiniteLoopReset(originalLength * 2 - 1);
      } else {
        // Normal slide animation cooldown
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsTransitioning(false), 500);
      }
      return nextIndex;
    });
  };

  // NATIVE MOBILE SWIPE SUPPORT
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsTransitioning(false); 
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !containerRef.current || !trackRef.current) return;

    const currentX = e.touches[0].clientX;
    const diffX = touchStartX.current - currentX;

    const containerWidth = containerRef.current.offsetWidth;
    const activeCard = trackRef.current.children[currentIndex] as HTMLElement;
    if (!activeCard) return;

    const cardCenter = activeCard.offsetLeft + (activeCard.offsetWidth / 2);
    const screenCenter = containerWidth / 2;
    const baseTranslateX = screenCenter - cardCenter;

    trackRef.current.style.transform = `translateX(${baseTranslateX - diffX}px)`;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    setIsTransitioning(true);

    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    } else {
      // If swipe wasn't far enough, reset transition flag after snap back animation finishes
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsTransitioning(false), 500);
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const measureWidth = () => {
      if (trackRef.current && trackRef.current.children.length > 1) {
        setIsReady(true);
      }
    };

    const timer = setTimeout(measureWidth, 50);
    window.addEventListener('resize', measureWidth);
    return () => {
      window.removeEventListener('resize', measureWidth);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const activeDotIndex = currentIndex % originalLength;

  return (
    <section className="relative overflow-hidden bg-stone-50 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">

        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 mb-4">Testimonials</p>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
            What Our Guests Say
          </h2>
        </div>

        <div className="relative mt-16 flex items-center justify-center">

          {/* Left Arrow */}
          <div className="absolute left-0 sm:left-4 md:left-8 lg:left-16 z-40">
            <button 
              onClick={prevSlide} 
              className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-600 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-stone-900 hover:text-stone-900 hover:shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400" 
              aria-label="Previous testimonial"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>

          {/* Right Arrow */}
          <div className="absolute right-0 sm:right-4 md:right-8 lg:right-16 z-40">
            <button 
              onClick={nextSlide} 
              className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-600 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-stone-900 hover:text-stone-900 hover:shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400" 
              aria-label="Next testimonial"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          <div 
            ref={containerRef}
            className={`w-full overflow-hidden py-10 transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={trackRef}
              className="flex gap-6 md:gap-8"
              style={{
                transform: getTransform(),
                transition: isTransitioning ? 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
              }}
            >
              {extendedTestimonials.map((testimonial, idx) => {
                const isCenter = idx === currentIndex;
                const isLeft = idx === currentIndex - 1;
                const isRight = idx === currentIndex + 1;
                const isVisible = isCenter || isLeft || isRight;

                return (
                  <article
                    key={`${testimonial.id}-${idx}`}
                    className={`relative flex w-[85vw] sm:w-[320px] md:w-[380px] lg:w-[420px] flex-shrink-0 flex-col rounded-3xl border border-stone-100 bg-white p-8 md:p-10 shadow-sm transition-all duration-500 ease-out ${
                      isCenter
                        ? 'scale-100 opacity-100 shadow-xl border-stone-200 z-30'
                        : 'scale-[0.88] opacity-0 shadow-none border-transparent z-10 md:opacity-40'
                    } ${!isVisible ? 'invisible' : 'visible'}`}
                  >
                    <span className="absolute top-4 right-6 font-serif text-8xl leading-none text-stone-50 select-none pointer-events-none" aria-hidden="true">
                      &ldquo;
                    </span>

                    <div className="relative z-10 flex items-center gap-4 mb-6">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-stone-100">
                        <Image 
                          src={testimonial.avatar} 
                          alt={`Avatar of ${testimonial.name}`} 
                          fill 
                          className="object-cover" 
                          sizes="48px" 
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-900 tracking-tight">{testimonial.name}</p>
                        <p className="text-xs text-stone-400 mt-0.5">{testimonial.location}</p>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>
                    </div>

                    <p className="relative z-10 flex-1 text-sm md:text-base leading-relaxed text-stone-600 italic overflow-y-auto">
                      {testimonial.quote}
                    </p>

                    <div className="relative z-10 mt-8 pt-4 border-t border-stone-50">
                      <span className="text-[10px] font-medium uppercase tracking-widest text-stone-400">
                        Verified Guest
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Minimal Pill Navigation */}
        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isTransitioning) return;
                setIsTransitioning(true);
                setCurrentIndex(originalLength + index);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => setIsTransitioning(false), 500);
              }}
              className={`h-1 transition-all duration-500 rounded-full focus:outline-none ${
                index === activeDotIndex ? 'w-8 bg-stone-900' : 'w-1 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}