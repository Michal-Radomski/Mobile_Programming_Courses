import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

import Colors from "../../constants/colors";

function Title({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <React.Fragment>
      <Text style={styles.title}>{children}</Text>
    </React.Fragment>
  );
}

export default Title;

// console.log("Platform:", Platform);

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    // fontWeight: 'bold',
    color: Colors.colorWhite,
    textAlign: "center",
    // borderWidth: 2, //* Alternatively target files: Title.android.tsx and Title.ios.tsx
    // borderWidth: Platform.OS === "android" ? 2 : 0,
    borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderColor: Colors.colorWhite,
    padding: 12,
    maxWidth: "80%",
    width: 300,
  },
});
