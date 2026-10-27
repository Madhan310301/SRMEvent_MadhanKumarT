import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { AlertTriangle, ShieldCheck, CheckCircle2, Clock, Volume2, Image, MessageSquare, ChevronRight, Filter, Search } from 'lucide-react';

interface HazardReportItem {
  id: string;
  trackingCode: string;
  title: string;
  category: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  status: 'submitted' | 'acknowledged' | 'investigating' | 'action_taken' | 'resolved' | 'confirmed';
  reportedAt: string;
  workerName: string;
  hasVoiceAudio: boolean;
  hasPhoto: boolean;
  photoUrl?: string;
  description: string;
  employerNotes?: string;
}

export const EmployerHazards: React.FC = () => {
  const { org } = useAuth();
  const [selectedReport, setSelectedReport] = useState<HazardReportItem | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [actionNote, setActionNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [reports, setReports] = useState<HazardReportItem[]>([
    {
      id: 'haz-01',
      trackingCode: 'HZ-2026-8812',
      title: 'Frayed heavy crane hoist cable on Pier 42',
      category: 'Equipment Hazard',
      severity: 'critical',
      location: org?.sites[0]?.name || 'Pier 42 Metro Viaduct',
      status: 'investigating',
      reportedAt: '2026-10-26 14:15',
      workerName: 'Murugan K. (Crane Specialist)',
      hasVoiceAudio: true,
      hasPhoto: true,
      photoUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
      description: 'During morning pre-lift inspection, noticed 3 broken outer wire strands on main auxiliary hoist line. Cable must be replaced immediately prior to 30-ton girder placement.',
      employerNotes: 'Safety Officer dispatched. Lifting operations suspended on Pier 42 crane #3.'
    },
    {
      id: 'haz-02',
      trackingCode: 'HZ-2026-7491',
      title: 'Water seepage near main high-voltage breaker panel',
      category: 'Electrical Hazard',
      severity: 'critical',
      location: org?.sites[1]?.name || 'Underground Tunnel Shaft-B',
      status: 'submitted',
      reportedAt: '2026-10-27 09:30',
      workerName: 'Lakshmi S. (Facilities Lead)',
      hasVoiceAudio: true,
      hasPhoto: false,
      description: 'Continuous water dripping directly over 415V distribution board in Sub-basement level 2. High risk of electrical shock or short-circuit fire.'
    },
    {
      id: 'haz-03',
      trackingCode: 'HZ-2026-6120',
      title: 'Missing edge guardrail on third floor slab perimeter',
      category: 'Fall Protection',
      severity: 'high',
      location: org?.sites[0]?.name || 'Pier 42 Metro Viaduct',
      status: 'action_taken',
      reportedAt: '2026-10-25 11:20',
      workerName: 'Praveen Das (Scaffolder)',
      hasVoiceAudio: false,
      hasPhoto: true,
      photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80',
      description: 'Guard rails removed during formwork stripping were not re-installed. 12-meter drop hazard.',
      employerNotes: 'Temporary warning barrier placed and heavy steel toe-boards re-installed.'
    }
  ]);

  const stages: HazardReportItem['status'][] = [
    'submitted',
    'acknowledged',
    'investigating',
    'action_taken',
    'resolved',
    'confirmed'
  ];

  const handleUpdateStatus = (newStatus: HazardReportItem['status']) => {
    if (!selectedReport) return;
    const updated = {
      ...selectedReport,
      status: newStatus,
      employerNotes: actionNote ? actionNote : selectedReport.employerNotes
    };
    setSelectedReport(updated);
    setReports(reports.map(r => r.id === updated.id ? updated : r));
    setActionNote('');
  };

  const handlePlayVoiceAudio = () => {
    setIsPlayingAudio(true);
    // Simulate real audio playback duration
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4000);
  };

  const getSeverityBadge = (sev: HazardReportItem['severity']) => {
    switch (sev) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800/60 font-bold text-[10px]">CRITICAL</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded-full bg-orange-950 text-orange-300 border border-orange-800/60 font-bold text-[10px]">HIGH</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/60 font-bold text-[10px]">MEDIUM</span>;
      case 'low':
        return <span className="px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800/60 font-bold text-[10px]">LOW</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
          <AlertTriangle className="w-6 h-6 text-amber-400" />
          Safety Hazard & Incident Resolution Desk
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review worker safety disclosures, listen to voice recordings, inspect photo proof, and coordinate 6-stage lifecycle remedies.
        </p>
      </div>

      {/* Grid: List + Detail Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Incident List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
            <input
              type="text"
              placeholder="Search reports by title, code, site..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-2.5">
            {reports.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedReport(r)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  selectedReport?.id === r.id
                    ? 'bg-zinc-800/90 border-amber-500/60 shadow-lg'
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] text-zinc-400 font-semibold">{r.trackingCode}</span>
                  {getSeverityBadge(r.severity)}
                </div>
                <h3 className="font-bold text-sm text-zinc-100 line-clamp-1">{r.title}</h3>
                <p className="text-xs text-zinc-400 mt-1">{r.location}</p>

                <div className="flex items-center justify-between pt-2 mt-2 border-t border-zinc-800/80 text-[11px]">
                  <span className="capitalize font-semibold text-amber-400">{r.status.replace('_', ' ')}</span>
                  <div className="flex items-center gap-2 text-zinc-400">
                    {r.hasVoiceAudio && <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
                    {r.hasPhoto && <Image className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{r.reportedAt.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Detail & Lifecycle Management */}
        <div className="lg:col-span-7">
          {selectedReport ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
              {/* Title & Metadata */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-zinc-400 font-bold">{selectedReport.trackingCode}</span>
                    {getSeverityBadge(selectedReport.severity)}
                  </div>
                  <h2 className="text-lg font-black text-white mt-1">{selectedReport.title}</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Reported by <strong className="text-zinc-200">{selectedReport.workerName}</strong> • {selectedReport.reportedAt}
                  </p>
                </div>
              </div>

              {/* 6-Stage Progress Indicator */}
              <div className="space-y-2 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                  <span>6-Stage Transparency Lifecycle</span>
                  <span className="capitalize text-amber-400">{selectedReport.status.replace('_', ' ')}</span>
                </div>
                <div className="grid grid-cols-6 gap-1.5 pt-1">
                  {stages.map((stage, idx) => {
                    const currentIdx = stages.indexOf(selectedReport.status);
                    const isPassed = idx <= currentIdx;
                    return (
                      <div key={stage} className="space-y-1">
                        <div className={`h-2 rounded-full ${isPassed ? 'bg-amber-400' : 'bg-zinc-800'}`} />
                        <span className="text-[9px] uppercase tracking-wider text-zinc-400 block text-center truncate">
                          {stage.replace('_', ' ')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Description & Media Proof */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Worker Description & Proof</h4>
                <p className="text-xs text-zinc-200 bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 leading-relaxed">
                  {selectedReport.description}
                </p>

                {/* Voice Audio Player */}
                {selectedReport.hasVoiceAudio && (
                  <div className="p-3 bg-zinc-950 rounded-xl border border-sky-900/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-sky-950 text-sky-400 border border-sky-800/60">
                        <Volume2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-zinc-100 block">Worker Voice Audio Incident Dispatch</span>
                        <span className="text-[10px] text-zinc-400">Recorded on-site via MediaRecorder (0:24)</span>
                      </div>
                    </div>

                    <button
                      onClick={handlePlayVoiceAudio}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition shadow"
                    >
                      {isPlayingAudio ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                          Playing...
                        </>
                      ) : (
                        <>Play Voice Note</>
                      )}
                    </button>
                  </div>
                )}

                {/* Photo Evidence */}
                {selectedReport.hasPhoto && selectedReport.photoUrl && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-zinc-400">Attached On-Site Photo:</span>
                    <div className="rounded-xl overflow-hidden border border-zinc-800 max-h-56 bg-zinc-950">
                      <img src={selectedReport.photoUrl} alt="Hazard photo" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
              </div>

              {/* Resolution Action Box */}
              <div className="space-y-3 pt-2 border-t border-zinc-800">
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Safety Director Action Log</h4>
                <textarea
                  rows={2}
                  placeholder="Type corrective action, contractor instructions, or resolution notes visible to worker..."
                  value={actionNote}
                  onChange={(e) => setActionNote(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => handleUpdateStatus('acknowledged')}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold cursor-pointer"
                  >
                    Mark Acknowledged
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('investigating')}
                    className="px-3 py-1.5 rounded-lg bg-indigo-900/60 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 text-xs font-bold cursor-pointer"
                  >
                    Dispatch Investigation
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('action_taken')}
                    className="px-3 py-1.5 rounded-lg bg-amber-900/60 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-bold cursor-pointer"
                  >
                    Action Taken
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('resolved')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer shadow"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center text-zinc-400 space-y-3">
              <ShieldCheck className="w-10 h-10 text-zinc-400 mx-auto" />
              <h3 className="font-bold text-zinc-300 text-base">Select an Incident to Inspect</h3>
              <p className="text-xs max-w-sm mx-auto">
                Click any safety report on the left to play worker voice recordings, inspect photos, and update resolution stages.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
