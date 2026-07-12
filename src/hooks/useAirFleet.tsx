import { useQuery } from "@tanstack/react-query";
import { fetchAirTrafficByHq } from "@/lib/logisecure-api";
import { useLogisecure } from "@/hooks/useLogisecure";
import { getCachedData, setCachedData } from "@/lib/mock-data";

export function useAirFleet() {
  const { location } = useLogisecure(); // reuse the same HQ selector

  const query = useQuery({
    queryKey: ["air-fleet", location],
    queryFn: async ({ signal }) => {
      const data = await fetchAirTrafficByHq(location, signal);
      setCachedData(`air.${location}`, data);
      return data;
    },
    refetchInterval: 15_000,
    refetchOnWindowFocus: false,
    staleTime: 10_000,
    initialData: () => getCachedData(`air.${location}`) || undefined,
  });

  return {
    flights: query.data?.flights ?? [],
    totalFlights: query.data?.total_flights ?? 0,
    timestamp: query.data?.timestamp,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}