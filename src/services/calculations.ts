/**
 * FairShift Core Calculation Engine
 * Compliant with United Nations SDG 8 (Decent Work & Economic Growth)
 * and Indian Factories Act / Minimum Wages Framework
 */

export interface ShiftHoursInput {
  checkIn: Date | string;
  checkOut: Date | string;
  standardHoursQuota?: number; // Default 8.0 hours
  isWeekendOrHoliday?: boolean;
}

export interface ShiftHoursResult {
  totalHours: number;
  standardHours: number;
  overtimeHours: number;
  overtimeMultiplier: number;
  qualifiesForRestAlert: boolean;
}

export interface WageCalculationInput {
  baseDailyRate: number; // e.g. ₹800
  standardHoursPerDay?: number; // e.g. 8
  standardDaysWorked: number; // e.g. 24
  overtimeHours: number; // e.g. 18.5
  overtimeMultiplier?: number; // e.g. 1.5 or 2.0
  allowances?: number;
  pfRatePercent?: number; // e.g. 12%
  esiRatePercent?: number; // e.g. 0.75%
}

export interface WageCalculationResult {
  baseWage: number;
  hourlyRate: number;
  overtimePay: number;
  grossPay: number;
  pfDeduction: number;
  esiDeduction: number;
  totalDeductions: number;
  netPay: number;
}

export interface FatigueCheckInput {
  shiftDurationHours: number;
  restHoursSinceLastShift?: number;
  consecutiveDaysWorked: number;
  weeklyTotalHours: number;
}

export interface FatigueCheckResult {
  hasFatigueAlert: boolean;
  triggers: {
    longShift: boolean;
    insufficientRest: boolean;
    consecutiveDaysExceeded: boolean;
    excessiveWeeklyHours: boolean;
  };
  reasons: string[];
}

/**
 * Calculates standard and overtime hours with precision
 */
export function calculateShiftHours(input: ShiftHoursInput): ShiftHoursResult {
  const inTime = new Date(input.checkIn).getTime();
  const outTime = new Date(input.checkOut).getTime();
  const durationMillis = Math.max(0, outTime - inTime);
  const totalHours = Math.round((durationMillis / (1000 * 60 * 60)) * 100) / 100;

  const quota = input.standardHoursQuota ?? 8.0;
  const standardHours = Math.min(totalHours, quota);
  const overtimeHours = Math.max(0, totalHours - quota);
  const overtimeMultiplier = input.isWeekendOrHoliday ? 2.0 : 1.5;
  const qualifiesForRestAlert = totalHours >= 12.0;

  return {
    totalHours,
    standardHours,
    overtimeHours,
    overtimeMultiplier,
    qualifiesForRestAlert
  };
}

/**
 * Calculates itemized wages, allowances, statutory PF/ESI, and net pay
 */
export function calculateTransparentWages(input: WageCalculationInput): WageCalculationResult {
  const standardQuota = input.standardHoursPerDay ?? 8;
  const hourlyRate = input.baseDailyRate / standardQuota;
  const baseWage = input.baseDailyRate * input.standardDaysWorked;

  const otMultiplier = input.overtimeMultiplier ?? 1.5;
  const overtimePay = Math.round(input.overtimeHours * (hourlyRate * otMultiplier));

  const allowances = input.allowances ?? 0;
  const grossPay = baseWage + overtimePay + allowances;

  // Indian statutory deductions (PF 12% capped, ESI 0.75% for eligible wages)
  const pfRate = (input.pfRatePercent ?? 12) / 100;
  const esiRate = (input.esiRatePercent ?? 0.75) / 100;

  const pfDeduction = Math.round(baseWage * pfRate);
  const esiDeduction = Math.round(grossPay * esiRate);
  const totalDeductions = pfDeduction + esiDeduction;
  const netPay = grossPay - totalDeductions;

  return {
    baseWage,
    hourlyRate,
    overtimePay,
    grossPay,
    pfDeduction,
    esiDeduction,
    totalDeductions,
    netPay
  };
}

/**
 * Evaluates fatigue safety rules (non-punitive early warning)
 */
export function evaluateFatigueRules(input: FatigueCheckInput): FatigueCheckResult {
  const longShift = input.shiftDurationHours > 12.0;
  const insufficientRest = input.restHoursSinceLastShift !== undefined && input.restHoursSinceLastShift < 11.0;
  const consecutiveDaysExceeded = input.consecutiveDaysWorked > 6;
  const excessiveWeeklyHours = input.weeklyTotalHours > 48.0;

  const reasons: string[] = [];
  if (longShift) {
    reasons.push(`Shift duration of ${input.shiftDurationHours}h exceeds the 12.0h safe maximum.`);
  }
  if (insufficientRest) {
    reasons.push(`Rest interval of ${input.restHoursSinceLastShift}h between shifts is below the 11.0h mandatory rest buffer.`);
  }
  if (consecutiveDaysExceeded) {
    reasons.push(`${input.consecutiveDaysWorked} consecutive working days exceeds the 6-day maximum without 24h rest.`);
  }
  if (excessiveWeeklyHours) {
    reasons.push(`Weekly hours of ${input.weeklyTotalHours}h exceeds the 48.0h UN SDG 8 safe weekly ceiling.`);
  }

  const hasFatigueAlert = longShift || insufficientRest || consecutiveDaysExceeded || excessiveWeeklyHours;

  return {
    hasFatigueAlert,
    triggers: {
      longShift,
      insufficientRest,
      consecutiveDaysExceeded,
      excessiveWeeklyHours
    },
    reasons
  };
}
