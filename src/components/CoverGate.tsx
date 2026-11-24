import { useEffect, useState } from 'react';
import { MailOpen } from 'lucide-react';
import { WEDDING_IMAGES, WEDDING_INFO } from '../data/weddingData';
import Reveal from './Reveal';

interface CoverGateProps {
  guestName: string;
  onOpen: () => void;
}

export default function CoverGate({ guestName, onOpen }: CoverGateProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  // Matches Elementor settings: slide_duration: 2500ms, transition_duration: 2500ms
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % WEDDING_IMAGES.coverSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="_foto_pembuka_slideshow"
      aria-label="Sampul Undangan"
      className="min-h-dvh-screen relative flex w-full items-center justify-center overflow-hidden bg-[#202020]"
    >
      {/* Background Ken Burns Slideshow (2500ms crossfade + zoom-in) */}
      <div className="absolute inset-0 overflow-hidden">
        {WEDDING_IMAGES.coverSlides.map((src, idx) => {
          const isActive = idx === slideIndex;
          return (
            <div
              key={src}
              style={{ transitionDuration: '2500ms' }}
              className={`absolute inset-0 transition-opacity ease-in-out ${
                isActive ? 'z-10 opacity-100' : 'z-0 opacity-0'
              }`}
            >
              <img
                key={isActive ? `active-${slideIndex}` : `idle-${idx}`}
                src={src}
                alt="Potret Dewi & Deni"
                referrerPolicy="no-referrer"
                className={`h-full w-full object-cover object-center ${
                  isActive ? 'elementor-ken-burns-in' : ''
                }`}
              />
            </div>
          );
        })}
        {/* Dark overlay matching #202020 opacity 0.66 */}
        <div className="absolute inset-0 z-20 bg-[#202020]/65" />
      </div>

      {/* Centered Max-500px Invitation Cover Content */}
      <div className="min-h-dvh-screen relative z-30 flex w-full max-w-[500px] flex-col items-center justify-end px-6 pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-16 text-center text-white sm:justify-center sm:pb-20">
        <Reveal animation="bounceIn" slow delay={100} triggerImmediately>
          <p className="font-lato text-sm tracking-[0.2em] uppercase text-white/90 sm:text-base">
            The Wedding Of
          </p>
        </Reveal>

        <Reveal animation="zoomIn" slow delay={100} triggerImmediately>
          <h1 className="font-italiana mt-2 text-5xl font-normal tracking-wide text-white sm:text-[59px] sm:leading-tight">
            {WEDDING_INFO.coupleShort}
          </h1>
        </Reveal>

        <Reveal animation="fadeIn" slow triggerImmediately>
          <p className="font-lato mt-2 text-base italic text-white/90 sm:text-lg">
            {WEDDING_INFO.eventDateLabel}
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col items-center">
          <Reveal animation="fadeInDown" slow triggerImmediately>
            <span className="font-lato block text-xs tracking-widest uppercase text-white/75">
              Dear :
            </span>
          </Reveal>

          <Reveal animation="fadeInUp" slow delay={100} triggerImmediately>
            <p className="font-crimson mt-1.5 text-xl font-medium tracking-wide text-white sm:text-2xl">
              {guestName}
            </p>
          </Reveal>
        </div>

        <Reveal animation="fadeInUp" slow triggerImmediately>
          <button
            id="tombol-buka"
            type="button"
            onClick={onOpen}
            className="font-lato mt-7 inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 border border-white bg-transparent px-6 py-2.5 text-sm font-normal tracking-wider text-white transition-colors duration-200 hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MailOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">Open Invitation</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
