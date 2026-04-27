"use client";

import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme";

interface ThemeToggleProps {
  compact?: boolean;
  inverted?: boolean;
}

export default function ThemeToggle({
  compact = false,
  inverted = false,
}: ThemeToggleProps) {
  const theme = useThemeStore((state) => state.theme);
  const hydrated = useThemeStore((state) => state.hydrated);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const activeTheme = hydrated ? theme : "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${activeTheme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${activeTheme === "light" ? "dark" : "light"} mode`}
      className={[
        "inline-flex items-center gap-2 border-2 px-3 py-2 text-xs font-black uppercase tracking-widest transition-all",
        compact ? "justify-center" : "",
        inverted
          ? "border-[var(--white)] bg-[rgba(var(--white-rgb),0.1)] text-[var(--white)] hover:bg-[var(--white)] hover:text-[var(--black)]"
          : "border-[var(--black)] bg-[var(--white)] text-[var(--black)] shadow-[3px_3px_0px_var(--black)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[5px_5px_0px_var(--black)]",
      ].join(" ")}
    >
      {activeTheme === "light" ? <Moon size={16} /> : <Sun size={16} />}
      {!compact && <span>{activeTheme === "light" ? "Dark" : "Light"}</span>}
    </button>
  );
}
