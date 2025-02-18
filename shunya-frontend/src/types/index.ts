export interface Entry {
  id: string;
  timestamp: string;
  text: string;
  mood: string;
  states: string[];
  image?: {
    url: string;
    caption?: string;
  };
} 