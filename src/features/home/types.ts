export interface Question {
  id: string;
  questionNumber: number;
  companyId: string;
  companyName: string;
  companyLogoUrl: string | null;
  text: string;
  durationMinutes: number;
  completedTodayCount: number;
}

export interface Company {
  id: string;
  name: string;
  logoUrl: string | null;
  questionCount: number;
}

export type QuestionCardState = 'active' | 'next' | 'locked';
