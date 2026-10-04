/**
 * ============================================================================
 * SAMPAH VIEW - MODUL AHLI GIZI DAPUR MBG
 * ============================================================================
 * Penanda: Pemantauan limbah makanan (Food Waste & Plate Waste),
 * sisa olahan organik, kemasan anorganik, dan penyaluran ke maggot BSF/kompos.
 * Mendukung tema terang (Light) dan tema gelap (Dark) dengan kontras tinggi.
 * ============================================================================
 */

import React, { useState } from 'react';
import { FoodWasteRecord, ThemeMode } from '../../types';
import { 
  Trash2, 
  PlusCircle, 
  Recycle, 
  Scale, 
  CheckCircle2, 
  BarChart3, 
  Sparkles, 
  Filter 
} from 'lucide-react';

interface SampahViewProps {
  wasteRecords: FoodWasteRecord[];
  onAddRecord: (record: FoodWasteRecord) => void;
  onDeleteRecord: (id: string) => void;
  theme?: ThemeMode;
}

export const SampahView: React.FC<SampahViewProps> = ({
  wasteRecords,
  onAddRecord,
  onDeleteRecord,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  const [showForm, setShowForm] = useState(false);
  const [shift, setShift] = useState<'Pagi (Persiapan Bahan)' | 'Siang (Sisa Masak & Siswa)' | 'Sore (Sanitasi Total)'>('Siang (Sisa Masak & Siswa)');
  const [organicKg, setOrganicKg] = useState(14.5);
  const [nonOrganicKg, setNonOrganicKg] = useState(2.0);
  const [plateWasteKg, setPlateWasteKg] = useState(6.8);
  const [destination, setDestination] = useState<'Budidaya Maggot BSF' | 'Komposting Dapur Mandiri' | 'TPS3R Daur Ulang' | 'Bank Sampah Mitra'>('Budidaya Maggot BSF');
  const [notes, setNotes] = useState('');
  const [loggedBy, setLoggedBy] = useState('dr. Sarah Anindita, S.Gz');

  // Filter state
  const [selectedShiftFilter, setSelectedShiftFilter] = useState<string>('all');

  // Compute metrics
  const totalOrganic = wasteRecords.reduce((acc, r) => acc + r.organicKg, 0);
  const totalNonOrganic = wasteRecords.reduce((acc, r) => acc + r.nonOrganicKg, 0);
  const totalPlateWaste = wasteRecords.reduce((acc, r) => acc + r.plateWasteKg, 0);
  const totalDiverted = totalOrganic + totalPlateWaste; // Diverted from landfill (ke maggot & kompos)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: FoodWasteRecord = {
      id: `WST-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      shift,
      organicKg: Number(organicKg),
      nonOrganicKg: Number(nonOrganicKg),
      plateWasteKg: Number(plateWasteKg),
      destination,
      notes: notes || 'Pencatatan timbangan rutin harian.',
      loggedBy
    };
    onAddRecord(newRecord);
    setShowForm(false);
    setNotes('');
  };

  const filteredRecords = selectedShiftFilter === 'all'
    ? wasteRecords
    : wasteRecords.filter(r => r.shift.includes(selectedShiftFilter));

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5 ${
        isLight ? 'border-slate-200' : 'border-neutral-800'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Recycle className="w-4 h-4" />
            <span>Audit Food Waste & Zero Waste to Landfill</span>
          </div>
          <h2 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Monitoring Sampah & Sisa Porsi Makanan
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
            Evaluasi plate waste siswa untuk penyesuaian porsi dan pengelolaan sisa organik menjadi pupuk kompos & pakan maggot BSF.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showForm ? 'Tutup Formulir' : '+ Catat Timbangan Sampah'}</span>
        </button>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className={`p-5 rounded-2xl border shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
        }`}>
          <div className={`flex items-center justify-between text-xs mb-2 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
            <span>Sampah Organik Olahan</span>
            <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className={`text-2xl font-display font-extrabold font-mono tabular-nums ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {totalOrganic.toFixed(1)} <span className={`text-xs font-normal ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>kg</span>
          </div>
          <div className={`text-[11px] mt-1 font-medium ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
            Bonggol sayur & ampas bumbu
          </div>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
        }`}>
          <div className={`flex items-center justify-between text-xs mb-2 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
            <span>Sisa Piring Siswa (Plate Waste)</span>
            <BarChart3 className="w-4 h-4 text-amber-500" />
          </div>
          <div className={`text-2xl font-display font-extrabold font-mono tabular-nums ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>
            {totalPlateWaste.toFixed(1)} <span className={`text-xs font-normal ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>kg</span>
          </div>
          <div className={`text-[11px] mt-1 font-medium ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
            Indikator penerimaan menu siswa
          </div>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
        }`}>
          <div className={`flex items-center justify-between text-xs mb-2 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
            <span>Anorganik Didaur Ulang</span>
            <Recycle className="w-4 h-4 text-blue-500" />
          </div>
          <div className={`text-2xl font-display font-extrabold font-mono tabular-nums ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>
            {totalNonOrganic.toFixed(1)} <span className={`text-xs font-normal ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>kg</span>
          </div>
          <div className={`text-[11px] mt-1 font-medium ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
            Karton telur & karung bersih
          </div>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
        }`}>
          <div className={`flex items-center justify-between text-xs mb-2 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
            <span>Tereduksi dari TPA</span>
            <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className={`text-2xl font-display font-extrabold font-mono tabular-nums ${isLight ? 'text-teal-700' : 'text-teal-300'}`}>
            {totalDiverted.toFixed(1)} <span className={`text-xs font-normal ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>kg (94%)</span>
          </div>
          <div className={`text-[11px] mt-1 font-medium ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
            Diserap Maggot & Kompos Mandiri
          </div>
        </div>
      </div>

      {/* Formulir Input Timbangan Sampah */}
      {showForm && (
        <form onSubmit={handleSubmit} className={`border rounded-2xl p-6 space-y-5 shadow-sm ${
          isLight 
            ? 'bg-white border-emerald-300 shadow-emerald-900/5' 
            : 'bg-neutral-900 border-emerald-500/30'
        }`}>
          <div className={`text-sm font-bold flex items-center gap-2 border-b pb-3 ${
            isLight ? 'text-slate-900 border-slate-200' : 'text-white border-neutral-800'
          }`}>
            <PlusCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Formulir Timbangan Limbah Dapur Harian</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Shift Pemeriksaan *
              </label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value as any)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-emerald-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-emerald-500'
                }`}
              >
                <option value="Pagi (Persiapan Bahan)">Pagi (Persiapan Bahan)</option>
                <option value="Siang (Sisa Masak & Siswa)">Siang (Sisa Masak & Siswa)</option>
                <option value="Sore (Sanitasi Total)">Sore (Sanitasi Total)</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Sampah Organik Dapur (kg) *
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={organicKg}
                onChange={(e) => setOrganicKg(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-sm font-mono focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-emerald-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-emerald-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Sisa Piring Siswa / Plate Waste (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={plateWasteKg}
                onChange={(e) => setPlateWasteKg(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-sm font-mono focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-amber-700 focus:bg-white focus:border-amber-600' 
                    : 'bg-neutral-950 border-neutral-700 text-amber-400 focus:border-emerald-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Sampah Anorganik (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={nonOrganicKg}
                onChange={(e) => setNonOrganicKg(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-sm font-mono focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-blue-700 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-blue-400 focus:border-emerald-500'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Destinasi / Penyaluran *
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value as any)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-emerald-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-emerald-500'
                }`}
              >
                <option value="Budidaya Maggot BSF">Budidaya Maggot BSF (Pakan Ternak)</option>
                <option value="Komposting Dapur Mandiri">Komposting Dapur Mandiri (Pupuk Organik)</option>
                <option value="TPS3R Daur Ulang">TPS3R Daur Ulang</option>
                <option value="Bank Sampah Mitra">Bank Sampah Mitra</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Catatan Evaluasi / Keterangan Sisa Menu
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Sisa sayur bayam SDN 02 karena sebagian siswa belum terbiasa rasa kuah bening..."
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white placeholder-neutral-500 focus:border-emerald-500'
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
              className="px-5 py-2.5 rounded-lg text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-sm cursor-pointer"
            >
              Simpan Data Timbangan
            </button>
          </div>
        </form>
      )}

      {/* Tabel Log Sampah */}
      <div className={`rounded-2xl border overflow-hidden shadow-sm ${
        isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
      }`}>
        <div className={`p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isLight ? 'border-slate-200 bg-slate-50/50' : 'border-neutral-800 bg-neutral-900'
        }`}>
          <div className={`font-bold text-sm flex items-center gap-2 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            <span>Log Riwayat Penimbangan Sampah Terjadwal</span>
            <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
              ({filteredRecords.length} Data)
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Filter className={`w-3.5 h-3.5 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`} />
            <select
              value={selectedShiftFilter}
              onChange={(e) => setSelectedShiftFilter(e.target.value)}
              className={`px-2.5 py-1 rounded-md border text-xs focus:outline-none ${
                isLight 
                  ? 'bg-white border-slate-300 text-slate-800' 
                  : 'bg-neutral-950 border-neutral-700 text-neutral-300'
              }`}
            >
              <option value="all">Semua Shift</option>
              <option value="Pagi">Shift Pagi</option>
              <option value="Siang">Shift Siang</option>
              <option value="Sore">Shift Sore</option>
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
                <th className="py-3 px-4">Tanggal & Shift</th>
                <th className="py-3 px-4 text-right">Organik (kg)</th>
                <th className="py-3 px-4 text-right">Plate Waste (kg)</th>
                <th className="py-3 px-4 text-right">Anorganik (kg)</th>
                <th className="py-3 px-4">Destinasi Penyaluran</th>
                <th className="py-3 px-4">Catatan Evaluasi Gizi</th>
                <th className="py-3 px-4">Petugas PIC</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isLight ? 'divide-slate-200 text-slate-700' : 'divide-neutral-800/80 text-neutral-300'
            }`}>
              {filteredRecords.map((rec) => (
                <tr key={rec.id} className={`transition-colors ${
                  isLight ? 'hover:bg-slate-50' : 'hover:bg-neutral-850/50'
                }`}>
                  <td className="py-3.5 px-4">
                    <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{rec.date}</div>
                    <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>{rec.shift}</div>
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono font-bold tabular-nums ${
                    isLight ? 'text-emerald-700' : 'text-emerald-400'
                  }`}>
                    {rec.organicKg} kg
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono font-bold tabular-nums ${
                    isLight ? 'text-amber-700' : 'text-amber-400'
                  }`}>
                    {rec.plateWasteKg} kg
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono tabular-nums ${
                    isLight ? 'text-blue-700 font-semibold' : 'text-blue-400'
                  }`}>
                    {rec.nonOrganicKg} kg
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium border ${
                      isLight 
                        ? 'bg-slate-100 border-slate-300 text-slate-800' 
                        : 'bg-neutral-950 border-neutral-700 text-neutral-300'
                    }`}>
                      {rec.destination}
                    </span>
                  </td>
                  <td className={`py-3.5 px-4 max-w-xs truncate ${isLight ? 'text-slate-600' : 'text-neutral-400'}`} title={rec.notes}>
                    {rec.notes}
                  </td>
                  <td className={`py-3.5 px-4 font-mono text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                    {rec.loggedBy}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => {
                        if (confirm(`Hapus catatan sampah ${rec.id}?`)) {
                          onDeleteRecord(rec.id);
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
