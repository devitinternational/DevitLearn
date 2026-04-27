"use client";

import { useEffect } from "react";
import { useThemeStore, type ThemeMode } from "@/store/theme";

const STORAGE_KEY = "devit-learn-theme";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const setHydrated = useThemeStore((state) => state.setHydrated);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
    setHydrated(true);
  }, [setHydrated, setTheme]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return children;
}
