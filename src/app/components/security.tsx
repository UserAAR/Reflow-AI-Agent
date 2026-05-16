import { ScrollText, Route, ShieldCheck, Eye, Server } from "lucide-react";

const items = [
  { icon: <ScrollText size={16} />, title: "Audit trail", body: "Every decision, override and data write is recorded with full lineage." },
  { icon: <Route size={16} />, title: "Workflow traceability", body: "Trace any output back to the agent, model version and input that produced it." },
  { icon: <ShieldCheck size={16} />, title: "Approval control", body: "Granular, role-aware approval layers with policy-driven escalation." },
  { icon: <Eye size={16} />, title: "Operational transparency", body: "Reviewers see confidence, reasoning and alternatives — never a black box." },
  { icon: <Server size={16} />, title: "Enterprise-grade infrastructure", body: "Encrypted in transit and at rest. SSO, SCIM and regional data residency." },
];

export function Security() {
  return (
    <section id="security" className="py-28 border-t border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-[1280px] mx-auto px-8 grid lg:grid-cols-[1fr_1.2fr] gap-16">
        <div>
          <div className="text-emerald-700" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em" }}>
            ENTERPRISE TRUST
          </div>
          <h2 className="mt-3 text-neutral-950 dark:text-white tracking-tight"
              style={{ fontSize: "clamp(32px, 3.6vw, 52px)", lineHeight: 1.05, fontWeight: 560, letterSpacing: "-0.03em" }}>
            Designed for the way enterprises govern decisions.
          </h2>
          <p className="mt-5 text-neutral-600 dark:text-neutral-400 max-w-md" style={{ fontSize: 16, lineHeight: 1.6 }}>
            Reflow is built so leadership, audit and operations teams can move quickly without
            losing control over what the system decides on their behalf.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-neutral-900 px-4 py-3 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.15)]">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <ShieldCheck size={16} />
            </div>
            <div>
              <div className="text-neutral-900 dark:text-neutral-100" style={{ fontSize: 13, fontWeight: 550 }}>SOC 2 · ISO 27001 · GDPR</div>
              <div className="text-neutral-500" style={{ fontSize: 11 }}>Reviewed annually · region-pinned data</div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-black/[0.06] border border-black/[0.06] dark:border-white/[0.08] rounded-2xl overflow-hidden">
          {items.map((it) => (
            <div key={it.title} className="bg-white dark:bg-neutral-900 p-6">
              <div className="w-9 h-9 rounded-xl bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center">
                {it.icon}
              </div>
              <div className="mt-5 text-neutral-950 dark:text-white" style={{ fontSize: 15, fontWeight: 550, letterSpacing: "-0.01em" }}>
                {it.title}
              </div>
              <div className="mt-1.5 text-neutral-600 dark:text-neutral-400" style={{ fontSize: 13.5, lineHeight: 1.55 }}>
                {it.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
