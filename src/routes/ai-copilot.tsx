import { createFileRoute } from "@tanstack/react-router";
import { AnimatedBackground } from "@/components/command/AnimatedBackground";
import { Sidebar } from "@/components/command/Sidebar";
import { TopBar } from "@/components/command/TopBar";
import { AICopilot } from "@/components/command/AICopilot";
import { LogisecureProvider } from "@/hooks/useLogisecure";
import { useState } from "react";

export const Route = createFileRoute("/ai-copilot")({
  component: AICopilotPage,
});

function AICopilotPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <LogisecureProvider>
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <main className="mx-auto flex min-h-screen w-full max-w-[1800px] gap-3 p-3 lg:p-4">
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <AICopilot />
          </div>
        </main>
      </div>
    </LogisecureProvider>
  );
}