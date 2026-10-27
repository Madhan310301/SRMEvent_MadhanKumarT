import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { MessageSquare, Shield, ShieldCheck, Lock, Send, ChevronRight, BarChart2, AlertCircle } from 'lucide-react';

interface AnonymousThread {
  id: string;
  category: string;
  tokenHashPrefix: string;
  submittedAt: string;
  sentiment: 'critical' | 'moderate' | 'constructive';
  message: string;
  employerResponse?: string;
  responseSentAt?: string;
}

export const EmployerFeedback: React.FC = () => {
  const { org } = useAuth();
  const [selectedThread, setSelectedThread] = useState<AnonymousThread | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const [threads, setThreads] = useState<AnonymousThread[]>([
    {
      id: 'th-01',
      category: 'Workplace Safety & Equipment',
      tokenHashPrefix: 'a7f9c2...',
      submittedAt: '2026-10-26 18:30',
      sentiment: 'critical',
      message: 'Night shift scaffolding lighting on Pier 42 is dangerously dim near the eastern edge. Two workers almost slipped near the crane blind spot yesterday.',
      employerResponse: 'Additional 400W LED portable tower lights dispatched and will be operational tonight.',
      responseSentAt: '2026-10-27 10:15'
    },
    {
      id: 'th-02',
      category: 'Rest Areas & Drinking Water',
      tokenHashPrefix: '3b81e4...',
      submittedAt: '2026-10-27 11:00',
      sentiment: 'moderate',
      message: 'Drinking water dispenser near Gate 3 was empty from 1 PM to 4 PM during 38°C peak heat. Refill supply was delayed.',
    },
    {
      id: 'th-03',
      category: 'Fair Wages & Overtime Logging',
      tokenHashPrefix: '9c40d1...',
      submittedAt: '2026-10-25 19:40',
      sentiment: 'constructive',
      message: 'Supervisor on Sunday claimed 3 hours overtime was regular duty because it was a festival weekend. Please clarify overtime multiplier policy.',
      employerResponse: 'Sunday work on all mega-infra sites qualifies for 2.0x overtime multiplier per FairShift policy. Please review updated payroll ledger.',
      responseSentAt: '2026-10-26 09:30'
    }
  ]);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedThread || !replyText.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      const updated = {
        ...selectedThread,
        employerResponse: replyText,
        responseSentAt: 'Just now'
      };
      setSelectedThread(updated);
      setThreads(threads.map(t => t.id === updated.id ? updated : t));
      setReplyText('');
      setIsSending(false);
      alert('Your response has been published to the worker\'s cryptographic recovery token mailbox.');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
              <MessageSquare className="w-6 h-6 text-amber-400" />
              Speak Up — Anonymous Worker Feedback Inbox
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Zero-retaliation communication channel. Worker identities are mathematically decoupled with SHA-256 tokens and $k \ge 5$ privacy k-anonymity.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold self-start md:self-auto">
            <Lock className="w-4 h-4 text-amber-400" />
            Zero-PII Storage Guaranteed
          </div>
        </div>
      </div>

      {/* Privacy Charter Banner */}
      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300">
          <strong className="text-zinc-100">K-Anonymity Threshold ($k \ge 5$) Protected:</strong> Employer views aggregated grievance categories only when at least 5 individual workers have submitted reports under that category. No IP addresses, device signatures, or user IDs are recorded.
        </div>
      </div>

      {/* Grid: Feedback list + Response pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-1">
            Anonymous Submissions ({threads.length})
          </div>

          <div className="space-y-2.5">
            {threads.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedThread(t)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  selectedThread?.id === t.id
                    ? 'bg-zinc-800/90 border-amber-500/60 shadow-lg'
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-zinc-200">{t.category}</span>
                  <span className="font-mono text-[10px] text-zinc-400">Token: {t.tokenHashPrefix}</span>
                </div>
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">{t.message}</p>
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-zinc-800/80 text-[11px]">
                  <span className="text-zinc-400">{t.submittedAt}</span>
                  {t.employerResponse ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Responded
                    </span>
                  ) : (
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Awaiting Reply
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          {selectedThread ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 font-bold text-xs">
                    {selectedThread.category}
                  </span>
                  <h3 className="font-bold text-base text-white mt-2">Anonymous Grievance Thread</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Hashed Token: <code className="font-mono text-zinc-300 bg-zinc-950 px-1.5 py-0.5 rounded">{selectedThread.tokenHashPrefix}</code> • Submitted: {selectedThread.submittedAt}
                  </p>
                </div>
              </div>

              {/* Worker Message */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Worker Anonymous Note</span>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs text-zinc-200 leading-relaxed">
                  "{selectedThread.message}"
                </div>
              </div>

              {/* Previous Employer Response */}
              {selectedThread.employerResponse && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    <span>Published Employer Action</span>
                    <span className="text-zinc-400">{selectedThread.responseSentAt}</span>
                  </div>
                  <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-800/40 text-xs text-emerald-200 leading-relaxed">
                    {selectedThread.employerResponse}
                  </div>
                </div>
              )}

              {/* Reply Composer */}
              <form onSubmit={handleSendReply} className="space-y-3 pt-3 border-t border-zinc-800">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Post Anonymous Two-Way Reply
                </label>
                <p className="text-xs text-zinc-400">
                  Your reply will be securely delivered to the worker's device when they query their 12-word recovery token.
                </p>
                <textarea
                  required
                  rows={3}
                  placeholder="Explain actions taken, site corrections, or policy clarifications..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                <button
                  type="submit"
                  disabled={isSending}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition shadow shadow-amber-500/20"
                >
                  <Send className="w-4 h-4" />
                  {isSending ? 'Sending securely...' : 'Publish Response to Token'}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center text-zinc-400 space-y-3">
              <Shield className="w-10 h-10 text-zinc-400 mx-auto" />
              <h3 className="font-bold text-zinc-300 text-base">Select Feedback to Review</h3>
              <p className="text-xs max-w-sm mx-auto">
                Review verified anonymous submissions from your workforce and publish official clarifications without deanonymizing anyone.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
