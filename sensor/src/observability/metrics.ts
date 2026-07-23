import client from "prom-client";

client.collectDefaultMetrics();

export const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

// Total sensor readings received
export const sensorReadingCounter = new client.Counter({
  name: "sensor_readings_total",
  help: "Total number of sensor readings received",
  labelNames: ["sensor_id"],
});

// Sensor errors
export const sensorErrorCounter = new client.Counter({
  name: "sensor_errors_total",
  help: "Total number of sensor errors",
  labelNames: ["sensor_id", "type"],
});

// Current sensor temperature
export const sensorTemperatureGauge = new client.Gauge({
  name: "sensor_temperature_celsius",
  help: "Current sensor temperature in Celsius",
  labelNames: ["sensor_id"],
});

// Machine status (1 = running, 0 = stopped)
export const machineStatusGauge = new client.Gauge({
  name: "machine_status",
  help: "Machine running status",
  labelNames: ["machine_id"],
});

export const register = client.register;
