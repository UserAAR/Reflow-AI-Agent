import {
  Handshake,
  Package,
  BrainCircuit,
  TrendingUp,
  Layers,
  UserCheck,
  PlayCircle,
  Activity,
} from "lucide-react";

const steps = [
  { icon: <Handshake size={14} />, label: "Commercial Approval" },
  { icon: <Package size={14} />, label: "Product Intake" },
  { icon: <BrainCircuit size={14} />, label: "AI Intelligence" },
  { icon: <TrendingUp size={14} />, label: "Forecasting" },
  { icon: <Layers size={14} />, label: "Allocation" },
  { icon: <UserCheck size={14} />, label: "Approval" },
  { icon: <PlayCircle size={14} />, label: "Execution" },
  { icon: <Activity size={14} />, label: "Monitoring" },
];

export function ProcessTimeline() {
  return (
    <section id="workflow" className="py-28 border-t border-black/[0.06] dark:border-white/[0.08] bg-neutral-50 dark:bg-neutral-900/40 dark:bg-neutral-950">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="max-w-2xl">
          <div className="text-emerald-700" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em" }}>
            BUILT FOR RETAIL OPERATIONS
          </div>
          <h2 className="mt-3 text-neutral-950 dark:text-white tracking-tight"
              style={{ fontSize: "clamp(32px, 3.6vw, 52px)", lineHeight: 1.05, fontWeight: 560, letterSpacing: "-0.03em" }}>
            From commercial agreement to in-store performance.
          </h2>
          <p className="mt-5 text-neutral-600 dark:text-neutral-400" style={{ fontSize: 16, lineHeight: 1.6 }}>
            A single continuous pipeline that turns every product decision into a measurable,
            traceable operational outcome.
          </p>
        </div>

        <div className="mt-16 relative">
          {/* line */}
          <div className="absolute left-0 right-0 top-[28px] h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

          <div className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-y-10">
            {steps.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <div className="relative w-14 h-14 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] shadow-[0_8px_24px_-16px_rgba(0,0,0,0.2)] flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white dark:bg-neutral-900 border border-emerald-200 text-emerald-700 flex items-center justify-center"
                        style={{ fontSize: 10, fontWeight: 600 }}>
                    {i + 1}
                  </span>
                  {s.icon}
                </div>
                <div className="mt-3 text-neutral-900 dark:text-neutral-100 px-2" style={{ fontSize: 12.5, fontWeight: 550, letterSpacing: "-0.005em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
