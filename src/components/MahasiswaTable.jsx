// Mengubah 'YYYY-MM-DD' menjadi format tanggal Indonesia tanpa pergeseran zona waktu
const formatDate = (value) => {
  if (!value) return '-';
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function MahasiswaTable({ data, loading, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
          <tr>
            <th className="px-4 py-3">NIM</th>
            <th className="px-4 py-3">Nama</th>
            <th className="px-4 py-3">Alamat</th>
            <th className="px-4 py-3">Tgl. Lahir</th>
            <th className="px-4 py-3">Jurusan</th>
            <th className="px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading ? (
            <tr>
              <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent align-middle" />
                Memuat data...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                Belum ada data mahasiswa.
              </td>
            </tr>
          ) : (
            data.map((mhs) => (
              <tr key={mhs.nim} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{mhs.nim}</td>
                <td className="whitespace-nowrap px-4 py-3">{mhs.nama}</td>
                <td className="min-w-[200px] px-4 py-3">{mhs.alamat || '-'}</td>
                <td className="whitespace-nowrap px-4 py-3">{formatDate(mhs.tgl_lahir)}</td>
                <td className="whitespace-nowrap px-4 py-3">{mhs.jurusan || '-'}</td>
                <td className="whitespace-nowrap px-4 py-3 text-center">
                  <button
                    onClick={() => onEdit(mhs)}
                    className="mr-2 rounded bg-amber-500 px-3 py-1 text-xs font-medium text-white hover:bg-amber-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(mhs)}
                    className="rounded bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}