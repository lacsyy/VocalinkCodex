import { FormEvent, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { apiRequest } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { CaptionEvent } from '../types';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:4000';

export function CaptionsPage() {
  const { token } = useAuth();
  const [text, setText] = useState('');
  const [captions, setCaptions] = useState<CaptionEvent[]>([]);

  const socket: Socket = useMemo(() => io(SOCKET_URL), []);

  useEffect(() => {
    socket.on('caption:new', (event: CaptionEvent) => {
      setCaptions((current) => [event, ...current].slice(0, 50));
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendCaption = async (event: FormEvent) => {
    event.preventDefault();
    await apiRequest(
      '/captions/simulate',
      {
        method: 'POST',
        body: JSON.stringify({ text }),
      },
      token ?? undefined,
    );
    setText('');
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-xl font-bold">Simulate/Type Caption</h2>
        <form className="space-y-3" onSubmit={sendCaption}>
          <textarea
            className="w-full rounded border border-slate-300 px-3 py-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Type teacher speech here..."
            required
          />
          <button className="rounded bg-blue-600 px-4 py-2 font-semibold text-white" type="submit">
            Emit Caption
          </button>
        </form>
      </section>

      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-xl font-bold">Live Feed</h2>
        <div className="space-y-2">
          {captions.map((caption) => (
            <div key={caption.id} className="rounded border border-slate-200 p-3">
              <p className="font-medium">{caption.text}</p>
              <p className="text-xs text-slate-500">{new Date(caption.timestamp).toLocaleTimeString()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
