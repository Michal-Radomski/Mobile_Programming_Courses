import React from "react";
import { Text, StyleSheet } from "react-native";

import Colors from "../../constants/colors";
import { ObjectI } from "../../App";

function InstructionText({ children, style }: { children: string; style?: ObjectI }): JSX.Element {
  return (
    <React.Fragment>
      <Text style={[styles.instructionText, style]}>{children}</Text>
    </React.Fragment>
  );
}

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
});
