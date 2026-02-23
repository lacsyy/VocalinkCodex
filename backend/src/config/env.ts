import { config } from 'dotenv';
import { z } from 'zod';

config({ path: process.cwd() + '/.env' });

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  JWT_SECRET: z.string().min(12),
  CORS_ORIGIN: z.string().url().default('http://localhost:5173'),
});

export const env = envSchema.parse(process.env);
