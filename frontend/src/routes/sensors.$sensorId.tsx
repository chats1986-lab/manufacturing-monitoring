import { useParams } from "@tanstack/react-router";
import { useLatestReading } from "@/hooks/useLatestReading";
import { SensorChart } from "@/components/SensorChart";
import { useSensorReadings } from "@/hooks/useSensorReadings";
import LatestReadingCard from "@/components/LatestReadingCard";

export default function SensorPage() {
  const { sensorId } = useParams({
    from: "/sensors/$sensorId",
  });

  const { data: latestData, isLoading: latestLoading } =
    useLatestReading(sensorId);

  const { data: readingsData, isLoading: readingsLoading } =
    useSensorReadings(sensorId);

  console.log(latestData);

  if (latestLoading || readingsLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Sensor Details</h1>

      {latestData?.data && (
        <LatestReadingCard
          value={latestData.data.value}
          recordedAt={latestData.data.recordedAt}
        />
      )}

      {readingsData?.data && <SensorChart readings={readingsData.data} />}
    </div>
  );
}
