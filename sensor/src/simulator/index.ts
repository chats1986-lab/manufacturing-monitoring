import "dotenv/config";

import { runSensorSimulator } from "./sensorSimulator.js";

runSensorSimulator()
  .then(() => {
    console.log("Simulator finished");
  })
  .catch(console.error);
