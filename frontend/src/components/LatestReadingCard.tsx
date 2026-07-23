type Props = {
  value: number;
  recordedAt: string;
};

export default function LatestReadingCard({ value, recordedAt }: Props) {
  return (
    <div className="rounded-lg border p-5 my-6">
      <h2 className="text-xl font-bold">Latest Reading</h2>

      <p className="text-3xl font-bold">{value} °C</p>

      <p className="text-sm text-gray-500">
        {new Date(recordedAt).toLocaleString()}
      </p>
    </div>
  );
}
