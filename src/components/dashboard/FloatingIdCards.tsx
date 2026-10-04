/**
 * ============================================================================
 * FLOATING ID CARDS COMPONENT - DAPUR MBG
 * ============================================================================
 * Penanda: Komponen interaktif kartu identitas kerja mengambang (Floating ID Card)
 * untuk 3 otoritas: Kepala Dapur (Pusat Data), Ahli Gizi, dan Admin Dapur.
 * Mendukung tampilan estetik penuh pada Tema Terang (Light) dan Gelap (Dark).
 * ============================================================================
 */

import React from 'react';
import { AppView, ThemeMode } from '../../types';
import { 
  HeartPulse, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  QrCode, 
  Cpu, 
  CheckCircle2, 
  FolderLock, 
  Lock 
} from 'lucide-react';

interface FloatingIdCardsProps {
  onSelectRole: (role: AppView) => void;
  authenticatedRoles: {
    kepaladapur: boolean;
    ahligizi: boolean;
    admin: boolean;
  };
  theme: ThemeMode;
}

export const FloatingIdCards: React.FC<FloatingIdCardsProps> = ({
  onSelectRole,
  authenticatedRoles,
  theme,
}) => {
  const isLight = theme === 'light';

  return (
    <section 
      id="akses-id-card" 
      className={`py-20 border-y relative overflow-hidden transition-colors ${
        isLight ? 'bg-slate-100/80 border-slate-200 text-slate-900' : 'bg-neutral-900 border-neutral-800 text-white'
      }`}
    >
      
      {/* Background radial ambient lights */}
      <div className="absolute top-1/4 left-1/6 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/6 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Pengantar */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-3 ${
            isLight 
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
              : 'bg-emerald-950/80 border border-emerald-800/80 text-emerald-400'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gerbang Akses Otoritas Kerja Terotentikasi</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Pilih ID Card untuk Beralih Ruang Kerja
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-neutral-400'
          }`}>
            Klik kartu identitas resmi di bawah ini untuk mengakses ruang kerja masing-masing petugas: Kepala Dapur (Pusat Data Dokumen), Ahli Gizi, atau Administrasi Dapur.
          </p>
        </div>

        {/* Container Kartu Mengambang (3 Kolom pada Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 max-w-7xl mx-auto items-stretch">
          
          {/* ================================================================= */}
          {/* KARTU 1: ID CARD KEPALA DAPUR (FLOATING C) */}
          {/* ================================================================= */}
          <div className="relative group cursor-pointer animate-float-c flex flex-col" onClick={() => onSelectRole('kepaladapur')}>
            
            {/* Lanyard Strap Visual */}
            <div className="flex flex-col items-center">
              <div className={`w-6 h-10 rounded-t-sm shadow-md border-x flex items-center justify-center ${
                isLight 
                  ? 'bg-gradient-to-b from-slate-400 to-amber-600 border-slate-300' 
                  : 'bg-gradient-to-b from-neutral-800 to-amber-700 border-neutral-700'
              }`}>
                <div className="w-1.5 h-full bg-amber-400/50" />
              </div>
              <div className={`w-10 h-3 rounded-sm shadow-inner border -mt-1 z-20 flex items-center justify-center ${
                isLight ? 'bg-slate-300 border-slate-400' : 'bg-neutral-400 border-neutral-300'
              }`}>
                <div className="w-4 h-1 bg-slate-600 rounded-full" />
              </div>
              <div className={`w-8 h-2 rounded-b shadow-sm -mt-0.5 z-20 ${
                isLight ? 'bg-slate-200' : 'bg-neutral-300'
              }`} />
            </div>

            {/* Badge Case Body */}
            <div className={`relative rounded-2xl p-5 sm:p-6 border-2 shadow-2xl transition-all duration-300 backdrop-blur-xl flex-1 flex flex-col justify-between ${
              isLight
                ? 'bg-white border-amber-400 shadow-amber-900/10 group-hover:border-amber-500 group-hover:shadow-amber-500/20 group-hover:-translate-y-2'
                : 'bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 border-amber-500/40 shadow-amber-950/60 group-hover:border-amber-400 group-hover:shadow-amber-500/20 group-hover:-translate-y-2'
            }`}>
              
              <div>
                <div className={`w-12 h-2.5 mx-auto -mt-3 mb-4 rounded-full border ${
                  isLight ? 'bg-slate-200 border-slate-300' : 'bg-neutral-950 border-neutral-700'
                }`} />

                {/* Card Header */}
                <div className={`flex items-center justify-between border-b pb-3 mb-4 ${
                  isLight ? 'border-slate-200' : 'border-neutral-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${
                      isLight 
                        ? 'bg-amber-100 border border-amber-300 text-amber-700' 
                        : 'bg-amber-600/30 border border-amber-500/40 text-amber-400'
                    }`}>
                      <FolderLock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-[9px] tracking-wider uppercase font-bold ${
                        isLight ? 'text-amber-700' : 'text-amber-400'
                      }`}>
                        BADAN GIZI NASIONAL
                      </div>
                      <div className={`text-[11px] font-bold ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        SPPG Dapur MBG
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                      isLight 
                        ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      KEPALA SPPG
                    </span>
                  </div>
                </div>

                {/* Photo & Identity Detail */}
                <div className="flex gap-3.5 items-center mb-4">
                  <div className="relative">
                    <div className="w-20 h-24 rounded-xl overflow-hidden border-2 border-amber-500 shadow-md bg-neutral-800 shrink-0">
                      <img
                        src="/src/assets/images/avatar_kepala_dapur_1791074594752.jpg"
                        alt="Fajar Adi, S.T, M.M"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border flex items-center justify-center shadow ${
                      isLight ? 'bg-white border-amber-500 text-amber-600' : 'bg-neutral-900 border-amber-400 text-amber-400'
                    }`}>
                      <Cpu className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className={`text-[10px] font-mono tracking-wider uppercase font-bold ${
                      isLight ? 'text-amber-700' : 'text-amber-400'
                    }`}>
                      KEPALA SENTRAL DAPUR
                    </div>
                    <h3 className={`text-base font-bold leading-tight transition-colors ${
                      isLight ? 'text-slate-900 group-hover:text-amber-700' : 'text-white group-hover:text-amber-300'
                    }`}>
                      Fajar Adi, S.T, M.M
                    </h3>
                    <div className={`text-[11px] ${isLight ? 'text-slate-600 font-medium' : 'text-neutral-400'}`}>
                      Penanggung Jawab SPPG
                    </div>
                    <div className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                      NIP: 19820518.2024.001
                    </div>
                  </div>
                </div>

                {/* Sub-menu Badges */}
                <div className={`rounded-xl p-3 space-y-1.5 mb-4 border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950/80 border-neutral-800/80'
                }`}>
                  <div className={`text-[9px] uppercase tracking-wider font-bold ${
                    isLight ? 'text-slate-600' : 'text-neutral-400'
                  }`}>
                    Kewenangan & Pusat Data:
                  </div>
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded border ${
                      isLight 
                        ? 'bg-amber-50 text-amber-900 border-amber-200' 
                        : 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                    }`}>
                      <CheckCircle2 className={`w-3 h-3 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
                      Pusat Data Folders
                    </span>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded border ${
                      isLight 
                        ? 'bg-amber-50 text-amber-900 border-amber-200' 
                        : 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                    }`}>
                      <CheckCircle2 className={`w-3 h-3 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
                      Ubah/Salin/Potong/Hapus
                    </span>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded border ${
                      isLight 
                        ? 'bg-amber-50 text-amber-900 border-amber-200' 
                        : 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                    }`}>
                      <CheckCircle2 className={`w-3 h-3 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
                      Lihat Isi & Upload File
                    </span>
                  </div>
                </div>
              </div>

              {/* Barcode & Security Hologram Footer */}
              <div className={`flex items-center justify-between pt-2 border-t ${
                isLight ? 'border-slate-200' : 'border-neutral-800/60'
              }`}>
                <div className="flex items-center gap-2">
                  <QrCode className={`w-6 h-6 transition-colors ${
                    isLight ? 'text-slate-700 group-hover:text-amber-600' : 'text-neutral-400 group-hover:text-amber-400'
                  }`} />
                  <div className="space-y-0.5">
                    <div className={`h-1.5 w-20 rounded-sm ${isLight ? 'bg-slate-300' : 'bg-neutral-700/80'}`} />
                    <div className={`text-[8px] font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                      BGN-DIRECTOR-001
                    </div>
                  </div>
                </div>
                
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-950 bg-amber-400 group-hover:bg-amber-300 shadow-md shadow-amber-950/20 transition-colors"
                >
                  {authenticatedRoles.kepaladapur ? (
                    <>
                      <span>Masuk Pusat Data</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3 text-neutral-950" />
                      <span>Login Kepala</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* ================================================================= */}
          {/* KARTU 2: ID CARD AHLI GIZI (FLOATING A) */}
          {/* ================================================================= */}
          <div className="relative group cursor-pointer animate-float-a flex flex-col" onClick={() => onSelectRole('ahligizi')}>
            
            {/* Lanyard Strap Visual */}
            <div className="flex flex-col items-center">
              <div className={`w-6 h-10 rounded-t-sm shadow-md border-x flex items-center justify-center ${
                isLight 
                  ? 'bg-gradient-to-b from-slate-400 to-emerald-600 border-slate-300' 
                  : 'bg-gradient-to-b from-neutral-800 to-emerald-700 border-neutral-700'
              }`}>
                <div className="w-1.5 h-full bg-emerald-400/50" />
              </div>
              <div className={`w-10 h-3 rounded-sm shadow-inner border -mt-1 z-20 flex items-center justify-center ${
                isLight ? 'bg-slate-300 border-slate-400' : 'bg-neutral-400 border-neutral-300'
              }`}>
                <div className="w-4 h-1 bg-slate-600 rounded-full" />
              </div>
              <div className={`w-8 h-2 rounded-b shadow-sm -mt-0.5 z-20 ${
                isLight ? 'bg-slate-200' : 'bg-neutral-300'
              }`} />
            </div>

            {/* Badge Case Body */}
            <div className={`relative rounded-2xl p-5 sm:p-6 border-2 shadow-2xl transition-all duration-300 backdrop-blur-xl flex-1 flex flex-col justify-between ${
              isLight
                ? 'bg-white border-emerald-400 shadow-emerald-900/10 group-hover:border-emerald-500 group-hover:shadow-emerald-500/20 group-hover:-translate-y-2'
                : 'bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 border-emerald-500/40 shadow-emerald-950/60 group-hover:border-emerald-400 group-hover:shadow-emerald-500/20 group-hover:-translate-y-2'
            }`}>
              
              <div>
                <div className={`w-12 h-2.5 mx-auto -mt-3 mb-4 rounded-full border ${
                  isLight ? 'bg-slate-200 border-slate-300' : 'bg-neutral-950 border-neutral-700'
                }`} />

                {/* Card Header */}
                <div className={`flex items-center justify-between border-b pb-3 mb-4 ${
                  isLight ? 'border-slate-200' : 'border-neutral-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${
                      isLight 
                        ? 'bg-emerald-100 border border-emerald-300 text-emerald-700' 
                        : 'bg-emerald-600/30 border border-emerald-500/40 text-emerald-400'
                    }`}>
                      <HeartPulse className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-[9px] tracking-wider uppercase font-bold ${
                        isLight ? 'text-emerald-700' : 'text-emerald-400'
                      }`}>
                        BADAN GIZI NASIONAL
                      </div>
                      <div className={`text-[11px] font-bold ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        SPPG Dapur MBG
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                      isLight 
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      DIETITIAN
                    </span>
                  </div>
                </div>

                {/* Photo & Identity Detail */}
                <div className="flex gap-3.5 items-center mb-4">
                  <div className="relative">
                    <div className="w-20 h-24 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-md bg-neutral-800 shrink-0">
                      <img
                        src="/src/assets/images/avatar_ahli_gizi_1791073453799.jpg"
                        alt="dr. Sarah Anindita, S.Gz"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border flex items-center justify-center shadow ${
                      isLight ? 'bg-white border-emerald-500 text-emerald-600' : 'bg-neutral-900 border-emerald-400 text-emerald-400'
                    }`}>
                      <Cpu className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className={`text-[10px] font-mono tracking-wider uppercase font-bold ${
                      isLight ? 'text-emerald-700' : 'text-emerald-400'
                    }`}>
                      AHLI GIZI & MUTU
                    </div>
                    <h3 className={`text-base font-bold leading-tight transition-colors ${
                      isLight ? 'text-slate-900 group-hover:text-emerald-700' : 'text-white group-hover:text-emerald-300'
                    }`}>
                      dr. Sarah Anindita
                    </h3>
                    <div className={`text-[11px] ${isLight ? 'text-slate-600 font-medium' : 'text-neutral-400'}`}>
                      Formulasi Menu & AKG
                    </div>
                    <div className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                      STRGZ: 3174.0882.2023
                    </div>
                  </div>
                </div>

                {/* Sub-menu Badges */}
                <div className={`rounded-xl p-3 space-y-1.5 mb-4 border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950/80 border-neutral-800/80'
                }`}>
                  <div className={`text-[9px] uppercase tracking-wider font-bold ${
                    isLight ? 'text-slate-600' : 'text-neutral-400'
                  }`}>
                    Cakupan Formulir Ahli Gizi:
                  </div>
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded border ${
                      isLight 
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
                        : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                    }`}>
                      <CheckCircle2 className={`w-3 h-3 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                      Label Gizi AKG
                    </span>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded border ${
                      isLight 
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
                        : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                    }`}>
                      <CheckCircle2 className={`w-3 h-3 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                      Log Sampah Organik
                    </span>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded border ${
                      isLight 
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
                        : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                    }`}>
                      <CheckCircle2 className={`w-3 h-3 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                      Suhu Ruang & Chiller
                    </span>
                  </div>
                </div>
              </div>

              {/* Barcode & Security Hologram Footer */}
              <div className={`flex items-center justify-between pt-2 border-t ${
                isLight ? 'border-slate-200' : 'border-neutral-800/60'
              }`}>
                <div className="flex items-center gap-2">
                  <QrCode className={`w-6 h-6 transition-colors ${
                    isLight ? 'text-slate-700 group-hover:text-emerald-600' : 'text-neutral-400 group-hover:text-emerald-400'
                  }`} />
                  <div className="space-y-0.5">
                    <div className={`h-1.5 w-20 rounded-sm ${isLight ? 'bg-slate-300' : 'bg-neutral-700/80'}`} />
                    <div className={`text-[8px] font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                      BGN-NUTRI-AUTH
                    </div>
                  </div>
                </div>
                
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 group-hover:bg-emerald-500 shadow-md shadow-emerald-950/20 transition-colors"
                >
                  {authenticatedRoles.ahligizi ? (
                    <>
                      <span>Buka Menu Gizi</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3 text-white" />
                      <span>Login Gizi</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* ================================================================= */}
          {/* KARTU 3: ID CARD ADMIN DAPUR (FLOATING B) */}
          {/* ================================================================= */}
          <div className="relative group cursor-pointer animate-float-b flex flex-col" onClick={() => onSelectRole('admin')}>
            
            {/* Lanyard Strap Visual */}
            <div className="flex flex-col items-center">
              <div className={`w-6 h-10 rounded-t-sm shadow-md border-x flex items-center justify-center ${
                isLight 
                  ? 'bg-gradient-to-b from-slate-400 to-blue-600 border-slate-300' 
                  : 'bg-gradient-to-b from-neutral-800 to-blue-700 border-neutral-700'
              }`}>
                <div className="w-1.5 h-full bg-blue-400/50" />
              </div>
              <div className={`w-10 h-3 rounded-sm shadow-inner border -mt-1 z-20 flex items-center justify-center ${
                isLight ? 'bg-slate-300 border-slate-400' : 'bg-neutral-400 border-neutral-300'
              }`}>
                <div className="w-4 h-1 bg-slate-600 rounded-full" />
              </div>
              <div className={`w-8 h-2 rounded-b shadow-sm -mt-0.5 z-20 ${
                isLight ? 'bg-slate-200' : 'bg-neutral-300'
              }`} />
            </div>

            {/* Badge Case Body */}
            <div className={`relative rounded-2xl p-5 sm:p-6 border-2 shadow-2xl transition-all duration-300 backdrop-blur-xl flex-1 flex flex-col justify-between ${
              isLight
                ? 'bg-white border-blue-400 shadow-blue-900/10 group-hover:border-blue-500 group-hover:shadow-blue-500/20 group-hover:-translate-y-2'
                : 'bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 border-blue-500/40 shadow-blue-950/60 group-hover:border-blue-400 group-hover:shadow-blue-500/20 group-hover:-translate-y-2'
            }`}>
              
              <div>
                <div className={`w-12 h-2.5 mx-auto -mt-3 mb-4 rounded-full border ${
                  isLight ? 'bg-slate-200 border-slate-300' : 'bg-neutral-950 border-neutral-700'
                }`} />

                {/* Card Header */}
                <div className={`flex items-center justify-between border-b pb-3 mb-4 ${
                  isLight ? 'border-slate-200' : 'border-neutral-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${
                      isLight 
                        ? 'bg-blue-100 border border-blue-300 text-blue-700' 
                        : 'bg-blue-600/30 border border-blue-500/40 text-blue-400'
                    }`}>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-[9px] tracking-wider uppercase font-bold ${
                        isLight ? 'text-blue-700' : 'text-blue-400'
                      }`}>
                        BADAN GIZI NASIONAL
                      </div>
                      <div className={`text-[11px] font-bold ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        SPPG Dapur MBG
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                      isLight 
                        ? 'bg-blue-100 text-blue-900 border border-blue-300' 
                        : 'bg-blue-950 text-blue-300 border border-blue-800'
                    }`}>
                      ADMIN & GUDANG
                    </span>
                  </div>
                </div>

                {/* Photo & Identity Detail */}
                <div className="flex gap-3.5 items-center mb-4">
                  <div className="relative">
                    <div className="w-20 h-24 rounded-xl overflow-hidden border-2 border-blue-500 shadow-md bg-neutral-800 shrink-0">
                      <img
                        src="/src/assets/images/avatar_admin_dapur_1791073465864.jpg"
                        alt="Bambang Prasetyo, S.E"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border flex items-center justify-center shadow ${
                      isLight ? 'bg-white border-blue-500 text-blue-600' : 'bg-neutral-900 border-blue-400 text-blue-400'
                    }`}>
                      <Cpu className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className={`text-[10px] font-mono tracking-wider uppercase font-bold ${
                      isLight ? 'text-blue-700' : 'text-blue-400'
                    }`}>
                      KOORDINATOR ADMIN & GUDANG
                    </div>
                    <h3 className={`text-base font-bold leading-tight transition-colors ${
                      isLight ? 'text-slate-900 group-hover:text-blue-700' : 'text-white group-hover:text-blue-300'
                    }`}>
                      Bambang Prasetyo, S.E
                    </h3>
                    <div className={`text-[11px] ${isLight ? 'text-slate-600 font-medium' : 'text-neutral-400'}`}>
                      FIFO/FEFO & Sanitasi Logistik
                    </div>
                    <div className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                      NIP: ADM-MBG/2024/044
                    </div>
                  </div>
                </div>

                {/* Sub-menu Badges */}
                <div className={`rounded-xl p-3 space-y-1.5 mb-4 border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950/80 border-neutral-800/80'
                }`}>
                  <div className={`text-[9px] uppercase tracking-wider font-bold ${
                    isLight ? 'text-slate-600' : 'text-neutral-400'
                  }`}>
                    Cakupan Formulir Admin:
                  </div>
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded border ${
                      isLight 
                        ? 'bg-blue-50 text-blue-900 border-blue-200' 
                        : 'bg-blue-950/60 text-blue-300 border border-blue-800/60'
                    }`}>
                      <CheckCircle2 className={`w-3 h-3 ${isLight ? 'text-blue-600' : 'text-blue-400'}`} />
                      Sanitasi Alat
                    </span>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded border ${
                      isLight 
                        ? 'bg-blue-50 text-blue-900 border-blue-200' 
                        : 'bg-blue-950/60 text-blue-300 border border-blue-800/60'
                    }`}>
                      <CheckCircle2 className={`w-3 h-3 ${isLight ? 'text-blue-600' : 'text-blue-400'}`} />
                      Gudang & FIFO/FEFO
                    </span>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded border ${
                      isLight 
                        ? 'bg-blue-50 text-blue-900 border-blue-200' 
                        : 'bg-blue-950/60 text-blue-300 border border-blue-800/60'
                    }`}>
                      <CheckCircle2 className={`w-3 h-3 ${isLight ? 'text-blue-600' : 'text-blue-400'}`} />
                      Opname & Uji Air
                    </span>
                  </div>
                </div>
              </div>

              {/* Barcode & Security Hologram Footer */}
              <div className={`flex items-center justify-between pt-2 border-t ${
                isLight ? 'border-slate-200' : 'border-neutral-800/60'
              }`}>
                <div className="flex items-center gap-2">
                  <QrCode className={`w-6 h-6 transition-colors ${
                    isLight ? 'text-slate-700 group-hover:text-blue-600' : 'text-neutral-400 group-hover:text-blue-400'
                  }`} />
                  <div className="space-y-0.5">
                    <div className={`h-1.5 w-20 rounded-sm ${isLight ? 'bg-slate-300' : 'bg-neutral-700/80'}`} />
                    <div className={`text-[8px] font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                      BGN-ADMIN-AUTH
                    </div>
                  </div>
                </div>
                
                <button
                  type="button"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 group-hover:bg-blue-500 shadow-md shadow-blue-950/20 transition-colors"
                >
                  {authenticatedRoles.admin ? (
                    <>
                      <span>Buka Menu Admin</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3 text-white" />
                      <span>Login Admin</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
