import { useState } from "react";
import { Sidebar } from "@/components/command/Sidebar";
import { TopBar } from "@/components/command/TopBar";
import { LiveMapView } from "@/components/command/LiveMapView";

export function LiveMapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1800px] gap-3 p-3 lg:p-4">
     <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="h-[calc(100vh-120px)]">
          <LiveMapView />
        </div>
      </div>
    </div>
  );
}