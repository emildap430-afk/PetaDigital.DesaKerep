import React, { useState, useEffect } from 'react';
import { RouteState } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { getStoredUmkmList, subscribeDataUpdate } from '../utils/dataStore';
import { ChevronRight, Home, MapPin, Store } from 'lucide-react';
import { getAssetUrl } from '../utils/imageHelper';

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

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Store className="w-6 h-6 text-emerald-800 shrink-0" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                UMKM DESA KEREP
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed max-w-2xl">
              Desa Kerep terdiri dari tiga dusun yang memiliki potensi UMKM yang beragam ({umkmList.length} usaha terdata).
            </p>
          </div>
        </div>

        {/* List of UMKM Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {umkmList.map((umkm) => (
            <button
              key={umkm.id}
              onClick={() => onNavigate({ view: 'umkm-detail', umkmId: umkm.id })}
              className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:border-emerald-600 hover:shadow-md transition-all text-left flex flex-col justify-between group focus:outline-hidden cursor-pointer"
            >
              <div>
                <div className="w-full h-44 bg-slate-100 shrink-0 relative overflow-hidden">
                  <img
                    src={getAssetUrl(umkm.image)}
                    alt={umkm.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[9px] font-extrabold text-[#0b3c2c] bg-amber-300 px-2 py-0.5 rounded-md shadow-2xs uppercase tracking-wider">
                      {umkm.categoryBadge}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-emerald-900 transition-colors">
                      {umkm.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mt-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{umkm.dusun}</span>
                    </div>

                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {umkm.deskripsi}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="text-xs text-slate-400 font-medium truncate max-w-[150px]">
                  {umkm.pemilik}
                </span>
                <div className="flex items-center text-xs font-bold text-emerald-800 shrink-0">
                  <span>Lihat Detail</span>
                  <ChevronRight className="w-4 h-4 ml-0.5" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Back to Home Button */}
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
