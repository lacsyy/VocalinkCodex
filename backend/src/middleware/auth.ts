import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export type AuthTokenPayload = {
  sub: string;
  email: string;
  name: string;
};

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header.' });
  }

  const token = header.slice('Bearer '.length);
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;
    req.user = {
      id: Number(payload.sub),
      email: payload.email,
      name: payload.name,
    };
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}
