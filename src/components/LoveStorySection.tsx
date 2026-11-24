import { LOVE_STORY_CHAPTERS } from '../data/weddingData';
import Reveal from './Reveal';

export default function LoveStorySection() {
  return (
    <section id="kisah-cinta" className="w-full bg-[#EAEAEA] px-5 py-14 sm:py-20">
      <div className="mx-auto flex w-full max-w-[460px] flex-col items-center">
        <Reveal animation="zoomIn">
          <h2 className="font-italiana text-center text-[34px] font-medium text-[#4E4E4E] sm:text-[42px]">
            Love Story
          </h2>
        </Reveal>

        <div className="mt-10 flex w-full flex-col gap-10">
          {LOVE_STORY_CHAPTERS.map((chapter) => (
            <article
              key={chapter.id}
              className="flex flex-col items-center border-b border-black/10 pb-10 text-center last:border-b-0 last:pb-0"
            >
              {chapter.image && (
                <Reveal animation="fadeInDown" slow className="mb-5 w-full">
                  <div className="w-full overflow-hidden rounded-xl bg-[#D8D8D8] shadow-sm">
                    <img
                      src={chapter.image}
                      alt={chapter.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover object-center"
                    />
                  </div>
                </Reveal>
              )}

              <Reveal animation="fadeInUp">
                <h3 className="font-italiana text-[26px] leading-snug font-medium text-[#3E3E3E] sm:text-[30px]">
                  {chapter.title}
                </h3>

                {chapter.date && (
                  <p className="font-lato mt-1 text-xs font-bold tracking-[0.14em] uppercase text-[#584A2F]">
                    {chapter.date}
                  </p>
                )}
              </Reveal>

              <Reveal animation="fadeInUp">
                <div className="mt-4 flex flex-col gap-3">
                  {chapter.paragraphs.map((text, idx) => (
                    <p
                      key={idx}
                      className="font-lato text-[14px] leading-relaxed text-[#4D4D4D] sm:text-[15px]"
                    >
                      {text}
                    </p>
                  ))}
                </div>

                {chapter.quote && (
                  <p className="font-crimson mt-4 text-base italic text-[#3E3E3E]">
                    {chapter.quote}
                  </p>
                )}
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
