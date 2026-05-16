import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`w-9 h-9 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] backdrop-blur flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors ${className}`}
    >
      {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
}
