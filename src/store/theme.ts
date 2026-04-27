"use client";

import { create } from "zustand";

export type ThemeMode = "light" | "dark";

interface ThemeState {
  theme: ThemeMode;
  hydrated: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setHydrated: (hydrated: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  hydrated: false,
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
  setHydrated: (hydrated) => set({ hydrated }),
}));
