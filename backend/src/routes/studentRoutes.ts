import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';

const logSchema = z.object({
  message: z.string().min(1).max(180),
  source: z.enum(['student', 'teacher', 'caption']).default('student'),
});

export const studentRoutes = Router();

studentRoutes.post('/log', async (req, res) => {
  const payload = logSchema.parse(req.body);

  const entry = await prisma.communicationLog.create({
    data: {
      message: payload.message,
      source: payload.source,
    },
  });

  return res.status(201).json({ data: entry });
});
