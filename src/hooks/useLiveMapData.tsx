import { useQueries, useQuery } from "@tanstack/react-query";
import { useLogisecure } from "@/hooks/useLogisecure";
import {
  fetchAirTrafficByHq,
  fetchMaritimeByHq,
  fetchLandByHq,
  fetchLandTrackById,
} from "@/lib/logisecure-api";

export function useLiveMapData() {
  const { location } = useLogisecure();

  const air = useQuery({
    queryKey: ["live-map", "air", location],
    queryFn: ({ signal }) => fetchAirTrafficByHq(location, signal),
    refetchInterval: 15_000,
  });

  const sea = useQuery({
    queryKey: ["live-map", "sea", location],
    queryFn: ({ signal }) => fetchMaritimeByHq(location, signal),
    refetchInterval: 15_000,
  });

  const land = useQuery({
    queryKey: ["live-map", "land", location],
    queryFn: ({ signal }) => fetchLandByHq(location, signal),
    refetchInterval: 30_000,
  });

  const shipments = land.data?.data?.active_shipments ?? [];

  const landPositions = useQueries({
    queries: shipments.map((s) => ({
      queryKey: ["live-map", "land-track", s.tracking_id],
      queryFn: ({ signal }: { signal: AbortSignal }) => fetchLandTrackById(s.tracking_id, signal),
      enabled: shipments.length > 0,
      refetchInterval: 20_000,
    })),
  });

  const landVehicles = landPositions
    .map((q) => q.data)
    .filter((d): d is NonNullable<typeof d> => !!d?.telemetry?.current_position);

  return {
    flights: air.data?.flights ?? [],
    vessels: sea.data?.data?.all_vessels ?? [],
    landVehicles,
    isLoading: air.isLoading || sea.isLoading || land.isLoading,
  };
}