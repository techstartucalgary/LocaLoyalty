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
  priority: number;
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
  reward_id: number | null;
  title: string;
  requiredStamps: number;
}

type LoyaltyProgramState = {
  refetchIndicator: number;
  businessName: string;
  businessLogo: string;
  businessPhone: string;
  businessEmail: string;
  stampLife: number | null; //null for forever, number for month duration
  stampCount: number;
  scaleAmount: string;
  definedRewards: Reward[];
  isEditing: boolean;
  setBusinessInfo: (
    name: string,
    logo: string,
    phone: string,
    email: string
  ) => void;
  setStampLife: (value: number | null) => void;
  incrementStampCount: () => void;
  decrementStampCount: () => void;
  setStampCount: (value: number) => void;
  setScaleAmount: (value: string) => void;
  setDefinedRewards: (defined: Reward[]) => void;
  addReward: (toAdd: Reward) => void;
  deleteReward: (toDelete: Reward) => void;
  updateReward: (initial: Reward, changed: Reward) => void;
  setIsEditing: () => void;
  incrementRefetch: () => void;
};

export const useLoyaltyProgramStore = create<LoyaltyProgramState>((set) => ({
  refetchIndicator: 0,
  businessName: "",
  businessLogo: "",
  businessPhone: "",
  businessEmail: "",
  stampLife: null,
  stampCount: 6,
  scaleAmount: "5",
  definedRewards: [],
  isEditing: false,
  setBusinessInfo: (name, logo, phone, email) =>
    set({
      businessName: name,
      businessLogo: logo,
      businessPhone: phone,
      businessEmail: email,
    }),
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
  setStampCount: (value) => set({ stampCount: value }),
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
  setIsEditing: () => {
    set((state) => ({
      isEditing: !state.isEditing,
    }));
  },
  incrementRefetch: () => {
    set((state) => ({
      refetchIndicator: state.refetchIndicator + 1,
    }));
  },
}));
