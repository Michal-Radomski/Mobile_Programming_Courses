import React from "react";
import { ImageBackground, StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

export interface ObjectI {
  [key: string]: string | number;
}

export default function App(): JSX.Element {
  const [userNumber, setUserNumber] = React.useState<number | null>(null);
  const [gameIsOver, setGameIsOver] = React.useState<boolean>(true);
  const [guessRounds, setGuessRounds] = React.useState<number>(0);

  const [fontsLoaded]: [boolean, Error | null] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
  // console.log({ fontsLoaded });

  React.useEffect(() => {
    if (!fontsLoaded) return;

    if (fontsLoaded) {
      (async function () {
        try {
          await SplashScreen.hideAsync();
          // console.log("fontsLoaded");
        } catch (error) {
          console.log("error:", error);
        }
      })();
    }
  }, [fontsLoaded]);

  function pickedNumberHandler(pickedNumber: number): void {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds: number) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler(): void {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let screen: JSX.Element = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />;
  }

  return (
    <React.Fragment>
      <StatusBar style="light" />
      {fontsLoaded ? (
        <LinearGradient colors={[Colors.primary700, Colors.accent500, Colors.colorOrangeRed]} style={styles.rootScreen}>
          <ImageBackground
            source={require("./assets/images/background.png")}
            resizeMode="cover"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}
          >
            <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
          </ImageBackground>
        </LinearGradient>
      ) : null}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
