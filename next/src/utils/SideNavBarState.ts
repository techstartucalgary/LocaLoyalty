import { create } from "zustand";

type SideNavBarStore = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const useSideNavBarStore = create<SideNavBarStore>((set) => ({
  open: false,
  setOpen: (value) => set({ open: value }),
}));
