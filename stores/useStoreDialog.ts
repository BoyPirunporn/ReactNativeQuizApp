import { create } from 'zustand';

interface DialogProps {
    title: string,
    onPress?: () => void,
    onCancel?: () => void,
    children?: () => React.ReactNode;
    errorMessage?: string;
}
interface StoreDialogProps {
    visible: boolean;
    title: string;
    children: () => React.ReactNode;
    setTitle: (t: string) => void;
    onDismiss: () => void;
    onCancel: (callback?: () => void) => void;
    onPress: (callback?: () => void) => void;
    onOpen: (props: DialogProps) => void;
    onError: (error: DialogProps) => void;
    error: boolean;
    errorMessage?: string;
}
const useStoreDialog = create<StoreDialogProps>(
    (set) => ({
        visible: false,
        error: false,
        title: "",
        children: () => null,
        setTitle: (t: string) => set({ title: t }),
        onDismiss: () => set({ visible: false, error: false, errorMessage: "", title: "" }),
        onCancel: (callback?: () => void) => {
            set({ visible: false });
            if (callback) {
                callback();
            }
        },
        onPress: (callback?: () => void) => {
            set({ visible: false });
            if (callback) {
                callback();
            }
        },
        onOpen: ({
            title,
            onCancel,
            onPress,
            children
        }) => set({ visible: true, title, onCancel, onPress, children }),
        onError({ title, onCancel, onPress, errorMessage }) {
            set({ visible: true, error: true, title, onCancel, onPress, errorMessage })
        }
    })
);

export default useStoreDialog;