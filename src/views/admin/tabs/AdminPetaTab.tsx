import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Search,
  Check,
  X,
  Eye,
  Navigation,
  Globe,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import {
  MapMarker,
  getStoredMapMarkersList,
  saveMapMarker,
  deleteMapMarker,
  subscribeDataUpdate
} from '../../../utils/dataStore';
import { AutoImageUploader } from '../../../components/admin/AutoImageUploader';

export const AdminPetaTab: React.FC = () => {
  const [markersList, setMarkersList] = useState<MapMarker[]>(getStoredMapMarkersList());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MapMarker | null>(null);
  const [viewDetailMarker, setViewDetailMarker] = useState<MapMarker | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'kantor' as MapMarker['category'],
    lat: -7.7441,
    lng: 111.9682,
    description: '',
    address: 'Desa Kerep, Kec. Tarokan, Kab. Kediri',
    color: '#0b3c2c',
    image: '/assets/images/fasilitas-umum.jpg'
  });

  useEffect(() => {
    setMarkersList(getStoredMapMarkersList());
    const unsub = subscribeDataUpdate(() => {
      setMarkersList(getStoredMapMarkersList());
    });
    return unsub;
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: 'marker-' + Date.now(),
      name: '',
      category: 'kantor',
      lat: -7.7441,
      lng: 111.9682,
      description: 'Titik fasilitas / potensi di Desa Kerep',
      address: 'Dusun Kerep, Desa Kerep, Kec. Tarokan, Kab. Kediri',
      color: '#0b3c2c',
      image: '/assets/images/fasilitas-umum.jpg'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: MapMarker) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      name: item.name,
      category: item.category,
      lat: item.lat,
      lng: item.lng,
      description: item.description,
      address: item.address,
      color: item.color,
      image: item.image || '/assets/images/fasilitas-umum.jpg'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newItem: MapMarker = {
      id: formData.id || 'marker-' + Date.now(),
      name: formData.name,
      category: formData.category,
      lat: Number(formData.lat),
      lng: Number(formData.lng),
      description: formData.description,
      address: formData.address,
      color: formData.color,
      image: formData.image
    };

    saveMapMarker(newItem);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteMapMarker(id);
    setDeleteConfirmId(null);
  };

  const filteredList = markersList.filter((m) => {
    const matchCat = selectedCat === 'semua' || m.category === selectedCat;
    const matchSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-700" />
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
              PENGELOLAAN TITIK PETA DIGITAL ({markersList.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Atur pin koordinat GIS (Latitude, Longitude), nama tempat, dan warna marker peta.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 bg-[#0b3c2c] hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Tambah Titik Marker Baru</span>
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
            placeholder="Cari titik peta..."
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-600"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-hidden focus:border-emerald-600"
        >
          <option value="semua">Semua Kategori Marker</option>
          <option value="kantor">Pemerintahan & Kantor</option>
          <option value="pendidikan">Pendidikan</option>
          <option value="ibadah">Tempat Ibadah</option>
          <option value="kesehatan">Kesehatan</option>
          <option value="fasum">Fasilitas Umum</option>
          <option value="potensi">Potensi / UMKM</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredList.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            Tidak ada titik peta yang sesuai dengan pencarian.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Marker</th>
                  <th className="p-3">Nama Titik & Kategori</th>
                  <th className="p-3">Koordinat GIS (Lat, Lng)</th>
                  <th className="p-3">Alamat / Keterangan</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredList.map((m) => (
                  <tr
                    key={m.id}
                    onClick={() => setViewDetailMarker(m)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="p-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-xs group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: m.color }}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900 group-hover:text-emerald-950">{m.name}</div>
                      <div className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold text-[9px] uppercase">
                        {m.category}
                      </div>
                    </td>
                    <td className="p-3 text-slate-600 font-mono text-[11px]">
                      <div>Lat: {m.lat.toFixed(6)}</div>
                      <div>Lng: {m.lng.toFixed(6)}</div>
                    </td>
                    <td className="p-3 text-slate-600">
                      <div className="text-[11px] truncate max-w-xs">{m.address}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-xs">{m.description}</div>
                    </td>
                    <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewDetailMarker(m)}
                          className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                          title="Lihat Detail"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
                        </button>
                        <button
                          onClick={() => handleOpenEdit(m)}
                          className="px-2 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                          title="Edit Titik"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(m.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors cursor-pointer"
                          title="Hapus Titik"
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
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase">
                {editingItem ? 'Edit Titik Marker Peta' : 'Tambah Titik Marker Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Lokasi / Titik Marker *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Kantor Balai Desa Kerep"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Kategori Marker</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  >
                    <option value="kantor">Pemerintahan & Kantor</option>
                    <option value="pendidikan">Pendidikan</option>
                    <option value="ibadah">Tempat Ibadah</option>
                    <option value="kesehatan">Kesehatan</option>
                    <option value="fasum">Fasilitas Umum</option>
                    <option value="potensi">Potensi / UMKM</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Warna Pin Marker</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Latitude (Garis Lintang) *</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.lat}
                    onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) || 0 })}
                    placeholder="-7.744123"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Longitude (Garis Bujur) *</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.lng}
                    onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) || 0 })}
                    placeholder="111.968212"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-hidden focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Alamat Lengkap</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Dusun Kerep, Desa Kerep..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Keterangan Singkat</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Keterangan penjelas titik..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <AutoImageUploader
                currentImage={formData.image}
                onImageUploaded={(img) => setFormData((prev) => ({ ...prev, image: img }))}
                label="Foto Lokasi / Bangunan Titik Peta (Upload Otomatis Langsung)"
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
                  Simpan Titik Peta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {viewDetailMarker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-4 sm:p-5 shadow-2xl border border-slate-200 space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs"
                  style={{ backgroundColor: viewDetailMarker.color }}
                >
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-tight">Detail Marker Peta</h3>
              </div>
              <button onClick={() => setViewDetailMarker(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {viewDetailMarker.category}
              </span>
              <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1.5">{viewDetailMarker.name}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{viewDetailMarker.description || 'Tidak ada keterangan tambahan.'}</p>
            </div>
            <div className="p-3 sm:p-3.5 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-700 border border-slate-200">
              <p><strong>Alamat / Wilayah:</strong> {viewDetailMarker.address}</p>
              <p className="font-mono text-emerald-800 break-all text-[11px] sm:text-xs">
                <strong>Koordinat GIS:</strong> Lat {viewDetailMarker.lat.toFixed(6)}, Lng {viewDetailMarker.lng.toFixed(6)}
              </p>
            </div>

            {/* ACTION BUTTONS INSIDE DETAIL */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  const markerToEdit = viewDetailMarker;
                  setViewDetailMarker(null);
                  handleOpenEdit(markerToEdit);
                }}
                className="flex-1 min-w-[120px] py-2.5 bg-[#0b3c2c] hover:bg-emerald-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Edit Titik Peta</span>
              </button>
              <button
                onClick={() => {
                  const idToDelete = viewDetailMarker.id;
                  setViewDetailMarker(null);
                  setDeleteConfirmId(idToDelete);
                }}
                className="px-3 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Hapus Titik"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
              <button
                onClick={() => setViewDetailMarker(null)}
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
            <h4 className="text-sm font-bold text-slate-900">Hapus Marker Peta?</h4>
            <p className="text-xs text-slate-500">Titik ini tidak akan muncul lagi di peta interaktif desa.</p>
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
