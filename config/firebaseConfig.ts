import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA6ya9OmRZTZOCvKvJsw7t7uoeJf-oJtnw",
  authDomain: "questionandasnwer.firebaseapp.com",
  projectId: "questionandasnwer",
  storageBucket: "questionandasnwer.appspot.com",
  messagingSenderId: "582682881442",
  appId: "1:582682881442:web:988bb2732b79e1ec7dd6fb",
  measurementId: "G-1CYGGF6XWF"
};

export const app = initializeApp(firebaseConfig);
export const storageFirebase = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});