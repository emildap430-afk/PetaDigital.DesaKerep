import React from 'react';
import { Home, Map, Image as ImageIcon, Phone } from 'lucide-react';
import { RouteState } from '../types';

interface BottomNavProps {
  currentRoute: RouteState;
  onNavigate: (route: RouteState) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentRoute, onNavigate }) => {
  const activeTab = currentRoute.view;

  const navItems = [
    {
      id: 'beranda',
      label: 'Beranda',
      icon: Home,
      target: { view: 'beranda' as const }
    },
    {
      id: 'peta',
      label: 'Peta',
      icon: Map,
      target: { view: 'peta' as const }
    },
    {
      id: 'galeri',
      label: 'Galeri',
      icon: ImageIcon,
      target: { view: 'galeri' as const }
    },
    {
      id: 'kontak',
      label: 'Kontak',
      icon: Phone,
      target: { view: 'kontak' as const }
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0b3c2c] text-slate-300 border-t border-emerald-900 shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-4 h-15">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.id ||
            (item.id === 'beranda' && ['profil', 'profil-detail', 'potensi', 'potensi-detail', 'umkm-list', 'umkm-detail', 'fasilitas', 'fasilitas-detail', 'sarana-pendidikan', 'sekolah-detail'].includes(activeTab));

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.target)}
              className={`flex flex-col items-center justify-center gap-0.5 transition-all focus:outline-hidden ${
                isActive
                  ? 'text-white font-semibold'
                  : 'text-emerald-200/60 hover:text-white'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-transform ${
                  isActive ? 'bg-white/15 scale-105' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : ''}`} />
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
