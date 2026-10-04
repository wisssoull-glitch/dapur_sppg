/**
 * ============================================================================
 * HERO SECTION COMPONENT - DAPUR MBG PORTOFOLIO
 * ============================================================================
 * Penanda: Header portofolio visual interaktif Dapur MBG
 * Memadukan fotografi resolusi tinggi, metrik operasional terstandarisasi,
 * dan ajakan tindakan untuk mengakses ID Card petugas.
 * ============================================================================
 */

import React from 'react';
import { ChefHat, ArrowDown, Award, Users, Utensils, ShieldCheck, Sparkles } from 'lucide-react';
import { KITCHEN_PROFILE } from '../../data/initialData';
import { ThemeMode } from '../../types';

interface HeroSectionProps {
  onScrollToCards: () => void;
  theme: ThemeMode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToCards, theme }) => {
  const isLight = theme === 'light';

  return (
    <section className={`relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden transition-colors ${
      isLight ? 'bg-white text-slate-900' : 'bg-neutral-950 text-white'
    }`}>
      
      {/* Background Subtle Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs ${
            isLight 
              ? 'bg-slate-100 border border-slate-200 text-slate-700' 
              : 'bg-neutral-900 border border-neutral-800 text-neutral-300'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Unit SPPG Resmi BGN No. {KITCHEN_PROFILE.codeSPPG}</span>
          </div>
          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold ${
            isLight 
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
              : 'bg-emerald-950/60 border border-emerald-800/80 text-emerald-400'
          }`}>
            <Award className="w-3.5 h-3.5" />
            <span>Sertifikasi HACCP & ISO 22000</span>
          </div>
        </div>

        {/* Split Grid: Editorial Typography + Showcase Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Sisi Kiri: Headline & Story */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.08] ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Sentral Produksi <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                Makan Bergizi Gratis
              </span> <br />
              Berstandar Higienis Tinggi
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl font-normal ${
              isLight ? 'text-slate-600' : 'text-neutral-300'
            }`}>
              Menjamin pemenuhan Angka Kecukupan Gizi (AKG) ribuan anak sekolah setiap hari. Dikelola dengan disiplin rantai dingin, tata kelola pergudangan FIFO/FEFO teruji, dan integritas pengawasan gizi transparan.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onScrollToCards}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-500 text-neutral-950 hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Pilih ID Card Masuk Sistem</span>
              </button>
              
              <a
                href="#profil"
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm transition-colors ${
                  isLight 
                    ? 'text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200' 
                    : 'text-neutral-200 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800'
                }`}
              >
                <span>Pelajari Fasilitas Dapur</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>

            {/* Key Metrics Strip (Tabular Numbers) */}
            <div className={`pt-6 border-t grid grid-cols-3 gap-6 max-w-xl ${
              isLight ? 'border-slate-200' : 'border-neutral-800/80'
            }`}>
              <div>
                <div className={`text-2xl sm:text-3xl font-display font-extrabold tabular-nums ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  3.500+
                </div>
                <div className={`text-xs mt-1 ${isLight ? 'text-slate-500 font-medium' : 'text-neutral-400'}`}>
                  Porsi Sehat / Hari
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  14
                </div>
                <div className={`text-xs mt-1 ${isLight ? 'text-slate-500 font-medium' : 'text-neutral-400'}`}>
                  Sekolah Penerima
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-teal-600 dark:text-teal-300 tabular-nums">
                  100%
                </div>
                <div className={`text-xs mt-1 ${isLight ? 'text-slate-500 font-medium' : 'text-neutral-400'}`}>
                  Bahan Lokal Segar
                </div>
              </div>
            </div>

          </div>

          {/* Sisi Kanan: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo: Kitchen Interior */}
              <div className={`rounded-2xl overflow-hidden border shadow-2xl ${
                isLight ? 'border-slate-200 bg-slate-100 shadow-slate-300/40' : 'border-neutral-800 bg-neutral-900 shadow-neutral-950/80'
              }`}>
                <img
                  src="/src/assets/images/hero_dapur_mbg_1791073441128.jpg"
                  alt="Dapur Sentral MBG Modern"
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Caption Bar */}
                <div className={`p-4 border-t flex items-center justify-between ${
                  isLight ? 'bg-white/95 border-slate-200' : 'bg-neutral-950/90 border-neutral-800/80'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <div className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Central Production Kitchen #01
                      </div>
                      <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                        Sterilisasi Standar Industri Pangan
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-800 text-neutral-300'
                  }`}>
                    SOP ACTIVE
                  </span>
                </div>
              </div>

              {/* Overlapping Floating Bento Meal Showcase Card */}
              <div className={`absolute -bottom-8 -left-6 sm:-left-8 max-w-xs backdrop-blur-md rounded-xl p-3 border shadow-2xl hidden sm:flex items-center gap-3 ${
                isLight 
                  ? 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-400/20' 
                  : 'bg-neutral-900/95 border-neutral-700 text-white shadow-2xl'
              }`}>
                <div className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border ${
                  isLight ? 'border-slate-200' : 'border-neutral-700'
                }`}>
                  <img
                    src="/src/assets/images/mbg_meal_showcase_1791073478348.jpg"
                    alt="Menu Seimbang MBG"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-0.5 pr-2">
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    Menu Hari Ini
                  </div>
                  <div className={`text-xs font-bold line-clamp-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Ayam Panggang & Sayur
                  </div>
                  <div className={`text-[10px] ${isLight ? 'text-slate-500 font-mono' : 'text-neutral-400 font-mono'}`}>
                    615 kkal · 28.5g Protein
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
