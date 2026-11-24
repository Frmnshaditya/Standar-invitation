import { useEffect, useState } from 'react';
import { CalendarPlus, MapPin } from 'lucide-react';
import { downloadWeddingIcs, WEDDING_IMAGES, WEDDING_INFO } from '../data/weddingData';
import Reveal from './Reveal';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function getTimeLeft(): TimeLeft {
  const target = new Date(WEDDING_INFO.targetIsoDate).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}

function padTwo(val: number): string {
  return String(val).padStart(2, '0');
}

export default function EventSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const syncTime = () => setTimeLeft(getTimeLeft());
    syncTime();
    const timer = window.setInterval(syncTime, 250);
    document.addEventListener('visibilitychange', syncTime);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', syncTime);
    };
  }, []);

  const countdownItems = [
    { label: 'Hari', value: padTwo(timeLeft.days) },
    { label: 'Jam', value: padTwo(timeLeft.hours) },
    { label: 'Menit', value: padTwo(timeLeft.minutes) },
    { label: 'Detik', value: padTwo(timeLeft.seconds) },
  ];

  return (
    <section id="acara" className="w-full bg-[#FFFBF5] px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center md:max-w-[780px] lg:max-w-[840px]">
        <Reveal animation="fadeInDown" slow>
          <h2 className="font-italiana text-center text-[34px] font-medium text-[#4E4E4E] sm:text-[42px]">
            Wedding Event
          </h2>
        </Reveal>

        {/* Countdown Timer in Shippori Mincho B1 */}
        <Reveal animation="fadeIn" className="mt-5 w-full max-w-[340px]">
          <div
            className="grid w-full grid-cols-4 gap-2.5 text-center"
            aria-label="Hitung mundur acara pernikahan"
          >
            {countdownItems.map((item) => (
              <div key={item.label} className="rounded-[6px] px-2 py-2.5">
                <div className="font-shippori text-xl font-normal text-[#4E4E4E] tabular-nums sm:text-2xl">
                  {item.value}
                </div>
                <div className="font-shippori mt-0.5 text-sm font-normal text-[#4E4E4E]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Event Card: stacked on mobile, 2-column side-by-side on Tablet/Laptop/Desktop */}
        <div className="relative mt-6 w-full overflow-hidden rounded-[23px] border border-[#272727]/20 bg-[#191919] text-center text-white shadow-md">
          <img
            src={WEDDING_IMAGES.eventBackdrop}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/75 to-black/85" />

          <div className="relative z-10 grid grid-cols-1 px-6 py-10 sm:px-10 sm:py-12 md:grid-cols-2 md:gap-8 md:divide-x md:divide-white/20">
            {/* Akad Nikah */}
            <div className="flex w-full flex-col items-center md:pr-4">
              <Reveal animation="fadeInDown" slow>
                <h3 className="font-italiana text-[32px] font-normal tracking-wide text-white sm:text-[36px]">
                  Akad Nikah
                </h3>
                <p className="font-lato mt-3 text-base font-medium text-white">
                  {WEDDING_INFO.eventShortDateLabel}
                </p>
                <p className="font-lato mt-1 text-sm text-white/85">
                  {WEDDING_INFO.eventTimeLabel}
                </p>

                <p className="font-crimson mt-4 text-lg font-semibold text-white">
                  {WEDDING_INFO.venue.name}
                </p>
                <p className="font-lato mx-auto mt-1 max-w-sm text-xs leading-relaxed text-white/80 sm:text-sm">
                  {WEDDING_INFO.venue.address}
                </p>
              </Reveal>

              <Reveal animation="fadeIn">
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={WEDDING_INFO.venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-[6px] border border-white/80 bg-[#191919] px-5 py-2 font-crimson text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-[#191919] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="whitespace-nowrap">Google Maps</span>
                  </a>
                  <button
                    type="button"
                    onClick={downloadWeddingIcs}
                    className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-[6px] border border-white/40 bg-white/10 px-4 py-2 font-crimson text-sm font-medium text-white transition-colors duration-200 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <CalendarPlus className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="whitespace-nowrap">Simpan Tanggal</span>
                  </button>
                </div>
              </Reveal>
            </div>

            <div className="my-8 mx-auto h-px w-24 bg-white/25 md:hidden" aria-hidden="true" />

            {/* Resepsi */}
            <div className="flex w-full flex-col items-center md:pl-4">
              <Reveal animation="fadeInDown" slow>
                <h3 className="font-italiana text-[32px] font-normal tracking-wide text-white sm:text-[36px]">
                  Resepsi
                </h3>
                <p className="font-lato mt-3 text-base font-medium text-white">
                  {WEDDING_INFO.eventShortDateLabel}
                </p>
                <p className="font-lato mt-1 text-sm text-white/85">
                  {WEDDING_INFO.eventTimeLabel}
                </p>

                <p className="font-crimson mt-4 text-lg font-semibold text-white">
                  {WEDDING_INFO.venue.name}
                </p>
                <p className="font-lato mx-auto mt-1 max-w-sm text-xs leading-relaxed text-white/80 sm:text-sm">
                  {WEDDING_INFO.venue.address}
                </p>
              </Reveal>

              <Reveal animation="fadeIn">
                <div className="mt-5 flex justify-center">
                  <a
                    href={WEDDING_INFO.venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-[6px] border border-white/80 bg-[#191919] px-5 py-2 font-crimson text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-[#191919] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="whitespace-nowrap">Google Maps</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
