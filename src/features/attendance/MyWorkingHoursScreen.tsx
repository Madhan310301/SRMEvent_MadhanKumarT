import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Clock, Calendar, CheckCircle2, AlertCircle, Volume2, FileSpreadsheet, ChevronRight, HelpCircle } from 'lucide-react';
import { speakText } from '@/services/voice/speech';
import { useTranslation } from 'react-i18next';

interface ShiftRecord {
  id: string;
  date: string;
  dayName: string;
  checkIn: string;
  checkOut: string;
  standardHours: number;
  otHours: number;
  totalHours: number;
  siteName: string;
  status: 'approved' | 'pending' | 'adjusted';
  supervisor: string;
}

export const MyWorkingHoursScreen: React.FC = () => {
  const { user, org, sectorConfig } = useAuth();
  const { t, i18n } = useTranslation();
  const [filterPeriod, setFilterPeriod] = useState<'week' | 'month'>('week');
  const [selectedShift, setSelectedShift] = useState<ShiftRecord | null>(null);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeSuccess, setDisputeSuccess] = useState(false);

  // Mock working shifts for current worker
  const shifts: ShiftRecord[] = [
    {
      id: 'sh-01',
      date: '2026-10-26',
      dayName: 'Yesterday (Mon)',
      checkIn: '08:00 AM',
      checkOut: '06:30 PM',
      standardHours: 8.0,
      otHours: 2.5,
      totalHours: 10.5,
      siteName: org?.sites[0]?.name || 'Pier 42 Metro Viaduct',
      status: 'approved',
      supervisor: 'S. Shanmugam (Site Lead)'
    },
    {
      id: 'sh-02',
      date: '2026-10-25',
      dayName: 'Sunday',
      checkIn: '08:15 AM',
      checkOut: '08:45 PM',
      standardHours: 8.0,
      otHours: 4.5,
      totalHours: 12.5,
      siteName: org?.sites[0]?.name || 'Pier 42 Metro Viaduct',
      status: 'approved',
      supervisor: 'S. Shanmugam (Site Lead)'
    },
    {
      id: 'sh-03',
      date: '2026-10-24',
      dayName: 'Saturday',
      checkIn: '08:00 AM',
      checkOut: '05:00 PM',
      standardHours: 8.0,
      otHours: 1.0,
      totalHours: 9.0,
      siteName: org?.sites[0]?.name || 'Pier 42 Metro Viaduct',
      status: 'approved',
      supervisor: 'S. Shanmugam (Site Lead)'
    },
    {
      id: 'sh-04',
      date: '2026-10-23',
      dayName: 'Friday',
      checkIn: '08:30 AM',
      checkOut: '05:30 PM',
      standardHours: 8.0,
      otHours: 1.0,
      totalHours: 9.0,
      siteName: org?.sites[1]?.name || 'Tunnel Shaft-B',
      status: 'adjusted',
      supervisor: 'R. Kanna (Shift Supervisor)'
    },
    {
      id: 'sh-05',
      date: '2026-10-22',
      dayName: 'Thursday',
      checkIn: '07:55 AM',
      checkOut: '05:00 PM',
      standardHours: 8.0,
      otHours: 1.0,
      totalHours: 9.0,
      siteName: org?.sites[0]?.name || 'Pier 42 Metro Viaduct',
      status: 'approved',
      supervisor: 'S. Shanmugam (Site Lead)'
    }
  ];

  const totalRegular = shifts.reduce((acc, s) => acc + s.standardHours, 0);
  const totalOT = shifts.reduce((acc, s) => acc + s.otHours, 0);
  const grandTotal = totalRegular + totalOT;

  const handleReadSummary = () => {
    const text = `Working hours summary for ${user?.name}. You worked ${grandTotal} total hours this week. Standard hours: ${totalRegular}. Approved overtime: ${totalOT} hours at 1.5 times wage rate.`;
    speakText(text, i18n.language);
  };

  const handleDisputeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDisputeSuccess(true);
    setTimeout(() => {
      setDisputeSuccess(false);
      setShowDisputeModal(false);
      setDisputeReason('');
      alert('Your hours dispute has been submitted directly to your Site Supervisor & HR with timestamp verification.');
    }, 800);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            My Working Hours & Shift Logs
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Verified electronic records of daily clock-in, clock-out, standard duty, and overtime.
          </p>
        </div>

        <button
          onClick={handleReadSummary}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold cursor-pointer transition self-start sm:self-auto"
        >
          <Volume2 className="w-4 h-4" />
          <span>Listen in {i18n.language.toUpperCase()}</span>
        </button>
      </div>

      {/* Aggregate Metrics Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">Total Hours</span>
          <span className="text-2xl font-black text-white mt-1 block">{grandTotal.toFixed(1)}h</span>
          <span className="text-[10px] text-zinc-400 mt-0.5 block">5 shifts recorded</span>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">Standard</span>
          <span className="text-2xl font-black text-zinc-200 mt-1 block">{totalRegular.toFixed(1)}h</span>
          <span className="text-[10px] text-zinc-400 mt-0.5 block">8.0h / day quota</span>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/50">
          <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">Overtime (1.5x)</span>
          <span className="text-2xl font-black text-amber-300 mt-1 block">+{totalOT.toFixed(1)}h</span>
          <span className="text-[10px] text-amber-400/80 mt-0.5 block">Extra pay approved</span>
        </div>
      </div>

      {/* Shifts List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider">Daily Attendance Roster</span>
          </div>
          <span className="text-xs text-zinc-400">Current Week</span>
        </div>

        <div className="divide-y divide-zinc-800/80">
          {shifts.map((shift) => (
            <div
              key={shift.id}
              onClick={() => setSelectedShift(shift)}
              className="p-4 hover:bg-zinc-800/40 transition flex items-center justify-between cursor-pointer group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-zinc-100">{shift.dayName}</span>
                  <span className="text-xs text-zinc-400">({shift.date})</span>
                  {shift.status === 'approved' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/60">
                      <AlertCircle className="w-2.5 h-2.5" /> Adjusted
                    </span>
                  )}
                </div>
                <div className="text-xs text-zinc-400 flex items-center gap-3">
                  <span>In: <strong className="text-zinc-200">{shift.checkIn}</strong></span>
                  <span>Out: <strong className="text-zinc-200">{shift.checkOut}</strong></span>
                  <span className="hidden sm:inline text-zinc-400">• {shift.siteName}</span>
                </div>
              </div>

              <div className="text-right flex items-center gap-3">
                <div>
                  <div className="font-bold text-base text-zinc-100">{shift.totalHours} hrs</div>
                  {shift.otHours > 0 && (
                    <div className="text-[11px] font-semibold text-amber-400">+{shift.otHours}h OT</div>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-300 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shift Detail / Dispute Modal */}
      {selectedShift && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 max-w-md w-full rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">Shift Verification Record</h3>
                <p className="text-xs text-zinc-400">{selectedShift.dayName} • {selectedShift.date}</p>
              </div>
              <button onClick={() => setSelectedShift(null)} className="text-zinc-400 hover:text-white font-bold text-lg">&times;</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <div>
                  <span className="text-zinc-400 block">Check In Time</span>
                  <span className="text-zinc-200 font-bold text-sm">{selectedShift.checkIn}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Check Out Time</span>
                  <span className="text-zinc-200 font-bold text-sm">{selectedShift.checkOut}</span>
                </div>
                <div className="mt-2">
                  <span className="text-zinc-400 block">Standard Hours</span>
                  <span className="text-zinc-200 font-semibold">{selectedShift.standardHours}h (Base Wage)</span>
                </div>
                <div className="mt-2">
                  <span className="text-zinc-400 block">Overtime Hours</span>
                  <span className="text-amber-400 font-semibold">{selectedShift.otHours}h (1.5x Multiplier)</span>
                </div>
              </div>

              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-zinc-400 block">Assigned Site / Department</span>
                <span className="text-zinc-200 font-medium">{selectedShift.siteName}</span>
                <span className="text-zinc-400 block pt-1">Audited & Verified By</span>
                <span className="text-zinc-200 font-medium">{selectedShift.supervisor}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => { setShowDisputeModal(true); }}
                className="flex-1 py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition cursor-pointer"
              >
                Dispute Hours / Time Record
              </button>
              <button
                onClick={() => setSelectedShift(null)}
                className="flex-1 py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition cursor-pointer"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 max-w-md w-full rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                Submit Hours Correction Request
              </h3>
              <button onClick={() => setShowDisputeModal(false)} className="text-zinc-400 hover:text-white font-bold text-lg">&times;</button>
            </div>

            <form onSubmit={handleDisputeSubmit} className="space-y-3">
              <p className="text-xs text-zinc-300">
                If your supervisor corrected your punch incorrectly or your overtime was not logged, explain the discrepancy below.
              </p>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Reason for Correction</label>
                <textarea
                  required
                  rows={3}
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  placeholder="e.g. Worked until 7:30 PM due to emergency concrete pour on Pier 42; exit gate scanner was offline."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDisputeModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={disputeSuccess}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold cursor-pointer"
                >
                  {disputeSuccess ? 'Submitting...' : 'Send Dispute'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
