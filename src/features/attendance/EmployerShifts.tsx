import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Calendar, Clock, Plus, Users, ShieldAlert, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';

interface ShiftTemplate {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  assignedWorkersCount: number;
  siteName: string;
}

export const EmployerShifts: React.FC = () => {
  const { org, sectorConfig } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newShiftName, setNewShiftName] = useState('');
  const [newStartTime, setNewStartTime] = useState('08:00');
  const [newEndTime, setNewEndTime] = useState('17:00');
  const [newBreakMinutes, setNewBreakMinutes] = useState(60);

  const [shifts, setShifts] = useState<ShiftTemplate[]>([
    {
      id: 'sh-t1',
      name: 'General Day Operational Shift',
      startTime: '08:00 AM',
      endTime: '05:00 PM',
      breakMinutes: 60,
      assignedWorkersCount: 48,
      siteName: org?.sites[0]?.name || 'Pier 42 Metro Viaduct'
    },
    {
      id: 'sh-t2',
      name: 'Critical Infrastructure Night Shift',
      startTime: '08:00 PM',
      endTime: '05:00 AM',
      breakMinutes: 60,
      assignedWorkersCount: 16,
      siteName: org?.sites[1]?.name || 'Tunnel Shaft-B'
    },
    {
      id: 'sh-t3',
      name: 'Early Morning Facilities Shift',
      startTime: '06:00 AM',
      endTime: '02:30 PM',
      breakMinutes: 45,
      assignedWorkersCount: 22,
      siteName: org?.sites[0]?.name || 'Campus Complex'
    }
  ]);

  const handleCreateShift = (e: React.FormEvent) => {
    e.preventDefault();
    const newShift: ShiftTemplate = {
      id: `sh-t${shifts.length + 1}`,
      name: newShiftName,
      startTime: newStartTime,
      endTime: newEndTime,
      breakMinutes: Number(newBreakMinutes),
      assignedWorkersCount: 0,
      siteName: org?.sites[0]?.name || 'Main Site'
    };
    setShifts([...shifts, newShift]);
    setShowAddModal(false);
    setNewShiftName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Calendar className="w-6 h-6 text-indigo-400" />
            Shift Roster & Fatigue-Safe Scheduling
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Configure standard shift templates with mandatory rest breaks and UN SDG 8 weekly 48-hour fatigue protection.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          Create Shift Template
        </button>
      </div>

      {/* Compliance Callout Banner */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300">
          <span className="font-bold text-amber-300">UN SDG 8 Decent Work Rule Enforced:</span> Shifts longer than 9 continuous hours trigger automatic fatigue warnings. Consecutive work exceeding 6 days mandates a rest gap of at least 24 hours before re-rostering.
        </div>
      </div>

      {/* Shift Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {shifts.map((s) => (
          <div key={s.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 hover:border-zinc-700 transition">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-white text-base">{s.name}</h3>
                <span className="text-xs text-zinc-400 font-medium block mt-0.5">{s.siteName}</span>
              </div>
              <span className="p-2 rounded-lg bg-zinc-800 text-zinc-300">
                <Clock className="w-4 h-4 text-indigo-400" />
              </span>
            </div>

            <div className="space-y-2 py-2 border-y border-zinc-800 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Shift Timings:</span>
                <span className="text-zinc-200 font-mono font-bold">{s.startTime} – {s.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Mandatory Meal Break:</span>
                <span className="text-emerald-400 font-semibold">{s.breakMinutes} mins (Paid/Unpaid)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Assigned Workforce:</span>
                <span className="text-zinc-200 font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-zinc-400" /> {s.assignedWorkersCount} workers
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> Fatigue Compliant
              </span>
              <button
                onClick={() => alert(`Opening worker roster assignments for ${s.name}.`)}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                Assign Workers <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 max-w-md w-full rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-white text-base">New Shift Configuration</h3>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white font-bold text-lg">&times;</button>
            </div>

            <form onSubmit={handleCreateShift} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Shift Name / Purpose</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Afternoon Pier Concreting Shift"
                  value={newShiftName}
                  onChange={(e) => setNewShiftName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Start Time</label>
                  <input
                    type="time"
                    required
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">End Time</label>
                  <input
                    type="time"
                    required
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Mandatory Break (Minutes)</label>
                <input
                  type="number"
                  min="30"
                  max="120"
                  value={newBreakMinutes}
                  onChange={(e) => setNewBreakMinutes(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer"
                >
                  Save Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
