import { Teacher } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: Pick<Teacher, 'id' | 'email' | 'name'>;
    }
  }
}

export {};
