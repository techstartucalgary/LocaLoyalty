// counterStore.ts
import { create } from "zustand";

type TutorialCounterState = {
  count: number;
  maxVal: number;
  increment: () => void;
  decrement: () => void;
  setMaxVal: (val: number) => void;
};

export const useTutorialCounterStore = create<TutorialCounterState>((set) => ({
  count: 0,
  maxVal: 0,
  increment: () =>
    set((state) => ({
      count: state.count < state.maxVal ? state.count + 1 : state.count,
    })),
  decrement: () =>
    set((state) => ({
      count: state.count > 0 ? state.count - 1 : state.count,
    })),
  setMaxVal: (val) => set({ maxVal: val }),
}));
