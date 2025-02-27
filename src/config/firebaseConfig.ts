import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALUpMG1yNhNIrVGoeiseXbycdMXMw7qYQ",
  authDomain: "qanda-9cdcc.firebaseapp.com",
  projectId: "qanda-9cdcc",
  storageBucket: "qanda-9cdcc.firebasestorage.app",
  messagingSenderId: "313337670885",
  appId: "1:313337670885:web:09db1e8c10dae9663f380c"
};

export const app = initializeApp(firebaseConfig);
export const storageFirebase = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});