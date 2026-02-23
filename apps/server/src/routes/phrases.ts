import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import { z } from 'zod';
import { addPhraseEvent, getRecentPhraseEvents } from '../store/sessionStore';
import { synthesizeSpeech } from '../services/ttsService';

const createPhraseSchema = z.object({
  text: z.string().min(1),
  language: z.enum(['en', 'fil']).default('en'),
  role: z.enum(['student', 'teacher']).default('student'),
});

export const phrasesRouter = Router();

phrasesRouter.get('/', (_req, res) => {
  res.json({ data: getRecentPhraseEvents() });
});

phrasesRouter.post('/', async (req, res) => {
  const payload = createPhraseSchema.parse(req.body);

  const phraseEvent = {
    id: randomUUID(),
    text: payload.text,
    role: payload.role,
    createdAt: Date.now(),
  } as const;

  addPhraseEvent(phraseEvent);

  const tts = await synthesizeSpeech(payload.text, payload.language);

  res.status(201).json({ data: phraseEvent, tts });
});
