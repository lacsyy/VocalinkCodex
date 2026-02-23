export type PhraseEvent = {
  id: string;
  text: string;
  role: 'student' | 'teacher';
  createdAt: number;
};

const phraseEvents: PhraseEvent[] = [];

export function addPhraseEvent(event: PhraseEvent) {
  phraseEvents.unshift(event);
  if (phraseEvents.length > 100) {
    phraseEvents.pop();
  }
}

export function getRecentPhraseEvents() {
  return phraseEvents;
}
