import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Tag,
  FileText,
  ChevronRight,
  Home,
  Share2,
  Check,
  Sprout,
  Trees,
  CheckCircle2,
  Camera,
  Maximize2,
  X,
  UserCheck,
  Calendar,
  Clock,
  Sparkles,
  Map,
  Compass
} from 'lucide-react';
import { RouteState } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { potensiList, PotentialItem } from '../../assets/data/villageData';
import { shareContent } from '../utils/shareUtils';

interface PotensiViewProps {
  currentRoute: RouteState;
  onNavigate: (route: RouteState) => void;
}

export const PotensiView: React.FC<PotensiViewProps> = ({ currentRoute, onNavigate }) => {
  const [shared, setShared] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const potensiId = currentRoute.potensiId;
  const potensiDusunId = currentRoute.potensiDusunId;

  // 1. SPECIFIC DUSUN POTENTIAL DETAIL VIEW (e.g. Pertanian Dusun Kerep / Dusun Balongasem / Dusun Cabak)
  if (potensiDusunId) {
    let parentPotensi = potensiList.find((p) => p.id === potensiId);
    let subItem: PotentialItem | undefined;

    if (parentPotensi && parentPotensi.items) {
      subItem = parentPotensi.items.find((i) => i.id === potensiDusunId);
    }

    if (!subItem) {
      for (const p of potensiList) {
        if (p.items) {
          const found = p.items.find((i) => i.id === potensiDusunId);
          if (found) {
            parentPotensi = p;
            subItem = found;
            break;
          }
        }
      }
    }

    if (!subItem && parentPotensi && parentPotensi.items && parentPotensi.items.length > 0) {
      subItem = parentPotensi.items[0];
    }

    if (subItem && parentPotensi) {
      const breadcrumbs = [
        { label: 'Beranda', target: { view: 'beranda' as const } },
        { label: 'Potensi Desa', target: { view: 'potensi' as const } },
        { label: parentPotensi.subtitle, target: { view: 'potensi-detail' as const, potensiId: parentPotensi.id } },
        { label: subItem.dusun }
      ];

      const docsList = subItem.dokumentasi && subItem.dokumentasi.length > 0
        ? subItem.dokumentasi
        : [subItem.image];

      return (
        <div className="pb-24">
          <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

          <div className="max-w-md mx-auto p-4 space-y-4">
            {/* Main Hero Banner Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="relative h-52 bg-slate-100 overflow-hidden">
                <img
                  src={subItem.image}
                  alt={subItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-black text-[#0b3c2c] bg-amber-300 px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{parentPotensi.subtitle} • {subItem.dusun}</span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h2 className="text-base font-black tracking-tight leading-snug">
                    {subItem.name}
                  </h2>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-200 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>{subItem.dusun}, Desa Kerep</span>
                  </div>
                </div>
              </div>

              {/* Quick Specs Bar */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                {subItem.pengelola && (
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                    <div className="truncate">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block">Pengelola</span>
                      <span className="font-semibold text-slate-800">{subItem.pengelola}</span>
                    </div>
                  </div>
                )}
                {subItem.luasLahan && (
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Compass className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                    <div className="truncate">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block">Estimasi Luas</span>
                      <span className="font-semibold text-slate-800">{subItem.luasLahan}</span>
                    </div>
                  </div>
                )}
                {subItem.musimPanen && (
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                    <div className="truncate">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block">Musim / Jadwal</span>
                      <span className="font-semibold text-slate-800">{subItem.musimPanen}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Full Description Box */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-xs font-black uppercase text-slate-900 tracking-wide flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-800" />
                <span>Deskripsi Lengkap</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                {subItem.fullDescription || subItem.description}
              </p>

              {/* Info details metadata */}
              <div className="pt-3 mt-2 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <Tag className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">Komoditas Utama: </span>
                    <span className="text-slate-600 font-medium">{subItem.komoditas}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">Wilayah: </span>
                    <span className="text-slate-600 font-medium">{subItem.dusun}, Desa Kerep</span>
                  </div>
                </div>

                {subItem.sumber && (
                  <div className="flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">Sumber: </span>
                      <span className="text-slate-600 font-medium">{subItem.sumber}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Fungsi & Peran Utama */}
            {subItem.fungsi && subItem.fungsi.length > 0 && (
              <div className="bg-emerald-900/5 p-4 rounded-2xl border border-emerald-200/80 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#0b3c2c] text-amber-300 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-[#0b3c2c] uppercase tracking-wide">
                      Peran & Manfaat Utama
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Kegunaan dan kontribusi bagi masyarakat {subItem.dusun}.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {subItem.fungsi.map((f, idx) => (
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

            {/* Documentation Gallery Section with Lightbox */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 uppercase tracking-wide">
                  <Camera className="w-4 h-4 text-emerald-800" />
                  <span>Dokumentasi Foto ({docsList.length})</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Tekan foto untuk perbesar</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {docsList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className="relative h-24 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group focus:outline-hidden"
                  >
                    <img
                      src={imgUrl}
                      alt={`${subItem?.name} ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-white" />
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
                onClick={async () => {
                  const res = await shareContent({
                    title: `${subItem?.name} - Desa Kerep`,
                    text: `${subItem?.description} (Komoditas: ${subItem?.komoditas})`
                  });
                  if (res.copied) {
                    setShared(true);
                    setTimeout(() => setShared(false), 2500);
                  }
                }}
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                {shared ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-900" />
                    <span>Link Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Bagikan Info Potensi Ini</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onNavigate({ view: 'potensi-detail', potensiId: parentPotensi?.id })}
                className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke 3 Dusun {parentPotensi.subtitle}</span>
              </button>

              <button
                onClick={() => onNavigate({ view: 'potensi' })}
                className="w-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-98"
              >
                <Sprout className="w-4 h-4 text-emerald-800" />
                <span>Lihat Kategori Potensi Lainnya</span>
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
              <img src={selectedImage} alt="Enlarged" className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl" />
            </div>
          )}
        </div>
      );
    }
  }

  // 2. CATEGORY DUSUN-LIST VIEW (e.g. When user clicks "Pertanian", displays 3 dusun: Dusun Kerep, Dusun Balongasem, Dusun Cabak)
  if (potensiId) {
    const parentPotensi = potensiList.find((p) => p.id === potensiId) || potensiList[0];

    const breadcrumbs = [
      { label: 'Beranda', target: { view: 'beranda' as const } },
      { label: 'Potensi Desa', target: { view: 'potensi' as const } },
      { label: parentPotensi.subtitle }
    ];

    const subItems = parentPotensi.items || [];

    return (
      <div className="pb-24">
        <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

        <div className="max-w-md mx-auto p-4 space-y-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0b3c2c] bg-emerald-100 px-2.5 py-1 rounded-full">
              Potensi Desa Kerep
            </span>
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight mt-2">
              {parentPotensi.title}
            </h2>
            <p className="text-xs text-slate-500">
              Desa Kerep memiliki 3 dusun dengan sebaran potensi yang beragam. Pilih dusun di bawah ini untuk melihat detail dan dokumentasi lengkapnya.
            </p>
          </div>

          {/* List of 3 Dusun */}
          <div className="space-y-3">
            {subItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate({
                    view: 'potensi-detail',
                    potensiId: parentPotensi.id,
                    potensiDusunId: item.id
                  });
                }}
                className="w-full bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500 hover:shadow-xs transition-all text-left flex flex-col gap-2.5 group focus:outline-hidden"
              >
                {/* Image Banner */}
                <div className="h-36 bg-slate-100 rounded-xl overflow-hidden border border-slate-100 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-[#0b3c2c]/90 backdrop-blur-xs text-amber-300 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-300/30">
                    <MapPin className="w-2.5 h-2.5" />
                    <span>{item.dusun}</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-emerald-950/80 backdrop-blur-xs text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                    <span>Lihat Detail</span>
                    <ChevronRight className="w-3 h-3 text-amber-300" />
                  </div>
                </div>

                {/* Content Info */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                      {item.name}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-800 shrink-0" />
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-800 shrink-0" />
                    <span>{item.dusun}, Desa Kerep</span>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-emerald-800">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3 text-emerald-700" />
                      <span>Komoditas: {item.komoditas}</span>
                    </span>
                    <span className="flex items-center gap-0.5 text-amber-600">
                      Buka Info <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => onNavigate({ view: 'potensi' })}
              className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Kategori Potensi</span>
            </button>

            <button
              onClick={() => onNavigate({ view: 'beranda' })}
              className="w-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Home className="w-4 h-4 text-emerald-800" />
              <span>Kembali ke Beranda</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. MAIN POTENSI CATEGORIES LIST VIEW
  const breadcrumbs = [
    { label: 'Beranda', target: { view: 'beranda' as const } },
    { label: 'Potensi Desa' }
  ];

  return (
    <div className="pb-24">
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0b3c2c] bg-emerald-100 px-2.5 py-1 rounded-full">
            Potensi & Komoditas Desa
          </span>
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight mt-2">
            POTENSI DESA KEREP
          </h2>
          <p className="text-xs text-slate-500">
            Pilih sektor potensi di bawah ini untuk melihat persebaran di 3 dusun dan dokumentasi lengkapnya.
          </p>
        </div>

        <div className="space-y-3">
          {potensiList.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                if (p.id === 'umkm') {
                  onNavigate({ view: 'umkm-list' });
                } else {
                  onNavigate({ view: 'potensi-detail', potensiId: p.id });
                }
              }}
              className="w-full bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500 hover:shadow-xs transition-all text-left flex flex-col gap-2.5 group focus:outline-hidden"
            >
              <div className="h-36 bg-slate-100 rounded-xl overflow-hidden border border-slate-100 relative">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-50 flex items-center justify-center text-emerald-800">
                    {p.id === 'pertanian' ? (
                      <Sprout className="w-12 h-12 text-emerald-700" />
                    ) : (
                      <Trees className="w-12 h-12 text-emerald-700" />
                    )}
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-[#0b3c2c]/90 backdrop-blur-xs text-amber-300 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-300/30">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>{p.subtitle}</span>
                </div>
                <div className="absolute top-2 right-2 bg-emerald-950/80 backdrop-blur-xs text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                  <span>Lihat Detail</span>
                  <ChevronRight className="w-3 h-3 text-amber-300" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                    {p.title}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-800 shrink-0" />
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-800 shrink-0" />
                  <span>{p.lokasi}</span>
                </div>

                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                  {p.description}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-emerald-800">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3 text-emerald-700" />
                    <span>Komoditas: {p.komoditas}</span>
                  </span>
                  <span className="flex items-center gap-0.5 text-amber-600">
                    Buka Info <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Back to Home Button */}
        <div className="pt-2">
          <button
            onClick={() => onNavigate({ view: 'beranda' })}
            className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
          >
            <Home className="w-4 h-4 text-amber-300" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </div>
  );
};
