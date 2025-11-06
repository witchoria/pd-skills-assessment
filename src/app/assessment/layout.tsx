'use client';

import { ScoringGuidePanel } from '@/components/ui/ScoringGuidePanel';

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#222] flex flex-col md:flex-row">
      {/* Scoring Guide - at top on mobile, right side on desktop */}
      <aside className="md:w-1/4 md:order-2 md:sticky md:top-0 md:h-screen md:overflow-hidden">
        <ScoringGuidePanel />
      </aside>

      {/* Main Content - below guide on mobile, left side on desktop (75%) */}
      <main className="flex-1 md:w-3/4 md:order-1">
        {children}
      </main>
    </div>
  );
}