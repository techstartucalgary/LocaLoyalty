import { create } from "zustand";

type WalletState = {
	currentBusinessID: number;
	currentBusinessName: string;
	currentBusinessImage: any;
	currentBusinessEmail: string;
	currentBusinessPhone: string;
	currentBusinessDescription: string;
	currentCompletedStamps: number;
	currentMaxStamps: number;
	currentPrimaryColor: string;
	setCurrentBusinessID: (id: number) => void;
	setCurrentBusinessName: (name: string) => void;
	setCurrentBusinessImage: (image: any) => void;
	setCurrentBusinessEmail: (email: string) => void;
	setCurrentBusinessPhone: (phone: string) => void;
	setCurrentBuisnessDescription: (desc: string) => void;
	setCurrentCompletedStamps: (completedStampNumber: number) => void;
	setCurrentMaxStamps: (maxStampNumber: number) => void;
	setCurrentPrimaryColor: (color: string) => void;
};

export const useWalletStore = create<WalletState>((set) => ({
	currentBusinessID: 0,
	currentBusinessName: "",
	currentBusinessImage: "",
	currentBusinessEmail: "",
	currentBusinessPhone: "",
	currentBusinessDescription: "",
	currentCompletedStamps: 0,
	currentMaxStamps: 6,
	currentPrimaryColor: "",
	setCurrentBusinessID: (id) => {
		set({ currentBusinessID: id });
	},
	setCurrentBusinessName: (name) => {
		set({ currentBusinessName: name });
	},
	setCurrentBusinessEmail: (email) => {
		set({ currentBusinessEmail: email })
	},
	setCurrentBusinessPhone: (phone) => {
		set({ currentBusinessPhone: phone })
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

