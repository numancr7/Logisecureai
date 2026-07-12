import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid,
  Map,
  Plane,
  Ship,
  Truck,
  Satellite,
  Sparkles,
  ShieldAlert,
  Database,
  Settings,
  Globe2,
  X,
  Menu,
  Search,
} from "lucide-react";
import { useState } from "react";

const NAV = [
  { icon: LayoutGrid, label: "Overview", badge: null, path: "/" },
  { icon: Map, label: "Live Map", badge: "LIVE", path: "/live-map" },
  { icon: Plane, label: "Air Fleet", badge: null, path: "/air-fleet" },
  { icon: Ship, label: "Maritime", badge: null, path: "/maritime" },
  { icon: Truck, label: "Ground", badge: null, path: "/ground" },
  { icon: Satellite, label: "Telemetry", badge: null, path: "/telemetry" },
  { icon: ShieldAlert, label: "Risk & Alerts", badge: null, path: "/threats" },
  { icon: Sparkles, label: "AI Copilot", badge: null, path: "/ai-copilot" },
  { icon: Database, label: "Data Streams", badge: null, path: "/" },
];

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <aside
        className={`glass fixed lg:sticky lg:top-0 z-50 lg:z-auto h-full w-[240px] shrink-0 flex-col rounded-2xl p-4 transition-transform duration-300 lg:flex ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:translate-x-0`}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-lg hover:bg-white/10"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      {/* Search in sidebar */}
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search assets…"
          className="w-full bg-transparent text-sm placeholder:text-muted-foreground/70 focus:outline-none"
        />
      </div>

      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent">
          <Globe2 className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          <motion.span
            className="absolute inset-0 rounded-xl"
            style={{ boxShadow: "0 0 24px oklch(0.78 0.18 220 / 0.7)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold tracking-tight">LogiSecure</div>
          <div className="truncate font-mono text-[10px] tracking-widest text-muted-foreground">
            COMMAND · v4.2
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === currentPath;
          return (
            <Link
              key={item.label}
              to={item.path}
              className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all hover:bg-white/5"
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl border border-primary/30 bg-primary/10"
                  style={{ boxShadow: "inset 0 0 20px oklch(0.78 0.18 220 / 0.15)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon
                className={`relative h-4 w-4 shrink-0 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              <span
                className={`relative flex-1 truncate text-left ${
                  isActive ? "font-medium text-foreground" : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {item.label}
              </span>
              {item.badge && (
                <span
                  className={`relative rounded-md px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider ${
                    item.badge === "LIVE"
                      ? "bg-success/20 text-success"
                      : "bg-danger/20 text-destructive"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          SYSTEM NOMINAL
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Uptime <span className="font-mono text-foreground">99.998%</span>
        </div>
      </div>

      <button className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
        <Settings className="h-4 w-4" />
        Settings
      </button>
      </aside>
    </>
  );
}
