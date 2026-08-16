import React, { useState, useEffect } from 'react';
import {
  Settings,
  Shield,
  KeyRound,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Lock,
  User,
  Database,
  HardDrive,
  FileSpreadsheet,
  Layers,
  Sparkles,
  Info,
  Server
} from 'lucide-react';
import {
  getStoredAdminCredentials,
  updateAdminCredentials
} from '../../../utils/auth';
import {
  exportAllDataAsJSON,
  importDataFromJSON,
  resetDataToDefault,
  getStoredUmkmList,
  getStoredMapMarkersList,
  getStoredFacilityCategories,
  getStoredSchoolsList,
  getStoredGalleryList,
  getStoredDusunList,
  getStoredPendudukData
} from '../../../utils/dataStore';

interface AdminSettingsTabProps {
  onLogout: () => void;
}

export const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({ onLogout }) => {
  const currentCreds = getStoredAdminCredentials();
  const [name, setName] = useState(currentCreds.name || 'Administrator Desa');
  const [username, setUsername] = useState(currentCreds.username || 'admin');
  const [email, setEmail] = useState(currentCreds.email || 'admin@desakerep.id');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [credMessage, setCredMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [importMessage, setImportMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Statistics for system storage overview
  const [stats, setStats] = useState({
    umkmCount: 0,
    markerCount: 0,
    facilityCatCount: 0,
    schoolCount: 0,
    galleryCount: 0,
    dusunCount: 0,
    storageSizeKb: 0
  });

  const loadStats = () => {
    const umkm = getStoredUmkmList();
    const markers = getStoredMapMarkersList();
    const facilities = getStoredFacilityCategories();
    const schools = getStoredSchoolsList();
    const gallery = getStoredGalleryList();
    const dusun = getStoredDusunList();

    let totalChars = 0;
    if (typeof window !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('kerep_')) {
          totalChars += (localStorage.getItem(key) || '').length;
        }
      }
    }

    setStats({
      umkmCount: umkm.length,
      markerCount: markers.length,
      facilityCatCount: facilities.length,
      schoolCount: schools.length,
      galleryCount: gallery.length,
      dusunCount: dusun.length,
      storageSizeKb: Math.max(1, Math.round((totalChars * 2) / 1024))
    });
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleUpdateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setCredMessage(null);

    // If changing password, verify current password
    if (newPassword) {
      if (currentPassword !== currentCreds.password) {
        setCredMessage({ type: 'error', text: 'Password saat ini salah. Silakan periksa kembali.' });
        return;
      }
      if (newPassword.length < 4) {
        setCredMessage({ type: 'error', text: 'Password baru minimal 4 karakter.' });
        return;
      }
      if (newPassword !== confirmPassword) {
        setCredMessage({ type: 'error', text: 'Konfirmasi password baru tidak cocok.' });
        return;
      }
    }

    const res = updateAdminCredentials({
      name: name.trim() || 'Administrator Desa',
      username: username.trim() || 'admin',
      email: email.trim() || 'admin@desakerep.id',
      ...(newPassword ? { password: newPassword } : {})
    });

    if (res.success) {
      setCredMessage({ type: 'success', text: 'Kredensial dan profil admin berhasil diperbarui!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setCredMessage(null), 3000);
    } else {
      setCredMessage({ type: 'error', text: res.message });
    }
  };

  const handleExportJSON = () => {
    const jsonStr = exportAllDataAsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-peta-desa-kerep-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportSummaryCSV = () => {
    const umkm = getStoredUmkmList();
    let csv = 'ID,Nama UMKM,Pemilik,Dusun,Kategori,Alamat,Kontak,Jam Operasional,Deskripsi\n';
    umkm.forEach((u) => {
      csv += `"${u.id}","${u.name}","${u.pemilik}","${u.dusun}","${u.categoryBadge}","${u.alamat}","${u.kontak}","${u.jamOperasional}","${(u.deskripsi || '').replace(/"/g, '""')}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data-umkm-desa-kerep-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const res = importDataFromJSON(content);
        if (res.success) {
          setImportMessage({ type: 'success', text: 'Seluruh data backup berhasil diimpor ke sistem!' });
          loadStats();
          setTimeout(() => setImportMessage(null), 3500);
        } else {
          setImportMessage({ type: 'error', text: res.message });
        }
      } catch (err) {
        setImportMessage({ type: 'error', text: 'File backup JSON tidak dapat dibaca atau rusak.' });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetData = () => {
    resetDataToDefault();
    setIsResetConfirmOpen(false);
    loadStats();
    setImportMessage({ type: 'success', text: 'Seluruh data desa berhasil dikembalikan ke standar awal observasi 2026!' });
    setTimeout(() => setImportMessage(null), 3500);
  };

  return (
    <div className="space-y-5 max-w-4xl pb-10">
      {/* Header Banner */}
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
              PENGATURAN SISTEM, KEAMANAN & CADANGAN DATA
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelola kredensial login admin, ekspor/impor file cadangan JSON, serta pantau integritas penyimpanan.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: RINGKASAN PENYIMPANAN DATABASE LOKAL */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-800" />
            <span>Status Penyimpanan & Data Terdaftar</span>
          </h3>
          <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Kapasitas Aktif: ~{stats.storageSizeKb} KB
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5 text-center">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-bold block">UMKM Desa</span>
            <span className="text-base font-black text-emerald-900 font-mono">{stats.umkmCount}</span>
            <span className="text-[9px] text-slate-400 block">Unit Usaha</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-bold block">Titik Peta GIS</span>
            <span className="text-base font-black text-blue-900 font-mono">{stats.markerCount}</span>
            <span className="text-[9px] text-slate-400 block">Koordinat</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-bold block">Fasilitas</span>
            <span className="text-base font-black text-indigo-900 font-mono">{stats.facilityCatCount}</span>
            <span className="text-[9px] text-slate-400 block">Kategori</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-bold block">Pendidikan</span>
            <span className="text-base font-black text-amber-900 font-mono">{stats.schoolCount}</span>
            <span className="text-[9px] text-slate-400 block">Sekolah</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-bold block">Galeri Foto</span>
            <span className="text-base font-black text-purple-900 font-mono">{stats.galleryCount}</span>
            <span className="text-[9px] text-slate-400 block">Dokumentasi</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-bold block">Wilayah Dusun</span>
            <span className="text-base font-black text-slate-900 font-mono">{stats.dusunCount}</span>
            <span className="text-[9px] text-slate-400 block">Dusun</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: CADANGKAN & PULIHKAN DATA (BACKUP & RESTORE) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#0b3c2c]" />
            <h3 className="font-black text-slate-800 uppercase tracking-wider">
              Cadangkan (Backup) & Pemulihan Sistem Data
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Format JSON & CSV</span>
        </div>

        {importMessage && (
          <div
            className={`p-3.5 rounded-xl flex items-center gap-2 text-xs font-semibold ${
              importMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {importMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            )}
            <span>{importMessage.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Export JSON */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-slate-50 border border-emerald-200/80 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs">
                <Download className="w-4 h-4 text-emerald-700" />
                <span>1. Unduh Cadangan (Backup JSON)</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Menyimpan seluruh database (UMKM, fasilitas, titik peta, penduduk, dan galeri) ke dalam 1 file JSON di komputer Anda.
              </p>
            </div>
            <button
              onClick={handleExportJSON}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0b3c2c] hover:bg-emerald-900 text-white rounded-xl font-bold shadow-2xs transition-all active:scale-98 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Export Full JSON</span>
            </button>
          </div>

          {/* Import JSON */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/50 to-slate-50 border border-blue-200/80 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-blue-950 font-bold text-xs">
                <Upload className="w-4 h-4 text-blue-700" />
                <span>2. Pulihkan (Import File JSON)</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Pilih file JSON backup yang pernah Anda unduh untuk memulihkan seluruh data peta dan profil desa secara instan.
              </p>
            </div>
            <label className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold shadow-2xs cursor-pointer transition-all active:scale-98">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload File Backup</span>
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            </label>
          </div>

          {/* Reset ke Awal */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-red-50/40 to-slate-50 border border-red-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-red-950 font-bold text-xs">
                <RotateCcw className="w-4 h-4 text-red-600" />
                <span>3. Kembalikan ke Standar Awal</span>
              </div>
              <p className="text-[11px] text-red-700/80 mt-1 leading-relaxed">
                Mereset semua perubahan kembali ke data baku hasil observasi KKN Desa Kerep 2026.
              </p>
            </div>
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-2xs transition-all active:scale-98 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data Default</span>
            </button>
          </div>
        </div>

        {/* Quick CSV Export */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-100">
          <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
            <span>Ekspor Data Tabel untuk Excel atau Spreadsheet:</span>
          </span>
          <button
            onClick={handleExportSummaryCSV}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-[11px] flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3 h-3" />
            <span>Unduh CSV Daftar UMKM</span>
          </button>
        </div>
      </div>

      {/* SECTION 3: KREDENSIAL AKUN ADMINISTRATOR */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-700" />
            <h3 className="font-black text-slate-800 uppercase tracking-wider">
              Ubah Kredensial Akses Administrator
            </h3>
          </div>
          <span className="text-[10px] text-slate-400">Pengaturan Login & Keamanan</span>
        </div>

        {credMessage && (
          <div
            className={`p-3.5 rounded-xl flex items-center gap-2 text-xs font-semibold ${
              credMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {credMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            )}
            <span>{credMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdateAccount} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Nama Tampilan Admin</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Administrator Desa"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Username Login</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600 font-mono font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Email Administrator</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@desakerep.id"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600 font-mono"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <p className="text-[11px] text-slate-700 font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Ganti Password Administrator (Kosongkan jika tidak ingin mengubah password)</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-600 text-[11px]">Password Saat Ini</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Masukkan password lama"
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl font-mono text-[11px] focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 text-[11px]">Password Baru</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 4 karakter"
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl font-mono text-[11px] focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 text-[11px]">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password baru"
                  className="w-full p-2 bg-white border border-slate-200 rounded-xl font-mono text-[11px] focus:outline-hidden focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0b3c2c] hover:bg-emerald-900 text-white font-bold shadow-sm transition-all active:scale-98 cursor-pointer text-xs"
            >
              Simpan Pengaturan Akun
            </button>
          </div>
        </form>
      </div>

      {/* CONFIRM RESET MODAL */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">Reset Seluruh Data ke Default?</h4>
              <p className="text-xs text-slate-500 mt-1">
                Semua data UMKM, fasilitas, dan titik koordinat yang pernah diubah akan dikembalikan ke data awal observasi desa 2026.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleResetData}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl text-xs font-bold text-white shadow-sm transition-colors cursor-pointer"
              >
                Ya, Reset Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
