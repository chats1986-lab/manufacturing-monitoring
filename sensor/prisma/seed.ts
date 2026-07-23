import { prisma } from "../src/database/prisma.js";

const factories = [
  {
    id: "d16e1d8c-f260-463d-851f-d73d98153946",
    name: "Additive Solutions",
    location: "Melbourne",
    printers: [
      {
        id: "6fa5feb6-b521-4f6b-9cd8-3d3810d993a3",
        name: "Industrial Printer 01",
        model: "Additive-X100",
        serialNumber: "AS-PRINTER-0001",
      },
    ],
  },
  {
    id: "fdb73872-acda-4418-a613-e2315b816f84",
    name: "Precision Manufacturing",
    location: "Sydney",
    printers: [
      {
        id: "1b16b28a-f72c-4c8f-835b-efc16fb8cd44",
        name: "Industrial Printer 02",
        model: "Precision-X200",
        serialNumber: "PM-PRINTER-0001",
      },
      {
        id: "8a56768a-f702-42c7-8d0e-20f42f9cef41",
        name: "Industrial Printer 03",
        model: "Precision-X300",
        serialNumber: "PM-PRINTER-0002",
      },
      {
        id: "ad09d1b9-9581-4d1a-b05c-f3b14d6567ce",
        name: "Industrial Printer 04",
        model: "Precision-X400",
        serialNumber: "PM-PRINTER-0003",
      },
    ],
  },
  {
    id: "f088ae46-2bac-4ba4-a450-e743c8d78491",
    name: "Advanced Robotics Factory",
    location: "Brisbane",
    printers: [
      {
        id: "1fa2e028-f20f-45cb-b5f7-250f5fbb2366",
        name: "Robot Printer 01",
        model: "Robot-X100",
        serialNumber: "AR-PRINTER-0001",
      },
      {
        id: "0e89feff-d8b3-4863-9aeb-37c17432e7a8",
        name: "Robot Printer 02",
        model: "Robot-X200",
        serialNumber: "AR-PRINTER-0002",
      },
      {
        id: "0ca3becf-45cd-4974-b192-061030cc14be",
        name: "Robot Printer 03",
        model: "Robot-X300",
        serialNumber: "AR-PRINTER-0003",
      },
    ],
  },
  {
    id: "64279b97-b4e2-45f4-a8df-8259afe0138c",
    name: "Aero Components Manufacturing",
    location: "Perth",
    printers: [
      {
        id: "27737488-e4e0-4ce8-9cc1-cc487e1b41b3",
        name: "Aero Printer 01",
        model: "Aero-X100",
        serialNumber: "AC-PRINTER-0001",
      },
      {
        id: "3179876c-df92-421d-b212-8d31d5fd3986",
        name: "Aero Printer 02",
        model: "Aero-X200",
        serialNumber: "AC-PRINTER-0002",
      },
      {
        id: "542988e5-fe68-4586-bcd8-cd4600aac54a",
        name: "Aero Printer 03",
        model: "Aero-X300",
        serialNumber: "AC-PRINTER-0003",
      },
    ],
  },
];

async function main() {
  await prisma.sensorReading.deleteMany();
  await prisma.sensor.deleteMany();
  await prisma.printer.deleteMany();
  await prisma.factory.deleteMany();

  for (const factory of factories) {
    await prisma.factory.create({
      data: {
        id: factory.id,
        name: factory.name,
        location: factory.location,

        printers: {
          create: factory.printers.map((printer) => ({
            id: printer.id,
            name: printer.name,
            model: printer.model,
            serialNumber: printer.serialNumber,

            sensors: {
              create: [
                {
                  type: "TEMPERATURE",
                  serialNumber: printer.serialNumber.replace(
                    "PRINTER",
                    "SENSOR-TEMP",
                  ),
                },
                {
                  type: "POWER",
                  serialNumber: printer.serialNumber.replace(
                    "PRINTER",
                    "SENSOR-POWER",
                  ),
                },
                {
                  type: "VIBRATION",
                  serialNumber: printer.serialNumber.replace(
                    "PRINTER",
                    "SENSOR-VIB",
                  ),
                },
                {
                  type: "HUMIDITY",
                  serialNumber: printer.serialNumber.replace(
                    "PRINTER",
                    "SENSOR-HUM",
                  ),
                },
              ],
            },
          })),
        },
      },
    });
  }

  const sensors = await prisma.sensor.findMany();

  for (const sensor of sensors) {
    const readings = Array.from({ length: 6 }).map((_, index) => ({
      sensorId: sensor.id,
      value:
        sensor.type === "TEMPERATURE"
          ? 70 + Math.random() * 10
          : sensor.type === "POWER"
            ? 100 + Math.random() * 20
            : sensor.type === "VIBRATION"
              ? 5 + Math.random() * 5
              : 40 + Math.random() * 20,

      recordedAt: new Date(Date.now() - (5 - index) * 60 * 1000),
    }));

    await prisma.sensorReading.createMany({
      data: readings,
    });
  }

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
