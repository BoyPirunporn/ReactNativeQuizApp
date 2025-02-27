import { auth } from '@/config/firebaseConfig';
import useStoreAuth from '@/stores/useStoreAuth';
import useStoreLoading from '@/stores/useStoreLoading';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut as signOutFire, User } from '@firebase/auth';

const useFirebaseHook = () => {

    const authStore = useStoreAuth();

    const signIn = async (email: string, password: string) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        authStore.setUser(userCredential.user);
    }
    const signUp = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    }
    const signOut = async () => {
        await signOutFire(auth);
        authStore.setUser(null);
    };

    const listenToAuthChanges = async () => {
        onAuthStateChanged(auth, user => authStore.setUser(user!));
    };

    return {
        signIn,
        signUp,
        signOut,
        listenToAuthChanges,
    };
}


export default useFirebaseHook;
