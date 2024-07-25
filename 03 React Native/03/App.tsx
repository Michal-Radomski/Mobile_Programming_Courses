import React from "react";
import { ImageBackground, StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

export interface ObjectI {
  [key: string]: string | number;
}

export default function App(): JSX.Element {
  const [userNumber, setUserNumber] = React.useState<number>();
  const [gameIsOver, setGameIsOver] = React.useState<boolean>(true);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

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

  function gameOverHandler(): void {
    setGameIsOver(true);
  }

  let screen: JSX.Element = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen />;
  }

  return (
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
