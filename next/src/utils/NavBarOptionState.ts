import { create } from "zustand";

type ActiveButtons = {
  dashboard: boolean;
  loyalty: boolean;
  promotions: boolean;
  analytics: boolean;
  settings: boolean;
  help: boolean;
};

type NavBarOptionState = {
  activeButtons: ActiveButtons;
  setActiveButton: (button: keyof ActiveButtons, isActive: boolean) => void;
};

export const useNavBarOptionStore = create<NavBarOptionState>((set) => ({
  activeButtons: {
    dashboard: true,
    loyalty: false,
    promotions: false,
    analytics: false,
    settings: false,
    help: false,
  },
  setActiveButton: (button, isActive) =>
    set((state) => ({
      activeButtons: { ...state.activeButtons, [button]: isActive },
    })),
}));