import { create } from "zustand";

type State = {
  isSideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
};

export const useMenuStore = create<State>()((set) => ({
  isSideMenuOpen: false,
  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
}));
