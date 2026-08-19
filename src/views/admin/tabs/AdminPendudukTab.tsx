import React, { useState, useEffect } from 'react';
import {
  Users,
  Save,
  CheckCircle2,
  PieChart,
  UserCheck,
  Building,
  GraduationCap,
  Sparkles,
  BarChart3,
  Layers,
  Calendar,
  FileText,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import {
  PendudukDemografi,
  getStoredPendudukData,
  savePendudukData,
  subscribeDataUpdate
} from '../../../utils/dataStore';

export const AdminPendudukTab: React.FC = () => {
  const [data, setData] = useState<PendudukDemografi>(getStoredPendudukData());
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setData(getStoredPendudukData());
    const unsub = subscribeDataUpdate(() => {
      setData(getStoredPendudukData());
    });
    return unsub;
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    savePendudukData(data);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAddPekerjaan = () => {
    const list = [...(data.pekerjaanUtama || [])];
    list.push({ sektor: 'Sektor Baru', label: 'Sektor Baru', jumlah: 50, persentase: '5%', persen: '5%' });
    setData({ ...data, pekerjaanUtama: list });
  };

  const handleDeletePekerjaan = (index: number) => {
    const list = [...(data.pekerjaanUtama || [])];
    list.splice(index, 1);
    setData({ ...data, pekerjaanUtama: list });
  };

  const handlePekerjaanChange = (index: number, field: 'sektor' | 'jumlah' | 'persentase', value: any) => {
    const list = [...(data.pekerjaanUtama || [])];
    list[index] = {
      ...list[index],
      [field]: field === 'jumlah' ? parseInt(value) || 0 : value,
      ...(field === 'sektor' ? { label: value } : {}),
      ...(field === 'persentase' ? { persen: value } : {})
    };
    setData({ ...data, pekerjaanUtama: list });
  };

  const handleAddPiramida = () => {
    const list = [...(data.piramidaUsia || [])];
    list.push({ label: 'Rentang Usia Baru', jumlah: 100, persentase: '5%', persen: '5%' });
    setData({ ...data, piramidaUsia: list });
  };

  const handleDeletePiramida = (index: number) => {
    const list = [...(data.piramidaUsia || [])];
    list.splice(index, 1);
    setData({ ...data, piramidaUsia: list });
  };

  const handlePiramidaChange = (index: number, field: 'label' | 'jumlah' | 'persentase', value: any) => {
    const list = [...(data.piramidaUsia || [])];
    list[index] = {
      ...list[index],
      [field]: field === 'jumlah' ? parseInt(value) || 0 : value,
      ...(field === 'persentase' ? { persen: value } : {})
    };
    setData({ ...data, piramidaUsia: list });
  };

  const handleAddPendidikan = () => {
    const list = [...(data.pendidikan || [])];
    list.push({ jenjang: 'Jenjang Baru', jumlah: 50, persentase: '5%' });
    setData({ ...data, pendidikan: list });
  };

  const handleDeletePendidikan = (index: number) => {
    const list = [...(data.pendidikan || [])];
    list.splice(index, 1);
    setData({ ...data, pendidikan: list });
  };

  const handlePendidikanChange = (index: number, field: 'jenjang' | 'jumlah' | 'persentase', value: any) => {
    const list = [...(data.pendidikan || [])];
    list[index] = {
      ...list[index],
      [field]: field === 'jumlah' ? parseInt(value) || 0 : value
    };
    setData({ ...data, pendidikan: list });
  };

  const handleDusunStatChange = (index: number, field: 'totalPenduduk' | 'totalKk' | 'lakiLaki' | 'perempuan', value: number) => {
    const list = [...(data.persebaranDusun || [])];
    list[index] = {
      ...list[index],
      [field]: value || 0
    };
    setData({ ...data, persebaranDusun: list });
  };

  return (
    <div className="space-y-5 max-w-4xl pb-10">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
                DATA STATISTIK & SENSUS KEPENDUDUKAN
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Kelola data demografi Desa Kerep: jumlah warga, rasio gender, kelompok umur, mata pencaharian, dan persebaran dusun.
              </p>
            </div>
          </div>
        </div>

        {isSaved ? (
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 shadow-2xs animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Perubahan Tersimpan!</span>
          </div>
        ) : (
          <div className="text-[11px] font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            Tahun Data: <strong className="text-indigo-800 font-mono">{data.tahunData || '2026'}</strong>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-5 text-xs">
        {/* SECTION 1: AGREGAT DEMOGRAFI UTAMA */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-indigo-700" />
              <span>1. Agregat Demografi Utama Desa</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">Satuan Jiwa & KK</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-700 text-[11px]">Total Penduduk</label>
              <input
                type="number"
                value={data.totalPenduduk}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setData({ ...data, totalPenduduk: val });
                }}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-black text-indigo-900 text-sm focus:outline-hidden focus:border-indigo-600 font-mono"
              />
              <span className="text-[10px] text-slate-400 block">Total Jiwa Terdaftar</span>
            </div>

            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-700 text-[11px]">Kepala Keluarga (KK)</label>
              <input
                type="number"
                value={data.totalKk || data.kepalaKeluarga || 0}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setData({ ...data, totalKk: val, kepalaKeluarga: val });
                }}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-black text-slate-900 text-sm focus:outline-hidden focus:border-indigo-600 font-mono"
              />
              <span className="text-[10px] text-slate-400 block">Jumlah Kartu Keluarga</span>
            </div>

            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-700 text-[11px]">Laki-Laki (Jiwa)</label>
              <input
                type="number"
                value={data.lakiLaki}
                onChange={(e) => setData({ ...data, lakiLaki: parseInt(e.target.value) || 0 })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-black text-blue-900 text-sm focus:outline-hidden focus:border-indigo-600 font-mono"
              />
              <span className="text-[10px] text-blue-500 font-semibold">
                {data.totalPenduduk > 0 ? ((data.lakiLaki / data.totalPenduduk) * 100).toFixed(1) : 0}% dari total
              </span>
            </div>

            <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-700 text-[11px]">Perempuan (Jiwa)</label>
              <input
                type="number"
                value={data.perempuan}
                onChange={(e) => setData({ ...data, perempuan: parseInt(e.target.value) || 0 })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-black text-rose-900 text-sm focus:outline-hidden focus:border-indigo-600 font-mono"
              />
              <span className="text-[10px] text-rose-500 font-semibold">
                {data.totalPenduduk > 0 ? ((data.perempuan / data.totalPenduduk) * 100).toFixed(1) : 0}% dari total
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Tahun Periode Sensus / Data</span>
              </label>
              <input
                type="text"
                value={data.tahunData || ''}
                onChange={(e) => setData({ ...data, tahunData: e.target.value })}
                placeholder="Contoh: 2026"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-600 font-bold font-mono text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span>Kepadatan Penduduk</span>
              </label>
              <input
                type="text"
                value={data.kepadatan || ''}
                onChange={(e) => setData({ ...data, kepadatan: e.target.value })}
                placeholder="Contoh: ± 1.836 Jiwa/km²"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-600 font-bold text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Sumber Data</span>
              </label>
              <input
                type="text"
                value={data.sumber || ''}
                onChange={(e) => setData({ ...data, sumber: e.target.value })}
                placeholder="Contoh: Registrasi Desa & KKN 2026"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-600 text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: PERSEBARAN PENDUDUK PER DUSUN */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-800" />
              <span>2. Persebaran Penduduk Berdasarkan 3 Dusun</span>
            </h3>
            <span className="text-[10px] text-slate-400">Kerep, Balongasem & Cabak</span>
          </div>

          <div className="space-y-2.5">
            {(data.persebaranDusun || []).map((dusun, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-800 text-xs flex items-center justify-between">
                  <span>{dusun.namaDusun}</span>
                  <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Total: {dusun.totalPenduduk} Jiwa
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500">Total Jiwa</label>
                    <input
                      type="number"
                      value={dusun.totalPenduduk}
                      onChange={(e) => handleDusunStatChange(idx, 'totalPenduduk', parseInt(e.target.value) || 0)}
                      className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500">Jumlah KK</label>
                    <input
                      type="number"
                      value={dusun.totalKk}
                      onChange={(e) => handleDusunStatChange(idx, 'totalKk', parseInt(e.target.value) || 0)}
                      className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500">Laki-Laki</label>
                    <input
                      type="number"
                      value={dusun.lakiLaki}
                      onChange={(e) => handleDusunStatChange(idx, 'lakiLaki', parseInt(e.target.value) || 0)}
                      className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-blue-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500">Perempuan</label>
                    <input
                      type="number"
                      value={dusun.perempuan}
                      onChange={(e) => handleDusunStatChange(idx, 'perempuan', parseInt(e.target.value) || 0)}
                      className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-rose-900"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: PIRAMIDA KELOMPOK USIA */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-700" />
              <span>3. Struktur & Piramida Kelompok Usia ({data.piramidaUsia?.length || 0})</span>
            </h3>
            <button
              type="button"
              onClick={handleAddPiramida}
              className="flex items-center gap-1 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Rentang Usia</span>
            </button>
          </div>

          <div className="space-y-2">
            {(data.piramidaUsia || []).map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 items-center">
                <div className="sm:col-span-5">
                  <label className="text-[10px] text-slate-400 sm:hidden block">Kelompok Usia</label>
                  <input
                    type="text"
                    value={item.label || ''}
                    onChange={(e) => handlePiramidaChange(idx, 'label', e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-[10px] text-slate-400 sm:hidden block">Jumlah Jiwa</label>
                  <input
                    type="number"
                    value={item.jumlah || 0}
                    onChange={(e) => handlePiramidaChange(idx, 'jumlah', e.target.value)}
                    placeholder="Jumlah Jiwa"
                    className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-indigo-900"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-[10px] text-slate-400 sm:hidden block">Persentase</label>
                  <input
                    type="text"
                    value={item.persentase || item.persen || ''}
                    onChange={(e) => handlePiramidaChange(idx, 'persentase', e.target.value)}
                    placeholder="Persentase (e.g. 15%)"
                    className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-700"
                  />
                </div>
                <div className="sm:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDeletePiramida(idx)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus Kelompok Usia"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: KOMPOSISI MATA PENCAHARIAN / PEKERJAAN */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-800" />
              <span>4. Komposisi Mata Pencaharian / Sektor Pekerjaan ({data.pekerjaanUtama?.length || 0})</span>
            </h3>
            <button
              type="button"
              onClick={handleAddPekerjaan}
              className="flex items-center gap-1 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Sektor Pekerjaan</span>
            </button>
          </div>

          <div className="space-y-2">
            {(data.pekerjaanUtama || []).map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 items-center">
                <div className="sm:col-span-5">
                  <label className="text-[10px] text-slate-400 sm:hidden block">Sektor Profesi</label>
                  <input
                    type="text"
                    value={item.sektor || item.label || ''}
                    onChange={(e) => handlePekerjaanChange(idx, 'sektor', e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-[10px] text-slate-400 sm:hidden block">Jumlah Pekerja</label>
                  <input
                    type="number"
                    value={item.jumlah || 0}
                    onChange={(e) => handlePekerjaanChange(idx, 'jumlah', e.target.value)}
                    placeholder="Jumlah Orang"
                    className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-emerald-900"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-[10px] text-slate-400 sm:hidden block">Persentase</label>
                  <input
                    type="text"
                    value={item.persentase || item.persen || ''}
                    onChange={(e) => handlePekerjaanChange(idx, 'persentase', e.target.value)}
                    placeholder="Contoh: 58%"
                    className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-700"
                  />
                </div>
                <div className="sm:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDeletePekerjaan(idx)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus Sektor Pekerjaan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: TINGKAT PENDIDIKAN PENDUDUK */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-700" />
              <span>5. Tingkat Pendidikan Terakhir Warga ({data.pendidikan?.length || 0})</span>
            </h3>
            <button
              type="button"
              onClick={handleAddPendidikan}
              className="flex items-center gap-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Jenjang Pendidikan</span>
            </button>
          </div>

          <div className="space-y-2">
            {(data.pendidikan || []).map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 items-center">
                <div className="sm:col-span-5">
                  <label className="text-[10px] text-slate-400 sm:hidden block">Jenjang Pendidikan</label>
                  <input
                    type="text"
                    value={item.jenjang}
                    onChange={(e) => handlePendidikanChange(idx, 'jenjang', e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-[10px] text-slate-400 sm:hidden block">Jumlah Warga</label>
                  <input
                    type="number"
                    value={item.jumlah}
                    onChange={(e) => handlePendidikanChange(idx, 'jumlah', e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-blue-900"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="text-[10px] text-slate-400 sm:hidden block">Persentase</label>
                  <input
                    type="text"
                    value={item.persentase}
                    onChange={(e) => handlePendidikanChange(idx, 'persentase', e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-700"
                  />
                </div>
                <div className="sm:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDeletePendidikan(idx)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus Jenjang Pendidikan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-[11px] text-slate-400">
            Perubahan data langsung mempengaruhi statistik pada profil publik Desa Kerep.
          </p>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0b3c2c] hover:bg-emerald-900 text-white font-bold shadow-md cursor-pointer transition-all active:scale-98 text-xs uppercase tracking-wide"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>Simpan Semua Data Sensus</span>
          </button>
        </div>
      </form>
    </div>
  );
};
