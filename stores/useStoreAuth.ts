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
    user: User | null;
    setUser: (user: User) => void;
    setLoading: (loading: boolean) => void;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, confirmPassword: string) => Promise<void>;
    signOut: () => Promise<void>;
    listenToAuthChanges: () => void;
    getPlayer: () => string
}

const useStoreAuth = create<IAuth>()(
    persist(
        (set, get) => ({
            user: null,
            loading: false,
            setUser: (user) => set({ user }),
            setLoading: (loading: boolean) => set({ loading }),
            login: async (email: string, password: string) => {
                useStoreLoading.getState().setLoading(true);
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    set({ user: userCredential.user });

                } catch (error) {
                    console.log(error);
                } finally {
                    useStoreLoading.getState().setLoading(false);
                }
            },
            getPlayer: () => get().user?.email?.split("@").at(0)!,
            register: async (email: string, password: string, confirmPassword: string) => {
                useStoreLoading.getState().setLoading(true);
                try {
                    await createUserWithEmailAndPassword(auth, email, password);
                } catch (error) {
                    console.log(error);
                } finally {
                    useStoreLoading.getState().setLoading(false);
                }
            },
            signOut: async () => {
                set({ user: null });
            },
            listenToAuthChanges: () => {
                onAuthStateChanged(auth,
                    (user => {
                        set({ user: user, loading: false });
                    })
                );
            }
        }),
        {
            name: "user-info",
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);



export default useStoreAuth;