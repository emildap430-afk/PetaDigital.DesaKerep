import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Leaf } from 'lucide-react';
import { RouteState } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { villageInfo as defaultVillageInfo } from '../../assets/data/villageData';
import { getStoredProfilData, subscribeDataUpdate } from '../utils/dataStore';

interface KontakViewProps {
  onNavigate: (route: RouteState) => void;
}

export const KontakView: React.FC<KontakViewProps> = ({ onNavigate }) => {
  const [info, setInfo] = useState(() => {
    const profil = getStoredProfilData();
    return {
      balaiDesa: profil.balaiDesa || defaultVillageInfo.balaiDesa,
      telepon: profil.telepon || defaultVillageInfo.telepon,
      email: profil.email || defaultVillageInfo.email,
      jamPelayanan: defaultVillageInfo.jamPelayanan || profil.jamPelayanan,
      motto: profil.motto || defaultVillageInfo.motto
    };
  });

  useEffect(() => {
    const loadInfo = () => {
      const profil = getStoredProfilData();
      setInfo({
        balaiDesa: profil.balaiDesa || defaultVillageInfo.balaiDesa,
        telepon: profil.telepon || defaultVillageInfo.telepon,
        email: profil.email || defaultVillageInfo.email,
        jamPelayanan: defaultVillageInfo.jamPelayanan || profil.jamPelayanan,
        motto: profil.motto || defaultVillageInfo.motto
      });
    };

    loadInfo();
    const unsubscribe = subscribeDataUpdate(loadInfo);
    return unsubscribe;
  }, []);

  const breadcrumbs = [
    { label: 'Beranda', target: { view: 'beranda' as const } },
    { label: 'Kontak' }
  ];

  return (
    <div className="pb-24">
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
            KONTAK DESA KEREP
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Informasi alamat balai desa, jam pelayanan, dan nomor kontak yang dapat dihubungi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Balai Desa */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start gap-3.5">
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Balai Desa Kerep</h3>
              <p className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                {info.balaiDesa}
              </p>
            </div>
          </div>

          {/* Telepon */}
          <a
            href={`tel:${info.telepon}`}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start gap-3.5 hover:border-emerald-500 hover:shadow-xs transition-all block"
          >
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Telepon / WhatsApp</h3>
              <p className="text-sm font-bold text-emerald-800 mt-0.5">
                {info.telepon}
              </p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${info.email}`}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start gap-3.5 hover:border-emerald-500 hover:shadow-xs transition-all block"
          >
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Resmi</h3>
              <p className="text-sm font-bold text-emerald-800 mt-0.5">
                {info.email}
              </p>
            </div>
          </a>

          {/* Jam Pelayanan */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start gap-3.5">
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jam Pelayanan</h3>
              <p className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                {info.jamPelayanan}
              </p>
            </div>
          </div>
        </div>

        {/* Quote Banner */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 p-6 sm:p-8 rounded-2xl text-center space-y-2 relative overflow-hidden">
          <Leaf className="w-10 h-10 text-emerald-200 absolute -bottom-2 -right-2 opacity-50" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 block">Slogan / Motto Desa</span>
          <p className="text-sm sm:text-base font-bold text-emerald-950 italic leading-relaxed">
            "{info.motto}"
          </p>
        </div>

        <div className="pt-2 max-w-md mx-auto">
          <button
            onClick={() => onNavigate({ view: 'beranda' })}
            className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
          >
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </div>
  );
};
