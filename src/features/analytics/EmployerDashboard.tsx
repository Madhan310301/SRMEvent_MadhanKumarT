import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthContext';
import { 
  Users, 
  Clock, 
  Receipt, 
  ShieldAlert, 
  HeartPulse, 
  MessageSquareOff, 
  TrendingUp, 
  AlertCircle,
  HelpCircle,
  Calendar,
  Building2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const EmployerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { org, sectorConfig } = useAuth();
  const [siteFilter, setSiteFilter] = useState<string>('all');

  // Realistic mock data tailored by sector
  const isConstruction = org?.sector === 'construction';

  const attendanceTrendData = [
    { day: 'Mon', present: isConstruction ? 142 : 88, overtime: isConstruction ? 28 : 12 },
    { day: 'Tue', present: isConstruction ? 145 : 91, overtime: isConstruction ? 34 : 15 },
    { day: 'Wed', present: isConstruction ? 140 : 89, overtime: isConstruction ? 22 : 9 },
    { day: 'Thu', present: isConstruction ? 148 : 92, overtime: isConstruction ? 41 : 18 },
    { day: 'Fri', present: isConstruction ? 152 : 94, overtime: isConstruction ? 48 : 22 },
    { day: 'Sat', present: isConstruction ? 138 : 65, overtime: isConstruction ? 36 : 10 },
    { day: 'Sun', present: isConstruction ? 45 : 32, overtime: isConstruction ? 14 : 8 }
  ];

  const siteDistributionData = isConstruction ? [
    { name: 'Pier 42 Viaduct', hours: 1420, otHours: 240 },
    { name: 'Shaft-B Tunnel', hours: 1180, otHours: 195 },
    { name: 'Precast Yard', hours: 940, otHours: 110 }
  ] : [
    { name: 'Biotech Complex', hours: 780, otHours: 95 },
    { name: 'Hostel Zone', hours: 960, otHours: 130 },
    { name: 'Tech Park Admin', hours: 640, otHours: 50 }
  ];

  const hazardStatusData = [
    { name: 'Resolved', value: 18, color: '#10b981' },
    { name: 'Action Taken', value: 7, color: '#3b82f6' },
    { name: 'Investigating', value: 4, color: '#f59e0b' },
    { name: 'Critical Open', value: 2, color: '#ef4444' }
  ];

  const feedbackThemesData = [
    { theme: 'Rest Area & Water', count: 12 },
    { theme: 'Overtime Notice', count: 8 },
    { theme: 'Night Transport', count: 6 }
    // Only themes with count >= 5 displayed to preserve strict anonymity
  ];

  return (
    <div className="space-y-6">
      {/* Overview Top Banner */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-extrabold tracking-wider text-blue-400">
              {sectorConfig.name}
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs text-zinc-400">{org?.code}</span>
          </div>
          <h1 className="text-2xl font-black text-white">{org?.name}</h1>
          <p className="text-xs text-zinc-400 mt-1">{sectorConfig.tagline}</p>
        </div>

        {/* Site / Department Filter */}
        <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-300">
          <Building2 className="w-4 h-4 text-zinc-400" />
          <select
            value={siteFilter}
            onChange={(e) => setSiteFilter(e.target.value)}
            className="bg-transparent text-zinc-200 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-zinc-900">All {sectorConfig.orgUnitPluralLabel}</option>
            {org?.sites.map(s => (
              <option key={s.id} value={s.id} className="bg-zinc-900">{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Active On-Duty</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {isConstruction ? '148' : '92'}
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold">94.2% Attendance Rate</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Overtime Liability</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {isConstruction ? '342h' : '168h'}
          </div>
          <span className="text-[11px] text-amber-400 font-semibold">₹{(isConstruction ? 342 * 140 : 168 * 125).toLocaleString()} Est.</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Open Safety Reports</span>
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-black text-white">6</div>
          <span className="text-[11px] text-red-400 font-semibold">2 Critical Requiring Action</span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Fatigue Alerts</span>
            <HeartPulse className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">3</div>
          <span className="text-[11px] text-zinc-400 font-semibold">1 Worker Contested</span>
        </div>
      </div>

      {/* Workforce Support / Retention Attention Indicator */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-blue-950/20 border border-blue-500/30 shadow-xl space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                Workforce Support & Retention Attention Indicator
              </h2>
              <p className="text-xs text-zinc-400">
                Explainable non-punitive risk signals based on transparent schedule patterns
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Advisory Only
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-zinc-400 block text-[11px]">Extended Shift Exposure</span>
            <span className="font-bold text-amber-400 text-sm">4.2% of Shifts &gt;12h</span>
            <p className="text-[10px] text-zinc-500 mt-1">Concentrated in night concrete pours</p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-zinc-400 block text-[11px]">Short Rest Intervals (&lt;11h)</span>
            <span className="font-bold text-amber-400 text-sm">3 Instances this Week</span>
            <p className="text-[10px] text-zinc-500 mt-1">Split-shift handoffs under review</p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-zinc-400 block text-[11px]">Unresolved Wage Disputes</span>
            <span className="font-bold text-emerald-400 text-sm">1 Open Dispute</span>
            <p className="text-[10px] text-zinc-500 mt-1">Average resolution time: 24h</p>
          </div>
        </div>

        <p className="text-[11px] text-zinc-500 italic">
          Ethical safeguard: Anonymous feedback is never combined with identifiable workforce support scores to preserve confidentiality and prevent retaliation.
        </p>
      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Weekly Attendance & Overtime Trends */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-white">Weekly Attendance & Overtime Trends</h3>
              <p className="text-xs text-zinc-400">Headcount vs Overtime Shifts</p>
            </div>
            <span className="text-xs text-blue-400 font-bold">Past 7 Days</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrendData}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="present" name="Present Workers" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPresent)" strokeWidth={2} />
                <Area type="monotone" dataKey="overtime" name="OT Workers" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Hours Distribution by Site / Department */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-white">Work Hours by {sectorConfig.orgUnitLabel}</h3>
              <p className="text-xs text-zinc-400">Regular Hours vs Overtime Accumulation</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={siteDistributionData}>
                <XAxis dataKey="name" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Bar dataKey="hours" name="Regular Hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="otHours" name="Overtime Hours" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Safety & Grievance Lifecycle Status */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-white">Safety Report Lifecycle</h3>
              <p className="text-xs text-zinc-400">Total 31 incidents logged across project</p>
            </div>
          </div>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={hazardStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {hazardStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.75rem', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            {hazardStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-zinc-300 font-medium">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: Privacy-Preserving Feedback Themes (>=5 Threshold) */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-white">Aggregated Feedback Themes</h3>
              <p className="text-xs text-zinc-400">Only themes with &ge; 5 anonymous reports displayed</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              k-Anonymity (&ge;5)
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={feedbackThemesData} margin={{ left: 20 }}>
                <XAxis type="number" stroke="#71717a" fontSize={11} />
                <YAxis dataKey="theme" type="category" stroke="#71717a" fontSize={11} width={100} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Bar dataKey="count" name="Reports" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
