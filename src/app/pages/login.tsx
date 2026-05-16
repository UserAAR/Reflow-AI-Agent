import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Activity,
} from "lucide-react";
import { Logo } from "../components/logo";
import { ThemeToggle } from "../components/theme-toggle";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@reflow.ai");
  const [password, setPassword] = useState("ReflowDemo•2026");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setTimeout(() => navigate("/app"), 550);
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 grid lg:grid-cols-[1.05fr_1fr]">
      {/* Left — atmosphere */}
      <div className="relative hidden lg:flex flex-col p-10 border-r border-black/[0.06] dark:border-white/[0.08] overflow-hidden bg-gradient-to-br from-emerald-50/40 via-white to-white dark:from-emerald-950/30 dark:via-neutral-950 dark:to-neutral-950">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(60%_50%_at_30%_20%,rgba(134,239,172,0.20),transparent_70%),radial-gradient(40%_40%_at_80%_80%,rgba(30,64,175,0.10),transparent_70%)]" />
        <div className="absolute inset-0 -z-0 opacity-50 dark:opacity-30 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)]"
             style={{ backgroundSize: "22px 22px" }} />

        <div className="relative flex items-center justify-between">
          <Link to="/"><Logo /></Link>
          <div className="flex items-center gap-2 text-neutral-500" style={{ fontSize: 12 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            system · operational
          </div>
        </div>

        <div className="relative mt-auto">
          <div className="text-neutral-950 dark:text-white tracking-tight"
               style={{ fontSize: "clamp(32px, 3.4vw, 44px)", lineHeight: 1.05, fontWeight: 560, letterSpacing: "-0.03em" }}>
            The retail decision<br />operating system.
          </div>
          <p className="mt-4 max-w-md text-neutral-600 dark:text-neutral-400" style={{ fontSize: 14.5, lineHeight: 1.6 }}>
            Reflow orchestrates onboarding, allocation, pricing and approvals into one
            intelligent agentic workflow — designed for Bravo supermarkets.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
            <Mini icon={<Sparkles size={13} />} k="AI confidence" v="94.6%" />
            <Mini icon={<Activity size={13} />} k="Live workflows" v="128" />
            <Mini icon={<ShieldCheck size={13} />} k="Audit events" v="42,180" />
            <Mini icon={<Lock size={13} />} k="Approvals SLA" v="4.1h" />
          </div>

          {/* tiny animated workflow visual */}
          <div className="mt-10 max-w-md rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] backdrop-blur p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-neutral-500" style={{ fontSize: 11 }}>active orchestration</span>
              <span className="text-emerald-600" style={{ fontSize: 11, fontWeight: 600 }}>healthy</span>
            </div>
            <svg viewBox="0 0 320 70" className="w-full">
              {["Intake","Match","Forecast","Allocate","Approve","Execute"].map((n,i)=>{
                const x = 20 + i*56;
                return (
                  <g key={n}>
                    {i>0 && <motion.line x1={x-56+30} y1={35} x2={x-4} y2={35} stroke="#34D399" strokeWidth="1" strokeDasharray="3 4"
                      initial={{ strokeDashoffset: 0 }} animate={{ strokeDashoffset: -20 }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} />}
                    <rect x={x-4} y={26} width="32" height="18" rx="5" className="fill-white dark:fill-neutral-900" stroke="rgba(0,0,0,0.08)" />
                    <text x={x+12} y={37.5} textAnchor="middle" className="fill-neutral-700 dark:fill-neutral-300" style={{ fontSize: 8, fontWeight: 500 }}>{n}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="relative mt-10 text-neutral-500" style={{ fontSize: 11 }}>
          © 2026 Reflow Inc. · SOC 2 · ISO 27001
        </div>
      </div>

      {/* Right — form */}
      <div className="relative flex flex-col p-8 lg:p-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="lg:hidden"><Logo /></Link>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-neutral-500" style={{ fontSize: 12 }}>Demo Environment</span>
            <ThemeToggle />
          </div>
        </div>

        <div className="m-auto w-full max-w-[400px]">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-2.5 py-1"
               style={{ fontSize: 11, fontWeight: 600 }}>
            <ShieldCheck size={11} /> Enterprise SSO · SAML 2.0
          </div>
          <h1 className="mt-5 text-neutral-950 dark:text-white tracking-tight"
              style={{ fontSize: 30, lineHeight: 1.1, fontWeight: 560, letterSpacing: "-0.03em" }}>
            Welcome back to Reflow.
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400" style={{ fontSize: 14 }}>
            Sign in to your retail orchestration workspace.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <Field label="Work email">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-neutral-950 dark:text-white placeholder:text-neutral-400"
                style={{ fontSize: 14 }}
              />
            </Field>
            <Field label="Password" right={
              <button type="button" onClick={() => setShow((s) => !s)} className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">
                {show ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            }>
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-neutral-950 dark:text-white placeholder:text-neutral-400"
                style={{ fontSize: 14 }}
              />
            </Field>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400" style={{ fontSize: 12.5 }}>
                <input type="checkbox" defaultChecked className="accent-emerald-500" />
                Keep me signed in on this device
              </label>
              <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white" style={{ fontSize: 12.5 }}>
                Forgot?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full inline-flex items-center justify-center gap-2 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-5 py-3 rounded-xl hover:opacity-90 transition shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] disabled:opacity-70"
              style={{ fontSize: 14, fontWeight: 550 }}
            >
              {loading ? "Authenticating…" : "Sign In"}
              {!loading && <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />}
            </button>

            <div className="relative flex items-center my-2">
              <span className="flex-1 h-px bg-black/[0.06] dark:bg-white/[0.08]" />
              <span className="px-3 text-neutral-400" style={{ fontSize: 11 }}>or</span>
              <span className="flex-1 h-px bg-black/[0.06] dark:bg-white/[0.08]" />
            </div>

            <button
              type="button"
              onClick={() => navigate("/app")}
              className="w-full inline-flex items-center justify-center gap-2 border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-5 py-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              style={{ fontSize: 14, fontWeight: 550 }}
            >
              <Sparkles size={14} className="text-emerald-500" />
              Continue as Demo
            </button>
          </form>

          <p className="mt-8 text-neutral-500" style={{ fontSize: 11.5, lineHeight: 1.6 }}>
            Protected by enterprise-grade infrastructure. By signing in you agree to the
            Reflow <a href="#" className="underline">terms</a> and <a href="#" className="underline">privacy policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

function Mini({ icon, k, v }: { icon: React.ReactNode; k: string; v: string }) {
  return (
    <div className="rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] backdrop-blur p-3">
      <div className="flex items-center gap-1.5 text-neutral-500" style={{ fontSize: 11 }}>
        {icon} {k}
      </div>
      <div className="mt-0.5 text-neutral-950 dark:text-white" style={{ fontSize: 18, fontWeight: 560, letterSpacing: "-0.02em" }}>{v}</div>
    </div>
  );
}

function Field({ label, children, right }: { label: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-neutral-600 dark:text-neutral-400 mb-1.5" style={{ fontSize: 12, fontWeight: 500 }}>{label}</div>
      <div className="flex items-center gap-2 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-neutral-900 px-3.5 py-2.5 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 dark:focus-within:ring-emerald-900/40 transition-colors">
        {children}
        {right}
      </div>
    </label>
  );
}
