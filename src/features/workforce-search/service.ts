import { z } from 'zod';

export const SearchFiltersSchema = z.object({
  freeText: z.string().optional(),
  siteName: z.string().optional(),
  department: z.string().optional(),
  skill: z.string().optional(),
  attendanceStatus: z.enum(['present', 'absent', 'late', 'all']).optional(),
  hasOvertime: z.boolean().optional(),
  hasFatigueAlert: z.boolean().optional(),
  period: z.enum(['today', 'this_week', 'this_month']).optional()
});

export type SearchFilters = z.infer<typeof SearchFiltersSchema>;

export interface SearchResultWorker {
  id: string;
  name: string;
  employeeCode: string;
  departmentOrSite: string;
  jobRole: string;
  attendanceStatus: 'present' | 'absent' | 'on_break';
  overtimeHoursThisWeek: number;
  fatigueFlagCount: number;
  skillsCount: number;
  tradeSkills: string[];
}

export interface InterpretedFilterChip {
  id: string;
  label: string;
  key: keyof SearchFilters;
}

// Multilingual keywords dictionary for deterministic parsing
const LEXICONS: Record<string, {
  overtime: string[];
  fatigue: string[];
  absent: string[];
  today: string[];
  skills: string[];
}> = {
  en: {
    overtime: ['overtime', 'ot', 'extra hours'],
    fatigue: ['fatigue', 'tired', 'rest violation', 'exhaustion'],
    absent: ['absent', 'not here', 'missing', 'leave'],
    today: ['today', 'current shift'],
    skills: ['certified', 'crane', 'welder', 'sanitation', 'safety', 'rigging']
  },
  ta: {
    overtime: ['மேலதிக நேரம்', 'ஓவர் டைம்', 'கூடுதல் நேரம்'],
    fatigue: ['களைப்பு', 'ஓய்வு எச்சரிக்கை', 'சோர்வு'],
    absent: ['வரவில்லை', 'விடுப்பு'],
    today: ['இன்று'],
    skills: ['கிரேன்', 'வெல்டர்', 'சான்றிதழ்']
  },
  hi: {
    overtime: ['अतिरिक्त समय', 'ओवरटाइम', 'ओटी'],
    fatigue: ['थकान', 'विश्राम'],
    absent: ['अनुपस्थित', 'गैरहाजिर'],
    today: ['आज'],
    skills: ['प्रमाणित', 'क्रेन', 'वेल्डर']
  }
};

/**
 * Deterministic Natural Language Parser
 */
export function parseWorkforceQuery(query: string, availableSites: string[]): {
  filters: SearchFilters;
  understoodChips: InterpretedFilterChip[];
} {
  const normalized = query.toLowerCase().trim();
  const filters: SearchFilters = {};
  const chips: InterpretedFilterChip[] = [];

  // 1. Check for Overtime
  if (normalized.includes('overtime') || normalized.includes('ot') || normalized.includes('extra hours') || normalized.includes('மேலதிக')) {
    filters.hasOvertime = true;
    chips.push({ id: 'c-ot', label: 'Overtime: >0 hours', key: 'hasOvertime' });
  }

  // 2. Check for Fatigue
  if (normalized.includes('fatigue') || normalized.includes('tired') || normalized.includes('களைப்பு') || normalized.includes('थकान')) {
    filters.hasFatigueAlert = true;
    chips.push({ id: 'c-fatigue', label: 'Fatigue Flag: Active', key: 'hasFatigueAlert' });
  }

  // 3. Check for Absent / Leave
  if (normalized.includes('absent') || normalized.includes('leave') || normalized.includes('வரவில்லை') || normalized.includes('अनुपस्थित')) {
    filters.attendanceStatus = 'absent';
    chips.push({ id: 'c-absent', label: 'Attendance: Absent', key: 'attendanceStatus' });
  } else if (normalized.includes('present') || normalized.includes('working') || normalized.includes('on shift')) {
    filters.attendanceStatus = 'present';
    chips.push({ id: 'c-present', label: 'Attendance: On Shift', key: 'attendanceStatus' });
  }

  // 4. Check for Sites / Departments
  for (const site of availableSites) {
    if (normalized.includes(site.toLowerCase()) || normalized.includes(site.split(' ')[0].toLowerCase())) {
      filters.siteName = site;
      chips.push({ id: `c-site-${site}`, label: `Site: ${site}`, key: 'siteName' });
      break;
    }
  }

  // 5. Check for common Skills
  if (normalized.includes('crane') || normalized.includes('கிரேன்')) {
    filters.skill = 'Crane Operations';
    chips.push({ id: 'c-skill-crane', label: 'Skill: Crane Operations', key: 'skill' });
  } else if (normalized.includes('weld') || normalized.includes('வெல்டர்')) {
    filters.skill = 'Welding';
    chips.push({ id: 'c-skill-weld', label: 'Skill: Welding', key: 'skill' });
  } else if (normalized.includes('facilities') || normalized.includes('sanitation') || normalized.includes('clean')) {
    filters.skill = 'Facilities Sanitation';
    chips.push({ id: 'c-skill-fac', label: 'Skill: Facilities Lead', key: 'skill' });
  }

  // 6. Remaining free-text (clean from matched keywords)
  const remaining = normalized
    .replace(/(overtime|ot|fatigue|absent|present|crane|welder|at|in|on|site|this week|today)/gi, '')
    .trim();

  if (remaining.length > 1) {
    filters.freeText = remaining;
    chips.push({ id: 'c-freetext', label: `Name/Code: "${remaining}"`, key: 'freeText' });
  }

  const validated = SearchFiltersSchema.parse(filters);
  return { filters: validated, understoodChips: chips };
}

/**
 * Filter Mock/Seeded Workers under RLS Simulation
 */
export function executeWorkforceSearch(
  workers: SearchResultWorker[],
  filters: SearchFilters,
  viewerRole: 'owner' | 'employer' | 'worker',
  assignedSite?: string
): SearchResultWorker[] {
  return workers.filter((worker) => {
    // Role-based scoping: If viewer is supervisor with assigned site
    if (assignedSite && worker.departmentOrSite !== assignedSite) {
      return false;
    }

    if (filters.freeText) {
      const matchName = worker.name.toLowerCase().includes(filters.freeText.toLowerCase());
      const matchCode = worker.employeeCode.toLowerCase().includes(filters.freeText.toLowerCase());
      if (!matchName && !matchCode) return false;
    }

    if (filters.siteName && !worker.departmentOrSite.toLowerCase().includes(filters.siteName.toLowerCase())) {
      return false;
    }

    if (filters.attendanceStatus && filters.attendanceStatus !== 'all' && worker.attendanceStatus !== filters.attendanceStatus) {
      return false;
    }

    if (filters.hasOvertime && worker.overtimeHoursThisWeek <= 0) {
      return false;
    }

    if (filters.hasFatigueAlert && worker.fatigueFlagCount <= 0) {
      return false;
    }

    if (filters.skill) {
      const hasSkill = worker.tradeSkills.some(s => s.toLowerCase().includes(filters.skill!.toLowerCase())) ||
                       worker.jobRole.toLowerCase().includes(filters.skill.toLowerCase());
      if (!hasSkill) return false;
    }

    return true;
  });
}
