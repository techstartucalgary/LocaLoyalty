import { create } from "zustand";

type WalletState = {
	currentBusinessName: string;
	currentBusinessImage: any;
	currentBusinessDescription: string;
	currentCompletedStamps: number;
	currentMaxStamps: number;
	currentPrimaryColor: string;
	setCurrentBusinessName: (name: string) => void;
	setCurrentBusinessImage: (image: any) => void;
	setCurrentBuisnessDescription: (desc: string) => void;
	setCurrentCompletedStamps: (completedStampNumber: number) => void;
	setCurrentMaxStamps: (maxStampNumber: number) => void;
	setCurrentPrimaryColor: (color: string) => void;
};

export const useWalletStore = create<WalletState>((set) => ({
	currentBusinessName: "",
	currentBusinessImage: "",
	currentBusinessDescription: "",
	currentCompletedStamps: 0,
	currentMaxStamps: 6,
	currentPrimaryColor: "",
	setCurrentBusinessName: (name) => {
		set({ currentBusinessName: name });
	},
	setCurrentBusinessImage: (image) => {
		set({ currentBusinessImage: image });
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
}));

