import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { t as AnimatedBackground } from "./AnimatedBackground-DdsEOYWp.mjs";
import { S as LoaderCircle, _ as Route, d as Ship, j as CircleCheck, l as Terminal, s as TriangleAlert, u as Sparkles } from "../_libs/lucide-react.mjs";
import { a as TopBar, d as postAgentAnalyze, i as Sidebar, r as LogisecureProvider } from "./TopBar-CB1msUpY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-copilot-DDrGw7dv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useAgentAnalyze() {
	return useMutation({ mutationFn: (input) => postAgentAnalyze(input) });
}
var SEVERITY_OPTIONS = [
	"Low",
	"Medium",
	"High",
	"Critical"
];
var EMPTY_FORM = {
	type: "",
	location: "",
	severity: "High",
	description: "",
	estimated_duration: "",
	affected_assets: ""
};
function AICopilot() {
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const { mutate, data, isPending, isError, error, reset } = useAgentAnalyze();
	const update = (key) => (e) => setForm((f) => ({
		...f,
		[key]: e.target.value
	}));
	const canSubmit = form.type && form.location && form.description;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-bold tracking-tight",
						children: "AI Copilot"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Report an incident and let the agent analyze impact, reroute shipments, and draft an execution plan."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 font-mono text-[10px] tracking-widest text-muted-foreground",
					children: "INCIDENT REPORT"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Type",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.type,
								onChange: update("type"),
								placeholder: "Port Strike, Weather Delay...",
								className: "input-field"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Location",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.location,
								onChange: update("location"),
								placeholder: "Rotterdam",
								className: "input-field"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Severity",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1.5",
								children: SEVERITY_OPTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setForm((f) => ({
										...f,
										severity: s
									})),
									className: `flex-1 rounded-lg border px-2 py-1.5 text-xs transition-colors ${form.severity === s ? "border-primary/40 bg-primary/10 text-primary" : "border-white/5 text-muted-foreground hover:bg-white/5"}`,
									children: s
								}, s))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Description",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: form.description,
								onChange: update("description"),
								rows: 3,
								placeholder: "Dock workers strike affecting all container operations",
								className: "input-field resize-none"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Estimated duration",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.estimated_duration,
								onChange: update("estimated_duration"),
								placeholder: "7 days",
								className: "input-field"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Affected assets",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.affected_assets,
								onChange: update("affected_assets"),
								placeholder: "5 cargo ships, 10,000 containers",
								className: "input-field"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: !canSubmit || isPending,
							onClick: () => mutate(form),
							className: "mt-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98] disabled:opacity-40",
							style: { background: "linear-gradient(135deg, oklch(0.78 0.18 220), oklch(0.72 0.22 200))" },
							children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Running analysis..."] }) : "Run analysis"
						}),
						data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setForm(EMPTY_FORM);
								reset();
							},
							className: "text-xs text-muted-foreground hover:text-foreground",
							children: "New incident"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass flex items-center gap-2 rounded-xl border border-red-500/20 p-4 text-sm text-red-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 shrink-0" }), error?.message ?? "Analysis failed. Check that the backend is running."]
					}),
					!data && !isPending && !isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass flex flex-1 items-center justify-center rounded-2xl p-12 text-sm text-muted-foreground",
						children: "Submit an incident report to see the agent's analysis here."
					}),
					isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-2xl p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-2 font-mono text-[10px] tracking-widest text-muted-foreground",
							children: "AGENT WORKFLOW"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), "Monitoring · detecting · correlating · inferring · executing..."]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm font-semibold",
											children: [
												data.analysis.incident_data.type,
												" · ",
												data.analysis.incident_data.location
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-md px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest ${data.analysis.incident_data.severity === "High" ? "bg-danger/15 text-destructive" : "bg-amber/15 text-amber"}`,
											children: data.analysis.incident_data.severity?.toUpperCase()
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: data.analysis.incident_data.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex gap-4 font-mono text-[11px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Duration: ", data.analysis.incident_data.estimated_duration] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Assets: ", data.analysis.incident_data.affected_assets] })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl p-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-3 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ship, { className: "h-3 w-3" }),
											" AFFECTED SHIPMENTS (",
											data.analysis.affected_shipments.length,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-col gap-2",
										children: data.analysis.affected_shipments.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono",
													children: s.id
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: s.cargo
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: s.location
												})
											]
										}, s.id))
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl p-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-3 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, { className: "h-3 w-3" }), " ALTERNATIVE ROUTES"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-col gap-2",
										children: data.analysis.alternative_routes.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.route }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: r.time
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: r.priority === "High" ? "text-destructive" : r.priority === "Medium" ? "text-amber" : "text-muted-foreground",
													children: r.priority
												})
											]
										}, r.route))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-3 w-3" }), " EXECUTION LOG"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col gap-1.5 font-mono text-xs text-muted-foreground",
									children: data.analysis.messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: m }, i))
								})]
							}),
							data.analysis.alerts.length > 0 && data.analysis.alerts[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass flex items-center gap-2 rounded-xl border border-success/20 p-3 text-xs text-success",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 shrink-0" }),
									data.analysis.alerts[0].message,
									" · ",
									new Date(data.analysis.alerts[0].timestamp).toLocaleTimeString()
								]
							})
						]
					}) })
				]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-[10px] tracking-widest text-muted-foreground",
			children: label.toUpperCase()
		}), children]
	});
}
function AICopilotPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogisecureProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedBackground, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex min-h-screen w-full max-w-[1800px] gap-3 p-3 lg:p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AICopilot, {})]
			})]
		})]
	}) });
}
//#endregion
export { AICopilotPage as component };
