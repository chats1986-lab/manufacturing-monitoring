import { useQuery } from "@tanstack/react-query";
import { fetchSensorReadings } from "../api/sensorApi";

export function useSensorReadings(sensorId: string) {
  return useQuery({
    queryKey: ["sensor-readings", sensorId],
    queryFn: () => fetchSensorReadings(sensorId),
  });
}
