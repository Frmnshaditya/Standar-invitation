import { useMemo, useState } from 'react';
import { Check, Copy, Link2, Share2 } from 'lucide-react';
import { WEDDING_INFO } from '../data/weddingData';
import Reveal from './Reveal';

export default function ShareInvitationSection() {
  const [guestNameInput, setGuestNameInput] = useState('');
  const [copied, setCopied] = useState(false);

  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://digitalinvitation.biz.id';

  const trimmedGuest = guestNameInput.trim();
  const baseUrl = `${origin}/metty-piter`;

  const generatedUrl = useMemo(() => {
    if (!trimmedGuest) return baseUrl;
    const formattedGuest = trimmedGuest.replace(/\s+/g, '-');
    return `${baseUrl}?to=${encodeURIComponent(formattedGuest)}`;
  }, [baseUrl, trimmedGuest]);

  const whatsappHref = useMemo(() => {
    const shareUrl = trimmedGuest ? generatedUrl : baseUrl;
    const greeting = trimmedGuest
      ? `Kepada Yth. *${trimmedGuest}*,`
      : `Kepada Yth. Bapak/Ibu/Saudara/i,`;

    const text = [
      `Assalamu'alaikum Warahmatullahi Wabarakatuh.`,
      ``,
      greeting,
      `Tanpa mengurangi rasa hormat, kami mengundang Anda untuk menghadiri acara pernikahan kami:`,
      ``,
      `*${WEDDING_INFO.coupleShort}*`,
      `${WEDDING_INFO.eventDateLabel}`,
      ``,
      `Buka undangan digital kami melalui tautan berikut:`,
      shareUrl,
      ``,
      `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.`,
    ].join('\n');

    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }, [baseUrl, generatedUrl, trimmedGuest]);

  const handleCopyLink = async () => {
    const linkToCopy = trimmedGuest ? generatedUrl : baseUrl;
    try {
      await navigator.clipboard.writeText(linkToCopy);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = linkToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="bagikan-undangan"
      className="w-full border-t border-neutral-200 bg-[#F7F7F7] px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[600px]">
        <Reveal animation="fadeInUp">
          <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:px-10 sm:py-10">
            {/* Header */}
            <div className="text-center">
              <p className="font-lato text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-500 sm:text-xs">
                BAGIKAN KABAR BAHAGIA
              </p>
              <h2 className="font-italiana mt-2 text-[32px] font-normal leading-tight text-[#141414] sm:text-[40px]">
                Kirim Link Undangan
              </h2>
              <p className="font-lato mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-neutral-600 sm:text-[15px]">
                Bagikan undangan pernikahan melalui WhatsApp atau salin tautan untuk
                dikirimkan kepada kerabat dan sahabat.
              </p>
            </div>

            {/* Guest Input */}
            <div className="mt-7 text-left">
              <label
                htmlFor="nama-tamu-tujuan"
                className="font-lato block text-[11px] font-semibold tracking-[0.08em] uppercase text-neutral-600 sm:text-xs"
              >
                NAMA TAMU TUJUAN
              </label>
              <input
                id="nama-tamu-tujuan"
                type="text"
                value={guestNameInput}
                onChange={(e) => setGuestNameInput(e.target.value)}
                placeholder="Contoh: Bapak Budi Santoso"
                className="font-lato mt-2 w-full rounded-lg border border-neutral-200 bg-[#FAFAFA] px-4 py-3 text-base text-[#141414] placeholder:text-neutral-400 transition-colors duration-200 focus:border-[#141414] focus:bg-white focus:outline-none sm:text-sm"
              />
            </div>

            {/* Live Link Preview */}
            <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-neutral-200 bg-[#FAFAFA] px-4 py-3">
              <Link2 className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
              <span className="font-lato truncate text-sm text-[#141414] select-all">
                {generatedUrl}
              </span>
            </div>

            {/* Action Buttons: Smooth Monochrome Black & White */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-lato inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#141414] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#2B2B2B] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]"
              >
                <Share2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap">Bagikan via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="font-lato inline-flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-[#141414] transition-all duration-200 hover:border-[#141414] hover:bg-neutral-50 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 shrink-0 text-[#141414]" aria-hidden="true" />
                    <span className="whitespace-nowrap">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="whitespace-nowrap">Salin Link Undangan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
