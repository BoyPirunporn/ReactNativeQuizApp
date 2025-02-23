import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';

interface ItemListProps {
    rank: number;
    playerName: string;
    score: number;
    totalQuestion: number;
}
export default function ItemList({
    rank,
    score,
    playerName,
    totalQuestion
}: ItemListProps) {
    const theme = useTheme();
    const styles = createStyle(theme);
    return (
        <View style={styles.rank}>
            <View style={styles.container}>
                <View style={styles.containerText2}>
                    <View style={styles.circle}>
                        <Text style={[styles.titleStyle, { color: "#fff" }]}>{rank}</Text>
                    </View>
                    <Text style={styles.titleStyle}>{playerName}</Text>
                </View>
                <Text style={styles.listStyleDescription}>{score} / {totalQuestion}</Text>
            </View>
        </View>
    );
}


const createStyle = (theme: MD3Theme) => StyleSheet.create({
    rank: {
        padding: 8,
        marginVertical: 5,
        borderRadius: 30,
        borderWidth: 1.4,
        borderColor: theme.colors.inversePrimary
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
    },
    containerText2: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    circle: {
        backgroundColor: theme.colors.inversePrimary,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        borderRadius: 30,
        width: 30,
        height: 30,
    },
    titleStyle: {
        fontSize: 16,
        paddingBottom: 5
    },
    listStyleDescription: {
        fontSize: 20,
        color: theme.colors.onSecondaryContainer,
        fontWeight: "700"
    }
});