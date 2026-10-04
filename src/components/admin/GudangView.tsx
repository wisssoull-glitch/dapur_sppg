/**
 * ============================================================================
 * GUDANG VIEW - MODUL ADMIN DAPUR MBG
 * ============================================================================
 * Penanda: Tata kelola inventori gudang bahan pangan kering & basah,
 * stok masuk, batas minimum persediaan (re-order point), dan mutasi fisik.
 * Mendukung tema terang (Light) dan tema gelap (Dark).
 * ============================================================================
 */

import React, { useState } from 'react';
import { WarehouseItem, ThemeMode } from '../../types';
import { 
  Package, 
  PlusCircle, 
  Search, 
  AlertTriangle, 
  ArrowUpDown, 
  CheckCircle2, 
  Trash2, 
  Boxes 
} from 'lucide-react';

interface GudangViewProps {
  warehouseItems: WarehouseItem[];
  onAddItem: (item: WarehouseItem) => void;
  onUpdateStock: (id: string, newStock: number) => void;
  onDeleteItem: (id: string) => void;
  theme?: ThemeMode;
}

export const GudangView: React.FC<GudangViewProps> = ({
  warehouseItems,
  onAddItem,
  onUpdateStock,
  onDeleteItem,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Form State
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<WarehouseItem['category']>('Bahan Pokok');
  const [currentStock, setCurrentStock] = useState(100);
  const [unit, setUnit] = useState('kg');
  const [minStock, setMinStock] = useState(30);
  const [location, setLocation] = useState('Gudang Kering - Rak A01');
  const [supplier, setSupplier] = useState('Koperasi Petani Makmur Daerah');

  const lowStockCount = warehouseItems.filter(i => i.currentStock <= i.minStock).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newItem: WarehouseItem = {
      id: `WH-${Date.now().toString().slice(-4)}`,
      code: code || `BP-${Math.floor(100 + Math.random() * 900)}`,
      name,
      category,
      currentStock: Number(currentStock),
      unit,
      minStock: Number(minStock),
      location,
      supplier,
      lastRestocked: new Date().toISOString().split('T')[0]
    };

    onAddItem(newItem);
    setShowForm(false);
    setName('');
    setCode('');
  };

  const filteredItems = warehouseItems.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5 ${
        isLight ? 'border-slate-200' : 'border-neutral-800'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Package className="w-4 h-4" />
            <span>Manajemen Inventori & Pergudangan Bahan Pangan</span>
          </div>
          <h2 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Tata Kelola Bahan Masuk & Gudang Dapur
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
            Pusat pemantauan volume persediaan beras, protein unggas/daging, bumbu rempah, sayur segar, dan kemasan bento.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showForm ? 'Tutup Formulir' : '+ Tambah Bahan Baru'}</span>
        </button>
      </div>

      {/* Top Banner Alert (Low Stock) */}
      {lowStockCount > 0 && (
        <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 text-xs ${
          isLight 
            ? 'bg-amber-50 border-amber-200 text-amber-900 shadow-sm' 
            : 'bg-amber-950/50 border-amber-800/80 text-amber-200'
        }`}>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <span>
              <strong>Pemberitahuan Re-Order:</strong> Terdapat {lowStockCount} komoditas dengan stok di bawah batas ambang cadangan minimum. Harap hubungi koperasi pemasok.
            </span>
          </div>
          <span className={`font-mono uppercase text-[11px] font-bold shrink-0 ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
            RESTOCK REQUIRED
          </span>
        </div>
      )}

      {/* Formulir Input Bahan Baru */}
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
            <span>Formulir Pendaftaran Bahan Baku / Komoditas Baru</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Kode SKU / Bahan
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Contoh: BP-008"
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Nama Komoditas / Bahan Baku *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Telur Puyuh Segar Grade AA"
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
                Kategori Bahan *
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
                <option value="Bahan Pokok">Bahan Pokok</option>
                <option value="Protein Hewani">Protein Hewani</option>
                <option value="Sayuran & Buah">Sayuran & Buah</option>
                <option value="Bumbu & Minyak">Bumbu & Minyak</option>
                <option value="Wadah & Logistik">Wadah & Logistik</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Stok Awal Masuk *
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={currentStock}
                onChange={(e) => setCurrentStock(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono font-bold focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Satuan Ukur
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
                <option value="pcs">Pcs / Lembar</option>
                <option value="ikat">Ikat</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Batas Minimum Cadangan
              </label>
              <input
                type="number"
                value={minStock}
                onChange={(e) => setMinStock(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-amber-700 focus:bg-white focus:border-amber-600' 
                    : 'bg-neutral-950 border-neutral-700 text-amber-400 focus:border-blue-500'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Lokasi Penempatan (Rak / Cold Room)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Contoh: Chiller Sayur - Bin 03 atau Palet B"
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-blue-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-500'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Nama Pemasok / Kelompok Tani Mitra
              </label>
              <input
                type="text"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                placeholder="Contoh: Kelompok Tani Organik Puncak"
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
              Simpan ke Gudang
            </button>
          </div>
        </form>
      )}

      {/* Toolbar Pencarian & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-neutral-400'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kode, nama bahan, pemasok..."
            className={`w-full pl-9 pr-3.5 py-2 rounded-lg border text-xs focus:outline-none ${
              isLight 
                ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600' 
                : 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-blue-500'
            }`}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={`px-3 py-2 rounded-lg border text-xs w-full sm:w-auto focus:outline-none ${
              isLight 
                ? 'bg-white border-slate-300 text-slate-800' 
                : 'bg-neutral-900 border-neutral-800 text-neutral-300'
            }`}
          >
            <option value="all">Semua Kategori Bahan</option>
            <option value="Bahan Pokok">Bahan Pokok</option>
            <option value="Protein Hewani">Protein Hewani</option>
            <option value="Sayuran & Buah">Sayuran & Buah</option>
            <option value="Bumbu & Minyak">Bumbu & Minyak</option>
            <option value="Wadah & Logistik">Wadah & Logistik</option>
          </select>
        </div>
      </div>

      {/* Tabel Inventori Gudang */}
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
                <th className="py-3 px-4">SKU / Kode</th>
                <th className="py-3 px-4">Nama Komoditas</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4 text-right">Stok Saat Ini</th>
                <th className="py-3 px-4 text-right">Min. Stok</th>
                <th className="py-3 px-4">Lokasi Rak</th>
                <th className="py-3 px-4">Pemasok / Koperasi</th>
                <th className="py-3 px-4 text-center">Update Stok</th>
                <th className="py-3 px-4 text-center">Hapus</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isLight ? 'divide-slate-200 text-slate-700' : 'divide-neutral-800/80 text-neutral-300'
            }`}>
              {filteredItems.map((item) => {
                const isLow = item.currentStock <= item.minStock;
                return (
                  <tr key={item.id} className={`transition-colors ${
                    isLight ? 'hover:bg-slate-50' : 'hover:bg-neutral-850/50'
                  }`}>
                    <td className={`py-3.5 px-4 font-mono font-bold text-[11px] ${
                      isLight ? 'text-slate-500' : 'text-neutral-400'
                    }`}>
                      {item.code}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.name}</div>
                      <div className={`text-[10px] font-mono ${isLight ? 'text-slate-400' : 'text-neutral-500'}`}>Restock: {item.lastRestocked}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] border ${
                        isLight 
                          ? 'bg-slate-100 border-slate-300 text-slate-800' 
                          : 'bg-neutral-950 border-neutral-800 text-neutral-300'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums">
                      <div className={`font-bold text-sm ${
                        isLow 
                          ? isLight ? 'text-amber-700' : 'text-amber-400' 
                          : isLight ? 'text-emerald-700' : 'text-emerald-400'
                      }`}>
                        {item.currentStock} {item.unit}
                      </div>
                      {isLow && (
                        <span className={`text-[9px] font-sans block font-semibold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>
                          Menipis
                        </span>
                      )}
                    </td>
                    <td className={`py-3.5 px-4 text-right font-mono tabular-nums ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                      {item.minStock} {item.unit}
                    </td>
                    <td className={`py-3.5 px-4 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                      {item.location}
                    </td>
                    <td className={`py-3.5 px-4 max-w-xs truncate ${isLight ? 'text-slate-600' : 'text-neutral-400'}`} title={item.supplier}>
                      {item.supplier}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => onUpdateStock(item.id, Math.max(0, item.currentStock - 10))}
                          className={`w-6 h-6 rounded font-bold font-mono text-xs transition-colors cursor-pointer ${
                            isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                          }`}
                          title="Kurangi 10 unit"
                        >
                          -
                        </button>
                        <button
                          onClick={() => onUpdateStock(item.id, item.currentStock + 25)}
                          className={`w-6 h-6 rounded font-bold font-mono text-xs transition-colors cursor-pointer ${
                            isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                          }`}
                          title="Tambah 25 unit"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => {
                          if (confirm(`Hapus data ${item.name}?`)) {
                            onDeleteItem(item.id);
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
