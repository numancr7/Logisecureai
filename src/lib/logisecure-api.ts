import { API_BASE_URL } from "@/lib/config";

const BASE_URL_STORAGE = "logisecure.apiBaseUrl";
const DEFAULT_BASE_URL = API_BASE_URL;
const NEWSDATA_API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY ;

export function getBaseUrl(): string {
  if (typeof window === "undefined") return DEFAULT_BASE_URL;
  return window.localStorage.getItem(BASE_URL_STORAGE) ?? DEFAULT_BASE_URL;
}

export function setBaseUrl(url: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BASE_URL_STORAGE, url.trim());
}

function apiUrl(path: string): string {
  const base = getBaseUrl().replace(/\/$/, "");
  return base ? `${base}${path}` : path;
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(apiUrl(path), init);
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail ?? body.message ?? detail;
    } catch {
      /* ignore */
    }
    throw new Error(typeof detail === "string" ? detail : `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

// ── Locations ──────────────────────────────────────────────────────────────

export const LOGISECURE_LOCATIONS = [
  "rotterdam",
  "houston",
  "sao_paulo",
  "shanghai",
] as const;

export type LogisecureLocation = (typeof LOGISECURE_LOCATIONS)[number];

export const LOCATION_LABELS: Record<LogisecureLocation, string> = {
  rotterdam: "Rotterdam",
  houston: "Houston",
  sao_paulo: "São Paulo",
  shanghai: "Shanghai",
};

// ── Dashboard sync ───────────────────────────────────────────────────────────

export type ThreatSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export type ThreatEvent = {
  event: string;
  severity?: string;
  published?: string;
  lat?: number;
  lng?: number;
  link?: string;
  title?: string;
  risk_score?: number;
  risk_level?: string;
};

export type Flight = {
  icao24: string;
  callsign?: string;
  origin_country?: string;
  on_ground?: boolean;
  geo_altitude?: number;
  velocity?: number;
};

export type DashboardSync = {
  location: string;
  timestamp: number;
  air_traffic: { flights?: Flight[] };
  maritime_traffic: { data?: { container_liners?: Vessel[]; all_vessels?: Vessel[]; by_type?: Record<string, number>; by_category?: Record<string, number> } };
  land_traffic: { data?: { total_shipments?: number; active_shipments?: Shipment[]; shipments_with_gps?: number; shipments_without_gps?: number } };
  weather_telemetry:
  | {
      status: "success";
      location: string;
      lat: number;
      lon: number;
      timestamp: string;
      temperature: number;
      temperature_unit: string;
      wind_speed: number;
      wind_speed_unit: string;
      wind_direction: number;
      wind_direction_unit: string;
      weather_code: number;
      condition: string;
      is_day: boolean;
      source: string;
      elevation: number;
      timezone: string;
    }
  | { status: "error"; message: string };
  geopolitical_threats: {
    events?: ThreatEvent[];
    summary?: { total_events?: number; total_alerts?: number };
  };
};

function normalizeThreatEvent(raw: Record<string, unknown>): ThreatEvent {
  const riskLevel = String(raw.risk_level ?? "").toUpperCase();
  const severity =
    raw.severity != null
      ? String(raw.severity).toUpperCase()
      : riskLevel === "CRITICAL"
        ? "CRITICAL"
        : riskLevel === "HIGH"
          ? "HIGH"
          : riskLevel === "MEDIUM"
            ? "MEDIUM"
            : "LOW";

  return {
    event: String(raw.event ?? raw.title ?? raw.text ?? ""),
    severity,
    published: raw.published != null ? String(raw.published) : undefined,
    lat: typeof raw.lat === "number" ? raw.lat : undefined,
    lng: typeof raw.lon === "number" ? raw.lon : typeof raw.lng === "number" ? raw.lng : undefined,
    link: raw.link != null ? String(raw.link) : raw.url != null ? String(raw.url) : undefined,
    title: raw.title != null ? String(raw.title) : undefined,
    risk_score: typeof raw.risk_score === "number" ? raw.risk_score : undefined,
    risk_level: raw.risk_level != null ? String(raw.risk_level) : undefined,
  };
}

export function threatEventKey(e: ThreatEvent): string {
  return `${e.severity ?? ""}:${e.event}:${e.published ?? ""}`;
}

const SEVERITY_ORDER: Record<string, number> = {
  CRITICAL: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

export function sortEventsBySeverity(events: ThreatEvent[]): ThreatEvent[] {
  return [...events].sort((a, b) => {
    const sa = SEVERITY_ORDER[(a.severity ?? "LOW").toUpperCase()] ?? 9;
    const sb = SEVERITY_ORDER[(b.severity ?? "LOW").toUpperCase()] ?? 9;
    return sa - sb;
  });
}

export async function fetchDashboardSync(
  location: LogisecureLocation,
  signal?: AbortSignal,
): Promise<DashboardSync> {
  const data = await fetchJson<Record<string, unknown>>(
    `/api/dashboard/sync?hq=${encodeURIComponent(location)}`,
    { signal },
  );

  const threats = data.geopolitical_threats as Record<string, unknown> | undefined;
  const rawEvents = (threats?.events as Record<string, unknown>[] | undefined) ?? [];
  const summary = threats?.summary as Record<string, unknown> | undefined;

  return {
    ...(data as unknown as DashboardSync),
    geopolitical_threats: {
      events: rawEvents.map(normalizeThreatEvent),
      summary: {
        total_events: Number(summary?.total_events ?? summary?.total_alerts ?? rawEvents.length),
        total_alerts: Number(summary?.total_alerts ?? rawEvents.length),
      },
    },
  };
}

// ── AI agent ─────────────────────────────────────────────────────────────────

export type IncidentInput = {
  type: string;
  location: string;
  severity: string;
  description: string;
  estimated_duration: string;
  affected_assets: string;
};

export type AgentStatus = {
  status: string;
  provider: string;
  model: string;
  confidence_threshold: number;
};

export type AgentAnalyzeResponse = {
  status: string;
  provider: string;
  analysis: {
    incident_data: IncidentInput & { confidence?: number };
    affected_shipments: Array<{ id: string; cargo: string; location: string }>;
    alternative_routes: Array<{ route: string; time: string; priority: string }>;
    messages: string[];
    alerts: Array<{ type: string; message: string; timestamp: string }>;
  };
};

export async function fetchAgentStatus(signal?: AbortSignal): Promise<AgentStatus> {
  return fetchJson<AgentStatus>("/agent-status", { signal });
}

export async function postAgentAnalyze(input: IncidentInput): Promise<AgentAnalyzeResponse> {
  return fetchJson<AgentAnalyzeResponse>("/agent-analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

// ── Air traffic ───────────────────────────────────────────────────────────────

export interface RawFlight {
  icao24: string;
  callsign: string;
  origin_country: string;
  longitude: number;
  latitude: number;
  baro_altitude: number | null;
  on_ground: boolean;
  velocity: number;
  true_track: number;
  vertical_rate: number | null;
  geo_altitude: number | null;
}

export interface AirTrafficByHq {
  status: string;
  location: string;
  timestamp: string;
  total_flights: number;
  flights: RawFlight[];
}

export async function fetchAirTrafficByHq(
  hq: LogisecureLocation,
  signal?: AbortSignal
): Promise<AirTrafficByHq> {
  return fetchJson<AirTrafficByHq>(`/api/air/${hq}`, { signal });
}



// ── Maritime ──────────────────────────────────────────────────────────────

export interface Vessel {
  mmsi: string;
  name: string;
  lat: number;
  lon: number;
  type: string;
  type_label: string;
  category: string;
  country: string;
  speed: number;
  course: number;
  heading: number;
}

export interface MaritimeByHq {
  status: string;
  location: string;
  timestamp: string;
  total_vessels: number;
  data: {
    all_vessels: Vessel[];
    by_type: Record<string, number>;
    by_category: Record<string, number>;
  };
  source: string;
}

export async function fetchMaritimeByHq(
  hq: LogisecureLocation,
  signal?: AbortSignal
): Promise<MaritimeByHq> {
  return fetchJson<MaritimeByHq>(`/api/maritime/${hq}`, { signal });
}

// ── Land ──────────────────────────────────────────────────────────────────

export interface Shipment {
  tracking_id: string;
  client: string;
  cargo: string;
  tracking_type: string;
  has_active_gps: boolean;
}

export interface LandByHq {
  status: string;
  location: string;
  data: {
    active_shipments: Shipment[];
    total_shipments: number;
    shipments_with_gps: number;
    shipments_without_gps: number;
  };
}

export async function fetchLandByHq(
  hq: LogisecureLocation,
  signal?: AbortSignal
): Promise<LandByHq> {
  return fetchJson<LandByHq>(`/api/land/${hq}`, { signal });
}




export interface LandTrackByIdResponse {
  status: string;
  tracking_id: string;
  client: string;
  cargo: string;
  mode: string;
  display_color: string;
  telemetry: {
    current_position: { lat: number; lng: number };
    status_tags: string;
  };
}

export async function fetchLandTrackById(
  trackingId: string,
  signal?: AbortSignal
): Promise<LandTrackByIdResponse> {
  return fetchJson<LandTrackByIdResponse>(`/api/land/track/${trackingId}`, { signal });
}


export interface VesselByMmsi {
  status: string;
  vessel: Vessel & { hq: string };
  found_in: string;
  source: string;
}

export async function fetchMaritimeByMmsi(
  mmsi: string,
  signal?: AbortSignal
): Promise<VesselByMmsi> {
  return fetchJson<VesselByMmsi>(`/api/maritime/mmsi/${mmsi}`, { signal });
}


export interface LandRouteResponse {
  status: string;
  location: string;
  data: {
    active_shipments: Shipment[];
    total_shipments: number;
    shipments_with_gps: number;
    shipments_without_gps: number;
  };
}

export async function fetchLandRoute(
  origin: string,
  destination: string,
  shipmentType?: string,
  signal?: AbortSignal
): Promise<LandRouteResponse> {
  const params = new URLSearchParams({ origin, destination });
  if (shipmentType) params.set("shipment_type", shipmentType);
  return fetchJson<LandRouteResponse>(`/api/land/route?${params}`, { signal });
}

// ── News API ────────────────────────────────────────────────────────────────

export interface NewsArticle {
  title: string;
  description: string;
  pubDate: string;
  source_id: string;
  source_name: string;
  article_id: string;
  link: string;
  image_url?: string;
  category?: string[];
  keywords?: string[];
}

export async function fetchNews(
  query?: string,
  category?: string,
  signal?: AbortSignal
): Promise<{ status: string; totalResults: number; results: NewsArticle[] }> {
  const params = new URLSearchParams({ apikey: NEWSDATA_API_KEY });
  if (query) params.set("q", query);
  if (category) params.set("category", category);
  params.set("language", "en");
  params.set("size", "10");

  const url = `https://newsdata.io/api/1/news?${params}`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`News API request failed: ${res.statusText}`);
  }
  return res.json();
}