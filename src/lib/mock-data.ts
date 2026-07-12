import type { DashboardSync, ThreatEvent } from "./logisecure-api";

// Cache configuration
const CACHE_PREFIX = "logisecure.cache";
const CACHE_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Generic cache functions
export function getCachedData<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(`${CACHE_PREFIX}.${key}`);
    if (!stored) return null;
    const entry: CacheEntry<T> = JSON.parse(stored);
    const age = Date.now() - entry.timestamp;
    if (age > CACHE_EXPIRY_MS) {
      window.localStorage.removeItem(`${CACHE_PREFIX}.${key}`);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

export function setCachedData<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
    };
    window.localStorage.setItem(`${CACHE_PREFIX}.${key}`, JSON.stringify(entry));
  } catch {
    // Ignore storage errors
  }
}

export function clearCache(key?: string): void {
  if (typeof window === "undefined") return;
  try {
    if (key) {
      window.localStorage.removeItem(`${CACHE_PREFIX}.${key}`);
    } else {
      // Clear all logisecure cache
      Object.keys(window.localStorage)
        .filter((k) => k.startsWith(CACHE_PREFIX))
        .forEach((k) => window.localStorage.removeItem(k));
    }
  } catch {
    // Ignore errors
  }
}

// Mock data for fallback when backend is unavailable or returns empty
export const MOCK_DASHBOARD_DATA: DashboardSync = {
  location: "rotterdam",
  timestamp: Date.now(),
  air_traffic: {
    flights: Array.from({ length: 24 }, (_, i) => ({
      icao24: `ABC${1000 + i}`,
      callsign: `FL${100 + i}`,
      origin_country: ["Netherlands", "Germany", "Belgium", "France", "UK"][i % 5],
      on_ground: i % 3 === 0,
      geo_altitude: i % 3 === 0 ? 0 : 8000 + Math.random() * 5000,
      velocity: i % 3 === 0 ? 0 : 200 + Math.random() * 100,
    })),
  },
  maritime_traffic: {
    data: {
      container_liners: Array.from({ length: 18 }, (_, i) => ({
        name: `VESSEL ${i + 1}`,
        mmsi: `244${100000 + i}`,
        speed: 10 + Math.random() * 15,
        course: Math.random() * 360,
        country: ["Netherlands", "Germany", "Norway", "UK", "Spain"][i % 5],
        type_label: ["Container", "Tanker", "Bulk Carrier", "RoRo"][i % 4],
        lat: 51.9 + Math.random() * 0.5,
        lon: 4.0 + Math.random() * 0.5,
        type: "Cargo",
        category: "Cargo",
        heading: Math.random() * 360,
      })),
      all_vessels: Array.from({ length: 35 }, (_, i) => ({
        name: `VESSEL ${i + 1}`,
        mmsi: `244${100000 + i}`,
        speed: 5 + Math.random() * 20,
        course: Math.random() * 360,
        country: ["Netherlands", "Germany", "Norway", "UK", "Spain"][i % 5],
        type_label: ["Container", "Tanker", "Bulk Carrier", "RoRo", "Ferry"][i % 5],
        lat: 51.9 + Math.random() * 0.5,
        lon: 4.0 + Math.random() * 0.5,
        type: "Cargo",
        category: "Cargo",
        heading: Math.random() * 360,
      })),
    },
  },
  land_traffic: {
    data: {
      total_shipments: 42,
      shipments_with_gps: 34,
      shipments_without_gps: 8,
      active_shipments: Array.from({ length: 42 }, (_, i) => ({
        tracking_id: `TRK-${10000 + i}`,
        client: ["Client A", "Client B", "Client C", "Client D"][i % 4],
        cargo: ["Electronics", "Food", "Machinery", "Textiles"][i % 4],
        has_active_gps: i % 5 !== 0,
        tracking_type: "Road",
      })),
    },
  },
  weather_telemetry: {
    status: "success",
    location: "Rotterdam",
    lat: 51.9244,
    lon: 4.4777,
    timestamp: new Date().toISOString(),
    temperature: 18.5,
    temperature_unit: "C",
    wind_speed: 12.3,
    wind_speed_unit: "km/h",
    wind_direction: 245,
    wind_direction_unit: "degrees",
    weather_code: 1,
    condition: "Partly Cloudy",
    is_day: true,
    source: "mock",
    elevation: -5,
    timezone: "Europe/Amsterdam",
  },
  geopolitical_threats: {
    events: [
      {
        event: "Port congestion reported at Rotterdam due to labor strike",
        severity: "HIGH",
        published: new Date(Date.now() - 3600000).toISOString(),
        lat: 51.9244,
        lng: 4.4777,
        link: "https://example.com",
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
        link: "https://example.com",
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
        link: "https://example.com",
        title: "Customs Delay",
        risk_score: 30,
        risk_level: "LOW",
      },
    ],
    summary: {
      total_events: 3,
      total_alerts: 2,
    },
  },
};

const MOCK_STORAGE_KEY = "logisecure.mockData";

export function getMockData(): DashboardSync {
  if (typeof window === "undefined") return MOCK_DASHBOARD_DATA;
  try {
    const stored = window.localStorage.getItem(MOCK_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Add some randomness to make it feel live
      parsed.timestamp = Date.now();
      return parsed;
    }
  } catch {
    // Ignore errors
  }
  return MOCK_DASHBOARD_DATA;
}

export function setMockData(data: DashboardSync): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore errors
  }
}

export function clearMockData(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(MOCK_STORAGE_KEY);
  } catch {
    // Ignore errors
  }
}
