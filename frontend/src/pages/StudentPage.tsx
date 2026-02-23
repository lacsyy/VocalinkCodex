import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client';
import { Phrase } from '../types';

export function StudentPage() {
  const [language, setLanguage] = useState<'en' | 'fil'>('en');
  const [phrases, setPhrases] = useState<Phrase[]>([]);

  const loadPhrases = async (selectedLanguage: 'en' | 'fil') => {
    const res = await apiRequest<{ data: Phrase[] }>(`/phrases/public?language=${selectedLanguage}`);
    setPhrases(res.data);
  };

  useEffect(() => {
    loadPhrases(language).catch(console.error);
  }, [language]);

  const speak = async (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-PH' : 'fil-PH';
      window.speechSynthesis.speak(utterance);
    }

    await apiRequest('/student/log', {
      method: 'POST',
      body: JSON.stringify({ message: text, source: 'student' }),
    });
  };

  return (
    <div className="space-y-4">
      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-bold">Student Mode</h2>
        <p className="mb-4 text-slate-600">Tap a phrase to speak it aloud.</p>
        <div className="mb-4 flex gap-2">
          <button
            className={`rounded px-4 py-2 ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}
            onClick={() => setLanguage('en')}
            type="button"
          >
            English
          </button>
          <button
            className={`rounded px-4 py-2 ${language === 'fil' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}
            onClick={() => setLanguage('fil')}
            type="button"
          >
            Filipino
          </button>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {phrases.map((phrase) => (
            <button
              key={phrase.id}
              onClick={() => speak(phrase.text)}
              className="rounded-lg border border-slate-300 bg-slate-50 p-4 text-left hover:border-blue-500"
              type="button"
            >
              <p className="text-xs uppercase text-slate-500">{phrase.category}</p>
              <p className="font-semibold">{phrase.text}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
