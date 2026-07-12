import { useQueries, useQuery } from "@tanstack/react-query";
import { useLogisecure } from "@/hooks/useLogisecure";
import { fetchLandByHq, fetchLandTrackById } from "@/lib/logisecure-api";

export function useLandVehicles() {
  const { location } = useLogisecure();

  const land = useQuery({
    queryKey: ["land-list", location],
    queryFn: ({ signal }) => fetchLandByHq(location, signal),
    refetchInterval: 30_000,
  });

  const shipments = land.data?.data?.active_shipments ?? [];

  const positions = useQueries({
    queries: shipments.map((s) => ({
      queryKey: ["land-track", s.tracking_id],
      queryFn: ({ signal }: { signal: AbortSignal }) => fetchLandTrackById(s.tracking_id, signal),
      enabled: shipments.length > 0,
      refetchInterval: 20_000,
    })),
  });

  return positions
    .map((q) => q.data)
    .filter((d): d is NonNullable<typeof d> => !!d?.telemetry?.current_position);
}