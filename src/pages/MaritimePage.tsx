import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Ship, ArrowUpDown, Search, X } from "lucide-react";
import { useMaritimeFleet } from "@/hooks/useMaritimeFleet";
import { fetchMaritimeByMmsi, type VesselByMmsi } from "@/lib/logisecure-api";

type SortKey = "name" | "speed" | "type_label" | "country";

export function MaritimePage() {
  const { vessels, totalVessels, byType, timestamp, source, isLoading, isFetching, error } =
    useMaritimeFleet();
  const [sortKey, setSortKey] = useState<SortKey>("speed");
  const [onlyMoving, setOnlyMoving] = useState(false);

  // ── MMSI search state ──────────────────────────────────────────────
  const [mmsiQuery, setMmsiQuery] = useState("");
  const [mmsiResult, setMmsiResult] = useState<VesselByMmsi | null>(null);
  const [mmsiSearching, setMmsiSearching] = useState(false);
  const [mmsiError, setMmsiError] = useState<string | null>(null);

  const searchMmsi = async () => {
    if (!mmsiQuery.trim()) return;
    setMmsiSearching(true);
    setMmsiError(null);
    setMmsiResult(null);
    try {
      const result = await fetchMaritimeByMmsi(mmsiQuery.trim());
      setMmsiResult(result);
    } catch (err: any) {
      setMmsiError(err.message ?? "Vessel not found");
    } finally {
      setMmsiSearching(false);
    }
  };

  const rows = useMemo(() => {
    let list = onlyMoving ? vessels.filter((v) => v.speed > 0) : vessels;
    return [...list].sort((a, b) => {
      const av = (a as any)[sortKey] ?? -Infinity;
      const bv = (b as any)[sortKey] ?? -Infinity;
      if (typeof av === "string") return String(av).localeCompare(String(bv));
      return (bv as number) - (av as number);
    });
  }, [vessels, sortKey, onlyMoving]);

  return (
    <div className="flex h-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
                MARITIME · LIVE FLEET
              </div>
              <div className="mt-0.5 text-lg font-semibold">
                {totalVessels} vessel{totalVessels === 1 ? "" : "s"} tracked
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* MMSI Search */}
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5">
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <input
                  value={mmsiQuery}
                  onChange={(e) => setMmsiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && searchMmsi()}
                  placeholder="Search MMSI…"
                  className="w-32 bg-transparent font-mono text-xs focus:outline-none"
                />
              </div>
              <button
                onClick={searchMmsi}
                disabled={mmsiSearching}
                className="rounded-lg border border-primary/30 bg-primary/15 px-3 py-1.5 font-mono text-[10px] tracking-widest text-primary"
              >
                {mmsiSearching ? "…" : "FIND"}
              </button>

              <button
                onClick={() => setOnlyMoving((v) => !v)}
                className={`rounded-lg border border-white/10 px-3 py-1.5 font-mono text-[10px] tracking-widest ${
                  onlyMoving ? "bg-primary/15 text-primary" : "bg-white/[0.02] text-muted-foreground"
                }`}
              >
                {onlyMoving ? "MOVING ONLY" : "ALL VESSELS"}
              </button>
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                {isFetching ? "SYNCING…" : "LIVE"}
                {timestamp && ` · ${new Date(timestamp).toLocaleTimeString()}`}
                {source?.includes("mock") && " · MOCK DATA"}
              </span>
            </div>
          </div>

          {/* MMSI search result / error */}
          {mmsiError && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {mmsiError}
            </div>
          )}

          {mmsiResult && (
            <div className="glass relative rounded-2xl p-4">
              <button
                onClick={() => setMmsiResult(null)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="font-mono text-[10px] tracking-widest text-primary">MMSI RESULT</div>
              <div className="mt-2 text-lg font-semibold">{mmsiResult.vessel.name}</div>
              <div className="mt-1 grid grid-cols-2 gap-2 text-sm text-muted-foreground sm:grid-cols-4">
                <div>MMSI: {mmsiResult.vessel.mmsi}</div>
                <div>Type: {mmsiResult.vessel.type_label}</div>
                <div>Speed: {mmsiResult.vessel.speed} kn</div>
                <div>Found in: {mmsiResult.found_in}</div>
              </div>
            </div>
          )}

          {byType && (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {Object.entries(byType)
                .filter(([, count]) => (count as number) > 0)
                .map(([type, count]) => (
                  <div key={type} className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <div className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
                      {type}
                    </div>
                    <div className="mt-1 font-mono text-lg font-bold text-primary">{String(count)}</div>
                  </div>
                ))}
            </div>
          )}

          <div className="glass flex-1 overflow-hidden rounded-2xl">
            <div className="grid grid-cols-[1fr_90px_120px_100px_90px_90px] gap-3 border-b border-white/5 px-5 py-2 font-mono text-[10px] tracking-widest text-muted-foreground">
              <button
                onClick={() => setSortKey("name")}
                className={`flex items-center gap-1 text-left ${sortKey === "name" ? "text-primary" : ""}`}
              >
                NAME <ArrowUpDown className="h-2.5 w-2.5" />
              </button>
              <span>MMSI</span>
              <button
                onClick={() => setSortKey("type_label")}
                className={`flex items-center gap-1 text-left ${sortKey === "type_label" ? "text-primary" : ""}`}
              >
                TYPE <ArrowUpDown className="h-2.5 w-2.5" />
              </button>
              <button
                onClick={() => setSortKey("country")}
                className={`flex items-center gap-1 text-left ${sortKey === "country" ? "text-primary" : ""}`}
              >
                COUNTRY <ArrowUpDown className="h-2.5 w-2.5" />
              </button>
              <button
                onClick={() => setSortKey("speed")}
                className={`flex items-center gap-1 text-left ${sortKey === "speed" ? "text-primary" : ""}`}
              >
                SPEED (kn) <ArrowUpDown className="h-2.5 w-2.5" />
              </button>
              <span className="text-right">COURSE</span>
            </div>

            <div className="max-h-[65vh] overflow-y-auto">
              {isLoading && (
                <div className="px-5 py-8 text-center text-xs text-muted-foreground">
                  Loading live vessel data…
                </div>
              )}
              {error && !isLoading && (
                <div className="px-5 py-8 text-center text-xs text-destructive">
                  Maritime data unavailable right now.
                </div>
              )}
              {!isLoading && !error && rows.length === 0 && (
                <div className="px-5 py-8 text-center text-xs text-muted-foreground">
                  No vessels matching filter.
                </div>
              )}
              {rows.map((v, i) => (
                <motion.div
                  key={v.mmsi}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(i * 0.02, 0.3) }}
                  className="grid grid-cols-[1fr_90px_120px_100px_90px_90px] items-center gap-3 border-b border-white/5 px-5 py-2.5 text-sm hover:bg-white/[0.03]"
                >
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <Ship className="h-3 w-3 text-muted-foreground" />
                    {v.name}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">{v.mmsi}</div>
                  <div className="text-xs text-muted-foreground">{v.type_label}</div>
                  <div className="text-xs text-muted-foreground">{v.country}</div>
                  <div className="font-mono text-xs tabular-nums">{v.speed.toFixed(1)}</div>
                  <div className="flex justify-end font-mono text-xs tabular-nums text-muted-foreground">
                    {v.course}°
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
    </div>
  );
}