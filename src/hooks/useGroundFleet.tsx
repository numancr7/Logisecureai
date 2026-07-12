import { useQuery, useQueries } from "@tanstack/react-query";
import { useLogisecure } from "@/hooks/useLogisecure";
import { fetchLandByHq, fetchLandTrackById } from "@/lib/logisecure-api";
import { getCachedData, setCachedData } from "@/lib/mock-data";

export function useGroundFleet() {
  const { location } = useLogisecure();

  const land = useQuery({
    queryKey: ["ground-fleet", location],
    queryFn: async ({ signal }) => {
      const data = await fetchLandByHq(location, signal);
      setCachedData(`ground.${location}`, data);
      return data;
    },
    refetchInterval: 20_000,
    refetchOnWindowFocus: false,
    initialData: () => getCachedData(`ground.${location}`) || undefined,
  });

  const shipments = (land.data?.data as any)?.active_shipments ?? [];

  const tracks = useQueries({
    queries: shipments.map((s: any) => ({
      queryKey: ["ground-track", s.tracking_id],
      queryFn: ({ signal }: { signal: AbortSignal }) => fetchLandTrackById(s.tracking_id, signal),
      enabled: !!s.has_active_gps,
      refetchInterval: 15_000,
    })),
  });

  // Har shipment ke saath uski live position (agar mile) merge karo
  const shipmentsWithTracking = shipments.map((s: any, i: number) => ({
    ...s,
    telemetry: s.has_active_gps ? (tracks[i]?.data as any)?.telemetry : undefined,
  }));

  return {
    shipments: shipmentsWithTracking,
    totalShipments: (land.data?.data as any)?.total_shipments ?? 0,
    withGps: (land.data?.data as any)?.shipments_with_gps ?? 0,
    withoutGps: (land.data?.data as any)?.shipments_without_gps ?? 0,
    isLoading: land.isLoading,
    isFetching: land.isFetching,
    error: land.error,
  };
}