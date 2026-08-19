import React, { useState, useEffect } from 'react';
import {
  Store,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Phone,
  Clock,
  Search,
  Check,
  X,
  Eye,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import {
  UmkmData,
  getStoredUmkmList,
  saveUmkmItem,
  deleteUmkmItem,
  subscribeDataUpdate
} from '../../../utils/dataStore';
import { AutoImageUploader } from '../../../components/admin/AutoImageUploader';

export const AdminUmkmTab: React.FC = () => {
  const [umkmList, setUmkmList] = useState<UmkmData[]>(getStoredUmkmList());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDusun, setSelectedDusun] = useState('semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<UmkmData | null>(null);
  const [viewDetailItem, setViewDetailItem] = useState<UmkmData | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    shortName: '',
    categoryBadge: 'Kerajinan',
    dusun: 'Dusun Balongasem',
    pemilik: '',
    alamat: '',
    deskripsi: '',
    fullDeskripsi: '',
    produk: '',
    jamOperasional: 'Setiap Hari | 08.00 - 17.00 WIB',
    kontak: '',
    image: '/assets/images/umkm.jpg'
  });

  useEffect(() => {
    setUmkmList(getStoredUmkmList());
    const unsub = subscribeDataUpdate(() => {
      setUmkmList(getStoredUmkmList());
    });
    return unsub;
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: 'umkm-' + Date.now(),
      name: '',
      shortName: '',
      categoryBadge: 'Kerajinan',
      dusun: 'Dusun Balongasem',
      pemilik: '',
      alamat: 'Dusun Balongasem, Desa Kerep, Kec. Tarokan, Kab. Kediri',
      deskripsi: '',
      fullDeskripsi: '',
      produk: 'Produk 1, Produk 2, Produk 3',
      jamOperasional: 'Setiap Hari | 08.00 - 17.00 WIB',
      kontak: '0812-3456-7890',
      image: '/assets/images/umkm.jpg'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: UmkmData) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      name: item.name,
      shortName: item.shortName,
      categoryBadge: item.categoryBadge,
      dusun: item.dusun,
      pemilik: item.pemilik,
      alamat: item.alamat,
      deskripsi: item.deskripsi,
      fullDeskripsi: item.fullDeskripsi,
      produk: item.produk ? item.produk.join(', ') : '',
      jamOperasional: item.jamOperasional,
      kontak: item.kontak,
      image: item.image
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const productArray = formData.produk
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);

    const newItem: UmkmData = {
      id: formData.id || 'umkm-' + Date.now(),
      name: formData.name,
      shortName: formData.shortName || formData.name,
      categoryBadge: formData.categoryBadge,
      dusun: formData.dusun,
      pemilik: formData.pemilik || 'Warga Desa Kerep',
      alamat: formData.alamat,
      deskripsi: formData.deskripsi,
      fullDeskripsi: formData.fullDeskripsi || formData.deskripsi,
      produk: productArray.length > 0 ? productArray : ['Produk Unggulan Desa'],
      jamOperasional: formData.jamOperasional,
      kontak: formData.kontak,
      source: 'Observasi KKN 2026',
      statusVerifikasi: 'Terverifikasi',
      image: formData.image,
      dokumentasi: [formData.image]
    };

    saveUmkmItem(newItem);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteUmkmItem(id);
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

  const filteredList = umkmList.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pemilik.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDusun = selectedDusun === 'semua' || item.dusun.toLowerCase().includes(selectedDusun.toLowerCase());
    return matchSearch && matchDusun;
  });

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-amber-700" />
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
              PENGELOLAAN DATA UMKM ({umkmList.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar usaha mikro, kecil, dan menengah masyarakat Desa Kerep.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 bg-[#0b3c2c] hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Tambah UMKM Baru</span>
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
            placeholder="Cari nama usaha, pemilik, atau produk..."
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-600"
          />
        </div>

        <select
          value={selectedDusun}
          onChange={(e) => setSelectedDusun(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-hidden focus:border-emerald-600"
        >
          <option value="semua">Semua Dusun</option>
          <option value="kerep">Dusun Kerep</option>
          <option value="balongasem">Dusun Balongasem</option>
          <option value="cabak">Dusun Cabak</option>
        </select>
      </div>

      {/* Table / Card List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredList.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            Tidak ada data UMKM yang cocok dengan pencarian.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Foto</th>
                  <th className="p-3">Nama Usaha & Kategori</th>
                  <th className="p-3">Dusun & Lokasi</th>
                  <th className="p-3">Pemilik & Kontak</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredList.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setViewDetailItem(item)}
                    className="hover:bg-emerald-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="p-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0 group-hover:border-emerald-500 transition-colors">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900 group-hover:text-emerald-950">{item.name}</div>
                      <div className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[9px] uppercase">
                        {item.categoryBadge}
                      </div>
                    </td>
                    <td className="p-3 text-slate-600">
                      <div className="font-semibold text-emerald-900">{item.dusun}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs">{item.alamat}</div>
                    </td>
                    <td className="p-3 text-slate-600">
                      <div className="font-medium text-slate-800">{item.pemilik}</div>
                      <div className="text-[11px] text-slate-500">{item.kontak}</div>
                    </td>
                    <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewDetailItem(item)}
                          className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                          title="Lihat Detail"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
                        </button>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="px-2 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                          title="Edit UMKM"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors cursor-pointer"
                          title="Hapus UMKM"
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
                {editingItem ? 'Edit Data UMKM' : 'Tambah UMKM Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Nama Lengkap UMKM *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Sentra Kerajinan Anyaman Bambu"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Nama Singkat / Label</label>
                  <input
                    type="text"
                    value={formData.shortName}
                    onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                    placeholder="Contoh: Anyaman Bambu"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Kategori Badge</label>
                  <select
                    value={formData.categoryBadge}
                    onChange={(e) => setFormData({ ...formData, categoryBadge: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  >
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Olahan Pangan">Olahan Pangan</option>
                    <option value="Minuman Herbal">Minuman Herbal</option>
                    <option value="Pertanian / Tani">Pertanian / Tani</option>
                    <option value="Peternakan">Peternakan</option>
                    <option value="Jasa / Dagang">Jasa / Dagang</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Dusun</label>
                  <select
                    value={formData.dusun}
                    onChange={(e) => setFormData({ ...formData, dusun: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  >
                    <option value="Dusun Kerep">Dusun Kerep</option>
                    <option value="Dusun Balongasem">Dusun Balongasem</option>
                    <option value="Dusun Cabak">Dusun Cabak</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Nama Pemilik / Pengelola</label>
                  <input
                    type="text"
                    value={formData.pemilik}
                    onChange={(e) => setFormData({ ...formData, pemilik: e.target.value })}
                    placeholder="Contoh: Bu Sri Mulyani"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">No. Kontak / WhatsApp</label>
                  <input
                    type="text"
                    value={formData.kontak}
                    onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                    placeholder="Contoh: 0812-3456-7890"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Alamat Lengkap</label>
                <input
                  type="text"
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  placeholder="Contoh: RT 03 / RW 01 Dusun Balongasem, Desa Kerep"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Daftar Produk (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={formData.produk}
                  onChange={(e) => setFormData({ ...formData, produk: e.target.value })}
                  placeholder="Tampah Bambu, Besek Pangan, Bakul Nasi"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  placeholder="Ringkasan penjelasan UMKM..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <AutoImageUploader
                currentImage={formData.image}
                onImageUploaded={(img) => setFormData((prev) => ({ ...prev, image: img }))}
                label="Foto Tempat Usaha / Produk UMKM (Upload Otomatis Langsung)"
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
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase">Detail UMKM</h3>
              <button onClick={() => setViewDetailItem(null)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-40 rounded-xl bg-slate-100 overflow-hidden">
              <img src={viewDetailItem.image} alt={viewDetailItem.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase">
                {viewDetailItem.categoryBadge}
              </span>
              <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1">{viewDetailItem.name}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{viewDetailItem.deskripsi}</p>
            </div>
            <div className="p-3 sm:p-3.5 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-700 border border-slate-200">
              <p><strong>Dusun:</strong> {viewDetailItem.dusun}</p>
              <p><strong>Pemilik:</strong> {viewDetailItem.pemilik}</p>
              <p><strong>Kontak:</strong> {viewDetailItem.kontak}</p>
              <p><strong>Alamat:</strong> {viewDetailItem.alamat}</p>
              <p><strong>Produk:</strong> {viewDetailItem.produk?.join(', ')}</p>
            </div>

            {/* ACTION BUTTONS INSIDE DETAIL */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  const itemToEdit = viewDetailItem;
                  setViewDetailItem(null);
                  handleOpenEdit(itemToEdit);
                }}
                className="flex-1 min-w-[120px] py-2.5 bg-[#0b3c2c] hover:bg-emerald-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Edit Data Ini</span>
              </button>
              <button
                onClick={() => {
                  const idToDelete = viewDetailItem.id;
                  setViewDetailItem(null);
                  setDeleteConfirmId(idToDelete);
                }}
                className="px-3 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Hapus Data UMKM"
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
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 shadow-2xl border border-slate-200 space-y-3 text-center">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Hapus Data UMKM?</h4>
            <p className="text-xs text-slate-500">Data yang dihapus akan otomatis hilang dari website publik.</p>
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
