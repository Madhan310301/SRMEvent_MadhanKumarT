import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthContext';
import { 
  Award, 
  ShieldCheck, 
  Clock, 
  QrCode, 
  Share2, 
  Download, 
  Plus, 
  CheckCircle2, 
  ExternalLink,
  Calendar
} from 'lucide-react';
import QRCode from 'qrcode';

export interface SkillItem {
  id: string;
  title: string;
  category: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate?: string;
  verificationStatus: 'self_declared' | 'pending_verification' | 'verified' | 'rejected';
  verifiedBy?: string;
  verifiedAt?: string;
}

export const SkillPassportScreen: React.FC = () => {
  const { t } = useTranslation();
  const { user, org, sectorConfig } = useAuth();

  const [skills, setSkills] = useState<SkillItem[]>([
    {
      id: 'sk-1',
      title: 'Certified Scaffolding & Fall Arrest (Level 2)',
      category: 'Safety & Heights',
      issuingAuthority: 'Construction Skill Development Council of India (CSDCI)',
      issueDate: '2025-04-12',
      expiryDate: '2028-04-12',
      verificationStatus: 'verified',
      verifiedBy: 'Ramesh Sundaram (Site Director, Kaveri Infra)',
      verifiedAt: '2025-04-15'
    },
    {
      id: 'sk-2',
      title: 'Hydraulic Mobile Crane & Rigging Operator',
      category: 'Heavy Equipment',
      issuingAuthority: 'L&T Construction Skills Training Institute (CSTI)',
      issueDate: '2024-11-20',
      expiryDate: '2029-11-20',
      verificationStatus: 'verified',
      verifiedBy: 'State Transport & Infrastructure Board',
      verifiedAt: '2024-11-25'
    },
    {
      id: 'sk-3',
      title: 'Emergency First Aid & Trauma Responder',
      category: 'Health & Safety',
      issuingAuthority: 'Indian Red Cross Society',
      issueDate: '2026-02-10',
      expiryDate: '2028-02-10',
      verificationStatus: 'pending_verification'
    }
  ]);

  const [shareQrUrl, setShareQrUrl] = useState<string>('');
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Skill Form
  const [newTitle, setNewTitle] = useState<string>('');
  const [newAuthority, setNewAuthority] = useState<string>('');

  const generateShareQr = () => {
    const sharePayload = JSON.stringify({
      workerId: user?.id,
      workerName: user?.name,
      verifiedSkillsCount: skills.filter(s => s.verificationStatus === 'verified').length,
      expiresAt: Date.now() + 24 * 3600 * 1000, // 24-hr expiring link
      passportUrl: `https://fairshift.app/verify/${user?.id}?token=${Math.random().toString(36).substring(2, 10)}`
    });

    QRCode.toDataURL(sharePayload, { width: 220, margin: 1, color: { dark: '#ffffff', light: '#18181b' } })
      .then(url => {
        setShareQrUrl(url);
        setShowShareModal(true);
      });
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newSkill: SkillItem = {
      id: 'sk-' + Date.now(),
      title: newTitle,
      category: 'General Vocational',
      issuingAuthority: newAuthority || 'Self-Declared Skill Assessment',
      issueDate: new Date().toISOString().split('T')[0],
      verificationStatus: 'pending_verification'
    };

    setSkills([newSkill, ...skills]);
    setNewTitle('');
    setNewAuthority('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Worker-Owned Digital Passport</span>
          </div>
          <h1 className="text-lg font-black text-white">{t('skills.title')}</h1>
          <p className="text-xs text-zinc-400">Portable across all employers & contractors</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={generateShareQr}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1.5 text-xs font-bold shadow-lg shadow-blue-600/20"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share Passport</span>
          </button>
        </div>
      </div>

      {/* Action to Add New Skill */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full py-3 rounded-xl border border-dashed border-zinc-700 hover:border-blue-500 hover:bg-blue-500/5 text-zinc-300 text-xs font-bold transition flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4 text-blue-400" />
        <span>Add Certificate / Skill Evidence</span>
      </button>

      {/* Skills Inventory List */}
      <div className="space-y-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2.5 shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-extrabold text-white">{skill.title}</h3>
                <p className="text-xs text-blue-400 font-medium">{skill.issuingAuthority}</p>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold shrink-0 ${
                skill.verificationStatus === 'verified'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {skill.verificationStatus === 'verified' ? 'Verified' : 'Pending Review'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-zinc-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Issued: {skill.issueDate}
              </span>
              {skill.expiryDate && (
                <span>Expires: {skill.expiryDate}</span>
              )}
            </div>

            {skill.verifiedBy && (
              <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Verified by {skill.verifiedBy}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Share QR Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl text-center space-y-4">
            <h3 className="text-base font-black text-white">Share Verified Credentials</h3>
            <p className="text-xs text-zinc-400">
              Show this QR code to a prospective employer. It grants a 24-hour read-only verification view without exposing personal identity or salary history.
            </p>

            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-700 w-fit mx-auto shadow-inner">
              <img src={shareQrUrl} alt="Passport Share QR" className="w-48 h-48 rounded" />
            </div>

            <div className="text-[11px] text-zinc-500">
              Expiring token: <code>fairshift-exp-24h</code>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl text-zinc-100">
            <h3 className="text-base font-bold mb-1">Add Skill or Certification</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Upload certificate details for employer or authorized trainer verification.
            </p>

            <form onSubmit={handleAddSkill} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Skill / Training Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Heavy Crane Operator / First Aid"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Issuing Institute / Authority</label>
                <input
                  type="text"
                  placeholder="e.g. National Skill Development Corp (NSDC)"
                  value={newAuthority}
                  onChange={(e) => setNewAuthority(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition"
                >
                  Save to Passport
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
