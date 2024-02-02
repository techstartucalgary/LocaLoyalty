import { create } from "zustand";

type NavBarStore = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const useNavBarStore = create<NavBarStore>((set) => ({
  open: true,
  setOpen: (value) => set({ open: value }),
}));