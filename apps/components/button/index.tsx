import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import { MD3Theme, useTheme } from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import ButtonCustom from '@/apps/components/button';
interface ButtonProps {
    label: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    linearColor?: string[];
    linear?: boolean;
}

const Button = ({
    label,
    onPress,
    linearColor = ['#25bfb6', '#41e596'],
    style,
    linear = true
}: ButtonProps) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return (
        <TouchableOpacity onPress={onPress} style={{alignSelf:"stretch"}}>
            {linear
                ? <LinearGradient
                    colors={linearColor}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.button, style]}
                >
                    <Text style={styles.text}>{label}</Text>
                </LinearGradient>
                :
                (
                    <View style={[styles.button, style]}>
                        <Text style={styles.text}>{label}</Text>
                    </View>
                )}

        </TouchableOpacity>

    );
};

export default Button;

const useStyles = (theme: MD3Theme) => StyleSheet.create({
    button: {
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "linear-gradient(135deg, #25bfb6 0%, #41e596 100%)",
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "600"
    }
});;