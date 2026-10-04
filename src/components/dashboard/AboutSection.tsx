/**
 * ============================================================================
 * ABOUT SECTION COMPONENT - DAPUR MBG PORTOFOLIO
 * ============================================================================
 * Penanda: Informasi komprehensif profil Dapur MBG, fasilitas zonasi higienis,
 * standar kepatuhan operasional, dan kapasitas harian.
 * ============================================================================
 */

import React from 'react';
import { 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  ThermometerSnowflake, 
  Flame, 
  Truck, 
  Sparkles 
} from 'lucide-react';
import { KITCHEN_PROFILE } from '../../data/initialData';
import { ThemeMode } from '../../types';

interface AboutSectionProps {
  theme: ThemeMode;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  const isLight = theme === 'light';

  const zonasiDapur = [
    {
      step: "01",
      title: "Zona Penerimaan & Karantina",
      desc: "Inspeksi fisik bahan mentah dari petani & mitra, verifikasi sertifikat halal, dan penimbangan awal.",
      icon: Layers,
    },
    {
      step: "02",
      title: "Penyimpanan & Rantai Dingin",
      desc: "Cold room chiller 0-4°C, deep freezer -18°C, serta gudang kering terkontrol kelembapannya (<65% RH).",
      icon: ThermometerSnowflake,
    },
    {
      step: "03",
      title: "Pengolahan Thermal Suhu Tinggi",
      desc: "Memasak dengan boiler stainless 304, memastikan suhu inti makanan matang merata di atas 75°C.",
      icon: Flame,
    },
    {
      step: "04",
      title: "Sterilisasi & Kemasan Bento",
      desc: "Porsi ditimbang presisi ke dalam tray stainless SUS-304 yang disterilisasi UV dan pencucian suhu 82°C.",
      icon: ShieldCheck,
    },
    {
      step: "05",
      title: "Distribusi Termal Berinsulasi",
      desc: "Armada pengangkut terisolasi menjaga suhu makanan tetap hangat (>60°C) hingga tiba di sekolah.",
      icon: Truck,
    }
  ];

  return (
    <section 
      id="profil" 
      className={`py-20 transition-colors ${
        isLight ? 'bg-slate-50 text-slate-900' : 'bg-neutral-950 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-3 ${
            isLight ? 'bg-slate-200 text-slate-800 border border-slate-300' : 'bg-neutral-900 border border-neutral-800 text-neutral-400'
          }`}>
            <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Fasilitas & Profil SPPG</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Mengenal Sentral Dapur MBG Nusantara
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-neutral-400'
          }`}>
            Sebagai wujud komitmen terhadap Program Strategis Nasional Makan Bergizi Gratis (MBG), fasilitas kami didesain khusus dengan standar higienis industri pangan modern berkapasitas {KITCHEN_PROFILE.dailyPortionCapacity.toLocaleString('id-ID')} porsi setiap harinya.
          </p>
        </div>

        {/* Highlight Grid: 3 Pilar Utama Fasilitas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className={`rounded-2xl p-6 border shadow-sm transition-all ${
            isLight ? 'bg-white border-slate-200 hover:shadow-md' : 'bg-neutral-900/60 border-neutral-800'
          }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-950 border border-emerald-800/80 text-emerald-400'
            }`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Standar HACCP & Halal
            </h3>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
              Setiap tahapan mulai dari penerimaan bahan mentah, preparasi, pemasakan, hingga pengiriman memiliki Critical Control Point (CCP) yang diaudit ketat setiap hari.
            </p>
          </div>

          <div className={`rounded-2xl p-6 border shadow-sm transition-all ${
            isLight ? 'bg-white border-slate-200 hover:shadow-md' : 'bg-neutral-900/60 border-neutral-800'
          }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              isLight ? 'bg-blue-100 text-blue-800' : 'bg-blue-950 border border-blue-800/80 text-blue-400'
            }`}>
              <ThermometerSnowflake className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Monitoring Cold-Chain Presisi
            </h3>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
              Penyimpanan protein hewani dan sayuran segar dilengkapi sensor termal otomatis yang mengirimkan log suhu ruangan secara berkelanjutan guna mencegah pembusukan.
            </p>
          </div>

          <div className={`rounded-2xl p-6 border shadow-sm transition-all ${
            isLight ? 'bg-white border-slate-200 hover:shadow-md' : 'bg-neutral-900/60 border-neutral-800'
          }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              isLight ? 'bg-teal-100 text-teal-800' : 'bg-teal-950 border border-teal-800/80 text-teal-400'
            }`}>
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Peralatan Stainless SUS-304
            </h3>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
              Seluruh meja preparasi, panci boiler, sendok masak, serta kotak bento siswa menggunakan material food-grade anti-korosi yang aman dan ramah lingkungan tanpa plastik sekali pakai.
            </p>
          </div>

        </div>

        {/* Zonasi Alur Kerja Higienis */}
        <div>
          <div className={`border-b pb-4 mb-8 flex items-center justify-between ${
            isLight ? 'border-slate-200' : 'border-neutral-800'
          }`}>
            <div>
              <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Alur Zonasi Higienis Dapur MBG
              </h3>
              <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                SOP pemisahan zona kotor (dirty zone) dan zona steril (clean zone) tanpa kontaminasi silang.
              </p>
            </div>
            <span className={`hidden sm:inline-block text-xs font-mono px-2.5 py-1 rounded font-bold ${
              isLight ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/80'
            }`}>
              ONE-WAY FLOW SYSTEM
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {zonasiDapur.map((z) => {
              const IconComp = z.icon;
              return (
                <div 
                  key={z.step} 
                  className={`rounded-xl p-5 border transition-colors shadow-sm ${
                    isLight 
                      ? 'bg-white border-slate-200 hover:border-slate-300' 
                      : 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono font-bold ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                      FASE {z.step}
                    </span>
                    <IconComp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className={`text-sm font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {z.title}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                    {z.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
