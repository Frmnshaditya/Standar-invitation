import { useState } from 'react';
import { Instagram } from 'lucide-react';
import { WEDDING_IMAGES, WEDDING_INFO } from '../data/weddingData';
import Reveal from './Reveal';

export default function BrideGroomSection() {
  const [brideError, setBrideError] = useState(false);
  const [groomError, setGroomError] = useState(false);

  return (
    <section
      id="mempelai"
      className="min-h-dvh-screen relative flex w-full items-center justify-center overflow-hidden bg-[#FFFBF5] px-5 py-16 sm:py-24"
    >
      {/* Background photo overlay at 31% opacity matching #FFFBF5 theme */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={WEDDING_IMAGES.brideGroomBackdrop}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-[#FFFBF5]/75" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[500px] flex-col items-center text-center md:max-w-[780px] lg:max-w-[860px]">
        <Reveal animation="zoomIn" slow>
          <h2 className="font-italiana text-[32px] font-medium text-[#4E4E4E] sm:text-[38px] lg:text-[42px]">
            Bride &amp; Groom
          </h2>
        </Reveal>

        <Reveal animation="zoomIn" slow>
          <p
            className="mt-4 text-xl leading-relaxed font-normal text-[#3E3E3E] sm:text-2xl"
            dir="rtl"
            lang="ar"
          >
            {WEDDING_INFO.bismillah}
          </p>

          <p className="font-lato mx-auto mt-3 max-w-md text-[15px] leading-relaxed font-normal text-[#4E4E4E] sm:text-[16px]">
            {WEDDING_INFO.brideGroomIntro}
          </p>
        </Reveal>

        {/* Stacked on Android/iPhone, balanced 2-column with center '&' on Tablet/Laptop/Desktop */}
        <div className="mt-10 grid w-full grid-cols-1 items-center gap-0 md:mt-12 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-8">
          {/* Bride */}
          <div className="flex w-full flex-col items-center">
            <Reveal animation="fadeInLeft" slow className="w-[65%] max-w-[260px] md:w-full md:max-w-[280px]">
              <div className="w-full overflow-hidden rounded-lg bg-[#EFE9DF] shadow-sm">
                {!brideError ? (
                  <img
                    src={WEDDING_IMAGES.bridePortrait}
                    alt={WEDDING_INFO.bride.name}
                    referrerPolicy="no-referrer"
                    onError={() => setBrideError(true)}
                    className="aspect-[2/3] w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex aspect-[2/3] w-full items-center justify-center bg-[#EBE4D8] text-[#4E4E4E]">
                    <span className="font-italiana text-2xl">Dewi</span>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal animation="zoomIn" slow>
              <h3 className="font-italiana mt-5 text-[30px] font-medium text-[#3E3E3E] sm:text-[35px]">
                {WEDDING_INFO.bride.name}
              </h3>
            </Reveal>

            <Reveal animation="fadeIn" slow>
              <p className="font-lato mt-1.5 max-w-xs text-sm leading-relaxed text-[#4E4E4E] sm:text-[15px]">
                {WEDDING_INFO.bride.parents}
              </p>
            </Reveal>

            <Reveal animation="fadeInUp">
              <a
                href={WEDDING_INFO.bride.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-lato mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-[3px] border border-[#272727] bg-white px-4 py-2 text-xs font-medium text-[#252525] transition-colors duration-200 hover:bg-[#191919] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#272727]"
              >
                <Instagram className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap">{WEDDING_INFO.bride.instagramHandle}</span>
              </a>
            </Reveal>
          </div>

          {/* Ornamental & */}
          <Reveal animation="zoomIn" slow className="md:self-center">
            <div
              className="font-italiana my-10 text-4xl text-[#4E4E4E] sm:text-5xl md:my-0 md:px-2"
              aria-hidden="true"
            >
              &amp;
            </div>
          </Reveal>

          {/* Groom */}
          <div className="flex w-full flex-col items-center">
            <Reveal animation="fadeInLeft" slow className="w-[65%] max-w-[260px] md:w-full md:max-w-[280px]">
              <div className="w-full overflow-hidden rounded-lg bg-[#EFE9DF] shadow-sm">
                {!groomError ? (
                  <img
                    src={WEDDING_IMAGES.groomPortrait}
                    alt={WEDDING_INFO.groom.name}
                    referrerPolicy="no-referrer"
                    onError={() => setGroomError(true)}
                    className="aspect-[2/3] w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex aspect-[2/3] w-full items-center justify-center bg-[#EBE4D8] text-[#4E4E4E]">
                    <span className="font-italiana text-2xl">Deni</span>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal animation="zoomIn" slow>
              <h3 className="font-italiana mt-5 text-[30px] font-medium text-[#3E3E3E] sm:text-[35px]">
                {WEDDING_INFO.groom.name}
              </h3>
            </Reveal>

            <Reveal animation="fadeIn" slow>
              <p className="font-lato mt-1.5 max-w-xs text-sm leading-relaxed text-[#4E4E4E] sm:text-[15px]">
                {WEDDING_INFO.groom.parents}
              </p>
            </Reveal>

            <Reveal animation="fadeInUp">
              <a
                href={WEDDING_INFO.groom.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-lato mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-[3px] border border-[#272727] bg-white px-4 py-2 text-xs font-medium text-[#252525] transition-colors duration-200 hover:bg-[#191919] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#272727]"
              >
                <Instagram className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap">{WEDDING_INFO.groom.instagramHandle}</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
