/**
 * ============================================================================
 * LOGIN MODAL COMPONENT - DAPUR MBG
 * ============================================================================
 * Penanda: Modal autentikasi untuk membatasi akses ke Portal Kepala Dapur,
 * Portal Ahli Gizi, dan Portal Admin Dapur sesuai hak akses.
 * ============================================================================
 */

import React, { useState } from 'react';
import { UserRole, AuthUser, ThemeMode } from '../../types';
import { USER_CREDENTIALS } from '../../data/initialData';
import { 
  Lock, 
  User, 
  KeyRound, 
  X, 
  ShieldCheck, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetRole: UserRole;
  onLoginSuccess: (user: AuthUser) => void;
  theme?: ThemeMode;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  targetRole,
  onLoginSuccess,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const roleInfo = {
    kepaladapur: {
      title: "Login Kepala Dapur (Pusat Data)",
      subtitle: "Akses Brankas & Repositori Seluruh Dokumen SPPG",
      color: "from-amber-600 to-amber-700",
      accent: isLight ? "text-amber-800" : "text-amber-400",
      border: isLight ? "border-amber-400" : "border-amber-500/40",
      defaultCred: USER_CREDENTIALS.find(u => u.role === 'kepaladapur')!
    },
    ahligizi: {
      title: "Login Ahli Gizi & Pengendali Mutu",
      subtitle: "Akses Label Gizi, Log Sampah & Suhu Cold-Storage",
      color: "from-emerald-600 to-teal-700",
      accent: isLight ? "text-emerald-800" : "text-emerald-400",
      border: isLight ? "border-emerald-400" : "border-emerald-500/40",
      defaultCred: USER_CREDENTIALS.find(u => u.role === 'ahligizi')!
    },
    admin: {
      title: "Login Administrasi & Logistik Dapur",
      subtitle: "Akses Sanitasi Alat, Gudang, FIFO/FEFO, Opname & Air",
      color: "from-blue-600 to-blue-700",
      accent: isLight ? "text-blue-800" : "text-blue-400",
      border: isLight ? "border-blue-400" : "border-blue-500/40",
      defaultCred: USER_CREDENTIALS.find(u => u.role === 'admin')!
    }
  }[targetRole];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Check credentials against list
    const found = USER_CREDENTIALS.find(
      u => u.username === username.trim() && u.password === password
    );

    if (!found) {
      setErrorMsg('Username atau password tidak sesuai. Silakan periksa kembali!');
      return;
    }

    if (found.role !== targetRole) {
      setErrorMsg(`Akun ini berwenang sebagai ${found.displayName}, bukan sebagai ${roleInfo.title}.`);
      return;
    }

    const authUser: AuthUser = {
      username: found.username,
      role: found.role,
      displayName: found.displayName,
      title: found.title,
      avatarUrl: found.avatarUrl,
      token: `mbg-token-${Date.now()}`
    };

    onLoginSuccess(authUser);
    onClose();
  };

  const handleQuickFill = () => {
    setUsername(roleInfo.defaultCred.username);
    setPassword(roleInfo.defaultCred.password);
    setErrorMsg('');
  };

  return (
    <div className={`fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-4 transition-colors ${
      isLight ? 'bg-slate-900/60' : 'bg-black/80'
    }`}>
      <div className={`border rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden transition-all ${
        isLight 
          ? `bg-white ${roleInfo.border} text-slate-900 shadow-slate-900/20` 
          : `bg-neutral-900 ${roleInfo.border} text-white shadow-2xl`
      }`}>
        
        {/* Top Decorative Header */}
        <div className={`flex items-center justify-between pb-4 border-b ${
          isLight ? 'border-slate-200' : 'border-neutral-800'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${roleInfo.color} flex items-center justify-center text-white shadow-md`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {roleInfo.title}
              </h3>
              <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                {roleInfo.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isLight ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Fill Helper Box */}
        <div className={`my-4 p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
          isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-neutral-950 border-neutral-800 text-neutral-300'
        }`}>
          <div className="space-y-0.5">
            <div className={`text-[10px] uppercase tracking-wider font-semibold ${
              isLight ? 'text-slate-500' : 'text-neutral-400'
            }`}>
              Kredensial Resmi Akun:
            </div>
            <div className="font-mono">
              User: <strong className={roleInfo.accent}>{roleInfo.defaultCred.username}</strong> · Sandi: <strong className={roleInfo.accent}>{roleInfo.defaultCred.password}</strong>
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickFill}
            className={`px-2.5 py-1.5 rounded-lg font-semibold text-[11px] shrink-0 transition-colors flex items-center gap-1 cursor-pointer ${
              isLight 
                ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' 
                : 'bg-neutral-800 hover:bg-neutral-700 text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Isi Cepat</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className={`mb-4 p-3 rounded-xl border text-xs flex items-center gap-2 ${
            isLight 
              ? 'bg-rose-50 border-rose-200 text-rose-700' 
              : 'bg-rose-950/70 border-rose-800 text-rose-300'
          }`}>
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-semibold mb-1 ${
              isLight ? 'text-slate-700' : 'text-neutral-300'
            }`}>
              Username Resmi *
            </label>
            <div className="relative">
              <User className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                isLight ? 'text-slate-400' : 'text-neutral-500'
              }`} />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username..."
                className={`w-full pl-9 pr-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white placeholder-neutral-500 focus:border-emerald-500'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${
              isLight ? 'text-slate-700' : 'text-neutral-300'
            }`}>
              Kata Sandi / Password *
            </label>
            <div className="relative">
              <KeyRound className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                isLight ? 'text-slate-400' : 'text-neutral-500'
              }`} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className={`w-full pl-9 pr-10 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none ${
                  isLight 
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-600' 
                    : 'bg-neutral-950 border-neutral-700 text-white placeholder-neutral-500 focus:border-emerald-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ${
                  isLight ? 'text-slate-400 hover:text-slate-700' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl font-bold text-sm text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Verifikasi & Masuk Ruang Kerja</span>
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-500'}`}>
            Sistem Autentikasi Keamanan Pangan Nasional · SPPG MBG
          </span>
        </div>

      </div>
    </div>
  );
};
