import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as useQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as AnimatedBackground } from "./AnimatedBackground-DdsEOYWp.mjs";
import { P as ArrowUpDown, y as Plane } from "../_libs/lucide-react.mjs";
import { a as TopBar, i as Sidebar, m as useLogisecure, r as LogisecureProvider, s as fetchAirTrafficByHq } from "./TopBar-CB1msUpY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/air-fleet-BgYQ0k83.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useAirFleet() {
	const { location } = useLogisecure();
	const query = useQuery({
		queryKey: ["air-fleet", location],
		queryFn: ({ signal }) => fetchAirTrafficByHq(location, signal),
		refetchInterval: 15e3,
		refetchOnWindowFocus: false,
		staleTime: 1e4
	});
	return {
		flights: query.data?.flights ?? [],
		totalFlights: query.data?.total_flights ?? 0,
		timestamp: query.data?.timestamp,
		isLoading: query.isLoading,
		isFetching: query.isFetching,
		error: query.error
	};
}
function AirFleetPage() {
	const { flights, totalFlights, timestamp, isLoading, isFetching } = useAirFleet();
	const [sortKey, setSortKey] = (0, import_react.useState)("geo_altitude");
	const [onlyAirborne, setOnlyAirborne] = (0, import_react.useState)(true);
	const rows = (0, import_react.useMemo)(() => {
		return [...onlyAirborne ? flights.filter((f) => !f.on_ground) : flights].sort((a, b) => {
			const av = a[sortKey] ?? -Infinity;
			const bv = b[sortKey] ?? -Infinity;
			if (typeof av === "string") return String(av).localeCompare(String(bv));
			return bv - av;
		});
	}, [
		flights,
		sortKey,
		onlyAirborne
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-[10px] tracking-widest text-muted-foreground",
				children: "AIR FLEET · LIVE TELEMETRY"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-0.5 text-lg font-semibold",
				children: [totalFlights, " aircraft tracked"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOnlyAirborne((v) => !v),
					className: `rounded-lg border border-white/10 px-3 py-1.5 font-mono text-[10px] tracking-widest ${onlyAirborne ? "bg-primary/15 text-primary" : "bg-white/[0.02] text-muted-foreground"}`,
					children: onlyAirborne ? "AIRBORNE ONLY" : "ALL AIRCRAFT"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-[10px] tracking-widest text-muted-foreground",
					children: [isFetching ? "SYNCING…" : "LIVE", timestamp && ` · ${new Date(timestamp).toLocaleTimeString()}`]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass flex-1 overflow-hidden rounded-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[100px_1fr_90px_90px_90px_90px_80px] gap-3 border-b border-white/5 px-5 py-2 font-mono text-[10px] tracking-widest text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CALLSIGN" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ORIGIN COUNTRY" }),
					["geo_altitude", "velocity"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSortKey(k),
						className: `flex items-center gap-1 text-left ${sortKey === k ? "text-primary" : ""}`,
						children: [k === "geo_altitude" ? "ALT (m)" : "SPD (m/s)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "h-2.5 w-2.5" })]
					}, k)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TRACK" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "V/S" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-right",
						children: "STATUS"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-[70vh] overflow-y-auto",
				children: [
					isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 py-8 text-center text-xs text-muted-foreground",
						children: "Loading live telemetry…"
					}),
					!isLoading && rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 py-8 text-center text-xs text-muted-foreground",
						children: "No aircraft matching filter."
					}),
					rows.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: { delay: Math.min(i * .01, .3) },
						className: "grid grid-cols-[100px_1fr_90px_90px_90px_90px_80px] items-center gap-3 border-b border-white/5 px-5 py-2.5 text-sm hover:bg-white/[0.03]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-mono text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plane, { className: "h-3 w-3 text-muted-foreground" }), f.callsign?.trim() || f.icao24]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: f.origin_country
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs tabular-nums",
								children: f.geo_altitude != null ? Math.round(f.geo_altitude) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs tabular-nums",
								children: f.velocity?.toFixed(0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-xs tabular-nums",
								children: [f.true_track?.toFixed(0), "°"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs tabular-nums",
								children: f.vertical_rate != null ? f.vertical_rate.toFixed(1) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-md px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest ${f.on_ground ? "bg-white/10 text-muted-foreground" : "bg-success/15 text-success"}`,
									children: f.on_ground ? "GROUND" : "FLYING"
								})
							})
						]
					}, f.icao24))
				]
			})]
		})]
	});
}
function AirFleetRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogisecureProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedBackground, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.main, {
			initial: {
				opacity: 0,
				y: 12
			},
			animate: {
				opacity: 1,
				y: 0
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AirFleetPage, {})]
			})]
		})]
	}) });
}
//#endregion
export { AirFleetRoute as component };
