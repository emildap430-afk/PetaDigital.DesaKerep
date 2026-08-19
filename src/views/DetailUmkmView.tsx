import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Info,
  Calendar,
  Database,
  Store,
  User,
  Clock,
  Phone,
  ShoppingBag,
  Share2,
  Check,
  Home,
  Map as MapIcon
} from 'lucide-react';
import { RouteState } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { getStoredUmkmList } from '../utils/dataStore';
import { shareContent } from '../utils/shareUtils';
import { getAssetUrl } from '../utils/imageHelper';

interface DetailUmkmViewProps {
  currentRoute: RouteState;
  onNavigate: (route: RouteState) => void;
}

export const DetailUmkmView: React.FC<DetailUmkmViewProps> = ({ currentRoute, onNavigate }) => {
  const [shared, setShared] = useState(false);
  const umkmList = getStoredUmkmList();
  const umkmId = currentRoute.umkmId || 'anyaman-bambu';
  const umkm = umkmList.find((u) => u.id === umkmId) || umkmList[0];

  const breadcrumbs = [
    { label: 'Beranda', target: { view: 'beranda' as const } },
    { label: 'Potensi Desa', target: { view: 'potensi' as const } },
    { label: 'UMKM Desa Kerep', target: { view: 'umkm-list' as const } },
    { label: umkm.shortName }
  ];

  return (
    <div className="pb-24">
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-5">
        {/* Main Photo Banner */}
        <div className="h-56 rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 shadow-xs relative">
          <img
            src={getAssetUrl(umkm.image)}
            alt={umkm.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="bg-[#0b3c2c] text-amber-300 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md uppercase tracking-wider border border-amber-300/30">
              {umkm.categoryBadge}
            </span>
            <span className="bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md">
              {umkm.dusun}
            </span>
          </div>
        </div>

        {/* Header Info */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 leading-snug">
              {umkm.name}
            </h2>
          </div>

          <div className="flex items-start gap-1.5 text-xs text-slate-600">
            <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
            <span>{umkm.alamat}</span>
          </div>
        </div>

        {/* Informasi UMKM Key-Value Table */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-800" />
            <span>Informasi UMKM</span>
          </h3>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2 flex justify-between items-center">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-700" /> Pemilik / Pengelola
              </span>
              <span className="font-bold text-slate-800">{umkm.pemilik}</span>
            </div>

            <div className="py-2 flex justify-between items-center">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" /> Dusun Asal
              </span>
              <span className="font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {umkm.dusun}
              </span>
            </div>

            <div className="py-2 flex justify-between items-center">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-700" /> Jam Operasional
              </span>
              <span className="font-bold text-slate-800">{umkm.jamOperasional}</span>
            </div>

            <div className="py-2 flex justify-between items-center">
              <span className="text-slate-500 font-medium flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-700" /> Kontak
              </span>
              <span className="font-bold text-slate-800">{umkm.kontak}</span>
            </div>
          </div>
        </div>

        {/* Deskripsi UMKM */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Deskripsi UMKM
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            {umkm.fullDeskripsi || umkm.deskripsi}
          </p>
        </div>

        {/* Produk / Komoditas Unggulan */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-emerald-800" />
            <span>Produk Unggulan</span>
          </h3>

          <div className="space-y-1.5">
            {(umkm.produk || []).map((prod, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs font-semibold text-slate-800 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{prod}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dokumentasi */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Dokumentasi foto
          </h3>

          <div className="grid grid-cols-3 gap-2">
            {(umkm.dokumentasi || []).map((img, idx) => (
              <div key={idx} className="h-20 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                <img src={getAssetUrl(img)} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate({ view: 'galeri' })}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 pt-1"
          >
            <span>Lihat Semua Foto Galeri</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Informasi Pendukung Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Informasi Pendukung
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <Database className="w-4 h-4 text-emerald-800" />
                <span>Sumber Data</span>
              </div>
              <span className="font-bold text-slate-800">{umkm.source}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-emerald-800" />
                <span>Tanggal Pendataan</span>
              </div>
              <span className="font-bold text-slate-800">10 Agustus 2026</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <span>Status Verifikasi</span>
              </div>
              <span className="bg-emerald-100 text-emerald-900 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-300">
                {umkm.statusVerifikasi}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={async () => {
              const res = await shareContent({
                title: `${umkm.name} - Desa Kerep`,
                text: `${umkm.deskripsi} (${umkm.dusun}, Kontak: ${umkm.kontak})`
              });
              if (res.copied) {
                setShared(true);
                setTimeout(() => setShared(false), 2500);
              }
            }}
            className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            {shared ? (
              <>
                <Check className="w-4 h-4 text-emerald-900" />
                <span>Link UMKM Berhasil Disalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Bagikan UMKM Ini</span>
              </>
            )}
          </button>

          <button
            onClick={() => onNavigate({ view: 'peta' })}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <MapIcon className="w-4 h-4 text-amber-300" />
            <span>Lihat Lokasi di Peta</span>
          </button>

          <button
            onClick={() => onNavigate({ view: 'umkm-list' })}
            className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar UMKM</span>
          </button>

          <button
            onClick={() => onNavigate({ view: 'beranda' })}
            className="w-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4 text-emerald-800" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </div>
  );
};
