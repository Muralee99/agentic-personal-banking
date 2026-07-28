import { create } from "zustand"
import { persist } from "zustand/middleware"

type Theme = "light" | "dark"

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

function applyThemeClass(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle("dark", theme === "dark")
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark"
        applyThemeClass(next)
        set({ theme: next })
      },
      setTheme: (theme) => {
        applyThemeClass(theme)
        set({ theme })
      },
    }),
    {
      name: "banking-platform-theme",
      onRehydrateStorage: () => (state) => {
        if (state) applyThemeClass(state.theme)
      },
    },
  ),
)
