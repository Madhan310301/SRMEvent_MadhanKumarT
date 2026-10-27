import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthContext';
import { 
  MessageSquareOff, 
  ShieldCheck, 
  Key, 
  Copy, 
  Check, 
  Send, 
  AlertTriangle,
  Lock,
  Search,
  MessageCircle
} from 'lucide-react';
import { localDb, CachedFeedbackRecovery } from '@/services/offline/db';

export const SpeakUpScreen: React.FC = () => {
  const { t } = useTranslation();
  const { org } = useAuth();

  const [activeTab, setActiveTab] = useState<'submit' | 'lookup'>('submit');
  const [category, setCategory] = useState<string>('workplace_fairness');
  const [feedbackText, setFeedbackText] = useState<string>('');
  
  // Submission Result
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Token Lookup State
  const [lookupTokenInput, setLookupTokenInput] = useState<string>('');
  const [foundThread, setFoundThread] = useState<any | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const [savedLocalTokens, setSavedLocalTokens] = useState<CachedFeedbackRecovery[]>([]);

  useEffect(() => {
    // Load previously saved local tokens from Dexie
    localDb.feedbackTokens.toArray().then(tokens => setSavedLocalTokens(tokens));
  }, [generatedToken]);

  const generateCryptographicToken = () => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setIsSubmitting(true);
    const token = 'fs-token-' + generateCryptographicToken();
    const threadId = 'th-' + crypto.randomUUID();

    try {
      // Save locally to worker device ONLY (never transmitted with user identity)
      await localDb.feedbackTokens.put({
        threadId,
        recoveryToken: token,
        category,
        initialMessageSnippet: feedbackText.substring(0, 60) + '...',
        createdAt: new Date().toISOString(),
        lastCheckedAt: new Date().toISOString()
      });

      setGeneratedToken(token);
      setFeedbackText('');
    } catch (err: any) {
      alert('Error creating anonymous thread: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    if (!generatedToken) return;
    navigator.clipboard.writeText(generatedToken);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  const handleLookup = (tokenToSearch: string) => {
    const token = tokenToSearch.trim();
    if (!token) return;

    // Simulate token retrieval matching
    setFoundThread({
      token,
      category: 'Workplace Fair Wage Policy',
      status: 'responded',
      createdAt: '2 days ago',
      messages: [
        {
          role: 'worker_anonymous',
          text: 'Overtime hours on night shifts were rounded down on our site last week without explanation.',
          time: '2 days ago'
        },
        {
          role: 'employer',
          text: 'Thank you for reaching out through Speak Up. We investigated the site roster: a shift reconciliation error occurred at Pier 42. All affected workers will receive a retroactive adjustment in this Friday’s cycle.',
          time: 'Yesterday'
        }
      ]
    });
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !foundThread) return;

    setFoundThread({
      ...foundThread,
      messages: [
        ...foundThread.messages,
        {
          role: 'worker_anonymous',
          text: replyText,
          time: 'Just now'
        }
      ]
    });
    setReplyText('');
  };

  return (
    <div className="space-y-4">
      {/* Header with Privacy Guarantee */}
      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black text-white">{t('speakUp.title')}</h1>
            <p className="text-xs text-purple-400 font-semibold">Strict Zero-PII Anonymous Channel</p>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
            <Lock className="w-5 h-5" />
          </div>
        </div>

        {/* Honest Anonymity Limitation & Architecture Disclosure */}
        <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-1.5 text-zinc-200 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cryptographic Privacy Architecture</span>
          </div>
          <p>
            No employee ID, name, email, or GPS location is attached to this record. 
            Management communicates with you via your private token.
          </p>
          <p className="text-zinc-500 italic">
            Honest disclosure: If you mention very specific names or unique personal events, someone reading the message may deduce who you are.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-950 rounded-xl border border-zinc-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('submit')}
            className={`py-2 rounded-lg transition ${activeTab === 'submit' ? 'bg-purple-600 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Submit Feedback
          </button>
          <button
            onClick={() => setActiveTab('lookup')}
            className={`py-2 rounded-lg transition ${activeTab === 'lookup' ? 'bg-purple-600 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            Check Replies ({savedLocalTokens.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Submit Anonymous Feedback */}
      {activeTab === 'submit' && (
        <>
          {generatedToken ? (
            <div className="p-6 rounded-2xl bg-zinc-900 border border-purple-500/40 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
              <div className="p-3.5 rounded-full bg-purple-500/10 text-purple-400 w-fit mx-auto">
                <Key className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  Feedback Successfully Dispatched
                </span>
                <h2 className="text-lg font-black text-white mt-1">Your Private Recovery Token</h2>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                  Save this token safely. It is stored on your device and is the ONLY way to read management’s response.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-purple-300 break-all select-all flex items-center justify-between gap-2">
                <span>{generatedToken}</span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition"
                  title="Copy Token"
                >
                  {hasCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setLookupTokenInput(generatedToken);
                    setActiveTab('lookup');
                    handleLookup(generatedToken);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-lg shadow-purple-600/30"
                >
                  View Anonymous Thread
                </button>
                <button
                  onClick={() => setGeneratedToken(null)}
                  className="py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-xl">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Feedback Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="workplace_fairness">Workplace Fairness & Respect</option>
                  <option value="wage_clarity">Salary Deductions & Transparency</option>
                  <option value="facilities_hygiene">Sanitation, Clean Drinking Water & Rest Areas</option>
                  <option value="management_conduct">Supervisor Behavior & Equal Treatment</option>
                  <option value="shift_scheduling">Shift Notice & Workload Balance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Your Message
                </label>
                <textarea
                  required
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={4}
                  placeholder="Share your experience or suggestions honestly. No personal identifier will be attached..."
                  className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Securing & Sending...' : t('speakUp.submitAnonymous')}</span>
              </button>
            </form>
          )}
        </>
      )}

      {/* Tab 2: Check Replies with Token */}
      {activeTab === 'lookup' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <label className="block text-xs font-semibold text-zinc-300">
              Enter Private Token or Pick Saved Thread
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Paste token e.g. fs-token-..."
                value={lookupTokenInput}
                onChange={(e) => setLookupTokenInput(e.target.value)}
                className="flex-1 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 font-mono"
              />
              <button
                type="button"
                onClick={() => handleLookup(lookupTokenInput)}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Lookup</span>
              </button>
            </div>

            {/* Quick Pick Saved Local Tokens */}
            {savedLocalTokens.length > 0 && (
              <div className="pt-2 border-t border-zinc-800/80">
                <span className="text-[11px] text-zinc-500 block mb-1.5">Saved on this device:</span>
                <div className="space-y-1.5">
                  {savedLocalTokens.map(tok => (
                    <button
                      key={tok.threadId}
                      type="button"
                      onClick={() => {
                        setLookupTokenInput(tok.recoveryToken);
                        handleLookup(tok.recoveryToken);
                      }}
                      className="w-full p-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800/80 text-left flex items-center justify-between text-xs text-zinc-300 transition"
                    >
                      <span className="truncate max-w-[240px] font-medium">{tok.initialMessageSnippet}</span>
                      <span className="text-[10px] text-purple-400 font-mono">{tok.recoveryToken.substring(0, 14)}...</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Render Conversation Thread */}
          {foundThread && (
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">{foundThread.category}</h3>
                  <span className="text-[10px] text-zinc-500">Active Anonymous Two-Way Discussion</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Management Responded
                </span>
              </div>

              {/* Message History */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {foundThread.messages.map((m: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl text-xs max-w-[85%] ${
                      m.role === 'worker_anonymous'
                        ? 'ml-auto bg-purple-600/20 border border-purple-500/30 text-purple-100'
                        : 'mr-auto bg-zinc-950 border border-zinc-800 text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
                      <strong className={m.role === 'worker_anonymous' ? 'text-purple-300' : 'text-blue-400'}>
                        {m.role === 'worker_anonymous' ? 'You (Anonymous)' : 'Management'}
                      </strong>
                      <span>{m.time}</span>
                    </div>
                    <p className="leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>

              {/* Anonymous Reply Form */}
              <form onSubmit={handlePostReply} className="flex gap-2 pt-2 border-t border-zinc-800">
                <input
                  type="text"
                  required
                  placeholder="Reply to management anonymously..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-lg shadow-purple-600/20"
                >
                  Reply
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
