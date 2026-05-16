import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { FloatingToolbar } from "./floating-toolbar";
import {
  stages, edges, WORLD_W, WORLD_H, NODE_W, NODE_H,
  type Stage, type StageId,
} from "./workflow-data";

export type RuntimeState = "pending" | "running" | "done" | "locked";
export type LogEntry = { t: string; tag: string; msg: string; level?: "info" | "warn" | "ok" };

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const getIcon = (name: string) => {
  const I = (Icons as any)[name] ?? Icons.Circle;
  return I as React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
};

function stateTone(s: RuntimeState) {
  switch (s) {
    case "done":    return { soft: "bg-neutral-100/70 dark:bg-white/[0.04]", text: "text-neutral-500 dark:text-neutral-400" };
    case "running": return { soft: "bg-emerald-50 dark:bg-emerald-950/40", text: "text-emerald-700 dark:text-emerald-400" };
    case "pending": return { soft: "bg-neutral-50 dark:bg-white/[0.03]", text: "text-neutral-500" };
    case "locked":  return { soft: "bg-neutral-100/70 dark:bg-white/[0.04]", text: "text-neutral-500" };
  }
}

/* Compute sub-node positions for a stage (cluster below the card). */
function subPositions(s: Stage) {
  if (!s.subs?.length) return [];
  const n = s.subs.length;
  const perRow = n <= 4 ? n : Math.ceil(n / 2);
  const spacingX = 80;
  const rowH = 84;
  const centerX = s.x + NODE_W / 2;
  const topY = s.y + NODE_H + 56;
  return s.subs.map((sub, i) => {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    const rowCount = (row === Math.floor((n - 1) / perRow)) ? (n - row * perRow) : perRow;
    const x = centerX + (col - (rowCount - 1) / 2) * spacingX;
    const y = topY + row * rowH;
    return { sub, x, y };
  });
}

/* Edge endpoint anchored to card side. */
function anchor(s: Stage, side: "left" | "right" | "top" | "bottom") {
  if (side === "left")   return { x: s.x,             y: s.y + NODE_H / 2 };
  if (side === "right")  return { x: s.x + NODE_W,    y: s.y + NODE_H / 2 };
  if (side === "top")    return { x: s.x + NODE_W / 2, y: s.y };
  return                       { x: s.x + NODE_W / 2, y: s.y + NODE_H };
}

/* Decide edge anchors based on serpentine layout. */
function edgeRoute(from: Stage, to: Stage) {
  if (from.row === to.row) {
    // same row -> horizontal in row direction
    return from.x < to.x
      ? { a: anchor(from, "right"), b: anchor(to, "left") }
      : { a: anchor(from, "left"),  b: anchor(to, "right") };
  }
  // row transition -> vertical
  return { a: anchor(from, "bottom"), b: anchor(to, "top") };
}

function pathFor(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dx) > Math.abs(dy)) {
    const cx = (a.x + b.x) / 2;
    return `M ${a.x} ${a.y} C ${cx} ${a.y}, ${cx} ${b.y}, ${b.x} ${b.y}`;
  } else {
    const cy = (a.y + b.y) / 2;
    return `M ${a.x} ${a.y} C ${a.x} ${cy}, ${b.x} ${cy}, ${b.x} ${b.y}`;
  }
}

/* ------------------------------------------------------------------ */
/* Canvas                                                              */
/* ------------------------------------------------------------------ */

type CanvasProps = {
  running: boolean;
  states: Record<StageId, RuntimeState>;
  activeId: StageId | null;
  logs: LogEntry[];
  onOpenStage: (id: StageId) => void;
};

export function Canvas({ running, states, activeId, logs, onOpenStage }: CanvasProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [view, setView] = useState({ x: 60, y: 20, k: 0.72 });
  const [hover, setHover] = useState<StageId | null>(null);
  const [showLogs, setShowLogs] = useState(true);
  const [showMinimap, setShowMinimap] = useState(true);
  const isMobile = containerSize.w > 0 && containerSize.w < 768;

  const dragRef = useRef<{ sx: number; sy: number; vx: number; vy: number } | null>(null);
  const touchRef = useRef<{ sx: number; sy: number; vx: number; vy: number; pinchDist?: number; pinchK?: number } | null>(null);
  const stageMap = useMemo(() => Object.fromEntries(stages.map((s) => [s.id, s])) as Record<StageId, Stage>, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setContainerSize({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setContainerSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const fit = () => {
    if (!containerSize.w) return;
    const padX = isMobile ? 20 : 80, padY = isMobile ? 20 : 60;
    const k = Math.min(
      (containerSize.w - padX * 2) / WORLD_W,
      (containerSize.h - padY * 2) / WORLD_H,
    );
    const kk = Math.max(0.2, Math.min(1, k));
    setView({
      x: (containerSize.w - WORLD_W * kk) / 2,
      y: (containerSize.h - WORLD_H * kk) / 2,
      k: kk,
    });
  };

  useEffect(() => { if (containerSize.w) fit(); /* eslint-disable-next-line */ }, [containerSize.w, containerSize.h]);

  const zoomIn  = () => setView((v) => ({ ...v, k: Math.min(2, v.k * 1.15) }));
  const zoomOut = () => setView((v) => ({ ...v, k: Math.max(0.25, v.k / 1.15) }));

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const rect = wrapRef.current!.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    setView((v) => {
      const k = Math.max(0.25, Math.min(2, v.k * (1 - e.deltaY * 0.0015)));
      const ratio = k / v.k;
      return { k, x: mx - (mx - v.x) * ratio, y: my - (my - v.y) * ratio };
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-node]")) return;
    dragRef.current = { sx: e.clientX, sy: e.clientY, vx: view.x, vy: view.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const nx = d.vx + (e.clientX - d.sx);
    const ny = d.vy + (e.clientY - d.sy);
    setView((v) => ({ ...v, x: nx, y: ny }));
  };
  const stopDrag = () => { dragRef.current = null; };

  /* Touch handlers for mobile pan/pinch */
  const onTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest("[data-node]")) return;
    if (e.touches.length === 1) {
      const t = e.touches[0];
      touchRef.current = { sx: t.clientX, sy: t.clientY, vx: view.x, vy: view.y };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchRef.current = { sx: 0, sy: 0, vx: view.x, vy: view.y, pinchDist: Math.hypot(dx, dy), pinchK: view.k };
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const tr = touchRef.current;
    if (!tr) return;
    if (e.touches.length === 1 && !tr.pinchDist) {
      const t = e.touches[0];
      setView((v) => ({ ...v, x: tr.vx + (t.clientX - tr.sx), y: tr.vy + (t.clientY - tr.sy) }));
    } else if (e.touches.length === 2 && tr.pinchDist && tr.pinchK) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const k = Math.max(0.2, Math.min(2, tr.pinchK * (dist / tr.pinchDist)));
      setView((v) => ({ ...v, k }));
    }
  };
  const onTouchEnd = () => { touchRef.current = null; };

  /* ------------------------------------------------------------------ */
  /* Rendering                                                           */
  /* ------------------------------------------------------------------ */

  return (
    <div
      ref={wrapRef}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative flex-1 overflow-hidden bg-[#fafaf9] dark:bg-neutral-950 cursor-grab active:cursor-grabbing select-none touch-canvas"
    >
      {/* Dotted grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.55] dark:opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(0 0 0 / 0.14) 1px, transparent 1px)",
          backgroundSize: `${24 * view.k}px ${24 * view.k}px`,
          backgroundPosition: `${view.x}px ${view.y}px`,
        }}
      />
      {/* Soft ambient gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.06),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.05),transparent_55%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.12),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.08),transparent_55%)]" />

      {/* World */}
      <div
        className="absolute top-0 left-0"
        style={{
          width: WORLD_W,
          height: WORLD_H,
          transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`,
          transformOrigin: "0 0",
        }}
      >
        {/* Edge layer */}
        <svg
          width={WORLD_W}
          height={WORLD_H}
          className="absolute inset-0 pointer-events-none"
        >
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="rgb(163 163 163)" />
            </marker>
            <marker id="arrow-live" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="rgb(16 185 129)" />
            </marker>
            <linearGradient id="liveGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(16 185 129)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(16 185 129)" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Sub-node dashed connectors */}
          {stages.map((s) => {
            if (!s.subs?.length) return null;
            const subs = subPositions(s);
            const anchorX = s.x + NODE_W / 2;
            const anchorY = s.y + NODE_H;
            return (
              <g key={`sub-${s.id}`}>
                {subs.map(({ x, y }, i) => {
                  const cy = (anchorY + y) / 2;
                  return (
                    <path
                      key={i}
                      d={`M ${anchorX} ${anchorY} C ${anchorX} ${cy}, ${x} ${cy}, ${x} ${y - 22}`}
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeDasharray="3 4"
                      fill="none"
                      className="text-neutral-300 dark:text-white/15"
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Main stage edges */}
          {edges.map((e, i) => {
            const from = stageMap[e.from];
            const to = stageMap[e.to];
            if (!from || !to) return null;

            if (e.feedback) {
              // long arc from monitoring bottom back up to similarity right
              const a = anchor(from, "bottom");
              const b = anchor(to, "right");
              const d = `M ${a.x} ${a.y} C ${a.x} ${a.y + 200}, ${b.x + 340} ${b.y - 80}, ${b.x + 40} ${b.y - 80} S ${b.x + 60} ${b.y}, ${b.x} ${b.y}`;
              return (
                <g key={i}>
                  <path
                    d={d}
                    stroke="rgb(16 185 129)"
                    strokeOpacity="0.4"
                    strokeWidth="1.5"
                    strokeDasharray="2 6"
                    fill="none"
                    markerEnd="url(#arrow-live)"
                  >
                    <animate attributeName="stroke-dashoffset" from="0" to="-200" dur="8s" repeatCount="indefinite" />
                  </path>
                </g>
              );
            }

            const { a, b } = edgeRoute(from, to);
            const d = pathFor(a, b);
            const isActive = running && (states[e.from] === "done" && states[e.to] === "running");
            return (
              <g key={i}>
                <path
                  d={d}
                  stroke={isActive ? "rgb(16 185 129)" : "rgb(163 163 163)"}
                  strokeOpacity={isActive ? 0.9 : 0.45}
                  strokeWidth={isActive ? 2.2 : 1.6}
                  fill="none"
                  markerEnd={isActive ? "url(#arrow-live)" : "url(#arrow)"}
                />
                {isActive && (
                  <path
                    d={d}
                    stroke="rgb(16 185 129)"
                    strokeWidth="2.4"
                    strokeDasharray="6 10"
                    fill="none"
                  >
                    <animate attributeName="stroke-dashoffset" from="0" to="-160" dur="2s" repeatCount="indefinite" />
                  </path>
                )}
                {e.condition && (
                  <g>
                    <rect x={(a.x + b.x) / 2 - 36} y={(a.y + b.y) / 2 - 12} width="72" height="22" rx="11" className="fill-white dark:fill-neutral-900" stroke="rgb(16 185 129)" strokeOpacity="0.6" />
                    <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 + 3} textAnchor="middle" fontSize="11" className="fill-emerald-700 dark:fill-emerald-400" style={{ fontWeight: 600 }}>
                      {e.condition}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Row labels */}
        {[0, 1, 2].map((r) => {
          const yMap = [200, 720, 1240];
          return (
            <div
              key={r}
              className="absolute pointer-events-none text-neutral-400 dark:text-white/30 uppercase tracking-[0.18em]"
              style={{ left: 16, top: yMap[r] - 28, fontSize: 10, fontWeight: 600 }}
            >
              lane {String(r + 1).padStart(2, "0")}
            </div>
          );
        })}

        {/* Sub-nodes */}
        {stages.map((s) =>
          subPositions(s).map(({ sub, x, y }) => {
            const SubIcon = getIcon(sub.icon ?? "Circle");
            const tone =
              sub.tone === "warn"
                ? "border-amber-300 dark:border-amber-700/60 text-amber-700 dark:text-amber-400 bg-amber-50/80 dark:bg-amber-950/30"
                : sub.tone === "muted"
                ? "border-black/[0.06] dark:border-white/[0.08] text-neutral-500 bg-white/80 dark:bg-white/[0.03]"
                : "border-emerald-200/70 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-neutral-900";
            return (
              <div
                key={`${s.id}-${sub.id}`}
                data-node
                className="absolute"
                style={{ left: x - 22, top: y - 22 }}
              >
                <div className={`w-11 h-11 rounded-full border ${tone} flex items-center justify-center shadow-[0_4px_14px_-6px_rgba(0,0,0,0.18)]`}>
                  <SubIcon size={15} strokeWidth={1.8} />
                </div>
                <div
                  className="absolute left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap text-neutral-600 dark:text-neutral-400"
                  style={{ top: 44, fontSize: 10.5, fontWeight: 500 }}
                >
                  {sub.label}
                </div>
              </div>
            );
          })
        )}

        {/* Main stage nodes */}
        {stages.map((s) => (
          <StageNode
            key={s.id}
            stage={s}
            state={states[s.id]}
            isActive={activeId === s.id}
            hovered={hover === s.id}
            onHover={() => setHover(s.id)}
            onLeave={() => setHover((h) => (h === s.id ? null : h))}
            onOpen={() => onOpenStage(s.id)}
          />
        ))}
      </div>

      {/* Live AI status pill */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-neutral-700 dark:text-neutral-300" style={{ fontSize: isMobile ? 10 : 11.5, fontWeight: 550 }}>
          {running && activeId ? `${activeId}` : running ? "running" : activeId ? "paused" : "idle"}
        </span>
      </div>

      {/* Floating toolbar */}
      <FloatingToolbar
        zoom={view.k}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onFit={fit}
        showLogs={showLogs}
        toggleLogs={() => setShowLogs((v) => !v)}
        showMinimap={showMinimap}
        toggleMinimap={() => setShowMinimap((v) => !v)}
      />

      {/* AI logs */}
      <AnimatePresence>
        {showLogs && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={isMobile
              ? "absolute bottom-0 left-0 right-0 z-10 rounded-t-2xl border-t border-black/[0.06] dark:border-white/[0.08] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.2)] overflow-hidden max-h-[45vh]"
              : "absolute bottom-4 right-4 w-[320px] z-10 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] overflow-hidden"
            }
          >
            <div className="px-3 py-2 flex items-center gap-2 border-b border-black/[0.05] dark:border-white/[0.06]">
              <Icons.Terminal size={12} className="text-emerald-500" />
              <span className="text-neutral-700 dark:text-neutral-300" style={{ fontSize: 11.5, fontWeight: 600 }}>live agent log</span>
              <span className="ml-auto text-neutral-400" style={{ fontSize: 10.5 }}>{isMobile ? "" : "v3.2 · 47 agents"}</span>
              {isMobile && (
                <button onClick={() => setShowLogs(false)} className="ml-auto text-neutral-400 hover:text-neutral-700 dark:hover:text-white p-1"><Icons.X size={14} /></button>
              )}
            </div>
            <LogList logs={logs} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimap — hidden on mobile */}
      <AnimatePresence>
        {showMinimap && !isMobile && containerSize.w > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 z-10 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] p-2"
          >
            <Minimap view={view} container={containerSize} states={states} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function LogList({ logs }: { logs: LogEntry[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => { ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" }); }, [logs.length]);
  return (
    <div ref={ref} className="p-2.5 space-y-1.5 max-h-[220px] overflow-y-auto" style={{ fontSize: 11, fontFamily: "ui-monospace, SFMono-Regular, Menlo" }}>
      {logs.map((l, i) => (
        <div key={i} className="flex gap-2 leading-snug">
          <span className="text-neutral-400 shrink-0">{l.t}</span>
          <span className={
            l.level === "warn" ? "text-amber-600 dark:text-amber-400 shrink-0"
            : l.level === "ok" ? "text-emerald-600 dark:text-emerald-400 shrink-0"
            : "text-indigo-500 dark:text-indigo-400 shrink-0"
          }>{l.tag}</span>
          <span className="text-neutral-700 dark:text-neutral-300 break-words">{l.msg}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stage Node                                                          */
/* ------------------------------------------------------------------ */

function StageNode({
  stage, state, isActive, hovered, onHover, onLeave, onOpen,
}: {
  stage: Stage; state: RuntimeState; isActive: boolean; hovered: boolean;
  onHover: () => void; onLeave: () => void; onOpen: () => void;
}) {
  const tone = stateTone(state);
  const Icon = getIcon(stage.icon);
  const isRunning = state === "running";
  const isDone = state === "done";
  const isCore = stage.kind === "core";
  const isShield = stage.kind === "shield";
  const isTrigger = stage.kind === "trigger";
  const isMonitor = stage.kind === "monitor";

  const shapeClass = isShield
    ? "rounded-[28px_10px_28px_10px]"
    : isCore
    ? "rounded-[22px]"
    : "rounded-2xl";

  const accent = isDone
    ? "bg-neutral-200 dark:bg-white/[0.08] text-neutral-500"
    : isCore && isRunning
    ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.55)]"
    : isCore
    ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
    : isShield && isRunning
    ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white"
    : isShield
    ? "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400"
    : isTrigger
    ? "bg-neutral-100 dark:bg-white/[0.06] text-neutral-500"
    : isMonitor && isRunning
    ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white"
    : isMonitor
    ? "bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-400"
    : isRunning
    ? "bg-emerald-500 text-white"
    : "bg-neutral-100 dark:bg-white/[0.06] text-neutral-500";

  return (
    <div
      data-node
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onDoubleClick={onOpen}
      className="absolute cursor-pointer"
      style={{ left: stage.x, top: stage.y, width: NODE_W, height: NODE_H }}
    >
      {/* Halo for running */}
      {isRunning && (
        <>
          <span className={`absolute -inset-2 ${shapeClass} ring-2 ring-emerald-400/50 animate-pulse pointer-events-none`} />
          <span className={`absolute -inset-4 ${shapeClass} bg-emerald-400/10 blur-xl pointer-events-none`} />
        </>
      )}

      <div
        className={[
          "relative w-full h-full",
          shapeClass,
          "border",
          isRunning ? "border-emerald-400/60" : "border-black/[0.06] dark:border-white/[0.08]",
          isDone ? "bg-neutral-50/80 dark:bg-white/[0.02]" : "bg-white dark:bg-neutral-900",
          "shadow-[0_10px_28px_-14px_rgba(0,0,0,0.25)]",
          "transition-all duration-200",
          hovered || isActive ? "ring-2 ring-emerald-400/40 -translate-y-0.5" : "ring-1 ring-transparent",
          isCore && isRunning ? "bg-gradient-to-br from-white to-emerald-50 dark:from-neutral-900 dark:to-emerald-950/40" : "",
          isDone ? "opacity-90" : "",
        ].join(" ")}
      >
        {/* Step badge */}
        <div className="absolute -top-2 -left-2 z-10 w-6 h-6 rounded-full bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.1] flex items-center justify-center text-neutral-600 dark:text-neutral-300" style={{ fontSize: 10.5, fontWeight: 600 }}>
          {stage.step}
        </div>

        <div className="h-full w-full p-3 flex items-center gap-3">
          <div className={`shrink-0 w-10 h-10 ${isShield ? "rounded-[14px_4px_14px_4px]" : isCore ? "rounded-full" : "rounded-xl"} ${accent} flex items-center justify-center`}>
            <Icon size={18} strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <div className={`truncate ${isDone ? "text-neutral-500" : "text-neutral-950 dark:text-white"}`} style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em" }}>
                {stage.title}
              </div>
              <StatePill state={state} />
            </div>
            <div className="truncate text-neutral-500" style={{ fontSize: 11, marginTop: 1 }}>
              {stage.desc}
            </div>
            {stage.metrics && (
              <div className="flex items-center gap-2 mt-1.5">
                {stage.metrics.map((m, i) => (
                  <div
                    key={i}
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md ${tone.soft}`}
                    style={{ fontSize: 10, fontWeight: 500 }}
                  >
                    <span className="text-neutral-500">{m.label}</span>
                    <span className={tone.text} style={{ fontWeight: 600 }}>{m.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Running progress bar */}
        {isRunning && (
          <div className="absolute left-3 right-3 bottom-1 h-[2px] bg-emerald-500/15 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
              style={{ width: "40%" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function StatePill({ state }: { state: RuntimeState }) {
  const isLive = state === "running";
  const map: Record<RuntimeState, { label: string; cls: string }> = {
    done:    { label: "done",   cls: "bg-neutral-100 text-neutral-500 dark:bg-white/[0.05]" },
    running: { label: "live",   cls: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400" },
    pending: { label: "pending",cls: "bg-neutral-100 text-neutral-500 dark:bg-white/[0.06] dark:text-neutral-400" },
    locked:  { label: "locked", cls: "bg-neutral-100 text-neutral-500 dark:bg-white/[0.06] dark:text-neutral-400" },
  };
  const m = map[state];
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full ${m.cls}`} style={{ fontSize: 9.5, fontWeight: 600 }}>
      {isLive && <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />}
      {m.label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Minimap                                                             */
/* ------------------------------------------------------------------ */

function Minimap({ view, container, states }: { view: { x: number; y: number; k: number }; container: { w: number; h: number }; states: Record<StageId, RuntimeState> }) {
  const W = 200, H = 130;
  const sx = W / WORLD_W;
  const sy = H / WORLD_H;
  const s = Math.min(sx, sy);
  const vw = container.w / view.k;
  const vh = container.h / view.k;
  const vx = -view.x / view.k;
  const vy = -view.y / view.k;
  return (
    <svg width={W} height={H} className="block">
      <rect width={W} height={H} rx="8" className="fill-neutral-50 dark:fill-white/[0.04]" />
      {stages.map((stg) => (
        <rect
          key={stg.id}
          x={stg.x * s}
          y={stg.y * s}
          width={NODE_W * s}
          height={NODE_H * s}
          rx="2"
          className={
            states[stg.id] === "running"
              ? "fill-emerald-500"
              : states[stg.id] === "done"
              ? "fill-neutral-300 dark:fill-white/25"
              : "fill-neutral-200 dark:fill-white/15"
          }
        />
      ))}
      <rect
        x={vx * s}
        y={vy * s}
        width={vw * s}
        height={vh * s}
        rx="3"
        className="fill-emerald-400/10 stroke-emerald-500"
        strokeWidth="1"
      />
    </svg>
  );
}
