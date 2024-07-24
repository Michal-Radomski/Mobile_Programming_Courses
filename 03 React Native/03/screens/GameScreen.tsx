import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";

import NumberContainer from "../components/game/NumberContainer";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";

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

const GameScreen = ({ userNumber }: { userNumber: number }): JSX.Element => {
  const initialGuess = generateRandomBetween(minBoundary, maxBoundary, userNumber);

  const [currentGuess, setCurrentGuess] = React.useState<number>(initialGuess);

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
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>{"-"}</PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>{"+"}</PrimaryButton>
        </View>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});
