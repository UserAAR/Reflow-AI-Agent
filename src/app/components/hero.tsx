import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { WorkflowPreview } from "./workflow-preview";

export function Hero() {
  return (
    <section className="relative pt-20 pb-28 overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_75%_20%,rgba(134,239,172,0.18),transparent_70%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />

      <div className="max-w-[1280px] mx-auto px-8 grid lg:grid-cols-[1.05fr_1fr] gap-16 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-neutral-900/70 backdrop-blur px-3 py-1.5 text-neutral-700 dark:text-neutral-300"
               style={{ fontSize: 12, fontWeight: 500 }}>
            <Sparkles size={12} className="text-emerald-500" />
            Built for Bravo Supermarkets
            <span className="w-px h-3 bg-black/10 mx-1" />
            <span className="text-neutral-500">v3.2 · agentic</span>
          </div>

          <h1
            className="mt-7 text-neutral-950 dark:text-white tracking-tight"
            style={{ fontSize: "clamp(44px, 5.6vw, 76px)", lineHeight: 1.02, fontWeight: 560, letterSpacing: "-0.035em" }}
          >
            AI-Driven Retail{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Decision</span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-emerald-200/70 -z-0 rounded-sm" />
            </span>{" "}
            Orchestration
          </h1>

          <p className="mt-7 max-w-xl text-neutral-600 dark:text-neutral-400" style={{ fontSize: 17, lineHeight: 1.55 }}>
            Reflow transforms fragmented retail onboarding, allocation, pricing, forecasting,
            logistics and approval workflows into one intelligent, AI-powered operational flow —
            engineered for the way Bravo supermarkets run every day.
          </p>

          <div className="mt-9 flex items-center gap-3">
            <Link to="/login" className="group inline-flex items-center gap-2 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-5 py-3 rounded-full hover:opacity-90 transition shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)]"
                  style={{ fontSize: 14, fontWeight: 500 }}>
              Get Started
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/app" className="inline-flex items-center gap-2 text-neutral-800 dark:text-neutral-200 px-5 py-3 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  style={{ fontSize: 14, fontWeight: 500 }}>
              View Workflow
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex items-center gap-8 text-neutral-400" style={{ fontSize: 12, letterSpacing: "0.08em" }}>
            <span>SOC 2</span>
            <span>·</span>
            <span>ISO 27001</span>
            <span>·</span>
            <span>GDPR</span>
            <span>·</span>
            <span>SSO / SAML</span>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <WorkflowPreview />
        </div>
      </div>
    </section>
  );
}
