import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Users, Plus, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { FairShiftWorkforceSearch } from '@/features/workforce-search/FairShiftWorkforceSearch';

export const EmployerWorkers: React.FC = () => {
  const { org, sectorConfig } = useAuth();
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] rounded-2xl p-6 shadow-sm">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#286B58] dark:text-[#3DA386] uppercase block">
            Workforce Directory
          </span>
          <h1 className="font-editorial text-3xl font-normal text-[#17191B] dark:text-white mt-1 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#286B58] dark:text-[#3DA386]" />
            Authorized Employees & Wage Ledger
          </h1>
          <p className="text-xs text-[#5F6B73] dark:text-[#95A0A6] mt-1">
            Search employees across sites, view skill certifications, attendance status, and verified base wage rates.
          </p>
        </div>

        <button
          onClick={() => alert('Enroll New Employee: Provision role, wage contract, and secure phone credentials.')}
          className="px-4 py-2.5 rounded-lg bg-[#17191B] text-white dark:bg-white dark:text-[#17191B] font-bold text-xs tracking-wider uppercase hover:bg-[#286B58] dark:hover:bg-[#3DA386] dark:hover:text-white transition shadow cursor-pointer flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Enroll New Employee
        </button>
      </div>

      {/* MorphOrb Workforce Search Assistant */}
      <div className="bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] rounded-2xl p-5 sm:p-6 shadow-sm">
        <FairShiftWorkforceSearch onSelectWorker={(id) => setSelectedWorkerId(id)} />
      </div>

      {/* Worker Detail Inspection Modal if selected */}
      {selectedWorkerId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] max-w-md w-full rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8E8E5] dark:border-[#282B2F] pb-3">
              <h3 className="font-editorial text-xl font-bold text-[#17191B] dark:text-white">
                Employee Profile Dossier
              </h3>
              <button onClick={() => setSelectedWorkerId(null)} className="text-xl text-[#5F6B73] hover:text-black dark:hover:text-white font-light">&times;</button>
            </div>

            <div className="space-y-3 text-xs text-[#5F6B73] dark:text-[#95A0A6]">
              <p>ID: <strong className="text-[#17191B] dark:text-white">{selectedWorkerId}</strong></p>
              <p>Role: <strong className="text-[#17191B] dark:text-white">Heavy Machinery & Crane Specialist</strong></p>
              <p>Site: <strong className="text-[#17191B] dark:text-white">Pier 42 Metro Viaduct Site</strong></p>
              <p>Base Wage: <strong className="text-emerald-600 dark:text-emerald-400">₹800/day (₹100/hr base rate)</strong></p>
              <p>Passport: <span className="text-[#286B58] dark:text-[#3DA386] font-semibold">Verified & Sealed (2 Trade Licenses)</span></p>
            </div>

            <button
              onClick={() => setSelectedWorkerId(null)}
              className="w-full py-2.5 bg-[#17191B] text-white dark:bg-white dark:text-[#17191B] rounded-lg font-bold text-xs tracking-wider uppercase"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
