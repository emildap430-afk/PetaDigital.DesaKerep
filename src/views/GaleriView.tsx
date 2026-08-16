import React, { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { RouteState } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { GalleryItem } from '../../assets/data/villageData';
import { getStoredGalleryList, subscribeDataUpdate } from '../utils/dataStore';

interface GaleriViewProps {
  onNavigate: (route: RouteState) => void;
}

export const GaleriView: React.FC<GaleriViewProps> = ({ onNavigate }) => {
  const [galleryList, setGalleryList] = useState(getStoredGalleryList());
  const [activeCategory, setActiveCategory] = useState<'semua' | 'kegiatan' | 'potensi' | 'fasilitas'>('semua');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    setGalleryList(getStoredGalleryList());
    const unsub = subscribeDataUpdate(() => {
      setGalleryList(getStoredGalleryList());
    });
    return unsub;
  }, []);

  const filterCategories = [
    { id: 'semua', label: 'Semua' },
    { id: 'kegiatan', label: 'Kegiatan' },
    { id: 'potensi', label: 'Potensi' },
    { id: 'fasilitas', label: 'Fasilitas' }
  ];

  const filteredItems = activeCategory === 'semua'
    ? galleryList
    : galleryList.filter((item) => item.category === activeCategory);

  const breadcrumbs = [
    { label: 'Beranda', target: { view: 'beranda' as const } },
    { label: 'Galeri' }
  ];

  return (
    <div className="pb-24">
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
              GALERI DESA KEREP
            </h2>
            <p className="text-xs text-slate-500">
              Dokumentasi foto kegiatan, potensi, dan fasilitas desa ({galleryList.length} foto).
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {filterCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`py-1.5 px-3.5 rounded-full text-xs font-bold transition-all whitespace-nowrap focus:outline-hidden ${
                  isActive
                    ? 'bg-[#0b3c2c] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs group cursor-pointer flex flex-col"
            >
              <div className="h-32 bg-slate-100 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 p-1 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
                <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-semibold px-2 py-0.5 rounded-md">
                  {item.categoryLabel}
                </span>
              </div>
              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <h3 className="text-[11px] font-bold text-slate-800 line-clamp-2 leading-tight">
                  {item.title}
                </h3>
                <span className="text-[9px] text-slate-400 mt-1 block">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-xs text-slate-400 bg-white rounded-2xl border border-slate-200 p-6">
            Tidak ada foto untuk kategori ini.
          </div>
        )}
      </div>

      {/* Lightbox Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 text-white bg-white/20 hover:bg-white/30 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-md w-full space-y-3">
            <div className="rounded-2xl overflow-hidden bg-black max-h-[70vh]">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>
            <div className="text-white text-center space-y-1">
              <span className="text-[10px] font-bold bg-emerald-700 px-2.5 py-0.5 rounded-full uppercase">
                {selectedImage.categoryLabel}
              </span>
              <h3 className="text-sm font-bold mt-1">{selectedImage.title}</h3>
              <p className="text-xs text-slate-400">{selectedImage.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
