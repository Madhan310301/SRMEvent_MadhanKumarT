import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthContext';
import { 
  FolderOpen, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  RotateCcw, 
  ChevronRight,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { localDb, CachedHazardReport } from '@/services/offline/db';

export const MyReportsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [reports, setReports] = useState<CachedHazardReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<CachedHazardReport | null>(null);
  const [reopenFeedback, setReopenFeedback] = useState<string>('');

  useEffect(() => {
    localDb.hazards
      .where('userId')
      .equals(user?.id || '')
      .toArray()
      .then((records) => {
        if (records.length === 0) {
          // Add standard seed demo reports if none yet
          const demoSeed: CachedHazardReport[] = [
            {
              id: 'haz-seed-1',
              ticketNumber: 'HAZ-2026-1042',
              orgId: 'org-construction',
              userId: user?.id || '',
              category: 'equipment_failure',
              description: 'Hydraulic boom hose weeping oil near Pier 42 crane base.',
              hasAudio: true,
              priority: 'critical',
              status: 'action_taken',
              employerResponse: 'Hydraulic technicians dispatched; temporary containment berm installed.',
              createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
              updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
              syncStatus: 'synced'
            },
            {
              id: 'haz-seed-2',
              ticketNumber: 'HAZ-2026-0988',
              orgId: 'org-construction',
              userId: user?.id || '',
              category: 'ppe_missing',
              description: 'Fresh batch of chin-strap safety helmets requested for night crew.',
              hasAudio: false,
              priority: 'medium',
              status: 'resolved',
              employerResponse: '45 ISI-approved helmets delivered to tool crib B.',
              createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
              updatedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
              syncStatus: 'synced'
            }
          ];
          setReports(demoSeed);
        } else {
          setReports(records);
        }
      });
  }, [user?.id]);

  const stages = [
    { key: 'submitted', label: 'Submitted' },
    { key: 'acknowledged', label: 'Acknowledged' },
    { key: 'investigating', label: 'Under Investigation' },
    { key: 'action_taken', label: 'Action Taken' },
    { key: 'resolved', label: 'Resolved' },
    { key: 'employee_confirmed', label: 'Confirmed by Worker' }
  ];

  const getStageIndex = (status: string) => {
    const idx = stages.findIndex(s => s.key === status);
    return idx === -1 ? 0 : idx;
  };

  const handleReopen = async (reportId: string) => {
    await localDb.hazards.update(reportId, {
      status: 'investigating',
      employerResponse: `Reopened by worker: "${reopenFeedback || 'Issue requires further site inspection.'}"`,
      updatedAt: new Date().toISOString()
    });
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'investigating' } : r));
    setSelectedReport(null);
    setReopenFeedback('');
  };

  const handleConfirmResolution = async (reportId: string) => {
    await localDb.hazards.update(reportId, {
      status: 'employee_confirmed',
      updatedAt: new Date().toISOString()
    });
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'employee_confirmed' } : r));
    setSelectedReport(null);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black text-white">{t('nav.myReports')}</h1>
          <p className="text-xs text-zinc-400">Closed-loop safety & grievance tracking</p>
        </div>
        <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
          <FolderOpen className="w-5 h-5" />
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {reports.map((report) => {
          const currentStageIdx = getStageIndex(report.status);

          return (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 transition cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white">{report.ticketNumber}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold ${
                    report.priority === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    report.priority === 'high' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {report.priority}
                  </span>
                </div>

                <span className="text-[11px] text-zinc-500">
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-xs text-zinc-200 line-clamp-2 font-medium">
                {report.description}
              </p>

              {/* Progress Stepper Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400">
                  <span>Lifecycle:</span>
                  <span className="text-blue-400 capitalize">{report.status.replace('_', ' ')}</span>
                </div>
                <div className="grid grid-cols-6 gap-1 h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden p-0.5">
                  {stages.map((st, i) => (
                    <div
                      key={st.key}
                      className={`h-full rounded-full transition-all ${
                        i <= currentStageIdx ? 'bg-blue-500 shadow-sm shadow-blue-500' : 'bg-zinc-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {report.employerResponse && (
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-300">
                  <strong className="text-blue-400 block mb-0.5">Management Action:</strong>
                  {report.employerResponse}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Report Inspection / Action Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl text-zinc-100 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-black">{selectedReport.ticketNumber}</h3>
                <p className="text-xs text-zinc-400 capitalize">Category: {selectedReport.category.replace('_', ' ')}</p>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-zinc-500 hover:text-zinc-200 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-2">
              <p className="text-zinc-300 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                "{selectedReport.description}"
              </p>

              {selectedReport.employerResponse && (
                <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 text-blue-200">
                  <strong className="block text-blue-400 mb-1">Official Employer Resolution:</strong>
                  {selectedReport.employerResponse}
                </div>
              )}
            </div>

            {/* Actions for Worker */}
            <div className="flex flex-col gap-2 pt-2">
              {selectedReport.status === 'resolved' && (
                <button
                  onClick={() => handleConfirmResolution(selectedReport.id)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Confirm Hazard is Resolved
                </button>
              )}

              <div className="pt-2 border-t border-zinc-800">
                <input
                  type="text"
                  placeholder="Reason if contesting resolution..."
                  value={reopenFeedback}
                  onChange={(e) => setReopenFeedback(e.target.value)}
                  className="w-full p-2 mb-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-200"
                />
                <button
                  onClick={() => handleReopen(selectedReport.id)}
                  className="w-full py-2 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  Contest / Reopen Resolution
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
