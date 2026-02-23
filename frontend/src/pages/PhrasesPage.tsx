import { FormEvent, useEffect, useState } from 'react';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Phrase } from '../types';

export function PhrasesPage() {
  const { token } = useAuth();
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [text, setText] = useState('');
  const [category, setCategory] = useState<'needs' | 'emotions' | 'classroom'>('needs');
  const [language, setLanguage] = useState<'en' | 'fil'>('en');
  const [error, setError] = useState<string | null>(null);

  const loadPhrases = async () => {
    const res = await apiRequest<{ data: Phrase[] }>('/phrases', {}, token ?? undefined);
    setPhrases(res.data);
  };

  useEffect(() => {
    loadPhrases().catch(console.error);
  }, []);

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      await apiRequest<{ data: Phrase }>(
        '/phrases',
        {
          method: 'POST',
          body: JSON.stringify({ text, category, language }),
        },
        token ?? undefined,
      );
      setText('');
      await loadPhrases();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDelete = async (id: number) => {
    await apiRequest(`/phrases/${id}`, { method: 'DELETE' }, token ?? undefined);
    await loadPhrases();
  };

  return (
    <div className="space-y-4">
      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-xl font-bold">Create Phrase</h2>
        <form className="grid gap-3 md:grid-cols-4" onSubmit={handleCreate}>
          <input
            className="rounded border border-slate-300 px-3 py-2 md:col-span-2"
            placeholder="Phrase text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <select className="rounded border border-slate-300 px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value as any)}>
            <option value="needs">Needs</option>
            <option value="emotions">Emotions</option>
            <option value="classroom">Classroom</option>
          </select>
          <select className="rounded border border-slate-300 px-3 py-2" value={language} onChange={(e) => setLanguage(e.target.value as any)}>
            <option value="en">English</option>
            <option value="fil">Filipino</option>
          </select>
          <button className="rounded bg-blue-600 px-4 py-2 font-semibold text-white md:col-span-4" type="submit">
            Create Phrase
          </button>
        </form>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-xl font-bold">Existing Phrases</h2>
        <div className="space-y-2">
          {phrases.map((phrase) => (
            <div className="flex items-center justify-between rounded border border-slate-200 p-3" key={phrase.id}>
              <div>
                <p className="font-semibold">{phrase.text}</p>
                <p className="text-xs text-slate-500">
                  {phrase.language.toUpperCase()} • {phrase.category}
                </p>
              </div>
              <button className="rounded bg-red-600 px-3 py-1 text-sm font-semibold text-white" onClick={() => handleDelete(phrase.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
