import React from 'react'
import { Dimensions, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MD3Theme, Title, useTheme } from 'react-native-paper';
import ButtonCustom from '../../button';
import ReactNativeModal from 'react-native-modal';
interface DialogErrorProps {
    visible: boolean;
    onDismiss: () => void;
    onPress?: () => void;
    title: string;
    message: string;
    onCancle?: () => void;
}

const DialogError: React.FC<DialogErrorProps> = ({
    visible,
    onDismiss,
    onCancle,
    message,
    title,
}) => {
    const theme = useTheme();
    const styles = useStyles(theme);

    const handleDismiss = () => {
        onDismiss();
        onCancle && onCancle();
    }
    return (
        <ReactNativeModal isVisible={visible}
            onBackdropPress={handleDismiss}
            animationIn={"zoomIn"} animationOut={"zoomOut"}>
            <View>
                <View style={{
                    backgroundColor: theme.colors.error,
                    padding: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Title style={styles.titleText}>{title}</Title>
                </View>
                <View style={{
                    gap: 20,
                    padding: 10,
                    backgroundColor: theme.colors.surface,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                }}>
                    <Text style={{ fontSize: 16, }}>{message ?? "Internal server error"}</Text>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                    }}>
                        <ButtonCustom
                            linear={false}
                            backgroundColor={theme.colors.error}
                            width={80}
                            height={45}
                            onPress={handleDismiss}
                            label={'ok'} />
                    </View>
                </View>
            </View>
        </ReactNativeModal>

    )
}
const useStyles = (theme: MD3Theme) => StyleSheet.create({
    title: { alignSelf: "stretch", alignItems: "center", justifyContent: "center" },
    titleText: {
        fontSize: Dimensions.get("window").width / 30.90,
        color: "#fff"
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
export default DialogError