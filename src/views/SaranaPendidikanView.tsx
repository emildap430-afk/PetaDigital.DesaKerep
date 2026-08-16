import React, { useState, useEffect } from 'react';
import { ChevronRight, MapPin, ArrowLeft, Home } from 'lucide-react';
import { RouteState } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { getStoredSchoolsList, subscribeDataUpdate } from '../utils/dataStore';

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

      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0b3c2c] bg-emerald-100 px-2.5 py-1 rounded-full">
              Fasilitas Desa
            </span>
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight mt-2">
              SARANA PENDIDIKAN
            </h2>
            <p className="text-xs text-slate-500">
              Pilih fasilitas pendidikan di bawah ini ({sekolahList.length} lembaga terdata).
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {sekolahList.map((sekolah) => (
            <button
              key={sekolah.id}
              onClick={() => onNavigate({ view: 'sekolah-detail', sekolahId: sekolah.id })}
              className="w-full bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500 hover:shadow-xs transition-all text-left flex flex-col gap-2.5 group focus:outline-hidden"
            >
              <div className="h-36 bg-slate-100 rounded-xl overflow-hidden border border-slate-100 relative">
                <img
                  src={sekolah.image}
                  alt={sekolah.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 right-2 bg-emerald-950/80 backdrop-blur-xs text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                  <span>Lihat Detail</span>
                  <ChevronRight className="w-3 h-3 text-amber-300" />
                </div>
                <div className="absolute bottom-2 left-2 bg-slate-950/70 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span className="text-amber-300 font-extrabold">{sekolah.badge}</span>
                  <span>•</span>
                  <span>{sekolah.status}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                    {sekolah.name}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-800 shrink-0" />
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-800 shrink-0" />
                  <span>{sekolah.dusun} ({sekolah.distance})</span>
                </div>

                <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                  {sekolah.deskripsi}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-emerald-800">
                  <span>Profil, Fasilitas & Dokumentasi</span>
                  <span className="flex items-center gap-0.5 text-amber-600 font-bold">
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
};

