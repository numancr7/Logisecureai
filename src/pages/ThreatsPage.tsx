import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, AlertTriangle, Clock, MapPin, Filter, X } from "lucide-react";
import { useLogisecure } from "@/hooks/useLogisecure";

type SeverityFilter = "all" | "critical" | "high" | "medium" | "low";

export function ThreatsPage() {
  const { data, location } = useLogisecure();
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);

  const events = data?.geopolitical_threats?.events ?? [];
  const summary = data?.geopolitical_threats?.summary;

  const filteredEvents = useMemo(() => {
    if (severityFilter === "all") return events;
    return events.filter((e) => {
      const severity = (e.severity || e.risk_level || "").toLowerCase();
      return severity === severityFilter;
    });
  }, [events, severityFilter]);

  const severityCounts = useMemo(() => {
    const counts = { critical: 0, high: 0, medium: 0, low: 0 };
    events.forEach((e) => {
      const severity = (e.severity || e.risk_level || "").toLowerCase();
      if (severity in counts) counts[severity as keyof typeof counts]++;
    });
    return counts;
  }, [events]);

  const getSeverityColor = (severity: string) => {
    const s = severity.toLowerCase();
    switch (s) {
      case "critical":
        return "text-destructive bg-destructive/15 border-destructive/30";
      case "high":
        return "text-amber bg-amber/15 border-amber/30";
      case "medium":
        return "text-primary bg-primary/15 border-primary/30";
      case "low":
        return "text-success bg-success/15 border-success/30";
      default:
        return "text-muted-foreground bg-white/5 border-white/10";
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
            RISK & ALERTS · THREAT INTELLIGENCE
          </div>
          <div className="mt-0.5 text-lg font-semibold">
            {events.length} active threat{events.length !== 1 ? "s" : ""} · {location.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="glass rounded-xl border border-destructive/30 bg-destructive/10 p-4">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-destructive">
            <AlertTriangle className="h-3.5 w-3.5" /> CRITICAL
          </div>
          <div className="mt-2 font-mono text-2xl font-bold text-destructive">
            {severityCounts.critical}
          </div>
        </div>
        <div className="glass rounded-xl border border-amber/30 bg-amber/10 p-4">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-amber">
            <ShieldAlert className="h-3.5 w-3.5" /> HIGH
          </div>
          <div className="mt-2 font-mono text-2xl font-bold text-amber">
            {severityCounts.high}
          </div>
        </div>
        <div className="glass rounded-xl border border-primary/30 bg-primary/10 p-4">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-primary">
            <ShieldAlert className="h-3.5 w-3.5" /> MEDIUM
          </div>
          <div className="mt-2 font-mono text-2xl font-bold text-primary">
            {severityCounts.medium}
          </div>
        </div>
        <div className="glass rounded-xl border border-success/30 bg-success/10 p-4">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-success">
            <ShieldAlert className="h-3.5 w-3.5" /> LOW
          </div>
          <div className="mt-2 font-mono text-2xl font-bold text-success">
            {severityCounts.low}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <div className="flex gap-2">
          {(["all", "critical", "high", "medium", "low"] as SeverityFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setSeverityFilter(filter)}
              className={`rounded-lg border px-3 py-1.5 font-mono text-[10px] tracking-widest transition-colors ${
                severityFilter === filter
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/20"
              }`}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Threats List */}
      <div className="glass flex-1 overflow-hidden rounded-2xl">
        {filteredEvents.length === 0 ? (
          <div className="flex h-full items-center justify-center py-12 text-center">
            <div>
              <ShieldAlert className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <div className="mt-4 text-sm text-muted-foreground">
                No threats matching the current filter
              </div>
            </div>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-white/5 p-4 hover:bg-white/[0.02]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`rounded-md border px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider ${getSeverityColor(
                          event.severity || event.risk_level || "unknown"
                        )}`}
                      >
                        {(event.severity || event.risk_level || "UNKNOWN").toUpperCase()}
                      </span>
                      {event.risk_score && (
                        <span className="font-mono text-[10px] text-muted-foreground">
                          Risk Score: {event.risk_score}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold">{event.title || event.event}</h3>
                    {event.event && event.title && (
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {event.event}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-4 text-[10px] text-muted-foreground">
                      {(event.lat !== undefined || event.lng !== undefined) && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.lat?.toFixed(2)}, {event.lng?.toFixed(2)}
                        </div>
                      )}
                      {event.published && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(event.published).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                  {selectedThreat === String(index) && (
                    <button
                      onClick={() => setSelectedThreat(null)}
                      className="grid h-6 w-6 shrink-0 place-items-center rounded hover:bg-white/10"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Footer */}
      {summary && (
        <div className="glass rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
            THREAT SUMMARY
          </div>
          <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Events: </span>
              <span className="font-mono font-semibold">
                {summary.total_events || summary.total_alerts || events.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
