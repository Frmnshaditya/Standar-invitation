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
 */
export const WEDDING_MUSIC = {
  volume: 0.65,
  autoPlay: true,
};

export const WEDDING_IMAGES = {
  coverSlides: [
    '/assets/aistudio/images_8a0d2d8c.jpg',
    '/assets/aistudio/images_5d277f01.jpg',
  ],
  heroSlides: [
    '/assets/aistudio/images_5d277f01.jpg',
    '/assets/aistudio/images_8a0d2d8c.jpg',
  ],
  quotePortrait: '/assets/aistudio/images_8a0d2d8c.jpg',
  brideGroomBackdrop: '/assets/aistudio/images_5d277f01.jpg',
  bridePortrait: '/assets/aistudio/images_17c2170f.jpg',
  groomPortrait: '/assets/aistudio/images_e90b24a9.jpg',
  eventBackdrop: '/assets/aistudio/images_5d277f01.jpg',
  closingBackdrop: '/assets/aistudio/images_8a0d2d8c.jpg',
  gallery: [
    {
      src: '/assets/aistudio/images_8a0d2d8c.jpg',
      alt: 'Dewi & Deni berjalan bergandengan tangan di peron stasiun klasik',
      objectPosition: 'object-center',
    },
    {
      src: '/assets/aistudio/images_5d277f01.jpg',
      alt: 'Potret studio Dewi & Deni dengan busana tradisional elegan',
      objectPosition: 'object-center',
    },
    {
      src: '/assets/aistudio/images_17c2170f.jpg',
      alt: 'Potret anggun mempelai wanita di bawah pepohonan keemasan',
      objectPosition: 'object-top',
    },
    {
      src: '/assets/aistudio/images_e90b24a9.jpg',
      alt: 'Potret gagah mempelai pria mengenakan beskap putih dan blangkon',
      objectPosition: 'object-top',
    },
    {
      src: '/assets/aistudio/images_97f31c1b.jpg',
      alt: 'Momen ceria penuh tawa Dewi & Deni bersama',
      objectPosition: 'object-center',
    },
    {
      src: '/assets/aistudio/images_8a0d2d8c.jpg',
      alt: 'Langkah penuh kehangatan bersama Dewi & Deni',
      objectPosition: 'object-[50%_25%]',
    },
    {
      src: '/assets/aistudio/images_5d277f01.jpg',
      alt: 'Nuansa hangat potret klasik Dewi & Deni',
      objectPosition: 'object-[50%_20%]',
    },
    {
      src: '/assets/aistudio/images_17c2170f.jpg',
      alt: 'Detail gaun pengantin bernuansa lembut',
      objectPosition: 'object-[50%_35%]',
    },
    {
      src: '/assets/aistudio/images_e90b24a9.jpg',
      alt: 'Detail busana adat mempelai pria di alam terbuka',
      objectPosition: 'object-[50%_25%]',
    },
  ],
};

export const WEDDING_INFO = {
  coupleShort: 'Dewi & Deni',
  eventDateLabel: 'Sabtu, 06 November 2027',
  eventShortDateLabel: 'Sabtu, 6 November 2027',
  eventTimeLabel: 'Pukul 07.00 WIB - Selesai',
  targetIsoDate: '2027-11-06T07:00:00+07:00',
  heroQuote:
    '" Happy marriages begin when we marry the ones we love, and they blossom when we love the ones we marry "',
  quranVerse:
    '“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”',
  quranSurah: 'QS. Ar-Rum Ayat 21',
  bismillah: 'بِسْــــــــــــــــــمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ',
  brideGroomIntro:
    'Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami',
  bride: {
    name: 'Dewi Marina, S. Pd.',
    parents: 'Putri Kelima dari Alm. Bapak Hasan Basri dan Ibu Sukatmirotun',
    instagramHandle: '@wiewie_marina',
    instagramUrl: 'https://www.instagram.com/wiewie_marina/',
  },
  groom: {
    name: 'Mohammad Deni Setiawan, S. Pd.',
    parents: 'Putra Tunggal dari Bapak Tatang Setiawan dan Ibu Jamilah',
    instagramHandle: '@setiawan_deni_12',
    instagramUrl: 'https://www.instagram.com/setiawan_deni_12/',
  },
  venue: {
    name: 'PT. Panca Banyu Ajisakti',
    address:
      'Jl. Kayu Manis, Jl. AMD XXVIII No. 51, RT 6/RW 5, Balekambang, Kec. Kramat Jati, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13530',
    mapsUrl:
      'https://www.google.com/maps/place/pt+panca+banyu+ajisakti/@-6.2894519,106.8536267,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f39944069221:0xfbd8cca6c3329121!8m2!3d-6.2894519!4d106.8536267!16s%2Fg%2F11fnwn59kh',
  },
  closingMessage:
    'Atas kehadiran dan do’a restu dari Bapak/Ibu/Saudara/i sekalian, kami mengucapkan Terima Kasih.',
  closingSalam: 'وَعَلَيْكُمُ لسَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
};

export const LOVE_STORY_CHAPTERS: LoveStoryChapter[] = [
  {
    id: 'awal-cerita',
    title: 'Awal Sebuah Cerita',
    date: '2022 — Semester 1',
    image: '/assets/aistudio/images_97f31c1b.jpg',
    paragraphs: [
      'Semua berawal pada tahun 2022, di semester pertama perkuliahan. Di antara banyaknya wajah baru dan cerita yang belum dimulai, tak pernah terbayangkan bahwa sebuah pertemuan sederhana di kampus akan menjadi awal dari kisah yang begitu berarti.',
      'Siapa sangka, tempat kami menuntut ilmu justru menjadi tempat dimulainya kisah cinta kami. Dari dua orang yang awalnya saling mengenal, perlahan tumbuh cerita yang membawa kami hingga sejauh ini.',
    ],
    quote: 'Every love story has a beginning.',
  },
  {
    id: 'teman-istimewa',
    title: 'Dari Teman Menjadi Seseorang yang Istimewa',
    image: '/assets/aistudio/images_8a0d2d8c.jpg',
    paragraphs: [
      'Berawal dari saling mengenal, bertukar cerita, hingga perlahan tumbuh rasa yang tak lagi sama. Hari demi hari kami lalui bersama, belajar memahami satu sama lain, melewati suka dan duka, serta tumbuh bersama dalam perjalanan yang tidak selalu mudah.',
      'Hingga akhirnya, kami menyadari bahwa satu sama lain bukan sekadar bagian dari cerita, melainkan seseorang yang ingin kami ajak menulis masa depan.',
    ],
  },
  {
    id: 'lamaran',
    title: 'Satu Langkah Menuju Selamanya',
    date: '18 Oktober 2026',
    paragraphs: [
      'Setelah perjalanan yang kami lalui bersama, tibalah saatnya membawa kisah ini ke tahap yang lebih serius. Dengan niat baik dan restu kedua keluarga, kami mengikat sebuah kesungguhan dalam acara lamaran.',
      'Bukan lagi sekadar tentang dua hati yang saling mencintai, melainkan tentang dua keluarga yang mulai menyatukan harapan dan doa untuk masa depan kami.',
    ],
    quote: 'One step closer to forever.',
  },
  {
    id: 'wisuda',
    title: 'Wisuda Bersama',
    date: '27 Oktober 2026',
    image: '/assets/aistudio/images_5d277f01.jpg',
    paragraphs: [
      'Setelah perjalanan panjang di bangku perkuliahan, akhirnya kami sampai pada salah satu pencapaian yang membanggakan: wisuda bersama. Dari pertemuan di semester pertama, kini kami berdiri berdampingan, merayakan hasil dari perjuangan, doa, dan usaha yang telah kami lalui.',
      'Satu perjalanan berhasil kami selesaikan bersama, dan kini kami bersiap memulai perjalanan baru dengan tujuan yang lebih besar.',
    ],
    quote: 'From campus mates to life partners. 🎓🤍',
  },
  {
    id: 'hari-dinantikan',
    title: 'Hari yang Kami Nantikan',
    date: '06 November 2027',
    image: '/assets/aistudio/images_17c2170f.jpg',
    paragraphs: [
      'Dari sebuah pertemuan sederhana di kampus, perjalanan cinta ini akhirnya membawa kami menuju hari yang istimewa. Dengan memohon rahmat dan rida Allah SWT, kami akan mengikat janji suci pernikahan, memulai kehidupan baru sebagai pasangan, dan belajar membangun keluarga bersama.',
      'Semoga cinta yang tumbuh sejak masa perkuliahan ini senantiasa terjaga, menjadi sumber kekuatan, dan membawa kami menuju kebahagiaan hingga akhir usia.',
    ],
  },
  {
    id: 'sampai-disini',
    title: 'Akhirnya, Kita Sampai di Sini',
    paragraphs: [
      '2022, kita memulai cerita. 18 Oktober 2026, kita melangkah menuju keseriusan. 27 Oktober 2026, kita merayakan wisuda bersama. 06 November 2027, kita memulai kehidupan sebagai suami dan istri.',
      'Dari teman di bangku perkuliahan, menjadi teman seperjuangan, hingga akhirnya menjadi teman hidup. Ternyata, salah satu hal terindah dari perjalanan kuliah bukan hanya tentang gelar yang berhasil diraih, tetapi juga tentang menemukan seseorang yang ingin diajak menjalani kehidupan setelahnya.',
      'Mohon doa restu agar perjalanan baru kami selalu dilimpahi cinta, keberkahan, dan kebahagiaan. 🤍',
    ],
    quote: 'We met as strangers, grew together, and chose each other for a lifetime.',
  },
];

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'seabank-dewi',
    bankName: 'SeaBank',
    accountHolder: 'Dewi Marina',
    accountNumber: '901936736075',
    lastFour: '6075',
  },
  {
    id: 'seabank-deni',
    bankName: 'SeaBank',
    accountHolder: 'Mohammad Deni Setiawan',
    accountNumber: '901935757794',
    lastFour: '7794',
  },
];

export const PHYSICAL_GIFT_ADDRESS = 'Perumahan Mega Regency Blok D59 No. 34';

export const INITIAL_WISHES: RsvpWish[] = [];

export function downloadWeddingIcs(): void {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dewi & Deni Wedding//ID',
    'BEGIN:VEVENT',
    'UID:dewi-deni-20271106@wedding',
    'DTSTAMP:20261124T000000Z',
    'DTSTART:20271106T000000Z',
    'DTEND:20271106T070000Z',
    'SUMMARY:The Wedding of Dewi & Deni (Akad Nikah & Resepsi)',
    'DESCRIPTION:Akad Nikah & Resepsi Pernikahan Dewi Marina, S. Pd. & Mohammad Deni Setiawan, S. Pd.',
    'LOCATION:PT. Panca Banyu Ajisakti, Jl. Kayu Manis, Jl. AMD XXVIII No. 51, Balekambang, Kramat Jati, Jakarta Timur',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Dewi-Deni-Wedding.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
