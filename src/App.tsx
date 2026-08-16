import React, { useState, useEffect } from 'react';
import { RouteState } from './types';
import { Header } from './components/Header';
import { LocationBar } from './components/LocationBar';
import { BottomNav } from './components/BottomNav';
import { HamburgerDrawer } from './components/HamburgerDrawer';
import { HomeView } from './views/HomeView';
import { ProfilView } from './views/ProfilView';
import { PotensiView } from './views/PotensiView';
import { UmkmListView } from './views/UmkmListView';
import { DetailUmkmView } from './views/DetailUmkmView';
import { FasilitasView } from './views/FasilitasView';
import { SaranaPendidikanView } from './views/SaranaPendidikanView';
import { DetailSekolahView } from './views/DetailSekolahView';
import { PetaView } from './views/PetaView';
import { GaleriView } from './views/GaleriView';
import { KontakView } from './views/KontakView';
import { AdminLoginView } from './views/admin/AdminLoginView';
import { AdminDashboardView } from './views/admin/AdminDashboardView';
import { checkIsAdminLoggedIn } from './utils/auth';

export default function App() {
  // Initialize route from URL if visiting /admin or /admin/login
  const [currentRoute, setCurrentRoute] = useState<RouteState>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin/login' || hash === '#/admin/login' || hash === '#admin-login') {
        return { view: 'admin-login' };
      }
      if (path === '/admin' || hash === '#/admin' || hash === '#admin') {
        return checkIsAdminLoggedIn() ? { view: 'admin' } : { view: 'admin-login' };
      }
    }
    return { view: 'beranda' };
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Sync URL pathname if supported
    if (typeof window !== 'undefined' && window.history) {
      if (currentRoute.view === 'admin-login') {
        window.history.replaceState(null, '', '/admin/login');
      } else if (currentRoute.view === 'admin') {
        window.history.replaceState(null, '', '/admin');
      } else if (window.location.pathname.startsWith('/admin')) {
        window.history.replaceState(null, '', '/');
      }
    }
  }, [currentRoute]);

  // Listen to popstate (back/forward browser buttons)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin/login') {
        setCurrentRoute({ view: 'admin-login' });
      } else if (path === '/admin') {
        if (checkIsAdminLoggedIn()) {
          setCurrentRoute({ view: 'admin' });
        } else {
          setCurrentRoute({ view: 'admin-login' });
        }
      } else if (currentRoute.view === 'admin' || currentRoute.view === 'admin-login') {
        setCurrentRoute({ view: 'beranda' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentRoute.view]);

  const handleNavigate = (newRoute: RouteState) => {
    // If route is admin or dashboard, check authentication
    if (newRoute.view === 'admin' || (newRoute.view as string) === 'dashboard') {
      if (checkIsAdminLoggedIn()) {
        setCurrentRoute({ view: 'admin', adminTab: newRoute.adminTab });
      } else {
        setCurrentRoute({ view: 'admin-login' });
      }
      return;
    }
    setCurrentRoute(newRoute);
  };

  // 1. ADMIN LOGIN VIEW (Full Screen, unauthenticated)
  if (currentRoute.view === 'admin-login') {
    return (
      <AdminLoginView
        onLoginSuccess={() => setCurrentRoute({ view: 'admin', adminTab: 'overview' })}
        onNavigateToPublic={() => setCurrentRoute({ view: 'beranda' })}
      />
    );
  }

  // 2. ADMIN DASHBOARD VIEW (Protected by Authentication)
  if (currentRoute.view === 'admin' || (currentRoute.view as string) === 'dashboard') {
    if (!checkIsAdminLoggedIn()) {
      return (
        <AdminLoginView
          onLoginSuccess={() => setCurrentRoute({ view: 'admin', adminTab: 'overview' })}
          onNavigateToPublic={() => setCurrentRoute({ view: 'beranda' })}
        />
      );
    }

    return (
      <AdminDashboardView
        initialTab={currentRoute.adminTab || 'overview'}
        onNavigateToPublic={() => setCurrentRoute({ view: 'beranda' })}
        onLogoutSuccess={() => setCurrentRoute({ view: 'admin-login' })}
      />
    );
  }

  // 3. PUBLIC WEBSITE VIEW (Completely preserved, untouched, no admin buttons)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      {/* Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Location Bar */}
      <LocationBar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentRoute.view === 'beranda' && (
          <HomeView onNavigate={handleNavigate} />
        )}

        {(currentRoute.view === 'profil' || currentRoute.view === 'profil-detail') && (
          <ProfilView currentRoute={currentRoute} onNavigate={handleNavigate} />
        )}

        {(currentRoute.view === 'potensi' || currentRoute.view === 'potensi-detail') && (
          <PotensiView currentRoute={currentRoute} onNavigate={handleNavigate} />
        )}

        {currentRoute.view === 'umkm-list' && (
          <UmkmListView onNavigate={handleNavigate} />
        )}

        {currentRoute.view === 'umkm-detail' && (
          <DetailUmkmView currentRoute={currentRoute} onNavigate={handleNavigate} />
        )}

        {(currentRoute.view === 'fasilitas' || currentRoute.view === 'fasilitas-detail' || currentRoute.view === 'fasilitas-item-detail') && (
          <FasilitasView currentRoute={currentRoute} onNavigate={handleNavigate} />
        )}

        {currentRoute.view === 'sarana-pendidikan' && (
          <SaranaPendidikanView onNavigate={handleNavigate} />
        )}

        {currentRoute.view === 'sekolah-detail' && (
          <DetailSekolahView currentRoute={currentRoute} onNavigate={handleNavigate} />
        )}

        {currentRoute.view === 'peta' && (
          <PetaView onNavigate={handleNavigate} />
        )}

        {currentRoute.view === 'galeri' && (
          <GaleriView onNavigate={handleNavigate} />
        )}

        {currentRoute.view === 'kontak' && (
          <KontakView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Fixed Mobile Bottom Navigation */}
      <BottomNav currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Slide-over Hamburger Menu Drawer */}
      <HamburgerDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
