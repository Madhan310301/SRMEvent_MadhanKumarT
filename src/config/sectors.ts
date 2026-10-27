export type IndustrySectorKey = 'construction' | 'college' | 'hospital' | 'factory';

export interface SectorConfig {
  key: IndustrySectorKey;
  name: string;
  tagline: string;
  icon: string;
  orgUnitLabel: string; // 'Site' vs 'Department' / 'Ward'
  orgUnitPluralLabel: string;
  roles: {
    workerRoles: { id: string; label: string; defaultPayType: 'daily' | 'hourly' | 'monthly'; defaultRate: number }[];
    employerRoles: { id: string; label: string }[];
  };
  shiftPatterns: {
    id: string;
    name: string;
    startTime: string; // '08:00'
    endTime: string;   // '17:00'
    nominalHours: number;
  }[];
  wageSettings: {
    defaultPayType: 'daily' | 'hourly' | 'monthly';
    currencySymbol: string;
    currencyCode: string;
    standardHoursPerDay: number;
    standardDaysPerMonth: number;
    overtimeMultiplier: number; // e.g. 1.5x or 2.0x
  };
  fatigueThresholds: {
    maxShiftHours: number;      // e.g. 12
    minRestGapHours: number;    // e.g. 11
    maxWeeklyHours: number;     // e.g. 48
    maxConsecutiveDays: number; // e.g. 6
  };
  hazardCategories: {
    id: string;
    label: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    iconName: string;
  }[];
  certificationCategories: {
    id: string;
    label: string;
    issuingAuthorities: string[];
  }[];
}

export const SECTORS: Record<IndustrySectorKey, SectorConfig> = {
  construction: {
    key: 'construction',
    name: 'Construction & Infrastructure',
    tagline: 'Heavy site operations, daily labor tracking & high-risk safety mitigation',
    icon: 'HardHat',
    orgUnitLabel: 'Site',
    orgUnitPluralLabel: 'Sites',
    roles: {
      workerRoles: [
        { id: 'mason', label: 'Mason / Concrete Worker', defaultPayType: 'daily', defaultRate: 850 },
        { id: 'driver', label: 'Commercial Vehicle Driver', defaultPayType: 'daily', defaultRate: 900 },
        { id: 'equipment_op', label: 'Heavy Equipment Operator', defaultPayType: 'hourly', defaultRate: 140 },
        { id: 'carpenter', label: 'Formwork Carpenter', defaultPayType: 'daily', defaultRate: 800 },
        { id: 'helper', label: 'General Site Helper', defaultPayType: 'daily', defaultRate: 600 }
      ],
      employerRoles: [
        { id: 'site_supervisor', label: 'Site Supervisor' },
        { id: 'safety_officer', label: 'Site Safety Officer' },
        { id: 'project_manager', label: 'Project Director' }
      ]
    },
    shiftPatterns: [
      { id: 'day_shift', name: 'General Site Shift', startTime: '08:00', endTime: '17:00', nominalHours: 8 },
      { id: 'pour_night', name: 'Concrete Pour Night Shift', startTime: '19:00', endTime: '04:00', nominalHours: 8 },
      { id: 'excavation_extended', name: 'Excavation Extended Shift', startTime: '07:00', endTime: '19:00', nominalHours: 11 }
    ],
    wageSettings: {
      defaultPayType: 'daily',
      currencySymbol: '₹',
      currencyCode: 'INR',
      standardHoursPerDay: 8,
      standardDaysPerMonth: 26,
      overtimeMultiplier: 1.5
    },
    fatigueThresholds: {
      maxShiftHours: 12,
      minRestGapHours: 11,
      maxWeeklyHours: 48,
      maxConsecutiveDays: 6
    },
    hazardCategories: [
      { id: 'ppe_missing', label: 'Missing PPE (Helmet, Harness, Boots)', severity: 'high', iconName: 'ShieldAlert' },
      { id: 'equipment_failure', label: 'Heavy Machinery / Crane Malfunction', severity: 'critical', iconName: 'AlertTriangle' },
      { id: 'electrical_exposed', label: 'Exposed Electrical Lines / Generators', severity: 'critical', iconName: 'Zap' },
      { id: 'scaffold_unsafe', label: 'Unstable Scaffolding / Fall Hazard', severity: 'critical', iconName: 'AlertOctagon' },
      { id: 'heat_exhaustion', label: 'Heat Stress / Water Shortage', severity: 'medium', iconName: 'Sun' },
      { id: 'wage_dispute', label: 'Unrecorded Overtime / Deduction Dispute', severity: 'medium', iconName: 'CreditCard' },
      { id: 'harassment', label: 'Verbal Abuse or Mistreatment', severity: 'high', iconName: 'UserX' }
    ],
    certificationCategories: [
      { id: 'scaffolding_safety', label: 'Certified Scaffolder (Level 2)', issuingAuthorities: ['National Skill Development Corp (NSDC)', 'Construction Skill Dev Council'] },
      { id: 'crane_operator', label: 'Heavy Crane & Rigging License', issuingAuthorities: ['Ministry of Road Transport', 'L&T Skill Academy'] },
      { id: 'first_aid', label: 'Emergency First Aid & Trauma Care', issuingAuthorities: ['Indian Red Cross Society', 'St. John Ambulance'] },
      { id: 'welding_3g', label: 'Structural Steel Welder 3G/4G', issuingAuthorities: ['National Institute of Welding'] }
    ]
  },

  college: {
    key: 'college',
    name: 'Colleges & Educational Institutions',
    tagline: 'Campus operations, facilities management, security & administrative support',
    icon: 'GraduationCap',
    orgUnitLabel: 'Department',
    orgUnitPluralLabel: 'Departments',
    roles: {
      workerRoles: [
        { id: 'housekeeping', label: 'Housekeeping Staff', defaultPayType: 'monthly', defaultRate: 14500 },
        { id: 'security_guard', label: 'Campus Security Guard', defaultPayType: 'monthly', defaultRate: 16500 },
        { id: 'maintenance_tech', label: 'Maintenance & HVAC Technician', defaultPayType: 'hourly', defaultRate: 125 },
        { id: 'lab_attendant', label: 'Laboratory Attendant', defaultPayType: 'monthly', defaultRate: 17000 },
        { id: 'driver_bus', label: 'University Bus Driver', defaultPayType: 'monthly', defaultRate: 19000 }
      ],
      employerRoles: [
        { id: 'facilities_manager', label: 'Director of Facilities' },
        { id: 'head_security', label: 'Chief Security Officer' },
        { id: 'hr_operations', label: 'Campus Operations HR' }
      ]
    },
    shiftPatterns: [
      { id: 'morning_academic', name: 'Morning Academic Shift', startTime: '07:30', endTime: '15:30', nominalHours: 8 },
      { id: 'evening_hostel', name: 'Hostel & Campus Security Evening', startTime: '15:00', endTime: '23:00', nominalHours: 8 },
      { id: 'night_patrol', name: 'Night Campus Patrol', startTime: '23:00', endTime: '07:00', nominalHours: 8 }
    ],
    wageSettings: {
      defaultPayType: 'monthly',
      currencySymbol: '₹',
      currencyCode: 'INR',
      standardHoursPerDay: 8,
      standardDaysPerMonth: 26,
      overtimeMultiplier: 1.5
    },
    fatigueThresholds: {
      maxShiftHours: 12,
      minRestGapHours: 11,
      maxWeeklyHours: 48,
      maxConsecutiveDays: 6
    },
    hazardCategories: [
      { id: 'chemical_spill', label: 'Chemical Spill / Lab Gas Leak', severity: 'critical', iconName: 'AlertTriangle' },
      { id: 'electrical_wiring', label: 'Faulty Wiring in Classrooms/Hostel', severity: 'high', iconName: 'Zap' },
      { id: 'sanitation_issue', label: 'Sanitation / Contaminated Water', severity: 'medium', iconName: 'Droplet' },
      { id: 'harassment', label: 'Workplace Harassment / Hostile Conduct', severity: 'high', iconName: 'UserX' },
      { id: 'excessive_workload', label: 'Double Shifts Without Relief Guard', severity: 'high', iconName: 'Clock' },
      { id: 'wage_dispute', label: 'Salary Delay or Unexplained Deduction', severity: 'medium', iconName: 'CreditCard' }
    ],
    certificationCategories: [
      { id: 'first_aid_cpr', label: 'Campus First Responder & CPR', issuingAuthorities: ['St. John Ambulance', 'Disaster Management Cell'] },
      { id: 'hvac_cert', label: 'Refrigeration & HVAC Systems (ITI)', issuingAuthorities: ['National Council for Vocational Training (NCVT)'] },
      { id: 'security_training', label: 'PSARA Security Guard Certification', issuingAuthorities: ['State Police Welfare Board / PSARA Agency'] },
      { id: 'fire_safety', label: 'Fire Marshall & Evacuation Protocol', issuingAuthorities: ['Fire & Rescue Services Dept'] }
    ]
  },

  hospital: {
    key: 'hospital',
    name: 'Healthcare & Hospitals (Extensible)',
    tagline: 'Sanitation, patient transport, ward attendants & healthcare shifts',
    icon: 'Stethoscope',
    orgUnitLabel: 'Ward',
    orgUnitPluralLabel: 'Wards',
    roles: {
      workerRoles: [
        { id: 'ward_attendant', label: 'Ward Attendant', defaultPayType: 'monthly', defaultRate: 16000 },
        { id: 'biomed_sanitation', label: 'Biomedical Waste Handler', defaultPayType: 'monthly', defaultRate: 18000 },
        { id: 'patient_transport', label: 'Patient Transport Porter', defaultPayType: 'monthly', defaultRate: 15500 }
      ],
      employerRoles: [
        { id: 'nursing_superintendent', label: 'Nursing Superintendent' },
        { id: 'hospital_admin', label: 'Hospital Administrator' }
      ]
    },
    shiftPatterns: [
      { id: 'morning_ward', name: 'Morning Ward Care', startTime: '06:00', endTime: '14:00', nominalHours: 8 },
      { id: 'evening_ward', name: 'Evening Ward Care', startTime: '14:00', endTime: '22:00', nominalHours: 8 },
      { id: 'night_emergency', name: 'Night Emergency Roster', startTime: '22:00', endTime: '06:00', nominalHours: 8 }
    ],
    wageSettings: {
      defaultPayType: 'monthly',
      currencySymbol: '₹',
      currencyCode: 'INR',
      standardHoursPerDay: 8,
      standardDaysPerMonth: 26,
      overtimeMultiplier: 2.0
    },
    fatigueThresholds: {
      maxShiftHours: 12,
      minRestGapHours: 11,
      maxWeeklyHours: 48,
      maxConsecutiveDays: 5
    },
    hazardCategories: [
      { id: 'needle_stick', label: 'Needle Stick / Sharps Injury', severity: 'critical', iconName: 'AlertOctagon' },
      { id: 'pathogen_exposure', label: 'Infectious Splash / PPE Breach', severity: 'critical', iconName: 'ShieldAlert' },
      { id: 'patient_aggression', label: 'Physical/Verbal Violence from Visitors', severity: 'high', iconName: 'UserX' }
    ],
    certificationCategories: [
      { id: 'infection_control', label: 'Infection Prevention & Control Protocols', issuingAuthorities: ['NABH Training Wing'] },
      { id: 'biomed_waste', label: 'Bio-Medical Waste Handling (CPCB)', issuingAuthorities: ['State Pollution Control Board'] }
    ]
  },

  factory: {
    key: 'factory',
    name: 'Manufacturing & Industrial (Extensible)',
    tagline: 'Assembly line operations, CNC machining, logistics & plant safety',
    icon: 'Factory',
    orgUnitLabel: 'Shop Floor',
    orgUnitPluralLabel: 'Shop Floors',
    roles: {
      workerRoles: [
        { id: 'assembly_operator', label: 'Assembly Line Operator', defaultPayType: 'hourly', defaultRate: 115 },
        { id: 'cnc_machinist', label: 'CNC Machinist', defaultPayType: 'hourly', defaultRate: 160 },
        { id: 'forklift_driver', label: 'Internal Logistics Forklift Driver', defaultPayType: 'daily', defaultRate: 850 }
      ],
      employerRoles: [
        { id: 'floor_manager', label: 'Shop Floor Incharge' },
        { id: 'ehs_manager', label: 'EHS (Environmental Health & Safety) Manager' }
      ]
    },
    shiftPatterns: [
      { id: 'shift_a', name: 'Shift A (Early Production)', startTime: '06:00', endTime: '14:30', nominalHours: 8 },
      { id: 'shift_b', name: 'Shift B (Late Production)', startTime: '14:30', endTime: '23:00', nominalHours: 8 },
      { id: 'shift_c', name: 'Shift C (Night Maintenance)', startTime: '23:00', endTime: '06:00', nominalHours: 7 }
    ],
    wageSettings: {
      defaultPayType: 'hourly',
      currencySymbol: '₹',
      currencyCode: 'INR',
      standardHoursPerDay: 8,
      standardDaysPerMonth: 26,
      overtimeMultiplier: 2.0
    },
    fatigueThresholds: {
      maxShiftHours: 12,
      minRestGapHours: 11,
      maxWeeklyHours: 48,
      maxConsecutiveDays: 6
    },
    hazardCategories: [
      { id: 'pinch_point', label: 'Unguarded Machinery Pinch Point', severity: 'critical', iconName: 'AlertTriangle' },
      { id: 'chemical_fumes', label: 'Inadequate Ventilation / Toxic Fumes', severity: 'high', iconName: 'CloudRain' },
      { id: 'forklift_hazard', label: 'Blind Spot Pedestrian Hazard', severity: 'high', iconName: 'Truck' }
    ],
    certificationCategories: [
      { id: 'cnc_iso', label: 'Certified CNC Specialist', issuingAuthorities: ['National Council for Vocational Training'] },
      { id: 'forklift_safety', label: 'Industrial Forklift Safety Operator', issuingAuthorities: ['Directorate of Industrial Safety & Health'] }
    ]
  }
};
