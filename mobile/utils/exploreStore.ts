import { create } from "zustand";

type RefetchFunc = () => void;

type ExploreState = {
    currentExploreVendorID: number;
    currentExploreName: string;
    currentExploreImage: any;
    currentExploreDescription: string;
    refetchFunc: () => void;
    setCurrentExploreVendorID: (vendor_id: number) => void;
    setCurrentExploreName: (name: string) => void;
    setCurrentExploreImage: (image: any) => void;
    setCurrentExploreDescription: (desc: string) => void;
    setRefetchFunc: (func: RefetchFunc) => void;
}

export const useExploreStore = create<ExploreState>((set) => ({
    currentExploreVendorID: 0,
    currentExploreName: "",
    currentExploreImage: "",
    currentExploreDescription: "",
    refetchFunc: () => { },
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
    setRefetchFunc: (func: RefetchFunc) => {
        set({ refetchFunc: func });
    },
}));