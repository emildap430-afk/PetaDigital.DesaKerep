import React from 'react';
import {
  LayoutDashboard,
  Store,
  GraduationCap,
  Building2,
  Sparkles,
  MapPin,
  Image as ImageIcon,
  Users,
  Building,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import {
  getStoredUmkmList,
  getStoredSchoolsList,
  getStoredFacilityCategories,
  getStoredGalleryList,
  getStoredMapMarkersList,
  getStoredPotensiList,
  getStoredDusunList,
  getStoredPendudukData
} from '../../../utils/dataStore';

interface AdminOverviewTabProps {
  onSelectTab: (tabId: string) => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({ onSelectTab }) => {
  const umkmList = getStoredUmkmList();
  const schoolsList = getStoredSchoolsList();
  const facilityCategories = getStoredFacilityCategories();
  const galleryList = getStoredGalleryList();
  const mapMarkers = getStoredMapMarkersList();
  const potensiList = getStoredPotensiList();
  const dusunList = getStoredDusunList();
  const pendudukData = getStoredPendudukData();

  const totalFacilities = facilityCategories.reduce((acc, cat) => acc + (cat.items?.length || 0), 0);

  const stats = [
    {
      id: 'umkm',
      label: 'Total UMKM',
      count: umkmList.length,
      unit: 'Usaha',
      icon: Store,
      color: 'from-amber-600 to-amber-700',
      bgLight: 'bg-amber-50 text-amber-800 border-amber-200',
      tab: 'umkm'
    },
    {
      id: 'fasilitas',
      label: 'Fasilitas Desa',
      count: totalFacilities,
      unit: 'Titik',
      icon: Building2,
      color: 'from-emerald-600 to-emerald-700',
      bgLight: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      tab: 'fasilitas'
    },
    {
      id: 'pendidikan',
      label: 'Sarana Pendidikan',
      count: schoolsList.length,
      unit: 'Lembaga',
      icon: GraduationCap,
      color: 'from-blue-600 to-blue-700',
      bgLight: 'bg-blue-50 text-blue-800 border-blue-200',
      tab: 'pendidikan'
    },
    {
      id: 'peta',
      label: 'Titik Peta / Lokasi',
      count: mapMarkers.length,
      unit: 'Marker',
      icon: MapPin,
      color: 'from-red-600 to-red-700',
      bgLight: 'bg-red-50 text-red-800 border-red-200',
      tab: 'peta'
    },
    {
      id: 'galeri',
      label: 'Galeri Foto',
      count: galleryList.length,
      unit: 'Foto',
      icon: ImageIcon,
      color: 'from-purple-600 to-purple-700',
      bgLight: 'bg-purple-50 text-purple-800 border-purple-200',
      tab: 'galeri'
    },
    {
      id: 'potensi',
      label: 'Kategori Potensi',
      count: potensiList.length,
      unit: 'Sektor',
      icon: Sparkles,
      color: 'from-lime-600 to-lime-700',
      bgLight: 'bg-lime-50 text-lime-800 border-lime-200',
      tab: 'potensi'
    },
    {
      id: 'dusun',
      label: 'Dusun Desa',
      count: dusunList.length,
      unit: 'Wilayah',
      icon: Building,
      color: 'from-teal-600 to-teal-700',
      bgLight: 'bg-teal-50 text-teal-800 border-teal-200',
      tab: 'dusun'
    },
    {
      id: 'penduduk',
      label: 'Jumlah Penduduk',
      count: pendudukData.totalPenduduk.toLocaleString('id-ID'),
      unit: 'Jiwa',
      icon: Users,
      color: 'from-indigo-600 to-indigo-700',
      bgLight: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      tab: 'penduduk'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0b3c2c] to-emerald-900 text-white rounded-3xl p-6 shadow-md border border-emerald-800 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Peta Digital Terverifikasi Observasi KKN 2026</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Selamat Datang di Pusat Pengelolaan Data Desa Kerep
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl">
            Kelola seluruh data publik peta digital, sarana desa, UMKM, pendidikan, titik koordinat, dan galeri secara langsung dan tersinkronisasi otomatis dengan website publik.
          </p>
        </div>
      </div>

      {/* Grid Stats Counters */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
          Ringkasan Data Terdata
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <button
                key={stat.id}
                onClick={() => onSelectTab(stat.tab)}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-sm hover:border-emerald-500 transition-all text-left group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-600">{stat.label}</span>
                  <div className={`p-2 rounded-xl border ${stat.bgLight} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-slate-900 leading-none">
                    {stat.count}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">
                    {stat.unit}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
          Aksi Cepat Pengelolaan Data
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            onClick={() => onSelectTab('umkm')}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-amber-500 hover:shadow-xs transition-all text-left flex items-start gap-3 group"
          >
            <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl border border-amber-200 shrink-0 group-hover:scale-105 transition-transform">
              <Store className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-800">
                Kelola Data UMKM
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Tambah, ubah nama produk, kontak WhatsApp, dan foto usaha warga.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
          </button>

          <button
            onClick={() => onSelectTab('fasilitas')}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-500 hover:shadow-xs transition-all text-left flex items-start gap-3 group"
          >
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 shrink-0 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                Kelola Fasilitas Desa
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Update balai desa, posyandu, masjid/mushola, sarana olahraga, dll.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
          </button>

          <button
            onClick={() => onSelectTab('peta')}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-red-500 hover:shadow-xs transition-all text-left flex items-start gap-3 group"
          >
            <div className="p-2.5 bg-red-50 text-red-800 rounded-xl border border-red-200 shrink-0 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-800">
                Kelola Titik Koordinat Peta
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Atur latitude, longitude, pin warna, dan nama lokasi di peta digital.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
          </button>

          <button
            onClick={() => onSelectTab('pendidikan')}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-500 hover:shadow-xs transition-all text-left flex items-start gap-3 group"
          >
            <div className="p-2.5 bg-blue-50 text-blue-800 rounded-xl border border-blue-200 shrink-0 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-800">
                Kelola Sarana Pendidikan
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Data SD Negeri Kerep, MI Darul Huda, TK Dharma Wanita, Ponpes.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
          </button>

          <button
            onClick={() => onSelectTab('galeri')}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-purple-500 hover:shadow-xs transition-all text-left flex items-start gap-3 group"
          >
            <div className="p-2.5 bg-purple-50 text-purple-800 rounded-xl border border-purple-200 shrink-0 group-hover:scale-105 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-800">
                Upload Galeri Foto Desa
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Dokumentasi kegiatan masyarakat, potensi dusun, dan fasilitas desa.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
          </button>

          <button
            onClick={() => onSelectTab('profil')}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-teal-500 hover:shadow-xs transition-all text-left flex items-start gap-3 group"
          >
            <div className="p-2.5 bg-teal-50 text-teal-800 rounded-xl border border-teal-200 shrink-0 group-hover:scale-105 transition-transform">
              <Building className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-800">
                Perbarui Profil & Visi Misi
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Edit sejarah desa, letak geografis, visi misi, dan info umum.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
