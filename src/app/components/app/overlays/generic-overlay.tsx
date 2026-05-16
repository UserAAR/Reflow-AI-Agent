import { motion } from "motion/react";
import * as Icons from "lucide-react";
import type { Stage } from "../workflow-data";
import type { RuntimeState } from "../../../pages/app";

const getIcon = (name: string) => {
  const I = (Icons as any)[name] ?? Icons.Circle;
  return I as React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
};

export function GenericOverlay({
  stage, state, onClose,
}: {
  stage: Stage;
  state: RuntimeState;
  onClose: () => void;
}) {
  const Icon = getIcon(stage.icon);
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/55 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="relative w-[min(720px,96vw)] max-h-[90vh] rounded-2xl bg-white dark:bg-neutral-950 border border-black/[0.06] dark:border-white/[0.08] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col"
      >
        <div className="h-14 px-5 flex items-center gap-3 border-b border-black/[0.05] dark:border-white/[0.06] shrink-0">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            stage.kind === "shield" ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white"
            : stage.kind === "monitor" ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white"
            : stage.kind === "core" ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white"
            : stage.kind === "trigger" ? "bg-neutral-100 dark:bg-white/[0.06] text-neutral-500"
            : "bg-emerald-500 text-white"
          }`}>
            <Icon size={15} strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-neutral-400" style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.12em" }}>
              STAGE {String(stage.step).padStart(2, "0")}
              <StatePill state={state} />
            </div>
            <div className="text-neutral-950 dark:text-white" style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>
              {stage.title}
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg text-neutral-500 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.05] flex items-center justify-center">
            <Icons.X size={14} />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 sm:space-y-5">
          <p className="text-neutral-600 dark:text-neutral-400" style={{ fontSize: 13, lineHeight: "1.55" }}>{stage.desc}</p>

          {stage.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {stage.metrics.map((m, i) => (
                <div key={i} className="rounded-xl border border-black/[0.05] dark:border-white/[0.06] bg-neutral-50/60 dark:bg-white/[0.02] px-3 py-2.5">
                  <div className="text-neutral-500" style={{ fontSize: 10.5 }}>{m.label}</div>
                  <div className="mt-0.5 text-neutral-950 dark:text-white tabular-nums" style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.015em" }}>{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {stage.subs && (
            <div>
              <div className="mb-2 text-neutral-400 uppercase tracking-[0.14em]" style={{ fontSize: 10.5, fontWeight: 600 }}>parallel modules · {stage.subs.length}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {stage.subs.map((sub) => {
                  const SI = getIcon(sub.icon ?? "Circle");
                  const dot = sub.tone === "warn" ? "bg-amber-500" : sub.tone === "muted" ? "bg-neutral-400" : "bg-emerald-500";
                  return (
                    <div key={sub.id} className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-black/[0.05] dark:border-white/[0.06] bg-white dark:bg-white/[0.02]">
                      <SI size={13} className="text-neutral-500" strokeWidth={1.8} />
                      <span className="text-neutral-800 dark:text-neutral-200 flex-1" style={{ fontSize: 12 }}>{sub.label}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {stage.id === "approval" && (
            <div className="rounded-xl border border-indigo-200/60 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 p-4">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400" style={{ fontSize: 12, fontWeight: 600 }}>
                <Icons.ShieldAlert size={13} /> AI recommendation
              </div>
              <p className="mt-1.5 text-neutral-700 dark:text-neutral-300" style={{ fontSize: 12.5, lineHeight: "1.55" }}>
                Approve launch of <strong>Bravo Organic Yogurt 500g</strong> across 40 of 42 eligible branches at ₼ 4.49. Aggregate confidence 94%. Audit trail #84-9120 ready for review.
              </p>
              <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button className="h-10 sm:h-9 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white" style={{ fontSize: 12.5, fontWeight: 550 }}>Approve & continue</button>
                <button className="h-10 sm:h-9 px-3 rounded-lg border border-black/[0.06] dark:border-white/[0.08]" style={{ fontSize: 12.5 }}>Send back</button>
              </div>
            </div>
          )}
        </div>

        <div className="h-13 px-5 py-3 border-t border-black/[0.05] dark:border-white/[0.06]">
          <button onClick={onClose} className="ml-auto block h-9 px-3 rounded-lg border border-black/[0.06] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.04]" style={{ fontSize: 12.5 }}>
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatePill({ state }: { state: RuntimeState }) {
  const map: Record<RuntimeState, string> = {
    done:    "bg-neutral-100 text-neutral-500 dark:bg-white/[0.05]",
    running: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    pending: "bg-neutral-100 text-neutral-500 dark:bg-white/[0.06] dark:text-neutral-400",
    locked:  "bg-neutral-100 text-neutral-500 dark:bg-white/[0.06] dark:text-neutral-400",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full ${map[state]}`} style={{ fontSize: 9.5 }}>
      {state === "running" && <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />}
      {state}
    </span>
  );
}
