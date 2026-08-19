import React, { useState, useEffect, useRef } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Calendar,
  Tag,
  Search,
  Eye,
  X,
  Sparkles,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import {
  GalleryItem,
  getStoredGalleryList,
  saveGalleryItem,
  deleteGalleryItem,
  subscribeDataUpdate
} from '../../../utils/dataStore';
import { AutoImageUploader } from '../../../components/admin/AutoImageUploader';

export const AdminGaleriTab: React.FC = () => {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(getStoredGalleryList());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [viewDetailItem, setViewDetailItem] = useState<GalleryItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: 'kegiatan' as GalleryItem['category'],
    date: '2026',
    description: '',
    image: '/assets/images/kegiatan-1.jpg'
  });

  useEffect(() => {
    setGalleryList(getStoredGalleryList());
    const unsub = subscribeDataUpdate(() => {
      setGalleryList(getStoredGalleryList());
    });
    return unsub;
  }, []);

  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const [bulkSuccessMsg, setBulkSuccessMsg] = useState('');
  const bulkInputRef = useRef<HTMLInputElement>(null);

  const handleBulkUploadFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsBulkUploading(true);

    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    let processedCount = 0;

    fileArray.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          let width = img.width;
          let height = img.height;
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          let base64 = e.target?.result as string;
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            base64 = canvas.toDataURL('image/jpeg', 0.85);
          }

          const rawName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          const title = rawName.charAt(0).toUpperCase() + rawName.slice(1);

          const newItem: GalleryItem = {
            id: 'galeri-auto-' + Date.now() + '-' + index,
            title: title || 'Dokumentasi Desa Kerep',
            category: 'kegiatan',
            categoryLabel: 'Kegiatan Warga',
            date: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
            description: `Foto kegiatan/potensi ${title} yang diunggah otomatis ke galeri Desa Kerep.`,
            image: base64
          };

          saveGalleryItem(newItem);
          processedCount++;

          if (processedCount === fileArray.length) {
            setIsBulkUploading(false);
            setBulkSuccessMsg(`Berhasil mengunggah ${processedCount} foto langsung secara otomatis!`);
            setTimeout(() => setBulkSuccessMsg(''), 4000);
          }
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: 'galeri-' + Date.now(),
      title: '',
      category: 'kegiatan',
      date: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
      description: 'Dokumentasi kegiatan masyarakat Desa Kerep.',
      image: '/assets/images/kegiatan-1.jpg'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      title: item.title,
      category: item.category,
      date: item.date,
      description: item.description,
      image: item.image
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const catLabelMap: Record<string, string> = {
      kegiatan: 'Kegiatan Warga',
      potensi: 'Potensi Desa',
      fasilitas: 'Fasilitas Umum'
    };

    const newItem: GalleryItem = {
      id: formData.id || 'galeri-' + Date.now(),
      title: formData.title,
      category: formData.category,
      categoryLabel: catLabelMap[formData.category] || 'Galeri Foto',
      date: formData.date,
      description: formData.description,
      image: formData.image
    };

    saveGalleryItem(newItem);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteGalleryItem(id);
    setDeleteConfirmId(null);
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

  const filteredList = galleryList.filter((g) => {
    const matchCat = selectedCategory === 'semua' || g.category === selectedCategory;
    const matchSearch =
      g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-700" />
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
              PENGELOLAAN GALERI FOTO DESA ({galleryList.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Unggah dan perbarui arsip visual kegiatan warga, potensi dusun, dan sarana desa.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={bulkInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleBulkUploadFiles(e.target.files)}
            className="hidden"
          />
          <button
            onClick={() => bulkInputRef.current?.click()}
            disabled={isBulkUploading}
            className="flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 shrink-0 cursor-pointer disabled:opacity-50"
            title="Pilih beberapa foto sekaligus untuk langsung otomatis masuk galeri"
          >
            {isBulkUploading ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-300" />
            )}
            <span>{isBulkUploading ? 'Mengunggah...' : 'Upload Otomatis Banyak Foto'}</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 bg-[#0b3c2c] hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Tambah Manual</span>
          </button>
        </div>
      </div>

      {/* Bulk Upload Notification */}
      {bulkSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{bulkSuccessMsg}</span>
        </div>
      )}

      {/* Instant Drop Zone Banner */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleBulkUploadFiles(e.dataTransfer.files);
        }}
        onClick={() => bulkInputRef.current?.click()}
        className="p-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-emerald-50 border-2 border-dashed border-purple-200 hover:border-purple-500 rounded-2xl cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left transition-all hover:shadow-xs group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
            <Upload className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-800">
              Tarik & Lepaskan File Foto ke Sini untuk Upload Otomatis Langsung
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Mendukung multi-select (banyak foto sekaligus). Sistem otomatis mengompresi gambar dan membuat kartu galeri.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-extrabold text-purple-900 bg-white/80 border border-purple-200 px-3 py-1.5 rounded-xl shrink-0 shadow-2xs">
          Pilih File Gambar
        </span>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari judul dokumentasi atau deskripsi..."
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-600"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-hidden focus:border-emerald-600"
        >
          <option value="semua">Semua Kategori Galeri</option>
          <option value="kegiatan">Kegiatan Masyarakat</option>
          <option value="potensi">Potensi Desa & UMKM</option>
          <option value="fasilitas">Fasilitas & Sarana</option>
        </select>
      </div>

      {/* Grid of Photo Cards */}
      {filteredList.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500 text-xs">
          Tidak ada foto yang cocok dengan pencarian.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredList.map((item) => (
            <div
              key={item.id}
              onClick={() => setViewDetailItem(item)}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col group hover:border-purple-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="h-44 bg-slate-100 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 left-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider bg-slate-950/80 text-amber-300 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setViewDetailItem(item)}
                    className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-800 shadow-xs backdrop-blur-xs cursor-pointer"
                    title="Lihat Detail Foto"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-blue-700 shadow-xs backdrop-blur-xs cursor-pointer"
                    title="Edit Foto"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-red-700 shadow-xs backdrop-blur-xs cursor-pointer"
                    title="Hapus Foto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-950 line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{item.description}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium pt-2 border-t border-slate-100">
                  <Calendar className="w-3 h-3 text-purple-600 shrink-0" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL ADD / EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 uppercase">
                {editingItem ? 'Edit Dokumentasi Foto' : 'Upload Foto Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Judul Dokumentasi Foto *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Kerja Bakti Dusun Kerep"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-purple-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Kategori Galeri</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-purple-600"
                  >
                    <option value="kegiatan">Kegiatan Masyarakat</option>
                    <option value="potensi">Potensi Desa & UMKM</option>
                    <option value="fasilitas">Fasilitas & Sarana</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Waktu / Tanggal</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="Contoh: Januari 2026"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Deskripsi Foto</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Keterangan singkat dokumentasi..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-purple-600"
                />
              </div>

              <AutoImageUploader
                currentImage={formData.image}
                onImageUploaded={(img) => setFormData((prev) => ({ ...prev, image: img }))}
                label="Foto Dokumentasi Galeri (Upload Otomatis Langsung)"
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
                  Simpan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {viewDetailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-900 px-2 py-0.5 rounded-md">
                Kategori {viewDetailItem.category}
              </span>
              <button onClick={() => setViewDetailItem(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-48 rounded-xl bg-slate-100 overflow-hidden">
              <img src={viewDetailItem.image} alt={viewDetailItem.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">{viewDetailItem.title}</h4>
              <p className="text-xs text-slate-600 mt-1">{viewDetailItem.description}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-[11px] text-slate-700 border border-slate-200">
              <p><strong>Waktu Dokumentasi:</strong> {viewDetailItem.date}</p>
              <p><strong>Kategori:</strong> {viewDetailItem.category}</p>
            </div>

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
                <span>Edit Foto Ini</span>
              </button>
              <button
                onClick={() => {
                  const idToDelete = viewDetailItem.id;
                  setViewDetailItem(null);
                  setDeleteConfirmId(idToDelete);
                }}
                className="px-3 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Hapus Foto"
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

      {/* CONFIRM DELETE */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 shadow-2xl border border-slate-200 space-y-3 text-center">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Hapus Foto Galeri?</h4>
            <p className="text-xs text-slate-500">Foto ini akan dihapus dari galeri publik.</p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
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
