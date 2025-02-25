import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import useStoreQuestion from "@/stores/useStoreQuestion";

const CategoryPickerModal = ({ visible, onClose }: { visible: boolean, onClose: () => void; }) => {
    const storeQuestion = useStoreQuestion();

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose} // กดข้างนอกแล้วปิด
            style={styles.modal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <View style={styles.content}>
                <Picker
                    selectedValue={storeQuestion.category}
                    onValueChange={(v) => storeQuestion.setCategory(v)}
                >
                    {storeQuestion.categories.map((category) => (
                        <Picker.Item key={category.id} label={category.label} value={category.id} />
                    ))}
                </Picker>
                <Button title="ปิด" onPress={onClose} />
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
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default CategoryPickerModal;
