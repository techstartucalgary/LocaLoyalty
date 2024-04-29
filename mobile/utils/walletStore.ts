import { create } from "zustand";

type RefetchFunc = () => void;

type WalletState = {
	currentBusinessID: number;
	currentBusinessName: string;
	currentBusinessAddress: string;
	currentBusinessLogo: string;
	currentBusinessEmail: string;
	currentBusinessPhone: string;
	currentBusinessDescription: string;
	currentCompletedStamps: number;
	currentMaxStamps: number;
	currentPrimaryColor: string;
	currentColor2: string;
	currentColor3: string;
	currentCarry_over_amt: number;
	currentSpending_per_point: number;
	currentLoyaltyID: number;
	walletRefetchFunc: () => void;
	setCurrentBusinessID: (id: number) => void;
	setCurrentBusinessName: (name: string) => void;
	setCurrentBusinessAddress: (address: string) => void;
	setCurrentBusinessLogo: (image: string) => void;
	setCurrentBusinessEmail: (email: string) => void;
	setCurrentBusinessPhone: (phone: string) => void;
	setCurrentBuisnessDescription: (desc: string) => void;
	setCurrentCompletedStamps: (completedStampNumber: number) => void;
	setCurrentMaxStamps: (maxStampNumber: number) => void;
	setCurrentPrimaryColor: (color: string) => void;
	setCurrentColor2: (color: string) => void;
	setCurrentColor3: (color: string) => void;
	setCurrentCarry_over_amt: (carry_over_amt: number) => void;
	setCurrentSpending_per_point: (spending_per_point: number) => void;
	setCurrentLoyaltyID: (loyaltyID: number) => void;
	setWalletRefetchFunc: (func: RefetchFunc) => void;
};

export const useWalletStore = create<WalletState>((set) => ({
	currentBusinessID: 0,
	currentBusinessName: "",
	currentBusinessAddress: "",
	currentBusinessLogo: "",
	currentBusinessEmail: "",
	currentBusinessPhone: "",
	currentBusinessDescription: "",
	currentCompletedStamps: 0,
	currentMaxStamps: 6,
	currentPrimaryColor: "",
	currentColor2: "",
	currentColor3: "",
	currentCarry_over_amt: 0,
	currentSpending_per_point: 0,
	currentLoyaltyID: 0,
	walletRefetchFunc: () => { },
	setCurrentBusinessID: (id) => {
		set({ currentBusinessID: id });
	},
	setCurrentBusinessName: (name) => {
		set({ currentBusinessName: name });
	},
	setCurrentBusinessAddress: (address) => {
		set({ currentBusinessAddress: address });
	},
	setCurrentBusinessEmail: (email) => {
		set({ currentBusinessEmail: email });
	},
	setCurrentBusinessPhone: (phone) => {
		set({ currentBusinessPhone: phone });
	},
	setCurrentBusinessLogo: (image) => {
		set({ currentBusinessLogo: image });
	},
	setCurrentBuisnessDescription: (desc: string) => {
		set({ currentBusinessDescription: desc });
	},
	setCurrentCompletedStamps: (completedStampNumber) => {
		set({ currentCompletedStamps: completedStampNumber });
	},
	setCurrentMaxStamps: (maxStampNumber) => {
		set({ currentMaxStamps: maxStampNumber });
	},
	setCurrentPrimaryColor: (color) => {
		set({ currentPrimaryColor: color });
	},
	setCurrentColor2: (color) => {
		set({ currentColor2: color });
	},
	setCurrentColor3: (color) => {
		set({ currentColor3: color });
	},
	setCurrentCarry_over_amt: (carry_over_amt: number) => {
		set({ currentCarry_over_amt: carry_over_amt });
	},
	setCurrentSpending_per_point: (spending_per_point: number) => {
		set({ currentSpending_per_point: spending_per_point });
	},
	setCurrentLoyaltyID: (loyaltyID: number) => {
		set({ currentLoyaltyID: loyaltyID });
	},
	setWalletRefetchFunc: (func: RefetchFunc) => {
		set({ walletRefetchFunc: func });
	},
}));
