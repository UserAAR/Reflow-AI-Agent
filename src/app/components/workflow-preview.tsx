import { motion } from "motion/react";
import {
  Package,
  GitCompare,
  ShieldCheck,
  TrendingUp,
  Calculator,
  Tag,
  Network,
  Layers,
  Truck,
  UserCheck,
  PlayCircle,
  Activity,
} from "lucide-react";

type NodeProps = {
  x: number; // %
  y: number; // %
  icon: React.ReactNode;
  label: string;
  sub?: string;
  active?: boolean;
  conf?: number;
  delay?: number;
};

function Node({ x, y, icon, label, sub, active, conf, delay = 0 }: NodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div
        className={`relative flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white dark:bg-neutral-900 border ${
          active ? "border-emerald-300/80 shadow-[0_0_0_4px_rgba(134,239,172,0.18),0_8px_24px_-8px_rgba(16,185,129,0.25)]" : "border-black/[0.06] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.1)]"
        }`}
      >
        <div
          className={`w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg flex items-center justify-center ${
            active ? "bg-emerald-50 text-emerald-600" : "bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
          }`}
        >
          {icon}
        </div>
        <div className="pr-0.5 sm:pr-1">
          <div style={{ fontSize: "clamp(9px, 1.2vw, 11.5px)", fontWeight: 550, letterSpacing: "-0.01em" }} className="text-neutral-900 dark:text-neutral-100 leading-tight whitespace-nowrap">
            {label}
          </div>
          {sub && (
            <div style={{ fontSize: "clamp(7.5px, 1vw, 10px)" }} className="text-neutral-500 leading-tight whitespace-nowrap hidden sm:block">
              {sub}
            </div>
          )}
        </div>
        {active && (
          <span className="relative flex h-1.5 w-1.5 mr-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
        )}
        {conf !== undefined && (
          <div
            className="absolute -top-2 -right-2 px-1 sm:px-1.5 py-0.5 rounded-md bg-white dark:bg-neutral-900 border border-emerald-200 text-emerald-700 hidden sm:block"
            style={{ fontSize: 9.5, fontWeight: 600 }}
          >
            {conf}%
          </div>
        )}
      </div>
    </motion.div>
  );
}

function MiniChip({ x, y, label, delay = 0 }: { x: number; y: number; label: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="absolute -translate-x-1/2 -translate-y-1/2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hidden lg:block"
      style={{ left: `${x}%`, top: `${y}%`, fontSize: "clamp(8px, 1vw, 10px)", fontWeight: 500 }}
    >
      {label}
    </motion.div>
  );
}

function Path({ d, delay = 0, active }: { d: string; delay?: number; active?: boolean }) {
  return (
    <g>
      <path d={d} stroke="rgba(0,0,0,0.08)" strokeWidth="1" fill="none" />
      {active && (
        <motion.path
          d={d}
          stroke="#34D399"
          strokeWidth="1.4"
          fill="none"
          strokeDasharray="4 6"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -40 }}
          transition={{ delay, duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
      )}
    </g>
  );
}

export function WorkflowPreview() {
  return (
    <div className="relative w-full">
      {/* Soft glow backdrop */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-60 bg-[radial-gradient(60%_50%_at_60%_40%,rgba(134,239,172,0.25),transparent_60%),radial-gradient(40%_40%_at_20%_70%,rgba(186,230,253,0.18),transparent_70%)]" />

      <div className="relative rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-gradient-to-b from-white to-neutral-50/60 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18),0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center justify-between px-3 sm:px-4 h-8 sm:h-9 border-b border-black/[0.05] dark:border-white/[0.06] bg-white dark:bg-neutral-900/60 backdrop-blur">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-neutral-200" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-neutral-200" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-neutral-200" />
          </div>
          <div className="flex items-center gap-2 text-neutral-500" style={{ fontSize: 11 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">workflow · running · agent_v3.2</span>
            <span className="sm:hidden">running</span>
          </div>
          <div className="text-neutral-400 hidden sm:block" style={{ fontSize: 11 }}>reflow / new-product</div>
        </div>

        {/* Canvas */}
        <div
          className="relative w-full bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.045)_1px,transparent_0)]"
          style={{ backgroundSize: "18px 18px", aspectRatio: "5 / 6", minHeight: "clamp(400px, 50vw, 620px)" }}
        >
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 120">
            {/* intake -> matching */}
            <Path d="M50 8 C 50 14, 50 14, 50 20" active />
            {/* matching -> sub-nodes */}
            <Path d="M50 24 C 20 30, 14 32, 14 38" />
            <Path d="M50 24 C 28 32, 26 34, 26 40" />
            <Path d="M50 24 C 40 32, 40 34, 40 42" />
            <Path d="M50 24 C 50 32, 50 34, 50 42" />
            <Path d="M50 24 C 60 32, 60 34, 60 42" />
            <Path d="M50 24 C 72 32, 74 34, 74 40" />
            <Path d="M50 24 C 80 30, 86 32, 86 38" />
            {/* sub-nodes -> matching engine */}
            <Path d="M14 42 C 14 48, 30 50, 50 52" active />
            <Path d="M26 44 C 30 50, 40 51, 50 52" active />
            <Path d="M40 46 C 44 50, 48 51, 50 52" active />
            <Path d="M50 46 C 50 50, 50 51, 50 52" active />
            <Path d="M60 46 C 56 50, 52 51, 50 52" active />
            <Path d="M74 44 C 70 50, 60 51, 50 52" active />
            <Path d="M86 42 C 86 48, 70 50, 50 52" active />
            {/* matching engine -> validation */}
            <Path d="M50 56 C 50 60, 50 60, 50 64" />
            {/* validation -> forecasting */}
            <Path d="M50 68 C 30 72, 25 73, 22 76" />
            {/* validation -> cost */}
            <Path d="M50 68 C 50 72, 50 72, 50 76" />
            {/* validation -> pricing */}
            <Path d="M50 68 C 70 72, 75 73, 78 76" />
            {/* converge to allocation */}
            <Path d="M22 80 C 30 84, 40 85, 50 88" />
            <Path d="M50 80 C 50 84, 50 85, 50 88" />
            <Path d="M78 80 C 70 84, 60 85, 50 88" />
            {/* allocation -> shelf */}
            <Path d="M50 92 C 30 96, 25 96, 22 100" />
            {/* allocation -> logistics */}
            <Path d="M50 92 C 70 96, 75 96, 78 100" />
            {/* shelf, logistics -> approval */}
            <Path d="M22 104 C 30 108, 40 108, 50 110" />
            <Path d="M78 104 C 70 108, 60 108, 50 110" />
            {/* approval -> execution -> monitoring */}
            <Path d="M50 113 C 50 115, 50 115, 50 116.5" />
          </svg>

          {/* Top row */}
          <Node x={50} y={8} icon={<Package size={14} />} label="Product Intake" sub="SKU-48201 · img+csv" />

          <Node x={50} y={22} icon={<GitCompare size={14} />} label="Similar Product Matching" sub="engine · v3.2" active conf={94} />

          {/* sub-nodes */}
          <MiniChip x={14} y={40} label="category" />
          <MiniChip x={26} y={42} label="subcategory" />
          <MiniChip x={40} y={44} label="price band" />
          <MiniChip x={50} y={44} label="packaging" />
          <MiniChip x={60} y={44} label="title" />
          <MiniChip x={74} y={42} label="description" />
          <MiniChip x={86} y={40} label="family" />

          <Node x={50} y={54} icon={<Network size={14} />} label="Matching Engine" sub="embeddings · cosine" active conf={97} />

          <Node x={50} y={66} icon={<ShieldCheck size={14} />} label="Data Validation" sub="schema · enrich · dedupe" />

          {/* triple row */}
          <Node x={22} y={78} icon={<TrendingUp size={14} />} label="Demand Forecasting" sub="14d · branch level" conf={91} />
          <Node x={50} y={78} icon={<Calculator size={14} />} label="Cost Calculation" sub="landed · margin" />
          <Node x={78} y={78} icon={<Tag size={14} />} label="Pricing Recommendation" sub="elasticity · promo" conf={88} />

          <Node x={50} y={90} icon={<Layers size={14} />} label="Branch Allocation" sub="42 stores · weighted" active />

          <Node x={22} y={102} icon={<Layers size={14} />} label="Shelf Capacity Validation" sub="planogram · facing" />
          <Node x={78} y={102} icon={<Truck size={14} />} label="Logistics Planning" sub="warehouse · dispatch" />

          <Node x={50} y={111} icon={<UserCheck size={14} />} label="Human Approval" sub="3 reviewers · 2 ok" />

          {/* Floating side panels — hidden on small */}
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute left-3 top-3 w-[130px] lg:w-[150px] rounded-lg border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-neutral-900/95 backdrop-blur shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)] p-2 lg:p-2.5 hidden lg:block"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-neutral-500" style={{ fontSize: 10 }}>AI Confidence</span>
              <span className="text-emerald-600" style={{ fontSize: 10, fontWeight: 600 }}>+2.4%</span>
            </div>
            <div className="text-neutral-900 dark:text-neutral-100" style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>
              94.6%
            </div>
            <div className="mt-1.5 h-1 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "94%" }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="h-full bg-gradient-to-r from-emerald-300 to-emerald-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute right-3 top-3 w-[140px] lg:w-[160px] rounded-lg border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-neutral-900/95 backdrop-blur shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)] p-2 lg:p-2.5 hidden lg:block"
          >
            <div className="text-neutral-500 mb-1.5" style={{ fontSize: 10 }}>Top Matches</div>
            {[
              ["Bravo Organic Yogurt 500g", 96],
              ["Bravo Greek Style 450g", 92],
              ["Premium Yogurt 500g", 88],
            ].map(([n, p]) => (
              <div key={n as string} className="flex items-center justify-between py-0.5">
                <span className="text-neutral-700 dark:text-neutral-300 truncate" style={{ fontSize: 10 }}>{n}</span>
                <span className="text-emerald-600" style={{ fontSize: 10, fontWeight: 600 }}>{p}%</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute left-3 bottom-3 rounded-lg border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-neutral-900/95 backdrop-blur shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)] p-2 lg:p-2.5 w-[170px] lg:w-[200px] hidden md:block"
          >
            <div className="text-neutral-500 mb-1" style={{ fontSize: 10 }}>Allocation Map</div>
            <div className="grid grid-cols-12 gap-[2px]">
              {Array.from({ length: 48 }).map((_, i) => {
                const intensity = Math.min(1, Math.max(0.08, Math.sin(i * 0.7) * 0.5 + 0.5));
                return (
                  <div
                    key={i}
                    className="h-2 rounded-[2px]"
                    style={{ background: `rgba(52, 211, 153, ${intensity})` }}
                  />
                );
              })}
            </div>
            <div className="mt-2 flex items-center justify-between text-neutral-500" style={{ fontSize: 9.5 }}>
              <span>42 branches</span>
              <span>14,820 units</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="absolute right-3 bottom-3 rounded-lg border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-neutral-900/95 backdrop-blur shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)] p-2 lg:p-2.5 w-[160px] lg:w-[180px] hidden md:block"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <Activity size={11} className="text-emerald-600" />
              <span className="text-neutral-500" style={{ fontSize: 10 }}>Agent Log</span>
            </div>
            {[
              "matched 7/7 attributes",
              "forecast → 14,820u",
              "approval queued",
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-1.5 py-[1px] text-neutral-700 dark:text-neutral-300" style={{ fontSize: 10 }}>
                <PlayCircle size={9} className="text-neutral-400" />
                {t}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom status */}
        <div className="flex items-center justify-between border-t border-black/[0.05] dark:border-white/[0.06] px-3 sm:px-4 h-8 sm:h-9 text-neutral-500 bg-white dark:bg-neutral-900/60" style={{ fontSize: 11 }}>
          <span>12 nodes · 18 edges</span>
          <span className="hidden sm:flex items-center gap-3">
            <span>lat 184ms</span>
            <span>·</span>
            <span>cost $0.013</span>
            <span>·</span>
            <span className="text-emerald-600">healthy</span>
          </span>
          <span className="sm:hidden text-emerald-600">healthy</span>
        </div>
      </div>
    </div>
  );
}
