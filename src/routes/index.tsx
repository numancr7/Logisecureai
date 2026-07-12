import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AnimatedBackground } from "@/components/command/AnimatedBackground";
import { Sidebar } from "@/components/command/Sidebar";
import { TopBar } from "@/components/command/TopBar";
import { KPIGrid } from "@/components/command/KPIGrid";
import { CityMap2D } from "@/components/command/CityMap2D";
import { AIPanel } from "@/components/command/AIPanel";
import { GlobalAlerts } from "@/components/command/GlobalAlerts";
import { ThroughputChart, RegionChart } from "@/components/command/Charts";
import { FleetTable } from "@/components/command/FleetTable";
import { Notifications } from "@/components/command/Notifications";
import { LoadingScreen } from "@/components/command/LoadingScreen";
import { WeatherWidget } from "@/components/command/WeatherWidget";
import { LogisecureProvider } from "@/hooks/useLogisecure";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <LogisecureProvider>
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <AnimatePresence>
        {!ready && <LoadingScreen key="loader" onDone={() => setReady(true)} />}
      </AnimatePresence>

      {ready && <Notifications />}

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 12 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex min-h-screen w-full max-w-[1800px] gap-3 p-3 lg:p-4"
      >
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Hero: KPIs */}
          <section aria-label="Fleet KPIs">
            <div className="mb-2 flex items-end justify-between px-1">
              <div>
                <div className="font-mono text-[10px] tracking-widest text-primary/80">
                  LOGISECURE · COMMAND OVERVIEW
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-gradient sm:text-3xl">
                  Global Logistics · Live Intelligence
                </h1>
              </div>
              <div className="hidden items-center gap-2 md:flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  ALL SYSTEMS OPERATIONAL
                </span>
              </div>
            </div>
            <KPIGrid />
          </section>

          {/* Map + AI */}
          <section className="grid gap-3 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_320px]" aria-label="Operations map">
            <div className="h-[450px] sm:h-[550px] lg:h-[650px] xl:h-[750px]">
              <CityMap2D />
            </div>
            <div className="flex flex-col gap-3">
              <AIPanel />
              <WeatherWidget />
              <GlobalAlerts />
              <RegionChart />
            </div>
          </section>

          {/* Charts + table */}
          <section className="grid gap-3 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr]">
            <ThroughputChart />
            <FleetTable />
          </section>

          <footer className="mt-2 flex items-center justify-between px-1 pb-4 font-mono text-[10px] tracking-widest text-muted-foreground">
            <span>LOGISECURE · v4.2.108 · secure operations bus</span>
            <span>© 2026 LOGISECURE OPS · ALL SIGNALS ENCRYPTED</span>
          </footer>
        </div>
      </motion.main>
    </div>
    </LogisecureProvider>
  );
}
