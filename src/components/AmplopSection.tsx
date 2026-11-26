import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { BANK_ACCOUNTS, WEDDING_INFO } from '../data/weddingData';
import Reveal from './Reveal';

export default function AmplopSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedId(id);
    window.setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 1800);
  };

  return (
    <section id="amplop-digital" className="w-full bg-[#FFFFFF] px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto flex w-full max-w-[440px] flex-col items-center text-center">
        <Reveal animation="fadeInUp">
          <h2 className="font-italiana text-[34px] font-medium text-[#4E4E4E] sm:text-[42px]">
            Amplop Digital
          </h2>
        </Reveal>

        <Reveal animation="zoomIn">
          <p className="font-lato mt-3 max-w-md text-[14px] leading-relaxed text-[#4D4D4D] sm:text-[15px]">
            {WEDDING_INFO.amplopIntro}
          </p>
        </Reveal>

        <Reveal animation="zoomIn" slow className="mt-8 w-full">
          <div id="amplop" className="flex w-full flex-col gap-6">
            {BANK_ACCOUNTS.map((account, index) => {
              const isCopied = copiedId === account.id;
              const dotPatternId = `card-dots-${account.id}`;
              const chipGradId = `chip-grad-${account.id}`;
              return (
                <div
                  key={account.id}
                  className="relative flex min-h-[210px] w-full flex-col justify-between overflow-hidden rounded-[18px] border border-black/[0.06] bg-white px-6 py-5 text-left shadow-[0_14px_34px_rgba(0,0,0,0.12)] sm:min-h-[224px] sm:px-7 sm:py-6"
                >
                  {/* Exclusive geometric pearl-silver ATM card texture */}
                  <svg
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    viewBox="0 0 400 240"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id={`bg-base-${account.id}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="52%" stopColor="#F5F7F6" />
                        <stop offset="100%" stopColor="#E4E9E7" />
                      </linearGradient>
                      <pattern
                        id={dotPatternId}
                        x="0"
                        y="0"
                        width="10"
                        height="10"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="2" cy="2" r="1.4" fill="#FFFFFF" fillOpacity="0.65" />
                      </pattern>
                    </defs>

                    <rect width="400" height="240" fill={`url(#bg-base-${account.id})`} />

                    {/* Translucent layered circles & diagonal luxury ribbons */}
                    <circle cx="115" cy="115" r="88" fill="#E8ECEA" fillOpacity="0.55" />
                    <circle cx="210" cy="45" r="68" fill="#FFFFFF" fillOpacity="0.7" />
                    <path
                      d="M170 240 L340 0 L400 0 L400 120 L265 240 Z"
                      fill="#DCE2DF"
                      fillOpacity="0.5"
                    />
                    <path
                      d="M235 240 L400 72 L400 240 Z"
                      fill="#CED6D2"
                      fillOpacity="0.55"
                    />
                    <path
                      d="M115 240 L295 0 L355 0 L185 240 Z"
                      fill="#FFFFFF"
                      fillOpacity="0.45"
                    />

                    {/* Subtle halftone dot cluster on bottom-right corner */}
                    <path
                      d="M205 240 Q290 190 400 135 L400 240 Z"
                      fill={`url(#${dotPatternId})`}
                    />
                  </svg>

                  {/* Top Row: Bank Logo on Top Right */}
                  <div className="relative z-10 flex items-start justify-end">
                    <img
                      src="/assets/bca-logo.png"
                      alt={`Logo ${account.bankName}`}
                      referrerPolicy="no-referrer"
                      className="h-7 w-auto object-contain sm:h-8"
                    />
                  </div>

                  {/* Middle Row: Realistic Gold Metallic EMV Chip */}
                  <div className="relative z-10 my-3 flex items-center">
                    <svg
                      width="44"
                      height="32"
                      viewBox="0 0 44 32"
                      fill="none"
                      aria-hidden="true"
                      className="rounded-[5px] shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
                    >
                      <defs>
                        <linearGradient id={chipGradId} x1="0" y1="0" x2="44" y2="32">
                          <stop offset="0%" stopColor="#EAD290" />
                          <stop offset="50%" stopColor="#D7B564" />
                          <stop offset="100%" stopColor="#BA9440" />
                        </linearGradient>
                      </defs>
                      <rect
                        x="0.6"
                        y="0.6"
                        width="42.8"
                        height="30.8"
                        rx="4.4"
                        fill={`url(#${chipGradId})`}
                        stroke="#9F7C2E"
                        strokeWidth="1"
                      />
                      <path
                        d="M15 1V31M29 1V31M1 11H15M29 11H43M1 21H15M29 21H43M15 16H29"
                        stroke="#7E6120"
                        strokeWidth="1"
                        strokeOpacity="0.7"
                      />
                      <rect
                        x="15"
                        y="11"
                        width="14"
                        height="10"
                        rx="2"
                        stroke="#7E6120"
                        strokeWidth="1"
                        strokeOpacity="0.7"
                      />
                    </svg>
                  </div>

                  {/* Bottom Row: Account Holder + Number on Left, Salin Button on Right */}
                  <div className="relative z-10 flex items-end justify-between gap-3 pt-2">
                    <div className="min-w-0">
                      <p
                        className={`font-albert truncate text-[15px] font-semibold sm:text-base ${
                          index === 1 ? 'text-[#9A5D0A]' : 'text-[#222222]'
                        }`}
                      >
                        {account.accountHolder}
                      </p>
                      <p className="font-albert mt-0.5 text-[14px] font-normal tracking-wide text-[#555555] tabular-nums sm:text-[15px]">
                        {account.accountNumber}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(account.id, account.accountNumber)}
                      className="font-albert inline-flex min-h-[34px] shrink-0 cursor-pointer items-center gap-1.5 rounded-[6px] bg-[#767676] px-3.5 py-1.5 text-xs font-medium text-white shadow-sm transition-colors duration-200 hover:bg-[#4E4E4E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4E4E4E]"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
