import { Router } from 'express';
import { transcribeAudioChunk } from '../services/sttService';

export const transcriptsRouter = Router();

transcriptsRouter.post('/simulate', async (_req, res) => {
  const result = await transcribeAudioChunk();
  res.status(201).json({ data: result });
});
