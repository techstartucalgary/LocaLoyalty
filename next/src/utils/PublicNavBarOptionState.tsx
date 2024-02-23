import { create } from 'zustand';

type PublicNavBarOptionStore = {
  activeButton: string;
  setActiveButton: (button: string) => void;
}

export const usePublicNavBarOptionState = create<PublicNavBarOptionStore>((set) => ({
  activeButton: '1',
  setActiveButton: (button) => set({ activeButton: button }),
}));
