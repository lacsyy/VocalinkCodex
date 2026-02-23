import { Router } from 'express';
import { z } from 'zod';
import { loginTeacher } from '../services/authService';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authRoutes = Router();

authRoutes.post('/login', async (req, res) => {
  const payload = loginSchema.parse(req.body);
  const session = await loginTeacher(payload.email, payload.password);

  if (!session) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  return res.json(session);
});
