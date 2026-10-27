import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '@/features/auth/LandingPage';
import { WorkerLayout } from '@/components/layout/WorkerLayout';
import { EmployerLayout } from '@/components/layout/EmployerLayout';

// Worker screens
import { WorkerHome } from '@/features/attendance/WorkerHome';
import { AttendanceScreen } from '@/features/attendance/AttendanceScreen';
import { MyWorkingHoursScreen } from '@/features/attendance/MyWorkingHoursScreen';
import { PayslipScreen } from '@/features/payroll/PayslipScreen';
import { HazardScreen } from '@/features/hazards/HazardScreen';
import { MyReportsScreen } from '@/features/hazards/MyReportsScreen';
import { SpeakUpScreen } from '@/features/feedback/SpeakUpScreen';
import { SkillPassportScreen } from '@/features/skills/SkillPassportScreen';
import { FatigueScreen } from '@/features/fatigue/FatigueScreen';
import { NotificationsScreen } from '@/features/notifications/NotificationsScreen';
import { WorkerSettingsScreen } from '@/features/settings/WorkerSettingsScreen';

// Employer screens
import { EmployerDashboard } from '@/features/analytics/EmployerDashboard';
import { EmployerAttendance } from '@/features/attendance/EmployerAttendance';
import { EmployerShifts } from '@/features/attendance/EmployerShifts';
import { EmployerPayroll } from '@/features/payroll/EmployerPayroll';
import { EmployerHazards } from '@/features/hazards/EmployerHazards';
import { EmployerFeedback } from '@/features/feedback/EmployerFeedback';
import { EmployerSkills } from '@/features/skills/EmployerSkills';
import { EmployerFatigue } from '@/features/fatigue/EmployerFatigue';
import { EmployerWorkers } from '@/features/organizations/EmployerWorkers';
import { EmployerSites } from '@/features/organizations/EmployerSites';
import { EmployerSettings } from '@/features/settings/EmployerSettings';

// Public verification
import { SkillVerificationScreen } from '@/features/skills/SkillVerificationScreen';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page with Grovemade-inspired Editorial Design & 6-Persona Access */}
        <Route path="/" element={<LandingPage />} />

        {/* Public Skill Verification */}
        <Route path="/verify-skill" element={<SkillVerificationScreen />} />
        <Route path="/verify-skill/:code" element={<SkillVerificationScreen />} />

        {/* Worker Portal Routes */}
        <Route path="/worker" element={<WorkerLayout />}>
          <Route index element={<WorkerHome />} />
          <Route path="home" element={<Navigate to="/worker" replace />} />
          <Route path="attendance" element={<AttendanceScreen />} />
          <Route path="hours" element={<MyWorkingHoursScreen />} />
          <Route path="payslips" element={<PayslipScreen />} />
          <Route path="hazard" element={<HazardScreen />} />
          <Route path="reports" element={<MyReportsScreen />} />
          <Route path="speakup" element={<SpeakUpScreen />} />
          <Route path="skills" element={<SkillPassportScreen />} />
          <Route path="fatigue" element={<FatigueScreen />} />
          <Route path="notifications" element={<NotificationsScreen />} />
          <Route path="settings" element={<WorkerSettingsScreen />} />
        </Route>

        {/* Employer Portal Routes */}
        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<EmployerDashboard />} />
          <Route path="overview" element={<Navigate to="/employer" replace />} />
          <Route path="attendance" element={<EmployerAttendance />} />
          <Route path="shifts" element={<EmployerShifts />} />
          <Route path="payroll" element={<EmployerPayroll />} />
          <Route path="hazards" element={<EmployerHazards />} />
          <Route path="feedback" element={<EmployerFeedback />} />
          <Route path="skills" element={<EmployerSkills />} />
          <Route path="fatigue" element={<EmployerFatigue />} />
          <Route path="workers" element={<EmployerWorkers />} />
          <Route path="sites" element={<EmployerSites />} />
          <Route path="settings" element={<EmployerSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
