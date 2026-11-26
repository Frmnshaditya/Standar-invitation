import { useEffect, useState } from 'react';
import { WEDDING_IMAGES, WEDDING_INFO } from '../data/weddingData';
import Reveal from './Reveal';

export default function ClosingSection() {
  const [slideIndex, setSlideIndex] = useState(0);

  // Selang-seling background dengan dua foto pertama
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % WEDDING_IMAGES.closingBackdropSlides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <footer className="min-h-dvh-screen relative flex w-full items-center justify-center overflow-hidden bg-[#0C0C0C] px-6 py-20 text-center text-white">
      {WEDDING_IMAGES.closingBackdropSlides.map((pair, idx) => {
        const isActive = idx === slideIndex;
        return (
          <div
            key={`${pair.left}-${pair.right}`}
            style={{ transitionDuration: '2000ms' }}
            className={`absolute inset-0 grid grid-cols-2 transition-opacity ease-in-out ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={pair.left}
              alt={pair.leftAlt}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-top"
            />
            <img
              src={pair.right}
              alt={pair.rightAlt}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-top"
            />
          </div>
        );
      })}
      {/* Matching linear-gradient(180deg, #00000078 36%, #000000 100%) opacity 0.87 */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.47) 36%, #000000 100%)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[400px] flex-col items-center">
        <Reveal animation="zoomIn">
          <p className="font-lato text-[15px] leading-relaxed text-white/90 sm:text-base">
            {WEDDING_INFO.closingMessage}
          </p>

          <p
            className="mt-5 text-lg leading-relaxed text-white/95 sm:text-xl"
            dir="rtl"
            lang="ar"
          >
            {WEDDING_INFO.closingSalam}
          </p>
        </Reveal>

        <Reveal animation="bounceIn" slow delay={100}>
          <p className="font-italiana mt-10 text-4xl font-normal tracking-wide text-white sm:text-5xl">
            {WEDDING_INFO.coupleShort}
          </p>
        </Reveal>

        <p className="font-lato mt-12 text-xs tracking-widest uppercase text-white/50">
          {WEDDING_INFO.eventDateLabel}
        </p>
      </div>
    </footer>
  );
}
