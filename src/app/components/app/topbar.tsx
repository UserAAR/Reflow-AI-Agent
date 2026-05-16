import { Play, Pause, RotateCcw, Download, Save, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { ThemeToggle } from "../theme-toggle";
import { Logo } from "../logo";

export function Topbar({
  running,
  setRunning,
  onReset,
}: {
  running: boolean;
  setRunning: (v: boolean) => void;
  onReset: () => void;
}) {
  return (
    <header className="h-14 shrink-0 border-b border-black/[0.06] dark:border-white/[0.08] bg-white/85 dark:bg-neutral-950/85 backdrop-blur-xl flex items-center px-5 gap-4 relative z-30">
      <Link to="/" className="shrink-0"><Logo /></Link>

      <span className="w-px h-5 bg-black/[0.08] dark:bg-white/[0.08] mx-1" />

      <div className="flex items-center gap-2 min-w-0">
        <span className="text-neutral-500" style={{ fontSize: 12 }}>Workflows</span>
        <span className="text-neutral-300 dark:text-neutral-700">/</span>
        <span className="text-neutral-950 dark:text-white truncate" style={{ fontSize: 13.5, fontWeight: 550, letterSpacing: "-0.01em" }}>
          New Product Onboarding
        </span>
        <span className="inline-flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60"
              style={{ fontSize: 11, fontWeight: 600 }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {running ? "running" : "paused"}
        </span>
      </div>

      <div className="ml-4 hidden lg:flex items-center gap-1.5 text-neutral-500" style={{ fontSize: 11.5 }}>
        <Sparkles size={11} className="text-emerald-500" />
        <span>agent_v3.2 · 11 stages · 47 sub-agents</span>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <span className="hidden md:flex items-center gap-1.5 text-neutral-500 mr-2" style={{ fontSize: 11.5 }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          saved · 12s ago
        </span>
        <button
          onClick={() => setRunning(!running)}
          className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:opacity-90 transition"
          style={{ fontSize: 12, fontWeight: 550 }}
        >
          {running ? <Pause size={12} /> : <Play size={12} />}
          {running ? "Pause" : "Start"}
        </button>
        <IconBtn onClick={onReset} title="Reset"><RotateCcw size={13} /></IconBtn>
        <IconBtn title="Save"><Save size={13} /></IconBtn>
        <IconBtn title="Export"><Download size={13} /></IconBtn>
        <ThemeToggle />
        <div className="ml-2 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center ring-2 ring-white dark:ring-neutral-950"
             style={{ fontSize: 11, fontWeight: 600 }}>
          AT
        </div>
      </div>
    </header>
  );
}

function IconBtn({ children, onClick, title }: { children: React.ReactNode; onClick?: () => void; title?: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-8 h-8 rounded-lg border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-white/[0.03] text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-white/[0.06] flex items-center justify-center transition-colors"
    >
      {children}
    </button>
  );
}
