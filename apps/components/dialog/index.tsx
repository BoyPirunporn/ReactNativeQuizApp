import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Dialog, Portal, Text, useTheme, MD3Theme, Title, Button, Paragraph, Divider } from 'react-native-paper';
import ButtonCustom from '../button';

interface DialogComponentProps {
    visible: boolean;
    onDismiss: () => void;
    onPress?: () => void;
    onCancel?: () => void;
    title: string;
    contentText?: string;
    children?: React.ReactNode;
}
const DialogComponent = ({
    visible,
    onDismiss,
    onPress,
    onCancel,
    contentText,
    children,
    title
}: DialogComponentProps) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss} style={{
                borderRadius: 10
            }}>
                <Dialog.Title style={{ alignSelf: "stretch", alignItems: "center", justifyContent: "center" }}>
                    <Title style={{ fontWeight: "600", textAlign: "left", alignSelf: "flex-start" }}>
                        {title}
                    </Title>
                </Dialog.Title>
                <Divider style={{ borderWidth: 0.2, opacity: 0.5, marginBottom: 10 }} />
                <Dialog.Content style={{
                    alignSelf:"stretch",
                }}>
                    {children}
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
                            onPress={() => {
                                onCancel?.();
                                onDismiss();
                            }} label={'Cancel'} />
                        <ButtonCustom
                            style={{
                                height: 45,
                                width: 80
                            }}
                            onPress={onPress} label={"Submit"} />
                    </View>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default DialogComponent;

const useStyles = (theme: MD3Theme) => StyleSheet.create({
    title: {
        alignSelf: "stretch",
        padding: 10,
        backgroundColor: "red"
    },
    titleText: {
        fontSize: 22
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