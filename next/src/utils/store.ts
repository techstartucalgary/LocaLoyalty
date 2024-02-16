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

export interface CompletionCardProps {
  id: number;
  icon: string;
  title: string;
  order: number;
  isCompleted: boolean;
  directory: string;
  buttonText: string;
}

type OnboardingState = {
  completionCards: CompletionCardProps[];
  setCompletionCards: (cards: CompletionCardProps[]) => void;
  setComplete: (id: number) => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  completionCards: [],
  setCompletionCards: (cards) => set({ completionCards: cards }),
  setComplete: (id) =>
    set((state) => {
      const updatedCards = state.completionCards.map((card) => {
        if (card.id === id) {
          return { ...card, isCompleted: !card.isCompleted };
        }
        return card;
      });

      return { completionCards: updatedCards };
    }),
}));

interface Reward {
  title: string;
  requiredStamps: number;
}

type LoyaltyProgramState = {
  stampLife: number | null; //null for forever, number for month duration
  stampCount: number;
  scaleAmount: string;
  definedRewards: Reward[];
  setStampLife: (value: number | null) => void;
  incrementStampCount: () => void;
  decrementStampCount: () => void;
  setScaleAmount: (value: string) => void;
  setDefinedRewards: (defined: Reward[]) => void;
  addReward: (toAdd: Reward) => void;
  deleteReward: (toDelete: Reward) => void;
  updateReward: (initial: Reward, changed: Reward) => void;
};

export const useLoyaltyProgramStore = create<LoyaltyProgramState>((set) => ({
  stampLife: null,
  stampCount: 6,
  scaleAmount: "5",
  definedRewards: [],
  setStampLife: (value) => set({ stampLife: value }),
  incrementStampCount: () =>
    set((state) => ({
      stampCount:
        state.stampCount < 10 ? state.stampCount + 1 : state.stampCount,
    })),
  decrementStampCount: () =>
    set((state) => ({
      stampCount:
        state.stampCount > 5 ? state.stampCount - 1 : state.stampCount,
    })),
  setScaleAmount: (value) => set({ scaleAmount: value }),
  setDefinedRewards: (defined) => set({ definedRewards: defined }),
  addReward: (toAdd) =>
    set((state) => ({
      definedRewards: [...state.definedRewards, toAdd],
    })),
  deleteReward: (toDelete) => {
    set((state) => ({
      definedRewards: state.definedRewards.filter(
        (reward) =>
          !(
            reward.title === toDelete.title &&
            reward.requiredStamps === toDelete.requiredStamps
          )
      ),
    }));
  },
  updateReward: (initial, changed) => {
    set((state) => ({
      definedRewards: state.definedRewards.map((reward) =>
        reward.title === initial.title &&
        reward.requiredStamps === initial.requiredStamps
          ? { ...reward, ...changed }
          : reward
      ),
    }));
  },
}));
