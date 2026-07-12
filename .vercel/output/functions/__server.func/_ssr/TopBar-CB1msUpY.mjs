import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as LayoutGrid, E as Earth, N as Bell, O as Database, S as LoaderCircle, b as Map, d as Ship, f as ShieldAlert, g as Satellite, h as Search, i as WifiOff, k as Command, m as Settings2, o as Truck, p as Settings, r as Wifi, u as Sparkles, v as Radio, x as MapPin, y as Plane } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TopBar-CB1msUpY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		icon: LayoutGrid,
		label: "Overview",
		badge: null,
		path: "/"
	},
	{
		icon: Map,
		label: "Live Map",
		badge: "LIVE",
		path: "/live-map"
	},
	{
		icon: Plane,
		label: "Air Fleet",
		badge: null,
		path: "/air-fleet"
	},
	{
		icon: Ship,
		label: "Maritime",
		badge: null,
		path: "/maritime"
	},
	{
		icon: Truck,
		label: "Ground",
		badge: null,
		path: "/"
	},
	{
		icon: Satellite,
		label: "Telemetry",
		badge: null,
		path: "/"
	},
	{
		icon: ShieldAlert,
		label: "Risk & Alerts",
		badge: "3",
		path: "/"
	},
	{
		icon: Sparkles,
		label: "AI Copilot",
		badge: null,
		path: "/ai-copilot"
	},
	{
		icon: Database,
		label: "Data Streams",
		badge: null,
		path: "/"
	}
];
function Sidebar() {
	const currentPath = useRouterState().location.pathname;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "glass hidden h-full w-[240px] shrink-0 flex-col rounded-2xl p-4 lg:flex",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center gap-3 px-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, {
						className: "h-5 w-5 text-primary-foreground",
						strokeWidth: 2.5
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						className: "absolute inset-0 rounded-xl",
						style: { boxShadow: "0 0 24px oklch(0.78 0.18 220 / 0.7)" },
						animate: { opacity: [
							.4,
							1,
							.4
						] },
						transition: {
							duration: 2.4,
							repeat: Infinity
						}
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-sm font-bold tracking-tight",
						children: "LogiSecure"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate font-mono text-[10px] tracking-widest text-muted-foreground",
						children: "COMMAND · v4.2"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-1 flex-col gap-0.5",
				children: NAV.map((item) => {
					const Icon = item.icon;
					const isActive = item.path === currentPath;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.path,
						className: "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all hover:bg-white/5",
						"aria-current": isActive ? "page" : void 0,
						children: [
							isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								layoutId: "sidebar-active",
								className: "absolute inset-0 rounded-xl border border-primary/30 bg-primary/10",
								style: { boxShadow: "inset 0 0 20px oklch(0.78 0.18 220 / 0.15)" },
								transition: {
									type: "spring",
									stiffness: 350,
									damping: 30
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `relative h-4 w-4 shrink-0 transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `relative flex-1 truncate text-left ${isActive ? "font-medium text-foreground" : "text-muted-foreground group-hover:text-foreground"}`,
								children: item.label
							}),
							item.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `relative rounded-md px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider ${item.badge === "LIVE" ? "bg-success/20 text-success" : "bg-danger/20 text-destructive"}`,
								children: item.badge
							})
						]
					}, item.label);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-[10px] font-mono tracking-widest text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative flex h-2 w-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-success" })]
					}), "SYSTEM NOMINAL"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 text-xs text-muted-foreground",
					children: ["Uptime ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-foreground",
						children: "99.998%"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "mt-3 flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" }), "Settings"]
			})
		]
	});
}
var API_BASE_URL = "https://logisecurebackend-production.up.railway.app";
var BASE_URL_STORAGE = "logisecure.apiBaseUrl";
var DEFAULT_BASE_URL = API_BASE_URL;
function getBaseUrl() {
	if (typeof window === "undefined") return DEFAULT_BASE_URL;
	return window.localStorage.getItem(BASE_URL_STORAGE) ?? DEFAULT_BASE_URL;
}
function setBaseUrl(url) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(BASE_URL_STORAGE, url.trim());
}
function apiUrl(path) {
	const base = getBaseUrl().replace(/\/$/, "");
	return base ? `${base}${path}` : path;
}
async function fetchJson(path, init) {
	const res = await fetch(apiUrl(path), init);
	if (!res.ok) {
		let detail = res.statusText;
		try {
			const body = await res.json();
			detail = body.detail ?? body.message ?? detail;
		} catch {}
		throw new Error(typeof detail === "string" ? detail : `Request failed (${res.status})`);
	}
	return res.json();
}
var LOGISECURE_LOCATIONS = [
	"rotterdam",
	"houston",
	"sao_paulo",
	"shanghai"
];
var LOCATION_LABELS = {
	rotterdam: "Rotterdam",
	houston: "Houston",
	sao_paulo: "São Paulo",
	shanghai: "Shanghai"
};
function normalizeThreatEvent(raw) {
	const riskLevel = String(raw.risk_level ?? "").toUpperCase();
	const severity = raw.severity != null ? String(raw.severity).toUpperCase() : riskLevel === "CRITICAL" ? "CRITICAL" : riskLevel === "HIGH" ? "HIGH" : riskLevel === "MEDIUM" ? "MEDIUM" : "LOW";
	return {
		event: String(raw.event ?? raw.title ?? raw.text ?? ""),
		severity,
		published: raw.published != null ? String(raw.published) : void 0,
		lat: typeof raw.lat === "number" ? raw.lat : void 0,
		lng: typeof raw.lon === "number" ? raw.lon : typeof raw.lng === "number" ? raw.lng : void 0,
		link: raw.link != null ? String(raw.link) : raw.url != null ? String(raw.url) : void 0,
		title: raw.title != null ? String(raw.title) : void 0,
		risk_score: typeof raw.risk_score === "number" ? raw.risk_score : void 0,
		risk_level: raw.risk_level != null ? String(raw.risk_level) : void 0
	};
}
function threatEventKey(e) {
	return `${e.severity ?? ""}:${e.event}:${e.published ?? ""}`;
}
var SEVERITY_ORDER = {
	CRITICAL: 0,
	HIGH: 1,
	MEDIUM: 2,
	LOW: 3
};
function sortEventsBySeverity(events) {
	return [...events].sort((a, b) => {
		return (SEVERITY_ORDER[(a.severity ?? "LOW").toUpperCase()] ?? 9) - (SEVERITY_ORDER[(b.severity ?? "LOW").toUpperCase()] ?? 9);
	});
}
async function fetchDashboardSync(location, signal) {
	const data = await fetchJson(`/api/dashboard/sync?hq=${encodeURIComponent(location)}`, { signal });
	const threats = data.geopolitical_threats;
	const rawEvents = threats?.events ?? [];
	const summary = threats?.summary;
	return {
		...data,
		geopolitical_threats: {
			events: rawEvents.map(normalizeThreatEvent),
			summary: {
				total_events: Number(summary?.total_events ?? summary?.total_alerts ?? rawEvents.length),
				total_alerts: Number(summary?.total_alerts ?? rawEvents.length)
			}
		}
	};
}
async function fetchAgentStatus(signal) {
	return fetchJson("/agent-status", { signal });
}
async function postAgentAnalyze(input) {
	return fetchJson("/agent-analyze", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(input)
	});
}
async function fetchAirTrafficByHq(hq, signal) {
	return fetchJson(`/api/air/${hq}`, { signal });
}
async function fetchMaritimeByHq(hq, signal) {
	return fetchJson(`/api/maritime/${hq}`, { signal });
}
async function fetchLandByHq(hq, signal) {
	return fetchJson(`/api/land/${hq}`, { signal });
}
async function fetchLandTrackById(trackingId, signal) {
	return fetchJson(`/api/land/track/${trackingId}`, { signal });
}
var LogisecureContext = (0, import_react.createContext)(null);
var LOCATION_STORAGE = "logisecure.location";
var DISMISSED_STORAGE = "logisecure.dismissedEvents";
function readDismissed() {
	if (typeof window === "undefined") return /* @__PURE__ */ new Set();
	try {
		const raw = window.localStorage.getItem(DISMISSED_STORAGE);
		if (!raw) return /* @__PURE__ */ new Set();
		const arr = JSON.parse(raw);
		return new Set(Array.isArray(arr) ? arr : []);
	} catch {
		return /* @__PURE__ */ new Set();
	}
}
function writeDismissed(s) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(DISMISSED_STORAGE, JSON.stringify([...s]));
}
function LogisecureProvider({ children }) {
	const [location, setLocationState] = (0, import_react.useState)("rotterdam");
	const setLocation = (l) => {
		setLocationState(l);
		if (typeof window !== "undefined") window.localStorage.setItem(LOCATION_STORAGE, l);
	};
	const [seenKeys, setSeenKeys] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	const [newEvents, setNewEvents] = (0, import_react.useState)([]);
	const [dismissedKeys, setDismissedKeys] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	(0, import_react.useEffect)(() => {
		const savedLocation = window.localStorage.getItem(LOCATION_STORAGE);
		if (savedLocation && LOGISECURE_LOCATIONS.includes(savedLocation)) setLocationState(savedLocation);
		setDismissedKeys(readDismissed());
	}, []);
	const query = useQuery({
		queryKey: [
			"logisecure",
			"sync",
			location
		],
		queryFn: ({ signal }) => fetchDashboardSync(location, signal),
		refetchInterval: 3e4,
		refetchOnWindowFocus: false,
		staleTime: 25e3,
		retry: 1
	});
	(0, import_react.useEffect)(() => {
		const events = query.data?.geopolitical_threats?.events ?? [];
		if (!events.length) return;
		const arrivedNew = [];
		const nextSeen = new Set(seenKeys);
		for (const e of events) {
			const key = threatEventKey(e);
			if (!nextSeen.has(key)) {
				nextSeen.add(key);
				if (seenKeys.size > 0 && !dismissedKeys.has(key)) arrivedNew.push(e);
			}
		}
		if (arrivedNew.length) setNewEvents((prev) => [...arrivedNew, ...prev].slice(0, 20));
		if (nextSeen.size !== seenKeys.size) setSeenKeys(nextSeen);
	}, [query.data]);
	(0, import_react.useEffect)(() => {
		setSeenKeys(/* @__PURE__ */ new Set());
		setNewEvents([]);
	}, [location]);
	const dismissEvent = (key) => {
		setDismissedKeys((prev) => {
			const next = new Set(prev);
			next.add(key);
			writeDismissed(next);
			return next;
		});
		setNewEvents((prev) => prev.filter((e) => threatEventKey(e) !== key));
	};
	const value = (0, import_react.useMemo)(() => ({
		location,
		setLocation,
		data: query.data,
		isLoading: query.isLoading,
		isFetching: query.isFetching,
		error: query.error,
		backendOnline: !query.error && query.data != null,
		fetchedAt: query.dataUpdatedAt,
		refetch: () => query.refetch(),
		newEvents: newEvents.filter((e) => !dismissedKeys.has(threatEventKey(e))),
		dismissedKeys,
		dismissEvent
	}), [
		location,
		query.data,
		query.isLoading,
		query.isFetching,
		query.error,
		query.dataUpdatedAt,
		newEvents,
		dismissedKeys
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogisecureContext.Provider, {
		value,
		children
	});
}
function useLogisecure() {
	const ctx = (0, import_react.useContext)(LogisecureContext);
	if (!ctx) throw new Error("useLogisecure must be used within LogisecureProvider");
	return ctx;
}
function LocationSelector() {
	const { location, setLocation, backendOnline, isFetching, isLoading } = useLogisecure();
	const [showConfig, setShowConfig] = (0, import_react.useState)(false);
	const [urlDraft, setUrlDraft] = (0, import_react.useState)(getBaseUrl());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] tracking-widest text-muted-foreground",
						children: "HQ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: location,
						onChange: (e) => setLocation(e.target.value),
						className: "bg-transparent font-mono text-xs font-bold text-foreground focus:outline-none",
						"aria-label": "Select HQ location",
						children: LOGISECURE_LOCATIONS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: l,
							className: "bg-black",
							children: LOCATION_LABELS[l].toUpperCase()
						}, l))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 ${backendOnline ? "border-success/30 bg-success/5" : isLoading ? "border-white/5 bg-white/[0.03]" : "border-destructive/40 bg-destructive/10"}`,
				title: backendOnline ? "Backend online" : "Backend unreachable",
				children: [
					isFetching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-muted-foreground" }) : backendOnline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "h-3.5 w-3.5 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "h-3.5 w-3.5 text-destructive" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `font-mono text-[10px] tracking-widest ${backendOnline ? "text-success" : isLoading ? "text-muted-foreground" : "text-destructive"}`,
						children: backendOnline ? "BACKEND LIVE" : isLoading ? "CONNECTING…" : "BACKEND OFFLINE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowConfig((v) => !v),
						"aria-label": "Configure backend URL",
						className: "ml-1 grid h-5 w-5 place-items-center rounded text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-3 w-3" })
					})
				]
			}),
			showConfig && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong absolute top-16 right-4 z-50 w-[320px] rounded-xl p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 font-mono text-[10px] tracking-widest text-muted-foreground",
						children: "BACKEND BASE URL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: urlDraft,
						onChange: (e) => setUrlDraft(e.target.value),
						className: "w-full rounded-lg border border-white/10 bg-black/40 px-2 py-1.5 font-mono text-xs focus:border-primary/50 focus:outline-none",
						placeholder: `https://logisecurebackend-production.up.railway.app`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowConfig(false),
							className: "rounded-md px-2 py-1 font-mono text-[10px] text-muted-foreground hover:text-foreground",
							children: "CANCEL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setBaseUrl(urlDraft);
								setShowConfig(false);
								window.location.reload();
							},
							className: "rounded-md bg-primary/20 px-2 py-1 font-mono text-[10px] text-primary hover:bg-primary/30",
							children: "SAVE"
						})]
					})
				]
			})
		]
	});
}
function useClock() {
	const [t, setT] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setT(/* @__PURE__ */ new Date());
		const id = setInterval(() => setT(/* @__PURE__ */ new Date()), 1e3);
		return () => clearInterval(id);
	}, []);
	return t;
}
function TopBar() {
	const now = useClock();
	const [q, setQ] = (0, import_react.useState)("");
	const [focused, setFocused] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "glass sticky top-0 z-30 flex items-center gap-3 rounded-2xl px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden items-center gap-2 md:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "h-3.5 w-3.5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] tracking-widest text-muted-foreground",
							children: "SECTOR"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs font-bold",
							children: "GLOBAL · 24H"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationSelector, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: `relative flex flex-1 items-center gap-2 rounded-xl border px-3 py-2 transition-all ${focused ? "border-primary/50 bg-white/[0.04]" : "border-white/5 bg-white/[0.02]"}`,
				animate: { boxShadow: focused ? "0 0 0 4px oklch(0.78 0.18 220 / 0.12)" : "0 0 0 0px transparent" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						onFocus: () => setFocused(true),
						onBlur: () => setFocused(false),
						placeholder: "Search assets, routes, incidents, cargo IDs…",
						"aria-label": "Search command center",
						className: "w-full bg-transparent text-sm placeholder:text-muted-foreground/70 focus:outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("kbd", {
						className: "hidden items-center gap-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground md:inline-flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { className: "h-3 w-3" }), "K"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: focused && q.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: -6
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -6
						},
						className: "glass-strong absolute top-[calc(100%+8px)] left-0 right-0 rounded-xl p-2",
						children: [
							"Flight AX-1120 · Atlantic",
							"Vessel MERIDIAN-7 · Suez",
							"Route EU→NA Priority"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] text-primary/70",
								children: "JUMP →"
							})]
						}, s))
					}) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden items-center gap-2 lg:flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1.5 font-mono text-xs",
					children: [
						now ? now.toISOString().slice(11, 19) : "--:--:--",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "UTC"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				"aria-label": "Notifications",
				className: "relative grid h-9 w-9 place-items-center rounded-xl border border-white/5 bg-white/[0.03] transition-all hover:border-primary/40 hover:bg-white/[0.06]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2.5 w-2.5 rounded-full bg-destructive" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] py-1 pr-3 pl-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent font-mono text-xs font-bold text-primary-foreground",
					children: "KM"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden sm:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-medium leading-tight",
						children: "K. Morrison"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] leading-tight text-muted-foreground",
						children: "OPS · L5"
					})]
				})]
			})
		]
	});
}
//#endregion
export { TopBar as a, fetchLandByHq as c, postAgentAnalyze as d, sortEventsBySeverity as f, Sidebar as i, fetchLandTrackById as l, useLogisecure as m, LOGISECURE_LOCATIONS as n, fetchAgentStatus as o, threatEventKey as p, LogisecureProvider as r, fetchAirTrafficByHq as s, LOCATION_LABELS as t, fetchMaritimeByHq as u };
