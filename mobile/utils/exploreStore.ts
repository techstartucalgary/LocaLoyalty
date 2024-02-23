import { create } from "zustand";

type ExploreState = {
    currentExploreVendorID: number;
    currentExploreName: string;
    currentExploreImage: any;
    currentExploreDescription: string;
    setCurrentExploreVendorID: (vendor_id: number) => void;
    setCurrentExploreName: (name: string) => void;
    setCurrentExploreImage: (image: any) => void;
    setCurrentExploreDescription: (desc: string) => void;
}

export const useExploreStore = create<ExploreState>((set) => ({
    currentExploreVendorID: 0,
    currentExploreName: "",
    currentExploreImage: "",
    currentExploreDescription: "",
    setCurrentExploreVendorID: (vendor_id) => {
        set({ currentExploreVendorID: vendor_id });
    },
    setCurrentExploreName: (name) => {
        set({ currentExploreName: name });
    },
    setCurrentExploreImage: (image) => {
        set({ currentExploreImage: image });
    },
    setCurrentExploreDescription: (desc: string) => {
        set({ currentExploreDescription: desc });
    },
}));