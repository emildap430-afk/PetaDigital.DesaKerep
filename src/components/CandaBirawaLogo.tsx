import React, { useState } from 'react';

export const CandaBirawaLogo: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => {
  const [useFallback, setUseFallback] = useState(false);

  if (useFallback) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" className={className}>
        {/* Outer Black Shield Border */}
        <path d="M 10 10 L 190 10 L 190 130 C 190 190 100 230 100 230 C 100 230 10 190 10 130 Z" fill="#00a8e8" stroke="#000000" strokeWidth="8" strokeLinejoin="round" />
        
        {/* Lower Green Ground */}
        <path d="M 14 100 L 186 100 L 186 130 C 186 186 100 224 100 224 C 100 224 14 186 14 130 Z" fill="#7cb342" />

        {/* Central Vertical River (Blue with white waves) */}
        <rect x="85" y="75" width="30" height="145" fill="#1565c0" />
        <path d="M 90 80 Q 95 90 90 100 T 90 120 T 90 140 T 90 160 T 90 180 T 90 200" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.8" />
        <path d="M 100 80 Q 105 90 100 100 T 100 120 T 100 140 T 100 160 T 100 180 T 100 200" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.8" />
        <path d="M 110 80 Q 115 90 110 100 T 110 120 T 110 140 T 110 160 T 110 180 T 110 200" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.8" />

        {/* Black Mountain with Red Triangle */}
        <polygon points="100,35 45,80 155,80" fill="#1c1c1c" />
        <polygon points="100,52 85,75 115,75" fill="#e53935" stroke="#ffffff" strokeWidth="1" />

        {/* Top Yellow Five-pointed Star */}
        <polygon points="100,16 104,26 115,26 106,33 109,43 100,37 91,43 94,33 85,26 96,26" fill="#fbc02d" stroke="#f57f17" strokeWidth="1" />

        {/* Rice Stalk (Padi - Left Side) */}
        <path d="M 68,185 C 45,160 35,120 50,80" fill="none" stroke="#fbc02d" strokeWidth="3" strokeLinecap="round" />
        {[
          { cx: 50, cy: 80 }, { cx: 44, cy: 95 }, { cx: 42, cy: 110 },
          { cx: 44, cy: 125 }, { cx: 48, cy: 140 }, { cx: 54, cy: 155 }, { cx: 62, cy: 170 }
        ].map((p, idx) => (
          <ellipse key={idx} cx={p.cx} cy={p.cy} rx="6" ry="3" fill="#fbc02d" transform={`rotate(-30 ${p.cx} ${p.cy})`} />
        ))}

        {/* Cotton Stalk (Kapas - Right Side) */}
        <path d="M 132,185 C 155,160 165,120 150,80" fill="none" stroke="#388e3c" strokeWidth="3" strokeLinecap="round" />
        {[
          { cx: 150, cy: 80 }, { cx: 156, cy: 95 }, { cx: 158, cy: 110 },
          { cx: 156, cy: 125 }, { cx: 152, cy: 140 }, { cx: 146, cy: 155 }, { cx: 138, cy: 170 }
        ].map((p, idx) => (
          <g key={idx}>
            <circle cx={p.cx} cy={p.cy} r="6" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
            <path d={`M ${p.cx - 5} ${p.cy + 4} Q ${p.cx} ${p.cy + 8} ${p.cx + 5} ${p.cy + 4}`} fill="#388e3c" />
          </g>
        ))}

        {/* Center Sitting Ganesha Figure */}
        <g transform="translate(100, 138) scale(0.85)">
          {/* Base pedestal */}
          <ellipse cx="0" cy="25" rx="22" ry="7" fill="#ffffff" stroke="#000000" strokeWidth="2" />
          {/* Body & legs */}
          <path d="M -16 15 C -22 20 -15 26 0 26 C 15 26 22 20 16 15 Z" fill="#ffffff" stroke="#000000" strokeWidth="2" />
          <path d="M -12 -5 Q -18 5 -12 15 L 12 15 Q 18 5 12 -5 Z" fill="#ffffff" stroke="#000000" strokeWidth="2" />
          {/* Arms (4 arms) */}
          <path d="M -14 -2 Q -25 -10 -20 -20" stroke="#000000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 14 -2 Q 25 -10 20 -20" stroke="#000000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M -14 5 Q -24 15 -18 20" stroke="#000000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 14 5 Q 24 15 18 20" stroke="#000000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Head & Crown */}
          <circle cx="0" cy="-12" r="10" fill="#ffffff" stroke="#000000" strokeWidth="2" />
          <polygon points="0,-28 -7,-18 7,-18" fill="#fbc02d" stroke="#000000" strokeWidth="1.5" />
          {/* Trunk */}
          <path d="M 0 -8 Q -8 -2 -6 8 Q -4 14 2 12" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Ears */}
          <ellipse cx="-11" cy="-12" rx="4" ry="6" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
          <ellipse cx="11" cy="-12" rx="4" ry="6" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
        </g>

        {/* Ribbon at Bottom with Text CANDA BIRAWA */}
        <g transform="translate(0, 10)">
          <path d="M 40 182 Q 100 202 160 182 L 155 197 Q 100 217 45 197 Z" fill="#ffffff" stroke="#000000" strokeWidth="2" />
          <path d="M 30 190 L 42 183 L 43 198 Z" fill="#e0e0e0" stroke="#000000" strokeWidth="1" />
          <path d="M 170 190 L 158 183 L 157 198 Z" fill="#e0e0e0" stroke="#000000" strokeWidth="1" />
          <text x="100" y="196" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="10" fill="#000000" textAnchor="middle" letterSpacing="0.8">CANDA BIRAWA</text>
        </g>
      </svg>
    );
  }

  return (
    <img
      src="/assets/images/logo-canda-birawa.png"
      alt="Logo Canda Bhirawa Kabupaten Kediri"
      className={`${className} object-contain`}
      onError={() => setUseFallback(true)}
    />
  );
};


