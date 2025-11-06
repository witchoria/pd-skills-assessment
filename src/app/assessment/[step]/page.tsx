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
    <div className="min-h-screen flex flex-col p-8 lg:p-12">
      {/* Header Section */}
      <div className="mb-8">
        <p className="text-sm font-mono text-muted uppercase tracking-wider mb-2">
          Skill {step} of 13
        </p>
        <h1 className="text-fluid-skill-title font-header font-bold text-text lowercase">
          {competency.name}
        </h1>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="h-4 bg-card-bg border-2 border-border overflow-hidden">
          <div
            className="h-full bg-button-bg transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Rating Blocks */}
      {/* Rating Blocks */}
<div className="flex-1" style={{ 
  padding: 'clamp(32px, 4.44vw, 64px)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(16px, 2.22vw, 32px)'
}}>
        {competency.statements.map((statement, index) => {
          const currentRating = ratings[statement.id] || 1;
          const ratingLabel = SCORING_GUIDE[currentRating as keyof typeof SCORING_GUIDE]?.label || SCORING_GUIDE[1].label;

          return (
            <div
  key={statement.id}
  className="border-4 border-border bg-card-bg"
  style={{ padding: 'clamp(20px, 2.22vw, 32px)' }}
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
      <div className="flex items-center justify-between pt-8 border-t-4 border-border">
        <button
          onClick={handlePrevious}
          className="px-8 py-3 border-4 border-border bg-bg text-text font-bold text-sm uppercase tracking-wider hover:bg-hover transition-colors"
        >
          Back
        </button>

        <p className="text-lg font-bold text-text font-mono">
          {step}/13
        </p>

        <button
          onClick={handleNext}
          disabled={!allRated}
          className={`
            px-8 py-3 border-4 font-bold text-sm uppercase tracking-wider transition-all
            ${allRated
              ? 'bg-button-bg text-button-text border-border hover:bg-text hover:text-bg cursor-pointer'
              : 'bg-hover text-muted border-muted cursor-not-allowed'
            }
          `}
        >
          Next
        </button>
      </div>
    </div>
  );
}
