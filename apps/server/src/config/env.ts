import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  GOOGLE_CLOUD_PROJECT_ID: z.string().optional(),
  FIREBASE_PROJECT_ID: z.string().optional(),
});

export const env = envSchema.parse(process.env);
