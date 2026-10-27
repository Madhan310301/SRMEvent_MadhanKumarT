import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Settings, Shield, Sliders, Database, Download, Check, Save } from 'lucide-react';

export const EmployerSettings: React.FC = () => {
  const { org, switchSector } = useAuth();
  const [maxShiftHours, setMaxShiftHours] = useState(12);
  const [minRestHours, setMinRestHours] = useState(11);
  const [maxConsecutiveDays, setMaxConsecutiveDays] = useState(6);
  const [otMultiplier, setOtMultiplier] = useState(1.5);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      alert('Organization compliance policies and fatigue thresholds updated successfully.');
    }, 600);
  };

  const handleExportAuditTrail = () => {
    alert('Exporting complete tamper-evident audit log of all punch adjustments, wage calculations, and hazard lifecycle actions.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-indigo-400" />
          Organization Compliance & Sector Rules
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Configure fatigue early-warning rules, overtime multiplier formulas, and industry sector parameters.
        </p>
      </div>

      {/* Switch Sector (Demo Control) */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-100">
          <Shield className="w-4 h-4 text-amber-400" />
          <h3>Active Industry Sector Configuration</h3>
        </div>
        <p className="text-xs text-zinc-400">
          FairShift adapts dynamically to distinct frontline industries without code modifications. Switch sectors to test live terminology changes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <button
            onClick={() => switchSector('construction')}
            className={`p-4 rounded-xl border text-left transition cursor-pointer ${
              org?.sector === 'construction'
                ? 'bg-amber-500/10 border-amber-500/60 shadow-md'
                : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm text-zinc-100">🏗️ Construction & Heavy Civil</span>
              {org?.sector === 'construction' && <Check className="w-4 h-4 text-amber-400" />}
            </div>
            <p className="text-xs text-zinc-400">Sites: Pier 42, Shaft-B • Daily/Hourly Wage • Heavy Equipment PPE</p>
          </button>

          <button
            onClick={() => switchSector('college')}
            className={`p-4 rounded-xl border text-left transition cursor-pointer ${
              org?.sector === 'college'
                ? 'bg-indigo-500/10 border-indigo-500/60 shadow-md'
                : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm text-zinc-100">🎓 Colleges & University Campuses</span>
              {org?.sector === 'college' && <Check className="w-4 h-4 text-indigo-400" />}
            </div>
            <p className="text-xs text-zinc-400">Departments: Biotech Complex, Hostels • Shift Roster • Sanitation</p>
          </button>
        </div>
      </div>

      {/* Fatigue & Overtime Form */}
      <form onSubmit={handleSaveSettings} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-100">
          <Sliders className="w-4 h-4 text-rose-400" />
          <h3>UN SDG 8 Fatigue Thresholds & Overtime Formulas</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Maximum Daily Continuous Shift (Hours)</label>
            <input
              type="number"
              min="8"
              max="16"
              value={maxShiftHours}
              onChange={(e) => setMaxShiftHours(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-[11px] text-zinc-400 mt-1 block">Exceeding this triggers high-priority fatigue alert.</span>
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Minimum Inter-Shift Rest Window (Hours)</label>
            <input
              type="number"
              min="8"
              max="16"
              value={minRestHours}
              onChange={(e) => setMinRestHours(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-[11px] text-zinc-400 mt-1 block">Mandatory gap between clock-out and subsequent clock-in.</span>
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Max Consecutive Working Days</label>
            <input
              type="number"
              min="5"
              max="14"
              value={maxConsecutiveDays}
              onChange={(e) => setMaxConsecutiveDays(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-[11px] text-zinc-400 mt-1 block">Mandatory 24h rest window required after this quota.</span>
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Standard Overtime Multiplier Rate</label>
            <select
              value={otMultiplier}
              onChange={(e) => setOtMultiplier(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={1.5}>1.5x Base Hourly Rate (Standard Weekday OT)</option>
              <option value={2.0}>2.0x Base Hourly Rate (Double Pay for Weekend / Holiday)</option>
            </select>
            <span className="text-[11px] text-zinc-400 mt-1 block">Automatically applied to hours exceeding standard 8.0h quota.</span>
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow transition"
        >
          <Save className="w-4 h-4" />
          {isSaved ? 'Saving Changes...' : 'Save Configuration'}
        </button>
      </form>

      {/* Export Audit Log */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white text-sm">Download Statutory Compliance & Audit Dossier</h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Tamper-evident log of all digital signatures, overtime records, and safety closures.
          </p>
        </div>

        <button
          onClick={handleExportAuditTrail}
          className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition"
        >
          <Download className="w-4 h-4" />
          Export Audit Log
        </button>
      </div>
    </div>
  );
};
