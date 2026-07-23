export async function fetchPrinterDashboard(printerId: string) {
  const response = await fetch(
    `http://localhost:9000/api/printers/${printerId}/dashboard`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch printer dashboard");
  }

  return response.json();
}
