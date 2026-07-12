import { motion } from "framer-motion";
import { Thermometer, Wind, Cloud, Plane, Ship, Truck } from "lucide-react";
import { useLogisecure } from "@/hooks/useLogisecure";
import { useAirFleet } from "@/hooks/useAirFleet";
import { useMaritimeFleet } from "@/hooks/useMaritimeFleet";
import { useGroundFleet } from "@/hooks/useGroundFleet";

export function TelemetryPage() {
  const { data, location } = useLogisecure();
  const { flights, totalFlights } = useAirFleet();
  const { vessels, totalVessels } = useMaritimeFleet();
  const { totalShipments, withGps, withoutGps } = useGroundFleet();

  const weather = data?.weather_telemetry;
  const weatherOk = weather?.status === "success";

  const avgAltitude =
    flights.length > 0
      ? Math.round(
          flights.reduce((sum, f) => sum + (f.geo_altitude ?? 0), 0) / flights.length
        )
      : null;

  const avgVesselSpeed =
    vessels.length > 0
      ? (vessels.reduce((sum: number, v: any) => sum + v.speed, 0) / vessels.length).toFixed(1)
      : null;

  const gpsCoverage =
    totalShipments > 0 ? Math.round((withGps / totalShipments) * 100) : null;

  return (
    <div className="flex h-full flex-col gap-4">
          <div>
            <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
              TELEMETRY · ENVIRONMENTAL &amp; SYSTEM READOUTS
            </div>
            <div className="mt-0.5 text-lg font-semibold">
              Live conditions · {location.toUpperCase()}
            </div>
          </div>

          {/* Weather */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground">
              <Cloud className="h-3.5 w-3.5" />
              WEATHER TELEMETRY
            </div>

            {!weatherOk && (
              <div className="text-xs text-destructive">
                Weather data unavailable for this HQ right now.
              </div>
            )}

            {weatherOk && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-muted-foreground">
                    <Thermometer className="h-3 w-3" /> TEMPERATURE
                  </div>
                  <div className="mt-1 font-mono text-2xl font-bold text-primary">
                    {weather.temperature}
                    {weather.temperature_unit}
                  </div>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-muted-foreground">
                    <Wind className="h-3 w-3" /> WIND
                  </div>
                  <div className="mt-1 font-mono text-2xl font-bold text-primary">
                    {weather.wind_speed} {weather.wind_speed_unit}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                    {weather.wind_direction}° direction
                  </div>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="font-mono text-[9px] tracking-widest text-muted-foreground">
                    CONDITION
                  </div>
                  <div className="mt-1 text-lg font-semibold">{weather.condition}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                    {weather.is_day ? "Daytime" : "Nighttime"}
                  </div>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="font-mono text-[9px] tracking-widest text-muted-foreground">
                    SOURCE
                  </div>
                  <div className="mt-1 text-sm font-semibold">{weather.source}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                    {weather.timezone}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fleet telemetry aggregates */}
          <div className="grid gap-3 sm:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-5"
            >
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground">
                <Plane className="h-3.5 w-3.5" /> AIR
              </div>
              <div className="font-mono text-2xl font-bold text-primary">{totalFlights}</div>
              <div className="mt-1 text-xs text-muted-foreground">aircraft tracked</div>
              {avgAltitude != null && (
                <div className="mt-2 font-mono text-[10px] text-muted-foreground">
                  avg altitude: {avgAltitude}m
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="glass rounded-2xl p-5"
            >
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground">
                <Ship className="h-3.5 w-3.5" /> SEA
              </div>
              <div className="font-mono text-2xl font-bold text-primary">{totalVessels}</div>
              <div className="mt-1 text-xs text-muted-foreground">vessels tracked</div>
              {avgVesselSpeed != null && (
                <div className="mt-2 font-mono text-[10px] text-muted-foreground">
                  avg speed: {avgVesselSpeed} kn
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-5"
            >
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground">
                <Truck className="h-3.5 w-3.5" /> GROUND
              </div>
              <div className="font-mono text-2xl font-bold text-primary">{totalShipments}</div>
              <div className="mt-1 text-xs text-muted-foreground">shipments active</div>
              {gpsCoverage != null && (
                <div className="mt-2 font-mono text-[10px] text-muted-foreground">
                  GPS coverage: {gpsCoverage}%
                </div>
              )}
            </motion.div>
          </div>
    </div>
  );
}