import { create } from "zustand";

type RefetchFunc = () => void;

type RedeemState = {
	redeemRefetchFunc: () => void;
	setRedeemRefetchFunc: (func: RefetchFunc) => void;
};

export const useRedeemStore = create<RedeemState>((set) => ({
	redeemRefetchFunc: () => {},
	setRedeemRefetchFunc: (func: RefetchFunc) => {
		set({ redeemRefetchFunc: func });
	},
}));
