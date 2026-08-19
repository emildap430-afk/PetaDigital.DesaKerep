import React, { useState, useEffect } from 'react';
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Clock,
  Search,
  Check,
  X,
  Eye,
  Upload,
  HeartPulse,
  Landmark,
  Volleyball,
  Sparkles
} from 'lucide-react';
import {
  FacilityItem,
  FacilityCategory,
  getStoredFacilityCategories,
  saveFacilityItem,
  deleteFacilityItem,
  subscribeDataUpdate
} from '../../../utils/dataStore';
import { AutoImageUploader } from '../../../components/admin/AutoImageUploader';

export const AdminFasilitasTab: React.FC = () => {
  const [categories, setCategories] = useState<FacilityCategory[]>(getStoredFacilityCategories());
  const [selectedCatId, setSelectedCatId] = useState<string>('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{ catId: string; item: FacilityItem } | null>(null);
  const [viewDetailItem, setViewDetailItem] = useState<FacilityItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ catId: string; itemId: string } | null>(null);

  const [formData, setFormData] = useState({
    categoryId: 'umum',
    id: '',
    name: '',
    location: 'Dusun Kerep',
    description: '',
    fullDescription: '',
    jamOperasional: 'Senin - Jumat | 08.00 - 15.00 WIB',
    pengelola: 'Pemerintah Desa Kerep',
    kontak: '(0354) 1234567',
    image: '/assets/images/fasilitas-umum.jpg',
    fungsi: 'Pusat Pelayanan Publik, Tempat Musyawarah Desa'
  });

  useEffect(() => {
    setCategories(getStoredFacilityCategories());
    const unsub = subscribeDataUpdate(() => {
      setCategories(getStoredFacilityCategories());
    });
    return unsub;
  }, []);

  const allItems: { catId: string; catTitle: string; item: FacilityItem }[] = [];
  categories.forEach((cat) => {
    (cat.items || []).forEach((item) => {
      allItems.push({ catId: cat.id, catTitle: cat.title, item });
    });
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      categoryId: selectedCatId !== 'semua' ? selectedCatId : 'umum',
      id: 'fasilitas-' + Date.now(),
      name: '',
      location: 'Dusun Kerep',
      description: '',
      fullDescription: '',
      jamOperasional: 'Senin - Jumat | 08.00 - 15.00 WIB',
      pengelola: 'Pemerintah Desa Kerep',
      kontak: '(0354) 1234567',
      image: '/assets/images/fasilitas-umum.jpg',
      fungsi: 'Layanan Masyarakat, Koordinasi Warga'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (catId: string, item: FacilityItem) => {
    setEditingItem({ catId, item });
    setFormData({
      categoryId: catId,
      id: item.id,
      name: item.name,
      location: item.location,
      description: item.description,
      fullDescription: item.fullDescription || item.description,
      jamOperasional: item.jamOperasional || '',
      pengelola: item.pengelola || '',
      kontak: item.kontak || '',
      image: item.image,
      fungsi: item.fungsi ? item.fungsi.join(', ') : ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const fungsiArr = formData.fungsi.split(',').map((f) => f.trim()).filter(Boolean);

    const newItem: FacilityItem = {
      id: formData.id || 'fasilitas-' + Date.now(),
      name: formData.name,
      location: formData.location,
      description: formData.description,
      fullDescription: formData.fullDescription || formData.description,
      jamOperasional: formData.jamOperasional,
      pengelola: formData.pengelola,
      kontak: formData.kontak,
      image: formData.image,
      fungsi: fungsiArr.length > 0 ? fungsiArr : ['Fasilitas Masyarakat Desa Kerep'],
      dokumentasi: [formData.image]
    };

    saveFacilityItem(formData.categoryId, newItem);
    setIsModalOpen(false);
  };

  const handleDelete = (catId: string, itemId: string) => {
    deleteFacilityItem(catId, itemId);
    setDeleteConfirm(null);
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

  const filteredItems = allItems.filter((entry) => {
    const matchCat = selectedCatId === 'semua' || entry.catId === selectedCatId;
    const matchSearch =
      entry.item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-800" />
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
              PENGELOLAAN FASILITAS DESA ({allItems.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola data posyandu, balai desa, tempat ibadah, olahraga, dan fasilitas umum lainnya.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 bg-[#0b3c2c] hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Tambah Fasilitas Baru</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari fasilitas desa, lokasi, atau pengelola..."
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-600"
          />
        </div>

        <select
          value={selectedCatId}
          onChange={(e) => setSelectedCatId(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-hidden focus:border-emerald-600"
        >
          <option value="semua">Semua Kategori Fasilitas</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            Tidak ada fasilitas yang sesuai dengan filter pencarian.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Foto</th>
                  <th className="p-3">Nama Fasilitas & Kategori</th>
                  <th className="p-3">Lokasi / Dusun</th>
                  <th className="p-3">Jam & Pengelola</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((entry) => (
                  <tr
                    key={entry.item.id}
                    onClick={() => setViewDetailItem(entry.item)}
                    className="hover:bg-emerald-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="p-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0 group-hover:border-emerald-500 transition-colors">
                        <img
                          src={entry.item.image}
                          alt={entry.item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900 group-hover:text-emerald-950">{entry.item.name}</div>
                      <div className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-950 font-bold text-[9px] uppercase">
                        {entry.catTitle}
                      </div>
                    </td>
                    <td className="p-3 text-slate-600">
                      <div className="font-semibold text-emerald-900">{entry.item.location}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs">{entry.item.description}</div>
                    </td>
                    <td className="p-3 text-slate-600">
                      <div className="font-medium text-slate-800">{entry.item.jamOperasional || '-'}</div>
                      <div className="text-[11px] text-slate-500">{entry.item.pengelola || '-'}</div>
                    </td>
                    <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewDetailItem(entry.item)}
                          className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                          title="Lihat Detail"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
                        </button>
                        <button
                          onClick={() => handleOpenEdit(entry.catId, entry.item)}
                          className="px-2 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                          title="Edit Fasilitas"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ catId: entry.catId, itemId: entry.item.id })}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors cursor-pointer"
                          title="Hapus Fasilitas"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL ADD / EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase">
                {editingItem ? 'Edit Fasilitas Desa' : 'Tambah Fasilitas Desa'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Kategori Fasilitas *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Lokasi / Dusun *</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  >
                    <option value="Dusun Kerep">Dusun Kerep</option>
                    <option value="Dusun Balongasem">Dusun Balongasem</option>
                    <option value="Dusun Cabak">Dusun Cabak</option>
                    <option value="Seluruh Desa Kerep">Seluruh Desa Kerep</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Fasilitas *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Balai Desa Kerep"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Jam Operasional / Buka</label>
                  <input
                    type="text"
                    value={formData.jamOperasional}
                    onChange={(e) => setFormData({ ...formData, jamOperasional: e.target.value })}
                    placeholder="Senin - Jumat | 08.00 - 15.00 WIB"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Pengelola / Penanggung Jawab</label>
                  <input
                    type="text"
                    value={formData.pengelola}
                    onChange={(e) => setFormData({ ...formData, pengelola: e.target.value })}
                    placeholder="Contoh: Pemerintah Desa Kerep"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Fungsi Utama (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={formData.fungsi}
                  onChange={(e) => setFormData({ ...formData, fungsi: e.target.value })}
                  placeholder="Pusat Pelayanan Publik, Tempat Musyawarah"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Penjelasan fungsi fasilitas..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <AutoImageUploader
                currentImage={formData.image}
                onImageUploaded={(img) => setFormData((prev) => ({ ...prev, image: img }))}
                label="Foto Sarana / Gedung Fasilitas (Upload Otomatis Langsung)"
              />

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
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {viewDetailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-4 sm:p-5 shadow-2xl border border-slate-200 space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase">Detail Fasilitas</h3>
              <button onClick={() => setViewDetailItem(null)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-40 rounded-xl bg-slate-100 overflow-hidden">
              <img src={viewDetailItem.image} alt={viewDetailItem.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-slate-900">{viewDetailItem.name}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{viewDetailItem.description}</p>
            </div>
            <div className="p-3 sm:p-3.5 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-700 border border-slate-200">
              <p><strong>Lokasi:</strong> {viewDetailItem.location}</p>
              <p><strong>Jam Operasional:</strong> {viewDetailItem.jamOperasional || '-'}</p>
              <p><strong>Pengelola:</strong> {viewDetailItem.pengelola || '-'}</p>
              <p><strong>Kontak:</strong> {viewDetailItem.kontak || '-'}</p>
              <p><strong>Fungsi:</strong> {viewDetailItem.fungsi?.join(', ')}</p>
            </div>

            {/* ACTION BUTTONS INSIDE DETAIL */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  const targetEntry = allItems.find((e) => e.item.id === viewDetailItem.id);
                  const catId = targetEntry ? targetEntry.catId : 'umum';
                  const itemToEdit = viewDetailItem;
                  setViewDetailItem(null);
                  handleOpenEdit(catId, itemToEdit);
                }}
                className="flex-1 min-w-[120px] py-2.5 bg-[#0b3c2c] hover:bg-emerald-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Edit Fasilitas Ini</span>
              </button>
              <button
                onClick={() => {
                  const targetEntry = allItems.find((e) => e.item.id === viewDetailItem.id);
                  const catId = targetEntry ? targetEntry.catId : 'umum';
                  const itemId = viewDetailItem.id;
                  setViewDetailItem(null);
                  setDeleteConfirm({ catId, itemId });
                }}
                className="px-3 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Hapus Fasilitas"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
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

      {/* CONFIRM DELETE MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 shadow-2xl border border-slate-200 space-y-3 text-center">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Hapus Fasilitas?</h4>
            <p className="text-xs text-slate-500">Data fasilitas ini akan terhapus dari sistem dan peta desa.</p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.catId, deleteConfirm.itemId)}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-xl text-xs font-bold text-white shadow-sm"
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
