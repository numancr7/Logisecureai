import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plane, ArrowUpDown } from "lucide-react";
import { useAirFleet } from "@/hooks/useAirFleet";

type SortKey = "callsign" | "geo_altitude" | "velocity" | "origin_country";

export function AirFleetPage() {
  const { flights, totalFlights, timestamp, isLoading, isFetching } = useAirFleet();
  const [sortKey, setSortKey] = useState<SortKey>("geo_altitude");
  const [onlyAirborne, setOnlyAirborne] = useState(true);

  const rows = useMemo(() => {
    let list = onlyAirborne ? flights.filter((f) => !f.on_ground) : flights;
    return [...list].sort((a, b) => {
      const av = a[sortKey] ?? -Infinity;
      const bv = b[sortKey] ?? -Infinity;
      if (typeof av === "string") return String(av).localeCompare(String(bv));
      return (bv as number) - (av as number);
    });
  }, [flights, sortKey, onlyAirborne]);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
            AIR FLEET · LIVE TELEMETRY
          </div>
          <div className="mt-0.5 text-lg font-semibold">
            {totalFlights} aircraft tracked
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOnlyAirborne((v) => !v)}
            className={`rounded-lg border border-white/10 px-3 py-1.5 font-mono text-[10px] tracking-widest ${
              onlyAirborne ? "bg-primary/15 text-primary" : "bg-white/[0.02] text-muted-foreground"
            }`}
          >
            {onlyAirborne ? "AIRBORNE ONLY" : "ALL AIRCRAFT"}
          </button>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
            {isFetching ? "SYNCING…" : "LIVE"}
            {timestamp && ` · ${new Date(timestamp).toLocaleTimeString()}`}
          </span>
        </div>
      </div>

      <div className="glass flex-1 overflow-hidden rounded-2xl">
        <div className="grid grid-cols-[100px_1fr_90px_90px_90px_90px_80px] gap-3 border-b border-white/5 px-5 py-2 font-mono text-[10px] tracking-widest text-muted-foreground">
          <span>CALLSIGN</span>
          <span>ORIGIN COUNTRY</span>
          {(["geo_altitude", "velocity"] as SortKey[]).map((k) => (
            <button
              key={k}
              onClick={() => setSortKey(k)}
              className={`flex items-center gap-1 text-left ${sortKey === k ? "text-primary" : ""}`}
            >
              {k === "geo_altitude" ? "ALT (m)" : "SPD (m/s)"}
              <ArrowUpDown className="h-2.5 w-2.5" />
            </button>
          ))}
          <span>TRACK</span>
          <span>V/S</span>
          <span className="text-right">STATUS</span>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {isLoading && (
            <div className="px-5 py-8 text-center text-xs text-muted-foreground">
              Loading live telemetry…
            </div>
          )}
          {!isLoading && rows.length === 0 && (
            <div className="px-5 py-8 text-center text-xs text-muted-foreground">
              No aircraft matching filter.
            </div>
          )}
          {rows.map((f, i) => (
            <motion.div
              key={f.icao24}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(i * 0.01, 0.3) }}
              className="grid grid-cols-[100px_1fr_90px_90px_90px_90px_80px] items-center gap-3 border-b border-white/5 px-5 py-2.5 text-sm hover:bg-white/[0.03]"
            >
              <div className="flex items-center gap-2 font-mono text-xs">
                <Plane className="h-3 w-3 text-muted-foreground" />
                {f.callsign?.trim() || f.icao24}
              </div>
              <div className="text-xs text-muted-foreground">{f.origin_country}</div>
              <div className="font-mono text-xs tabular-nums">
                {f.geo_altitude != null ? Math.round(f.geo_altitude) : "—"}
              </div>
              <div className="font-mono text-xs tabular-nums">{f.velocity?.toFixed(0)}</div>
              <div className="font-mono text-xs tabular-nums">{f.true_track?.toFixed(0)}°</div>
              <div className="font-mono text-xs tabular-nums">
                {f.vertical_rate != null ? f.vertical_rate.toFixed(1) : "—"}
              </div>
              <div className="flex justify-end">
                <span
                  className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest ${
                    f.on_ground ? "bg-white/10 text-muted-foreground" : "bg-success/15 text-success"
                  }`}
                >
                  {f.on_ground ? "GROUND" : "FLYING"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}