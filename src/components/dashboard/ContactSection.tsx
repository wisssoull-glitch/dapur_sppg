/**
 * ============================================================================
 * CONTACT SECTION COMPONENT - DAPUR MBG PORTOFOLIO
 * ============================================================================
 * Penanda: Kontak resmi Dapur MBG, hotline koordinasi sekolah,
 * pengaduan alergi makanan, dan formulir interaktif pengiriman pesan.
 * ============================================================================
 */

import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare 
} from 'lucide-react';
import { KITCHEN_PROFILE } from '../../data/initialData';
import { ThemeMode } from '../../types';

interface ContactSectionProps {
  theme: ThemeMode;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme }) => {
  const isLight = theme === 'light';

  const [formData, setFormData] = useState({
    senderName: '',
    senderRole: 'Pihak Sekolah / Guru',
    emailOrPhone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderName || !formData.emailOrPhone || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        senderName: '',
        senderRole: 'Pihak Sekolah / Guru',
        emailOrPhone: '',
        subject: '',
        message: ''
      });
    }, 4500);
  };

  return (
    <section 
      id="kontak" 
      className={`py-20 border-t transition-colors ${
        isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-neutral-900 border-neutral-800 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-3 ${
            isLight ? 'bg-slate-200 text-slate-800 border border-slate-300' : 'bg-neutral-800 border border-neutral-700 text-neutral-300'
          }`}>
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Layanan Komunikasi & Hotline</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Hubungi Sentral Dapur MBG
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-neutral-400'
          }`}>
            Keterbukaan informasi adalah komitmen kami. Pihak sekolah mitra, komite orang tua murid, dan pemasok bahan lokal dapat menghubungi posko pengawas melalui saluran resmi berikut.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Kolom Kiri: Kartu Informasi Kontak */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className={`p-6 rounded-2xl border space-y-5 shadow-sm ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-neutral-950 border-neutral-800 text-neutral-300'
            }`}>
              <h3 className={`text-lg font-bold border-b pb-3 ${
                isLight ? 'text-slate-900 border-slate-200' : 'text-white border-neutral-800'
              }`}>
                Posko Operasional SPPG
              </h3>

              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Alamat Sentral Produksi
                  </div>
                  <div className={`text-xs mt-0.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                    {KITCHEN_PROFILE.address}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Jam Operasional Dapur
                  </div>
                  <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                    {KITCHEN_PROFILE.operationalHours}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <PhoneCall className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Telepon Kantor & WhatsApp
                  </div>
                  <div className={`text-xs font-mono mt-0.5 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                    {KITCHEN_PROFILE.phone}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Surel Korespondensi
                  </div>
                  <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                    {KITCHEN_PROFILE.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Hotline Alert */}
            <div className={`p-5 rounded-2xl border space-y-2 ${
              isLight 
                ? 'bg-amber-50 border-amber-200 text-amber-900 shadow-sm' 
                : 'bg-amber-950/40 border-amber-800/60 text-amber-200'
            }`}>
              <div className={`flex items-center gap-2 font-bold text-sm ${
                isLight ? 'text-amber-900' : 'text-amber-400'
              }`}>
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Saluran Darurat & Pelaporan Alergen</span>
              </div>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-amber-800' : 'text-neutral-300'}`}>
                Untuk pelaporan insiden darurat distribusi atau alergen anak didik yang mendesak, hubungi langsung Tim PIC Pengawas di:
              </p>
              <div className={`font-mono text-sm font-bold px-3 py-1.5 rounded-lg border inline-block ${
                isLight 
                  ? 'bg-white text-amber-950 border-amber-300 shadow-sm' 
                  : 'bg-amber-950/80 text-white border-amber-800/80'
              }`}>
                {KITCHEN_PROFILE.hotlineEmergency}
              </div>
            </div>

          </div>

          {/* Kolom Kanan: Formulir Pesan Interaktif */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-2xl border shadow-sm ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-neutral-950 border-neutral-800 text-white'
            }`}>
              <h3 className={`text-lg font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Kirim Pesan atau Evaluasi Menu
              </h3>
              <p className={`text-xs mb-6 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                Formulir ini diteruskan langsung ke meja piket Pengendali Mutu Dapur MBG.
              </p>

              {submitted ? (
                <div className={`p-6 rounded-xl border text-center space-y-3 ${
                  isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                }`}>
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold">
                    Pesan Berhasil Terkirim
                  </h4>
                  <p className="text-xs max-w-sm mx-auto leading-relaxed">
                    Terima kasih atas masukannya. Tim Pengendali Mutu Dapur MBG akan meninjau dan merespons dalam kurun waktu 1x24 jam kerja.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.senderName}
                        onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                        placeholder="Contoh: Budi Santoso, S.Pd"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none ${
                          isLight 
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white' 
                            : 'bg-neutral-900 border-neutral-700 text-white focus:border-emerald-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                        Kategori Pengirim
                      </label>
                      <select
                        value={formData.senderRole}
                        onChange={(e) => setFormData({ ...formData, senderRole: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none ${
                          isLight 
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white' 
                            : 'bg-neutral-900 border-neutral-700 text-white focus:border-emerald-500'
                        }`}
                      >
                        <option value="Pihak Sekolah / Guru">Pihak Sekolah / Guru</option>
                        <option value="Komite / Orang Tua Siswa">Komite / Orang Tua Siswa</option>
                        <option value="Mitra Petani / Pemasok">Mitra Petani / Pemasok</option>
                        <option value="Puskesmas / Tenaga Medis">Puskesmas / Tenaga Medis</option>
                        <option value="Masyarakat Umum">Masyarakat Umum</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                        Kontak (Email / No. HP) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.emailOrPhone}
                        onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                        placeholder="email@sekolah.sch.id atau 0812..."
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none ${
                          isLight 
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white' 
                            : 'bg-neutral-900 border-neutral-700 text-white focus:border-emerald-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                        Topik Pesan
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Contoh: Evaluasi Porsi Sayur Kelas 1"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none ${
                          isLight 
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white' 
                            : 'bg-neutral-900 border-neutral-700 text-white focus:border-emerald-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-neutral-300'}`}>
                      Uraian Pesan / Masukan Menu *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan catatan, umpan balik rasa menu, ketepatan waktu distribusi, atau informasi spesifik lainnya..."
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none ${
                        isLight 
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600 focus:bg-white' 
                          : 'bg-neutral-900 border-neutral-700 text-white focus:border-emerald-500'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan Resmi</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
