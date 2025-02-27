import { MD3Theme } from "react-native-paper";
import { StyleSheet } from "react-native";


export const createStyle = (theme: MD3Theme) => StyleSheet.create({
    container: {
        padding: 10,
        width: "100%",
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        gap: 10,
        margin: 8,
    },
    box: {
        flex: 1,
        alignItems: "center",
        gap: 10
    },
    faceSkin: {
        position: "relative",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
    },
    crown: {
        position: "absolute",
        left: 25,
        top: -10,
    },
    rankTop: {
        position: "absolute",
        left: 25,
        top: 95,
    },
    rank: {
        position: "absolute",
        left: 25,
        top: 78,
    },
    playerName: {
        marginTop: 20,
        fontWeight: "600",
        fontSize: 20,
        textAlign: "center",
        
    },
    score: {
        fontWeight: "400",
        fontSize: 18,
        textAlign: "center",
    }
});