import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import type { Stage } from "./workflow-data";

const getIcon = (name: string) => {
  const I = (Icons as any)[name] ?? Icons.Circle;
  return I as React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
};

export function NodeDrawer({ stage, onClose }: { stage: Stage | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {stage && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-30 bg-black/10 dark:bg-black/40 backdrop-blur-[1px]"
          />
          <motion.aside
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 420, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="absolute right-0 top-0 bottom-0 w-[420px] z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl border-l border-black/[0.06] dark:border-white/[0.08] shadow-[-30px_0_80px_-40px_rgba(0,0,0,0.35)] flex flex-col"
          >
            <DrawerBody stage={stage} onClose={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function DrawerBody({ stage, onClose }: { stage: Stage; onClose: () => void }) {
  const Icon = getIcon(stage.icon);
  const isRunning = stage.state === "running";
  const isDone = stage.state === "done";

  return (
    <>
      <div className="px-5 py-4 flex items-start gap-3 border-b border-black/[0.05] dark:border-white/[0.06]">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          stage.kind === "core" ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white"
          : stage.kind === "shield" ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white"
          : stage.kind === "monitor" ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white"
          : stage.kind === "trigger" ? "bg-neutral-100 dark:bg-white/[0.06] text-neutral-500"
          : "bg-emerald-500 text-white"
        }`}>
          <Icon size={18} strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-neutral-400" style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.12em" }}>
            STAGE {String(stage.step).padStart(2, "0")}
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full ${
              isRunning ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
              : isDone ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
              : "bg-neutral-100 text-neutral-500 dark:bg-white/[0.06]"
            }`} style={{ fontSize: 9.5 }}>
              {isRunning && <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />}
              {stage.state}
            </span>
          </div>
          <div className="mt-0.5 text-neutral-950 dark:text-white" style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.015em" }}>
            {stage.title}
          </div>
          <div className="text-neutral-500" style={{ fontSize: 12, marginTop: 2 }}>
            {stage.desc}
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg text-neutral-500 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.05] flex items-center justify-center"
        >
          <Icons.X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {stage.metrics && stage.metrics.length > 0 && (
          <section>
            <SectionTitle>metrics</SectionTitle>
            <div className="grid grid-cols-2 gap-2">
              {stage.metrics.map((m, i) => (
                <div key={i} className="rounded-xl border border-black/[0.05] dark:border-white/[0.06] bg-neutral-50/60 dark:bg-white/[0.02] px-3 py-2.5">
                  <div className="text-neutral-500" style={{ fontSize: 10.5 }}>{m.label}</div>
                  <div className="mt-0.5 text-neutral-950 dark:text-white tabular-nums" style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.015em" }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {stage.subs && stage.subs.length > 0 && (
          <section>
            <SectionTitle>parallel modules · {stage.subs.length}</SectionTitle>
            <div className="grid grid-cols-1 gap-1.5">
              {stage.subs.map((sub) => {
                const SI = getIcon(sub.icon ?? "Circle");
                const dot = sub.tone === "warn" ? "bg-amber-500" : sub.tone === "muted" ? "bg-neutral-400" : "bg-emerald-500";
                return (
                  <div key={sub.id} className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-black/[0.05] dark:border-white/[0.06] bg-white dark:bg-white/[0.02] hover:bg-neutral-50 dark:hover:bg-white/[0.04] transition-colors">
                    <SI size={14} className="text-neutral-500" strokeWidth={1.8} />
                    <span className="text-neutral-800 dark:text-neutral-200" style={{ fontSize: 12.5 }}>{sub.label}</span>
                    <span className={`ml-auto w-1.5 h-1.5 rounded-full ${dot}`} />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section>
          <SectionTitle>activity</SectionTitle>
          <div className="space-y-2">
            {[
              ["12:04:21", "completed input ingestion"],
              ["12:04:23", "validated against 12 rules"],
              ["12:04:25", "agents dispatched"],
            ].map(([t, m], i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-neutral-700 dark:text-neutral-300" style={{ fontSize: 12 }}>{m}</div>
                  <div className="text-neutral-400" style={{ fontSize: 10.5 }}>{t}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="px-5 py-3 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center gap-2">
        <button className="flex-1 h-9 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:opacity-90 transition" style={{ fontSize: 12.5, fontWeight: 550 }}>
          Open full run
        </button>
        <button className="h-9 px-3 rounded-lg border border-black/[0.06] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.04]" style={{ fontSize: 12.5 }}>
          Re-run
        </button>
      </div>
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 text-neutral-400 uppercase tracking-[0.14em]" style={{ fontSize: 10.5, fontWeight: 600 }}>
      {children}
    </div>
  );
}
