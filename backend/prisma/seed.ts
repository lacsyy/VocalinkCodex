import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const teacher = await prisma.teacher.upsert({
    where: { email: 'teacher@vocalink.local' },
    update: {
      name: 'Default Teacher',
      passwordHash,
    },
    create: {
      email: 'teacher@vocalink.local',
      name: 'Default Teacher',
      passwordHash,
    },
  });

  const existing = await prisma.phrase.count();
  if (existing === 0) {
    await prisma.phrase.createMany({
      data: [
        { text: 'I need water.', category: 'needs', language: 'en', createdById: teacher.id },
        { text: 'Kailangan ko ng tubig.', category: 'needs', language: 'fil', createdById: teacher.id },
        { text: 'I feel happy.', category: 'emotions', language: 'en', createdById: teacher.id },
        { text: 'Nalilito ako.', category: 'emotions', language: 'fil', createdById: teacher.id },
        { text: 'Please repeat that.', category: 'classroom', language: 'en', createdById: teacher.id },
        { text: 'Pakiulit po iyon.', category: 'classroom', language: 'fil', createdById: teacher.id },
      ],
    });
  }

  await prisma.communicationLog.create({
    data: {
      message: 'Seed completed. Default teacher and phrases are ready.',
      source: 'system',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed complete.');
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
