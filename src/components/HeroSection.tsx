import { useEffect, useState } from 'react';
import { WEDDING_IMAGES, WEDDING_INFO } from '../data/weddingData';
import Reveal from './Reveal';

export default function HeroSection() {
  const [slideIndex, setSlideIndex] = useState(0);

  // Matches Elementor settings: slide_duration: 250, transition_duration: 3000ms (continuous slow dissolve)
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % WEDDING_IMAGES.heroSlides.length);
    }, 3250);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="cover"
      className="min-h-dvh-screen relative flex w-full items-end justify-center overflow-hidden bg-[#1F1F1F]"
    >
      {/* Background Ken Burns Slideshow: Foto 1 & 2 disandingkan, bergantian dengan Foto 3 & 4 */}
      <div id="_foto_penutup_slideshow" className="absolute inset-0 overflow-hidden">
        {WEDDING_IMAGES.heroSlides.map((pair, idx) => {
          const isActive = idx === slideIndex;
          return (
            <div
              key={`${pair.left}-${pair.right}`}
              style={{ transitionDuration: '3000ms' }}
              className={`absolute inset-0 grid grid-cols-2 transition-opacity ease-in-out ${
                isActive ? 'z-10 opacity-100' : 'z-0 opacity-0'
              }`}
            >
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={pair.left}
                  alt={pair.leftAlt}
                  referrerPolicy="no-referrer"
                  decoding="async"
                  className={`h-full w-full object-cover object-top ${
                    isActive ? 'elementor-ken-burns-in' : ''
                  }`}
                />
              </div>
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={pair.right}
                  alt={pair.rightAlt}
                  referrerPolicy="no-referrer"
                  decoding="async"
                  className={`h-full w-full object-cover object-top ${
                    isActive ? 'elementor-ken-burns-in' : ''
                  }`}
                />
              </div>
            </div>
          );
        })}
        {/* Dark scrim #1F1F1F opacity 0.55 + bottom gradient for contrast */}
        <div className="absolute inset-0 z-20 bg-[#1F1F1F]/55" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Bottom-left editorial lockup inside max-w-[500px] */}
      <div className="relative z-30 w-full max-w-[500px] px-6 pb-16 pt-24 text-left text-white sm:pb-20">
        <Reveal animation="fadeInDown" slow delay={100}>
          <p className="font-lato text-sm tracking-[0.18em] uppercase text-white/90 sm:text-base">
            The Wedding Of
          </p>
        </Reveal>

        <Reveal animation="fadeInDown" slow delay={100}>
          <h2 className="font-italiana mt-1 text-[44px] font-light leading-tight tracking-normal text-white capitalize sm:text-[59px]">
            {WEDDING_INFO.coupleShort}
          </h2>
        </Reveal>

        <Reveal animation="fadeInDown" slow>
          <p className="font-lato -mt-1 text-base italic text-white/95 sm:text-xl">
            {WEDDING_INFO.eventDateLabel}
          </p>
        </Reveal>

        <Reveal animation="fadeInUp" slow>
          <blockquote className="font-lato mt-6 max-w-md text-[15px] leading-relaxed font-normal text-white/90 sm:text-lg">
            {WEDDING_INFO.heroQuote}
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
