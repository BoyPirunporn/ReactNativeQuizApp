import { auth } from "@/config/firebaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStoreLoading from "./useStoreLoading";

interface IAuth {
    // playerName: string | null,
    // setPlayer: (playerName: string) => Promise<void>;
    loading: boolean;
    loggedIn: boolean;
    user: User | null;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    getPlayer: () => string;
    setLoggedIn: (loggedIn: boolean) => void;
}

const useStoreAuth = create<IAuth>()(
    persist(
        (set, get) => ({
            user: null,
            loading: false,
            loggedIn: false,
            setUser: (user) => set({ user, loggedIn: !!user }),
            setLoading: (loading: boolean) => set({ loading }),
            getPlayer: () => get().user?.email?.split("@").at(0)!,
            setLoggedIn(loggedIn) {
                set({ loggedIn });
            },
        }),
        {
            name: "user-info",
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);



export default useStoreAuth;