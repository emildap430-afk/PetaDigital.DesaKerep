import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RouteState } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { getStoredMapMarkersList } from '../utils/dataStore';

interface PetaViewProps {
  onNavigate: (route: RouteState) => void;
}

export const PetaView: React.FC<PetaViewProps> = ({ onNavigate }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up old map instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Default center for Desa Kerep, Tarokan, Kediri
    const centerLat = -7.7397;
    const centerLng = 111.9135;

    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 15,
      zoomControl: true
    });

    mapInstanceRef.current = map;

    // Tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const mapMarkersList = getStoredMapMarkersList();

    // Add markers
    mapMarkersList.forEach((markerData) => {
      // Create custom SVG marker icon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background-color: ${markerData.color};
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            font-weight: bold;
          ">
            ●
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14]
      });

      const marker = L.marker([markerData.lat, markerData.lng], { icon: customIcon }).addTo(map);

      // Create rich popup content
      const popupHtml = document.createElement('div');
      popupHtml.className = 'text-left max-w-[200px] font-sans';
      popupHtml.innerHTML = `
        <div style="height: 80px; width: 100%; border-radius: 8px; overflow: hidden; margin-bottom: 6px; background-color: #f1f5f9;">
          <img src="${markerData.image}" alt="${markerData.name}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <span style="background-color: #f1f5f9; color: ${markerData.color}; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">
          ${markerData.categoryLabel}
        </span>
        <h4 style="font-size: 11px; font-weight: 800; color: #0f172a; margin-top: 4px; margin-bottom: 2px; line-height: 1.2;">
          ${markerData.name}
        </h4>
        <p style="font-size: 10px; color: #64748b; margin-bottom: 8px;">${markerData.address}</p>
        <button id="btn-popup-${markerData.id}" style="
          width: 100%;
          background-color: #0b3c2c;
          color: white;
          border: none;
          padding: 5px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
        ">
          Lihat Detail →
        </button>
      `;

      marker.bindPopup(popupHtml);

      // Handle popup click navigate
      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-popup-${markerData.id}`);
        if (btn) {
          btn.onclick = () => {
            if (markerData.category === 'pendidikan') {
              onNavigate({ view: 'sarana-pendidikan' });
            } else if (markerData.category === 'potensi') {
              onNavigate({ view: 'potensi' });
            } else if (markerData.category === 'kantor' || markerData.category === 'fasum') {
              onNavigate({ view: 'fasilitas' });
            } else {
              onNavigate({ view: 'profil' });
            }
          };
        }
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onNavigate]);

  const breadcrumbs = [
    { label: 'Beranda', target: { view: 'beranda' as const } },
    { label: 'Peta' }
  ];

  return (
    <div className="pb-24 flex flex-col h-[calc(100vh-60px)]">
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      <div className="flex-1 relative max-w-md mx-auto w-full p-2 flex flex-col">
        {/* Leaflet Map container */}
        <div className="flex-1 w-full rounded-2xl overflow-hidden border border-slate-300 shadow-sm relative min-h-[380px]">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Floating Legend Box */}
          <div className="absolute bottom-3 left-3 right-3 z-30 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-lg space-y-1.5">
            <h4 className="text-[10px] font-black tracking-wider uppercase text-slate-800 border-b border-slate-100 pb-1">
              Legenda Peta
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-slate-700">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block shrink-0"></span>
                <span>Kantor Desa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shrink-0"></span>
                <span>Pendidikan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block shrink-0"></span>
                <span>Tempat Ibadah</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block shrink-0"></span>
                <span>Kesehatan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block shrink-0"></span>
                <span>Fasilitas Umum</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block shrink-0"></span>
                <span>Potensi Desa</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 text-center mt-1.5 italic">
          * Peta menggunakan data OpenStreetMap
        </p>
      </div>
    </div>
  );
};
