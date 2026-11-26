import { FormEvent, useEffect, useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { INITIAL_WISHES, RsvpWish } from '../data/weddingData';
import Reveal from './Reveal';

const STORAGE_KEY = 'metty_piter_rsvp_wishes_v1';
const LEGACY_STORAGE_KEY = 'dewi_deni_rsvp_wishes_v2';
const ITEMS_PER_PAGE = 10;

const ATTENDANCE_LABELS: Record<RsvpWish['attendance'], string> = {
  present: 'Hadir',
  notpresent: 'Tidak Hadir',
  notsure: 'Masih Ragu',
};

export default function RsvpSection() {
  const [wishes, setWishes] = useState<RsvpWish[]>(() => {
    try {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(
            (item): item is RsvpWish =>
              Boolean(item) &&
              typeof item === 'object' &&
              typeof (item as RsvpWish).id === 'string' &&
              typeof (item as RsvpWish).name === 'string' &&
              typeof (item as RsvpWish).message === 'string' &&
              typeof (item as RsvpWish).createdAt === 'string' &&
              ((item as RsvpWish).attendance === 'present' ||
                (item as RsvpWish).attendance === 'notpresent' ||
                (item as RsvpWish).attendance === 'notsure')
          );
          if (valid.length > 0) return valid;
        }
      }
    } catch {
      // Ignore storage errors
    }
    return INITIAL_WISHES;
  });

  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'' | RsvpWish['attendance']>('');
  const [guests, setGuests] = useState<string>('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    attendance?: string;
    guests?: string;
    message?: string;
  }>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch {
      // Ignore storage errors
    }
  }, [wishes]);

  const totalPages = Math.max(1, Math.ceil(wishes.length / ITEMS_PER_PAGE));
  const pagedWishes = wishes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: typeof errors = {};

    if (!name.trim()) {
      nextErrors.name = 'Masukan nama anda';
    }
    if (!attendance) {
      nextErrors.attendance = 'Pilih konfirmasi kehadiran';
    }
    if (attendance === 'present' && !guests) {
      nextErrors.guests = 'Pilih jumlah tamu';
    }
    if (message.trim().length < 2) {
      nextErrors.message = 'Ucapan minimal 2 karakter';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const newWish: RsvpWish = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      attendance: attendance as RsvpWish['attendance'],
      guests: attendance === 'present' ? Number(guests) || 1 : 1,
      message: message.trim(),
      createdAt: 'Baru saja',
    };

    setWishes((prev) => [newWish, ...prev]);
    setName('');
    setAttendance('');
    setGuests('');
    setMessage('');
    setErrors({});
    setCurrentPage(1);
    setSubmitSuccess(true);
    window.setTimeout(() => setSubmitSuccess(false), 3500);
  };

  const remainingChars = Math.max(0, 300 - message.length);

  return (
    <section id="rsvp" className="w-full bg-[#FFFFFF] px-4 pb-20 pt-6 sm:px-6 sm:pb-24">
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center">
        <Reveal animation="fadeInUp">
          <h2 className="font-italiana text-center text-[34px] font-medium leading-none text-[#4E4E4E] sm:text-[45px]">
            RSVP
          </h2>
        </Reveal>

        {/* Clean Unboxed Counter */}
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#584A2F]">
          <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="tabular-nums">{wishes.length} Ucapan</span>
        </div>

        {/* Form Container */}
        <div className="mt-6 w-full rounded-xl border border-[#E5E0D8] bg-[#FBFBFB] p-5 sm:p-6">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {/* Nama */}
            <div>
              <label htmlFor="rsvp-name" className="sr-only">
                Nama Anda
              </label>
              <input
                id="rsvp-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="Nama Anda"
                className="font-lato w-full rounded-md border border-[#D4CFC6] bg-white px-3.5 py-2.5 text-base text-[#252525] placeholder:text-[#7A7A7A] focus:border-[#584A2F] focus:outline-none sm:text-sm"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-[#BE0101]">{errors.name}</p>
              )}
            </div>

            {/* Konfirmasi Kehadiran */}
            <div>
              <label htmlFor="rsvp-attendance" className="sr-only">
                Konfirmasi Kehadiran
              </label>
              <select
                id="rsvp-attendance"
                value={attendance}
                onChange={(e) => {
                  const val = e.target.value as '' | RsvpWish['attendance'];
                  setAttendance(val);
                  if (val !== 'present') setGuests('');
                  if (errors.attendance) {
                    setErrors((prev) => ({ ...prev, attendance: undefined }));
                  }
                }}
                className="font-lato w-full rounded-md border border-[#D4CFC6] bg-white px-3.5 py-2.5 text-base text-[#252525] focus:border-[#584A2F] focus:outline-none sm:text-sm"
              >
                <option value="" disabled>
                  Konfirmasi Kehadiran
                </option>
                <option value="present">Hadir</option>
                <option value="notpresent">Tidak Hadir</option>
                <option value="notsure">Masih Ragu</option>
              </select>
              {errors.attendance && (
                <p className="mt-1 text-xs text-[#BE0101]">{errors.attendance}</p>
              )}
            </div>

            {/* Jumlah Tamu (dynamic when Hadir) */}
            {attendance === 'present' && (
              <div className="el-animated el-fadeIn" style={{ animationDuration: '300ms' }}>
                <label htmlFor="rsvp-guests" className="sr-only">
                  Jumlah Tamu
                </label>
                <select
                  id="rsvp-guests"
                  value={guests}
                  onChange={(e) => {
                    setGuests(e.target.value);
                    if (errors.guests) {
                      setErrors((prev) => ({ ...prev, guests: undefined }));
                    }
                  }}
                  className="font-lato w-full rounded-md border border-[#D4CFC6] bg-white px-3.5 py-2.5 text-base text-[#252525] focus:border-[#584A2F] focus:outline-none sm:text-sm"
                >
                  <option value="" disabled>
                    Jumlah Tamu
                  </option>
                  <option value="1">1 orang</option>
                  <option value="2">2 orang</option>
                  <option value="3">3 orang</option>
                  <option value="4">4 orang</option>
                  <option value="5">5 orang</option>
                </select>
                {errors.guests && (
                  <p className="mt-1 text-xs text-[#BE0101]">{errors.guests}</p>
                )}
              </div>
            )}

            {/* Tulis Ucapan */}
            <div>
              <label htmlFor="rsvp-message" className="sr-only">
                Tulis Ucapan
              </label>
              <textarea
                id="rsvp-message"
                rows={3}
                maxLength={300}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) {
                    setErrors((prev) => ({ ...prev, message: undefined }));
                  }
                }}
                placeholder="Tulis Ucapan"
                className="font-lato w-full resize-none rounded-md border border-[#D4CFC6] bg-white px-3.5 py-2.5 text-base text-[#252525] placeholder:text-[#7A7A7A] focus:border-[#584A2F] focus:outline-none sm:text-sm"
              />
              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="text-[#BE0101]">{errors.message ?? ''}</span>
                <span className="text-[#7A7A7A] tabular-nums">{remainingChars}</span>
              </div>
            </div>

            <button
              type="submit"
              className="font-crimson inline-flex min-h-[42px] cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-[#584A2F] px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#3F341F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#584A2F]"
            >
              <Send className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Kirim</span>
            </button>

            {submitSuccess && (
              <p
                role="status"
                className="el-animated el-fadeIn rounded-md bg-[#EEF4EE] px-3 py-2 text-center text-xs font-medium text-[#1E5631]"
              >
                Terima kasih atas ucapan Anda!
              </p>
            )}
          </form>

          {/* Wishes Feed */}
          <div className="mt-6 divide-y divide-[#EAE6DF] border-t border-[#EAE6DF]">
            {pagedWishes.length === 0 ? (
              <p className="font-lato py-6 text-center text-sm text-[#7A7A7A]">
                Belum ada ucapan. Jadilah yang pertama mengirimkan doa restu.
              </p>
            ) : (
              pagedWishes.map((wish) => (
                <div key={wish.id} className="py-4 text-left">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-lato inline-flex items-center gap-1.5 text-sm font-bold text-[#252525]">
                      <span>{wish.name}</span>
                      <svg
                        viewBox="0 0 24 24"
                        aria-label="Terverifikasi"
                        role="img"
                        className="h-4 w-4 shrink-0 text-[#1D9BF0]"
                        fill="currentColor"
                      >
                        <title>Terverifikasi</title>
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                      </svg>
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B]">
                      <span>{ATTENDANCE_LABELS[wish.attendance]}</span>
                      {wish.attendance === 'present' && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{wish.guests} orang</span>
                        </>
                      )}
                      <span aria-hidden="true">·</span>
                      <span>{wish.createdAt}</span>
                    </div>
                  </div>
                  <p className="font-lato mt-1.5 text-sm leading-relaxed text-[#4D4D4D]">
                    {wish.message}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between border-t border-[#EAE6DF] pt-4 text-xs">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="cursor-pointer rounded px-3 py-1.5 font-medium text-[#4E4E4E] transition-colors hover:bg-[#EAE6DF] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-[#6B6B6B] tabular-nums">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="cursor-pointer rounded px-3 py-1.5 font-medium text-[#4E4E4E] transition-colors hover:bg-[#EAE6DF] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
