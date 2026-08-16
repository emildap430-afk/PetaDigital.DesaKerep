import React, { useState, useEffect } from 'react';
import { RouteState } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { getStoredUmkmList, subscribeDataUpdate } from '../utils/dataStore';
import { ChevronRight, Home, MapPin, Store } from 'lucide-react';

interface UmkmListViewProps {
  onNavigate: (route: RouteState) => void;
}

export const UmkmListView: React.FC<UmkmListViewProps> = ({ onNavigate }) => {
  const [umkmList, setUmkmList] = useState(getStoredUmkmList());

  useEffect(() => {
    setUmkmList(getStoredUmkmList());
    const unsub = subscribeDataUpdate(() => {
      setUmkmList(getStoredUmkmList());
    });
    return unsub;
  }, []);

  const breadcrumbs = [
    { label: 'Beranda', target: { view: 'beranda' as const } },
    { label: 'Potensi Desa', target: { view: 'potensi' as const } },
    { label: 'UMKM Desa Kerep' }
  ];

  return (
    <div className="pb-24">
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-emerald-800 shrink-0" />
              <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
                UMKM DESA KEREP
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Desa Kerep terdiri dari tiga dusun yang memiliki potensi UMKM yang beragam ({umkmList.length} usaha terdata).
            </p>
          </div>
        </div>

        {/* List of UMKM Cards */}
        <div className="space-y-3">
          {umkmList.map((umkm) => (
            <button
              key={umkm.id}
              onClick={() => onNavigate({ view: 'umkm-detail', umkmId: umkm.id })}
              className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:border-emerald-600 transition-all text-left flex group focus:outline-hidden"
            >
              <div className="w-28 h-28 bg-slate-100 shrink-0 relative">
                <img
                  src={umkm.image}
                  alt={umkm.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 left-2">
                  <span className="text-[8px] font-extrabold text-[#0b3c2c] bg-amber-300 px-1.5 py-0.5 rounded-md shadow-2xs uppercase tracking-wider">
                    {umkm.categoryBadge}
                  </span>
                </div>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 leading-tight group-hover:text-emerald-900 transition-colors">
                    {umkm.name}
                  </h3>

                  <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-semibold mt-1">
                    <MapPin className="w-3 h-3 text-emerald-700 shrink-0" />
                    <span>{umkm.dusun}</span>
                  </div>

                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                    {umkm.deskripsi}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 mt-2">
                  <span className="text-[9px] text-slate-400 font-medium truncate max-w-[120px]">
                    {umkm.pemilik}
                  </span>
                  <div className="flex items-center text-[10px] font-bold text-emerald-800 shrink-0">
                    <span>Lihat Detail</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </div>
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
