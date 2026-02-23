import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { CommunicationLog, Phrase } from '../types';

export function DashboardPage() {
  const { token } = useAuth();
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [logs, setLogs] = useState<CommunicationLog[]>([]);

  useEffect(() => {
    async function load() {
      const phrasesRes = await apiRequest<{ data: Phrase[] }>('/phrases', {}, token ?? undefined);
      const logsRes = await apiRequest<{ data: CommunicationLog[] }>('/logs', {}, token ?? undefined);
      setPhrases(phrasesRes.data);
      setLogs(logsRes.data);
    }

    load().catch(console.error);
  }, [token]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">Phrase Inventory</h2>
        <p className="mb-3 text-sm text-slate-600">Total phrases available for students.</p>
        <p className="text-4xl font-black text-blue-700">{phrases.length}</p>
      </section>
      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">Recent Communication Logs</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {logs.slice(0, 8).map((log) => (
            <li key={log.id} className="rounded border border-slate-200 p-2">
              <p className="font-medium">{log.message}</p>
              <p className="text-xs text-slate-500">
                {log.source} • {new Date(log.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
