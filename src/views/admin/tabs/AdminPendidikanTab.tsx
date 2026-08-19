import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
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
  BookOpen
} from 'lucide-react';
import {
  SchoolData,
  getStoredSchoolsList,
  saveSchoolItem,
  deleteSchoolItem,
  subscribeDataUpdate
} from '../../../utils/dataStore';
import { AutoImageUploader } from '../../../components/admin/AutoImageUploader';

export const AdminPendidikanTab: React.FC = () => {
  const [schoolsList, setSchoolsList] = useState<SchoolData[]>(getStoredSchoolsList());
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SchoolData | null>(null);
  const [viewDetailItem, setViewDetailItem] = useState<SchoolData | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    shortName: '',
    badge: 'SD',
    dusun: 'Dusun Kerep',
    distance: '± 1,0 km dari Balai Desa',
    npsn: '20535449',
    status: 'Negeri',
    jenjang: 'Sekolah Dasar (SD)',
    alamat: 'Dusun Kerep, Desa Kerep, Kec. Tarokan, Kab. Kediri',
    kodePos: '64174',
    tahunBerdiri: '1983',
    akreditasi: 'B',
    kepalaSekolah: '',
    jumlahGuru: '10 Orang',
    jumlahSiswa: '120 Siswa',
    deskripsi: '',
    image: '/assets/images/sd-kerep.jpg',
    fasilitas: 'Ruang Kelas, Perpustakaan, Lapangan, Mushola, Toilet'
  });

  useEffect(() => {
    setSchoolsList(getStoredSchoolsList());
    const unsub = subscribeDataUpdate(() => {
      setSchoolsList(getStoredSchoolsList());
    });
    return unsub;
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: 'sekolah-' + Date.now(),
      name: '',
      shortName: '',
      badge: 'SD',
      dusun: 'Dusun Kerep',
      distance: '± 1,0 km dari Balai Desa',
      npsn: '20500000',
      status: 'Negeri',
      jenjang: 'Sekolah Dasar (SD)',
      alamat: 'Dusun Kerep, Desa Kerep, Kec. Tarokan, Kab. Kediri',
      kodePos: '64174',
      tahunBerdiri: '1990',
      akreditasi: 'B',
      kepalaSekolah: 'Bapak/Ibu Kepala Sekolah',
      jumlahGuru: '10 Orang',
      jumlahSiswa: '100 Siswa',
      deskripsi: '',
      image: '/assets/images/sd-kerep.jpg',
      fasilitas: 'Ruang Kelas, Lapangan, Toilet, Mushola'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: SchoolData) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      name: item.name,
      shortName: item.shortName,
      badge: item.badge,
      dusun: item.dusun,
      distance: item.distance,
      npsn: item.npsn,
      status: item.status,
      jenjang: item.jenjang,
      alamat: item.alamat,
      kodePos: item.kodePos,
      tahunBerdiri: item.tahunBerdiri,
      akreditasi: item.akreditasi,
      kepalaSekolah: item.kepalaSekolah,
      jumlahGuru: item.jumlahGuru,
      jumlahSiswa: item.jumlahSiswa,
      deskripsi: item.deskripsi,
      image: item.image,
      fasilitas: item.fasilitas ? item.fasilitas.join(', ') : ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const fasArray = formData.fasilitas.split(',').map((f) => f.trim()).filter(Boolean);

    const newItem: SchoolData = {
      id: formData.id || 'sekolah-' + Date.now(),
      name: formData.name,
      shortName: formData.shortName || formData.name,
      badge: formData.badge,
      dusun: formData.dusun,
      distance: formData.distance,
      source: 'Observasi KKN 2026',
      image: formData.image,
      npsn: formData.npsn,
      status: formData.status,
      jenjang: formData.jenjang,
      alamat: formData.alamat,
      kodePos: formData.kodePos,
      tahunBerdiri: formData.tahunBerdiri,
      akreditasi: formData.akreditasi,
      kepalaSekolah: formData.kepalaSekolah,
      jumlahGuru: formData.jumlahGuru,
      jumlahSiswa: formData.jumlahSiswa,
      deskripsi: formData.deskripsi,
      fasilitas: fasArray.length > 0 ? fasArray : ['Ruang Kelas', 'Toilet', 'Lapangan'],
      dokumentasi: [formData.image]
    };

    saveSchoolItem(newItem);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteSchoolItem(id);
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

  const filteredList = schoolsList.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dusun.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.npsn.includes(searchTerm)
    );
  });

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-700" />
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
              PENGELOLAAN SARANA PENDIDIKAN ({schoolsList.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar Sekolah Dasar (SD), Madrasah (MI), PAUD/TK, dan Lembaga Pesantren.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 bg-[#0b3c2c] hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Tambah Lembaga Pendidikan</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari nama lembaga, NPSN, atau dusun..."
          className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-600"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredList.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            Tidak ada lembaga pendidikan yang sesuai dengan pencarian.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Foto</th>
                  <th className="p-3">Nama Lembaga & Jenjang</th>
                  <th className="p-3">NPSN & Akreditasi</th>
                  <th className="p-3">Kepala Sekolah & Guru/Siswa</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredList.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setViewDetailItem(item)}
                    className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="p-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0 group-hover:border-blue-500 transition-colors">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900 group-hover:text-blue-950">{item.name}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 font-bold text-[9px] uppercase">
                          {item.badge}
                        </span>
                        <span className="text-[11px] text-slate-500">{item.status}</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-600">
                      <div className="font-mono text-slate-800">NPSN: {item.npsn}</div>
                      <div className="text-[11px] text-emerald-800 font-bold">Akreditasi {item.akreditasi}</div>
                    </td>
                    <td className="p-3 text-slate-600">
                      <div className="font-medium text-slate-800">{item.kepalaSekolah}</div>
                      <div className="text-[11px] text-slate-500">{item.jumlahGuru} • {item.jumlahSiswa}</div>
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
                          title="Edit Sekolah"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors cursor-pointer"
                          title="Hapus Sekolah"
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
                {editingItem ? 'Edit Sarana Pendidikan' : 'Tambah Lembaga Pendidikan'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Nama Lembaga Pendidikan *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: SD Negeri Kerep"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Jenjang / Badge</label>
                  <select
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  >
                    <option value="SD">SD (Sekolah Dasar)</option>
                    <option value="MI">MI (Madrasah Ibtidaiyah)</option>
                    <option value="TK">TK (Taman Kanak-Kanak)</option>
                    <option value="PAUD">PAUD</option>
                    <option value="Ponpes">Pondok Pesantren</option>
                    <option value="TPQ">TPQ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">NPSN</label>
                  <input
                    type="text"
                    value={formData.npsn}
                    onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                    placeholder="20535449"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  >
                    <option value="Negeri">Negeri</option>
                    <option value="Swasta">Swasta</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Akreditasi</label>
                  <select
                    value={formData.akreditasi}
                    onChange={(e) => setFormData({ ...formData, akreditasi: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  >
                    <option value="A">A (Unggul)</option>
                    <option value="B">B (Baik)</option>
                    <option value="C">C</option>
                    <option value="Belum">Belum Terakreditasi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Kepala Sekolah / Pengasuh</label>
                  <input
                    type="text"
                    value={formData.kepalaSekolah}
                    onChange={(e) => setFormData({ ...formData, kepalaSekolah: e.target.value })}
                    placeholder="Nama Kepala Sekolah"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Jumlah Guru</label>
                  <input
                    type="text"
                    value={formData.jumlahGuru}
                    onChange={(e) => setFormData({ ...formData, jumlahGuru: e.target.value })}
                    placeholder="Contoh: 12 Orang"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Jumlah Siswa</label>
                  <input
                    type="text"
                    value={formData.jumlahSiswa}
                    onChange={(e) => setFormData({ ...formData, jumlahSiswa: e.target.value })}
                    placeholder="Contoh: 156 Siswa (2025)"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Alamat</label>
                <input
                  type="text"
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  placeholder="Alamat sekolah..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Fasilitas Sekolah (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={formData.fasilitas}
                  onChange={(e) => setFormData({ ...formData, fasilitas: e.target.value })}
                  placeholder="Ruang Kelas, Perpustakaan, Mushola, Toilet"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <AutoImageUploader
                currentImage={formData.image}
                onImageUploaded={(img) => setFormData((prev) => ({ ...prev, image: img }))}
                label="Foto Gedung / Lingkungan Sekolah (Upload Otomatis Langsung)"
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
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase">Detail Sarana Pendidikan</h3>
              <button onClick={() => setViewDetailItem(null)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-40 rounded-xl bg-slate-100 overflow-hidden">
              <img src={viewDetailItem.image} alt={viewDetailItem.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-slate-900">{viewDetailItem.name}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{viewDetailItem.deskripsi}</p>
            </div>
            <div className="p-3 sm:p-3.5 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-700 border border-slate-200">
              <p><strong>NPSN:</strong> {viewDetailItem.npsn}</p>
              <p><strong>Jenjang / Status:</strong> {viewDetailItem.jenjang} ({viewDetailItem.status})</p>
              <p><strong>Alamat:</strong> {viewDetailItem.alamat}</p>
              <p><strong>Kepala Sekolah:</strong> {viewDetailItem.kepalaSekolah}</p>
              <p><strong>Guru / Siswa:</strong> {viewDetailItem.jumlahGuru} / {viewDetailItem.jumlahSiswa}</p>
              <p><strong>Fasilitas:</strong> {viewDetailItem.fasilitas?.join(', ')}</p>
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
                <span>Edit Data Sekolah Ini</span>
              </button>
              <button
                onClick={() => {
                  const idToDelete = viewDetailItem.id;
                  setViewDetailItem(null);
                  setDeleteConfirmId(idToDelete);
                }}
                className="px-3 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Hapus Lembaga"
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
            <h4 className="text-sm font-bold text-slate-900">Hapus Sekolah?</h4>
            <p className="text-xs text-slate-500">Data lembaga pendidikan ini akan dihapus dari sistem publik.</p>
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
