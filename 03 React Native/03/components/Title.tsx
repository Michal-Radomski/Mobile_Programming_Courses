import React from "react";
import { Text, StyleSheet } from "react-native";

import Colors from "../constants/colors";

function Title({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <React.Fragment>
      <Text style={styles.title}>{children}</Text>
    </React.Fragment>
  );
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.accent500,
    textAlign: "center",
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: 12,
  },
});
