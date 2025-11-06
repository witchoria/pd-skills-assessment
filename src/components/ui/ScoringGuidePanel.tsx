'use client';

import { useState } from 'react';
import { SCORING_GUIDE } from '@/lib/assessmentData';

export function ScoringGuidePanel() {
  // Default to expanded (open) state
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside className="h-full bg-card-bg border-l-4 border-border relative flex flex-col">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          p-4 bg-button-bg text-button-text font-bold flex items-center justify-center hover:bg-text hover:text-bg transition-colors
          ${isExpanded ? 'flex-row justify-between' : 'writing-mode-vertical'}
        `}
        aria-expanded={isExpanded}
        aria-controls="scoring-guide-content"
      >
        {isExpanded ? (
          <>
            <span className="text-xl font-header uppercase">Scoring Guide</span>
            <span
              className="text-2xl transition-transform duration-300 ease-out"
              style={{ transform: 'rotate(0deg)' }}
            >
              ▶
            </span>
          </>
        ) : (
          <span className="text-xl font-header uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Scoring Guide
          </span>
        )}
      </button>

      {/* Accordion Content */}
      <div
        id="scoring-guide-content"
        className={`
          overflow-hidden transition-all duration-300 ease-out flex-1
          ${isExpanded ? 'opacity-100' : 'opacity-0 max-h-0'}
        `}
      >
        <div className="space-y-4 overflow-y-auto h-full" style={{ padding: 'clamp(20px, 2.22vw, 32px)' }}>
          {Object.entries(SCORING_GUIDE).map(([score, { label, description }]) => (
            <div
              key={score}
              className="border-2 border-border p-4 bg-bg hover:bg-hover transition-colors"
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold text-text">
                  {score}
                </span>
                <span className="text-lg font-semibold text-text">
                  {label}
                </span>
              </div>
              <p className="text-sm text-muted leading-snug">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
