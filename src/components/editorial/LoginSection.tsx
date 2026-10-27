import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { DEMO_USERS } from '@/features/organizations/mockData';
import { HardHat, GraduationCap, Building2, User, Crown, ArrowRight, Lock, ShieldCheck, Mail, Key } from 'lucide-react';

export const LoginSection: React.FC = () => {
  const navigate = useNavigate();
  const { switchDemoUser } = useAuth();

  const [selectedSector, setSelectedSector] = useState<'construction' | 'college'>('construction');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showCharterModal, setShowCharterModal] = useState(false);

  const handleSelectPersona = (userKey: keyof typeof DEMO_USERS) => {
    switchDemoUser(userKey);
    const target = DEMO_USERS[userKey];
    if (target.role === 'worker') {
      navigate('/worker');
    } else {
      navigate('/employer');
    }
  };

  const handleRealAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError(null);

    setTimeout(() => {
      setIsSubmitting(false);
      // Smart credential router based on input email or sector
      if (email.toLowerCase().includes('worker') || email.toLowerCase().includes('murugan') || email.toLowerCase().includes('lakshmi')) {
        handleSelectPersona(selectedSector === 'construction' ? 'worker-construction' : 'worker-college');
      } else if (email.toLowerCase().includes('owner') || email.toLowerCase().includes('rajesh') || email.toLowerCase().includes('sathya')) {
        handleSelectPersona(selectedSector === 'construction' ? 'owner-construction' : 'owner-college');
      } else {
        handleSelectPersona(selectedSector === 'construction' ? 'employer-construction' : 'employer-college');
      }
    }, 450);
  };

  return (
    <section id="login-section" className="py-24 md:py-36 bg-[#F6F6F4] dark:bg-[#141618] border-t border-[#E8E8E5] dark:border-[#282B2F] transition-colors">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 space-y-12">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5F6B73] dark:text-[#95A0A6] block">
            Access Portals
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl font-normal text-[#17191B] dark:text-white">
            Choose Your Portal
          </h2>
          <p className="text-sm sm:text-base text-[#5F6B73] dark:text-[#95A0A6] font-interface font-normal leading-relaxed">
            Select one of the 6 pre-configured authorized personas for 1-click evaluation, or sign in with your enterprise credentials.
          </p>
        </div>

        {/* Sector Filter Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-xl bg-[#E8E8E5] dark:bg-[#282B2F] border border-[#D5D5CF] dark:border-[#373B40]">
            <button
              onClick={() => setSelectedSector('construction')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
                selectedSector === 'construction'
                  ? 'bg-white dark:bg-[#181A1D] text-[#17191B] dark:text-white shadow-sm'
                  : 'text-[#5F6B73] dark:text-[#95A0A6] hover:text-[#17191B] dark:hover:text-white'
              }`}
            >
              <HardHat className="w-4 h-4 text-[#286B58] dark:text-[#3DA386]" />
              <span>Construction Site</span>
            </button>
            <button
              onClick={() => setSelectedSector('college')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
                selectedSector === 'college'
                  ? 'bg-white dark:bg-[#181A1D] text-[#17191B] dark:text-white shadow-sm'
                  : 'text-[#5F6B73] dark:text-[#95A0A6] hover:text-[#17191B] dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-[#286B58] dark:text-[#3DA386]" />
              <span>School / College</span>
            </button>
          </div>
        </div>

        {/* The 3 Personas for Active Sector (Total 6 Across Both Sectors) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: OWNER */}
          <div
            onClick={() => handleSelectPersona(selectedSector === 'construction' ? 'owner-construction' : 'owner-college')}
            className="group cursor-pointer bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] hover:border-[#286B58] dark:hover:border-[#3DA386] rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#17191B]/5 dark:bg-white/10 text-[10px] font-bold tracking-widest uppercase text-[#17191B] dark:text-white flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-500" />
                  Owner Portal
                </span>
                <span className="text-[10px] font-mono text-[#5F6B73] dark:text-[#95A0A6]">
                  {selectedSector === 'construction' ? 'KMIP-OWNER' : 'SRM-OWNER'}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-editorial text-2xl font-normal text-[#17191B] dark:text-white group-hover:text-[#286B58] dark:group-hover:text-[#3DA386] transition-colors">
                  {selectedSector === 'construction' ? 'Rajesh Kaveri' : 'Dr. P. Sathyanarayanan'}
                </h3>
                <p className="text-xs font-semibold text-[#5F6B73] dark:text-[#95A0A6]">
                  {selectedSector === 'construction' ? 'Managing Director & Enterprise Owner' : 'Pro-Chancellor & Institution Owner'}
                </p>
                <p className="text-xs text-[#5F6B73] dark:text-[#95A0A6] pt-1 leading-relaxed">
                  {selectedSector === 'construction'
                    ? 'Kaveri Mega Infra Projects Ltd. • Full enterprise governance, multi-site financial ledgers, and compliance.'
                    : 'SRM Institute of Science & Technology • Campus governance, multi-department oversight, and institutional policies.'}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E8E5] dark:border-[#282B2F] flex items-center justify-between text-xs font-bold text-[#286B58] dark:text-[#3DA386]">
              <span>Sign In as Owner</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: EMPLOYER / SITE DIRECTOR */}
          <div
            onClick={() => handleSelectPersona(selectedSector === 'construction' ? 'employer-construction' : 'employer-college')}
            className="group cursor-pointer bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] hover:border-[#286B58] dark:hover:border-[#3DA386] rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#17191B]/5 dark:bg-white/10 text-[10px] font-bold tracking-widest uppercase text-[#17191B] dark:text-white flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#286B58] dark:text-[#3DA386]" />
                  Employer / Admin
                </span>
                <span className="text-[10px] font-mono text-[#5F6B73] dark:text-[#95A0A6]">
                  {selectedSector === 'construction' ? 'KMIP-ADMIN' : 'SRM-ADMIN'}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-editorial text-2xl font-normal text-[#17191B] dark:text-white group-hover:text-[#286B58] dark:group-hover:text-[#3DA386] transition-colors">
                  {selectedSector === 'construction' ? 'Ramesh Sundaram' : 'Dr. Arun Kumar'}
                </h3>
                <p className="text-xs font-semibold text-[#5F6B73] dark:text-[#95A0A6]">
                  {selectedSector === 'construction' ? 'Head Safety Officer & Site Director' : 'Director of Campus Infrastructure & Services'}
                </p>
                <p className="text-xs text-[#5F6B73] dark:text-[#95A0A6] pt-1 leading-relaxed">
                  {selectedSector === 'construction'
                    ? 'Pier 42 Metro Viaduct & Shaft-B • Shift scheduling, muster roll audit, safety desk, and payroll disbursement.'
                    : 'Campus Infrastructure & Facilities • Department rosters, sanitation checks, and incident resolution.'}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E8E5] dark:border-[#282B2F] flex items-center justify-between text-xs font-bold text-[#286B58] dark:text-[#3DA386]">
              <span>Sign In as Employer</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 3: EMPLOYEE / WORKER */}
          <div
            onClick={() => handleSelectPersona(selectedSector === 'construction' ? 'worker-construction' : 'worker-college')}
            className="group cursor-pointer bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] hover:border-[#286B58] dark:hover:border-[#3DA386] rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#286B58]/10 text-[10px] font-bold tracking-widest uppercase text-[#286B58] dark:text-[#3DA386] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Employee Portal
                </span>
                <span className="text-[10px] font-mono text-[#5F6B73] dark:text-[#95A0A6]">
                  {selectedSector === 'construction' ? 'KMIP-WRK-01' : 'SRM-WRK-02'}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-editorial text-2xl font-normal text-[#17191B] dark:text-white group-hover:text-[#286B58] dark:group-hover:text-[#3DA386] transition-colors">
                  {selectedSector === 'construction' ? 'Murugan K.' : 'Lakshmi S.'}
                </h3>
                <p className="text-xs font-semibold text-[#5F6B73] dark:text-[#95A0A6]">
                  {selectedSector === 'construction' ? 'Heavy Machinery & Crane Specialist' : 'Senior Facilities & Housekeeping Lead'}
                </p>
                <p className="text-xs text-[#5F6B73] dark:text-[#95A0A6] pt-1 leading-relaxed">
                  {selectedSector === 'construction'
                    ? 'Native Tamil speech synthesis • QR check-in, overtime ledger, voice hazard memos, and portable Skill Passport.'
                    : 'Native Tamil speech synthesis • Facility check-in, transparent payslips, anonymous Speak Up, and fatigue advisories.'}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E8E5] dark:border-[#282B2F] flex items-center justify-between text-xs font-bold text-[#286B58] dark:text-[#3DA386]">
              <span>Sign In as Employee</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Real Credential Sign In Form */}
        <div className="max-w-md mx-auto bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-editorial text-2xl font-normal text-[#17191B] dark:text-white">
              Enterprise Account Sign In
            </h3>
            <p className="text-xs text-[#5F6B73] dark:text-[#95A0A6]">
              Enter your registered corporate email or phone number
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400">
              {authError}
            </div>
          )}

          <form onSubmit={handleRealAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold tracking-wider uppercase text-[#17191B] dark:text-white mb-1.5">
                Work Email or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-[#5F6B73] dark:text-[#95A0A6]" />
                <input
                  type="text"
                  required
                  placeholder="e.g. murugan@kaveri-infra.demo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#E8E8E5] dark:border-[#282B2F] bg-[#FAFAF8] dark:bg-[#111214] text-xs text-[#17191B] dark:text-white placeholder-[#8A969E] focus:outline-none focus:ring-2 focus:ring-[#286B58]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold tracking-wider uppercase text-[#17191B] dark:text-white">
                  Password or PIN
                </label>
                <a
                  href="#demo"
                  onClick={(e) => {
                    e.preventDefault();
                    setEmail('rajesh.owner@kaveri-infra.demo');
                    setPassword('demo-owner-2026');
                  }}
                  className="text-[11px] text-[#286B58] dark:text-[#3DA386] font-semibold hover:underline"
                >
                  Fill Owner Demo
                </a>
              </div>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3 top-3 text-[#5F6B73] dark:text-[#95A0A6]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#E8E8E5] dark:border-[#282B2F] bg-[#FAFAF8] dark:bg-[#111214] text-xs text-[#17191B] dark:text-white placeholder-[#8A969E] focus:outline-none focus:ring-2 focus:ring-[#286B58]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-[#17191B] text-white dark:bg-white dark:text-[#17191B] text-xs font-bold tracking-[0.16em] uppercase hover:bg-[#286B58] dark:hover:bg-[#3DA386] dark:hover:text-white transition-all duration-200 cursor-pointer shadow flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Sign In to FairShift
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => setShowCharterModal(true)}
              className="text-xs text-[#5F6B73] dark:text-[#95A0A6] hover:text-[#17191B] dark:hover:text-white underline cursor-pointer"
            >
              Worker Protection & Privacy Charter
            </button>
          </div>
        </div>
      </div>

      {/* Worker Protection Charter Modal */}
      {showCharterModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] max-w-lg w-full rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8E8E5] dark:border-[#282B2F] pb-3">
              <h3 className="font-editorial text-2xl font-normal text-[#17191B] dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#286B58] dark:text-[#3DA386]" /> Worker Protection Charter
              </h3>
              <button
                onClick={() => setShowCharterModal(false)}
                className="text-2xl text-[#5F6B73] hover:text-black dark:hover:text-white font-light cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#5F6B73] dark:text-[#D6D7D4] leading-relaxed max-h-80 overflow-y-auto pr-2">
              <p className="font-bold text-[#17191B] dark:text-white">1. Decoupled Speak Up Anonymity:</p>
              <p>Zero PII stored. No user IDs, telemetry, or GPS coordinates are linked to anonymous feedback threads. Only the worker’s cryptographically hashed 12-word recovery token permits checking for employer replies.</p>
              <p className="font-bold text-[#17191B] dark:text-white">2. Transparent Itemized Overtime:</p>
              <p>Overtime rates (1.5x / 2.0x) and statutory deductions (PF / ESI) are fully explained in plain language and native audio in 8 Indian languages.</p>
              <p className="font-bold text-[#17191B] dark:text-white">3. Non-Punitive Fatigue Protection:</p>
              <p>Fatigue alerts exist solely to guarantee worker safety (&gt;12h shifts, &lt;11h rest) and cannot be used to penalize wages or apply punitive reassignments.</p>
            </div>

            <button
              onClick={() => setShowCharterModal(false)}
              className="w-full py-3 bg-[#17191B] text-white dark:bg-white dark:text-[#17191B] text-xs font-bold tracking-widest uppercase rounded-lg cursor-pointer hover:bg-[#286B58] dark:hover:bg-[#3DA386] dark:hover:text-white transition-all"
            >
              I Understand & Acknowledge
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
