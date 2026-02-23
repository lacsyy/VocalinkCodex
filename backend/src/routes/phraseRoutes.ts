import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';
import { requireAuth } from '../middleware/auth';

const phraseSchema = z.object({
  text: z.string().min(1).max(140),
  category: z.enum(['needs', 'emotions', 'classroom']),
  language: z.enum(['en', 'fil']),
});

export const phraseRoutes = Router();

phraseRoutes.get('/public', async (req, res) => {
  const language = z.enum(['en', 'fil']).optional().parse(req.query.language);
  const data = await prisma.phrase.findMany({
    where: language ? { language } : undefined,
    orderBy: { createdAt: 'desc' },
  });

  return res.json({ data });
});

phraseRoutes.use(requireAuth);

phraseRoutes.get('/', async (req, res) => {
  const language = z.enum(['en', 'fil']).optional().parse(req.query.language);
  const data = await prisma.phrase.findMany({
    where: language ? { language } : undefined,
    orderBy: { createdAt: 'desc' },
  });

  return res.json({ data });
});

phraseRoutes.post('/', async (req, res) => {
  const payload = phraseSchema.parse(req.body);
  const phrase = await prisma.phrase.create({
    data: {
      ...payload,
      createdById: req.user!.id,
    },
  });

  await prisma.communicationLog.create({
    data: {
      message: `Phrase created: ${phrase.text}`,
      source: 'teacher',
    },
  });

  return res.status(201).json({ data: phrase });
});

phraseRoutes.delete('/:id', async (req, res) => {
  const params = z.object({ id: z.coerce.number().int().positive() }).parse(req.params);

  const phrase = await prisma.phrase.findUnique({ where: { id: params.id } });
  if (!phrase) {
    return res.status(404).json({ message: 'Phrase not found.' });
  }

  await prisma.phrase.delete({ where: { id: params.id } });
  await prisma.communicationLog.create({
    data: {
      message: `Phrase deleted: ${phrase.text}`,
      source: 'teacher',
    },
  });

  return res.json({ message: 'Phrase deleted.' });
});
