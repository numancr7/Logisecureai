import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Waves } from "lucide-react";
import { useEffect, useState } from "react";
import { useAgentStatus } from "@/hooks/useAgentStatus";
import { useCountUp } from "./useCountUp";

const RECOMMENDATION =
  "Reroute 4 vessels via the Cape of Good Hope to bypass the emerging Suez congestion. Projected ETA delta: −38 hours across the fleet. Fuel cost impact: +6.2%. Risk profile downgraded from HIGH to LOW.";

export function AIPanel() {
  const [typed, setTyped] = useState("");
  const { data: status, isLoading, error } = useAgentStatus();
  const confidence = useCountUp(
    status?.status === "ready" ? Math.round((status.confidence_threshold ?? 0.7) * 100) : 94,
    1400,
    400,
  );

  const agentReady = !error && status?.status === "ready";
  const statusBadge = error
    ? "OFFLINE"
    : isLoading
      ? "SYNC"
      : agentReady
        ? "READY"
        : "STANDBY";

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(RECOMMENDATION.slice(0, i));
      if (i >= RECOMMENDATION.length) clearInterval(id);
    }, 14);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass relative overflow-hidden rounded-2xl p-5"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.22 300 / 0.35), transparent 65%)" }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent">
            <Sparkles className="h-4 w-4 text-primary-foreground" strokeWidth={2.4} />
            <motion.span
              className="absolute inset-0 rounded-xl"
              style={{ boxShadow: "0 0 20px oklch(0.78 0.18 220 / 0.7)" }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">LogiSecure Copilot</span>
              <span
                className={`rounded-md px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-widest ${
                  agentReady
                    ? "bg-success/15 text-success"
                    : error
                      ? "bg-danger/15 text-destructive"
                      : "bg-amber/15 text-amber"
                }`}
              >
                {statusBadge}
              </span>
            </div>
            <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
              {status?.model
                ? `${status.provider} · ${status.model.split("/").pop()}`
                : "AUTONOMOUS RECOMMENDATION · 14:32:07 UTC"}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
            CONFIDENCE
          </div>
          <div className="font-mono text-2xl font-bold tabular-nums text-primary">
            {confidence.toFixed(0)}%
          </div>
        </div>
      </div>

      <div className="relative mt-4 rounded-xl border border-white/5 bg-black/20 p-4 text-sm leading-relaxed">
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground">
          <Waves className="h-3 w-3" />
          MARITIME · CORRIDOR OPTIMIZATION
        </div>
        <span className="text-foreground/90">{typed}</span>
        <AnimatePresence>
          {typed.length < RECOMMENDATION.length && (
            <motion.span
              className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-primary"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "ETA GAIN", value: "-38h", tone: "text-success" },
          { label: "COST", value: "+6.2%", tone: "text-amber" },
          { label: "RISK", value: "LOW", tone: "text-primary" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <div className="font-mono text-[9px] tracking-widest text-muted-foreground">
              {s.label}
            </div>
            <div className={`mt-1 font-mono text-lg font-bold ${s.tone}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          to="/ai-copilot"
          className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, oklch(0.78 0.18 220), oklch(0.72 0.22 200))" }}
        >
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
          <span className="relative">Open AI Copilot</span>
          <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <button className="rounded-xl border border-white/5 bg-white/[0.03] px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground">
          Simulate
        </button>
      </div>
    </motion.div>
  );
}
