import { useEffect, useRef, useState } from "react";
import { Plane, Ship, Truck, X } from "lucide-react";
import { useLogisecure } from "@/hooks/useLogisecure";
import { useLiveMapData } from "@/hooks/useLiveMapData";
import "leaflet/dist/leaflet.css";

const HQ_COORDS: Record<string, { lat: number; lng: number }> = {
  rotterdam: { lat: 51.9225, lng: 4.4791 },
  houston: { lat: 29.7604, lng: -95.3698 },
  sao_paulo: { lat: -23.5505, lng: -46.6333 },
  shanghai: { lat: 31.2304, lng: 121.4737 },
};

type Layer = "air" | "sea" | "land";
type Selected = { kind: Layer; data: any } | null;

export function LiveMapView() {
  const { location } = useLogisecure();
  const { flights, vessels, landVehicles, isLoading } = useLiveMapData();

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const leafletRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const [mapReady, setMapReady] = useState(false);
  const [activeLayers, setActiveLayers] = useState<Record<Layer, boolean>>({
    air: true,
    sea: true,
    land: true,
  });
  const [selected, setSelected] = useState<Selected>(null);

  useEffect(() => {
    let cancelled = false;
    import("leaflet").then((mod) => {
      if (cancelled) return;
      leafletRef.current = mod.default;
      setMapReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!mapReady || !mapContainerRef.current || mapRef.current) return;
    const L = leafletRef.current;
    const map = L.map(mapContainerRef.current, { zoomControl: true, minZoom: 2, worldCopyJump: true })
      .setView([HQ_COORDS[location].lat, HQ_COORDS[location].lng], 7);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
      maxZoom: 20,
    }).addTo(map);

    mapRef.current = map;
    requestAnimationFrame(() => map.invalidateSize());
    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, [mapReady]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo([HQ_COORDS[location].lat, HQ_COORDS[location].lng], 7, { duration: 1.2 });
    }
  }, [location]);

  function icon(kind: Layer) {
    const L = leafletRef.current;
    const svgs: Record<Layer, string> = {
      air: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>`,
      sea: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#22d3ee"><path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.64 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.53 4-1.68 1.98 1.29 5.02 1.29 6.99.01L15 17.34c1 1.14 2.4 1.66 4 1.66h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L18 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-2.28.42a.994.994 0 0 0-.66 1.28L3.95 19zM6 6h12v3.97L12 8.65l-6 1.32V6z"/></svg>`,
      land: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#4ade80"><path d="M18 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM6 18.5c.83 0 1.5-.67 1.5-1.5S6.83 15.5 6 15.5 4.5 16.17 4.5 17s.67 1.5 1.5 1.5zM20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-3 1.5h2.46L21 12h-4v-2.5z"/></svg>`,
    };
    return L.divIcon({
      html: `<div style="filter: drop-shadow(0 0 3px rgba(0,0,0,0.9));">${svgs[kind]}</div>`,
      className: "",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  }

  useEffect(() => {
    const map = mapRef.current;
    const L = leafletRef.current;
    if (!map || !L) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (activeLayers.air) {
      flights.forEach((f: any) => {
        if (typeof f.latitude !== "number" || typeof f.longitude !== "number") return;
        const marker = L.marker([f.latitude, f.longitude], { icon: icon("air") }).addTo(map);
        marker.on("click", () => setSelected({ kind: "air", data: f }));
        markersRef.current.push(marker);
      });
    }

    if (activeLayers.sea) {
      vessels.forEach((v: any) => {
        if (typeof v.lat !== "number" || typeof v.lon !== "number") return;
        const marker = L.marker([v.lat, v.lon], { icon: icon("sea") }).addTo(map);
        marker.on("click", () => setSelected({ kind: "sea", data: v }));
        markersRef.current.push(marker);
      });
    }

    if (activeLayers.land) {
      landVehicles.forEach((s: any) => {
        const pos = s.telemetry?.current_position;
        if (!pos) return;
        const marker = L.marker([pos.lat, pos.lng], { icon: icon("land") }).addTo(map);
        marker.on("click", () => setSelected({ kind: "land", data: s }));
        markersRef.current.push(marker);
      });
    }
  }, [flights, vessels, landVehicles, activeLayers, mapReady]);

  const toggle = (layer: Layer) =>
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div className="absolute top-4 left-4 z-[1000] flex gap-2">
        {(["air", "sea", "land"] as Layer[]).map((l) => {
          const Icon = l === "air" ? Plane : l === "sea" ? Ship : Truck;
          const count = l === "air" ? flights.length : l === "sea" ? vessels.length : landVehicles.length;
          return (
            <button
              key={l}
              onClick={() => toggle(l)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-mono tracking-widest backdrop-blur-md transition-colors ${
                activeLayers[l]
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-white/10 bg-black/60 text-muted-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {l.toUpperCase()} · {count}
            </button>
          );
        })}
      </div>

      <div className="absolute top-4 right-4 z-[1000] font-mono text-[10px] tracking-widest text-muted-foreground">
        {isLoading ? "SYNCING…" : "LIVE"}
      </div>

      <div ref={mapContainerRef} className="h-full w-full" style={{ background: "#0a0e17" }} />

      {!mapReady && (
        <div className="absolute inset-0 z-10 flex items-center justify-center text-sm text-muted-foreground">
          Loading map...
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-sm rounded-xl border border-primary/30 bg-black/90 p-5 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="font-mono text-[11px] tracking-widest text-primary">
                {selected.kind.toUpperCase()}
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {selected.kind === "air" && (
              <div className="mt-3 space-y-1 text-sm">
                <div className="text-xl font-semibold">{selected.data.callsign}</div>
                <div className="text-muted-foreground">Country: {selected.data.origin_country}</div>
                <div className="text-muted-foreground">Altitude: {Math.round(selected.data.geo_altitude ?? 0)}m</div>
                <div className="text-muted-foreground">Speed: {selected.data.velocity} m/s</div>
              </div>
            )}
            {selected.kind === "sea" && (
              <div className="mt-3 space-y-1 text-sm">
                <div className="text-xl font-semibold">{selected.data.name}</div>
                <div className="text-muted-foreground">MMSI: {selected.data.mmsi}</div>
                <div className="text-muted-foreground">Type: {selected.data.type_label}</div>
                <div className="text-muted-foreground">Speed: {selected.data.speed} kn</div>
              </div>
            )}
            {selected.kind === "land" && (
              <div className="mt-3 space-y-1 text-sm">
                <div className="text-xl font-semibold">{selected.data.tracking_id}</div>
                <div className="text-muted-foreground">Client: {selected.data.client}</div>
                <div className="text-muted-foreground">Cargo: {selected.data.cargo}</div>
                <div className="text-muted-foreground">Status: {selected.data.telemetry?.status_tags}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}