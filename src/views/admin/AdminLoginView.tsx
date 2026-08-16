import React, { useState, useEffect } from 'react';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Home,
  CheckCircle2
} from 'lucide-react';
import { CandaBirawaLogo } from '../../components/CandaBirawaLogo';
import { loginAdmin, checkIsAdminLoggedIn } from '../../utils/auth';

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
  onNavigateToPublic: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onLoginSuccess,
  onNavigateToPublic
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // If already logged in, redirect straight away
  useEffect(() => {
    if (checkIsAdminLoggedIn()) {
      onLoginSuccess();
    }
  }, [onLoginSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password) {
      setErrorMsg('Harap isi username/email dan password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = loginAdmin(username, password);
      setIsLoading(false);

      if (res.success) {
        setLoginSuccess(true);
        setTimeout(() => {
          onLoginSuccess();
        }, 500);
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Decorative Ambient Layers */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#0b3c2c] rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-emerald-700 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-amber-500 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Top Navbar */}
      <header className="relative z-10 p-4 border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onNavigateToPublic}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 bg-emerald-950/80 border border-emerald-700/40 p-1 rounded-xl flex items-center justify-center shadow-xs">
              <CandaBirawaLogo className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-[11px] font-black text-amber-400 tracking-wider uppercase">
                PETA DIGITAL
              </p>
              <p className="text-xs font-bold text-white uppercase tracking-tight">
                DESA KEREP TAROKAN
              </p>
            </div>
          </button>

          <button
            onClick={onNavigateToPublic}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700/80 transition-all hover:text-white"
          >
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span>Website Publik</span>
          </button>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Header Card Profile */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0b3c2c] to-emerald-800 border-2 border-emerald-500/30 p-2 shadow-lg shadow-emerald-950/50">
              <CandaBirawaLogo className="w-full h-full object-contain" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                <ShieldCheck className="w-3 h-3" />
                <span>Area Khusus Pengelola</span>
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">
                LOGIN ADMINISTRATOR
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Peta Digital & Pusat Data Desa Kerep
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-800/60 text-red-200 flex items-start gap-2.5 text-xs animate-shake">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-300">Gagal Masuk</p>
                <p className="text-red-200/90 text-[11px] mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Success Banner */}
          {loginSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-700 text-emerald-200 flex items-center gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-emerald-300">Autentikasi Berhasil</p>
                <p className="text-emerald-200/90 text-[11px]">Mengarahkan ke Dashboard Admin...</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Username / Email Admin
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username atau email"
                  autoComplete="username"
                  className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 transition-colors focus:outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password admin"
                  autoComplete="current-password"
                  className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 transition-colors focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || loginSuccess}
              className="w-full bg-gradient-to-r from-[#0b3c2c] to-emerald-700 hover:from-[#082e22] hover:to-emerald-800 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50 text-xs uppercase tracking-wide border border-emerald-500/30 cursor-pointer"
            >
              {isLoading ? (
                <span>Memverifikasi Akun...</span>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </>
              )}
            </button>
          </form>

          {/* Footer Back */}
          <div className="pt-2 border-t border-slate-800/80 text-center">
            <button
              onClick={onNavigateToPublic}
              className="text-xs text-slate-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
            >
              <span>← Kembali ke Halaman Publik Desa Kerep</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-4 text-center text-slate-500 text-[11px] border-t border-slate-800/50">
        <p>Sistem Informasi & Peta Digital Desa Kerep, Kec. Tarokan, Kab. Kediri</p>
        <p className="text-[10px] text-slate-600 mt-0.5">Observasi & Digitalisasi KKN 2026</p>
      </footer>
    </div>
  );
};
