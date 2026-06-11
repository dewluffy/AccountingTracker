import { create } from "zustand";

const useLayoutStore = create((set) => ({
  sidebarCollapsed: false,
  mobileOpen: false,

  toggleSidebar: () =>
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    })),

  toggleMobile: () =>
    set((state) => ({
      mobileOpen: !state.mobileOpen,
    })),

  closeMobile: () =>
    set({
      mobileOpen: false,
    }),
}));

export default useLayoutStore;