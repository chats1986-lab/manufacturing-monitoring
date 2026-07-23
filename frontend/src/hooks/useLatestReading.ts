import { fetchLatestReading } from "@/api/sensorApi";
import { useQuery } from "@tanstack/react-query";

export function useLatestReading(sensorId: string) {
  return useQuery({
    queryKey: ["sensor-latest-reading", sensorId],
    queryFn: () => fetchLatestReading(sensorId),
  });
}
