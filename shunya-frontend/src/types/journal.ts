export interface JournalEntry {
  id: string;
  content: string;
  timestamp: Date;
  mood: string;
  states: string[];
  sentiment?: {
    score: number;
    magnitude: number;
  };
}

export type EmotionOption = {
  label: string;
  color: string;
}; 