import { DimensionValue, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import { MD3Theme, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
interface ButtonProps {
    label: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    linearColor?: string[];
    linear?: boolean;
    disabled?: boolean;
    fontSize?: number;
    width?: DimensionValue | undefined;
    height?: DimensionValue | undefined;
    backgroundColor?: string;
}

const Button = ({
    label,
    onPress,
    linearColor = ['#25bfb6', '#41e596'],
    style,
    linear = true,
    disabled = false,
    fontSize = 12,
    width = "100%",
    height = 60,
    backgroundColor = "linear-gradient(135deg, #25bfb6 0%, #41e596 100%)"
}: ButtonProps) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={{ alignSelf: "stretch" }}>
            {linear && !disabled
                ? <LinearGradient
                    colors={linearColor}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[style,styles.button, { width, height, backgroundColor }]}
                >
                    <Text style={[styles.text, { fontSize: fontSize }]}>{label}</Text>
                </LinearGradient>
                :
                (
                    <View style={[styles.button, { width, height, backgroundColor, borderRadius: 10 }]}>
                        <Text style={styles.text}>{label}</Text>
                    </View>
                )}

        </TouchableOpacity>

    );
};

export default Button;

const useStyles = (theme: MD3Theme) => StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "600"
    }
});;