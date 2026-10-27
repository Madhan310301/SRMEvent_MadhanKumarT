import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { HeartPulse, ShieldAlert, AlertTriangle, CheckCircle2, Clock, Users, ArrowRight, MessageSquare } from 'lucide-react';

interface FatigueAlertRecord {
  id: string;
  workerName: string;
  workerRole: string;
  ruleTriggered: 'long_shift' | 'short_rest' | 'consecutive_days' | 'excessive_weekly';
  details: string;
  severity: 'high' | 'moderate';
  detectedAt: string;
  workerContestReason?: string;
  actionTaken?: string;
}

export const EmployerFatigue: React.FC = () => {
  const { org } = useAuth();
  const [selectedAlert, setSelectedAlert] = useState<FatigueAlertRecord | null>(null);

  const [alerts, setAlerts] = useState<FatigueAlertRecord[]>([
    {
      id: 'fat-01',
      workerName: 'Murugan K.',
      workerRole: 'Crane & Rigging Specialist',
      ruleTriggered: 'long_shift',
      details: 'Shift duration exceeded 12.5 hours on 2026-10-25 (Pier 42 Metro Viaduct).',
      severity: 'high',
      detectedAt: '2026-10-25 20:45',
      workerContestReason: 'High wind speed delayed lowering of 30-ton precast girder; had to stay in crane cab for structural stability until taglines were secured.',
      actionTaken: 'Mandatory 14-hour rest buffer applied prior to next roster.'
    },
    {
      id: 'fat-02',
      workerName: 'Anil Kumar',
      workerRole: 'Heavy Dumper Operator',
      ruleTriggered: 'short_rest',
      details: 'Rest interval between shift check-out (11:30 PM) and check-in (07:00 AM) was only 7.5 hours (Minimum requirement is 11.0 hours).',
      severity: 'high',
      detectedAt: '2026-10-26 07:05'
    },
    {
      id: 'fat-03',
      workerName: 'Praveen Das',
      workerRole: 'Scaffolding Technician',
      ruleTriggered: 'consecutive_days',
      details: 'Worked 7 consecutive days without a mandatory 24-hour continuous rest window.',
      severity: 'moderate',
      detectedAt: '2026-10-27 08:00'
    }
  ]);

  const handleApplyRosterAdjustment = (id: string, action: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, actionTaken: action } : a));
    alert(`Workload action applied: ${action}. Notification sent to worker.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
          <HeartPulse className="w-6 h-6 text-rose-400" />
          Fatigue Risk & Non-Punitive Workforce Wellbeing
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Predictive fatigue early warning system. Flags shift anomalies (&gt;12h shift, &lt;11h rest gap) to prevent workplace accidents.
        </p>
      </div>

      {/* Non-Punitive Charter */}
      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300">
          <strong className="text-zinc-100">Non-Punitive Wellbeing Principle:</strong> In accordance with UN SDG 8 and FairShift rules, fatigue flags must never be used to dock worker wages, apply attendance penalties, or discipline employees. They trigger mandatory rest and supervisor workload rebalancing.
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Active Fatigue Alerts</span>
          <span className="text-2xl font-black text-white mt-1 block">{alerts.length}</span>
        </div>
        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40">
          <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block">High Severity (&gt;12h / &lt;11h Rest)</span>
          <span className="text-2xl font-black text-rose-300 mt-1 block">
            {alerts.filter(a => a.severity === 'high').length}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">Worker Contests Resolved</span>
          <span className="text-2xl font-black text-emerald-300 mt-1 block">
            {alerts.filter(a => a.actionTaken).length}
          </span>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((a) => (
          <div key={a.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 hover:border-zinc-700 transition">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${a.severity === 'high' ? 'bg-rose-950 text-rose-400 border border-rose-800/60' : 'bg-amber-950 text-amber-400 border border-amber-800/60'}`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{a.workerName}</h3>
                  <span className="text-xs text-zinc-400">{a.workerRole} • Flagged: {a.detectedAt}</span>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${a.severity === 'high' ? 'bg-rose-950 text-rose-300 border border-rose-800/60' : 'bg-amber-950 text-amber-300 border border-amber-800/60'}`}>
                {a.ruleTriggered.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <p className="text-xs text-zinc-200 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              {a.details}
            </p>

            {/* Worker Contest Explanation */}
            {a.workerContestReason && (
              <div className="p-3 bg-amber-950/20 rounded-xl border border-amber-800/40 space-y-1">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" /> Worker Explanation / Contest:
                </span>
                <p className="text-xs text-amber-100/90 leading-relaxed italic">
                  "{a.workerContestReason}"
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-zinc-800/80">
              {a.actionTaken ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> {a.actionTaken}
                </span>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApplyRosterAdjustment(a.id, 'Mandatory 12h Rest Buffer Granted')}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer shadow transition"
                  >
                    Grant 12h Rest Buffer
                  </button>
                  <button
                    onClick={() => handleApplyRosterAdjustment(a.id, 'Reassigned to Light Day Shift')}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs cursor-pointer transition"
                  >
                    Reassign to Light Shift
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
