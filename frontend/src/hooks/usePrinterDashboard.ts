import { useQuery } from "@tanstack/react-query";
import { fetchPrinterDashboard } from "../api/printerApi";

export function usePrinterDashboard(printerId: string) {
  return useQuery({
    queryKey: ["printer-dashboard", printerId],
    queryFn: () => fetchPrinterDashboard(printerId),
    // refresh every 5 seconds
    refetchInterval: 5000,
  });
}
