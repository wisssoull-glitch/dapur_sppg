/**
 * ============================================================================
 * ORGANIZATIONAL STRUCTURE COMPONENT - DAPUR MBG PORTOFOLIO
 * ============================================================================
 * Penanda: Struktur organisasi kepengurusan Dapur Sentral MBG
 * Memperlihatkan kepemimpinan SPPG, Koordinator Ahli Gizi, Admin Gudang,
 * Kepala Koki, Pengawas Sanitasi, dan Distribusi Armada.
 * ============================================================================
 */

import React, { useState } from 'react';
import { Users, Mail, Phone, ShieldCheck, X } from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/initialData';
import { TeamMember, ThemeMode } from '../../types';

interface OrgStructureProps {
  theme: ThemeMode;
}

export const OrgStructure: React.FC<OrgStructureProps> = ({ theme }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const isLight = theme === 'light';

  return (
    <section 
      id="organisasi" 
      className={`py-20 border-t transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-neutral-950 border-neutral-800 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold mb-3 ${
            isLight ? 'bg-slate-100 border border-slate-200 text-slate-700' : 'bg-neutral-900 border border-neutral-800 text-neutral-400'
          }`}>
            <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Tata Kelola Sumber Daya Manusia</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Struktur Organisasi Dapur MBG
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-neutral-400'
          }`}>
            Dikelola oleh tenaga profesional tersertifikasi di bidang gizi klinis, manajemen logistik pergudangan, keamanan pangan HACCP, dan kuliner standar industri.
          </p>
        </div>

        {/* Hierarchy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className={`group rounded-2xl p-6 border transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between ${
                isLight 
                  ? 'bg-slate-50 hover:bg-white border-slate-200 hover:border-emerald-300' 
                  : 'bg-neutral-900/60 hover:bg-neutral-900 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div>
                {/* Header Card: Category & NIP */}
                <div className={`flex items-center justify-between text-xs mb-4 pb-3 border-b ${
                  isLight ? 'border-slate-200' : 'border-neutral-800'
                }`}>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{member.roleCategory}</span>
                  <span className={`font-mono text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                    {member.nipOrLicense}
                  </span>
                </div>

                {/* Profile Avatar & Names */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border ${
                    isLight ? 'bg-slate-200 border-slate-300' : 'bg-neutral-800 border-neutral-700'
                  }`}>
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className={`text-base font-bold transition-colors ${
                      isLight ? 'text-slate-900 group-hover:text-emerald-700' : 'text-white group-hover:text-emerald-400'
                    }`}>
                      {member.name}
                    </h3>
                    <p className={`text-xs mt-0.5 leading-snug ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                      {member.title}
                    </p>
                  </div>
                </div>

                {/* Bio Snippet */}
                <p className={`text-xs leading-relaxed line-clamp-2 ${
                  isLight ? 'text-slate-600' : 'text-neutral-400'
                }`}>
                  {member.bio}
                </p>
              </div>

              {/* Bottom Card Action */}
              <div className={`mt-5 pt-3 border-t flex items-center justify-between text-xs ${
                isLight ? 'border-slate-200' : 'border-neutral-800/80'
              }`}>
                <span className={isLight ? 'text-slate-500 group-hover:text-slate-800' : 'text-neutral-400 group-hover:text-neutral-300'}>
                  Lihat Kualifikasi Lengkap
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Detail Anggota */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-2xl max-w-lg w-full p-6 shadow-2xl relative ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-neutral-900 border-neutral-700 text-white'
          }`}>
            <button
              onClick={() => setSelectedMember(null)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
                isLight ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-emerald-500 shrink-0">
                <img
                  src={selectedMember.photoUrl}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {selectedMember.roleCategory}
                </div>
                <h3 className={`text-xl font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {selectedMember.name}
                </h3>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                  {selectedMember.title}
                </p>
                <div className={`text-[11px] font-mono mt-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                  {selectedMember.nipOrLicense}
                </div>
              </div>
            </div>

            <div className={`space-y-4 text-sm border-t pt-4 ${
              isLight ? 'border-slate-200 text-slate-700' : 'border-neutral-800 text-neutral-300'
            }`}>
              <div>
                <h4 className={`text-xs uppercase font-bold tracking-wider mb-1 ${
                  isLight ? 'text-slate-500' : 'text-neutral-400'
                }`}>
                  Tanggung Jawab & Rekam Jejak
                </h4>
                <p className="leading-relaxed text-xs sm:text-sm">
                  {selectedMember.bio}
                </p>
              </div>

              <div className={`p-3 rounded-xl border space-y-2 text-xs ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-neutral-950 border border-neutral-800 text-neutral-300'
              }`}>
                {selectedMember.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{selectedMember.email}</span>
                  </div>
                )}
                {selectedMember.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="font-mono">{selectedMember.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedMember(null)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-900' : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                }`}
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
