import { Router } from 'express';
import { z } from 'zod';
import { emitCaption } from '../socket/io';
import { prisma } from '../config/prisma';
import { requireAuth } from '../middleware/auth';

const captionSchema = z.object({
  text: z.string().min(1).max(280),
});

export const captionRoutes = Router();

captionRoutes.use(requireAuth);

captionRoutes.post('/simulate', async (req, res) => {
  const payload = captionSchema.parse(req.body);

  emitCaption(payload.text);
  await prisma.communicationLog.create({
    data: {
      message: payload.text,
      source: 'caption',
    },
  });

  return res.status(201).json({ message: 'Caption emitted.', data: { text: payload.text } });
});
