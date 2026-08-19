import React from 'react';
import {
  MapPin,
  User,
  Users,
  Maximize2,
  Home as HomeIcon,
  Briefcase,
  Calendar,
  ArrowRight,
  BookOpen,
  Compass,
  Building,
  Target,
  HeartPulse,
  GraduationCap,
  Landmark,
  Building2,
  Volleyball,
  PlusCircle,
  Map as MapIcon,
  Image as ImageIcon,
  Sprout,
  Trees,
  ShoppingBag
} from 'lucide-react';
import { RouteState } from '../types';
import { potensiList, villageInfo, galleryList } from '../../assets/data/villageData';
import { WeatherWidget } from '../components/WeatherWidget';
import { getAssetUrl } from '../utils/imageHelper';
import heroBgImage from '../assets/images/PEMANDANGAN.png';
import imgPertanian from '../assets/images/pertanian.jpg';
import imgPeternakan from '../assets/images/peternakan.jpg';
import imgLingkungan from '../assets/images/lingkungan.jpg';
import imgToga from '../assets/images/toga.jpg';
import imgBudaya from '../assets/images/budaya.jpg';
import imgUmkm from '../assets/images/umkm.jpg';

const POTENSI_IMAGES: Record<string, string> = {
  pertanian: imgPertanian,
  peternakan: imgPeternakan,
  lingkungan: imgLingkungan,
  toga: imgToga,
  budaya: imgBudaya,
  umkm: imgUmkm
};

interface HomeViewProps {
  onNavigate: (route: RouteState) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="pb-24 space-y-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-emerald-950 text-white rounded-b-3xl shadow-lg min-h-[240px]">
        {/* Background Landscape Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src={"pemandangan.jpeg"}
            alt="Pemandangan Pegunungan Wilis Desa Kerep Tarokan Kediri"
            className="w-full h-full object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-700"
          />
          {/* Gradients for text readability while keeping the scenery bright and clear */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 px-5 sm:px-8 py-8 sm:py-12 max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            <span>Kecamatan Tarokan, Kabupaten Kediri</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white uppercase drop-shadow-md">
              PETA DIGITAL DESA KEREP
            </h2>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal opacity-95 max-w-xl drop-shadow-sm">
              Informasi wilayah, potensi, fasilitas, dan kehidupan masyarakat Desa Kerep dalam satu peta interaktif terpadu.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 max-w-md">
            <button
              onClick={() => onNavigate({ view: 'peta' })}
              className="flex-1 min-w-[140px] bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer border border-emerald-600/40"
            >
              <MapPin className="w-4 h-4 text-emerald-300 fill-emerald-300/20" />
              <span>Jelajahi Peta</span>
            </button>
            <button
              onClick={() => onNavigate({ view: 'profil' })}
              className="flex-1 min-w-[140px] bg-white/95 hover:bg-white text-slate-900 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-700" />
              <span>Profil Desa</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Stats Grid */}
        <section className="grid grid-cols-3 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-center flex flex-col items-center justify-center hover:border-emerald-300 transition-colors">
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center mb-1.5 text-emerald-800">
              <HomeIcon className="w-5 h-5" />
            </div>
            <span className="text-lg sm:text-2xl font-extrabold text-slate-800 leading-none">3</span>
            <span className="text-xs text-slate-500 font-medium mt-1">Dusun</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-center flex flex-col items-center justify-center hover:border-emerald-300 transition-colors">
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center mb-1.5 text-emerald-800">
              <Maximize2 className="w-5 h-5" />
            </div>
            <span className="text-sm sm:text-xl font-extrabold text-slate-800 leading-none">± 215 Ha</span>
            <span className="text-xs text-slate-500 font-medium mt-1">Luas Wilayah</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-center flex flex-col items-center justify-center hover:border-emerald-300 transition-colors">
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center mb-1.5 text-emerald-800">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-sm sm:text-xl font-extrabold text-slate-800 leading-none">3.948</span>
            <span className="text-xs text-slate-500 font-medium mt-1">Penduduk (2025)</span>
          </div>
        </section>

        {/* Weather Forecast Widget */}
        <WeatherWidget />

        {/* Secondary Info Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5 hover:border-slate-300 transition-colors">
            <div className="w-11 h-11 bg-amber-50/90 border border-amber-100 rounded-xl flex items-center justify-center shrink-0 text-amber-800">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 block leading-tight">Mayoritas</span>
              <span className="text-sm font-bold text-slate-900 block leading-tight mt-0.5">Mata Pencaharian</span>
              <span className="text-sm font-bold text-emerald-800 block leading-tight mt-0.5">Petani</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5 hover:border-slate-300 transition-colors">
            <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shrink-0 text-blue-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 block leading-tight">Terakhir Diperbarui</span>
              <span className="text-sm font-bold text-slate-900 block leading-tight mt-0.5">01 Juli 2026</span>
              <span className="text-xs text-slate-500 block leading-tight mt-0.5">(Observasi KKN)</span>
            </div>
          </div>
        </section>
        {/* POTENSI DESA KEREP Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-black tracking-wide uppercase text-slate-800">
              POTENSI DESA KEREP
            </h3>
            <button
              onClick={() => onNavigate({ view: 'potensi' })}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {potensiList.map((potensi) => (
              <button
                key={potensi.id}
                onClick={() => {
                  if (potensi.id === 'umkm') {
                    onNavigate({ view: 'umkm-list' });
                  } else {
                    onNavigate({ view: 'potensi-detail', potensiId: potensi.id });
                  }
                }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:border-emerald-500 hover:shadow-xs transition-all text-left flex flex-col group focus:outline-hidden cursor-pointer"
              >
                <div className="h-24 sm:h-28 bg-emerald-50/80 overflow-hidden relative flex items-center justify-center">
                  {(POTENSI_IMAGES[potensi.id] || potensi.image) ? (
                    <>
                      <img
                        src={getAssetUrl(potensi.image) || POTENSI_IMAGES[potensi.id]}
                        alt={potensi.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-emerald-50 flex items-center justify-center text-emerald-800">
                      {potensi.id === 'pertanian' ? (
                        <Sprout className="w-8 h-8 text-emerald-700" />
                      ) : (
                        <Trees className="w-8 h-8 text-emerald-700" />
                      )}
                    </div>
                  )}
                </div>
                <div className="p-2.5 text-center flex-1 flex items-center justify-center">
                  <span className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight">
                    {potensi.subtitle}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* PROFIL & INFORMASI DESA Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-black tracking-wide uppercase text-slate-800">
              PROFIL & INFORMASI DESA
            </h3>
            <button
              onClick={() => onNavigate({ view: 'profil' })}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {[
              { id: 'tentang', label: 'Profil Desa', icon: HomeIcon, route: { view: 'profil' as const } },
              { id: 'visi-misi', label: 'Visi & Misi', icon: Target, route: { view: 'profil-detail' as const, profilId: 'visi-misi' } },
              { id: 'sejarah', label: 'Sejarah Desa', icon: BookOpen, route: { view: 'profil-detail' as const, profilId: 'sejarah' } },
              { id: 'geografis', label: 'Kondisi Geografis', icon: Compass, route: { view: 'profil-detail' as const, profilId: 'geografis' } },
              { id: 'pemerintahan', label: 'Pemerintahan', icon: Building, route: { view: 'profil-detail' as const, profilId: 'pemerintahan' } },
              { id: 'penduduk', label: 'Data Penduduk', icon: Users, route: { view: 'profil-detail' as const, profilId: 'penduduk' } }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.route)}
                  className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-600 transition-all flex flex-col items-center text-center gap-1.5 focus:outline-hidden"
                >
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-800">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 leading-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* FASILITAS DESA Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-black tracking-wide uppercase text-slate-800">
              FASILITAS DESA
            </h3>
            <button
              onClick={() => onNavigate({ view: 'fasilitas' })}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {[
              { id: 'kesehatan', label: 'Sarana Kesehatan', icon: HeartPulse, route: { view: 'fasilitas-detail' as const, fasilitasId: 'kesehatan' } },
              { id: 'pendidikan', label: 'Sarana Pendidikan', icon: GraduationCap, route: { view: 'sarana-pendidikan' as const } },
              { id: 'peribadatan', label: 'Sarana Peribadatan', icon: Landmark, route: { view: 'fasilitas-detail' as const, fasilitasId: 'peribadatan' } },
              { id: 'umum', label: 'Fasilitas Umum', icon: Building2, route: { view: 'fasilitas-detail' as const, fasilitasId: 'umum' } },
              { id: 'olahraga', label: 'Fasilitas Olahraga', icon: Volleyball, route: { view: 'fasilitas-detail' as const, fasilitasId: 'olahraga' } },
              { id: 'lainnya', label: 'Fasilitas Lainnya', icon: PlusCircle, route: { view: 'fasilitas-detail' as const, fasilitasId: 'lainnya' } }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.route)}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-600 hover:shadow-xs transition-all flex flex-col items-center text-center gap-2 focus:outline-hidden cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-800 group-hover:bg-emerald-100 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Featured Highlights Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Pendidikan */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col hover:border-slate-300 transition-all">
            <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">PENDIDIKAN</p>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">SDN Kerep</span>
            </div>
            <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
              <div
                onClick={() => onNavigate({ view: 'sekolah-detail', sekolahId: 'sd-kerep' })}
                className="cursor-pointer group"
              >
                <div className="h-28 bg-slate-100 rounded-xl overflow-hidden mb-2">
                  <img src="/assets/images/sd-kerep.jpg" alt="SD Negeri Kerep" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">SD Negeri Kerep</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">Lembaga pendidikan formal utama pencetak generasi unggul Desa Kerep.</p>
              </div>
              <div className="flex items-center justify-between text-xs text-emerald-800 pt-2 border-t border-slate-100 font-semibold">
                <button
                  onClick={() => onNavigate({ view: 'peta' })}
                  className="hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <MapIcon className="w-3.5 h-3.5" /> Lihat di Peta
                </button>
                <button
                  onClick={() => onNavigate({ view: 'sarana-pendidikan' })}
                  className="hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Detail Sekolah →
                </button>
              </div>
            </div>
          </div>

          {/* UMKM */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col hover:border-slate-300 transition-all">
            <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">UMKM & EKONOMI</p>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">Kreatif</span>
            </div>
            <div
              onClick={() => onNavigate({ view: 'umkm-list' })}
              className="p-3.5 cursor-pointer flex-1 flex flex-col justify-between group"
            >
              <div className="h-28 bg-emerald-50 border border-emerald-100 rounded-xl flex flex-col items-center justify-center text-emerald-800 mb-2 group-hover:bg-emerald-100/80 transition-colors">
                <ShoppingBag className="w-8 h-8 text-emerald-700 mb-1" />
                <span className="text-xs font-bold text-emerald-900">Sentra UMKM Lokal</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                Ragam produk usaha mikro, kerajinan lokal, dan olahan pangan khas UMKM Desa Kerep.
              </p>
              <p className="text-xs font-bold text-emerald-800 pt-2 text-center group-hover:translate-x-0.5 transition-transform">Lihat Direktori UMKM →</p>
            </div>
          </div>

          {/* Galeri Kegiatan */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col hover:border-slate-300 transition-all">
            <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">GALERI KEGIATAN</p>
              <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded-full">Foto</span>
            </div>
            <div
              onClick={() => onNavigate({ view: 'galeri' })}
              className="p-3.5 cursor-pointer flex-1 flex flex-col justify-between group"
            >
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                {galleryList.slice(0, 4).map((g, idx) => (
                  <div key={idx} className="h-13 bg-slate-100 rounded-lg overflow-hidden">
                    <img src={getAssetUrl(g.image)} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-emerald-800 text-center pt-2 group-hover:translate-x-0.5 transition-transform">Buka Galeri Foto Lengkap →</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
