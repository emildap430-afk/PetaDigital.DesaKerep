import React, { useState } from 'react';
import {
  Building,
  Save,
  CheckCircle2,
  MapPin,
  Compass,
  FileText,
  Users,
  Phone,
  Mail,
  Clock,
  Target,
  Plus,
  Trash2,
  Sparkles,
  ShieldCheck,
  History
} from 'lucide-react';
import {
  ProfilDesaData,
  getStoredProfilDesa,
  saveProfilDesaData
} from '../../../utils/dataStore';

export const AdminProfilTab: React.FC = () => {
  const [data, setData] = useState<ProfilDesaData>(() => {
    const loaded = getStoredProfilDesa();
    return {
      ...loaded,
      nama: loaded.nama || loaded.namaDesa || 'DESA KEREP',
      namaDesa: loaded.namaDesa || loaded.nama || 'DESA KEREP',
      kades: loaded.kades || loaded.kepalaDesa || 'Bapak Kepala Desa Kerep',
      kepalaDesa: loaded.kepalaDesa || loaded.kades || 'Bapak Kepala Desa Kerep',
      motto: loaded.motto || 'Kerep Makmur, Gotong Royong, Berbudaya, & Maju',
      deskripsi: loaded.deskripsi || 'Desa Kerep merupakan salah satu desa agraris berpotensi unggul di Kecamatan Tarokan, Kabupaten Kediri.',
      balaiDesa: loaded.balaiDesa || 'Dusun Kerep, Desa Kerep, Kec. Tarokan, Kab. Kediri (64174)',
      batasWilayah: loaded.batasWilayah || {
        utara: 'Desa Bulusari & Wilayah Kab. Nganjuk',
        selatan: 'Desa Cerme',
        timur: 'Desa Tarokan',
        barat: 'Kawasan Perhutani / Perbukitan'
      },
      strukturPemerintahan: loaded.strukturPemerintahan || {
        kades: 'Pemerintah Desa Kerep',
        sekdes: 'Sekdes Kerep',
        kaurKeuangan: 'Kaur Keuangan',
        kaurPerencanaan: 'Kaur Perencanaan',
        kaurTataUsaha: 'Kaur Tata Usaha & Umum',
        kasunKerep: 'Kepala Dusun Kerep',
        kasunBalongasem: 'Kepala Dusun Balongasem',
        kasunCabak: 'Kepala Dusun Cabak Banjarsari'
      }
    };
  });

  const [isSaved, setIsSaved] = useState(false);
  const [newMisiText, setNewMisiText] = useState('');

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Ensure aliases match
    const payload: ProfilDesaData = {
      ...data,
      nama: data.nama || data.namaDesa || 'DESA KEREP',
      namaDesa: data.nama || data.namaDesa || 'DESA KEREP',
      kades: data.kades || data.kepalaDesa || 'Bapak Kepala Desa Kerep',
      kepalaDesa: data.kades || data.kepalaDesa || 'Bapak Kepala Desa Kerep'
    };

    saveProfilDesaData(payload);
    setData(payload);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAddMisi = () => {
    if (!newMisiText.trim()) return;
    setData({
      ...data,
      misi: [...(data.misi || []), newMisiText.trim()]
    });
    setNewMisiText('');
  };

  const handleRemoveMisi = (index: number) => {
    const updated = [...(data.misi || [])];
    updated.splice(index, 1);
    setData({ ...data, misi: updated });
  };

  const handleUpdateMisi = (index: number, val: string) => {
    const updated = [...(data.misi || [])];
    updated[index] = val;
    setData({ ...data, misi: updated });
  };

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-emerald-800" />
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
              PROFIL, VISI MISI & DATA PEMERINTAH DESA
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola profil lengkap, visi misi, sejarah, batas wilayah, dan struktur aparatur Desa Kerep secara fleksibel.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSaved && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Berhasil Disimpan!</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => handleSave()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0b3c2c] hover:bg-emerald-950 text-white font-bold text-xs shadow-md cursor-pointer transition-all active:scale-98"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>Simpan Data Profil</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5 text-xs">
        {/* 1. Identitas & Informasi Umum */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-800" />
              <span>1. Identitas & Informasi Umum Desa</span>
            </h3>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Profil Dasar
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Nama Desa</label>
              <input
                type="text"
                value={data.nama || data.namaDesa || ''}
                onChange={(e) => setData({ ...data, nama: e.target.value, namaDesa: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-colors font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Kecamatan</label>
              <input
                type="text"
                value={data.kecamatan || ''}
                onChange={(e) => setData({ ...data, kecamatan: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Kabupaten</label>
              <input
                type="text"
                value={data.kabupaten || ''}
                onChange={(e) => setData({ ...data, kabupaten: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Provinsi</label>
              <input
                type="text"
                value={data.provinsi || 'Jawa Timur'}
                onChange={(e) => setData({ ...data, provinsi: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Kode Pos</label>
              <input
                type="text"
                value={data.kodePos || ''}
                onChange={(e) => setData({ ...data, kodePos: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Kepala Desa (Kades)</label>
              <input
                type="text"
                value={data.kades || data.kepalaDesa || ''}
                onChange={(e) => setData({ ...data, kades: e.target.value, kepalaDesa: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-colors font-medium text-emerald-950"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Luas Wilayah</label>
              <input
                type="text"
                value={data.luasWilayah || ''}
                onChange={(e) => setData({ ...data, luasWilayah: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Jumlah Penduduk (Jiwa)</label>
              <input
                type="text"
                value={data.jumlahPenduduk || ''}
                onChange={(e) => setData({ ...data, jumlahPenduduk: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Mata Pencaharian Utama</label>
              <input
                type="text"
                value={data.mataPencaharian || ''}
                onChange={(e) => setData({ ...data, mataPencaharian: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Slogan / Motto Desa</span>
            </label>
            <input
              type="text"
              value={data.motto || ''}
              onChange={(e) => setData({ ...data, motto: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-colors font-medium text-emerald-900"
              placeholder="Contoh: Kerep Makmur, Gotong Royong, Berbudaya, & Maju"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Deskripsi Ringkas Desa</label>
            <textarea
              rows={2}
              value={data.deskripsi || ''}
              onChange={(e) => setData({ ...data, deskripsi: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-colors leading-relaxed"
              placeholder="Gambaran umum desa yang tampil pada halaman profil..."
            />
          </div>

          {/* Kontak & Pelayanan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 border-t border-slate-100">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Alamat Balai Desa</span>
              </label>
              <input
                type="text"
                value={data.balaiDesa || ''}
                onChange={(e) => setData({ ...data, balaiDesa: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 text-[11px]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>No. Telp / WhatsApp</span>
              </label>
              <input
                type="text"
                value={data.telepon || ''}
                onChange={(e) => setData({ ...data, telepon: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 text-[11px]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Jam Pelayanan Kantor</span>
              </label>
              <input
                type="text"
                value={data.jamPelayanan || ''}
                onChange={(e) => setData({ ...data, jamPelayanan: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* 2. Visi & Misi Desa */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-700" />
              <span>2. Visi & Misi Desa Kerep</span>
            </h3>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Visi & Misi
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Visi Desa Kerep</span>
            </label>
            <textarea
              rows={2}
              value={data.visi || ''}
              onChange={(e) => setData({ ...data, visi: e.target.value })}
              className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-colors font-medium text-emerald-950 italic leading-relaxed"
              placeholder="Ketik visi utama pembangunan desa..."
            />
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800">Misi Desa (Daftar Poin Program):</label>
              <span className="text-[10px] text-slate-400 font-semibold">{data.misi?.length || 0} Poin Misi</span>
            </div>

            <div className="space-y-2">
              {data.misi && data.misi.length > 0 ? (
                data.misi.map((misiItem, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-900 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <textarea
                      rows={2}
                      value={misiItem}
                      onChange={(e) => handleUpdateMisi(idx, e.target.value)}
                      className="flex-1 bg-transparent border-0 focus:ring-0 p-0 text-xs text-slate-800 leading-relaxed resize-none focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMisi(idx)}
                      className="p-1 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                      title="Hapus Misi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl">Belum ada poin misi.</p>
              )}
            </div>

            {/* Add Misi Input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newMisiText}
                onChange={(e) => setNewMisiText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddMisi();
                  }
                }}
                placeholder="Tulis poin misi baru lalu klik Tambah..."
                className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 text-xs"
              />
              <button
                type="button"
                onClick={handleAddMisi}
                className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Misi</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Sejarah Desa */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4 text-amber-700" />
              <span>3. Sejarah & Asal Usul Desa Kerep</span>
            </h3>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Sejarah
            </span>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Teks Lengkap Sejarah & Cagar Budaya Desa</label>
            <textarea
              rows={6}
              value={data.sejarah || ''}
              onChange={(e) => setData({ ...data, sejarah: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-colors leading-relaxed font-sans text-xs"
              placeholder="Tuliskan sejarah babad desa, tokoh kepemimpinan tempo dulu, punden, dan tradisi lokal..."
            />
          </div>
        </div>

        {/* 4. Letak Geografis & Batas Wilayah */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-700" />
              <span>4. Letak Geografis & Batas Wilayah</span>
            </h3>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              Geografis
            </span>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Kondisi Geografis & Topografi</label>
            <textarea
              rows={3}
              value={data.geografis || ''}
              onChange={(e) => setData({ ...data, geografis: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-colors leading-relaxed text-xs"
              placeholder="Deskripsi ketinggian mdpl, jenis tanah, iklim, dan bentang alam desa..."
            />
          </div>

          <div className="space-y-2 pt-1">
            <label className="font-bold text-slate-800">Batas-Batas Wilayah Administratif:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="font-bold text-slate-700 text-[11px]">Batas Sebelah Utara</label>
                <input
                  type="text"
                  value={data.batasWilayah?.utara || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      batasWilayah: {
                        ...(data.batasWilayah || { utara: '', selatan: '', timur: '', barat: '' }),
                        utara: e.target.value
                      }
                    })
                  }
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                  placeholder="Contoh: Desa Bulusari & Kab. Nganjuk"
                />
              </div>

              <div className="space-y-1 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="font-bold text-slate-700 text-[11px]">Batas Sebelah Selatan</label>
                <input
                  type="text"
                  value={data.batasWilayah?.selatan || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      batasWilayah: {
                        ...(data.batasWilayah || { utara: '', selatan: '', timur: '', barat: '' }),
                        selatan: e.target.value
                      }
                    })
                  }
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                  placeholder="Contoh: Desa Cerme"
                />
              </div>

              <div className="space-y-1 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="font-bold text-slate-700 text-[11px]">Batas Sebelah Timur</label>
                <input
                  type="text"
                  value={data.batasWilayah?.timur || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      batasWilayah: {
                        ...(data.batasWilayah || { utara: '', selatan: '', timur: '', barat: '' }),
                        timur: e.target.value
                      }
                    })
                  }
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                  placeholder="Contoh: Desa Tarokan"
                />
              </div>

              <div className="space-y-1 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="font-bold text-slate-700 text-[11px]">Batas Sebelah Barat</label>
                <input
                  type="text"
                  value={data.batasWilayah?.barat || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      batasWilayah: {
                        ...(data.batasWilayah || { utara: '', selatan: '', timur: '', barat: '' }),
                        barat: e.target.value
                      }
                    })
                  }
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
                  placeholder="Contoh: Kawasan Perhutani / Perbukitan"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 5. Struktur Pemerintahan Desa */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-800" />
              <span>5. Struktur Perangkat & Pemerintahan Desa</span>
            </h3>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Aparatur Desa
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Kepala Desa (Kades)</label>
              <input
                type="text"
                value={data.strukturPemerintahan?.kades || data.kades || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    strukturPemerintahan: {
                      ...(data.strukturPemerintahan || {
                        kades: '', sekdes: '', kaurKeuangan: '', kaurPerencanaan: '', kaurTataUsaha: '',
                        kasunKerep: '', kasunBalongasem: '', kasunCabak: ''
                      }),
                      kades: e.target.value
                    }
                  })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Sekretaris Desa (Sekdes)</label>
              <input
                type="text"
                value={data.strukturPemerintahan?.sekdes || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    strukturPemerintahan: {
                      ...(data.strukturPemerintahan || {
                        kades: '', sekdes: '', kaurKeuangan: '', kaurPerencanaan: '', kaurTataUsaha: '',
                        kasunKerep: '', kasunBalongasem: '', kasunCabak: ''
                      }),
                      sekdes: e.target.value
                    }
                  })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Kaur Keuangan</label>
              <input
                type="text"
                value={data.strukturPemerintahan?.kaurKeuangan || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    strukturPemerintahan: {
                      ...(data.strukturPemerintahan || {
                        kades: '', sekdes: '', kaurKeuangan: '', kaurPerencanaan: '', kaurTataUsaha: '',
                        kasunKerep: '', kasunBalongasem: '', kasunCabak: ''
                      }),
                      kaurKeuangan: e.target.value
                    }
                  })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Kaur Perencanaan & Pembangunan</label>
              <input
                type="text"
                value={data.strukturPemerintahan?.kaurPerencanaan || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    strukturPemerintahan: {
                      ...(data.strukturPemerintahan || {
                        kades: '', sekdes: '', kaurKeuangan: '', kaurPerencanaan: '', kaurTataUsaha: '',
                        kasunKerep: '', kasunBalongasem: '', kasunCabak: ''
                      }),
                      kaurPerencanaan: e.target.value
                    }
                  })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Kepala Dusun (Kasun) Kerep</label>
              <input
                type="text"
                value={data.strukturPemerintahan?.kasunKerep || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    strukturPemerintahan: {
                      ...(data.strukturPemerintahan || {
                        kades: '', sekdes: '', kaurKeuangan: '', kaurPerencanaan: '', kaurTataUsaha: '',
                        kasunKerep: '', kasunBalongasem: '', kasunCabak: ''
                      }),
                      kasunKerep: e.target.value
                    }
                  })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Kepala Dusun (Kasun) Balongasem</label>
              <input
                type="text"
                value={data.strukturPemerintahan?.kasunBalongasem || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    strukturPemerintahan: {
                      ...(data.strukturPemerintahan || {
                        kades: '', sekdes: '', kaurKeuangan: '', kaurPerencanaan: '', kaurTataUsaha: '',
                        kasunKerep: '', kasunBalongasem: '', kasunCabak: ''
                      }),
                      kasunBalongasem: e.target.value
                    }
                  })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-700">Kepala Dusun (Kasun) Cabak Banjarsari</label>
              <input
                type="text"
                value={data.strukturPemerintahan?.kasunCabak || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    strukturPemerintahan: {
                      ...(data.strukturPemerintahan || {
                        kades: '', sekdes: '', kaurKeuangan: '', kaurPerencanaan: '', kaurTataUsaha: '',
                        kasunKerep: '', kasunBalongasem: '', kasunCabak: ''
                      }),
                      kasunCabak: e.target.value
                    }
                  })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Action */}
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Perubahan data akan otomatis tersinkron ke halaman publik Profil Desa.</span>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0b3c2c] hover:bg-emerald-950 text-white font-bold shadow-md cursor-pointer transition-all active:scale-98 text-xs uppercase tracking-wide"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>Simpan Semua Perubahan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
