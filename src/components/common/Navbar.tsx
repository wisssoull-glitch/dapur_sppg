/**
 * ============================================================================
 * NAVBAR COMPONENT - DAPUR MBG
 * ============================================================================
 * Penanda: Navigasi utama dengan 3-Zone Top Bar Contract.
 * Mendukung navigasi Portfolio Dashboard, Portal Kepala Dapur (Pusat Data),
 * Portal Ahli Gizi, Portal Admin, serta Pengalih Tema Terang/Gelap (Light/Dark).
 * ============================================================================
 */

import React from 'react';
import { AppView, AhliGiziTab, AdminTab, ThemeMode, AuthUser } from '../../types';
import { 
  ChefHat, 
  ArrowLeft, 
  ShieldCheck, 
  HeartPulse, 
  FolderLock, 
  Sparkles, 
  Sun, 
  Moon, 
  LogOut, 
  User 
} from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  ahliGiziTab: AhliGiziTab;
  setAhliGiziTab: (tab: AhliGiziTab) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  activeUser: AuthUser | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  ahliGiziTab,
  setAhliGiziTab,
  adminTab,
  setAdminTab,
  theme,
  setTheme,
  activeUser,
  onLogout,
}) => {
  const isLight = theme === 'light';

  const toggleTheme = () => {
    setTheme(isLight ? 'dark' : 'light');
  };

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors ${
      isLight 
        ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm' 
        : 'bg-neutral-950/90 border-neutral-800 text-neutral-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* --- ZONE 1: BRAND TITLE WORDMARK --- */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-emerald-950/20 group-hover:scale-105 transition-transform">
              <ChefHat className="w-5 h-5 text-neutral-950" />
            </div>
            <div>
              <span className={`font-display font-extrabold text-lg tracking-tight block ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                DAPUR MBG
              </span>
              <span className={`text-[11px] block tracking-wider uppercase font-semibold ${
                isLight ? 'text-slate-500' : 'text-neutral-400'
              }`}>
                Sentral Operasional & Gizi
              </span>
            </div>
          </button>
        </div>

        {/* --- ZONE 2: CONTEXTUAL NAVIGATION LINKS --- */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {currentView === 'dashboard' ? (
            <>
              <a
                href="#profil"
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  isLight 
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' 
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                Profil Dapur
              </a>
              <a
                href="#visi-misi"
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  isLight 
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' 
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                Visi & Misi
              </a>
              <a
                href="#organisasi"
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  isLight 
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' 
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                Struktur Organisasi
              </a>
              <a
                href="#kontak"
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  isLight 
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' 
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                Kontak
              </a>
              <a
                href="#akses-id-card"
                className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 font-bold whitespace-nowrap ${
                  isLight 
                    ? 'text-amber-700 hover:text-amber-800 hover:bg-amber-50' 
                    : 'text-amber-400 hover:text-amber-300 hover:bg-amber-950/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                ID Card Akses
              </a>
            </>
          ) : currentView === 'kepaladapur' ? (
            <div className={`flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg border ${
              isLight 
                ? 'text-amber-900 bg-amber-50 border-amber-200' 
                : 'text-amber-400 bg-amber-950/50 border-amber-800/60'
            }`}>
              <FolderLock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Pusat Data Dokumen & Arsip SPPG (Otoritas Kepala Dapur)</span>
            </div>
          ) : currentView === 'ahligizi' ? (
            <div className={`flex items-center gap-1 p-1 rounded-lg border ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <button
                onClick={() => setAhliGiziTab('label-gizi')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  ahliGiziTab === 'label-gizi'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Label Gizi
              </button>
              <button
                onClick={() => setAhliGiziTab('sampah')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  ahliGiziTab === 'sampah'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Monitoring Sampah
              </button>
              <button
                onClick={() => setAhliGiziTab('suhu-ruangan')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  ahliGiziTab === 'suhu-ruangan'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Suhu Ruangan
              </button>
            </div>
          ) : (
            <div className={`flex items-center gap-1 p-1 rounded-lg border overflow-x-auto max-w-xl ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <button
                onClick={() => setAdminTab('kebersihan')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  adminTab === 'kebersihan'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Kebersihan Peralatan
              </button>
              <button
                onClick={() => setAdminTab('gudang')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  adminTab === 'gudang'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Gudang Bahan
              </button>
              <button
                onClick={() => setAdminTab('fifo-fefo')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  adminTab === 'fifo-fefo'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-neutral-400 hover:text-white'
                }`}
              >
                FIFO / FEFO
              </button>
              <button
                onClick={() => setAdminTab('stok-opname')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  adminTab === 'stok-opname'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Stok Opname
              </button>
              <button
                onClick={() => setAdminTab('kondisi-air')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  adminTab === 'kondisi-air'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Kondisi Air
              </button>
            </div>
          )}
        </nav>

        {/* --- ZONE 3: ACTIONS, THEME SWITCHER & USER STATUS --- */}
        <div className="flex items-center gap-2.5">
          
          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition-colors border cursor-pointer ${
              isLight 
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800' 
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white'
            }`}
            title={isLight ? 'Beralih ke Tema Gelap' : 'Beralih ke Tema Terang'}
          >
            {isLight ? (
              <Moon className="w-4 h-4 text-blue-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {currentView === 'dashboard' ? (
            <div className="flex items-center gap-2">
              <a
                href="#akses-id-card"
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors whitespace-nowrap ${
                  isLight 
                    ? 'text-amber-800 bg-amber-50 border-amber-300 hover:bg-amber-100' 
                    : 'text-amber-300 bg-amber-950/60 border-amber-800/80 hover:bg-amber-900/60'
                }`}
              >
                <FolderLock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Pusat Data
              </a>

              <a
                href="#akses-id-card"
                className="px-3.5 py-1.5 text-xs font-bold text-neutral-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors shadow-sm whitespace-nowrap"
              >
                ID Card Masuk
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {activeUser && (
                <div className={`hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs ${
                  isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-neutral-900 border-neutral-800 text-neutral-200'
                }`}>
                  <User className="w-3.5 h-3.5 text-slate-500 dark:text-neutral-400" />
                  <span className="font-bold line-clamp-1">{activeUser.displayName.split(',')[0]}</span>
                  <button
                    onClick={onLogout}
                    className="ml-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    title="Keluar Sesi (Logout)"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <button
                onClick={() => setCurrentView('dashboard')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                  isLight 
                    ? 'text-slate-800 bg-slate-100 hover:bg-slate-200 border-slate-300' 
                    : 'text-white bg-neutral-800 hover:bg-neutral-700 border-neutral-700'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Portofolio</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
