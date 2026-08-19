import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Edit2,
  Trash2,
  Plus,
  X,
  Upload,
  Eye,
  CheckCircle2,
  Image as ImageIcon,
  Search,
  Check
} from 'lucide-react';
import {
  PotensiData,
  getStoredPotensiList,
  savePotensiItem,
  deletePotensiItem,
  subscribeDataUpdate
} from '../../../utils/dataStore';
import { AutoImageUploader } from '../../../components/admin/AutoImageUploader';

export const AdminPotensiTab: React.FC = () => {
  const [potensiList, setPotensiList] = useState<PotensiData[]>(getStoredPotensiList());
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<PotensiData | null>(null);
  const [viewDetailItem, setViewDetailItem] = useState<PotensiData | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    fullDescription: '',
    image: '/assets/images/pertanian.jpg',
    points: ''
  });

  useEffect(() => {
    setPotensiList(getStoredPotensiList());
    const unsub = subscribeDataUpdate(() => {
      setPotensiList(getStoredPotensiList());
    });
    return unsub;
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: 'potensi-' + Date.now(),
      title: '',
      description: '',
      fullDescription: '',
      image: '/assets/images/pertanian.jpg',
      points: 'Potensi Unggulan 1\nPotensi Unggulan 2\nKelompok Masyarakat Aktif'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: PotensiData) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      title: item.title,
      description: item.description,
      fullDescription: item.fullDescription || item.description,
      image: item.image,
      points: item.points ? item.points.join('\n') : ''
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
    if (!formData.title.trim()) return;

    const newItem: PotensiData = {
      id: formData.id || 'potensi-' + Date.now(),
      title: formData.title,
      description: formData.description,
      fullDescription: formData.fullDescription || formData.description,
      image: formData.image,
      points: formData.points.split('\n').map((p) => p.trim()).filter(Boolean)
    };

    savePotensiItem(newItem);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deletePotensiItem(id);
    setDeleteConfirmId(null);
  };

  const filteredList = potensiList.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-lime-700" />
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
              PENGELOLAAN POTENSI SEKTOR DESA ({potensiList.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Sektor pertanian, peternakan, kerajinan/UMKM, lingkungan alam, dan tradisi budaya Desa Kerep.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 bg-[#0b3c2c] hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Tambah Potensi Baru</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari sektor potensi desa..."
          className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredList.map((item) => (
          <div
            key={item.id}
            onClick={() => setViewDetailItem(item)}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between group hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer"
          >
            <div>
              <div className="h-44 bg-slate-100 relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute top-2 right-2 flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setViewDetailItem(item)}
                    className="px-2 py-1 rounded-lg bg-white/90 hover:bg-white text-slate-800 font-bold text-xs shadow-xs backdrop-blur-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3 text-slate-600" />
                    <span>Detail</span>
                  </button>
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="px-2 py-1 rounded-lg bg-white/90 hover:bg-white text-emerald-950 font-bold text-xs shadow-xs backdrop-blur-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3 text-emerald-700" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="px-2 py-1 rounded-lg bg-white/90 hover:bg-red-50 text-red-600 font-bold text-xs shadow-xs backdrop-blur-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-black text-slate-900 group-hover:text-emerald-900">{item.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{item.description}</p>
                {item.points && item.points.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Poin Utama:</span>
                    <ul className="text-[11px] text-slate-600 space-y-0.5 list-disc list-inside">
                      {item.points.slice(0, 3).map((p, idx) => (
                        <li key={idx} className="line-clamp-1">{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL MODAL */}
      {viewDetailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md">
                Potensi Unggulan
              </span>
              <button onClick={() => setViewDetailItem(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-44 rounded-xl bg-slate-100 overflow-hidden">
              <img src={viewDetailItem.image} alt={viewDetailItem.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">{viewDetailItem.title}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{viewDetailItem.fullDescription || viewDetailItem.description}</p>
            </div>
            {viewDetailItem.points && viewDetailItem.points.length > 0 && (
              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-[11px] text-slate-700 border border-slate-200">
                <p className="font-bold text-slate-800 mb-1">Daftar Poin Unggulan:</p>
                <ul className="space-y-1 list-disc list-inside">
                  {viewDetailItem.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ACTION BUTTONS INSIDE DETAIL */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  const itemToEdit = viewDetailItem;
                  setViewDetailItem(null);
                  handleOpenEdit(itemToEdit);
                }}
                className="flex-1 py-2.5 bg-[#0b3c2c] hover:bg-emerald-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Edit Sektor Ini</span>
              </button>
              <button
                onClick={() => setViewDetailItem(null)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 uppercase">
                {editingItem ? 'Edit Sektor Potensi Desa' : 'Tambah Sektor Potensi Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Sektor Potensi *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sektor Pertanian & Perkebunan Modern"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Deskripsi Ringkas *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan singkat potensi sektor ini..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Deskripsi Lengkap & Analisis</label>
                <textarea
                  rows={3}
                  placeholder="Penjelasan mendalam tentang potensi, produksi tahunan, dan peran masyarakat..."
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Poin-poin Unggulan (1 baris per poin)</label>
                <textarea
                  rows={3}
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                  placeholder="Komoditas Padi & Jagung&#10;Sistem Irigasi Air Lancar&#10;Kelompok Tani Aktif"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              {/* FOTO / GAMBAR UPLOAD & URL */}
              <AutoImageUploader
                currentImage={formData.image}
                onImageUploaded={(img) => setFormData((prev) => ({ ...prev, image: img }))}
                label="Foto / Dokumentasi Potensi (Upload Otomatis Langsung)"
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
                  {editingItem ? 'Simpan Perubahan' : 'Tambah Potensi Baru'}
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
                <h3 className="text-sm font-black text-slate-900">Hapus Sektor Potensi?</h3>
                <p className="text-xs text-slate-500">Data ini akan dihapus dari daftar potensi desa.</p>
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
