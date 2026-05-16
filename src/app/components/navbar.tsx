import { Link } from "react-router";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const links = ["Product", "Workflow", "Intelligence", "Security", "Demo"];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-neutral-950/70 border-b border-black/[0.06] dark:border-white/[0.06]">
      <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
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
          <Link to="/login" className="text-[13.5px] text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white px-3 py-1.5 transition-colors">
            Login
          </Link>
          <Link to="/login" className="text-[13.5px] bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-4 py-2 rounded-full hover:opacity-90 transition shadow-sm">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
