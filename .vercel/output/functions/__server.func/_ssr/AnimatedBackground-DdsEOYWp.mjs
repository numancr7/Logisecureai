import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AnimatedBackground-DdsEOYWp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnimatedBackground() {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let raf = 0;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const resize = () => {
			canvas.width = window.innerWidth * dpr;
			canvas.height = window.innerHeight * dpr;
			canvas.style.width = `${window.innerWidth}px`;
			canvas.style.height = `${window.innerHeight}px`;
		};
		resize();
		window.addEventListener("resize", resize);
		const N = 60;
		const particles = Array.from({ length: N }, () => ({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			vx: (Math.random() - .5) * .2 * dpr,
			vy: (Math.random() - .5) * .2 * dpr,
			r: (Math.random() * 1.6 + .4) * dpr
		}));
		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
				if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
			}
			for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
				const a = particles[i];
				const b = particles[j];
				const dx = a.x - b.x;
				const dy = a.y - b.y;
				const d2 = dx * dx + dy * dy;
				const max = 140 * dpr;
				if (d2 < max * max) {
					const alpha = 1 - Math.sqrt(d2) / max;
					ctx.strokeStyle = `rgba(120, 180, 255, ${alpha * .12})`;
					ctx.lineWidth = dpr * .5;
					ctx.beginPath();
					ctx.moveTo(a.x, a.y);
					ctx.lineTo(b.x, b.y);
					ctx.stroke();
				}
			}
			for (const p of particles) {
				ctx.fillStyle = "rgba(160, 210, 255, 0.55)";
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fill();
			}
			raf = requestAnimationFrame(draw);
		};
		draw();
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				"aria-hidden": true,
				className: "absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-3xl",
				style: { background: "radial-gradient(circle, oklch(0.55 0.22 235 / 0.35), transparent 65%)" },
				animate: {
					x: [
						0,
						80,
						0
					],
					y: [
						0,
						40,
						0
					]
				},
				transition: {
					duration: 22,
					repeat: Infinity,
					ease: "easeInOut"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				"aria-hidden": true,
				className: "absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full blur-3xl",
				style: { background: "radial-gradient(circle, oklch(0.55 0.2 200 / 0.28), transparent 65%)" },
				animate: {
					x: [
						0,
						-60,
						0
					],
					y: [
						0,
						-40,
						0
					]
				},
				transition: {
					duration: 26,
					repeat: Infinity,
					ease: "easeInOut"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				"aria-hidden": true,
				className: "absolute -bottom-40 left-1/3 h-[560px] w-[560px] rounded-full blur-3xl",
				style: { background: "radial-gradient(circle, oklch(0.45 0.22 285 / 0.28), transparent 65%)" },
				animate: {
					x: [
						0,
						40,
						0
					],
					y: [
						0,
						-30,
						0
					]
				},
				transition: {
					duration: 30,
					repeat: Infinity,
					ease: "easeInOut"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 animated-grid opacity-40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "absolute inset-0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				style: { background: "radial-gradient(ellipse at center, transparent 40%, oklch(0.08 0.02 260 / 0.7) 100%)" }
			})
		]
	});
}
//#endregion
export { AnimatedBackground as t };
