import { describe, it, expect } from 'vitest';
import {
  calculateShiftHours,
  calculateTransparentWages,
  evaluateFatigueRules
} from '@/services/calculations';
import { detectIndianStateFromCoords } from '@/services/location/indianStates';

describe('Shift and Overtime Calculations', () => {
  it('correctly calculates 8.0-hour standard duty with 0 overtime', () => {
    const res = calculateShiftHours({
      checkIn: '2026-10-27T08:00:00.000Z',
      checkOut: '2026-10-27T16:00:00.000Z'
    });
    expect(res.totalHours).toBe(8);
    expect(res.standardHours).toBe(8);
    expect(res.overtimeHours).toBe(0);
    expect(res.overtimeMultiplier).toBe(1.5);
    expect(res.qualifiesForRestAlert).toBe(false);
  });

  it('calculates 10.5-hour weekday shift with 2.5h overtime at 1.5x multiplier', () => {
    const res = calculateShiftHours({
      checkIn: '2026-10-27T08:00:00.000Z',
      checkOut: '2026-10-27T18:30:00.000Z',
      isWeekendOrHoliday: false
    });
    expect(res.totalHours).toBe(10.5);
    expect(res.standardHours).toBe(8);
    expect(res.overtimeHours).toBe(2.5);
    expect(res.overtimeMultiplier).toBe(1.5);
    expect(res.qualifiesForRestAlert).toBe(false);
  });

  it('calculates 12.5-hour weekend shift with 4.5h overtime at 2.0x multiplier and triggers rest alert', () => {
    const res = calculateShiftHours({
      checkIn: '2026-10-25T08:00:00.000Z',
      checkOut: '2026-10-25T20:30:00.000Z',
      isWeekendOrHoliday: true
    });
    expect(res.totalHours).toBe(12.5);
    expect(res.standardHours).toBe(8);
    expect(res.overtimeHours).toBe(4.5);
    expect(res.overtimeMultiplier).toBe(2.0);
    expect(res.qualifiesForRestAlert).toBe(true);
  });
});

describe('Transparent Multilingual Wage Engine', () => {
  it('calculates base wages, overtime pay, statutory deductions and net pay correctly', () => {
    // Murugan K: ₹800/day (₹100/hr), 24 days worked, 18.5 OT hours at 1.5x (₹150/hr), ₹1200 allowances
    const res = calculateTransparentWages({
      baseDailyRate: 800,
      standardHoursPerDay: 8,
      standardDaysWorked: 24,
      overtimeHours: 18.5,
      overtimeMultiplier: 1.5,
      allowances: 1200,
      pfRatePercent: 12, // 12% of base (₹19,200 * 0.12 = ₹2,304)
      esiRatePercent: 0.75 // 0.75% of gross
    });

    expect(res.baseWage).toBe(19200);
    expect(res.hourlyRate).toBe(100);
    // 18.5 * (100 * 1.5) = 18.5 * 150 = 2775
    expect(res.overtimePay).toBe(2775);
    // Gross = 19200 + 2775 + 1200 = 23175
    expect(res.grossPay).toBe(23175);
    expect(res.pfDeduction).toBe(2304);
    expect(res.esiDeduction).toBe(Math.round(23175 * 0.0075));
    expect(res.netPay).toBe(res.grossPay - res.totalDeductions);
  });
});

describe('Fatigue Rule Detection (Non-Punitive Wellbeing)', () => {
  it('passes normal healthy shift without fatigue alerts', () => {
    const res = evaluateFatigueRules({
      shiftDurationHours: 8.0,
      restHoursSinceLastShift: 16.0,
      consecutiveDaysWorked: 3,
      weeklyTotalHours: 24.0
    });
    expect(res.hasFatigueAlert).toBe(false);
    expect(res.reasons.length).toBe(0);
  });

  it('flags long shift (>12h) violation', () => {
    const res = evaluateFatigueRules({
      shiftDurationHours: 13.0,
      restHoursSinceLastShift: 14.0,
      consecutiveDaysWorked: 2,
      weeklyTotalHours: 26.0
    });
    expect(res.hasFatigueAlert).toBe(true);
    expect(res.triggers.longShift).toBe(true);
    expect(res.reasons[0]).toContain('exceeds the 12.0h safe maximum');
  });

  it('flags insufficient rest gap (<11h)', () => {
    const res = evaluateFatigueRules({
      shiftDurationHours: 9.0,
      restHoursSinceLastShift: 7.5,
      consecutiveDaysWorked: 4,
      weeklyTotalHours: 36.0
    });
    expect(res.hasFatigueAlert).toBe(true);
    expect(res.triggers.insufficientRest).toBe(true);
    expect(res.reasons[0]).toContain('below the 11.0h mandatory rest buffer');
  });

  it('flags consecutive days (>6 days) and excessive weekly (>48h) ceilings', () => {
    const res = evaluateFatigueRules({
      shiftDurationHours: 8.0,
      restHoursSinceLastShift: 16.0,
      consecutiveDaysWorked: 7,
      weeklyTotalHours: 56.0
    });
    expect(res.hasFatigueAlert).toBe(true);
    expect(res.triggers.consecutiveDaysExceeded).toBe(true);
    expect(res.triggers.excessiveWeeklyHours).toBe(true);
    expect(res.reasons.length).toBe(2);
  });
});

describe('Offline Indian State Bounding Box & Language Detection', () => {
  it('detects Tamil Nadu (ta) for Chennai coordinates', () => {
    const result = detectIndianStateFromCoords(13.0827, 80.2707);
    expect(result).not.toBeNull();
    expect(result?.stateName).toBe('Tamil Nadu');
    expect(result?.languageCode).toBe('ta');
  });

  it('detects Karnataka (kn) for Bengaluru coordinates', () => {
    const result = detectIndianStateFromCoords(12.9716, 77.5946);
    expect(result).not.toBeNull();
    expect(result?.stateName).toBe('Karnataka');
    expect(result?.languageCode).toBe('kn');
  });

  it('detects Maharashtra (mr) for Mumbai coordinates', () => {
    const result = detectIndianStateFromCoords(19.0760, 72.8777);
    expect(result).not.toBeNull();
    expect(result?.stateName).toBe('Maharashtra');
    expect(result?.languageCode).toBe('mr');
  });

  it('detects West Bengal (bn) for Kolkata coordinates', () => {
    const result = detectIndianStateFromCoords(22.5726, 88.3639);
    expect(result).not.toBeNull();
    expect(result?.stateName).toBe('West Bengal');
    expect(result?.languageCode).toBe('bn');
  });

  it('detects Kerala (ml) for Kochi coordinates', () => {
    const result = detectIndianStateFromCoords(9.9312, 76.2673);
    expect(result).not.toBeNull();
    expect(result?.stateName).toBe('Kerala');
    expect(result?.languageCode).toBe('ml');
  });

  it('detects Hindi (hi) for Delhi coordinates', () => {
    const result = detectIndianStateFromCoords(28.6139, 77.2090);
    expect(result).not.toBeNull();
    expect(result?.stateName).toBe('Delhi & Northern Hindi Region');
    expect(result?.languageCode).toBe('hi');
  });
});
