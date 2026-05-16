import {
  FileSpreadsheet,
  Sparkles,
  Layers,
  Zap,
  UserCheck,
  Workflow,
} from "lucide-react";

const items = [
  {
    icon: <FileSpreadsheet size={16} />,
    title: "Eliminate fragmented Excel workflows",
    body: "Replace dozens of spreadsheets and manual handoffs with a single intelligent flow that every team can trust.",
  },
  {
    icon: <Sparkles size={16} />,
    title: "AI-powered similarity matching",
    body: "Embedding-based engine matches new SKUs to historical products across category, packaging, price band and family.",
  },
  {
    icon: <Layers size={16} />,
    title: "Capacity-aware branch allocation",
    body: "Recommendations honor real shelf, planogram and inventory constraints — not just demand potential.",
  },
  {
    icon: <Zap size={16} />,
    title: "Faster product onboarding",
    body: "Cut time-to-shelf from weeks to days with parallel AI agents handling intake, validation and pricing.",
  },
  {
    icon: <UserCheck size={16} />,
    title: "Human-in-the-loop approvals",
    body: "Reviewers stay in control with structured approval layers, traceability and overrideable decisions at every step.",
  },
  {
    icon: <Workflow size={16} />,
    title: "Intelligent retail orchestration",
    body: "One operational nervous system that connects procurement, pricing, logistics, allocation and store operations.",
  },
];

export function WhyReflow() {
  return (
    <section id="product" className="py-28 border-t border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="max-w-2xl">
          <div className="text-emerald-700" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em" }}>
            WHY REFLOW
          </div>
          <h2 className="mt-3 text-neutral-950 dark:text-white tracking-tight"
              style={{ fontSize: "clamp(32px, 3.6vw, 52px)", lineHeight: 1.05, fontWeight: 560, letterSpacing: "-0.03em" }}>
            One workflow for every retail decision.
          </h2>
          <p className="mt-5 text-neutral-600 dark:text-neutral-400" style={{ fontSize: 16, lineHeight: 1.6 }}>
            Reflow replaces brittle handoffs and manual judgment with an AI operating system
            tuned for the realities of running a supermarket chain at scale.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/[0.06] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden">
          {items.map((it) => (
            <div key={it.title} className="bg-white dark:bg-neutral-900 p-7 hover:bg-neutral-50 dark:bg-neutral-900/60 dark:bg-neutral-900/60 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                {it.icon}
              </div>
              <div className="mt-5 text-neutral-950 dark:text-white" style={{ fontSize: 16, fontWeight: 550, letterSpacing: "-0.01em" }}>
                {it.title}
              </div>
              <div className="mt-2 text-neutral-600 dark:text-neutral-400" style={{ fontSize: 14, lineHeight: 1.55 }}>
                {it.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
