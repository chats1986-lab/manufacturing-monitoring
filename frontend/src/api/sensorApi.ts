const API_URL = "http://localhost:9000/api";

export async function fetchSensorReadings(sensorId: string) {
  const response = await fetch(`${API_URL}/sensors/${sensorId}/readings`);

  if (!response.ok) {
    throw new Error("Failed to fetch sensor readings");
  }
  return response.json();
}

export async function fetchLatestReading(sensorId: string) {
  const response = await fetch(`${API_URL}/sensors/${sensorId}/latest`);

  if (!response.ok) {
    throw new Error("Failed to fetch latest reading");
  }

  return response.json();
}
