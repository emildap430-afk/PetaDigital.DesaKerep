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
import heroBgImage from '../assets/images/desa_kerep_hero_1786855243837.jpg';

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
            src={heroBgImage || "/assets/images/desa_kerep_hero_1786855243837.jpg"}
            alt="Pemandangan Desa Kerep Tarokan Kediri"
            className="w-full h-full object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-700"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop") {
                target.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop";
              }
            }}
          />
          {/* Gradients for text readability while keeping the scenery bright and clear */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 px-5 py-7 max-w-md mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-emerald-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            <span>Kecamatan Tarokan, Kabupaten Kediri</span>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-black tracking-tight leading-tight text-white uppercase drop-shadow-md">
              PETA DIGITAL<br />DESA KEREP
            </h2>
            <p className="text-xs text-slate-100 leading-relaxed font-normal opacity-95 max-w-xs drop-shadow-sm">
              Informasi wilayah, potensi, fasilitas, dan kehidupan masyarakat Desa Kerep dalam satu peta interaktif.
            </p>
          </div>

          <div className="flex items-center gap-2.5 pt-1.5">
            <button
              onClick={() => onNavigate({ view: 'peta' })}
              className="flex-1 bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all cursor-pointer border border-emerald-600/40"
            >
              <MapPin className="w-4 h-4 text-emerald-300 fill-emerald-300/20" />
              <span>Jelajahi Peta</span>
            </button>
            <button
              onClick={() => onNavigate({ view: 'profil' })}
              className="flex-1 bg-white/95 hover:bg-white text-slate-900 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-700" />
              <span>Profil Desa</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-md mx-auto px-4 space-y-6">
        {/* Main Stats Grid */}
        <section className="grid grid-cols-3 gap-2.5">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs text-center flex flex-col items-center justify-center">
            <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center mb-1 text-emerald-800">
              <HomeIcon className="w-4 h-4" />
            </div>
            <span className="text-base font-extrabold text-slate-800 leading-none">3</span>
            <span className="text-[10px] text-slate-500 font-medium mt-1">Dusun</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs text-center flex flex-col items-center justify-center">
            <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center mb-1 text-emerald-800">
              <Maximize2 className="w-4 h-4" />
            </div>
            <span className="text-sm font-extrabold text-slate-800 leading-none">± 215 Ha</span>
            <span className="text-[10px] text-slate-500 font-medium mt-1">Luas Wilayah</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs text-center flex flex-col items-center justify-center">
            <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center mb-1 text-emerald-800">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-sm font-extrabold text-slate-800 leading-none">3.948</span>
            <span className="text-[10px] text-slate-500 font-medium mt-1">Penduduk (2025)</span>
          </div>
        </section>

        {/* Weather Forecast Widget */}
        <WeatherWidget />

        {/* Secondary Info Cards */}
        <section className="grid grid-cols-2 gap-2.5">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center shrink-0 text-amber-700">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-medium">Mayoritas</p>
              <p className="text-xs font-bold text-slate-800">Mata Pencaharian</p>
              <p className="text-xs font-semibold text-emerald-800">Petani</p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 text-blue-700">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-medium">Terakhir Diperbarui</p>
              <p className="text-xs font-bold text-slate-800">01 Juli 2026</p>
              <p className="text-[10px] text-slate-500">(Observasi KKN)</p>
            </div>
          </div>
        </section>

        {/* POTENSI DESA KEREP Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black tracking-wide uppercase text-slate-800">
              POTENSI DESA KEREP
            </h3>
            <button
              onClick={() => onNavigate({ view: 'potensi' })}
              className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-0.5"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
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
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:border-emerald-500 transition-all text-left flex flex-col group focus:outline-hidden"
              >
                <div className="h-18 bg-emerald-50/80 overflow-hidden relative flex items-center justify-center">
                  {potensi.image ? (
                    <>
                      <img
                        src={potensi.image}
                        alt={potensi.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-emerald-50 flex items-center justify-center text-emerald-800">
                      {potensi.id === 'pertanian' ? (
                        <Sprout className="w-7 h-7 text-emerald-700" />
                      ) : (
                        <Trees className="w-7 h-7 text-emerald-700" />
                      )}
                    </div>
                  )}
                </div>
                <div className="p-2 text-center flex-1 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-800 line-clamp-2 leading-tight">
                    {potensi.subtitle}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* PROFIL & INFORMASI DESA Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black tracking-wide uppercase text-slate-800">
              PROFIL & INFORMASI DESA
            </h3>
            <button
              onClick={() => onNavigate({ view: 'profil' })}
              className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-0.5"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
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
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black tracking-wide uppercase text-slate-800">
              FASILITAS DESA
            </h3>
            <button
              onClick={() => onNavigate({ view: 'fasilitas' })}
              className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-0.5"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
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

        {/* Featured Highlights Cards */}
        <section className="grid grid-cols-3 gap-2.5">
          {/* Pendidikan */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col">
            <div className="p-1.5 bg-slate-50 border-b border-slate-100">
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">PENDIDIKAN</p>
            </div>
            <div className="p-2 space-y-1.5 flex-1 flex flex-col justify-between">
              <div
                onClick={() => onNavigate({ view: 'sekolah-detail', sekolahId: 'sd-kerep' })}
                className="cursor-pointer group"
              >
                <div className="h-14 bg-slate-100 rounded-lg overflow-hidden mb-1">
                  <img src="/assets/images/sd-kerep.jpg" alt="SD Negeri Kerep" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <p className="text-[10px] font-bold text-slate-800 leading-tight">SD Negeri Kerep</p>
              </div>
              <div className="flex items-center gap-2 text-[9px] text-emerald-700 pt-1 border-t border-slate-100">
                <button
                  onClick={() => onNavigate({ view: 'peta' })}
                  className="hover:underline flex items-center gap-0.5"
                >
                  <MapIcon className="w-2.5 h-2.5" /> Peta
                </button>
                <button
                  onClick={() => onNavigate({ view: 'galeri' })}
                  className="hover:underline flex items-center gap-0.5"
                >
                  <ImageIcon className="w-2.5 h-2.5" /> Galeri
                </button>
              </div>
            </div>
          </div>

          {/* UMKM */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col">
            <div className="p-1.5 bg-slate-50 border-b border-slate-100">
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">UMKM</p>
            </div>
            <div
              onClick={() => onNavigate({ view: 'umkm-list' })}
              className="p-2 cursor-pointer flex-1 flex flex-col justify-between group"
            >
              <div className="h-14 bg-emerald-50 border border-emerald-100 rounded-lg flex flex-col items-center justify-center text-emerald-800 mb-1.5 group-hover:bg-emerald-100/80 transition-colors">
                <ShoppingBag className="w-5 h-5 text-emerald-700" />
                <span className="text-[9px] font-bold text-emerald-900 mt-0.5">Sentra UMKM</span>
              </div>
              <p className="text-[9px] text-slate-600 leading-tight line-clamp-3">
                Ragam produk usaha mikro, kerajinan lokal, dan olahan pangan khas UMKM Desa Kerep.
              </p>
              <p className="text-[9px] font-bold text-emerald-800 pt-1 text-center">Lihat UMKM →</p>
            </div>
          </div>

          {/* Galeri Kegiatan */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col">
            <div className="p-1.5 bg-slate-50 border-b border-slate-100">
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">GALERI KEGIATAN</p>
            </div>
            <div
              onClick={() => onNavigate({ view: 'galeri' })}
              className="p-2 cursor-pointer flex-1 flex flex-col justify-between"
            >
              <div className="grid grid-cols-2 gap-1 mb-1">
                {galleryList.slice(0, 4).map((g, idx) => (
                  <div key={idx} className="h-7 bg-slate-100 rounded-sm overflow-hidden">
                    <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-[9px] font-bold text-emerald-800 text-center">Lihat Galeri →</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
