import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️ Limpiando datos geográficos antiguos...');
  // Al borrar los departamentos, por la regla "onDelete: Cascade", se borrarán sus ciudades automáticamente.
  await prisma.department.deleteMany({});

  console.log('🇨🇴 Insertando departamentos y municipios de Colombia...');

  // 1. Insertamos Antioquia con sus ciudades
  await prisma.department.create({
    data: {
      name: 'Antioquia',
      cities: {
        create: [
          { name: 'Medellín' },
          { name: 'Envigado' },
          { name: 'Rionegro' },
          { name: 'Bello' },
        ],
      },
    },
  });

  // 2. Insertamos Cundinamarca con sus ciudades
  await prisma.department.create({
    data: {
      name: 'Cundinamarca',
      cities: {
        create: [
          { name: 'Bogotá' },
          { name: 'Soacha' },
          { name: 'Chía' },
          { name: 'Zipaquirá' },
        ],
      },
    },
  });

  // 3. Insertamos Valle del Cauca con sus ciudades
  await prisma.department.create({
    data: {
      name: 'Valle del Cauca',
      cities: {
        create: [
          { name: 'Cali' },
          { name: 'Palmira' },
          { name: 'Tuluá' },
          { name: 'Buenaventura' },
        ],
      },
    },
  });

  console.log(
    '🌱 ¡Departamentos y ciudades inyectados con éxito en la semilla!',
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
