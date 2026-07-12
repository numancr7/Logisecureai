import { createFileRoute } from "@tanstack/react-router";
import { LogisecureProvider } from "@/hooks/useLogisecure";
import { LiveMapPage } from "@/pages/LiveMapPage";

export const Route = createFileRoute("/live-map")({
  component: LiveMapRoute,
});

function LiveMapRoute() {
  return (
    <LogisecureProvider>
      <LiveMapPage />
    </LogisecureProvider>
  );
}