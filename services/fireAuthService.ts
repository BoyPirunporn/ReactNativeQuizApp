import { auth } from "@/config/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    User,
    signOut as signOutFirebase,
    onAuthStateChanged,
} from "firebase/auth";

export const signIn = async (email: string, password: string): Promise<User | undefined> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.log(error);
    }
};
export const signUp = async (email: string, password: string) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
    }
};
export const signOut = async () => {
    try {
        await signOutFirebase(auth);
    } catch (error) {
        console.log(error);
    }
};

export const listenToAuthChanges = async (): Promise<User | null> => {
    const user: User | null = null;
    onAuthStateChanged(auth,
        (user => {
            user = user;
        })
    );
    return user;
};
