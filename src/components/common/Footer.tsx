/**
 * ============================================================================
 * FOOTER COMPONENT - DAPUR MBG
 * ============================================================================
 * Penanda: Bagian penutup portofolio dan portal Dapur MBG
 * Berisi informasi ringkas, kepatuhan BGN, kontak darurat, dan hak cipta.
 * ============================================================================
 */

import React from 'react';
import { ChefHat, ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react';
import { KITCHEN_PROFILE } from '../../data/initialData';
import { ThemeMode } from '../../types';

interface FooterProps {
  theme?: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  return (
    <footer className={`border-t text-xs py-12 transition-colors ${
      isLight 
        ? 'bg-slate-100 border-slate-200 text-slate-600' 
        : 'bg-neutral-950 border-neutral-800 text-neutral-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Kolom 1: Brand & Keterangan SPPG */}
          <div className="space-y-3 md:col-span-1">
            <div className={`flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-sm">
                <ChefHat className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-sm tracking-tight">DAPUR MBG NUSANTARA</span>
            </div>
            <p className={`leading-relaxed ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
              Unit Sentral Pelayanan Pemenuhan Gizi (SPPG) Program Makan Bergizi Gratis Republik Indonesia. Memprioritaskan bahan pangan segar lokal berkualitas tinggi.
            </p>
            <div className={`text-[11px] font-mono ${isLight ? 'text-slate-500' : 'text-neutral-500'}`}>
              Registrasi: {KITCHEN_PROFILE.codeSPPG}
            </div>
          </div>

          {/* Kolom 2: Jam & Kapasitas Layanan */}
          <div className="space-y-2">
            <h4 className={`font-semibold text-xs tracking-wider uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Operasional & Layanan
            </h4>
            <ul className={`space-y-1.5 ${isLight ? 'text-slate-600' : 'text-neutral-300'}`}>
              <li>• Jam Masak: 03.00 - 08.00 WIB</li>
              <li>• Distribusi Termal: 09.30 - 11.30 WIB</li>
              <li>• Kapasitas Harian: {KITCHEN_PROFILE.dailyPortionCapacity.toLocaleString('id-ID')} Porsi</li>
              <li>• Sekolah Mitra: {KITCHEN_PROFILE.activeSchoolsServed} Sekolah Dasar & Menengah</li>
            </ul>
          </div>

          {/* Kolom 3: Sertifikasi & Standar Keamanan */}
          <div className="space-y-2">
            <h4 className={`font-semibold text-xs tracking-wider uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Standar & Kepatuhan
            </h4>
            <ul className={`space-y-1.5 ${isLight ? 'text-slate-600' : 'text-neutral-300'}`}>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                HACCP Codex Alimentarius
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ISO 22000 Food Safety Management
              </li>
              <li className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                Sertifikat Halal BPJPH
              </li>
              <li className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                Standar AKG Badan Gizi Nasional (BGN)
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak Cepat & Darurat */}
          <div className="space-y-2">
            <h4 className={`font-semibold text-xs tracking-wider uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Hotline & Pengaduan
            </h4>
            <p className={`leading-relaxed ${isLight ? 'text-slate-600' : 'text-neutral-300'}`}>
              {KITCHEN_PROFILE.address}
            </p>
            <div className="pt-1">
              <a
                href={`tel:${KITCHEN_PROFILE.phone}`}
                className={`inline-flex items-center gap-1 font-mono text-xs font-semibold ${
                  isLight ? 'text-emerald-700 hover:text-emerald-800' : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                {KITCHEN_PROFILE.phone}
              </a>
              <div className={`text-[11px] mt-1 font-mono font-semibold ${isLight ? 'text-amber-700' : 'text-amber-300'}`}>
                {KITCHEN_PROFILE.hotlineEmergency}
              </div>
            </div>
          </div>

        </div>

        {/* Hairline Divider & Copyright */}
        <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isLight ? 'border-slate-200 text-slate-500' : 'border-neutral-800 text-neutral-400'
        }`}>
          <div>
            © 2026 Dapur MBG Nusantara. Portal Operasional Pemenuhan Gizi Mandiri.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Pedoman Sanitasi SPPG</span>
            <span>·</span>
            <span>Standar Porsi Usia Sekolah</span>
            <span>·</span>
            <span>Prosedur Cold-Chain</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
