import React, { useState } from 'react';
import { QrCode, CheckCircle2, IndianRupee, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export const ProductStoryWalkthrough: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      number: '01',
      title: 'Worker Records Attendance',
      summary: 'Employee scans rotating site QR token on mobile. Offline Dexie queue buffers punches if network connection drops.',
      details: [
        'GPS geofence radius check (150m boundary tolerance)',
        'Biometric supervisor override with physical fallback',
        'Works seamlessly on 360px Android devices'
      ],
      icon: QrCode,
      previewTitle: 'Digital Attendance Punch',
      previewBadge: 'Verified Geofence',
      previewData: {
        worker: 'Murugan K. (Crane Specialist)',
        site: 'Pier 42 Metro Viaduct Site',
        time: '08:00 AM • Verified within 42m',
        code: 'KMIP-BLR-QR'
      }
    },
    {
      id: 1,
      number: '02',
      title: 'Supervisor Audits Shift',
      summary: 'Site directors review digital muster rolls in real time, validating overtime and flagging anomalies.',
      details: [
        'Clear audit trail for punch adjustments',
        'Automatic fatigue alerts if shift exceeds 12 hours',
        'Non-punitive workload rebalancing recommendations'
      ],
      icon: CheckCircle2,
      previewTitle: 'Muster Roll Audit Desk',
      previewBadge: 'Supervisor Verified',
      previewData: {
        worker: 'Murugan K. • 10.5 Hours Logged',
        site: 'Standard: 8.0h | Overtime: 2.5h (1.5x)',
        time: 'Audited by: S. Shanmugam (Site Lead)',
        code: 'AUDIT-PASS-99'
      }
    },
    {
      id: 2,
      number: '03',
      title: 'Transparent Wage Disbursed',
      summary: 'Worker sees itemized calculations with base pay, statutory PF/ESI, and audio explanations in their regional language.',
      details: [
        'Full 1.5x / 2.0x overtime multiplier applied',
        'Web Speech API audio read-aloud in Tamil, Hindi, Telugu',
        'Direct Bank NEFT CSV export for payroll'
      ],
      icon: IndianRupee,
      previewTitle: 'Transparent Payslip Record',
      previewBadge: '₹21,850 Net Disbursed',
      previewData: {
        worker: 'Gross Pay: ₹24,100 (24 Days + 18.5h OT)',
        site: 'Deductions: PF ₹1,800 + ESI ₹450',
        time: 'Text-to-Speech audio available in Tamil',
        code: 'NEFT-COMPLIANT'
      }
    },
    {
      id: 3,
      number: '04',
      title: 'Disputes Resolved with History',
      summary: 'If hours or deductions differ, workers raise transparent correction requests with tamper-evident audit history.',
      details: [
        'Direct two-way communication with Site HR',
        '48-hour resolution requirement',
        'Zero fear of retaliation'
      ],
      icon: MessageSquare,
      previewTitle: 'Correction & Resolution Desk',
      previewBadge: 'Adjustment Sealed',
      previewData: {
        worker: 'Claim: Missing 4.5h Sunday Concreting OT',
        site: 'Status: Accepted & Credited to Supplementary Run',
        time: 'Resolution time: 14 hours with worker notification',
        code: 'RESOLVED-HIST'
      }
    }
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-36 bg-[#FAFAF8] dark:bg-[#111214] border-t border-[#E8E8E5] dark:border-[#282B2F] transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5F6B73] dark:text-[#95A0A6] block">
            End-to-End Workflow
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl font-normal text-[#17191B] dark:text-white">
            How FairShift Works
          </h2>
          <p className="text-sm sm:text-base text-[#5F6B73] dark:text-[#95A0A6] font-interface font-normal leading-relaxed">
            Every step is designed for maximum clarity, mutual trust, and mathematical precision.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-b border-[#E8E8E5] dark:border-[#282B2F] pb-4">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveStep(idx)}
              className={`text-left p-3 rounded-lg transition-all cursor-pointer ${
                activeStep === idx
                  ? 'bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] shadow-sm'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100'
              }`}
            >
              <span className="text-[11px] font-mono font-bold text-[#286B58] dark:text-[#3DA386] block">
                {s.number}
              </span>
              <span className="text-xs font-bold text-[#17191B] dark:text-white block mt-1">
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active Step Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-[#286B58] dark:text-[#3DA386] tracking-widest uppercase">
                Step {steps[activeStep].number} in Detail
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-[#17191B] dark:text-white">
                {steps[activeStep].title}
              </h3>
              <p className="text-sm sm:text-base text-[#5F6B73] dark:text-[#95A0A6] leading-relaxed font-interface font-normal">
                {steps[activeStep].summary}
              </p>
            </div>

            <ul className="space-y-3 pt-2">
              {steps[activeStep].details.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#17191B] dark:text-[#D6D7D4]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#286B58] dark:bg-[#3DA386] shrink-0 mt-2"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="editorial-underline-link cursor-pointer"
              >
                Next Workflow Stage <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
              </button>
            </div>
          </div>

          {/* Right Interface Preview Card (Realistic Editorial UI Component) */}
          <div className="lg:col-span-6">
            <div className="bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E8E5] dark:border-[#282B2F] pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#5F6B73] dark:text-[#95A0A6] tracking-wider uppercase block">
                    FairShift Live Interface
                  </span>
                  <h4 className="font-editorial text-xl font-normal text-[#17191B] dark:text-white mt-0.5">
                    {steps[activeStep].previewTitle}
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#286B58]/10 text-[#286B58] dark:text-[#3DA386] text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> {steps[activeStep].previewBadge}
                </span>
              </div>

              <div className="bg-[#FAFAF8] dark:bg-[#111214] p-5 rounded-xl border border-[#E8E8E5] dark:border-[#282B2F] space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#5F6B73] dark:text-[#95A0A6]">Record Subject:</span>
                  <span className="font-bold text-[#17191B] dark:text-white">{steps[activeStep].previewData.worker}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5F6B73] dark:text-[#95A0A6]">Site / Location:</span>
                  <span className="text-[#17191B] dark:text-white font-medium">{steps[activeStep].previewData.site}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5F6B73] dark:text-[#95A0A6]">Verification Details:</span>
                  <span className="text-[#286B58] dark:text-[#3DA386] font-semibold">{steps[activeStep].previewData.time}</span>
                </div>
                <div className="pt-2 border-t border-[#E8E8E5] dark:border-[#282B2F] flex justify-between font-mono text-[11px] text-[#5F6B73] dark:text-[#95A0A6]">
                  <span>System Stamp:</span>
                  <span>{steps[activeStep].previewData.code}</span>
                </div>
              </div>

              <div className="text-[11px] text-[#5F6B73] dark:text-[#95A0A6] text-center italic">
                Encrypted with SHA-256 and synchronized via offline-first Dexie IndexedDB.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
