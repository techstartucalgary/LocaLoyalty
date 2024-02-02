import { create } from 'zustand';

type NavBarOptionStore = {
  activeButton: string;
  setActiveButton: (button: string) => void;
}

export const useNavBarOptionState = create<NavBarOptionStore>((set) => ({
  activeButton: '1',
  setActiveButton: (button) => set({ activeButton: button }),
}));
