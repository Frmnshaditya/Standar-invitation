import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { WEDDING_IMAGES } from '../data/weddingData';
import Reveal from './Reveal';

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % WEDDING_IMAGES.gallery.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + WEDDING_IMAGES.gallery.length) % WEDDING_IMAGES.gallery.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex]);

  return (
    <section id="galeri" className="w-full bg-[#EAEAEA] px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto flex w-full max-w-[720px] flex-col items-center">
        <Reveal animation="zoomIn">
          <h2 className="font-italiana text-center text-[34px] font-medium text-[#4E4E4E] sm:text-[42px]">
            Our Moment
          </h2>
        </Reveal>

        <div className="mt-8 grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
          {WEDDING_IMAGES.gallery.map((photo, index) => (
            <button
              key={`${photo.src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Lihat foto ${index + 1}: ${photo.alt}`}
              className="group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-lg bg-[#D8D8D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4E4E4E]"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                referrerPolicy="no-referrer"
                loading="lazy"
                className={`h-full w-full object-cover ${photo.objectPosition} transition-transform duration-500 ease-out group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-black/0 transition-opacity duration-300 ease-out group-hover:bg-black/25" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau foto galeri"
          className="el-animated el-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          style={{ animationDuration: '250ms' }}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Tutup galeri"
            className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(
                (activeIndex - 1 + WEDDING_IMAGES.gallery.length) %
                  WEDDING_IMAGES.gallery.length
              );
            }}
            aria-label="Foto sebelumnya"
            className="absolute left-3 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            className="max-h-[85vh] max-w-3xl overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={WEDDING_IMAGES.gallery[activeIndex].src}
              alt={WEDDING_IMAGES.gallery[activeIndex].alt}
              referrerPolicy="no-referrer"
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <p className="font-lato mt-3 text-center text-xs text-white/80 tabular-nums">
              {activeIndex + 1} / {WEDDING_IMAGES.gallery.length}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((activeIndex + 1) % WEDDING_IMAGES.gallery.length);
            }}
            aria-label="Foto berikutnya"
            className="absolute right-3 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}
