import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RouteState } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { getStoredMapMarkersList } from '../utils/dataStore';
import { getAssetUrl } from '../utils/imageHelper';

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
      popupHtml.className = 'text-left font-sans w-[240px] sm:w-[280px] overflow-hidden rounded-2xl bg-white';
      popupHtml.innerHTML = `
        <div style="position: relative; height: 110px; width: 100%; overflow: hidden; background-color: #0f172a;">
          <img src="${getAssetUrl(markerData.image)}" alt="${markerData.name}" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%);"></div>
          <span style="
            position: absolute;
            bottom: 8px;
            left: 8px;
            background-color: ${markerData.color};
            color: #ffffff;
            font-size: 9px;
            font-weight: 800;
            padding: 3px 8px;
            border-radius: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          ">
            ${markerData.categoryLabel}
          </span>
        </div>
        
        <div style="padding: 10px 12px 12px 12px;">
          <h4 style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 0; margin-bottom: 4px; line-height: 1.3;">
            ${markerData.name}
          </h4>
          <p style="font-size: 11px; color: #64748b; margin-bottom: 8px; line-height: 1.4; display: flex; align-items: flex-start; gap: 4px;">
            <span>📍</span>
            <span>${markerData.address}</span>
          </p>
          <button id="btn-popup-${markerData.id}" style="
            width: 100%;
            background: linear-gradient(135deg, #0b3c2c 0%, #064e3b 100%);
            color: #ffffff;
            border: none;
            padding: 8px 12px;
            border-radius: 10px;
            font-size: 11px;
            font-weight: 800;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            box-shadow: 0 2px 5px rgba(11, 60, 44, 0.3);
            transition: all 0.2s ease;
          ">
            <span>Buka Halaman Terkait</span>
            <span>→</span>
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 320,
        minWidth: 220,
        autoPan: true,
        autoPanPadding: [20, 20],
        closeButton: true
      });

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
    <div className="pb-24 flex flex-col h-[calc(100vh-120px)] min-h-[500px]">
      <Breadcrumb items={breadcrumbs} onNavigate={onNavigate} />

      <div className="flex-1 relative max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 flex flex-col">
        {/* Leaflet Map container */}
        <div className="flex-1 w-full rounded-2xl overflow-hidden border border-slate-300 shadow-sm relative min-h-[420px]">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Floating Legend Box */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 z-30 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 shadow-lg space-y-2">
            <h4 className="text-[11px] font-black tracking-wider uppercase text-slate-800 border-b border-slate-100 pb-1 flex items-center justify-between">
              <span>Legenda Peta Interaktif</span>
              <span className="text-[9px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">Desa Kerep</span>
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-slate-700 font-medium">
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

        <p className="text-xs text-slate-400 text-center mt-2 italic">
          * Peta batas wilayah dan sebaran fasilitas menggunakan data OpenStreetMap & Observasi KKN Tematik 2026
        </p>
      </div>
    </div>
  );
};
