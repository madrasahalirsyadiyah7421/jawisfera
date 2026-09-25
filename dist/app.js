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
  // ── Function words / Kata tugas ──
  'dan': 'دان', 'yang': 'يڠ', 'di': 'دي', 'ini': 'اين',
  'itu': 'ايتو', 'dengan': 'دڠن', 'untuk': 'اونتوق', 'pada': 'ڤدا',
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
  'ya': 'يا', 'bukan': 'بوکن', 'bukan': 'بوکن',

  // ── Pronouns / Kata ganti nama ──
  'saya': 'ساي', 'aku': 'اکو', 'kami': 'کامي', 'kita': 'کيت',
  'dia': 'دي', 'beliau': 'بلياو', 'mereka': 'مريک', 'kamu': 'کامو',
  'awak': 'اوق', 'engkau': 'ايڠکاو', 'anda': 'اندا',
  'diri': 'ديري', 'sendiri': 'سنديري',

  // ── Nouns / Kata nama ──
  'orang': 'اورڠ', 'manusia': 'مانوسيا', 'lelaki': 'للاکي',
  'perempuan': 'ڤرمڤوان', 'wanita': 'وانيت', 'budak': 'بوداق',
  'anak': 'انق', 'bapa': 'باڤ', 'ayah': 'ايه', 'ibu': 'ايبو',
  'adik': 'اديق', 'abang': 'ابڠ', 'kakak': 'کاکق',
  'keluarga': 'کلوارݢ', 'kawan': 'کاون', 'sahabat': 'سهابت',
  'rumah': 'رومه', 'pintu': 'ڤينتو', 'tingkap': 'تيڠکڤ',
  'bilik': 'بيليق', 'dapur': 'داڤور', 'dinding': 'ديديڠ',
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
  'hari': 'هاري', 'jam': 'جم', 'minit': 'مينيت', 'saat': 'ساعت',
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
  'kerja': 'کرج', 'bekerja': 'بکرج',
  'main': 'ماءين', 'bermain': 'برماءين',
  'beli': 'بلي', 'membeli': 'ممبلي',
  'jual': 'جوال', 'menjual': 'منجوال',
  'bayar': 'بايار', 'membayar': 'ممبايار',
  'hantar': 'هنتر', 'menghantar': 'مڠهنتر',
  'kirim': 'کيريم', 'terima': 'تريما',
  'cari': 'چاري', 'mencari': 'منچاري',
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
  'elok': 'اليوق',
  'baru': 'بارو', 'lama': 'لام', 'usang': 'اوسڠ',
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
  'mudah': 'موده', 'susah': 'سوسه',
  'bagus': 'باݢوس', 'hebat': 'هيبت', 'pandai': 'ڤنداي',
  'bodoh': 'بودوه', 'pintar': 'ڤينتر', 'bijak': 'بيجق',
  'miskin': 'ميسکين', 'kaya': 'کاي', 'mahal': 'ماهل',
  'murah': 'مورة', 'percuma': 'ڤرچوم',
  'sihat': 'صيحت', 'sakit': 'ساکيت',

  // ── Numbers / Nombor ──
  'satu': 'ساتو', 'dua': 'دوا', 'tiga': 'تيݢ',
  'empat': 'ايمڤت', 'lima': 'ليم', 'enam': 'اينم',
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
  'agama': 'اݢام', 'islam': 'اسلام',
  'melayu': 'ملايو', 'malaysia': 'مليسيا',
  'bahasa': 'بهاس', 'perkataan': 'ڤرکاتاءن',
  'huruf': 'حروف', 'ayat': 'ايت',

  // ── Time / Greetings ──
  'selamat': 'سلامت', 'terima': 'تريما', 'kasih': 'کاسيه',
  'maaf': 'معاف', 'tolong': 'تولوڠ',
  'assalamualaikum': 'السلام عليکم',

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
  // Nama khas: Ahmad menggunakan ha panjang (ح), bukan ha bulat (ه).
  'ahmad': 'احمد',
  'comel': 'چومل', 'mandi': 'مندي',
  'memandikan': 'ممنديکن',
  'ubat': 'اوبت', 'sembuh': 'سمبوه',
  'semula': 'سمولا', 'haiwan': 'حيوان',
  'cerita': 'چريتا', 'lari': 'لاري',
  'ekor': 'ايکور', 'seekor': 'سايکور',
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
  'membawa': 'ممباوا', 'memberi': 'ممبري',
  'menjaga': 'منجاݢ', 'jaga': 'جاݢ',
  'bermain': 'برماءين', 'berguna': 'برݢونا',
  'mencuba': 'منچوب', 'melihat': 'مليهت',
  'perpustakaan': 'ڤرڤوستاکاءن',
  'lama': 'لام', 'kelamaan': 'کلاماءن',
  'nilai': 'نيلاي', 'murni': 'مورني',
  'ketekunan': 'کتکونن', 'semangat': 'سماڠت',
  'kesabaran': 'کصابرن', 'keberanian': 'کبرانين',

  // ── Guided essay additions ──
  'karangan': 'کارڠن', 'tajuk': 'تاجوق', 'rangka': 'رڠک',
  'aktiviti': 'اکتيۏيتي', 'sabtu': 'سبتو', 'ahad': 'احد',
  'hujung': 'هوجوڠ', 'lalu': 'لالو', 'berpeluang': 'برڤلواڠ',
  'menyertai': 'مڽرتاءي', 'teruja': 'ترج', 'pengalaman': 'ڤڠالمن',
  'gotong': 'ݢوتوڠ', 'royong': 'رويوڠ', 'kawasan': 'کاوسن',
  'bersih': 'برسيه', 'ceria': 'چريا', 'sampah': 'سمڤه',
  'menyapu': 'مڽاڤو', 'membahagikan': 'ممبهاݢيکن',
  'kerjasama': 'کرجاسام', 'bekerjasama': 'بکرجاسام',
  'bertanggungjawab': 'برتڠݢوڠجواب', 'kebersihan': 'کبرسيهن',
  'mengamalkan': 'مڠعملکن', 'sikap': 'سيکڤ', 'melakukan': 'ملاکوقن',
  'sesuatu': 'سسواتو', 'pihak': 'ڤيهق', 'menyediakan': 'مڽدياکن',
  'peralatan': 'ڤرالتن', 'lawatan': 'لاوتن', 'zoo': 'زو',
  'sukan': 'سوکن', 'acara': 'اچارا', 'peserta': 'ڤسرتا',
  'hadiah': 'هديه', 'alam': 'عالم', 'sekitar': 'سکيتر',
  'menjamu': 'منجامو', 'hidangan': 'هيداڠن', 'mengemas': 'مڠمس',
  'pengunjung': 'ڤڠونجوڠ', 'pelbagai': 'ڤلباݢاي', 'menarik': 'مناريق',
  'berakhir': 'براخير', 'bangga': 'بڠݢ', 'menjadikan': 'منجاديکن',
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

// ── Words where 'e' is e-taling (é, /e/) not e-pepet (ə) ──
// Format: { word: [positions of e-taling (0-indexed char positions)] }
const E_TALING_MAP = {
  'ekor': [0], 'elok': [0], 'esok': [0], 'enak': [0],
  'emas': [0], 'ela': [0],
  'meja': [1], 'desa': [1], 'lega': [1], 'mega': [1],
  'sewa': [1], 'rela': [1], 'bela': [1], 'heba': [1],
  'dewan': [1], 'gerak': [1], 'keras': [1],
  'lewa': [1], 'lewat': [1], 'teman': [1],
  'hewan': [1], 'kera': [1], 'sera': [1],
  'merah': [1], 'perang': [1],
  'oleh': [2], 'boleh': [3],
  'elok': [0],
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

// ──────────────────────────────────────────────
//  4. RULE-BASED JAWI CONVERSION
// ──────────────────────────────────────────────

/**
 * Convert a single Rumi word to Jawi using rules.
 * This is the fallback when the word isn't in the dictionary.
 */
function ruleBasedConvert(word) {
  const lw = word.toLowerCase();
  let result = '';
  let i = 0;

  while (i < lw.length) {
    // --- Check for diphthongs at valid positions ---
    if (i + 1 < lw.length) {
      const pair = lw.substring(i, i + 2);

      // Diphthongs: ai, au, oi
      if (pair === 'ai' && (i + 2 >= lw.length || !isVowel(lw[i + 2]))) {
        if (i === 0) result += 'ا';
        result += 'اي';
        i += 2;
        continue;
      }
      if (pair === 'au' && (i + 2 >= lw.length || !isVowel(lw[i + 2]))) {
        if (i === 0) result += 'ا';
        result += 'او';
        i += 2;
        continue;
      }
      if (pair === 'oi' && (i + 2 >= lw.length || !isVowel(lw[i + 2]))) {
        if (i === 0) result += 'ا';
        result += 'وي';
        i += 2;
        continue;
      }

      // Digraphs
      if (DIGRAPHS[pair]) {
        result += DIGRAPHS[pair];
        i += 2;
        continue;
      }
    }

    const ch = lw[i];

    // --- Vowels ---
    if (isVowel(ch)) {
      const atWordStart = (i === 0);
      const isETaling = E_TALING_MAP[lw] && E_TALING_MAP[lw].includes(i);

      if (ch === 'a') {
        if (atWordStart) {
          result += 'ا';
        } else {
          result += 'ا';
        }
      } else if (ch === 'i') {
        if (atWordStart) {
          result += 'اي';
        } else {
          result += 'ي';
        }
      } else if (ch === 'u') {
        if (atWordStart) {
          result += 'او';
        } else {
          result += 'و';
        }
      } else if (ch === 'o') {
        if (atWordStart) {
          result += 'او';
        } else {
          result += 'و';
        }
      } else if (ch === 'e') {
        if (isETaling) {
          // E-taling: written as ya
          if (atWordStart) {
            result += 'اي';
          } else {
            result += 'ي';
          }
        } else {
          // E-pepet: not written (but alif at word start)
          if (atWordStart) {
            result += 'ا';
          }
          // else: skip (e-pepet in middle/end not written)
        }
      }
      i++;
      continue;
    }

    // --- Consonants ---
    if (CONSONANT_MAP[ch]) {
      // Special: final 'k' in Malay words → ق
      if (ch === 'k' && i === lw.length - 1) {
        result += 'ق';
      } else {
        result += CONSONANT_MAP[ch];
      }
      i++;
      continue;
    }

    // --- Non-letter characters: pass through ---
    result += lw[i];
    i++;
  }

  return result;
}

// ──────────────────────────────────────────────
//  5. MAIN CONVERSION FUNCTION
// ──────────────────────────────────────────────

/**
 * Convert a single word from Rumi to Jawi.
 * Priority: dictionary → prefix decomposition → rule-based
 */
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
        return { jawi: pfx.jawi + JAWI_DICT[stem], method: 'prefix+dict', rules };
      }

      // Check stem + suffix
      for (const sfx of suffixes) {
        if (stem.endsWith(sfx.rumi) && stem.length > sfx.rumi.length + 1) {
          const root = stem.slice(0, -sfx.rumi.length);
          if (JAWI_DICT[root]) {
            const rules = detectRules(lw);
            return { jawi: pfx.jawi + JAWI_DICT[root] + sfx.jawi, method: 'prefix+dict+suffix', rules };
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

  // Split into tokens: words and non-words
  const tokens = text.match(/[\w]+|[^\w]+/g) || [];
  const results = [];

  for (const token of tokens) {
    if (/^\w+$/.test(token)) {
      const conversion = convertWord(token);
      results.push({
        rumi: token,
        jawi: conversion.jawi,
        method: conversion.method,
        rules: conversion.rules,
        syllables: splitSyllables(token),
        isWord: true,
      });
    } else {
      // Punctuation / spaces — pass through (mirror some punctuation for RTL)
      let jawiPunc = token;
      jawiPunc = jawiPunc.replace(/\(/g, '﴿').replace(/\)/g, '﴾');
      results.push({
        rumi: token,
        jawi: jawiPunc,
        isWord: false,
      });
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
    example: '"empat" → ايمڤت (e tidak ditulis)',
  },
  'e-taling': {
    id: 'e-taling',
    name: 'Hukum E-Taling',
    badge: 'E-Taling',
    desc: 'Huruf e taling (bunyi "eh" seperti dalam "ekor") ditulis dengan huruf ya (ي) dalam Jawi.',
    example: '"elok" → اليوق (e ditulis sebagai ي)',
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

  // AI-guided essay feature
  initGuidedEssay();

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

  document.getElementById('word-count').textContent = '0';
  document.getElementById('char-count').textContent = '0';
}

function displayJawi(result) {
  const output = document.getElementById('jawi-output');
  const analysis = document.getElementById('analysis-section');
  const copyBtn = document.getElementById('copy-btn');

  output.classList.remove('output-section__display--empty');
  output.innerHTML = '';

  // Create clickable word spans
  result.words.forEach((w, idx) => {
    if (w.isWord) {
      const btn = document.createElement('button');
      btn.className = 'word-btn';
      btn.textContent = w.jawi;
      btn.dataset.index = idx;
      btn.title = w.rumi;
      btn.addEventListener('click', () => highlightWord(result, idx));
      output.appendChild(btn);
    } else {
      const span = document.createElement('span');
      span.textContent = w.jawi;
      output.appendChild(span);
    }
  });

  output.classList.add('jawi-animate');
  setTimeout(() => output.classList.remove('jawi-animate'), 300);

  analysis.classList.remove('analysis-section--hidden');
  copyBtn.style.display = 'flex';
}

function highlightWord(result, idx) {
  // Remove existing highlights
  document.querySelectorAll('.word-btn.active').forEach(b => b.classList.remove('active'));

  // Add highlight to clicked word
  const btn = document.querySelector(`.word-btn[data-index="${idx}"]`);
  if (btn) btn.classList.add('active');

  // Show only this word's syllables and rules
  const word = result.words[idx];
  if (word && word.isWord) {
    displaySyllables([word]);
    displayRules([word]);
  }
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

    const syllables = word.syllables || splitSyllables(word.rumi);

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
    jawiSpan.textContent = word.jawi;
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
  const charCount = result.fullJawi.replace(/\s/g, '').length;

  document.getElementById('word-count').textContent = wordCount;
  document.getElementById('char-count').textContent = charCount;
}

async function handleCopy() {
  const output = document.getElementById('jawi-output');
  const copyBtn = document.getElementById('copy-btn');
  const text = output.textContent || output.innerText;

  try {
    await navigator.clipboard.writeText(text);
    copyBtn.classList.add('copied');
    copyBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
      Disalin!
    `;
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        Salin
      `;
    }, 2000);
  } catch (err) {
    console.error('Copy failed:', err);
  }
}

// ──────────────────────────────────────────────
//  8. AI-GUIDED ESSAY FEATURE
//     Uses an optional server AI endpoint when configured.
//     A safe local guided-writing engine keeps the feature
//     fully usable when the static site is opened offline.
// ──────────────────────────────────────────────

const ESSAY_GUIDES = [
  {
    id: 'gotong-royong',
    emoji: '🧹',
    title: 'Gotong-royong di Sekolah',
    character: 'Saya',
    place: 'sekolah',
    value: 'kerjasama',
    points: [
      'Guru membahagikan tugas kepada semua murid.',
      'Kami menyapu sampah dan mengemas kelas bersama-sama.',
      'Kawasan sekolah menjadi bersih dan ceria.'
    ]
  },
  {
    id: 'lawatan-zoo',
    emoji: '🦒',
    title: 'Lawatan ke Zoo',
    character: 'Saya',
    place: 'zoo',
    value: 'bertanggungjawab',
    points: [
      'Kami pergi ke zoo bersama guru dan kawan-kawan.',
      'Kami melihat pelbagai haiwan yang menarik.',
      'Guru mengingatkan kami supaya menjaga haiwan.'
    ]
  },
  {
    id: 'hari-sukan',
    emoji: '🏅',
    title: 'Hari Sukan Sekolah',
    character: 'Saya',
    place: 'padang sekolah',
    value: 'berani mencuba',
    points: [
      'Semua peserta berkumpul di padang pada waktu pagi.',
      'Saya menyertai acara lari bersama kawan-kawan.',
      'Guru menyampaikan hadiah kepada para pemenang.'
    ]
  },
  {
    id: 'membantu-ibu',
    emoji: '🍳',
    title: 'Membantu Ibu di Rumah',
    character: 'Saya',
    place: 'rumah',
    value: 'tolong-menolong',
    points: [
      'Saya membantu ibu menyediakan makanan di dapur.',
      'Saya mengemas meja selepas keluarga selesai makan.',
      'Ibu berasa gembira dan mengucapkan terima kasih.'
    ]
  },
  {
    id: 'menanam-pokok',
    emoji: '🌱',
    title: 'Menanam Pokok',
    character: 'Saya',
    place: 'halaman rumah',
    value: 'menjaga kebersihan',
    points: [
      'Ayah menyediakan anak pokok dan peralatan berkebun.',
      'Saya menggali tanah lalu menanam anak pokok.',
      'Kami menyiram pokok supaya tumbuh dengan subur.'
    ]
  },
  {
    id: 'membaca-buku',
    emoji: '📚',
    title: 'Kebaikan Membaca Buku',
    character: 'Saya',
    place: 'perpustakaan',
    value: 'rajin',
    points: [
      'Saya memilih buku cerita yang menarik.',
      'Membaca buku menambah ilmu dan perkataan baharu.',
      'Saya meminjam buku untuk dibaca di rumah.'
    ]
  }
];

const ESSAY_VALUE_CLOSINGS = {
  'kerjasama': 'Kita hendaklah bekerjasama supaya tugas menjadi lebih mudah.',
  'rajin': 'Kita hendaklah rajin berusaha untuk mencapai kejayaan.',
  'bertanggungjawab': 'Kita hendaklah bertanggungjawab dalam setiap perkara yang dilakukan.',
  'tolong-menolong': 'Kita mestilah mengamalkan sikap tolong-menolong dalam kehidupan.',
  'menjaga kebersihan': 'Kita mestilah menjaga kebersihan supaya hidup lebih sihat.',
  'berani mencuba': 'Kita hendaklah berani mencuba dan tidak mudah putus asa.'
};

let currentEssay = null;
let essayGenerationCount = 0;

function initGuidedEssay() {
  const form = document.getElementById('essay-form');
  const suggestions = document.getElementById('essay-topic-suggestions');
  if (!form || !suggestions) return;

  ESSAY_GUIDES.forEach(guide => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'essay-topic-chip';
    button.dataset.guide = guide.id;
    button.textContent = `${guide.emoji} ${guide.title}`;
    button.addEventListener('click', () => applyEssayGuide(guide.id));
    suggestions.appendChild(button);
  });

  form.addEventListener('submit', handleEssayGeneration);
  form.addEventListener('input', () => setEssayStep(2));
  document.getElementById('essay-suggest-btn').addEventListener('click', suggestEssayPoints);
  document.getElementById('essay-toggle-rumi').addEventListener('click', toggleEssayRumi);
  document.getElementById('essay-copy-btn').addEventListener('click', copyEssayJawi);
  document.getElementById('essay-use-btn').addEventListener('click', useEssayInConverter);

  const endpoint = getEssayAIEndpoint();
  if (endpoint) {
    const privacy = form.querySelector('.essay-privacy');
    privacy.innerHTML = '<span aria-hidden="true">●</span> Mod AI pelayan aktif: input dihantar ke perkhidmatan AI yang dikonfigurasi.';
  }
}

function applyEssayGuide(guideId) {
  const guide = ESSAY_GUIDES.find(item => item.id === guideId);
  if (!guide) return;

  document.querySelectorAll('.essay-topic-chip').forEach(button => {
    button.classList.toggle('active', button.dataset.guide === guideId);
  });

  document.getElementById('essay-topic').value = guide.title;
  document.getElementById('essay-character').value = guide.character;
  document.getElementById('essay-place').value = guide.place;
  document.getElementById('essay-points').value = guide.points.join('\n');
  document.getElementById('essay-value').value = guide.value;
  setEssayMessage(`Idea “${guide.title}” sudah diisi. Murid masih boleh mengubah mana-mana bahagian.`, 'info');
  setEssayStep(2);
  document.getElementById('essay-points').focus();
}

function suggestEssayPoints() {
  const topic = document.getElementById('essay-topic').value.trim().toLowerCase();
  const matchedGuide = ESSAY_GUIDES.find(guide => {
    const title = guide.title.toLowerCase();
    return topic && (title.includes(topic) || topic.includes(title) || title.split(' ').some(word => word.length > 4 && topic.includes(word)));
  });

  if (matchedGuide) {
    applyEssayGuide(matchedGuide.id);
    return;
  }

  if (!document.getElementById('essay-character').value.trim()) {
    document.getElementById('essay-character').value = 'Saya';
  }
  if (!document.getElementById('essay-place').value.trim()) {
    document.getElementById('essay-place').value = 'sekolah';
  }

  document.getElementById('essay-points').value = [
    'Kami menyediakan peralatan sebelum aktiviti bermula.',
    'Semua orang bekerjasama melakukan tugas dengan bersungguh-sungguh.',
    'Aktiviti itu selesai dengan baik dan memberi pengalaman yang berguna.'
  ].join('\n');
  setEssayMessage('Tiga isi umum telah dicadangkan. Ubah isi supaya benar-benar sesuai dengan tajuk kamu.', 'info');
  setEssayStep(2);
}

function getEssayPayload() {
  const rawPoints = document.getElementById('essay-points').value;
  return {
    topic: cleanEssayText(document.getElementById('essay-topic').value, 80),
    character: cleanEssayText(document.getElementById('essay-character').value, 40) || 'Saya',
    place: cleanEssayText(document.getElementById('essay-place').value, 60) || 'sekolah',
    points: rawPoints
      .split(/\n|;/)
      .map(point => normalizeEssaySentence(point))
      .filter(Boolean)
      .slice(0, 6),
    value: document.getElementById('essay-value').value,
    length: document.getElementById('essay-length').value
  };
}

async function handleEssayGeneration(event) {
  event.preventDefault();
  const payload = getEssayPayload();
  const topicInput = document.getElementById('essay-topic');

  topicInput.removeAttribute('aria-invalid');
  if (!payload.topic) {
    topicInput.setAttribute('aria-invalid', 'true');
    setEssayMessage('Masukkan tajuk karangan dahulu atau pilih salah satu idea pantas.');
    topicInput.focus();
    return;
  }

  if (payload.points.length < 2) {
    setEssayMessage('Masukkan sekurang-kurangnya dua isi penting. Tekan “Cadangkan isi” jika kamu perlukan bantuan.');
    document.getElementById('essay-points').focus();
    return;
  }

  const button = document.getElementById('essay-generate-btn');
  const originalButton = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<span aria-hidden="true">✦</span> AI sedang menyusun…';
  setEssayMessage('Menyusun pendahuluan, isi dan penutup…', 'info');

  try {
    essayGenerationCount += 1;
    let essay = null;
    const endpoint = getEssayAIEndpoint();

    if (endpoint) {
      try {
        essay = await requestServerEssay(endpoint, payload);
        setEssayMessage('Karangan berjaya dijana menggunakan AI pelayan.', 'info');
      } catch (error) {
        console.warn('AI endpoint unavailable; using local guided writer:', error);
        essay = buildLocalEssay(payload, essayGenerationCount);
        setEssayMessage('Sambungan AI tidak tersedia. Draf dibina dengan pembantu setempat.', 'info');
      }
    } else {
      essay = buildLocalEssay(payload, essayGenerationCount);
      setEssayMessage('Draf siap. Baca semula dan ubah ayat supaya menjadi hasil tulisan kamu sendiri.', 'info');
    }

    renderEssayResult(essay);
    setEssayStep(3);
  } finally {
    button.disabled = false;
    button.innerHTML = originalButton;
  }
}

function buildLocalEssay(payload, variant = 1) {
  const topicLower = lowerFirst(payload.topic).replace(/\b(Di|Ke|Dari|Dan)\b/g, word => word.toLowerCase());
  const characterInSentence = lowerFirst(payload.character);
  const topicAlreadyNamesPlace = topicLower.toLowerCase().includes(payload.place.toLowerCase());
  const activityWithPlace = `${topicLower}${topicAlreadyNamesPlace ? '' : ` di ${payload.place}`}`;
  const introTemplates = [
    `Pada hari Sabtu yang lalu, ${characterInSentence} berpeluang menyertai ${activityWithPlace}. ${payload.character} berasa gembira dan teruja.`,
    `Pada hujung minggu yang lalu, ${characterInSentence} menyertai aktiviti ${activityWithPlace}. Aktiviti itu sangat menarik.`,
    `${payload.character} telah menyertai ${activityWithPlace}. Banyak pengalaman baharu diperoleh melalui aktiviti tersebut.`
  ];
  const intro = introTemplates[(variant - 1) % introTemplates.length];
  const connectors = ['Mula-mula,', 'Kemudian,', 'Selepas itu,', 'Seterusnya,', 'Di samping itu,', 'Akhir sekali,'];
  const bodySentences = payload.points.map((point, index) => `${connectors[index]} ${lowerFirst(stripSentenceEnd(point))}.`);
  const valueClosing = ESSAY_VALUE_CLOSINGS[payload.value] || `Kita hendaklah mengamalkan nilai ${payload.value} dalam kehidupan.`;
  const conclusion = `Akhirnya, aktiviti tersebut selesai dengan baik. ${payload.character} berasa bangga dan gembira. ${valueClosing}`;

  let paragraphs;
  if (payload.length === 'ringkas') {
    paragraphs = [intro, `${bodySentences.join(' ')} ${conclusion}`];
  } else if (payload.length === 'panjang') {
    const splitAt = Math.max(1, Math.ceil(bodySentences.length / 2));
    paragraphs = [intro, bodySentences.slice(0, splitAt).join(' '), bodySentences.slice(splitAt).join(' '), conclusion].filter(Boolean);
  } else {
    paragraphs = [intro, bodySentences.join(' '), conclusion];
  }

  return {
    title: payload.topic,
    outline: [
      `Pendahuluan — ${payload.character} menyertai aktiviti di ${payload.place}.`,
      ...payload.points.map(point => `Isi — ${point}`),
      `Penutup — Pengajaran tentang ${payload.value}.`
    ],
    paragraphs,
    value: payload.value,
    source: 'local'
  };
}

async function requestServerEssay(endpoint, payload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task: 'karangan-berpandu',
        output: 'Bahasa Melayu Rumi; penukaran Jawi dilakukan oleh aplikasi',
        audience: 'murid sekolah rendah',
        ...payload
      }),
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`AI request failed (${response.status})`);
    const data = await response.json();
    const paragraphs = Array.isArray(data.paragraphs)
      ? data.paragraphs
      : typeof data.text === 'string'
        ? data.text.split(/\n\s*\n/)
        : [];
    const cleanParagraphs = paragraphs
      .map(paragraph => cleanEssayText(paragraph, 1200))
      .filter(Boolean)
      .slice(0, 5);

    if (cleanParagraphs.length < 2) throw new Error('AI response did not contain enough paragraphs');

    return {
      title: cleanEssayText(data.title, 80) || payload.topic,
      outline: Array.isArray(data.outline)
        ? data.outline.map(item => cleanEssayText(item, 180)).filter(Boolean).slice(0, 8)
        : [`Pendahuluan — ${payload.topic}`, ...payload.points.map(point => `Isi — ${point}`), `Penutup — ${payload.value}`],
      paragraphs: cleanParagraphs,
      value: payload.value,
      source: 'server'
    };
  } finally {
    clearTimeout(timeout);
  }
}

function renderEssayResult(essay) {
  currentEssay = {
    ...essay,
    jawiParagraphs: essay.paragraphs.map(paragraph => convertText(paragraph).fullJawi)
  };

  const outlineList = document.getElementById('essay-outline-list');
  outlineList.innerHTML = '';
  essay.outline.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    outlineList.appendChild(listItem);
  });

  document.getElementById('essay-draft-title').textContent = essay.title;

  const jawiDisplay = document.getElementById('essay-jawi-display');
  jawiDisplay.innerHTML = '';
  currentEssay.jawiParagraphs.forEach(paragraph => {
    const element = document.createElement('p');
    element.textContent = paragraph;
    jawiDisplay.appendChild(element);
  });

  const rumiDisplay = document.getElementById('essay-rumi-display');
  rumiDisplay.innerHTML = '';
  essay.paragraphs.forEach(paragraph => {
    const element = document.createElement('p');
    element.textContent = paragraph;
    rumiDisplay.appendChild(element);
  });
  rumiDisplay.hidden = true;

  const toggle = document.getElementById('essay-toggle-rumi');
  toggle.dataset.showing = 'jawi';
  toggle.textContent = 'Lihat Rumi';

  const wordCount = essay.paragraphs.join(' ').trim().split(/\s+/).filter(Boolean).length;
  document.getElementById('essay-word-count').textContent = `${wordCount} perkataan · ${essay.paragraphs.length} perenggan`;

  const result = document.getElementById('essay-result');
  result.classList.remove('essay-result--hidden');
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleEssayRumi() {
  if (!currentEssay) return;
  const button = document.getElementById('essay-toggle-rumi');
  const rumiDisplay = document.getElementById('essay-rumi-display');
  const showingRumi = button.dataset.showing === 'rumi';
  rumiDisplay.hidden = showingRumi;
  button.dataset.showing = showingRumi ? 'jawi' : 'rumi';
  button.textContent = showingRumi ? 'Lihat Rumi' : 'Sembunyikan Rumi';
}

async function copyEssayJawi() {
  if (!currentEssay) return;
  const button = document.getElementById('essay-copy-btn');
  const text = `${convertText(currentEssay.title).fullJawi}\n\n${currentEssay.jawiParagraphs.join('\n\n')}`;

  try {
    await navigator.clipboard.writeText(text);
    button.classList.add('copied');
    button.textContent = '✓ Disalin!';
    setTimeout(() => {
      button.classList.remove('copied');
      button.textContent = 'Salin Jawi';
    }, 2000);
  } catch (error) {
    console.error('Copy failed:', error);
    setEssayMessage('Teks tidak dapat disalin secara automatik. Pilih teks Jawi dan salin secara manual.');
  }
}

function useEssayInConverter() {
  if (!currentEssay) return;
  const input = document.getElementById('rumi-input');
  input.value = currentEssay.paragraphs.join('\n\n');
  handleConversion();
  input.scrollIntoView({ behavior: 'smooth', block: 'center' });
  input.focus({ preventScroll: true });
}

function getEssayAIEndpoint() {
  return document.querySelector('meta[name="jawisfera-ai-endpoint"]')?.content.trim() || '';
}

function setEssayMessage(message, type = 'error') {
  const element = document.getElementById('essay-form-message');
  if (!element) return;
  element.textContent = message;
  element.classList.toggle('essay-form__message--info', type === 'info');
}

function setEssayStep(step) {
  document.querySelectorAll('.essay-step').forEach((element, index) => {
    element.classList.toggle('essay-step--active', index + 1 === step);
  });
}

function cleanEssayText(value, maxLength) {
  return String(value || '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function normalizeEssaySentence(value) {
  const cleaned = cleanEssayText(value, 180).replace(/^(?:[-•*]|\d+[.)])\s*/, '');
  if (!cleaned) return '';
  const sentence = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  return /[.!?]$/.test(sentence) ? sentence : `${sentence}.`;
}

function stripSentenceEnd(value) {
  return String(value).replace(/[.!?]+$/, '').trim();
}

function lowerFirst(value) {
  if (!value) return '';
  return value.charAt(0).toLowerCase() + value.slice(1);
}

// ──────────────────────────────────────────────
//  9. STORY FEATURE
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
      if (w.isWord) {
        const span = document.createElement('span');
        span.className = 'story-word';
        span.textContent = w.jawi;
        span.title = w.rumi;
        p.appendChild(span);
      } else {
        const span = document.createElement('span');
        span.textContent = w.jawi;
        p.appendChild(span);
      }
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
  nilaiDisplay.innerHTML = `
    <span class="story-nilai__label">📌 Nilai Murni:</span>
    <span class="story-nilai__jawi">${nilaiJawi.fullJawi}</span>
    <span class="story-nilai__rumi">${story.nilai}</span>
  `;

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
    await navigator.clipboard.writeText(text);
    copyBtn.classList.add('copied');
    const original = copyBtn.textContent;
    copyBtn.textContent = '✓ Disalin!';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.textContent = 'Salin Cerita';
    }, 2000);
  } catch (err) {
    console.error('Copy failed:', err);
  }
}

// ── Initialize ──
document.addEventListener('DOMContentLoaded', init);
