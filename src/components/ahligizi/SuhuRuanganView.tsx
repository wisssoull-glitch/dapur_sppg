/**
 * ============================================================================
 * SUHU RUANGAN VIEW - MODUL AHLI GIZI DAPUR MBG
 * ============================================================================
 * Penanda: Pemantauan temperatur cold-chain, chiller, deep freezer, dan
 * holding area penyimpanan hangat makanan siap saji sesuai standar HACCP.
 * Mendukung tema terang (Light) dan tema gelap (Dark).
 * ============================================================================
 */

import React, { useState } from 'react';
import { RoomTempRecord, ThemeMode } from '../../types';
import { 
  ThermometerSnowflake, 
  PlusCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  Clock, 
  Trash2, 
  Sparkles 
} from 'lucide-react';

interface SuhuRuanganViewProps {
  roomTemps: RoomTempRecord[];
  onAddTempRecord: (record: RoomTempRecord) => void;
  onDeleteTempRecord: (id: string) => void;
  theme?: ThemeMode;
}

export const SuhuRuanganView: React.FC<SuhuRuanganViewProps> = ({
  roomTemps,
  onAddTempRecord,
  onDeleteTempRecord,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  const [showForm, setShowForm] = useState(false);
  const [roomZone, setRoomZone] = useState<RoomTempRecord['roomZone']>('Chiller Bahan Segar');
  const [tempCelsius, setTempCelsius] = useState(2.8);
  const [humidityPercent, setHumidityPercent] = useState(82);
  const [probeDeviceId, setProbeDeviceId] = useState('PROBE-CHL-01');
  const [actionTaken, setActionTaken] = useState('');
  const [picName, setPicName] = useState('dr. Sarah Anindita, S.Gz');

  // Change defaults when zone changes
  const handleZoneChange = (zone: RoomTempRecord['roomZone']) => {
    setRoomZone(zone);
    if (zone === 'Chiller Bahan Segar') {
      setTempCelsius(2.5);
      setHumidityPercent(82);
      setProbeDeviceId('PROBE-CHL-01');
    } else if (zone === 'Freezer Daging/Ikan') {
      setTempCelsius(-19.5);
      setHumidityPercent(60);
      setProbeDeviceId('PROBE-FRZ-01');
    } else if (zone === 'Food Warmer Holding Area') {
      setTempCelsius(64.5);
      setHumidityPercent(45);
      setProbeDeviceId('PROBE-WRM-02');
    } else {
      setTempCelsius(22.0);
      setHumidityPercent(55);
      setProbeDeviceId('PROBE-AMB-03');
    }
  };

  const calculateStatus = (zone: RoomTempRecord['roomZone'], temp: number): 'Normal' | 'Peringatan' | 'Kritis' => {
    if (zone === 'Chiller Bahan Segar') {
      if (temp >= 0 && temp <= 4) return 'Normal';
      if (temp > 4 && temp <= 7) return 'Peringatan';
      return 'Kritis';
    }
    if (zone === 'Freezer Daging/Ikan') {
      if (temp <= -18) return 'Normal';
      if (temp > -18 && temp <= -12) return 'Peringatan';
      return 'Kritis';
    }
    if (zone === 'Food Warmer Holding Area') {
      if (temp >= 60) return 'Normal';
      if (temp >= 55 && temp < 60) return 'Peringatan';
      return 'Kritis';
    }
    // Ambien / Preparasi (20 - 24 C)
    if (temp >= 18 && temp <= 24) return 'Normal';
    if (temp > 24 && temp <= 27) return 'Peringatan';
    return 'Kritis';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const status = calculateStatus(roomZone, Number(tempCelsius));

    const newRecord: RoomTempRecord = {
      id: `TMP-${Date.now().toString().slice(-4)}`,
      timestamp: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      roomZone,
      tempCelsius: Number(tempCelsius),
      humidityPercent: Number(humidityPercent),
      probeDeviceId,
      status,
      picName,
      actionTaken: actionTaken || (status === 'Normal' ? 'Pintu tertutup rapat, sirkulasi optimal.' : 'Periksa termostat pendingin.')
    };

    onAddTempRecord(newRecord);
    setShowForm(false);
    setActionTaken('');
  };

  // Status Cards latest per zone
  const zones: RoomTempRecord['roomZone'][] = [
    'Chiller Bahan Segar',
    'Freezer Daging/Ikan',
    'Ruang Persiapan Pengolahan',
    'Food Warmer Holding Area',
    'Gudang Kering (Dry Storage)'
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5 ${
        isLight ? 'border-slate-200' : 'border-neutral-800'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <ThermometerSnowflake className="w-4 h-4" />
            <span>Pengawasan Rantai Dingin & Titik Kendali CCP</span>
          </div>
          <h2 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Monitoring Suhu Ruangan & Cold-Chain
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
            Audit temperatur real-time pada chiller sayur/daging, freezer, ruang preparasi ber-AC, dan food warmer holding box.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showForm ? 'Tutup Formulir' : '+ Catat Log Suhu'}</span>
        </button>
      </div>

      {/* Live Zone Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {zones.map((z) => {
          const latest = roomTemps.find(r => r.roomZone === z) || roomTemps[0];
          const isWarmer = z === 'Food Warmer Holding Area';
          const isFreezer = z === 'Freezer Daging/Ikan';
          const isChiller = z === 'Chiller Bahan Segar';

          return (
            <div key={z} className={`rounded-2xl p-4 flex flex-col justify-between border shadow-sm ${
              isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${
                    isLight ? 'text-slate-500' : 'text-neutral-400'
                  }`}>
                    {latest.probeDeviceId}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                    <Radio className="w-3 h-3 animate-pulse" />
                    <span>Live</span>
                  </div>
                </div>

                <div className={`font-bold text-xs line-clamp-1 mb-2 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {z}
                </div>

                <div className="flex items-baseline gap-1 my-1">
                  <span className={`text-3xl font-display font-extrabold font-mono tabular-nums ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {latest.tempCelsius > 0 && !isFreezer ? `+${latest.tempCelsius}` : latest.tempCelsius}
                  </span>
                  <span className={`text-sm font-semibold ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>°C</span>
                </div>

                <div className={`text-[11px] font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                  RH: {latest.humidityPercent}%
                </div>
              </div>

              <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[11px] ${
                isLight ? 'border-slate-100' : 'border-neutral-800'
              }`}>
                <span className={isLight ? 'text-slate-400' : 'text-neutral-500'}>Standar:</span>
                <span className={`font-mono font-semibold ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                  {isFreezer ? '≤ -18°C' : isChiller ? '0° - 4°C' : isWarmer ? '≥ 60°C' : '20° - 24°C'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Formulir Input Suhu Ruang Baru */}
      {showForm && (
        <form onSubmit={handleSubmit} className={`border rounded-2xl p-6 space-y-5 shadow-sm ${
          isLight 
            ? 'bg-white border-emerald-300 shadow-emerald-900/5' 
            : 'bg-neutral-900 border-emerald-500/30'
        }`}>
          <div className={`text-sm font-bold flex items-center gap-2 border-b pb-3 ${
            isLight ? 'text-slate-900 border-slate-200' : 'text-white border-neutral-800'
          }`}>
            <ThermometerSnowflake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Formulir Pencatatan Kalibrasi Suhu Termal</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Zona Ruangan / Area *
              </label>
              <select
                value={roomZone}
                onChange={(e) => handleZoneChange(e.target.value as any)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-emerald-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-emerald-500'
                }`}
              >
                <option value="Chiller Bahan Segar">Chiller Bahan Segar (0°C - 4°C)</option>
                <option value="Freezer Daging/Ikan">Freezer Daging/Ikan (≤ -18°C)</option>
                <option value="Ruang Persiapan Pengolahan">Ruang Persiapan Pengolahan (20°C - 24°C)</option>
                <option value="Gudang Kering (Dry Storage)">Gudang Kering (Dry Storage)</option>
                <option value="Food Warmer Holding Area">Food Warmer Holding Area (≥ 60°C)</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Suhu Terukur (°C) *
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={tempCelsius}
                onChange={(e) => setTempCelsius(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-sm font-mono font-bold focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-emerald-700 focus:bg-white focus:border-emerald-600' 
                    : 'bg-neutral-950 border-neutral-700 text-emerald-400 focus:border-emerald-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Kelembapan Udara (% RH)
              </label>
              <input
                type="number"
                value={humidityPercent}
                onChange={(e) => setHumidityPercent(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-sm font-mono focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-emerald-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-emerald-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                ID Sensor Probe
              </label>
              <input
                type="text"
                value={probeDeviceId}
                onChange={(e) => setProbeDeviceId(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:bg-white focus:border-emerald-600' 
                    : 'bg-neutral-950 border-neutral-700 text-neutral-300 focus:border-emerald-500'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
              Tindakan Korektif / Catatan Kondisi Pintu
            </label>
            <input
              type="text"
              value={actionTaken}
              onChange={(e) => setActionTaken(e.target.value)}
              placeholder="Contoh: Blower chiller berjalan normal, gasket pintu tertutup rapat..."
              className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                isLight 
                  ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600' 
                  : 'bg-neutral-950 border-neutral-700 text-white placeholder-neutral-500 focus:border-emerald-500'
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
              className="px-5 py-2.5 rounded-lg text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-sm cursor-pointer"
            >
              Simpan Log Temperatur
            </button>
          </div>
        </form>
      )}

      {/* Tabel Log Suhu */}
      <div className={`rounded-2xl border overflow-hidden shadow-sm ${
        isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
      }`}>
        <div className={`p-4 border-b flex items-center justify-between ${
          isLight ? 'border-slate-200 bg-slate-50/50' : 'border-neutral-800 bg-neutral-900'
        }`}>
          <div className={`font-bold text-sm flex items-center gap-2 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            <span>Log Pemeriksaan Suhu Terintegrasi</span>
            <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
              ({roomTemps.length} Data)
            </span>
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
                <th className="py-3 px-4">Waktu Pengecekan</th>
                <th className="py-3 px-4">Area / Zona Ruang</th>
                <th className="py-3 px-4 text-right">Suhu (°C)</th>
                <th className="py-3 px-4 text-right">Kelembapan</th>
                <th className="py-3 px-4 text-center">Status CCP</th>
                <th className="py-3 px-4">Tindakan / Kondisi</th>
                <th className="py-3 px-4">Petugas PIC</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isLight ? 'divide-slate-200 text-slate-700' : 'divide-neutral-800/80 text-neutral-300'
            }`}>
              {roomTemps.map((log) => (
                <tr key={log.id} className={`transition-colors ${
                  isLight ? 'hover:bg-slate-50' : 'hover:bg-neutral-850/50'
                }`}>
                  <td className={`py-3.5 px-4 font-mono text-[11px] ${
                    isLight ? 'text-slate-600' : 'text-neutral-300'
                  }`}>
                    {log.timestamp}
                  </td>
                  <td className={`py-3.5 px-4 font-medium ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {log.roomZone}
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono font-bold text-sm tabular-nums ${
                    isLight ? 'text-emerald-700' : 'text-emerald-400'
                  }`}>
                    {log.tempCelsius > 0 && !log.roomZone.includes('Freezer') ? `+${log.tempCelsius}` : log.tempCelsius}°C
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono tabular-nums ${
                    isLight ? 'text-slate-600' : 'text-neutral-300'
                  }`}>
                    {log.humidityPercent}% RH
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                      log.status === 'Normal' 
                        ? isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : log.status === 'Peringatan'
                        ? isLight ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-amber-950 text-amber-400 border border-amber-800'
                        : isLight ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className={`py-3.5 px-4 max-w-xs truncate ${isLight ? 'text-slate-600' : 'text-neutral-400'}`} title={log.actionTaken}>
                    {log.actionTaken}
                  </td>
                  <td className={`py-3.5 px-4 font-mono text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                    {log.picName}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => {
                        if (confirm(`Hapus catatan suhu ${log.id}?`)) {
                          onDeleteTempRecord(log.id);
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
