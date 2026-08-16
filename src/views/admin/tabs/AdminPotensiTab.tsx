import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Edit2,
  Trash2,
  Plus,
  X,
  Upload,
  Eye,
  CheckCircle2
} from 'lucide-react';
import {
  PotensiData,
  getStoredPotensiList,
  savePotensiItem,
  subscribeDataUpdate
} from '../../../utils/dataStore';

export const AdminPotensiTab: React.FC = () => {
  const [potensiList, setPotensiList] = useState<PotensiData[]>(getStoredPotensiList());
  const [editingItem, setEditingItem] = useState<PotensiData | null>(null);
  const [viewDetailItem, setViewDetailItem] = useState<PotensiData | null>(null);
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !editingItem) return;

    const updated: PotensiData = {
      ...editingItem,
      title: formData.title,
      description: formData.description,
      fullDescription: formData.fullDescription || formData.description,
      image: formData.image,
      points: formData.points.split('\n').filter(Boolean)
    };

    savePotensiItem(updated);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-lime-700" />
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
            PENGELOLAAN POTENSI SEKTOR DESA ({potensiList.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Sektor pertanian, peternakan, kerajinan/UMKM, lingkungan alam, dan tradisi budaya masyarakat Desa Kerep.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {potensiList.map((item) => (
          <div
            key={item.id}
            onClick={() => setViewDetailItem(item)}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between group hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer"
          >
            <div>
              <div className="h-40 bg-slate-100 relative overflow-hidden">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4">
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

      {/* MODAL EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 uppercase">
                Edit Sektor Potensi Desa
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
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Deskripsi Ringkas</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Deskripsi Lengkap</label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Poin-poin Potensi (Satu baris per poin)</label>
                <textarea
                  rows={3}
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                  placeholder="Komoditas Padi & Jagung&#10;Sistem Irigasi Air&#10;Kelompok Tani Aktif"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">URL / Path Foto Potensi</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0b3c2c] hover:bg-emerald-900 text-white font-bold shadow-sm"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
