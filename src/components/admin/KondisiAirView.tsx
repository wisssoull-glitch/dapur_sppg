/**
 * ============================================================================
 * KONDISI AIR VIEW - MODUL ADMIN DAPUR MBG
 * ============================================================================
 * Penanda: Pengujian parameter kualitas air minum Reverse Osmosis (RO),
 * filtrasi air pencucian, derajat keasaman (pH), total padatan terlarut (TDS),
 * kekeruhan (NTU), dan uji bebas bakteri E. coli / Coliform.
 * Mendukung tema terang (Light) dan tema gelap (Dark).
 * ============================================================================
 */

import React, { useState } from 'react';
import { WaterQualityRecord, ThemeMode } from '../../types';
import { 
  Droplets, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  Trash2, 
  Sparkles 
} from 'lucide-react';

interface KondisiAirViewProps {
  waterRecords: WaterQualityRecord[];
  onAddWaterRecord: (record: WaterQualityRecord) => void;
  onDeleteWaterRecord: (id: string) => void;
  theme?: ThemeMode;
}

export const KondisiAirView: React.FC<KondisiAirViewProps> = ({
  waterRecords,
  onAddWaterRecord,
  onDeleteWaterRecord,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  const [showForm, setShowForm] = useState(false);
  const [waterSource, setWaterSource] = useState<WaterQualityRecord['waterSource']>('Unit Reverse Osmosis (Air Minum)');
  const [phLevel, setPhLevel] = useState(7.2);
  const [tdsPpm, setTdsPpm] = useState(28);
  const [turbidityNtu, setTurbidityNtu] = useState(0.15);
  const [smellTasteCheck, setSmellTasteCheck] = useState<WaterQualityRecord['smellTasteCheck']>('Jernih, Tanpa Bau & Rasa');
  const [eColiStatus, setEColiStatus] = useState<WaterQualityRecord['eColiStatus']>('Negatif / Aman (0 CFU/100ml)');
  const [filterCondition, setFilterCondition] = useState<WaterQualityRecord['filterCondition']>('Baik (Usia Pakai 45%)');
  const [picTechnician, setPicTechnician] = useState('Bambang Prasetyo, S.E');

  const latestRO = waterRecords.find(r => r.waterSource.includes('Reverse Osmosis')) || waterRecords[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecord: WaterQualityRecord = {
      id: `WTR-${Date.now().toString().slice(-4)}`,
      waterSource,
      phLevel: Number(phLevel),
      tdsPpm: Number(tdsPpm),
      turbidityNtu: Number(turbidityNtu),
      smellTasteCheck,
      eColiStatus,
      filterCondition,
      inspectionDate: `${new Date().toISOString().split('T')[0]} 06:30 WIB`,
      picTechnician
    };

    onAddWaterRecord(newRecord);
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5 ${
        isLight ? 'border-slate-200' : 'border-neutral-800'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Droplets className="w-4 h-4" />
            <span>Pengujian Mutu Sumber & Air Baku Produksi</span>
          </div>
          <h2 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Sumber & Kondisi Kualitas Air
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
            Inspeksi kimia & fisik air minum Reverse Osmosis (RO) serta uji bebas kontaminasi mikrobiologi coliform & E. coli.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showForm ? 'Tutup Formulir' : '+ Catat Uji Kualitas Air'}</span>
        </button>
      </div>

      {/* Metric Cards Kualitas Air RO Terakhir */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className={`p-5 rounded-2xl border shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
        }`}>
          <div className={`text-xs mb-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>Derajat Keasaman (pH) RO</div>
          <div className={`text-3xl font-display font-extrabold font-mono tabular-nums ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>
            {latestRO?.phLevel || 7.2}
          </div>
          <div className={`text-[11px] mt-1 font-medium ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
            Normal (Standar Kemenkes: 6.5 - 8.5)
          </div>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
        }`}>
          <div className={`text-xs mb-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>Total Padatan Terlarut (TDS)</div>
          <div className={`text-3xl font-display font-extrabold font-mono tabular-nums ${isLight ? 'text-teal-700' : 'text-teal-300'}`}>
            {latestRO?.tdsPpm || 28} <span className={`text-xs font-normal ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>ppm</span>
          </div>
          <div className={`text-[11px] mt-1 font-medium ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
            Sangat Murni (Batas aman: &lt;300 ppm)
          </div>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
        }`}>
          <div className={`text-xs mb-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>Kekeruhan (Turbidity)</div>
          <div className={`text-3xl font-display font-extrabold font-mono tabular-nums ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {latestRO?.turbidityNtu || 0.15} <span className={`text-xs font-normal ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>NTU</span>
          </div>
          <div className={`text-[11px] mt-1 font-medium ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
            Sangat Jernih (Batas aman: &lt;5 NTU)
          </div>
        </div>

        <div className={`p-5 rounded-2xl border shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
        }`}>
          <div className={`text-xs mb-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>Status Uji Bakteriologis</div>
          <div className={`text-xl font-bold mt-1 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
            0 CFU / Negatif
          </div>
          <div className={`text-[11px] mt-1 font-medium ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
            Bebas E. coli & Coliform total
          </div>
        </div>
      </div>

      {/* Formulir Input Uji Kualitas Air Baru */}
      {showForm && (
        <form onSubmit={handleSubmit} className={`border rounded-2xl p-6 space-y-5 shadow-sm ${
          isLight 
            ? 'bg-white border-blue-300 shadow-blue-900/5' 
            : 'bg-neutral-900 border-blue-500/30'
        }`}>
          <div className={`text-sm font-bold flex items-center gap-2 border-b pb-3 ${
            isLight ? 'text-slate-900 border-slate-200' : 'text-white border-neutral-800'
          }`}>
            <Droplets className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Formulir Pengujian Parameter Sumber Air</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Titik Sumber Air *
              </label>
              <select
                value={waterSource}
                onChange={(e) => setWaterSource(e.target.value as any)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              >
                <option value="Unit Reverse Osmosis (Air Minum)">Unit Reverse Osmosis (Air Minum)</option>
                <option value="Sumur Bor Filtrasi 3 Tahap">Sumur Bor Filtrasi 3 Tahap</option>
                <option value="PDAM Terklorinasi">PDAM Terklorinasi</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Kadar pH (6.5 - 8.5) *
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={phLevel}
                onChange={(e) => setPhLevel(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono font-bold focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-blue-700 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-blue-400 focus:border-blue-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                TDS (ppm) *
              </label>
              <input
                type="number"
                required
                value={tdsPpm}
                onChange={(e) => setTdsPpm(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Kekeruhan (NTU) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={turbidityNtu}
                onChange={(e) => setTurbidityNtu(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Uji Organoleptik (Rasa & Bau)
              </label>
              <select
                value={smellTasteCheck}
                onChange={(e) => setSmellTasteCheck(e.target.value as any)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              >
                <option value="Jernih, Tanpa Bau & Rasa">Jernih, Tanpa Bau & Rasa</option>
                <option value="Tercatat Bau Samar">Tercatat Bau Samar</option>
                <option value="Keruh Ringan">Keruh Ringan</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Hasil Uji Bakteriologis E. coli
              </label>
              <select
                value={eColiStatus}
                onChange={(e) => setEColiStatus(e.target.value as any)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              >
                <option value="Negatif / Aman (0 CFU/100ml)">Negatif / Aman (0 CFU/100ml)</option>
                <option value="Dalam Uji Laboratorium">Dalam Uji Laboratorium</option>
                <option value="Karantina Filter">Karantina Filter</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Kondisi Membran & Filter
              </label>
              <select
                value={filterCondition}
                onChange={(e) => setFilterCondition(e.target.value as any)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              >
                <option value="Prima (Baru Diganti)">Prima (Baru Diganti)</option>
                <option value="Baik (Usia Pakai 45%)">Baik (Usia Pakai 45%)</option>
                <option value="Jadwal Backwash/Ganti">Jadwal Backwash / Ganti</option>
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
              Simpan Hasil Uji Air
            </button>
          </div>
        </form>
      )}

      {/* Tabel Log Kondisi Air */}
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
                <th className="py-3 px-4">Waktu Uji</th>
                <th className="py-3 px-4">Titik Sumber Air</th>
                <th className="py-3 px-4 text-right">pH</th>
                <th className="py-3 px-4 text-right">TDS (ppm)</th>
                <th className="py-3 px-4 text-right">Kekeruhan</th>
                <th className="py-3 px-4">Bau & Rasa</th>
                <th className="py-3 px-4 text-center">Uji E. coli</th>
                <th className="py-3 px-4">Status Filter</th>
                <th className="py-3 px-4">Petugas</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isLight ? 'divide-slate-200 text-slate-700' : 'divide-neutral-800/80 text-neutral-300'
            }`}>
              {waterRecords.map((rec) => (
                <tr key={rec.id} className={`transition-colors ${
                  isLight ? 'hover:bg-slate-50' : 'hover:bg-neutral-850/50'
                }`}>
                  <td className={`py-3.5 px-4 font-mono text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                    {rec.inspectionDate}
                  </td>
                  <td className={`py-3.5 px-4 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {rec.waterSource}
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono font-bold tabular-nums ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>
                    {rec.phLevel}
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono tabular-nums ${isLight ? 'text-teal-700 font-semibold' : 'text-teal-300'}`}>
                    {rec.tdsPpm} ppm
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono tabular-nums ${isLight ? 'text-slate-600' : 'text-neutral-300'}`}>
                    {rec.turbidityNtu} NTU
                  </td>
                  <td className={`py-3.5 px-4 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                    {rec.smellTasteCheck}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                      isLight 
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}>
                      {rec.eColiStatus}
                    </span>
                  </td>
                  <td className={`py-3.5 px-4 text-[11px] ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                    {rec.filterCondition}
                  </td>
                  <td className={`py-3.5 px-4 font-mono text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                    {rec.picTechnician}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => {
                        if (confirm(`Hapus catatan uji air ${rec.id}?`)) {
                          onDeleteWaterRecord(rec.id);
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
