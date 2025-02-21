import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

export const storage = new MMKV({
    id: "user-info"
});

export const zustandStorage: StateStorage = {
    setItem: (name: string, value: string) => storage.set(name, value),
    getItem: (name: string) => storage.getString(name) ?? null,
    removeItem: (name: string) => storage.delete(name)
};


export default storage;