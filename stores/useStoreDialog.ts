import { create } from 'zustand';

interface StoreDialogProps {
    visible: boolean;
    title: string;
    children: () => React.ReactNode;
    setTitle: (t: string) => void;
    onDismiss: () => void;
    onCancel: (callback?: () => void) => void;
    onPress: (callback?: () => void) => void;
    onOpen: (
        props: {
            title: string,
            onPress?: () => void,
            onCancel?: () => void,
            children?: () => React.ReactNode;
        }
    ) => void;
}
const useStoreDialog = create<StoreDialogProps>(
    (set) => ({
        visible: false,
        title: "",
        children: () => null,
        setTitle: (t: string) => set({ title: t }),
        onDismiss: () => set({ visible: false }),
        onCancel: (callback?: () => void) => {
            set({ visible: false });
            if (callback) {
                callback();
            }
        },
        onPress: (callback?: () => void) => {
            console.log("eiei");
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
    })
);

export default useStoreDialog;