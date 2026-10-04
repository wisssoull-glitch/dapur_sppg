/**
 * ============================================================================
 * FIFO / FEFO VIEW - MODUL ADMIN DAPUR MBG
 * ============================================================================
 * Penanda: Pengendalian rantai pasok First-In First-Out (FIFO) dan
 * First-Expired First-Out (FEFO) untuk mencegah bahan basi atau lewat tanggal batas.
 * Mendukung tema terang (Light) dan tema gelap (Dark).
 * ============================================================================
 */

import React, { useState } from 'react';
import { FifoFefoRecord, ThemeMode } from '../../types';
import { 
  Clock, 
  PlusCircle, 
  AlertCircle, 
  Calendar, 
  CheckCircle2, 
  Trash2, 
  ArrowRight, 
  Tag 
} from 'lucide-react';

interface FifoFefoViewProps {
  fifoRecords: FifoFefoRecord[];
  onAddBatch: (record: FifoFefoRecord) => void;
  onUpdateStatus: (id: string, status: FifoFefoRecord['currentStatus']) => void;
  onDeleteBatch: (id: string) => void;
  theme?: ThemeMode;
}

export const FifoFefoView: React.FC<FifoFefoViewProps> = ({
  fifoRecords,
  onAddBatch,
  onUpdateStatus,
  onDeleteBatch,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  const [showForm, setShowForm] = useState(false);
  const [batchNumber, setBatchNumber] = useState('');
  const [itemName, setItemName] = useState('');
  const [arrivalDate, setArrivalDate] = useState(new Date().toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState(50);
  const [unit, setUnit] = useState('kg');
  const [storageLocation, setStorageLocation] = useState('Chiller Sayur Rak 2');
  const [fefoPriority, setFefoPriority] = useState<FifoFefoRecord['fefoPriority']>('Segera Pakai (FEFO #1)');

  const urgentCount = fifoRecords.filter(r => r.fefoPriority.includes('#1')).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !expiryDate) return;

    const newBatch: FifoFefoRecord = {
      id: `BATCH-${Date.now().toString().slice(-4)}`,
      batchNumber: batchNumber || `B-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-0${Math.floor(1 + Math.random() * 9)}`,
      itemName,
      arrivalDate,
      expiryDate,
      quantity: Number(quantity),
      unit,
      storageLocation,
      fefoPriority,
      currentStatus: 'Siap Pakai'
    };

    onAddBatch(newBatch);
    setShowForm(false);
    setItemName('');
    setBatchNumber('');
    setExpiryDate('');
  };

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5 ${
        isLight ? 'border-slate-200' : 'border-neutral-800'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>Pengendalian Mutu Kadaluwarsa (First Expired First Out)</span>
          </div>
          <h2 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Rotasi Persediaan FIFO & FEFO
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
            Penandaan nomor lot penerimaan, kalkulasi sisa hari kadaluwarsa, dan instruksi juru masak untuk bahan terlama.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showForm ? 'Tutup Formulir' : '+ Buat Batch Baru'}</span>
        </button>
      </div>

      {/* Info Notice Strip */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs ${
        isLight 
          ? 'bg-blue-50/70 border-blue-200 text-blue-900 shadow-sm' 
          : 'bg-neutral-900/60 border-neutral-800 text-neutral-300'
      }`}>
        <div className="flex items-center gap-3">
          <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>
            <strong>Aturan Baku SPPG:</strong> Daging ayam, ikan, dan sayuran segar wajib menerapkan prioritas FEFO #1 untuk menu hari berikutnya guna mencegah susut kualitas rasa dan nutrisi.
          </span>
        </div>
        <span className={`font-mono px-2.5 py-1 rounded border text-[11px] font-semibold shrink-0 ${
          isLight 
            ? 'text-emerald-800 bg-emerald-100 border-emerald-300' 
            : 'text-emerald-400 bg-emerald-950 border-emerald-800'
        }`}>
          {urgentCount} Batch Prioritas Hari Ini
        </span>
      </div>

      {/* Formulir Input Batch Baru */}
      {showForm && (
        <form onSubmit={handleSubmit} className={`border rounded-2xl p-6 space-y-5 shadow-sm ${
          isLight 
            ? 'bg-white border-blue-300 shadow-blue-900/5' 
            : 'bg-neutral-900 border-blue-500/30'
        }`}>
          <div className={`text-sm font-bold flex items-center gap-2 border-b pb-3 ${
            isLight ? 'text-slate-900 border-slate-200' : 'text-white border-neutral-800'
          }`}>
            <PlusCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Pendaftaran Lot Penerimaan Barang & Label FEFO</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Nomor Batch / Lot Supplier
              </label>
              <input
                type="text"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                placeholder="Contoh: B-261004-IKN-01"
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Nama Komoditas Bahan *
              </label>
              <input
                type="text"
                required
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Contoh: Fillet Ikan Nila Segar Non-Duri"
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Tanggal Kedatangan *
              </label>
              <input
                type="date"
                required
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Tanggal Kedaluwarsa (Exp) *
              </label>
              <input
                type="date"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-amber-700 focus:bg-white focus:border-amber-600 font-semibold' 
                    : 'bg-neutral-950 border-neutral-700 text-amber-400 focus:border-blue-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Jumlah Diterima *
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Satuan
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="liter">Liter (L)</option>
                <option value="butir">Butir</option>
                <option value="karung">Karung</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Lokasi Rak / Ruang Penyimpanan
              </label>
              <input
                type="text"
                value={storageLocation}
                onChange={(e) => setStorageLocation(e.target.value)}
                placeholder="Contoh: Chiller Daging Rak 2"
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Tingkat Prioritas FEFO
              </label>
              <select
                value={fefoPriority}
                onChange={(e) => setFefoPriority(e.target.value as any)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              >
                <option value="Segera Pakai (FEFO #1)">Segera Pakai (FEFO #1 - Exp &lt; 3 Hari)</option>
                <option value="Normal (FEFO #2)">Normal (FEFO #2 - Exp 4-14 Hari)</option>
                <option value="Aman (FEFO #3)">Aman (FEFO #3 - Exp Jangka Panjang)</option>
              </select>
            </div>
          </div>

          <div className={`flex items-center justify-end gap-3 pt-3 border-t ${
            isLight ? 'border-slate-200' : 'border-neutral-800'
          }`}>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className={`px-4 py-2 rounded-lg text-xs font-medium cursor-pointer ${
                isLight ? 'text-slate-600 hover:text-slate-900' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm cursor-pointer"
            >
              Simpan Batch & Generate Label
            </button>
          </div>
        </form>
      )}

      {/* Tabel Batch FIFO / FEFO */}
      <div className={`rounded-2xl border overflow-hidden shadow-sm ${
        isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase tracking-wider font-semibold border-b text-[11px] ${
              isLight 
                ? 'bg-slate-100/70 border-slate-200 text-slate-700' 
                : 'bg-neutral-950 border-neutral-800 text-neutral-400'
            }`}>
              <tr>
                <th className="py-3 px-4">No. Batch</th>
                <th className="py-3 px-4">Komoditas Bahan</th>
                <th className="py-3 px-4">Tgl Masuk (FIFO)</th>
                <th className="py-3 px-4">Kedaluwarsa (FEFO)</th>
                <th className="py-3 px-4 text-right">Volume</th>
                <th className="py-3 px-4">Lokasi Rak</th>
                <th className="py-3 px-4 text-center">Urutan Prioritas</th>
                <th className="py-3 px-4 text-center">Status Batch</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isLight ? 'divide-slate-200 text-slate-700' : 'divide-neutral-800/80 text-neutral-300'
            }`}>
              {fifoRecords.map((batch) => {
                const isUrgent = batch.fefoPriority.includes('#1');
                return (
                  <tr key={batch.id} className={`transition-colors ${
                    isLight ? 'hover:bg-slate-50' : 'hover:bg-neutral-850/50'
                  }`}>
                    <td className={`py-3.5 px-4 font-mono font-bold text-[11px] ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {batch.batchNumber}
                    </td>
                    <td className={`py-3.5 px-4 font-bold ${isLight ? 'text-slate-900' : 'text-neutral-100'}`}>
                      {batch.itemName}
                    </td>
                    <td className={`py-3.5 px-4 font-mono text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                      {batch.arrivalDate}
                    </td>
                    <td className={`py-3.5 px-4 font-mono text-[11px] font-bold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>
                      {batch.expiryDate}
                    </td>
                    <td className={`py-3.5 px-4 text-right font-mono font-bold tabular-nums ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {batch.quantity} {batch.unit}
                    </td>
                    <td className={`py-3.5 px-4 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                      {batch.storageLocation}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                        isUrgent
                          ? isLight ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-rose-950 text-rose-300 border border-rose-800'
                          : batch.fefoPriority.includes('#2')
                          ? isLight ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-amber-950 text-amber-300 border border-amber-800'
                          : isLight ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                      }`}>
                        {batch.fefoPriority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <select
                        value={batch.currentStatus}
                        onChange={(e) => onUpdateStatus(batch.id, e.target.value as any)}
                        className={`px-2 py-1 rounded border text-xs focus:outline-none ${
                          isLight 
                            ? 'bg-white border-slate-300 text-slate-800' 
                            : 'bg-neutral-950 border-neutral-700 text-white'
                        }`}
                      >
                        <option value="Siap Pakai">Siap Pakai</option>
                        <option value="Sedang Digunakan">Sedang Digunakan</option>
                        <option value="Karantina">Karantina</option>
                        <option value="Habis">Habis</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => {
                          if (confirm(`Hapus batch ${batch.batchNumber}?`)) {
                            onDeleteBatch(batch.id);
                          }
                        }}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          isLight ? 'text-slate-400 hover:text-rose-600 hover:bg-slate-100' : 'text-neutral-500 hover:text-rose-400 hover:bg-neutral-800'
                        }`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
