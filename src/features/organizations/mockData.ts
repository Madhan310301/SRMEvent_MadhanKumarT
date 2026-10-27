export interface DemoUser {
  id: string;
  name: string;
  role: 'owner' | 'employer' | 'worker';
  orgId: string;
  jobTitle: string;
  avatarUrl: string;
  preferredLanguage: string;
  email: string;
  phone: string;
}

export interface DemoOrg {
  id: string;
  name: string;
  sector: 'construction' | 'college';
  tagline: string;
  code: string;
  sites: { id: string; name: string; code: string; lat: number; lng: number }[];
}

export const DEMO_ORGS: Record<string, DemoOrg> = {
  'org-construction': {
    id: 'org-construction',
    name: 'Kaveri Mega Infra Projects Ltd.',
    sector: 'construction',
    tagline: 'High-speed metro corridor & heavy civil engineering construction',
    code: 'KMIP-BLR',
    sites: [
      { id: 'site-metro-pier42', name: 'Pier 42 Metro Viaduct Site', code: 'METRO-42', lat: 13.0827, lng: 80.2707 },
      { id: 'site-tunnel-shaftB', name: 'Underground Tunnel Shaft-B', code: 'SHAFT-B', lat: 13.0500, lng: 80.2120 },
      { id: 'site-precast-yard', name: 'Precast Girders Casting Yard', code: 'YARD-01', lat: 12.9800, lng: 80.1900 }
    ]
  },
  'org-college': {
    id: 'org-college',
    name: 'SRM Institute of Science & Technology',
    sector: 'college',
    tagline: 'Campus operations, academic buildings, residential hostels & facility maintenance',
    code: 'SRM-FAC',
    sites: [
      { id: 'dept-biotech-block', name: 'Biotech & Life Sciences Complex', code: 'DEPT-BIO', lat: 12.8230, lng: 80.0450 },
      { id: 'dept-hostel-cluster', name: 'Hostel Zone & Dining Facilities', code: 'DEPT-HSTL', lat: 12.8210, lng: 80.0420 },
      { id: 'dept-tech-park', name: 'University Tech Park & Central Admin', code: 'DEPT-ADM', lat: 12.8245, lng: 80.0465 }
    ]
  }
};

export const DEMO_USERS: Record<string, DemoUser> = {
  // Construction Sector - 3 Personas (Owner, Employer, Employee)
  'owner-construction': {
    id: 'o-rajesh-01',
    name: 'Rajesh Kaveri',
    role: 'owner',
    orgId: 'org-construction',
    jobTitle: 'Managing Director & Enterprise Owner',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    preferredLanguage: 'en',
    email: 'rajesh.owner@kaveri-infra.demo',
    phone: '+91 98410 11223'
  },
  'employer-construction': {
    id: 'e-ramesh-01',
    name: 'Ramesh Sundaram',
    role: 'employer',
    orgId: 'org-construction',
    jobTitle: 'Head Safety Officer & Site Director',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    preferredLanguage: 'en',
    email: 'ramesh.director@kaveri-infra.demo',
    phone: '+91 94440 98765'
  },
  'worker-construction': {
    id: 'w-murugan-01',
    name: 'Murugan K.',
    role: 'worker',
    orgId: 'org-construction',
    jobTitle: 'Heavy Machinery & Crane Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    preferredLanguage: 'ta', // Tamil
    email: 'murugan.metro@kaveri-infra.demo',
    phone: '+91 98401 22345'
  },

  // College Sector - 3 Personas (Owner, Employer, Employee)
  'owner-college': {
    id: 'o-sathya-02',
    name: 'Dr. P. Sathyanarayanan',
    role: 'owner',
    orgId: 'org-college',
    jobTitle: 'Pro-Chancellor & Institution Owner',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    preferredLanguage: 'en',
    email: 'sathya.chancellor@srm.demo',
    phone: '+91 98400 99887'
  },
  'employer-college': {
    id: 'e-arun-02',
    name: 'Dr. Arun Kumar',
    role: 'employer',
    orgId: 'org-college',
    jobTitle: 'Director of Campus Infrastructure & Services',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    preferredLanguage: 'en',
    email: 'arun.director@srm.demo',
    phone: '+91 97890 12345'
  },
  'worker-college': {
    id: 'w-lakshmi-02',
    name: 'Lakshmi S.',
    role: 'worker',
    orgId: 'org-college',
    jobTitle: 'Senior Facilities & Housekeeping Lead',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    preferredLanguage: 'ta',
    email: 'lakshmi.facilities@srm.demo',
    phone: '+91 98840 55678'
  }
};
