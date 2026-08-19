import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Sparkles, MapPin, Building, ArrowRight } from 'lucide-react';
import { RouteState } from '../types';
import { searchItems, SearchResultItem } from '../utils/searchData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: RouteState) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Popular search suggestions
  const popularKeywords = [
    { label: 'SD Kerep', term: 'SD Kerep' },
    { label: 'Pertanian', term: 'Pertanian' },
    { label: 'Poskesdes', term: 'Poskesdes' },
    { label: 'Visi & Misi', term: 'Visi' },
    { label: 'Data Penduduk', term: 'Penduduk' },
    { label: 'Balai Desa', term: 'Balai' },
    { label: 'Peta Interaktif', term: 'Peta' },
    { label: 'UMKM Desa', term: 'UMKM' }
  ];

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search when query changes
  useEffect(() => {
    if (query.trim().length > 0) {
      const res = searchItems(query);
      setResults(res);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  const handleSelectResult = (item: SearchResultItem) => {
    onNavigate(item.route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-start items-center p-3 sm:p-4 pt-12 sm:pt-16 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2.5">
          <div className="p-2 bg-emerald-800 text-amber-300 rounded-xl shrink-0 shadow-xs">
            <Search className="w-5 h-5" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari fasilitas, potensi, atau profil desa..."
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs"
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
              title="Bersihkan"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="py-1.5 px-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors shrink-0"
          >
            Batal
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="p-3 overflow-y-auto flex-1 space-y-3 divide-y divide-slate-100">
          {/* Quick Suggestions when query is empty */}
          {!query.trim() && (
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Pencarian Populer Desa</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {popularKeywords.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(item.term)}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 px-2.5 py-1 rounded-full text-xs font-medium transition-all active:scale-95 flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Panduan Pencarian
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-800 block">Fasilitas</span>
                    SD Kerep, Poskesdes, Masjid, Balai Desa, Lapangan
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-800 block">Potensi & Profil</span>
                    Pertanian, Sapi, UMKM, Visi Misi, Penduduk
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Active Search Results */}
          {query.trim().length > 0 && results.length > 0 && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 pb-1">
                <span>Ditemukan {results.length} Hasil</span>
                <span className="text-[10px] font-normal text-slate-400">Tekan hasil untuk membuka</span>
              </div>

              <div className="space-y-2">
                {results.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectResult(item)}
                    className="w-full bg-white p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all text-left flex items-start gap-2.5 group focus:outline-hidden"
                  >
                    {item.image ? (
                      <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-lg shrink-0 flex items-center justify-center border border-emerald-100 font-bold text-xs">
                        <Building className="w-5 h-5" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase border ${item.categoryColor}`}>
                          {item.categoryBadge}
                        </span>
                        {item.location && (
                          <span className="text-[10px] text-slate-500 flex items-center gap-0.5 truncate">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            {item.location}
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 mt-1 truncate group-hover:text-emerald-900">
                        {item.title}
                      </h4>

                      <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-tight">
                        {item.description}
                      </p>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-800 shrink-0 self-center transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Results State */}
          {query.trim().length > 0 && results.length === 0 && (
            <div className="text-center py-8 px-4 space-y-2">
              <div className="w-10 h-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-800">
                Tidak ada hasil untuk "{query}"
              </h4>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                Coba gunakan kata kunci lain seperti <span className="font-semibold text-emerald-800">SD</span>, <span className="font-semibold text-emerald-800">Sawah</span>, <span className="font-semibold text-emerald-800">Poskesdes</span>, atau <span className="font-semibold text-emerald-800">Penduduk</span>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
