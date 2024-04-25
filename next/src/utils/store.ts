// counterStore.ts
import { create } from "zustand";
import { Star1Icon } from "@/app/auth/loyalty-program/DesignIcons";

export interface CompletionCardProps {
  onboarding_id: number;
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
        if (card.onboarding_id === id) {
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

type IconType = React.FunctionComponent<{ color: string; size: number }>;

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

  // Design Tab
  cardLayoutStyle: number;
  activeStamp: IconType;
  activeStampValue: string;
  colors: [string, string, string];
  colorLabels: [string, string, string];
  setActiveStamp: (icon: IconType) => void;
  setActiveStampValue: (value: string) => void;
  incrementCardLayoutStyle: () => void;
  decrementCardLayoutStyle: () => void;
  setColorTheme: (color: string, index: number) => void;
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
  setDefinedRewards: (defined) =>
    set({ definedRewards: defined ? defined : [] }),
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
  // Design Tab
  cardLayoutStyle: 1,
  activeStamp: Star1Icon,
  activeStampValue: "star1",
  colors: ["#000000", "#F6F6F6", "#FFFFFF"],
  colorLabels: ["Primary", "Secondary", "Tertiary"],
  setActiveStamp: (icon) => set({ activeStamp: icon }),
  setActiveStampValue: (value: string) =>
    set((state) => ({
      activeStampValue: value,
    })),
  incrementCardLayoutStyle: () =>
    set((state) => ({
      cardLayoutStyle:
        state.cardLayoutStyle < 10
          ? state.cardLayoutStyle + 1
          : state.cardLayoutStyle,
    })),
  decrementCardLayoutStyle: () =>
    set((state) => ({
      cardLayoutStyle:
        state.cardLayoutStyle > 1
          ? state.cardLayoutStyle - 1
          : state.cardLayoutStyle,
    })),
  setColorTheme: (color, index) =>
    set((state) => {
      const newColors = [...state.colors] as [string, string, string];
      newColors[index] = color;
      return { colors: newColors };
    }),
}));
