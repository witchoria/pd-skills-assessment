'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AssessmentState } from '@/types/assessment';

// LocalStorage key
const STORAGE_KEY = 'product-designer-assessment';

// Initial state
const initialState: AssessmentState = {
  responses: {},
  currentStep: 1,
  completedSteps: [],
  startedAt: undefined,
  completedAt: undefined,
};

// Context value type
interface AssessmentContextValue {
  state: AssessmentState;
  saveResponse: (competencyId: string, statementId: string, score: number) => void;
  getResponse: (competencyId: string, statementId: string) => number | undefined;
  getCompetencyResponses: (competencyId: string) => Record<string, number>;
  isCompetencyComplete: (competencyId: string, totalStatements: number) => boolean;
  setCurrentStep: (step: number) => void;
  markStepComplete: (step: number) => void;
  clearAllData: () => void;
  resetAssessment: () => void;
  getProgress: () => {
    totalCompetencies: number;
    completedCompetencies: number;
    totalStatements: number;
    answeredStatements: number;
    percentComplete: number;
  };
}

// Create context
const AssessmentContext = createContext<AssessmentContextValue | undefined>(undefined);

// Provider props
interface AssessmentProviderProps {
  children: React.ReactNode;
}

// Provider component
export function AssessmentProvider({ children }: AssessmentProviderProps) {
  const [state, setState] = useState<AssessmentState>(initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        setState({
          ...parsed,
          startedAt: parsed.startedAt ? new Date(parsed.startedAt) : undefined,
          completedAt: parsed.completedAt ? new Date(parsed.completedAt) : undefined,
        });
      }
    } catch (error) {
      console.error('Failed to load assessment from localStorage:', error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isHydrated) return; // Don't save on initial mount

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save assessment to localStorage:', error);
    }
  }, [state, isHydrated]);

  // Save a response
  const saveResponse = useCallback((competencyId: string, statementId: string, score: number) => {
    setState(prev => {
      // Initialize startedAt if this is the first response
      const startedAt = prev.startedAt || new Date();

      // Update responses
      const competencyResponses = prev.responses[competencyId] || {};
      const updatedResponses = {
        ...prev.responses,
        [competencyId]: {
          ...competencyResponses,
          [statementId]: score,
        },
      };

      return {
        ...prev,
        responses: updatedResponses,
        startedAt,
      };
    });
  }, []);

  // Get a specific response
  const getResponse = useCallback((competencyId: string, statementId: string): number | undefined => {
    return state.responses[competencyId]?.[statementId];
  }, [state.responses]);

  // Get all responses for a competency
  const getCompetencyResponses = useCallback((competencyId: string): Record<string, number> => {
    return state.responses[competencyId] || {};
  }, [state.responses]);

  // Check if a competency is complete
  const isCompetencyComplete = useCallback((competencyId: string, totalStatements: number): boolean => {
    const responses = state.responses[competencyId];
    if (!responses) return false;

    const answeredCount = Object.keys(responses).length;
    return answeredCount === totalStatements;
  }, [state.responses]);

  // Set current step
  const setCurrentStep = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      currentStep: step,
    }));
  }, []);

  // Mark a step as complete
  const markStepComplete = useCallback((step: number) => {
    setState(prev => {
      // Don't add if already in completedSteps
      if (prev.completedSteps.includes(step)) {
        return prev;
      }

      return {
        ...prev,
        completedSteps: [...prev.completedSteps, step].sort((a, b) => a - b),
      };
    });
  }, []);

  // Clear all data (reset to initial state)
  const clearAllData = useCallback(() => {
    setState(initialState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }, []);

  // Reset assessment (keep structure but clear responses)
  const resetAssessment = useCallback(() => {
    setState({
      responses: {},
      currentStep: 1,
      completedSteps: [],
      startedAt: undefined,
      completedAt: undefined,
    });
  }, []);

  // Get progress statistics
  const getProgress = useCallback(() => {
    const totalCompetencies = 13; // We have 13 competencies
    const totalStatements = totalCompetencies * 5; // Each competency has 5 statements

    // Count answered statements
    let answeredStatements = 0;
    Object.values(state.responses).forEach(competencyResponses => {
      answeredStatements += Object.keys(competencyResponses).length;
    });

    // Count completed competencies (all 5 statements answered)
    let completedCompetencies = 0;
    Object.values(state.responses).forEach(competencyResponses => {
      if (Object.keys(competencyResponses).length === 5) {
        completedCompetencies++;
      }
    });

    const percentComplete = totalStatements > 0
      ? Math.round((answeredStatements / totalStatements) * 100)
      : 0;

    return {
      totalCompetencies,
      completedCompetencies,
      totalStatements,
      answeredStatements,
      percentComplete,
    };
  }, [state.responses]);

  const value: AssessmentContextValue = {
    state,
    saveResponse,
    getResponse,
    getCompetencyResponses,
    isCompetencyComplete,
    setCurrentStep,
    markStepComplete,
    clearAllData,
    resetAssessment,
    getProgress,
  };

  // Don't render children until hydrated to avoid mismatch
  if (!isHydrated) {
    return null;
  }

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

// Custom hook to use the context
export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
