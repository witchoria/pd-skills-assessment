// Core data structures for the assessment

export interface Statement {
  id: string;
  text: string;
}

export interface Competency {
  id: string;
  name: string;
  slug: string;
  statements: Statement[];
}

export interface UserResponse {
  competencyId: string;
  statementId: string;
  score: number; // 1-5
}

export interface AssessmentState {
  responses: Record<string, Record<string, number>>; // competencyId -> statementId -> score
  currentStep: number; // 1-13
  completedSteps: number[];
  startedAt?: Date;
  completedAt?: Date;
}

export interface CompetencyResult {
  competencyName: string;
  averageScore: number;
  statements: {
    text: string;
    score: number;
  }[];
}