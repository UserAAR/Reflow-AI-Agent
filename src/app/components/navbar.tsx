import { useState } from "react";
import { Link } from "react-router";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";

const links = ["Product", "Workflow", "Intelligence", "Security", "Demo"];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-neutral-950/70 border-b border-black/[0.06] dark:border-white/[0.06]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        <Logo />
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-[13.5px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/login"
            className="hidden sm:inline-flex text-[13.5px] text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white px-3 py-1.5 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/login"
            className="text-[13px] sm:text-[13.5px] bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full hover:opacity-90 transition shadow-sm"
          >
            Get Started
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-black/[0.06] dark:border-white/[0.06] bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-[14px] text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white py-2.5 px-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-white/[0.04] transition-colors"
              >
                {l}
              </a>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="sm:hidden text-[14px] text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white py-2.5 px-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-white/[0.04] transition-colors"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
