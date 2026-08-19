import React, { useRef, useState } from 'react';
import { Upload, CheckCircle2, Image as ImageIcon, Loader2 } from 'lucide-react';

interface AutoImageUploaderProps {
  currentImage?: string;
  onImageUploaded: (base64OrUrl: string) => void;
  label?: string;
  recommendedSize?: string;
  previewHeight?: string;
  className?: string;
}

export const AutoImageUploader: React.FC<AutoImageUploaderProps> = ({
  currentImage = '/assets/images/kerep.jpg',
  onImageUploaded,
  label = 'Upload Gambar / Foto',
  recommendedSize = 'Maksimal 5MB (JPG, PNG, WebP)',
  previewHeight = 'h-32 sm:h-36',
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [justUploaded, setJustUploaded] = useState(false);
  const [urlInput, setUrlInput] = useState(currentImage || '');

  // Compress image before saving to localStorage to prevent quota issues
  const processAndUploadFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        // Create canvas for auto-resizing/compressing
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 900;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to WebP / JPEG base64
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
          onImageUploaded(compressedBase64);
          setUrlInput(compressedBase64);
          setIsProcessing(false);
          setJustUploaded(true);
          setTimeout(() => setJustUploaded(false), 3000);
        } else {
          onImageUploaded(event.target?.result as string);
          setUrlInput(event.target?.result as string);
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        onImageUploaded(event.target?.result as string);
        setUrlInput(event.target?.result as string);
        setIsProcessing(false);
      };
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndUploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processAndUploadFile(file);
    }
  };

  const handleUrlChange = (newUrl: string) => {
    setUrlInput(newUrl);
    onImageUploaded(newUrl);
  };

  return (
    <div className={`space-y-2 bg-slate-50/80 p-3 sm:p-4 rounded-2xl border border-slate-200 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-emerald-700" />
          <span>{label}</span>
        </label>
        {justUploaded && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md animate-fade-in">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            Foto Berhasil Diupload Langsung!
          </span>
        )}
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-xl overflow-hidden transition-all duration-200 flex flex-col items-center justify-center p-3 text-center ${
          isDragging
            ? 'border-emerald-600 bg-emerald-50 scale-[1.01]'
            : 'border-slate-300 hover:border-emerald-500 bg-white hover:bg-slate-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {currentImage ? (
          <div className="w-full flex flex-col sm:flex-row items-center gap-3">
            <div className={`w-full sm:w-36 ${previewHeight} rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative`}>
              <img
                src={currentImage}
                alt="Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold gap-1.5">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Mengupload...</span>
                </div>
              )}
            </div>
            <div className="flex-1 text-left space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-800 group-hover:text-emerald-800 transition-colors">
                  Klik untuk Mengganti Foto Otomatis
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  Siap Pakai
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Tarik dan lepaskan file foto langsung ke sini, atau klik tombol untuk memilih dari galeri HP/Laptop.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                  <Upload className="w-3 h-3 text-emerald-800" />
                  Pilih Foto Lain
                </span>
                <span className="text-[10px] text-slate-400">{recommendedSize}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                Klik atau Seret Foto ke sini untuk Upload Otomatis
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">{recommendedSize}</p>
            </div>
          </div>
        )}
      </div>

      {/* Manual URL Fallback Input */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
          Atau URL:
        </span>
        <input
          type="text"
          value={urlInput}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://... atau /assets/images/foto.jpg"
          className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-600 focus:outline-hidden focus:border-emerald-600"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};
