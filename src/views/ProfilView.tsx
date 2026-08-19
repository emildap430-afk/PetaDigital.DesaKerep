import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  BookOpen,
  Target,
  History,
  Compass,
  Building,
  Users,
  Info,
  ArrowLeft,
  Home,
  MapPin,
  Sparkles,
  Phone,
  Clock,
  ShieldCheck,
  UserCheck,
  FileText,
  DollarSign,
  TrendingUp,
  Map
} from 'lucide-react';
import { RouteState } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import heroBgImage from "../assets/images/pemandangan.jpeg";
import {
  ProfilDesaData,
  getStoredProfilDesa,
  getStoredPendudukData,
  getStoredDusunList,
  PendudukDemografi,
  DusunItem
} from '../utils/dataStore';

interface ProfilViewProps {
  currentRoute: RouteState;
  onNavigate: (route: RouteState) => void;
}

export const ProfilView: React.FC<ProfilViewProps> = ({ currentRoute, onNavigate }) => {
  const profilId = currentRoute.profilId;
  const [profilData, setProfilData] = useState<ProfilDesaData>(getStoredProfilDesa());
  const [pendudukData, setPendudukData] = useState<PendudukDemografi>(getStoredPendudukData());
  const [dusunList, setDusunList] = useState<DusunItem[]>(getStoredDusunList());

  useEffect(() => {
    const syncData = () => {
      setProfilData(getStoredProfilDesa());
      setPendudukData(getStoredPendudukData());
      setDusunList(getStoredDusunList());
    };

    window.addEventListener('desa-data-updated', syncData);
    window.addEventListener('storage', syncData);
    return () => {
      window.removeEventListener('desa-data-updated', syncData);
      window.removeEventListener('storage', syncData);
    };
  }, []);

  const profilMenuItems = [
    {
      id: 'tentang',
      title: 'Tentang Desa Kerep',
      subtitle: 'Informasi umum & selayang pandang desa',
      icon: Info
    },
    {
      id: 'visi-misi',
      title: 'Visi & Misi Desa',
      subtitle: 'Visi, misi, dan tujuan pembangunan desa',
      icon: Target
    },
    {
      id: 'sejarah',
      title: 'Sejarah Desa',
      subtitle: 'Sejarah terbentuknya & babad Desa Kerep',
      icon: History
    },
    {
      id: 'geografis',
      title: 'Kondisi Geografis',
      subtitle: 'Letak, batas wilayah, dan bentang alam',
      icon: Compass
    },
    {
      id: 'pemerintahan',
      title: 'Pemerintahan Desa',
      subtitle: 'Struktur aparatur & perangkat desa',
      icon: Building
    },
    {
      id: 'penduduk',
      title: 'Data Penduduk',
      subtitle: 'Statistik demografi, KK, dan mata pencaharian',
      icon: Users
    }
  ];

  // Render detail screen if profilId exists
  if (profilId) {
    const activeItem = profilMenuItems.find((item) => item.id === profilId);

    const breadcrumbs = [
      { label: 'Beranda', target: { view: 'beranda' as const } },
      { label: 'Profil Desa', target: { view: 'profil' as const } },
      { label: activeItem ? activeItem.title : 'Detail' }
    ];

    return (
      <div className="pb-24">
        <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

        <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
          {/* Header Card */}
          <div className="bg-[#0b3c2c] text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-md space-y-2">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-white/10 rounded-xl">
                {activeItem && <activeItem.icon className="w-6 h-6 text-amber-300" />}
              </span>
              <div>
                <h2 className="text-base sm:text-xl font-black uppercase tracking-tight text-white">
                  {activeItem ? activeItem.title : 'PROFIL DESA'}
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">{activeItem?.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Dynamic Content Based on profilId */}
          {profilId === 'tentang' && (
            <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xs space-y-5">
              <div className="h-48 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 relative">
                <img
                  src={heroBgImage}
                  alt="Pemandangan Pegunungan Wilis Desa Kerep"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <p className="text-sm sm:text-base font-black uppercase">{profilData.nama || 'DESA KEREP'}</p>
                    <p className="text-xs text-emerald-200">{profilData.motto || 'Kerep Makmur, Gotong Royong, Berbudaya, & Maju'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  <strong>{profilData.nama || 'Desa Kerep'}</strong> merupakan salah satu desa yang terletak di Kecamatan {profilData.kecamatan || 'Tarokan'}, Kabupaten {profilData.kabupaten || 'Kediri'}, Provinsi {profilData.provinsi || 'Jawa Timur'}.
                </p>
                <p>
                  {profilData.deskripsi ||
                    'Desa Kerep dikelilingi oleh bentangan sawah subur, perkebunan palawija, serta kekayaan alam lereng pegunungan. Kehidupan masyarakat desa menjunjung tinggi tradisi gotong royong, kebudayaan lokal, dan keramahan sosial.'}
                </p>
              </div>

              <div className="bg-slate-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 space-y-3 text-xs sm:text-sm">
                <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1.5">Ringkasan Informasi Wilayah</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                  <div><span className="text-slate-500 block text-[11px]">Jumlah Dusun:</span> <span className="font-semibold">{dusunList.length || 3} Dusun</span></div>
                  <div><span className="text-slate-500 block text-[11px]">Luas Wilayah:</span> <span className="font-semibold">{profilData.luasWilayah || '± 215 Ha'}</span></div>
                  <div><span className="text-slate-500 block text-[11px]">Penduduk:</span> <span className="font-semibold">{profilData.jumlahPenduduk || '3.948'} Jiwa</span></div>
                  <div><span className="text-slate-500 block text-[11px]">Kecamatan:</span> <span className="font-semibold">{profilData.kecamatan || 'Tarokan'}</span></div>
                  <div><span className="text-slate-500 block text-[11px]">Kabupaten:</span> <span className="font-semibold">{profilData.kabupaten || 'Kediri'}</span></div>
                  <div><span className="text-slate-500 block text-[11px]">Kode Pos:</span> <span className="font-semibold">{profilData.kodePos || '64174'}</span></div>
                </div>
              </div>

              <div className="bg-emerald-50/70 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-emerald-200 space-y-2 text-xs sm:text-sm text-emerald-950">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <MapPin className="w-4 h-4" />
                  <span>Kantor Balai Desa:</span>
                </div>
                <p className="pl-6 text-slate-700">{profilData.balaiDesa || 'Dusun Kerep, Desa Kerep, Kec. Tarokan, Kab. Kediri'}</p>
                <div className="flex items-center gap-2 font-bold text-emerald-900 pt-1">
                  <Clock className="w-4 h-4" />
                  <span>Jam Pelayanan:</span>
                </div>
                <p className="pl-6 text-slate-700">{profilData.jamPelayanan || 'Senin - Jumat (08.00 - 15.00 WIB)'}</p>
              </div>
            </div>
          )}

          {profilId === 'visi-misi' && (
            <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xs space-y-6">
              {/* Visi */}
              <div className="bg-emerald-50/80 border border-emerald-200 p-5 rounded-xl sm:rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                    VISI DESA KEREP
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-emerald-950 italic leading-relaxed pt-1">
                  "{profilData.visi || 'Terwujudnya Desa Kerep yang Maju, Sejahtera, Mandiri, dan Berbudaya berbasis Pertanian dan Kemitraan Masyarakat.'}"
                </p>
              </div>

              {/* Misi */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                    MISI PEMBANGUNAN DESA
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {profilData.misi?.length || 0} Poin Misi
                  </span>
                </div>

                <div className="space-y-2.5 bg-slate-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                  {profilData.misi && profilData.misi.length > 0 ? (
                    profilData.misi.map((misi, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-800 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          {idx + 1}
                        </span>
                        <p className="pt-0.5">{misi}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-500 italic">Belum ada misi yang terdaftar.</p>
                  )}
                </div>
              </div>

              {/* Motto Card */}
              {profilData.motto && (
                <div className="p-4 sm:p-5 bg-amber-50/70 border border-amber-200 rounded-xl sm:rounded-2xl flex items-center gap-3 text-xs sm:text-sm text-amber-950">
                  <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold text-amber-800 uppercase">Motto Desa:</span>
                    <p className="font-bold text-amber-900 mt-0.5 text-xs sm:text-sm">"{profilData.motto}"</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {profilId === 'sejarah' && (
            <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {profilData.sejarah ? (
                  profilData.sejarah.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-justify">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <>
                    <p>
                      <strong>Sejarah Desa Kerep:</strong> Nama "Kerep" berakar dari tradisi kebersamaan dan kerukunan warga dalam membangun pemukiman agraris di lereng Gunung Wilis.
                    </p>
                    <p>
                      Kurang lebih pada tahun 1892-1938 kepala desa Kerep dijabat oleh seorang pria bernama Parto Ngulomo yang menjabat sampai meninggal dunia, kemudian dilanjutkan oleh Cipto Diharjo dan para kepala desa penerus.
                    </p>
                    <p>
                      Di Dusun Cabak, Desa Kerep, terdapat punden bernama Syekh Zainudin Zaenuri (dikenal sebagai Mbah Gedong) yang senantiasa dihormati melalui tradisi bersih dusun, tasyakuran sedekah bumi, dan pagelaran wayang kulit.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {profilId === 'geografis' && (
            <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xs space-y-5">
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <h4 className="font-bold text-slate-900">Kondisi Geografis & Topografi:</h4>
                <p className="bg-slate-50 p-4 rounded-xl sm:rounded-2xl border border-slate-200 leading-relaxed">
                  {profilData.geografis ||
                    'Desa Kerep terletak di bagian barat Kabupaten Kediri di dataran subur lereng Gunung Wilis dengan ketinggian ± 85-150 mdpl. Wilayah didominasi hamparan persawahan teknis dan pemukiman warga.'}
                </p>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                <h4 className="font-bold text-slate-900">Batas Wilayah Desa Kerep:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-slate-500 font-bold block text-[10px] sm:text-xs">BATAS UTARA</span>
                    <span className="font-bold text-slate-800">{profilData.batasWilayah?.utara || 'Desa Bulusari & Kab. Nganjuk'}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-slate-500 font-bold block text-[10px] sm:text-xs">BATAS SELATAN</span>
                    <span className="font-bold text-slate-800">{profilData.batasWilayah?.selatan || 'Desa Cerme'}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-slate-500 font-bold block text-[10px] sm:text-xs">BATAS TIMUR</span>
                    <span className="font-bold text-slate-800">{profilData.batasWilayah?.timur || 'Desa Tarokan'}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-slate-500 font-bold block text-[10px] sm:text-xs">BATAS BARAT</span>
                    <span className="font-bold text-slate-800">{profilData.batasWilayah?.barat || 'Kawasan Perhutani / Perbukitan'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700 pt-1">
                <h4 className="font-bold text-slate-900">Wilayah Dusun ({dusunList.length || 3} Dusun):</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                  {dusunList.map((dusun, idx) => (
                    <div key={dusun.id || idx} className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <strong className="text-emerald-950 block">{idx + 1}. {dusun.name}</strong>
                      <p className="text-slate-600 mt-1 text-xs">{dusun.karakteristik || 'Kawasan pemukiman & pertanian desa.'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {profilId === 'pemerintahan' && (
            <div className="bg-white p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                    Bagan Struktur Organisasi Pemerintah Desa Kerep
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Struktur bagan resmi tata kelola kepemimpinan, pelaksana teknis (Kasi), sekretariat (Kaur), dan kewilayahan (Kasun).
                  </p>
                </div>
                <span className="text-[11px] sm:text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto uppercase tracking-wider">
                  Bagan Resmi
                </span>
              </div>

              {/* Bagan Diagram Alur Struktur (Top-Down Sequence: Kades -> Sekdes & Kaur -> Kasi -> Kasun) */}
              <div className="py-2 overflow-x-auto">
                <div className="min-w-[640px] max-w-4xl mx-auto flex flex-col items-center">
                  
                  {/* LEVEL 1: KEPALA DESA */}
                  <div className="w-full max-w-sm text-center">
                    <div className="bg-gradient-to-b from-[#0b3c2c] to-[#072a1e] text-white p-3.5 sm:p-4 rounded-2xl shadow-md border-2 border-amber-400 relative">
                      <div className="w-8 h-8 bg-amber-400 text-emerald-950 rounded-full flex items-center justify-center font-black mx-auto mb-1.5 shadow-xs">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-black tracking-widest text-amber-300 uppercase block">
                        Kepala Desa Kerep
                      </span>
                      <h5 className="font-black text-sm sm:text-base text-white tracking-wide mt-0.5">
                        {profilData.strukturPemerintahan?.kades || 'HERMAN'}
                      </h5>
                    </div>
                  </div>

                  {/* LINE TO SEKRETARIS DESA */}
                  <div className="w-0.5 h-6 bg-slate-400 my-0.5"></div>

                  {/* LEVEL 2: SEKRETARIS DESA & KAUR */}
                  <div className="w-full bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-4 shadow-2xs flex flex-col items-center">
                    <div className="flex items-center justify-between w-full border-b border-amber-200/80 pb-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-amber-800" />
                        <span className="text-xs font-black text-amber-950 uppercase tracking-wider">
                          Sekretariat Desa
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                        Pelayanan Administrasi
                      </span>
                    </div>

                    {/* Sekretaris Desa Header Card */}
                    <div className="w-full max-w-xs bg-white border-2 border-amber-400 p-3 rounded-xl text-center shadow-xs">
                      <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-1">
                        <UserCheck className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider block">
                        Sekretaris Desa
                      </span>
                      <h6 className="font-black text-sm text-slate-900 mt-0.5">
                        {profilData.strukturPemerintahan?.sekdes || 'REVITA'}
                      </h6>
                      <span className="text-[10px] text-slate-500 block">Koordinator Administrasi Desa</span>
                    </div>

                    {/* Line connecting Sekdes to Kaur */}
                    <div className="w-0.5 h-4 bg-amber-400 my-1.5"></div>

                    {/* Kepala Urusan Sub-Grid */}
                    <div className="w-full">
                      <div className="flex items-center justify-center gap-2 mb-2 text-center">
                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100/80 px-3 py-0.5 rounded-full">
                          Kepala Urusan (Kaur)
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center">
                        {/* Kaur TU */}
                        <div className="p-2.5 bg-white border border-amber-200 rounded-xl shadow-2xs">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight block">
                            Kaur Tata Usaha & Umum
                          </span>
                          <p className="font-black text-xs sm:text-sm text-slate-900 mt-1">
                            {profilData.strukturPemerintahan?.kaurTataUsaha || 'Pipit. SL'}
                          </p>
                        </div>

                        {/* Kaur Keuangan */}
                        <div className="p-2.5 bg-white border border-amber-200 rounded-xl shadow-2xs">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight block">
                            Kaur Keuangan
                          </span>
                          <p className="font-black text-xs sm:text-sm text-slate-900 mt-1">
                            {profilData.strukturPemerintahan?.kaurKeuangan || 'Sujono'}
                          </p>
                        </div>

                        {/* Kaur Perencanaan */}
                        <div className="p-2.5 bg-white border border-amber-200 rounded-xl shadow-2xs">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight block">
                            Kaur Perencanaan
                          </span>
                          <p className="font-black text-xs sm:text-sm text-slate-900 mt-1">
                            {profilData.strukturPemerintahan?.kaurPerencanaan || 'Teguh. S'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LINE TO KEPALA SEKSI */}
                  <div className="w-0.5 h-6 bg-slate-400 my-0.5"></div>

                  {/* LEVEL 3: KEPALA SEKSI (KASI) */}
                  <div className="w-full bg-blue-50/70 border-2 border-blue-300 rounded-2xl p-4 shadow-2xs">
                    <div className="flex items-center justify-between border-b border-blue-200/80 pb-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-blue-700" />
                        <span className="text-xs font-black text-blue-900 uppercase tracking-wider">
                          Kepala Seksi (Kasi)
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-full">
                        Pelaksana Teknis
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center">
                      {/* Kasi Pemerintahan */}
                      <div className="p-2.5 bg-white border border-blue-200 rounded-xl shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight block">
                          Kasi Pemerintahan
                        </span>
                        <p className="font-black text-xs sm:text-sm text-slate-900 mt-1">
                          {profilData.strukturPemerintahan?.kasiPemerintahan || 'TRI. H'}
                        </p>
                      </div>

                      {/* Kasi Kesejahteraan */}
                      <div className="p-2.5 bg-white border border-blue-200 rounded-xl shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight block">
                          Kasi Kesejahteraan
                        </span>
                        <p className="font-black text-xs sm:text-sm text-slate-900 mt-1">
                          {profilData.strukturPemerintahan?.kasiKesejahteraan || 'Sugiharto'}
                        </p>
                      </div>

                      {/* Kasi Pelayanan */}
                      <div className="p-2.5 bg-white border border-blue-200 rounded-xl shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight block">
                          Kasi Pelayanan
                        </span>
                        <p className="font-black text-xs sm:text-sm text-slate-900 mt-1">
                          {profilData.strukturPemerintahan?.kasiPelayanan || 'Itsna. A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* LINE TO KEPALA DUSUN */}
                  <div className="w-0.5 h-6 bg-slate-400 my-0.5"></div>

                  {/* LEVEL 4: KEPALA DUSUN (KASUN) */}
                  <div className="w-full bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-4 shadow-2xs">
                    <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-emerald-800" />
                        <span className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                          Kepala Dusun (Kasun / Pelaksana Kewilayahan)
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                        3 Wilayah Dusun
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                      {/* Kasun Kerep */}
                      <div className="p-3 bg-white border border-emerald-200 rounded-xl shadow-2xs">
                        <div className="flex items-center justify-center gap-1 text-emerald-800 mb-0.5">
                          <MapPin className="w-3 h-3" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            Kasun Kerep
                          </span>
                        </div>
                        <h6 className="font-black text-sm sm:text-base text-slate-900 mt-0.5">
                          {profilData.strukturPemerintahan?.kasunKerep || 'Bambang'}
                        </h6>
                        <span className="text-[10px] text-slate-500 block mt-0.5">Wilayah Dusun Kerep</span>
                      </div>

                      {/* Kasun Cabak */}
                      <div className="p-3 bg-white border border-emerald-200 rounded-xl shadow-2xs">
                        <div className="flex items-center justify-center gap-1 text-emerald-800 mb-0.5">
                          <MapPin className="w-3 h-3" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            Kasun Cabak
                          </span>
                        </div>
                        <h6 className="font-black text-sm sm:text-base text-slate-900 mt-0.5">
                          {profilData.strukturPemerintahan?.kasunCabak || 'Sugiharto'}
                        </h6>
                        <span className="text-[10px] text-slate-500 block mt-0.5">Wilayah Dusun Cabak</span>
                      </div>

                      {/* Kasun Balongasem */}
                      <div className="p-3 bg-white border border-emerald-200 rounded-xl shadow-2xs">
                        <div className="flex items-center justify-center gap-1 text-emerald-800 mb-0.5">
                          <MapPin className="w-3 h-3" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            Kasun Balongasem
                          </span>
                        </div>
                        <h6 className="font-black text-sm sm:text-base text-slate-900 mt-0.5">
                          {profilData.strukturPemerintahan?.kasunBalongasem || 'Suyoko'}
                        </h6>
                        <span className="text-[10px] text-slate-500 block mt-0.5">Wilayah Dusun Balongasem</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {profilId === 'penduduk' && (
            <div className="bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xs space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div className="bg-emerald-50 p-4 sm:p-5 rounded-2xl border border-emerald-200">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Total Penduduk</span>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-900 mt-1">{pendudukData.totalPenduduk?.toLocaleString('id-ID') || '3.948'}</p>
                  <span className="text-xs text-slate-500 font-medium block mt-1">Jiwa (Tahun {pendudukData.tahunData || '2025'})</span>
                </div>
                <div className="bg-blue-50 p-4 sm:p-5 rounded-2xl border border-blue-200">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Jumlah KK</span>
                  <p className="text-2xl sm:text-3xl font-black text-blue-900 mt-1">{pendudukData.totalKk?.toLocaleString('id-ID') || '1.490'}</p>
                  <span className="text-xs text-slate-500 font-medium block mt-1">Kepala Keluarga</span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <h4 className="font-bold text-slate-900 text-sm">Demografi Mata Pencaharian:</h4>
                <div className="space-y-2 text-slate-700">
                  {pendudukData.pekerjaanUtama && pendudukData.pekerjaanUtama.length > 0 ? (
                    pendudukData.pekerjaanUtama.map((pekerjaan, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="font-medium">{pekerjaan.sektor || pekerjaan.label}</span>
                        <span className="font-bold text-emerald-800">{pekerjaan.persen || pekerjaan.persentase || `${pekerjaan.jumlah} Orang`}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="font-medium">Petani & Buruh Tani</span>
                        <span className="font-bold text-emerald-800">± 65%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="font-medium">Wiraswasta & UMKM</span>
                        <span className="font-bold text-emerald-800">± 18%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="font-medium">Pegawai & Jasa</span>
                        <span className="font-bold text-emerald-800">± 12%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="font-medium">Lainnya</span>
                        <span className="font-bold text-emerald-800">± 5%</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Return Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate({ view: 'profil' })}
              className="w-full sm:flex-1 bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Profil Desa</span>
            </button>

            <button
              onClick={() => onNavigate({ view: 'beranda' })}
              className="w-full sm:flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors active:scale-98 cursor-pointer"
            >
              <Home className="w-4 h-4 text-emerald-800" />
              <span>Kembali ke Beranda</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Profil List View
  const breadcrumbs = [
    { label: 'Beranda', target: { view: 'beranda' as const } },
    { label: 'Profil Desa' }
  ];

  return (
    <div className="pb-24">
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
            PROFIL DESA KEREP
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Informasi umum, sejarah, visi misi, struktur perangkat, batas wilayah, dan profil statistik kependudukan Desa Kerep.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {profilMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate({ view: 'profil-detail', profilId: item.id })}
                className="w-full bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-between text-left group focus:outline-hidden cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800 shrink-0 group-hover:bg-emerald-100 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-emerald-900 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-800 shrink-0" />
              </button>
            );
          })}
        </div>

        <div className="pt-4 max-w-md mx-auto">
          <button
            onClick={() => onNavigate({ view: 'beranda' })}
            className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 text-amber-300" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </div>
  );
};
