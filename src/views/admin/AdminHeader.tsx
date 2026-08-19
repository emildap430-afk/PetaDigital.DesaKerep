import React from 'react';
import { LogOut, ExternalLink, ShieldCheck, User } from 'lucide-react';
import { CandaBirawaLogo } from '../../components/CandaBirawaLogo';
import { getCurrentAdminUser } from '../../utils/auth';

interface AdminHeaderProps {
  onLogout: () => void;
  onPreviewPublic: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout, onPreviewPublic }) => {
  const user = getCurrentAdminUser();

  return (
    <header className="sticky top-0 z-30 bg-[#0b3c2c] text-white shadow-md border-b border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 p-1 rounded-xl border border-white/20 flex items-center justify-center shrink-0">
            <CandaBirawaLogo className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black text-amber-300 tracking-tight uppercase">
                ADMIN DASHBOARD
              </h1>
              <span className="text-[10px] font-bold bg-amber-400 text-[#0b3c2c] px-1.5 py-0.5 rounded uppercase">
                Panel Kontrol
              </span>
            </div>
            <p className="text-xs text-emerald-100/90 font-medium">
              Peta Digital Desa Kerep • Kec. Tarokan, Kab. Kediri
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white">
            <User className="w-3.5 h-3.5 text-amber-300" />
            <span>{user?.name || 'Administrator'}</span>
          </div>

          <button
            onClick={onPreviewPublic}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-xs font-bold text-white border border-emerald-600/40 transition-colors shadow-2xs"
            title="Lihat Website Publik"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">Website Publik</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-800/80 hover:bg-red-700 text-xs font-bold text-white border border-red-600/50 transition-colors shadow-2xs"
            title="Keluar / Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
