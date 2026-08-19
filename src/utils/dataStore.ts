import {
  umkmList as defaultUmkmList,
  fasilitasCategories as defaultFacilityCategories,
  sekolahList as defaultSekolahList,
  galleryList as defaultGalleryList,
  mapMarkersList as defaultMapMarkersList,
  potensiList as defaultPotensiList,
  villageInfo as defaultVillageInfo,
  UmkmData,
  FacilityCategory,
  FacilityItem,
  SchoolData,
  GalleryItem as BaseGalleryItem,
  MapMarkerItem as BaseMapMarkerItem,
  PotentialData as BasePotentialData,
  PotentialItem
} from '../../assets/data/villageData';

export type {
  UmkmData,
  FacilityCategory,
  FacilityItem,
  SchoolData,
  PotentialItem
};

export interface GalleryItem extends BaseGalleryItem {
  description?: string;
}

export interface MapMarkerItem {
  id: string;
  name: string;
  category: 'kantor' | 'pendidikan' | 'ibadah' | 'kesehatan' | 'fasum' | 'potensi';
  categoryLabel?: string;
  lat: number;
  lng: number;
  address: string;
  image: string;
  color?: string;
  description?: string;
}

export interface PotentialData extends Partial<BasePotentialData> {
  id: string;
  title: string;
  description: string;
  image: string;
  points?: string[];
  subtitle?: string;
  lokasi?: string;
  komoditas?: string;
  sumber?: string;
  dokumentasi?: string[];
}

export type MapMarker = MapMarkerItem;
export type PotensiData = PotentialData;
export type DusunDetail = DusunItem;
export type PendudukData = PendudukDemografi;

export interface DusunItem {
  id: string;
  name: string;
  kepalaDusun: string;
  jumlahRt: number;
  jumlahRw: number;
  jumlahRT?: number;
  jumlahRW?: number;
  luasWilayah: string;
  karakteristik: string;
  potensiUtama: string;
  kontak: string;
  deskripsi?: string;
  potensi?: string[];
  image?: string;
  foto?: string;
}

export interface PekerjaanItem {
  sektor: string;
  label?: string;
  jumlah: number;
  persen?: string;
  persentase?: string;
}

export interface KelompokUsiaItem {
  label: string;
  kategori?: string;
  jumlah: number;
  persentase?: string;
  persen?: string;
}

export interface PendidikanItem {
  jenjang: string;
  jumlah: number;
  persentase: string;
}

export interface DusunDemografiStat {
  namaDusun: string;
  totalPenduduk: number;
  totalKk: number;
  lakiLaki: number;
  perempuan: number;
}

export interface PendudukDemografi {
  totalPenduduk: number;
  totalKk: number;
  kepalaKeluarga?: number;
  lakiLaki: number;
  perempuan: number;
  tahunData: string;
  sumber?: string;
  kepadatan?: string;
  pekerjaanUtama: PekerjaanItem[];
  piramidaUsia: KelompokUsiaItem[];
  pendidikan?: PendidikanItem[];
  persebaranDusun?: DusunDemografiStat[];
}

export interface BatasWilayahData {
  utara: string;
  selatan: string;
  timur: string;
  barat: string;
}

export interface StrukturPemerintahanData {
  kades: string;
  sekdes: string;
  kasiPemerintahan?: string;
  kasiKesejahteraan?: string;
  kasiPelayanan?: string;
  kaurTataUsaha: string;
  kaurKeuangan: string;
  kaurPerencanaan: string;
  kasunKerep: string;
  kasunCabak: string;
  kasunBalongasem: string;
}

export interface ProfilDesaData {
  nama: string;
  namaDesa?: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kodePos: string;
  luasWilayah: string;
  jumlahPenduduk: string;
  tahunPenduduk: string;
  mataPencaharian: string;
  kades: string;
  kepalaDesa?: string;
  balaiDesa?: string;
  telepon: string;
  email: string;
  jamPelayanan: string;
  motto: string;
  visi: string;
  misi: string[];
  sejarah: string;
  geografis: string;
  deskripsi?: string;
  batasWilayah: BatasWilayahData;
  strukturPemerintahan?: StrukturPemerintahanData;
  fotoBalaiDesa?: string;
  logoUrl?: string;
  fotoPeta?: string;
  fotoAparatur?: string;
}

const defaultDusunList: DusunItem[] = [
  {
    id: 'dusun-kerep',
    name: 'Dusun Kerep',
    kepalaDusun: 'Bambang',
    jumlahRt: 8,
    jumlahRw: 2,
    luasWilayah: '± 85 Ha',
    karakteristik: 'Pusat pemerintahan desa, permukiman tertata, sentra perdagangan & sarana pendidikan.',
    potensiUtama: 'Pertanian Padi IR-64, Hortikultura Sayur, UMKM Keripik Tempe, Balai Desa & SD Kerep',
    kontak: '0812-3344-5566'
  },
  {
    id: 'dusun-cabak',
    name: 'Dusun Cabak',
    kepalaDusun: 'Sugiharto',
    jumlahRt: 5,
    jumlahRw: 2,
    luasWilayah: '± 60 Ha',
    karakteristik: 'Kawasan lereng alami, terasering sawah berundak, kebun pisang & pondok pesantren.',
    potensiUtama: 'Padi Pegunungan, Kebun Pisang Kepok, Stik Ketela, Ponpes Al-Irsyadiyyah',
    kontak: '0821-7788-9900'
  },
  {
    id: 'dusun-balongasem',
    name: 'Dusun Balongasem',
    kepalaDusun: 'Suyoko',
    jumlahRt: 6,
    jumlahRw: 2,
    luasWilayah: '± 70 Ha',
    karakteristik: 'Kawasan persawahan subur, irigasi teknis, sentra peternakan kambing & UMKM kerajinan.',
    potensiUtama: 'Sentra UMKM & Kerajinan, Palawija Jagung, Peternakan Kambing PE',
    kontak: '0857-8899-0011'
  }
];

const defaultPendudukData: PendudukDemografi = {
  totalPenduduk: 3948,
  totalKk: 1210,
  kepalaKeluarga: 1210,
  lakiLaki: 1985,
  perempuan: 1963,
  tahunData: '2026',
  sumber: 'Data Registrasi Desa & Observasi KKN 2026',
  kepadatan: '± 1.836 Jiwa/km²',
  pekerjaanUtama: [
    { sektor: 'Pertanian & Buruh Tani', label: 'Pertanian & Buruh Tani', persentase: '58%', persen: '58%', jumlah: 2290 },
    { sektor: 'Pedagang & Pelaku UMKM', label: 'Pedagang & Pelaku UMKM', persentase: '18%', persen: '18%', jumlah: 710 },
    { sektor: 'Karyawan Swasta & Jasa', label: 'Karyawan Swasta & Jasa', persentase: '12%', persen: '12%', jumlah: 474 },
    { sektor: 'PNS, Guru, TNI & Polri', label: 'PNS, Guru, TNI & Polri', persentase: '4%', persen: '4%', jumlah: 158 },
    { sektor: 'Pertukangan & Kerajinan', label: 'Pertukangan & Kerajinan', persentase: '5%', persen: '5%', jumlah: 197 },
    { sektor: 'Lainnya / Pelajar / Pensiun', label: 'Lainnya / Pelajar / Pensiun', persentase: '3%', persen: '3%', jumlah: 119 }
  ],
  piramidaUsia: [
    { label: 'Balita (0 - 4 Tahun)', kategori: 'Balita', jumlah: 284, persentase: '7.2%', persen: '7.2%' },
    { label: 'Anak-Anak (5 - 14 Tahun)', kategori: 'Anak-Anak', jumlah: 545, persentase: '13.8%', persen: '13.8%' },
    { label: 'Usia Muda / Remaja (15 - 24 Tahun)', kategori: 'Remaja', jumlah: 680, persentase: '17.2%', persen: '17.2%' },
    { label: 'Usia Produktif Dewasa (25 - 54 Tahun)', kategori: 'Dewasa', jumlah: 1590, persentase: '40.3%', persen: '40.3%' },
    { label: 'Pra-Lansia (55 - 64 Tahun)', kategori: 'Pra-Lansia', jumlah: 335, persentase: '8.5%', persen: '8.5%' },
    { label: 'Lansia (65+ Tahun)', kategori: 'Lansia', jumlah: 514, persentase: '13.0%', persen: '13.0%' }
  ],
  pendidikan: [
    { jenjang: 'Belum / Tidak Sekolah', jumlah: 310, persentase: '7.9%' },
    { jenjang: 'Tamat SD / Sederajat', jumlah: 1420, persentase: '36.0%' },
    { jenjang: 'Tamat SMP / Sederajat', jumlah: 1050, persentase: '26.6%' },
    { jenjang: 'Tamat SMA / SMK / Sederajat', jumlah: 928, persentase: '23.5%' },
    { jenjang: 'Diploma & Sarjana (D3/S1/S2)', jumlah: 240, persentase: '6.0%' }
  ],
  persebaranDusun: [
    { namaDusun: 'Dusun Kerep (8 RT / 2 RW)', totalPenduduk: 1680, totalKk: 510, lakiLaki: 845, perempuan: 835 },
    { namaDusun: 'Dusun Balongasem (6 RT / 2 RW)', totalPenduduk: 1320, totalKk: 410, lakiLaki: 665, perempuan: 655 },
    { namaDusun: 'Dusun Cabak (5 RT / 2 RW)', totalPenduduk: 948, totalKk: 290, lakiLaki: 475, perempuan: 473 }
  ]
};

const defaultProfilDesa: ProfilDesaData = {
  nama: defaultVillageInfo.nama,
  namaDesa: defaultVillageInfo.nama,
  kecamatan: defaultVillageInfo.kecamatan,
  kabupaten: defaultVillageInfo.kabupaten,
  provinsi: defaultVillageInfo.provinsi,
  kodePos: defaultVillageInfo.kodePos,
  luasWilayah: defaultVillageInfo.luasWilayah,
  jumlahPenduduk: "3.948",
  tahunPenduduk: "2025",
  mataPencaharian: defaultVillageInfo.mataPencaharian,
  kades: 'Bapak Kepala Desa Kerep',
  kepalaDesa: 'Bapak Kepala Desa Kerep',
  balaiDesa: 'Dusun Kerep, Desa Kerep, Kec. Tarokan, Kab. Kediri (64174)',
  telepon: defaultVillageInfo.telepon,
  email: defaultVillageInfo.email,
  jamPelayanan: defaultVillageInfo.jamPelayanan,
  motto: defaultVillageInfo.motto,
  deskripsi: 'Desa Kerep merupakan salah satu desa agraris berpotensi unggul di Kecamatan Tarokan, Kabupaten Kediri. Memiliki hamparan persawahan subur, sentra UMKM, dan keharmonisan sosial masyarakat yang erat.',
  visi: 'Terwujudnya Desa Kerep yang Maju, Sejahtera, Mandiri, dan Berbudaya berbasis Pertanian dan Kemitraan Masyarakat.',
  misi: [
    'Mewujudkan tata kelola pemerintahan desa yang transparan, akuntabel, dan melayani masyarakat secara maksimal.',
    'Meningkatkan perekonomian desa melalui pemberdayaan sektor pertanian, peternakan, dan UMKM lokal.',
    'Meningkatkan kualitas dan aksesibilitas sarana pendidikan, kesehatan, dan infrastruktur umum desa.',
    'Melestarikan nilai-nilai kebudayaan lokal, keagamaan, serta tradisi gotong royong warga Desa Kerep.'
  ],
  sejarah: 'Sejarah babad lahirnya Desa Kerep berakar dari nilai kerukunan dan kegotongroyongan warga. Kurang lebih pada tahun 1892-1938 kepala desa Kerep dijabat oleh seorang pria bernama Parto Ngulomo yang mana beliau menjabat sampai meninggal dunia karena waktu itu masih berlaku jabatan kepala desa seumur hidup dan kemudian disusul kepala desa berikutnya yang dijabat oleh Cipto Diharjo dan seterusnya.\n\nSecara turun-temurun warga Desa Kerep mengelola lahan sawah dengan sistem irigasi kemasyarakatan. Di Dusun Cabak terdapat punden bernama Syekh Zainudin Zaenuri (dikenal dengan sebutan Mbah Gedong) yang sudah ada sebelum adanya pemerintahan Desa Kerep, dengan budaya lestari yaitu bersih dusun/sedekah bumi dan pertunjukkan kesenian wayang kulit.',
  geografis: 'Desa Kerep terletak di bagian barat Kabupaten Kediri di dataran subur lereng Gunung Wilis. Topografi wilayah didominasi persawahan teknis beririgasi baik dan pemukiman yang tersebar di 3 dusun utama dengan iklim tropis yang sejuk.',
  batasWilayah: {
    utara: 'Desa Bulusari & Wilayah Kab. Nganjuk',
    selatan: 'Desa Cerme',
    timur: 'Desa Tarokan',
    barat: 'Kawasan Perhutani / Perbukitan'
  },
  strukturPemerintahan: {
    kades: 'HERMAN',
    sekdes: 'REVITA',
    kasiPemerintahan: 'TRI. H',
    kasiKesejahteraan: 'Sugiharto',
    kasiPelayanan: 'Itsna. A',
    kaurTataUsaha: 'Pipit. SL',
    kaurKeuangan: 'Sujono',
    kaurPerencanaan: 'Teguh. S',
    kasunKerep: 'Bambang',
    kasunCabak: 'Sugiharto',
    kasunBalongasem: 'Suyoko'
  }
};

const STORAGE_KEYS = {
  UMKM: 'kerep_umkm_list',
  FACILITIES: 'kerep_facilities_categories',
  SCHOOLS: 'kerep_schools_list',
  GALLERY: 'kerep_gallery_list',
  MARKERS: 'kerep_map_markers',
  POTENSI: 'kerep_potensi_list',
  VILLAGE_INFO: 'kerep_village_info',
  DUSUN: 'kerep_dusun_list',
  PENDUDUK: 'kerep_penduduk_data'
};

const DISPATCH_EVENT = 'desa-data-updated';

function notifyUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(DISPATCH_EVENT));
  }
}

// ---------------- UMKM STORE ----------------
export function getStoredUmkmList(): UmkmData[] {
  if (typeof window === 'undefined') return defaultUmkmList;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.UMKM);
    if (!data) return defaultUmkmList;
    const parsed = JSON.parse(data);
    // If legacy dummy items are stored without the new factories, update to new list
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      parsed.some((u: UmkmData) => u.id === 'anyaman-bambu') &&
      !parsed.some((u: UmkmData) => u.id === 'pabrik-ud-rigid-box')
    ) {
      localStorage.setItem(STORAGE_KEYS.UMKM, JSON.stringify(defaultUmkmList));
      return defaultUmkmList;
    }
    return parsed;
  } catch {
    return defaultUmkmList;
  }
}

export function saveUmkmItem(item: UmkmData): void {
  const current = getStoredUmkmList();
  const existingIdx = current.findIndex((u) => u.id === item.id);
  let updated: UmkmData[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = item;
  } else {
    updated = [item, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.UMKM, JSON.stringify(updated));
  notifyUpdate();
}

export function deleteUmkmItem(id: string): void {
  const current = getStoredUmkmList();
  const updated = current.filter((u) => u.id !== id);
  localStorage.setItem(STORAGE_KEYS.UMKM, JSON.stringify(updated));
  notifyUpdate();
}

// ---------------- FACILITIES STORE ----------------
export function getStoredFacilityCategories(): FacilityCategory[] {
  if (typeof window === 'undefined') return defaultFacilityCategories;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FACILITIES);
    if (!data) return defaultFacilityCategories;
    return JSON.parse(data);
  } catch {
    return defaultFacilityCategories;
  }
}

export function saveFacilityItem(categoryId: string, item: FacilityItem): void {
  const categories = getStoredFacilityCategories();
  const catIdx = categories.findIndex((c) => c.id === categoryId);
  if (catIdx === -1) return;

  const targetCategory = { ...categories[catIdx] };
  targetCategory.items = targetCategory.items ? [...targetCategory.items] : [];
  const existingItemIdx = targetCategory.items.findIndex((it) => it.id === item.id);
  if (existingItemIdx >= 0) {
    targetCategory.items[existingItemIdx] = item;
  } else {
    targetCategory.items = [item, ...targetCategory.items];
  }
  targetCategory.countBadge = `${targetCategory.items.length} Lokasi`;

  const updatedCategories = [...categories];
  updatedCategories[catIdx] = targetCategory;
  localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(updatedCategories));
  notifyUpdate();
}

export function deleteFacilityItem(categoryId: string, itemId: string): void {
  const categories = getStoredFacilityCategories();
  const catIdx = categories.findIndex((c) => c.id === categoryId);
  if (catIdx === -1) return;

  const targetCategory = { ...categories[catIdx] };
  targetCategory.items = targetCategory.items.filter((it) => it.id !== itemId);
  targetCategory.countBadge = `${targetCategory.items.length} Lokasi`;

  const updatedCategories = [...categories];
  updatedCategories[catIdx] = targetCategory;
  localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(updatedCategories));
  notifyUpdate();
}

// ---------------- SCHOOLS STORE ----------------
export function getStoredSchoolsList(): SchoolData[] {
  if (typeof window === 'undefined') return defaultSekolahList;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SCHOOLS);
    if (!data) return defaultSekolahList;
    return JSON.parse(data);
  } catch {
    return defaultSekolahList;
  }
}

export function saveSchoolItem(school: SchoolData): void {
  const current = getStoredSchoolsList();
  const existingIdx = current.findIndex((s) => s.id === school.id);
  let updated: SchoolData[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = school;
  } else {
    updated = [school, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.SCHOOLS, JSON.stringify(updated));
  notifyUpdate();
}

export function deleteSchoolItem(id: string): void {
  const current = getStoredSchoolsList();
  const updated = current.filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.SCHOOLS, JSON.stringify(updated));
  notifyUpdate();
}

// ---------------- GALLERY STORE ----------------
export function getStoredGalleryList(): GalleryItem[] {
  if (typeof window === 'undefined') return defaultGalleryList;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (!data) return defaultGalleryList;
    const parsed: GalleryItem[] = JSON.parse(data);
    // Filter out removed items such as gal-8 / Pendataan Lapangan
    return parsed.filter((item) => item.id !== 'gal-8' && !item.title.toLowerCase().includes('pendataan lapangan'));
  } catch {
    return defaultGalleryList;
  }
}

export function saveGalleryItem(item: GalleryItem): void {
  const current = getStoredGalleryList();
  const existingIdx = current.findIndex((g) => g.id === item.id);
  let updated: GalleryItem[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = item;
  } else {
    updated = [item, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
  notifyUpdate();
}

export function deleteGalleryItem(id: string): void {
  const current = getStoredGalleryList();
  const updated = current.filter((g) => g.id !== id);
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(updated));
  notifyUpdate();
}

// ---------------- MAP MARKERS STORE ----------------
export function getStoredMapMarkersList(): MapMarkerItem[] {
  if (typeof window === 'undefined') return defaultMapMarkersList;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MARKERS);
    if (!data) return defaultMapMarkersList;
    return JSON.parse(data);
  } catch {
    return defaultMapMarkersList;
  }
}

export function saveMapMarker(marker: MapMarkerItem): void {
  const current = getStoredMapMarkersList();
  const existingIdx = current.findIndex((m) => m.id === marker.id);
  let updated: MapMarkerItem[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = marker;
  } else {
    updated = [marker, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.MARKERS, JSON.stringify(updated));
  notifyUpdate();
}

export function deleteMapMarker(id: string): void {
  const current = getStoredMapMarkersList();
  const updated = current.filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEYS.MARKERS, JSON.stringify(updated));
  notifyUpdate();
}

export const saveMapMarkerItem = saveMapMarker;
export const deleteMapMarkerItem = deleteMapMarker;

// ---------------- POTENSI DESA STORE ----------------
export function getStoredPotensiList(): PotentialData[] {
  if (typeof window === 'undefined') return defaultPotensiList;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.POTENSI);
    if (!data) return defaultPotensiList;
    return JSON.parse(data);
  } catch {
    return defaultPotensiList;
  }
}

export function savePotensiCategory(category: PotentialData): void {
  const current = getStoredPotensiList();
  const existingIdx = current.findIndex((p) => p.id === category.id);
  let updated: PotentialData[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = category;
  } else {
    updated = [...current, category];
  }
  localStorage.setItem(STORAGE_KEYS.POTENSI, JSON.stringify(updated));
  notifyUpdate();
}

export function saveDusunPotensiItem(potensiId: string, subItem: PotentialItem): void {
  const current = getStoredPotensiList();
  const pIdx = current.findIndex((p) => p.id === potensiId);
  if (pIdx === -1) return;

  const targetCategory = { ...current[pIdx] };
  const items = targetCategory.items ? [...targetCategory.items] : [];
  const existingSubIdx = items.findIndex((i) => i.id === subItem.id);
  if (existingSubIdx >= 0) {
    items[existingSubIdx] = subItem;
  } else {
    items.push(subItem);
  }
  targetCategory.items = items;

  const updated = [...current];
  updated[pIdx] = targetCategory;
  localStorage.setItem(STORAGE_KEYS.POTENSI, JSON.stringify(updated));
  notifyUpdate();
}

export function deleteDusunPotensiItem(potensiId: string, subItemId: string): void {
  const current = getStoredPotensiList();
  const pIdx = current.findIndex((p) => p.id === potensiId);
  if (pIdx === -1) return;

  const targetCategory = { ...current[pIdx] };
  if (!targetCategory.items) return;
  targetCategory.items = targetCategory.items.filter((i) => i.id !== subItemId);

  const updated = [...current];
  updated[pIdx] = targetCategory;
  localStorage.setItem(STORAGE_KEYS.POTENSI, JSON.stringify(updated));
  notifyUpdate();
}

export function deletePotensiCategory(id: string): void {
  const current = getStoredPotensiList();
  const updated = current.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.POTENSI, JSON.stringify(updated));
  notifyUpdate();
}

export const deletePotensiItem = deletePotensiCategory;
export const savePotensiItem = savePotensiCategory;

// ---------------- PROFIL & VILLAGE INFO STORE ----------------
export function getStoredProfilData(): ProfilDesaData {
  if (typeof window === 'undefined') return defaultProfilDesa;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.VILLAGE_INFO);
    if (!data) return defaultProfilDesa;
    const parsed = { ...defaultProfilDesa, ...JSON.parse(data) };
    if (parsed.strukturPemerintahan) {
      // Clean up any title if present
      if (parsed.strukturPemerintahan.kasiKesejahteraan === 'Sugiharto, S.Pd') {
        parsed.strukturPemerintahan.kasiKesejahteraan = 'Sugiharto';
      }
    }
    return parsed;
  } catch {
    return defaultProfilDesa;
  }
}

export function saveProfilData(data: Partial<ProfilDesaData>): void {
  const current = getStoredProfilData();
  const updated = { ...current, ...data };
  localStorage.setItem(STORAGE_KEYS.VILLAGE_INFO, JSON.stringify(updated));
  notifyUpdate();
}

export const getStoredProfilDesa = getStoredProfilData;
export const saveProfilDesaData = saveProfilData;

// ---------------- DUSUN STORE ----------------
export function getStoredDusunList(): DusunItem[] {
  if (typeof window === 'undefined') return defaultDusunList;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DUSUN);
    if (!data) return defaultDusunList;
    return JSON.parse(data);
  } catch {
    return defaultDusunList;
  }
}

export function saveDusunItem(item: DusunItem): void {
  const current = getStoredDusunList();
  const existingIdx = current.findIndex((d) => d.id === item.id);
  let updated: DusunItem[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = item;
  } else {
    updated = [...current, item];
  }
  localStorage.setItem(STORAGE_KEYS.DUSUN, JSON.stringify(updated));
  notifyUpdate();
}

export function deleteDusunItem(id: string): void {
  const current = getStoredDusunList();
  const updated = current.filter((d) => d.id !== id);
  localStorage.setItem(STORAGE_KEYS.DUSUN, JSON.stringify(updated));
  notifyUpdate();
}

// ---------------- PENDUDUK DEMOGRAFI STORE ----------------
export function getStoredPendudukData(): PendudukDemografi {
  if (typeof window === 'undefined') return defaultPendudukData;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PENDUDUK);
    if (!data) return defaultPendudukData;
    return JSON.parse(data);
  } catch {
    return defaultPendudukData;
  }
}

export function savePendudukData(data: Partial<PendudukDemografi>): void {
  const current = getStoredPendudukData();
  const updated = { ...current, ...data };
  localStorage.setItem(STORAGE_KEYS.PENDUDUK, JSON.stringify(updated));
  notifyUpdate();
}

// ---------------- RESET ALL TO DEFAULT ----------------
export function resetAllDataToDefault(): void {
  localStorage.removeItem(STORAGE_KEYS.UMKM);
  localStorage.removeItem(STORAGE_KEYS.FACILITIES);
  localStorage.removeItem(STORAGE_KEYS.SCHOOLS);
  localStorage.removeItem(STORAGE_KEYS.GALLERY);
  localStorage.removeItem(STORAGE_KEYS.MARKERS);
  localStorage.removeItem(STORAGE_KEYS.POTENSI);
  localStorage.removeItem(STORAGE_KEYS.VILLAGE_INFO);
  localStorage.removeItem(STORAGE_KEYS.DUSUN);
  localStorage.removeItem(STORAGE_KEYS.PENDUDUK);
  notifyUpdate();
}

// ---------------- EXPORT JSON ----------------
export function exportAllDataJson(): string {
  const exportPayload = {
    exportDate: new Date().toISOString(),
    village: 'Desa Kerep, Tarokan, Kediri',
    profil: getStoredProfilData(),
    penduduk: getStoredPendudukData(),
    dusun: getStoredDusunList(),
    potensi: getStoredPotensiList(),
    umkm: getStoredUmkmList(),
    facilities: getStoredFacilityCategories(),
    schools: getStoredSchoolsList(),
    gallery: getStoredGalleryList(),
    mapMarkers: getStoredMapMarkersList()
  };
  return JSON.stringify(exportPayload, null, 2);
}

// ---------------- IMPORT JSON ----------------
export function importAllDataJson(jsonString: string): { success: boolean; message: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, message: 'Format data JSON tidak valid' };
    }
    if (parsed.profil) {
      localStorage.setItem(STORAGE_KEYS.VILLAGE_INFO, JSON.stringify(parsed.profil));
    }
    if (parsed.penduduk) {
      localStorage.setItem(STORAGE_KEYS.PENDUDUK, JSON.stringify(parsed.penduduk));
    }
    if (parsed.dusun && Array.isArray(parsed.dusun)) {
      localStorage.setItem(STORAGE_KEYS.DUSUN, JSON.stringify(parsed.dusun));
    }
    if (parsed.potensi && Array.isArray(parsed.potensi)) {
      localStorage.setItem(STORAGE_KEYS.POTENSI, JSON.stringify(parsed.potensi));
    }
    if (parsed.umkm && Array.isArray(parsed.umkm)) {
      localStorage.setItem(STORAGE_KEYS.UMKM, JSON.stringify(parsed.umkm));
    }
    if (parsed.facilities && Array.isArray(parsed.facilities)) {
      localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(parsed.facilities));
    }
    if (parsed.schools && Array.isArray(parsed.schools)) {
      localStorage.setItem(STORAGE_KEYS.SCHOOLS, JSON.stringify(parsed.schools));
    }
    if (parsed.gallery && Array.isArray(parsed.gallery)) {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(parsed.gallery));
    }
    if (parsed.mapMarkers && Array.isArray(parsed.mapMarkers)) {
      localStorage.setItem(STORAGE_KEYS.MARKERS, JSON.stringify(parsed.mapMarkers));
    }
    notifyUpdate();
    return { success: true, message: 'Data cadangan berhasil diimpor sepenuhnya!' };
  } catch (err) {
    console.error('Import failed', err);
    return { success: false, message: 'Gagal memproses file JSON. Pastikan struktur data valid.' };
  }
}

export const resetDataToDefault = resetAllDataToDefault;
export const exportAllDataAsJSON = exportAllDataJson;
export const importDataFromJSON = importAllDataJson;

// ---------------- SUBSCRIBE HELPER ----------------
export function subscribeDataUpdate(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(DISPATCH_EVENT, callback);
  return () => {
    window.removeEventListener(DISPATCH_EVENT, callback);
  };
}
