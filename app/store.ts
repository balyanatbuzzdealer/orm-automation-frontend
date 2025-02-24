import {create} from "zustand"

type AppStore ={
    loggedIn: boolean;
    makeTrue: () => void;
    makeFalse: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
    loggedIn: false,
    makeTrue:  () => {
        set((state) => ({loggedIn: true}));
    },
    makeFalse:  () => {
        set((state) => ({loggedIn: false}));
    }
}));