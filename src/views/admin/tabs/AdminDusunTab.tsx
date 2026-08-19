import React, { useState, useEffect } from 'react';
import {
  Building,
  Edit2,
  X,
  User,
  Users,
  MapPin,
  CheckCircle2,
  Eye,
  Sparkles,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  Search
} from 'lucide-react';
import {
  DusunDetail,
  getStoredDusunList,
  saveDusunItem,
  deleteDusunItem,
  subscribeDataUpdate
} from '../../../utils/dataStore';
import { AutoImageUploader } from '../../../components/admin/AutoImageUploader';

export const AdminDusunTab: React.FC = () => {
  const [dusunList, setDusunList] = useState<DusunDetail[]>(getStoredDusunList());
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<DusunDetail | null>(null);
  const [viewDetailDusun, setViewDetailDusun] = useState<DusunDetail | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    kepalaDusun: '',
    kontak: '',
    jumlahRT: 0,
    jumlahRW: 0,
    luasWilayah: '',
    karakteristik: '',
    deskripsi: '',
    potensi: '',
    image: '/assets/images/kerep.jpg'
  });

  useEffect(() => {
    setDusunList(getStoredDusunList());
    const unsub = subscribeDataUpdate(() => {
      setDusunList(getStoredDusunList());
    });
    return unsub;
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: 'dusun-' + Date.now(),
      name: '',
      kepalaDusun: '',
      kontak: '0812-xxxx-xxxx',
      jumlahRT: 5,
      jumlahRW: 2,
      luasWilayah: '± 80 Hektar',
      karakteristik: 'Kawasan Pertanian & Perkebunan',
      deskripsi: 'Deskripsi singkat profil dan keunikan wilayah dusun...',
      potensi: 'Padi Sawah, Perkebunan, Peternakan',
      image: '/assets/images/kerep.jpg'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: DusunDetail) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      name: item.name,
      kepalaDusun: item.kepalaDusun,
      kontak: item.kontak || '',
      jumlahRT: item.jumlahRT ?? item.jumlahRt ?? 0,
      jumlahRW: item.jumlahRW ?? item.jumlahRw ?? 0,
      luasWilayah: item.luasWilayah,
      karakteristik: item.karakteristik,
      deskripsi: item.deskripsi || item.karakteristik,
      potensi: item.potensi ? item.potensi.join(', ') : item.potensiUtama || '',
      image: item.image || '/assets/images/kerep.jpg'
    });
    setIsModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const potArray = formData.potensi.split(',').map((p) => p.trim()).filter(Boolean);

    const updated: DusunDetail = {
      id: formData.id || 'dusun-' + Date.now(),
      name: formData.name,
      kepalaDusun: formData.kepalaDusun,
      kontak: formData.kontak,
      jumlahRt: Number(formData.jumlahRT),
      jumlahRw: Number(formData.jumlahRW),
      jumlahRT: Number(formData.jumlahRT),
      jumlahRW: Number(formData.jumlahRW),
      luasWilayah: formData.luasWilayah,
      karakteristik: formData.karakteristik,
      deskripsi: formData.deskripsi,
      potensi: potArray,
      potensiUtama: potArray.join(', ') || formData.karakteristik,
      image: formData.image
    };

    saveDusunItem(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteDusunItem(id);
    setDeleteConfirmId(null);
  };

  const filteredList = dusunList.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.kepalaDusun.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.karakteristik.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-teal-700" />
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
              PENGELOLAAN DATA DUSUN DESA KEREP ({dusunList.length} DUSUN)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola nama kepala dusun (Kasun), jumlah RT/RW, luas wilayah, dan potensi unggulan per dusun.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 bg-[#0b3c2c] hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Tambah Dusun Baru</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari nama dusun atau nama kepala dusun..."
          className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-teal-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredList.map((dusun) => (
          <div
            key={dusun.id}
            onClick={() => setViewDetailDusun(dusun)}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between space-y-4 group hover:border-teal-500 hover:shadow-md transition-all cursor-pointer"
          >
            <div>
              {dusun.image && (
                <div className="h-32 -mx-5 -mt-5 mb-4 bg-slate-100 overflow-hidden relative rounded-t-2xl">
                  <img src={dusun.image} alt={dusun.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-2 left-3 text-xs font-black text-white drop-shadow-md">
                    {dusun.name}
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-900 bg-teal-100 px-2 py-0.5 rounded">
                    Wilayah Dusun
                  </span>
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-teal-950 mt-1">{dusun.name}</h3>
                </div>
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setViewDetailDusun(dusun)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    title="Lihat Detail Dusun"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(dusun)}
                    className="p-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 transition-colors cursor-pointer"
                    title="Edit Data Dusun"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(dusun.id)}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                    title="Hapus Dusun"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span><strong>Kasun:</strong> {dusun.kepalaDusun}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span><strong>Struktur:</strong> {dusun.jumlahRT} RT / {dusun.jumlahRW} RW</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span><strong>Luas:</strong> {dusun.luasWilayah}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-3 line-clamp-3 leading-relaxed">
                {dusun.deskripsi}
              </p>
            </div>

            {dusun.potensi && dusun.potensi.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400">Potensi Utama:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {dusun.potensi.map((p, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DETAIL MODAL */}
      {viewDetailDusun && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-4 sm:p-5 shadow-2xl border border-slate-200 space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-teal-100 text-teal-900 px-2.5 py-0.5 rounded-full">
                Wilayah Dusun
              </span>
              <button onClick={() => setViewDetailDusun(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {viewDetailDusun.image && (
              <div className="h-44 rounded-xl overflow-hidden bg-slate-100">
                <img src={viewDetailDusun.image} alt={viewDetailDusun.name} className="w-full h-full object-cover" />
              </div>
            )}

            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900">{viewDetailDusun.name}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{viewDetailDusun.deskripsi}</p>
            </div>
            <div className="p-3 sm:p-3.5 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-700 border border-slate-200">
              <p><strong>Kepala Dusun (Kasun):</strong> {viewDetailDusun.kepalaDusun}</p>
              <p><strong>Kontak Kasun:</strong> {viewDetailDusun.kontak || '-'}</p>
              <p><strong>Struktur Wilayah:</strong> {viewDetailDusun.jumlahRT} RT / {viewDetailDusun.jumlahRW} RW</p>
              <p><strong>Luas Wilayah:</strong> {viewDetailDusun.luasWilayah}</p>
              <p><strong>Karakteristik:</strong> {viewDetailDusun.karakteristik}</p>
            </div>

            {viewDetailDusun.potensi && viewDetailDusun.potensi.length > 0 && (
              <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100 text-xs">
                <span className="font-bold text-teal-950 block mb-1">Potensi Wilayah Dusun:</span>
                <div className="flex flex-wrap gap-1">
                  {viewDetailDusun.potensi.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white text-teal-900 font-semibold rounded-md border border-teal-200 text-[11px]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ACTION BUTTONS INSIDE DETAIL */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  const itemToEdit = viewDetailDusun;
                  setViewDetailDusun(null);
                  handleOpenEdit(itemToEdit);
                }}
                className="flex-1 py-2.5 bg-[#0b3c2c] hover:bg-emerald-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Edit Data Dusun Ini</span>
              </button>
              <button
                onClick={() => setViewDetailDusun(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ADD / EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase">
                {editingItem ? 'Edit Data Wilayah Dusun' : 'Tambah Wilayah Dusun Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Dusun *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dusun Kerep"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Kepala Dusun (Kasun) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bambang"
                    value={formData.kepalaDusun}
                    onChange={(e) => setFormData({ ...formData, kepalaDusun: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">No. Kontak Kasun</label>
                  <input
                    type="text"
                    value={formData.kontak}
                    onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Jumlah RT</label>
                  <input
                    type="number"
                    value={formData.jumlahRT}
                    onChange={(e) => setFormData({ ...formData, jumlahRT: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Jumlah RW</label>
                  <input
                    type="number"
                    value={formData.jumlahRW}
                    onChange={(e) => setFormData({ ...formData, jumlahRW: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Luas Wilayah</label>
                  <input
                    type="text"
                    value={formData.luasWilayah}
                    onChange={(e) => setFormData({ ...formData, luasWilayah: e.target.value })}
                    placeholder="Contoh: ± 98 Hektar"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Karakteristik Wilayah</label>
                <input
                  type="text"
                  value={formData.karakteristik}
                  onChange={(e) => setFormData({ ...formData, karakteristik: e.target.value })}
                  placeholder="Contoh: Sentra Pertanian dan Kerajinan Bambu"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Potensi Utama (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={formData.potensi}
                  onChange={(e) => setFormData({ ...formData, potensi: e.target.value })}
                  placeholder="Kerajinan Bambu, Padi Sawah, Peternakan Kambing"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Deskripsi Lengkap Dusun</label>
                <textarea
                  rows={3}
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  placeholder="Keterangan mendalam tentang demografi, batas, dan kehidupan warga dusun..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
                />
              </div>

              {/* FOTO DUSUN UPLOAD */}
              <AutoImageUploader
                currentImage={formData.image}
                onImageUploaded={(img) => setFormData((prev) => ({ ...prev, image: img }))}
                label="Foto Lanskap / Wilayah Dusun (Upload Otomatis Langsung)"
              />

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0b3c2c] hover:bg-emerald-900 text-white font-bold shadow-sm cursor-pointer"
                >
                  {editingItem ? 'Simpan Perubahan' : 'Tambah Dusun Baru'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2.5 rounded-2xl bg-red-50">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Hapus Data Dusun?</h3>
                <p className="text-xs text-slate-500">Data wilayah dusun ini akan dihapus dari sistem.</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
