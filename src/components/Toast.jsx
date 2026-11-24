import { useEffect } from 'react';

// Notifikasi sederhana yang hilang otomatis setelah 3,5 detik
export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const color = toast.type === 'success' ? 'bg-green-600' : 'bg-red-600';

  return (
    <div
      role="alert"
      className={`fixed top-4 right-4 z-50 flex max-w-sm items-start gap-3 rounded-lg px-4 py-3 text-sm text-white shadow-lg ${color}`}
    >
      <span className="flex-1">{toast.message}</span>
      <button onClick={onClose} aria-label="Tutup notifikasi" className="font-bold">
        ×
      </button>
    </div>
  );
}