import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Building2, MapPin, Users, QrCode, Plus, ShieldCheck, Download } from 'lucide-react';
import QRCode from 'qrcode';

export const EmployerSites: React.FC = () => {
  const { org, sectorConfig } = useAuth();
  const [selectedSiteQr, setSelectedSiteQr] = useState<{ name: string; code: string; qrDataUrl: string } | null>(null);

  const sites = org?.sites || [];

  const handleGeneratePosterQr = async (site: { name: string; code: string; lat: number; lng: number }) => {
    const payload = JSON.stringify({
      orgId: org?.id,
      siteCode: site.code,
      name: site.name,
      lat: site.lat,
      lng: site.lng,
      timestamp: Date.now()
    });
    const url = await QRCode.toDataURL(payload, { width: 350, margin: 2 });
    setSelectedSiteQr({ name: site.name, code: site.code, qrDataUrl: url });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-indigo-400" />
            {sectorConfig.orgUnitPluralLabel || 'Sites'} & Geofence Management
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Configure physical coordinates, 150m geofence tolerances, and generate printable QR attendance posters.
          </p>
        </div>

        <button
          onClick={() => alert(`Adding new ${(sectorConfig.orgUnitLabel || 'Site').toLowerCase()} with custom GPS geofence.`)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          Add {sectorConfig.orgUnitLabel || 'Site'}
        </button>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {sites.map((site) => (
          <div key={site.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 hover:border-zinc-700 transition">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                  {site.code}
                </span>
                <h3 className="font-bold text-white text-base mt-1.5">{site.name}</h3>
              </div>
              <span className="p-2 rounded-lg bg-zinc-800 text-zinc-300">
                <MapPin className="w-4 h-4 text-indigo-400" />
              </span>
            </div>

            <div className="space-y-2 text-xs border-y border-zinc-800/80 py-3">
              <div className="flex justify-between">
                <span className="text-zinc-400">GPS Coordinates:</span>
                <span className="text-zinc-200 font-mono">{site.lat.toFixed(4)}, {site.lng.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Geofence Radius:</span>
                <span className="text-emerald-400 font-semibold">150 meters (Strict)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Clocked-in Now:</span>
                <span className="text-zinc-200 font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-zinc-400" /> 18 workers
                </span>
              </div>
            </div>

            <button
              onClick={() => handleGeneratePosterQr(site)}
              className="w-full py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-bold text-zinc-200 flex items-center justify-center gap-2 cursor-pointer transition"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              Printable Attendance QR
            </button>
          </div>
        ))}
      </div>

      {/* QR Poster Modal */}
      {selectedSiteQr && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 max-w-sm w-full rounded-2xl p-6 text-center space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="font-bold text-sm text-white">Physical QR Wall Poster</span>
              <button onClick={() => setSelectedSiteQr(null)} className="text-zinc-400 hover:text-white font-bold text-lg">&times;</button>
            </div>

            <div>
              <h3 className="font-bold text-base text-zinc-100">{selectedSiteQr.name}</h3>
              <p className="text-xs text-amber-400 font-mono mt-0.5">Code: {selectedSiteQr.code}</p>
            </div>

            <div className="p-4 bg-white rounded-2xl inline-block shadow-inner mx-auto">
              <img src={selectedSiteQr.qrDataUrl} alt="Site QR" className="w-56 h-56 mx-auto" />
            </div>

            <p className="text-xs text-zinc-400">
              Mount this poster at the gate. Employees scan it with the FairShift Worker App to record attendance.
            </p>

            <button
              onClick={() => alert('Printing official high-resolution attendance poster.')}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow"
            >
              <Download className="w-4 h-4" />
              Download Printable Poster (PDF/PNG)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
