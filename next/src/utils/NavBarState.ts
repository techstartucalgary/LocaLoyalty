import { create } from "zustand";

type NavBarState = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const useNavBarStore = create<NavBarState>((set) => ({
  open: true,
  setOpen: (value) => set({ open: value }),
}));