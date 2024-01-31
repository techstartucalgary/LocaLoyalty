import { create } from "zustand";

type WalletState = {
    currentBusinessName: string,
    currentBusinessImage: any,
    currentCompletedStamps: number,
    currentMaxStamps: number,
    currentPrimaryColor: string,
    setCurrentBusinessName: (name: string) => void,
    setCurrentBusinessImage: (image: any) => void,
    setCurrentCompletedStamps: (completedStampNumber: number) => void,
    setCurrentMaxStamps: (maxStampNumber: number) => void,
    setCurrentPrimaryColor: (color: string) => void,
}

export const useWalletStore = create<WalletState>((set) => ({
    currentBusinessName: "",
    currentBusinessImage: "",
    currentCompletedStamps: 0,
    currentMaxStamps: 6,
    currentPrimaryColor: "",
    setCurrentBusinessName: (name) => {
        set({ currentBusinessName: name })
    },
    setCurrentBusinessImage: (image) => {
        set({ currentBusinessImage: image })
    },
    setCurrentCompletedStamps: (completedStampNumber) => {
        set({ currentCompletedStamps: completedStampNumber })
    },
    setCurrentMaxStamps: (maxStampNumber) => {
        set({ currentMaxStamps: maxStampNumber })
    },
    setCurrentPrimaryColor: (color) => {
        set({ currentPrimaryColor: color })
    },

}))

type CardState = {
    isDetailsSelected: boolean,
    setDetailsSelected: (bool: boolean) => void,
}

export const useCardStore = create<CardState>((set) => ({
    isDetailsSelected: false,
    setDetailsSelected: (bool) => {
        set({ isDetailsSelected: bool })
    }
}))
