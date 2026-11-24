import { useEffect, useState } from 'react';

const EMPTY_FORM = { nim: '', nama: '', alamat: '', tgl_lahir: '', jurusan: '' };

const inputClass =
  'mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100';

/**
 * Form tambah / edit mahasiswa.
 * - initialData === null  -> mode tambah
 * - initialData berisi data -> mode edit (NIM terkunci karena primary key)
 */
export default function MahasiswaForm({ initialData, submitting, onSubmit, onCancel }) {
  const isEdit = Boolean(initialData);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    setForm(initialData ? { ...EMPTY_FORM, ...initialData } : EMPTY_FORM);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(form);
    // Kosongkan form hanya jika penambahan data berhasil
    if (success && !isEdit) setForm(EMPTY_FORM);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        {isEdit ? 'Edit Data Mahasiswa' : 'Tambah Mahasiswa Baru'}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-gray-700">
          NIM *
          <input
            name="nim"
            value={form.nim}
            onChange={handleChange}
            disabled={isEdit}
            maxLength={20}
            required
            className={inputClass}
          />
        </label>

        <label className="text-sm font-medium text-gray-700">
          Nama *
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            maxLength={100}
            required
            className={inputClass}
          />
        </label>

        <label className="text-sm font-medium text-gray-700">
          Tanggal Lahir
          <input
            type="date"
            name="tgl_lahir"
            value={form.tgl_lahir || ''}
            onChange={handleChange}
            className={inputClass}
          />
        </label>

        <label className="text-sm font-medium text-gray-700">
          Jurusan
          <input
            name="jurusan"
            value={form.jurusan || ''}
            onChange={handleChange}
            maxLength={100}
            className={inputClass}
          />
        </label>

        <label className="text-sm font-medium text-gray-700 md:col-span-2">
          Alamat
          <textarea
            name="alamat"
            value={form.alamat || ''}
            onChange={handleChange}
            rows={2}
            className={inputClass}
          />
        </label>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah'}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded-md border border-gray-300 px-5 py-2 text-sm hover:bg-gray-50"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}