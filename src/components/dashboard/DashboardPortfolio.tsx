/**
 * ============================================================================
 * DASHBOARD PORTFOLIO WRAPPER - DAPUR MBG
 * ============================================================================
 * Penanda: Halaman beranda utama dengan desain portofolio bersih dan modern.
 * Memuat profil fasilitas dapur, kartu ID mengambang interaktif untuk beralih role,
 * visi misi, struktur organisasi, dan kontak.
 * ============================================================================
 */

import React from 'react';
import { AppView, ThemeMode } from '../../types';
import { HeroSection } from './HeroSection';
import { FloatingIdCards } from './FloatingIdCards';
import { AboutSection } from './AboutSection';
import { VisionMission } from './VisionMission';
import { OrgStructure } from './OrgStructure';
import { ContactSection } from './ContactSection';

interface DashboardPortfolioProps {
  onSelectRole: (role: AppView) => void;
  authenticatedRoles: {
    kepaladapur: boolean;
    ahligizi: boolean;
    admin: boolean;
  };
  theme: ThemeMode;
}

export const DashboardPortfolio: React.FC<DashboardPortfolioProps> = ({ 
  onSelectRole,
  authenticatedRoles,
  theme,
}) => {
  const scrollToCards = () => {
    const el = document.getElementById('akses-id-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`w-full min-h-screen transition-colors ${
      theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-neutral-950 text-white'
    }`}>
      {/* 1. Hero Section Portofolio */}
      <HeroSection onScrollToCards={scrollToCards} theme={theme} />

      {/* 2. Floating ID Card Switcher (3 Otoritas: Kepala Dapur, Ahli Gizi, Admin Dapur) */}
      <FloatingIdCards 
        onSelectRole={onSelectRole}
        authenticatedRoles={authenticatedRoles}
        theme={theme}
      />

      {/* 3. Profil Dapur & Alur Fasilitas Higienis */}
      <AboutSection theme={theme} />

      {/* 4. Visi & Misi Dapur MBG */}
      <VisionMission theme={theme} />

      {/* 5. Struktur Organisasi SPPG */}
      <OrgStructure theme={theme} />

      {/* 6. Kontak & Hotline Pengaduan */}
      <ContactSection theme={theme} />
    </div>
  );
};
