import { prisma } from "../src/database/prisma.js";

async function main() {
  const factory = await prisma.factory.upsert({
    where: {
      id: "11111111-1111-1111-1111-111111111111",
    },
    update: {},
    create: {
      id: "11111111-1111-1111-1111-111111111111",
      name: "Demo Manufacturing Plant",
      location: "Bangalore",

      printers: {
        create: [
          {
            id: "22222222-2222-2222-2222-222222222222",
            name: "Printer-001",
            model: "EOS P500",
            serialNumber: "PRINTER001",

            sensors: {
              create: [
                {
                  id: "33333333-3333-3333-3333-333333333333",
                  type: "temperature",
                  serialNumber: "TEMP001",

                  readings: {
                    create: [
                      {
                        value: 25.5,
                      },
                      {
                        value: 26.1,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Seed completed:", factory.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
