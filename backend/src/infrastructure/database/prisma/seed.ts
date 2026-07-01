import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'node:fs';

const prisma = new PrismaClient();

type CitySeed = {
  name: string;
};

const cities = JSON.parse(
  readFileSync(
    'src/infrastructure/database/prisma/data/colombia-cities.json',
    'utf8',
  ),
) as CitySeed[];

async function main() {
  console.log('Limpiando ciudades antiguas...');
  await prisma.city.deleteMany({});

  console.log('Insertando ciudades principales de Colombia...');
  await prisma.city.createMany({
    data: cities,
  });

  console.log('Ciudades insertadas con exito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
