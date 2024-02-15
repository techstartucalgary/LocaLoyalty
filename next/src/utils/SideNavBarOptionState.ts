import { create } from 'zustand';

type SideNavBarOptionStore = {
  activeButton: string;
  setActiveButton: (button: string) => void;
}

export const useSideNavBarOptionState = create<SideNavBarOptionStore>((set) => ({
  activeButton: '1',
  setActiveButton: (button) => set({ activeButton: button }),
}));
