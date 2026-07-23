import { useQuery } from "@tanstack/react-query";

export function useFactories() {
  return useQuery({
    queryKey: ["factories"],

    queryFn: async () => {
      const response = await fetch("http://localhost:9000/api/factories");

      if (!response.ok) {
        throw new Error("Failed to fetch factories");
      }

      return response.json();
    },
  });
}
