import { useState } from 'react';
import { Check, Copy, Gift } from 'lucide-react';
import { BANK_ACCOUNTS, PHYSICAL_GIFT_ADDRESS } from '../data/weddingData';
import Reveal from './Reveal';

export default function AmplopSection() {
  const [isExpanded, setIsExpanded] = useState(false);
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
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center text-center">
        <Reveal animation="fadeInUp">
          <h2 className="font-italiana text-[34px] font-medium text-[#4E4E4E] sm:text-[42px]">
            Amplop Digital
          </h2>
        </Reveal>

        <Reveal animation="zoomIn">
          <p className="font-lato mt-3 max-w-md text-[14px] leading-relaxed text-[#4D4D4D] sm:text-[15px]">
            Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika
            memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara
            cashless.
          </p>
        </Reveal>

        <button
          id="btnAmplop"
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          className="font-crimson mt-6 inline-flex min-h-[42px] cursor-pointer items-center justify-center rounded-[18px] bg-[#717171] px-7 py-2 text-[17px] font-normal text-white transition-colors duration-200 hover:bg-[#494949] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494949]"
        >
          {isExpanded ? 'Tutup Amplop Digital' : 'Klik Disini'}
        </button>

        {isExpanded && (
          <div
            id="amplop"
            className="el-animated-slow el-zoomIn mt-8 flex w-full flex-col gap-5"
          >
            {BANK_ACCOUNTS.map((account) => {
              const isCopied = copiedId === account.id;
              return (
                <div
                  key={account.id}
                  className="relative overflow-hidden rounded-2xl border border-[#E5E0D8] bg-gradient-to-br from-[#FBF9F6] via-[#F2EDE4] to-[#E6DFD2] p-6 text-left shadow-sm"
                >
                  {/* Subtle geometric card sheen */}
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/40 blur-2xl"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    {/* EMV Chip SVG */}
                    <svg
                      width="38"
                      height="28"
                      viewBox="0 0 38 28"
                      fill="none"
                      aria-hidden="true"
                      className="rounded"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="37"
                        height="27"
                        rx="4.5"
                        fill="#D8C8A0"
                        stroke="#B8A373"
                      />
                      <path
                        d="M13 1V27M25 1V27M1 10H13M25 10H37M1 18H13M25 18H37"
                        stroke="#9F8B5D"
                        strokeWidth="1"
                      />
                    </svg>

                    {/* SeaBank Wordmark */}
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#EE4D2D] text-xs font-bold text-white">
                        S
                      </span>
                      <span className="font-albert text-base font-semibold tracking-tight text-[#252525]">
                        {account.bankName}
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 mt-6 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="font-albert text-xs font-medium tracking-wider uppercase text-[#584A2F]">
                        {account.accountHolder}
                      </p>
                      <p className="font-crimson mt-1 text-xl font-semibold tracking-wider text-[#252525] tabular-nums sm:text-2xl">
                        {account.accountNumber}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(account.id, account.accountNumber)}
                      className="font-crimson inline-flex min-h-[38px] cursor-pointer items-center gap-1.5 rounded-[8px] bg-[#7E7E7E] px-4 py-1.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#494949] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494949]"
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

            {/* Physical Gift Address */}
            <div className="el-animated el-fadeInUp flex flex-col items-center rounded-2xl border border-[#E6E2DC] bg-[#FBFBFB] px-6 py-6 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#584A2F] text-white">
                <Gift className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="font-lato mt-3 text-sm font-medium text-[#4D4D4D]">
                Anda Juga Bisa Mengirim Kado Fisik Ke Alamat Berikut:
              </p>
              <p className="font-crimson mt-1.5 text-base font-semibold text-[#252525]">
                {PHYSICAL_GIFT_ADDRESS}
              </p>
              <button
                type="button"
                onClick={() => handleCopy('physical-address', PHYSICAL_GIFT_ADDRESS)}
                className="font-crimson mt-4 inline-flex min-h-[36px] cursor-pointer items-center gap-1.5 rounded-[8px] bg-[#7E7E7E] px-4 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#494949] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494949]"
              >
                {copiedId === 'physical-address' ? (
                  <>
                    <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>Alamat Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>Salin Alamat</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
