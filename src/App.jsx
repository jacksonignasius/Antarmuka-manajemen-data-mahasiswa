import { useCallback, useEffect, useState } from 'react';
import {
  getAllMahasiswa,
  createMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
  getErrorMessage,
} from './services/api';
import MahasiswaForm from './components/MahasiswaForm';
import MahasiswaTable from './components/MahasiswaTable';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';

export default function App() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(null); // data yang sedang diedit
  const [deleteTarget, setDeleteTarget] = useState(null); // data yang akan dihapus
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => setToast({ type, message });
  const closeToast = useCallback(() => setToast(null), []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllMahasiswa();
      setMahasiswa(res.data.data);
    } catch (error) {
      showToast('error', getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Mengembalikan true jika berhasil agar form tahu kapan harus direset
  const handleSubmit = async (form) => {
    setSubmitting(true);
    try {
      if (editing) {
        const { nim, ...payload } = form;
        const res = await updateMahasiswa(nim, payload);
        showToast('success', res.data.message);
        setEditing(null);
      } else {
        const res = await createMahasiswa(form);
        showToast('success', res.data.message);
      }
      await fetchData();
      return true;
    } catch (error) {
      showToast('error', getErrorMessage(error));
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (mhs) => {
    setEditing(mhs);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteMahasiswa(deleteTarget.nim);
      showToast('success', res.data.message);
      // Batalkan mode edit jika data yang dihapus sedang diedit
      if (editing?.nim === deleteTarget.nim) setEditing(null);
      await fetchData();
    } catch (error) {
      showToast('error', getErrorMessage(error));
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 py-5 text-white shadow">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-2xl font-bold">Manajemen Data Mahasiswa</h1>
          <p className="text-sm text-blue-100">Kelola data mahasiswa dengan mudah</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <MahasiswaForm
          initialData={editing}
          submitting={submitting}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-800">
            Daftar Mahasiswa{' '}
            {!loading && <span className="text-sm font-normal text-gray-500">({mahasiswa.length} data)</span>}
          </h2>
          <MahasiswaTable
            data={mahasiswa}
            loading={loading}
            onEdit={handleEdit}
            onDelete={setDeleteTarget}
          />
        </section>
      </main>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Hapus Data Mahasiswa"
        message={`Yakin ingin menghapus ${deleteTarget?.nama} (NIM ${deleteTarget?.nim})? Tindakan ini tidak dapat dibatalkan.`}
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
}