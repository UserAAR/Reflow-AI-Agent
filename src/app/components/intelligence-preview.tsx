import { motion } from "motion/react";
import { TrendingUp, MapPin, Sparkles, FileText, BarChart3 } from "lucide-react";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-neutral-900 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.18),0_1px_2px_rgba(0,0,0,0.04)] ${className}`}>
      {children}
    </div>
  );
}

export function IntelligencePreview() {
  return (
    <section id="intelligence" className="py-16 sm:py-20 lg:py-28 border-t border-black/[0.06] dark:border-white/[0.08] relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_0%,rgba(134,239,172,0.12),transparent_70%)]" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-emerald-700" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em" }}>
            INTELLIGENCE LAYER
          </div>
          <h2 className="mt-3 text-neutral-950 dark:text-white tracking-tight"
              style={{ fontSize: "clamp(28px, 3.6vw, 52px)", lineHeight: 1.05, fontWeight: 560, letterSpacing: "-0.03em" }}>
            See every decision the system is about to make.
          </h2>
          <p className="mt-4 sm:mt-5 text-neutral-600 dark:text-neutral-400" style={{ fontSize: "clamp(14px, 1.1vw, 16px)", lineHeight: 1.6 }}>
            Confidence scores, forecasts, allocation maps, similarity matches and agent reasoning —
            surfaced inline, so reviewers always know what to trust.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Forecast */}
          <Card className="sm:col-span-2 lg:col-span-5 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-500" style={{ fontSize: 12 }}>
                <TrendingUp size={13} /> 14-day Demand Forecast
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100"
                    style={{ fontSize: 11, fontWeight: 600 }}>
                conf 91%
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <div className="text-neutral-950 dark:text-white" style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 560, letterSpacing: "-0.03em" }}>14,820</div>
              <div className="text-neutral-500" style={{ fontSize: 13 }}>units across 42 branches</div>
            </div>
            <svg viewBox="0 0 300 90" className="mt-4 w-full">
              <defs>
                <linearGradient id="fc" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#34D399" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#34D399" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 70 C 30 60, 50 65, 80 50 S 140 30, 170 38 S 230 20, 260 30 S 300 18, 300 18 L 300 90 L 0 90 Z"
                    fill="url(#fc)" />
              <path d="M0 70 C 30 60, 50 65, 80 50 S 140 30, 170 38 S 230 20, 260 30 S 300 18, 300 18"
                    fill="none" stroke="#10B981" strokeWidth="1.5" />
            </svg>
            <div className="mt-3 grid grid-cols-3 gap-3 text-neutral-500" style={{ fontSize: 11 }}>
              <div><span className="text-neutral-900 dark:text-neutral-100" style={{ fontSize: 14, fontWeight: 550 }}>+18%</span><br />vs prior SKU</div>
              <div><span className="text-neutral-900 dark:text-neutral-100" style={{ fontSize: 14, fontWeight: 550 }}>3.4d</span><br />sell-through</div>
              <div><span className="text-neutral-900 dark:text-neutral-100" style={{ fontSize: 14, fontWeight: 550 }}>2.1%</span><br />wastage est.</div>
            </div>
          </Card>

          {/* Allocation map */}
          <Card className="lg:col-span-4 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-500" style={{ fontSize: 12 }}>
                <MapPin size={13} /> Allocation Map
              </div>
              <span className="text-neutral-400" style={{ fontSize: 11 }}>42 branches</span>
            </div>
            <div className="mt-4 grid grid-cols-8 gap-1">
              {Array.from({ length: 56 }).map((_, i) => {
                const v = Math.max(0.1, Math.abs(Math.sin(i * 0.9) * 0.6 + Math.cos(i * 0.3) * 0.4));
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.01 }}
                    viewport={{ once: true }}
                    className="aspect-square rounded-md"
                    style={{ background: `rgba(52, 211, 153, ${Math.min(1, v)})` }}
                  />
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between text-neutral-500" style={{ fontSize: 11 }}>
              <span>low</span>
              <div className="flex-1 mx-3 h-1 rounded-full bg-gradient-to-r from-emerald-100 to-emerald-500" />
              <span>high</span>
            </div>
          </Card>

          {/* Similarity matches */}
          <Card className="lg:col-span-3 p-4 sm:p-6">
            <div className="flex items-center gap-2 text-neutral-500" style={{ fontSize: 12 }}>
              <Sparkles size={13} /> Similarity Matches
            </div>
            <div className="mt-4 space-y-3">
              {[
                ["Bravo Organic Yogurt 500g", 96],
                ["Bravo Greek Style 450g", 92],
                ["Premium Yogurt 500g", 88],
                ["House Brand Yogurt 400g", 81],
              ].map(([n, p]) => (
                <div key={n as string}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-neutral-800 dark:text-neutral-200 truncate pr-2" style={{ fontSize: 12 }}>{n}</span>
                    <span className="text-emerald-700" style={{ fontSize: 11, fontWeight: 600 }}>{p}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9 }}
                      className="h-full bg-gradient-to-r from-emerald-300 to-emerald-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Agent log */}
          <Card className="sm:col-span-2 lg:col-span-7 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-500" style={{ fontSize: 12 }}>
                <FileText size={13} /> Agent Reasoning Log
              </div>
              <div className="flex items-center gap-1 text-neutral-400" style={{ fontSize: 11 }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> live
              </div>
            </div>
            <div className="mt-4 font-mono text-neutral-700 dark:text-neutral-300 space-y-1.5 overflow-x-auto" style={{ fontSize: "clamp(10px, 1vw, 12px)", lineHeight: 1.6 }}>
              {[
                ["09:14:02", "intake", "SKU-48201 received · 3 sources merged"],
                ["09:14:04", "matching", "embeddings ↦ 7/7 attributes matched (cosine 0.94)"],
                ["09:14:05", "forecast", "demand model v3.2 → 14,820u / 14d"],
                ["09:14:06", "pricing", "elasticity −1.2 · recommend ₼ 4.49 (margin 22%)"],
                ["09:14:07", "allocation", "branch-weighted plan · 42 stores · capacity ok"],
                ["09:14:08", "approval", "queued · 3 reviewers · SLA 4h"],
              ].map(([t, tag, msg]) => (
                <div key={t} className="flex items-start gap-2 sm:gap-3 whitespace-nowrap">
                  <span className="text-neutral-400 shrink-0">{t}</span>
                  <span className="px-1.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 shrink-0" style={{ fontSize: 10.5 }}>{tag}</span>
                  <span className="text-neutral-800 dark:text-neutral-200 truncate">{msg}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Insights */}
          <Card className="sm:col-span-2 lg:col-span-5 p-4 sm:p-6">
            <div className="flex items-center gap-2 text-neutral-500" style={{ fontSize: 12 }}>
              <BarChart3 size={13} /> Operational Insights
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
              {[
                ["Time to shelf", "3.2d", "−61% vs manual"],
                ["Onboarding accuracy", "97.4%", "+12.8pp"],
                ["Stock-out risk", "1.6%", "−4.1pp"],
                ["Approval cycle", "4.1h", "−72%"],
              ].map(([k, v, d]) => (
                <div key={k} className="rounded-xl border border-black/[0.05] dark:border-white/[0.06] p-3 sm:p-4">
                  <div className="text-neutral-500" style={{ fontSize: 11 }}>{k}</div>
                  <div className="mt-1 text-neutral-950 dark:text-white" style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 560, letterSpacing: "-0.02em" }}>{v}</div>
                  <div className="text-emerald-600" style={{ fontSize: 11, fontWeight: 600 }}>{d}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
