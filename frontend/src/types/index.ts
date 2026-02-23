export type Teacher = {
  id: number;
  email: string;
  name: string;
};

export type Phrase = {
  id: number;
  text: string;
  category: 'needs' | 'emotions' | 'classroom';
  language: 'en' | 'fil';
  createdAt: string;
  createdById: number;
};

export type CommunicationLog = {
  id: number;
  message: string;
  source: string;
  createdAt: string;
};

export type CaptionEvent = {
  id: string;
  text: string;
  timestamp: number;
  source: string;
};
