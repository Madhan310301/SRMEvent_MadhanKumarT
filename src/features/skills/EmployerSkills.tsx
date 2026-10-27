import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Award, CheckCircle2, ShieldCheck, Search, Filter, Clock, ExternalLink, QrCode } from 'lucide-react';

interface WorkerSkillVerification {
  id: string;
  workerName: string;
  workerRole: string;
  skillName: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  certNumber: string;
  status: 'verified' | 'pending';
}

export const EmployerSkills: React.FC = () => {
  const { org } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const [skills, setSkills] = useState<WorkerSkillVerification[]>([
    {
      id: 'sk-01',
      workerName: 'Murugan K.',
      workerRole: 'Crane & Rigging Specialist',
      skillName: 'Heavy Tower Crane Operations (Level 3)',
      issuer: 'National Skill Development Corporation (NSDC)',
      issueDate: '2024-03-15',
      expiryDate: '2028-03-15',
      certNumber: 'NSDC-CRN-882190',
      status: 'verified'
    },
    {
      id: 'sk-02',
      workerName: 'Murugan K.',
      workerRole: 'Crane & Rigging Specialist',
      skillName: 'First Aid & High-Angle Rescue Training',
      issuer: 'St. John Ambulance Safety Board',
      issueDate: '2025-06-10',
      expiryDate: '2027-06-10',
      certNumber: 'SJA-FA-55201',
      status: 'verified'
    },
    {
      id: 'sk-03',
      workerName: 'Karthik Raja',
      workerRole: 'Structural Welder',
      skillName: 'Underwater & Pressure Vessel Arc Welding',
      issuer: 'Indian Institute of Welding (IIW)',
      issueDate: '2025-01-20',
      expiryDate: '2027-01-20',
      certNumber: 'IIW-ARC-99120',
      status: 'pending'
    },
    {
      id: 'sk-04',
      workerName: 'Lakshmi S.',
      workerRole: 'Facilities Lead',
      skillName: 'Hazardous Chemical & Biohazard Sanitation (OSHA)',
      issuer: 'Safety Professionals Association of India',
      issueDate: '2024-11-05',
      expiryDate: '2026-11-05',
      certNumber: 'SPAI-BIO-44102',
      status: 'verified'
    }
  ]);

  const handleVerify = (id: string) => {
    setSkills(skills.map(s => s.id === id ? { ...s, status: 'verified' } : s));
    alert('Certificate verified and signed with employer cryptographic stamp. Reflected in worker\'s portable passport.');
  };

  const filtered = skills.filter(s =>
    s.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.skillName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.certNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
          <Award className="w-6 h-6 text-sky-400" />
          Portable Skill Passport & Trade Certification Desk
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review, endorse, and electronically seal employee vocational certifications, trade licenses, and safety competencies.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Registered Trade Credentials</span>
          <span className="text-2xl font-black text-white mt-1 block">{skills.length}</span>
        </div>
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">Cryptographically Verified</span>
          <span className="text-2xl font-black text-emerald-300 mt-1 block">
            {skills.filter(s => s.status === 'verified').length}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">Awaiting Employer Review</span>
          <span className="text-2xl font-black text-amber-300 mt-1 block">
            {skills.filter(s => s.status === 'pending').length}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by worker name, certification title, credential ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/80 text-zinc-400 uppercase font-semibold border-b border-zinc-800 tracking-wider">
              <tr>
                <th className="p-4">Employee</th>
                <th className="p-4">Certification & Trade Skill</th>
                <th className="p-4">Accredited Issuer</th>
                <th className="p-4">License / ID</th>
                <th className="p-4">Valid Until</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-zinc-800/30 transition">
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{s.workerName}</div>
                    <div className="text-zinc-400 text-[11px]">{s.workerRole}</div>
                  </td>
                  <td className="p-4 font-bold text-zinc-200">
                    {s.skillName}
                  </td>
                  <td className="p-4 text-zinc-300">
                    {s.issuer}
                  </td>
                  <td className="p-4 font-mono text-zinc-400">
                    {s.certNumber}
                  </td>
                  <td className="p-4 text-zinc-300">
                    {s.expiryDate}
                  </td>
                  <td className="p-4">
                    {s.status === 'verified' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-semibold text-[10px]">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/60 font-semibold text-[10px]">
                        <Clock className="w-2.5 h-2.5" /> Pending Audit
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {s.status === 'pending' ? (
                      <button
                        onClick={() => handleVerify(s.id)}
                        className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs cursor-pointer shadow transition"
                      >
                        Verify & Stamp
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-xs">
                        <ShieldCheck className="w-4 h-4" /> Endorsed
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
