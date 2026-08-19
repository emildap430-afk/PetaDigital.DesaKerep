import fs from 'fs';
import path from 'path';

const dirs = [
  './assets/images',
  './assets/icons',
  './assets/data',
  './public/assets/images',
  './public/assets/icons',
  './public/assets/data'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function createSvgPlaceholder(filename, title, subtitle, bgGradientStart, bgGradientEnd, accentColor, iconSvg = '') {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgGradientStart}" />
        <stop offset="100%" stop-color="${bgGradientEnd}" />
      </linearGradient>
      <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(0,0,0,0)" />
        <stop offset="100%" stop-color="rgba(10,77,54,0.85)" />
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#bg)" />
    <!-- Decorative village landscape motifs -->
    <path d="M 0 350 Q 200 220 400 320 T 800 300 L 800 500 L 0 500 Z" fill="rgba(255,255,255,0.08)" />
    <path d="M 0 400 Q 250 280 500 360 T 800 380 L 800 500 L 0 500 Z" fill="rgba(0,0,0,0.15)" />
    <rect width="800" height="500" fill="url(#overlay)" />
    
    <!-- Central Badge Icon -->
    <g transform="translate(400, 200)">
      <circle r="55" fill="${accentColor}" opacity="0.9" />
      <circle r="48" fill="#ffffff" opacity="0.2" />
      ${iconSvg}
    </g>

    <!-- Text -->
    <text x="400" y="320" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="32" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">${title}</text>
    <text x="400" y="360" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="20" font-weight="500" fill="#e2e8f0" text-anchor="middle">${subtitle}</text>
    <rect x="360" y="390" width="80" height="4" rx="2" fill="${accentColor}" />
  </svg>`;

  ['./assets/images/', './public/assets/images/'].forEach(dir => {
    fs.writeFileSync(path.join(dir, filename), svgContent);
  });
}

function createLogoSvg() {
  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="100%" height="100%">
    <defs>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="30%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#1e3a8a" />
      </linearGradient>
    </defs>
    <!-- Outer Shield -->
    <path d="M 100 10 L 180 40 L 180 140 Q 100 230 100 230 Q 100 230 20 140 L 20 40 Z" fill="url(#shieldGrad)" stroke="#ffffff" stroke-width="6" />
    <!-- Inner Shield -->
    <path d="M 100 22 L 168 48 L 168 132 Q 100 212 100 212 Q 100 212 32 132 L 32 48 Z" fill="#0f4c3a" />
    <!-- Yellow Star -->
    <polygon points="100,32 105,48 122,48 108,58 113,74 100,64 87,74 92,58 78,48 95,48" fill="#fbbf24" />
    <!-- Rice stalks / Padi & Kapas -->
    <path d="M 60 140 Q 40 90 75 70" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" />
    <path d="M 140 140 Q 160 90 125 70" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
    <!-- Mountain and Sun -->
    <path d="M 60 130 L 100 90 L 140 130 Z" fill="#059669" />
    <path d="M 85 130 L 115 102 L 145 130 Z" fill="#10b981" opacity="0.8" />
    <circle cx="100" cy="85" r="10" fill="#fbbf24" />
    <!-- Water / River -->
    <path d="M 50 140 Q 100 125 150 140 Q 100 155 50 140 Z" fill="#3b82f6" />
    <!-- Banner -->
    <rect x="35" y="155" width="130" height="28" rx="4" fill="#dc2626" stroke="#ffffff" stroke-width="2" />
    <text x="100" y="174" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="1">DESA KEREP</text>
  </svg>`;

  ['./assets/images/logo-desa.png', './public/assets/images/logo-desa.png', './assets/images/logo-desa.svg', './public/assets/images/logo-desa.svg'].forEach(filePath => {
    fs.writeFileSync(filePath, logoSvg);
  });
}

createLogoSvg();

// Hero
createSvgPlaceholder('hero-bg.jpg', 'DESA KEREP', 'Kecamatan Tarokan, Kabupaten Kediri', '#0f4c3a', '#064e3b', '#10b981',
  '<polygon points="0,-25 15,15 -20,-10 20,-10 -15,15" fill="#fbbf24"/>'
);

// Schools
createSvgPlaceholder('sd-kerep.jpg', 'SD NEGERI KEREP', 'Sekolah Dasar Utama Desa Kerep', '#1e3a8a', '#0f4c3a', '#3b82f6',
  '<path d="M-20,15 L-20,-10 L0,-25 L20,-10 L20,15 Z" fill="#ffffff"/>'
);
createSvgPlaceholder('sd-kerep-2.jpg', 'Gedung Kelas SD Kerep', 'Fasilitas Belajar Mengajar', '#1e3a8a', '#1e293b', '#3b82f6',
  '<rect x="-20" y="-15" width="40" height="30" fill="#ffffff"/>'
);
createSvgPlaceholder('sd-kerep-3.jpg', 'Halaman & Lapangan SD Kerep', 'Kegiatan Ekstrakurikuler', '#166534', '#0f4c3a', '#22c55e',
  '<circle r="18" fill="#ffffff"/>'
);
createSvgPlaceholder('mi-darul-huda.jpg', 'MI DARUL HUDA KEREP', 'Madrasah Ibtidaiyah Desa Kerep', '#065f46', '#14532d', '#10b981',
  '<path d="M-15,-15 L15,-15 L15,15 L-15,15 Z" fill="#ffffff"/>'
);
createSvgPlaceholder('tk-dharma-wanita.jpg', 'TK DHARMA WANITA', 'Putra Gemilang Desa Kerep', '#854d0e', '#701a75', '#eab308',
  '<circle r="18" fill="#ffffff"/>'
);
createSvgPlaceholder('sdn1-balongasem.jpg', 'SDN 1 BALONGASEM', 'Dusun Balongasem Desa Kerep', '#1e40af', '#0f4c3a', '#60a5fa',
  '<polygon points="0,-20 20,15 -20,15" fill="#ffffff"/>'
);

// Potensi
createSvgPlaceholder('pertanian.jpg', 'PERTANIAN PADI', 'Potensi Utama Desa Kerep', '#15803d', '#166534', '#22c55e',
  '<path d="M-15,15 Q0,-25 15,15" stroke="#ffffff" stroke-width="6" fill="none"/>'
);
createSvgPlaceholder('pertanian-2.jpg', 'Lahan Hortikultura', 'Cabai, Tomat & Sayuran', '#166534', '#14532d', '#4ade80',
  '<circle r="15" fill="#ffffff"/>'
);
createSvgPlaceholder('peternakan.jpg', 'PETERNAKAN SAPI', 'Komoditas Peternakan Warga', '#854d0e', '#713f12', '#f59e0b',
  '<rect x="-18" y="-12" width="36" height="24" rx="4" fill="#ffffff"/>'
);
createSvgPlaceholder('peternakan-2.jpg', 'Peternakan Kambing', 'Kambing Potong Desa Kerep', '#713f12', '#451a03', '#d97706',
  '<circle r="15" fill="#ffffff"/>'
);
createSvgPlaceholder('toga.jpg', 'TOGA HERBAL', 'Tanaman Obat Keluarga', '#047857', '#064e3b', '#34d399',
  '<path d="M0,-20 C20,-10 20,20 0,20 C-20,20 -20,-10 0,-20 Z" fill="#ffffff"/>'
);
createSvgPlaceholder('toga-2.jpg', 'Taman Herbal Warga', 'Jahe Merah & Kunyit', '#065f46', '#064e3b', '#10b981',
  '<circle r="15" fill="#ffffff"/>'
);
createSvgPlaceholder('umkm.jpg', 'ANYAMAN BAMBU', 'Kerajinan Unggulan Desa Kerep', '#b45309', '#78350f', '#fbbf24',
  '<rect x="-15" y="-15" width="30" height="30" fill="#ffffff"/>'
);
createSvgPlaceholder('umkm-2.jpg', 'Olahan Pangan Lokal', 'Keripik & Kuliner Desa', '#92400e', '#451a03', '#f59e0b',
  '<circle r="15" fill="#ffffff"/>'
);
createSvgPlaceholder('lingkungan.jpg', 'LINGKUNGAN ASRI', 'Pemandangan Hijau Desa Kerep', '#0f766e', '#134e4a', '#2dd4bf',
  '<path d="M-20,10 Q0,-20 20,10" stroke="#ffffff" stroke-width="6" fill="none"/>'
);
createSvgPlaceholder('lingkungan-2.jpg', 'Sungai & Sumber Air', 'Sumber Daya Alam Desa', '#0e7490', '#164e63', '#38bdf8',
  '<circle r="15" fill="#ffffff"/>'
);
createSvgPlaceholder('budaya.jpg', 'BUDAYA DESA KEREP', 'Pelestarian Tradisi & Kesenian', '#be123c', '#881337', '#fb7185',
  '<polygon points="0,-20 18,15 -18,15" fill="#ffffff"/>'
);
createSvgPlaceholder('budaya-2.jpg', 'Sedekah Bumi', 'Upacara Adat Tahunan', '#9f1239', '#4c0519', '#f43f5e',
  '<circle r="15" fill="#ffffff"/>'
);

// Activities & Facilities
createSvgPlaceholder('kegiatan-1.jpg', 'OBSERVASI KKN', 'Dokumentasi Lapangan 2026', '#1e3a8a', '#1e1b4b', '#60a5fa',
  '<circle r="16" fill="#ffffff"/>'
);
createSvgPlaceholder('kegiatan-2.jpg', 'MUSYAWARAH DESA', 'Diskusi Perangkat & Warga', '#0f4c3a', '#064e3b', '#34d399',
  '<rect x="-15" y="-12" width="30" height="24" fill="#ffffff"/>'
);
createSvgPlaceholder('kegiatan-3.jpg', 'KERJA BAKTI DESA', 'Gotong Royong Kebersihan', '#15803d', '#14532d', '#4ade80',
  '<circle r="15" fill="#ffffff"/>'
);
createSvgPlaceholder('kegiatan-4.jpg', 'PENDATAAN UMKM', 'Pengembangan Potensi Lokal', '#b45309', '#78350f', '#f59e0b',
  '<rect x="-15" y="-15" width="30" height="30" fill="#ffffff"/>'
);

createSvgPlaceholder('fasilitas-kesehatan.jpg', 'POSKESDES KEREP', 'Pelayanan Kesehatan Warga', '#be123c', '#881337', '#f43f5e',
  '<path d="M-8,-20 L8,-20 L8,-8 L20,-8 L20,8 L8,8 L8,20 L-8,20 L-8,8 L-20,8 L-20,-8 L-8,-8 Z" fill="#ffffff"/>'
);
createSvgPlaceholder('fasilitas-ibadah.jpg', 'MASJID BAITUL MUTTAQIN', 'Tempat Ibadah Utama Desa', '#6b21a8', '#3b0764', '#c084fc',
  '<path d="M-15,15 L-15,-5 Q0,-25 15,-5 L15,15 Z" fill="#ffffff"/>'
);
createSvgPlaceholder('fasilitas-umum.jpg', 'BALAI DESA KEREP', 'Pusat Pelayanan Masyarakat', '#0f4c3a', '#022c22', '#10b981',
  '<rect x="-20" y="-15" width="40" height="30" rx="3" fill="#ffffff"/>'
);
createSvgPlaceholder('fasilitas-olahraga.jpg', 'LAPANGAN KEREP', 'Sarana Olahraga & Acara', '#15803d', '#14532d', '#22c55e',
  '<circle r="18" fill="#ffffff"/>'
);

console.log('Successfully created image assets in assets/images and public/assets/images');
