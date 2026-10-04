/**
 * ============================================================================
 * VISION & MISSION COMPONENT - DAPUR MBG PORTOFOLIO
 * ============================================================================
 * Penanda: Visi, Misi, dan 4 Prinsip Dasar Operasional SPPG
 * Menguraikan komitmen nutrisi, standar BGN, dan keberlanjutan lingkungan.
 * Mendukung keterbacaan tinggi di Tema Terang dan Gelap.
 * ============================================================================
 */

import React from 'react';
import { Target, Compass, CheckCircle2, Leaf, Shield, Award, Sparkles } from 'lucide-react';
import { VISI_MISI } from '../../data/initialData';
import { ThemeMode } from '../../types';

interface VisionMissionProps {
  theme: ThemeMode;
}

export const VisionMission: React.FC<VisionMissionProps> = ({ theme }) => {
  const isLight = theme === 'light';

  return (
    <section 
      id="visi-misi" 
      className={`py-20 border-t transition-colors ${
        isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-neutral-900 border-neutral-800 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-3 ${
            isLight 
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
              : 'bg-emerald-950/80 border border-emerald-800/80 text-emerald-400'
          }`}>
            <Compass className="w-3.5 h-3.5" />
            <span>Landasan Filosofi & Tujuan</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Visi & Misi Operasional Dapur MBG
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-neutral-400'
          }`}>
            Menjadi fondasi kedaulatan gizi anak sekolah dengan integritas penyajian, transparansi bahan baku, dan pengawasan tanpa kompromi.
          </p>
        </div>

        {/* Visi Highlight Card */}
        <div className={`rounded-2xl p-8 sm:p-10 shadow-xl mb-12 relative overflow-hidden transition-all ${
          isLight 
            ? 'bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-2 border-emerald-300 shadow-emerald-900/5' 
            : 'bg-gradient-to-r from-emerald-950/70 via-neutral-900 to-neutral-900 border border-emerald-800/60'
        }`}>
          <div className="relative z-10 space-y-4">
            <div className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold ${
              isLight ? 'text-emerald-700' : 'text-emerald-400'
            }`}>
              <Target className="w-4 h-4" />
              <span>Visi Dapur Sentral</span>
            </div>
            
            <p className={`text-lg sm:text-2xl font-display font-bold leading-relaxed max-w-4xl ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              "{VISI_MISI.visi}"
            </p>

            <div className={`text-xs flex items-center gap-2 pt-2 ${
              isLight ? 'text-slate-600 font-medium' : 'text-neutral-400'
            }`}>
              <span>Standar Kesesuaian: Pedoman Teknis Badan Gizi Nasional (BGN) RI</span>
            </div>
          </div>
        </div>

        {/* Misi List & 4 Prinsip Operasional */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Kolom Kiri: 5 Butir Misi Utama */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className={`text-xl font-bold flex items-center gap-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <span>Misi Pelaksanaan Harian</span>
            </h3>

            <div className="space-y-4">
              {VISI_MISI.misi.map((m, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-4 p-4 rounded-xl border transition-colors shadow-sm ${
                    isLight 
                      ? 'bg-white border-slate-200 hover:border-emerald-300' 
                      : 'bg-neutral-950/60 border-neutral-800'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                    isLight 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-emerald-900/60 text-emerald-400'
                  }`}>
                    0{idx + 1}
                  </div>
                  <p className={`text-sm leading-relaxed ${
                    isLight ? 'text-slate-700' : 'text-neutral-300'
                  }`}>
                    {m}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: 4 Prinsip Utama */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className={`text-xl font-bold ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Prinsip Kerja Tanpa Kompromi
            </h3>

            <div className="space-y-3">
              {VISI_MISI.prinsipUtama.map((p, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-xl border transition-colors shadow-sm ${
                    isLight 
                      ? 'bg-white border-slate-200 hover:border-emerald-300' 
                      : 'bg-neutral-950/40 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${
                      isLight ? 'text-emerald-600' : 'text-emerald-400'
                    }`} />
                    <h4 className={`text-sm font-bold ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {p.title}
                    </h4>
                  </div>
                  <p className={`text-xs pl-6 leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-neutral-400'
                  }`}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quality Box */}
            <div className={`p-5 rounded-xl border text-xs space-y-2 mt-4 shadow-sm ${
              isLight 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                : 'bg-emerald-950/40 border-emerald-800/60 text-neutral-300'
            }`}>
              <div className={`font-bold flex items-center gap-2 ${
                isLight ? 'text-emerald-900' : 'text-emerald-400'
              }`}>
                <Sparkles className="w-4 h-4" />
                <span>Zero Tolerance terhadap Kontaminasi Pangan</span>
              </div>
              <p className={`leading-relaxed ${
                isLight ? 'text-emerald-800' : 'text-neutral-400'
              }`}>
                Uji organoleptik dan pengambilan sampel makanan (food sample retensi 24 jam) dilakukan setiap hari sebelum armada distribusi diberangkatkan.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
