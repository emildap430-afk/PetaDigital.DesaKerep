export interface SchoolData {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  dusun: string;
  distance: string;
  source: string;
  image: string;
  npsn: string;
  status: string;
  jenjang: string;
  alamat: string;
  kodePos: string;
  tahunBerdiri: string;
  akreditasi: string;
  kepalaSekolah: string;
  jumlahGuru: string;
  jumlahSiswa: string;
  deskripsi: string;
  fasilitas: string[];
  dokumentasi: string[];
}

export interface FacilityItem {
  id: string;
  name: string;
  location: string;
  description: string;
  fullDescription?: string;
  fungsi?: string[];
  jamOperasional?: string;
  pengelola?: string;
  kontak?: string;
  image: string;
  dokumentasi?: string[];
  lat?: number;
  lng?: number;
}

export interface FacilityCategory {
  id: string;
  title: string;
  iconName: string;
  countBadge: string;
  description: string;
  items: FacilityItem[];
}

export interface PotentialItem {
  id: string;
  name: string;
  dusun: string;
  description: string;
  fullDescription?: string;
  komoditas: string;
  luasLahan?: string;
  pengelola?: string;
  musimPanen?: string;
  sumber?: string;
  fungsi?: string[];
  image: string;
  dokumentasi?: string[];
}

export interface PotentialData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  fullDescription?: string;
  lokasi: string;
  komoditas: string;
  sumber: string;
  fungsi?: string[];
  pengelola?: string;
  musimPanen?: string;
  jamOperasional?: string;
  dokumentasi: string[];
  items?: PotentialItem[];
}

export interface UmkmData {
  id: string;
  name: string;
  shortName: string;
  categoryBadge: string;
  dusun: string;
  pemilik: string;
  alamat: string;
  deskripsi: string;
  fullDeskripsi?: string;
  produk: string[];
  jamOperasional: string;
  kontak: string;
  source: string;
  statusVerifikasi: string;
  image: string;
  dokumentasi: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'kegiatan' | 'potensi' | 'fasilitas';
  categoryLabel: string;
  image: string;
  date: string;
}

export interface MapMarkerItem {
  id: string;
  name: string;
  category: 'kantor' | 'pendidikan' | 'ibadah' | 'kesehatan' | 'fasum' | 'potensi';
  categoryLabel: string;
  lat: number;
  lng: number;
  address: string;
  image: string;
  color: string;
}

export const villageInfo = {
  nama: "DESA KEREP",
  fullTitle: "PETA DIGITAL DESA KEREP",
  kecamatan: "Tarokan",
  kabupaten: "Kediri",
  provinsi: "Jawa Timur",
  kodePos: "64174",
  dusunCount: 3,
  luasWilayah: "± 215 Ha",
  jumlahPenduduk: "1.706",
  tahunPenduduk: "2023",
  mataPencaharian: "Petani",
  terakhirDiperbarui: "10 Agustus 2026 (Observasi KKN)",
  sumberData: "Observasi KKN 2026",
  statusVerifikasi: "Terverifikasi",
  balaiDesa: "Dusun Kerep, Desa Kerep, Kec. Tarokan, Kab. Kediri",
  telepon: "(0354) 1234567",
  email: "desakerep@gmail.com",
  jamPelayanan: "Senin - Jumat 09.00 - 15.00 WIB",
  motto: "Desa Kerep maju bersama, sejahtera untuk semua. 🌿"
};

export const potensiList: PotentialData[] = [
  {
    id: "pertanian",
    title: "Potensi Pertanian Desa Kerep",
    subtitle: "Pertanian",
    image: "/assets/images/pertanian.jpg",
    description: "Mayoritas mata pencaharian masyarakat Desa Kerep adalah petani padi dan palawija dengan hamparan persawahan subur yang terbentang di ketiga dusun.",
    fullDescription: "Sektor pertanian merupakan tulang punggung perekonomian utama masyarakat Desa Kerep. Didukung oleh sistem irigasi teknis dan tanah vulkanik yang subur, lahan persawahan desa menghasilkan komoditas padi berkualitas tinggi serta berbagai tanaman hortikultura seperti cabai merah, tomat, jagung, dan aneka sayuran segar.",
    lokasi: "Dusun Kerep, Dusun Balongasem, Dusun Cabak",
    komoditas: "Padi Sawah, Jagung, Cabai, Tomat, Palawija & Sayuran",
    sumber: "Observasi Lapangan KKN 2026 & Gapoktan Desa Kerep",
    pengelola: "Gabungan Kelompok Tani (GAPOKTAN) Desa Kerep",
    musimPanen: "Panen Padi 2-3 Kali Setahun & Rotasi Palawija",
    fungsi: [
      "Penghasil Komoditas Pangan Utama (Padi & Beras Berkualitas)",
      "Pusat Budidaya Hortikultura & Tanaman Pangan Musiman",
      "Penyerap Tenaga Kerja Terbesar Masyarakat Pedesaan",
      "Ketahanan Pangan Mandiri Tingkat Desa & Kecamatan Tarokan"
    ],
    dokumentasi: [
      "/assets/images/pertanian.jpg",
      "/assets/images/pertanian-2.jpg",
      "/assets/images/pemandangan-kerep.jpg"
    ],
    items: [
      {
        id: "pertanian-dusun-kerep",
        name: "Pertanian & Persawahan Dusun Kerep",
        dusun: "Dusun Kerep",
        description: "Hamparan persawahan padi produktif dan sentra budidaya hortikultura cabai dan tomat.",
        fullDescription: "Persawahan di Dusun Kerep merupakan lumbung padi sentral dengan pasokan air irigasi yang stabil sepanjang tahun. Petani di Dusun Kerep juga membudidayakan aneka tanaman hortikultura unggulan seperti cabai rawit, tomat buah, terong, dan sayuran hijau dengan produktivitas tinggi.",
        komoditas: "Padi IR-64, Cabai Rawit, Tomat, Terong & Sayuran Daun",
        luasLahan: "± 45 Hektar",
        pengelola: "Kelompok Tani 'Tani Makmur' Dusun Kerep",
        musimPanen: "Padi (Maret & Juli), Hortikultura (Berkala Setiap Minggu)",
        sumber: "Observasi Lapangan KKN 2026",
        fungsi: [
          "Lumbung Beras & Padi Utama Kawasan Pusat Desa",
          "Sentra Pemasok Sayuran & Bumbu Dapur ke Pasar Tarokan",
          "Penerapan Pola Tanam Terpadu Ramah Lingkungan",
          "Penyedia Lapangan Kerja Musiman bagi Petani Penggarap"
        ],
        image: "/assets/images/pertanian.jpg",
        dokumentasi: [
          "/assets/images/pertanian.jpg",
          "/assets/images/pertanian-2.jpg",
          "/assets/images/pemandangan-kerep.jpg"
        ]
      },
      {
        id: "pertanian-dusun-balongasem",
        name: "Pertanian & Palawija Dusun Balongasem",
        dusun: "Dusun Balongasem",
        description: "Kawasan persawahan terpadu penghasil padi sawah unggul, jagung hibrida, dan kacang tanah.",
        fullDescription: "Wilayah persawahan Dusun Balongasem memiliki kontur tanah gembur yang sangat cocok untuk rotasi tanaman padi dan palawija. Setelah panen padi kedua, petani beralih menanam jagung hibrida dan kacang-kacangan untuk menjaga kesuburan tanah serta memutus siklus hama.",
        komoditas: "Padi Ciherang, Jagung Hibrida, Kacang Tanah & Kedelai",
        luasLahan: "± 38 Hektar",
        pengelola: "Kelompok Tani 'Subur Abadi' Dusun Balongasem",
        musimPanen: "Padi (April & Agustus), Jagung & Palawija (November)",
        sumber: "Observasi Lapangan KKN 2026",
        fungsi: [
          "Sentra Penghasil Jagung Pakan Ternak dan Konsumsi",
          "Rotasi Palawija Penyubur Struktur Hara Tanah",
          "Penyedia Bahan Pakan Silase Jerami bagi Peternak Balongasem",
          "Ketahanan Pangan Cadangan Musim Kemarau"
        ],
        image: "/assets/images/pertanian-2.jpg",
        dokumentasi: [
          "/assets/images/pertanian-2.jpg",
          "/assets/images/pertanian.jpg",
          "/assets/images/kegiatan-1.jpg"
        ]
      },
      {
        id: "pertanian-dusun-cabak",
        name: "Pertanian & Hortikultura Dusun Cabak",
        dusun: "Dusun Cabak",
        description: "Persawahan terasering lereng yang subur dengan komoditas padi dan kebun buah pisang/ubi.",
        fullDescription: "Dusun Cabak memiliki bentang persawahan berundak (terasering) alami yang memesona. Selain tanaman padi dengan air pegunungan yang jernih, petani di dusun ini memanfaatkan pematang dan lahan tegalan untuk budidaya pohon pisang raja/ambon, ubi jalar, singkong, dan tanaman keras.",
        komoditas: "Padi Organik Gunung, Pisang Raja/Kepok, Singkong & Ubi Jalar",
        luasLahan: "± 32 Hektar",
        pengelola: "Kelompok Tani 'Sumber Rejeki' Dusun Cabak",
        musimPanen: "Padi (Mei & September), Pisang & Ubi (Panen Sepanjang Tahun)",
        sumber: "Observasi Lapangan KKN 2026",
        fungsi: [
          "Penghasil Beras Pulen dengan Air Sumber Pegunungan Alami",
          "Pemasok Bahan Baku Singkong & Pisang untuk Pengrajin Keripik Desa",
          "Konservasi Lahan Terasering Pencegah Erosi Tanah",
          "Pemandangan Lanskap Hijau Potensial untuk Agrowisata Pedesaan"
        ],
        image: "/assets/images/pemandangan-kerep.jpg",
        dokumentasi: [
          "/assets/images/pemandangan-kerep.jpg",
          "/assets/images/pertanian.jpg",
          "/assets/images/lingkungan.jpg"
        ]
      }
    ]
  },
  {
    id: "peternakan",
    title: "Potensi Peternakan Desa Kerep",
    subtitle: "Peternakan",
    image: "/assets/images/peternakan.jpg",
    description: "Sektor peternakan rakyat yang terintegrasi dengan lahan pertanian, didominasi oleh ternak sapi potong, kambing, dan unggas rumahan.",
    fullDescription: "Peternakan di Desa Kerep dikelola secara mandiri maupun berkelompok oleh warga desa dengan sistem integrasi pertanian-peternakan (limbah jerami padi untuk pakan ternak dan kotoran ternak diolah menjadi pupuk organik kandang). Potensi ini mencakup populasi sapi potong, kambing jawa randu/PE, serta peternakan ayam kampung dan bebek petelur.",
    lokasi: "Dusun Kerep & Dusun Balongasem",
    komoditas: "Sapi Potong, Kambing PE/Jawa, Ayam Kampung, Bebek Petelur",
    sumber: "Observasi Lapangan KKN 2026 & Kelompok Ternak Desa",
    pengelola: "Kelompok Peternak Mandiri Warga Desa Kerep",
    musimPanen: "Penjualan Ternak Harian, Musim Idul Adha & Pasaran Hewan",
    fungsi: [
      "Penyedia Hewan Kurban (Sapi & Kambing) Berkualitas di Wilayah Kediri",
      "Sumber Pendapatan Harian & Tabungan Keluarga Petani",
      "Penghasil Pupuk Organik Kandang untuk Pertanian Berkelanjutan",
      "Pemanfaatan Limbah Pertanian (Jerami & Pakan Hijauan Alami)"
    ],
    dokumentasi: [
      "/assets/images/peternakan.jpg",
      "/assets/images/kegiatan-2.jpg",
      "/assets/images/peternakan-2.jpg"
    ],
    items: [
      {
        id: "peternakan-dusun-kerep",
        name: "Sentra Peternakan Sapi & Unggas Dusun Kerep",
        dusun: "Dusun Kerep",
        description: "Kandang ternak sapi potong jenis Limousin/Simental dan peternakan ayam kampung warga.",
        fullDescription: "Peternakan di Dusun Kerep didominasi oleh budidaya sapi potong pedaging dan peternakan ayam kampung semi-intensif yang dikelola oleh keluarga tani.",
        komoditas: "Sapi Limousin, Simental, Ayam Kampung & Bebek",
        pengelola: "Kelompok Ternak Lembu Sejahtera Dusun Kerep",
        sumber: "Observasi Lapangan KKN 2026",
        fungsi: [
          "Penggemukan Sapi Potong Berkualitas untuk Pasar Hewan",
          "Penghasil Telur & Daging Unggas Segar Konsumsi Warga",
          "Pengolahan Limbah Kotoran Ternak Menjadi Biourin & Pupuk Kompos"
        ],
        image: "/assets/images/peternakan.jpg",
        dokumentasi: [
          "/assets/images/peternakan.jpg",
          "/assets/images/peternakan-2.jpg"
        ]
      },
      {
        id: "peternakan-dusun-balongasem",
        name: "Peternakan Kambing & Domba Dusun Balongasem",
        dusun: "Dusun Balongasem",
        description: "Sentra budidaya kambing Peranakan Etawa (PE) dan kambing jawa randu dengan pakan hijauan alami.",
        fullDescription: "Dusun Balongasem memiliki populasi ternak kambing dan domba yang tinggi, memanfaatkan ketersediaan rumput gajah dan pakan rambanan segar di sekitar areal persawahan.",
        komoditas: "Kambing PE, Kambing Jawa Randu, Domba Batur",
        pengelola: "Kelompok Peternak Kambing Berkah Dusun Balongasem",
        sumber: "Observasi Lapangan KKN 2026",
        fungsi: [
          "Penyedia Kambing Kurban & Aqiqah Siap Potong",
          "Pembibitan Indukan Ternak Kambing Unggul",
          "Pemanfaatan Hijauan Alami Tepi Sawah secara Maksimal"
        ],
        image: "/assets/images/peternakan-2.jpg",
        dokumentasi: [
          "/assets/images/peternakan-2.jpg",
          "/assets/images/kegiatan-2.jpg"
        ]
      },
      {
        id: "peternakan-dusun-cabak",
        name: "Peternakan Mandiri Dusun Cabak",
        dusun: "Dusun Cabak",
        description: "Peternakan sapi peranakan ongole (PO) dan unggas pekarangan rumah tangga.",
        fullDescription: "Warga Dusun Cabak memelihara ternak sapi PO dan unggas bebas lepas di pekarangan luas sebagai bentuk tabungan hidup yang terintegrasi dengan kebun.",
        komoditas: "Sapi PO (Peranakan Ongole), Ayam Buras, Entok",
        pengelola: "Paguyuban Peternak Rakyat Dusun Cabak",
        sumber: "Observasi Lapangan KKN 2026",
        fungsi: [
          "Tabungan Investasi Finansial Keluarga Petani Pedesaan",
          "Pemanfaatan Rumput Alami dan Daun Singkong Kering",
          "Pasokan Daging Segar untuk Kebutuhan Hajatan & Pasar Tradisional"
        ],
        image: "/assets/images/peternakan.jpg",
        dokumentasi: [
          "/assets/images/peternakan.jpg",
          "/assets/images/peternakan-2.jpg"
        ]
      }
    ]
  },
  {
    id: "lingkungan",
    title: "Potensi Lingkungan & Kelestarian Alam",
    subtitle: "Lingkungan",
    image: "/assets/images/lingkungan.jpg",
    description: "Kawasan pedesaan asri nan hijau dengan udara sejuk, vegetasi rindang, dan sumber daya air alami yang terpelihara dengan baik.",
    fullDescription: "Desa Kerep memiliki keunggulan bentang alam pedesaan yang sejuk, asri, dan bersih di kawasan lereng Tarokan. Ekosistem alam terjaga dengan pepohonan peneduh, area persawahan terasering, serta pemeliharaan saluran sungai irigasi alami yang menjadi urat nadi kehidupan masyarakat tani desa.",
    lokasi: "Kawasan Alam Keseluruhan Desa Kerep",
    komoditas: "Sumber Air Bersih, Hutan Rakyat, Ruang Terbuka Hijau & Ekowisata Desa",
    sumber: "Observasi Lingkungan KKN 2026 & Pemerintah Desa Kerep",
    pengelola: "Pemerintah Desa Kerep & Karang Taruna Lingkungan",
    musimPanen: "Tersedia Sepanjang Tahun (Area Terbuka Hijau & Aliran Air)",
    fungsi: [
      "Penyedia Udara Bersih, Segar, dan Bebas Polusi Industri",
      "Konservasi Air Bersih & Saluran Irigasi Pertanian Desa",
      "Habitat Keanekaragaman Hayati & Vegetasi Tanaman Keras",
      "Potensi Pengembangan Destinasi Agrowisata & Gowes Pedesaan"
    ],
    dokumentasi: [
      "/assets/images/lingkungan.jpg",
      "/assets/images/lingkungan-2.jpg",
      "/assets/images/pemandangan-kerep.jpg"
    ],
    items: [
      {
        id: "lingkungan-dusun-kerep",
        name: "Kawasan Pemukiman Asri & Taman Dusun Kerep",
        dusun: "Dusun Kerep",
        description: "Pusat lingkungan bersih dengan tata pemukiman tertata rapi, drainase bersih, dan deretan pohon peneduh.",
        fullDescription: "Dusun Kerep sebagai pusat administrasi desa menjaga keasrian lingkungan melalui program bersih desa rutin, penanaman pohon penghijauan di sepanjang jalan poros, serta pemeliharaan saluran drainase air yang lancar.",
        komoditas: "Area Terbuka Hijau, Kebun Desa, Pohon Peneduh Jalan",
        pengelola: "Pemerintah Desa Kerep & RT/RW Dusun Kerep",
        sumber: "Observasi Lapangan KKN 2026",
        fungsi: [
          "Menciptakan Suasana Desa Bersih, Indah, dan Nyaman",
          "Pencegahan Genangan Air dengan Sistem Drainase Bersih",
          "Wadah Kegiatan Gotong Royong Kerja Bakti Lingkungan Mingguan"
        ],
        image: "/assets/images/lingkungan.jpg",
        dokumentasi: [
          "/assets/images/lingkungan.jpg",
          "/assets/images/lingkungan-2.jpg"
        ]
      },
      {
        id: "lingkungan-dusun-balongasem",
        name: "Ekosistem Saluran Irigasi & Embung Dusun Balongasem",
        dusun: "Dusun Balongasem",
        description: "Saluran irigasi air jernih dan sabuk hijau persawahan penyerap air.",
        fullDescription: "Lingkungan Dusun Balongasem dikelilingi hamparan sabuk hijau persawahan dengan jaringan saluran irigasi yang mengalir jernih. Vegetasi bambu dan pepohonan keras di bantaran menjaga struktur tanah agar tetap kokoh dan mencegah abrasi.",
        komoditas: "Saluran Air Irigasi, Rumpun Bambu Penahan Tanah, Koridor Hijau",
        pengelola: "Kelompok HIPPA Petani Dusun Balongasem",
        sumber: "Observasi Lapangan KKN 2026",
        fungsi: [
          "Penyedia Pasokan Air Bersih bagi Lahan Pertanian Desa",
          "Penyerapan Air Hujan Alami untuk Menjaga Cadangan Air Tanah",
          "Habitat Burung Pemakan Hama dan Ekosistem Sawah Alami"
        ],
        image: "/assets/images/lingkungan-2.jpg",
        dokumentasi: [
          "/assets/images/lingkungan-2.jpg",
          "/assets/images/pertanian-2.jpg"
        ]
      },
      {
        id: "lingkungan-dusun-cabak",
        name: "Bentang Alam Lereng & Hutan Rakyat Dusun Cabak",
        dusun: "Dusun Cabak",
        description: "Panorama alam perbukitan asri dengan hutan rakyat pepohonan jati/sengon dan udara pegunungan sejuk.",
        fullDescription: "Dusun Cabak menawarkan bentang alam yang masih sangat alami dengan latar perbukitan hijau. Udara yang sangat segar dan hawa sejuk menjadikannya paru-paru hijau Desa Kerep serta spot favorit warga untuk bersepeda pagi dan jalan santai.",
        komoditas: "Hutan Rakyat, Sumber Mata Air Lereng, Udara Segar Pegunungan",
        pengelola: "LMDH & Karang Taruna Dusun Cabak",
        sumber: "Observasi Lapangan KKN 2026",
        fungsi: [
          "Paru-paru Hijau Penghasil Oksigen Segar Bebas Polusi",
          "Konservasi Daerah Tangkapan Air Lereng Pegunungan Tarokan",
          "Spot Alami Rekreasi Gowes, Jalan Santai & Fotografi Alam Pedesaan"
        ],
        image: "/assets/images/pemandangan-kerep.jpg",
        dokumentasi: [
          "/assets/images/pemandangan-kerep.jpg",
          "/assets/images/lingkungan.jpg"
        ]
      }
    ]
  },
  {
    id: "masyarakat",
    title: "Partisipasi & Kelembagaan Masyarakat",
    subtitle: "Masyarakat",
    image: "/assets/images/kegiatan-3.jpg",
    description: "Keaktifan organisasi kemasyarakatan, kader PKK, Posyandu, Karang Taruna, dan kelompok pengajian dalam membangun keguyuban desa.",
    fullDescription: "Potensi masyarakat Desa Kerep tercermin dari tingginya semangat gotong royong dan partisipasi aktif dalam lembaga kemasyarakatan desa. Berbagai wadah pemberdayaan seperti Tim Penggerak PKK, Posyandu balita & lansia, Karang Taruna 'Taruna Bhakti', Kelompok Tani (Poktan), serta paguyuban rukun warga senantiasa bersinergi dalam kegiatan sosial, kesehatan, kepemudaan, dan pembangunan desa.",
    lokasi: "Dusun Kerep, Dusun Balongasem, Dusun Cabak",
    komoditas: "TP-PKK, Karang Taruna, Posyandu Terpadu, Poktan, Majelis Taklim & Gotong Royong",
    sumber: "Observasi KKN 2026 & Lembaga Kemasyarakatan Desa Kerep",
    pengelola: "Pemerintah Desa, TP-PKK, Posyandu & Karang Taruna Desa Kerep",
    jamOperasional: "Kegiatan Rutin Mingguan & Bulanan di Tiap Dusun",
    fungsi: [
      "Pusat Layanan Kesehatan Dasar Ibu, Anak & Lansia (Posyandu)",
      "Pemberdayaan Kesejahteraan Keluarga & Wanita Tani melalui PKK",
      "Wadah Kreativitas, Olahraga & Kepemudaan Karang Taruna",
      "Memelihara Tradisi Sambatan Gotong Royong Antar Warga Dusun"
    ],
    dokumentasi: [
      "/assets/images/kegiatan-3.jpg",
      "/assets/images/kegiatan-1.jpg",
      "/assets/images/kegiatan-2.jpg"
    ],
    items: [
      {
        id: "masyarakat-dusun-kerep",
        name: "Kelembagaan & PKK Dusun Kerep",
        dusun: "Dusun Kerep",
        description: "Sentra kegiatan PKK, posyandu terpadu, dan paguyuban gotong royong warga pusat desa.",
        fullDescription: "Masyarakat Dusun Kerep aktif menjalankan program pembinaan keluarga sejahtera melalui PKK, senam lansia rutin, serta posyandu bulanan untuk memantau tumbuh kembang balita.",
        komoditas: "PKK Dusun Kerep, Posyandu Balita & Lansia, Senam Sehat",
        pengelola: "Kader PKK & Bidan Desa Kerep",
        sumber: "Observasi Lapangan KKN 2026",
        fungsi: [
          "Pemantauan Kesehatan Gizi Balita dan Lansia Rutin",
          "Pelatihan Keterampilan & Arisan Paguyuban Ibu-Ibu PKK",
          "Aksi Gotong Royong Kebersihan Lingkungan Dusun"
        ],
        image: "/assets/images/kegiatan-3.jpg",
        dokumentasi: [
          "/assets/images/kegiatan-3.jpg",
          "/assets/images/kegiatan-1.jpg"
        ]
      },
      {
        id: "masyarakat-dusun-balongasem",
        name: "Karang Taruna & Olahraga Dusun Balongasem",
        dusun: "Dusun Balongasem",
        description: "Wadah kepemudaan, klub bola voli, dan gotong royong pemuda Balongasem.",
        fullDescription: "Pemuda di Dusun Balongasem memiliki solidaritas tinggi dengan aktif mengelola kegiatan olahraga bola voli desa, turnamen antar-RT, serta menjadi garda depan dalam kegiatan kerja bakti sosial.",
        komoditas: "Karang Taruna Dusun Balongasem, Klub Voli, Kerja Bakti",
        pengelola: "Pengurus Karang Taruna Dusun Balongasem",
        sumber: "Observasi Lapangan KKN 2026",
        fungsi: [
          "Pembinaan Karakter & Kreativitas Pemuda Desa",
          "Penyelenggaraan Event Olahraga & Peringatan HUT RI",
          "Penggerak Kebersihan Saluran dan Fasilitas Umum Dusun"
        ],
        image: "/assets/images/kegiatan-1.jpg",
        dokumentasi: [
          "/assets/images/kegiatan-1.jpg",
          "/assets/images/kegiatan-4.jpg"
        ]
      },
      {
        id: "masyarakat-dusun-cabak",
        name: "Paguyuban Rukun Warga Dusun Cabak",
        dusun: "Dusun Cabak",
        description: "Guyub rukun warga lereng, pengajian tahlil/yasinan, dan tradisi sambatan bertani.",
        fullDescription: "Warga Dusun Cabak menjunjung tinggi adat ketimuran dan kebersamaan. Tradisi gotong royong sambatan memperbaiki rumah atau panen raya serta pengajian rutin mingguan menjadi perekat kekeluargaan yang sangat kental.",
        komoditas: "Majelis Taklim, Paguyuban Sambatan Tani, Rukun Kematian",
        pengelola: "Tokoh Masyarakat & RT/RW Dusun Cabak",
        sumber: "Observasi Lapangan KKN 2026",
        fungsi: [
          "Menjaga Kerukunan & Nilai-Nilai Religiusitas Warga",
          "Saling Bantu Antar Warga dalam Hajatan dan Pembangunan",
          "Kekuatan Solidaritas Sosial di Kawasan Perbukitan Desa"
        ],
        image: "/assets/images/kegiatan-2.jpg",
        dokumentasi: [
          "/assets/images/kegiatan-2.jpg",
          "/assets/images/kegiatan-3.jpg"
        ]
      }
    ]
  },
  {
    id: "umkm",
    title: "UMKM Desa Kerep",
    subtitle: "UMKM",
    image: "/assets/images/umkm.jpg",
    description: "Ragam usaha mikro kecil dan menengah khas desa mulai dari kerajinan, olahan pangan keripik, mebel kayu, hingga sambal pecel.",
    fullDescription: "Sektor UMKM Desa Kerep menjadi pilar ekonomi kreatif yang tersebar di Dusun Balongasem, Kerep, dan Cabak. Produk unggulan meliputi kerajinan lokal berkualitas, olahan keripik pisang/singkong renyah, bumbu pecel sangrai gurih, dan mebel kayu jati pilihan.",
    lokasi: "Dusun Kerep, Dusun Balongasem, Dusun Cabak",
    komoditas: "Aneka UMKM, Aneka Keripik, Sambal Pecel, Kerajinan, Mebel Kayu",
    sumber: "Observasi KKN 2026 & Paguyuban Pelaku Usaha Desa",
    pengelola: "Paguyuban Pelaku UMKM Desa Kerep",
    jamOperasional: "Buka Setiap Hari (Sesuai Jam Rumah Produksi)",
    fungsi: [
      "Pengembangan Ekonomi Mandiri & Pendapatan Rumah Tangga Warga",
      "Pelestarian Keterampilan Tradisional Menganyam Bambu",
      "Penyedia Produk Oleh-Oleh Khas Pedesaan Tarokan",
      "Membuka Lapangan Kerja Berbasis Keterampilan Lokal"
    ],
    dokumentasi: [
      "/assets/images/umkm.jpg",
      "/assets/images/umkm-2.jpg",
      "/assets/images/kegiatan-4.jpg"
    ]
  },
  {
    id: "budaya",
    title: "Pelestarian Budaya & Kesenian Tradisional",
    subtitle: "Seni & Budaya",
    image: "/assets/images/budaya.jpg",
    description: "Pelestarian tradisi budaya dan kesenian tradisional di Desa Kerep yang tersebar di 3 dusun: Dusun Cabak (pagelaran wayang di makam pendahulu babat dusun setiap bulan Suro & bersih makam - budaya paling menonjol), Dusun Kerep (pengajian & doa bersama sore hari), dan Dusun Balongasem (seni musik hadrah, sholawatan, & kenduri tradisi).",
    fullDescription: "Pelestarian budaya dan kesenian tradisional di Desa Kerep diwariskan secara turun-temurun dan lestari di ketiga dusun dengan keunikan masing-masing:\n\n1. Dusun Cabak (Budaya Paling Menonjol): Menyelenggarakan pagelaran wayang kulit semalam suntuk di malam hari yang diadakan langsung di dalam kompleks makam tempat pendahulu yang babat dusun (tokoh pembuka Dusun Cabak) setiap bulan Suro, serta tradisi kerja bakti bersama membersihkan makam leluhur.\n\n2. Dusun Kerep: Diwujudkan dalam bentuk pengajian dan doa bersama yang rutin diselenggarakan pada waktu sore hari sebagai sarana silaturahmi, kebersamaan, dan pembinaan religius warga.\n\n3. Dusun Balongasem: Mengembangkan pelestarian seni musik tradisional hadrah/rebana, tradisi pembacaan sholawat diba'iyah rutin, serta tradisi kenduri tumpengan syukur hasil bumi masyarakat tani.",
    lokasi: "Dusun Cabak, Dusun Kerep, & Dusun Balongasem",
    komoditas: "Wayangan Makam Babat Dusun (Bulan Suro), Bersih Makam, Pengajian Sore Hari, Seni Hadrah & Kenduri Panen",
    sumber: "Observasi KKN 2026 & Tokoh Sesepuh Adat Dusun Cabak, Kerep, & Balongasem",
    pengelola: "Masyarakat, Tokoh Adat Dusun Cabak, Dusun Kerep, & Dusun Balongasem",
    musimPanen: "Setiap Bulan Suro (Wayangan Makam) & Rutin Berkala (Pengajian & Sholawatan)",
    fungsi: [
      "Pelestarian Tradisi Wayang Kulit Makam Pendahulu Babat Dusun di Bulan Suro (Cabak)",
      "Kerja Bakti Rutin Membersihkan dan Merawat Makam Leluhur Dusun Cabak",
      "Pengajian dan Doa Bersama Sore Hari Warga Dusun Kerep",
      "Pelestarian Kesenian Musik Hadrah & Tradisi Sholawatan Warga Dusun Balongasem",
      "Mempererat Rasa Kerukunan, Gotong Royong, dan Nilai-Nilai Kultural Lokal"
    ],
    dokumentasi: [
      "/assets/images/budaya.jpg",
      "/assets/images/budaya-2.jpg",
      "/assets/images/kegiatan-2.jpg"
    ],
    items: [
      {
        id: "budaya-dusun-cabak",
        name: "Dusun Cabak - Pagelaran Wayang Makam Leluhur & Bersih Makam (Budaya Paling Menonjol)",
        dusun: "Dusun Cabak",
        description: "Tradisi budaya paling menonjol di Desa Kerep. Setiap bulan Suro diadakan pagelaran wayang di malam hari di dalam makam pendahulu yang babat dusun serta kerja bakti membersihkan makam.",
        fullDescription: "Dusun Cabak merupakan pusat tradisi budaya yang paling menonjol di Desa Kerep. Setiap bulan Suro (Tahun Baru Jawa / Hijriah), warga Dusun Cabak menyelenggarakan pagelaran wayang kulit di malam hari yang diadakan langsung di dalam makam tempat peristirahatan pendahulu yang babat dusun (tokoh yang pertama kali membuka wilayah Dusun Cabak). Rangkaian tradisi ini juga dilengkapi dengan kerja bakti bersama membersihkan makam leluhur sebagai wujud penghormatan, nguri-uri budaya Jawa, dan rasa syukur yang mendalam atas jasa para pendahulu.",
        komoditas: "Pentas Wayang Kulit Malam Hari di Makam Babat Dusun (Bulan Suro), Bersih Makam Leluhur",
        pengelola: "Sesepuh Adat, Kasun, & Warga Dusun Cabak",
        sumber: "Observasi Lapangan KKN 2026 & Sesepuh Dusun Cabak",
        fungsi: [
          "Pagelaran Wayangan di Dalam Makam Leluhur Babat Dusun Setiap Bulan Suro",
          "Pertunjukan Wayang Kulit Semalam Suntuk di Malam Hari",
          "Tradisi Gotong Royong Kerja Bakti Membersihkan Makam Leluhur",
          "Menjaga Warisan Sakral Sejarah Babad Dusun Cabak"
        ],
        image: "/assets/images/budaya.jpg",
        dokumentasi: [
          "/assets/images/budaya.jpg",
          "/assets/images/budaya-2.jpg"
        ]
      },
      {
        id: "budaya-dusun-kerep",
        name: "Dusun Kerep - Pengajian & Doa Bersama Sore Hari",
        dusun: "Dusun Kerep",
        description: "Pelestarian budaya dan tradisi religius melalui pengajian dan doa bersama antarwarga yang rutin dilaksanakan pada waktu sore hari.",
        fullDescription: "Di Dusun Kerep, pelestarian adat dan tradisi diwujudkan dalam bentuk pengajian dan doa bersama yang rutin diselenggarakan pada sore hari. Kegiatan ini menjadi wadah silaturahmi, kebersamaan, serta munajat bersama untuk keselamatan, ketenteraman, dan keberkahan seluruh warga dusun secara berkesinambungan.",
        komoditas: "Pengajian Warga & Doa Bersama Sore Hari",
        pengelola: "Tokoh Agama, Kasun, & Warga Dusun Kerep",
        sumber: "Observasi Lapangan KKN 2026 & Tokoh Masyarakat Kerep",
        fungsi: [
          "Pengajian dan Doa Bersama Rutin pada Waktu Sore Hari",
          "Mempererat Tali Silaturahmi dan Kebersamaan Antarwarga Dusun",
          "Pembinaan Nilai-Nilai Religiusitas dan Doa Keselamatan Desa",
          "Merawat Tradisi Kerukunan Guyub Rukun Warga Dusun Kerep"
        ],
        image: "/assets/images/budaya-2.jpg",
        dokumentasi: [
          "/assets/images/budaya-2.jpg",
          "/assets/images/kegiatan-2.jpg"
        ]
      },
      {
        id: "budaya-dusun-balongasem",
        name: "Dusun Balongasem - Seni Musik Hadrah & Tradisi Sholawatan",
        dusun: "Dusun Balongasem",
        description: "Pelestarian kesenian musik tradisional hadrah/rebana, tradisi pembacaan sholawatan dhibaiyyah, serta kenduri syukuran panen warga.",
        fullDescription: "Di Dusun Balongasem, pelestarian budaya tradisional hidup melalui grup seni musik hadrah dan rebana warga, tradisi sholawatan dhibaiyyah bergilir antar-RT, serta kenduri tumpengan sedekah bumi saat panen raya sebagai ungkapan syukur dan pemersatu warga.",
        komoditas: "Seni Musik Hadrah/Rebana, Tradisi Sholawatan Diba'iyah, Kenduri Syukur Panen",
        pengelola: "Paguyuban Hadrah, Kasun, & Warga Dusun Balongasem",
        sumber: "Observasi Lapangan KKN 2026 & Tokoh Pemuda Balongasem",
        fungsi: [
          "Pelestarian Kesenian Musik Tradisional Hadrah & Rebana",
          "Tradisi Sholawatan Dhibaiyyah Rutin Mingguan Antarwarga",
          "Tradisi Kenduri Tumpengan Syukur Hasil Bumi Pertanian",
          "Memperkuat Guyub Rukun dan Solidaritas Warga Dusun Balongasem"
        ],
        image: "/assets/images/budaya-2.jpg",
        dokumentasi: [
          "/assets/images/budaya-2.jpg",
          "/assets/images/kegiatan-1.jpg"
        ]
      }
    ]
  }
];

export const umkmList: UmkmData[] = [
  {
    id: "pabrik-ud-rigid-box",
    name: "Pabrik UD Rigid box",
    shortName: "UD Rigid box",
    categoryBadge: "Pabrik & Industri",
    dusun: "Dusun Cabak",
    pemilik: "Pabrik UD Rigid box (Cabak)",
    alamat: "Dusun Cabak, Desa Kerep, Kec. Tarokan, Kab. Kediri",
    deskripsi: "Pabrik manufaktur pembuatan kemasan rigid box, hardbox packaging produk, gift box premium, dan aneka kotak kemasan berkualitas.",
    fullDeskripsi: "Pabrik UD Rigid box bertempat di Dusun Cabak, Desa Kerep. Merupakan salah satu unit industri manufaktur lokal yang memproduksi aneka kebutuhan kemasan kaku (rigid box custom), kotak kemasan produk UMKM, packaging souvenir, hingga gift box premium dengan pengerjaan rapi dan bahan kokoh.",
    produk: [
      "Rigid Box Custom Ukuran",
      "Kotak Kemasan Hardbox",
      "Packaging Box Souvenir",
      "Gift Box & Hampers Premium",
      "Dus & Box Kemasan UMKM"
    ],
    jamOperasional: "Senin - Sabtu | 08.00 - 16.30 WIB",
    kontak: "Dusun Cabak, Desa Kerep",
    source: "Observasi Desa Kerep",
    statusVerifikasi: "Terverifikasi",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    dokumentasi: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      "/assets/images/umkm-2.jpg",
      "/assets/images/kegiatan-4.jpg"
    ]
  },
  {
    id: "ud-rahayu-indah",
    name: "UD. Rahayu Indah",
    shortName: "UD. Rahayu Indah",
    categoryBadge: "Gudang Penggilingan Padi",
    dusun: "Dusun Balongasem",
    pemilik: "Gudang Penggilingan Padi (Balongasem)",
    alamat: "Dusun Balongasem, Desa Kerep, Kec. Tarokan, Kab. Kediri",
    deskripsi: "Gudang dan sentra penggilingan padi (selepan gabah) serta penyedia beras segar berkualitas hasil panen petani Desa Kerep.",
    fullDeskripsi: "UD. Rahayu Indah merupakan unit usaha penggilingan padi (selepan gabah) dan gudang penyimpanan hasil panen yang terletak di Dusun Balongasem. Melayani pemrosesan gabah menjadi beras putih bersih, bekatul pakan ternak, serta distribusi beras bagi masyarakat dan pedagang.",
    produk: [
      "Beras Putih Kualitas Super",
      "Jasa Penggilingan Gabah / Selepan",
      "Beras Medium Petani Kerep",
      "Bekatul / Dedak Pakan Ternak",
      "Beras Sosoh Bersih"
    ],
    jamOperasional: "Setiap Hari | 07.00 - 17.00 WIB",
    kontak: "Dusun Balongasem, Desa Kerep",
    source: "Observasi Desa Kerep",
    statusVerifikasi: "Terverifikasi",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop",
    dokumentasi: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop",
      "/assets/images/pertanian.jpg",
      "/assets/images/umkm.jpg"
    ]
  }
];

export const sekolahList: SchoolData[] = [
  {
    id: "sd-kerep",
    name: "SD Negeri Kerep",
    shortName: "SD Kerep",
    badge: "SD",
    dusun: "Dusun Kerep",
    distance: "± 1,2 km dari Balai Desa",
    source: "Observasi KKN 2026",
    image: "/assets/images/sd-kerep.jpg",
    npsn: "20535449",
    status: "Negeri",
    jenjang: "Sekolah Dasar (SD)",
    alamat: "Jln. Asmoro Bangun, Dusun Kerep, Desa Kerep, Kec. Tarokan, Kab. Kediri",
    kodePos: "64152",
    tahunBerdiri: "1983",
    akreditasi: "B",
    kepalaSekolah: "Suwarto, S.Pd.",
    jumlahGuru: "12 Orang",
    jumlahSiswa: "156 Siswa (2025)",
    deskripsi: "SD Kerep merupakan sekolah dasar negeri yang berada di Dusun Kerep. Sekolah ini berkomitmen memberikan pendidikan dasar yang berkualitas bagi anak-anak di wilayah Desa Kerep dan sekitarnya.",
    fasilitas: [
      "Ruang Kelas",
      "Ruang Guru",
      "Perpustakaan",
      "Laboratorium",
      "Toilet",
      "Lapangan",
      "Mushola",
      "UKS",
      "Parkir"
    ],
    dokumentasi: [
      "/assets/images/sd-kerep.jpg",
      "/assets/images/sd-kerep-2.jpg",
      "/assets/images/sd-kerep-3.jpg"
    ]
  },
  {
    id: "mi-darul-huda",
    name: "MI Darul Huda Kerep",
    shortName: "MI Darul Huda",
    badge: "MI",
    dusun: "Dusun Kerep",
    distance: "± 1,4 km dari Balai Desa",
    source: "Observasi KKN 2026",
    image: "/assets/images/mi-darul-huda.jpg",
    npsn: "60728192",
    status: "Swasta",
    jenjang: "Madrasah Ibtidaiyah (MI)",
    alamat: "Dusun Kerep, Desa Kerep, Kec. Tarokan, Kab. Kediri",
    kodePos: "64174",
    tahunBerdiri: "1992",
    akreditasi: "B",
    kepalaSekolah: "Ahmad Mujib, S.Ag.",
    jumlahGuru: "10 Orang",
    jumlahSiswa: "118 Siswa (2025)",
    deskripsi: "Madrasah Ibtidaiyah Darul Huda memberikan pendidikan tingkat dasar berbasis keislaman dan pengetahuan umum bagi putra-putri Desa Kerep.",
    fasilitas: [
      "Ruang Kelas",
      "Ruang Guru",
      "Perpustakaan",
      "Mushola",
      "Lapangan",
      "Toilet"
    ],
    dokumentasi: [
      "/assets/images/mi-darul-huda.jpg",
      "/assets/images/kegiatan-1.jpg",
      "/assets/images/sd-kerep-2.jpg"
    ]
  },
  {
    id: "tk-dharma-wanita",
    name: "TK Dharma Wanita Putra Gemilang",
    shortName: "TK Dharma Wanita",
    badge: "TK",
    dusun: "Dusun Kerep",
    distance: "± 0,8 km dari Balai Desa",
    source: "Observasi KKN 2026",
    image: "/assets/images/tk-dharma-wanita.jpg",
    npsn: "20569812",
    status: "Swasta",
    jenjang: "Taman Kanak-Kanak (TK)",
    alamat: "Dusun Kerep, Desa Kerep, Kec. Tarokan, Kab. Kediri",
    kodePos: "64174",
    tahunBerdiri: "1998",
    akreditasi: "B",
    kepalaSekolah: "Siti Rahayu, S.Pd.",
    jumlahGuru: "6 Orang",
    jumlahSiswa: "54 Siswa (2025)",
    deskripsi: "TK Dharma Wanita Putra Gemilang berfokus pada pendidikan anak usia dini dengan suasana belajar ramah anak, permainan edukatif, dan pembentukan karakter.",
    fasilitas: [
      "Ruang Kelas Ceria",
      "Taman Bermain",
      "Ruang Guru",
      "Toilet Anak",
      "Area Parkir Wali Murid"
    ],
    dokumentasi: [
      "/assets/images/tk-dharma-wanita.jpg",
      "/assets/images/kegiatan-3.jpg",
      "/assets/images/sd-kerep-3.jpg"
    ]
  },
  {
    id: "sdn1-balongasem",
    name: "SD Negeri Balongasem",
    shortName: "SDN Balongasem",
    badge: "SD",
    dusun: "Dusun Balongasem",
    distance: "± 1,8 km dari Balai Desa",
    source: "Observasi KKN 2026",
    image: "/assets/images/sdn1-balongasem.jpg",
    npsn: "20535450",
    status: "Negeri",
    jenjang: "Sekolah Dasar (SD)",
    alamat: "Dusun Balongasem, Desa Kerep, Kec. Tarokan, Kab. Kediri",
    kodePos: "64174",
    tahunBerdiri: "1985",
    akreditasi: "B",
    kepalaSekolah: "Drs. Supriyanto, M.Pd.",
    jumlahGuru: "11 Orang",
    jumlahSiswa: "142 Siswa (2025)",
    deskripsi: "SD Negeri Balongasem merupakan sekolah dasar negeri yang melayani pendidikan bagi anak-anak di wilayah Dusun Balongasem dan sekitarnya dengan sarana belajar memadai, lingkungan asri, dan kegiatan pembiasaan berakhlak mulia.",
    fasilitas: [
      "Ruang Kelas",
      "Ruang Guru & Kepala Sekolah",
      "Perpustakaan Sekolah",
      "Lapangan Upacara & Olahraga",
      "Mushola",
      "Unit Kesehatan Sekolah (UKS)",
      "Toilet & Sanitasi Bersih",
      "Area Parkir"
    ],
    dokumentasi: [
      "/assets/images/sdn1-balongasem.jpg",
      "/assets/images/sd-kerep-2.jpg",
      "/assets/images/kegiatan-1.jpg"
    ]
  },
  {
    id: "ponpes-al-irsyadiyyah",
    name: "Ponpes Al-Irsyadiyyah",
    shortName: "Ponpes Al-Irsyadiyyah",
    badge: "Ponpes",
    dusun: "Dusun Cabak",
    distance: "± 2,1 km dari Balai Desa",
    source: "Observasi KKN 2026",
    image: "/assets/images/fasilitas-ibadah.jpg",
    npsn: "510035060124",
    status: "Swasta",
    jenjang: "Pondok Pesantren / Diniyah",
    alamat: "Dusun Cabak, Desa Kerep, Kec. Tarokan, Kab. Kediri",
    kodePos: "64174",
    tahunBerdiri: "1995",
    akreditasi: "Terdaftar Kemenag",
    kepalaSekolah: "Pengasuh Pondok Pesantren",
    jumlahGuru: "30 Pengajar / Ustadz",
    jumlahSiswa: "150 Santri",
    deskripsi: "Pondok Pesantren Al-Irsyadiyyah merupakan lembaga pendidikan Islam yang berfokus pada pembelajaran kitab kuning, tahfiz Al-Qur'an, serta pembinaan akhlak mulia bagi para santri di Desa Kerep dan sekitarnya.",
    fasilitas: [
      "Asrama Santri",
      "Masjid / Ruang Ibadah",
      "Ruang Belajar / Halaqah",
      "Perpustakaan Kitab",
      "Kantor Pengurus",
      "Dapur Santri",
      "Lapangan Kegiatan"
    ],
    dokumentasi: [
      "/assets/images/fasilitas-ibadah.jpg",
      "/assets/images/kegiatan-1.jpg",
      "/assets/images/budaya.jpg"
    ]
  }
];

export const fasilitasCategories: FacilityCategory[] = [
  {
    id: "kesehatan",
    title: "Sarana Kesehatan",
    iconName: "HeartPulse",
    countBadge: "Fasilitas Desa",
    description: "Fasilitas kesehatan dan pos pelayanan terpadu di Desa Kerep.",
    items: [
      {
        id: "posyandu-nusa-indah-1",
        name: "Posyandu Nusa Indah 1 Kerep",
        location: "Dusun Kerep",
        description: "Pos pelayanan terpadu balita, ibu hamil, dan lansia di Dusun Kerep.",
        fullDescription: "Posyandu Nusa Indah 1 merupakan sarana pelayanan kesehatan masyarakat di Dusun Kerep yang berfokus pada penimbangan balita, pemantauan status gizi anak, imunisasi, pencegahan stunting, serta pemeriksaan kesehatan rutin bagi lansia.",
        fungsi: [
          "Penimbangan Berat & Pengukuran Tinggi Badan Balita",
          "Pemberian Makanan Tambahan (PMT) & Vitamin A",
          "Pemeriksaan Kesehatan Ibu Hamil & Lansia Rutin",
          "Penyuluhan Gizi & Pencegahan Stunting Balita"
        ],
        jamOperasional: "Jadwal Rutin Bulanan (Minggu Ke-1 & Ke-2 Setiap Bulan)",
        pengelola: "Kader Posyandu Nusa Indah 1 & Bidan Desa Kerep",
        kontak: "Bidan Desa Kerep / Kader Dusun Kerep",
        image: "/assets/images/fasilitas-kesehatan.jpg",
        dokumentasi: [
          "/assets/images/fasilitas-kesehatan.jpg",
          "/assets/images/kegiatan-2.jpg",
          "/assets/images/fasilitas-kesehatan-2.jpg"
        ]
      },
      {
        id: "posyandu-nusa-indah-2",
        name: "Posyandu Nusa Indah 2 Cabak",
        location: "Dusun Cabak",
        description: "Pos pelayanan terpadu balita, ibu hamil, dan lansia di Dusun Cabak.",
        fullDescription: "Posyandu Nusa Indah 2 melayani masyarakat Dusun Cabak dalam program pemantauan tumbuh kembang anak, penimbangan balita rutin, posbindu lansia, serta edukasi gizi bagi ibu hamil.",
        fungsi: [
          "Penimbangan Balita & Deteksi Dini Tumbuh Kembang",
          "Pemberian Makanan Tambahan (PMT) Bergizi",
          "Pemeriksaan Tekanan Darah & Kesehatan Lansia",
          "Pelayanan Imunisasi Balita & Edukasi Kesehatan Ibu"
        ],
        jamOperasional: "Jadwal Rutin Bulanan (Minggu Ke-2 & Ke-3 Setiap Bulan)",
        pengelola: "Kader Posyandu Nusa Indah 2 & Bidan Desa Kerep",
        kontak: "Bidan Desa Kerep / Kader Dusun Cabak",
        image: "/assets/images/fasilitas-kesehatan.jpg",
        dokumentasi: [
          "/assets/images/fasilitas-kesehatan.jpg",
          "/assets/images/kegiatan-3.jpg",
          "/assets/images/fasilitas-kesehatan-2.jpg"
        ]
      },
      {
        id: "posyandu-nusa-indah-3",
        name: "Posyandu Nusa Indah 3 Balongasem",
        location: "Dusun Balongasem",
        description: "Pos pelayanan terpadu balita, ibu hamil, dan lansia di Dusun Balongasem.",
        fullDescription: "Posyandu Nusa Indah 3 melayani kebutuhan pemeriksaan dan pemantauan kesehatan masyarakat Dusun Balongasem, mulai dari pemantauan gizi balita, pencegahan stunting, hingga posbindu lansia terpadu.",
        fungsi: [
          "Penimbangan & Deteksi Tumbuh Kembang Balita",
          "Penyuluhan Gizi Balita & Pemberian Vitamin",
          "Pos Pembinaan Terpadu (Posbindu) Lansia Dusun Balongasem",
          "Pemeriksaan Ibu Hamil & Konsultasi Pola Asuh Sehat"
        ],
        jamOperasional: "Jadwal Rutin Bulanan (Minggu Ke-3 & Ke-4 Setiap Bulan)",
        pengelola: "Kader Posyandu Nusa Indah 3 & Bidan Desa Kerep",
        kontak: "Bidan Desa Kerep / Kader Dusun Balongasem",
        image: "/assets/images/fasilitas-kesehatan.jpg",
        dokumentasi: [
          "/assets/images/fasilitas-kesehatan.jpg",
          "/assets/images/kegiatan-4.jpg",
          "/assets/images/fasilitas-kesehatan-2.jpg"
        ]
      }
    ]
  },
  {
    id: "pendidikan",
    title: "Sarana Pendidikan",
    iconName: "GraduationCap",
    countBadge: "Fasilitas Desa",
    description: "Fasilitas pendidikan di desa.",
    items: [
      {
        id: "sd-kerep-item",
        name: "SD Negeri Kerep",
        location: "Dusun Kerep",
        description: "Sekolah Dasar Negeri utama Desa Kerep.",
        fullDescription: "SD Negeri Kerep merupakan sekolah dasar negeri utama yang berada di Dusun Kerep. Sekolah ini memiliki komitmen tinggi dalam mencetak generasi muda desa yang cerdas, berkarakter, dan berbudaya.",
        fungsi: [
          "Penyelenggaraan Pendidikan Dasar 6 Tahun (Kelas 1 - 6)",
          "Pembinaan Kegiatan Ekstrakurikuler (Pramuka, Olahraga, Seni)",
          "Pusat Kegiatan Belajar Mengajar Terpadu"
        ],
        jamOperasional: "Senin - Sabtu | 07.00 - 12.30 WIB",
        pengelola: "Dinas Pendidikan Kab. Kediri & Kepala Sekolah",
        image: "/assets/images/sd-kerep.jpg",
        dokumentasi: [
          "/assets/images/sd-kerep.jpg",
          "/assets/images/sd-kerep-2.jpg",
          "/assets/images/sd-kerep-3.jpg"
        ]
      },
      {
        id: "sdn1-balongasem-item",
        name: "SD Negeri Balongasem",
        location: "Dusun Balongasem",
        description: "Sekolah Dasar Negeri di Dusun Balongasem.",
        fullDescription: "SD Negeri Balongasem merupakan sekolah dasar negeri yang melayani putra-putri Dusun Balongasem, berdedikasi membangun fondasi akademis, budi pekerti luhur, dan kreativitas siswa.",
        fungsi: [
          "Penyelenggaraan Pendidikan Formal Tingkat Dasar (Kelas 1 - 6)",
          "Pembinaan Ekstrakurikuler Kepramukaan, Olahraga & Seni",
          "Penanaman Karakter Disiplin & Nilai-Nilai Kebangsaan"
        ],
        jamOperasional: "Senin - Sabtu | 07.00 - 12.30 WIB",
        pengelola: "Dinas Pendidikan Kab. Kediri & Kepala Sekolah",
        image: "/assets/images/sdn1-balongasem.jpg",
        dokumentasi: [
          "/assets/images/sdn1-balongasem.jpg",
          "/assets/images/sd-kerep-2.jpg",
          "/assets/images/kegiatan-1.jpg"
        ]
      },
      {
        id: "mi-darul-huda-item",
        name: "MI Darul Huda Kerep",
        location: "Dusun Kerep",
        description: "Madrasah Ibtidaiyah swasta berbasis Islam.",
        fullDescription: "Madrasah Ibtidaiyah Darul Huda memberikan pendidikan tingkat dasar berbasis keislaman dan pengetahuan umum bagi putra-putri Desa Kerep.",
        fungsi: [
          "Pendidikan Tingkat Dasar Berbasis Kurikulum Islam & Nasional",
          "Pembiasaan Sholat Dhuha & Tahfiz Al-Qur'an Dasar",
          "Pengembangan Karakter Islami Anak"
        ],
        jamOperasional: "Senin - Sabtu | 07.00 - 13.00 WIB",
        pengelola: "Yayasan Darul Huda Kerep",
        image: "/assets/images/mi-darul-huda.jpg",
        dokumentasi: [
          "/assets/images/mi-darul-huda.jpg",
          "/assets/images/kegiatan-1.jpg"
        ]
      },
      {
        id: "tk-dharma-wanita-item",
        name: "TK Dharma Wanita Putra Gemilang",
        location: "Dusun Kerep",
        description: "Taman Kanak-kanak Desa Kerep.",
        fullDescription: "TK Dharma Wanita Putra Gemilang berfokus pada pendidikan anak usia dini dengan suasana belajar ramah anak, permainan edukatif, dan pembentukan karakter.",
        fungsi: [
          "Pendidikan Usia Dini & Persiapan Sekolah Dasar",
          "Pelatihan Motorik, Kognitif, dan Kreativitas Anak",
          "Kegiatan Bermain Sambil Belajar"
        ],
        jamOperasional: "Senin - Jumat | 07.30 - 10.30 WIB",
        pengelola: "Yayasan Dharma Wanita Desa Kerep",
        image: "/assets/images/tk-dharma-wanita.jpg",
        dokumentasi: [
          "/assets/images/tk-dharma-wanita.jpg",
          "/assets/images/kegiatan-3.jpg"
        ]
      },
      {
        id: "ponpes-al-irsyadiyyah-item",
        name: "Ponpes Al-Irsyadiyyah",
        location: "Dusun Cabak",
        description: "Lembaga pendidikan pondok pesantren dan kajian keislaman.",
        fullDescription: "Pondok Pesantren Al-Irsyadiyyah memfasilitasi pembinaan keagamaan santri dan masyarakat sekitar melalui program pengajian kitab kuning, tahfiz Al-Qur'an, dan kegiatan keagamaan rutin.",
        fungsi: [
          "Pendidikan Keagamaan Islam & Pembinaan Santri",
          "Kajian Kitab Kuning & Tahfiz Al-Qur'an",
          "Pusat Kegiatan Keagamaan Masyarakat Dusun Cabak"
        ],
        jamOperasional: "Setiap Hari (24 Jam / Asrama)",
        pengelola: "Yayasan Ponpes Al-Irsyadiyyah",
        image: "/assets/images/fasilitas-ibadah.jpg",
        dokumentasi: [
          "/assets/images/fasilitas-ibadah.jpg",
          "/assets/images/kegiatan-1.jpg",
          "/assets/images/budaya.jpg"
        ]
      },
      {
        id: "paud-kerep",
        name: "PAUD Tunas Bangsa",
        location: "Dusun Kerep",
        description: "Pendidikan Anak Usia Dini.",
        fullDescription: "PAUD Tunas Bangsa wadah sosialisasi dini anak balita sebelum menempuh jenjang Taman Kanak-Kanak.",
        fungsi: [
          "Bimbingan Tumbuh Kembang & Sosialisasi Anak Balita",
          "Stimulasi Kreativitas & Motorik Halus"
        ],
        jamOperasional: "Senin - Kamis | 08.00 - 10.00 WIB",
        pengelola: "Kader PKK Desa Kerep",
        image: "/assets/images/tk-dharma-wanita.jpg",
        dokumentasi: [
          "/assets/images/tk-dharma-wanita.jpg"
        ]
      },
      {
        id: "tpq-al-ikhlas",
        name: "TPQ Al-Ikhlas",
        location: "Dusun Balongasem",
        description: "Taman Pendidikan Al-Qur'an warga desa.",
        fullDescription: "TPQ Al-Ikhlas memfasilitasi anak-anak desa dalam membaca, menulis, dan memahami Al-Qur'an serta hafalan doa harian.",
        fungsi: [
          "Pembelajaran Membaca Al-Qur'an (Iqra' & Al-Qur'an)",
          "Bimbingan Doa Harian, Praktek Sholat, dan Fiqih Dasar"
        ],
        jamOperasional: "Setiap Sore | 15.30 - 17.00 WIB",
        pengelola: "Pengurus TPQ Al-Ikhlas",
        image: "/assets/images/fasilitas-ibadah.jpg",
        dokumentasi: [
          "/assets/images/fasilitas-ibadah.jpg"
        ]
      }
    ]
  },
  {
    id: "peribadatan",
    title: "Sarana Peribadatan",
    iconName: "Landmark",
    countBadge: "Fasilitas Desa",
    description: "Tempat ibadah di Desa Kerep.",
    items: [
      {
        id: "masjid-baitul-muttaqin",
        name: "Masjid Baitul Muttaqin",
        location: "Dusun Kerep",
        description: "Masjid jami' utama Desa Kerep untuk kegiatan ibadah sholat Jumat dan keagamaan.",
        fullDescription: "Masjid Baitul Muttaqin adalah masjid jami' terbesar di Desa Kerep yang menjadi pusat kegiatan keagamaan Islam, sholat fardhu berjamaah, sholat Jumat, peringatan hari besar Islam (PHBI), dan tempat pengajian rutin warga.",
        fungsi: [
          "Pelaksanaan Sholat Fardhu Berjamaah 5 Waktu & Sholat Jumat",
          "Pusat Peringatan Hari Besar Islam (Maulid, Isra Mi'raj, Idul Fitri)",
          "Kegiatan Majelis Taklim & Pengajian Ibu-Ibu/Bapak-Bapak",
          "Pembinaan Remaja Masjid & TPQ Al-Qur'an"
        ],
        jamOperasional: "Buka Setiap Hari (24 Jam)",
        pengelola: "Takmir Masjid Baitul Muttaqin",
        image: "/assets/images/fasilitas-ibadah.jpg",
        dokumentasi: [
          "/assets/images/fasilitas-ibadah.jpg",
          "/assets/images/budaya.jpg",
          "/assets/images/kegiatan-2.jpg"
        ]
      },
      {
        id: "mushola-al-ikhlas",
        name: "Mushola Al-Ikhlas",
        location: "Dusun Balongasem",
        description: "Mushola warga untuk kegiatan pengajian dan sholat berjamaah.",
        fullDescription: "Mushola Al-Ikhlas berlokasi di Dusun Balongasem sebagai tempat peribadatan harian dan ruang pembelajaran mengaji bagi anak-anak di lingkungan setempat.",
        fungsi: [
          "Sholat Berjamaah 5 Waktu Warga Lingkungan",
          "Tempat Belajar Mengaji & TPQ Anak-Anak Dusun",
          "Pengajian Yasinan & Tahlil Mingguan Warga"
        ],
        jamOperasional: "Buka Setiap Hari",
        pengelola: "Pengurus Mushola Al-Ikhlas",
        image: "/assets/images/fasilitas-ibadah.jpg",
        dokumentasi: [
          "/assets/images/fasilitas-ibadah.jpg",
          "/assets/images/kegiatan-3.jpg"
        ]
      },
      {
        id: "mushola-nurul-huda",
        name: "Mushola Nurul Huda",
        location: "Dusun Cabak",
        description: "Mushola lingkungan RT 02 Dusun Cabak.",
        fullDescription: "Mushola Nurul Huda memfasilitasi peribadatan rutin warga RT 02 Dusun Cabak beserta kegiatan keagamaan tingkat RT.",
        fungsi: [
          "Sholat Fardhu Berjamaah Harian",
          "Kegiatan Keagamaan & Silaturahmi Warga RT"
        ],
        jamOperasional: "Buka Setiap Hari",
        pengelola: "Pengurus Mushola Nurul Huda",
        image: "/assets/images/fasilitas-ibadah.jpg",
        dokumentasi: [
          "/assets/images/fasilitas-ibadah.jpg"
        ]
      }
    ]
  },
  {
    id: "umum",
    title: "Fasilitas Umum",
    iconName: "Building2",
    countBadge: "Fasilitas Desa",
    description: "Fasilitas umum untuk masyarakat.",
    items: [
      {
        id: "balai-desa",
        name: "Balai Desa Kerep",
        location: "Dusun Kerep",
        description: "Pusat pemerintahan desa dan ruang pertemuan administrasi warga.",
        fullDescription: "Balai Desa Kerep merupakan gedung pusat administrasi dan kantor pelayanan umum bagi seluruh warga Desa Kerep, Kecamatan Tarokan, Kabupaten Kediri. Gedung ini difungsikan untuk pengurusan berkas kependudukan, musyawarah pembangunan desa (Musrenbangdes), tempat koordinasi perangkat desa, serta ruang pertemuan kegiatan kemasyarakatan.",
        fungsi: [
          "Pusat Pelayanan Administrasi Kependudukan (Surat Pengantar, KTP, KK, SKTM)",
          "Kantor Resmi Kepala Desa dan Perangkat Desa Kerep",
          "Tempat Pertemuan & Musyawarah Desa (Musrenbangdes)",
          "Pusat Informasi & Layanan Pengaduan Masyarakat",
          "Lokasi Kegiatan Kemasyarakatan, Pembinaan PKK, dan Karang Taruna"
        ],
        jamOperasional: "Senin - Jumat | 08.00 - 15.00 WIB",
        pengelola: "Pemerintah Desa Kerep",
        kontak: "(0354) 1234567 / desakerep@gmail.com",
        image: "/assets/images/fasilitas-umum.jpg",
        dokumentasi: [
          "/assets/images/fasilitas-umum.jpg",
          "/assets/images/hero-bg.jpg",
          "/assets/images/kegiatan-1.jpg"
        ]
      },
      {
        id: "pos-ronda-1",
        name: "Pos Kamling Dusun Kerep",
        location: "Dusun Kerep",
        description: "Pos keamanan lingkungan warga desa.",
        fullDescription: "Pos Keamanan Lingkungan (Pos Kamling) Dusun Kerep difungsikan untuk kegiatan ronda malam warga secara bergantian guna menjaga ketertiban, keamanan, dan kewaspadaan lingkungan desa.",
        fungsi: [
          "Pos Ronda Malam Sistem Keamanan Lingkungan (Siskamling)",
          "Pos Pantau Ketertiban & Siaga Bencana Desa",
          "Tempat Berkumpul & Koordinasi Warga RT"
        ],
        jamOperasional: "Setiap Malam | 21.00 - 04.00 WIB",
        pengelola: "Pengurus RT & Linmas Desa Kerep",
        image: "/assets/images/fasilitas-umum.jpg",
        dokumentasi: [
          "/assets/images/fasilitas-umum.jpg",
          "/assets/images/kegiatan-4.jpg"
        ]
      }
    ]
  },
  {
    id: "olahraga",
    title: "Fasilitas Olahraga",
    iconName: "Volleyball",
    countBadge: "Fasilitas Desa",
    description: "Sarana olahraga yang tersedia.",
    items: [
      {
        id: "lapangan-sepakbola",
        name: "Lapangan Gelora Desa Kerep",
        location: "Dusun Kerep",
        description: "Lapangan terbuka hijau untuk kegiatan bola kaki, upacara, dan event desa.",
        fullDescription: "Lapangan Gelora Desa Kerep merupakan area terbuka hijau seluas ± 1 Hektar yang digunakan untuk kegiatan olahraga sepak bola, turnamen antar-dusun, upacara hari kemerdekaan, senam massal, serta pertunjukan seni dan pasar rakyat.",
        fungsi: [
          "Lapangan Utama Sepak Bola & Turnamen Lokal",
          "Lokasi Upacara Hari Besar Nasional & Desa",
          "Tempat Senam Bersama & Kegiatan Ekstrakurikuler Sekolah",
          "Area Panggung Utama Pesta Rakyat & Pentas Seni Desa"
        ],
        jamOperasional: "Buka Setiap Hari (Terbuka Umum)",
        pengelola: "Karang Taruna & Karang Muda Kerep",
        image: "/assets/images/fasilitas-olahraga.jpg",
        dokumentasi: [
          "/assets/images/fasilitas-olahraga.jpg",
          "/assets/images/hero-bg.jpg"
        ]
      },
      {
        id: "lapangan-voli",
        name: "Lapangan Voli Pemuda",
        location: "Dusun Balongasem",
        description: "Lapangan olahraga voli pemuda Karang Taruna.",
        fullDescription: "Lapangan Voli Pemuda terletak di Dusun Balongasem, menjadi tempat latihan rutin tim olahraga bola voli pemuda desa dan lokasi pertandingan persahabatan antar-klub lokal.",
        fungsi: [
          "Latihan Rutin Bola Voli Pemuda Desa",
          "Penyelenggaraan Turnamen Voli Plastik & Voli Resmi",
          "Aktivitas Olahraga Sore Warga"
        ],
        jamOperasional: "Setiap Sore | 15.30 - 18.00 WIB",
        pengelola: "Karang Taruna Dusun Balongasem",
        image: "/assets/images/fasilitas-olahraga.jpg",
        dokumentasi: [
          "/assets/images/fasilitas-olahraga.jpg",
          "/assets/images/kegiatan-2.jpg"
        ]
      }
    ]
  },
  {
    id: "lainnya",
    title: "Fasilitas Lainnya",
    iconName: "PlusCircle",
    countBadge: "Fasilitas Desa",
    description: "Fasilitas lainnya di desa.",
    items: [
      {
        id: "lumbung-pangan",
        name: "Lumbung Pangan Kelompok Tani",
        location: "Dusun Kerep",
        description: "Tempat penyimpanan hasil panen padi warga desa.",
        fullDescription: "Lumbung Pangan merupakan fasilitas penyimpanan gabah hasil panen pertanian gabungan kelompok tani (Gapoktan) Desa Kerep untuk menjaga ketahanan pangan desa serta stok cadangan musim paceklik.",
        fungsi: [
          "Penyimpanan Cadangan Gabah & Padi Hasil Panen",
          "Pengelolaan Stok Ketahanan Pangan Desa",
          "Pusat Distribusi Benih & Alat Mesin Pertanian (Alsintan)"
        ],
        jamOperasional: "Sesuai Jadwal Kegiatan Kelompok Tani",
        pengelola: "Gapoktan Tani Makmur Desa Kerep",
        image: "/assets/images/fasilitas-umum.jpg",
        dokumentasi: [
          "/assets/images/fasilitas-umum.jpg"
        ]
      }
    ]
  }
];

export const galleryList: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Gerbang Utama SD Negeri Kerep",
    category: "fasilitas",
    categoryLabel: "Fasilitas",
    image: "/assets/images/sd-kerep.jpg",
    date: "10 Ags 2026"
  },
  {
    id: "gal-2",
    title: "Pemandangan Sawah & Gunung Desa Kerep",
    category: "potensi",
    categoryLabel: "Potensi",
    image: "/assets/images/pemandangan-kerep.jpg",
    date: "09 Ags 2026"
  },
  {
    id: "gal-3",
    title: "Peternakan Sapi Warga Kerep",
    category: "potensi",
    categoryLabel: "Potensi",
    image: "/assets/images/peternakan.jpg",
    date: "07 Ags 2026"
  },
  {
    id: "gal-4",
    title: "Kegiatan Budaya Desa Kerep",
    category: "kegiatan",
    categoryLabel: "Kegiatan",
    image: "/assets/images/budaya.jpg",
    date: "05 Ags 2026"
  },
  {
    id: "gal-6",
    title: "Bangunan Balai Desa Kerep",
    category: "fasilitas",
    categoryLabel: "Fasilitas",
    image: "/assets/images/fasilitas-umum.jpg",
    date: "02 Ags 2026"
  },
  {
    id: "gal-7",
    title: "Kegiatan Observasi Mahasiswa KKN",
    category: "kegiatan",
    categoryLabel: "Kegiatan",
    image: "/assets/images/kegiatan-1.jpg",
    date: "01 Ags 2026"
  }
];

export const mapMarkersList: MapMarkerItem[] = [
  {
    id: "m-kantor-desa",
    name: "Balai Desa & Kantor Kepala Desa Kerep",
    category: "kantor",
    categoryLabel: "Kantor Desa",
    lat: -7.7397,
    lng: 111.9135,
    address: "Dusun Kerep, Desa Kerep, Kec. Tarokan, Kab. Kediri",
    image: "/assets/images/fasilitas-umum.jpg",
    color: "#dc2626" // Red
  },
  {
    id: "m-sd-kerep",
    name: "SD Negeri Kerep",
    category: "pendidikan",
    categoryLabel: "Pendidikan",
    lat: -7.7410,
    lng: 111.9150,
    address: "Jl. Raya Kerep No. 12, Dusun Kerep",
    image: "/assets/images/sd-kerep.jpg",
    color: "#2563eb" // Blue
  },
  {
    id: "m-mi-darul-huda",
    name: "MI Darul Huda Kerep",
    category: "pendidikan",
    categoryLabel: "Pendidikan",
    lat: -7.7425,
    lng: 111.9162,
    address: "Dusun Kerep, Desa Kerep",
    image: "/assets/images/mi-darul-huda.jpg",
    color: "#2563eb" // Blue
  },
  {
    id: "m-tk-dharma-wanita",
    name: "TK Dharma Wanita Putra Gemilang",
    category: "pendidikan",
    categoryLabel: "Pendidikan",
    lat: -7.7380,
    lng: 111.9110,
    address: "Dusun Kerep, Desa Kerep",
    image: "/assets/images/tk-dharma-wanita.jpg",
    color: "#2563eb" // Blue
  },
  {
    id: "m-sdn-balongasem",
    name: "SD Negeri Balongasem",
    category: "pendidikan",
    categoryLabel: "Pendidikan",
    lat: -7.7470,
    lng: 111.9145,
    address: "Dusun Balongasem, Desa Kerep",
    image: "/assets/images/sdn1-balongasem.jpg",
    color: "#2563eb" // Blue
  },
  {
    id: "m-ponpes-al-irsyadiyyah",
    name: "Ponpes Al-Irsyadiyyah",
    category: "pendidikan",
    categoryLabel: "Pendidikan",
    lat: -7.7460,
    lng: 111.9220,
    address: "Dusun Cabak, Desa Kerep",
    image: "/assets/images/fasilitas-ibadah.jpg",
    color: "#2563eb" // Blue
  },
  {
    id: "m-masjid",
    name: "Masjid Baitul Muttaqin",
    category: "ibadah",
    categoryLabel: "Tempat Ibadah",
    lat: -7.7385,
    lng: 111.9120,
    address: "Dusun Kerep, Desa Kerep",
    image: "/assets/images/fasilitas-ibadah.jpg",
    color: "#9333ea" // Purple
  },
  {
    id: "m-posyandu-1",
    name: "Posyandu Nusa Indah 1 Kerep",
    category: "kesehatan",
    categoryLabel: "Kesehatan",
    lat: -7.7390,
    lng: 111.9140,
    address: "Dusun Kerep, Desa Kerep",
    image: "/assets/images/fasilitas-kesehatan.jpg",
    color: "#e11d48" // Dark Red Cross
  },
  {
    id: "m-posyandu-2",
    name: "Posyandu Nusa Indah 2 Cabak",
    category: "kesehatan",
    categoryLabel: "Kesehatan",
    lat: -7.7340,
    lng: 111.9180,
    address: "Dusun Cabak, Desa Kerep",
    image: "/assets/images/fasilitas-kesehatan.jpg",
    color: "#e11d48" // Dark Red Cross
  },
  {
    id: "m-posyandu-3",
    name: "Posyandu Nusa Indah 3 Balongasem",
    category: "kesehatan",
    categoryLabel: "Kesehatan",
    lat: -7.7475,
    lng: 111.9130,
    address: "Dusun Balongasem, Desa Kerep",
    image: "/assets/images/fasilitas-kesehatan.jpg",
    color: "#e11d48" // Dark Red Cross
  },
  {
    id: "m-lapangan",
    name: "Lapangan Desa Kerep",
    category: "fasum",
    categoryLabel: "Fasilitas Umum",
    lat: -7.7405,
    lng: 111.9110,
    address: "Dusun Kerep, Desa Kerep",
    image: "/assets/images/fasilitas-olahraga.jpg",
    color: "#16a34a" // Green
  },
  {
    id: "m-potensi-sawah",
    name: "Kawasan Pertanian Padi Utama",
    category: "potensi",
    categoryLabel: "Potensi Desa",
    lat: -7.7440,
    lng: 111.9180,
    address: "Dusun Kerep & Balongasem",
    image: "/assets/images/pertanian.jpg",
    color: "#ea580c" // Orange
  },
  {
    id: "m-potensi-umkm",
    name: "Sentra UMKM Desa Kerep",
    category: "potensi",
    categoryLabel: "Potensi Desa",
    lat: -7.7455,
    lng: 111.9200,
    address: "Dusun Balongasem, Desa Kerep",
    image: "/assets/images/umkm.jpg",
    color: "#ea580c" // Orange
  }
];
