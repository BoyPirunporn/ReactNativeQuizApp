import { create } from "zustand";


const useStoreLoading = create<{
    loading: boolean;
    setLoading: (loading: boolean) => void;
}>()
    ((set, get) => {
        return ({
            loading: false,
            setLoading: (loading: boolean) => set({ loading: loading })
        });
    });

export default useStoreLoading;