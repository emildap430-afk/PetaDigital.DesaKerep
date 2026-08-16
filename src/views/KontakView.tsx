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

      <div className="max-w-md mx-auto p-4 space-y-4">
        <div>
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
            KONTAK DESA
          </h2>
          <p className="text-xs text-slate-500">
            Informasi dan kontak yang dapat dihubungi.
          </p>
        </div>

        <div className="space-y-3">
          {/* Balai Desa */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-start gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Balai Desa Kerep</h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {info.balaiDesa}
              </p>
            </div>
          </div>

          {/* Telepon */}
          <a
            href={`tel:${info.telepon}`}
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-start gap-3 hover:border-emerald-500 transition-colors block"
          >
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Telepon</h3>
              <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                {info.telepon}
              </p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${info.email}`}
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-start gap-3 hover:border-emerald-500 transition-colors block"
          >
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Email</h3>
              <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                {info.email}
              </p>
            </div>
          </a>

          {/* Jam Pelayanan */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-start gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Jam Pelayanan</h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {info.jamPelayanan}
              </p>
            </div>
          </div>
        </div>

        {/* Quote Banner */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 p-6 rounded-2xl text-center space-y-2 mt-6 relative overflow-hidden">
          <Leaf className="w-8 h-8 text-emerald-200 absolute -bottom-2 -right-2 opacity-50" />
          <p className="text-xs font-bold text-emerald-950 italic leading-relaxed">
            "{info.motto}"
          </p>
        </div>
      </div>
    </div>
  );
};
