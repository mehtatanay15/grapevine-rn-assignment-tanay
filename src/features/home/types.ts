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

export type QuestionCardState = 'active' | 'next' | 'locked';
