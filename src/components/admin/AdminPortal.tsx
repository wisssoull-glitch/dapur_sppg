/**
 * ============================================================================
 * ADMIN PORTAL CONTAINER - DAPUR MBG
 * ============================================================================
 * Penanda: Modul ruang kerja terpisah khusus Administrasi & Logistik Dapur MBG.
 * Mengelola 5 sub-menu: Kebersihan Peralatan, Gudang, FIFO/FEFO, Stok Opname, dan Kondisi Air.
 * Mendukung Tema Terang dan Gelap.
 * ============================================================================
 */

import React from 'react';
import { 
  AdminTab, 
  EquipmentHygieneRecord, 
  WarehouseItem, 
  FifoFefoRecord, 
  StockOpnameRecord, 
  WaterQualityRecord,
  ThemeMode 
} from '../../types';
import { KebersihanPeralatanView } from './KebersihanPeralatanView';
import { GudangView } from './GudangView';
import { FifoFefoView } from './FifoFefoView';
import { StokOpnameView } from './StokOpnameView';
import { KondisiAirView } from './KondisiAirView';
import { 
  ShieldCheck, 
  Package, 
  Clock, 
  ClipboardCheck, 
  Droplets, 
  ArrowLeft 
} from 'lucide-react';

interface AdminPortalProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  onBackToDashboard: () => void;
  hygieneRecords: EquipmentHygieneRecord[];
  setHygieneRecords: React.Dispatch<React.SetStateAction<EquipmentHygieneRecord[]>>;
  warehouseItems: WarehouseItem[];
  setWarehouseItems: React.Dispatch<React.SetStateAction<WarehouseItem[]>>;
  fifoRecords: FifoFefoRecord[];
  setFifoRecords: React.Dispatch<React.SetStateAction<FifoFefoRecord[]>>;
  stockOpnames: StockOpnameRecord[];
  setStockOpnames: React.Dispatch<React.SetStateAction<StockOpnameRecord[]>>;
  waterRecords: WaterQualityRecord[];
  setWaterRecords: React.Dispatch<React.SetStateAction<WaterQualityRecord[]>>;
  theme: ThemeMode;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  activeTab,
  setActiveTab,
  onBackToDashboard,
  hygieneRecords,
  setHygieneRecords,
  warehouseItems,
  setWarehouseItems,
  fifoRecords,
  setFifoRecords,
  stockOpnames,
  setStockOpnames,
  waterRecords,
  setWaterRecords,
  theme,
}) => {
  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen transition-colors ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-neutral-950 text-white'
    }`}>
      
      {/* Top Banner Bar: Identitas Otoritas Admin Dapur */}
      <div className={`py-6 px-4 sm:px-6 lg:px-8 border-b transition-colors ${
        isLight 
          ? 'bg-gradient-to-r from-blue-50 via-white to-cyan-50 border-blue-200 text-slate-900 shadow-sm' 
          : 'bg-gradient-to-r from-blue-950/80 via-neutral-900 to-neutral-950 border-blue-900/50 text-white'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-blue-500 bg-neutral-800 shrink-0 shadow-lg">
              <img
                src="/src/assets/images/avatar_admin_dapur_1791073465864.jpg"
                alt="Bambang Prasetyo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${
                  isLight 
                    ? 'text-blue-800 bg-blue-100 border-blue-300' 
                    : 'text-blue-400 bg-blue-950 border-blue-800'
                }`}>
                  RUANG KERJA ADMINISTRASI DAPUR
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                  Sesi Aktif
                </span>
              </div>
              <h1 className={`text-xl sm:text-2xl font-bold mt-0.5 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                Sarirasa Rasasariroti, S.E, MM-Log
              </h1>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                Koordinator Operasional Pergudangan & Sanitasi · NIP: ADM-MBG/2026/044
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
          <div className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2">
            
            <button
              onClick={() => setActiveTab('kebersihan')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'kebersihan'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-950/20'
                  : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Kebersihan Peralatan</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === 'kebersihan' ? 'bg-blue-800 text-white' : isLight ? 'bg-slate-200 text-slate-700' : 'bg-blue-900/80 text-blue-200'
              }`}>
                {hygieneRecords.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('gudang')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'gudang'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-950/20'
                  : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Gudang Bahan Baku</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === 'gudang' ? 'bg-blue-800 text-white' : isLight ? 'bg-slate-200 text-slate-700' : 'bg-blue-900/80 text-blue-200'
              }`}>
                {warehouseItems.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('fifo-fefo')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'fifo-fefo'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-950/20'
                  : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>FIFO / FEFO</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === 'fifo-fefo' ? 'bg-blue-800 text-white' : isLight ? 'bg-slate-200 text-slate-700' : 'bg-blue-900/80 text-blue-200'
              }`}>
                {fifoRecords.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('stok-opname')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'stok-opname'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-950/20'
                  : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Stok Opname</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === 'stok-opname' ? 'bg-blue-800 text-white' : isLight ? 'bg-slate-200 text-slate-700' : 'bg-blue-900/80 text-blue-200'
              }`}>
                {stockOpnames.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('kondisi-air')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'kondisi-air'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-950/20'
                  : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Droplets className="w-4 h-4" />
              <span>Sumber & Kondisi Air</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === 'kondisi-air' ? 'bg-blue-800 text-white' : isLight ? 'bg-slate-200 text-slate-700' : 'bg-blue-900/80 text-blue-200'
              }`}>
                {waterRecords.length}
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'kebersihan' && (
          <KebersihanPeralatanView
            hygieneRecords={hygieneRecords}
            onAddRecord={(newR) => setHygieneRecords([newR, ...hygieneRecords])}
            onDeleteRecord={(id) => setHygieneRecords(hygieneRecords.filter(r => r.id !== id))}
            theme={theme}
          />
        )}

        {activeTab === 'gudang' && (
          <GudangView
            warehouseItems={warehouseItems}
            onAddItem={(newI) => setWarehouseItems([newI, ...warehouseItems])}
            onUpdateStock={(id, newStock) =>
              setWarehouseItems(warehouseItems.map(i => i.id === id ? { ...i, currentStock: newStock } : i))
            }
            onDeleteItem={(id) => setWarehouseItems(warehouseItems.filter(i => i.id !== id))}
            theme={theme}
          />
        )}

        {activeTab === 'fifo-fefo' && (
          <FifoFefoView
            fifoRecords={fifoRecords}
            onAddBatch={(newB) => setFifoRecords([newB, ...fifoRecords])}
            onUpdateStatus={(id, status) =>
              setFifoRecords(fifoRecords.map(b => b.id === id ? { ...b, currentStatus: status } : b))
            }
            onDeleteBatch={(id) => setFifoRecords(fifoRecords.filter(b => b.id !== id))}
            theme={theme}
          />
        )}

        {activeTab === 'stok-opname' && (
          <StokOpnameView
            stockOpnames={stockOpnames}
            onAddOpname={(newO) => setStockOpnames([newO, ...stockOpnames])}
            onDeleteOpname={(id) => setStockOpnames(stockOpnames.filter(o => o.id !== id))}
            theme={theme}
          />
        )}

        {activeTab === 'kondisi-air' && (
          <KondisiAirView
            waterRecords={waterRecords}
            onAddWaterRecord={(newW) => setWaterRecords([newW, ...waterRecords])}
            onDeleteWaterRecord={(id) => setWaterRecords(waterRecords.filter(w => w.id !== id))}
            theme={theme}
          />
        )}
      </main>

    </div>
  );
};
