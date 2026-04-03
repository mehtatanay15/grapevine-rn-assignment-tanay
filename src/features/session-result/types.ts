export interface KeyMoment {
  timestamp: string;
  description: string;
  type: 'positive' | 'negative';
}

export interface SmartSummary {
  whatWorkedWell: string[];
  overallTakeaways: string[];
}

export interface SessionResult {
  questionId: string;
  questionText: string;
  companyName: string;
  companyLogoUrl: string | null;
  smartSummary: SmartSummary;
  keyMoments: KeyMoment[];
  audioDurationSeconds: number;
}
