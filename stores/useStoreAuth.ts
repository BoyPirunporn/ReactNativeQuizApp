import {  auth, storageFirebase } from "@/config/firebaseConfig";
import { FirebaseService } from "@/services/firebaseService";
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./StorageMMK";

interface IAuth {
    playerName: string | null,
    setPlayer: (playerName: string) => Promise<void>;
    loading: boolean;
    user: User | null;
    setUser: (user: any) => void;
    setLoading: (loading: boolean) => void;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, confirmPassword: string) => Promise<void>;
    logout: () => Promise<void>;
    listenToAuthChanges: () => void;
}

const useStoreAuth = create<IAuth>()(
    persist(
        set => ({
            playerName: null,
            setPlayer: async (playerName: string) => {
                const storage = new FirebaseService(storageFirebase);
                const pId = await storage.save<{ playerName: string; }>({
                    name: "players"
                }, {
                    playerName
                });
                set({ playerName: pId });
            },
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
            register: async (email: string, password: string, confirmPassword: string) => {
                try {
                    if (password !== confirmPassword) throw new Error("Password is not match");
                    await createUserWithEmailAndPassword(auth,email, password);
                } catch (error) {
                    console.log(error)
                }
            },
            logout: async () => {
                try {
                    await signOut(auth);
                    set({ user: null })
                } catch (error) {
                    console.log(error)
                }
            },
            listenToAuthChanges: () => {
                onAuthStateChanged(auth,
                    (user => {
                        console.log({user})
                        set({ user: user, loading: false });
        
                    })
                )
            }
        }),
        {
            name:"user-info",
            storage: createJSONStorage(() => zustandStorage)
        }
    )
);



export default useStoreAuth;