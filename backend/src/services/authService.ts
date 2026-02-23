import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { env } from '../config/env';

export async function loginTeacher(email: string, password: string) {
  const teacher = await prisma.teacher.findUnique({ where: { email } });
  if (!teacher) {
    return null;
  }

  const isValid = await bcrypt.compare(password, teacher.passwordHash);
  if (!isValid) {
    return null;
  }

  const token = jwt.sign({ sub: String(teacher.id), email: teacher.email, name: teacher.name }, env.JWT_SECRET, {
    expiresIn: '12h',
  });

  return {
    token,
    teacher: {
      id: teacher.id,
      email: teacher.email,
      name: teacher.name,
    },
  };
}
