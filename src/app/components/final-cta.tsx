import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function FinalCTA() {
  return (
    <section id="demo" className="py-32 border-t border-black/[0.06] dark:border-white/[0.08] relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(134,239,172,0.18),transparent_70%)]" />
      <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)]"
             style={{ backgroundSize: "22px 22px" }} />
      </div>

      <div className="max-w-3xl mx-auto px-8 text-center">
        <h2 className="text-neutral-950 dark:text-white tracking-tight"
            style={{ fontSize: "clamp(38px, 5vw, 64px)", lineHeight: 1.05, fontWeight: 560, letterSpacing: "-0.035em" }}>
          Transform retail decisions into{" "}
          <span className="bg-gradient-to-br from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
            intelligent workflows
          </span>
          .
        </h2>
        <p className="mt-6 text-neutral-600 dark:text-neutral-400" style={{ fontSize: 17, lineHeight: 1.6 }}>
          See how Reflow orchestrates onboarding, allocation and approvals end-to-end —
          live, with your data and your operating model.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <Link to="/login" className="group inline-flex items-center gap-2 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-6 py-3.5 rounded-full hover:opacity-90 transition shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]"
                style={{ fontSize: 14, fontWeight: 500 }}>
            Launch Demo
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link to="/app" className="inline-flex items-center gap-2 text-neutral-800 dark:text-neutral-200 px-6 py-3.5 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                style={{ fontSize: 14, fontWeight: 500 }}>
            See Workflow
          </Link>
        </div>
      </div>
    </section>
  );
}
