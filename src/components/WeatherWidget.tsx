import React, { useEffect, useState } from 'react';
import { Sun, CloudSun, Cloud, CloudRain, CloudLightning, Wind, Droplets, RefreshCw } from 'lucide-react';

interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  conditionText: string;
}

export const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(false);
    try {
      // Coordinates for Kecamatan Tarokan, Kabupaten Kediri (-7.73, 111.96)
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=-7.73&longitude=111.96&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FJakarta'
      );
      if (!res.ok) throw new Error('Failed to fetch weather');
      const data = await res.json();
      const current = data.current;

      const code = current.weather_code;
      let text = 'Cerah Berawan';
      if (code === 0) text = 'Cerah';
      else if (code >= 1 && code <= 3) text = 'Berawan';
      else if (code >= 45 && code <= 48) text = 'Kabut Berawan';
      else if (code >= 51 && code <= 67) text = 'Hujan Ringan';
      else if (code >= 71 && code <= 77) text = 'Hujan Es / Salju';
      else if (code >= 80 && code <= 82) text = 'Hujan Deras';
      else if (code >= 95) text = 'Hujan Petir';

      setWeather({
        temperature: Math.round(current.temperature_2m),
        apparentTemperature: Math.round(current.apparent_temperature),
        humidity: Math.round(current.relative_humidity_2m),
        windSpeed: Math.round(current.wind_speed_10m),
        weatherCode: code,
        conditionText: text,
      });
    } catch (err) {
      console.error(err);
      setError(true);
      // Fallback default data for Tarokan, Kediri
      setWeather({
        temperature: 30,
        apparentTemperature: 32,
        humidity: 75,
        windSpeed: 10,
        weatherCode: 2,
        conditionText: 'Cerah Berawan',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="w-8 h-8 text-amber-500 animate-pulse" />;
    if (code >= 1 && code <= 3) return <CloudSun className="w-8 h-8 text-amber-400" />;
    if (code >= 45 && code <= 48) return <Cloud className="w-8 h-8 text-slate-400" />;
    if (code >= 51 && code <= 82) return <CloudRain className="w-8 h-8 text-sky-500" />;
    if (code >= 95) return <CloudLightning className="w-8 h-8 text-indigo-500" />;
    return <CloudSun className="w-8 h-8 text-amber-400" />;
  };

  return (
    <div className="bg-linear-to-br from-emerald-900 to-slate-900 text-white p-4 rounded-2xl shadow-md border border-emerald-800/40 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

      <div className="flex items-center justify-between mb-3 border-b border-emerald-800/60 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">Prakiraan Cuaca Terkini</h3>
            <p className="text-[11px] font-medium text-slate-300">Kec. Tarokan (Desa Kerep)</p>
          </div>
        </div>
        <button
          onClick={fetchWeather}
          disabled={loading}
          title="Perbarui Cuaca"
          className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 transition-colors focus:outline-hidden active:scale-95"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading && !weather ? (
        <div className="flex items-center justify-center py-4 text-xs text-slate-300 gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
          <span>Memuat data cuaca...</span>
        </div>
      ) : weather ? (
        <div className="grid grid-cols-2 gap-3 items-center">
          <div className="flex items-center gap-3">
            {getWeatherIcon(weather.weatherCode)}
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white tracking-tight">{weather.temperature}°C</span>
              </div>
              <p className="text-xs font-semibold text-emerald-200">{weather.conditionText}</p>
            </div>
          </div>

          <div className="space-y-1.5 bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-800/40 text-[11px]">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1">
                <Droplets className="w-3 h-3 text-sky-400" />
                <span>Kelembapan</span>
              </span>
              <span className="font-bold text-white">{weather.humidity}%</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1">
                <Wind className="w-3 h-3 text-emerald-400" />
                <span>Angin</span>
              </span>
              <span className="font-bold text-white">{weather.windSpeed} km/j</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
