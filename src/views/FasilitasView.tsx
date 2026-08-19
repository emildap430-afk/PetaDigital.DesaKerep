import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  HeartPulse,
  GraduationCap,
  Landmark,
  Building2,
  Volleyball,
  PlusCircle,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Clock,
  UserCheck,
  X,
  Maximize2,
  Camera,
  Map,
  Home,
  Building
} from 'lucide-react';
import { RouteState } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { FacilityItem } from '../../assets/data/villageData';
import { getStoredFacilityCategories, subscribeDataUpdate } from '../utils/dataStore';
import { getAssetUrl } from '../utils/imageHelper';

interface FasilitasViewProps {
  currentRoute: RouteState;
  onNavigate: (route: RouteState) => void;
}

export const FasilitasView: React.FC<FasilitasViewProps> = ({ currentRoute, onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fasilitasCategories, setFasilitasCategories] = useState(getStoredFacilityCategories());

  useEffect(() => {
    setFasilitasCategories(getStoredFacilityCategories());
    const unsub = subscribeDataUpdate(() => {
      setFasilitasCategories(getStoredFacilityCategories());
    });
    return unsub;
  }, []);

  const fasilitasId = currentRoute.fasilitasId;
  const fasilitasItemId = currentRoute.fasilitasItemId;

  const categories = [
    {
      id: 'kesehatan',
      title: 'Sarana Kesehatan',
      subtitle: 'Fasilitas kesehatan yang tersedia',
      icon: HeartPulse
    },
    {
      id: 'pendidikan',
      title: 'Sarana Pendidikan',
      subtitle: 'Fasilitas pendidikan di desa',
      icon: GraduationCap,
      isPendidikanRoute: true
    },
    {
      id: 'peribadatan',
      title: 'Sarana Peribadatan',
      subtitle: 'Tempat ibadah di Desa Kerep',
      icon: Landmark
    },
    {
      id: 'umum',
      title: 'Fasilitas Umum',
      subtitle: 'Fasilitas umum untuk masyarakat',
      icon: Building2
    },
    {
      id: 'olahraga',
      title: 'Fasilitas Olahraga',
      subtitle: 'Sarana olahraga yang tersedia',
      icon: Volleyball
    },
    {
      id: 'lainnya',
      title: 'Fasilitas Lainnya',
      subtitle: 'Fasilitas lainnya di desa',
      icon: PlusCircle
    }
  ];

  // 1. SUB-ITEM DETAIL VIEW (e.g. Balai Desa Kerep, Poskesdes, etc.)
  if (fasilitasItemId || currentRoute.view === 'fasilitas-item-detail') {
    let categoryData = fasilitasCategories.find((c) => c.id === fasilitasId);
    let itemData: FacilityItem | undefined;

    if (categoryData) {
      itemData = categoryData.items.find((i) => i.id === fasilitasItemId);
    }

    if (!itemData) {
      for (const cat of fasilitasCategories) {
        const found = cat.items.find((i) => i.id === fasilitasItemId);
        if (found) {
          categoryData = cat;
          itemData = found;
          break;
        }
      }
    }

    if (!itemData) {
      categoryData = fasilitasCategories[3];
      itemData = categoryData.items[0];
    }

    const breadcrumbs = [
      { label: 'Beranda', target: { view: 'beranda' as const } },
      { label: 'Fasilitas Desa', target: { view: 'fasilitas' as const } },
      { label: categoryData?.title || 'Fasilitas', target: { view: 'fasilitas-detail' as const, fasilitasId: categoryData?.id } },
      { label: itemData.name }
    ];

    const docsList = itemData.dokumentasi && itemData.dokumentasi.length > 0
      ? itemData.dokumentasi
      : [itemData.image];

    return (
      <div className="pb-24">
        <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

        <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-5">
          {/* Main Hero Card */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="relative h-48 bg-slate-100 overflow-hidden">
              <img
                src={getAssetUrl(itemData.image)}
                alt={itemData.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-[10px] font-black text-[#0b3c2c] bg-amber-300 px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {categoryData?.title || 'Fasilitas Desa'}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h2 className="text-base font-black tracking-tight leading-snug">
                  {itemData.name}
                </h2>
                <div className="flex items-center gap-1 text-[11px] text-emerald-200 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>{itemData.location}, Desa Kerep</span>
                </div>
              </div>
            </div>

            {/* Quick Specs Bar */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
              {itemData.jamOperasional && (
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                  <div className="truncate">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Operasional</span>
                    <span className="font-semibold text-slate-800">{itemData.jamOperasional}</span>
                  </div>
                </div>
              )}
              {itemData.pengelola && (
                <div className="flex items-center gap-1.5 text-slate-700">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                  <div className="truncate">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Pengelola</span>
                    <span className="font-semibold text-slate-800">{itemData.pengelola}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Full Description Box */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <h3 className="text-xs font-black uppercase text-slate-900 tracking-wide flex items-center gap-1.5">
              <span>Deskripsi Lengkap</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {itemData.fullDescription || itemData.description}
            </p>
          </div>

          {/* Fungsi & Layanan Utama */}
          {itemData.fungsi && itemData.fungsi.length > 0 && (
            <div className="bg-emerald-900/5 p-4 rounded-2xl border border-emerald-200/80 space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#0b3c2c] text-amber-300 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-[#0b3c2c] uppercase tracking-wide">
                    Fungsi & Layanan Utama
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Kegunaan dan pelayanan yang disediakan bagi warga Desa Kerep.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {itemData.fungsi.map((f, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-2.5 rounded-xl border border-emerald-100 flex items-start gap-2 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800 leading-snug">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documentation Gallery Section */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 uppercase tracking-wide">
                <Camera className="w-4 h-4 text-emerald-800" />
                <span>Dokumentasi Foto ({docsList.length})</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">Tekan foto untuk memperbesar</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {docsList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className="relative h-28 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group focus:outline-hidden"
                >
                  <img src={getAssetUrl(imgUrl)} alt={`${itemData.name} ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </button>
              ))}
            </div>
          </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => onNavigate({ view: 'peta' })}
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Map className="w-4 h-4 text-amber-300" />
                <span>Lihat Lokasi di Peta Desa Interaktif</span>
              </button>

              <button
                onClick={() => onNavigate({ view: 'fasilitas-detail', fasilitasId: categoryData?.id })}
                className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Daftar {categoryData?.title}</span>
              </button>

              <button
                onClick={() => onNavigate({ view: 'fasilitas' })}
                className="w-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-98"
              >
                <Building2 className="w-4 h-4 text-emerald-800" />
                <span>Lihat Kategori Fasilitas Lainnya</span>
              </button>

              <button
                onClick={() => onNavigate({ view: 'beranda' })}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-98"
              >
                <Home className="w-4 h-4 text-emerald-800" />
                <span>Kembali ke Beranda</span>
              </button>
            </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={getAssetUrl(selectedImage)} alt="Enlarged" className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl" />
          </div>
        )}
      </div>
    );
  }

  // 2. CATEGORY ITEMS LIST VIEW (e.g. list of items inside Fasilitas Umum)
  if (fasilitasId) {
    const categoryData = fasilitasCategories.find((c) => c.id === fasilitasId) || fasilitasCategories[0];

    const breadcrumbs = [
      { label: 'Beranda', target: { view: 'beranda' as const } },
      { label: 'Fasilitas Desa', target: { view: 'fasilitas' as const } },
      { label: categoryData.title }
    ];

    return (
      <div className="pb-24">
        <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

        <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0b3c2c] bg-emerald-100 px-2.5 py-1 rounded-full">
              Fasilitas Desa
            </span>
            <h2 className="text-base sm:text-xl font-black text-slate-900 uppercase tracking-tight mt-2">
              {categoryData.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pilih fasilitas di bawah ini untuk melihat deskripsi, fungsi, dan dokumentasinya.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categoryData.items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate({
                    view: 'fasilitas-item-detail',
                    fasilitasId: categoryData.id,
                    fasilitasItemId: item.id
                  });
                }}
                className="w-full bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500 hover:shadow-xs transition-all text-left flex flex-col gap-2.5 group focus:outline-hidden"
              >
                <div className="h-36 bg-slate-100 rounded-xl overflow-hidden border border-slate-100 relative">
                  <img src={getAssetUrl(item.image)} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-2 right-2 bg-emerald-950/80 backdrop-blur-xs text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                    <span>Lihat Detail</span>
                    <ChevronRight className="w-3 h-3 text-amber-300" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                      {item.name}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-800 shrink-0" />
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-800 shrink-0" />
                    <span>{item.location}</span>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-emerald-800">
                    <span>Fungsi & Dokumentasi Foto</span>
                    <span className="flex items-center gap-0.5 text-amber-600">
                      Buka Info <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => onNavigate({ view: 'fasilitas' })}
              className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Kategori Fasilitas</span>
            </button>

            <button
              onClick={() => onNavigate({ view: 'beranda' })}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-98"
            >
              <Home className="w-4 h-4 text-emerald-800" />
              <span>Kembali ke Beranda</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. MAIN FACILITY CATEGORIES GRID VIEW
  const breadcrumbs = [
    { label: 'Beranda', target: { view: 'beranda' as const } },
    { label: 'Fasilitas Desa' }
  ];

  return (
    <div className="pb-24">
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
              FASILITAS DESA KEREP
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1">
              Informasi sarana ibadah, kesehatan, olahraga, pendidikan, dan fasilitas umum yang tersedia di Desa Kerep.
            </p>
          </div>

          <button
            onClick={() => onNavigate({ view: 'dashboard' })}
            className="shrink-0 bg-emerald-900/10 hover:bg-emerald-900/20 text-emerald-950 border border-emerald-800/30 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-emerald-800" />
            <span>Tambah Fasilitas</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.isPendidikanRoute) {
                    onNavigate({ view: 'sarana-pendidikan' });
                  } else {
                    onNavigate({ view: 'fasilitas-detail', fasilitasId: cat.id });
                  }
                }}
                className="w-full bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-between text-left group focus:outline-hidden cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800 shrink-0 group-hover:bg-emerald-100 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-800 shrink-0" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-4 max-w-md mx-auto">
          <button
            onClick={() => onNavigate({ view: 'beranda' })}
            className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 text-amber-300" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </div>
  );
};
