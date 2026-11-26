import { useState } from 'react';
import { WEDDING_IMAGES, WEDDING_INFO } from '../data/weddingData';
import Reveal from './Reveal';

export default function QuoteSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="w-full bg-[#EAEAEA] px-5 py-16 sm:py-20">
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center text-center">
        <p className="font-lato text-[15px] leading-relaxed font-normal text-[#4D4D4D] sm:text-[17px] sm:leading-7">
          {WEDDING_INFO.quranVerse}
        </p>
        <p className="font-lato mt-4 text-[15px] font-bold tracking-wide text-[#4D4D4D] sm:text-base">
          {WEDDING_INFO.quranSurah}
        </p>

        <Reveal animation="fadeInUp" slow className="mt-10 w-full max-w-[360px]">
          <div className="w-full overflow-hidden rounded-[14px] bg-[#DCDCDC] shadow-sm sm:rounded-[16px]">
            {!imgError ? (
              <img
                src={WEDDING_IMAGES.quotePortrait}
                alt={`Potret ${WEDDING_INFO.coupleShort}`}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="aspect-[2/3] w-full object-cover object-top"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center bg-gradient-to-b from-[#D9D6D0] to-[#C8C3BA] p-6 text-center text-[#4D4D4D]">
                <span className="font-italiana text-2xl">{WEDDING_INFO.coupleShort}</span>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
