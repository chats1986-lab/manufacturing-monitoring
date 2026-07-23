type SensorType = "TEMPERATURE" | "PRESSURE" | "VIBRATION" | "HUMIDITY";
export interface Sensor {
  id: string;
  name: string;
  type: SensorType;
  printerId: string;
  createdAt: Date;
}
