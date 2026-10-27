import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Clock, CheckCircle2, AlertTriangle, MapPin, Search, Filter, ShieldCheck, Download, RefreshCw, UserCheck } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  workerName: string;
  workerRole: string;
  workerPhone: string;
  date: string;
  checkIn: string;
  checkOut: string;
  siteName: string;
  withinGeofence: boolean;
  distanceMeters: number;
  method: 'qr' | 'supervisor_fallback' | 'biometric';
  status: 'verified' | 'pending_review' | 'flagged';
  hoursWorked: number;
  otHours: number;
}

export const EmployerAttendance: React.FC = () => {
  const { org, sectorConfig } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'pending_review' | 'flagged'>('all');
  const [selectedSite, setSelectedSite] = useState<string>('all');

  const [records, setRecords] = useState<AttendanceRecord[]>([
    {
      id: 'att-01',
      workerName: 'Murugan K.',
      workerRole: 'Crane & Rigging Specialist',
      workerPhone: '+91 98401 22345',
      date: '2026-10-27',
      checkIn: '08:00 AM',
      checkOut: 'In Progress (Active)',
      siteName: org?.sites[0]?.name || 'Pier 42 Metro Viaduct',
      withinGeofence: true,
      distanceMeters: 42,
      method: 'qr',
      status: 'verified',
      hoursWorked: 6.5,
      otHours: 0
    },
    {
      id: 'att-02',
      workerName: 'Lakshmi S.',
      workerRole: 'Facilities Lead',
      workerPhone: '+91 98840 55678',
      date: '2026-10-27',
      checkIn: '07:45 AM',
      checkOut: 'In Progress (Active)',
      siteName: org?.sites[0]?.name || 'Biotech Complex',
      withinGeofence: true,
      distanceMeters: 18,
      method: 'qr',
      status: 'verified',
      hoursWorked: 6.75,
      otHours: 0
    },
    {
      id: 'att-03',
      workerName: 'Karthik Raja',
      workerRole: 'Structural Welder',
      workerPhone: '+91 97890 88214',
      date: '2026-10-27',
      checkIn: '08:45 AM',
      checkOut: 'In Progress (Active)',
      siteName: org?.sites[1]?.name || 'Tunnel Shaft-B',
      withinGeofence: false,
      distanceMeters: 380,
      method: 'supervisor_fallback',
      status: 'pending_review',
      hoursWorked: 5.75,
      otHours: 0
    },
    {
      id: 'att-04',
      workerName: 'Anil Kumar',
      workerRole: 'Heavy Dumper Operator',
      workerPhone: '+91 91234 56789',
      date: '2026-10-26',
      checkIn: '08:00 AM',
      checkOut: '08:30 PM',
      siteName: org?.sites[0]?.name || 'Pier 42 Metro Viaduct',
      withinGeofence: true,
      distanceMeters: 55,
      method: 'qr',
      status: 'verified',
      hoursWorked: 12.5,
      otHours: 4.5
    },
    {
      id: 'att-05',
      workerName: 'Praveen Das',
      workerRole: 'Scaffolding Technician',
      workerPhone: '+91 94567 12345',
      date: '2026-10-26',
      checkIn: '08:15 AM',
      checkOut: '05:30 PM',
      siteName: org?.sites[2]?.name || 'Precast Yard',
      withinGeofence: false,
      distanceMeters: 820,
      method: 'supervisor_fallback',
      status: 'flagged',
      hoursWorked: 9.25,
      otHours: 1.25
    }
  ]);

  const handleApprove = (id: string) => {
    setRecords(records.map(r => r.id === id ? { ...r, status: 'verified' } : r));
  };

  const filteredRecords = records.filter(r => {
    const matchesSearch = r.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.workerRole.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesSite = selectedSite === 'all' || r.siteName === selectedSite;
    return matchesSearch && matchesStatus && matchesSite;
  });

  const verifiedCount = records.filter(r => r.status === 'verified').length;
  const pendingCount = records.filter(r => r.status === 'pending_review').length;
  const flaggedCount = records.filter(r => r.status === 'flagged').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Clock className="w-6 h-6 text-indigo-400" />
            Attendance & Muster Roll Audit
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time clock-in verification with GPS geofencing radius validation, supervisor overrides, and audit trails.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Downloading official attendance muster roll CSV for compliance records.')}
            className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold text-zinc-200 flex items-center gap-2 cursor-pointer transition"
          >
            <Download className="w-4 h-4" />
            Export Muster Roll
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Total Active Roster</span>
          <span className="text-2xl font-black text-white mt-1 block">{records.length} Workers</span>
        </div>
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">Verified Geofenced</span>
          <span className="text-2xl font-black text-emerald-300 mt-1 block">{verifiedCount}</span>
        </div>
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">Supervisor Fallbacks</span>
          <span className="text-2xl font-black text-amber-300 mt-1 block">{pendingCount}</span>
        </div>
        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40">
          <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block">Outside Geofence / Flagged</span>
          <span className="text-2xl font-black text-rose-300 mt-1 block">{flaggedCount}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by worker name, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${statusFilter === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('verified')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${statusFilter === 'verified' ? 'bg-emerald-950 text-emerald-300' : 'text-zinc-400'}`}
            >
              Verified
            </button>
            <button
              onClick={() => setStatusFilter('pending_review')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${statusFilter === 'pending_review' ? 'bg-amber-950 text-amber-300' : 'text-zinc-400'}`}
            >
              Needs Review
            </button>
            <button
              onClick={() => setStatusFilter('flagged')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${statusFilter === 'flagged' ? 'bg-rose-950 text-rose-300' : 'text-zinc-400'}`}
            >
              Flagged
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/80 text-zinc-400 uppercase font-semibold border-b border-zinc-800 tracking-wider">
              <tr>
                <th className="p-4">Employee</th>
                <th className="p-4">Site / Location</th>
                <th className="p-4">Clock In / Out</th>
                <th className="p-4">GPS Geofence Status</th>
                <th className="p-4">Method</th>
                <th className="p-4">Hours / OT</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-zinc-800/30 transition">
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{r.workerName}</div>
                    <div className="text-zinc-400 text-[11px]">{r.workerRole}</div>
                    <div className="text-zinc-400 text-[10px]">{r.workerPhone}</div>
                  </td>
                  <td className="p-4 text-zinc-300 font-medium">
                    {r.siteName}
                  </td>
                  <td className="p-4">
                    <div className="text-zinc-200 font-mono font-medium">{r.checkIn}</div>
                    <div className="text-zinc-400 font-mono text-[11px]">{r.checkOut}</div>
                  </td>
                  <td className="p-4">
                    {r.withinGeofence ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/50 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3 h-3" /> Within {r.distanceMeters}m
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800/50 font-semibold text-[11px]">
                        <AlertTriangle className="w-3 h-3" /> {r.distanceMeters}m away
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="capitalize px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[11px] font-medium border border-zinc-700">
                      {r.method.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-zinc-100 font-bold">{r.hoursWorked}h</div>
                    {r.otHours > 0 && (
                      <div className="text-amber-400 font-semibold text-[10px]">+{r.otHours}h OT (1.5x)</div>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {r.status === 'pending_review' || r.status === 'flagged' ? (
                      <button
                        onClick={() => handleApprove(r.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer transition shadow"
                      >
                        Approve Punch
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-xs">
                        <ShieldCheck className="w-4 h-4" /> Verified
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
