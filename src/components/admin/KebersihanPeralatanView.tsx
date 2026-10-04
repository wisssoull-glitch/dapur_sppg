/**
 * ============================================================================
 * KEBERSIHAN PERALATAN VIEW - MODUL ADMIN DAPUR MBG
 * ============================================================================
 * Penanda: Inspeksi sanitasi peralatan masak, wadah bento tray SUS-304,
 * talenan HACCP warna, sterilisasi suhu panas 82°C, dan uji swab residu.
 * Mendukung tema terang (Light) dan tema gelap (Dark).
 * ============================================================================
 */

import React, { useState } from 'react';
import { EquipmentHygieneRecord, ThemeMode } from '../../types';
import { 
  ShieldCheck, 
  PlusCircle, 
  CheckCircle2, 
  AlertOctagon, 
  Trash2, 
  Sparkles, 
  Filter 
} from 'lucide-react';

interface KebersihanPeralatanViewProps {
  hygieneRecords: EquipmentHygieneRecord[];
  onAddRecord: (record: EquipmentHygieneRecord) => void;
  onDeleteRecord: (id: string) => void;
  theme?: ThemeMode;
}

export const KebersihanPeralatanView: React.FC<KebersihanPeralatanViewProps> = ({
  hygieneRecords,
  onAddRecord,
  onDeleteRecord,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  const [showForm, setShowForm] = useState(false);
  const [equipmentName, setEquipmentName] = useState('');
  const [category, setCategory] = useState<EquipmentHygieneRecord['category']>('Wadah Stainless Bento');
  const [washMethod, setWashMethod] = useState<EquipmentHygieneRecord['washMethod']>('Sanitasi Suhu Panas 82°C');
  const [swabTestResult, setSwabTestResult] = useState<EquipmentHygieneRecord['swabTestResult']>('Lolos Uji Sanitasi');
  const [inspectorName, setInspectorName] = useState('Bambang Prasetyo, S.E');
  const [notes, setNotes] = useState('');

  // Filter Category
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const passedCount = hygieneRecords.filter(r => r.swabTestResult === 'Lolos Uji Sanitasi').length;
  const passRate = hygieneRecords.length ? Math.round((passedCount / hygieneRecords.length) * 100) : 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!equipmentName) return;

    const newRecord: EquipmentHygieneRecord = {
      id: `HYG-${Date.now().toString().slice(-4)}`,
      equipmentName,
      category,
      washMethod,
      swabTestResult,
      checkDate: new Date().toISOString().split('T')[0],
      inspectorName,
      notes: notes || 'Peralatan telah memenuhi batas mikrobiologi sanitasi SPPG.'
    };

    onAddRecord(newRecord);
    setShowForm(false);
    setEquipmentName('');
    setNotes('');
  };

  const filteredRecords = filterCategory === 'all'
    ? hygieneRecords
    : hygieneRecords.filter(r => r.category === filterCategory);

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5 ${
        isLight ? 'border-slate-200' : 'border-neutral-800'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Protokol Keamanan Pangan & Sterilisasi Alat</span>
          </div>
          <h2 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Inspeksi Kebersihan Peralatan Dapur
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
            Verifikasi sterilisasi wadah stainless SUS-304, pencucian 3 bak suhu 82°C, dan uji swab bebas residu patogen.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showForm ? 'Tutup Formulir' : '+ Catat Uji Kebersihan Alat'}</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`p-5 rounded-2xl border shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
        }`}>
          <div className={`text-xs mb-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>Tingkat Kelulusan Uji Swab</div>
          <div className={`text-3xl font-display font-extrabold font-mono tabular-nums ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>
            {passRate}%
          </div>
          <div className={`text-[11px] mt-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
            {passedCount} dari {hygieneRecords.length} unit dinyatakan higienis
          </div>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
        }`}>
          <div className={`text-xs mb-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>Metode Utama Digunakan</div>
          <div className={`text-xl font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Sanitasi Termal 82°C
          </div>
          <div className={`text-[11px] mt-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
            Membunuh patogen bakteri vegetatif
          </div>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
        }`}>
          <div className={`text-xs mb-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>Wadah Bento Stainless SUS-304</div>
          <div className={`text-xl font-bold mt-1 ${isLight ? 'text-teal-700' : 'text-teal-300'}`}>
            3.500 Set Siap Pakai
          </div>
          <div className={`text-[11px] mt-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
            Disimpan di lemari UV kabinet steril
          </div>
        </div>
      </div>

      {/* Form Input Uji Sanitasi Baru */}
      {showForm && (
        <form onSubmit={handleSubmit} className={`border rounded-2xl p-6 space-y-5 shadow-sm ${
          isLight 
            ? 'bg-white border-blue-300 shadow-blue-900/5' 
            : 'bg-neutral-900 border-blue-500/30'
        }`}>
          <div className={`text-sm font-bold flex items-center gap-2 border-b pb-3 ${
            isLight ? 'text-slate-900 border-slate-200' : 'text-white border-neutral-800'
          }`}>
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Formulir Verifikasi Sanitasi Peralatan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Nama Peralatan / Batch Wadah *
              </label>
              <input
                type="text"
                required
                value={equipmentName}
                onChange={(e) => setEquipmentName(e.target.value)}
                placeholder="Contoh: Wadah Bento Siswa Batch 04 (500 pcs) atau Ketel Boiler Panci Sup"
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white placeholder-neutral-500 focus:border-blue-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Kategori Peralatan *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              >
                <option value="Wadah Stainless Bento">Wadah Stainless Bento</option>
                <option value="Peralatan Masak Utama">Peralatan Masak Utama</option>
                <option value="Pisau & Talenan HACCP">Pisau & Talenan HACCP</option>
                <option value="Sterilizer & Mesin Cuci">Sterilizer & Mesin Cuci</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Metode Pencucian / Sanitasi *
              </label>
              <select
                value={washMethod}
                onChange={(e) => setWashMethod(e.target.value as any)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              >
                <option value="Sanitasi Suhu Panas 82°C">Sanitasi Suhu Panas 82°C</option>
                <option value="Pencucian 3 Bak Standar">Pencucian 3 Bak Standar</option>
                <option value="Disinfeksi Klorin Food Grade">Disinfeksi Klorin Food Grade</option>
                <option value="Sterilisasi UV">Sterilisasi UV-C Kabinet</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Hasil Uji Swab Sanitasi *
              </label>
              <select
                value={swabTestResult}
                onChange={(e) => setSwabTestResult(e.target.value as any)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              >
                <option value="Lolos Uji Sanitasi">Lolos Uji Sanitasi (Bersih & Steril)</option>
                <option value="Perlu Pembersihan Ulang">Perlu Pembersihan Ulang (Residu)</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Petugas Pengawas / Auditor
              </label>
              <input
                type="text"
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
              Catatan Kondisi Fisik / Suhu Bilas
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Suhu bilas air panas tercatat 83.2°C, talenan tidak terdapat goresan dalam..."
              className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                isLight 
                  ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white placeholder-neutral-500 focus:border-blue-500'
              }`}
            />
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
              Simpan Data Verifikasi
            </button>
          </div>
        </form>
      )}

      {/* Tabel Log Kebersihan Peralatan */}
      <div className={`rounded-2xl border overflow-hidden shadow-sm ${
        isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
      }`}>
        <div className={`p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isLight ? 'border-slate-200 bg-slate-50/50' : 'border-neutral-800 bg-neutral-900'
        }`}>
          <div className={`font-bold text-sm flex items-center gap-2 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            <span>Log Inspeksi Kebersihan Peralatan Dapur</span>
            <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
              ({filteredRecords.length} Data)
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Filter className={`w-3.5 h-3.5 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`px-2.5 py-1 rounded-md border text-xs focus:outline-none ${
                isLight 
                  ? 'bg-white border-slate-300 text-slate-800' 
                  : 'bg-neutral-950 border-neutral-700 text-neutral-300'
              }`}
            >
              <option value="all">Semua Kategori</option>
              <option value="Wadah Stainless Bento">Wadah Stainless Bento</option>
              <option value="Peralatan Masak Utama">Peralatan Masak Utama</option>
              <option value="Pisau & Talenan HACCP">Pisau & Talenan HACCP</option>
              <option value="Sterilizer & Mesin Cuci">Sterilizer & Mesin Cuci</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase tracking-wider font-semibold border-b text-[11px] ${
              isLight 
                ? 'bg-slate-100/70 border-slate-200 text-slate-700' 
                : 'bg-neutral-950 border-neutral-800 text-neutral-400'
            }`}>
              <tr>
                <th className="py-3 px-4">Nama Peralatan</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Waktu Inspeksi</th>
                <th className="py-3 px-4">Metode Sanitasi</th>
                <th className="py-3 px-4 text-center">Hasil Uji Swab</th>
                <th className="py-3 px-4">Catatan Auditor</th>
                <th className="py-3 px-4">Petugas</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isLight ? 'divide-slate-200 text-slate-700' : 'divide-neutral-800/80 text-neutral-300'
            }`}>
              {filteredRecords.map((item) => (
                <tr key={item.id} className={`transition-colors ${
                  isLight ? 'hover:bg-slate-50' : 'hover:bg-neutral-850/50'
                }`}>
                  <td className={`py-3.5 px-4 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {item.equipmentName}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] border ${
                      isLight 
                        ? 'bg-slate-100 border-slate-300 text-slate-800' 
                        : 'bg-neutral-950 border-neutral-700 text-neutral-300'
                    }`}>
                      {item.category}
                    </span>
                  </td>
                  <td className={`py-3.5 px-4 font-mono text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                    {item.checkDate}
                  </td>
                  <td className={`py-3.5 px-4 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                    {item.washMethod}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      item.swabTestResult === 'Lolos Uji Sanitasi'
                        ? isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : isLight ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}>
                      {item.swabTestResult === 'Lolos Uji Sanitasi' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <AlertOctagon className="w-3 h-3" />
                      )}
                      <span>{item.swabTestResult}</span>
                    </span>
                  </td>
                  <td className={`py-3.5 px-4 max-w-xs truncate ${isLight ? 'text-slate-600' : 'text-neutral-400'}`} title={item.notes}>
                    {item.notes}
                  </td>
                  <td className={`py-3.5 px-4 font-mono text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                    {item.inspectorName}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => {
                        if (confirm(`Hapus catatan inspeksi ${item.equipmentName}?`)) {
                          onDeleteRecord(item.id);
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
