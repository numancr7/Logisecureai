import { useQuery } from "@tanstack/react-query";
import { fetchMaritimeByHq } from "@/lib/logisecure-api";
import { useLogisecure } from "@/hooks/useLogisecure";
import { getCachedData, setCachedData } from "@/lib/mock-data";

export function useMaritimeFleet() {
  const { location } = useLogisecure();

  const query = useQuery({
    queryKey: ["maritime-fleet", location],
    queryFn: async ({ signal }) => {
      const data = await fetchMaritimeByHq(location, signal);
      setCachedData(`maritime.${location}`, data);
      return data;
    },
    refetchInterval: 15_000,
    refetchOnWindowFocus: false,
    staleTime: 10_000,
    initialData: () => getCachedData(`maritime.${location}`) || undefined,
  });

  return {
    vessels: query.data?.data?.all_vessels ?? [],
    totalVessels: query.data?.total_vessels ?? 0,
    byType: (query.data?.data as any)?.by_type,
    timestamp: query.data?.timestamp,
    source: query.data?.source,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}