import Button from '@/components/button';
import useStoreSnackbar from '@/stores/storeSnackbar';
import useStoreDialog from '@/stores/useStoreDialog';
import useStoreQuestion from '@/stores/useStoreQuestion';
import { AntDesign } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MD3Theme, useTheme } from 'react-native-paper';

// import { X, Check } from 'lucide-react-native';
const QuestionScreenV2 = () => {
    const router =useRouter();
    const theme = useTheme();
    const styles = useStyles(theme);
    const {
        question,
        setQuestion,
        nextQuestion,
        prveQuestion,
        currentQuestion,
        onSelect,
        findAnswers,
        flag,
        onValidate,
        compare,
        clearQuestionState
    } = useStoreQuestion();
    const storeDialog = useStoreDialog();

    const snackBar = useStoreSnackbar();
    useEffect(() => {
        if (!question.length) {
            setQuestion();
        }
    }, []);

    const handleSubmit = () => {
        if (onValidate()) {
            storeDialog.onOpen({
                children: () => (
                    <View style={{ flexDirection: "column", gap: 20 }}>
                        <Text style={{ fontSize: 18 }}>send your answer</Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                            alignContent: "flex-end",
                            gap: 5
                        }}>
                            <Button
                                linear={false}
                                style={{
                                    backgroundColor: theme.colors.error,
                                    height: 45,
                                    width: 80,
                                }}
                                onPress={() => {
                                    storeDialog.onDismiss();
                                }} label={'Cancel'} />
                            <Button
                                style={{
                                    height: 45,
                                    width: 80
                                }}
                                onPress={handleSend} label={"Submit"} />
                        </View>
                    </View>
                ),
                title: "Confirm send answer.",
                onPress: handleSend,
            });
        } else {
            snackBar.showSnackbar({
                message: "Please answer all questions.",
                visible: true,
                duration: 2 * 1000,
            });
        }
    };
    const handleSend = async () => {
        storeDialog.onDismiss();
        await compare();
        clearQuestionState();
        router.navigate("result")
    };
    return question.length ? (
        <View style={styles.container}>
            <View >
                <Text style={styles.title}>{currentQuestion + 1}. {question[currentQuestion].question}</Text>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={question[currentQuestion].chooses}
                    renderItem={(choose) => {
                        const quest = question[currentQuestion];
                        const answ = findAnswers(quest.id);
                        return (
                            <TouchableOpacity onPress={() => onSelect(choose.item, quest.id, quest.correctAnswer)}>
                                <View style={[styles.item, answ?.asnwer === choose.item ? { backgroundColor: theme.colors.inversePrimary } : {}]}>
                                    <Text style={[styles.itemText, answ?.asnwer === choose.item ? { color: "#ffffff" } : false]}>{choose.item}</Text>
                                    {
                                        flag == "VIEW" ? ((choose.item === quest.correctAnswer)
                                            ? (<AntDesign name='check' size={24} color={theme.colors.primary} />)
                                            : (<AntDesign name='close' size={24} color={theme.colors.error} />)) : null
                                    }
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(_, index) => String(index)}
                />
            </View>
            <View style={styles.footer}>
                <View style={{ flex: 1 }}>
                    <Button
                        label="Previous"
                        disabled={currentQuestion === 0}
                        style={{ borderRadius: 5, backgroundColor: "gray" }}
                        onPress={prveQuestion}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        label={`${currentQuestion === question.length - 1 ? "Submit" : "Next"}`}
                        style={{ borderRadius: 5 }}
                        onPress={currentQuestion === question.length - 1 ? handleSubmit : nextQuestion}
                    />
                </View>
            </View>
        </View>
    ) : <View></View>;
};

const useStyles = (theme: MD3Theme) => StyleSheet.create({
    container: {
        padding: 15,
        marginTop: 20,
        flex: 1,
        flexDirection: "column",
    },
    title: {
        fontSize: 25,
        textAlign: "left"
    },
    content: {
        marginTop: 10,
    },
    item: {
        padding: 15,
        margin: 8,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: theme.colors.inversePrimary,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemText: {
        fontSize: 16,
        textAlign: "left"
    },
    footer: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        gap: 10,
        margin: 8,
    },
});
export default QuestionScreenV2;