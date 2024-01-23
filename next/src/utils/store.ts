// counterStore.ts
import { create } from "zustand";

type AuthState = {
  token: string | null;
  setToken: (val: string | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (val) => set({ token: val }),
}));
