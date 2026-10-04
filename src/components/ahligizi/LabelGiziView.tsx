/**
 * ============================================================================
 * LABEL GIZI VIEW - MODUL AHLI GIZI DAPUR MBG
 * ============================================================================
 * Penanda: Pembuatan, perhitungan AKG, dan pencetakan Label Informasi Nilai Gizi
 * terstandarisasi BGN & BPOM untuk paket makanan siswa sekolah.
 * Mendukung tampilan bersih & elegan pada Tema Terang dan Gelap.
 * ============================================================================
 */

import React, { useState } from 'react';
import { 
  NutritionLabelItem, 
  ThemeMode 
} from '../../types';
import { 
  HeartPulse, 
  PlusCircle, 
  FileText, 
  Printer, 
  QrCode, 
  CheckCircle2, 
  Trash2, 
  Info, 
  Sparkles 
} from 'lucide-react';

interface LabelGiziViewProps {
  nutritionLabels: NutritionLabelItem[];
  onAddLabel: (label: NutritionLabelItem) => void;
  onDeleteLabel: (id: string) => void;
  theme?: ThemeMode;
}

export const LabelGiziView: React.FC<LabelGiziViewProps> = ({
  nutritionLabels,
  onAddLabel,
  onDeleteLabel,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  // Form State
  const [menuName, setMenuName] = useState('');
  const [targetAgeGroup, setTargetAgeGroup] = useState<'SD Kelas 1-3' | 'SD Kelas 4-6' | 'SMP/SMA'>('SD Kelas 4-6');
  const [portionWeightGrams, setPortionWeightGrams] = useState(420);
  const [caloriesKcal, setCaloriesKcal] = useState(620);
  const [proteinGrams, setProteinGrams] = useState(28);
  const [carbsGrams, setCarbsGrams] = useState(82);
  const [fatGrams, setFatGrams] = useState(16);
  const [fiberGrams, setFiberGrams] = useState(6.5);
  const [sodiumMg, setSodiumMg] = useState(410);
  const [calciumMg, setCalciumMg] = useState(300);
  const [vitAIU, setVitAIU] = useState(1200);
  const [vitCMg, setVitCMg] = useState(35);
  const [ingredients, setIngredients] = useState('');
  const [allergenNotice, setAllergenNotice] = useState('Kedelai. Bebas kacang & MSG.');
  const [nutritionistPIC, setNutritionistPIC] = useState('dr. Sarah Anindita, S.Gz');

  const [activePreview, setActivePreview] = useState<NutritionLabelItem>(nutritionLabels[0] || {
    id: 'NL-001',
    menuName: 'Nasi Kuning + Ayam Bumbu Rujak + Tumis Buncis Jagung + Semangka',
    targetAgeGroup: 'SD Kelas 4-6',
    portionWeightGrams: 420,
    caloriesKcal: 620,
    proteinGrams: 28.5,
    carbsGrams: 84.0,
    fatGrams: 15.5,
    fiberGrams: 6.8,
    sodiumMg: 410,
    calciumMg: 310,
    vitAIU: 1250,
    vitCMg: 38,
    ingredients: 'Beras kuning lokal, ayam pejantan segar, wortel, buncis, jagung manis, semangka',
    allergenNotice: 'Kedelai (kecap). Bebas kacang tanah & MSG.',
    datePrepared: new Date().toISOString().split('T')[0],
    nutritionistPIC: 'dr. Sarah Anindita, S.Gz',
    barcodeCode: 'MBG-LBL-88201'
  });
  const [showForm, setShowForm] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);

  // Auto preset based on age group
  const handleAgeGroupChange = (group: 'SD Kelas 1-3' | 'SD Kelas 4-6' | 'SMP/SMA') => {
    setTargetAgeGroup(group);
    if (group === 'SD Kelas 1-3') {
      setPortionWeightGrams(350);
      setCaloriesKcal(510);
      setProteinGrams(22);
      setCarbsGrams(72);
      setFatGrams(12.5);
    } else if (group === 'SD Kelas 4-6') {
      setPortionWeightGrams(420);
      setCaloriesKcal(620);
      setProteinGrams(28);
      setCarbsGrams(84);
      setFatGrams(16);
    } else {
      setPortionWeightGrams(490);
      setCaloriesKcal(740);
      setProteinGrams(34);
      setCarbsGrams(98);
      setFatGrams(21);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuName) return;

    const newLabel: NutritionLabelItem = {
      id: `NL-${Date.now().toString().slice(-4)}`,
      menuName,
      targetAgeGroup,
      portionWeightGrams: Number(portionWeightGrams),
      caloriesKcal: Number(caloriesKcal),
      proteinGrams: Number(proteinGrams),
      carbsGrams: Number(carbsGrams),
      fatGrams: Number(fatGrams),
      fiberGrams: Number(fiberGrams),
      sodiumMg: Number(sodiumMg),
      calciumMg: Number(calciumMg),
      vitAIU: Number(vitAIU),
      vitCMg: Number(vitCMg),
      ingredients: ingredients || 'Bahan baku lokal terpilih berstandar SPPG',
      allergenNotice: allergenNotice || 'Tidak ada alergen mayor terdeteksi',
      datePrepared: new Date().toISOString().split('T')[0],
      nutritionistPIC,
      barcodeCode: `MBG-LBL-${Math.floor(100000 + Math.random() * 900000)}`
    };

    onAddLabel(newLabel);
    setActivePreview(newLabel);
    setShowForm(false);
    setMenuName('');
    setIngredients('');
  };

  const handlePrintSimulation = () => {
    setPrintSuccess(true);
    setTimeout(() => setPrintSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5 ${
        isLight ? 'border-slate-200' : 'border-neutral-800'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <HeartPulse className="w-4 h-4" />
            <span>Kalkulator & Generator Label Gizi</span>
          </div>
          <h2 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Formulasi Label Gizi Standar BGN
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
            Hitung rincian makronutrien, mikronutrien, serta cetak stiker Informasi Nilai Gizi resmi untuk wadah bento.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showForm ? 'Tutup Formulir' : '+ Buat Label Baru'}</span>
        </button>
      </div>

      {/* Formulir Input Label Gizi Baru */}
      {showForm && (
        <form onSubmit={handleSubmit} className={`border rounded-2xl p-6 space-y-6 shadow-sm ${
          isLight 
            ? 'bg-white border-emerald-300 shadow-emerald-900/5' 
            : 'bg-neutral-900 border-emerald-500/30'
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${
            isLight ? 'border-slate-200' : 'border-neutral-800'
          }`}>
            <div className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Input Data Formulasi Paket Makanan Baru</span>
            </div>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border font-semibold ${
              isLight 
                ? 'text-emerald-800 bg-emerald-100 border-emerald-300' 
                : 'text-emerald-400 bg-emerald-950 border-emerald-800'
            }`}>
              STANDAR AKG PERMENKES 2019
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Nama Lengkap Paket Menu *
              </label>
              <input
                type="text"
                required
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                placeholder="Contoh: Nasi Putih + Rolade Ayam Sayur + Sup Wortel Jamur + Pisang Cavendish"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white placeholder-neutral-500 focus:border-emerald-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Kelompok Usia Sasaran *
              </label>
              <select
                value={targetAgeGroup}
                onChange={(e) => handleAgeGroupChange(e.target.value as any)}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-emerald-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-emerald-500'
                }`}
              >
                <option value="SD Kelas 1-3">SD Kelas 1-3 (7-9 Tahun)</option>
                <option value="SD Kelas 4-6">SD Kelas 4-6 (10-12 Tahun)</option>
                <option value="SMP/SMA">SMP / SMA (13-18 Tahun)</option>
              </select>
            </div>
          </div>

          {/* Grid Angka Makronutrien & Mikronutrien */}
          <div className={`p-4 rounded-xl border space-y-4 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950/70 border-neutral-800'
          }`}>
            <div className={`text-xs font-semibold uppercase tracking-wider ${
              isLight ? 'text-slate-600' : 'text-neutral-400'
            }`}>
              Nilai Gizi Per Porsi Sajian:
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className={`block text-[11px] mb-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>Berat Porsi (gram)</label>
                <input
                  type="number"
                  value={portionWeightGrams}
                  onChange={(e) => setPortionWeightGrams(Number(e.target.value))}
                  className={`w-full px-3 py-1.5 rounded border text-sm font-mono ${
                    isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-neutral-900 border-neutral-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[11px] mb-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>Energi Total (kkal)</label>
                <input
                  type="number"
                  value={caloriesKcal}
                  onChange={(e) => setCaloriesKcal(Number(e.target.value))}
                  className={`w-full px-3 py-1.5 rounded border text-sm font-mono font-bold ${
                    isLight 
                      ? 'bg-white border-slate-300 text-emerald-700' 
                      : 'bg-neutral-900 border-neutral-700 text-emerald-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[11px] mb-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>Protein (gram)</label>
                <input
                  type="number"
                  step="0.1"
                  value={proteinGrams}
                  onChange={(e) => setProteinGrams(Number(e.target.value))}
                  className={`w-full px-3 py-1.5 rounded border text-sm font-mono ${
                    isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-neutral-900 border-neutral-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[11px] mb-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>Karbohidrat (gram)</label>
                <input
                  type="number"
                  step="0.1"
                  value={carbsGrams}
                  onChange={(e) => setCarbsGrams(Number(e.target.value))}
                  className={`w-full px-3 py-1.5 rounded border text-sm font-mono ${
                    isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-neutral-900 border-neutral-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[11px] mb-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>Lemak Total (gram)</label>
                <input
                  type="number"
                  step="0.1"
                  value={fatGrams}
                  onChange={(e) => setFatGrams(Number(e.target.value))}
                  className={`w-full px-3 py-1.5 rounded border text-sm font-mono ${
                    isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-neutral-900 border-neutral-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[11px] mb-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>Serat Pangan (gram)</label>
                <input
                  type="number"
                  step="0.1"
                  value={fiberGrams}
                  onChange={(e) => setFiberGrams(Number(e.target.value))}
                  className={`w-full px-3 py-1.5 rounded border text-sm font-mono ${
                    isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-neutral-900 border-neutral-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[11px] mb-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>Natrium (mg)</label>
                <input
                  type="number"
                  value={sodiumMg}
                  onChange={(e) => setSodiumMg(Number(e.target.value))}
                  className={`w-full px-3 py-1.5 rounded border text-sm font-mono ${
                    isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-neutral-900 border-neutral-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[11px] mb-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>Kalsium (mg)</label>
                <input
                  type="number"
                  value={calciumMg}
                  onChange={(e) => setCalciumMg(Number(e.target.value))}
                  className={`w-full px-3 py-1.5 rounded border text-sm font-mono ${
                    isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-neutral-900 border-neutral-700 text-white'
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Daftar Bahan Baku Pangan
              </label>
              <textarea
                rows={2}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Beras premium, fillet ayam, wortel, buncis, bawang putih..."
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white placeholder-neutral-500 focus:border-emerald-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Catatan Alergen / Bebas Allergen
              </label>
              <textarea
                rows={2}
                value={allergenNotice}
                onChange={(e) => setAllergenNotice(e.target.value)}
                placeholder="Contoh: Mengandung kedelai. Bebas kacang & telur..."
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
              Simpan & Cetak Label
            </button>
          </div>
        </form>
      )}

      {/* Grid: Preview Label Resmi Standar BGN (Kiri) vs Daftar Menu Tersimpan (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Kolom Kiri: Visual Realistis Label Kemasan (BGN Nutrition Facts) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isLight ? 'text-slate-700' : 'text-neutral-300'
            }`}>
              Preview Fisik Stiker Wadah (Bento Label)
            </span>
            <button
              onClick={handlePrintSimulation}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                isLight ? 'text-emerald-700 hover:text-emerald-800' : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Simulasi Cetak Stiker</span>
            </button>
          </div>

          {printSuccess && (
            <div className={`p-3 border rounded-lg text-xs flex items-center gap-2 ${
              isLight 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                : 'bg-emerald-950 text-emerald-300 border-emerald-800'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Perintah cetak 3.500 stiker barcode dikirim ke thermal printer!</span>
            </div>
          )}

          {/* Stiker Fisik Berlatar Putih Bersih (Standar Informasi Nilai Gizi BPOM) */}
          <div className="bg-white text-neutral-950 rounded-xl p-5 shadow-xl border-4 border-neutral-950 font-sans max-w-sm mx-auto">
            {/* Header Instansi */}
            <div className="text-center border-b-2 border-black pb-2 mb-2">
              <div className="text-[10px] font-extrabold tracking-widest uppercase">
                BADAN GIZI NASIONAL RI
              </div>
              <div className="text-sm font-black tracking-tight uppercase">
                INFORMASI NILAI GIZI
              </div>
              <div className="text-[9px] text-neutral-600 font-medium">
                Unit Pelayanan Pemenuhan Gizi (SPPG Nusantara 01)
              </div>
            </div>

            {/* Menu Name & Portion */}
            <div className="border-b border-neutral-300 pb-2 mb-2 text-xs">
              <div className="font-extrabold text-[12px] leading-snug line-clamp-2">
                {activePreview.menuName}
              </div>
              <div className="flex justify-between text-[10px] text-neutral-600 mt-1 font-mono">
                <span>Sasaran: {activePreview.targetAgeGroup}</span>
                <span>Takaran: {activePreview.portionWeightGrams} gram</span>
              </div>
            </div>

            {/* Calories Big Banner */}
            <div className="bg-black text-white px-3 py-1.5 flex justify-between items-center mb-2 rounded-sm">
              <span className="text-xs font-bold uppercase">JUMLAH ENERGI TOTAL</span>
              <span className="text-base font-black font-mono tabular-nums">
                {activePreview.caloriesKcal} kkal
              </span>
            </div>

            {/* Nutrition Breakdown Rows */}
            <div className="text-[11px] divide-y divide-neutral-200 border-t border-b border-black">
              <div className="flex justify-between py-1 font-bold">
                <span>Lemak Total</span>
                <span className="font-mono tabular-nums">{activePreview.fatGrams} g</span>
              </div>
              <div className="flex justify-between py-1 font-bold">
                <span>Protein</span>
                <span className="font-mono tabular-nums text-emerald-800 font-extrabold">
                  {activePreview.proteinGrams} g
                </span>
              </div>
              <div className="flex justify-between py-1 font-bold">
                <span>Karbohidrat Total</span>
                <span className="font-mono tabular-nums">{activePreview.carbsGrams} g</span>
              </div>
              <div className="flex justify-between py-0.5 pl-3 text-[10px] text-neutral-700">
                <span>Serat Pangan</span>
                <span className="font-mono tabular-nums">{activePreview.fiberGrams} g</span>
              </div>
              <div className="flex justify-between py-1 font-bold">
                <span>Natrium (Garam)</span>
                <span className="font-mono tabular-nums">{activePreview.sodiumMg} mg</span>
              </div>
              <div className="flex justify-between py-1 font-bold">
                <span>Kalsium</span>
                <span className="font-mono tabular-nums">{activePreview.calciumMg} mg</span>
              </div>
            </div>

            {/* Allergen & Ingredients */}
            <div className="pt-2 text-[9px] text-neutral-700 space-y-1">
              <div>
                <span className="font-bold">Komposisi: </span>
                <span className="line-clamp-2">{activePreview.ingredients}</span>
              </div>
              <div className="bg-amber-50 text-amber-900 p-1 rounded font-semibold border border-amber-200">
                Peringatan Alergen: {activePreview.allergenNotice}
              </div>
            </div>

            {/* Barcode & QA Sign */}
            <div className="pt-3 border-t border-black mt-2 flex items-center justify-between text-[8px] font-mono text-neutral-600">
              <div className="space-y-0.5">
                <div className="font-bold text-neutral-900">QC: {activePreview.nutritionistPIC}</div>
                <div>Tgl Produksi: {activePreview.datePrepared}</div>
                <div className="text-[10px] font-black text-black">{activePreview.barcodeCode}</div>
              </div>
              <QrCode className="w-9 h-9 text-black" />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Daftar Arsip Label Gizi & Tabel Pembanding */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isLight ? 'text-slate-700' : 'text-neutral-300'
            }`}>
              Arsip Formulasi Menu Terdaftar ({nutritionLabels.length})
            </span>
          </div>

          <div className="space-y-3">
            {nutritionLabels.map((lbl) => (
              <div
                key={lbl.id}
                onClick={() => setActivePreview(lbl)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activePreview.id === lbl.id
                    ? isLight 
                      ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20' 
                      : 'bg-neutral-900 border-emerald-500 shadow-md shadow-emerald-950/40'
                    : isLight 
                      ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm' 
                      : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                        isLight 
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}>
                        {lbl.targetAgeGroup}
                      </span>
                      <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                        {lbl.datePrepared}
                      </span>
                    </div>
                    <h4 className={`text-sm font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {lbl.menuName}
                    </h4>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Hapus label formulasi "${lbl.menuName}"?`)) {
                        onDeleteLabel(lbl.id);
                      }
                    }}
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      isLight ? 'text-slate-400 hover:text-rose-600 hover:bg-slate-100' : 'text-neutral-500 hover:text-rose-400 hover:bg-neutral-800'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Macro Chips */}
                <div className={`grid grid-cols-4 gap-2 pt-2 border-t text-xs ${
                  isLight ? 'border-slate-100' : 'border-neutral-800/80'
                }`}>
                  <div>
                    <span className={`text-[10px] block ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>Kalori</span>
                    <span className={`font-bold font-mono tabular-nums ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                      {lbl.caloriesKcal} kkal
                    </span>
                  </div>
                  <div>
                    <span className={`text-[10px] block ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>Protein</span>
                    <span className={`font-bold font-mono tabular-nums ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {lbl.proteinGrams}g
                    </span>
                  </div>
                  <div>
                    <span className={`text-[10px] block ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>Karbo</span>
                    <span className={`font-bold font-mono tabular-nums ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {lbl.carbsGrams}g
                    </span>
                  </div>
                  <div>
                    <span className={`text-[10px] block ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>Lemak</span>
                    <span className={`font-bold font-mono tabular-nums ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {lbl.fatGrams}g
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pedoman AKG Ringkas */}
          <div className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
            isLight 
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
              : 'bg-neutral-900/40 border-neutral-800 text-neutral-400'
          }`}>
            <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Target energi Program MBG makan siang ditujukan memenuhi sepertiga (~30-35%) dari total kebutuhan AKG harian siswa sekolah dasar dan menengah.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
