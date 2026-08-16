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
  ShieldCheck
} from 'lucide-react';
import { RouteState } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import heroBgImage from '../assets/images/PEMANDANGAN.png';
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

        <div className="max-w-md mx-auto p-4 space-y-5">
          {/* Header Card */}
          <div className="bg-[#0b3c2c] text-white p-5 rounded-2xl shadow-md space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-white/10 rounded-xl">
                {activeItem && <activeItem.icon className="w-5 h-5 text-amber-300" />}
              </span>
              <h2 className="text-lg font-black uppercase tracking-tight text-white">
                {activeItem ? activeItem.title : 'PROFIL DESA'}
              </h2>
            </div>
            <p className="text-xs text-emerald-100">{activeItem?.subtitle}</p>
          </div>

          {/* Dynamic Content Based on profilId */}
          {profilId === 'tentang' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="h-44 rounded-xl overflow-hidden bg-slate-100 relative">
                <img
                  src={heroBgImage || "/assets/images/PEMANDANGAN.png"}
                  alt="Desa Kerep"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop") {
                      target.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop";
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <div className="text-white">
                    <p className="text-xs font-black uppercase">{profilData.nama || 'DESA KEREP'}</p>
                    <p className="text-[10px] text-emerald-200">{profilData.motto || 'Kerep Makmur, Gotong Royong, Berbudaya, & Maju'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  <strong>{profilData.nama || 'Desa Kerep'}</strong> merupakan salah satu desa yang terletak di Kecamatan {profilData.kecamatan || 'Tarokan'}, Kabupaten {profilData.kabupaten || 'Kediri'}, Provinsi {profilData.provinsi || 'Jawa Timur'}.
                </p>
                <p>
                  {profilData.deskripsi ||
                    'Desa Kerep dikelilingi oleh bentangan sawah subur, perkebunan palawija, serta kekayaan alam lereng pegunungan. Kehidupan masyarakat desa menjunjung tinggi tradisi gotong royong, kebudayaan lokal, dan keramahan sosial.'}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1">Ringkasan Informasi Wilayah</h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div><span className="text-slate-500">Jumlah Dusun:</span> <span className="font-semibold">{dusunList.length || 3} Dusun</span></div>
                  <div><span className="text-slate-500">Luas Wilayah:</span> <span className="font-semibold">{profilData.luasWilayah || '± 215 Ha'}</span></div>
                  <div><span className="text-slate-500">Penduduk:</span> <span className="font-semibold">{profilData.jumlahPenduduk || '3.948'} Jiwa</span></div>
                  <div><span className="text-slate-500">Kecamatan:</span> <span className="font-semibold">{profilData.kecamatan || 'Tarokan'}</span></div>
                  <div><span className="text-slate-500">Kabupaten:</span> <span className="font-semibold">{profilData.kabupaten || 'Kediri'}</span></div>
                  <div><span className="text-slate-500">Kode Pos:</span> <span className="font-semibold">{profilData.kodePos || '64174'}</span></div>
                </div>
              </div>

              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 space-y-1.5 text-[11px] text-emerald-950">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Kantor Balai Desa:</span>
                </div>
                <p className="pl-5 text-slate-700">{profilData.balaiDesa || 'Dusun Kerep, Desa Kerep, Kec. Tarokan, Kab. Kediri'}</p>
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Jam Pelayanan:</span>
                </div>
                <p className="pl-5 text-slate-700">{profilData.jamPelayanan || 'Senin - Jumat (08.00 - 15.00 WIB)'}</p>
              </div>
            </div>
          )}

          {profilId === 'visi-misi' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
              {/* Visi */}
              <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    VISI DESA KEREP
                  </span>
                </div>
                <p className="text-xs font-bold text-emerald-950 italic leading-relaxed pt-1">
                  "{profilData.visi || 'Terwujudnya Desa Kerep yang Maju, Sejahtera, Mandiri, dan Berbudaya berbasis Pertanian dan Kemitraan Masyarakat.'}"
                </p>
              </div>

              {/* Misi */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    MISI PEMBANGUNAN DESA
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {profilData.misi?.length || 0} Poin Misi
                  </span>
                </div>

                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {profilData.misi && profilData.misi.length > 0 ? (
                    profilData.misi.map((misi, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          {idx + 1}
                        </span>
                        <p className="pt-0.5">{misi}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 italic">Belum ada misi yang terdaftar.</p>
                  )}
                </div>
              </div>

              {/* Motto Card */}
              {profilData.motto && (
                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center gap-2.5 text-xs text-amber-950">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase">Motto Desa:</span>
                    <p className="font-bold text-amber-900 mt-0.5">"{profilData.motto}"</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {profilId === 'sejarah' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
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
                      Di Dusun Cabak Banjarsari, Desa Kerep, terdapat punden bernama Syekh Zainudin Zaenuri (dikenal sebagai Mbah Gedong) yang senantiasa dihormati melalui tradisi bersih dusun, tasyakuran sedekah bumi, dan pagelaran wayang kulit.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {profilId === 'geografis' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <h4 className="font-bold text-slate-900">Kondisi Geografis & Topografi:</h4>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {profilData.geografis ||
                    'Desa Kerep terletak di bagian barat Kabupaten Kediri di dataran subur lereng Gunung Wilis dengan ketinggian ± 85-150 mdpl. Wilayah didominasi hamparan persawahan teknis dan pemukiman warga.'}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <h4 className="font-bold text-slate-900">Batas Wilayah Desa Kerep:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-slate-500 font-bold block text-[10px]">BATAS UTARA</span>
                    <span className="font-bold text-slate-800">{profilData.batasWilayah?.utara || 'Desa Bulusari & Kab. Nganjuk'}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-slate-500 font-bold block text-[10px]">BATAS SELATAN</span>
                    <span className="font-bold text-slate-800">{profilData.batasWilayah?.selatan || 'Desa Cerme'}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-slate-500 font-bold block text-[10px]">BATAS TIMUR</span>
                    <span className="font-bold text-slate-800">{profilData.batasWilayah?.timur || 'Desa Tarokan'}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-slate-500 font-bold block text-[10px]">BATAS BARAT</span>
                    <span className="font-bold text-slate-800">{profilData.batasWilayah?.barat || 'Kawasan Perhutani / Perbukitan'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700 pt-1">
                <h4 className="font-bold text-slate-900">Wilayah Dusun ({dusunList.length || 3} Dusun):</h4>
                <div className="grid grid-cols-1 gap-2 text-[11px]">
                  {dusunList.map((dusun, idx) => (
                    <div key={dusun.id || idx} className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <strong className="text-emerald-950">{idx + 1}. {dusun.name}</strong>
                      <p className="text-slate-600 mt-0.5">{dusun.karakteristik || 'Kawasan pemukiman & pertanian desa.'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {profilId === 'pemerintahan' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <h4 className="text-xs font-bold text-slate-800">Struktur Pemerintahan Desa Kerep</h4>
              <div className="space-y-2 text-xs">
                <div className="p-3.5 bg-emerald-950 text-white rounded-xl shadow-2xs">
                  <p className="text-[10px] text-emerald-300 font-semibold">Kepala Desa Kerep</p>
                  <p className="font-extrabold text-sm">{profilData.strukturPemerintahan?.kades || profilData.kades || 'Pemerintah Desa Kerep'}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-[10px] text-slate-400">Sekretaris Desa</p>
                    <p className="font-bold text-slate-800">{profilData.strukturPemerintahan?.sekdes || 'Sekdes Kerep'}</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-[10px] text-slate-400">Kaur Keuangan</p>
                    <p className="font-bold text-slate-800">{profilData.strukturPemerintahan?.kaurKeuangan || 'Kaur Keuangan'}</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-[10px] text-slate-400">Kaur Perencanaan</p>
                    <p className="font-bold text-slate-800">{profilData.strukturPemerintahan?.kaurPerencanaan || 'Kaur Perencanaan'}</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-[10px] text-slate-400">Kaur Tata Usaha & Umum</p>
                    <p className="font-bold text-slate-800">{profilData.strukturPemerintahan?.kaurTataUsaha || 'Kaur Tata Usaha'}</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-[10px] text-slate-400">Kasun Kerep</p>
                    <p className="font-bold text-slate-800">{profilData.strukturPemerintahan?.kasunKerep || 'Kepala Dusun Kerep'}</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-[10px] text-slate-400">Kasun Balongasem</p>
                    <p className="font-bold text-slate-800">{profilData.strukturPemerintahan?.kasunBalongasem || 'Kepala Dusun Balongasem'}</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg col-span-2">
                    <p className="text-[10px] text-slate-400">Kasun Cabak Banjarsari</p>
                    <p className="font-bold text-slate-800">{profilData.strukturPemerintahan?.kasunCabak || 'Kepala Dusun Cabak Banjarsari'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {profilId === 'penduduk' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  <span className="text-[10px] text-slate-500">Total Penduduk</span>
                  <p className="text-xl font-extrabold text-emerald-900">{pendudukData.totalPenduduk?.toLocaleString('id-ID') || '3.948'}</p>
                  <span className="text-[10px] text-slate-400">Jiwa ({pendudukData.tahunData || '2025'})</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                  <span className="text-[10px] text-slate-500">Jumlah KK</span>
                  <p className="text-xl font-extrabold text-blue-900">{pendudukData.totalKk?.toLocaleString('id-ID') || '1.490'}</p>
                  <span className="text-[10px] text-slate-400">Kepala Keluarga</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-slate-800">Demografi Mata Pencaharian:</h4>
                <div className="space-y-1.5 text-[11px] text-slate-700">
                  {pendudukData.pekerjaanUtama && pendudukData.pekerjaanUtama.length > 0 ? (
                    pendudukData.pekerjaanUtama.map((pekerjaan, idx) => (
                      <div key={idx} className="flex justify-between p-2 bg-slate-50 rounded-lg">
                        <span>{pekerjaan.sektor || pekerjaan.label}</span>
                        <span className="font-bold text-emerald-800">{pekerjaan.persen || pekerjaan.persentase || `${pekerjaan.jumlah} Orang`}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                        <span>Petani & Buruh Tani</span>
                        <span className="font-bold text-emerald-800">± 65%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                        <span>Wiraswasta & UMKM</span>
                        <span className="font-bold text-emerald-800">± 18%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                        <span>Pegawai & Jasa</span>
                        <span className="font-bold text-emerald-800">± 12%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                        <span>Lainnya</span>
                        <span className="font-bold text-emerald-800">± 5%</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Return Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => onNavigate({ view: 'profil' })}
              className="w-full bg-[#0b3c2c] hover:bg-[#072a1e] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Profil Desa</span>
            </button>

            <button
              onClick={() => onNavigate({ view: 'beranda' })}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-98 cursor-pointer"
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

      <div className="max-w-md mx-auto p-4 space-y-4">
        <div>
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
            PROFIL DESA
          </h2>
          <p className="text-xs text-slate-500">
            Informasi umum, visi misi, dan profil statistik Desa Kerep.
          </p>
        </div>

        <div className="space-y-2.5">
          {profilMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate({ view: 'profil-detail', profilId: item.id })}
                className="w-full bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500 transition-all flex items-center justify-between text-left group focus:outline-hidden cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-800 shrink-0 group-hover:bg-emerald-100 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 group-hover:text-emerald-900 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-800 shrink-0" />
              </button>
            );
          })}
        </div>

        <div className="pt-2">
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
