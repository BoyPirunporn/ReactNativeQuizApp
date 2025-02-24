import React from 'react'
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import { Dialog, Divider, MD3Theme, Portal, Title, useTheme } from 'react-native-paper';
import ButtonCustom from '../../button';
interface DialogErrorProps {
    visible: boolean;
    onDismiss: () => void;
    onPress?: () => void;
    title: string;
    message: string;
}

const DialogError: React.FC<DialogErrorProps> = ({
    visible,
    onDismiss,
    onPress,
    title,
    message
}) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss} style={{
                borderRadius: 10
            }}>
                <Dialog.Title style={styles.title}>
                    <Title style={{ fontWeight: "600", textAlign: "left", alignSelf: "flex-start" }}>
                        {title}
                    </Title>
                </Dialog.Title>
                <Divider style={{ borderWidth: 0.2, opacity: 0.5, marginBottom: 10 }} />
                <Dialog.Content style={{
                    alignSelf: "stretch",
                }}>
                    <Text>{message}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        gap: 5
                    }}>
                        <ButtonCustom
                            linear={false}
                            style={{
                                backgroundColor: theme.colors.error,
                                height: 45,
                                width: 80,
                            }}
                            onPress={onDismiss} label={'ok'} />
                    </View>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}
const useStyles = (theme: MD3Theme) => StyleSheet.create({
    title: { alignSelf: "stretch", alignItems: "center", justifyContent: "center" },
    titleText: {
        fontSize: Dimensions.get("window").width / 30.90
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