export type UserRole = 'student' | 'teacher';

export type QuickPhrase = {
  id: string;
  textEn: string;
  textFil: string;
  category: 'needs' | 'emotions' | 'classroom';
};

export type CaptionMessage = {
  id: string;
  text: string;
  timestamp: number;
  speaker?: string;
};
