import { create } from 'zustand';

interface StorateDialogBoard {
    visible: boolean;
    message: string;
    setMessage: (message: string) => void;
    onClose: () => void;
    onOpen: () => void;
}
const useStoreDialogBoard = create<StorateDialogBoard>(
    (set) => ({
        visible: false,
        message: "",
        setMessage: (message: string) => set({ message }),
        onClose: () => set({ visible: false }),
        onOpen: () => set({ visible: true }),
    })
);

export default useStoreDialogBoard;