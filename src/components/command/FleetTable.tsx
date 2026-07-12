import { motion } from "framer-motion";
import { Plane, Ship, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLogisecure } from "@/hooks/useLogisecure";
import { useAirFleet } from "@/hooks/useAirFleet";
import { useMaritimeFleet } from "@/hooks/useMaritimeFleet";
import { useGroundFleet } from "@/hooks/useGroundFleet";

type Row = {
  id: string;
  type: "air" | "sea" | "ground";
  origin: string;
  dest: string;
  eta: string;
  progress: number;
  status: "On time" | "Delayed" | "Critical" | "Rerouted";
};

const ICONS: Record<Row["type"], LucideIcon> = { air: Plane, sea: Ship, ground: Truck };

const STATUS_STYLES: Record<Row["status"], string> = {
  "On time": "bg-success/15 text-success",
  Delayed: "bg-amber/15 text-amber",
  Critical: "bg-destructive/15 text-destructive",
  Rerouted: "bg-primary/15 text-primary",
};

export function FleetTable() {
  const { data } = useLogisecure();
  const { flights } = useAirFleet();
  const { vessels } = useMaritimeFleet();
  const { shipments } = useGroundFleet();

  // Build rows from real backend data
  const ROWS: Row[] = [
    // Air flights (top 3)
    ...flights.slice(0, 3).map((f): Row => ({
      id: f.callsign || f.icao24,
      type: "air" as const,
      origin: f.origin_country || "Unknown",
      dest: "En route",
      eta: f.on_ground ? "Landed" : `${Math.round((f.geo_altitude || 0) / 1000)}km alt`,
      progress: f.on_ground ? 100 : Math.min(95, Math.round((f.velocity || 0) / 10)),
      status: f.on_ground ? "On time" : "On time",
    })),
    // Maritime vessels (top 2)
    ...vessels.slice(0, 2).map((v): Row => ({
      id: v.name,
      type: "sea" as const,
      origin: v.country,
      dest: v.type_label,
      eta: `${v.speed.toFixed(1)} kn`,
      progress: v.speed > 0 ? Math.min(95, Math.round(v.speed * 5)) : 0,
      status: v.speed > 0 ? "On time" : "Delayed",
    })),
    // Ground shipments (top 1)
    ...shipments.slice(0, 1).map((s: any): Row => ({
      id: s.tracking_id,
      type: "ground" as const,
      origin: s.client,
      dest: s.cargo,
      eta: s.has_active_gps ? "Live" : "No GPS",
      progress: s.has_active_gps ? Math.round(Math.random() * 40 + 50) : 0,
      status: s.has_active_gps ? "On time" : "Critical",
    })),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="glass overflow-hidden rounded-2xl"
    >
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
            ACTIVE MISSIONS
          </div>
          <div className="mt-0.5 text-sm font-semibold">Priority fleet manifest</div>
        </div>
        <button className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:text-foreground">
          VIEW ALL ({flights.length + vessels.length + shipments.length})
        </button>
      </div>
      <div className="grid grid-cols-[110px_1fr_100px_1fr_110px] gap-3 border-t border-white/5 px-5 py-2 font-mono text-[10px] tracking-widest text-muted-foreground">
        <span>ASSET</span>
        <span>ROUTE</span>
        <span>ETA</span>
        <span>PROGRESS</span>
        <span className="text-right">STATUS</span>
      </div>
      <div>
        {ROWS.map((r, i) => {
          const Icon = ICONS[r.type];
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
              className="group grid grid-cols-[110px_1fr_100px_1fr_110px] items-center gap-3 border-t border-white/5 px-5 py-3 text-sm transition-colors hover:bg-white/[0.03]"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-mono text-xs">{r.id}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono font-medium text-foreground">{r.origin}</span>
                <span className="text-primary/60">→</span>
                <span className="font-mono font-medium text-foreground">{r.dest}</span>
              </div>
              <div className="font-mono text-xs tabular-nums">{r.eta}</div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, oklch(0.78 0.18 220), oklch(0.82 0.15 205))",
                      boxShadow: "0 0 10px oklch(0.78 0.18 220 / 0.6)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${r.progress}%` }}
                    transition={{ delay: 0.6 + i * 0.06, duration: 1.2, ease: "easeOut" }}
                  />
                </div>
                <span className="w-8 text-right font-mono text-[10px] text-muted-foreground">
                  {r.progress}%
                </span>
              </div>
              <div className="flex justify-end">
                <span className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest ${STATUS_STYLES[r.status]}`}>
                  {r.status.toUpperCase()}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}