import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Users, Search, Plus, Phone, Mail, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface WorkerItem {
  id: string;
  name: string;
  role: string;
  departmentOrSite: string;
  phone: string;
  email: string;
  baseWageRate: string;
  status: 'active' | 'on_leave';
  verifiedPassport: boolean;
}

export const EmployerWorkers: React.FC = () => {
  const { org, sectorConfig } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [workers, setWorkers] = useState<WorkerItem[]>([
    {
      id: 'w-01',
      name: 'Murugan K.',
      role: 'Heavy Machinery & Crane Specialist',
      departmentOrSite: org?.sites[0]?.name || 'Pier 42 Metro Viaduct',
      phone: '+91 98401 22345',
      email: 'murugan.metro@kaveri-infra.demo',
      baseWageRate: '₹800 / day (₹100/hr base)',
      status: 'active',
      verifiedPassport: true
    },
    {
      id: 'w-02',
      name: 'Lakshmi S.',
      role: 'Senior Facilities & Housekeeping Lead',
      departmentOrSite: org?.sites[0]?.name || 'Biotech Complex',
      phone: '+91 98840 55678',
      email: 'lakshmi.facilities@srm.demo',
      baseWageRate: '₹700 / day (₹87.5/hr base)',
      status: 'active',
      verifiedPassport: true
    },
    {
      id: 'w-03',
      name: 'Karthik Raja',
      role: 'Structural Welder (SMAW/TIG)',
      departmentOrSite: org?.sites[1]?.name || 'Tunnel Shaft-B',
      phone: '+91 97890 88214',
      email: 'karthik.weld@kaveri-infra.demo',
      baseWageRate: '₹750 / day (₹93.75/hr base)',
      status: 'active',
      verifiedPassport: false
    },
    {
      id: 'w-04',
      name: 'Anil Kumar',
      role: 'Heavy Dumper Operator',
      departmentOrSite: org?.sites[0]?.name || 'Pier 42 Metro Viaduct',
      phone: '+91 91234 56789',
      email: 'anil.dumper@kaveri-infra.demo',
      baseWageRate: '₹750 / day (₹93.75/hr base)',
      status: 'active',
      verifiedPassport: true
    },
    {
      id: 'w-05',
      name: 'Praveen Das',
      role: 'Scaffolding Technician',
      departmentOrSite: org?.sites[2]?.name || 'Precast Yard',
      phone: '+91 94567 12345',
      email: 'praveen.scaff@kaveri-infra.demo',
      baseWageRate: '₹650 / day (₹81.25/hr base)',
      status: 'on_leave',
      verifiedPassport: true
    }
  ]);

  const filtered = workers.filter(w =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.departmentOrSite.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-indigo-400" />
            Workforce Directory & Wage Rates
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Official employee registry with transparent base wage rates, site assignments, and Skill Passport status.
          </p>
        </div>

        <button
          onClick={() => alert('Add worker modal: Provision new employee with role, wage structure, and phone login.')}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          Enroll New Employee
        </button>
      </div>

      {/* Search */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
          <input
            type="text"
            placeholder="Search workers by name, trade, site..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Grid of Workers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((w) => (
          <div key={w.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 hover:border-zinc-700 transition">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white font-black text-base shadow">
                  {w.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{w.name}</h3>
                  <span className="text-xs text-indigo-300 font-medium block">{w.role}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${w.status === 'active' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60' : 'bg-zinc-800 text-zinc-400'}`}>
                {w.status === 'active' ? 'ACTIVE' : 'ON LEAVE'}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-zinc-300 border-y border-zinc-800/80 py-2.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{w.departmentOrSite}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-zinc-400" />
                <span>{w.phone}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-emerald-400 font-semibold">
                <span>Base: {w.baseWageRate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              {w.verifiedPassport ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Passport Sealed
                </span>
              ) : (
                <span className="text-[11px] text-zinc-400">Passport Unverified</span>
              )}

              <button
                onClick={() => alert(`Opening employee dossier and working history for ${w.name}`)}
                className="font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                View Profile &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
