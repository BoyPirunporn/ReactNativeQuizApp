import React from 'react'
import { Dimensions, View, StyleSheet, } from 'react-native';
import { MD3Theme, Title, useTheme } from 'react-native-paper';
import Modal from 'react-native-modal';
interface DialogCommonProps {
    visible: boolean;
    onDismiss: () => void;
    onPress?: () => void;
    onCancel?: () => void;
    title: string;
    children?: React.ReactNode | string | string[] | React.JSX.Element | React.JSX.Element[];
}

const DialogCommon: React.FC<DialogCommonProps> = ({
    visible,
    onDismiss,
    onPress,
    onCancel,
    children,
    title
}) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onDismiss} 
            animationIn={"zoomIn"}
            animationOut={"zoomOut"}
            >
            <View>
                <View style={{
                    backgroundColor: theme.colors.inversePrimary,
                    padding: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Title style={styles.titleText}>{title}</Title>
                </View>
                <View style={{
                    padding: 10,
                    backgroundColor: theme.colors.surface,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                }}>
                    {children}
                </View>
            </View>
        </Modal>
        // <Portal>
        //     <Dialog visible={visible} onDismiss={onDismiss} style={{
        //         borderRadius: 10
        //     }}>
        //         <Dialog.Title style={styles.title}>
        //             <Title style={{ fontWeight: "600", textAlign: "left", alignSelf: "flex-start" }}>
        //                 {title}
        //             </Title>
        //         </Dialog.Title>
        //         <Divider style={{ borderWidth: 0.2, opacity: 0.5, marginBottom: 10 }} />
        //         <Dialog.Content style={{
        //             alignSelf: "stretch",
        //         }}>
        //             {children}
        //         </Dialog.Content>
        //     </Dialog>
        // </Portal>
    )
}
const useStyles = (theme: MD3Theme) => StyleSheet.create({
    title: { alignSelf: "stretch", alignItems: "center", justifyContent: "center" },
    titleText: {
        fontSize: 20,
        color:"#fff"
    },
    btnClose: {
        backgroundColor: theme.colors.primary,
        width: 80,
        height: 45,
        borderRadius: 8,
        alignSelf: "flex-start"
    },
    btnSend: {
        backgroundColor: theme.colors.primary,
        width: 80,
        height: 45,
        borderRadius: 8,
        alignSelf: "flex-end"
    }
});
export default DialogCommon