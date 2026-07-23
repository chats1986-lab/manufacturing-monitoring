import { useParams } from "@tanstack/react-router";

import Layout from "@/components/Layout";
import SensorCard from "@/components/SensorCard";
import { usePrinterDashboard } from "@/hooks/usePrinterDashboard";

export default function PrinterPage() {
  const { printerId } = useParams({
    from: "/printers/$printerId",
  });

  const { data, isLoading, error } = usePrinterDashboard(printerId);

  if (isLoading) {
    return <Layout>Loading printer...</Layout>;
  }

  if (error) {
    return <Layout>Error loading printer</Layout>;
  }

  const { printer, sensors } = data.data;

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold">{printer.name}</h1>

        <div className="mt-3">
          <p>Model: {printer.model}</p>

          <p>Serial: {printer.serialNumber}</p>
        </div>

        <h2 className="text-2xl font-bold mt-8">Sensors</h2>

        <div className="grid grid-cols-2 gap-6 mt-5">
          {sensors.map((sensor: any) => (
            <SensorCard key={sensor.id} sensor={sensor} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
