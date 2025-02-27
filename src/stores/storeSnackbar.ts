import { create } from "zustand";

interface ISnackbar {
    visible: boolean;
    showSnackbar: ({ message, duration }: { message: string, visible: boolean, duration: number }) => void;
    message: string;
    duration: number,
    onDismiss: () => void;
}

const useStoreSnackbar = create<ISnackbar>()(
    (set, get) => ({
        visible: false,
        message: "",
        duration: 3 * 1000,
        showSnackbar: ({
            message, duration
        }) => set({ visible: !get().visible, message, duration }),
        onDismiss: () => set({ visible: false }),
    })
);

export default useStoreSnackbar;