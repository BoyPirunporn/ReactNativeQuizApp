import { auth, storageFirebase } from "@/config/firebaseConfig";
import { FirebaseService } from "@/services/firebaseService";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// import { zustandStorage } from "./StorageMMK";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStoreLoading from "./useStoreLoading";

interface IAuth {
    // playerName: string | null,
    // setPlayer: (playerName: string) => Promise<void>;
    loading: boolean;
    user: User | null;
    setUser: (user: any) => void;
    setLoading: (loading: boolean) => void;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, confirmPassword: string) => Promise<void>;
    logout: () => Promise<void>;
    listenToAuthChanges: () => void;
    getPlayer:() => string
}

const useStoreAuth = create<IAuth>()(
    persist(
        (set, get) => ({
            // playerName: null,
            // setPlayer: async (playerName: string) => {
            //     const storage = new FirebaseService(storageFirebase);
            //     const pId = await storage.save<{ playerName: string; }>({
            //         name: "players"
            //     }, {
            //         playerName
            //     });
            //     set({ playerName: pId });
            // },
            user: null,
            loading: false,
            setUser: (user) => set({ user }),
            setLoading: (loading: boolean) => set({ loading }),
            login: async (email: string, password: string) => {
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    set({ user: userCredential.user });
                } catch (error) {
                    console.log(error);
                }
            },
            getPlayer:() => get().user?.email?.split("@").at(0)!,
            register: async (email: string, password: string, confirmPassword: string) => {
                try {
                    await createUserWithEmailAndPassword(auth, email, password);
                } catch (error) {
                    console.log(error);
                }
            },
            logout: async () => {
                try {
                    await signOut(auth);
                    set({ user: null });
                } catch (error) {
                    console.log(error);
                }
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