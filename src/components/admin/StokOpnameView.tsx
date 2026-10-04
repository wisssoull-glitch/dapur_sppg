/**
 * ============================================================================
 * STOK OPNAME VIEW - MODUL ADMIN DAPUR MBG
 * ============================================================================
 * Penanda: Rekonsiliasi audit berkala antara saldo tercatat di sistem digital
 * dengan kuantitas riil fisik bahan di rak penyimpanan & cold-room.
 * Mendukung tema terang (Light) dan tema gelap (Dark).
 * ============================================================================
 */

import React, { useState } from 'react';
import { StockOpnameRecord, ThemeMode } from '../../types';
import { 
  ClipboardCheck, 
  PlusCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Trash2, 
  FileText 
} from 'lucide-react';

interface StokOpnameViewProps {
  stockOpnames: StockOpnameRecord[];
  onAddOpname: (record: StockOpnameRecord) => void;
  onDeleteOpname: (id: string) => void;
  theme?: ThemeMode;
}

export const StokOpnameView: React.FC<StokOpnameViewProps> = ({
  stockOpnames,
  onAddOpname,
  onDeleteOpname,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  const [showForm, setShowForm] = useState(false);
  const [itemCode, setItemCode] = useState('BP-001');
  const [itemName, setItemName] = useState('Beras Premium Ramos Cianjur');
  const [systemQty, setSystemQty] = useState(850);
  const [physicalQty, setPhysicalQty] = useState(846);
  const [unit, setUnit] = useState('kg');
  const [discrepancyReason, setDiscrepancyReason] = useState('Penyusutan kelembapan alami karung & penimbangan eceran harian.');
  const [auditorName, setAuditorName] = useState('Bambang Prasetyo, S.E');

  const discrepancy = physicalQty - systemQty;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName) return;

    let auditStatus: StockOpnameRecord['auditStatus'] = 'Sesuai';
    const absDiff = Math.abs(discrepancy);
    if (absDiff === 0) {
      auditStatus = 'Sesuai';
    } else if (absDiff <= 5) {
      auditStatus = 'Toleransi Susut Wajar';
    } else {
      auditStatus = 'Selisih Perlu Investigasi';
    }

    const newOpname: StockOpnameRecord = {
      id: `SOP-${Date.now().toString().slice(-4)}`,
      itemCode,
      itemName,
      systemQty: Number(systemQty),
      physicalQty: Number(physicalQty),
      discrepancy: Number(discrepancy),
      unit,
      auditStatus,
      opnameDate: new Date().toISOString().split('T')[0],
      discrepancyReason: discrepancyReason || 'Pencocokan fisik berkala.',
      auditorName
    };

    onAddOpname(newOpname);
    setShowForm(false);
    setItemName('');
    setDiscrepancyReason('');
  };

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5 ${
        isLight ? 'border-slate-200' : 'border-neutral-800'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <ClipboardCheck className="w-4 h-4" />
            <span>Audit Fisik Gudang & Akurasi Saldo</span>
          </div>
          <h2 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Stok Opname & Rekonsiliasi Gudang
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
            Sinkronkan catatan digital dengan kuantitas fisik aktual di rak dan ruang chiller untuk mendeteksi susut alami atau selisih tak wajar.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showForm ? 'Tutup Formulir' : '+ Mulai Audit Stok Opname'}</span>
        </button>
      </div>

      {/* Formulir Input Stok Opname Baru */}
      {showForm && (
        <form onSubmit={handleSubmit} className={`border rounded-2xl p-6 space-y-5 shadow-sm ${
          isLight 
            ? 'bg-white border-blue-300 shadow-blue-900/5' 
            : 'bg-neutral-900 border-blue-500/30'
        }`}>
          <div className={`text-sm font-bold flex items-center gap-2 border-b pb-3 ${
            isLight ? 'text-slate-900 border-slate-200' : 'text-white border-neutral-800'
          }`}>
            <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Formulir Berita Acara Rekonsiliasi Fisik</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Kode SKU Bahan
              </label>
              <input
                type="text"
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
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
                Qty Saldo Sistem
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={systemQty}
                onChange={(e) => setSystemQty(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Qty Hitung Fisik *
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={physicalQty}
                onChange={(e) => setPhysicalQty(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono font-bold focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-emerald-700 focus:bg-white focus:border-emerald-600' 
                    : 'bg-neutral-950 border-neutral-700 text-emerald-400 focus:border-blue-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Satuan
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Selisih (Variance)
              </label>
              <div className={`px-3 py-2 rounded-lg border text-xs font-mono font-bold ${
                isLight
                  ? discrepancy === 0 ? 'bg-slate-50 border-slate-200 text-emerald-700' : discrepancy < 0 ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-blue-50 border-blue-200 text-blue-700'
                  : discrepancy === 0 ? 'bg-neutral-950 border-neutral-700 text-emerald-400' : discrepancy < 0 ? 'bg-neutral-950 border-neutral-700 text-amber-400' : 'bg-neutral-950 border-neutral-700 text-blue-400'
              }`}>
                {discrepancy > 0 ? `+${discrepancy}` : discrepancy} {unit}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Alasan Selisih / Evaluasi Susut
              </label>
              <input
                type="text"
                value={discrepancyReason}
                onChange={(e) => setDiscrepancyReason(e.target.value)}
                placeholder="Contoh: Drip loss es pada ayam beku, sortasi wortel patah..."
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white placeholder-neutral-500 focus:border-blue-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Nama Petugas Auditor
              </label>
              <input
                type="text"
                value={auditorName}
                onChange={(e) => setAuditorName(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              />
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
              Simpan Berita Acara Opname
            </button>
          </div>
        </form>
      )}

      {/* Tabel Hasil Stok Opname */}
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
                <th className="py-3 px-4">Tanggal Audit</th>
                <th className="py-3 px-4">SKU & Komoditas</th>
                <th className="py-3 px-4 text-right">Saldo Sistem</th>
                <th className="py-3 px-4 text-right">Fisik Riil</th>
                <th className="py-3 px-4 text-right">Selisih</th>
                <th className="py-3 px-4 text-center">Status Audit</th>
                <th className="py-3 px-4">Alasan & Rekomendasi</th>
                <th className="py-3 px-4">Auditor</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isLight ? 'divide-slate-200 text-slate-700' : 'divide-neutral-800/80 text-neutral-300'
            }`}>
              {stockOpnames.map((sop) => (
                <tr key={sop.id} className={`transition-colors ${
                  isLight ? 'hover:bg-slate-50' : 'hover:bg-neutral-850/50'
                }`}>
                  <td className={`py-3.5 px-4 font-mono text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                    {sop.opnameDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{sop.itemName}</div>
                    <div className={`text-[10px] font-mono ${isLight ? 'text-slate-400' : 'text-neutral-500'}`}>{sop.itemCode}</div>
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono tabular-nums ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                    {sop.systemQty} {sop.unit}
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono font-bold tabular-nums ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {sop.physicalQty} {sop.unit}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold tabular-nums">
                    <span className={
                      sop.discrepancy === 0 
                        ? isLight ? 'text-emerald-700' : 'text-emerald-400' 
                        : isLight ? 'text-amber-700' : 'text-amber-400'
                    }>
                      {sop.discrepancy > 0 ? `+${sop.discrepancy}` : sop.discrepancy} {sop.unit}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                      sop.auditStatus === 'Sesuai'
                        ? isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : sop.auditStatus === 'Toleransi Susut Wajar'
                        ? isLight ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-blue-950 text-blue-300 border border-blue-800'
                        : isLight ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}>
                      {sop.auditStatus}
                    </span>
                  </td>
                  <td className={`py-3.5 px-4 max-w-xs truncate ${isLight ? 'text-slate-600' : 'text-neutral-400'}`} title={sop.discrepancyReason}>
                    {sop.discrepancyReason}
                  </td>
                  <td className={`py-3.5 px-4 font-mono text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                    {sop.auditorName}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => {
                        if (confirm(`Hapus catatan opname ${sop.itemName}?`)) {
                          onDeleteOpname(sop.id);
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
