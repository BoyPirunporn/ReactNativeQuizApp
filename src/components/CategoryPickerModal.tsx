import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import useStoreQuestion from "@/stores/useStoreQuestion";
import Button from '@/components/button';
import { theme } from "@/config/theme";

interface CategoryPickerModalProps {
    visible: boolean;
    onPress: () => void;
    onClose: () => void;
}

const CategoryPickerModal = ({ visible, onPress, onClose }: CategoryPickerModalProps) => {
    const storeQuestion = useStoreQuestion();
    return (
        <Modal
            isVisible={visible}
            style={styles.modal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onBackdropPress={onClose}
        >
            <View style={styles.content}>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: theme.colors.inversePrimary,
                        borderRadius: 10,
                    }}
                >
                    <Picker
                        selectedValue={storeQuestion.category}
                        onValueChange={(v) => {
                            console.log(v)
                            storeQuestion.setCategory(v);
                        }}
                        mode={Platform.OS === "ios" ? "dialog" : "dropdown"}
                    >
                        {storeQuestion.categories.map((category) => (
                            <Picker.Item key={category.id} label={category.label} value={category} />
                        ))}
                    </Picker>
                </View>
                <Button label="Start" fontSize={16} height={40} onPress={onPress} style={{
                    marginBottom: "auto",
                }} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    content: {
        height: "20%",
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        gap: 20
    },
});

export default CategoryPickerModal;
