import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Store,
  Building,
  GraduationCap,
  Image as ImageIcon,
  MapPin,
  PlusCircle,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Home,
  ChevronRight,
  Eye,
  Camera,
  Map
} from 'lucide-react';
import { RouteState } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  getStoredUmkmList,
  saveUmkmItem,
  deleteUmkmItem,
  getStoredFacilityCategories,
  saveFacilityItem,
  deleteFacilityItem,
  getStoredSchoolsList,
  saveSchoolItem,
  deleteSchoolItem,
  getStoredGalleryList,
  saveGalleryItem,
  deleteGalleryItem,
  getStoredMapMarkersList,
  saveMapMarker,
  resetAllDataToDefault,
  exportAllDataJson,
  importAllDataJson,
  subscribeDataUpdate
} from '../utils/dataStore';
import { UmkmData, FacilityItem, SchoolData, GalleryItem, MapMarkerItem } from '../../assets/data/villageData';

interface DashboardViewProps {
  onNavigate: (route: RouteState) => void;
}

type TabType = 'overview' | 'umkm' | 'fasilitas' | 'sekolah' | 'galeri' | 'backup';

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Loaded data
  const [umkmList, setUmkmList] = useState<UmkmData[]>([]);
  const [facilityCategories, setFacilityCategories] = useState<any[]>([]);
  const [schoolsList, setSchoolsList] = useState<SchoolData[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [mapMarkers, setMapMarkers] = useState<MapMarkerItem[]>([]);

  const refreshData = () => {
    setUmkmList(getStoredUmkmList());
    setFacilityCategories(getStoredFacilityCategories());
    setSchoolsList(getStoredSchoolsList());
    setGalleryList(getStoredGalleryList());
    setMapMarkers(getStoredMapMarkersList());
  };

  useEffect(() => {
    refreshData();
    const unsub = subscribeDataUpdate(() => {
      refreshData();
    });
    return unsub;
  }, []);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Helper for file upload to Base64
  const handleFileUpload = (file: File, callback: (base64: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        callback(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // ---------------- UMKM Form State ----------------
  const [umkmForm, setUmkmForm] = useState({
    name: '',
    shortName: '',
    categoryBadge: 'Kerajinan',
    dusun: 'Dusun Kerep',
    pemilik: '',
    alamat: '',
    deskripsi: '',
    produk: '',
    jamOperasional: 'Setiap Hari | 08.00 - 17.00 WIB',
    kontak: '',
    image: '',
    lat: '-7.7397',
    lng: '111.9135'
  });

  const handleAddUmkm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!umkmForm.name || !umkmForm.pemilik) {
      showToast('Mohon isi nama usaha dan nama pemilik', 'error');
      return;
    }

    const id = umkmForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);
    const prodArray = umkmForm.produk.split(',').map((p) => p.trim()).filter(Boolean);

    const newUmkm: UmkmData = {
      id,
      name: umkmForm.name,
      shortName: umkmForm.shortName || umkmForm.name,
      categoryBadge: umkmForm.categoryBadge,
      dusun: umkmForm.dusun,
      pemilik: umkmForm.pemilik,
      alamat: umkmForm.alamat || `${umkmForm.dusun}, Desa Kerep, Kec. Tarokan, Kab. Kediri`,
      deskripsi: umkmForm.deskripsi || `Usaha mikro ${umkmForm.name} di ${umkmForm.dusun}.`,
      fullDeskripsi: umkmForm.deskripsi,
      produk: prodArray.length > 0 ? prodArray : ['Produk Khas Desa Kerep'],
      jamOperasional: umkmForm.jamOperasional,
      kontak: umkmForm.kontak || '-',
      source: 'Input Mandiri Dashboard',
      statusVerifikasi: 'Terverifikasi',
      image: umkmForm.image || '/assets/images/umkm.jpg',
      dokumentasi: [umkmForm.image || '/assets/images/umkm.jpg']
    };

    saveUmkmItem(newUmkm);

    // Also add to map marker
    const lat = parseFloat(umkmForm.lat) || -7.7397;
    const lng = parseFloat(umkmForm.lng) || 111.9135;
    saveMapMarker({
      id: `marker-umkm-${id}`,
      name: newUmkm.name,
      category: 'potensi',
      categoryLabel: `UMKM (${newUmkm.categoryBadge})`,
      lat,
      lng,
      address: newUmkm.alamat,
      image: newUmkm.image,
      color: '#d97706'
    });

    showToast(`UMKM "${newUmkm.name}" berhasil ditambahkan!`);
    setUmkmForm({
      name: '',
      shortName: '',
      categoryBadge: 'Kerajinan',
      dusun: 'Dusun Kerep',
      pemilik: '',
      alamat: '',
      deskripsi: '',
      produk: '',
      jamOperasional: 'Setiap Hari | 08.00 - 17.00 WIB',
      kontak: '',
      image: '',
      lat: '-7.7397',
      lng: '111.9135'
    });
  };

  // ---------------- Facility Form State ----------------
  const [facilityForm, setFacilityForm] = useState({
    categoryId: 'umum',
    name: '',
    location: 'Dusun Kerep',
    description: '',
    jamOperasional: 'Setiap Hari',
    pengelola: 'Pemerintah Desa Kerep',
    kontak: '-',
    image: '',
    lat: '-7.7397',
    lng: '111.9135'
  });

  const handleAddFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facilityForm.name) {
      showToast('Mohon isi nama fasilitas', 'error');
      return;
    }

    const id = facilityForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);
    const lat = parseFloat(facilityForm.lat) || -7.7397;
    const lng = parseFloat(facilityForm.lng) || 111.9135;

    const newFacility: FacilityItem = {
      id,
      name: facilityForm.name,
      location: facilityForm.location,
      description: facilityForm.description || `Sarana dan fasilitas ${facilityForm.name} di ${facilityForm.location}.`,
      fullDescription: facilityForm.description,
      jamOperasional: facilityForm.jamOperasional,
      pengelola: facilityForm.pengelola,
      kontak: facilityForm.kontak,
      image: facilityForm.image || '/assets/images/balai-desa.jpg',
      dokumentasi: [facilityForm.image || '/assets/images/balai-desa.jpg'],
      lat,
      lng
    };

    saveFacilityItem(facilityForm.categoryId, newFacility);

    // Also add to map marker
    const catMap: Record<string, 'kantor' | 'kesehatan' | 'ibadah' | 'fasum' | 'pendidikan'> = {
      umum: 'kantor',
      kesehatan: 'kesehatan',
      peribadatan: 'ibadah',
      olahraga: 'fasum',
      pendidikan: 'pendidikan',
      lainnya: 'fasum'
    };

    saveMapMarker({
      id: `marker-fasilitas-${id}`,
      name: newFacility.name,
      category: catMap[facilityForm.categoryId] || 'fasum',
      categoryLabel: `Fasilitas (${facilityForm.categoryId})`,
      lat,
      lng,
      address: newFacility.location,
      image: newFacility.image,
      color: '#0b3c2c'
    });

    showToast(`Fasilitas "${newFacility.name}" berhasil ditambahkan!`);
    setFacilityForm({
      categoryId: 'umum',
      name: '',
      location: 'Dusun Kerep',
      description: '',
      jamOperasional: 'Setiap Hari',
      pengelola: 'Pemerintah Desa Kerep',
      kontak: '-',
      image: '',
      lat: '-7.7397',
      lng: '111.9135'
    });
  };

  // ---------------- School Form State ----------------
  const [schoolForm, setSchoolForm] = useState({
    name: '',
    shortName: '',
    badge: 'SD/MI',
    dusun: 'Dusun Kerep',
    npsn: '',
    status: 'Negeri',
    jenjang: 'Sekolah Dasar (SD)',
    alamat: 'Dusun Kerep, Desa Kerep, Kec. Tarokan, Kab. Kediri',
    akreditasi: 'A',
    kepalaSekolah: '',
    jumlahGuru: '10 Guru',
    jumlahSiswa: '120 Siswa',
    deskripsi: '',
    image: '',
    lat: '-7.7397',
    lng: '111.9135'
  });

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolForm.name) {
      showToast('Mohon isi nama sekolah', 'error');
      return;
    }

    const id = schoolForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);
    const newSchool: SchoolData = {
      id,
      name: schoolForm.name,
      shortName: schoolForm.shortName || schoolForm.name,
      badge: schoolForm.badge,
      dusun: schoolForm.dusun,
      distance: '0.5 km dari Balai Desa',
      source: 'Input Mandiri Dashboard',
      image: schoolForm.image || '/assets/images/sd-kerep.jpg',
      npsn: schoolForm.npsn || '20512345',
      status: schoolForm.status,
      jenjang: schoolForm.jenjang,
      alamat: schoolForm.alamat,
      kodePos: '64174',
      tahunBerdiri: '1985',
      akreditasi: schoolForm.akreditasi,
      kepalaSekolah: schoolForm.kepalaSekolah || 'Bapak/Ibu Kepala Sekolah',
      jumlahGuru: schoolForm.jumlahGuru,
      jumlahSiswa: schoolForm.jumlahSiswa,
      deskripsi: schoolForm.deskripsi || `Lembaga pendidikan ${schoolForm.name} di Desa Kerep.`,
      fasilitas: ['Ruang Kelas Representatif', 'Perpustakaan', 'Lapangan Olahraga', 'Musholla'],
      dokumentasi: [schoolForm.image || '/assets/images/sd-kerep.jpg']
    };

    saveSchoolItem(newSchool);

    // Also add to map marker
    const lat = parseFloat(schoolForm.lat) || -7.7397;
    const lng = parseFloat(schoolForm.lng) || 111.9135;
    saveMapMarker({
      id: `marker-sekolah-${id}`,
      name: newSchool.name,
      category: 'pendidikan',
      categoryLabel: `Pendidikan (${newSchool.badge})`,
      lat,
      lng,
      address: newSchool.alamat,
      image: newSchool.image,
      color: '#0284c7'
    });

    showToast(`Sekolah "${newSchool.name}" berhasil ditambahkan!`);
    setSchoolForm({
      name: '',
      shortName: '',
      badge: 'SD/MI',
      dusun: 'Dusun Kerep',
      npsn: '',
      status: 'Negeri',
      jenjang: 'Sekolah Dasar (SD)',
      alamat: 'Dusun Kerep, Desa Kerep, Kec. Tarokan, Kab. Kediri',
      akreditasi: 'A',
      kepalaSekolah: '',
      jumlahGuru: '10 Guru',
      jumlahSiswa: '120 Siswa',
      deskripsi: '',
      image: '',
      lat: '-7.7397',
      lng: '111.9135'
    });
  };

  // ---------------- Gallery Form State ----------------
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'kegiatan' as 'kegiatan' | 'potensi' | 'fasilitas',
    categoryLabel: 'Kegiatan Desa',
    image: '',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  });

  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.image) {
      showToast('Mohon isi judul dan upload/pilih gambar', 'error');
      return;
    }

    const id = 'galeri-' + Date.now().toString();
    const catLabelMap: Record<string, string> = {
      kegiatan: 'Kegiatan Desa',
      potensi: 'Potensi Desa',
      fasilitas: 'Fasilitas & Sarana'
    };

    const newGalleryItem: GalleryItem = {
      id,
      title: galleryForm.title,
      category: galleryForm.category,
      categoryLabel: catLabelMap[galleryForm.category] || 'Kegiatan',
      image: galleryForm.image,
      date: galleryForm.date
    };

    saveGalleryItem(newGalleryItem);
    showToast(`Foto galeri "${newGalleryItem.title}" berhasil ditambahkan!`);
    setGalleryForm({
      title: '',
      category: 'kegiatan',
      categoryLabel: 'Kegiatan Desa',
      image: '',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    });
  };

  // Total facilities count calculation
  const totalFacilitiesCount = facilityCategories.reduce(
    (acc, cat) => acc + (cat.items?.length || 0),
    0
  );

  const breadcrumbs = [
    { label: 'Beranda', target: { view: 'beranda' as const } },
    { label: 'Dashboard & Manajemen Data' }
  ];

  return (
    <div className="pb-24">
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Toast Alert */}
        {toastMsg && (
          <div
            className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2.5 shadow-md animate-fade-in ${
              toastMsg.type === 'success'
                ? 'bg-emerald-900 text-white'
                : 'bg-red-800 text-white'
            }`}
          >
            {toastMsg.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-300 shrink-0" />
            )}
            <span>{toastMsg.text}</span>
          </div>
        )}

        {/* Dashboard Title Header */}
        <div className="bg-gradient-to-br from-[#0b3c2c] to-[#072a1e] text-white p-4 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-amber-300" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-300/20">
                Pusat Kontrol Data
              </span>
            </div>
            <button
              onClick={() => onNavigate({ view: 'beranda' })}
              className="text-[11px] font-bold text-slate-200 hover:text-white flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </button>
          </div>

          <div>
            <h2 className="text-base font-black tracking-tight text-white uppercase">
              DASHBOARD & KELOLA DATA DESA
            </h2>
            <p className="text-xs text-emerald-100/80 leading-relaxed mt-0.5">
              Tambah, perbarui, atau kelola data UMKM, Fasilitas, Sekolah, Galeri foto, dan Titik Peta Desa Kerep secara instan.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
            { id: 'umkm', label: 'Tambah UMKM', icon: Store },
            { id: 'fasilitas', label: 'Tambah Fasilitas', icon: Building },
            { id: 'sekolah', label: 'Tambah Sekolah', icon: GraduationCap },
            { id: 'galeri', label: 'Tambah Galeri', icon: ImageIcon },
            { id: 'backup', label: 'Backup / Reset', icon: Download }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap focus:outline-hidden ${
                  isActive
                    ? 'bg-[#0b3c2c] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & STATS */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Total UMKM</span>
                  <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center text-amber-700">
                    <Store className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-black text-slate-900">{umkmList.length}</span>
                  <button
                    onClick={() => setActiveTab('umkm')}
                    className="text-[10px] font-bold text-emerald-800 hover:underline flex items-center gap-0.5"
                  >
                    + Tambah
                  </button>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Total Fasilitas</span>
                  <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-700">
                    <Building className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-black text-slate-900">{totalFacilitiesCount}</span>
                  <button
                    onClick={() => setActiveTab('fasilitas')}
                    className="text-[10px] font-bold text-emerald-800 hover:underline flex items-center gap-0.5"
                  >
                    + Tambah
                  </button>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Sekolah & Ponpes</span>
                  <div className="w-7 h-7 bg-sky-50 rounded-lg flex items-center justify-center text-sky-700">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-black text-slate-900">{schoolsList.length}</span>
                  <button
                    onClick={() => setActiveTab('sekolah')}
                    className="text-[10px] font-bold text-emerald-800 hover:underline flex items-center gap-0.5"
                  >
                    + Tambah
                  </button>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Foto Galeri</span>
                  <div className="w-7 h-7 bg-purple-50 rounded-lg flex items-center justify-center text-purple-700">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-black text-slate-900">{galleryList.length}</span>
                  <button
                    onClick={() => setActiveTab('galeri')}
                    className="text-[10px] font-bold text-emerald-800 hover:underline flex items-center gap-0.5"
                  >
                    + Tambah
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase">Aksi Cepat Manajemen</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveTab('umkm')}
                  className="p-3 bg-amber-50/60 hover:bg-amber-50 border border-amber-200/60 rounded-xl text-left transition-colors flex items-center gap-2.5"
                >
                  <PlusCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Entri UMKM</div>
                    <div className="text-[10px] text-slate-500">Dusun & kontak usaha</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('fasilitas')}
                  className="p-3 bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-200/60 rounded-xl text-left transition-colors flex items-center gap-2.5"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Entri Fasilitas</div>
                    <div className="text-[10px] text-slate-500">Balai, posyandu, ibadah</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('sekolah')}
                  className="p-3 bg-sky-50/60 hover:bg-sky-50 border border-sky-200/60 rounded-xl text-left transition-colors flex items-center gap-2.5"
                >
                  <PlusCircle className="w-4 h-4 text-sky-700 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Entri Sekolah</div>
                    <div className="text-[10px] text-slate-500">SD, MI, TK, Ponpes</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('galeri')}
                  className="p-3 bg-purple-50/60 hover:bg-purple-50 border border-purple-200/60 rounded-xl text-left transition-colors flex items-center gap-2.5"
                >
                  <PlusCircle className="w-4 h-4 text-purple-700 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Upload Galeri</div>
                    <div className="text-[10px] text-slate-500">Foto kegiatan KKN</div>
                  </div>
                </button>
              </div>
            </div>

            {/* List of Recent UMKM with Delete buttons */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase">Daftar UMKM Terdaftar ({umkmList.length})</h3>
                <button
                  onClick={() => onNavigate({ view: 'umkm-list' })}
                  className="text-[11px] font-bold text-emerald-800 hover:underline flex items-center gap-0.5"
                >
                  <span>Lihat di App</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {umkmList.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">{item.name}</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                          <span className="font-semibold text-emerald-800">{item.dusun}</span> • {item.pemilik}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Hapus UMKM "${item.name}"?`)) {
                          deleteUmkmItem(item.id);
                          showToast(`UMKM "${item.name}" dihapus`);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus UMKM"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* List of Schools */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase">Daftar Sarana Pendidikan ({schoolsList.length})</h3>
                <button
                  onClick={() => onNavigate({ view: 'sarana-pendidikan' })}
                  className="text-[11px] font-bold text-emerald-800 hover:underline flex items-center gap-0.5"
                >
                  <span>Lihat di App</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {schoolsList.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">{item.name}</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                          <span className="font-semibold text-sky-800">{item.jenjang}</span> • {item.dusun}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Hapus Sekolah "${item.name}"?`)) {
                          deleteSchoolItem(item.id);
                          showToast(`Sekolah "${item.name}" dihapus`);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus Sekolah"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TAMBAH UMKM */}
        {activeTab === 'umkm' && (
          <form onSubmit={handleAddUmkm} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Store className="w-4 h-4 text-emerald-800" />
              <h3 className="font-bold text-slate-900 uppercase">Form Tambah UMKM Baru</h3>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Nama Usaha / UMKM *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Keripik Pisang Bu Siti"
                value={umkmForm.name}
                onChange={(e) => setUmkmForm({ ...umkmForm, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Kategori Usaha</label>
                <select
                  value={umkmForm.categoryBadge}
                  onChange={(e) => setUmkmForm({ ...umkmForm, categoryBadge: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs bg-white"
                >
                  <option value="Kerajinan">Kerajinan</option>
                  <option value="Olahan Pangan">Olahan Pangan</option>
                  <option value="Pertanian">Pertanian</option>
                  <option value="Peternakan">Peternakan</option>
                  <option value="Kuliner">Kuliner</option>
                  <option value="Mebel & Kayu">Mebel & Kayu</option>
                  <option value="Jasa & Lainnya">Jasa & Lainnya</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Lokasi Dusun</label>
                <select
                  value={umkmForm.dusun}
                  onChange={(e) => setUmkmForm({ ...umkmForm, dusun: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs bg-white"
                >
                  <option value="Dusun Kerep">Dusun Kerep</option>
                  <option value="Dusun Balongasem">Dusun Balongasem</option>
                  <option value="Dusun Cabak Banjarsari">Dusun Cabak Banjarsari</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Pemilik *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ibu Siti Rahayu"
                  value={umkmForm.pemilik}
                  onChange={(e) => setUmkmForm({ ...umkmForm, pemilik: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">No. WhatsApp / Kontak</label>
                <input
                  type="text"
                  placeholder="Contoh: 0812-3456-7890"
                  value={umkmForm.kontak}
                  onChange={(e) => setUmkmForm({ ...umkmForm, kontak: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Alamat Lengkap (RT/RW/Dusun)</label>
              <input
                type="text"
                placeholder="Contoh: RT 02 / RW 01 Dusun Kerep, Desa Kerep"
                value={umkmForm.alamat}
                onChange={(e) => setUmkmForm({ ...umkmForm, alamat: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Daftar Produk (Pisahkan dengan koma)</label>
              <input
                type="text"
                placeholder="Contoh: Keripik Pisang Coklat, Keripik Pisang Gurih, Sale Pisang"
                value={umkmForm.produk}
                onChange={(e) => setUmkmForm({ ...umkmForm, produk: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Deskripsi Singkat Usaha</label>
              <textarea
                rows={3}
                placeholder="Jelaskan keunggulan dan proses produksi UMKM ini..."
                value={umkmForm.deskripsi}
                onChange={(e) => setUmkmForm({ ...umkmForm, deskripsi: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
              />
            </div>

            {/* Foto Upload & Image URL */}
            <div className="space-y-2 border-t border-slate-100 pt-2">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-emerald-800" />
                <span>Foto Produk / Usaha</span>
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="URL Foto atau jalur gambar (/assets/images/umkm.jpg)"
                  value={umkmForm.image}
                  onChange={(e) => setUmkmForm({ ...umkmForm, image: e.target.value })}
                  className="flex-1 p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
                />
                <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2.5 rounded-xl border border-slate-300 flex items-center gap-1 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileUpload(e.target.files[0], (base64) => {
                          setUmkmForm((prev) => ({ ...prev, image: base64 }));
                        });
                      }
                    }}
                  />
                </label>
              </div>

              {umkmForm.image && (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200">
                  <img src={umkmForm.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Simpan Data UMKM Baru</span>
            </button>
          </form>
        )}

        {/* TAB 3: TAMBAH FASILITAS */}
        {activeTab === 'fasilitas' && (
          <form onSubmit={handleAddFacility} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Building className="w-4 h-4 text-emerald-800" />
              <h3 className="font-bold text-slate-900 uppercase">Form Tambah Fasilitas / Sarana Desa</h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Kategori Fasilitas *</label>
                <select
                  value={facilityForm.categoryId}
                  onChange={(e) => setFacilityForm({ ...facilityForm, categoryId: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs bg-white"
                >
                  <option value="umum">Fasilitas Umum / Pemerintahan</option>
                  <option value="kesehatan">Sarana Kesehatan (Poskesdes/Posyandu)</option>
                  <option value="peribadatan">Sarana Ibadah (Masjid/Musholla)</option>
                  <option value="olahraga">Sarana Olahraga</option>
                  <option value="pendidikan">Sarana Pendidikan</option>
                  <option value="lainnya">Fasilitas Lainnya</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Lokasi Dusun</label>
                <select
                  value={facilityForm.location}
                  onChange={(e) => setFacilityForm({ ...facilityForm, location: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs bg-white"
                >
                  <option value="Dusun Kerep">Dusun Kerep</option>
                  <option value="Dusun Balongasem">Dusun Balongasem</option>
                  <option value="Dusun Cabak Banjarsari">Dusun Cabak Banjarsari</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Nama Sarana / Fasilitas *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Balai Pertemuan Dusun Cabak"
                value={facilityForm.name}
                onChange={(e) => setFacilityForm({ ...facilityForm, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Pengelola</label>
                <input
                  type="text"
                  placeholder="Contoh: Pemerintah Desa / Warga RW 02"
                  value={facilityForm.pengelola}
                  onChange={(e) => setFacilityForm({ ...facilityForm, pengelola: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Jam Operasional</label>
                <input
                  type="text"
                  placeholder="Contoh: Setiap Hari / 24 Jam"
                  value={facilityForm.jamOperasional}
                  onChange={(e) => setFacilityForm({ ...facilityForm, jamOperasional: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Deskripsi & Fungsi Fasilitas</label>
              <textarea
                rows={3}
                placeholder="Jelaskan fungsi, sarana yang tersedia, dan pemanfaatan warga..."
                value={facilityForm.description}
                onChange={(e) => setFacilityForm({ ...facilityForm, description: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
              />
            </div>

            {/* Foto Upload & Image URL */}
            <div className="space-y-2 border-t border-slate-100 pt-2">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-emerald-800" />
                <span>Foto Bangunan / Lokasi Fasilitas</span>
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="URL Foto atau jalur gambar (/assets/images/balai-desa.jpg)"
                  value={facilityForm.image}
                  onChange={(e) => setFacilityForm({ ...facilityForm, image: e.target.value })}
                  className="flex-1 p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
                />
                <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2.5 rounded-xl border border-slate-300 flex items-center gap-1 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileUpload(e.target.files[0], (base64) => {
                          setFacilityForm((prev) => ({ ...prev, image: base64 }));
                        });
                      }
                    }}
                  />
                </label>
              </div>

              {facilityForm.image && (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200">
                  <img src={facilityForm.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Simpan Data Fasilitas Baru</span>
            </button>
          </form>
        )}

        {/* TAB 4: TAMBAH SEKOLAH */}
        {activeTab === 'sekolah' && (
          <form onSubmit={handleAddSchool} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <GraduationCap className="w-4 h-4 text-sky-800" />
              <h3 className="font-bold text-slate-900 uppercase">Form Tambah Sarana Pendidikan</h3>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Nama Sekolah / Lembaga Pendidikan *</label>
              <input
                type="text"
                required
                placeholder="Contoh: PAUD Melati Kerep"
                value={schoolForm.name}
                onChange={(e) => setSchoolForm({ ...schoolForm, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Jenjang</label>
                <select
                  value={schoolForm.jenjang}
                  onChange={(e) => {
                    const val = e.target.value;
                    let b = 'SD/MI';
                    if (val.includes('TK') || val.includes('PAUD')) b = 'TK/PAUD';
                    if (val.includes('Pesantren')) b = 'Pesantren';
                    setSchoolForm({ ...schoolForm, jenjang: val, badge: b });
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs bg-white"
                >
                  <option value="Sekolah Dasar (SD)">Sekolah Dasar (SD)</option>
                  <option value="Madrasah Ibtidaiyah (MI)">Madrasah Ibtidaiyah (MI)</option>
                  <option value="Taman Kanak-Kanak / PAUD">Taman Kanak-Kanak / PAUD</option>
                  <option value="Pondok Pesantren">Pondok Pesantren</option>
                  <option value="Madrasah Diniyah (Madin)">Madrasah Diniyah (Madin)</option>
                  <option value="SMP / MTs">SMP / MTs</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Lokasi Dusun</label>
                <select
                  value={schoolForm.dusun}
                  onChange={(e) => setSchoolForm({ ...schoolForm, dusun: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs bg-white"
                >
                  <option value="Dusun Kerep">Dusun Kerep</option>
                  <option value="Dusun Balongasem">Dusun Balongasem</option>
                  <option value="Dusun Cabak Banjarsari">Dusun Cabak Banjarsari</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">NPSN / Nomor Izin</label>
                <input
                  type="text"
                  placeholder="Contoh: 20512345"
                  value={schoolForm.npsn}
                  onChange={(e) => setSchoolForm({ ...schoolForm, npsn: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Akreditasi</label>
                <select
                  value={schoolForm.akreditasi}
                  onChange={(e) => setSchoolForm({ ...schoolForm, akreditasi: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs bg-white"
                >
                  <option value="A">A (Unggul)</option>
                  <option value="B">B (Baik)</option>
                  <option value="C">C (Cukup)</option>
                  <option value="Terakreditasi">Terakreditasi</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Kepala Sekolah / Pimpinan</label>
                <input
                  type="text"
                  placeholder="Contoh: Hj. Siti Nurjanah, S.Pd."
                  value={schoolForm.kepalaSekolah}
                  onChange={(e) => setSchoolForm({ ...schoolForm, kepalaSekolah: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Jumlah Siswa</label>
                <input
                  type="text"
                  placeholder="Contoh: 65 Siswa"
                  value={schoolForm.jumlahSiswa}
                  onChange={(e) => setSchoolForm({ ...schoolForm, jumlahSiswa: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Alamat Sekolah</label>
              <input
                type="text"
                placeholder="Contoh: Jl. Pendidikan Dusun Kerep, Desa Kerep"
                value={schoolForm.alamat}
                onChange={(e) => setSchoolForm({ ...schoolForm, alamat: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
              />
            </div>

            {/* Foto Upload & Image URL */}
            <div className="space-y-2 border-t border-slate-100 pt-2">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-sky-800" />
                <span>Foto Gedung Sekolah</span>
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="URL Foto atau jalur gambar (/assets/images/sd-kerep.jpg)"
                  value={schoolForm.image}
                  onChange={(e) => setSchoolForm({ ...schoolForm, image: e.target.value })}
                  className="flex-1 p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
                />
                <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2.5 rounded-xl border border-slate-300 flex items-center gap-1 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileUpload(e.target.files[0], (base64) => {
                          setSchoolForm((prev) => ({ ...prev, image: base64 }));
                        });
                      }
                    }}
                  />
                </label>
              </div>

              {schoolForm.image && (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200">
                  <img src={schoolForm.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Simpan Sarana Pendidikan Baru</span>
            </button>
          </form>
        )}

        {/* TAB 5: TAMBAH GALERI */}
        {activeTab === 'galeri' && (
          <form onSubmit={handleAddGallery} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <ImageIcon className="w-4 h-4 text-purple-800" />
              <h3 className="font-bold text-slate-900 uppercase">Form Tambah Foto Galeri Desa</h3>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Judul Kegiatan / Objek Foto *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Kerja Bakti Pembersihan Saluran Dusun Cabak"
                value={galleryForm.title}
                onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Kategori</label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs bg-white"
                >
                  <option value="kegiatan">Kegiatan Warga / KKN</option>
                  <option value="potensi">Potensi Alam & UMKM</option>
                  <option value="fasilitas">Fasilitas & Bangunan</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Tanggal Kegiatan</label>
                <input
                  type="text"
                  placeholder="Contoh: 12 Agustus 2026"
                  value={galleryForm.date}
                  onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
                />
              </div>
            </div>

            {/* Foto Upload & Image URL */}
            <div className="space-y-2 border-t border-slate-100 pt-2">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-purple-800" />
                <span>Pilih Foto *</span>
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="URL Foto atau jalur gambar (/assets/images/kegiatan-1.jpg)"
                  value={galleryForm.image}
                  onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                  className="flex-1 p-2.5 rounded-xl border border-slate-300 focus:outline-emerald-800 text-xs"
                />
                <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2.5 rounded-xl border border-slate-300 flex items-center gap-1 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileUpload(e.target.files[0], (base64) => {
                          setGalleryForm((prev) => ({ ...prev, image: base64 }));
                        });
                      }
                    }}
                  />
                </label>
              </div>

              {galleryForm.image && (
                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200">
                  <img src={galleryForm.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Publikasikan ke Galeri Desa</span>
            </button>
          </form>
        )}

        {/* TAB 6: BACKUP & RESET */}
        {activeTab === 'backup' && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Download className="w-4 h-4 text-emerald-800" />
              <h3 className="font-bold text-slate-900 uppercase">Ekspor & Cadangkan Data Desa</h3>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Anda dapat mengunduh seluruh data yang tersimpan dalam format JSON untuk cadangan, atau memulihkan data bawaan awal.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  const jsonStr = exportAllDataJson();
                  const blob = new Blob([jsonStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `data_desa_kerep_${new Date().toISOString().slice(0, 10)}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                  showToast('Data berhasil diunduh sebagai file JSON!');
                }}
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Unduh File Cadangan (JSON)</span>
              </button>

              <label className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                <span>Impor Data dari File JSON</span>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const content = event.target?.result as string;
                        if (content && importAllDataJson(content)) {
                          showToast('Data berhasil diimpor!');
                        } else {
                          showToast('Gagal mengimpor file data', 'error');
                        }
                      };
                      reader.readAsText(file);
                    }
                  }}
                />
              </label>

              <button
                onClick={() => {
                  if (confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh data kembali ke versi awal KKN? Data tambahan Anda akan dibersihkan.')) {
                    resetAllDataToDefault();
                    showToast('Data telah direset ke setelan awal KKN!');
                  }
                }}
                className="w-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-red-600" />
                <span>Reset ke Data Awal Observasi KKN</span>
              </button>
            </div>
          </div>
        )}

        {/* Return Button */}
        <div className="pt-2">
          <button
            onClick={() => onNavigate({ view: 'beranda' })}
            className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
          >
            <Home className="w-4 h-4 text-amber-300" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </div>
  );
};
