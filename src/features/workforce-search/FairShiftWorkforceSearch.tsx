import React, { useState, useEffect } from 'react';
import { MorphOrb } from '@/components/morph-orb/MorphOrb';
import { OrbState } from '@/components/morph-orb/engine';
import {
  parseWorkforceQuery,
  executeWorkforceSearch,
  SearchResultWorker,
  SearchFilters,
  InterpretedFilterChip
} from './service';
import { useAuth } from '@/features/auth/AuthContext';
import { Table, LayoutGrid, CheckCircle2, AlertTriangle, Clock, Award, ShieldAlert, X } from 'lucide-react';

interface FairShiftWorkforceSearchProps {
  onSelectWorker?: (workerId: string) => void;
}

export const FairShiftWorkforceSearch: React.FC<FairShiftWorkforceSearchProps> = ({ onSelectWorker }) => {
  const { org, activeRole } = useAuth();
  const [orbState, setOrbState] = useState<OrbState>('idle');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [understoodChips, setUnderstoodChips] = useState<InterpretedFilterChip[]>([]);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  // Initial workforce dataset
  const [allWorkers] = useState<SearchResultWorker[]>([
    {
      id: 'w-01',
      name: 'Murugan K.',
      employeeCode: 'KMIP-0421',
      departmentOrSite: org?.sites[0]?.name || 'Pier 42 Metro Viaduct',
      jobRole: 'Heavy Machinery & Crane Specialist',
      attendanceStatus: 'present',
      overtimeHoursThisWeek: 4.5,
      fatigueFlagCount: 1,
      skillsCount: 2,
      tradeSkills: ['Crane Operations', 'Rigging Safety']
    },
    {
      id: 'w-02',
      name: 'Lakshmi S.',
      employeeCode: 'SRM-8812',
      departmentOrSite: org?.sites[0]?.name || 'Biotech Complex',
      jobRole: 'Facilities & Sanitation Lead',
      attendanceStatus: 'present',
      overtimeHoursThisWeek: 2.0,
      fatigueFlagCount: 0,
      skillsCount: 2,
      tradeSkills: ['Biohazard Sanitation', 'Chemical Safety']
    },
    {
      id: 'w-03',
      name: 'Karthik Raja',
      employeeCode: 'KMIP-0911',
      departmentOrSite: org?.sites[1]?.name || 'Underground Tunnel Shaft-B',
      jobRole: 'Structural Welder (SMAW/TIG)',
      attendanceStatus: 'present',
      overtimeHoursThisWeek: 6.0,
      fatigueFlagCount: 0,
      skillsCount: 1,
      tradeSkills: ['Arc Welding', 'High-Angle Safety']
    },
    {
      id: 'w-04',
      name: 'Anil Kumar',
      employeeCode: 'KMIP-0155',
      departmentOrSite: org?.sites[0]?.name || 'Pier 42 Metro Viaduct',
      jobRole: 'Heavy Dumper Operator',
      attendanceStatus: 'present',
      overtimeHoursThisWeek: 8.5,
      fatigueFlagCount: 2,
      skillsCount: 1,
      tradeSkills: ['Heavy Transport']
    },
    {
      id: 'w-05',
      name: 'Praveen Das',
      employeeCode: 'KMIP-0772',
      departmentOrSite: org?.sites[2]?.name || 'Precast Yard',
      jobRole: 'Scaffolding Technician',
      attendanceStatus: 'absent',
      overtimeHoursThisWeek: 0,
      fatigueFlagCount: 1,
      skillsCount: 1,
      tradeSkills: ['Working at Height']
    }
  ]);

  const [filteredWorkers, setFilteredWorkers] = useState<SearchResultWorker[]>(allWorkers);

  // Keyboard shortcut listener (/ or Cmd/Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' && (e.target as HTMLElement).tagName !== 'INPUT') || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>('input[placeholder*="Search employees"]');
        if (input) input.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQuerySubmit = async (queryText: string) => {
    setOrbState('thinking');
    setLiveAnnouncement('Analyzing natural language search criteria...');

    // Simulate fast deterministic search latency
    await new Promise((r) => setTimeout(r, 380));

    const siteNames = (org?.sites || []).map(s => s.name);
    const { filters, understoodChips: chips } = parseWorkforceQuery(queryText, siteNames);

    setUnderstoodChips(chips);
    const results = executeWorkforceSearch(allWorkers, filters, activeRole);
    setFilteredWorkers(results);
    setOrbState(results.length > 0 ? 'result' : 'idle');
    setLiveAnnouncement(`${results.length} workforce records found`);
  };

  const handleRemoveChip = (chipId: string) => {
    const updated = understoodChips.filter(c => c.id !== chipId);
    setUnderstoodChips(updated);
    if (updated.length === 0) {
      setFilteredWorkers(allWorkers);
      setOrbState('idle');
    }
  };

  const quickChips = [
    { label: '⚡ Overtime this week', query: 'who worked overtime this week' },
    { label: '⚠️ Fatigue alerts', query: 'workers with fatigue flags' },
    { label: '❌ Absent today', query: 'absent workers' },
    { label: '🏗️ Certified in crane', query: 'crane operators' }
  ];

  return (
    <div className="w-full space-y-4">
      {/* Polite Accessibility Live Region */}
      <div className="sr-only" aria-live="polite">
        {liveAnnouncement}
      </div>

      {/* MorphOrb Assistant */}
      <MorphOrb
        placeholder="Search employees, skills, shifts or overtime in plain language..."
        onSubmit={handleQuerySubmit}
        state={orbState}
        onClear={() => {
          setUnderstoodChips([]);
          setFilteredWorkers(allWorkers);
          setOrbState('idle');
        }}
      />

      {/* Quick Search Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[#5F6B73] dark:text-[#95A0A6] font-semibold text-[11px] uppercase tracking-wider shrink-0">
          Quick queries:
        </span>
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleQuerySubmit(chip.query)}
            className="px-3 py-1.5 rounded-full bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] hover:border-[#286B58] dark:hover:border-[#3DA386] text-xs font-medium text-[#17191B] dark:text-[#F4F4F2] shrink-0 transition-colors cursor-pointer"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* "Understood as" Filter Chips */}
      {understoodChips.length > 0 && (
        <div className="p-3 bg-[#FAFAF8] dark:bg-[#141618] rounded-xl border border-[#E8E8E5] dark:border-[#282B2F] flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-[#5F6B73] dark:text-[#95A0A6]">Understood as:</span>
          {understoodChips.map((chip) => (
            <span
              key={chip.id}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#286B58]/10 text-[#286B58] dark:text-[#3DA386] font-semibold text-xs border border-[#286B58]/20"
            >
              <span>{chip.label}</span>
              <button
                onClick={() => handleRemoveChip(chip.id)}
                className="hover:text-black dark:hover:text-white p-0.5"
                aria-label={`Remove filter ${chip.label}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Results Header with View Mode Toggle */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs font-bold text-[#17191B] dark:text-white tracking-wider uppercase">
          Workforce Records ({filteredWorkers.length})
        </div>

        <div className="inline-flex p-1 rounded-lg bg-[#E8E8E5] dark:bg-[#282B2F] border border-[#D5D5CF] dark:border-[#373B40]">
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-md transition-all cursor-pointer ${
              viewMode === 'table' ? 'bg-white dark:bg-[#181A1D] text-[#17191B] dark:text-white shadow-sm' : 'text-[#5F6B73] dark:text-[#95A0A6]'
            }`}
            aria-label="Table view"
          >
            <Table className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`p-1.5 rounded-md transition-all cursor-pointer ${
              viewMode === 'cards' ? 'bg-white dark:bg-[#181A1D] text-[#17191B] dark:text-white shadow-sm' : 'text-[#5F6B73] dark:text-[#95A0A6]'
            }`}
            aria-label="Card grid view"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Results: Table View */}
      {viewMode === 'table' ? (
        <div className="bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFAF8] dark:bg-[#141618] text-[#5F6B73] dark:text-[#95A0A6] uppercase font-bold tracking-wider border-b border-[#E8E8E5] dark:border-[#282B2F]">
                <tr>
                  <th className="p-3.5">Employee</th>
                  <th className="p-3.5">Site / Dept</th>
                  <th className="p-3.5">Attendance</th>
                  <th className="p-3.5">Weekly OT</th>
                  <th className="p-3.5">Fatigue Risk</th>
                  <th className="p-3.5">Skills</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E5] dark:divide-[#282B2F]">
                {filteredWorkers.map((w) => (
                  <tr
                    key={w.id}
                    onClick={() => onSelectWorker && onSelectWorker(w.id)}
                    className="hover:bg-[#FAFAF8] dark:hover:bg-[#141618] transition cursor-pointer"
                  >
                    <td className="p-3.5">
                      <div className="font-bold text-[#17191B] dark:text-white">{w.name}</div>
                      <div className="text-[11px] text-[#5F6B73] dark:text-[#95A0A6]">{w.employeeCode} • {w.jobRole}</div>
                    </td>
                    <td className="p-3.5 font-medium text-[#17191B] dark:text-[#D6D7D4]">
                      {w.departmentOrSite}
                    </td>
                    <td className="p-3.5">
                      {w.attendanceStatus === 'present' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                          <CheckCircle2 className="w-3 h-3" /> On Shift
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold text-[10px]">
                          <AlertTriangle className="w-3 h-3" /> Absent
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 font-mono">
                      {w.overtimeHoursThisWeek > 0 ? (
                        <span className="font-bold text-amber-600 dark:text-amber-400">+{w.overtimeHoursThisWeek}h OT</span>
                      ) : (
                        <span className="text-[#8A969E]">0h</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      {w.fatigueFlagCount > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold text-[10px]">
                          <ShieldAlert className="w-3 h-3" /> {w.fatigueFlagCount} Alert
                        </span>
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">Normal</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 text-[#286B58] dark:text-[#3DA386] font-semibold text-xs">
                        <Award className="w-3.5 h-3.5" /> {w.skillsCount} Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Results: Card View (Great for Mobile) */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredWorkers.map((w) => (
            <div
              key={w.id}
              onClick={() => onSelectWorker && onSelectWorker(w.id)}
              className="p-4 rounded-xl bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] hover:border-[#286B58] transition space-y-3 cursor-pointer shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#17191B] dark:text-white">{w.name}</h4>
                  <span className="text-xs text-[#5F6B73] dark:text-[#95A0A6] block">{w.jobRole}</span>
                </div>
                <span className="font-mono text-[10px] text-[#5F6B73] dark:text-[#95A0A6]">{w.employeeCode}</span>
              </div>

              <div className="text-xs text-[#5F6B73] dark:text-[#95A0A6] space-y-1 border-y border-[#E8E8E5] dark:border-[#282B2F] py-2">
                <div>Site: <strong className="text-[#17191B] dark:text-white">{w.departmentOrSite}</strong></div>
                <div>Status: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{w.attendanceStatus === 'present' ? 'On Shift' : 'Absent'}</span></div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold">+{w.overtimeHoursThisWeek}h OT</span>
                <span className="text-[#286B58] dark:text-[#3DA386] font-semibold">{w.skillsCount} Skills Sealed</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
