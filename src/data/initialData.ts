/**
 * ============================================================================
 * DATA INVENTORY & PORTFOLIO PROFILE - DAPUR MBG
 * ============================================================================
 * Penanda: Berisi data awal operasional Dapur Makan Bergizi Gratis (MBG),
 * profil portfolio dapur, kredensial login akun, struktur organisasi,
 * dan inisialisasi Virtual File System (Pusat Data Kepala Dapur).
 * ============================================================================
 */

import {
  KitchenProfile,
  TeamMember,
  NutritionLabelItem,
  FoodWasteRecord,
  RoomTempRecord,
  EquipmentHygieneRecord,
  WarehouseItem,
  FifoFefoRecord,
  StockOpnameRecord,
  WaterQualityRecord,
  VFileSystemItem,
} from '../types';

/* --- SECTION 1: KREDENSIAL LOGIN AKUN SETIAP MENU --- */
export const USER_CREDENTIALS = [
  {
    username: "fajar_adi",
    password: "WirosariK11",
    role: "kepaladapur" as const,
    displayName: "Fajar Adi, S.T, M.M",
    title: "Kepala Sentral Dapur MBG & Penanggung Jawab SPPG",
    avatarUrl: "/src/assets/images/avatar_kepala_dapur_1791074594752.jpg"
  },
  {
    username: "ahli_gizi",
    password: "gizi1234",
    role: "ahligizi" as const,
    displayName: "dr. Sarah Anindita, S.Gz, M.Sc",
    title: "Koordinator Ahli Gizi & Pengendali Mutu",
    avatarUrl: "/src/assets/images/avatar_ahli_gizi_1791073453799.jpg"
  },
  {
    username: "admin123",
    password: "admin123",
    role: "admin" as const,
    displayName: "Bambang Prasetyo, S.E, MM-Log",
    title: "Koordinator Administrasi, Gudang & Logistik",
    avatarUrl: "/src/assets/images/avatar_admin_dapur_1791073465864.jpg"
  }
];

/* --- SECTION 2: PROFIL & PORTOFOLIO DAPUR MBG --- */
export const KITCHEN_PROFILE: KitchenProfile = {
  name: "Dapur Sentral MBG Nusantara 01",
  slogan: "Nutrisi Unggul, Generasi Emas Indonesia",
  codeSPPG: "SPPG-BGN/JKT-SEL/2026/088",
  address: "Kawasan Sentra Pangan Higienis, Jl. Dharma Gizi No. 12, Jakarta Selatan 12430",
  operationalHours: "03.00 - 15.00 WIB (Distribusi Bertahap 09.30 - 11.30 WIB)",
  dailyPortionCapacity: 3500,
  activeSchoolsServed: 14,
  studentsBeneficiaryCount: 3240,
  phone: "+62 21 7892 4410",
  email: "operasional@dapurmbg-nusantara.id",
  hotlineEmergency: "+62 811 8900 2424 (PIC Siaga Pengawas)",
};

export const VISI_MISI = {
  visi: "Menjadi sentra produksi pangan bergizi gratis percontohan nasional dengan standar higienitas tertinggi, kepatuhan AKG presisi, dan operasional rantai dingin yang transparan guna mendukung tumbuh kembang optimal anak bangsa.",
  misi: [
    "Menyediakan menu harian seimbang berbasis pangan lokal segar dengan komposisi makronutrien dan mikronutrien sesuai standar Badan Gizi Nasional (BGN).",
    "Menerapkan prinsip keamanan pangan internasional HACCP, ISO 22000, serta sertifikasi Halal di setiap lini pengolahan.",
    "Menjaga akurasi logistik dengan tata kelola pergudangan FIFO/FEFO dan sistem monitoring suhu cold-chain secara real-time.",
    "Mengurangi jejak limbah makanan (zero waste to landfill) melalui pemilahan organik untuk komposting dan budidaya maggot BSF.",
    "Membangun kolaborasi transparan dengan sekolah mitra, puskesmas, dan orang tua murid melalui keterbukaan informasi label gizi."
  ],
  prinsipUtama: [
    { title: "Higienitas Terakreditasi", desc: "Sterilisasi 3 bak, sanitasi air RO, dan swab alat berkala" },
    { title: "Presisi Angka Kecukupan Gizi", desc: "Tiap paket menu dikalibrasi sesuai kelompok usia siswa" },
    { title: "Bahan Segar Petani Lokal", desc: "Rantai pasok sayur & protein langsung dari koperasi lokal" },
    { title: "Zero Waste Komitmen", desc: "100% sisa organik terkelola menjadi kompos dan pakan ternak" }
  ]
};

/* --- SECTION 3: STRUKTUR ORGANISASI DAPUR --- */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "tm-1",
    name: "Fajar Adi, S.T, M.M",
    title: "Kepala Sentral Dapur MBG & Penanggung Jawab SPPG",
    roleCategory: "Kepala SPPG",
    nipOrLicense: "SIP: 19820518.2024.BGN.001",
    photoUrl: "/src/assets/images/avatar_kepala_dapur_1791074594752.jpg",
    bio: "Pengalaman 15 tahun memimpin manajemen operasional fasilitas rantai pasok industri pangan berskala besar dan audit kepatuhan Badan Gizi Nasional (BGN).",
    email: "fajar.adi@dapurmbg-nusantara.id",
    phone: "+62 811 9900 1122"
  },
  {
    id: "tm-2",
    name: "dr. Sarah Anindita, S.Gz, M.Sc",
    title: "Koordinator Ahli Gizi & Pengendali Mutu Menu",
    roleCategory: "Ahli Gizi",
    nipOrLicense: "STRGZ: 3174.0882.2023.09",
    photoUrl: "/src/assets/images/avatar_ahli_gizi_1791073453799.jpg",
    bio: "Spesialis formulasi diet anak sekolah, penghitungan AKG harian, dan audit allergen pangan.",
    email: "sarah.anindita@dapurmbg-nusantara.id",
    phone: "+62 813 8899 1102"
  },
  {
    id: "tm-3",
    name: "Bambang Prasetyo, S.E, MM-Log",
    title: "Koordinator Administrasi, Pergudangan & Logistik",
    roleCategory: "Admin & Logistik",
    nipOrLicense: "ID: ADM-MBG/2024/044",
    photoUrl: "/src/assets/images/avatar_admin_dapur_1791073465864.jpg",
    bio: "Ahli tata kelola inventori FIFO/FEFO, audit stok opname, dan kepatuhan cold-storage logistik.",
    email: "bambang.prasetyo@dapurmbg-nusantara.id",
    phone: "+62 811 7766 5544"
  },
  {
    id: "tm-4",
    name: "Chef Raden Wicaksono",
    title: "Executive Chef Sentral Pengolahan",
    roleCategory: "Kepala Koki",
    nipOrLicense: "CERT: HACCP-CHEF/ID/992",
    photoUrl: "/src/assets/images/hero_dapur_mbg_1791073441128.jpg",
    bio: "Memimpin 22 asisten juru masak dengan SOP standar pemasakan higienis suhu inti >75°C.",
    email: "chef.raden@dapurmbg-nusantara.id"
  },
  {
    id: "tm-5",
    name: "Nita Octaviani, S.Si",
    title: "Petugas Pengawas Sanitasi, Air & HACCP",
    roleCategory: "Sanitasi & Mutu",
    nipOrLicense: "CERT: FOOD-SAFETY-AUDITOR/2025",
    photoUrl: "/src/assets/images/avatar_ahli_gizi_1791073453799.jpg",
    bio: "Mengawasi pengujian kualitas air RO/PDAM, swab mikrobiologi peralatan, dan penanganan sampah.",
    email: "nita.octaviani@dapurmbg-nusantara.id"
  },
  {
    id: "tm-6",
    name: "Agus Maulana",
    title: "Koordinator Armada & Distribusi Termal",
    roleCategory: "Distribusi",
    nipOrLicense: "ID: DIST-TRUCK-012",
    photoUrl: "/src/assets/images/avatar_admin_dapur_1791073465864.jpg",
    bio: "Bertanggung jawab atas 8 unit armada food-truck berinsulasi panas ke 14 sekolah penerima manfaat.",
    email: "armada@dapurmbg-nusantara.id"
  }
];

/* --- SECTION 4: DATA MOCK INITIAL AHLI GIZI --- */
export const INITIAL_NUTRITION_LABELS: NutritionLabelItem[] = [
  {
    id: "NL-001",
    menuName: "Paket Nusantara: Nasi Gurih Ayam Panggang Madu, Cah Brokoli Jagung Manis & Tempe Bacem",
    targetAgeGroup: "SD Kelas 4-6",
    portionWeightGrams: 420,
    caloriesKcal: 615,
    proteinGrams: 28.5,
    carbsGrams: 84.0,
    fatGrams: 16.2,
    fiberGrams: 6.8,
    sodiumMg: 420,
    calciumMg: 310,
    vitAIU: 1250,
    vitCMg: 38,
    ingredients: "Beras merah campur putih, fillet dada ayam, brokoli segar, jagung pipil manis, tempe kedelai non-GMO, madu hutan, minyak kelapa, bawang putih, garam beryodium.",
    allergenNotice: "Kedelai (tempe). Bebas kacang tanah, bebas MSG tambahan.",
    datePrepared: "2026-10-04",
    nutritionistPIC: "dr. Sarah Anindita, S.Gz",
    barcodeCode: "MBG-PKG-261004-SD46"
  },
  {
    id: "NL-002",
    menuName: "Paket Bahari: Nasi Putih, Fillet Gurame Saus Tomat Segar, Sayur Bening Bayam Labu Siam & Tahu Kukus",
    targetAgeGroup: "SD Kelas 1-3",
    portionWeightGrams: 350,
    caloriesKcal: 510,
    proteinGrams: 22.0,
    carbsGrams: 72.0,
    fatGrams: 12.5,
    fiberGrams: 5.4,
    sodiumMg: 310,
    calciumMg: 280,
    vitAIU: 1600,
    vitCMg: 45,
    ingredients: "Beras pandan wangi, ikan gurame fillet tanpa duri, bayam segar, labu siam, tahu putih sutera, pasta tomat alami, bawang merah, kaldu ayam kampung non-pengawet.",
    allergenNotice: "Ikan (gurame), kedelai (tahu).",
    datePrepared: "2026-10-04",
    nutritionistPIC: "dr. Sarah Anindita, S.Gz",
    barcodeCode: "MBG-PKG-261004-SD13"
  },
  {
    id: "NL-003",
    menuName: "Paket Energi Emas: Nasi Pulen Daging Sapi Lada Manis, Tumis Buncis Wortel & Telur Puyuh Rebus",
    targetAgeGroup: "SMP/SMA",
    portionWeightGrams: 490,
    caloriesKcal: 740,
    proteinGrams: 34.0,
    carbsGrams: 98.0,
    fatGrams: 21.0,
    fiberGrams: 7.5,
    sodiumMg: 490,
    calciumMg: 350,
    vitAIU: 1400,
    vitCMg: 42,
    ingredients: "Beras premium, daging sapi sengkel rendah lemak, buncis baby, wortel brastagi, telur puyuh segar, saus tiram non-alergen, kecap kedelai hitam manis.",
    allergenNotice: "Telur, Kedelai. Bebas susu.",
    datePrepared: "2026-10-04",
    nutritionistPIC: "dr. Sarah Anindita, S.Gz",
    barcodeCode: "MBG-PKG-261004-SMP1"
  }
];

export const INITIAL_FOOD_WASTE: FoodWasteRecord[] = [
  {
    id: "WST-101",
    date: "2026-10-03",
    shift: "Pagi (Persiapan Bahan)",
    organicKg: 18.4,
    nonOrganicKg: 3.2,
    plateWasteKg: 0,
    destination: "Komposting Dapur Mandiri",
    notes: "Potongan bonggol sayur bayam, kulit wortel, dan ampas bumbu giling.",
    loggedBy: "Siti Rahma (Staf Pengolah)"
  },
  {
    id: "WST-102",
    date: "2026-10-03",
    shift: "Siang (Sisa Masak & Siswa)",
    organicKg: 12.1,
    nonOrganicKg: 1.5,
    plateWasteKg: 8.4,
    destination: "Budidaya Maggot BSF",
    notes: "Retur sisa piring dari SDN 04 Pagi. Evaluasi porsi nasi bagi siswa kelas 1 sedikit berlebih.",
    loggedBy: "dr. Sarah Anindita, S.Gz"
  },
  {
    id: "WST-103",
    date: "2026-10-02",
    shift: "Sore (Sanitasi Total)",
    organicKg: 6.5,
    nonOrganicKg: 7.8,
    plateWasteKg: 0,
    destination: "TPS3R Daur Ulang",
    notes: "Kardus bekas kemasan telur terpilah bersih & kantong pembungkus bahan beku.",
    loggedBy: "Agung W (Tim Kebersihan)"
  }
];

export const INITIAL_ROOM_TEMPS: RoomTempRecord[] = [
  {
    id: "TMP-501",
    timestamp: "2026-10-03 06:15 WIB",
    roomZone: "Chiller Bahan Segar",
    tempCelsius: 3.2,
    humidityPercent: 82,
    probeDeviceId: "PROBE-CHILLER-01",
    status: "Normal",
    picName: "dr. Sarah Anindita, S.Gz",
    actionTaken: "Pintu tertutup rapat, sirkulasi blower optimal."
  },
  {
    id: "TMP-502",
    timestamp: "2026-10-03 06:20 WIB",
    roomZone: "Freezer Daging/Ikan",
    tempCelsius: -19.4,
    humidityPercent: 75,
    probeDeviceId: "PROBE-FREEZER-02",
    status: "Normal",
    picName: "Bambang Prasetyo",
    actionTaken: "Daging dan fillet ikan tersusun rapi per palet."
  },
  {
    id: "TMP-503",
    timestamp: "2026-10-03 08:30 WIB",
    roomZone: "Ruang Persiapan Pengolahan",
    tempCelsius: 22.8,
    humidityPercent: 58,
    probeDeviceId: "SENSOR-PREP-MAIN",
    status: "Normal",
    picName: "Chef Raden Wicaksono",
    actionTaken: "AC central suhu dijaga stabil di 22°C."
  },
  {
    id: "TMP-504",
    timestamp: "2026-10-03 09:45 WIB",
    roomZone: "Food Warmer Holding Area",
    tempCelsius: 64.5,
    humidityPercent: 40,
    probeDeviceId: "WARMER-CABINET-A",
    status: "Normal",
    picName: "dr. Sarah Anindita, S.Gz",
    actionTaken: "Suhu wadah makanan sebelum loading armada >60°C sesuai HACCP."
  },
  {
    id: "TMP-505",
    timestamp: "2026-10-03 10:00 WIB",
    roomZone: "Gudang Kering (Dry Storage)",
    tempCelsius: 24.1,
    humidityPercent: 62,
    probeDeviceId: "DRY-STORE-01",
    status: "Normal",
    picName: "Bambang Prasetyo",
    actionTaken: "Dehumidifier aktif, kelembapan terjaga di bawah 65% RH."
  }
];

/* --- SECTION 5: DATA MOCK INITIAL ADMIN DAPUR --- */
export const INITIAL_EQUIPMENT_HYGIENE: EquipmentHygieneRecord[] = [
  {
    id: "EQP-001",
    equipmentName: "Mesin Sanitizer & Dishwasher Conveyor 800-B",
    category: "Sterilizer & Mesin Cuci",
    checkDate: "2026-10-03 05:00 WIB",
    washMethod: "Sanitasi Suhu Panas 82°C",
    swabTestResult: "Lolos Uji Sanitasi",
    inspectorName: "Nita Octaviani, S.Si",
    notes: "Suhu rinse mencapai 83.5°C, kadar detergen food-grade terkalibrasi aman."
  },
  {
    id: "EQP-002",
    equipmentName: "Wadah Tray Bento Stainless SUS-304 (3.500 Set)",
    category: "Wadah Stainless Bento",
    checkDate: "2026-10-03 05:30 WIB",
    washMethod: "Sterilisasi UV",
    swabTestResult: "Lolos Uji Sanitasi",
    inspectorName: "Bambang Prasetyo",
    notes: "Setelah dikeringkan, tray dimasukkan ke lemari pemancar UV-C selama 25 menit."
  },
  {
    id: "EQP-003",
    equipmentName: "Set Pisau & Talenan HACCP Berkode 5 Warna",
    category: "Pisau & Talenan HACCP",
    checkDate: "2026-10-03 05:45 WIB",
    washMethod: "Disinfeksi Klorin Food Grade",
    swabTestResult: "Lolos Uji Sanitasi",
    inspectorName: "Chef Raden Wicaksono",
    notes: "Talenan merah (daging mentah), biru (ikan), hijau (sayuran), kuning (unggas), putih (siap santap)."
  },
  {
    id: "EQP-004",
    equipmentName: "Ketel Boiler Panci Sup Stainless 200 Liter",
    category: "Peralatan Masak Utama",
    checkDate: "2026-10-03 06:00 WIB",
    washMethod: "Pencucian 3 Bak Standar",
    swabTestResult: "Lolos Uji Sanitasi",
    inspectorName: "Nita Octaviani, S.Si",
    notes: "Bebas dari kerak minyak, sanitasi bilas air panas 75°C."
  }
];

export const INITIAL_WAREHOUSE_ITEMS: WarehouseItem[] = [
  {
    id: "ITM-01",
    code: "BP-001",
    name: "Beras Premium Slyp Super (Kemasan 50kg)",
    category: "Bahan Pokok",
    currentStock: 1250,
    unit: "kg",
    minStock: 500,
    location: "Gudang Kering - Palet A1-A3",
    supplier: "Koperasi Tani Padi Makmur Cianjur",
    lastRestocked: "2026-10-01"
  },
  {
    id: "ITM-02",
    code: "PH-002",
    name: "Dada Ayam Fillet Segar Tanpa Tulang",
    category: "Protein Hewani",
    currentStock: 340,
    unit: "kg",
    minStock: 150,
    location: "Cold Room Freezer 1 - Rak B2",
    supplier: "Rumah Potong Unggas Halal Bersertifikat",
    lastRestocked: "2026-10-03"
  },
  {
    id: "ITM-03",
    code: "PH-003",
    name: "Daging Sapi Giling Murni (Lean 90/10)",
    category: "Protein Hewani",
    currentStock: 180,
    unit: "kg",
    minStock: 80,
    location: "Cold Room Freezer 2 - Rak C1",
    supplier: "PT Sumber Daging Segar",
    lastRestocked: "2026-10-02"
  },
  {
    id: "ITM-04",
    code: "SB-004",
    name: "Wortel Segar Brastagi Grade A",
    category: "Sayuran & Buah",
    currentStock: 210,
    unit: "kg",
    minStock: 90,
    location: "Chiller Sayur - Bin 04",
    supplier: "Kelompok Tani Sayur Segar Cipanas",
    lastRestocked: "2026-10-03"
  },
  {
    id: "ITM-05",
    code: "SB-005",
    name: "Brokoli Segar Hijau Pilihan",
    category: "Sayuran & Buah",
    currentStock: 145,
    unit: "kg",
    minStock: 70,
    location: "Chiller Sayur - Bin 02",
    supplier: "Kelompok Tani Sayur Segar Cipanas",
    lastRestocked: "2026-10-03"
  },
  {
    id: "ITM-06",
    code: "BM-006",
    name: "Minyak Kelapa Sawit Higienis (Jerigen 20L)",
    category: "Bumbu & Minyak",
    currentStock: 480,
    unit: "liter",
    minStock: 200,
    location: "Gudang Kering - Rak D1",
    supplier: "Distributor Minyak Pangan Sehat",
    lastRestocked: "2026-09-28"
  },
  {
    id: "ITM-07",
    code: "LG-007",
    name: "Wadah Sekat Stainless Steel Bento SUS-304",
    category: "Wadah & Logistik",
    currentStock: 3650,
    unit: "pcs",
    minStock: 3500,
    location: "Ruang Steril Logistik - Rak E",
    supplier: "PT Logistik Pangan Nusantara",
    lastRestocked: "2026-09-15"
  }
];

export const INITIAL_FIFO_FEFO: FifoFefoRecord[] = [
  {
    id: "BAT-101",
    batchNumber: "B-261003-AYM-01",
    itemName: "Dada Ayam Fillet Segar",
    arrivalDate: "2026-10-03",
    expiryDate: "2026-10-05",
    quantity: 180,
    unit: "kg",
    storageLocation: "Chiller Daging Rak 1",
    fefoPriority: "Segera Pakai (FEFO #1)",
    currentStatus: "Siap Pakai"
  },
  {
    id: "BAT-102",
    batchNumber: "B-261002-TEL-03",
    itemName: "Telur Ayam Ras Butir Segar",
    arrivalDate: "2026-10-02",
    expiryDate: "2026-10-12",
    quantity: 4200,
    unit: "butir",
    storageLocation: "Chiller Telur Tray Susun",
    fefoPriority: "Normal (FEFO #2)",
    currentStatus: "Sedang Digunakan"
  },
  {
    id: "BAT-103",
    batchNumber: "B-261001-BRS-09",
    itemName: "Beras Premium Slyp Super",
    arrivalDate: "2026-10-01",
    expiryDate: "2027-04-01",
    quantity: 1250,
    unit: "kg",
    storageLocation: "Gudang Kering Palet A1",
    fefoPriority: "Aman (FEFO #3)",
    currentStatus: "Siap Pakai"
  },
  {
    id: "BAT-104",
    batchNumber: "B-261003-BYM-02",
    itemName: "Sayur Bayam Petik Segar",
    arrivalDate: "2026-10-03",
    expiryDate: "2026-10-04",
    quantity: 95,
    unit: "kg",
    storageLocation: "Chiller Sayuran Bin 1",
    fefoPriority: "Segera Pakai (FEFO #1)",
    currentStatus: "Sedang Digunakan"
  }
];

export const INITIAL_STOCK_OPNAME: StockOpnameRecord[] = [
  {
    id: "SOP-01",
    opnameDate: "2026-10-03",
    itemCode: "BP-001",
    itemName: "Beras Premium Slyp Super",
    systemQty: 1250,
    physicalQty: 1250,
    unit: "kg",
    discrepancy: 0,
    discrepancyReason: "Perhitungan karung utuh sesuai kartu stok.",
    auditorName: "Bambang Prasetyo",
    auditStatus: "Sesuai"
  },
  {
    id: "SOP-02",
    opnameDate: "2026-10-03",
    itemCode: "PH-002",
    itemName: "Dada Ayam Fillet Segar",
    systemQty: 342.5,
    physicalQty: 340.0,
    unit: "kg",
    discrepancy: -2.5,
    discrepancyReason: "Susut cairan es penimbangan (drip loss) 0.7%, masih dalam batas toleransi.",
    auditorName: "Bambang Prasetyo",
    auditStatus: "Toleransi Susut Wajar"
  },
  {
    id: "SOP-03",
    opnameDate: "2026-10-03",
    itemCode: "SB-004",
    itemName: "Wortel Segar Brastagi Grade A",
    systemQty: 214.0,
    physicalQty: 210.0,
    unit: "kg",
    discrepancy: -4.0,
    discrepancyReason: "Penyortiran sayur patah dan sortasi layu sebelum masuk chiller.",
    auditorName: "Nita Octaviani, S.Si",
    auditStatus: "Toleransi Susut Wajar"
  }
];

export const INITIAL_WATER_QUALITY: WaterQualityRecord[] = [
  {
    id: "WTR-001",
    inspectionDate: "2026-10-03 06:00 WIB",
    waterSource: "Unit Reverse Osmosis (Air Minum)",
    phLevel: 7.2,
    tdsPpm: 28,
    turbidityNtu: 0.15,
    smellTasteCheck: "Jernih, Tanpa Bau & Rasa",
    eColiStatus: "Negatif / Aman (0 CFU/100ml)",
    filterCondition: "Prima (Baru Diganti)",
    picTechnician: "Nita Octaviani, S.Si"
  },
  {
    id: "WTR-002",
    inspectionDate: "2026-10-03 06:10 WIB",
    waterSource: "Sumur Bor Filtrasi 3 Tahap",
    phLevel: 7.4,
    tdsPpm: 145,
    turbidityNtu: 1.10,
    smellTasteCheck: "Jernih, Tanpa Bau & Rasa",
    eColiStatus: "Negatif / Aman (0 CFU/100ml)",
    filterCondition: "Baik (Usia Pakai 45%)",
    picTechnician: "Agung Wira (Teknisi Dapur)"
  },
  {
    id: "WTR-003",
    inspectionDate: "2026-10-02 17:00 WIB",
    waterSource: "PDAM Terklorinasi",
    phLevel: 7.1,
    tdsPpm: 195,
    turbidityNtu: 1.45,
    smellTasteCheck: "Jernih, Tanpa Bau & Rasa",
    eColiStatus: "Negatif / Aman (0 CFU/100ml)",
    filterCondition: "Baik (Usia Pakai 45%)",
    picTechnician: "Nita Octaviani, S.Si"
  }
];

/* --- SECTION 6: INITIAL VIRTUAL FILE SYSTEM PUSAT DATA KEPALA DAPUR --- */
export const INITIAL_FILESYSTEM: VFileSystemItem[] = [
  // 1. Root Level Folders
  {
    id: "fld-root-gizi",
    name: "Arsip Ahli Gizi",
    type: "folder",
    parentId: null,
    path: "/Arsip Ahli Gizi",
    sizeBytes: 0,
    createdAt: "2026-10-01 07:00",
    updatedAt: "2026-10-03 16:30",
    createdByRole: "sistem",
    description: "Repositori terstruktur seluruh formulasi label gizi AKG, evaluasi sisa makanan (plate waste), dan audit suhu cold-storage.",
    isSystemProtected: true
  },
  {
    id: "fld-root-admin",
    name: "Arsip Administrasi Dapur",
    type: "folder",
    parentId: null,
    path: "/Arsip Administrasi Dapur",
    sizeBytes: 0,
    createdAt: "2026-10-01 07:00",
    updatedAt: "2026-10-03 16:45",
    createdByRole: "sistem",
    description: "Repositori logistik gudang, checklist sanitasi 3 bak, rotasi lot FIFO/FEFO, berita acara opname, dan pengujian air higienis.",
    isSystemProtected: true
  },
  {
    id: "fld-root-sop",
    name: "SOP & Regulasi BGN",
    type: "folder",
    parentId: null,
    path: "/SOP & Regulasi BGN",
    sizeBytes: 0,
    createdAt: "2026-10-01 08:00",
    updatedAt: "2026-10-01 08:00",
    createdByRole: "kepaladapur",
    description: "Dokumen regulasi resmi Badan Gizi Nasional, sertifikat akreditasi Halal & HACCP, dan surat keputusan penugasan personil.",
    isSystemProtected: false
  },
  {
    id: "fld-root-uploads",
    name: "Unggahan Berkas Umum",
    type: "folder",
    parentId: null,
    path: "/Unggahan Berkas Umum",
    sizeBytes: 0,
    createdAt: "2026-10-01 08:30",
    updatedAt: "2026-10-03 12:00",
    createdByRole: "kepaladapur",
    description: "Folder penyimpanan bebas untuk mengunggah dokumen PDF, Excel, gambar nota, atau berkas pendukung operasional dari perangkat.",
    isSystemProtected: false
  },

  // 2. Sub-folders Ahli Gizi
  {
    id: "fld-gizi-labels",
    name: "Label Gizi & AKG",
    type: "folder",
    parentId: "fld-root-gizi",
    path: "/Arsip Ahli Gizi/Label Gizi & AKG",
    sizeBytes: 0,
    createdAt: "2026-10-01 07:15",
    updatedAt: "2026-10-03 16:30",
    createdByRole: "ahligizi",
    description: "Arsip otomatis formulasi paket makanan siswa dan perhitungan nilai gizi.",
    isSystemProtected: true
  },
  {
    id: "fld-gizi-waste",
    name: "Monitoring Sampah",
    type: "folder",
    parentId: "fld-root-gizi",
    path: "/Arsip Ahli Gizi/Monitoring Sampah",
    sizeBytes: 0,
    createdAt: "2026-10-01 07:15",
    updatedAt: "2026-10-03 16:30",
    createdByRole: "ahligizi",
    description: "Arsip log timbangan limbah organik, plate waste, dan penyaluran maggot.",
    isSystemProtected: true
  },
  {
    id: "fld-gizi-temp",
    name: "Suhu & Cold Storage",
    type: "folder",
    parentId: "fld-root-gizi",
    path: "/Arsip Ahli Gizi/Suhu & Cold Storage",
    sizeBytes: 0,
    createdAt: "2026-10-01 07:15",
    updatedAt: "2026-10-03 16:30",
    createdByRole: "ahligizi",
    description: "Arsip audit suhu termal chiller, freezer, dan holding area.",
    isSystemProtected: true
  },

  // 3. Sub-folders Admin Dapur
  {
    id: "fld-admin-hygiene",
    name: "Kebersihan Peralatan",
    type: "folder",
    parentId: "fld-root-admin",
    path: "/Arsip Administrasi Dapur/Kebersihan Peralatan",
    sizeBytes: 0,
    createdAt: "2026-10-01 07:30",
    updatedAt: "2026-10-03 16:45",
    createdByRole: "admin",
    description: "Arsip verifikasi sanitasi alat masak, bento SUS-304, dan talenan HACCP.",
    isSystemProtected: true
  },
  {
    id: "fld-admin-warehouse",
    name: "Gudang & Inventori",
    type: "folder",
    parentId: "fld-root-admin",
    path: "/Arsip Administrasi Dapur/Gudang & Inventori",
    sizeBytes: 0,
    createdAt: "2026-10-01 07:30",
    updatedAt: "2026-10-03 16:45",
    createdByRole: "admin",
    description: "Arsip kartu stok komoditas bahan pangan dan peringatan stok cadangan.",
    isSystemProtected: true
  },
  {
    id: "fld-admin-fifo",
    name: "FIFO FEFO Rotasi",
    type: "folder",
    parentId: "fld-root-admin",
    path: "/Arsip Administrasi Dapur/FIFO FEFO Rotasi",
    sizeBytes: 0,
    createdAt: "2026-10-01 07:30",
    updatedAt: "2026-10-03 16:45",
    createdByRole: "admin",
    description: "Arsip nomor lot kedatangan bahan pangan dan prioritas pemakaian kedaluwarsa.",
    isSystemProtected: true
  },
  {
    id: "fld-admin-opname",
    name: "Stok Opname Fisik",
    type: "folder",
    parentId: "fld-root-admin",
    path: "/Arsip Administrasi Dapur/Stok Opname Fisik",
    sizeBytes: 0,
    createdAt: "2026-10-01 07:30",
    updatedAt: "2026-10-03 16:45",
    createdByRole: "admin",
    description: "Arsip berita acara rekonsiliasi audit fisik saldo gudang.",
    isSystemProtected: true
  },
  {
    id: "fld-admin-water",
    name: "Sumber & Kualitas Air",
    type: "folder",
    parentId: "fld-root-admin",
    path: "/Arsip Administrasi Dapur/Sumber & Kualitas Air",
    sizeBytes: 0,
    createdAt: "2026-10-01 07:30",
    updatedAt: "2026-10-03 16:45",
    createdByRole: "admin",
    description: "Arsip laporan uji laboratorium air RO, pH, TDS, dan bakteriologis E. coli.",
    isSystemProtected: true
  },

  // 4. Sample Seed Files in SOP folder
  {
    id: "file-sop-01",
    name: "Pedoman_Teknis_SPPG_Badan_Gizi_Nasional_2026.pdf",
    type: "pdf",
    parentId: "fld-root-sop",
    path: "/SOP & Regulasi BGN/Pedoman_Teknis_SPPG_Badan_Gizi_Nasional_2026.pdf",
    sizeBytes: 2450000,
    createdAt: "2026-10-01 09:00",
    updatedAt: "2026-10-01 09:00",
    createdByRole: "kepaladapur",
    mimeType: "application/pdf",
    description: "Panduan standar nasional tata kelola satuan pelayanan pemenuhan gizi (SPPG) Republik Indonesia.",
    content: "DOKUMEN RESMI BGN RI: Standar Pelayanan Pemenuhan Gizi Sekolah (SPPG). Menetapkan syarat higienitas minimal, alur zonasi satu arah (one-way flow), dan kecukupan energi harian 30-35% AKG."
  },
  {
    id: "file-sop-02",
    name: "Sertifikat_Akreditasi_HACCP_Codex_Alimentarius.pdf",
    type: "pdf",
    parentId: "fld-root-sop",
    path: "/SOP & Regulasi BGN/Sertifikat_Akreditasi_HACCP_Codex_Alimentarius.pdf",
    sizeBytes: 1180000,
    createdAt: "2026-10-01 09:15",
    updatedAt: "2026-10-01 09:15",
    createdByRole: "kepaladapur",
    mimeType: "application/pdf",
    description: "Sertifikasi Hazard Analysis Critical Control Point untuk fasilitas dapur sentral.",
    content: "SERTIFIKAT KELAYAKAN HIGIENIS SANITASI JASABOGA: Diberikan kepada Sentral Dapur MBG Nusantara 01 dengan akreditasi Grade A (Sangat Baik)."
  },
  {
    id: "file-up-01",
    name: "Catatan_Rapat_Koordinasi_Kepala_Sekolah_Mitra.docx",
    type: "document",
    parentId: "fld-root-uploads",
    path: "/Unggahan Berkas Umum/Catatan_Rapat_Koordinasi_Kepala_Sekolah_Mitra.docx",
    sizeBytes: 420000,
    createdAt: "2026-10-02 11:30",
    updatedAt: "2026-10-02 11:30",
    createdByRole: "kepaladapur",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    description: "Notulensi rapat bulanan mengenai jadwal distribusi makan siang dan feedback penerimaan siswa.",
    content: "NOTULENSI RAPAT KOORDINASI SPPG: 14 Kepala Sekolah Mitra menyetujui jadwal tiba food-truck pukul 10.15 WIB. Menu ikan gurame saus tomat mendapatkan apresiasi positif dari siswa kelas 1-3."
  }
];
