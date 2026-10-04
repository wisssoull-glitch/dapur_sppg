/**
 * ============================================================================
 * MAIN APP CONTAINER - DAPUR MBG OPERATIONAL SYSTEM
 * ============================================================================
 * Penanda: Berkas utama aplikasi Dapur Makan Bergizi Gratis (MBG).
 * Mengelola:
 * 1. Router State (Dashboard, Kepala Dapur, Ahli Gizi, Admin Dapur)
 * 2. Autentikasi Pengguna per Role (fajar_adi, ahli_gizi, admin123)
 * 3. Pusat Data Virtual File System milik Kepala Dapur
 * 4. Sinkronisasi Otomatis inputan Ahli Gizi & Admin ke folder Kepala Dapur
 * 5. Pengalih Tema Terang & Gelap (Light & Dark Theme)
 * Author/Maintenance: Tim Rekayasa Sistem Dapur MBG
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { 
  AppView, 
  AhliGiziTab, 
  AdminTab, 
  ThemeMode,
  UserRole,
  AuthUser,
  VFileSystemItem,
  NutritionLabelItem, 
  FoodWasteRecord, 
  RoomTempRecord, 
  EquipmentHygieneRecord, 
  WarehouseItem, 
  FifoFefoRecord, 
  StockOpnameRecord, 
  WaterQualityRecord 
} from './types';
import { 
  INITIAL_NUTRITION_LABELS, 
  INITIAL_FOOD_WASTE, 
  INITIAL_ROOM_TEMPS, 
  INITIAL_EQUIPMENT_HYGIENE, 
  INITIAL_WAREHOUSE_ITEMS, 
  INITIAL_FIFO_FEFO, 
  INITIAL_STOCK_OPNAME, 
  INITIAL_WATER_QUALITY,
  INITIAL_FILESYSTEM,
  USER_CREDENTIALS
} from './data/initialData';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LoginModal } from './components/common/LoginModal';
import { DashboardPortfolio } from './components/dashboard/DashboardPortfolio';
import { KepalaDapurPortal } from './components/kepaladapur/KepalaDapurPortal';
import { AhliGiziPortal } from './components/ahligizi/AhliGiziPortal';
import { AdminPortal } from './components/admin/AdminPortal';

export default function App() {
  /* --- SECTION 1: TEMA TAMPILAN (DARK / LIGHT THEME) --- */
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('mbg_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('mbg_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-neutral-900', 'text-neutral-100', 'bg-neutral-950');
      document.body.classList.add('bg-slate-50', 'text-slate-900');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
      document.body.classList.add('bg-neutral-950', 'text-neutral-100');
    }
  }, [theme]);

  /* --- SECTION 2: AUTENTIKASI PENGGUNA PER MENU --- */
  const [activeUser, setActiveUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('mbg_active_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [authenticatedRoles, setAuthenticatedRoles] = useState<{
    kepaladapur: boolean;
    ahligizi: boolean;
    admin: boolean;
  }>(() => {
    const saved = localStorage.getItem('mbg_auth_roles');
    return saved ? JSON.parse(saved) : { kepaladapur: false, ahligizi: false, admin: false };
  });

  const [loginModal, setLoginModal] = useState<{
    isOpen: boolean;
    targetRole: UserRole;
  }>({
    isOpen: false,
    targetRole: 'kepaladapur'
  });

  useEffect(() => {
    localStorage.setItem('mbg_auth_roles', JSON.stringify(authenticatedRoles));
  }, [authenticatedRoles]);

  useEffect(() => {
    localStorage.setItem('mbg_active_user', JSON.stringify(activeUser));
  }, [activeUser]);

  /* --- SECTION 3: ROUTING & ACTIVE TAB STATE --- */
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [ahliGiziTab, setAhliGiziTab] = useState<AhliGiziTab>('label-gizi');
  const [adminTab, setAdminTab] = useState<AdminTab>('kebersihan');

  /* --- SECTION 4: OPERATIONAL DATA STATE --- */
  const [nutritionLabels, setNutritionLabels] = useState<NutritionLabelItem[]>(() => {
    const saved = localStorage.getItem('mbg_nutrition_labels');
    return saved ? JSON.parse(saved) : INITIAL_NUTRITION_LABELS;
  });

  const [foodWaste, setFoodWaste] = useState<FoodWasteRecord[]>(() => {
    const saved = localStorage.getItem('mbg_food_waste');
    return saved ? JSON.parse(saved) : INITIAL_FOOD_WASTE;
  });

  const [roomTemps, setRoomTemps] = useState<RoomTempRecord[]>(() => {
    const saved = localStorage.getItem('mbg_room_temps');
    return saved ? JSON.parse(saved) : INITIAL_ROOM_TEMPS;
  });

  const [hygieneRecords, setHygieneRecords] = useState<EquipmentHygieneRecord[]>(() => {
    const saved = localStorage.getItem('mbg_hygiene_records');
    return saved ? JSON.parse(saved) : INITIAL_EQUIPMENT_HYGIENE;
  });

  const [warehouseItems, setWarehouseItems] = useState<WarehouseItem[]>(() => {
    const saved = localStorage.getItem('mbg_warehouse_items');
    return saved ? JSON.parse(saved) : INITIAL_WAREHOUSE_ITEMS;
  });

  const [fifoRecords, setFifoRecords] = useState<FifoFefoRecord[]>(() => {
    const saved = localStorage.getItem('mbg_fifo_records');
    return saved ? JSON.parse(saved) : INITIAL_FIFO_FEFO;
  });

  const [stockOpnames, setStockOpnames] = useState<StockOpnameRecord[]>(() => {
    const saved = localStorage.getItem('mbg_stock_opnames');
    return saved ? JSON.parse(saved) : INITIAL_STOCK_OPNAME;
  });

  const [waterRecords, setWaterRecords] = useState<WaterQualityRecord[]>(() => {
    const saved = localStorage.getItem('mbg_water_records');
    return saved ? JSON.parse(saved) : INITIAL_WATER_QUALITY;
  });

  /* --- SECTION 5: VIRTUAL FILE SYSTEM STATE (PUSAT DATA KEPALA DAPUR) --- */
  const [fileSystem, setFileSystem] = useState<VFileSystemItem[]>(() => {
    const saved = localStorage.getItem('mbg_filesystem');
    return saved ? JSON.parse(saved) : INITIAL_FILESYSTEM;
  });

  useEffect(() => {
    localStorage.setItem('mbg_filesystem', JSON.stringify(fileSystem));
  }, [fileSystem]);

  // Sync to LocalStorage for raw records
  useEffect(() => {
    localStorage.setItem('mbg_nutrition_labels', JSON.stringify(nutritionLabels));
  }, [nutritionLabels]);

  useEffect(() => {
    localStorage.setItem('mbg_food_waste', JSON.stringify(foodWaste));
  }, [foodWaste]);

  useEffect(() => {
    localStorage.setItem('mbg_room_temps', JSON.stringify(roomTemps));
  }, [roomTemps]);

  useEffect(() => {
    localStorage.setItem('mbg_hygiene_records', JSON.stringify(hygieneRecords));
  }, [hygieneRecords]);

  useEffect(() => {
    localStorage.setItem('mbg_warehouse_items', JSON.stringify(warehouseItems));
  }, [warehouseItems]);

  useEffect(() => {
    localStorage.setItem('mbg_fifo_records', JSON.stringify(fifoRecords));
  }, [fifoRecords]);

  useEffect(() => {
    localStorage.setItem('mbg_stock_opnames', JSON.stringify(stockOpnames));
  }, [stockOpnames]);

  useEffect(() => {
    localStorage.setItem('mbg_water_records', JSON.stringify(waterRecords));
  }, [waterRecords]);

  /* --- SECTION 6: SINKRONISASI OTOMATIS INPUT KE PUSAT DATA KEPALA DAPUR --- */
  // Auto-sync function helper
  const syncRecordToFileSystem = (
    fileName: string, 
    folderId: string, 
    folderPath: string, 
    type: VFileSystemItem['type'],
    createdByRole: 'ahligizi' | 'admin',
    content: any,
    description: string
  ) => {
    setFileSystem(prev => {
      const exists = prev.some(i => i.parentId === folderId && i.name === fileName);
      if (exists) {
        return prev.map(i => (i.parentId === folderId && i.name === fileName) ? {
          ...i,
          content,
          updatedAt: new Date().toLocaleString('id-ID')
        } : i);
      }
      return [
        ...prev,
        {
          id: `sync-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          name: fileName,
          type,
          parentId: folderId,
          path: `${folderPath}/${fileName}`,
          sizeBytes: 1024,
          createdAt: new Date().toLocaleString('id-ID'),
          updatedAt: new Date().toLocaleString('id-ID'),
          createdByRole,
          mimeType: 'application/json',
          content,
          description
        }
      ];
    });
  };

  // Wrapper handlers that save data and auto-save into Kepala Dapur folders
  const handleAddNutritionLabel = (newL: NutritionLabelItem) => {
    setNutritionLabels(prev => [newL, ...prev]);
    syncRecordToFileSystem(
      `Label_${newL.id}_${newL.targetAgeGroup.replace(/[\s/]/g, '_')}.json`,
      'fld-gizi-labels',
      '/Arsip Ahli Gizi/Label Gizi & AKG',
      'json',
      'ahligizi',
      newL,
      `Formulasi paket: ${newL.menuName} (${newL.caloriesKcal} kkal)`
    );
  };

  const handleAddFoodWaste = (newW: FoodWasteRecord) => {
    setFoodWaste(prev => [newW, ...prev]);
    syncRecordToFileSystem(
      `Log_Sampah_${newW.id}_${newW.date}.json`,
      'fld-gizi-waste',
      '/Arsip Ahli Gizi/Monitoring Sampah',
      'json',
      'ahligizi',
      newW,
      `Limbah shift: ${newW.shift} (${newW.organicKg} kg organik)`
    );
  };

  const handleAddRoomTemp = (newT: RoomTempRecord) => {
    setRoomTemps(prev => [newT, ...prev]);
    syncRecordToFileSystem(
      `Suhu_${newT.id}_${newT.roomZone.replace(/[\s/]/g, '_')}.json`,
      'fld-gizi-temp',
      '/Arsip Ahli Gizi/Suhu & Cold Storage',
      'json',
      'ahligizi',
      newT,
      `Audit temperatur: ${newT.roomZone} (${newT.tempCelsius}°C)`
    );
  };

  const handleAddHygieneRecord = (newH: EquipmentHygieneRecord) => {
    setHygieneRecords(prev => [newH, ...prev]);
    syncRecordToFileSystem(
      `Sanitasi_${newH.id}_${newH.equipmentName.slice(0, 15).replace(/[\s/]/g, '_')}.json`,
      'fld-admin-hygiene',
      '/Arsip Administrasi Dapur/Kebersihan Peralatan',
      'json',
      'admin',
      newH,
      `Sanitasi alat: ${newH.equipmentName} (${newH.swabTestResult})`
    );
  };

  const handleAddWarehouseItem = (newI: WarehouseItem) => {
    setWarehouseItems(prev => [newI, ...prev]);
    syncRecordToFileSystem(
      `Stok_${newI.code}_${newI.name.slice(0, 15).replace(/[\s/]/g, '_')}.json`,
      'fld-admin-warehouse',
      '/Arsip Administrasi Dapur/Gudang & Inventori',
      'spreadsheet',
      'admin',
      newI,
      `Kartu stok: ${newI.name} (${newI.currentStock} ${newI.unit})`
    );
  };

  const handleAddFifoRecord = (newB: FifoFefoRecord) => {
    setFifoRecords(prev => [newB, ...prev]);
    syncRecordToFileSystem(
      `FEFO_${newB.batchNumber}.json`,
      'fld-admin-fifo',
      '/Arsip Administrasi Dapur/FIFO FEFO Rotasi',
      'json',
      'admin',
      newB,
      `Lot kedatangan: ${newB.itemName} (Exp: ${newB.expiryDate})`
    );
  };

  const handleAddStockOpname = (newS: StockOpnameRecord) => {
    setStockOpnames(prev => [newS, ...prev]);
    syncRecordToFileSystem(
      `Opname_${newS.id}_${newS.itemCode}.json`,
      'fld-admin-opname',
      '/Arsip Administrasi Dapur/Stok Opname Fisik',
      'spreadsheet',
      'admin',
      newS,
      `Audit fisik: ${newS.itemName} (Selisih: ${newS.discrepancy} ${newS.unit})`
    );
  };

  const handleAddWaterRecord = (newW: WaterQualityRecord) => {
    setWaterRecords(prev => [newW, ...prev]);
    syncRecordToFileSystem(
      `Uji_Air_${newW.id}_${newW.waterSource.slice(0, 15).replace(/[\s/]/g, '_')}.json`,
      'fld-admin-water',
      '/Arsip Administrasi Dapur/Sumber & Kualitas Air',
      'json',
      'admin',
      newW,
      `Uji air: ${newW.waterSource} (pH ${newW.phLevel}, TDS ${newW.tdsPpm})`
    );
  };

  /* --- SECTION 7: ROLE SELECTION & LOGIN ENFORCEMENT --- */
  const handleSelectRole = (role: AppView) => {
    if (role === 'dashboard') {
      setCurrentView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const roleKey = role as UserRole;
    if (authenticatedRoles[roleKey]) {
      // Already authenticated, directly open
      setCurrentView(role);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Require login modal
      setLoginModal({
        isOpen: true,
        targetRole: roleKey
      });
    }
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setActiveUser(user);
    setAuthenticatedRoles(prev => ({
      ...prev,
      [user.role]: true
    }));
    setCurrentView(user.role);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    if (activeUser) {
      setAuthenticatedRoles(prev => ({
        ...prev,
        [activeUser.role]: false
      }));
    }
    setActiveUser(null);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* --- SECTION 8: RENDER UI --- */
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'light bg-slate-50 text-slate-900' : 'dark bg-neutral-950 text-neutral-100'} flex flex-col font-sans transition-colors duration-200 selection:bg-emerald-500 selection:text-white`}>
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        currentView={currentView}
        setCurrentView={handleSelectRole}
        ahliGiziTab={ahliGiziTab}
        setAhliGiziTab={setAhliGiziTab}
        adminTab={adminTab}
        setAdminTab={setAdminTab}
        theme={theme}
        setTheme={setTheme}
        activeUser={activeUser}
        onLogout={handleLogout}
      />

      {/* 2. Login Modal Dialog */}
      <LoginModal
        isOpen={loginModal.isOpen}
        targetRole={loginModal.targetRole}
        onClose={() => setLoginModal(prev => ({ ...prev, isOpen: false }))}
        onLoginSuccess={handleLoginSuccess}
        theme={theme}
      />

      {/* 3. Main Viewport Switcher */}
      <div className="flex-1">
        {currentView === 'dashboard' && (
          <DashboardPortfolio 
            onSelectRole={handleSelectRole}
            authenticatedRoles={authenticatedRoles}
            theme={theme}
          />
        )}

        {currentView === 'kepaladapur' && (
          <KepalaDapurPortal
            onBackToDashboard={handleBackToDashboard}
            fileSystem={fileSystem}
            setFileSystem={setFileSystem}
            nutritionLabels={nutritionLabels}
            foodWaste={foodWaste}
            roomTemps={roomTemps}
            hygieneRecords={hygieneRecords}
            warehouseItems={warehouseItems}
            fifoRecords={fifoRecords}
            stockOpnames={stockOpnames}
            waterRecords={waterRecords}
            theme={theme}
          />
        )}

        {currentView === 'ahligizi' && (
          <AhliGiziPortal
            activeTab={ahliGiziTab}
            setActiveTab={setAhliGiziTab}
            onBackToDashboard={handleBackToDashboard}
            nutritionLabels={nutritionLabels}
            setNutritionLabels={setNutritionLabels}
            foodWaste={foodWaste}
            setFoodWaste={setFoodWaste}
            roomTemps={roomTemps}
            setRoomTemps={setRoomTemps}
            theme={theme}
          />
        )}

        {currentView === 'admin' && (
          <AdminPortal
            activeTab={adminTab}
            setActiveTab={setAdminTab}
            onBackToDashboard={handleBackToDashboard}
            hygieneRecords={hygieneRecords}
            setHygieneRecords={setHygieneRecords}
            warehouseItems={warehouseItems}
            setWarehouseItems={setWarehouseItems}
            fifoRecords={fifoRecords}
            setFifoRecords={setFifoRecords}
            stockOpnames={stockOpnames}
            setStockOpnames={setStockOpnames}
            waterRecords={waterRecords}
            setWaterRecords={setWaterRecords}
            theme={theme}
          />
        )}
      </div>

      {/* 4. Global Footer */}
      <Footer theme={theme} />

    </div>
  );
}
