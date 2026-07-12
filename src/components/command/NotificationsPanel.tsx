import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ExternalLink, Clock, AlertTriangle, X, Ship, Truck, Plane, AlertCircle } from "lucide-react";
import { useLogisecure } from "@/hooks/useLogisecure";
import type { ThreatEvent } from "@/lib/logisecure-api";

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const { data } = useLogisecure();
  const threatEvents = data?.geopolitical_threats?.events ?? [];
  const threatCount = data?.geopolitical_threats?.summary?.total_alerts ?? 0;

  // Filter logistics/transport related threats
  const logisticsAlerts = threatEvents.filter(event => {
    const text = (event.event + " " + (event.title || "")).toLowerCase();
    return text.includes("port") || text.includes("ship") || text.includes("maritime") || 
           text.includes("truck") || text.includes("road") || text.includes("land") ||
           text.includes("air") || text.includes("flight") || text.includes("cargo") ||
           text.includes("logistics") || text.includes("supply") || text.includes("transport");
  });

  // Sample logistics notifications if no real data
  const sampleAlerts: ThreatEvent[] = [
    {
      event: "Port congestion at Rotterdam due to labor strike",
      severity: "HIGH",
      published: new Date(Date.now() - 3600000).toISOString(),
      lat: 51.9244,
      lng: 4.4777,
      link: "#",
      title: "Port Congestion Alert",
      risk_score: 75,
      risk_level: "HIGH",
    },
    {
      event: "Weather advisory for North Sea shipping routes",
      severity: "MEDIUM",
      published: new Date(Date.now() - 7200000).toISOString(),
      lat: 54.0,
      lng: 4.0,
      link: "#",
      title: "Weather Advisory",
      risk_score: 50,
      risk_level: "MEDIUM",
    },
    {
      event: "Customs delay reported at Hamburg port",
      severity: "LOW",
      published: new Date(Date.now() - 10800000).toISOString(),
      lat: 53.5511,
      lng: 9.9937,
      link: "#",
      title: "Customs Delay",
      risk_score: 30,
      risk_level: "LOW",
    },
  ];

  const displayAlerts = logisticsAlerts.length > 0 ? logisticsAlerts : sampleAlerts.slice(0, 5);

  const getSeverityColor = (severity?: string) => {
    switch (severity?.toUpperCase()) {
      case "CRITICAL": return "text-destructive bg-destructive/20 border-destructive/40";
      case "HIGH": return "text-amber bg-amber/20 border-amber/40";
      case "MEDIUM": return "text-amber bg-amber/15 border-amber/30";
      case "LOW": return "text-cyan bg-cyan/15 border-cyan/30";
      default: return "text-muted-foreground bg-white/[0.02] border-white/10";
    }
  };

  const getSeverityBadgeClass = (severity?: string) => {
    switch (severity?.toUpperCase()) {
      case "CRITICAL": return "bg-destructive/20 text-destructive border-destructive/40";
      case "HIGH": return "bg-amber/20 text-amber border-amber/40";
      case "MEDIUM": return "bg-amber/15 text-amber border-amber/30";
      case "LOW": return "bg-cyan/15 text-cyan border-cyan/30";
      default: return "bg-white/[0.02] text-muted-foreground border-white/10";
    }
  };

  const getAlertIcon = (event: string) => {
    const text = event.toLowerCase();
    if (text.includes("port") || text.includes("ship") || text.includes("maritime")) return Ship;
    if (text.includes("truck") || text.includes("road") || text.includes("land")) return Truck;
    if (text.includes("air") || text.includes("flight")) return Plane;
    return AlertCircle;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, x: 300, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-4 top-16 z-50 w-full max-w-sm rounded-2xl shadow-2xl border border-white/10"
            style={{ backgroundColor: '#1e1b4b' }}
          >
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 bg-slate-800">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground">Logistics Alerts</span>
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary">
                  {displayAlerts.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="max-h-[450px] overflow-y-auto p-3 space-y-2">
              {displayAlerts.map((alert, index) => {
                const Icon = getAlertIcon(alert.event);
                const severityClass = getSeverityColor(alert.severity);
                const timeAgo = alert.published ? new Date(alert.published).toLocaleString() : "Just now";
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`rounded-xl border p-3 transition-all hover:scale-[1.02] ${severityClass}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.05]`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold leading-tight text-foreground">
                            {alert.title || alert.event}
                          </h4>
                          <span className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase ${getSeverityBadgeClass(alert.severity)}`}>
                            {alert.severity || "INFO"}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {alert.event}
                        </p>
                        <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{timeAgo}</span>
                          {alert.risk_score && (
                            <>
                              <span>·</span>
                              <span>Risk: {alert.risk_score}%</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {displayAlerts.length === 0 && (
                <div className="py-8 text-center">
                  <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">No active logistics alerts</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
