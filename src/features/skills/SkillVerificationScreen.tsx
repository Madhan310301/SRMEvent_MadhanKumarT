import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, ShieldCheck, CheckCircle2, Calendar, Building2, User, ArrowLeft, ExternalLink } from 'lucide-react';

export const SkillVerificationScreen: React.FC = () => {
  const { code } = useParams<{ code?: string }>();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between p-4 selection:bg-amber-500/30">
      <div className="max-w-xl mx-auto w-full pt-8 pb-12 space-y-6">
        {/* Verification Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-sm text-emerald-400 uppercase tracking-wider">
                Cryptographically Verified
              </span>
            </div>
            <span className="font-mono text-xs text-zinc-400 font-semibold">
              ID: {code || 'FS-PASS-88219'}
            </span>
          </div>

          {/* Worker Identity */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-amber-500/20">
              M
            </div>
            <div>
              <h1 className="text-xl font-black text-white">Murugan K.</h1>
              <p className="text-xs text-amber-400 font-semibold">Senior Crane & Rigging Specialist</p>
              <p className="text-xs text-zinc-400 mt-0.5">Worker-Owned Portable Skill Passport • Active Roster</p>
            </div>
          </div>

          {/* Endorsement Proof */}
          <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Current Employer Endorsement:</span>
              <span className="text-zinc-200 font-bold">Kaveri Mega Infra Projects Ltd.</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Total Verified Construction Shifts:</span>
              <span className="text-emerald-400 font-bold">418 shifts (3,344 hours)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Safety Incident Rate:</span>
              <span className="text-emerald-400 font-bold">0.0 (Zero Violations)</span>
            </div>
          </div>

          {/* Verified Certificates */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              Verified Vocational & Safety Credentials
            </h3>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">Heavy Tower Crane Operations (Level 3)</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> Valid
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">National Skill Development Corporation (NSDC) • License: NSDC-CRN-882190</p>
                <span className="text-[10px] text-zinc-400 block pt-0.5">Validity: March 2024 – March 2028</span>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">First Aid & High-Angle Rescue Training</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" /> Valid
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">St. John Ambulance Safety Board • License: SJA-FA-55201</p>
                <span className="text-[10px] text-zinc-400 block pt-0.5">Validity: June 2025 – June 2027</span>
              </div>
            </div>
          </div>

          {/* Portable Notice */}
          <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
            This digital credential is owned by the worker under FairShift's Portable Skill Protocol (UN SDG 8). When moving between employers, certified trade achievements remain intact.
          </p>

          <Link
            to="/"
            className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to FairShift Portal
          </Link>
        </div>
      </div>

      <footer className="text-center text-xs text-zinc-400 pb-4">
        FairShift Portable Credential Verification • PromptWars 2026 SRM ACM
      </footer>
    </div>
  );
};
