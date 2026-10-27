import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { IndianRupee, Download, CheckCircle2, AlertCircle, FileText, Search, Filter, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface PayrollBatchItem {
  id: string;
  workerName: string;
  role: string;
  standardDays: number;
  regularPay: number;
  otHours: number;
  otPay: number;
  allowances: number;
  pfDeduction: number;
  esiDeduction: number;
  netPay: number;
  status: 'disbursed' | 'pending_approval' | 'disputed';
}

export const EmployerPayroll: React.FC = () => {
  const { org } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<'payroll' | 'disputes'>('payroll');

  const [items, setItems] = useState<PayrollBatchItem[]>([
    {
      id: 'pay-01',
      workerName: 'Murugan K.',
      role: 'Crane & Rigging Specialist',
      standardDays: 24,
      regularPay: 19200,
      otHours: 18.5,
      otPay: 3700,
      allowances: 1200,
      pfDeduction: 1800,
      esiDeduction: 450,
      netPay: 21850,
      status: 'disbursed'
    },
    {
      id: 'pay-02',
      workerName: 'Lakshmi S.',
      role: 'Facilities Lead',
      standardDays: 25,
      regularPay: 17500,
      otHours: 8.0,
      otPay: 1400,
      allowances: 800,
      pfDeduction: 1600,
      esiDeduction: 400,
      netPay: 17700,
      status: 'disbursed'
    },
    {
      id: 'pay-03',
      workerName: 'Karthik Raja',
      role: 'Structural Welder',
      standardDays: 22,
      regularPay: 16500,
      otHours: 12.0,
      otPay: 2250,
      allowances: 900,
      pfDeduction: 1500,
      esiDeduction: 380,
      netPay: 17770,
      status: 'disputed'
    },
    {
      id: 'pay-04',
      workerName: 'Anil Kumar',
      role: 'Heavy Dumper Operator',
      standardDays: 23,
      regularPay: 17250,
      otHours: 24.0,
      otPay: 4500,
      allowances: 1000,
      pfDeduction: 1650,
      esiDeduction: 420,
      netPay: 20680,
      status: 'pending_approval'
    }
  ]);

  const totalGross = items.reduce((acc, i) => acc + i.regularPay + i.otPay + i.allowances, 0);
  const totalOT = items.reduce((acc, i) => acc + i.otPay, 0);
  const totalDeductions = items.reduce((acc, i) => acc + i.pfDeduction + i.esiDeduction, 0);
  const totalNet = items.reduce((acc, i) => acc + i.netPay, 0);

  const disputes = [
    {
      id: 'disp-01',
      workerName: 'Karthik Raja',
      date: '2026-10-25',
      subject: 'Missing 4.5h Overtime on Sunday Pier Concreting',
      claimedAmount: '₹843',
      note: 'Supervisor sign-off on paper muster was not reflected in digital biometric export.',
      status: 'open'
    }
  ];

  const handleExportBankCSV = () => {
    alert('Exporting verified bank disbursement file (NEFT/RTGS CSV format) with worker IFSC and bank accounts.');
  };

  const handleApprovePayroll = (id: string) => {
    setItems(items.map(i => i.id === id ? { ...i, status: 'disbursed' } : i));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <IndianRupee className="w-6 h-6 text-emerald-400" />
            Transparent Overtime & Payroll Ledger
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Compliant wage calculations with 1.5x / 2.0x overtime formulas, statutory PF/ESI audits, and dispute resolution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportBankCSV}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition shadow-lg shadow-emerald-600/20"
          >
            <Download className="w-4 h-4" />
            Export Bank NEFT / CSV
          </button>
        </div>
      </div>

      {/* KPI Totals */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Total Monthly Gross</span>
          <span className="text-2xl font-black text-white mt-1 block">₹{totalGross.toLocaleString('en-IN')}</span>
          <span className="text-[11px] text-zinc-400 mt-0.5 block">{items.length} Employees</span>
        </div>

        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">Approved Overtime (1.5x)</span>
          <span className="text-2xl font-black text-amber-300 mt-1 block">₹{totalOT.toLocaleString('en-IN')}</span>
          <span className="text-[11px] text-amber-400/80 mt-0.5 block">Full legal rate paid</span>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Statutory Deductions (PF/ESI)</span>
          <span className="text-2xl font-black text-zinc-300 mt-1 block">₹{totalDeductions.toLocaleString('en-IN')}</span>
          <span className="text-[11px] text-zinc-400 mt-0.5 block">Government deposited</span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">Net Disbursement</span>
          <span className="text-2xl font-black text-emerald-300 mt-1 block">₹{totalNet.toLocaleString('en-IN')}</span>
          <span className="text-[11px] text-emerald-400/80 mt-0.5 block">100% account transfer</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-zinc-800 gap-4 text-xs font-bold">
        <button
          onClick={() => setSelectedTab('payroll')}
          className={`pb-3 px-2 border-b-2 cursor-pointer transition ${
            selectedTab === 'payroll'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Workforce Payroll Registry
        </button>
        <button
          onClick={() => setSelectedTab('disputes')}
          className={`pb-3 px-2 border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
            selectedTab === 'disputes'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Wage Dispute Inbox
          <span className="px-1.5 py-0.2 rounded-full bg-amber-950 text-amber-300 border border-amber-800/60 text-[10px]">
            {disputes.length}
          </span>
        </button>
      </div>

      {selectedTab === 'payroll' ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-950/80 text-zinc-400 uppercase font-semibold border-b border-zinc-800 tracking-wider">
                <tr>
                  <th className="p-4">Employee</th>
                  <th className="p-4">Duty Days</th>
                  <th className="p-4">Base Wages</th>
                  <th className="p-4">Overtime (1.5x)</th>
                  <th className="p-4">Allowances</th>
                  <th className="p-4">PF & ESI</th>
                  <th className="p-4">Net Payable</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {items.map((i) => (
                  <tr key={i.id} className="hover:bg-zinc-800/30 transition">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{i.workerName}</div>
                      <div className="text-zinc-400 text-[11px]">{i.role}</div>
                    </td>
                    <td className="p-4 text-zinc-300 font-medium">
                      {i.standardDays} days
                    </td>
                    <td className="p-4 font-mono text-zinc-200">
                      ₹{i.regularPay.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 font-mono text-amber-400">
                      ₹{i.otPay.toLocaleString('en-IN')} <span className="text-[10px] text-zinc-400">({i.otHours}h)</span>
                    </td>
                    <td className="p-4 font-mono text-zinc-300">
                      ₹{i.allowances.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 font-mono text-rose-400">
                      -₹{(i.pfDeduction + i.esiDeduction).toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 font-mono text-base font-bold text-emerald-400">
                      ₹{i.netPay.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4">
                      {i.status === 'disbursed' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-semibold text-[10px]">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Disbursed
                        </span>
                      )}
                      {i.status === 'pending_approval' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 font-semibold text-[10px]">
                          Pending Audit
                        </span>
                      )}
                      {i.status === 'disputed' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/60 font-semibold text-[10px]">
                          <AlertCircle className="w-2.5 h-2.5" /> Disputed
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {i.status === 'pending_approval' ? (
                        <button
                          onClick={() => handleApprovePayroll(i.id)}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => alert(`Viewing payslip breakdown audit for ${i.workerName}`)}
                          className="text-xs text-indigo-400 hover:underline font-semibold"
                        >
                          View Slip
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Active Worker Wage Disputes</h3>
            <span className="text-xs text-zinc-400">Disputes must be investigated within 48 hours</span>
          </div>

          <div className="space-y-3">
            {disputes.map((d) => (
              <div key={d.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-zinc-100">{d.subject}</h4>
                    <p className="text-xs text-zinc-400">Filer: <strong className="text-zinc-200">{d.workerName}</strong> • Date: {d.date}</p>
                  </div>
                  <span className="font-mono font-bold text-amber-400 text-sm">Disputed: {d.claimedAmount}</span>
                </div>
                <p className="text-xs text-zinc-300 bg-zinc-900 p-2.5 rounded-lg border border-zinc-800/60">
                  {d.note}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => alert('Wage dispute approved. ₹843 credited to supplementary disbursement run.')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                  >
                    Accept & Adjust Pay
                  </button>
                  <button
                    onClick={() => alert('Requesting clarification from Site Lead.')}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs cursor-pointer"
                  >
                    Request Supervisor Evidence
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
