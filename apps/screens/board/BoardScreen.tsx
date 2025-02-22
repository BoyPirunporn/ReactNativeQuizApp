import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '@/apps/components/button';
import { TextInput, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackProps } from '../MyStack';
import useStoreBoard from '@/stores/useStoreBoard';
import { FlatList } from 'react-native-gesture-handler';
import DialogComponent from '@/apps/components/dialog';
import useStoreQuestion from '@/stores/useStoreQuestion';
import useStoreDialogBoard from '@/stores/useStoreDialogBoard';
import { theme } from '@/apps/config/theme';
import FaceSkin from '../../../assets/child-light-skin-tone.svg';
import Crown from '../../../assets/crown.svg';
import One from '../../../assets/medal-gold-winner-2.svg';
import Two from '../../../assets/2nd-place-medal.svg';
import Three from '../../../assets/3rd-place-medal.svg';
import * as svg from 'react-native-svg';
import useStoreLoading from '@/stores/useStoreLoading';
import useStoreAuth from '@/stores/useStoreAuth';

const BoardScreen = (props: NativeStackScreenProps<RootStackProps>) => {
  const [error, setError] = useState<string | null>();
  const styles = useStyles();
  const theme = useTheme();
  const { playerName } = useStoreAuth();
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
            <View style={{
              padding: 10,
              width: "100%",
              display: 'flex',
              flexDirection: "row",
              justifyContent: 'space-between',
              gap: 10,
              margin: 8,
            }}>
              {storeBoard.boards.slice(0, 3).map((item, index) => (
                <View key={item.id} style={{
                  flex: 1,
                  marginTop: index !== 1 ? 30 : 0,
                  alignItems: "center",
                  gap: 10
                }}>
                  <View style={{
                    position: "relative",
                    borderRadius: 100,
                    width: index !== 1 ? 110 : 130,
                    height: index !== 1 ? 110 : 130,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }} >
                    <svg.Svg width={index !== 1 ? 60 : 80} height={index !== 1 ? 60 : 80} style={{
                      position: "relative"
                    }}>
                      <FaceSkin />
                    </svg.Svg>
                    <svg.Svg width={80} height={70} style={{
                      position: "absolute",
                      left: 25,
                      top: -10,
                      display: index !== 1 ? "none" : "flex"
                    }}>
                      <Crown />
                    </svg.Svg>
                    <svg.Svg width={80} height={70} style={{
                      position: "absolute",
                      left: 25,
                      top: 95,
                      display: index !== 1 ? "none" : "flex"
                    }}>
                      <One />
                    </svg.Svg>
                    <svg.Svg width={50} height={40} style={{
                      position: "absolute",
                      left: 30,
                      top: 82,
                      display: index !== 0 ? "none" : "flex"
                    }}>
                      <Two />
                    </svg.Svg>
                    <svg.Svg width={50} height={40} style={{
                      position: "absolute",
                      left: 30,
                      top: 82,
                      display: index !== 2 ? "none" : "flex"
                    }}>
                      <Three />
                    </svg.Svg>
                  </View>
                  <Text style={{
                    marginTop: 20,
                    fontWeight: "600",
                    fontSize: 20,
                    textAlign: "center",
                  }}>{item.playerName}</Text>
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 18,
                      textAlign: "center",
                    }}>{item.score}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
        <View style={styles.listBoard}>
          {storeBoard.boards.length
            ? (
              <FlatList
                style={styles.flatListStyle}
                data={storeBoard.boards.slice(3)}
                renderItem={(d) => renderItemlist(d.index + 3, d.item)}
                keyExtractor={(item) => item.id.toString()}
              />
            )
            : (
              <View style={{
                alignSelf: "center"
              }}>
                <Text style={{
                  fontSize: 30,
                  fontWeight: "500",
                  color: theme.colors.onPrimary
                }}>No board score!</Text>
              </View>
            )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label="Start Quiz"
            style={{ alignSelf: "stretch" }}
            onPress={() => {
              storeDialog.onOpen();
            }}
          />
        </View>
      </View>
      <DialogComponent
        visible={storeDialog.visible}
        onDismiss={storeDialog.onClose}
        title={'Player name'}
        onCancel={storeDialog.onClose}
        onPress={async () => {
          // if (!testerName?.length) {
          //   setError("Please enter your name!");
          //   return;
          // }
          // setError(null);
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
      </DialogComponent>
    </SafeAreaView >
  );

  function renderItemlist(index: number, item: IBoard) {
    return (
      <View style={{
        padding: 8,
        marginVertical: 5,
        borderRadius: 30,
        borderWidth: 1.4,
        borderColor: theme.colors.inversePrimary
      }}>
        <View style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}>
          <View style={{
            display: 'flex',
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}>
            <View style={{
              backgroundColor: theme.colors.inversePrimary,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              borderRadius: 30,
              width: 30,
              height: 30,
            }}>
              <Text style={[styles.titleStyle, {
                color: "#fff",
              }]}>{index + 1}</Text>
            </View>
            <Text style={styles.titleStyle}>{item.playerName}</Text>
          </View>
          <Text style={styles.listStyleDescription}>{item.score} / {storeQuestion.totalQuestion}</Text>
        </View>
      </View>

    );
  };
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
  titleStyle: {
    fontSize: 16,
    paddingBottom: 5
  },
  listStyleDescription: {
    fontSize: 20,
    color: theme.colors.onSecondaryContainer,
    fontWeight: "700"
  },
  flatListStyle: {
    flex: 1,
    alignSelf: "stretch",
    paddingHorizontal: 10,
  }
});
