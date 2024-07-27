import React from "react";
import { View, StyleSheet, Alert, FlatList, ListRenderItemInfo, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/game/NumberContainer";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";
import Colors from "../constants/colors";

function generateRandomBetween(min: number, max: number, exclude: number): number {
  const rndNum: number = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary: number = 1;
let maxBoundary: number = 100;

const GameScreen = ({ userNumber, onGameOver }: { userNumber: number; onGameOver: Function }): JSX.Element => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);

  const [currentGuess, setCurrentGuess] = React.useState<number>(initialGuess);
  const [guessRounds, setGuessRounds] = React.useState<number[]>([initialGuess]);

  const { width } = useWindowDimensions();

  const guessRoundsListLength = guessRounds?.length;

  React.useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds?.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  React.useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction: string): void {
    // direction => 'lower', 'greater'
    if ((direction === "lower" && currentGuess < userNumber) || (direction === "greater" && currentGuess > userNumber)) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [{ text: "Sorry!", style: "cancel" }]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    // console.log({ minBoundary, maxBoundary });
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds: number[]) => [newRndNumber, ...prevGuessRounds]);
  }

  let content = (
    <React.Fragment>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color={Colors.colorWhite} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add" size={24} color={Colors.colorWhite} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </React.Fragment>
  );

  if (width > 500) {
    content = (
      <React.Fragment>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color={Colors.colorWhite} />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add" size={24} color={Colors.colorWhite} />
            </PrimaryButton>
          </View>
        </View>
      </React.Fragment>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guessRound: number, index: number) => (
          <Text key={`${guessRound}_${index}`}>{guessRound}</Text>
        ))} */}

        <FlatList
          data={guessRounds}
          renderItem={(itemData: ListRenderItemInfo<number>) => (
            <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />
          )}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
