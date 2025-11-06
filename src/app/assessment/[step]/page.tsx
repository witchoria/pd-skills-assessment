'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import { COMPETENCIES, SCORING_GUIDE } from '@/lib/assessmentData';

export default function AssessmentStep() {
  const params = useParams();
  const router = useRouter();
  const { state, saveResponse, getResponse, isCompetencyComplete, setCurrentStep, markStepComplete, getProgress } = useAssessment();

  const step = parseInt(params.step as string);
  const competency = COMPETENCIES[step - 1];
  const progress = getProgress();

  // Local state for current ratings
  const [ratings, setRatings] = useState<Record<string, number>>({});

  // Scoring guide panel state
  const [isGuideExpanded, setIsGuideExpanded] = useState(true);

  // Redirect if invalid step
  useEffect(() => {
    if (step < 1 || step > 13 || !competency) {
      router.push('/');
    }
  }, [step, competency, router]);

  // Load existing responses (default to 1 if no response exists)
  useEffect(() => {
    if (competency) {
      const existingRatings: Record<string, number> = {};
      competency.statements.forEach(statement => {
        const rating = getResponse(competency.id, statement.id);
        // Default to 1 if no response exists
        existingRatings[statement.id] = rating !== undefined ? rating : 1;
      });
      setRatings(existingRatings);
      setCurrentStep(step);
    }
  }, [competency, step, getResponse, setCurrentStep]);

  // Handle rating selection
  const handleRating = (statementId: string, score: number) => {
    if (!competency) return;

    setRatings(prev => ({
      ...prev,
      [statementId]: score,
    }));

    saveResponse(competency.id, statementId, score);
  };

  // Check if all statements are rated
  const allRated = competency?.statements.every(statement =>
    ratings[statement.id] !== undefined
  ) ?? false;

  // Handle navigation
  const handlePrevious = () => {
    if (step > 1) {
      router.push(`/assessment/${step - 1}`);
    } else {
      router.push('/');
    }
  };

  const handleNext = () => {
    if (!allRated) return;

    markStepComplete(step);

    if (step < 13) {
      router.push(`/assessment/${step + 1}`);
    } else {
      // Assessment complete, go to results
      router.push('/results');
    }
  };

  if (!competency) {
    return null;
  }

  // Calculate progress percentage for progress bar (out of 13 steps)
  const progressPercentage = (step / 13) * 100;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isGuideExpanded ? '1fr clamp(320px, 25vw, 400px)' : '1fr 48px',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
        transition: 'grid-template-columns 300ms ease-out',
      }}
    >
      {/* Main Content Area - Left */}
      <div
        style={{
          padding: 'clamp(24px, 3vw, 48px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header Section */}
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <p className="text-sm font-mono text-muted uppercase tracking-wider mb-2">
            Skill {step} of 13
          </p>
          <h1 className="text-fluid-skill-title font-header font-bold text-text lowercase">
            {competency.name}
          </h1>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div className="h-4 bg-card-bg border-2 border-border overflow-hidden">
            <div
              className="h-full bg-button-bg transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Rating Blocks */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-lg)',
          }}
        >
          {competency.statements.map((statement, index) => {
            const currentRating = ratings[statement.id] || 1;
            const ratingLabel = SCORING_GUIDE[currentRating as keyof typeof SCORING_GUIDE]?.label || SCORING_GUIDE[1].label;

            return (
              <div
                key={statement.id}
                className="border-4 border-border bg-card-bg"
                style={{ padding: 'clamp(20px, 2.5vw, 32px)' }}
              >
                {/* Statement Text */}
                <p className="text-base leading-relaxed text-text mb-6">
                  {statement.text}
                </p>

                {/* Rating Label */}
                <p className="text-lg font-bold text-text mb-4">
                  Rating: {currentRating} - {ratingLabel}
                </p>

                {/* Slider with Labels */}
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={currentRating}
                    onChange={(e) => handleRating(statement.id, parseInt(e.target.value))}
                    className="w-full h-3 bg-hover border-2 border-border appearance-none cursor-pointer slider-thumb"
                    aria-label={`Rate statement ${index + 1}`}
                  />

                  {/* Labels Below Slider */}
                  <div className="flex justify-between mt-2 text-xs text-muted font-mono">
                    <span>1 - {SCORING_GUIDE[1].label}</span>
                    <span>5 - {SCORING_GUIDE[5].label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Footer */}
        <div
          className="flex items-center justify-between border-t-4 border-border"
          style={{
            marginTop: 'var(--space-xl)',
            paddingTop: 'var(--space-lg)',
          }}
        >
          <button
            onClick={handlePrevious}
            className="btn"
          >
            Back
          </button>

          <p className="text-lg font-bold text-text font-mono">
            {step}/13
          </p>

          <button
            onClick={handleNext}
            disabled={!allRated}
            className="btn"
          >
            Next
          </button>
        </div>
      </div>

      {/* Scoring Guide Panel - Right */}
      <aside
        className="border-l-4 border-border bg-card-bg"
        style={{
          top: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsGuideExpanded(!isGuideExpanded)}
          className="p-4 bg-button-bg text-button-text font-bold hover:bg-text hover:text-bg transition-colors"
          style={{
            display: 'flex',
            padding:'16px',
            alignItems: 'center',
            justifyContent: isGuideExpanded ? 'space-between' : 'center',
            minHeight: '64px',
          }}
          aria-expanded={isGuideExpanded}
          aria-controls="scoring-guide-content"
        >
          {isGuideExpanded ? (
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
            <span
              className="text-xl font-header uppercase"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              Scoring Guide
            </span>
          )}
        </button>

        {/* Scoring Guide Content */}
        <div
          id="scoring-guide-content"
          style={{
            flex: 1,
            overflowY: 'auto',
            opacity: isGuideExpanded ? 1 : 0,
            transition: 'opacity 300ms ease-out',
            padding: isGuideExpanded ? 'clamp(16px, 2vw, 24px)' : 0,
          }}
        >
          {isGuideExpanded && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {Object.entries(SCORING_GUIDE).map(([score, { label, description }]) => (
                <div
                  key={score}
                  className="border-2 border-border bg-bg hover:bg-hover transition-colors"
                  style={{ padding: 'clamp(12px, 1.5vw, 16px)' }}
                >
                  <div className="flex items-center mb-2" style={{ gap: 'clamp(12px, 1.67vw, 16px)' }}>
                    <div
                      className="flex items-center justify-center border-2 border-border bg-bg text-text font-bold"
                      style={{
                        width: 'clamp(24px, 3.33vw, 32px)',
                        height: 'clamp(24px, 3.33vw, 32px)',
                        fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
                      }}
                    >
                      {score}
                    </div>
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
          )}
        </div>
      </aside>
    </div>
  );
}
