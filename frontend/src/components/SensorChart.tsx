import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Reading = {
  value: number;
  recordedAt: string;
};

type SensorChartProps = {
  readings: Reading[];
};

export function SensorChart({ readings }: SensorChartProps) {
  const chartData = readings.map((reading) => ({
    value: reading.value,
    time: new Date(reading.recordedAt).toLocaleTimeString(),
  }));

  return (
    <div className="mt-6 h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line type="monotone" dataKey="value" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
