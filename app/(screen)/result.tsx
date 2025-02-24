import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import React from 'react';
import Button from '@/components/button';
import { List, useTheme } from 'react-native-paper';
import useStoreQuestion from '@/stores/useStoreQuestion';
import { useRouter } from 'expo-router';
const HomeScreen = () => {
    const router = useRouter();
    const score = useStoreQuestion(state => state.score);
    const question = useStoreQuestion();
    const theme = useTheme();

    return (
        <View style={[styles.container, {}]}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require("@/assets/images/Worried-bro.png")}
                />
            </View>
            <View style={styles.content}>
                {renderItemlist()}
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    label="Back to the board"
                    style={{ alignSelf: "stretch" }}
                    onPress={() => {
                        router.navigate("board");
                        question.clearQuestionState();
                    }}
                />
            </View>
        </View>
    );
    function renderItemlist() {
        return <View style={{
            flex: 4,
        }}>
            <List.Item
                title="Total Score"
                titleStyle={{
                    fontSize: 45,
                    fontWeight: "600",
                    alignSelf: "center"
                }}
                description={score?.result}
                descriptionStyle={{
                    fontSize: 30,
                    alignSelf: "center",
                    fontWeight: "600",
                }} />
            <List.Item
                title={"Correct"}
                titleStyle={{
                    fontSize: 24,
                    fontWeight: "600",
                    alignSelf: "center",
                }}
                description={String(score?.correct)}
                descriptionStyle={{
                    fontSize: 20,
                    alignSelf: "center",
                }} />
            <List.Item
                title={"Incorrect"}
                titleStyle={{
                    fontSize: 24,
                    fontWeight: "600",
                    alignSelf: "center",
                    color: theme.colors.error
                }}
                description={String(score?.incorrect)}
                descriptionStyle={{
                    fontSize: 20,
                    alignSelf: "center",
                    paddingBottom: 20
                }} />
        </View>;
    }
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 3
    },
    imageContainer: {
        flex: 3,
        alignSelf: "stretch",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 30
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
        alignItems: "center",
        paddingTop: 10,
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 30,
        padding: 15
    },

});