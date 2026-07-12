import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react, r as useQueries } from "../_libs/react+tanstack__react-query.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { t as AnimatedBackground } from "./AnimatedBackground-DdsEOYWp.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Cloud, D as Droplets, F as ArrowRight, I as Activity, M as ChevronDown, S as LoaderCircle, T as ExternalLink, a as Waves, c as Thermometer, d as Ship, f as ShieldAlert, n as Wind, o as Truck, s as TriangleAlert, t as X, u as Sparkles, w as Funnel, y as Plane } from "../_libs/lucide-react.mjs";
import { a as TopBar, c as fetchLandByHq, f as sortEventsBySeverity, i as Sidebar, l as fetchLandTrackById, m as useLogisecure, n as LOGISECURE_LOCATIONS, o as fetchAgentStatus, p as threatEventKey, r as LogisecureProvider, t as LOCATION_LABELS } from "./TopBar-CB1msUpY.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as BarChart, o as CartesianGrid, r as YAxis, s as Bar, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BtcsbZyO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useCountUp(target, duration = 1600, delay = 0) {
	const [value, setValue] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		let start = 0;
		const t = window.setTimeout(() => {
			const tick = (ts) => {
				if (!start) start = ts;
				const p = Math.min(1, (ts - start) / duration);
				const eased = 1 - Math.pow(1 - p, 3);
				setValue(target * eased);
				if (p < 1) raf = requestAnimationFrame(tick);
			};
			raf = requestAnimationFrame(tick);
		}, delay);
		return () => {
			window.clearTimeout(t);
			cancelAnimationFrame(raf);
		};
	}, [
		target,
		duration,
		delay
	]);
	return value;
}
var TONES$1 = {
	primary: {
		text: "text-primary",
		bg: "from-primary/20 to-primary/0",
		ring: "oklch(0.78 0.18 220 / 0.5)"
	},
	cyan: {
		text: "text-accent",
		bg: "from-accent/20 to-accent/0",
		ring: "oklch(0.72 0.16 200 / 0.5)"
	},
	amber: {
		text: "text-amber",
		bg: "from-amber/20 to-amber/0",
		ring: "oklch(0.82 0.16 75 / 0.5)"
	},
	success: {
		text: "text-success",
		bg: "from-success/20 to-success/0",
		ring: "oklch(0.78 0.18 155 / 0.5)"
	},
	danger: {
		text: "text-destructive",
		bg: "from-destructive/20 to-destructive/0",
		ring: "oklch(0.68 0.24 22 / 0.5)"
	}
};
function useLiveKPIs() {
	const { data } = useLogisecure();
	const air = data?.air_traffic?.flights?.length ?? 0;
	const sea = data?.maritime_traffic?.data?.container_liners?.length ?? 0;
	const land = data?.land_traffic?.data?.total_active ?? data?.land_traffic?.data?.active_land_shipments?.length ?? 0;
	const events = data?.geopolitical_threats?.events ?? [];
	const critical = data?.geopolitical_threats?.summary?.critical ?? events.filter((e) => (e.severity ?? "").toUpperCase() === "CRITICAL").length;
	const total = data?.geopolitical_threats?.summary?.total_events ?? events.length;
	const temp = data?.weather_telemetry?.temperature;
	return [
		{
			label: "Air Couriers",
			value: air,
			delta: 0,
			icon: Plane,
			tone: "primary",
			hint: "Live from air_traffic",
			format: (v) => Math.round(v).toLocaleString()
		},
		{
			label: "Maritime Liners",
			value: sea,
			delta: 0,
			icon: Ship,
			tone: "cyan",
			hint: "Live from maritime_traffic",
			format: (v) => Math.round(v).toLocaleString()
		},
		{
			label: "Land Shipments",
			value: land,
			delta: 0,
			icon: Truck,
			tone: "success",
			hint: "Active land routes",
			format: (v) => Math.round(v).toLocaleString()
		},
		{
			label: "Critical Threats",
			value: critical,
			delta: 0,
			icon: ShieldAlert,
			tone: "danger",
			hint: `${total} total events`,
			format: (v) => Math.round(v).toString()
		},
		{
			label: "Threat Level",
			value: 0,
			delta: 0,
			icon: Activity,
			tone: "amber",
			hint: String(data?.geopolitical_threats?.summary?.threat_level ?? "—"),
			format: () => String(data?.geopolitical_threats?.summary?.threat_level ?? "—")
		},
		{
			label: "HQ Temp",
			value: temp != null ? Number(temp) : 0,
			suffix: temp != null ? "°C" : "",
			delta: 0,
			icon: Thermometer,
			tone: "primary",
			hint: String(data?.weather_telemetry?.condition ?? "—"),
			format: (v) => temp != null ? v.toFixed(1) : "—"
		}
	];
}
function KPICard({ kpi, index }) {
	const v = useCountUp(kpi.value, 1600, 200 + index * 90);
	const tone = TONES$1[kpi.tone];
	const Icon = kpi.icon;
	const positive = kpi.delta >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 16
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			delay: .05 * index,
			duration: .5,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		whileHover: { y: -3 },
		className: "glass group relative overflow-hidden rounded-2xl p-4 transition-shadow",
		style: { boxShadow: "0 20px 60px -30px oklch(0 0 0 / 0.8)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: `pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${tone.bg} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex items-start justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.03] ${tone.text}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "h-4 w-4",
									strokeWidth: 2.2
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-w-0 truncate font-mono text-[10px] tracking-widest text-muted-foreground",
								children: kpi.label.toUpperCase()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex items-baseline gap-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-3xl font-bold tracking-tight tabular-nums text-foreground",
								children: [kpi.format ? kpi.format(v) : Math.round(v), kpi.suffix ?? ""]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1.5 flex items-center gap-2 text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `rounded-md px-1.5 py-0.5 font-mono ${positive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`,
								children: [
									positive ? "▲" : "▼",
									" ",
									Math.abs(kpi.delta),
									"%"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-muted-foreground",
								children: kpi.hint
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 120 30",
				className: "mt-3 h-8 w-full opacity-80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: `spark-${index}`,
					x1: "0",
					x2: "0",
					y1: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: tone.ring
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "transparent"
					})]
				}) }), (() => {
					const seed = index * 7 + 3;
					const path = `M ${Array.from({ length: 24 }, (_, i) => {
						const y = 15 + Math.sin((i + seed) * .6) * 6 + Math.cos((i + seed) * .3) * 3;
						return `${i / 23 * 120},${y}`;
					}).join(" L ")}`;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
						d: `${path} L 120,30 L 0,30 Z`,
						fill: `url(#spark-${index})`,
						initial: { opacity: 0 },
						animate: { opacity: .4 },
						transition: {
							duration: 1.2,
							delay: .3 + index * .08
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
						d: path,
						fill: "none",
						stroke: tone.ring,
						strokeWidth: 1.2,
						strokeLinecap: "round",
						initial: { pathLength: 0 },
						animate: { pathLength: 1 },
						transition: {
							duration: 1.2,
							delay: .2 + index * .08,
							ease: "easeOut"
						}
					})] });
				})()]
			})
		]
	});
}
function KPIGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6",
		children: useLiveKPIs().map((k, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPICard, {
			kpi: k,
			index: i
		}, k.label))
	});
}
function useLandVehicles() {
	const { location } = useLogisecure();
	const shipments = useQuery({
		queryKey: ["land-list", location],
		queryFn: ({ signal }) => fetchLandByHq(location, signal),
		refetchInterval: 3e4
	}).data?.data?.active_shipments ?? [];
	return useQueries({ queries: shipments.map((s) => ({
		queryKey: ["land-track", s.tracking_id],
		queryFn: ({ signal }) => fetchLandTrackById(s.tracking_id, signal),
		enabled: shipments.length > 0,
		refetchInterval: 2e4
	})) }).map((q) => q.data).filter((d) => !!d?.telemetry?.current_position);
}
var HQ_COORDS = {
	rotterdam: {
		lat: 51.9225,
		lng: 4.4791
	},
	houston: {
		lat: 29.7604,
		lng: -95.3698
	},
	sao_paulo: {
		lat: -23.5505,
		lng: -46.6333
	},
	shanghai: {
		lat: 31.2304,
		lng: 121.4737
	}
};
function CityMap2D() {
	const { data, location, setLocation, backendOnline } = useLogisecure();
	const landVehicles = useLandVehicles();
	const mapContainerRef = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const markersRef = (0, import_react.useRef)([]);
	const leafletRef = (0, import_react.useRef)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [dropdownOpen, setDropdownOpen] = (0, import_react.useState)(false);
	const [mapReady, setMapReady] = (0, import_react.useState)(false);
	const air = data?.air_traffic?.flights ?? [];
	const sea = data?.maritime_traffic?.data?.all_vessels ?? [];
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		import("../_libs/leaflet.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())).then((leafletModule) => {
			if (cancelled) return;
			leafletRef.current = leafletModule.default;
			setMapReady(true);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!mapReady || !mapContainerRef.current || mapRef.current) return;
		const L = leafletRef.current;
		const map = L.map(mapContainerRef.current, {
			zoomControl: true,
			minZoom: 2,
			worldCopyJump: true
		}).setView([HQ_COORDS[location].lat, HQ_COORDS[location].lng], 6);
		L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
			attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
			maxZoom: 20
		}).addTo(map);
		mapRef.current = map;
		const ensureSize = () => map.invalidateSize();
		requestAnimationFrame(ensureSize);
		const sizeTimer = setTimeout(ensureSize, 300);
		const resizeObserver = new ResizeObserver(ensureSize);
		resizeObserver.observe(mapContainerRef.current);
		return () => {
			clearTimeout(sizeTimer);
			resizeObserver.disconnect();
			map.remove();
			mapRef.current = null;
		};
	}, [mapReady]);
	(0, import_react.useEffect)(() => {
		if (mapRef.current) mapRef.current.flyTo([HQ_COORDS[location].lat, HQ_COORDS[location].lng], 6, { duration: 1.2 });
	}, [location]);
	function planeDivIcon() {
		return leafletRef.current.divIcon({
			html: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff" style="filter: drop-shadow(0 0 3px rgba(0,0,0,0.9));">
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
      </svg>`,
			className: "",
			iconSize: [22, 22],
			iconAnchor: [11, 11]
		});
	}
	function shipDivIcon() {
		return leafletRef.current.divIcon({
			html: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#22d3ee" style="filter: drop-shadow(0 0 3px rgba(0,0,0,0.9));">
        <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.64 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.53 4-1.68 1.98 1.29 5.02 1.29 6.99.01L15 17.34c1 1.14 2.4 1.66 4 1.66h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L18 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-2.28.42a.994.994 0 0 0-.66 1.28L3.95 19zM6 6h12v3.97L12 8.65l-6 1.32V6z"/>
      </svg>`,
			className: "",
			iconSize: [22, 22],
			iconAnchor: [11, 11]
		});
	}
	function truckDivIcon() {
		return leafletRef.current.divIcon({
			html: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#4ade80" style="filter: drop-shadow(0 0 3px rgba(0,0,0,0.9));">
        <path d="M18 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM6 18.5c.83 0 1.5-.67 1.5-1.5S6.83 15.5 6 15.5 4.5 16.17 4.5 17s.67 1.5 1.5 1.5zM20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-3 1.5h2.46L21 12h-4v-2.5z"/>
      </svg>`,
			className: "",
			iconSize: [22, 22],
			iconAnchor: [11, 11]
		});
	}
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		const L = leafletRef.current;
		if (!map || !L) return;
		markersRef.current.forEach((m) => m.remove());
		markersRef.current = [];
		air.forEach((f) => {
			const lat = typeof f.lat === "number" ? f.lat : f.latitude;
			const lng = typeof f.lng === "number" ? f.lng : f.longitude;
			if (typeof lat !== "number" || typeof lng !== "number") return;
			const marker = L.marker([lat, lng], { icon: planeDivIcon() }).addTo(map);
			marker.on("click", () => setSelected({
				kind: "air",
				data: {
					...f,
					lat,
					lng,
					altitude: f.altitude ?? f.baro_altitude
				}
			}));
			markersRef.current.push(marker);
		});
		sea.forEach((s) => {
			const lat = typeof s.lat === "number" ? s.lat : s.latitude;
			const lng = typeof s.lng === "number" ? s.lng : s.longitude ?? s.lon;
			if (typeof lat !== "number" || typeof lng !== "number") return;
			const marker = L.marker([lat, lng], { icon: shipDivIcon() }).addTo(map);
			marker.on("click", () => setSelected({
				kind: "sea",
				data: {
					...s,
					lat,
					lng
				}
			}));
			markersRef.current.push(marker);
		});
		landVehicles.forEach((v) => {
			const pos = v.telemetry?.current_position;
			if (!pos) return;
			const marker = L.marker([pos.lat, pos.lng], { icon: truckDivIcon() }).addTo(map);
			marker.on("click", () => setSelected({
				kind: "land",
				data: v
			}));
			markersRef.current.push(marker);
		});
	}, [
		air,
		sea,
		landVehicles,
		mapReady
	]);
	const selectCity = (loc) => {
		setLocation(loc);
		setDropdownOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full w-full overflow-hidden rounded-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-4 left-4 z-[1000] w-56",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setDropdownOpen((v) => !v),
					className: "flex w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-sm text-white backdrop-blur-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: LOCATION_LABELS[location] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}` })]
				}), dropdownOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 overflow-hidden rounded-lg border border-white/10 bg-black/90 backdrop-blur-md",
					children: LOGISECURE_LOCATIONS.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						onClick: () => selectCity(loc),
						className: `cursor-pointer px-3 py-2 text-sm hover:bg-white/10 ${loc === location ? "bg-white/5 text-primary" : "text-white"}`,
						children: LOCATION_LABELS[loc]
					}, loc))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-4 right-4 z-[1000] font-mono text-[10px] tracking-widest text-muted-foreground",
				children: [
					backendOnline ? "LIVE" : "OFFLINE",
					" · ",
					air.length,
					" AIR · ",
					sea.length,
					" SEA · ",
					landVehicles.length,
					" LAND"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: mapContainerRef,
				className: "h-full w-full",
				style: { background: "#0a0e17" }
			}),
			!mapReady && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-10 flex items-center justify-center text-sm text-muted-foreground",
				children: "Loading map..."
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 p-4",
				onClick: () => setSelected(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-xl border border-primary/30 bg-black/90 p-5 backdrop-blur-md",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-mono text-[11px] tracking-widest text-primary",
								children: [
									selected.kind === "air" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plane, { className: "h-4 w-4" }),
									selected.kind === "sea" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ship, { className: "h-4 w-4" }),
									selected.kind === "land" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4" }),
									selected.kind === "air" && "AIR COURIER",
									selected.kind === "sea" && "MARITIME LINER",
									selected.kind === "land" && "GROUND SHIPMENT"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelected(null),
								className: "text-muted-foreground hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							})]
						}),
						selected.kind === "air" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xl font-semibold",
									children: selected.data.callsign
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-muted-foreground",
									children: ["Origin: ", selected.data.origin ?? "Unknown"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-muted-foreground",
									children: [
										"Position: ",
										selected.data.lat?.toFixed(2),
										", ",
										selected.data.lng?.toFixed(2)
									]
								}),
								selected.data.altitude != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-muted-foreground",
									children: [
										"Altitude: ",
										Math.round(selected.data.altitude),
										"m"
									]
								}),
								selected.data.velocity != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-muted-foreground",
									children: [
										"Speed: ",
										selected.data.velocity,
										" m/s"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-muted-foreground",
									children: ["Status: ", selected.data.on_ground ? "On ground" : "In flight"]
								})
							]
						}),
						selected.kind === "sea" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xl font-semibold",
									children: selected.data.name ?? selected.data.callsign
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-muted-foreground",
									children: ["MMSI: ", selected.data.mmsi ?? selected.data.id]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-muted-foreground",
									children: [
										"Position: ",
										selected.data.lat?.toFixed(2),
										", ",
										selected.data.lng?.toFixed(2)
									]
								}),
								selected.data.speed != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-muted-foreground",
									children: [
										"Speed: ",
										selected.data.speed,
										" kn"
									]
								})
							]
						}),
						selected.kind === "land" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xl font-semibold",
									children: selected.data.tracking_id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-muted-foreground",
									children: ["Client: ", selected.data.client]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-muted-foreground",
									children: ["Cargo: ", selected.data.cargo]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-muted-foreground",
									children: ["Status: ", selected.data.telemetry?.status_tags]
								})
							]
						})
					]
				})
			})
		]
	});
}
function useAgentStatus() {
	return useQuery({
		queryKey: ["logisecure", "agent-status"],
		queryFn: ({ signal }) => fetchAgentStatus(signal),
		refetchInterval: 6e4,
		staleTime: 55e3,
		retry: 1
	});
}
var RECOMMENDATION = "Reroute 4 vessels via the Cape of Good Hope to bypass the emerging Suez congestion. Projected ETA delta: −38 hours across the fleet. Fuel cost impact: +6.2%. Risk profile downgraded from HIGH to LOW.";
function AIPanel() {
	const [typed, setTyped] = (0, import_react.useState)("");
	const { data: status, isLoading, error } = useAgentStatus();
	const confidence = useCountUp(status?.status === "ready" ? Math.round((status.confidence_threshold ?? .7) * 100) : 94, 1400, 400);
	const agentReady = !error && status?.status === "ready";
	const statusBadge = error ? "OFFLINE" : isLoading ? "SYNC" : agentReady ? "READY" : "STANDBY";
	(0, import_react.useEffect)(() => {
		let i = 0;
		const id = setInterval(() => {
			i++;
			setTyped(RECOMMENDATION.slice(0, i));
			if (i >= 199) clearInterval(id);
		}, 14);
		return () => clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 16
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .5,
			delay: .2
		},
		className: "glass relative overflow-hidden rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl",
				style: { background: "radial-gradient(circle, oklch(0.7 0.22 300 / 0.35), transparent 65%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							className: "h-4 w-4 text-primary-foreground",
							strokeWidth: 2.4
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							className: "absolute inset-0 rounded-xl",
							style: { boxShadow: "0 0 20px oklch(0.78 0.18 220 / 0.7)" },
							animate: { opacity: [
								.4,
								1,
								.4
							] },
							transition: {
								duration: 2,
								repeat: Infinity
							}
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							children: "LogiSecure Copilot"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `rounded-md px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-widest ${agentReady ? "bg-success/15 text-success" : error ? "bg-danger/15 text-destructive" : "bg-amber/15 text-amber"}`,
							children: statusBadge
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] tracking-widest text-muted-foreground",
						children: status?.model ? `${status.provider} · ${status.model.split("/").pop()}` : "AUTONOMOUS RECOMMENDATION · 14:32:07 UTC"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] tracking-widest text-muted-foreground",
						children: "CONFIDENCE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-mono text-2xl font-bold tabular-nums text-primary",
						children: [confidence.toFixed(0), "%"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-4 rounded-xl border border-white/5 bg-black/20 p-4 text-sm leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, { className: "h-3 w-3" }), "MARITIME · CORRIDOR OPTIMIZATION"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground/90",
						children: typed
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: typed.length < 199 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						className: "ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-primary",
						animate: { opacity: [
							1,
							0,
							1
						] },
						transition: {
							duration: .8,
							repeat: Infinity
						}
					}) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-3 gap-2",
				children: [
					{
						label: "ETA GAIN",
						value: "-38h",
						tone: "text-success"
					},
					{
						label: "COST",
						value: "+6.2%",
						tone: "text-amber"
					},
					{
						label: "RISK",
						value: "LOW",
						tone: "text-primary"
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-white/5 bg-white/[0.02] p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[9px] tracking-widest text-muted-foreground",
						children: s.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mt-1 font-mono text-lg font-bold ${s.tone}`,
						children: s.value
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/ai-copilot",
					className: "group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98]",
					style: { background: "linear-gradient(135deg, oklch(0.78 0.18 220), oklch(0.72 0.22 200))" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative",
							children: "Open AI Copilot"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "relative h-4 w-4 transition-transform group-hover:translate-x-0.5" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "rounded-xl border border-white/5 bg-white/[0.03] px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground",
					children: "Simulate"
				})]
			})
		]
	});
}
var SEVERITIES = [
	"ALL",
	"CRITICAL",
	"HIGH",
	"MEDIUM",
	"LOW"
];
var SEV_STYLES = {
	CRITICAL: "border-destructive/40 bg-destructive/10 text-destructive",
	HIGH: "border-amber/40 bg-amber/10 text-amber",
	MEDIUM: "border-amber/30 bg-amber/5 text-amber",
	LOW: "border-primary/30 bg-primary/5 text-primary"
};
function GlobalAlerts() {
	const { data, isLoading, isFetching, error, dismissedKeys } = useLogisecure();
	const [filter, setFilter] = (0, import_react.useState)("ALL");
	const events = (0, import_react.useMemo)(() => {
		const sorted = sortEventsBySeverity(data?.geopolitical_threats?.events ?? []);
		return filter === "ALL" ? sorted : sorted.filter((e) => (e.severity ?? "").toUpperCase() === filter);
	}, [data, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 12
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .5,
			delay: .15
		},
		className: "glass flex flex-col overflow-hidden rounded-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-white/5 px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 font-mono text-[10px] tracking-widest text-amber",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "RISK & ALERTS · GEOPOLITICAL" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 text-sm font-semibold tracking-tight",
					children: [
						"Live threat feed · ",
						data?.geopolitical_threats?.summary?.total_events ?? 0,
						" events"
					]
				})] }), isFetching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4 w-4 text-muted-foreground" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-1 border-b border-white/5 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "mr-1 h-3 w-3 text-muted-foreground" }), SEVERITIES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilter(s),
					className: `rounded-md border px-2 py-1 font-mono text-[9px] tracking-widest transition-colors ${filter === s ? "border-primary/40 bg-primary/10 text-primary" : "border-white/5 bg-white/[0.02] text-muted-foreground hover:text-foreground"}`,
					children: s
				}, s))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-[420px] space-y-2 overflow-y-auto px-3 py-3",
				children: [
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive",
						children: "Backend unreachable. Verify the LogiSecure API is running."
					}) : null,
					!error && events.length === 0 && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 text-center text-xs text-muted-foreground",
						children: "No threat events for this filter."
					}),
					isLoading && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 text-center text-xs text-muted-foreground",
						children: "Loading live threat feed…"
					}),
					events.map((e, i) => {
						const key = threatEventKey(e);
						const sev = (e.severity ?? "LOW").toUpperCase();
						const dismissed = dismissedKeys.has(key);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-xl border p-3 ${SEV_STYLES[sev] ?? SEV_STYLES.LOW} ${dismissed ? "opacity-50" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2 font-mono text-[9px] tracking-widest",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: sev
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: e.published ? new Date(e.published).toLocaleString([], {
											month: "short",
											day: "numeric",
											hour: "2-digit",
											minute: "2-digit"
										}) : ""
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 line-clamp-3 text-sm font-medium leading-snug text-foreground",
									children: e.event
								}),
								e.lat != null && e.lng != null || e.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1.5 flex items-center gap-2 font-mono text-[9px] tracking-widest text-muted-foreground",
									children: [e.lat != null && e.lng != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										Number(e.lat).toFixed(2),
										", ",
										Number(e.lng).toFixed(2)
									] }), e.link && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: e.link,
										target: "_blank",
										rel: "noreferrer",
										className: "ml-auto inline-flex items-center gap-1 text-primary hover:underline",
										children: ["SOURCE ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })]
									})]
								}) : null
							]
						}, key + i);
					})
				]
			})
		]
	});
}
var THROUGHPUT = Array.from({ length: 24 }, (_, i) => ({
	h: `${i.toString().padStart(2, "0")}:00`,
	air: 220 + Math.round(Math.sin(i * .5) * 40 + Math.random() * 30),
	sea: 140 + Math.round(Math.cos(i * .4) * 30 + Math.random() * 20),
	ground: 300 + Math.round(Math.sin(i * .3 + 1) * 60 + Math.random() * 40)
}));
var REGIONS = [
	{
		r: "NA",
		v: 92
	},
	{
		r: "EU",
		v: 88
	},
	{
		r: "APAC",
		v: 76
	},
	{
		r: "LATAM",
		v: 81
	},
	{
		r: "MEA",
		v: 69
	},
	{
		r: "OCE",
		v: 85
	}
];
function TooltipCard({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-strong rounded-lg px-3 py-2 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-1 font-mono text-[10px] tracking-widest text-muted-foreground",
			children: label
		}), payload.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-1.5 w-1.5 rounded-full",
					style: { background: p.color }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: p.dataKey
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-auto font-mono font-semibold",
					children: p.value
				})
			]
		}, p.dataKey))]
	});
}
function ThroughputChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 16
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .5,
			delay: .15
		},
		className: "glass rounded-2xl p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-[10px] tracking-widest text-muted-foreground",
				children: "NETWORK THROUGHPUT · 24H"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-sm font-semibold",
				children: "Shipments per hour"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-3 text-[10px]",
				children: [
					{
						c: "oklch(0.78 0.18 220)",
						l: "Air"
					},
					{
						c: "oklch(0.82 0.15 205)",
						l: "Sea"
					},
					{
						c: "oklch(0.82 0.16 75)",
						l: "Ground"
					}
				].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-1.5 w-1.5 rounded-full",
						style: { background: x.c }
					}), x.l]
				}, x.l))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 h-[180px]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
					data: THROUGHPUT,
					margin: {
						top: 10,
						right: 0,
						left: -20,
						bottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "gAir",
								x1: "0",
								x2: "0",
								y1: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "oklch(0.78 0.18 220)",
									stopOpacity: .55
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "oklch(0.78 0.18 220)",
									stopOpacity: 0
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "gSea",
								x1: "0",
								x2: "0",
								y1: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "oklch(0.82 0.15 205)",
									stopOpacity: .45
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "oklch(0.82 0.15 205)",
									stopOpacity: 0
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "gGround",
								x1: "0",
								x2: "0",
								y1: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "oklch(0.82 0.16 75)",
									stopOpacity: .4
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "oklch(0.82 0.16 75)",
									stopOpacity: 0
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							stroke: "oklch(1 0 0 / 0.05)",
							vertical: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "h",
							tick: {
								fill: "oklch(0.68 0.02 250)",
								fontSize: 10,
								fontFamily: "JetBrains Mono"
							},
							axisLine: false,
							tickLine: false,
							interval: 3
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							tick: {
								fill: "oklch(0.68 0.02 250)",
								fontSize: 10,
								fontFamily: "JetBrains Mono"
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipCard, {}),
							cursor: { stroke: "oklch(0.78 0.18 220 / 0.3)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "ground",
							stroke: "oklch(0.82 0.16 75)",
							strokeWidth: 1.5,
							fill: "url(#gGround)",
							isAnimationActive: true,
							animationDuration: 1400
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "air",
							stroke: "oklch(0.78 0.18 220)",
							strokeWidth: 1.8,
							fill: "url(#gAir)",
							isAnimationActive: true,
							animationDuration: 1400
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "sea",
							stroke: "oklch(0.82 0.15 205)",
							strokeWidth: 1.5,
							fill: "url(#gSea)",
							isAnimationActive: true,
							animationDuration: 1400
						})
					]
				})
			})
		})]
	});
}
function RegionChart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 16
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .5,
			delay: .2
		},
		className: "glass rounded-2xl p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-start justify-between",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-[10px] tracking-widest text-muted-foreground",
				children: "REGIONAL HEALTH INDEX"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-sm font-semibold",
				children: "On-time performance by region"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 h-[180px]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: REGIONS,
					margin: {
						top: 10,
						right: 0,
						left: -20,
						bottom: 0
					},
					barSize: 22,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: "gBar",
							x1: "0",
							x2: "0",
							y1: "0",
							y2: "1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "oklch(0.82 0.15 205)",
								stopOpacity: .95
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "oklch(0.55 0.2 235)",
								stopOpacity: .6
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							stroke: "oklch(1 0 0 / 0.05)",
							vertical: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "r",
							tick: {
								fill: "oklch(0.68 0.02 250)",
								fontSize: 10,
								fontFamily: "JetBrains Mono"
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							tick: {
								fill: "oklch(0.68 0.02 250)",
								fontSize: 10,
								fontFamily: "JetBrains Mono"
							},
							axisLine: false,
							tickLine: false,
							domain: [0, 100]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipCard, {}),
							cursor: { fill: "oklch(1 0 0 / 0.04)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "v",
							fill: "url(#gBar)",
							radius: [
								6,
								6,
								0,
								0
							],
							isAnimationActive: true,
							animationDuration: 1200
						})
					]
				})
			})
		})]
	});
}
var ROWS = [
	{
		id: "AX-1120",
		type: "air",
		origin: "JFK",
		dest: "LHR",
		eta: "01:42",
		progress: 62,
		status: "On time"
	},
	{
		id: "MV-MERIDIAN-7",
		type: "sea",
		origin: "SIN",
		dest: "AMS",
		eta: "18d 04:12",
		progress: 41,
		status: "Rerouted"
	},
	{
		id: "TR-EU-3821",
		type: "ground",
		origin: "BER",
		dest: "MAD",
		eta: "22:15",
		progress: 78,
		status: "On time"
	},
	{
		id: "AX-0442",
		type: "air",
		origin: "SFO",
		dest: "NRT",
		eta: "07:08",
		progress: 34,
		status: "Delayed"
	},
	{
		id: "MV-POLARIS",
		type: "sea",
		origin: "DXB",
		dest: "HKG",
		eta: "6d 12:44",
		progress: 89,
		status: "On time"
	},
	{
		id: "TR-NA-5502",
		type: "ground",
		origin: "LAX",
		dest: "DFW",
		eta: "14:22",
		progress: 12,
		status: "Critical"
	}
];
var ICONS = {
	air: Plane,
	sea: Ship,
	ground: Truck
};
var STATUS_STYLES = {
	"On time": "bg-success/15 text-success",
	Delayed: "bg-amber/15 text-amber",
	Critical: "bg-destructive/15 text-destructive",
	Rerouted: "bg-primary/15 text-primary"
};
function FleetTable() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 16
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .5,
			delay: .25
		},
		className: "glass overflow-hidden rounded-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-[10px] tracking-widest text-muted-foreground",
					children: "ACTIVE MISSIONS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 text-sm font-semibold",
					children: "Priority fleet manifest"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:text-foreground",
					children: [
						"VIEW ALL (",
						ROWS.length * 42,
						")"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[110px_1fr_100px_1fr_110px] gap-3 border-t border-white/5 px-5 py-2 font-mono text-[10px] tracking-widest text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ASSET" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ROUTE" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ETA" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PROGRESS" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-right",
						children: "STATUS"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: ROWS.map((r, i) => {
				const Icon = ICONS[r.type];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: -12
					},
					animate: {
						opacity: 1,
						x: 0
					},
					transition: {
						delay: .4 + i * .06,
						duration: .4
					},
					className: "group grid grid-cols-[110px_1fr_100px_1fr_110px] items-center gap-3 border-t border-white/5 px-5 py-3 text-sm transition-colors hover:bg-white/[0.03]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs",
								children: r.id
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-medium text-foreground",
									children: r.origin
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary/60",
									children: "→"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-medium text-foreground",
									children: r.dest
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-xs tabular-nums",
							children: r.eta
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 flex-1 overflow-hidden rounded-full bg-white/5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: "h-full rounded-full",
									style: {
										background: "linear-gradient(90deg, oklch(0.78 0.18 220), oklch(0.82 0.15 205))",
										boxShadow: "0 0 10px oklch(0.78 0.18 220 / 0.6)"
									},
									initial: { width: 0 },
									animate: { width: `${r.progress}%` },
									transition: {
										delay: .6 + i * .06,
										duration: 1.2,
										ease: "easeOut"
									}
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-8 text-right font-mono text-[10px] text-muted-foreground",
								children: [r.progress, "%"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-md px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest ${STATUS_STYLES[r.status]}`,
								children: r.status.toUpperCase()
							})
						})
					]
				}, r.id);
			}) })
		]
	});
}
function toneFor(sev) {
	const u = (sev ?? "").toUpperCase();
	if (u === "CRITICAL") return "danger";
	if (u === "HIGH" || u === "MEDIUM") return "warn";
	return "info";
}
var TONES = {
	danger: {
		text: "text-destructive",
		bg: "bg-destructive/10",
		border: "border-destructive/30"
	},
	warn: {
		text: "text-amber",
		bg: "bg-amber/10",
		border: "border-amber/30"
	},
	info: {
		text: "text-primary",
		bg: "bg-primary/10",
		border: "border-primary/30"
	}
};
function Notifications() {
	const { newEvents, dismissEvent } = useLogisecure();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed top-4 right-4 z-40 flex w-[min(360px,92vw)] flex-col gap-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			initial: false,
			children: newEvents.slice(0, 4).map((n) => {
				const key = threatEventKey(n);
				const tone = toneFor(n.severity);
				const t = TONES[tone];
				const Icon = tone === "danger" ? ShieldAlert : TriangleAlert;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					layout: true,
					initial: {
						opacity: 0,
						x: 40,
						scale: .96
					},
					animate: {
						opacity: 1,
						x: 0,
						scale: 1
					},
					exit: {
						opacity: 0,
						x: 60,
						scale: .94
					},
					transition: {
						type: "spring",
						stiffness: 380,
						damping: 32
					},
					className: `glass-strong pointer-events-auto flex items-start gap-3 rounded-xl border p-3 ${t.border}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `grid h-8 w-8 shrink-0 place-items-center rounded-lg ${t.bg} ${t.text}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "truncate text-sm font-medium",
									children: [(n.severity ?? "").toUpperCase(), " · New threat"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 font-mono text-[9px] tracking-widest text-muted-foreground",
									children: n.published ? new Date(n.published).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit"
									}) : "NOW"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 line-clamp-2 text-xs text-muted-foreground",
								children: n.event
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => dismissEvent(key),
							"aria-label": "Dismiss notification",
							className: "grid h-6 w-6 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
						})
					]
				}, key);
			})
		})
	});
}
var MESSAGES = [
	"Connecting to fleet…",
	"Analyzing global routes…",
	"Syncing 12,480 assets…",
	"Receiving weather telemetry…",
	"Booting AI copilot…"
];
function LoadingScreen({ onDone }) {
	const [i, setI] = (0, import_react.useState)(0);
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const msg = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 500);
		const prog = setInterval(() => setProgress((p) => Math.min(100, p + Math.random() * 12)), 120);
		const t = setTimeout(() => {
			clearInterval(msg);
			clearInterval(prog);
			setProgress(100);
			setTimeout(onDone, 350);
		}, 2400);
		return () => {
			clearInterval(msg);
			clearInterval(prog);
			clearTimeout(t);
		};
	}, [onDone]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl",
		initial: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .4 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex w-[min(520px,90vw)] flex-col items-center gap-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-32 w-32",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "absolute inset-0 rounded-full border border-primary/40",
							animate: { rotate: 360 },
							transition: {
								duration: 8,
								repeat: Infinity,
								ease: "linear"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "absolute inset-3 rounded-full border border-accent/30",
							animate: { rotate: -360 },
							transition: {
								duration: 6,
								repeat: Infinity,
								ease: "linear"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "absolute inset-0 rounded-full",
							style: { boxShadow: "0 0 60px oklch(0.78 0.18 220 / 0.6)" },
							animate: { scale: [
								1,
								1.06,
								1
							] },
							transition: {
								duration: 2,
								repeat: Infinity
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-6 grid place-items-center rounded-full bg-primary/10 backdrop-blur",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-2xl font-bold text-gradient",
								children: "AX"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-2 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-xs tracking-[0.4em] text-primary/80",
						children: "LOGISECURE · COMMAND"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 6
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -6
							},
							transition: { duration: .25 },
							className: "text-sm text-muted-foreground",
							children: MESSAGES[i]
						}, i)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[3px] w-full overflow-hidden rounded-full bg-white/5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "h-full rounded-full",
							style: {
								background: "linear-gradient(90deg, oklch(0.78 0.18 220), oklch(0.82 0.15 205))",
								boxShadow: "0 0 12px oklch(0.78 0.18 220 / 0.7)"
							},
							animate: { width: `${progress}%` },
							transition: { duration: .2 }
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex justify-between font-mono text-[10px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SECURE LINK · TLS 1.3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round(progress), "%"] })]
					})]
				})
			]
		})
	});
}
function WeatherWidget() {
	const { data, location, isLoading, backendOnline } = useLogisecure();
	const w = data?.weather_telemetry;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 12
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { duration: .5 },
		className: "glass rounded-2xl p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 font-mono text-[10px] tracking-widest text-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, { className: "h-3 w-3" }),
					"WEATHER · ",
					LOCATION_LABELS[location].toUpperCase()
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-sm font-semibold",
				children: w?.condition ?? (isLoading ? "…" : backendOnline ? "—" : "Offline")
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-3xl font-bold tabular-nums text-foreground",
				children: w?.temperature != null ? `${Math.round(Number(w.temperature))}°` : "—"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid grid-cols-3 gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thermometer, { className: "h-3 w-3" }),
					label: "TEMP",
					children: w?.temperature != null ? `${Number(w.temperature).toFixed(1)}°C` : "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Metric, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "h-3 w-3" }),
					label: "WIND",
					children: [w?.wind_speed != null ? `${Number(w.wind_speed).toFixed(1)}` : "—", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-0.5 text-[9px] text-muted-foreground",
						children: "m/s"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "h-3 w-3" }),
					label: "HUM",
					children: w?.humidity != null ? `${Math.round(Number(w.humidity))}%` : "—"
				})
			]
		})]
	});
}
function Metric({ icon, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-white/5 bg-white/[0.02] p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1 font-mono text-[9px] tracking-widest text-muted-foreground",
			children: [icon, label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-0.5 font-mono text-sm font-bold text-foreground",
			children
		})]
	});
}
function Index() {
	const [ready, setReady] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogisecureProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: !ready && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, { onDone: () => setReady(true) }, "loader") }),
			ready && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notifications, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.main, {
				initial: {
					opacity: 0,
					y: 12
				},
				animate: {
					opacity: ready ? 1 : 0,
					y: ready ? 0 : 12
				},
				transition: {
					duration: .6,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "mx-auto flex min-h-screen w-full max-w-[1800px] gap-3 p-3 lg:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							"aria-label": "Fleet KPIs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-end justify-between px-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[10px] tracking-widest text-primary/80",
									children: "LOGISECURE · COMMAND OVERVIEW"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-bold tracking-tight text-gradient sm:text-3xl",
									children: "Global Logistics · Live Intelligence"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden items-center gap-2 md:flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative flex h-2 w-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-success" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] tracking-widest text-muted-foreground",
										children: "ALL SYSTEMS OPERATIONAL"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPIGrid, {})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "grid gap-3 xl:grid-cols-[1fr_380px]",
							"aria-label": "Operations map",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[560px] xl:h-[620px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityMap2D, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIPanel, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherWidget, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalAlerts, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegionChart, {})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "grid gap-3 xl:grid-cols-[1fr_1fr]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThroughputChart, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FleetTable, {})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
							className: "mt-2 flex items-center justify-between px-1 pb-4 font-mono text-[10px] tracking-widest text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "LOGISECURE · v4.2.108 · secure operations bus" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 LOGISECURE OPS · ALL SIGNALS ENCRYPTED" })]
						})
					]
				})]
			})
		]
	}) });
}
//#endregion
export { Index as component };
