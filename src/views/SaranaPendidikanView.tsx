import React, { useState, useEffect } from 'react';
import { ChevronRight, MapPin, ArrowLeft, Home } from 'lucide-react';
import { RouteState } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { getStoredSchoolsList, subscribeDataUpdate } from '../utils/dataStore';
import { getAssetUrl } from '../utils/imageHelper';

interface SaranaPendidikanViewProps {
  onNavigate: (route: RouteState) => void;
}

export const SaranaPendidikanView: React.FC<SaranaPendidikanViewProps> = ({ onNavigate }) => {
  const [sekolahList, setSekolahList] = useState(getStoredSchoolsList());

  useEffect(() => {
    setSekolahList(getStoredSchoolsList());
    const unsub = subscribeDataUpdate(() => {
      setSekolahList(getStoredSchoolsList());
    });
    return unsub;
  }, []);

  const breadcrumbs = [
    { label: 'Beranda', target: { view: 'beranda' as const } },
    { label: 'Fasilitas Desa', target: { view: 'fasilitas' as const } },
    { label: 'Sarana Pendidikan' }
  ];

  return (
    <div className="pb-24">
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0b3c2c] bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Fasilitas Desa
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mt-2">
              SARANA PENDIDIKAN
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pilih fasilitas pendidikan di bawah ini ({sekolahList.length} lembaga terdata).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sekolahList.map((sekolah) => (
            <button
              key={sekolah.id}
              onClick={() => onNavigate({ view: 'sekolah-detail', sekolahId: sekolah.id })}
              className="w-full bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col justify-between group focus:outline-hidden cursor-pointer"
            >
              <div className="space-y-3 w-full">
                <div className="h-44 bg-slate-100 rounded-xl overflow-hidden border border-slate-100 relative">
                  <img
                    src={getAssetUrl(sekolah.image)}
                    alt={sekolah.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-emerald-950/80 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
                    <span>Lihat Detail</span>
                    <ChevronRight className="w-3 h-3 text-amber-300" />
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-slate-950/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <span className="text-amber-300 font-extrabold">{sekolah.badge}</span>
                    <span>•</span>
                    <span>{sekolah.status}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                      {sekolah.name}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-800 shrink-0" />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                    <span>{sekolah.dusun} ({sekolah.distance})</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                    {sekolah.deskripsi}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800 w-full">
                <span>Profil & Dokumentasi</span>
                <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                  Buka Info <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-3 pt-4 max-w-md mx-auto">
          <button
            onClick={() => onNavigate({ view: 'fasilitas' })}
            className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Kategori Fasilitas</span>
          </button>

          <button
            onClick={() => onNavigate({ view: 'beranda' })}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-98 cursor-pointer"
          >
            <Home className="w-4 h-4 text-emerald-800" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </div>
  );
};

