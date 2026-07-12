import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatedBackground } from "@/components/command/AnimatedBackground";
import { Sidebar } from "@/components/command/Sidebar";
import { TopBar } from "@/components/command/TopBar";
import { ThreatsPage } from "@/pages/ThreatsPage";
import { LogisecureProvider } from "@/hooks/useLogisecure";

export const Route = createFileRoute("/threats")({
  component: ThreatsRoute,
});

function ThreatsRoute() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <LogisecureProvider>
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex min-h-screen w-full max-w-[1800px] gap-3 p-3 lg:p-4"
        >
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <ThreatsPage />
          </div>
        </motion.main>
      </div>
    </LogisecureProvider>
  );
}
