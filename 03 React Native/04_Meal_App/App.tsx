import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import CategoriesScreen from "./screens/CategoriesScreens";

export default function App(): JSX.Element {
  return (
    <React.Fragment>
      <StatusBar style="light" />
      <CategoriesScreen />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {},
});
