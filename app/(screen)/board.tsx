import Button from '@/components/button';
import useStoreAuth from '@/stores/useStoreAuth';
import useStoreBoard from '@/stores/useStoreBoard';
import useStoreLoading from '@/stores/useStoreLoading';
import useStoreQuestion from '@/stores/useStoreQuestion';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import ItemList from '@/components/board/ItemList';
import TopTreeRank from '@/components/board/TopTreeRank';
import { useRouter } from 'expo-router';

const BoardScreen = () => {
  const styles = useStyles();
  const router = useRouter();
  const { getPlayer } = useStoreAuth();
  const storeBoard = useStoreBoard();
  const storeQuestion = useStoreQuestion();

  useEffect(() => {
    storeBoard.fetchBoard();
  }, [storeBoard.fetchBoard]);

  
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
                    rank={d.index + 1}
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
            onPress={() => {
              storeQuestion.setPlayerName(getPlayer());
              router.navigate("question-v2");
            }}
          />
        </View>
      </View>
    </SafeAreaView >
  );


};



export default BoardScreen;

const useStyles = () => StyleSheet.create({
  container: {
    alignItems: "center",
    // alignSelf: "stretch",
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
    flex: 2.5,
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



