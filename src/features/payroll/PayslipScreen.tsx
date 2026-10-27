import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthContext';
import { 
  FileText, 
  Volume2, 
  Download, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { speechService } from '@/services/voice/speech';

export const PayslipScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, org, sectorConfig } = useAuth();

  const [expandedExplanation, setExpandedExplanation] = useState<boolean>(true);
  const [showDisputeModal, setShowDisputeModal] = useState<boolean>(false);
  const [disputeCategory, setDisputeCategory] = useState<string>('overtime_missing');
  const [disputeNotes, setDisputeNotes] = useState<string>('');
  const [disputeSubmitted, setDisputeSubmitted] = useState<boolean>(false);

  // Example demonstration payslip calculations
  const baseSalary = org?.sector === 'construction' ? 22100 : 16500;
  const approvedDays = 26;
  const regularHours = 208;
  const otHours = 14;
  const otRate = Math.round((baseSalary / regularHours) * sectorConfig.wageSettings.overtimeMultiplier);
  const otPay = otHours * otRate;
  const siteAllowance = 750;
  const pfDeduction = Math.round(baseSalary * 0.12);
  const esiDeduction = Math.round(baseSalary * 0.0075);
  const totalDeductions = pfDeduction + esiDeduction;
  const netPayable = baseSalary + otPay + siteAllowance - totalDeductions;

  const handleReadAloud = () => {
    const text = i18n.language === 'ta'
      ? `சம்பள விவரம்: அடிப்படை ஊதியம் ரூபாய் ${baseSalary}. கூடுதல் நேரம் 14 மணி நேரத்திற்கு ரூபாய் ${otPay}. படிகள் ரூபாய் ${siteAllowance}. பிடித்தங்கள் ரூபாய் ${totalDeductions}. மொத்தமாக உங்களுக்கு வழங்கப்பட வேண்டிய தொகை ரூபாய் ${netPayable}.`
      : `Payslip breakdown: Base wage is rupees ${baseSalary}. Overtime payment for 14 hours is rupees ${otPay}. Allowances total rupees ${siteAllowance}. Approved deductions total rupees ${totalDeductions}. Your net payable salary is rupees ${netPayable}.`;

    speechService.speak(text, { languageCode: i18n.language });
  };

  const handleDownload = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>FairShift Payslip - ${user?.name}</title>
          <style>
            body { font-family: sans-serif; padding: 30px; color: #111; }
            h1 { font-size: 20px; margin-bottom: 4px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background: #f4f4f5; }
            .total { font-size: 18px; font-weight: bold; background: #e0f2fe; }
          </style>
        </head>
        <body>
          <h1>FairShift Verified Payslip (UN SDG 8)</h1>
          <p><strong>Employee:</strong> ${user?.name} (${user?.jobTitle})</p>
          <p><strong>Organisation:</strong> ${org?.name}</p>
          <p><strong>Pay Period:</strong> 01 Oct 2026 – 31 Oct 2026</p>
          <table>
            <tr><th>Component</th><th>Details</th><th>Amount (INR)</th></tr>
            <tr><td>Base Salary</td><td>26 Approved Days @ standard rate</td><td>₹${baseSalary.toLocaleString()}</td></tr>
            <tr><td>Overtime Pay</td><td>${otHours} hours @ ₹${otRate}/hr (1.5x)</td><td>₹${otPay.toLocaleString()}</td></tr>
            <tr><td>Site Allowances</td><td>Safety adherence & hardship incentive</td><td>₹${siteAllowance.toLocaleString()}</td></tr>
            <tr><td>Deductions</td><td>PF (12%) + ESI (0.75%)</td><td>-₹${totalDeductions.toLocaleString()}</td></tr>
            <tr class="total"><td colspan="2">Net Payable Amount</td><td>₹${netPayable.toLocaleString()}</td></tr>
          </table>
          <p style="margin-top: 30px; font-size: 11px; color: #666;">Generated securely via FairShift Transparent Payroll Engine.</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDisputeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDisputeSubmitted(true);
    setTimeout(() => {
      setShowDisputeModal(false);
      setDisputeSubmitted(false);
      setDisputeNotes('');
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {/* Payslip Header Card */}
      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-white">{t('payroll.title')}</h1>
              <p className="text-xs text-zinc-400">October 2026 • Verified Roster</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReadAloud}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
              title={t('readAloud')}
              aria-label={t('readAloud')}
            >
              <Volume2 className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
              title="Download Slip"
              aria-label="Download Slip"
            >
              <Download className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>

        {/* Net Pay Hero Value */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-zinc-950 to-zinc-950 border border-emerald-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              {t('payroll.netPayable')}
            </span>
            <div className="text-3xl font-black text-white mt-1">
              ₹{netPayable.toLocaleString('en-IN')}
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Payment Approved
          </span>
        </div>
      </div>

      {/* Itemized Line Items Breakdown */}
      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
        <h2 className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider">
          Transparent Earnings & Deductions
        </h2>

        <div className="divide-y divide-zinc-800/80 text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <div>
              <span className="font-semibold text-zinc-200 block">{t('payroll.baseSalary')}</span>
              <span className="text-[11px] text-zinc-400">{approvedDays} approved working days</span>
            </div>
            <span className="font-bold text-zinc-100">₹{baseSalary.toLocaleString('en-IN')}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div>
              <span className="font-semibold text-emerald-400 block">{t('payroll.otPay')}</span>
              <span className="text-[11px] text-zinc-400">
                {otHours}h logged @ ₹{otRate}/hr ({sectorConfig.wageSettings.overtimeMultiplier}x rate)
              </span>
            </div>
            <span className="font-bold text-emerald-400">+₹{otPay.toLocaleString('en-IN')}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div>
              <span className="font-semibold text-blue-400 block">{t('payroll.allowances')}</span>
              <span className="text-[11px] text-zinc-400">Site safety adherence & hazard hardship</span>
            </div>
            <span className="font-bold text-blue-400">+₹{siteAllowance.toLocaleString('en-IN')}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div>
              <span className="font-semibold text-red-400 block">{t('payroll.deductions')}</span>
              <span className="text-[11px] text-zinc-400">PF (₹{pfDeduction}) + ESI (₹{esiDeduction})</span>
            </div>
            <span className="font-bold text-red-400">-₹{totalDeductions.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Plain-Language Explanation Accordion */}
      <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
        <button
          onClick={() => setExpandedExplanation(!expandedExplanation)}
          className="w-full flex items-center justify-between text-xs font-bold text-zinc-300"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span>{t('payroll.howCalculated')}</span>
          </div>
          {expandedExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedExplanation && (
          <div className="mt-3 pt-3 border-t border-zinc-800 text-xs text-zinc-400 space-y-2 leading-relaxed">
            <p>
              • <strong>Regular Salary:</strong> Calculated as ₹{(baseSalary / approvedDays).toFixed(2)}/day × {approvedDays} days based on biometric/QR confirmed site attendance.
            </p>
            <p>
              • <strong>Overtime Guarantee:</strong> Overtime is calculated transparently using an hourly factor of {sectorConfig.wageSettings.overtimeMultiplier}× base rate for all hours beyond {sectorConfig.wageSettings.standardHoursPerDay}h/day.
            </p>
            <p>
              • <strong>Deduction Protection:</strong> No arbitrary deductions. Only statutory Provident Fund (12%) and State Employee Insurance (0.75%) were debited.
            </p>
          </div>
        )}
      </div>

      {/* Dispute Action Button */}
      <button
        onClick={() => setShowDisputeModal(true)}
        className="w-full py-3 rounded-xl border border-zinc-700 hover:border-red-500/50 hover:bg-red-500/5 text-zinc-300 hover:text-red-400 text-xs font-bold transition flex items-center justify-center gap-2"
      >
        <AlertCircle className="w-4 h-4" />
        <span>{t('payroll.disputeBtn')}</span>
      </button>

      {/* Wage Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl text-zinc-100">
            <h3 className="text-base font-bold mb-1">File a Transparent Wage Dispute</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Your inquiry will be logged with an immutable audit timestamp for HR review.
            </p>

            {disputeSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-1" />
                <p className="text-sm font-bold">Dispute Logged Successfully</p>
                <p className="text-xs">Ticket #WAGE-DISP-8842 issued to HR.</p>
              </div>
            ) : (
              <form onSubmit={handleDisputeSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Issue Category</label>
                  <select
                    value={disputeCategory}
                    onChange={(e) => setDisputeCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200"
                  >
                    <option value="overtime_missing">Missing Overtime Hours</option>
                    <option value="wrong_deduction">Unrecognized Wage Deduction</option>
                    <option value="incorrect_days">Discrepancy in Approved Days</option>
                    <option value="rate_mismatch">Wage Rate Mismatch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Details & Supporting Dates</label>
                  <textarea
                    required
                    value={disputeNotes}
                    onChange={(e) => setDisputeNotes(e.target.value)}
                    rows={3}
                    placeholder="Specify which dates or hours you believe were miscalculated..."
                    className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowDisputeModal(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition shadow-lg shadow-blue-600/20"
                  >
                    Submit Dispute
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
