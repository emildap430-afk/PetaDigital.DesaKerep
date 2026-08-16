export type ViewMode =
  | 'beranda'
  | 'profil'
  | 'profil-detail'
  | 'potensi'
  | 'potensi-detail'
  | 'umkm-list'
  | 'umkm-detail'
  | 'fasilitas'
  | 'fasilitas-detail'
  | 'sarana-pendidikan'
  | 'sekolah-detail'
  | 'peta'
  | 'galeri'
  | 'kontak'
  | 'admin'
  | 'admin-login';

export interface RouteState {
  view: ViewMode;
  profilId?: string; // e.g. 'tentang', 'visi-misi', 'sejarah', 'geografis', 'pemerintahan', 'penduduk'
  potensiId?: string; // e.g. 'pertanian', 'peternakan', 'masyarakat', 'umkm', 'lingkungan', 'budaya'
  potensiDusunId?: string; // e.g. 'pertanian-kerep', 'pertanian-balongasem', 'pertanian-cabak'
  umkmId?: string; // e.g. 'anyaman-bambu', 'keripik-tempe-bu-sri', etc.
  fasilitasId?: string; // e.g. 'kesehatan', 'pendidikan', 'peribadatan', 'umum', 'olahraga', 'lainnya'
  fasilitasItemId?: string; // e.g. 'balai-desa', 'poskesdes', etc.
  sekolahId?: string; // e.g. 'sd-kerep', 'mi-darul-huda', 'tk-dharma-wanita', 'ponpes-al-irsyadiyyah'
  adminTab?: string; // e.g. 'overview', 'profil', 'potensi', 'umkm', 'pendidikan', 'fasilitas', 'peta', 'galeri', 'dusun', 'penduduk', 'settings'
}

export interface BreadcrumbItem {
  label: string;
  target?: RouteState;
}
