import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, QrCode, Download, Copy, Printer, Check, Globe } from 'lucide-react';
import { CandaBirawaLogo } from './CandaBirawaLogo';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Authentic Canda Bhirawa SVG Data URI for QR center image
const candaBhirawaSvgRaw = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240">
  <path d="M 10 10 L 190 10 L 190 130 C 190 190 100 230 100 230 C 100 230 10 190 10 130 Z" fill="#00a8e8" stroke="#000000" stroke-width="8" stroke-linejoin="round" />
  <path d="M 14 100 L 186 100 L 186 130 C 186 186 100 224 100 224 C 100 224 14 186 14 130 Z" fill="#7cb342" />
  <rect x="85" y="75" width="30" height="145" fill="#1565c0" />
  <path d="M 90 80 Q 95 90 90 100 T 90 120 T 90 140 T 90 160 T 90 180 T 90 200" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.8" />
  <path d="M 100 80 Q 105 90 100 100 T 100 120 T 100 140 T 100 160 T 100 180 T 100 200" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.8" />
  <path d="M 110 80 Q 115 90 110 100 T 110 120 T 110 140 T 110 160 T 110 180 T 110 200" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.8" />
  <polygon points="100,35 45,80 155,80" fill="#1c1c1c" />
  <polygon points="100,52 85,75 115,75" fill="#e53935" stroke="#ffffff" stroke-width="1" />
  <polygon points="100,16 104,26 115,26 106,33 109,43 100,37 91,43 94,33 85,26 96,26" fill="#fbc02d" stroke="#f57f17" stroke-width="1" />
  <path d="M 68,185 C 45,160 35,120 50,80" fill="none" stroke="#fbc02d" stroke-width="3" stroke-linecap="round" />
  <ellipse cx="50" cy="80" rx="6" ry="3" fill="#fbc02d" transform="rotate(-30 50 80)" />
  <ellipse cx="44" cy="95" rx="6" ry="3" fill="#fbc02d" transform="rotate(-30 44 95)" />
  <ellipse cx="42" cy="110" rx="6" ry="3" fill="#fbc02d" transform="rotate(-30 42 110)" />
  <ellipse cx="44" cy="125" rx="6" ry="3" fill="#fbc02d" transform="rotate(-30 44 125)" />
  <ellipse cx="48" cy="140" rx="6" ry="3" fill="#fbc02d" transform="rotate(-30 48 140)" />
  <ellipse cx="54" cy="155" rx="6" ry="3" fill="#fbc02d" transform="rotate(-30 54 155)" />
  <ellipse cx="62" cy="170" rx="6" ry="3" fill="#fbc02d" transform="rotate(-30 62 170)" />
  <path d="M 132,185 C 155,160 165,120 150,80" fill="none" stroke="#388e3c" stroke-width="3" stroke-linecap="round" />
  <g><circle cx="150" cy="80" r="6" fill="#ffffff" stroke="#e0e0e0" stroke-width="1"/><path d="M 145 84 Q 150 88 155 84" fill="#388e3c"/></g>
  <g><circle cx="156" cy="95" r="6" fill="#ffffff" stroke="#e0e0e0" stroke-width="1"/><path d="M 151 99 Q 156 103 161 99" fill="#388e3c"/></g>
  <g><circle cx="158" cy="110" r="6" fill="#ffffff" stroke="#e0e0e0" stroke-width="1"/><path d="M 153 114 Q 158 118 163 114" fill="#388e3c"/></g>
  <g><circle cx="156" cy="125" r="6" fill="#ffffff" stroke="#e0e0e0" stroke-width="1"/><path d="M 151 129 Q 156 133 161 129" fill="#388e3c"/></g>
  <g><circle cx="152" cy="140" r="6" fill="#ffffff" stroke="#e0e0e0" stroke-width="1"/><path d="M 147 144 Q 152 148 157 144" fill="#388e3c"/></g>
  <g><circle cx="146" cy="155" r="6" fill="#ffffff" stroke="#e0e0e0" stroke-width="1"/><path d="M 141 159 Q 146 163 151 159" fill="#388e3c"/></g>
  <g><circle cx="138" cy="170" r="6" fill="#ffffff" stroke="#e0e0e0" stroke-width="1"/><path d="M 133 174 Q 138 178 143 174" fill="#388e3c"/></g>
  <g transform="translate(100, 138) scale(0.85)">
    <ellipse cx="0" cy="25" rx="22" ry="7" fill="#ffffff" stroke="#000000" stroke-width="2" />
    <path d="M -16 15 C -22 20 -15 26 0 26 C 15 26 22 20 16 15 Z" fill="#ffffff" stroke="#000000" stroke-width="2" />
    <path d="M -12 -5 Q -18 5 -12 15 L 12 15 Q 18 5 12 -5 Z" fill="#ffffff" stroke="#000000" stroke-width="2" />
    <path d="M -14 -2 Q -25 -10 -20 -20" stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <path d="M 14 -2 Q 25 -10 20 -20" stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <path d="M -14 5 Q -24 15 -18 20" stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <path d="M 14 5 Q 24 15 18 20" stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <circle cx="0" cy="-12" r="10" fill="#ffffff" stroke="#000000" stroke-width="2" />
    <polygon points="0,-28 -7,-18 7,-18" fill="#fbc02d" stroke="#000000" stroke-width="1.5" />
    <path d="M 0 -8 Q -8 -2 -6 8 Q -4 14 2 12" stroke="#000000" stroke-width="3" fill="none" stroke-linecap="round" />
    <ellipse cx="-11" cy="-12" rx="4" ry="6" fill="#ffffff" stroke="#000000" stroke-width="1.5" />
    <ellipse cx="11" cy="-12" rx="4" ry="6" fill="#ffffff" stroke="#000000" stroke-width="1.5" />
  </g>
  <g transform="translate(0, 10)">
    <path d="M 36 182 Q 100 204 164 182 L 158 198 Q 100 220 42 198 Z" fill="#ffffff" stroke="#000000" stroke-width="2" />
    <path d="M 26 191 L 38 183 L 39 199 Z" fill="#e0e0e0" stroke="#000000" stroke-width="1" />
    <path d="M 174 191 L 162 183 L 161 199 Z" fill="#e0e0e0" stroke="#000000" stroke-width="1" />
    <text x="100" y="196" font-family="'Arial Black', Impact, sans-serif" font-weight="900" font-size="11" fill="#000000" text-anchor="middle" letter-spacing="1">CANDA BIRAWA</text>
  </g>
</svg>`;

const logoDataUri = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(candaBhirawaSvgRaw)));

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  // Compute current actual browser URL dynamically
  const getLiveUrl = () => {
    if (typeof window === 'undefined') return 'https://desakerep.id';
    // If inside an iframe or deployed on web, pick canonical origin or full href
    const href = window.location.href;
    // Strip hash or query params if needed or keep full url
    return href.split('#')[0];
  };

  const [url, setUrl] = useState(getLiveUrl());
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  // Keep URL updated when modal is opened
  React.useEffect(() => {
    if (isOpen) {
      setUrl(getLiveUrl());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!qrRef.current) return;
    const svgElement = qrRef.current.querySelector('svg');
    if (!svgElement) return;

    const size = 1000;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Draw clean white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    // 2. Render QR code SVG to image
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const qrImg = new Image();

    await new Promise<void>((resolve) => {
      qrImg.onload = () => resolve();
      qrImg.onerror = () => resolve();
      qrImg.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    });

    ctx.drawImage(qrImg, 0, 0, size, size);

    // 3. Draw high-definition central badge with Canda Bhirawa emblem
    const badgeSize = size * 0.22; // ~220px
    const badgeX = (size - badgeSize) / 2;
    const badgeY = (size - badgeSize) / 2;
    const pad = 14;

    // Draw White rounded container with shadow & border
    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 6;

    const r = 24;
    ctx.beginPath();
    ctx.moveTo(badgeX + r, badgeY);
    ctx.lineTo(badgeX + badgeSize - r, badgeY);
    ctx.quadraticCurveTo(badgeX + badgeSize, badgeY, badgeX + badgeSize, badgeY + r);
    ctx.lineTo(badgeX + badgeSize, badgeY + badgeSize - r);
    ctx.quadraticCurveTo(badgeX + badgeSize, badgeY + badgeSize, badgeX + badgeSize - r, badgeY + badgeSize);
    ctx.lineTo(badgeX + r, badgeY + badgeSize);
    ctx.quadraticCurveTo(badgeX, badgeY + badgeSize, badgeX, badgeY + badgeSize - r);
    ctx.lineTo(badgeX, badgeY + r);
    ctx.quadraticCurveTo(badgeX, badgeY, badgeX + r, badgeY);
    ctx.closePath();
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#f59e0b'; // Gold border
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();

    // 4. Draw Official Logo Canda Bhirawa image inside center badge
    const candaImg = new Image();
    await new Promise<void>((resolve) => {
      candaImg.onload = () => {
        ctx.drawImage(
          candaImg,
          badgeX + pad,
          badgeY + pad,
          badgeSize - pad * 2,
          badgeSize - pad * 2
        );
        resolve();
      };
      candaImg.onerror = () => {
        // Fallback to SVG URI if png fails
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          ctx.drawImage(
            fallbackImg,
            badgeX + pad,
            badgeY + pad,
            badgeSize - pad * 2,
            badgeSize - pad * 2
          );
          resolve();
        };
        fallbackImg.onerror = () => resolve();
        fallbackImg.src = logoDataUri;
      };
      candaImg.src = logoDataUri;
    });

    // 5. Download PNG
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `QR-Peta-Desa-Kerep-Canda-Bhirawa.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="bg-[#0b3c2c] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 min-w-11 bg-amber-500/10 p-0.5 rounded-xl border border-amber-400/30 flex items-center justify-center overflow-hidden shadow-xs">
              <CandaBirawaLogo className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-tight">
                PETA DIGITAL DESA KEREP
              </h3>
              <p className="text-[11px] font-semibold text-white">
                Desa Kerep, Tarokan, Kediri
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-center">
          {/* QR Container Frame for Printing */}
          <div id="printable-qr-section" className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col items-center justify-center space-y-3">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-950 bg-amber-300 px-3 py-1 rounded-full inline-block border border-amber-400/60 shadow-2xs">
                PETA DIGITAL DESA KEREP
              </span>
              <h4 className="text-xs font-bold text-slate-900 pt-1">
                Scan QR Code untuk Membuka Website
              </h4>
            </div>

            {/* QR Code Canvas/SVG */}
            <div
              ref={qrRef}
              className="p-3 bg-white rounded-2xl shadow-md border border-slate-200 inline-block relative transition-transform hover:scale-105"
            >
              <QRCodeSVG
                value={url || window?.location?.href || 'https://desakerep.id'}
                size={210}
                level="Q"
                marginSize={2}
                fgColor="#0b3c2c"
                imageSettings={{
                  src: logoDataUri,
                  x: undefined,
                  y: undefined,
                  height: 38,
                  width: 38,
                  opacity: 1,
                  excavate: true,
                }}
              />
              {/* Overlay logo guarantee */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[40px] h-[40px] bg-white p-0.5 rounded-lg border border-amber-400/60 shadow-xs flex items-center justify-center overflow-hidden">
                  <CandaBirawaLogo className="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 font-medium">
              Gunakan Kamera HP atau Scanner WhatsApp untuk Pindai
            </p>
          </div>

          {/* Editable URL Section */}
          <div className="space-y-1.5 text-left bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
            <label className="text-[10px] font-bold text-slate-700 flex items-center gap-1">
              <Globe className="w-3 h-3 text-emerald-800" />
              <span>URL Website / Domain Target:</span>
            </label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://desakerep.id"
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
              <button
                onClick={handleCopyLink}
                className="p-2 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition-colors shrink-0 flex items-center justify-center"
                title="Salin Link"
              >
                {copied ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <p className="text-[10px] font-bold text-emerald-700">✓ Link berhasil disalin!</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleDownload}
              className="bg-emerald-800 hover:bg-emerald-900 text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Unduh PNG</span>
            </button>

            <button
              onClick={handlePrint}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Cetak Poster</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
