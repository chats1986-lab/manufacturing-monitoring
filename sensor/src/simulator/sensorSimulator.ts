import { prisma } from "../database/prisma.js";

function generateReading(type: string) {
  switch (type) {
    case "TEMPERATURE":
      return 70 + Math.random() * 5;

    case "POWER":
      return 4 + Math.random() * 2;

    case "HUMIDITY":
      return 35 + Math.random() * 15;

    case "VIBRATION":
      return 0.2 + Math.random() * 0.3;

    default:
      return Math.random() * 100;
  }
}

export async function runSensorSimulator() {
  console.log("Starting sensor simulator...");

  const sensors = await prisma.sensor.findMany();

  console.log(`Loaded ${sensors.length} sensors`);

  while (true) {
    console.log("\nGenerating new readings...");

    for (const sensor of sensors) {
      const value = generateReading(sensor.type);

      await prisma.sensorReading.create({
        data: {
          sensorId: sensor.id,
          value,
        },
      });

      console.log(`${sensor.serialNumber} -> ${value.toFixed(2)}`);
    }

    console.log("Waiting 5 seconds...\n");

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}
