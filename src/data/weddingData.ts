export interface LoveStoryChapter {
  id: string;
  title: string;
  date?: string;
  paragraphs: string[];
  quote?: string;
  image?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  lastFour: string;
}

export interface RsvpWish {
  id: string;
  name: string;
  attendance: 'present' | 'notpresent' | 'notsure';
  guests: number;
  message: string;
  createdAt: string;
}

/**
 * PENGATURAN MUSIK LATAR UNDANGAN
 * Letakkan atau ganti file .mp3 di dalam folder: public/music/
 * Website akan otomatis mendeteksi dan memutar file MP3 di folder tersebut.
 * Jika ingin langsung loncat ke bagian reff MP3, ubah startAtSeconds sesuai detik reff.
 */
export const WEDDING_MUSIC = {
  volume: 0.65,
  autoPlay: true,
  startAtSeconds: 0,
};

export interface PairedSlide {
  left: string;
  right: string;
  leftAlt: string;
  rightAlt: string;
}

// Pasangan foto 1 & 2 (kanan-kiri) bergantian dengan pasangan foto 3 & 4 (kanan-kiri)
const PAIRED_BACKDROP_SLIDES: PairedSlide[] = [
  {
    left: '/assets/aistudio/bdac5f84-a946-48a2-b392-3c195674e9f3_d717c8c7.jpg',
    right: '/assets/aistudio/804d939e-9cc6-44f0-9178-b3f4af7ed1f9_3fbd567d.jpg',
    leftAlt: 'Potret masa muda Piter',
    rightAlt: 'Potret masa muda Metty',
  },
  {
    left: '/assets/aistudio/78900a1c-fc85-42a2-8106-11be79f68326_20fbc8e7.jpg',
    right: '/assets/aistudio/f2b17bef-f277-4d07-9635-3b458df43466_2a78d6bc.jpg',
    leftAlt: 'Potret Piter berkemeja biru',
    rightAlt: 'Potret wisuda Metty di UGM',
  },
];

export const WEDDING_IMAGES = {
  pairedSlides: PAIRED_BACKDROP_SLIDES,
  coverSlides: PAIRED_BACKDROP_SLIDES,
  heroSlides: PAIRED_BACKDROP_SLIDES,
  eventBackdropSlides: PAIRED_BACKDROP_SLIDES,
  closingBackdropSlides: PAIRED_BACKDROP_SLIDES,
  quotePortrait: '/assets/aistudio/9939df40-e456-41b1-8317-5dd2abe7792b_6754ce7f.jpg',
  brideGroomBackdropLeft: '/assets/aistudio/bdac5f84-a946-48a2-b392-3c195674e9f3_d717c8c7.jpg',
  brideGroomBackdropRight: '/assets/aistudio/804d939e-9cc6-44f0-9178-b3f4af7ed1f9_3fbd567d.jpg',
  bridePortrait: '/assets/aistudio/00029d70-954d-4dbc-ad42-edbda05b7d58_56eda4cb.jpg',
  groomPortrait: '/assets/aistudio/b6f3a9c5-3eb3-4d67-9fae-0e8f6931a310_4b0de444.jpg',
  gallery: [
    {
      src: '/assets/aistudio/9939df40-e456-41b1-8317-5dd2abe7792b_6754ce7f.jpg',
      alt: 'Metty & Piter berpelukan hangat di aula istana bersejarah',
      objectPosition: 'object-center',
    },
    {
      src: '/assets/aistudio/8aefa220-6e05-41d9-86c4-4b0b0fe5b14c_94d6eeb7.jpg',
      alt: 'Metty & Piter di balkon beranda bernuansa kuning dan biru',
      objectPosition: 'object-center',
    },
    {
      src: '/assets/aistudio/738c1e3c-5723-4c29-ae25-d11a11870191_12a6bfff.jpg',
      alt: 'Tatapan penuh kebahagiaan Metty & Piter di ruang istana klasik',
      objectPosition: 'object-center',
    },
    {
      src: '/assets/aistudio/2ae8f17f-99f6-446d-9f5e-5b20297725d4_3c5c4018.jpg',
      alt: 'Potret kebersamaan Metty & Piter di ruang utama istana',
      objectPosition: 'object-center',
    },
    {
      src: '/assets/aistudio/62110946-5a5a-4ef9-8a6a-9d34a4b53f54_c7c3da28.jpg',
      alt: 'Momen hangat Metty & Piter di balik jendela kayu klasik',
      objectPosition: 'object-center',
    },
    {
      src: '/assets/aistudio/4ac63a3e-35a7-44ee-8b41-50c808dc099c_fe47c78e.jpg',
      alt: 'Potret kebersamaan Metty & Piter di dalam masjid megah bernuansa biru',
      objectPosition: 'object-[50%_65%]',
    },
  ],
};

export const WEDDING_INFO = {
  coupleShort: 'Metty & Piter',
  eventDateLabel: 'Rabu, 16 Desember 2026',
  eventShortDateLabel: 'Rabu, 16 Desember 2026',
  eventTimeLabel: 'Pukul 10.00 WIB - Selesai',
  targetIsoDate: '2026-12-16T10:00:00+07:00',
  heroQuote:
    '"Marriage is not about age; it’s about finding the right person."',
  quranVerse:
    '“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”',
  quranSurah: 'QS. Ar-Rum Ayat 21',
  bismillah: 'بِسْــــــــــــــــــمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ',
  brideGroomIntro:
    'Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami',
  bride: {
    name: 'drh. Gazwa Mettilia Hakim',
    parents: 'Putri ketiga dari Bapak (Alm.) Drs. Luthan Hakim dan Ibu (Almh.) Hj. Siti Alimah',
    instagramHandle: '',
    instagramUrl: '',
  },
  groom: {
    name: 'Ir. H. Raja Piter Rasyidin',
    parents: 'Putra Pertama dari Bapak (Alm.) Raja Maridin dan Ibu (Almh.) Raja Rosnah',
    instagramHandle: '',
    instagramUrl: '',
  },
  venue: {
    name: 'Beranda Joglo Resto',
    address:
      'Jl. Kebon Kelapa No. 6, Tambun, Kec. Tambun Selatan, Kabupaten Bekasi, Jawa Barat, 17510',
    mapsUrl: 'https://maps.app.goo.gl/XbqBwzKmrzK1hPGq8',
  },
  amplopIntro:
    '"Doa restu dan kehadiran Anda pada hari bahagia kami adalah anugerah terindah. Namun, jika Anda ingin memberikan hadiah berupa tanda kasih secara digital, dapat melalui tautan/rekening di bawah ini. Terimakasih"',
  closingMessage:
    'Atas kehadiran dan do’a restu dari Bapak/Ibu/Saudara/i sekalian, kami mengucapkan Terima Kasih.',
  closingSalam: 'وَعَلَيْكُمُ لسَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
};

export const LOVE_STORY_CHAPTERS: LoveStoryChapter[] = [
  {
    id: 'awal-cerita-ugm',
    title: 'Awal di Bangku Perkuliahan',
    date: 'UGM — Yogyakarta',
    image: '/assets/aistudio/62110946-5a5a-4ef9-8a6a-9d34a4b53f54_c7c3da28.jpg',
    paragraphs: [
      'Semua berawal di bangku perkuliahan, di bawah rindangnya pepohonan UGM dan hangatnya langit Yogyakarta. Bukan sekadar mengejar gelar, di sinilah langkah-langkah kecil itu bermula, merangkai mimpi dan pertemuan yang mengubah segalanya. Dari obrolan sederhana di sudut kampus biru, tumbuh sebuah cerita yang rasanya tak ingin pernah usai. Siapa sangka, sebuah perjumpaan sederhana di kota pelajar itu menjadi awal dari penantian paling setia sepanjang sejarah hidup seseorang.',
    ],
  },
  {
    id: 'penantian-46-tahun',
    title: 'Empat Puluh Enam Tahun Penantian',
    image: '/assets/aistudio/2ae8f17f-99f6-446d-9f5e-5b20297725d4_3c5c4018.jpg',
    paragraphs: [
      'Empat puluh enam tahun bukanlah waktu yang singkat. Musim berganti, rambut memutih, dan garis usia mulai terukir di wajah, namun rasa itu tetap tinggal di tempat yang sama—utuh dan tak lekang oleh zaman. Di antara kenangan sudut-sudut Bulaksumur dan senja Yogyakarta yang syahdu, cinta ini membuktikan bahwa kesetiaan sejati tidak mengenal kata kedaluwarsa.',
    ],
  },
  {
    id: 'ujian-takdir',
    title: 'Ketulusan yang Tak Pernah Padam',
    image: '/assets/aistudio/8aefa220-6e05-41d9-86c4-4b0b0fe5b14c_94d6eeb7.jpg',
    paragraphs: [
      'Namun, takdir terkadang punya cara unik untuk menguji ketulusan. Butuh waktu hampir setengah abad bagi dua hati ini untuk benar-benar bersatu. Empat puluh enam tahun penantian yang diisi dengan doa dalam diam, kesabaran tanpa batas, dan keyakinan yang tak pernah padam.',
    ],
  },
  {
    id: 'pulang-bersama',
    title: 'Akhirnya Pulang Bersama',
    date: '16 Desember 2026',
    image: '/assets/aistudio/738c1e3c-5723-4c29-ae25-d11a11870191_12a6bfff.jpg',
    paragraphs: [
      'Dari mahasiswa muda di Yogyakarta hingga menua bersama hari ini, perjalanan ini adalah bukti nyata bahwa cinta sejati tidak pernah salah alamat, ia hanya menunggu waktu yang paling tepat untuk pulang. Sebab pada akhirnya, sejauh apa pun waktu berjalan, hati akan selalu pulang kepada orang yang sama ♥️',
    ],
  },
];

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'bca-metty',
    bankName: 'BCA',
    accountHolder: 'Gazwa Mettilia Hakim',
    accountNumber: '3490999701',
    lastFour: '9701',
  },
  {
    id: 'bca-piter',
    bankName: 'BCA',
    accountHolder: 'RAJA PITERRASYIDIN',
    accountNumber: '1690097725',
    lastFour: '7725',
  },
];

export const INITIAL_WISHES: RsvpWish[] = [];

export function downloadWeddingIcs(): void {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Metty & Piter Wedding//ID',
    'BEGIN:VEVENT',
    'UID:metty-piter-20261216@wedding',
    'DTSTAMP:20261126T000000Z',
    'DTSTART:20261216T030000Z',
    'DTEND:20261216T070000Z',
    'SUMMARY:The Wedding of Metty & Piter (Akad Nikah)',
    'DESCRIPTION:Akad Nikah Pernikahan drh. Gazwa Mettilia Hakim & Ir. H. Raja Piter Rasyidin',
    'LOCATION:Beranda Joglo Resto, Jl. Kebon Kelapa No. 6, Tambun, Kec. Tambun Selatan, Kabupaten Bekasi, Jawa Barat, 17510',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Metty-Piter-Wedding.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
