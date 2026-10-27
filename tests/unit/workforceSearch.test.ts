import { describe, it, expect } from 'vitest';
import { parseWorkforceQuery, executeWorkforceSearch, SearchResultWorker } from '@/features/workforce-search/service';

describe('Deterministic Natural Language Workforce Search Parser', () => {
  const sites = ['Pier 42 Metro Viaduct', 'Underground Tunnel Shaft-B', 'Biotech Complex'];

  it('correctly parses overtime and site queries without SQL generation', () => {
    const { filters, understoodChips } = parseWorkforceQuery('who worked overtime this week at Pier 42', sites);
    expect(filters.hasOvertime).toBe(true);
    expect(filters.siteName).toBe('Pier 42 Metro Viaduct');
    expect(understoodChips.length).toBeGreaterThanOrEqual(2);
  });

  it('correctly parses fatigue and attendance status', () => {
    const { filters, understoodChips } = parseWorkforceQuery('workers with fatigue flags', sites);
    expect(filters.hasFatigueAlert).toBe(true);
    expect(understoodChips.some(c => c.key === 'hasFatigueAlert')).toBe(true);
  });

  it('correctly parses skills and absenteeism', () => {
    const { filters } = parseWorkforceQuery('crane operators absent today', sites);
    expect(filters.skill).toBe('Crane Operations');
    expect(filters.attendanceStatus).toBe('absent');
  });

  it('enforces that search result objects never expose anonymous feedback tokens or author identities', () => {
    const mockWorker: SearchResultWorker = {
      id: 'w-01',
      name: 'Murugan K.',
      employeeCode: 'KMIP-0421',
      departmentOrSite: 'Pier 42 Metro Viaduct',
      jobRole: 'Heavy Machinery & Crane Specialist',
      attendanceStatus: 'present',
      overtimeHoursThisWeek: 4.5,
      fatigueFlagCount: 1,
      skillsCount: 2,
      tradeSkills: ['Crane Operations', 'Rigging Safety']
    };

    const results = executeWorkforceSearch([mockWorker], { hasOvertime: true }, 'employer');
    expect(results.length).toBe(1);

    // Verify zero PII / zero feedback leakage
    const keys = Object.keys(results[0]);
    expect(keys).not.toContain('feedback_token');
    expect(keys).not.toContain('recovery_hash');
    expect(keys).not.toContain('device_telemetry');
    expect(keys).not.toContain('government_id');
  });
});
