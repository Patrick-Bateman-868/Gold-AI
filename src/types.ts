export type MentorRole = 'programming' | 'robotics' | 'team' | 'career';
export type Language = 'ru' | 'kk' | 'en';

export interface Level {
  id: number;
  title: Record<Language, string>;
  description: Record<Language, string>;
  theory: Record<Language, string>;
  practice: Record<Language, string>;
  project: Record<Language, string>;
}

export interface Mentor {
  id: MentorRole;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  color: string;
  examples: Record<Language, string[]>;
  levels?: Level[];
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}
