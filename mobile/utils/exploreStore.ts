import { create } from "zustand";

type ExploreState = {
    currentExploreName: string;
    currentExploreImage: any;
    currentExploreDescription: string;
    setCurrentExploreName: (name: string) => void;
    setCurrentExploreImage: (image: any) => void;
    setCurrentExploreDescription: (desc: string) => void;
}

export const useExploreStore = create<ExploreState>((set) => ({
    currentExploreName: "",
    currentExploreImage: "",
    currentExploreDescription: "",
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