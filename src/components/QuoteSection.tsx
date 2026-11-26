import { WEDDING_INFO } from '../data/weddingData';

export default function QuoteSection() {
  return (
    <section className="w-full bg-[#EAEAEA] px-5 py-16 sm:py-20">
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center text-center">
        <p className="font-lato text-[15px] leading-relaxed font-normal text-[#4D4D4D] sm:text-[17px] sm:leading-7">
          {WEDDING_INFO.quranVerse}
        </p>
        <p className="font-lato mt-4 text-[15px] font-bold tracking-wide text-[#4D4D4D] sm:text-base">
          {WEDDING_INFO.quranSurah}
        </p>
      </div>
    </section>
  );
}
