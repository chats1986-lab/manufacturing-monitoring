import { Link } from "@tanstack/react-router";

export default function PrinterCard({ printer }: { printer: any }) {
  return (
    <Link
      to="/printers/$printerId"
      params={{
        printerId: printer.id,
      }}
      className="block rounded-lg border p-4 hover:bg-gray-100"
    >
      <h3 className="font-bold">{printer.name}</h3>

      <p className="text-sm text-gray-600">Model: {printer.model}</p>

      <p className="text-sm text-gray-600">Serial: {printer.serialNumber}</p>
    </Link>
  );
}
