import { create } from "zustand"

interface UiState {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  activeCountry: string
  setActiveCountry: (country: string) => void
}

export const useUiStore = create<UiState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  activeCountry: "All",
  setActiveCountry: (country) => set({ activeCountry: country }),
}))
