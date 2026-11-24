import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Mengambil pesan error yang ramah dari respons API / jaringan
export const getErrorMessage = (error) =>
  error.response?.data?.message ||
  (error.request
    ? 'Tidak dapat terhubung ke server. Periksa koneksi Anda.'
    : 'Terjadi kesalahan tak terduga.');

export const getAllMahasiswa = () => api.get('/mahasiswa');
export const getMahasiswaByNim = (nim) => api.get(`/mahasiswa/${encodeURIComponent(nim)}`);
export const createMahasiswa = (payload) => api.post('/mahasiswa', payload);
export const updateMahasiswa = (nim, payload) =>
  api.put(`/mahasiswa/${encodeURIComponent(nim)}`, payload);
export const deleteMahasiswa = (nim) =>
  api.delete(`/mahasiswa/${encodeURIComponent(nim)}`);