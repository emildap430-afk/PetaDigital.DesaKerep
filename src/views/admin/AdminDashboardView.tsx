import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Store,
  GraduationCap,
  Building2,
  Sparkles,
  MapPin,
  Image as ImageIcon,
  Users,
  Building,
  Settings,
  LogOut,
  ChevronRight,
  ExternalLink,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { AdminHeader } from './AdminHeader';
import { AdminOverviewTab } from './tabs/AdminOverviewTab';
import { AdminUmkmTab } from './tabs/AdminUmkmTab';
import { AdminFasilitasTab } from './tabs/AdminFasilitasTab';
import { AdminPendidikanTab } from './tabs/AdminPendidikanTab';
import { AdminPetaTab } from './tabs/AdminPetaTab';
import { AdminGaleriTab } from './tabs/AdminGaleriTab';
import { AdminProfilTab } from './tabs/AdminProfilTab';
import { AdminPotensiTab } from './tabs/AdminPotensiTab';
import { AdminDusunTab } from './tabs/AdminDusunTab';
import { AdminPendudukTab } from './tabs/AdminPendudukTab';
import { AdminSettingsTab } from './tabs/AdminSettingsTab';
import { logoutAdmin, checkIsAdminLoggedIn } from '../../utils/auth';

interface AdminDashboardViewProps {
  initialTab?: string;
  onNavigateToPublic: () => void;
  onLogoutSuccess: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  initialTab = 'overview',
  onNavigateToPublic,
  onLogoutSuccess
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Security guard check
  useEffect(() => {
    if (!checkIsAdminLoggedIn()) {
      onLogoutSuccess();
    }
  }, [onLogoutSuccess]);

  const navTabs = [
    { id: 'overview', label: 'Ringkasan Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'umkm', label: 'Data UMKM', icon: Store, badge: 'CRUD' },
    { id: 'fasilitas', label: 'Fasilitas Desa', icon: Building2, badge: 'CRUD' },
    { id: 'pendidikan', label: 'Sarana Pendidikan', icon: GraduationCap, badge: 'CRUD' },
    { id: 'peta', label: 'Titik Koordinat Peta', icon: MapPin, badge: 'GIS' },
    { id: 'galeri', label: 'Galeri Foto Desa', icon: ImageIcon, badge: 'Foto' },
    { id: 'potensi', label: 'Potensi Sektor Desa', icon: Sparkles, badge: null },
    { id: 'profil', label: 'Profil & Visi Misi', icon: Building, badge: null },
    { id: 'dusun', label: 'Data 3 Dusun', icon: Building, badge: null },
    { id: 'penduduk', label: 'Data Penduduk & Sensus', icon: Users, badge: null },
    { id: 'settings', label: 'Pengaturan & Backup', icon: Settings, badge: null }
  ];

  const handleLogout = () => {
    logoutAdmin();
    onLogoutSuccess();
  };

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setIsSidebarMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <AdminHeader
        onLogout={() => setIsLogoutModalOpen(true)}
        onPreviewPublic={onNavigateToPublic}
      />

      {/* Mobile Subheader Bar */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-2xs">
        <button
          onClick={() => setIsSidebarMobileOpen(!isSidebarMobileOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold"
        >
          {isSidebarMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>Menu Navigasi Admin</span>
        </button>

        <span className="text-xs font-black text-[#0b3c2c] uppercase">
          {navTabs.find((t) => t.id === activeTab)?.label || 'Dashboard'}
        </span>
      </div>

      {/* Main Layout Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex gap-6">
        {/* Sidebar Navigation */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-72 max-w-[85vw] bg-white border-r border-slate-200 p-4 shadow-xl flex flex-col justify-between overflow-y-auto transition-transform duration-200 ease-in-out
            lg:static lg:w-64 lg:h-auto lg:p-0 lg:bg-transparent lg:border-none lg:shadow-none lg:translate-x-0 lg:overflow-visible
            ${isSidebarMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="space-y-4">
            <div className="lg:hidden flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-black text-slate-900 uppercase">Menu Administrator</span>
              <button
                onClick={() => setIsSidebarMobileOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-2 shadow-2xs space-y-1">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleSelectTab(tab.id)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left group
                      ${
                        isActive
                          ? 'bg-[#0b3c2c] text-white shadow-xs'
                          : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-amber-300' : 'text-slate-400 group-hover:text-emerald-800'
                        }`}
                      />
                      <span className="truncate">{tab.label}</span>
                    </div>

                    {tab.badge && (
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase shrink-0 ${
                          isActive
                            ? 'bg-amber-400 text-[#0b3c2c]'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-900'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar Quick Footer */}
          <div className="pt-4 border-t border-slate-200/80 lg:pt-0 lg:border-none space-y-2">
            <div className="bg-emerald-950/5 p-3 rounded-2xl border border-emerald-900/10 text-[11px] text-slate-600">
              <p className="font-bold text-[#0b3c2c]">Akses Aman Terenkripsi</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Sesi aktif tersimpan lokal selama 7 hari.</p>
            </div>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {isSidebarMobileOpen && (
          <div
            onClick={() => setIsSidebarMobileOpen(false)}
            className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'overview' && <AdminOverviewTab onSelectTab={handleSelectTab} />}
          {activeTab === 'umkm' && <AdminUmkmTab />}
          {activeTab === 'fasilitas' && <AdminFasilitasTab />}
          {activeTab === 'pendidikan' && <AdminPendidikanTab />}
          {activeTab === 'peta' && <AdminPetaTab />}
          {activeTab === 'galeri' && <AdminGaleriTab />}
          {activeTab === 'potensi' && <AdminPotensiTab />}
          {activeTab === 'profil' && <AdminProfilTab />}
          {activeTab === 'dusun' && <AdminDusunTab />}
          {activeTab === 'penduduk' && <AdminPendudukTab />}
          {activeTab === 'settings' && (
            <AdminSettingsTab onLogout={() => setIsLogoutModalOpen(true)} />
          )}
        </main>
      </div>

      {/* CONFIRM LOGOUT MODAL */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">Konfirmasi Keluar Admin</h4>
              <p className="text-xs text-slate-500 mt-1">
                Anda akan keluar dari sesi administrator. Untuk mengelola data kembali, Anda harus memasukkan password.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl text-xs font-bold text-white shadow-sm transition-colors cursor-pointer"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
