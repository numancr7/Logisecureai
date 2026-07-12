import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLogisecure } from "@/hooks/useLogisecure";
import { useAirFleet } from "@/hooks/useAirFleet";
import { useMaritimeFleet } from "@/hooks/useMaritimeFleet";
import { useGroundFleet } from "@/hooks/useGroundFleet";
import { useMemo } from "react";

function TooltipCard({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-lg px-3 py-2 text-xs">
      <div className="mb-1 font-mono text-[10px] tracking-widest text-muted-foreground">
        {label}
      </div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.dataKey}</span>
          <span className="ml-auto font-mono font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export function ThroughputChart() {
  const { flights } = useAirFleet();
  const { vessels } = useMaritimeFleet();
  const { shipments } = useGroundFleet();

  const THROUGHPUT = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      h: `${i.toString().padStart(2, "0")}:00`,
      air: Math.max(0, flights.length + Math.round(Math.sin(i * 0.5) * 10 + Math.random() * 5)),
      sea: Math.max(0, vessels.length + Math.round(Math.cos(i * 0.4) * 8 + Math.random() * 4)),
      ground: Math.max(0, shipments.length + Math.round(Math.sin(i * 0.3 + 1) * 12 + Math.random() * 6)),
    }));
  }, [flights.length, vessels.length, shipments.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="glass rounded-2xl p-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
            NETWORK THROUGHPUT · 24H
          </div>
          <div className="mt-1 text-sm font-semibold">Shipments per hour</div>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          {[
            { c: "oklch(0.78 0.18 220)", l: "Air" },
            { c: "oklch(0.82 0.15 205)", l: "Sea" },
            { c: "oklch(0.82 0.16 75)", l: "Ground" },
          ].map((x) => (
            <div key={x.l} className="flex items-center gap-1 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: x.c }} />
              {x.l}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={THROUGHPUT} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gAir" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.18 220)" stopOpacity={0.55} />
                <stop offset="100%" stopColor="oklch(0.78 0.18 220)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gSea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.82 0.15 205)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="oklch(0.82 0.15 205)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gGround" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.82 0.16 75)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="oklch(0.82 0.16 75)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
            <XAxis dataKey="h" tick={{ fill: "oklch(0.68 0.02 250)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} interval={3} />
            <YAxis tick={{ fill: "oklch(0.68 0.02 250)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
            <Tooltip content={<TooltipCard />} cursor={{ stroke: "oklch(0.78 0.18 220 / 0.3)" }} />
            <Area type="monotone" dataKey="ground" stroke="oklch(0.82 0.16 75)" strokeWidth={1.5} fill="url(#gGround)" isAnimationActive animationDuration={1400} />
            <Area type="monotone" dataKey="air" stroke="oklch(0.78 0.18 220)" strokeWidth={1.8} fill="url(#gAir)" isAnimationActive animationDuration={1400} />
            <Area type="monotone" dataKey="sea" stroke="oklch(0.82 0.15 205)" strokeWidth={1.5} fill="url(#gSea)" isAnimationActive animationDuration={1400} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export function RegionChart() {
  const { location } = useLogisecure();
  const { flights } = useAirFleet();
  const { vessels } = useMaritimeFleet();
  const { shipments } = useGroundFleet();

  const REGIONS = useMemo(() => {
    const baseScore = Math.min(100, 70 + Math.round((flights.length + vessels.length + shipments.length) / 5));
    return [
      { r: "NA", v: location === "houston" ? 95 : baseScore + Math.round(Math.random() * 10) },
      { r: "EU", v: location === "rotterdam" ? 95 : baseScore + Math.round(Math.random() * 10) },
      { r: "APAC", v: location === "shanghai" ? 95 : baseScore + Math.round(Math.random() * 10) },
      { r: "LATAM", v: location === "sao_paulo" ? 95 : baseScore + Math.round(Math.random() * 10) },
      { r: "MEA", v: baseScore - 5 + Math.round(Math.random() * 8) },
      { r: "OCE", v: baseScore - 3 + Math.round(Math.random() * 8) },
    ];
  }, [location, flights.length, vessels.length, shipments.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-2xl p-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
            REGIONAL HEALTH INDEX
          </div>
          <div className="mt-1 text-sm font-semibold">On-time performance by region</div>
        </div>
      </div>
      <div className="mt-3 h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={REGIONS} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barSize={22}>
            <defs>
              <linearGradient id="gBar" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.82 0.15 205)" stopOpacity={0.95} />
                <stop offset="100%" stopColor="oklch(0.55 0.2 235)" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
            <XAxis dataKey="r" tick={{ fill: "oklch(0.68 0.02 250)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "oklch(0.68 0.02 250)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip content={<TooltipCard />} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
            <Bar dataKey="v" fill="url(#gBar)" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={1200} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}