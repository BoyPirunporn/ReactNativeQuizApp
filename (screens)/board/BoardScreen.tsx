import Button from '@/components/button';
import useStoreAuth from '@/stores/useStoreAuth';
import useStoreBoard from '@/stores/useStoreBoard';
import useStoreDialogBoard from '@/stores/useStoreDialogBoard';
import useStoreLoading from '@/stores/useStoreLoading';
import useStoreQuestion from '@/stores/useStoreQuestion';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MD3Theme, useTheme } from 'react-native-paper';
import { RootStackProps } from '../MyStack';
import ItemList from './components/ItemList';
import TopTreeRank from './components/TopTreeRank';

const BoardScreen = (props: NativeStackScreenProps<RootStackProps>) => {
  const [error, setError] = useState<string | null>();
  const styles = useStyles();
  const theme = useTheme();
  const { getPlayer } = useStoreAuth();
  const storeBoard = useStoreBoard();
  const storeDialog = useStoreDialogBoard();
  const storeQuestion = useStoreQuestion();

  useEffect(() => {
    storeBoard.fetchBoard();
  }, [storeBoard.fetchBoard]);
  if (useStoreLoading().loading) {
    return null;
  }
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
            && (
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
            )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label="Start Quiz"
            style={{ alignSelf: "stretch" }}
            onPress={() => {
              storeQuestion.setPlayerName(getPlayer());
              props.navigation.navigate("Question");
            }}
          />
        </View>
      </View>
      {/* <DialogComponent
        visible={storeDialog.visible}
        onDismiss={storeDialog.onClose}
        title={'Player name'}
        onCancel={storeDialog.onClose}
        onPress={async () => {
          storeDialog.onClose();
          storeQuestion.setPlayerName(playerName!);
          props.navigation.navigate("Question");
        }}
      >
        <TextInput
          label="Name"
          value={playerName ?? ""}
          mode="outlined"
          error={!!error}
          readOnly
        />
      </DialogComponent> */}
    </SafeAreaView >
  );


};



export default BoardScreen;
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



