export type MentorRole = 'programming' | 'robotics' | 'team' | 'career';
export type Language = 'ru' | 'kk' | 'en';
export type UserRole = 'student' | 'admin';

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

export interface Badge {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  xp: number;
  merit: number;
  streak: number;
  lastActive: number;
  badges: string[];
  completedLevels: number[];
  rpgRole: {
    category: 'programmer' | 'mechanic';
    level: number;
    title: string;
  };
}

export interface DailyChallenge {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  xpReward: number;
  type: 'coding' | 'mechanics';
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  merit: number;
  rank: number;
}
