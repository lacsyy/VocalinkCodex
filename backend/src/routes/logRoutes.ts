import { Router } from 'express';
import { prisma } from '../config/prisma';
import { requireAuth } from '../middleware/auth';

export const logRoutes = Router();

logRoutes.use(requireAuth);

logRoutes.get('/', async (_req, res) => {
  const data = await prisma.communicationLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return res.json({ data });
});
