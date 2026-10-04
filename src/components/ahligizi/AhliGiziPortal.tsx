/**
 * ============================================================================
 * AHLI GIZI PORTAL CONTAINER - DAPUR MBG
 * ============================================================================
 * Penanda: Modul ruang kerja terpisah khusus Ahli Gizi Dapur MBG.
 * Mengelola 3 sub-menu utama: Label Gizi, Monitoring Sampah, dan Suhu Ruangan.
 * Mendukung visualisasi sempurna di Tema Terang dan Gelap.
 * ============================================================================
 */

import React from 'react';
import { AhliGiziTab, AppView, NutritionLabelItem, FoodWasteRecord, RoomTempRecord, ThemeMode } from '../../types';
import { LabelGiziView } from './LabelGiziView';
import { SampahView } from './SampahView';
import { SuhuRuanganView } from './SuhuRuanganView';
import { HeartPulse, Recycle, ThermometerSnowflake, ArrowLeft } from 'lucide-react';

interface AhliGiziPortalProps {
  activeTab: AhliGiziTab;
  setActiveTab: (tab: AhliGiziTab) => void;
  onBackToDashboard: () => void;
  nutritionLabels: NutritionLabelItem[];
  setNutritionLabels: React.Dispatch<React.SetStateAction<NutritionLabelItem[]>>;
  foodWaste: FoodWasteRecord[];
  setFoodWaste: React.Dispatch<React.SetStateAction<FoodWasteRecord[]>>;
  roomTemps: RoomTempRecord[];
  setRoomTemps: React.Dispatch<React.SetStateAction<RoomTempRecord[]>>;
  theme: ThemeMode;
}

export const AhliGiziPortal: React.FC<AhliGiziPortalProps> = ({
  activeTab,
  setActiveTab,
  onBackToDashboard,
  nutritionLabels,
  setNutritionLabels,
  foodWaste,
  setFoodWaste,
  roomTemps,
  setRoomTemps,
  theme,
}) => {
  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen transition-colors ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-neutral-950 text-white'
    }`}>
      
      {/* Top Banner Bar: Identitas Otoritas Petugas Gizi */}
      <div className={`py-6 px-4 sm:px-6 lg:px-8 border-b transition-colors ${
        isLight 
          ? 'bg-gradient-to-r from-emerald-50 via-white to-teal-50 border-emerald-200 text-slate-900 shadow-sm' 
          : 'bg-gradient-to-r from-emerald-950/80 via-neutral-900 to-neutral-950 border-emerald-900/50 text-white'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-500 bg-neutral-800 shrink-0 shadow-lg">
              <img
                src="/src/assets/images/avatar_ahli_gizi_1791073453799.jpg"
                alt="dr. Sarah Anindita"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${
                  isLight 
                    ? 'text-emerald-800 bg-emerald-100 border-emerald-300' 
                    : 'text-emerald-400 bg-emerald-950 border-emerald-800'
                }`}>
                  RUANG KERJA AHLI GIZI
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                  Sesi Aktif
                </span>
              </div>
              <h1 className={`text-xl sm:text-2xl font-bold mt-0.5 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                dr. Sarah Anindita, S.Gz, M.Sc
              </h1>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                Koordinator Pengendali Mutu & Formulasi AKG · STRGZ: 3174.0882.2023.09
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToDashboard}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                isLight 
                  ? 'text-slate-700 bg-white hover:bg-slate-100 border-slate-300 shadow-sm' 
                  : 'text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border-neutral-700 hover:text-white'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Portofolio Dashboard</span>
            </button>
          </div>

        </div>
      </div>

      {/* Sub-menu Tabs Switcher */}
      <div className={`border-b sticky top-18 z-40 backdrop-blur-md transition-colors ${
        isLight ? 'bg-white/95 border-slate-200' : 'bg-neutral-900/90 border-neutral-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2">
            
            <button
              onClick={() => setActiveTab('label-gizi')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'label-gizi'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                  : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              <span>Label Gizi & AKG</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === 'label-gizi' ? 'bg-emerald-800 text-white' : isLight ? 'bg-slate-200 text-slate-700' : 'bg-emerald-900/80 text-emerald-200'
              }`}>
                {nutritionLabels.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('sampah')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'sampah'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                  : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Recycle className="w-4 h-4" />
              <span>Monitoring Sampah Makanan</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === 'sampah' ? 'bg-emerald-800 text-white' : isLight ? 'bg-slate-200 text-slate-700' : 'bg-emerald-900/80 text-emerald-200'
              }`}>
                {foodWaste.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('suhu-ruangan')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'suhu-ruangan'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20'
                  : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <ThermometerSnowflake className="w-4 h-4" />
              <span>Suhu Ruangan & Cold Storage</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === 'suhu-ruangan' ? 'bg-emerald-800 text-white' : isLight ? 'bg-slate-200 text-slate-700' : 'bg-emerald-900/80 text-emerald-200'
              }`}>
                {roomTemps.length}
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'label-gizi' && (
          <LabelGiziView
            nutritionLabels={nutritionLabels}
            onAddLabel={(newL) => setNutritionLabels([newL, ...nutritionLabels])}
            onDeleteLabel={(id) => setNutritionLabels(nutritionLabels.filter(l => l.id !== id))}
            theme={theme}
          />
        )}

        {activeTab === 'sampah' && (
          <SampahView
            wasteRecords={foodWaste}
            onAddRecord={(newR) => setFoodWaste([newR, ...foodWaste])}
            onDeleteRecord={(id) => setFoodWaste(foodWaste.filter(r => r.id !== id))}
            theme={theme}
          />
        )}

        {activeTab === 'suhu-ruangan' && (
          <SuhuRuanganView
            roomTemps={roomTemps}
            onAddTempRecord={(newT) => setRoomTemps([newT, ...roomTemps])}
            onDeleteTempRecord={(id) => setRoomTemps(roomTemps.filter(t => t.id !== id))}
            theme={theme}
          />
        )}
      </main>

    </div>
  );
};
