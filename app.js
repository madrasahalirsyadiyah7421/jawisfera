// ============================================================
//  JAWISFERA — Rumi-to-Jawi Conversion Engine
//  Based on Dewan Bahasa dan Pustaka (DBP) guidelines
// ============================================================

'use strict';

// ──────────────────────────────────────────────
//  1. JAWI DICTIONARY  (Rumi → Jawi)
//     Verified common words for accurate output
// ──────────────────────────────────────────────

const JAWI_DICT = {
  // ── Rujukan DBP: Pedoman Umum Ejaan Jawi Bahasa Melayu Dewan ──
  // 'aksi' has no hamzah — unlike its Arabic-origin neighbours in the
  // source table, it is a loanword from "action", confirmed against a
  // clearer photo of the same reference page.
  'aksi': 'اکسي',

  // ── Rujukan DBP ms.90-92: istilah keislaman & kata serapan Arab ──
  // Sekumpulan ejaan (adil, ghaib, hakim, waris, zalim) menambah huruf ya
  // berbanding ejaan asal Arab — pola yang sama menjelaskan pembetulan
  // "waris" di atas (وارث → واريث).
  'fasiq': 'فاسق', 'haji': 'حاج', 'hafiz': 'حافظ', 'jamik': 'جامع',
  'kafir': 'کافر', 'sabit': 'ثابت', 'walid': 'والد', 'ghaib': 'غائيب',
  'hakim': 'حاکيم', 'zalim': 'ظاليم', 'ijab': 'ايجاب', 'iman': 'ايمان',
  'kadi': 'قاضي', 'rawi': 'راوي', 'kamus': 'قاموس', 'kanun': 'قانون',
  'yakut': 'ياقوت', 'baki': 'باقي', 'muharam': 'محرم', 'mukalaf': 'مکلف',
  'mumaiyiz': 'مميز',

  // ── Awalan se-/ke- + kata dasar bermula huruf vokal (hamzah pada alif),
  // dan pasangan bentuk dasar/terbitan — rujukan DBP ms.68-71 ──
  'erti': 'ارتي', 'unit': 'اونيت', 'urus': 'اوروس',
  'seagama': 'سأݢام', 'seerti': 'سأرتي', 'seorang': 'سأورڠ', 'seunit': 'سأونيت',
  'keempat': 'کأمڤت', 'keenam': 'کأنم', 'keurus': 'کأوروس',
  'alam': 'عالم', 'alamiah': 'عالميه',
  'hadir': 'حاضير', 'hadirin': 'حاضيرين',
  'jadikan': 'جاديکن', 'seniman': 'سنيمن',
  'bangsa': 'بڠسا', 'bangsawan': 'بڠساون',
  'duniawi': 'دنياوي',
  'sultanah': 'سلطانه', 'muslim': 'مسلم', 'muslimat': 'مسلمات',

  'abadi': 'ابادي', 'abdi': 'عبدي', 'adil': 'عاديل', 'azan': 'اذان',
  'bacaan': 'باچاءن', 'bahas': 'بحث', 'baja': 'باج', 'batal': 'باطل',
  'batuk': 'باتوق', 'bawang': 'باوڠ', 'bekal': 'بکل', 'belang': 'بلڠ',
  'bersih': 'برسيه', 'buang': 'بواڠ', 'buncit': 'بونچيت', 'daif': 'ضعيف',
  'deru': 'ديرو', 'didik': 'ديديق', 'doa': 'دعاء', 'duda': 'دودا',
  'duet': 'دوءيت', 'ehwal': 'احوال', 'emak': 'امق', 'fardu': 'فرض',
  'fasakh': 'فسخ', 'gasing': 'ݢاسيڠ', 'hasrat': 'حسرت', 'helah': 'حيله',
  'hujung': 'هوجوڠ', 'ibadat': 'عبادة', 'ihsan': 'احسان', 'ikhlas': 'اخلاص',
  'insaf': 'اءنساف', 'isbat': 'اءثبت', 'izin': 'اءيزين', 'jala': 'جالا',
  'jambangan': 'جمبڠن', 'jemaah': 'جماعه', 'kapal': 'کڤل', 'kemiskinan': 'کميسکينن',
  'keruing': 'کروءيڠ', 'khamis': 'خميس', 'kuini': 'کوءيني', 'kurung': 'کوروڠ',
  'lafaz': 'لافظ', 'lapis': 'لاڤيس', 'lawan': 'لاون', 'lazat': 'لذت',
  'lemak': 'لماق', 'malaikat': 'ملائکة', 'masalah': 'مسئله', 'misal': 'ميثال',
  'mizan': 'ميزان', 'muamalat': 'معاملت', 'nikah': 'نکاح', 'nusyuz': 'نشوز',
  'padat': 'ڤادت', 'paksa': 'ڤقسا', 'pentas': 'ڤنتس', 'pimpinan': 'ڤيمڤينن',
  'puisi': 'ڤوءيسي', 'pukul': 'ڤوکول', 'qari': 'قاري', 'rawa': 'راوا',
  'reda': 'ريدا', 'ribut': 'ريبوت', 'rujuk': 'رجوع', 'santan': 'سنتن',
  'sembahyang': 'سمبهيڠ', 'sibuk': 'سيبوق', 'silat': 'سيلت', 'soal': 'سوءال',
  'solat': 'صلة', 'subuh': 'صبح', 'sulam': 'سولم', 'syak': 'شق',
  'sai': 'سعي', 'bidaah': 'بدعة', 'isyak': 'عشاء',
  'takwa': 'تقوى', 'tambah': 'تمبه', 'tampil': 'تمڤيل', 'tuan': 'توان',
  'udara': 'اودارا', 'ulama': 'علماء', 'umrah': 'عمرة', 'usrah': 'اءسره',
  'waris': 'واريث', 'wayang': 'واياڠ', 'zamzam': 'زمزم', 'ziarah': 'زيارة',
  'zikir': 'ذکر',

  // ── Proper names / Nama khas ──
  // Names of Arabic origin keep their Arabic spelling (e.g. ح not ه for
  // "Ahmad") rather than the native-Malay phonetic rules the rule engine
  // applies to ordinary words — so they live here, not in ruleBasedConvert.
  'ahmad': 'احمد',

  // ── Function words / Kata tugas ──
  'dan': 'دان', 'yang': 'يڠ', 'di': 'دي', 'ini': 'اين',
  'itu': 'ايتو', 'dengan': 'دڠن', 'untuk': 'اونتوق', 'pada': 'ڤد',
  'adalah': 'اداله', 'dari': 'دري', 'daripada': 'درڤد', 'ke': 'ک',
  'akan': 'اکن', 'tidak': 'تيدق', 'juga': 'جوݢ', 'sudah': 'سوده',
  'telah': 'تله', 'masih': 'ماسيه', 'belum': 'بلوم', 'bukan': 'بوکن',
  'hanya': 'هاڽ', 'sahaja': 'سهاج', 'jika': 'جک', 'kalau': 'کالاو',
  'tetapi': 'تتاڤي', 'atau': 'اتاو', 'serta': 'سرتا', 'oleh': 'اوليه',
  'kerana': 'کران', 'sebab': 'سبب', 'supaya': 'سوڤاي', 'agar': 'اݢر',
  'hingga': 'هيڠݢ', 'antara': 'انتارا', 'seperti': 'سڤرتي',
  'tentang': 'تنتڠ', 'tanpa': 'تنڤ', 'dalam': 'دالم', 'luar': 'لوار',
  'atas': 'اتس', 'bawah': 'باوه', 'sini': 'سيني', 'situ': 'سيتو',
  'mana': 'مان', 'bila': 'بيلا', 'bagaimana': 'بݢايمان',
  'mengapa': 'مڠاڤ', 'kenapa': 'کناڤ', 'siapa': 'سياڤ',
  'apa': 'اڤ', 'berapa': 'براڤ', 'pun': 'ڤون', 'lah': 'له',
  'kah': 'که', 'tah': 'ته', 'pula': 'ڤول', 'lagi': 'لاݢي',
  'sangat': 'سڠت', 'amat': 'امت', 'paling': 'ڤاليڠ', 'begitu': 'بݢيتو',
  'demikian': 'دميکين', 'setiap': 'ستياڤ', 'semua': 'سموا',
  'para': 'ڤارا', 'masing': 'ماسيڠ', 'seluruh': 'سلوروه',
  'segala': 'سݢالا', 'saling': 'ساليڠ', 'bersama': 'برسام',
  'dapat': 'داڤت', 'boleh': 'بوليه', 'harus': 'هاروس',
  'mesti': 'مستي', 'perlu': 'ڤرلو', 'wajib': 'واجب',
  'mahu': 'ماهو', 'hendak': 'هنداق', 'ingin': 'ايڠين',
  'suka': 'سوک', 'mungkin': 'موڠکين', 'hampir': 'همڤير',
  'sering': 'سريڠ', 'selalu': 'سلالو', 'kadang': 'کادڠ',
  'jarang': 'جارڠ', 'pernah': 'ڤرنه', 'sedang': 'سدڠ',
  'tengah': 'تڠه', 'baru': 'بارو', 'lama': 'لام',
  'dulu': 'دولو', 'dahulu': 'دهولو', 'kemudian': 'کمودين',
  'selepas': 'سلڤس', 'sebelum': 'سبلوم', 'sejak': 'سجق',
  'sambil': 'سمبيل', 'seraya': 'سراي', 'walau': 'والاو',
  'walaupun': 'والاوڤون', 'meskipun': 'مسکيڤون', 'namun': 'نامون',
  'malah': 'ماله', 'bahkan': 'بهکن', 'justeru': 'جوستيرو',
  'ya': 'يا', // ── Pronouns / Kata ganti nama ──
  'saya': 'ساي', 'aku': 'اکو', 'kami': 'کامي', 'kita': 'کيت',
  'dia': 'دي', 'beliau': 'بلياو', 'mereka': 'مريک', 'kamu': 'کامو',
  'awak': 'اوق', 'engkau': 'اڠکاو', 'anda': 'اندا',
  'diri': 'ديري', 'sendiri': 'سنديري',

  // ── Nouns / Kata nama ──
  'orang': 'اورڠ', 'manusia': 'مانوسيا', 'lelaki': 'للاکي',
  'perempuan': 'ڤرمڤوان', 'wanita': 'وانيت', 'budak': 'بوداق',
  'anak': 'انق', 'bapa': 'باڤ', 'ayah': 'ايه', 'ibu': 'ايبو',
  'adik': 'اديق', 'abang': 'ابڠ', 'kakak': 'کاکق',
  'keluarga': 'کلوارݢ', 'kawan': 'کاون', 'sahabat': 'سهابت',
  'rumah': 'رومه', 'pintu': 'ڤينتو', 'tingkap': 'تيڠکڤ',
  'bilik': 'بيليق', 'dapur': 'داڤور', 'dinding': 'دينديڠ',
  'lantai': 'لنتاي', 'bumbung': 'بومبوڠ', 'halaman': 'هالامن',
  'air': 'اءير', 'api': 'اڤي', 'tanah': 'تانه', 'angin': 'اڠين',
  'langit': 'لاڠيت', 'bintang': 'بينتڠ', 'bulan': 'بولن',
  'matahari': 'ماتاهاري', 'hujan': 'هوجن', 'awan': 'اوان',
  'gunung': 'ݢونوڠ', 'bukit': 'بوکيت', 'laut': 'لاءوت',
  'sungai': 'سوڠاي', 'pantai': 'ڤنتاي', 'pulau': 'ڤولاو',
  'hutan': 'هوتن', 'pokok': 'ڤوکوق', 'bunga': 'بوڠا',
  'daun': 'داءون', 'buah': 'بواه', 'biji': 'بيجي',
  'hari': 'هاري', 'malam': 'مالم', 'pagi': 'ڤاݢي',
  'petang': 'ڤتڠ', 'tengahari': 'تڠهاري', 'waktu': 'وقتو',
  'masa': 'ماس', 'tahun': 'تاهون', 'minggu': 'ميڠݢو',
  'jam': 'جم', 'minit': 'مينيت', 'saat': 'ساعت',
  'negara': 'نݢارا', 'negeri': 'نݢري', 'bandar': 'بندر',
  'kampung': 'کمڤوڠ', 'desa': 'ديسا', 'dunia': 'دنيا',
  'tempat': 'تمڤت', 'jalan': 'جالن', 'lorong': 'لوروڠ',
  'kerja': 'کرج', 'pekerjaan': 'ڤکرجاءن', 'tugas': 'توݢس',
  'wang': 'واڠ', 'duit': 'دوءيت', 'harga': 'هرݢ',
  'hati': 'هاتي', 'perasaan': 'ڤراساءن', 'fikiran': 'فيکيرن',
  'jiwa': 'جيوا', 'nyawa': 'ڽاوا', 'roh': 'روح',
  'mata': 'مات', 'telinga': 'تليڠ', 'hidung': 'هيدوڠ',
  'mulut': 'مولوت', 'gigi': 'ݢيݢي', 'lidah': 'ليده',
  'tangan': 'تاڠن', 'kaki': 'کاکي', 'kepala': 'کڤالا',
  'badan': 'بادن', 'perut': 'ڤروت', 'dada': 'دادا',
  'bahu': 'باهو', 'jari': 'جاري', 'kuku': 'کوکو',
  'rambut': 'رمبوت', 'kulit': 'کوليت', 'tulang': 'تولڠ',
  'darah': 'داره', 'suara': 'سوارا',

  // ── Animals / Haiwan ──
  'kucing': 'کوچيڠ', 'anjing': 'انجيڠ', 'ayam': 'ايم',
  'ikan': 'ايکن', 'burung': 'بوروڠ', 'lembu': 'لمبو',
  'kambing': 'کمبيڠ', 'kuda': 'کودا', 'harimau': 'هاريماو',
  'gajah': 'ݢاجه', 'ular': 'اولر', 'nyamuk': 'ڽاموق',
  'semut': 'سموت', 'kupu': 'کوڤو', 'rama': 'رام',

  // ── Food / Makanan ──
  'nasi': 'ناسي', 'lauk': 'لاءوق', 'sayur': 'سايور',
  'daging': 'داݢيڠ', 'telur': 'تلور', 'roti': 'روتي',
  'gula': 'ݢول', 'garam': 'ݢارم', 'minyak': 'ميڽق',
  'susu': 'سوسو', 'teh': 'ته', 'kopi': 'کوڤي',

  // ── Verbs / Kata kerja ──
  'ada': 'اد', 'tiada': 'تياد', 'jadi': 'جادي',
  'pergi': 'ڤرݢي', 'datang': 'داتڠ', 'pulang': 'ڤولڠ',
  'balik': 'باليق', 'masuk': 'ماسوق', 'keluar': 'کلوار',
  'naik': 'ناءيق', 'turun': 'تورون', 'sampai': 'سمڤاي',
  'tinggal': 'تيڠݢل', 'duduk': 'دودوق', 'berdiri': 'برديري',
  'berjalan': 'برجالن', 'berlari': 'برلاري', 'terbang': 'تربڠ',
  'makan': 'ماکن', 'minum': 'مينوم', 'tidur': 'تيدور',
  'bangun': 'باڠون', 'jaga': 'جاݢ',
  'lihat': 'ليهت', 'melihat': 'مليهت', 'nampak': 'نمڤق',
  'dengar': 'دڠر', 'mendengar': 'مندڠر',
  'cakap': 'چاکڤ', 'berkata': 'برکات', 'kata': 'کات',
  'bercakap': 'برچاکڤ', 'berbual': 'بربوال',
  'tulis': 'توليس', 'menulis': 'منوليس',
  'baca': 'باچ', 'membaca': 'ممباچ',
  'belajar': 'بلاجر', 'mengajar': 'مڠاجر', 'ajar': 'اجر',
  'tahu': 'تاهو', 'kenal': 'کنل', 'faham': 'فاهم',
  'fikir': 'فيکير', 'berfikir': 'برفيکير',
  'ingat': 'ايڠت', 'lupa': 'لوڤ', 'harap': 'هارڤ',
  'minta': 'مينت', 'beri': 'بري', 'memberi': 'ممبري',
  'terima': 'تريما', 'menerima': 'منريما',
  'ambil': 'امبيل', 'mengambil': 'مڠمبيل',
  'letak': 'لتق', 'simpan': 'سيمڤن',
  'buat': 'بوات', 'membuat': 'ممبوات',
  'buka': 'بوک', 'tutup': 'توتوڤ',
  'mula': 'مول', 'bermula': 'برمول',
  'habis': 'هابيس', 'tamat': 'تامت', 'selesai': 'سلساي',
  'cuba': 'چوب', 'usaha': 'اوساها',
  'tolong': 'تولوڠ', 'bantu': 'بنتو',
  'bekerja': 'بکرج',
  'main': 'ماءين', 'bermain': 'برماءين',
  'beli': 'بلي', 'membeli': 'ممبلي',
  'jual': 'جوال', 'menjual': 'منجوال',
  'bayar': 'بايار', 'membayar': 'ممبايار',
  'hantar': 'هنتر', 'menghantar': 'مڠهنتر',
  'kirim': 'کيريم', 'cari': 'چاري', 'mencari': 'منچاري',
  'jumpa': 'جومڤ', 'menjumpai': 'منجومڤاي',
  'guna': 'ݢون', 'menggunakan': 'مڠݢوناکن',
  'pakai': 'ڤاکاي', 'memakai': 'مماکاي',
  'bawa': 'باوا', 'membawa': 'ممباوا',
  'angkat': 'اڠکت', 'pegang': 'ڤݢڠ',
  'tarik': 'تاريق', 'tolak': 'تولق',
  'potong': 'ڤوتوڠ', 'ikat': 'ايکت',
  'cuci': 'چوچي', 'basuh': 'باسوه',
  'masak': 'ماسق', 'goreng': 'ݢوريڠ', 'rebus': 'ربوس',
  'sayang': 'سايڠ', 'cinta': 'چينت', 'kasih': 'کاسيه',
  'senyum': 'سڽوم', 'ketawa': 'کتاوا', 'menangis': 'مناڠيس',
  'takut': 'تاکوت', 'berani': 'براني', 'malu': 'مالو',
  'marah': 'ماره', 'gembira': 'ݢمبيرا', 'sedih': 'سديه',
  'hidup': 'هيدوڤ', 'mati': 'ماتي',
  'lahir': 'لاهير', 'tumbuh': 'تومبوه',

  // ── Adjectives / Kata sifat ──
  'besar': 'بسر', 'kecil': 'کچيل', 'panjang': 'ڤنجڠ',
  'pendek': 'ڤنديق', 'tinggi': 'تيڠݢي', 'rendah': 'رنده',
  'luas': 'لواس', 'sempit': 'سمڤيت',
  'baik': 'بايق', 'buruk': 'بوروق', 'jahat': 'جاهت',
  'cantik': 'چنتيق', 'indah': 'اينده', 'hodoh': 'هودوه',
  'elok': 'ايلوق',
  'usang': 'اوسڠ',
  'muda': 'مودا', 'tua': 'توا',
  'cepat': 'چڤت', 'lambat': 'لمبت', 'pantas': 'ڤنتس',
  'kuat': 'کوات', 'lemah': 'لمه', 'keras': 'کراس',
  'lembut': 'لمبوت', 'halus': 'هالوس', 'kasar': 'کاسر',
  'berat': 'برت', 'ringan': 'ريڠن',
  'panas': 'ڤانس', 'sejuk': 'سجوق', 'hangat': 'هاڠت',
  'basah': 'باسه', 'kering': 'کريڠ',
  'terang': 'ترڠ', 'gelap': 'ݢلڤ',
  'putih': 'ڤوتيه', 'hitam': 'هيتم', 'merah': 'ميره',
  'biru': 'بيرو', 'kuning': 'کونيڠ', 'hijau': 'هيجاو',
  'coklat': 'چوکلت',
  'banyak': 'بڽق', 'sedikit': 'سديکيت', 'sikit': 'سيکيت',
  'penuh': 'ڤنوه', 'kosong': 'کوسوڠ',
  'betul': 'بتول', 'benar': 'بنر', 'salah': 'ساله',
  'senang': 'سنڠ', 'susah': 'سوسه', 'sukar': 'سوکر',
  'mudah': 'موده', 'bagus': 'باݢوس', 'hebat': 'هيبت', 'pandai': 'ڤنداي',
  'bodoh': 'بودوه', 'pintar': 'ڤينتر', 'bijak': 'بيجق',
  'miskin': 'ميسکين', 'kaya': 'کاي', 'mahal': 'ماهل',
  'murah': 'موره', 'percuma': 'ڤرچوم',
  'sihat': 'صيحت', 'sakit': 'ساکيت',

  // ── Numbers / Nombor ──
  'satu': 'ساتو', 'dua': 'دوا', 'tiga': 'تيݢ',
  'empat': 'امڤت', 'lima': 'ليم', 'enam': 'انم',
  'tujuh': 'توجوه', 'lapan': 'لاڤن', 'sembilan': 'سمبيلن',
  'sepuluh': 'سڤولوه', 'sebelas': 'سبلس',
  'ratus': 'راتوس', 'ribu': 'ريبو', 'juta': 'جوت',
  'pertama': 'ڤرتام', 'kedua': 'کدوا', 'ketiga': 'کتيݢ',

  // ── Places / Education / Social ──
  'sekolah': 'سکوله', 'universiti': 'اونيۏرسيتي',
  'masjid': 'مسجد', 'surau': 'سوراو', 'gereja': 'ݢريج',
  'hospital': 'هوسڤيتل', 'kedai': 'کداي', 'pasar': 'ڤاسر',
  'guru': 'ݢورو', 'murid': 'موريد', 'pelajar': 'ڤلاجر',
  'ilmu': 'ايلمو', 'buku': 'بوکو', 'surat': 'سورت',
  'kelas': 'کلس', 'peperiksaan': 'ڤڤريقساءن',
  'cikgu': 'چيقݢو', 'doktor': 'دوکتور', 'polis': 'ڤوليس',
  'raja': 'راج', 'sultan': 'سلطان', 'tuhan': 'توهن',
  'agama': 'اݢام', 'islam': 'إسلام',
  'melayu': 'ملايو', 'malaysia': 'مليسيا',
  'bahasa': 'بهاس', 'perkataan': 'ڤرکاتاءن',
  'huruf': 'حروف', 'ayat': 'ايت',

  // ── Time / Greetings ──
  'selamat': 'سلامت', 'maaf': 'معاف', 'assalamualaikum': 'السلام عليکم',

  // ── Story-related additions ──
  'bola': 'بولا', 'sepak': 'سڤق', 'padang': 'ڤداڠ',
  'latih': 'لاتيه', 'berlatih': 'برلاتيه',
  'tendang': 'تندڠ', 'menendang': 'منندڠ',
  'rajin': 'راجين', 'pasukan': 'ڤاسوکن',
  'tanding': 'تنديڠ', 'bertanding': 'برتنديڠ',
  'sungguh': 'سوڠݢوه', 'kalah': 'کاله',
  'putus': 'ڤوتوس', 'asa': 'اس',
  'terus': 'تروس', 'menang': 'مناڠ',
  'bahawa': 'بهاوا', 'kejayaan': 'کجاياءن',
  'nama': 'نام', 'bernama': 'برنام',
  'comel': 'چومل', 'mandi': 'مندي',
  'memandikan': 'ممنديکن',
  'ubat': 'اوبت', 'sembuh': 'سمبوه',
  'semula': 'سمولا', 'haiwan': 'حيوان',
  'cerita': 'چريتا', 'lari': 'لاري',
  'ekor': 'ايکور', 'seekor': 'سأيکور',
  'lukis': 'لوکيس', 'melukis': 'ملوکيس',
  'lukisan': 'لوکيسن', 'seni': 'سني',
  'pertandingan': 'ڤرتنديڠن',
  'bakat': 'باکت', 'asah': 'اسه',
  'diasah': 'دياسه', 'mengasah': 'مڠاسه',
  'kebun': 'کبون', 'berkebun': 'برکبون',
  'tanam': 'تانم', 'menanam': 'منانم',
  'siram': 'سيرم', 'menyiram': 'مڽيرم',
  'subur': 'سوبور', 'hasil': 'حاصيل',
  'petik': 'ڤتيق', 'sabar': 'صابر',
  'masakan': 'ماسقن', 'memasak': 'مماسق',
  'renang': 'رنڠ', 'berenang': 'برنڠ',
  'kolam': 'کولم', 'perkara': 'ڤرکارا',
  'muzik': 'موزيق', 'gitar': 'ݢيتر',
  'hadapan': 'هادڤن', 'kini': 'کيني',
  'mempunyai': 'ممڤوڽاي', 'kepada': 'کڤد',
  'mulanya': 'مولاڽ', 'kegembiraan': 'کݢمبيراءن',
  'membantu': 'ممبنتو', 'membuka': 'ممبوک',
  'menjaga': 'منجاݢ', 'berguna': 'برݢونا',
  'mencuba': 'منچوب', 'perpustakaan': 'ڤرڤوستاکاءن',
  'kelamaan': 'کلاماءن',
  'nilai': 'نيلاي', 'murni': 'مورني',
  'ketekunan': 'کتکونن', 'semangat': 'سماڠت',
  'kesabaran': 'کصابرن', 'keberanian': 'کبرانين',
};

// ──────────────────────────────────────────────
//  2. CHARACTER MAPPING TABLES
// ──────────────────────────────────────────────

const DIGRAPHS = {
  'ng': 'ڠ',
  'ny': 'ڽ',
  'sy': 'ش',
  'kh': 'خ',
  'gh': 'غ',
};

const CONSONANT_MAP = {
  'b': 'ب', 'c': 'چ', 'd': 'د', 'f': 'ف',
  'g': 'ݢ', 'h': 'ه', 'j': 'ج', 'k': 'ک',
  'l': 'ل', 'm': 'م', 'n': 'ن', 'p': 'ڤ',
  'q': 'ق', 'r': 'ر', 's': 'س', 't': 'ت',
  'v': 'ۏ', 'w': 'و', 'x': 'کس', 'y': 'ي',
  'z': 'ز',
};

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
const CONSONANTS_SET = new Set(Object.keys(CONSONANT_MAP));

// Jawi letters that do not join to the letter after them.
// Decides whether a final open "a" keeps its alif (kuda کودا vs mata مات).
const NON_CONNECTING = new Set(['ا', 'د', 'ذ', 'ر', 'ز', 'و', 'ۏ', 'ء', 'ژ']);

// Rumi punctuation → Arabic-script equivalents
const PUNCTUATION_MAP = { ',': '،', ';': '؛', '?': '؟', '(': '﴿', ')': '﴾' };

// ── Words where 'e' is e-taling (é, /e/) not e-pepet (ə) ──
// Format: { word: [positions of e-taling (0-indexed char positions)] }
const E_TALING_MAP = {
  // Removed as e-pepet, not e-taling: emas /əmas/, gerak /gərak/,
  // keras /kəras/ (the dictionary already spells it کراس, without ya),
  // teman /təman/, perang /pəraŋ/ (war — pérang "blond" is the rarer sense),
  // and 'heba', which is not a word.
  'ekor': [0], 'elok': [0], 'esok': [0], 'enak': [0],
  'ela': [0],
  'meja': [1], 'desa': [1], 'lega': [1], 'mega': [1],
  'sewa': [1], 'rela': [1], 'bela': [1],
  'dewan': [1],
  'lewa': [1], 'lewat': [1],
  'hewan': [1], 'kera': [1], 'sera': [1],
  'merah': [1],
  'oleh': [2], 'boleh': [3],
  'hebat': [1], 'helang': [1],
};

// ──────────────────────────────────────────────
//  3. SYLLABLE SPLITTER
//     Splits Malay words into syllables
// ──────────────────────────────────────────────

function isVowel(ch) {
  return VOWELS.has(ch.toLowerCase());
}

function isConsonant(ch) {
  return /[a-z]/i.test(ch) && !isVowel(ch);
}

function isDigraph(word, pos) {
  if (pos + 1 >= word.length) return false;
  const pair = word.substring(pos, pos + 2).toLowerCase();
  return DIGRAPHS.hasOwnProperty(pair);
}

/**
 * Split a Malay word into syllables.
 * Rules:
 * - V, CV, VC, CVC, CCV patterns
 * - Digraphs (ng, ny, sy, kh, gh) count as single consonants
 * - Prefixes: me-, se-, be-, ke-, pe-, ter-, ber-, per-, di-
 */
function splitSyllables(word) {
  if (!word || word.length === 0) return [];

  const lw = word.toLowerCase();

  // Tokenize into units (digraphs as single units)
  const units = [];
  let i = 0;
  while (i < lw.length) {
    if (i + 1 < lw.length) {
      const pair = lw.substring(i, i + 2);
      if (DIGRAPHS[pair]) {
        units.push({ ch: pair, type: 'C', orig: word.substring(i, i + 2) });
        i += 2;
        continue;
      }
    }
    const ch = lw[i];
    if (isVowel(ch)) {
      units.push({ ch, type: 'V', orig: word[i] });
    } else if (/[a-z]/i.test(ch)) {
      units.push({ ch, type: 'C', orig: word[i] });
    } else {
      units.push({ ch, type: 'X', orig: word[i] });
    }
    i++;
  }

  // Group into syllables using simple onset-maximization
  const syllables = [];
  let current = '';
  let unitIdx = 0;

  while (unitIdx < units.length) {
    const u = units[unitIdx];

    if (u.type === 'X') {
      if (current) syllables.push(current);
      current = '';
      syllables.push(u.orig);
      unitIdx++;
      continue;
    }

    current += u.orig;
    unitIdx++;

    // If we just added a vowel, check what follows to determine syllable boundary
    if (u.type === 'V') {
      // Look ahead
      const remaining = units.slice(unitIdx);
      const consonantsAhead = [];
      let j = 0;
      while (j < remaining.length && remaining[j].type === 'C') {
        consonantsAhead.push(remaining[j]);
        j++;
      }
      const vowelAfter = j < remaining.length && remaining[j].type === 'V';

      if (consonantsAhead.length === 0) {
        // VV or end — syllable break after vowel
        if (unitIdx < units.length && units[unitIdx].type === 'V') {
          syllables.push(current);
          current = '';
        } else if (unitIdx >= units.length) {
          syllables.push(current);
          current = '';
        }
      } else if (consonantsAhead.length === 1) {
        if (vowelAfter) {
          // V-CV: break before the consonant
          syllables.push(current);
          current = '';
        } else {
          // VC at end: consonant goes with current syllable
          current += consonantsAhead[0].orig;
          unitIdx++;
          if (unitIdx >= units.length) {
            syllables.push(current);
            current = '';
          }
        }
      } else if (consonantsAhead.length >= 2) {
        if (vowelAfter) {
          // VCC...V: first consonant with current, rest start new syllable
          current += consonantsAhead[0].orig;
          unitIdx++;
          syllables.push(current);
          current = '';
        } else {
          // VCC at end: all consonants go with current
          for (const c of consonantsAhead) {
            current += c.orig;
            unitIdx++;
          }
          syllables.push(current);
          current = '';
        }
      }
    }
  }

  if (current) syllables.push(current);

  return syllables.length > 0 ? syllables : [word];
}

/**
 * ai / au / oi are one syllable (diftong) when the two vowels are not
 * separated by a coda: pu-la-u → pu-lau, pan-ta-i → pan-tai.
 * They stay apart when a consonant closes the second vowel, which is the
 * hiatus case that takes a hamzah: la-ut (لاءوت), a-ir (اءير), na-ik (ناءيق).
 */
function mergeDiphthong(sylls) {
  const out = [];
  for (const syl of sylls) {
    const prev = out[out.length - 1];
    if (prev && (syl === 'i' || syl === 'u')) {
      const pair = prev[prev.length - 1] + syl;
      if (pair === 'ai' || pair === 'au' || pair === 'oi') {
        out[out.length - 1] = prev + syl;
        continue;
      }
    }
    out.push(syl);
  }
  return out;
}

/**
 * The syllabification used by both the converter and the on-screen
 * "Pecahan Suku Kata" panel, so the two can never disagree.
 */
function syllabify(word) {
  return mergeDiphthong(splitSyllables(word));
}

/**
 * Break one syllable into onset / nucleus / coda, treating digraphs as units.
 */
function analyseSyllable(syl) {
  const units = [];
  let i = 0;
  while (i < syl.length) {
    const pair = syl.substr(i, 2);
    if (DIGRAPHS[pair]) { units.push({ c: pair, v: false }); i += 2; continue; }
    units.push({ c: syl[i], v: isVowel(syl[i]) });
    i++;
  }

  const onset = [], coda = [];
  let nucleus = '', seen = false;
  for (const u of units) {
    if (u.v) { nucleus += u.c; seen = true; }
    else if (!seen) onset.push(u.c);
    else coda.push(u.c);
  }
  return { onset, nucleus, coda };
}

// ──────────────────────────────────────────────
//  4. RULE-BASED JAWI CONVERSION
// ──────────────────────────────────────────────

/**
 * Map one Rumi consonant (or digraph) to its Jawi letter.
 * Final "k" in a Malay word is a glottal stop, written qaf.
 */
function mapConsonant(c, isWordFinal) {
  if (c === 'k' && isWordFinal) return 'ق';
  if (DIGRAPHS[c]) return DIGRAPHS[c];
  return CONSONANT_MAP[c] || c;
}

/**
 * Decide whether a vowel is written, and as what.
 *
 * Jawi does not write every vowel. The DBP convention this implements:
 *   a  — written in an open syllable, dropped in a closed one
 *        (ma-kan → ماکن, ta-nah → تانه, ker-tas → کرتس).
 *        In a final open syllable the alif survives only after a
 *        non-connecting letter (ku-da → کودا, but ma-ta → مات).
 *   i  — always written, ya
 *   u/o— always written, wau
 *   e  — pepet is never written; taling is written as ya
 * A vowel opening the word takes alif as its seat.
 */
function writeVowel(v, ctx) {
  switch (v) {
    case 'a':
      if (ctx.atWordStart) return 'ا';
      if (ctx.noOnset) return ctx.open ? 'ا' : '';
      if (!ctx.isLast) return ctx.open ? 'ا' : '';
      if (!ctx.open) return '';
      return NON_CONNECTING.has(ctx.prev) ? 'ا' : '';
    case 'i':
      return ctx.atWordStart ? 'اي' : 'ي';
    case 'u':
    case 'o':
      return ctx.atWordStart ? 'او' : 'و';
    case 'e':
      if (ctx.isTaling) return ctx.atWordStart ? 'اي' : 'ي';
      return ctx.atWordStart ? 'ا' : '';
    default:
      return '';
  }
}

/**
 * Convert a single Rumi word to Jawi by rule, syllable by syllable.
 * This is the fallback when the word isn't in the dictionary — its output
 * is an informed estimate, not a verified DBP spelling, and the UI marks
 * it as such.
 */
function ruleBasedConvert(word) {
  const lw = word.toLowerCase();
  const taling = E_TALING_MAP[lw] || [];
  const sylls = syllabify(lw);
  if (!sylls.length) return '';

  // character offset of each syllable, so e-taling positions still line up
  const offsets = [];
  let acc = 0;
  for (const s of sylls) { offsets.push(acc); acc += s.length; }

  let out = '';

  for (let si = 0; si < sylls.length; si++) {
    const { onset, nucleus, coda } = analyseSyllable(sylls[si]);
    const isFirst = si === 0;
    const isLast = si === sylls.length - 1;
    const open = coda.length === 0;

    // Onset
    for (const c of onset) out += mapConsonant(c, false);

    // Hamzah for two vowels meeting across a syllable break.
    //   after alif — always      a-ir → اءير, pe-ra-sa-an → ڤراساءن
    //   after wau  — only before i   du-it → دوءيت, but lu-ar → لوار
    //   after ya   — never        ke-mu-di-an → کمودين, si-a-pa → سياڤ
    if (!isFirst && onset.length === 0) {
      const prev = out.slice(-1);
      if (prev === 'ا' || (prev === 'و' && nucleus[0] === 'i')) out += 'ء';
    }

    // Nucleus
    if (nucleus === 'ai' || nucleus === 'au' || nucleus === 'oi') {
      out += (nucleus === 'ai' ? 'اي' : nucleus === 'au' ? 'او' : 'وي');
    } else if (nucleus.length === 1) {
      const vPos = offsets[si] + onset.join('').length;
      out += writeVowel(nucleus, {
        atWordStart: isFirst && onset.length === 0,
        noOnset: onset.length === 0,
        isLast,
        open,
        prev: out.slice(-1),
        isTaling: nucleus === 'e' && taling.includes(vPos),
      });
    } else {
      for (const ch of nucleus) {
        out += writeVowel(ch, { atWordStart: false, noOnset: false, isLast, open, prev: out.slice(-1), isTaling: false });
      }
    }

    // Coda
    for (let ci = 0; ci < coda.length; ci++) {
      out += mapConsonant(coda[ci], isLast && ci === coda.length - 1);
    }
  }

  return out;
}

// ──────────────────────────────────────────────
//  5. MAIN CONVERSION FUNCTION
// ──────────────────────────────────────────────

/**
 * Convert a single word from Rumi to Jawi.
 * Priority: dictionary → prefix decomposition → rule-based
 */
/**
 * Awalan "se-" dan "ke-" berakhir dengan vokal. Apabila kata dasar yang
 * mengikutinya turut bermula dengan alif (a/e/i/u/o di awal kata), dua
 * vokal itu bertembung, dan pertembungan tersebut ditulis dengan hamzah
 * di atas alif (أ), bukan alif kosong (ا) — mengikut Pedoman Umum Ejaan
 * Jawi Bahasa Melayu Dewan (DBP):
 *   ekor ايکور  →  seekor سأيکور   (bukan سايکور)
 *   urus اوروس  →  keurus كأوروس  (bukan كاوروس)
 * Kata terbitan pada rangkaian kata ganda (keempat-empat) tidak terjejas,
 * kerana hanya perkataan pertama itu bertembung terus dengan awalan.
 */
function fuseVowelPrefix(prefixRumi, stemJawi) {
  if ((prefixRumi === 'se' || prefixRumi === 'ke') && stemJawi.startsWith('ا')) {
    return 'أ' + stemJawi.slice(1);
  }
  return stemJawi;
}

function convertWord(word) {
  if (!word) return { jawi: '', method: 'none', rules: [] };

  const lw = word.toLowerCase();

  // Check dictionary
  if (JAWI_DICT[lw]) {
    return { jawi: JAWI_DICT[lw], method: 'dictionary', rules: detectRules(lw) };
  }

  // Try prefix decomposition
  const prefixes = [
    { rumi: 'meny', jawi: 'مڽ' }, { rumi: 'meng', jawi: 'مڠ' },
    { rumi: 'mem', jawi: 'مم' }, { rumi: 'men', jawi: 'من' },
    { rumi: 'me', jawi: 'م' },
    { rumi: 'peny', jawi: 'ڤڽ' }, { rumi: 'peng', jawi: 'ڤڠ' },
    { rumi: 'pem', jawi: 'ڤم' }, { rumi: 'pen', jawi: 'ڤن' },
    { rumi: 'pe', jawi: 'ڤ' },
    { rumi: 'ber', jawi: 'بر' }, { rumi: 'ter', jawi: 'تر' },
    { rumi: 'per', jawi: 'ڤر' }, { rumi: 'di', jawi: 'دي' },
    { rumi: 'ke', jawi: 'ک' }, { rumi: 'se', jawi: 'س' },
  ];

  const suffixes = [
    { rumi: 'kan', jawi: 'کن' }, { rumi: 'an', jawi: 'ن' },
    { rumi: 'i', jawi: 'ي' },
  ];

  for (const pfx of prefixes) {
    if (lw.startsWith(pfx.rumi) && lw.length > pfx.rumi.length + 1) {
      const stem = lw.slice(pfx.rumi.length);

      // Check stem in dictionary
      if (JAWI_DICT[stem]) {
        const rules = detectRules(lw);
        return { jawi: pfx.jawi + fuseVowelPrefix(pfx.rumi, JAWI_DICT[stem]), method: 'prefix+dict', rules };
      }

      // Check stem + suffix
      for (const sfx of suffixes) {
        if (stem.endsWith(sfx.rumi) && stem.length > sfx.rumi.length + 1) {
          const root = stem.slice(0, -sfx.rumi.length);
          if (JAWI_DICT[root]) {
            const rules = detectRules(lw);
            return { jawi: pfx.jawi + fuseVowelPrefix(pfx.rumi, JAWI_DICT[root]) + sfx.jawi, method: 'prefix+dict+suffix', rules };
          }
        }
      }
    }
  }

  // Rule-based fallback
  const jawi = ruleBasedConvert(lw);
  return { jawi, method: 'rules', rules: detectRules(lw) };
}

/**
 * Convert full text from Rumi to Jawi.
 * Preserves punctuation and whitespace.
 */
function convertText(text) {
  if (!text.trim()) return { words: [], fullJawi: '' };

  // Letters, digits and everything else are tokenised separately so that
  // numbers and acronyms survive intact instead of being transliterated.
  const tokens = text.match(/[A-Za-z]+|[0-9]+(?:[.,][0-9]+)*|[^A-Za-z0-9]+/g) || [];
  const results = [];

  for (const token of tokens) {
    if (/^[A-Za-z]+$/.test(token)) {
      // An all-caps token is an acronym (RM, KL, SPM) — leave it in Rumi.
      if (token.length > 1 && token === token.toUpperCase()) {
        results.push({ rumi: token, jawi: token, isWord: false, isLatin: true });
        continue;
      }
      const conversion = convertWord(token);
      results.push({
        rumi: token,
        jawi: conversion.jawi,
        method: conversion.method,
        rules: conversion.rules,
        syllables: syllabify(token),
        isWord: true,
      });
    } else if (/^[0-9]/.test(token)) {
      // Numbers stay as they are; they are isolated for bidi at render time.
      results.push({ rumi: token, jawi: token, isWord: false, isLatin: true });
    } else {
      // Punctuation — swap in the Arabic-script forms
      let jawiPunc = '';
      for (const ch of token) jawiPunc += (PUNCTUATION_MAP[ch] || ch);
      results.push({ rumi: token, jawi: jawiPunc, isWord: false });
    }
  }

  const fullJawi = results.map(r => r.jawi).join('');
  return { words: results, fullJawi };
}

// ──────────────────────────────────────────────
//  6. SPELLING RULE DETECTION & EXPLANATION
// ──────────────────────────────────────────────

const RULE_DB = {
  'e-pepet': {
    id: 'e-pepet',
    name: 'Hukum E-Pepet',
    badge: 'E-Pepet',
    desc: 'Huruf e pepet (bunyi "uh" seperti dalam "emak") tidak ditulis dalam ejaan Jawi.',
    example: '"empat" → امڤت (e tidak ditulis)',
  },
  'e-taling': {
    id: 'e-taling',
    name: 'Hukum E-Taling',
    badge: 'E-Taling',
    desc: 'Huruf e taling (bunyi "eh" seperti dalam "ekor") ditulis dengan huruf ya (ي) dalam Jawi.',
    example: '"elok" → ايلوق (e ditulis sebagai ي)',
  },
  'vokal-awal': {
    id: 'vokal-awal',
    name: 'Hukum Vokal di Awal Kata',
    badge: 'Vokal Awal',
    desc: 'Vokal di awal kata ditulis dengan alif (ا) sebagai huruf asas, diikuti huruf vokal berkenaan.',
    example: '"ikan" → ايکن (alif + ya untuk bunyi "i")',
  },
  'derang-ai': {
    id: 'derang-ai',
    name: 'Hukum Derang (ai)',
    badge: 'Derang',
    desc: 'Diftong "ai" ditulis dengan alif-ya (اي) dalam ejaan Jawi.',
    example: '"gulai" → ݢولاي',
  },
  'derang-au': {
    id: 'derang-au',
    name: 'Hukum Derang (au)',
    badge: 'Derang',
    desc: 'Diftong "au" ditulis dengan alif-wau (او) dalam ejaan Jawi.',
    example: '"pulau" → ڤولاو',
  },
  'derang-oi': {
    id: 'derang-oi',
    name: 'Hukum Derang (oi)',
    badge: 'Derang',
    desc: 'Diftong "oi" ditulis dengan wau-ya (وي) dalam ejaan Jawi.',
    example: '"amboi" → امبوي',
  },
  'digraf-ng': {
    id: 'digraf-ng',
    name: 'Huruf Nga (ڠ)',
    badge: 'Digraf',
    desc: 'Gabungan huruf "ng" dalam Rumi ditulis sebagai satu huruf Jawi: nga (ڠ).',
    example: '"bunga" → بوڠا',
  },
  'digraf-ny': {
    id: 'digraf-ny',
    name: 'Huruf Nya (ڽ)',
    badge: 'Digraf',
    desc: 'Gabungan huruf "ny" dalam Rumi ditulis sebagai satu huruf Jawi: nya (ڽ).',
    example: '"nyamuk" → ڽاموق',
  },
  'digraf-sy': {
    id: 'digraf-sy',
    name: 'Huruf Syin (ش)',
    badge: 'Digraf',
    desc: 'Gabungan huruf "sy" dalam Rumi ditulis sebagai satu huruf Jawi: syin (ش).',
    example: '"syarikat" → شريکت',
  },
  'digraf-kh': {
    id: 'digraf-kh',
    name: 'Huruf Kha (خ)',
    badge: 'Digraf',
    desc: 'Gabungan huruf "kh" dalam Rumi ditulis sebagai satu huruf Jawi: kha (خ).',
    example: '"khabar" → خبر',
  },
  'digraf-gh': {
    id: 'digraf-gh',
    name: 'Huruf Ghain (غ)',
    badge: 'Digraf',
    desc: 'Gabungan huruf "gh" dalam Rumi ditulis sebagai satu huruf Jawi: ghain (غ).',
    example: '"ghairah" → غايره',
  },
  'kaf-akhir': {
    id: 'kaf-akhir',
    name: 'Hukum Kaf di Akhir Kata',
    badge: 'Kaf Akhir',
    desc: 'Huruf "k" di akhir perkataan Melayu ditulis sebagai qaf (ق), kerana bunyinya ialah hentian glotis.',
    example: '"budak" → بوداق',
  },
  'imbuhan-me': {
    id: 'imbuhan-me',
    name: 'Imbuhan Awalan me-',
    badge: 'Imbuhan',
    desc: 'Awalan "me-/mem-/men-/meng-/meny-" ditulis terus bersambung dengan kata dasar dalam Jawi.',
    example: '"membaca" → ممباچ',
  },
  'imbuhan-ber': {
    id: 'imbuhan-ber',
    name: 'Imbuhan Awalan ber-',
    badge: 'Imbuhan',
    desc: 'Awalan "ber-" ditulis sebagai بر dan disambung terus dengan kata dasar.',
    example: '"berjalan" → برجالن',
  },
  'imbuhan-ter': {
    id: 'imbuhan-ter',
    name: 'Imbuhan Awalan ter-',
    badge: 'Imbuhan',
    desc: 'Awalan "ter-" ditulis sebagai تر dan disambung terus dengan kata dasar.',
    example: '"terbang" → تربڠ',
  },
  'imbuhan-di': {
    id: 'imbuhan-di',
    name: 'Imbuhan Awalan di-',
    badge: 'Imbuhan',
    desc: 'Awalan "di-" ditulis sebagai دي dan disambung terus dengan kata dasar.',
    example: '"dimakan" → ديماکن',
  },
  'imbuhan-se': {
    id: 'imbuhan-se',
    name: 'Imbuhan Awalan se-',
    badge: 'Imbuhan',
    desc: 'Awalan "se-" ditulis sebagai س dan disambung terus dengan kata dasar.',
    example: '"semua" → سموا',
  },
  'imbuhan-ke': {
    id: 'imbuhan-ke',
    name: 'Imbuhan Awalan ke-',
    badge: 'Imbuhan',
    desc: 'Awalan "ke-" ditulis sebagai ک dan disambung terus dengan kata dasar.',
    example: '"kedua" → کدوا',
  },
  'hamzah-se-ke': {
    id: 'hamzah-se-ke',
    name: 'Hamzah pada Awalan se-/ke-',
    badge: 'Hamzah',
    desc: 'Apabila awalan "se-" atau "ke-" bertemu kata dasar yang bermula dengan huruf vokal, pertembungan itu ditulis dengan hamzah di atas alif (أ), bukan alif kosong.',
    example: '"seekor" → سأيکور, "keurus" → كأوروس',
  },
};

// ──────────────────────────────────────────────
//  6b. CHILDREN'S STORIES DATABASE
//      Stories in Rumi → converted to Jawi via engine
// ──────────────────────────────────────────────

const STORIES = [
  {
    id: 'bola-sepak',
    emoji: '⚽',
    topic: 'Bola Sepak',
    image: 'images/bola-sepak.png',
    paragraphs: [
      'Ahmad suka bermain bola sepak. Setiap petang dia berlari di padang bersama kawan. Dia berlatih menendang bola dengan rajin.',
      'Satu hari pasukan Ahmad bertanding dengan sekolah lain. Ahmad bermain dengan sungguh. Pasukan dia kalah tetapi Ahmad tidak putus asa.',
      'Ahmad terus berlatih setiap hari. Pasukan dia menang. Ahmad belajar bahawa usaha yang rajin akan membawa kejayaan.'
    ],
    nilai: 'Ketekunan dan semangat tidak putus asa.',
  },
  {
    id: 'kucing',
    emoji: '🐱',
    topic: 'Kucing',
    image: 'images/kucing.png',
    paragraphs: [
      'Aminah mempunyai seekor kucing bernama Comel. Setiap hari Aminah memberi makan dan minum kepada Comel. Dia juga memandikan kucing itu setiap minggu.',
      'Satu hari Comel sakit. Aminah sedih dan membawa Comel kepada doktor. Doktor memberi ubat dan Comel sembuh.',
      'Aminah gembira kerana Comel sihat semula. Dia belajar bahawa kita perlu sayang dan jaga haiwan dengan baik.'
    ],
    nilai: 'Kasih sayang terhadap haiwan.',
  },
  {
    id: 'membaca',
    emoji: '📚',
    topic: 'Membaca',
    image: 'images/membaca.png',
    paragraphs: [
      'Ali suka membaca buku. Setiap malam dia membaca sebelum tidur. Dia suka buku cerita tentang haiwan dan dunia.',
      'Satu hari guru berkata Ali pandai kerana rajin membaca. Kawan Ali mula membaca juga. Mereka membaca bersama di perpustakaan.',
      'Ali gembira kerana ilmu dari buku sangat berguna. Dia belajar bahawa membaca membuka pintu ilmu yang luas.'
    ],
    nilai: 'Cinta ilmu dan membaca.',
  },
  {
    id: 'melukis',
    emoji: '🎨',
    topic: 'Melukis',
    image: 'images/melukis.png',
    paragraphs: [
      'Fatimah suka melukis. Dia melukis bunga pokok dan kucing. Setiap hari dia berlatih melukis di buku lukisan.',
      'Guru seni melihat lukisan Fatimah. Guru berkata lukisan Fatimah cantik dan indah. Fatimah gembira dan terus berlatih.',
      'Lukisan Fatimah menang dalam pertandingan. Dia belajar bahawa bakat perlu diasah dengan usaha yang rajin.'
    ],
    nilai: 'Mengasah bakat dengan usaha.',
  },
  {
    id: 'berkebun',
    emoji: '🌱',
    topic: 'Berkebun',
    image: 'images/berkebun.png',
    paragraphs: [
      'Hassan suka berkebun bersama ayah. Mereka menanam sayur dan bunga di halaman rumah. Hassan menyiram pokok setiap pagi.',
      'Selepas beberapa minggu pokok sayur tumbuh dengan subur. Hassan gembira melihat hasil kebun mereka. Dia petik sayur untuk ibu masak.',
      'Ibu masak sayur itu untuk keluarga. Semua orang suka. Hassan belajar bahawa kerja keras dan sabar membawa hasil yang baik.'
    ],
    nilai: 'Kesabaran dan kerja keras.',
  },
  {
    id: 'memasak',
    emoji: '🍳',
    topic: 'Memasak',
    image: 'images/memasak.png',
    paragraphs: [
      'Siti suka memasak bersama ibu. Dia belajar memasak nasi dan sayur. Siti membantu ibu di dapur setiap hari.',
      'Satu hari Siti memasak sendiri untuk keluarga. Dia masak nasi goreng. Ayah dan adik suka makan masakan Siti.',
      'Siti gembira kerana dapat membantu keluarga. Dia belajar bahawa membantu orang lain membawa kegembiraan.'
    ],
    nilai: 'Membantu keluarga.',
  },
  {
    id: 'berenang',
    emoji: '🏊',
    topic: 'Berenang',
    image: 'images/berenang.png',
    paragraphs: [
      'Zaid belajar berenang di kolam. Pada mulanya dia takut air. Guru mengajar Zaid dengan sabar.',
      'Zaid berlatih setiap minggu. Lama kelamaan dia pandai berenang. Dia tidak takut air lagi.',
      'Zaid kini boleh berenang dengan baik. Dia belajar bahawa kita perlu berani mencuba perkara baru.'
    ],
    nilai: 'Keberanian mencuba perkara baru.',
  },
  {
    id: 'muzik',
    emoji: '🎵',
    topic: 'Muzik',
    image: 'images/muzik.png',
    paragraphs: [
      'Nurul suka bermain muzik. Dia belajar bermain gitar bersama cikgu. Setiap hari dia berlatih di rumah.',
      'Pada mulanya jari Nurul sakit. Tetapi dia tidak putus asa. Dia terus berlatih dengan rajin dan sabar.',
      'Nurul pandai bermain gitar. Dia bermain di hadapan sekolah. Semua orang suka. Nurul belajar bahawa sabar dan rajin membawa kejayaan.'
    ],
    nilai: 'Kesabaran dan ketekunan.',
  },
];

/**
 * Detect which spelling rules apply to a given word.
 */
function detectRules(word) {
  const lw = word.toLowerCase();
  const rules = [];
  const added = new Set();

  function add(ruleId) {
    if (!added.has(ruleId) && RULE_DB[ruleId]) {
      added.add(ruleId);
      rules.push(RULE_DB[ruleId]);
    }
  }

  // E-pepet: check for 'e' in prefixes or common e-pepet positions
  const ePepetPrefixes = /^(me|be|ke|se|pe|ter|ber|per)/;
  if (ePepetPrefixes.test(lw)) {
    // The 'e' in these prefixes is e-pepet
    add('e-pepet');
  }
  // Check for e not in e-taling list
  for (let i = 0; i < lw.length; i++) {
    if (lw[i] === 'e') {
      const isETaling = E_TALING_MAP[lw] && E_TALING_MAP[lw].includes(i);
      if (isETaling) {
        add('e-taling');
      } else if (!ePepetPrefixes.test(lw) || i >= 3) {
        // e in non-prefix position, likely e-pepet
        add('e-pepet');
      }
    }
  }

  // E-taling from the map
  if (E_TALING_MAP[lw]) {
    add('e-taling');
  }

  // Vowel at word start
  if (isVowel(lw[0])) {
    add('vokal-awal');
  }

  // Diphthongs
  if (/ai/.test(lw)) add('derang-ai');
  if (/au/.test(lw)) add('derang-au');
  if (/oi/.test(lw)) add('derang-oi');

  // Digraphs
  if (/ng/.test(lw)) add('digraf-ng');
  if (/ny/.test(lw)) add('digraf-ny');
  if (/sy/.test(lw)) add('digraf-sy');
  if (/kh/.test(lw)) add('digraf-kh');
  if (/gh/.test(lw)) add('digraf-gh');

  // Final k → qaf
  if (lw.endsWith('k')) add('kaf-akhir');

  // Prefixes
  if (/^(mem|men|meng|meny|me)/.test(lw) && lw.length > 4) add('imbuhan-me');
  if (/^ber/.test(lw) && lw.length > 4) add('imbuhan-ber');
  if (/^ter/.test(lw) && lw.length > 4) add('imbuhan-ter');
  if (/^di[a-z]/.test(lw) && lw.length > 3 && lw !== 'dia' && lw !== 'diri' && lw !== 'diam') add('imbuhan-di');
  if (/^se/.test(lw) && lw.length > 3 && !JAWI_DICT[lw]) add('imbuhan-se');
  if (/^ke/.test(lw) && lw.length > 3 && !JAWI_DICT[lw]) add('imbuhan-ke');
  if (/^(se|ke)[aeiou]/.test(lw) && lw.length > 3 && !JAWI_DICT[lw]) add('hamzah-se-ke');

  return rules;
}

// ──────────────────────────────────────────────
//  7. UI CONTROLLER
// ──────────────────────────────────────────────

let debounceTimer = null;

function init() {
  const input = document.getElementById('rumi-input');
  const copyBtn = document.getElementById('copy-btn');

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => handleConversion(), 200);
  });

  copyBtn.addEventListener('click', handleCopy);

  // Word selection: one delegated listener + keyboard navigation
  initOutputInteraction();

  // Story feature
  initStoryFeature();

  // Focus input on load
  setTimeout(() => input.focus(), 500);
}

function handleConversion() {
  const input = document.getElementById('rumi-input');
  const text = input.value.trim();

  if (!text) {
    showEmptyState();
    return;
  }

  const result = convertText(text);
  displayJawi(result);
  displaySyllables(result.words.filter(w => w.isWord));
  displayRules(result.words.filter(w => w.isWord));
  updateStats(result);
}

function showEmptyState() {
  const output = document.getElementById('jawi-output');
  const analysis = document.getElementById('analysis-section');
  const copyBtn = document.getElementById('copy-btn');

  output.textContent = 'تولیسن جاوي اکن ترڤاڤر دي سيني…';
  output.classList.add('output-section__display--empty');
  analysis.classList.add('analysis-section--hidden');
  copyBtn.style.display = 'none';

  currentResult = null;
  selectedIndex = null;
  toggleShowAll(false);

  const notice = document.getElementById('estimate-notice');
  if (notice) notice.hidden = true;
  const status = document.getElementById('jawi-status');
  if (status) status.textContent = '';
  clearTimeout(announceTimer);

  document.getElementById('word-count').textContent = '0';
  document.getElementById('char-count').textContent = '0';
}

// The result currently on screen, so delegated handlers can look words up.
let currentResult = null;
let selectedIndex = null;

function displayJawi(result) {
  const output = document.getElementById('jawi-output');
  const analysis = document.getElementById('analysis-section');
  const copyBtn = document.getElementById('copy-btn');

  currentResult = result;
  selectedIndex = null;

  output.classList.remove('output-section__display--empty');
  output.innerHTML = '';

  let firstWord = true;

  result.words.forEach((w, idx) => {
    if (w.isWord) {
      // A span with role=button, not a <button>: a paragraph of 60 words
      // must not become 60 tab stops. Roving tabindex gives the group one
      // stop, and arrow keys move between words inside it.
      const el = document.createElement('span');
      el.className = 'word-btn';
      if (w.method === 'rules') el.classList.add('word-btn--estimated');
      el.textContent = w.jawi;
      el.dataset.index = idx;
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', firstWord ? '0' : '-1');
      el.setAttribute('lang', 'ms-Arab');
      el.title = w.method === 'rules'
        ? `${w.rumi} — ejaan anggaran, belum disahkan`
        : w.rumi;
      el.setAttribute('aria-label', w.method === 'rules'
        ? `${w.rumi}, ejaan anggaran`
        : w.rumi);
      output.appendChild(el);
      firstWord = false;
    } else {
      const span = document.createElement('span');
      // Numbers and acronyms need bidi isolation or they jump around
      // inside the right-to-left run.
      if (w.isLatin) {
        const bdi = document.createElement('bdi');
        bdi.textContent = w.jawi;
        span.appendChild(bdi);
      } else {
        span.textContent = w.jawi;
      }
      output.appendChild(span);
    }
  });

  output.classList.add('jawi-animate');
  setTimeout(() => output.classList.remove('jawi-animate'), 300);

  analysis.classList.remove('analysis-section--hidden');
  copyBtn.style.display = 'flex';
  updateEstimateNotice(result);
  announce(result);
}

/**
 * Tell the reader how much of this conversion is verified and how much
 * the rule engine guessed.
 */
function updateEstimateNotice(result) {
  const notice = document.getElementById('estimate-notice');
  if (!notice) return;
  const words = result.words.filter(w => w.isWord);
  const guessed = words.filter(w => w.method === 'rules').length;

  if (!guessed) {
    notice.hidden = true;
    return;
  }
  notice.hidden = false;
  notice.textContent = guessed === words.length
    ? 'Semua perkataan dieja secara anggaran oleh sistem — sila semak dengan Daftar Kata DBP.'
    : `${guessed} daripada ${words.length} perkataan dieja secara anggaran (bergaris putus-putus) — sila semak dengan Daftar Kata DBP.`;
}

/**
 * Announce the result once the reader has stopped typing, rather than
 * re-reading the whole output on every keystroke.
 */
let announceTimer = null;
function announce(result) {
  const status = document.getElementById('jawi-status');
  if (!status) return;
  clearTimeout(announceTimer);
  announceTimer = setTimeout(() => {
    status.textContent = 'Tulisan Jawi: ' + result.fullJawi;
  }, 1200);
}

function selectWord(idx) {
  const word = currentResult && currentResult.words[idx];
  if (!word || !word.isWord) return;

  // Clicking the selected word again returns to the full list.
  if (selectedIndex === idx) return clearSelection();

  document.querySelectorAll('.word-btn.active').forEach(b => b.classList.remove('active'));
  const el = document.querySelector(`.word-btn[data-index="${idx}"]`);
  if (el) el.classList.add('active');
  selectedIndex = idx;

  displaySyllables([word]);
  displayRules([word]);
  toggleShowAll(true);
}

function clearSelection() {
  selectedIndex = null;
  document.querySelectorAll('.word-btn.active').forEach(b => b.classList.remove('active'));
  if (!currentResult) return;
  const words = currentResult.words.filter(w => w.isWord);
  displaySyllables(words);
  displayRules(words);
  toggleShowAll(false);
}

function toggleShowAll(show) {
  const btn = document.getElementById('show-all-btn');
  if (btn) btn.hidden = !show;
}

/**
 * One delegated listener for the whole output, plus arrow-key navigation
 * between words (right-to-left, so ArrowRight moves to the previous word).
 */
function initOutputInteraction() {
  const output = document.getElementById('jawi-output');
  if (!output) return;

  output.addEventListener('click', (e) => {
    const el = e.target.closest('.word-btn');
    if (el) selectWord(Number(el.dataset.index));
  });

  output.addEventListener('keydown', (e) => {
    const el = e.target.closest('.word-btn');
    if (!el) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectWord(Number(el.dataset.index));
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      clearSelection();
      return;
    }

    const step = e.key === 'ArrowLeft' ? 1 : e.key === 'ArrowRight' ? -1 : 0;
    if (!step) return;
    e.preventDefault();

    const all = Array.from(output.querySelectorAll('.word-btn'));
    const next = all[all.indexOf(el) + step];
    if (!next) return;
    el.setAttribute('tabindex', '-1');
    next.setAttribute('tabindex', '0');
    next.focus();
  });

  const showAll = document.getElementById('show-all-btn');
  if (showAll) showAll.addEventListener('click', clearSelection);
}

function displaySyllables(words) {
  const container = document.getElementById('syllable-content');
  container.innerHTML = '';

  const uniqueWords = [];
  const seen = new Set();
  words.forEach(w => {
    const key = w.rumi.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      uniqueWords.push(w);
    }
  });

  // Limit display to avoid clutter
  const displayWords = uniqueWords.slice(0, 12);

  displayWords.forEach((word, i) => {
    const row = document.createElement('div');
    row.className = 'syllable-word';
    row.style.animationDelay = `${i * 50}ms`;

    const syllables = word.syllables || syllabify(word.rumi);

    // Rumi word
    const rumiSpan = document.createElement('span');
    rumiSpan.className = 'syllable-word__rumi';
    rumiSpan.textContent = word.rumi;
    row.appendChild(rumiSpan);

    // Arrow
    const arrow = document.createElement('span');
    arrow.className = 'syllable-word__arrow';
    arrow.textContent = '→';
    row.appendChild(arrow);

    // Syllable chips
    const partsDiv = document.createElement('div');
    partsDiv.className = 'syllable-word__parts';

    syllables.forEach((syl, si) => {
      const chip = document.createElement('span');
      chip.className = 'syllable-chip';
      chip.textContent = syl;
      partsDiv.appendChild(chip);

      if (si < syllables.length - 1) {
        const dot = document.createElement('span');
        dot.className = 'syllable-dot';
        partsDiv.appendChild(dot);
      }
    });

    row.appendChild(partsDiv);

    // Jawi
    const jawiSpan = document.createElement('span');
    jawiSpan.className = 'syllable-word__jawi';
    if (word.method === 'rules') jawiSpan.classList.add('syllable-word__jawi--estimated');
    jawiSpan.setAttribute('lang', 'ms-Arab');
    jawiSpan.setAttribute('dir', 'rtl');
    jawiSpan.textContent = word.jawi;
    if (word.method === 'rules') jawiSpan.title = 'Ejaan anggaran — belum disahkan';
    row.appendChild(jawiSpan);

    container.appendChild(row);
  });

  if (uniqueWords.length > 12) {
    const more = document.createElement('div');
    more.className = 'syllable-word';
    more.style.justifyContent = 'center';
    more.innerHTML = `<span style="color:var(--text-muted);font-size:0.8rem;">… dan ${uniqueWords.length - 12} perkataan lagi</span>`;
    container.appendChild(more);
  }
}

function displayRules(words) {
  const container = document.getElementById('rules-content');
  container.innerHTML = '';

  // Collect all unique rules
  const allRules = [];
  const seenRules = new Set();

  words.forEach(w => {
    if (w.rules) {
      w.rules.forEach(r => {
        if (!seenRules.has(r.id)) {
          seenRules.add(r.id);
          allRules.push(r);
        }
      });
    }
  });

  if (allRules.length === 0) {
    container.innerHTML = '<div style="color:var(--text-muted);font-size:0.85rem;padding:var(--space-sm);">Tiada hukum ejaan khas dikesan untuk perkataan ini.</div>';
    return;
  }

  allRules.forEach((rule, i) => {
    const card = document.createElement('div');
    card.className = 'rule-card';
    card.style.animationDelay = `${i * 80}ms`;

    card.innerHTML = `
      <span class="rule-card__badge">${rule.badge}</span>
      <div class="rule-card__body">
        <div class="rule-card__title">${rule.name}</div>
        <div class="rule-card__desc">${rule.desc}</div>
        <div class="rule-card__example">Contoh: ${rule.example}</div>
      </div>
    `;

    container.appendChild(card);
  });
}

function updateStats(result) {
  const wordCount = result.words.filter(w => w.isWord).length;
  // Count Jawi letters only — not spaces, punctuation or passed-through Latin.
  const charCount = (result.fullJawi.match(
    /[ء-غف-يٮ-ۓۺ-ۿݐ-ݿ]/g
  ) || []).length;

  document.getElementById('word-count').textContent = wordCount;
  document.getElementById('char-count').textContent = charCount;
}

const ICON_COPY = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';
const ICON_TICK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>';

/**
 * Copy text, falling back to selecting it when the Clipboard API is
 * unavailable — which it is on plain http:// outside localhost, a very
 * likely setup for a school intranet.
 */
async function copyText(text, el) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  // Fallback: select the text so the reader can copy it themselves.
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  return false;
}

async function handleCopy() {
  const output = document.getElementById('jawi-output');
  const copyBtn = document.getElementById('copy-btn');
  const text = output.textContent || output.innerText;

  const restore = () => {
    copyBtn.classList.remove('copied', 'failed');
    copyBtn.innerHTML = ICON_COPY + ' Salin';
  };

  try {
    const copied = await copyText(text, output);
    if (copied) {
      copyBtn.classList.add('copied');
      copyBtn.innerHTML = ICON_TICK + ' Disalin!';
    } else {
      copyBtn.classList.add('failed');
      copyBtn.textContent = 'Teks dipilih — tekan Ctrl+C';
    }
  } catch (err) {
    console.error('Copy failed:', err);
    copyBtn.classList.add('failed');
    copyBtn.textContent = 'Gagal menyalin';
  }
  setTimeout(restore, 2600);
}

// ──────────────────────────────────────────────
//  8. STORY FEATURE
// ──────────────────────────────────────────────

let currentStory = null;

function initStoryFeature() {
  const grid = document.getElementById('story-topics');
  if (!grid) return;

  STORIES.forEach(story => {
    const btn = document.createElement('button');
    btn.className = 'story-topic-btn';
    btn.dataset.id = story.id;
    btn.innerHTML = `<span class="story-topic-btn__emoji">${story.emoji}</span><span class="story-topic-btn__label">${story.topic}</span>`;
    btn.addEventListener('click', () => selectStory(story.id));
    grid.appendChild(btn);
  });

  // Toggle Rumi
  const toggleBtn = document.getElementById('story-toggle-rumi');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleStoryRumi);
  }

  // Copy story
  const copyBtn = document.getElementById('story-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', copyStoryJawi);
  }
}

function selectStory(storyId) {
  const story = STORIES.find(s => s.id === storyId);
  if (!story) return;
  currentStory = story;

  // Update active button
  document.querySelectorAll('.story-topic-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.story-topic-btn[data-id="${storyId}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  // Convert each paragraph
  const jawiParagraphs = story.paragraphs.map(p => convertText(p));

  // Display Jawi story
  const jawiDisplay = document.getElementById('story-jawi-display');
  jawiDisplay.innerHTML = '';
  jawiDisplay.classList.remove('story-display--empty');

  // Add illustration
  if (story.image) {
    const imgWrap = document.createElement('div');
    imgWrap.className = 'story-illustration';
    const img = document.createElement('img');
    img.src = story.image;
    img.alt = story.topic;
    img.className = 'story-illustration__img';
    img.loading = 'lazy';
    imgWrap.appendChild(img);
    jawiDisplay.appendChild(imgWrap);
  }

  jawiParagraphs.forEach(result => {
    const p = document.createElement('p');
    p.className = 'story-paragraph';
    result.words.forEach(w => {
      const span = document.createElement('span');
      if (w.isWord) {
        span.className = 'story-word';
        if (w.method === 'rules') span.classList.add('story-word--estimated');
        span.textContent = w.jawi;
        span.title = w.method === 'rules'
          ? `${w.rumi} — ejaan anggaran`
          : w.rumi;
      } else if (w.isLatin) {
        const bdi = document.createElement('bdi');
        bdi.textContent = w.jawi;
        span.appendChild(bdi);
      } else {
        span.textContent = w.jawi;
      }
      p.appendChild(span);
    });
    jawiDisplay.appendChild(p);
  });

  // Display Rumi (hidden by default)
  const rumiDisplay = document.getElementById('story-rumi-display');
  rumiDisplay.innerHTML = '';
  story.paragraphs.forEach(text => {
    const p = document.createElement('p');
    p.className = 'story-paragraph-rumi';
    p.textContent = text;
    rumiDisplay.appendChild(p);
  });
  rumiDisplay.style.display = 'none';

  // Moral value
  const nilaiDisplay = document.getElementById('story-nilai');
  const nilaiJawi = convertText(story.nilai);
  nilaiDisplay.textContent = '';
  const mk = (cls, text, attrs) => {
    const s = document.createElement('span');
    s.className = cls;
    s.textContent = text;
    if (attrs) for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
    return s;
  };
  nilaiDisplay.append(
    mk('story-nilai__label', '📌 Nilai Murni:'),
    mk('story-nilai__jawi', nilaiJawi.fullJawi, { lang: 'ms-Arab', dir: 'rtl' }),
    mk('story-nilai__rumi', story.nilai)
  );

  // Show the display area
  document.getElementById('story-display-section').classList.remove('story-display-section--hidden');

  // Reset toggle
  const toggleBtn = document.getElementById('story-toggle-rumi');
  if (toggleBtn) {
    toggleBtn.textContent = 'Lihat Rumi';
    toggleBtn.dataset.showing = 'jawi';
  }

  // Animate
  jawiDisplay.classList.add('jawi-animate');
  setTimeout(() => jawiDisplay.classList.remove('jawi-animate'), 400);
}

function toggleStoryRumi() {
  const toggleBtn = document.getElementById('story-toggle-rumi');
  const rumiDisplay = document.getElementById('story-rumi-display');

  if (toggleBtn.dataset.showing === 'jawi') {
    rumiDisplay.style.display = 'block';
    toggleBtn.textContent = 'Sembunyikan Rumi';
    toggleBtn.dataset.showing = 'rumi';
  } else {
    rumiDisplay.style.display = 'none';
    toggleBtn.textContent = 'Lihat Rumi';
    toggleBtn.dataset.showing = 'jawi';
  }
}

async function copyStoryJawi() {
  const jawiDisplay = document.getElementById('story-jawi-display');
  const copyBtn = document.getElementById('story-copy-btn');
  const text = jawiDisplay.textContent || jawiDisplay.innerText;

  try {
    const copied = await copyText(text, jawiDisplay);
    copyBtn.classList.add(copied ? 'copied' : 'failed');
    copyBtn.textContent = copied ? '✓ Disalin!' : 'Teks dipilih — tekan Ctrl+C';
  } catch (err) {
    console.error('Copy failed:', err);
    copyBtn.classList.add('failed');
    copyBtn.textContent = 'Gagal menyalin';
  }
  setTimeout(() => {
    copyBtn.classList.remove('copied', 'failed');
    copyBtn.textContent = 'Salin Cerita';
  }, 2600);
}

// ── Initialize ──
document.addEventListener('DOMContentLoaded', init);
