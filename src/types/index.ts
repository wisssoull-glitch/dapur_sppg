/**
 * ============================================================================
 * TYPE DEFINITIONS - DAPUR MBG OPERATIONAL SYSTEM
 * ============================================================================
 * Penanda: Berisi seluruh kontrak tipe data untuk Dashboard Portofolio,
 * Portal Ahli Gizi, Portal Administrasi Dapur, dan Portal Pusat Data Kepala Dapur.
 * Termasuk modul otentikasi login dan sistem berkas virtual (File Explorer).
 * ============================================================================
 */

/* --- SECTION 1: NAVIGASI & VIEW ROUTING --- */
export type AppView = 'dashboard' | 'ahligizi' | 'admin' | 'kepaladapur';

export type AhliGiziTab = 'label-gizi' | 'sampah' | 'suhu-ruangan';

export type AdminTab = 
  | 'kebersihan' 
  | 'gudang' 
  | 'fifo-fefo' 
  | 'stok-opname' 
  | 'kondisi-air';

export type ThemeMode = 'dark' | 'light';

/* --- SECTION 2: AUTENTIKASI & PENGGUNA --- */
export type UserRole = 'kepaladapur' | 'ahligizi' | 'admin';

export interface AuthUser {
  username: string;
  role: UserRole;
  displayName: string;
  title: string;
  avatarUrl: string;
  token: string;
}

/* --- SECTION 3: PUSAT DATA KEPALA DAPUR (VIRTUAL FILE SYSTEM) --- */
export type FileItemType = 
  | 'folder' 
  | 'document' 
  | 'spreadsheet' 
  | 'image' 
  | 'pdf' 
  | 'json' 
  | 'archive' 
  | 'other';

export interface VFileSystemItem {
  id: string;
  name: string;
  type: FileItemType;
  parentId: string | null; // null for root level
  path: string; // e.g. "/Arsip Ahli Gizi/Label Gizi & AKG"
  sizeBytes: number;
  createdAt: string;
  updatedAt: string;
  createdByRole: 'ahligizi' | 'admin' | 'kepaladapur' | 'sistem';
  content?: any; // content payload: JSON object, base64 dataUrl, text, etc.
  mimeType?: string;
  description?: string;
  isSystemProtected?: boolean; // system root folders protected from accidental delete
}

export interface ClipboardState {
  item: VFileSystemItem;
  operation: 'copy' | 'cut';
}

/* --- SECTION 4: PROFIL KELOMPOK KERJA & PORTOFOLIO --- */
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  roleCategory: 'Kepala SPPG' | 'Ahli Gizi' | 'Admin & Logistik' | 'Kepala Koki' | 'Sanitasi & Mutu' | 'Distribusi';
  nipOrLicense: string;
  photoUrl: string;
  bio: string;
  phone?: string;
  email?: string;
}

export interface KitchenProfile {
  name: string;
  slogan: string;
  codeSPPG: string;
  address: string;
  operationalHours: string;
  dailyPortionCapacity: number;
  activeSchoolsServed: number;
  studentsBeneficiaryCount: number;
  phone: string;
  email: string;
  hotlineEmergency: string;
}

/* --- SECTION 5: MODUL AHLI GIZI --- */
export interface NutritionLabelItem {
  id: string;
  menuName: string;
  targetAgeGroup: 'SD Kelas 1-3' | 'SD Kelas 4-6' | 'SMP/SMA';
  portionWeightGrams: number;
  caloriesKcal: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  sodiumMg: number;
  calciumMg: number;
  vitAIU: number;
  vitCMg: number;
  ingredients: string;
  allergenNotice: string;
  datePrepared: string;
  nutritionistPIC: string;
  barcodeCode: string;
}

export interface FoodWasteRecord {
  id: string;
  date: string;
  shift: 'Pagi (Persiapan Bahan)' | 'Siang (Sisa Masak & Siswa)' | 'Sore (Sanitasi Total)';
  organicKg: number;
  nonOrganicKg: number;
  plateWasteKg: number;
  destination: 'Komposting Dapur Mandiri' | 'Budidaya Maggot BSF' | 'TPS3R Daur Ulang' | 'Bank Sampah Mitra';
  notes: string;
  loggedBy: string;
}

export interface RoomTempRecord {
  id: string;
  timestamp: string;
  roomZone: 'Chiller Bahan Segar' | 'Freezer Daging/Ikan' | 'Ruang Persiapan Pengolahan' | 'Gudang Kering (Dry Storage)' | 'Food Warmer Holding Area';
  tempCelsius: number;
  humidityPercent: number;
  probeDeviceId: string;
  status: 'Normal' | 'Peringatan' | 'Kritis';
  picName: string;
  actionTaken?: string;
}

/* --- SECTION 6: MODUL ADMINISTRASI DAPUR --- */
export interface EquipmentHygieneRecord {
  id: string;
  equipmentName: string;
  category: 'Peralatan Masak Utama' | 'Wadah Stainless Bento' | 'Pisau & Talenan HACCP' | 'Sterilizer & Mesin Cuci';
  checkDate: string;
  washMethod: 'Pencucian 3 Bak Standar' | 'Sanitasi Suhu Panas 82°C' | 'Disinfeksi Klorin Food Grade' | 'Sterilisasi UV';
  swabTestResult: 'Lolos Uji Sanitasi' | 'Perlu Pembersihan Ulang';
  inspectorName: string;
  notes: string;
}

export interface WarehouseItem {
  id: string;
  code: string;
  name: string;
  category: 'Bahan Pokok' | 'Protein Hewani' | 'Sayuran & Buah' | 'Bumbu & Minyak' | 'Wadah & Logistik';
  currentStock: number;
  unit: string;
  minStock: number;
  location: string;
  supplier: string;
  lastRestocked: string;
}

export interface FifoFefoRecord {
  id: string;
  batchNumber: string;
  itemName: string;
  arrivalDate: string;
  expiryDate: string;
  quantity: number;
  unit: string;
  storageLocation: string;
  fefoPriority: 'Segera Pakai (FEFO #1)' | 'Normal (FEFO #2)' | 'Aman (FEFO #3)';
  currentStatus: 'Siap Pakai' | 'Sedang Digunakan' | 'Karantina' | 'Habis';
}

export interface StockOpnameRecord {
  id: string;
  opnameDate: string;
  itemCode: string;
  itemName: string;
  systemQty: number;
  physicalQty: number;
  unit: string;
  discrepancy: number;
  discrepancyReason: string;
  auditorName: string;
  auditStatus: 'Sesuai' | 'Toleransi Susut Wajar' | 'Selisih Perlu Investigasi';
}

export interface WaterQualityRecord {
  id: string;
  inspectionDate: string;
  waterSource: 'Sumur Bor Filtrasi 3 Tahap' | 'PDAM Terklorinasi' | 'Unit Reverse Osmosis (Air Minum)';
  phLevel: number;
  tdsPpm: number;
  turbidityNtu: number;
  smellTasteCheck: 'Jernih, Tanpa Bau & Rasa' | 'Tercatat Bau Samar' | 'Keruh Ringan';
  eColiStatus: 'Negatif / Aman (0 CFU/100ml)' | 'Dalam Uji Laboratorium' | 'Karantina Filter';
  filterCondition: 'Prima (Baru Diganti)' | 'Baik (Usia Pakai 45%)' | 'Jadwal Backwash/Ganti';
  picTechnician: string;
}
