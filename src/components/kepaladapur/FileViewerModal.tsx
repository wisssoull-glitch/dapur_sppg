/**
 * ============================================================================
 * FILE VIEWER MODAL - PUSAT DATA KEPALA DAPUR MBG
 * ============================================================================
 * Penanda: Penampil isi berkas dokumen, visualisasi arsip gizi/logistik,
 * gambar, PDF, spreadsheet, atau data JSON terstruktur yang tersimpan.
 * ============================================================================
 */

import React, { useState } from 'react';
import { VFileSystemItem, ThemeMode } from '../../types';
import { 
  X, 
  FileText, 
  Download, 
  Share2, 
  Calendar, 
  HardDrive, 
  User, 
  Folder, 
  CheckCircle2, 
  Code, 
  Eye, 
  FileSpreadsheet, 
  FileCheck 
} from 'lucide-react';

interface FileViewerModalProps {
  file: VFileSystemItem | null;
  onClose: () => void;
  theme?: ThemeMode;
}

export const FileViewerModal: React.FC<FileViewerModalProps> = ({ file, onClose, theme = 'dark' }) => {
  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState<'preview' | 'json'>('preview');

  if (!file) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 KB';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleDownload = () => {
    let contentToDownload = typeof file.content === 'object' ? JSON.stringify(file.content, null, 2) : (file.content || file.name);
    let mime = file.mimeType || 'text/plain';

    // If data URL
    if (typeof file.content === 'string' && file.content.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = file.content;
      a.download = file.name;
      a.click();
      return;
    }

    const blob = new Blob([contentToDownload], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isImage = file.type === 'image' || (file.mimeType && file.mimeType.startsWith('image/')) || (typeof file.content === 'string' && file.content.startsWith('data:image/'));

  return (
    <div className={`fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-4 transition-colors ${
      isLight ? 'bg-slate-900/60' : 'bg-black/85'
    }`}>
      <div className={`border rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-neutral-900 border-neutral-700 text-white'
      }`}>
        
        {/* Modal Top Bar */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isLight 
                ? 'bg-amber-100 border border-amber-300 text-amber-700' 
                : 'bg-amber-950/80 border border-amber-800/80 text-amber-400'
            }`}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-base font-bold line-clamp-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {file.name}
              </h3>
              <p className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                {file.path}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                isLight 
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' 
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
              }`}
              title="Unduh Berkas"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Unduh</span>
            </button>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isLight ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-200' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher if structured content */}
        {file.content && typeof file.content === 'object' && (
          <div className={`flex border-b px-5 pt-2 text-xs ${
            isLight ? 'border-slate-200 bg-slate-100/70' : 'border-neutral-800 bg-neutral-950/60'
          }`}>
            <button
              onClick={() => setActiveTab('preview')}
              className={`pb-2.5 px-3 font-semibold transition-colors flex items-center gap-1.5 border-b-2 cursor-pointer ${
                activeTab === 'preview'
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                  : isLight ? 'border-transparent text-slate-600 hover:text-slate-900' : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Tampilan Dokumen Terformat</span>
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`pb-2.5 px-3 font-semibold transition-colors flex items-center gap-1.5 border-b-2 cursor-pointer ${
                activeTab === 'json'
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                  : isLight ? 'border-transparent text-slate-600 hover:text-slate-900' : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Data Mentah (JSON / Payload)</span>
            </button>
          </div>
        )}

        {/* Modal Main Body (Scrollable) */}
        <div className={`p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 ${
          isLight ? 'bg-white' : 'bg-neutral-900'
        }`}>
          
          {/* Metadata Card Strip */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl border text-xs font-mono ${
            isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
          }`}>
            <div>
              <span className={`text-[10px] block uppercase ${isLight ? 'text-slate-400' : 'text-neutral-500'}`}>Ukuran Berkas</span>
              <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{formatFileSize(file.sizeBytes)}</span>
            </div>
            <div>
              <span className={`text-[10px] block uppercase ${isLight ? 'text-slate-400' : 'text-neutral-500'}`}>Kategori / Tipe</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 uppercase">{file.type}</span>
            </div>
            <div>
              <span className={`text-[10px] block uppercase ${isLight ? 'text-slate-400' : 'text-neutral-500'}`}>Dibuat Oleh</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">{file.createdByRole}</span>
            </div>
            <div>
              <span className={`text-[10px] block uppercase ${isLight ? 'text-slate-400' : 'text-neutral-500'}`}>Waktu Simpan</span>
              <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{file.updatedAt}</span>
            </div>
          </div>

          {/* Description if any */}
          {file.description && (
            <div className={`p-3 rounded-xl border text-xs ${
              isLight ? 'bg-amber-50/60 border-amber-200 text-amber-900' : 'bg-neutral-950/60 border-neutral-800 text-neutral-300'
            }`}>
              <strong>Keterangan Arsip:</strong> {file.description}
            </div>
          )}

          {/* File Content Preview */}
          <div className={`border rounded-xl p-5 overflow-hidden ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'
          }`}>
            
            {/* Case 1: Image file */}
            {isImage ? (
              <div className="flex flex-col items-center justify-center p-4">
                <img
                  src={file.content || '/src/assets/images/hero_dapur_mbg_1791073441128.jpg'}
                  alt={file.name}
                  className={`max-h-96 rounded-lg object-contain shadow-lg border ${
                    isLight ? 'border-slate-300' : 'border-neutral-700'
                  }`}
                />
                <span className={`text-xs mt-3 font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                  Pratinjau Gambar Asli
                </span>
              </div>
            ) : file.content && typeof file.content === 'object' && activeTab === 'preview' ? (
              /* Case 2: Structured Document (Label Gizi, Suhu, Gudang, dll.) */
              <div className="space-y-4">
                <div className={`flex items-center justify-between border-b pb-3 ${
                  isLight ? 'border-slate-200' : 'border-neutral-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className={`font-bold text-sm uppercase tracking-wider ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      Arsip Resmi Terverifikasi SPPG MBG
                    </span>
                  </div>
                  <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded border font-semibold ${
                    isLight 
                      ? 'text-amber-800 bg-amber-100 border-amber-300' 
                      : 'text-amber-400 bg-amber-950 border-amber-800'
                  }`}>
                    STATUS: TERSINKRONISASI
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {Object.entries(file.content).map(([key, value]) => {
                    if (typeof value === 'object' && value !== null) return null;
                    return (
                      <div key={key} className={`p-3 rounded-lg border ${
                        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-neutral-900 border-neutral-800/80'
                      }`}>
                        <div className={`text-[10px] uppercase font-mono tracking-wider ${
                          isLight ? 'text-slate-500' : 'text-neutral-400'
                        }`}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className={`font-bold text-sm mt-0.5 break-words ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}>
                          {String(value)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : file.content && typeof file.content === 'object' && activeTab === 'json' ? (
              /* Case 3: Raw JSON tab */
              <pre className={`text-xs font-mono overflow-x-auto max-h-80 p-3 rounded-lg ${
                isLight ? 'bg-slate-900 text-emerald-300' : 'bg-neutral-900 text-emerald-400'
              }`}>
                {JSON.stringify(file.content, null, 2)}
              </pre>
            ) : (
              /* Case 4: Plain text / Document payload */
              <div className="space-y-3">
                <div className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                  Isi Teks Dokumen:
                </div>
                <div className={`p-4 rounded-lg font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto border ${
                  isLight 
                    ? 'bg-white border-slate-200 text-slate-800' 
                    : 'bg-neutral-900 border-neutral-800 text-neutral-200'
                }`}>
                  {typeof file.content === 'string' ? file.content : (file.description || 'Berkas biner / arsip terlampir.')}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className={`p-4 border-t flex items-center justify-between text-xs ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-neutral-950 border-neutral-800'
        }`}>
          <span className={`font-mono ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
            ID Dokumen: {file.id}
          </span>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
              isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-neutral-800 hover:bg-neutral-700 text-white'
            }`}
          >
            Tutup Pratinjau
          </button>
        </div>

      </div>
    </div>
  );
};
