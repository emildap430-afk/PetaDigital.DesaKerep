import React from 'react';
import { MapPin } from 'lucide-react';

export const LocationBar: React.FC = () => {
  return (
    <div className="bg-[#f1f5f9] border-b border-slate-200 py-2 px-4 shadow-2xs">
      <div className="max-w-md mx-auto flex items-center justify-center gap-1.5 text-xs text-slate-700 font-medium">
        <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 fill-emerald-100" />
        <span>Desa Kerep, Kecamatan Tarokan, Kabupaten Kediri</span>
      </div>
    </div>
  );
};
