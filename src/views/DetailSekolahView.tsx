import React from 'react';
import {
  MapPin,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Info,
  Calendar,
  Database,
  Building,
  School,
  BookOpen,
  Award,
  Users,
  Home
} from 'lucide-react';
import { RouteState } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { getStoredSchoolsList } from '../utils/dataStore';
import { getAssetUrl } from '../utils/imageHelper';

interface DetailSekolahViewProps {
  currentRoute: RouteState;
  onNavigate: (route: RouteState) => void;
}

export const DetailSekolahView: React.FC<DetailSekolahViewProps> = ({ currentRoute, onNavigate }) => {
  const schools = getStoredSchoolsList();
  const sekolahId = currentRoute.sekolahId || 'sd-kerep';
  const sekolah = schools.find((s) => s.id === sekolahId) || schools[0];

  const breadcrumbs = [
    { label: 'Beranda', target: { view: 'beranda' as const } },
    { label: 'Fasilitas Desa', target: { view: 'fasilitas' as const } },
    { label: 'Sarana Pendidikan', target: { view: 'sarana-pendidikan' as const } },
    { label: sekolah.shortName }
  ];

  return (
    <div className="pb-24">
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-5">
        {/* Main Photo Banner */}
        <div className="h-56 rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 shadow-xs relative">
          <img
            src={getAssetUrl(sekolah.image)}
            alt={sekolah.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Header Info */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 leading-snug">
              {sekolah.shortName}
            </h2>
            <span className="text-[10px] font-extrabold text-[#0b3c2c] bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200 uppercase">
              {sekolah.status === 'Negeri' ? `${sekolah.badge} Negeri` : sekolah.badge}
            </span>
          </div>

          <div className="flex items-start gap-1.5 text-xs text-slate-600">
            <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
            <span>{sekolah.alamat}</span>
          </div>
        </div>

        {/* Informasi Sekolah Table / Key-Value List */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-800" />
            <span>Informasi Sekolah</span>
          </h3>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2 flex justify-between">
              <span className="text-slate-500 font-medium">NPSN</span>
              <span className="font-bold text-slate-800">{sekolah.npsn || 'Data belum tersedia'}</span>
            </div>

            <div className="py-2 flex justify-between">
              <span className="text-slate-500 font-medium">Status</span>
              <span className="font-bold text-slate-800">{sekolah.status || 'Data belum tersedia'}</span>
            </div>

            <div className="py-2 flex justify-between">
              <span className="text-slate-500 font-medium">Jenjang</span>
              <span className="font-bold text-slate-800">{sekolah.jenjang || 'Data belum tersedia'}</span>
            </div>

            <div className="py-2 flex justify-between">
              <span className="text-slate-500 font-medium">Kode Pos</span>
              <span className="font-bold text-slate-800">{sekolah.kodePos || 'Data belum tersedia'}</span>
            </div>

            <div className="py-2 flex justify-between">
              <span className="text-slate-500 font-medium">Tahun Berdiri</span>
              <span className="font-bold text-slate-800">{sekolah.tahunBerdiri || 'Data belum tersedia'}</span>
            </div>

            <div className="py-2 flex justify-between">
              <span className="text-slate-500 font-medium">Akreditasi</span>
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {sekolah.akreditasi || 'Data belum tersedia'}
              </span>
            </div>

            <div className="py-2 flex justify-between">
              <span className="text-slate-500 font-medium">Kepala Sekolah</span>
              <span className="font-bold text-slate-800">{sekolah.kepalaSekolah || 'Data belum tersedia'}</span>
            </div>

            <div className="py-2 flex justify-between">
              <span className="text-slate-500 font-medium">Jumlah Guru</span>
              <span className="font-bold text-slate-800">{sekolah.jumlahGuru || 'Data belum tersedia'}</span>
            </div>

            <div className="py-2 flex justify-between">
              <span className="text-slate-500 font-medium">Jumlah Siswa</span>
              <span className="font-bold text-slate-800">{sekolah.jumlahSiswa || 'Data belum tersedia'}</span>
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Deskripsi
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            {sekolah.deskripsi || 'Data belum tersedia'}
          </p>
        </div>

        {/* Fasilitas Pills Grid */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Fasilitas
          </h3>

          <div className="grid grid-cols-3 gap-2">
            {sekolah.fasilitas && sekolah.fasilitas.length > 0 ? (
              sekolah.fasilitas.map((fas, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 p-2 rounded-xl text-[10px] font-semibold text-slate-700 flex items-center gap-1.5 justify-center text-center"
                >
                  <School className="w-3 h-3 text-emerald-800 shrink-0" />
                  <span className="truncate">{fas}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 col-span-3">Data belum tersedia</p>
            )}
          </div>
        </div>

        {/* Dokumentasi */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Dokumentasi
          </h3>

          <div className="grid grid-cols-3 gap-2">
            {(sekolah.dokumentasi || []).map((img, idx) => (
              <div key={idx} className="h-20 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                <img src={getAssetUrl(img)} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate({ view: 'galeri' })}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 pt-1"
          >
            <span>Lihat Semua Foto</span>
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
              <span className="font-bold text-slate-800">{sekolah.source}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-emerald-800" />
                <span>Tanggal Pendataan</span>
              </div>
              <span className="font-bold text-slate-800">10 Agustus 2026</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-emerald-800" />
                <span>Diperbarui Terakhir</span>
              </div>
              <span className="font-bold text-slate-800">10 Agustus 2026</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <span>Status Verifikasi</span>
              </div>
              <span className="bg-emerald-100 text-emerald-900 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-300">
                Terverifikasi
              </span>
            </div>
          </div>
        </div>

        {/* Back Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => onNavigate({ view: 'sarana-pendidikan' })}
            className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Sarana Pendidikan</span>
          </button>

          <button
            onClick={() => onNavigate({ view: 'fasilitas' })}
            className="w-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-98"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Kategori Fasilitas</span>
          </button>

          <button
            onClick={() => onNavigate({ view: 'beranda' })}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-98"
          >
            <Home className="w-4 h-4 text-emerald-800" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </div>
  );
};
