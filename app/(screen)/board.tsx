import Button from '@/components/button';
import useStoreBoard from '@/stores/useStoreBoard';
import useStoreQuestion from '@/stores/useStoreQuestion';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import ItemList from '@/components/board/ItemList';
import TopTreeRank from '@/components/board/TopTreeRank';
import { useNavigation, useRouter } from 'expo-router';
import CategoryPickerModal from '@/components/CategoryPickerModal';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const BoardScreen = () => {
  const router = useRouter();
  const styles = useStyles();
  const storeBoard = useStoreBoard();
  const storeQuestion = useStoreQuestion();

  const [isModalOpen, setModalOpen] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      // headerBackTitleVisible: false,
      // headerTintColor: theme.colors.primary, // Back button color
    });
  }, [navigation]);

  useEffect(() => {
    storeBoard.fetchBoard();
  }, [storeBoard.fetchBoard]);

  useEffect(() => {
    console.log("Categories Updated:", storeQuestion.category);
  }, [storeQuestion.category]);

  return (
    
    <SafeAreaView>
      <View style={[styles.container]}>
        <View style={styles.topThree}>
          {storeBoard.boards.length ? (
            <TopTreeRank boards={storeBoard.boards.slice(0, 3)} />
          ) : null}
        </View>
        <View style={styles.listBoard}>
          {storeBoard.boards.length > 3
            ? (
              <FlatList
                style={styles.flatListStyle}
                data={storeBoard.boards.slice(3)}
                renderItem={(d) => (
                  <ItemList
                    rank={d.index + 3}
                    playerName={d.item.playerName}
                    score={d.item.score}
                    totalQuestion={storeQuestion.totalQuestion}
                  />
                )}
                keyExtractor={(item) => item.id.toString()} />
            ) : null}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label="Start Quiz"
            style={{ alignSelf: "stretch" }}
            onPress={() => setModalOpen(true)}
          />
        </View>
      </View>
      <CategoryPickerModal visible={isModalOpen} onClose={() => {
        setModalOpen(false);
        router.push("/question-v2")
      }} />
    </SafeAreaView >
  );


};



export default BoardScreen;



const useStyles = () => StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "stretch",
    height: "100%",
  },
  listBoard: {
    flex: 4,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  topThree: {
    flex: 3,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    alignItems: "center"
  },
  buttonContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginBottom: 1,
    padding: 15
  },
  flatListStyle: {
    flex: 1,
    alignSelf: "stretch",
    paddingHorizontal: 10,
  }
});



