/**
 * ============================================================================
 * KEPALA DAPUR PORTAL - PUSAT DATA & FILE EXPLORER DAPUR MBG
 * ============================================================================
 * Penanda: Modul ruang kerja eksekutif Kepala Dapur (Fajar Adi, S.T, M.M)
 * Bertindak sebagai Pusat Data Dokumen & Arsip seluruh operasional dapur MBG.
 * Mendukung: Pembuatan folder, unggah segala bentuk file, ubah nama (rename),
 * salin (copy), potong (cut), hapus (delete), serta pratinjau isi berkas.
 * Menampung sinkronisasi otomatis seluruh inputan Ahli Gizi dan Admin Dapur.
 * Mendukung Tema Terang dan Gelap.
 * ============================================================================
 */

import React, { useState, useRef } from 'react';
import { 
  VFileSystemItem, 
  ClipboardState, 
  FileItemType,
  NutritionLabelItem,
  FoodWasteRecord,
  RoomTempRecord,
  EquipmentHygieneRecord,
  WarehouseItem,
  FifoFefoRecord,
  StockOpnameRecord,
  WaterQualityRecord,
  ThemeMode
} from '../../types';
import { FileViewerModal } from './FileViewerModal';
import { 
  Folder, 
  FolderPlus, 
  Upload, 
  FileText, 
  FileSpreadsheet, 
  FileCode, 
  FileCheck, 
  Search, 
  Scissors, 
  Copy, 
  Clipboard, 
  Edit3, 
  Trash2, 
  Download, 
  Eye, 
  ChevronRight, 
  ArrowLeft, 
  Sparkles, 
  RefreshCw, 
  LayoutGrid, 
  List, 
  ShieldCheck, 
  Plus, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface KepalaDapurPortalProps {
  onBackToDashboard: () => void;
  fileSystem: VFileSystemItem[];
  setFileSystem: React.Dispatch<React.SetStateAction<VFileSystemItem[]>>;
  nutritionLabels: NutritionLabelItem[];
  foodWaste: FoodWasteRecord[];
  roomTemps: RoomTempRecord[];
  hygieneRecords: EquipmentHygieneRecord[];
  warehouseItems: WarehouseItem[];
  fifoRecords: FifoFefoRecord[];
  stockOpnames: StockOpnameRecord[];
  waterRecords: WaterQualityRecord[];
  theme: ThemeMode;
}

export const KepalaDapurPortal: React.FC<KepalaDapurPortalProps> = ({
  onBackToDashboard,
  fileSystem,
  setFileSystem,
  nutritionLabels,
  foodWaste,
  roomTemps,
  hygieneRecords,
  warehouseItems,
  fifoRecords,
  stockOpnames,
  waterRecords,
  theme,
}) => {
  const isLight = theme === 'light';

  // Navigation / Active directory state
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [selectedFileForView, setSelectedFileForView] = useState<VFileSystemItem | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Clipboard for Copy / Cut / Paste
  const [clipboard, setClipboard] = useState<ClipboardState | null>(null);

  // Rename modal / prompt state
  const [itemToRename, setItemToRename] = useState<VFileSystemItem | null>(null);
  const [newNameInput, setNewNameInput] = useState('');

  // New folder modal state
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // New document note modal state
  const [showNewDocModal, setShowNewDocModal] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocContent, setNewDocContent] = useState('');

  // Feedback notifications
  const [actionAlert, setActionAlert] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Hidden File input ref for uploading ANY file
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const showAlert = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setActionAlert({ message, type });
    setTimeout(() => setActionAlert(null), 3500);
  };

  /* --- SECTION 1: DIREKTORI AKTIF & BREADCRUMBS --- */
  const getCurrentPathItems = (): VFileSystemItem[] => {
    const crumbs: VFileSystemItem[] = [];
    let currId = currentFolderId;
    while (currId) {
      const found = fileSystem.find(i => i.id === currId);
      if (found) {
        crumbs.unshift(found);
        currId = found.parentId;
      } else {
        break;
      }
    }
    return crumbs;
  };

  const currentFolder = fileSystem.find(i => i.id === currentFolderId);
  const currentPathString = currentFolder ? currentFolder.path : '/';

  /* --- SECTION 2: FILE LISTING & FILTERING --- */
  const currentItems = fileSystem.filter(item => {
    if (searchQuery.trim()) {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.path.toLowerCase().includes(searchQuery.toLowerCase());
      const matchFilter = filterType === 'all' || item.type === filterType;
      return matchSearch && matchFilter;
    }
    const isDirectChild = item.parentId === currentFolderId;
    const matchFilter = filterType === 'all' || item.type === filterType;
    return isDirectChild && matchFilter;
  });

  /* --- SECTION 3: REKURSIVE DELETE & FILE OPERATIONS --- */
  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemToRename || !newNameInput.trim()) return;

    setFileSystem(prev => prev.map(item => {
      if (item.id === itemToRename.id) {
        const parentPath = item.path.substring(0, item.path.lastIndexOf('/'));
        return {
          ...item,
          name: newNameInput.trim(),
          path: `${parentPath}/${newNameInput.trim()}`,
          updatedAt: new Date().toLocaleString('id-ID')
        };
      }
      return item;
    }));

    showAlert(`Nama berhasil diubah menjadi "${newNameInput.trim()}"`);
    setItemToRename(null);
    setNewNameInput('');
  };

  const handleCopy = (item: VFileSystemItem) => {
    setClipboard({ item, operation: 'copy' });
    showAlert(`"${item.name}" disalin ke clipboard.`);
  };

  const handleCut = (item: VFileSystemItem) => {
    setClipboard({ item, operation: 'cut' });
    showAlert(`"${item.name}" dipotong (siap dipindahkan).`, 'info');
  };

  const handlePaste = () => {
    if (!clipboard) return;
    const targetParentId = currentFolderId;
    const targetPathPrefix = currentFolder ? currentFolder.path : '';

    if (clipboard.operation === 'cut') {
      setFileSystem(prev => prev.map(i => {
        if (i.id === clipboard.item.id) {
          return {
            ...i,
            parentId: targetParentId,
            path: `${targetPathPrefix}/${i.name}`,
            updatedAt: new Date().toLocaleString('id-ID')
          };
        }
        return i;
      }));
      showAlert(`"${clipboard.item.name}" berhasil dipindahkan ke ${currentPathString}`);
      setClipboard(null);
    } else {
      const newItem: VFileSystemItem = {
        ...clipboard.item,
        id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: `${clipboard.item.name} (Salinan)`,
        parentId: targetParentId,
        path: `${targetPathPrefix}/${clipboard.item.name} (Salinan)`,
        createdAt: new Date().toLocaleString('id-ID'),
        updatedAt: new Date().toLocaleString('id-ID')
      };
      setFileSystem(prev => [...prev, newItem]);
      showAlert(`Salinan "${clipboard.item.name}" berhasil ditempel.`);
    }
  };

  const handleDelete = (item: VFileSystemItem) => {
    if (item.isSystemProtected) {
      if (!confirm(`Peringatan: "${item.name}" adalah folder sistem standar. Apakah Anda yakin tetap ingin menghapusnya?`)) {
        return;
      }
    } else {
      if (!confirm(`Apakah Anda yakin ingin menghapus "${item.name}"?`)) {
        return;
      }
    }

    const collectIdsToDelete = (id: string): string[] => {
      const children = fileSystem.filter(i => i.parentId === id);
      const childIds = children.flatMap(c => collectIdsToDelete(c.id));
      return [id, ...childIds];
    };

    const idsToDelete = collectIdsToDelete(item.id);
    setFileSystem(prev => prev.filter(i => !idsToDelete.includes(i.id)));
    showAlert(`"${item.name}" berhasil dihapus.`);
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const newFolder: VFileSystemItem = {
      id: `fld-${Date.now()}`,
      name: newFolderName.trim(),
      type: 'folder',
      parentId: currentFolderId,
      path: `${currentFolder ? currentFolder.path : ''}/${newFolderName.trim()}`,
      sizeBytes: 0,
      createdAt: new Date().toLocaleString('id-ID'),
      updatedAt: new Date().toLocaleString('id-ID'),
      createdByRole: 'kepaladapur',
      description: 'Folder arsip dibuat oleh Kepala Dapur.'
    };

    setFileSystem(prev => [...prev, newFolder]);
    setShowNewFolderModal(false);
    setNewFolderName('');
    showAlert(`Folder "${newFolder.name}" berhasil dibuat.`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      const isImg = file.type.startsWith('image/');
      
      reader.onload = (event) => {
        const contentPayload = event.target?.result;
        
        let detectedType: FileItemType = 'document';
        if (file.type.includes('pdf')) detectedType = 'pdf';
        else if (file.type.includes('sheet') || file.type.includes('excel') || file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) detectedType = 'spreadsheet';
        else if (isImg) detectedType = 'image';
        else if (file.type.includes('json') || file.name.endsWith('.json')) detectedType = 'json';
        else if (file.type.includes('zip') || file.type.includes('rar') || file.type.includes('tar')) detectedType = 'archive';
        else detectedType = 'document';

        const newFileItem: VFileSystemItem = {
          id: `upload-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          name: file.name,
          type: detectedType,
          parentId: currentFolderId,
          path: `${currentFolder ? currentFolder.path : ''}/${file.name}`,
          sizeBytes: file.size,
          createdAt: new Date().toLocaleString('id-ID'),
          updatedAt: new Date().toLocaleString('id-ID'),
          createdByRole: 'kepaladapur',
          mimeType: file.type || 'application/octet-stream',
          content: contentPayload,
          description: `Berkas unggahan langsung dari perangkat (${file.type || 'format umum'}).`
        };

        setFileSystem(prev => [...prev, newFileItem]);
        showAlert(`Berkas "${file.name}" berhasil diunggah dan disimpan ke pusat data!`);
      };

      if (isImg) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const formattedName = newDocName.endsWith('.txt') || newDocName.endsWith('.doc') || newDocName.endsWith('.md') 
      ? newDocName.trim() 
      : `${newDocName.trim()}.docx`;

    const newDoc: VFileSystemItem = {
      id: `doc-${Date.now()}`,
      name: formattedName,
      type: 'document',
      parentId: currentFolderId,
      path: `${currentFolder ? currentFolder.path : ''}/${formattedName}`,
      sizeBytes: new Blob([newDocContent]).size,
      createdAt: new Date().toLocaleString('id-ID'),
      updatedAt: new Date().toLocaleString('id-ID'),
      createdByRole: 'kepaladapur',
      mimeType: 'text/plain',
      content: newDocContent,
      description: 'Dokumen catatan resmi yang disusun langsung oleh Kepala Dapur.'
    };

    setFileSystem(prev => [...prev, newDoc]);
    setShowNewDocModal(false);
    setNewDocName('');
    setNewDocContent('');
    showAlert(`Dokumen "${newDoc.name}" berhasil dibuat.`);
  };

  const handleManualSync = () => {
    let newItemsCount = 0;
    const updated = [...fileSystem];

    nutritionLabels.forEach(l => {
      const fileName = `Label_${l.id}_${l.targetAgeGroup.replace(/[\s/]/g, '_')}.json`;
      const exists = updated.some(i => i.parentId === 'fld-gizi-labels' && i.name === fileName);
      if (!exists) {
        updated.push({
          id: `file-sync-nl-${l.id}`,
          name: fileName,
          type: 'json',
          parentId: 'fld-gizi-labels',
          path: `/Arsip Ahli Gizi/Label Gizi & AKG/${fileName}`,
          sizeBytes: 1024,
          createdAt: new Date().toLocaleString('id-ID'),
          updatedAt: new Date().toLocaleString('id-ID'),
          createdByRole: 'ahligizi',
          mimeType: 'application/json',
          content: l,
          description: `Formulasi paket menu: ${l.menuName} (${l.caloriesKcal} kkal)`
        });
        newItemsCount++;
      }
    });

    foodWaste.forEach(w => {
      const fileName = `Log_Sampah_${w.id}_${w.date}.json`;
      const exists = updated.some(i => i.parentId === 'fld-gizi-waste' && i.name === fileName);
      if (!exists) {
        updated.push({
          id: `file-sync-wst-${w.id}`,
          name: fileName,
          type: 'json',
          parentId: 'fld-gizi-waste',
          path: `/Arsip Ahli Gizi/Monitoring Sampah/${fileName}`,
          sizeBytes: 850,
          createdAt: new Date().toLocaleString('id-ID'),
          updatedAt: new Date().toLocaleString('id-ID'),
          createdByRole: 'ahligizi',
          mimeType: 'application/json',
          content: w,
          description: `Timbangan limbah shift: ${w.shift} (${w.organicKg} kg organik)`
        });
        newItemsCount++;
      }
    });

    roomTemps.forEach(t => {
      const fileName = `Suhu_${t.id}_${t.roomZone.replace(/[\s/]/g, '_')}.json`;
      const exists = updated.some(i => i.parentId === 'fld-gizi-temp' && i.name === fileName);
      if (!exists) {
        updated.push({
          id: `file-sync-tmp-${t.id}`,
          name: fileName,
          type: 'json',
          parentId: 'fld-gizi-temp',
          path: `/Arsip Ahli Gizi/Suhu & Cold Storage/${fileName}`,
          sizeBytes: 720,
          createdAt: new Date().toLocaleString('id-ID'),
          updatedAt: new Date().toLocaleString('id-ID'),
          createdByRole: 'ahligizi',
          mimeType: 'application/json',
          content: t,
          description: `Pemeriksaan suhu: ${t.roomZone} (${t.tempCelsius}°C)`
        });
        newItemsCount++;
      }
    });

    hygieneRecords.forEach(h => {
      const fileName = `Sanitasi_${h.id}_${h.equipmentName.slice(0, 15).replace(/[\s/]/g, '_')}.json`;
      const exists = updated.some(i => i.parentId === 'fld-admin-hygiene' && i.name === fileName);
      if (!exists) {
        updated.push({
          id: `file-sync-hyg-${h.id}`,
          name: fileName,
          type: 'json',
          parentId: 'fld-admin-hygiene',
          path: `/Arsip Administrasi Dapur/Kebersihan Peralatan/${fileName}`,
          sizeBytes: 890,
          createdAt: new Date().toLocaleString('id-ID'),
          updatedAt: new Date().toLocaleString('id-ID'),
          createdByRole: 'admin',
          mimeType: 'application/json',
          content: h,
          description: `Uji swab & sanitasi: ${h.equipmentName} (${h.swabTestResult})`
        });
        newItemsCount++;
      }
    });

    warehouseItems.forEach(item => {
      const fileName = `Stok_${item.code}_${item.name.slice(0, 12).replace(/[\s/]/g, '_')}.json`;
      const exists = updated.some(i => i.parentId === 'fld-admin-warehouse' && i.name === fileName);
      if (!exists) {
        updated.push({
          id: `file-sync-wh-${item.id}`,
          name: fileName,
          type: 'spreadsheet',
          parentId: 'fld-admin-warehouse',
          path: `/Arsip Administrasi Dapur/Gudang & Inventori/${fileName}`,
          sizeBytes: 1100,
          createdAt: new Date().toLocaleString('id-ID'),
          updatedAt: new Date().toLocaleString('id-ID'),
          createdByRole: 'admin',
          mimeType: 'application/json',
          content: item,
          description: `Kartu stok komoditas: ${item.name} (${item.currentStock} ${item.unit})`
        });
        newItemsCount++;
      }
    });

    waterRecords.forEach(w => {
      const fileName = `Uji_Air_${w.id}_${w.waterSource.slice(0, 12).replace(/[\s/]/g, '_')}.json`;
      const exists = updated.some(i => i.parentId === 'fld-admin-water' && i.name === fileName);
      if (!exists) {
        updated.push({
          id: `file-sync-wtr-${w.id}`,
          name: fileName,
          type: 'json',
          parentId: 'fld-admin-water',
          path: `/Arsip Administrasi Dapur/Sumber & Kualitas Air/${fileName}`,
          sizeBytes: 940,
          createdAt: new Date().toLocaleString('id-ID'),
          updatedAt: new Date().toLocaleString('id-ID'),
          createdByRole: 'admin',
          mimeType: 'application/json',
          content: w,
          description: `Uji kualitas air: ${w.waterSource} (pH ${w.phLevel}, TDS ${w.tdsPpm} ppm)`
        });
        newItemsCount++;
      }
    });

    setFileSystem(updated);
    if (newItemsCount > 0) {
      showAlert(`${newItemsCount} dokumen baru dari Ahli Gizi & Admin berhasil disinkronisasi ke folder Pusat Data!`);
    } else {
      showAlert('Pusat data sudah tersinkronisasi penuh dengan seluruh inputan operasional.', 'info');
    }
  };

  const totalFiles = fileSystem.filter(i => i.type !== 'folder').length;
  const totalFolders = fileSystem.filter(i => i.type === 'folder').length;
  const totalSize = fileSystem.reduce((acc, i) => acc + (i.sizeBytes || 0), 0);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 KB';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getFileIcon = (type: FileItemType) => {
    switch (type) {
      case 'folder':
        return <Folder className="w-8 h-8 text-amber-500 fill-amber-500/20" />;
      case 'pdf':
        return <FileText className="w-8 h-8 text-rose-500" />;
      case 'spreadsheet':
        return <FileSpreadsheet className="w-8 h-8 text-emerald-600" />;
      case 'json':
        return <FileCode className="w-8 h-8 text-blue-600" />;
      default:
        return <FileCheck className={`w-8 h-8 ${isLight ? 'text-slate-600' : 'text-neutral-300'}`} />;
    }
  };

  return (
    <div className={`min-h-screen pb-20 transition-colors ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-neutral-950 text-white'
    }`}>
      
      {/* Hidden Universal File Input */}
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Top Banner Bar: Identitas Kepala Dapur */}
      <div className={`py-6 px-4 sm:px-6 lg:px-8 border-b transition-colors ${
        isLight 
          ? 'bg-gradient-to-r from-amber-50 via-white to-amber-50 border-amber-200 text-slate-900 shadow-sm' 
          : 'bg-gradient-to-r from-amber-950/80 via-neutral-900 to-neutral-950 border-amber-900/50 text-white'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-500 bg-neutral-800 shrink-0 shadow-lg">
              <img
                src="/src/assets/images/avatar_kepala_dapur_1791074594752.jpg"
                alt="Fajar Adi, S.T, M.M"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${
                  isLight 
                    ? 'text-amber-900 bg-amber-100 border-amber-300' 
                    : 'text-amber-400 bg-amber-950 border-amber-800'
                }`}>
                  RUANG KEPALA DAPUR · PUSAT DATA NASIONAL
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                  Otoritas Tertinggi
                </span>
              </div>
              <h1 className={`text-xl sm:text-2xl font-bold mt-0.5 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                Fajar Adi, S.T, M.M
              </h1>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                Kepala Sentral Dapur MBG & Penanggung Jawab SPPG · NIP: 19820518.2024.BGN.001
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleManualSync}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isLight 
                  ? 'text-amber-900 bg-amber-100 border-amber-300 hover:bg-amber-200' 
                  : 'text-amber-300 bg-amber-950/70 border-amber-800/80 hover:bg-amber-900/70'
              }`}
              title="Sinkronkan seluruh inputan Ahli Gizi & Admin"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sinkronkan Data Gizi & Admin</span>
            </button>

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

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Action Alert Banner */}
        {actionAlert && (
          <div className={`p-4 rounded-xl border flex items-center justify-between text-xs animate-in fade-in ${
            actionAlert.type === 'success' 
              ? isLight ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-emerald-950/80 border-emerald-800 text-emerald-300' 
              : actionAlert.type === 'info'
              ? isLight ? 'bg-blue-100 border-blue-300 text-blue-900' : 'bg-blue-950/80 border-blue-800 text-blue-300'
              : isLight ? 'bg-rose-100 border-rose-300 text-rose-900' : 'bg-rose-950/80 border-rose-800 text-rose-300'
          }`}>
            <div className="flex items-center gap-2 font-bold">
              <Check className="w-4 h-4 shrink-0" />
              <span>{actionAlert.message}</span>
            </div>
            <button onClick={() => setActionAlert(null)} className="hover:opacity-75">
              ✕
            </button>
          </div>
        )}

        {/* Executive Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className={`p-4 rounded-xl border shadow-sm ${
            isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
          }`}>
            <span className={`text-xs block mb-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
              Total Arsip Dokumen
            </span>
            <span className={`text-2xl font-bold font-mono tabular-nums ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {totalFiles}
            </span>
            <span className={`text-[11px] block mt-0.5 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
              Berkas terverifikasi
            </span>
          </div>

          <div className={`p-4 rounded-xl border shadow-sm ${
            isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
          }`}>
            <span className={`text-xs block mb-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
              Kategori Folder
            </span>
            <span className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums">
              {totalFolders}
            </span>
            <span className={`text-[11px] block mt-0.5 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
              Struktur direktori
            </span>
          </div>

          <div className={`p-4 rounded-xl border shadow-sm ${
            isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
          }`}>
            <span className={`text-xs block mb-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
              Total Volume Berkas
            </span>
            <span className="text-2xl font-bold font-mono text-teal-600 dark:text-teal-300 tabular-nums">
              {formatFileSize(totalSize)}
            </span>
            <span className={`text-[11px] block mt-0.5 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
              Penyimpanan aman
            </span>
          </div>

          <div className={`p-4 rounded-xl border shadow-sm ${
            isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
          }`}>
            <span className={`text-xs block mb-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
              Status Sinkronisasi
            </span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Real-time Active</span>
            </span>
            <span className={`text-[11px] block mt-0.5 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
              Terkoneksi Gizi & Admin
            </span>
          </div>
        </div>

        {/* Toolbar Interaktif Pusat Data */}
        <div className={`p-4 rounded-2xl border space-y-4 shadow-sm ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-neutral-900 border-neutral-800 text-white'
        }`}>
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowNewFolderModal(true)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800' : 'bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700'
                }`}
              >
                <FolderPlus className="w-4 h-4 text-amber-500" />
                <span>+ Folder Baru</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors cursor-pointer shadow-md"
              >
                <Upload className="w-4 h-4 text-neutral-950" />
                <span>Unggah Segala Berkas</span>
              </button>

              <button
                onClick={() => setShowNewDocModal(true)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800' : 'bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700'
                }`}
              >
                <FileText className="w-4 h-4 text-blue-500" />
                <span>+ Catatan / Dokumen</span>
              </button>

              {clipboard && (
                <button
                  onClick={handlePaste}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer animate-pulse"
                >
                  <Clipboard className="w-4 h-4" />
                  <span>Tempel "{clipboard.item.name}"</span>
                </button>
              )}
            </div>

            {/* View Switcher & Search */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-neutral-400'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari file atau folder..."
                  className={`w-full pl-9 pr-3 py-1.5 rounded-lg border text-xs focus:outline-none ${
                    isLight 
                      ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white' 
                      : 'bg-neutral-950 border-neutral-700 text-white placeholder-neutral-500 focus:border-amber-400'
                  }`}
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={`px-2.5 py-1.5 rounded-lg border text-xs ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-700' : 'bg-neutral-950 border-neutral-700 text-neutral-300'
                }`}
              >
                <option value="all">Semua Tipe</option>
                <option value="folder">Hanya Folder</option>
                <option value="document">Dokumen / Teks</option>
                <option value="pdf">PDF</option>
                <option value="spreadsheet">Spreadsheet</option>
                <option value="json">Data JSON</option>
                <option value="image">Gambar</option>
              </select>

              <div className={`flex items-center p-0.5 rounded-lg border ${
                isLight ? 'bg-slate-100 border-slate-300' : 'bg-neutral-950 border-neutral-700'
              }`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${
                    viewMode === 'grid' 
                      ? isLight ? 'bg-white text-slate-900 shadow-sm' : 'bg-neutral-800 text-white' 
                      : isLight ? 'text-slate-500 hover:text-slate-900' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Tampilan Grid"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded ${
                    viewMode === 'table' 
                      ? isLight ? 'bg-white text-slate-900 shadow-sm' : 'bg-neutral-800 text-white' 
                      : isLight ? 'text-slate-500 hover:text-slate-900' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Tampilan Tabel"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Breadcrumb Path Trail */}
          <div className={`flex items-center gap-1.5 text-xs pt-2 border-t overflow-x-auto ${
            isLight ? 'border-slate-200 text-slate-600' : 'border-neutral-800/80 text-neutral-400'
          }`}>
            <button
              onClick={() => {
                setCurrentFolderId(null);
                setSearchQuery('');
              }}
              className={`hover:text-amber-500 font-semibold transition-colors shrink-0 ${
                currentFolderId === null 
                  ? 'text-amber-600 dark:text-amber-400 font-bold' 
                  : isLight ? 'text-slate-600' : 'text-neutral-400'
              }`}
            >
              Root Pusat Data
            </button>

            {getCurrentPathItems().map((crumb, idx) => (
              <React.Fragment key={crumb.id}>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <button
                  onClick={() => {
                    setCurrentFolderId(crumb.id);
                    setSearchQuery('');
                  }}
                  className={`hover:text-amber-500 transition-colors shrink-0 ${
                    idx === getCurrentPathItems().length - 1 
                      ? 'text-amber-600 dark:text-amber-400 font-bold' 
                      : isLight ? 'text-slate-600' : 'text-neutral-300'
                  }`}
                >
                  {crumb.name}
                </button>
              </React.Fragment>
            ))}

            {searchQuery && (
              <span className="text-emerald-600 dark:text-emerald-400 ml-2 font-mono shrink-0">
                (Hasil pencarian "{searchQuery}")
              </span>
            )}
          </div>

        </div>

        {/* FILE EXPLORER: GRID / LIST VIEW */}
        {currentItems.length === 0 ? (
          <div className={`p-12 text-center rounded-2xl border space-y-3 ${
            isLight ? 'bg-white border-slate-200' : 'bg-neutral-900/50 border-neutral-800/80'
          }`}>
            <Folder className={`w-12 h-12 mx-auto ${isLight ? 'text-slate-300' : 'text-neutral-600'}`} />
            <div className={`text-sm font-bold ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
              Folder ini masih kosong
            </div>
            <p className={`text-xs max-w-sm mx-auto ${isLight ? 'text-slate-500' : 'text-neutral-500'}`}>
              Gunakan tombol "Unggah Segala Berkas", "Folder Baru", atau klik "Sinkronkan Data" untuk menarik arsip gizi dan administrasi.
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentItems.map((item) => {
              const isFolder = item.type === 'folder';
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isFolder) {
                      setCurrentFolderId(item.id);
                    } else {
                      setSelectedFileForView(item);
                    }
                  }}
                  className={`group rounded-2xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md border ${
                    isLight 
                      ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-amber-400' 
                      : 'bg-neutral-900/80 hover:bg-neutral-900 border-neutral-800 hover:border-amber-500/40'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded-xl border group-hover:scale-105 transition-transform ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'
                      }`}>
                        {getFileIcon(item.type)}
                      </div>

                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100" onClick={(e) => e.stopPropagation()}>
                        {!isFolder && (
                          <button
                            onClick={() => setSelectedFileForView(item)}
                            className={`p-1.5 rounded transition-colors ${
                              isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                            }`}
                            title="Buka & Lihat Isi Berkas"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setItemToRename(item);
                            setNewNameInput(item.name);
                          }}
                          className={`p-1.5 rounded transition-colors ${
                            isLight ? 'text-slate-500 hover:text-amber-700 hover:bg-slate-100' : 'text-neutral-400 hover:text-amber-400 hover:bg-neutral-800'
                          }`}
                          title="Ubah Nama"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleCopy(item)}
                          className={`p-1.5 rounded transition-colors ${
                            isLight ? 'text-slate-500 hover:text-blue-700 hover:bg-slate-100' : 'text-neutral-400 hover:text-blue-400 hover:bg-neutral-800'
                          }`}
                          title="Salin (Copy)"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleCut(item)}
                          className={`p-1.5 rounded transition-colors ${
                            isLight ? 'text-slate-500 hover:text-purple-700 hover:bg-slate-100' : 'text-neutral-400 hover:text-purple-400 hover:bg-neutral-800'
                          }`}
                          title="Potong (Cut)"
                        >
                          <Scissors className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className={`p-1.5 rounded transition-colors ${
                            isLight ? 'text-slate-500 hover:text-rose-600 hover:bg-slate-100' : 'text-neutral-400 hover:text-rose-400 hover:bg-neutral-800'
                          }`}
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className={`text-sm font-bold line-clamp-2 mb-1 transition-colors ${
                      isLight ? 'text-slate-900 group-hover:text-amber-600' : 'text-white group-hover:text-amber-400'
                    }`}>
                      {item.name}
                    </h4>

                    {item.description && (
                      <p className={`text-[11px] line-clamp-1 mb-2 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className={`pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
                    isLight ? 'border-slate-200 text-slate-500' : 'border-neutral-800/80 text-neutral-400'
                  }`}>
                    <span>{isFolder ? 'Folder' : formatFileSize(item.sizeBytes)}</span>
                    <span className="uppercase font-bold">{item.createdByRole}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className={`rounded-2xl border overflow-hidden shadow-sm ${
            isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className={`uppercase tracking-wider font-semibold border-b text-[11px] ${
                  isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                }`}>
                  <tr>
                    <th className="py-3 px-4">Nama Berkas / Folder</th>
                    <th className="py-3 px-4">Tipe</th>
                    <th className="py-3 px-4">Ukuran</th>
                    <th className="py-3 px-4">Jalur Path</th>
                    <th className="py-3 px-4">Sumber / PIC</th>
                    <th className="py-3 px-4">Waktu Update</th>
                    <th className="py-3 px-4 text-center">Aksi Cepat</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${
                  isLight ? 'divide-slate-200 text-slate-700' : 'divide-neutral-800/80 text-neutral-300'
                }`}>
                  {currentItems.map((item) => {
                    const isFolder = item.type === 'folder';
                    return (
                      <tr
                        key={item.id}
                        onClick={() => {
                          if (isFolder) setCurrentFolderId(item.id);
                          else setSelectedFileForView(item);
                        }}
                        className={`transition-colors cursor-pointer ${
                          isLight ? 'hover:bg-slate-50' : 'hover:bg-neutral-850/60'
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            {isFolder ? (
                              <Folder className="w-4 h-4 text-amber-500 shrink-0" />
                            ) : (
                              <FileText className={`w-4 h-4 shrink-0 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`} />
                            )}
                            <span className={`font-bold transition-colors line-clamp-1 ${
                              isLight ? 'text-slate-900 hover:text-amber-600' : 'text-white hover:text-amber-400'
                            }`}>
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 uppercase font-mono text-[11px]">
                          {item.type}
                        </td>
                        <td className="py-3 px-4 font-mono">
                          {isFolder ? '-' : formatFileSize(item.sizeBytes)}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] max-w-xs truncate">
                          {item.path}
                        </td>
                        <td className="py-3 px-4 uppercase text-[11px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                          {item.createdByRole}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px]">
                          {item.updatedAt}
                        </td>
                        <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-1">
                            {!isFolder && (
                              <button
                                onClick={() => setSelectedFileForView(item)}
                                className={`p-1 rounded ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-neutral-400 hover:text-white'}`}
                                title="Lihat Isi Berkas"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setItemToRename(item);
                                setNewNameInput(item.name);
                              }}
                              className={`p-1 rounded ${isLight ? 'text-slate-500 hover:text-amber-700' : 'text-neutral-400 hover:text-amber-400'}`}
                              title="Ubah Nama"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleCopy(item)}
                              className={`p-1 rounded ${isLight ? 'text-slate-500 hover:text-blue-700' : 'text-neutral-400 hover:text-blue-400'}`}
                              title="Salin"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleCut(item)}
                              className={`p-1 rounded ${isLight ? 'text-slate-500 hover:text-purple-700' : 'text-neutral-400 hover:text-purple-400'}`}
                              title="Potong"
                            >
                              <Scissors className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(item)}
                              className={`p-1 rounded ${isLight ? 'text-slate-500 hover:text-rose-600' : 'text-neutral-400 hover:text-rose-400'}`}
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: PREVIEW FILE CONTENT */}
      {selectedFileForView && (
        <FileViewerModal
          file={selectedFileForView}
          onClose={() => setSelectedFileForView(null)}
          theme={theme}
        />
      )}

      {/* MODAL 2: FOLDER BARU */}
      {showNewFolderModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateFolder} className={`border rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl ${
            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-neutral-900 border-neutral-700 text-white'
          }`}>
            <h3 className={`text-base font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <FolderPlus className="w-5 h-5 text-amber-500" />
              <span>Buat Folder Baru</span>
            </h3>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Nama Folder *
              </label>
              <input
                type="text"
                required
                autoFocus
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Contoh: Dokumen Pengadaan Daging"
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500 focus:bg-white' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-amber-400'
                }`}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewFolderModal(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-neutral-400 hover:text-white'}`}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors"
              >
                Buat Folder
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 3: UBAH NAMA (RENAME) */}
      {itemToRename && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleRenameSubmit} className={`border rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl ${
            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-neutral-900 border-neutral-700 text-white'
          }`}>
            <h3 className={`text-base font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <Edit3 className="w-5 h-5 text-amber-500" />
              <span>Ubah Nama Berkas / Folder</span>
            </h3>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Nama Baru *
              </label>
              <input
                type="text"
                required
                autoFocus
                value={newNameInput}
                onChange={(e) => setNewNameInput(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500 focus:bg-white' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-amber-400'
                }`}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setItemToRename(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-neutral-400 hover:text-white'}`}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 4: BUAT CATATAN / DOKUMEN BARU */}
      {showNewDocModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateDocument} className={`border rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl ${
            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-neutral-900 border-neutral-700 text-white'
          }`}>
            <h3 className={`text-base font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <FileText className="w-5 h-5 text-blue-500" />
              <span>Susun Dokumen Catatan Baru</span>
            </h3>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Judul Dokumen *
              </label>
              <input
                type="text"
                required
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                placeholder="Contoh: Arahan_Khusus_Distribusi_Hujan_Deras"
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500 focus:bg-white' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                Isi Dokumen / Instruksi Kepala Dapur *
              </label>
              <textarea
                required
                rows={6}
                value={newDocContent}
                onChange={(e) => setNewDocContent(e.target.value)}
                placeholder="Tuliskan catatan, SOP khusus, memo dinas, atau hasil inspeksi lapangan..."
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500 focus:bg-white' 
                    : 'bg-neutral-950 border-neutral-700 text-white focus:border-blue-400'
                }`}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewDocModal(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-neutral-400 hover:text-white'}`}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
              >
                Simpan Dokumen
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
