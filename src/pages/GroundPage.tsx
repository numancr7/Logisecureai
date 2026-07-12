import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, MapPinned, Route as RouteIcon } from "lucide-react";
import { useGroundFleet } from "@/hooks/useGroundFleet";
import { fetchLandRoute, type LandRouteResponse } from "@/lib/logisecure-api";
import { LOGISECURE_LOCATIONS, LOCATION_LABELS } from "@/lib/logisecure-api";

export function GroundPage() {
  const { shipments, totalShipments, withGps, withoutGps, isLoading, isFetching, error } =
    useGroundFleet();

  // ── Route optimizer form ──────────────────────────────────────────
  const [origin, setOrigin] = useState("houston");
  const [destination, setDestination] = useState("roterdam");
  const [routeResult, setRouteResult] = useState<LandRouteResponse | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);

  const runRouteOptimization = async () => {
    setRouteLoading(true);
    setRouteError(null);
    setRouteResult(null);
    try {
      const result = await fetchLandRoute(origin, destination);
      setRouteResult(result);
    } catch (err: any) {
      setRouteError(err.message ?? "Route optimization failed");
    } finally {
      setRouteLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
                GROUND · SHIPMENT TRACKING
              </div>
              <div className="mt-0.5 text-lg font-semibold">
                {totalShipments} shipment{totalShipments === 1 ? "" : "s"} active
              </div>
            </div>
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
              {isFetching ? "SYNCING…" : "LIVE"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <div className="font-mono text-[9px] tracking-widest text-muted-foreground">TOTAL</div>
              <div className="mt-1 font-mono text-lg font-bold text-primary">{totalShipments}</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <div className="font-mono text-[9px] tracking-widest text-muted-foreground">WITH GPS</div>
              <div className="mt-1 font-mono text-lg font-bold text-success">{withGps}</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <div className="font-mono text-[9px] tracking-widest text-muted-foreground">NO GPS</div>
              <div className="mt-1 font-mono text-lg font-bold text-amber">{withoutGps}</div>
            </div>
          </div>

          {/* Shipment list */}
          <div className="glass overflow-hidden rounded-2xl">
            <div className="grid grid-cols-[160px_1fr_1fr_140px_120px] gap-3 border-b border-white/5 px-5 py-2 font-mono text-[10px] tracking-widest text-muted-foreground">
              <span>TRACKING ID</span>
              <span>CLIENT</span>
              <span>CARGO</span>
              <span>STATUS</span>
              <span className="text-right">GPS</span>
            </div>

            <div className="max-h-[45vh] overflow-y-auto">
              {isLoading && (
                <div className="px-5 py-8 text-center text-xs text-muted-foreground">
                  Loading shipments…
                </div>
              )}
              {error && !isLoading && (
                <div className="px-5 py-8 text-center text-xs text-destructive">
                  Ground data unavailable right now.
                </div>
              )}
              {!isLoading && !error && shipments.length === 0 && (
                <div className="px-5 py-8 text-center text-xs text-muted-foreground">
                  No active shipments for this HQ.
                </div>
              )}
              {shipments.map((s: any, i: number) => (
                <motion.div
                  key={s.tracking_id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(i * 0.04, 0.3) }}
                  className="grid grid-cols-[160px_1fr_1fr_140px_120px] items-center gap-3 border-b border-white/5 px-5 py-2.5 text-sm hover:bg-white/[0.03]"
                >
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <Truck className="h-3 w-3 text-muted-foreground" />
                    {s.tracking_id}
                  </div>
                  <div className="text-xs text-muted-foreground">{s.client}</div>
                  <div className="text-xs text-muted-foreground">{s.cargo}</div>
                  <div className="text-xs text-muted-foreground">
                    {s.telemetry?.status_tags ?? s.tracking_type}
                  </div>
                  <div className="flex justify-end">
                    <span
                      className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest ${
                        s.has_active_gps
                          ? "bg-success/15 text-success"
                          : "bg-white/10 text-muted-foreground"
                      }`}
                    >
                      {s.has_active_gps ? "LIVE" : "NO GPS"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Route optimizer */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground">
              <RouteIcon className="h-3.5 w-3.5" />
              LAND ROUTE OPTIMIZATION
            </div>
            <div className="flex flex-wrap items-end gap-3">
              <div>
                <div className="mb-1 font-mono text-[9px] tracking-widest text-muted-foreground">ORIGIN</div>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-xs"
                >
                  {LOGISECURE_LOCATIONS.map((l) => (
                    <option key={l} value={l} className="bg-black">
                      {LOCATION_LABELS[l]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="mb-1 font-mono text-[9px] tracking-widest text-muted-foreground">DESTINATION</div>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-xs"
                >
                  {LOGISECURE_LOCATIONS.map((l) => (
                    <option key={l} value={l} className="bg-black">
                      {LOCATION_LABELS[l]}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={runRouteOptimization}
                disabled={routeLoading}
                className="rounded-lg bg-primary/20 px-4 py-1.5 font-mono text-[10px] tracking-widest text-primary hover:bg-primary/30"
              >
                {routeLoading ? "OPTIMIZING…" : "RUN OPTIMIZATION"}
              </button>
            </div>

            {routeError && (
              <div className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {routeError}
              </div>
            )}

            {routeResult && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground">
                  <MapPinned className="h-3 w-3" />
                  {routeResult.data.total_shipments} shipments on this corridor
                </div>
                {routeResult.data.active_shipments.map((s: any) => (
                  <div
                    key={s.tracking_id}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs"
                  >
                    <span className="font-mono">{s.tracking_id}</span>
                    <span className="text-muted-foreground">{s.cargo}</span>
                    <span
                      className={`rounded-md px-2 py-0.5 font-mono text-[9px] font-bold ${
                        s.has_active_gps ? "bg-success/15 text-success" : "bg-white/10 text-muted-foreground"
                      }`}
                    >
                      {s.has_active_gps ? "GPS" : "NO GPS"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
    </div>
  );
}