import ButtonCustom from '@/components/button';
import FooterList from '@/components/footer-list';
import QuestionItem from '@/components/question-item';
import useStoreDialog from '@/stores/useStoreDialog';
import useStoreQuestion from '@/stores/useStoreQuestion';
import { useRouter } from 'expo-router';
import React, { useEffect, useState, } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { Snackbar, useTheme } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const QuestionScreen = () => {
  const router = useRouter();
  const theme = useTheme();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const storeDialog = useStoreDialog();
  const insets = useSafeAreaInsets();

  const {
    loading,
    question,
    setQuestion,
    onValidate,
    compare,
    clearQuestionState,
  } = useStoreQuestion();

  const handleSubmit = () => {
    if (onValidate()) {
      storeDialog.onOpen({
        children: (
          <View>
            <Text>send your answerasdfdfasd</Text>
            <View style={{
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
                  storeDialog.onDismiss();
                }} label={'Cancel'} />
              <ButtonCustom
                style={{
                  height: 45,
                  width: 80
                }}
                onPress={handleSend} label={"Submit"} />
            </View>
          </View>
        ),
        title: "Confirm send answer.",
        // onPress: handleSend,
      });
    } else {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 2 * 1000);
    }
  };
  const handleSend = async () => {

    storeDialog.onDismiss();
    await compare();
    clearQuestionState();
    router.navigate("result");
  };
  useEffect(() => {
    setQuestion();
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView style={{
        flex: 1,
        paddingTop: insets.top,
        height: "100%",
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: theme.colors.inversePrimary,
        position: "relative",
        marginTop: 40
      }}>
        <FlatList
          data={question}
          initialNumToRender={5}
          renderItem={({ item, index }) => (<QuestionItem key={index} item={item} />)}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={setQuestion} />}
          keyExtractor={(_, index) => String(index)}
          ListFooterComponent={<FooterList hidden={loading} onPress={handleSubmit} />}
        />
        <Snackbar
          visible={showSnackbar}
          duration={2 * 1000}
          style={{
            backgroundColor: theme.colors.error,
          }}
          icon="close"
          onDismiss={() => setShowSnackbar(false)}
        >
          Please answer all questions.
        </Snackbar>
      </SafeAreaView>
    </>
  );
};

export default QuestionScreen;

