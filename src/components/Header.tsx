import React, { useState } from 'react';
import { Menu, ChevronLeft, Search, QrCode } from 'lucide-react';
import { RouteState } from '../types';
import { SearchModal } from './SearchModal';
import { QRCodeModal } from './QRCodeModal';
import { CandaBirawaLogo } from './CandaBirawaLogo';

interface HeaderProps {
  currentRoute: RouteState;
  onNavigate: (route: RouteState) => void;
  onOpenDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate, onOpenDrawer }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const isHome = currentRoute.view === 'beranda';

  const handleBackClick = () => {
    if (currentRoute.view === 'sekolah-detail') {
      onNavigate({ view: 'sarana-pendidikan' });
    } else if (currentRoute.view === 'sarana-pendidikan') {
      onNavigate({ view: 'fasilitas' });
    } else if (currentRoute.view === 'umkm-detail') {
      onNavigate({ view: 'umkm-list' });
    } else if (currentRoute.view === 'umkm-list') {
      onNavigate({ view: 'potensi' });
    } else if (currentRoute.view === 'fasilitas-detail') {
      onNavigate({ view: 'fasilitas' });
    } else if (currentRoute.view === 'potensi-detail') {
      onNavigate({ view: 'potensi' });
    } else if (currentRoute.view === 'profil-detail') {
      onNavigate({ view: 'profil' });
    } else {
      onNavigate({ view: 'beranda' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0b3c2c] text-white shadow-md transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2.5 space-y-2">
          {/* Main Top Header Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {!isHome && (
                <button
                  onClick={handleBackClick}
                  className="p-1 -ml-1 text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Kembali"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              <button 
                onClick={() => onNavigate({ view: 'beranda' })}
                className="flex items-center gap-3 text-left focus:outline-hidden cursor-pointer"
              >
                <div className="w-11 h-11 min-w-11 bg-amber-500/10 p-0.5 rounded-xl border border-amber-400/30 flex items-center justify-center overflow-hidden shadow-xs">
                  <CandaBirawaLogo className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-sm sm:text-base font-bold tracking-tight uppercase leading-tight text-amber-300">
                    PETA DIGITAL
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold tracking-wider text-white uppercase leading-tight">
                    DESA KEREP
                  </p>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
              <button
                onClick={() => onNavigate({ view: 'beranda' })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  currentRoute.view === 'beranda' ? 'bg-white/15 text-amber-300' : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                Beranda
              </button>
              <button
                onClick={() => onNavigate({ view: 'peta' })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  currentRoute.view === 'peta' ? 'bg-white/15 text-amber-300' : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                Peta
              </button>
              <button
                onClick={() => onNavigate({ view: 'profil' })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  currentRoute.view.startsWith('profil') ? 'bg-white/15 text-amber-300' : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                Profil
              </button>
              <button
                onClick={() => onNavigate({ view: 'potensi' })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  currentRoute.view.startsWith('potensi') || currentRoute.view.startsWith('umkm') ? 'bg-white/15 text-amber-300' : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                Potensi
              </button>
              <button
                onClick={() => onNavigate({ view: 'fasilitas' })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  currentRoute.view.startsWith('fasilitas') || currentRoute.view.startsWith('sarana') || currentRoute.view.startsWith('sekolah') ? 'bg-white/15 text-amber-300' : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                Fasilitas
              </button>
              <button
                onClick={() => onNavigate({ view: 'galeri' })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  currentRoute.view === 'galeri' ? 'bg-white/15 text-amber-300' : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                Galeri
              </button>
              <button
                onClick={() => onNavigate({ view: 'kontak' })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  currentRoute.view === 'kontak' ? 'bg-white/15 text-amber-300' : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                Kontak
              </button>
            </div>

            {/* Header Right Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setIsQrOpen(true)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-hidden relative group cursor-pointer"
                aria-label="Tampilkan QR Code Desa"
                title="QR Code Desa"
              >
                <QrCode className="w-5 h-5 text-amber-300" />
              </button>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-hidden relative group cursor-pointer"
                aria-label="Cari Data Desa"
                title="Cari"
              >
                <Search className="w-5 h-5 text-amber-300" />
              </button>

              <button
                onClick={onOpenDrawer}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-hidden cursor-pointer"
                aria-label="Buka Menu"
                title="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Quick Instant Search Trigger Bar */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/20 rounded-xl px-3 py-2 flex items-center gap-2 text-xs text-emerald-100 transition-all text-left shadow-2xs group focus:outline-hidden cursor-pointer"
          >
            <Search className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform shrink-0" />
            <span className="truncate opacity-90 text-xs font-medium">
              Cari fasilitas, potensi, sekolah, UMKM, atau data desa...
            </span>
            <span className="ml-auto text-[10px] font-extrabold bg-amber-400 text-[#0b3c2c] px-2 py-0.5 rounded-md uppercase tracking-wide shrink-0">
              Cari
            </span>
          </button>
        </div>
      </header>

      {/* Instant Search Overlay Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={onNavigate}
      />

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />
    </>
  );
};

