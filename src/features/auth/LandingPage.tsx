import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { EditorialIntro } from '@/components/editorial/EditorialIntro';
import { TwoUpFeatureGrid } from '@/components/editorial/TwoUpFeatureGrid';
import { CapabilityGrid } from '@/components/editorial/CapabilityGrid';
import { SignatureBanner } from '@/components/editorial/SignatureBanner';
import { ProductStoryWalkthrough } from '@/components/editorial/ProductStoryWalkthrough';
import { MissionStatement } from '@/components/editorial/MissionStatement';
import { ClosingCTA } from '@/components/editorial/ClosingCTA';
import { LoginSection } from '@/components/editorial/LoginSection';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { useAuth } from '@/features/auth/AuthContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchDemoUser } = useAuth();

  const scrollToLogin = () => {
    const el = document.getElementById('login-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectRole = (role: 'worker' | 'employer') => {
    if (role === 'worker') {
      switchDemoUser('worker-construction');
      navigate('/worker');
    } else {
      switchDemoUser('employer-construction');
      navigate('/employer');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#111214] text-[#17191B] dark:text-[#F4F4F2] font-interface flex flex-col selection:bg-[#286B58]/20 transition-colors">
      {/* 1. Refined Grovemade-style Navigation */}
      <PublicHeader onOpenAuth={() => scrollToLogin()} />

      <main className="flex-1 flex flex-col">
        {/* 2. Section 1 — Cinematic Hero */}
        <EditorialHero onGetStarted={scrollToLogin} />

        {/* 3. Section 2 — Introduction */}
        <EditorialIntro />

        {/* 4. Section 3 — Two-Column Feature Photography (Employees vs Employers) */}
        <TwoUpFeatureGrid onSelectRole={handleSelectRole} />

        {/* 5. Section 4 — Featured 8-Module Capabilities */}
        <CapabilityGrid />

        {/* 6. Section 5 — Signature Capability Banner */}
        <SignatureBanner onLearnMore={() => {
          const el = document.getElementById('how-it-works');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* 7. Section 6 — Product Story / How It Works */}
        <ProductStoryWalkthrough />

        {/* 8. Section 7 — Mission Statement & UN SDG 8 */}
        <MissionStatement />

        {/* 9. Section 8 — Closing CTA */}
        <ClosingCTA onGetStarted={scrollToLogin} />

        {/* 10. Login & 6-Persona Access Section */}
        <LoginSection />
      </main>

      {/* 11. Editorial Footer */}
      <PublicFooter />
    </div>
  );
};
