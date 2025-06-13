import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.citizen.deleteMany(); // ← deletes all existing citizens

  const newCitizen = await prisma.citizen.create({
    data: {
      firstName: 'Ayomide',
      lastName: 'Ajayi',
      middleName: 'O.',
      gender: 'Male',
      dateOfBirth: new Date('1995-06-10'),
      nin: '12345678901',
      bvn: '2213444556',
      personalAddress: 'No. 12, Adetola Street, Lagos',
      familyAddress: 'No. 2, Family Compound, Osogbo',
      motherName: 'Bola Ajayi',
      fatherName: 'Tunde Ajayi'
    }
  });

  console.log('✅ New Citizen Saved:\n', newCitizen);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
