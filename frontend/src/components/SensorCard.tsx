import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SensorCard({ sensor }: { sensor: any }) {
  const readings = [...sensor.readings].reverse().map((reading: any) => ({
    time: new Date(reading.recordedAt).toLocaleTimeString(),
    value: reading.value,
  }));

  const latestReading = sensor.readings?.[0]?.value;

  return (
    <div className="rounded-lg border p-5">
      <div className="mb-4">
        <h3 className="text-xl font-bold">{sensor.type}</h3>

        <p className="text-sm text-gray-500">{sensor.serialNumber}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm">Current Temperature</p>

        <p className="text-3xl font-bold">{latestReading ?? "-"} °C</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={readings}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Line type="monotone" dataKey="value" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
