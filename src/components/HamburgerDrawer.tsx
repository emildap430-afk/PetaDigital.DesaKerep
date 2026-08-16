import React, { useState } from 'react';
import {
  X,
  Home,
  Info,
  Sparkles,
  Sprout,
  Store,
  Building,
  GraduationCap,
  Map,
  Image as ImageIcon,
  PhoneCall,
  ChevronRight,
  QrCode
} from 'lucide-react';
import { RouteState } from '../types';
import { QRCodeModal } from './QRCodeModal';
import { CandaBirawaLogo } from './CandaBirawaLogo';

interface HamburgerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: RouteState) => void;
}

export const HamburgerDrawer: React.FC<HamburgerDrawerProps> = ({ isOpen, onClose, onNavigate }) => {
  const [isQrOpen, setIsQrOpen] = useState(false);

  if (!isOpen && !isQrOpen) return null;

  const menuSections = [
    {
      title: 'UTAMA',
      items: [
        { label: 'Beranda', icon: Home, route: { view: 'beranda' as const } },
        { label: 'Peta Interaktif', icon: Map, route: { view: 'peta' as const } },
        { label: 'Galeri Foto Desa', icon: ImageIcon, route: { view: 'galeri' as const } },
        { label: 'Kontak Desa', icon: PhoneCall, route: { view: 'kontak' as const } }
      ]
    },
    {
      title: 'INFORMASI DESA',
      items: [
        { label: 'Profil Desa', icon: Info, route: { view: 'profil' as const } },
        { label: 'Potensi Desa', icon: Sparkles, route: { view: 'potensi' as const } },
        { label: 'UMKM Desa Kerep', icon: Store, route: { view: 'umkm-list' as const } },
        { label: 'Fasilitas Desa', icon: Building, route: { view: 'fasilitas' as const } },
        { label: 'Sarana Pendidikan', icon: GraduationCap, route: { view: 'sarana-pendidikan' as const } }
      ]
    }
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />

          {/* Drawer content */}
          <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="bg-[#0b3c2c] text-white p-4 flex items-center justify-between border-b border-emerald-900">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 min-w-11 bg-amber-500/10 p-0.5 rounded-xl border border-amber-400/30 flex items-center justify-center overflow-hidden shadow-xs">
                    <CandaBirawaLogo className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-amber-300">PETA DIGITAL</h2>
                    <p className="text-xs font-semibold text-white">DESA KEREP</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-180px)]">
                {/* QR Code Special Trigger Banner */}
                <button
                  onClick={() => setIsQrOpen(true)}
                  className="w-full bg-emerald-900/10 hover:bg-emerald-900/15 border border-emerald-800/30 p-3 rounded-2xl flex items-center justify-between text-emerald-950 transition-all text-left shadow-2xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#0b3c2c] text-amber-300 rounded-xl shadow-xs group-hover:scale-105 transition-transform">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#0b3c2c]">QR Code Website Desa</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Scan / Unduh barcode peta</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-800" />
                </button>

                {menuSections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-2">
                      {sec.title}
                    </h3>
                    <div className="space-y-1">
                      {sec.items.map((item, itemIdx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={itemIdx}
                            onClick={() => {
                              onNavigate(item.route);
                              onClose();
                            }}
                            className="w-full flex items-center justify-between p-2.5 rounded-xl text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors text-xs font-medium text-left"
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-4 h-4 text-emerald-700 shrink-0" />
                              <span>{item.label}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer info */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-center space-y-2">
              <p className="text-[11px] font-medium text-slate-600">
                Kec. Tarokan, Kab. Kediri
              </p>
              <p className="text-[10px] text-slate-400">
                Sumber Data: Observasi KKN 2026
              </p>
              <div className="pt-2 border-t border-slate-200/60">
                <button
                  onClick={() => {
                    onNavigate({ view: 'admin-login' });
                    onClose();
                  }}
                  className="text-[10px] text-slate-400 hover:text-emerald-700 font-medium transition-colors"
                >
                  🔒 Portal Administrator Desa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal inside Drawer */}
      <QRCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />
    </>
  );
};
