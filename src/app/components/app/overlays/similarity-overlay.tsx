import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Brain, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import type { Stage } from "../workflow-data";

const SEARCH_THUMBS = [
  "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=400&q=70",
  "https://images.unsplash.com/photo-1571212515416-fef07f5e1f44?auto=format&fit=crop&w=400&q=70",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=70",
  "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=70",
  "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=400&q=70",
  "https://images.unsplash.com/photo-1628689469838-524a4a973b8e?auto=format&fit=crop&w=400&q=70",
];

const FINAL_MATCH = {
  image: SEARCH_THUMBS[0],
  title: "Bravo Organic Yogurt 500g",
  brand: "Bravo Organic",
  category: "Dairy · Yogurt",
  matchPct: 94.6,
  similarSkus: 247,
  summary:
    "Closest historical analogue: Bravo Organic Yogurt 400g. Identical pack family, same dairy family, +25% volume. Seasonal demand pattern matches Q1 launches in 2024-2025.",
};

const AGENT_LOGS = [
  "spawning 8 parallel similarity agents",
  "category match · 98.2%",
  "subcategory match · 96.8%",
  "price band detection · 91.0%",
  "packaging analysis · 94.4%",
  "brand positioning · 92.1%",
  "historical pattern match · 95.7%",
  "seasonal similarity · 89.3%",
  "merging agent scores into core",
];

export function SimilarityOverlay({
  stage, onLog, onComplete, onClose, manual,
}: {
  stage: Stage;
  onLog: (tag: string, msg: string, level?: "info" | "warn" | "ok") => void;
  onComplete: () => void;
  onClose: () => void;
  manual: boolean;
}) {
  const [thumbIdx, setThumbIdx] = useState(0);
  const [phase, setPhase] = useState<"searching" | "matched">("searching");
  const [logIdx, setLogIdx] = useState(0);

  useEffect(() => {
    if (phase !== "searching") return;
    const t = window.setInterval(() => setThumbIdx((i) => (i + 1) % SEARCH_THUMBS.length), 380);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "searching") return;
    if (logIdx >= AGENT_LOGS.length) {
      window.setTimeout(() => {
        setPhase("matched");
        onLog(stage.id, `match resolved · ${FINAL_MATCH.title} · ${FINAL_MATCH.matchPct}%`, "ok");
      }, 500);
      return;
    }
    const t = window.setTimeout(() => {
      onLog(stage.id, AGENT_LOGS[logIdx], "info");
      setLogIdx((i) => i + 1);
    }, 420);
    return () => clearTimeout(t);
  }, [logIdx, phase, onLog, stage.id]);

  const submit = () => {
    onLog(stage.id, "match accepted · advancing", "ok");
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/55 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="relative w-[min(1120px,98vw)] h-[min(720px,96vh)] rounded-2xl bg-white dark:bg-neutral-950 border border-black/[0.06] dark:border-white/[0.08] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="h-14 px-5 flex items-center gap-3 border-b border-black/[0.05] dark:border-white/[0.06] shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center shadow-[0_6px_18px_-6px_rgba(16,185,129,0.55)]">
            <Brain size={15} strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-neutral-400" style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.12em" }}>
              STAGE 04 · SIMILARITY INTELLIGENCE
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full ${
                phase === "searching"
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                  : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
              }`} style={{ fontSize: 9.5 }}>
                {phase === "searching"
                  ? <><span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> searching</>
                  : <><CheckCircle2 size={9} /> matched</>}
              </span>
            </div>
            <div className="text-neutral-950 dark:text-white" style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>
              {phase === "searching" ? "AI is searching similar products…" : "Top match resolved"}
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={!manual && phase === "searching"}
            className="w-8 h-8 rounded-lg text-neutral-500 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] min-h-0 overflow-hidden">
          {/* LEFT — cycling product visuals */}
          <div className="relative p-4 sm:p-6 lg:border-r border-b lg:border-b-0 border-black/[0.05] dark:border-white/[0.06] bg-gradient-to-br from-neutral-50 to-emerald-50/30 dark:from-neutral-950 dark:to-emerald-950/20 flex flex-col min-h-[200px] lg:min-h-0">
            <SectionTitle>{phase === "searching" ? "scanning visual space" : "matched product"}</SectionTitle>

            <div className="relative flex-1 flex items-center justify-center">
              {/* Pulsing rings */}
              {phase === "searching" && (
                <>
                  <span className="absolute w-48 sm:w-72 h-48 sm:h-72 rounded-full border border-emerald-300/30 animate-ping" />
                  <span className="absolute w-36 sm:w-56 h-36 sm:h-56 rounded-full border border-emerald-400/40 animate-pulse" />
                </>
              )}

              <div className="relative w-40 h-40 sm:w-64 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.06] dark:border-white/[0.1] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] bg-white dark:bg-neutral-900">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={phase === "searching" ? thumbIdx : "final"}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.28 }}
                    src={phase === "searching" ? SEARCH_THUMBS[thumbIdx] : FINAL_MATCH.image}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt=""
                  />
                </AnimatePresence>
                {phase === "searching" && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-[scan_1.6s_linear_infinite]" />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              {SEARCH_THUMBS.slice(0, 6).map((_, i) => (
                <span key={i} className={`h-1.5 flex-1 rounded-full ${phase === "matched" ? "bg-emerald-500" : i === thumbIdx % 6 ? "bg-emerald-500" : "bg-neutral-200 dark:bg-white/[0.1]"}`} />
              ))}
            </div>

            <div className="mt-3 text-neutral-500" style={{ fontSize: 11.5 }}>
              {phase === "searching"
                ? `scanned ${(logIdx + 1) * 32} of ~290 similar SKUs · ${Math.min(99, Math.round((logIdx / AGENT_LOGS.length) * 99))}%`
                : `${FINAL_MATCH.similarSkus} similar SKUs across history`}
            </div>
          </div>

          {/* RIGHT — fields with skeleton or matched */}
          <div className="p-4 sm:p-6 overflow-y-auto">
            <SectionTitle>{phase === "searching" ? "AI auto-detecting fields" : "match details"}</SectionTitle>

            {phase === "searching" ? (
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Shimmer className="w-20 h-3 rounded-md" />
                    <Shimmer className="flex-1 h-3 rounded-md" />
                  </div>
                ))}
                <div className="mt-5 rounded-xl border border-emerald-200/60 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-3">
                  <div className="text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1.5" style={{ fontSize: 11.5, fontWeight: 600 }}>
                    <Loader2 size={11} className="animate-spin" /> live agent feed
                  </div>
                  <div className="mt-2 space-y-1" style={{ fontSize: 11, fontFamily: "ui-monospace, SFMono-Regular, Menlo" }}>
                    {AGENT_LOGS.slice(0, logIdx).slice(-5).map((l, i) => (
                      <div key={i} className="text-neutral-600 dark:text-neutral-400 truncate">› {l}</div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl border border-black/[0.05] dark:border-white/[0.08] bg-neutral-50/60 dark:bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3">
                    <img src={FINAL_MATCH.image} className="w-14 h-14 rounded-xl object-cover" alt="" />
                    <div className="min-w-0 flex-1">
                      <div className="text-neutral-950 dark:text-white truncate" style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>
                        {FINAL_MATCH.title}
                      </div>
                      <div className="text-neutral-500" style={{ fontSize: 11.5 }}>{FINAL_MATCH.brand} · {FINAL_MATCH.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-700 dark:text-emerald-400 tabular-nums" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
                        {FINAL_MATCH.matchPct}%
                      </div>
                      <div className="text-neutral-500" style={{ fontSize: 10.5 }}>confidence</div>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 bg-emerald-100 dark:bg-emerald-950/40 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${FINAL_MATCH.matchPct}%` }} />
                  </div>
                </div>

                <div>
                  <SectionTitle>agent scores</SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {[
                      ["Category match", "98.2%"],
                      ["Subcategory match", "96.8%"],
                      ["Price band", "91.0%"],
                      ["Packaging", "94.4%"],
                      ["Brand position", "92.1%"],
                      ["Historical pattern", "95.7%"],
                      ["Description embed.", "93.5%"],
                      ["Seasonal sim.", "89.3%"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/[0.05] dark:border-white/[0.06] bg-white dark:bg-white/[0.02]">
                        <span className="text-neutral-600 dark:text-neutral-300 truncate flex-1" style={{ fontSize: 11.5 }}>{k}</span>
                        <span className="text-emerald-700 dark:text-emerald-400 tabular-nums" style={{ fontSize: 11.5, fontWeight: 600 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-black/[0.05] dark:border-white/[0.06] bg-neutral-50/60 dark:bg-white/[0.02] p-3">
                  <div className="text-neutral-500" style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>summary</div>
                  <div className="mt-1 text-neutral-700 dark:text-neutral-300" style={{ fontSize: 12, lineHeight: "1.5" }}>{FINAL_MATCH.summary}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="h-auto sm:h-14 px-4 sm:px-5 py-3 sm:py-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border-t border-black/[0.05] dark:border-white/[0.06] shrink-0">
          <div className="text-neutral-500" style={{ fontSize: 11.5 }}>
            {phase === "searching" ? "agents working — overlay will unlock when matched" : "ready to advance"}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={onClose}
              disabled={!manual && phase === "searching"}
              className="h-9 px-3 rounded-lg border border-black/[0.06] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.04] disabled:opacity-40"
              style={{ fontSize: 12.5 }}
            >
              Close
            </button>
            <button
              onClick={submit}
              disabled={phase === "searching"}
              className="h-9 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontSize: 12.5, fontWeight: 550 }}
            >
              {phase === "searching" ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={12} />}
              {phase === "searching" ? "Searching…" : "Accept match · Continue"}
            </button>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes scan { 0% { transform: translateY(0); } 100% { transform: translateY(256px); } }
      `}</style>
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 text-neutral-400 uppercase tracking-[0.14em]" style={{ fontSize: 10.5, fontWeight: 600 }}>{children}</div>
  );
}

function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-neutral-100 dark:bg-white/[0.05] ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 dark:via-white/[0.08] to-transparent animate-[shimmer_1.4s_linear_infinite]" />
      <style>{`@keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }`}</style>
    </div>
  );
}
