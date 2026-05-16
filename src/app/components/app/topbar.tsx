import { useState } from "react";
import { Play, Pause, RotateCcw, Download, Save, Sparkles, MoreHorizontal } from "lucide-react";
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
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="h-12 sm:h-14 shrink-0 border-b border-black/[0.06] dark:border-white/[0.08] bg-white/85 dark:bg-neutral-950/85 backdrop-blur-xl flex items-center px-3 sm:px-5 gap-2 sm:gap-4 relative z-30">
      <Link to="/" className="shrink-0"><Logo size={22} /></Link>

      <span className="w-px h-5 bg-black/[0.08] dark:bg-white/[0.08] mx-0.5 sm:mx-1 hidden sm:block" />

      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
        <span className="text-neutral-500 hidden sm:inline" style={{ fontSize: 12 }}>Workflows</span>
        <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">/</span>
        <span className="text-neutral-950 dark:text-white truncate" style={{ fontSize: 13, fontWeight: 550, letterSpacing: "-0.01em" }}>
          New Product Onboarding
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 ml-1 sm:ml-2 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60"
              style={{ fontSize: 11, fontWeight: 600 }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {running ? "running" : "paused"}
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-1.5 text-neutral-500" style={{ fontSize: 11.5 }}>
        <Sparkles size={11} className="text-emerald-500" />
        <span>agent_v3.2 · 11 stages · 47 sub-agents</span>
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5">
        <span className="hidden md:flex items-center gap-1.5 text-neutral-500 mr-1 sm:mr-2" style={{ fontSize: 11.5 }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          saved · 12s ago
        </span>
        <button
          onClick={() => setRunning(!running)}
          className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:opacity-90 transition touch-target"
          style={{ fontSize: 12, fontWeight: 550 }}
        >
          {running ? <Pause size={12} /> : <Play size={12} />}
          <span className="hidden sm:inline">{running ? "Pause" : "Start"}</span>
        </button>
        <IconBtn onClick={onReset} title="Reset"><RotateCcw size={13} /></IconBtn>
        {/* Desktop-only buttons */}
        <span className="hidden md:contents">
          <IconBtn title="Save"><Save size={13} /></IconBtn>
          <IconBtn title="Export"><Download size={13} /></IconBtn>
        </span>
        {/* Mobile more menu */}
        <span className="relative md:hidden">
          <IconBtn onClick={() => setMoreOpen(!moreOpen)} title="More"><MoreHorizontal size={13} /></IconBtn>
          {moreOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
              <div className="absolute right-0 top-10 z-50 w-36 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-neutral-900 shadow-xl py-1">
                <MobileMenuItem icon={<Save size={13} />} label="Save" onClick={() => setMoreOpen(false)} />
                <MobileMenuItem icon={<Download size={13} />} label="Export" onClick={() => setMoreOpen(false)} />
              </div>
            </>
          )}
        </span>
        <ThemeToggle />
        <div className="hidden sm:flex ml-1 sm:ml-2 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white items-center justify-center ring-2 ring-white dark:ring-neutral-950"
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

function MobileMenuItem({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-2.5 px-3 py-2.5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.04]" style={{ fontSize: 13 }}>
      {icon} {label}
    </button>
  );
}
