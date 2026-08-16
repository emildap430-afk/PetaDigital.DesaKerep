import { RouteState } from '../types';
import { potensiList, umkmList, sekolahList, fasilitasCategories } from '../../assets/data/villageData';

export interface SearchResultItem {
  id: string;
  title: string;
  category: 'Fasilitas' | 'Potensi' | 'Profil' | 'Sekolah' | 'Peta' | 'Galeri' | 'Kontak';
  categoryBadge: string;
  categoryColor: string; // Tailind class
  subtitle?: string;
  description: string;
  location?: string;
  image?: string;
  keywords: string[];
  route: RouteState;
}

export const getSearchIndex = (): SearchResultItem[] => {
  const items: SearchResultItem[] = [
    // --- PROFIL DESA ---
    {
      id: 'prof-utama',
      title: 'Profil Desa Kerep',
      category: 'Profil',
      categoryBadge: 'Profil Desa',
      categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description: 'Ringkasan profil umum wilayah, dusun, dan struktur Desa Kerep.',
      keywords: ['profil', 'desa', 'kerep', 'tarokan', 'kediri', 'dusun', 'wilayah'],
      route: { view: 'profil' }
    },
    {
      id: 'prof-visi',
      title: 'Visi & Misi Desa Kerep',
      category: 'Profil',
      categoryBadge: 'Profil Desa',
      categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description: 'Cita-cita terwujudnya Desa Kerep yang mandiri, sejahtera, dan religius.',
      keywords: ['visi', 'misi', 'cita-cita', 'program', 'tujuan', 'pembangunan'],
      route: { view: 'profil-detail', profilId: 'visi-misi' }
    },
    {
      id: 'prof-sejarah',
      title: 'Sejarah Desa Kerep',
      category: 'Profil',
      categoryBadge: 'Profil Desa',
      categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description: 'Asal-usul penamaan Desa Kerep dan sejarah perkembangannya.',
      keywords: ['sejarah', 'asal usul', 'babad', 'cerita', 'leluhur', 'dulu', 'sejarah desa'],
      route: { view: 'profil-detail', profilId: 'sejarah' }
    },
    {
      id: 'prof-geografis',
      title: 'Kondisi Geografis & Dusun',
      category: 'Profil',
      categoryBadge: 'Profil Desa',
      categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description: 'Batas wilayah, iklim, dan 3 Dusun: Kerep, Balongasem, Cabak Banjarsari.',
      keywords: ['geografis', 'peta', 'lokasi', 'batas', 'luas', 'dusun', 'balongasem', 'cabak', 'banjarsari'],
      route: { view: 'profil-detail', profilId: 'geografis' }
    },
    {
      id: 'prof-pemerintahan',
      title: 'Pemerintahan & Perangkat Desa',
      category: 'Profil',
      categoryBadge: 'Profil Desa',
      categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description: 'Struktur organisasi pemerintah desa dan aparat Kepala Desa Kerep.',
      keywords: ['pemerintahan', 'perangkat', 'kades', 'kepala desa', 'sekretaris', 'kaur', 'kasun', 'bpd'],
      route: { view: 'profil-detail', profilId: 'pemerintahan' }
    },
    {
      id: 'prof-penduduk',
      title: 'Data Penduduk & Demografi',
      category: 'Profil',
      categoryBadge: 'Profil Desa',
      categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description: 'Jumlah penduduk 1.706 jiwa, 512 KK, mata pencaharian, dan tingkat pendidikan.',
      keywords: ['penduduk', 'demografi', 'jiwa', 'kk', 'jumlah', 'petani', 'warga', 'kepadatan', 'sensus'],
      route: { view: 'profil-detail', profilId: 'penduduk' }
    },

    // --- POTENSI DESA ---
    ...potensiList.map((p) => ({
      id: `pot-${p.id}`,
      title: p.title,
      category: 'Potensi' as const,
      categoryBadge: `Potensi (${p.subtitle})`,
      categoryColor: 'bg-amber-100 text-amber-800 border-amber-200',
      description: p.description,
      location: p.lokasi,
      image: p.image,
      keywords: [
        'potensi',
        p.title.toLowerCase(),
        p.subtitle.toLowerCase(),
        p.komoditas.toLowerCase(),
        ...p.description.toLowerCase().split(' ')
      ],
      route: p.id === 'umkm' ? { view: 'umkm-list' as const } : { view: 'potensi-detail' as const, potensiId: p.id }
    })),

    // --- UMKM DESA KEREP ---
    ...umkmList.map((u) => ({
      id: `umkm-${u.id}`,
      title: u.name,
      category: 'Potensi' as const,
      categoryBadge: `UMKM (${u.categoryBadge})`,
      categoryColor: 'bg-amber-100 text-amber-800 border-amber-200',
      subtitle: u.shortName,
      description: `${u.deskripsi} (Pemilik: ${u.pemilik}, Dusun: ${u.dusun})`,
      location: u.dusun,
      image: u.image,
      keywords: [
        'umkm',
        'usaha',
        u.name.toLowerCase(),
        u.shortName.toLowerCase(),
        u.categoryBadge.toLowerCase(),
        u.dusun.toLowerCase(),
        u.pemilik.toLowerCase(),
        ...u.produk.map((prod) => prod.toLowerCase()),
        ...u.deskripsi.toLowerCase().split(' ')
      ],
      route: { view: 'umkm-detail' as const, umkmId: u.id }
    })),

    // --- SEKOLAH & PENDIDIKAN ---
    ...sekolahList.map((s) => ({
      id: `sek-${s.id}`,
      title: s.name,
      category: 'Sekolah' as const,
      categoryBadge: `Sekolah (${s.badge})`,
      categoryColor: 'bg-blue-100 text-blue-800 border-blue-200',
      subtitle: s.shortName,
      description: `${s.jenjang} - ${s.alamat}. Akreditasi ${s.akreditasi}. Kepala Sekolah: ${s.kepalaSekolah}`,
      location: s.dusun,
      image: s.image,
      keywords: [
        'sekolah',
        'pendidikan',
        s.name.toLowerCase(),
        s.shortName.toLowerCase(),
        s.badge.toLowerCase(),
        s.npsn,
        s.status.toLowerCase(),
        s.kepalaSekolah.toLowerCase(),
        'guru',
        'siswa',
        'murid',
        'akreditasi'
      ],
      route: { view: 'sekolah-detail' as const, sekolahId: s.id }
    })),

    {
      id: 'sek-daftar',
      title: 'Sarana Pendidikan Desa',
      category: 'Sekolah',
      categoryBadge: 'Pendidikan',
      categoryColor: 'bg-blue-100 text-blue-800 border-blue-200',
      description: 'Daftar lengkap lembaga pendidikan SD, MI, TK, PAUD, dan TPQ di Desa Kerep.',
      keywords: ['sarana pendidikan', 'sekolah', 'lembaga', 'sd', 'mi', 'tk', 'paud', 'tpq'],
      route: { view: 'sarana-pendidikan' }
    },

    // --- FASILITAS DESA ---
    ...fasilitasCategories.flatMap((cat) => {
      // Category item search entry
      const catEntry: SearchResultItem = {
        id: `fas-cat-${cat.id}`,
        title: cat.title,
        category: 'Fasilitas',
        categoryBadge: 'Fasilitas',
        categoryColor: 'bg-rose-100 text-rose-800 border-rose-200',
        description: cat.description,
        keywords: ['fasilitas', cat.title.toLowerCase(), cat.id],
        route: cat.id === 'pendidikan' ? { view: 'sarana-pendidikan' } : { view: 'fasilitas-detail', fasilitasId: cat.id }
      };

      // Specific item entries
      const itemEntries: SearchResultItem[] = cat.items.map((item) => ({
        id: `fas-item-${item.id}`,
        title: item.name,
        category: 'Fasilitas',
        categoryBadge: cat.title,
        categoryColor: 'bg-rose-100 text-rose-800 border-rose-200',
        description: item.description,
        location: item.location,
        image: item.image,
        keywords: [
          'fasilitas',
          item.name.toLowerCase(),
          item.location.toLowerCase(),
          cat.title.toLowerCase(),
          ...item.description.toLowerCase().split(' ')
        ],
        route: cat.id === 'pendidikan' 
          ? { view: 'sarana-pendidikan' }
          : { view: 'fasilitas-detail', fasilitasId: cat.id }
      }));

      return [catEntry, ...itemEntries];
    }),

    // --- PETA, GALERI, KONTAK ---
    {
      id: 'nav-peta',
      title: 'Peta Interaktif Desa Kerep',
      category: 'Peta',
      categoryBadge: 'Peta',
      categoryColor: 'bg-purple-100 text-purple-800 border-purple-200',
      description: 'Peta wilayah OpenStreetMap dengan lokasi kantor desa, sekolah, masjid, dan potensi.',
      keywords: ['peta', 'lokasi', 'map', 'interaktif', 'koordinat', 'gis', 'openstreetmap', 'penanda'],
      route: { view: 'peta' }
    },
    {
      id: 'nav-galeri',
      title: 'Galeri Foto & Dokumentasi',
      category: 'Galeri',
      categoryBadge: 'Galeri',
      categoryColor: 'bg-teal-100 text-teal-800 border-teal-200',
      description: 'Dokumentasi foto kegiatan KKN, potensi alam, fasilitas, dan kebudayaan warga.',
      keywords: ['galeri', 'foto', 'gambar', 'dokumentasi', 'kegiatan', 'potensi', 'fasilitas'],
      route: { view: 'galeri' }
    },
    {
      id: 'nav-kontak',
      title: 'Kontak Balai Desa & Pelayanan',
      category: 'Kontak',
      categoryBadge: 'Kontak',
      categoryColor: 'bg-slate-100 text-slate-800 border-slate-200',
      description: 'Alamat Balai Desa, nomor telepon, email resmi, dan jam pelayanan publik.',
      keywords: ['kontak', 'telepon', 'email', 'alamat', 'balai desa', 'pelayanan', 'jam kerja', 'kades'],
      route: { view: 'kontak' }
    }
  ];

  // Remove duplicates by id
  const uniqueMap = new Map<string, SearchResultItem>();
  items.forEach((item) => {
    if (!uniqueMap.has(item.id)) {
      uniqueMap.set(item.id, item);
    }
  });

  return Array.from(uniqueMap.values());
};

export const searchItems = (query: string): SearchResultItem[] => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const index = getSearchIndex();
  const queryWords = trimmed.split(/\s+/).filter(Boolean);

  return index
    .map((item) => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      const locLower = (item.location || '').toLowerCase();
      const catLower = item.category.toLowerCase();

      // Exact title match gets massive score
      if (titleLower === trimmed) score += 100;
      else if (titleLower.startsWith(trimmed)) score += 60;
      else if (titleLower.includes(trimmed)) score += 40;

      // Word matching
      for (const word of queryWords) {
        if (titleLower.includes(word)) score += 20;
        if (catLower.includes(word)) score += 15;
        if (locLower.includes(word)) score += 10;
        if (descLower.includes(word)) score += 5;

        // Keyword matches
        for (const kw of item.keywords) {
          if (kw.includes(word)) score += 3;
        }
      }

      return { item, score };
    })
    .filter((res) => res.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((res) => res.item);
};
